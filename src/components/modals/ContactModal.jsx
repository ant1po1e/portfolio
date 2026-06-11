import { C } from "../../data/colors";
import { CONTACT_DATA } from "../../data/content";
import { useRef, useState } from "react";

export default function ContactModal() {
    const formRef = useRef(null);
    const alertRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const scriptURL = "/api/contact";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const form = formRef.current;
            const formData = new FormData(form);

            const urlEncoded = new URLSearchParams();
            for (let pair of formData.entries()) {
                urlEncoded.append(pair[0], pair[1]);
            }

            const response = await fetch(scriptURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: urlEncoded.toString(),
            });

            if (response.ok) {
                form.reset();
                setShowAlert(true);

                setTimeout(() => {
                    if (alertRef.current) {
                        alertRef.current.focus();
                    }
                }, 100);

                setTimeout(() => setShowAlert(false), 3000);
            } else {
                alert("Something went wrong! Please try again later.");
            }
        } catch (error) {
            console.error("Error!", error.message);
            alert("Something went wrong! Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-sm">
            <p className="mb-3" style={{ color: C.green }}>
                $ echo "Let's build something together"
            </p>
            <p className="mb-5 leading-7" style={{ color: C.text }}>
                I'm always open to interesting projects, collaborations, or just
                a good chat about tech. Feel free to reach out through any
                channel below.
            </p>
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

            <div className="text-center mt-5 w-full px-4 py-4 border-t-2 border-t-black text-white">
                <form
                    ref={formRef}
                    name="Ant1po1e-contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-4 max-w-md mx-auto"
                    aria-describedby="contact-description">
                    <p id="contact-description" className="sr-only">
                        Fill out this form to send me a message
                    </p>

                    <div>
                        <label htmlFor="name" className="sr-only">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            required
                            aria-label="Your name"
                            className="w-full bg-slate-700/50 shadow-lg text-white text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder:text-slate-300 transition duration-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                            aria-label="Your email address"
                            className="w-full bg-slate-700/50 shadow-lg text-white text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder:text-slate-300 transition duration-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="sr-only">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Your message"
                            rows="4"
                            required
                            aria-label="Your message"
                            className="w-full bg-slate-700/50 shadow-lg text-white text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder:text-slate-300 transition duration-300 resize-none"></textarea>
                    </div>

                    {/* Success alert */}
                    {showAlert && (
                        <div
                            ref={alertRef}
                            tabIndex={-1}
                            className="items-center justify-center w-full text-center mb-8 p-4 space-x-4 rounded-lg shadow text-green-400 divide-gray-700 bg-white border border-green-300 flex transition-opacity duration-300"
                            role="alert"
                            aria-live="polite">
                            <i className="bi bi-send" aria-hidden="true"></i>
                            <div className="pl-1 text-sm font-normal">
                                <span className="font-bold">Thanks!</span> Your
                                message has been submitted.
                            </div>
                        </div>
                    )}

                    {/* Submit button */}
                    <div className="text-center flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            aria-busy={loading}
                            className="relative flex h-[50px] w-24 md:hover:w-40 items-center justify-center overflow-hidden rounded-lg bg-slate-700/50 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-green-400 before:duration-500 before:ease-out md:hover:shadow-green-400 md:hover:before:h-56 md:hover:before:w-56 duration-300">
                            <span className="relative z-10">
                                {loading ? (
                                    <i
                                        className="bi bi-arrow-clockwise animate-spin inline-block"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    "Submit"
                                )}
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            <p className="mt-4 text-xs" style={{ color: C.muted }}>
                <span style={{ color: C.green }}>→</span> Response time: usually
                within 24h
            </p>
        </div>
    );
}
