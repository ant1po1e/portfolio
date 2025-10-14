import { useEffect } from "react";
import { HeroSection } from "../components/HeroSection";

export const Home = () => {
	useEffect(() => {
		document.title = "Antipole | Home";
	}, []);

	return <HeroSection />;
};
