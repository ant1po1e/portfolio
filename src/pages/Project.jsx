import { Sidebar } from "../components/Sidebar";
import { useEffect } from "react";
import { ProjectSection } from "./../components/ProjectSection";

export const Project = () => {
	useEffect(() => {
		document.title = "Antipole | Project";
	}, []);

	return (
		<section class="flex flex-col md:flex-row flex-grow justify-start items-stretch text-start overflow-auto md:overflow-none">
			<Sidebar />
			<ProjectSection />
		</section>
	);
};
