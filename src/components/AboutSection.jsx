import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { AccordionFolder, AccordionFile } from "../fragments/Accordion";
import { CodeLine } from "../fragments/CodeLines";
import aboutData from "../data/about.json";
import educationData from "../data/education.json";
import experienceData from "../data/experience.json";
import contactData from "../data/contact.json";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const AboutSection = () => {
	const [activeContent, setActiveContent] = useState("about");
	const [openFolder, setOpenFolder] = useState("personal-info");
	const [numPages, setNumPages] = useState(null);
	const [scale, setScale] = useState(1.2);

	const fileLabels = {
		about: "about.cs",
		experience: "experience.cs",
		education: "education.cs",
		cv: "cv.pdf",
		contact: "contact.cs",
	};

	const colorMap = {
		"code-gray": "code-gray",
		"code-pink": "code-pink",
		"code-blue": "code-blue",
		"code-default": "code-default",
		"code-yellow": "code-yellow",
		"code-green": "code-green",
		"code-orange": "code-orange",
	};

	const renderCodeFromJson = (lines) => (
		<pre className="mt-3">
			<code className="block">
				{lines.map((segments, idx) => (
					<CodeLine key={idx} number={idx + 1}>
						<span className="whitespace-pre">
							{segments.map((seg, sidx) => {
								const cls = seg.cls ? colorMap[seg.cls] || seg.cls : "";
								return (
									<span className={cls} key={sidx}>
										{seg.text}
									</span>
								);
							})}
						</span>
					</CodeLine>
				))}
			</code>
		</pre>
	);

	const PdfToolbar = () => (
		<div className="flex justify-between items-center bg-[#1e2228] border-b border-[#404551] px-4 py-2 text-sm text-[#cfd2d8] sticky top-0 z-10">
			<div className="flex items-center gap-3">
				<button
					onClick={() => setScale((s) => Math.min(s + 0.1, 2))}
					className="hover:text-white transition">
					<i className="bi bi-zoom-in"></i>
				</button>
				<button
					onClick={() => setScale((s) => Math.max(s - 0.1, 0.8))}
					className="hover:text-white transition">
					<i className="bi bi-zoom-out"></i>
				</button>
			</div>
			<div className="flex items-center gap-3">
				<button
					onClick={() => window.open("/img/cv.pdf", "_blank")}
					className="hover:text-white transition">
					<i className="bi bi-download"></i> Download
				</button>
				<button
					onClick={() => window.print()}
					className="hover:text-white transition">
					<i className="bi bi-printer"></i> Print
				</button>
			</div>
		</div>
	);

	const content = {
		about: renderCodeFromJson(aboutData),
		experience: renderCodeFromJson(experienceData),
		education: renderCodeFromJson(educationData),
		cv: (
			<div className="flex flex-col w-full h-full overflow-auto bg-[#21252b]">
				<PdfToolbar />
				<div className="flex flex-col items-center py-5">
					<Document
						file="/cv.pdf"
						onLoadSuccess={({ numPages }) => setNumPages(numPages)}
						loading={<p className="text-[#7c7f85]">Loading CV...</p>}>
						{Array.from(new Array(numPages), (el, index) => (
							<Page
								key={`page_${index + 1}`}
								pageNumber={index + 1}
								scale={scale}
								renderAnnotationLayer={false}
								renderTextLayer={false}
								className="shadow-lg mb-5"
							/>
						))}
					</Document>
				</div>
			</div>
		),
		contact: renderCodeFromJson(contactData),
	};

	return (
		<div className="flex flex-col md:flex-row flex-grow md:border-none">
			{/* Sidebar */}
			<div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-[#404551] text-[#7c7f85]">
				<AccordionFolder
					label="personal-info"
					isOpen={openFolder === "personal-info"}
					onToggle={() =>
						setOpenFolder(
							openFolder === "personal-info" ? null : "personal-info"
						)
					}>
					<AccordionFile
						label="about.cs"
						onClick={() => setActiveContent("about")}
					/>
					<AccordionFile
						label="experience.cs"
						onClick={() => setActiveContent("experience")}
					/>
					<AccordionFile
						label="education.cs"
						onClick={() => setActiveContent("education")}
					/>
				</AccordionFolder>

				<AccordionFolder
					label="other"
					isOpen={openFolder === "other"}
					onToggle={() =>
						setOpenFolder(openFolder === "other" ? null : "other")
					}>
					<AccordionFile
						label="cv.pdf"
						onClick={() => setActiveContent("cv")}
					/>
					<AccordionFile
						label="contact.cs"
						onClick={() => setActiveContent("contact")}
					/>
				</AccordionFolder>
			</div>

			{/* Content */}
			<div className="flex-1 flex flex-col">
				{/* Dynamic Header (show file name) */}
				<div className="hidden w-full md:block md:w-auto border-b border-[#404551] text-[#7c7f85]">
					<ul className="font-medium flex flex-col md:flex-row rtl:space-x-reverse">
						<li>
							<span className="inline-block py-2 px-3" id="content-title">
								{fileLabels[activeContent]}
							</span>
							<a
								href="/"
								className="hover:text-white transition duration-300 border-r border-[#404551] inline-block py-2 px-3"
								aria-label="Close file">
								<i className="bi bi-x-lg" />
							</a>
						</li>
					</ul>
				</div>

				{/* Content Area */}
				<div className="flex-grow justify-start items-start text-sm md:text-base text-start p-3 md:p-5 overflow-auto scrollbar scrollbar-thumb-white scrollbar-track-[#282c34]">
					<div className="text-start">{content[activeContent]}</div>
				</div>
			</div>
		</div>
	);
};
