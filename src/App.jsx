import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Project } from "./pages/Project";
import { Contact } from "./pages/Contact";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
	return (
		<BrowserRouter>
			<div className="absolute inset-0 bg-[#16191d]/75 backdrop-blur-[5px]" />
			<div className="relative w-screen h-screen flex justify-center items-center z-10 mx-auto">
				<div className="w-full h-full p-0 md:p-12 flex flex-col justify-center items-center">
					<div class="w-full h-full bg-[#282c34]/75 backdrop-blur-md md:rounded-lg shadow-lg flex flex-col">
						<Navbar />
						<Routes>
							<Route index element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/projects" element={<Project />} />
							<Route path="/contact" element={<Contact />} />
						</Routes>
						<Footer />
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
