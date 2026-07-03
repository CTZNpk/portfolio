"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { PortfolioContent } from "@/lib/portfolio/types";

/**
 * The on-page developer terminal — the portfolio's gamified layer.
 * Open with the ` key (or the floating button). Commands can fly to
 * sections, fire a particle warp, or flip the whole site into matrix mode.
 * A global konami-code listener unlocks the warp even when it's closed.
 */

type HistoryEntry = {
  prompt?: string;
  lines: string[];
};

const SECTIONS = [
  "home",
  "experience",
  "skills",
  "projects",
  "blog",
  "contact",
];

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const BANNER = [
  "┌─────────────────────────────────────┐",
  "│  haider@portfolio — guest session   │",
  "└─────────────────────────────────────┘",
  'Type "help" to see what this thing can do.',
];

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.isContentEditable
  );
}

export default function DevTerminal({
  content,
}: {
  content: PortfolioContent;
}) {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([{ lines: BANNER }]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdCursor, setCmdCursor] = useState(-1);
  const [toast, setToast] = useState<string | null>(null);
  const [matrixOn, setMatrixOn] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const konamiIndex = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3600);
  }, []);

  const fireWarp = useCallback(() => {
    window.dispatchEvent(new Event("portfolio:warp"));
  }, []);

  const setMatrix = useCallback((on: boolean) => {
    setMatrixOn(on);
    if (on) {
      document.documentElement.dataset.theme = "matrix";
    } else {
      delete document.documentElement.dataset.theme;
    }
    window.dispatchEvent(
      new CustomEvent("portfolio:matrix", { detail: { on } }),
    );
  }, []);

  // Global key handling: ` toggles the terminal, konami code warps.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      const expected = KONAMI[konamiIndex.current];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        konamiIndex.current += 1;
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0;
          fireWarp();
          showToast("⚡ Achievement unlocked: KONAMI — warp drive engaged");
        }
      } else {
        konamiIndex.current = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fireWarp, showToast]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, open]);

  const run = useCallback(
    (raw: string): string[] => {
      const [cmd, ...rest] = raw.trim().split(/\s+/);
      const arg = rest.join(" ").toLowerCase();

      switch (cmd.toLowerCase()) {
        case "help":
          return [
            "available commands:",
            "  whoami          who owns this universe",
            "  ls              list sections",
            "  goto <section>  fly to a section",
            "  stack           print the tech stack",
            "  projects        list shipped projects",
            "  warp            detonate the particle field",
            "  matrix          toggle matrix mode",
            "  resume          open the resume",
            "  contact         start an email",
            "  clear           clear the terminal",
            "  exit            close the terminal",
            "…and at least one secret. Gamers know the code.",
          ];
        case "whoami":
          return [
            `${content.hero.name} — ${content.hero.badge}`,
            content.hero.headline,
          ];
        case "ls":
          return SECTIONS.map((s) => `drwxr-xr-x  ${s}/`);
        case "goto":
        case "open":
        case "cd": {
          const target = arg === "" || arg === "~" ? "home" : arg;
          if (!SECTIONS.includes(target)) {
            return [`goto: no such section: ${target}`, `try: ${SECTIONS.join(", ")}`];
          }
          document
            .getElementById(target)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          return [`navigating to /${target} …`];
        }
        case "stack":
          return content.skills.groups.flatMap((g) => [
            `${g.category}:`,
            `  ${g.items.join(" · ")}`,
          ]);
        case "projects":
          return content.projects.items.flatMap((p) => [
            `▸ ${p.name} [${p.type}]`,
            `  ${p.description}`,
          ]);
        case "warp":
          fireWarp();
          return ["⚡ warp field detonated. hold on to something."];
        case "matrix": {
          const next = !matrixOn;
          setMatrix(next);
          return next
            ? ["wake up, neo… matrix mode ON."]
            : ["matrix mode OFF. welcome back to reality."];
        }
        case "resume":
          window.open("/resume", "_blank");
          return ["opening resume …"];
        case "contact":
        case "email":
          window.location.href = `mailto:${content.contact.email}`;
          return [`drafting mail to ${content.contact.email} …`];
        case "sudo":
          if (arg.includes("hire")) {
            window.location.href = `mailto:${content.contact.email}?subject=Let's%20work%20together`;
            return [
              "[sudo] permission granted.",
              "excellent decision. drafting the offer email …",
            ];
          }
          return ["user is not in the sudoers file. this incident will be reported."];
        case "konami":
          return ["↑ ↑ ↓ ↓ ← → ← → B A — anywhere on the page."];
        case "clear":
          setHistory([]);
          return [];
        case "exit":
        case "close":
        case "q":
          setOpen(false);
          return [];
        case "":
          return [];
        default:
          return [`command not found: ${cmd}`, 'type "help" for the manual.'];
      }
    },
    [content, fireWarp, matrixOn, setMatrix],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const raw = input;
    setInput("");
    setCmdCursor(-1);
    if (raw.trim()) setCmdHistory((h) => [raw, ...h].slice(0, 50));
    const lines = run(raw);
    if (raw.trim().toLowerCase() === "clear") return;
    setHistory((h) => [...h, { prompt: raw, lines }]);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdCursor + 1, cmdHistory.length - 1);
      if (next >= 0 && cmdHistory[next] !== undefined) {
        setCmdCursor(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cmdCursor - 1;
      setCmdCursor(next);
      setInput(next >= 0 ? cmdHistory[next] : "");
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close terminal" : "Open terminal (or press `)"}
        title="Terminal — press `"
        className="glass fixed bottom-5 right-5 z-50 flex h-11 items-center gap-2 rounded-full px-4 font-mono text-sm text-brand transition hover:border-brand/50 hover:shadow-[0_0_24px_-6px_var(--color-brand)]"
      >
        <span className="text-brand-bright">&gt;_</span>
        <span className="hidden sm:inline text-ink-soft">terminal</span>
      </button>

      {/* Achievement toast */}
      {toast ? (
        <div className="glass animate-pop-in fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-md px-5 py-3 font-mono text-sm text-brand-bright shadow-[0_0_40px_-10px_var(--color-brand)]">
          {toast}
        </div>
      ) : null}

      {/* Terminal window */}
      {open ? (
        <div
          role="dialog"
          aria-label="Developer terminal"
          className="terminal-panel scanlines glass-deep fixed bottom-20 right-5 z-50 flex h-[24rem] w-[min(34rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-lg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_30px_-12px_var(--color-brand)]"
        >
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-ink-faint">
              guest@{content.hero.name.toLowerCase().replace(/\s+/g, "-")}:~
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close terminal"
              className="ml-auto font-mono text-xs text-ink-faint transition hover:text-brand"
            >
              ✕
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-1.5 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6"
          >
            {history.map((entry, i) => (
              <div key={i}>
                {entry.prompt !== undefined ? (
                  <p className="text-ink-soft">
                    <span className="text-brand">❯</span> {entry.prompt}
                  </p>
                ) : null}
                {entry.lines.map((line, j) => (
                  <p key={j} className="whitespace-pre-wrap text-ink">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-line px-4 py-3"
          >
            <span className="font-mono text-sm text-brand">❯</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal command"
              placeholder="help"
              className="min-w-0 flex-1 bg-transparent font-mono text-sm text-ink outline-none placeholder:text-ink-faint"
            />
          </form>
        </div>
      ) : null}
    </>
  );
}
