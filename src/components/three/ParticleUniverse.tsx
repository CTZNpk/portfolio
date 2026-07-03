"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  FORMATION_SEQUENCE,
  FORMATION_STYLE,
  generateFormation,
} from "./formations";

/**
 * The persistent WebGL backdrop for the whole landing page.
 *
 * One pool of GPU particles morphs between section-specific formations as
 * the user scrolls (galaxy → helix → lattice → rings → wave → beacon).
 * The pointer repels nearby particles, clicking sends a small shockwave,
 * and the on-page terminal can trigger a full `warp` or switch the palette
 * to matrix mode via custom window events.
 *
 * Fallbacks: no WebGL → the static CSS gradient behind the canvas stays;
 * prefers-reduced-motion → time-based drift and spin are frozen, only
 * scroll-driven (user-initiated) morphing remains.
 */

const VERTEX_SHADER = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aSeed;

  uniform float uMix;
  uniform float uTime;
  uniform float uWarp;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uPointer;
  uniform float uPointerStrength;

  varying float vSeed;
  varying float vFade;

  void main() {
    // Per-particle stagger makes morphs ripple through the cloud
    // instead of moving as one rigid object.
    float t = clamp(uMix * 1.35 - aSeed * 0.35, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 pos = mix(aFrom, aTo, t);

    // Gentle idle drift.
    float drift = 0.22 * (0.4 + aSeed * 0.6);
    pos += drift * vec3(
      sin(uTime * 0.50 + aSeed * 61.0),
      cos(uTime * 0.43 + aSeed * 47.0),
      sin(uTime * 0.61 + aSeed * 83.0)
    );

    // Warp shockwave: throw particles outward, they spring back as it decays.
    vec3 rdir = normalize(pos + vec3(0.001, 0.002, 0.001));
    pos += rdir * uWarp * (3.0 + aSeed * 15.0);

    // Pointer repulsion in world space.
    vec3 toPointer = pos - uPointer;
    float d2 = dot(toPointer, toPointer);
    float repel = uPointerStrength * exp(-d2 * 0.055);
    pos += (toPointer / max(sqrt(d2), 0.15)) * repel * 2.4;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = uSize * (0.5 + aSeed * 1.1) * (1.0 + uWarp * 0.6);
    gl_PointSize = clamp(size * uPixelRatio * (140.0 / -mv.z), 1.0, 40.0);

    vFade = smoothstep(-70.0, -14.0, mv.z);
    vSeed = aSeed;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;

  varying float vSeed;
  varying float vFade;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.08, d);
    if (alpha < 0.01) discard;

    float core = smoothstep(0.16, 0.0, d) * 0.38;
    vec3 col = mix(uColorA, uColorB, vSeed);
    col += core;

    gl_FragColor = vec4(col, alpha * vFade * uOpacity);
  }
