import { Sidebar } from "../components/Sidebar";
import { useEffect } from "react";
import { AboutSection } from "./../components/AboutSection";

export const About = () => {
	useEffect(() => {
		document.title = "Antipole | About";
	}, []);

	return (
		<section class="flex flex-col md:flex-row flex-grow justify-start items-stretch text-start overflow-auto md:overflow-none">
			<Sidebar />
			<AboutSection />
		</section>
	);
};
