import { useRef, useState } from "react";
import { AccordionFolder, AccordionFile } from "../fragments/Accordion";
import { CodeLine } from "../fragments/CodeLines";

export const ContactSection = () => {
	const [openFolder, setOpenFolder] = useState("contact");
	const [activeFile, setActiveFile] = useState("contact");
	const [loading, setLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const formRef = useRef(null);
	const alertRef = useRef(null);
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
					if (alertRef.current) alertRef.current.focus();
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
		<div className="flex flex-col md:flex-row flex-grow md:border-none overflow-hidden">
			{/* Sidebar */}
			<div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-[#404551] text-[#7c7f85]">
				<AccordionFolder
					label="contact"
					isOpen={openFolder === "contact"}
					onToggle={() =>
						setOpenFolder(openFolder === "contact" ? null : "contact")
					}>
					<AccordionFile
						label="contact.cs"
						onClick={() => setActiveFile("contact")}
					/>
				</AccordionFolder>
			</div>

			{/* Content Area */}
			<div className="flex-1 flex flex-col">
				{/* File Tab */}
				<div className="hidden w-full md:block md:w-auto border-b border-[#404551] text-[#7c7f85]">
					<ul className="font-medium flex flex-col md:flex-row rtl:space-x-reverse">
						<li>
							<span className="inline-block py-2 px-3">contact.cs</span>
							<a
								href="/"
								className="hover:text-white transition duration-300 border-r border-[#404551] inline-block py-2 px-3"
								aria-label="Close file">
								<i className="bi bi-x-lg" />
							</a>
						</li>
					</ul>
				</div>

				<div className="flex-grow justify-start items-start text-sm md:text-base text-start p-3 md:p-5 overflow-auto scrollbar scrollbar-thumb-white scrollbar-track-[#282c34]">
					<pre className="mt-3">
						<code className="block">
							<form
								ref={formRef}
								onSubmit={handleSubmit}
								name="Ant1po1e-contact-form">
								<CodeLine number={1}>
									<span className="code-gray">// Contact me</span>
								</CodeLine>
								<CodeLine number={2}>
									<span className="code-pink">public </span>
									<span className="code-pink">class </span>
									<span className="code-blue">Contact </span>
									<span className="code-default">&#123;</span>
								</CodeLine>

								{/* Name */}
								<CodeLine number={3}>
									<span className="code-pink">{"\t"}public </span>
									<span className="code-pink">string </span>
									<span className="code-yellow">Name </span>
									<span className="code-gray">=&gt; </span>
									<span className="code-green">"</span>
									<input
										id="name"
										name="name"
										type="text"
										placeholder="Your name"
										required
										className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 code-green placeholder-[#7f848e] w-1/2 inline-block"
									/>
									<span className="code-green">"</span>
									<span className="code-gray">;</span>
								</CodeLine>

								<CodeLine number={4}></CodeLine>

								{/* Email */}
								<CodeLine number={5}>
									<span className="code-pink">{"\t"}public </span>
									<span className="code-pink">string </span>
									<span className="code-yellow">Email </span>
									<span className="code-gray">=&gt; </span>
									<span className="code-green">"</span>
									<input
										id="email"
										name="email"
										type="email"
										placeholder="you@example.com"
										required
										className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 code-green placeholder-[#7f848e] w-1/2 inline-block"
									/>
									<span className="code-green">"</span>
									<span className="code-gray">;</span>
								</CodeLine>

								<CodeLine number={6}></CodeLine>

								{/* Message */}
								<CodeLine number={7}>
									<span className="code-pink">{"\t"}public </span>
									<span className="code-pink">string </span>
									<span className="code-yellow">Message </span>
									<span className="code-gray">=&gt; </span>
								</CodeLine>
								<CodeLine number={8}>
									<span className="code-green">{"\t\t"}"</span>
									<textarea
										id="message"
										name="message"
										rows="2"
										placeholder="Write your message here..."
										required
										className="bg-transparent block border-none p-0 focus:outline-none focus:ring-0 code-green placeholder-[#7f848e] w-full resize-none ml-16 pl-16"
									/>
								</CodeLine>
								<CodeLine number={9}>
									<span className="code-green">{"\t\t"}"</span>
									<span className="code-gray">;</span>
								</CodeLine>

								<CodeLine number={10}>
									<span className="code-default">&#125;</span>
								</CodeLine>

								{/* Submit Button */}
								<div className="mt-5 ml-8">
									<button
										type="submit"
										disabled={loading}
										className="inline-flex items-center justify-center bg-[#282c34] hover:bg-[#3a3f4b] text-[#8ee48e] px-8 py-2 rounded transition duration-200 border border-[#404552]">
										{loading ? (
											<svg
												className="w-5 h-5 animate-spin"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24">
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
												/>
											</svg>
										) : (
											<span className="flex items-center gap-2">
												<i className="bi bi-caret-right-fill"></i> Run
											</span>
										)}
									</button>
								</div>

								{/* Success Alert */}
								{showAlert && (
									<div
										ref={alertRef}
										tabIndex={-1}
										className="mt-5 text-sm text-blue-400 bg-white/5 border border-blue-300 rounded p-3 flex items-center gap-2 w-fit ml-8"
										role="alert"
										aria-live="polite">
										<i className="bi bi-send" />
										<span>
											<strong>Thanks!</strong> Your message has been submitted.
										</span>
									</div>
								)}
							</form>
						</code>
					</pre>
				</div>
			</div>
		</div>
	);
};
