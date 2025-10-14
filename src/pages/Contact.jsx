import { Sidebar } from "../components/Sidebar";
import { useEffect } from "react";
import { ContactSection } from "./../components/ContactSection";

export const Contact = () => {
	useEffect(() => {
		document.title = "Antipole | Contact";
	}, []);

	return (
		<section class="flex flex-col md:flex-row flex-grow justify-start items-stretch text-start overflow-auto md:overflow-none">
			<Sidebar />
			<ContactSection />
		</section>
	);
};
