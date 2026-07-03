/**
 * Point-cloud "formations" for the scroll-driven particle universe.
 * Each generator sculpts the same pool of N particles into the shape that
 * accompanies one section of the page; the scene morphs between them on
 * scroll. All generators use a seeded RNG so the shapes are stable across
 * remounts and resizes.
 */

export type FormationName =
  | "galaxy"
  | "helix"
  | "lattice"
  | "rings"
  | "wave"
  | "beacon";

/** Deterministic PRNG (mulberry32). */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Approximate gaussian in [-1, 1] from three uniform samples. */
function gauss(rng: () => number) {
  return (rng() + rng() + rng()) / 1.5 - 1;
}

/** Spiral galaxy — the hero. Three arms, bright dense core, thin disc. */
function galaxy(count: number): Float32Array {
  const rng = makeRng(101);
  const pts = new Float32Array(count * 3);
  const ARMS = 3;

  for (let i = 0; i < count; i++) {
    const isCore = rng() < 0.22;
    let x: number, y: number, z: number;

    if (isCore) {
      const r = Math.pow(rng(), 1.8) * 3.2;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      x = r * Math.sin(phi) * Math.cos(theta);
      y = r * Math.cos(phi) * 0.7;
      z = r * Math.sin(phi) * Math.sin(theta);
    } else {
      const arm = i % ARMS;
      const r = 2.5 + Math.pow(rng(), 0.75) * 13.5;
      const swirl = r * 0.32 + (arm / ARMS) * Math.PI * 2;
      const spread = 0.28 + (r / 16) * 0.55;
      const theta = swirl + gauss(rng) * spread;
      x = Math.cos(theta) * r + gauss(rng) * 0.5;
      z = Math.sin(theta) * r + gauss(rng) * 0.5;
      y = gauss(rng) * (1.6 - r * 0.07);
    }

    pts[i * 3] = x;
    pts[i * 3 + 1] = y;
    pts[i * 3 + 2] = z;
  }
  return pts;
}

/** Double helix — the career timeline. Two strands plus connecting rungs. */
function helix(count: number): Float32Array {
  const rng = makeRng(202);
  const pts = new Float32Array(count * 3);
  const HALF_HEIGHT = 12;
  const RADIUS = 5.2;
  const TWIST = 0.52;

  for (let i = 0; i < count; i++) {
    const kind = rng();
    let x: number, y: number, z: number;

    if (kind < 0.72) {
      // One of the two strands.
      const strand = kind < 0.36 ? 0 : Math.PI;
      y = (rng() * 2 - 1) * HALF_HEIGHT;
      const angle = y * TWIST + strand;
      const r = RADIUS + gauss(rng) * 0.45;
      x = Math.cos(angle) * r;
      z = Math.sin(angle) * r;
      y += gauss(rng) * 0.25;
    } else if (kind < 0.92) {
      // Rungs bridging the strands at regular intervals.
      const step = Math.floor(rng() * 13);
      y = -HALF_HEIGHT + (step / 12) * HALF_HEIGHT * 2;
      const angle = y * TWIST;
      const t = rng() * 2 - 1; // -1..1 across the rung
      x = Math.cos(angle) * RADIUS * t;
      z = Math.sin(angle) * RADIUS * t;
      y += gauss(rng) * 0.12;
    } else {
      // Loose ions drifting around the molecule.
      const theta = rng() * Math.PI * 2;
      const r = RADIUS + 2 + rng() * 5;
      y = (rng() * 2 - 1) * (HALF_HEIGHT + 2);
      x = Math.cos(theta) * r;
      z = Math.sin(theta) * r;
    }

    pts[i * 3] = x;
    pts[i * 3 + 1] = y;
    pts[i * 3 + 2] = z;
  }
  return pts;
}

/** Nested hollow cubes — the tech stack as a crystal lattice. */
function lattice(count: number): Float32Array {
  const rng = makeRng(303);
  const pts = new Float32Array(count * 3);
  const SHELLS = [4.2, 7.4, 10.6];

  for (let i = 0; i < count; i++) {
    let x: number, y: number, z: number;

    if (rng() < 0.06) {
      // Sparse dust inside the structure.
      x = (rng() * 2 - 1) * 3;
      y = (rng() * 2 - 1) * 3;
      z = (rng() * 2 - 1) * 3;
    } else {
      const half = SHELLS[Math.floor(rng() * SHELLS.length)];
      // Random point on the surface of a cube: pick a face, spread on it.
      const face = Math.floor(rng() * 6);
      const u = (rng() * 2 - 1) * half;
      const v = (rng() * 2 - 1) * half;
      const axis = face >> 1;
      const sign = face % 2 === 0 ? 1 : -1;
      const coords = [0, 0, 0];
      coords[axis] = sign * half;
      coords[(axis + 1) % 3] = u;
      coords[(axis + 2) % 3] = v;
      // Bias points toward the edges so the wireframe reads clearly.
      const edgeBias = rng();
      if (edgeBias < 0.5) {
        const snap = (axis + 1 + (edgeBias < 0.25 ? 0 : 1)) % 3;
        coords[snap] = (coords[snap] >= 0 ? 1 : -1) * half * (0.94 + rng() * 0.06);
      }
      [x, y, z] = coords;
      x += gauss(rng) * 0.08;
      y += gauss(rng) * 0.08;
      z += gauss(rng) * 0.08;
    }

    // Tilt the whole lattice so it never reads as a flat square.
    const tiltY = 0.6;
    const tiltX = 0.42;
    const x1 = x * Math.cos(tiltY) - z * Math.sin(tiltY);
    const z1 = x * Math.sin(tiltY) + z * Math.cos(tiltY);
    const y1 = y * Math.cos(tiltX) - z1 * Math.sin(tiltX);
    const z2 = y * Math.sin(tiltX) + z1 * Math.cos(tiltX);

    pts[i * 3] = x1;
    pts[i * 3 + 1] = y1;
    pts[i * 3 + 2] = z2;
  }
  return pts;
}

