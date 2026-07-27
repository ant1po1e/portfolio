import { useEffect, useState } from "react";
import { C } from "../../data/colors";
import { CV_DATA } from "../../data/content";
import useIsMobile from "../../hooks/useIsMobile";

export default function CVModal() {
    const isMobile = useIsMobile();
    const [status, setStatus] = useState("checking"); // checking | ok | missing

    useEffect(() => {
        let cancelled = false;
        fetch(CV_DATA.pdfPath, { method: "HEAD" })
            .then((res) => {
                if (!cancelled) setStatus(res.ok ? "ok" : "missing");
            })
            .catch(() => {
                if (!cancelled) setStatus("missing");
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const Toolbar = () => (
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
            <p className="text-xs" style={{ color: C.muted }}>
                <span style={{ color: C.green }}>$</span> cat {CV_DATA.pdfPath}
            </p>
            <div className="flex items-center gap-2">
                <a
                    href={status === "ok" ? CV_DATA.pdfPath : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={status !== "ok"}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs md:transition-colors md:duration-150"
                    style={{
                        border: `1px solid ${C.border}`,
                        color: status === "ok" ? C.blue : C.muted,
                        textDecoration: "none",
                        opacity: status === "ok" ? 1 : 0.4,
                        pointerEvents: status === "ok" ? "auto" : "none",
                    }}>
                    <span>↗</span> open tab
                </a>
                <a
                    href={status === "ok" ? CV_DATA.pdfPath : undefined}
                    download={CV_DATA.fileName}
                    aria-disabled={status !== "ok"}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs md:transition-colors md:duration-150"
                    style={{
                        background: status === "ok" ? `${C.green}22` : "transparent",
                        border: `1px solid ${status === "ok" ? C.green + "66" : C.border}`,
                        color: status === "ok" ? C.green : C.muted,
                        textDecoration: "none",
                        opacity: status === "ok" ? 1 : 0.4,
                        pointerEvents: status === "ok" ? "auto" : "none",
                    }}
                    onMouseEnter={(e) => {
                        if (status === "ok")
                            e.currentTarget.style.background = `${C.green}33`;
                    }}
                    onMouseLeave={(e) => {
                        if (status === "ok")
                            e.currentTarget.style.background = `${C.green}22`;
                    }}>
                    <span>⭳</span> download
                </a>
            </div>
        </div>
    );

    if (status === "checking") {
        return (
            <div className="text-sm">
                <Toolbar />
                <p style={{ color: C.muted }}>Loading cv.pdf…</p>
            </div>
        );
    }

    if (status === "missing") {
        return (
            <div className="text-sm">
                <Toolbar />
                <div
                    className="rounded-md p-4 text-xs leading-6"
                    style={{
                        border: `1px dashed ${C.border}`,
                        color: C.muted,
                    }}>
                    <p className="mb-2" style={{ color: C.red }}>
                        cat: {CV_DATA.pdfPath}: No such file
                    </p>
                    <p>
                        Taruh file PDF CV kamu di{" "}
                        <code style={{ color: C.yellow }}>
                            public{CV_DATA.pdfPath}
                        </code>{" "}
                        lalu build ulang / refresh. Path ini bisa diganti di{" "}
                        <code style={{ color: C.yellow }}>
                            src/data/content.js
                        </code>{" "}
                        (<code style={{ color: C.yellow }}>CV_DATA.pdfPath</code>).
                    </p>
                </div>
            </div>
        );
    }

    // status === "ok"
    return (
        <div className="text-sm">
            <Toolbar />

            {isMobile ? (
                // Most mobile browsers don't render <iframe> PDFs reliably,
                // so we show a clear call-to-action instead of a broken embed.
                <div
                    className="flex flex-col items-center justify-center gap-3 rounded-md p-8 text-center"
                    style={{ border: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: "2rem" }}>📄</span>
                    <p style={{ color: C.text }}>{CV_DATA.fileName}</p>
                    <a
                        href={CV_DATA.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded text-xs"
                        style={{
                            background: `${C.green}22`,
                            border: `1px solid ${C.green}66`,
                            color: C.green,
                            textDecoration: "none",
                        }}>
                        Buka CV
                    </a>
                </div>
            ) : (
                <iframe
                    src={CV_DATA.pdfPath}
                    title="CV"
                    className="w-full rounded-md"
                    style={{
                        height: "65vh",
                        border: `1px solid ${C.border}`,
                        background: "#fff",
                    }}
                />
            )}
        </div>
    );
}
