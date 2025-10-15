import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
	const location = useLocation();
	const [activePage, setActivePage] = useState(location.pathname);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		setActivePage(location.pathname);
	}, [location]);

	const handleToggle = (path) => {
		setActivePage(path);
		setMenuOpen(false); // Tutup menu setelah klik link
	};

	const getLinkClass = (path) =>
		`block py-2 px-3 md:border-r border-[#404551] transition duration-300 ${
			activePage === path
				? "shadow-[inset_0_-3px_0_0_rgba(92,65,139)] bg-[#282c34] text-white"
				: "text-[#7c7f85] md:hover:text-white"
		}`;

	// fungsi untuk menampilkan nama file aktif di mobile
	const getCurrentPageName = () => {
		switch (activePage) {
			case "/about":
				return "about.sln";
			case "/projects":
				return "projects.sln";
			case "/contact":
				return "contact.sln";
			default:
				return "ant1po1e.sln";
		}
	};

	return (
		<nav className="md:rounded-t-lg border border-[#404551]">
			<div className="min-w-screen-2xl flex flex-wrap items-center justify-between mx-auto">
				{/* Desktop Navbar */}
				<div
					className={`${
						menuOpen ? "block" : "hidden"
					} w-full mb-5 md:mb-0 md:block md:w-auto`}
					id="navbar-default">
					<ul className="font-medium flex flex-col md:flex-row rtl:space-x-reverse">
						<li>
							<Link
								to="/"
								onClick={() => handleToggle("/")}
								className={`${getLinkClass(
									"/"
								)} md:rounded-tl-lg pr-12`}>
								ant1po1e.sln
							</Link>
						</li>
						<li>
							<Link
								to="/about"
								onClick={() => handleToggle("/about")}
								className={getLinkClass("/about")}>
								about.sln
							</Link>
						</li>
						<li>
							<Link
								to="/projects"
								onClick={() => handleToggle("/projects")}
								className={getLinkClass("/projects")}>
								projects.sln
							</Link>
						</li>
						<li>
							<Link
								to="/contact"
								onClick={() => handleToggle("/contact")}
								className={getLinkClass("/contact")}>
								contact.sln
							</Link>
						</li>
					</ul>
				</div>

				{/* Mobile Navbar */}
				<div className="flex items-center justify-between w-full md:hidden px-3 py-2 text-white">
					<span className="text-white select-none">{getCurrentPageName()}</span>
					<button
						type="button"
						onClick={() => setMenuOpen(!menuOpen)}
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 md:hover:bg-gray-700 focus:ring-gray-600"
						aria-controls="navbar-default"
						aria-expanded={menuOpen}>
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>
				</div>
			</div>
		</nav>
	);
};