/** Planet with orbital rings — shipped projects in orbit. */
function rings(count: number): Float32Array {
  const rng = makeRng(404);
  const pts = new Float32Array(count * 3);
  const TILT = 0.42;

  for (let i = 0; i < count; i++) {
    const kind = rng();
    let x: number, y: number, z: number;

    if (kind < 0.3) {
      // The planet body.
      const r = 3.6 * Math.cbrt(rng());
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      x = r * Math.sin(phi) * Math.cos(theta);
      y = r * Math.cos(phi);
      z = r * Math.sin(phi) * Math.sin(theta);
    } else {
      // Ring system with a Cassini-style gap.
      const band = rng();
      const r =
        band < 0.55
          ? 6.5 + rng() * 3.2 // inner ring
          : 10.6 + rng() * 3.6; // outer ring
      const theta = rng() * Math.PI * 2;
      x = Math.cos(theta) * r;
      z = Math.sin(theta) * r;
      y = gauss(rng) * 0.18;
    }

    // Tilt the whole system toward the camera.
    const y1 = y * Math.cos(TILT) - z * Math.sin(TILT);
    const z1 = y * Math.sin(TILT) + z * Math.cos(TILT);

    pts[i * 3] = x;
    pts[i * 3 + 1] = y1;
    pts[i * 3 + 2] = z1;
  }
  return pts;
}

/** Rolling signal field — writing / the blog. */
function wave(count: number): Float32Array {
  const rng = makeRng(505);
  const pts = new Float32Array(count * 3);
  const SIZE = 30;

  for (let i = 0; i < count; i++) {
    const x = (rng() * 2 - 1) * SIZE * 0.5 * 1.9;
    const z = (rng() * 2 - 1) * SIZE * 0.5;
    const y =
      Math.sin(x * 0.42) * 1.4 +
      Math.cos(z * 0.5 + x * 0.2) * 1.1 +
      Math.sin((x + z) * 0.18) * 1.8 -
      3.5;

    pts[i * 3] = x;
    pts[i * 3 + 1] = y + gauss(rng) * 0.12;
    pts[i * 3 + 2] = z;
  }
  return pts;
}

/** Portal ring with a light beam — the contact beacon. */
function beacon(count: number): Float32Array {
  const rng = makeRng(606);
  const pts = new Float32Array(count * 3);
  const RING_R = 8.6;
  const TUBE_R = 0.8;

  for (let i = 0; i < count; i++) {
    const kind = rng();
    let x: number, y: number, z: number;

    if (kind < 0.66) {
      // Torus facing the camera.
      const u = rng() * Math.PI * 2;
      const v = rng() * Math.PI * 2;
      const tube = TUBE_R * Math.sqrt(rng());
      x = (RING_R + tube * Math.cos(v)) * Math.cos(u);
      y = (RING_R + tube * Math.cos(v)) * Math.sin(u);
      z = tube * Math.sin(v);
    } else if (kind < 0.78) {
      // Vertical beam of light through the center.
      const r = 0.5 + Math.pow(rng(), 1.6) * 2.6;
      const theta = rng() * Math.PI * 2;
      x = Math.cos(theta) * r;
      y = (rng() * 2 - 1) * 15;
      z = Math.sin(theta) * r;
    } else {
      // Sparks orbiting the portal.
      const u = rng() * Math.PI * 2;
      const r = RING_R + 1.5 + rng() * 4.5;
      x = Math.cos(u) * r;
      y = Math.sin(u) * r * (0.6 + rng() * 0.4);
      z = (rng() * 2 - 1) * 2.5;
    }

    pts[i * 3] = x;
    pts[i * 3 + 1] = y;
    pts[i * 3 + 2] = z;
  }
  return pts;
}

const GENERATORS: Record<FormationName, (count: number) => Float32Array> = {
  galaxy,
  helix,
  lattice,
  rings,
  wave,
  beacon,
};

/** Section order — must match the `data-scene` sections on the page. */
export const FORMATION_SEQUENCE: FormationName[] = [
  "galaxy",
  "helix",
  "lattice",
  "rings",
  "wave",
  "beacon",
];

/** Per-formation look: color pair, spin speed, camera distance + height. */
export const FORMATION_STYLE: Record<
  FormationName,
  { colorA: string; colorB: string; spin: number; camZ: number; camY: number }
> = {
  galaxy: { colorA: "#2ee59d", colorB: "#17b0a0", spin: 0.05, camZ: 26, camY: 9 },
  helix: { colorA: "#39dfb0", colorB: "#4fd6ff", spin: 0.14, camZ: 27, camY: 2 },
  lattice: { colorA: "#2ee59d", colorB: "#a4f45c", spin: 0.1, camZ: 28, camY: 5 },
  rings: { colorA: "#8b7bff", colorB: "#4fd6ff", spin: 0.08, camZ: 27, camY: 8 },
  wave: { colorA: "#22c8c0", colorB: "#3f8cff", spin: 0, camZ: 24, camY: 7 },
  beacon: { colorA: "#2ee59d", colorB: "#bfffe6", spin: 0.06, camZ: 24, camY: 0 },
};

export function generateFormation(
  name: FormationName,
  count: number,
): Float32Array {
  return GENERATORS[name](count);
}
