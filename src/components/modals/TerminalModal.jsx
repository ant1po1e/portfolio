// TerminalModal.jsx — ini yang berubah
import { useState, useCallback } from "react";
import { C } from "../../data/colors";
import {
    AboutModal,
    SkillsModal,
    ProjectsModal,
    ContactModal,
    ProfileModal,
    CVModal,
} from "./index";
import useDraggable from "../../hooks/useDraggable";

const MODALS = {
    about: { title: "cat about.txt", Component: AboutModal },
    skills: { title: "cat skills.json", Component: SkillsModal },
    projects: { title: "ls -la projects/", Component: ProjectsModal },
    contact: { title: "bash contact.sh", Component: ContactModal },
    profile: { title: "bash profile.sh", Component: ProfileModal },
    cv: { title: "cat cv.pdf", Component: CVModal },
};

const INTERACTIVE_TAGS = [
    "INPUT",
    "TEXTAREA",
    "SELECT",
    "BUTTON",
    "A",
    "LABEL",
];

export default function TerminalModal({
    modalKey,
    initialPos,
    isMobile,
    onClose,
    zIndex,
    onFocus,
}) {
    const modal = MODALS[modalKey];
    const [zoom, setZoom] = useState(false);

    const { pos, isDragging, elementRef, dragHandleProps } = useDraggable({
        initial: initialPos ?? { x: 80, y: 80 },
        enabled: !isMobile,
    });

    // Wrapper onMouseDown: bring to front ONLY if click is not from an
    // interactive element. Never calls preventDefault so focus is preserved.
    const handleWrapperMouseDown = useCallback(
        (e) => {
            if (INTERACTIVE_TAGS.includes(e.target.tagName)) return;
            if (e.target.closest("input, textarea, select, button, a, label"))
                return;
            onFocus?.();
        },
        [onFocus],
    );

    if (!modal) return null;
    const { title, Component } = modal;

    const TitleBar = ({ extraRight }) => (
        <div
            {...(!isMobile ? dragHandleProps : {})}
            className="flex items-center gap-3 px-4 py-2.5 shrink-0 border-b select-none"
            style={{
                background: C.titlebar,
                borderColor: C.border,
                cursor: isMobile ? "default" : isDragging ? "grabbing" : "grab",
            }}>
            <div className="flex gap-1 items-center -ml-1.5">
                <button
                    onClick={onClose}
                    className="flex items-center justify-center w-6 h-6 md:w-5 md:h-5 rounded-full bg-transparent border-none p-0 cursor-pointer"
                    title="Close"
                    aria-label="Close">
                    <span
                        className="w-3 h-3 rounded-full block md:hover:brightness-75"
                        style={{ background: C.red }}
                    />
                </button>
                <span
                    className="w-3 h-3 rounded-full block mx-0.5"
                    style={{ background: C.yellow }}
                />
                {isMobile ? (
                    <span
                        className="w-3 h-3 rounded-full block mx-0.5"
                        style={{ background: C.green }}
                    />
                ) : (
                    <button
                        onClick={() => setZoom((z) => !z)}
                        className="flex items-center justify-center w-5 h-5 rounded-full bg-transparent border-none p-0 cursor-pointer mx-0.5"
                        title={zoom ? "Zoom out" : "Zoom in"}
                        aria-label={zoom ? "Zoom out" : "Zoom in"}>
                        <span
                            className="w-3 h-3 rounded-full block md:hover:brightness-75"
                            style={{ background: C.green }}
                        />
                    </button>
                )}
            </div>
            <span
                className="flex-1 text-center text-xs"
                style={{ color: C.muted }}>
                {title}
            </span>
            {extraRight}
        </div>
    );

    if (isMobile) {
        return (
            <div
                className="fixed inset-0 flex flex-col overflow-hidden mobile-modal-enter"
                style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    zIndex: 50,
                    paddingTop: "var(--safe-top)",
                    paddingBottom: "var(--safe-bottom)",
                    paddingLeft: "var(--safe-left)",
                    paddingRight: "var(--safe-right)",
                }}>
                <TitleBar
                    extraRight={
                        <button
                            onClick={onClose}
                            className="text-xs px-3 rounded border shrink-0"
                            style={{
                                color: C.muted,
                                borderColor: C.border,
                                background: "transparent",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                minHeight: 32,
                            }}>
                            ✕ back
                        </button>
                    }
                />
                <div
                    className="overflow-y-auto flex-1 p-5"
                    style={{
                        color: C.text,
                        fontSize: "0.9rem",
                        WebkitOverflowScrolling: "touch",
                    }}>
                    <Component />
                </div>
            </div>
        );
    }

    return (
        <div
            ref={elementRef}
            className="fixed flex flex-col rounded-xl overflow-hidden"
            onMouseDown={handleWrapperMouseDown}
            style={{
                top: 0,
                left: 0,
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom ? 1.2 : 1})`,
                transformOrigin: "top left",
                width: "min(560px, 92vw)",
                maxHeight: zoom ? "85vh" : "75vh",
                background: C.surface,
                border: `1px solid ${isDragging ? C.blue : C.border}`,
                boxShadow: isDragging
                    ? `0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px ${C.blue}44`
                    : "0 24px 80px rgba(0,0,0,0.7)",
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                zIndex,
                cursor: isDragging ? "grabbing" : "auto",
                transition: isDragging
                    ? "none"
                    : "box-shadow 0.2s, border-color 0.2s, transform 0.15s",
            }}>
            <TitleBar
                extraRight={
                    <div className="flex items-center gap-2">
                        {zoom && (
                            <span
                                className="text-xs px-1 rounded"
                                style={{
                                    color: C.green,
                                    background: `${C.green}18`,
                                }}>
                                ×1.2
                            </span>
                        )}
                        <span
                            className="text-xs"
                            style={{ color: `${C.muted}66` }}
                            title="Drag to move">
                            ⠿
                        </span>
                    </div>
                }
            />
            <div
                className="overflow-y-auto p-5"
                style={{
                    color: C.text,
                    fontSize: zoom ? "0.9rem" : "0.875rem",
                    transition: "font-size 0.15s",
                }}>
                <Component />
            </div>
        </div>
    );
}
