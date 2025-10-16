import { useState, useEffect } from "react";
import { ProjectCard } from "../fragments/ProjectCard";
import { AccordionFolder, AccordionFile } from "../fragments/Accordion";
import projectData from "../data/project.json";

export const ProjectSection = () => {
	const [activeContent, setActiveContent] = useState("showAll");
	const [openFolder, setOpenFolder] = useState("projects");
	const [projects, setProjects] = useState({ web: [], desktop: [], unity: [] });

	useEffect(() => {
		// Langsung gunakan data import tanpa fetch
		const categorized = { web: [], desktop: [], unity: [] };

		projectData.forEach((project) => {
			if (categorized[project.type]) {
				categorized[project.type].push(project);
			}
		});

		setProjects(categorized);
	}, []);

	const fileLabels = {
		showAll: "show-all.cs",
		web: "web.cs",
		desktop: "desktop.cs",
		unity: "unity.cs",
	};

	const renderProjectList = (list) => (
		<div className="grid md:grid-cols-2 gap-5">
			{list.map((p, i) => (
				<ProjectCard
					key={i}
					filename={p.filename}
					image={p.image}
					title={p.title}
					desc={p.desc}
					stack={p.stack}
					url={p.url}
				/>
			))}
		</div>
	);

	const renderContent = () => {
		switch (activeContent) {
			case "web":
				return (
					<div>
						<h3 className="text-[#5c6370] text-lg md:text-xl mb-4">
							// Web Projects
						</h3>
						{renderProjectList(projects.web)}
					</div>
				);
			case "desktop":
				return (
					<div>
						<h3 className="text-[#5c6370] text-lg md:text-xl mb-4">
							// Desktop Projects
						</h3>
						{renderProjectList(projects.desktop)}
					</div>
				);
			case "unity":
				return (
					<div>
						<h3 className="text-[#5c6370] text-lg md:text-xl mb-4">
							// Unity Projects
						</h3>
						{renderProjectList(projects.unity)}
					</div>
				);
			case "showAll":
			default:
				return (
					<div className="space-y-10">
						<div>
							<h3 className="text-[#5c6370] text-lg md:text-xl mb-4">
								// Web Projects
							</h3>
							{renderProjectList(projects.web)}
						</div>
						<div>
							<h3 className="text-[#5c6370] text-lg md:text-xl mb-4">
								// Desktop Projects
							</h3>
							{renderProjectList(projects.desktop)}
						</div>
						<div>
							<h3 className="text-[#5c6370] text-lg md:text-xl mb-4">
								// Unity Projects
							</h3>
							{renderProjectList(projects.unity)}
						</div>
					</div>
				);
		}
	};

	return (
		<div className="flex flex-col md:flex-row flex-grow md:border-none overflow-hidden">
			{/* Sidebar */}
			<div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-[#404551] text-[#7c7f85]">
				<AccordionFolder
					label="projects"
					isOpen={openFolder === "projects"}
					onToggle={() =>
						setOpenFolder(openFolder === "projects" ? null : "projects")
					}>
					<AccordionFile
						label="show-all.cs"
						onClick={() => setActiveContent("showAll")}
					/>
					<AccordionFile
						label="web.cs"
						onClick={() => setActiveContent("web")}
					/>
					<AccordionFile
						label="desktop.cs"
						onClick={() => setActiveContent("desktop")}
					/>
					<AccordionFile
						label="unity.cs"
						onClick={() => setActiveContent("unity")}
					/>
				</AccordionFolder>
			</div>

			{/* Content */}
			<div className="flex-1 flex flex-col h-[calc(100vh-4rem)] md:h-auto">
				<div className="hidden w-full md:block md:w-auto border-b border-[#404551] text-[#7c7f85]">
					<ul className="font-medium flex flex-col md:flex-row rtl:space-x-reverse">
						<li>
							<span className="inline-block py-2 px-3">
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

				{/* Scrollable Content */}
				<div className="flex-grow justify-start items-start text-sm md:text-base text-start p-5 overflow-auto scrollbar scrollbar-thumb-white scrollbar-track-[#282c34] md:pb-0 pb-[300px]">
					{renderContent()}
				</div>
			</div>
		</div>
	);
};
