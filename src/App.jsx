import { useState, useEffect, useRef, useCallback } from "react";
import { C } from "./data/colors";
import Cursor from "./components/terminal/Cursor";
import TerminalLine from "./components/terminal/TerminalLine";
import TerminalModal from "./components/modals/TerminalModal";
import COMMANDS from "./components/terminal/commands";
import useDraggable from "./hooks/useDraggable";
import useWindowManager from "./hooks/useWindowManager";
import useIsMobile from "./hooks/useIsMobile";

const BOOT_LINES = [
  { type: "system", text: "AntipoleOS v2.4.1 — booting..." },
  { type: "system", text: 'Type "help" to see available commands.' },
  { type: "divider" },
];

const QUICK_CMDS = ["help", "about", "profile", "skills", "projects", "contact"];
const ALL_WINDOW_IDS = ["terminal", "about", "skills", "projects", "contact", "profile"];

export default function App() {
  const isMobile = useIsMobile();

  const [lines, setLines]               = useState([]);
  const [input, setInput]               = useState("");
  const [history, setHistory]           = useState([]);
  const [historyIdx, setHistoryIdx]     = useState(-1);
  const [openModals, setOpenModals]     = useState(new Set());
  const [modalInitPos, setModalInitPos] = useState({});
  const [booted, setBooted]             = useState(false);
  const [zoom, setZoom]                 = useState(false);

  const inputRef  = useRef(null);
  const bottomRef = useRef(null);

  const { bringToFront, zIndex } = useWindowManager(ALL_WINDOW_IDS);

  const { pos, isDragging, elementRef, dragHandleProps } = useDraggable({
    initial: { x: 0, y: 0 },
    enabled: !isMobile,
  });

  useEffect(() => {
    if (isMobile) {
      setLines([...BOOT_LINES]);
      setBooted(true);
      setTimeout(() => inputRef.current?.focus(), 50);
      return;
    }

    let cancelled = false;
    let i = 0;
    const tick = () => {
      if (cancelled) return;
      if (i < BOOT_LINES.length) {
        const line = BOOT_LINES[i++];
        setLines((prev) => [...prev, line]);
        setTimeout(tick, 220);
      } else {
        setBooted(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };
    setTimeout(tick, 300);
    return () => { cancelled = true; };
  }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: isMobile ? "auto" : "smooth" });
  }, [lines, isMobile]);

  const openModal = useCallback((key) => {
    setOpenModals((prev) => {
      if (prev.has(key)) { bringToFront(key); return prev; }

      if (!isMobile) {
        const MODAL_W = 560;
        const MODAL_H = 440;
        const stagger = ({ about: 0, skills: 1, projects: 2, contact: 3 }[key] ?? 0) * 24;
        let spawnX, spawnY;
        const el = elementRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          spawnX = rect.right + 16 + stagger;
          spawnY = rect.top   + 16 + stagger;
          if (spawnX + MODAL_W + 8 > window.innerWidth) {
            spawnX = rect.left   + stagger;
            spawnY = rect.bottom + 16 + stagger;
          }
        } else {
          spawnX = window.innerWidth  / 2 - MODAL_W / 2 + stagger;
          spawnY = window.innerHeight / 2 - MODAL_H / 2 + stagger;
        }
        const clampedX = Math.min(Math.max(spawnX, 8), window.innerWidth  - MODAL_W - 8);
        const clampedY = Math.min(Math.max(spawnY, 40), window.innerHeight - MODAL_H - 8);
        setModalInitPos((prev) => ({ ...prev, [key]: { x: clampedX, y: clampedY } }));
      }

      return new Set([...prev, key]);
    });
    setTimeout(() => bringToFront(key), 0);
  }, [bringToFront, elementRef, isMobile]);

  const closeModal = useCallback((key) => {
    setOpenModals((prev) => { const n = new Set(prev); n.delete(key); return n; });
  }, []);

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (cmd === "clear") { setLines([]); return; }
    const inputLine = { type: "input", text: cmd };
    if (!cmd) { setLines((prev) => [...prev, inputLine]); return; }
    if (COMMANDS[cmd]) {
      const { output, modal } = COMMANDS[cmd];
      setLines((prev) => [...prev, inputLine, { type: "output", element: output }]);
      setHistory((h) => [cmd, ...h]);
      setHistoryIdx(-1);
      if (modal) setTimeout(() => openModal(modal), 200);
    } else {
      setLines((prev) => [
        ...prev, inputLine,
        { type: "error", text: `command not found: ${cmd}. Type "help" for available commands.` },
      ]);
      setHistory((h) => [cmd, ...h]);
      setHistoryIdx(-1);
    }
  }, [openModal]);

  const handleKey = (e) => {
    if (e.key === "Enter")     { runCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(idx);
      if (idx >= 0) setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(idx);
      setInput(idx === -1 ? "" : (history[idx] ?? ""));
    }
  };

  return (
    <div
      className={
        isMobile
          ? "w-screen h-[100dvh] overflow-hidden"
          : "flex flex-col items-center justify-center w-screen h-screen overflow-hidden"
      }
      style={isMobile ? { background: C.surface } : { background: C.bg }}
      onClick={() => !isMobile && inputRef.current?.focus()}
    >

      <div
        ref={elementRef}
        className={isMobile ? "flex flex-col w-full h-full" : "flex flex-col rounded-xl overflow-hidden"}
        style={{
          background: C.surface,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          ...(isMobile
            ? {
                fontSize: "0.875rem",
                border: `1px solid ${C.border}`,
              }
            : {
                width: "min(680px, 92vw)",
                height: `min(${zoom ? 620 : 540}px, 82vh)`,
                fontSize: zoom ? "0.9rem" : "0.8125rem",
                border: `1px solid ${isDragging ? C.blue : C.border}`,
                boxShadow: isDragging
                  ? `0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px ${C.blue}44`
                  : "0 32px 100px rgba(0,0,0,0.5)",
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom ? 1.15 : 1})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "box-shadow 0.2s, border-color 0.2s, transform 0.15s, height 0.15s",
                cursor: isDragging ? "grabbing" : "auto",
                zIndex: zIndex("terminal"),
              }
          ),
        }}
        onMouseDown={!isMobile ? () => bringToFront("terminal") : undefined}
      >

        <div
          {...(!isMobile ? dragHandleProps : {})}
          className="flex items-center gap-3 px-4 py-3 shrink-0 border-b select-none"
          style={{
            background: C.titlebar,
            borderColor: C.border,
            cursor: isMobile ? "default" : (isDragging ? "grabbing" : "grab"),
          }}
        >
          <div className="flex gap-1.5 items-center">
            <span className="w-3 h-3 rounded-full block" style={{ background: C.red }} />
            <span className="w-3 h-3 rounded-full block" style={{ background: C.yellow }} />
            {isMobile
              ? <span className="w-3 h-3 rounded-full block" style={{ background: C.green }} />
              : (
                <button
                  onClick={(e) => { e.stopPropagation(); setZoom((z) => !z); }}
                  className="w-3 h-3 rounded-full md:hover:brightness-75"
                  style={{ background: C.green, cursor: "pointer" }}
                  title={zoom ? "Zoom out" : "Zoom in"}
                />
              )
            }
          </div>

          <span className="flex-1 text-center" style={{ color: C.muted, fontSize: "0.75rem" }}>
            ant1po1e@portfolio — bash
          </span>

          {!isMobile && (
            <div className="flex items-center gap-2">
              {zoom && (
                <span className="px-1 rounded" style={{ color: C.green, background: `${C.green}18`, fontSize: "0.7rem" }}>
                  ×1.15
                </span>
              )}
              <span style={{ color: `${C.muted}66`, fontSize: "0.75rem" }} title="Drag to move">⠿</span>
            </div>
          )}
        </div>

        <div
          className="flex-1 overflow-y-auto px-4 py-4 leading-7"
          style={{ fontSize: "inherit" }}
          onClick={() => isMobile && inputRef.current?.focus()}
        >
          {lines.map((line, i) => <TerminalLine key={i} line={line} />)}

          {booted && (
            <div className="flex items-center">
              <span style={{ color: C.green }}>ant1po1e</span>
              <span style={{ color: C.muted }}>@portfolio</span>
              <span style={{ color: C.text }}>:~$&nbsp;</span>
              <span className="relative flex-1 min-w-0 flex items-center">
                <span
                  aria-hidden="true"
                  className="invisible whitespace-pre"
                  style={{ fontFamily: "inherit", fontSize: "inherit" }}
                >
                  {input}
                </span>
                <Cursor />
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  className="absolute inset-0 bg-transparent border-none outline-none w-full"
                  style={{
                    color: C.blue,
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    caretColor: "transparent",
                  }}
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  inputMode="text"
                />
              </span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div
          className="shrink-0 flex flex-wrap gap-x-3 gap-y-1 border-t"
          style={{
            borderColor: C.border,
            padding: isMobile ? "0.6rem 1rem" : "0.375rem 1.25rem",
          }}
        >
          {QUICK_CMDS.map((cmd) => (
            <button
              key={cmd}
              onClick={(e) => { e.stopPropagation(); runCommand(cmd); setInput(""); }}
              className="bg-transparent border-none cursor-pointer md:transition-colors md:duration-150 md:hover:text-[#58A6FF]"
              style={{
                color: C.muted,
                fontFamily: "inherit",
                fontSize: isMobile ? "0.85rem" : "0.72rem",
                padding: isMobile ? "0.2rem 0.1rem" : "0",
              }}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {!isMobile && (
        <p
          className="mt-4 select-none text-center"
          style={{
            color: C.muted,
            fontSize: "0.7rem",
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            zIndex: zIndex("terminal"),
          }}
        >
          Drag title bar to move · 🟢 to zoom · type or click shortcuts
        </p>
      )}

      {[...openModals].map((key) => (
        <TerminalModal
          key={key}
          modalKey={key}
          isMobile={isMobile}
          initialPos={modalInitPos[key] ?? { x: 80, y: 80 }}
          zIndex={zIndex(key)}
          onFocus={!isMobile ? () => bringToFront(key) : undefined}
          onClose={() => closeModal(key)}
        />
      ))}
    </div>
  );
}
