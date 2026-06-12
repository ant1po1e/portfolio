// useDraggable.js — tidak ada perubahan, sudah benar
import { useRef, useState, useEffect, useCallback } from "react";

export default function useDraggable({
    initial = { x: 0, y: 0 },
    enabled = true,
} = {}) {
    const [pos, setPos] = useState(enabled ? initial : { x: 0, y: 0 });
    const [isDragging, setDragging] = useState(false);
    const startRef = useRef(null);
    const elementRef = useRef(null);

    const onMouseDown = useCallback(
        (e) => {
            if (!enabled) return;
            if (e.button !== 0) return;
            const INTERACTIVE = [
                "INPUT",
                "TEXTAREA",
                "SELECT",
                "BUTTON",
                "A",
                "LABEL",
            ];
            if (INTERACTIVE.includes(e.target.tagName)) return;
            if (e.target.closest("input, textarea, select, button, a, label"))
                return;
            e.preventDefault();
            startRef.current = {
                mouseX: e.clientX,
                mouseY: e.clientY,
                posX: pos.x,
                posY: pos.y,
            };
            setDragging(true);
        },
        [enabled, pos],
    );

    useEffect(() => {
        if (!enabled || !isDragging) return;

        const onMove = (e) => {
            const { mouseX, mouseY, posX, posY } = startRef.current;
            const nextX = posX + e.clientX - mouseX;
            const nextY = posY + e.clientY - mouseY;

            const el = elementRef.current;
            if (!el) {
                setPos({ x: nextX, y: nextY });
                return;
            }

            const rect = el.getBoundingClientRect();
            const screenLeft = rect.left - pos.x + nextX;
            const screenTop = rect.top - pos.y + nextY;
            const TITLE_BAR = 44;

            const clampedScreenLeft = Math.min(
                Math.max(screenLeft, -(rect.width - TITLE_BAR)),
                window.innerWidth - TITLE_BAR,
            );
            const clampedScreenTop = Math.min(
                Math.max(screenTop, 0),
                window.innerHeight - TITLE_BAR,
            );

            setPos({
                x: nextX + (clampedScreenLeft - screenLeft),
                y: nextY + (clampedScreenTop - screenTop),
            });
        };

        const onUp = () => setDragging(false);
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
    }, [enabled, isDragging, pos]);

    return {
        pos,
        setPos,
        isDragging: enabled && isDragging,
        elementRef,
        dragHandleProps: enabled ? { onMouseDown } : {},
    };
}