`;

const MATRIX_COLORS = { colorA: "#00ff41", colorB: "#7dffa1" };

function particleCountFor(width: number) {
  if (width < 640) return 15000;
  if (width < 1024) return 26000;
  return 42000;
}

export default function ParticleUniverse() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      return; // No WebGL — the CSS gradient fallback stays visible.
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      220,
    );

    const count = particleCountFor(window.innerWidth);
    const formations = FORMATION_SEQUENCE.map((name) =>
      generateFormation(name, count),
    );
    const styles = FORMATION_SEQUENCE.map((name) => FORMATION_STYLE[name]);
    const lastSegment = FORMATION_SEQUENCE.length - 2;

    // --- Particle cloud -------------------------------------------------
    const geometry = new THREE.BufferGeometry();
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) seeds[i] = Math.random();

    const fromAttr = new THREE.BufferAttribute(formations[0].slice(), 3);
    const toAttr = new THREE.BufferAttribute(formations[1].slice(), 3);
    fromAttr.setUsage(THREE.DynamicDrawUsage);
    toAttr.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", fromAttr); // for bounding calculations
    geometry.setAttribute("aFrom", fromAttr);
    geometry.setAttribute("aTo", toAttr);
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 120);

    const uniforms = {
      uMix: { value: 0 },
      uTime: { value: 0 },
      uWarp: { value: 0 },
      uSize: { value: 0.55 },
      uPixelRatio: { value: 1 },
      uPointer: { value: new THREE.Vector3(999, 999, 999) },
      uPointerStrength: { value: 0 },
      uColorA: { value: new THREE.Color(styles[0].colorA) },
      uColorB: { value: new THREE.Color(styles[0].colorB) },
      uOpacity: { value: 0.7 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    // --- Distant starfield ----------------------------------------------
    const starGeo = new THREE.BufferGeometry();
    const starCount = 900;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 60 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.cos(phi);
      starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.35,
      sizeAttenuation: true,
      color: new THREE.Color("#b7d8cb"),
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- Scroll → formation progress -------------------------------------
    let sectionCenters: number[] = [];
    const measureSections = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-scene]"),
      );
      sectionCenters = sections.map((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });
    };

    const targetProgress = () => {
      const n = sectionCenters.length;
      if (n < 2) return 0;
      const focus = window.scrollY + window.innerHeight / 2;
      if (focus <= sectionCenters[0]) return 0;
      if (focus >= sectionCenters[n - 1]) return n - 1;
      for (let i = 0; i < n - 1; i++) {
        if (focus < sectionCenters[i + 1]) {
          return (
            i +
            (focus - sectionCenters[i]) /
              (sectionCenters[i + 1] - sectionCenters[i])
          );
        }
      }
      return n - 1;
    };

    let segment = 0;
    const setSegment = (i: number) => {
      segment = i;
      (fromAttr.array as Float32Array).set(formations[i]);
      (toAttr.array as Float32Array).set(formations[Math.min(i + 1, formations.length - 1)]);
      fromAttr.needsUpdate = true;
      toAttr.needsUpdate = true;
    };

    // --- Pointer ----------------------------------------------------------
    const pointerNdc = new THREE.Vector2(99, 99);
    const pointerWorld = new THREE.Vector3(999, 999, 999);
    const raycaster = new THREE.Raycaster();
    const pointerPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    let pointerActive = false;

    const onPointerMove = (e: PointerEvent) => {
      pointerNdc.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
      pointerActive = true;
    };
    const onPointerLeave = () => {
      pointerActive = false;
    };
    // Any click sends a small shockwave through the particles.
    const onClick = () => {
      warp = Math.min(1, warp + 0.28);
    };

    // --- Terminal / easter-egg hooks --------------------------------------
    let warp = 0;
    let matrixMode = false;
    const onWarp = () => {
      warp = 1;
    };
    const onMatrix = (e: Event) => {
      matrixMode = Boolean((e as CustomEvent).detail?.on);
    };

    // --- Sizing ------------------------------------------------------------
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1.5 : 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      uniforms.uPixelRatio.value = dpr;
      measureSections();
    };

    renderer.setClearColor(new THREE.Color("#04080a"), 1);
    resize();
    setSegment(0);

    // Section layout can shift as content/images settle in.
    const bodyObserver = new ResizeObserver(() => measureSections());
    bodyObserver.observe(document.body);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onClick, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("portfolio:warp", onWarp);
    window.addEventListener("portfolio:matrix", onMatrix);
    canvas.addEventListener("webglcontextlost", (e) => e.preventDefault());

    // --- Render loop -------------------------------------------------------
    let lastTime = performance.now();
    const colorA = new THREE.Color(styles[0].colorA);
    const colorB = new THREE.Color(styles[0].colorB);
    const targetA = new THREE.Color();
    const targetB = new THREE.Color();
    const camPos = new THREE.Vector3();
    let progress = 0;
    let orbitAngle = 0;
    let pointerStrength = 0;
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const damp = 1 - Math.exp(-dt * 4.5);

      // Scroll-scrubbed morph progress.
      progress += (targetProgress() - progress) * damp;
      const seg = Math.max(0, Math.min(Math.floor(progress), lastSegment));
      if (seg !== segment) setSegment(seg);
      uniforms.uMix.value = progress - seg;

      // Style interpolation between neighbouring formations.
      const frac = progress - seg;
      const a = styles[seg];
      const b = styles[Math.min(seg + 1, styles.length - 1)];
      if (matrixMode) {
        targetA.set(MATRIX_COLORS.colorA);
        targetB.set(MATRIX_COLORS.colorB);
      } else {
        targetA.set(a.colorA).lerp(new THREE.Color(b.colorA), frac);
        targetB.set(a.colorB).lerp(new THREE.Color(b.colorB), frac);
      }
      colorA.lerp(targetA, damp);
      colorB.lerp(targetB, damp);
      uniforms.uColorA.value.copy(colorA);
      uniforms.uColorB.value.copy(colorB);

      // Warp decay.
      warp += (0 - warp) * (1 - Math.exp(-dt * 1.4));
      uniforms.uWarp.value = warp;

      if (!reducedMotion) {
        uniforms.uTime.value += dt;
        const spin = a.spin + (b.spin - a.spin) * frac;
        orbitAngle += dt * spin;
        stars.rotation.y += dt * 0.004;
      }

      // Camera: slow orbit + mouse parallax, always looking at the core.
      const camZ = a.camZ + (b.camZ - a.camZ) * frac;
      const camY = a.camY + (b.camY - a.camY) * frac;
      camPos.set(
        Math.sin(orbitAngle) * camZ + pointerNdc.x * (pointerActive ? 1.6 : 0),
        camY + (pointerActive ? pointerNdc.y * 1.4 : 0),
        Math.cos(orbitAngle) * camZ,
      );
      camera.position.lerp(camPos, damp);
      camera.lookAt(0, 0, 0);

      // Pointer world position on the plane through the origin facing the camera.
      pointerStrength +=
        ((pointerActive ? 1 : 0) - pointerStrength) * (1 - Math.exp(-dt * 6));
      uniforms.uPointerStrength.value = pointerStrength;
      if (pointerActive) {
        camera.getWorldDirection(pointerPlane.normal).negate();
        pointerPlane.constant = 0;
        raycaster.setFromCamera(pointerNdc, camera);
        if (raycaster.ray.intersectPlane(pointerPlane, pointerWorld)) {
          uniforms.uPointer.value.lerp(pointerWorld, damp * 1.5);
        }
      }

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      bodyObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onClick);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("portfolio:warp", onWarp);
      window.removeEventListener("portfolio:matrix", onMatrix);
      geometry.dispose();
      material.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      {/* Static fallback backdrop — visible before hydration / without WebGL. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,rgba(46,229,157,0.12),transparent_70%),radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(79,214,255,0.06),transparent_70%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Soft vignette so edge particles fade into the page chrome. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(4,8,10,0.55)_100%)]" />
    </div>
  );
}
