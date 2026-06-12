import { useRef, useState } from "react";
import { C } from "../../data/colors";
import { CONTACT_DATA } from "../../data/content";

const INPUT_STYLE = {
    width: "100%",
    background: "#0D1117",
    border: `1px solid #21262D`,
    borderRadius: 6,
    color: "#E6EDF3",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: "0.8rem",
    padding: "8px 12px",
    outline: "none",
    boxSizing: "border-box",
};

export default function ContactModal() {
    const formRef = useRef(null);
    const alertRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [focusedField, setFocused] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(formRef.current);
            const body = new URLSearchParams(formData).toString();
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body,
            });
            if (res.ok) {
                formRef.current.reset();
                setShowAlert(true);
                setTimeout(() => alertRef.current?.focus(), 100);
                setTimeout(() => setShowAlert(false), 3000);
            } else {
                alert("Something went wrong! Please try again later.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong! Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Highlight border on focus — inline so it works without Tailwind JIT
    const fieldStyle = (name) => ({
        ...INPUT_STYLE,
        borderColor: focusedField === name ? C.blue : C.border,
        transition: "border-color 0.15s",
    });

    return (
        <div className="text-sm">
            {/* Header */}
            <p className="mb-3" style={{ color: C.green }}>
                $ echo "Let's build something together"
            </p>
            <p className="mb-5 leading-7" style={{ color: C.text }}>
                I'm always open to interesting projects, collaborations, or just
                a good chat about tech. Feel free to reach out through any
                channel below.
            </p>

            {/* Contact rows */}
            {CONTACT_DATA.map(({ platform, handle, icon }) => (
                <div
                    key={platform}
                    className="flex items-center gap-3 py-2.5 border-b"
                    style={{ borderColor: C.border }}>
                    <span
                        className="w-5 text-center"
                        style={{ color: C.purple }}>
                        {icon}
                    </span>
                    <span className="w-20 shrink-0" style={{ color: C.blue }}>
                        {platform}
                    </span>
                    <span style={{ color: C.text }}>{handle}</span>
                </div>
            ))}

            {/* Form section */}
            <div
                className="mt-5 pt-4 border-t"
                style={{ borderColor: C.border }}>
                <p className="mb-4 text-xs" style={{ color: C.muted }}>
                    <span style={{ color: C.green }}>$</span> ./send-message.sh
                </p>

                <form
                    ref={formRef}
                    name="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-3">
                    {/* Name */}
                    <div>
                        <label
                            className="block mb-1 text-xs"
                            style={{ color: C.muted }}>
                            <span style={{ color: C.blue }}>--name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your name"
                            style={fieldStyle("name")}
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused(null)}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            className="block mb-1 text-xs"
                            style={{ color: C.muted }}>
                            <span style={{ color: C.blue }}>--email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="your@email.com"
                            style={fieldStyle("email")}
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label
                            className="block mb-1 text-xs"
                            style={{ color: C.muted }}>
                            <span style={{ color: C.blue }}>--message</span>
                        </label>
                        <textarea
                            name="message"
                            required
                            rows={4}
                            placeholder="Your message..."
                            style={{
                                ...fieldStyle("message"),
                                resize: "vertical",
                            }}
                            onFocus={() => setFocused("message")}
                            onBlur={() => setFocused(null)}
                        />
                    </div>

                    {/* Success alert */}
                    {showAlert && (
                        <div
                            ref={alertRef}
                            tabIndex={-1}
                            role="alert"
                            aria-live="polite"
                            className="flex items-center gap-3 px-3 py-2.5 rounded text-xs"
                            style={{
                                background: `${C.green}18`,
                                border: `1px solid ${C.green}55`,
                                color: C.green,
                            }}>
                            <span>✓</span>
                            <span>
                                <strong>Thanks!</strong> Your message has been
                                submitted.
                            </span>
                        </div>
                    )}

                    {/* Submit */}
                    <div className="pt-1">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 rounded text-xs md:transition-colors md:duration-150"
                            style={{
                                background: loading
                                    ? `${C.green}18`
                                    : `${C.green}22`,
                                border: `1px solid ${C.green}66`,
                                color: C.green,
                                fontFamily: "inherit",
                                cursor: loading ? "not-allowed" : "pointer",
                                opacity: loading ? 0.7 : 1,
                            }}
                            onMouseEnter={(e) => {
                                if (!loading)
                                    e.currentTarget.style.background = `${C.green}33`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = `${C.green}22`;
                            }}>
                            {loading ? (
                                <>
                                    <span
                                        className="inline-block"
                                        style={{
                                            animation:
                                                "spin 1s linear infinite",
                                        }}>
                                        ↻
                                    </span>{" "}
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <span>▶</span> run
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <p className="mt-4 text-xs" style={{ color: C.muted }}>
                <span style={{ color: C.green }}>→</span> Response time: usually
                within 24h
            </p>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
