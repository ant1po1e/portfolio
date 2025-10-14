export const Footer = () => {
	return (
		<footer className="w-full md:rounded-b-lg shadow-sm border border-[#404551]">
			<div className="w-full mx-auto min-w-screen-2xl flex md:items-center justify-between">
				{/* Socials */}
				<ul className="font-medium flex flex-row rtl:space-x-reverse py-3 md:py-0">
					<li>
						<span className="md:block py-2 px-4 md:border-r border-[#404551] text-[#7c7f85] transition duration-300">
							Socials:
						</span>
					</li>
					<li>
						<a
							href="https://linkedin.com/in/apriansyah-yudha-pratama-805795265/"
							className="md:block py-2 md:px-4 md:border-r border-[#404551] text-[#7c7f85] hover:text-white transition duration-300">
							<i class="bi bi-linkedin" />
						</a>
					</li>
					<li>
						<a
							href="https://www.instagram.com/antipole.dev/"
							className="md:block py-2 px-4 md:border-r border-[#404551] text-[#7c7f85] hover:text-white transition duration-300">
							<i class="bi bi-instagram" />
						</a>
					</li>
				</ul>

				{/* Github */}
				<ul className="py-3 md:py-0">
					<li>
						<a
							href="https://github.com/ant1po1e"
							className="md:block py-2 px-3 md:border-l border-[#404551] text-[#7c7f85] hover:text-white transition duration-300">
							<i class="bi bi-github" /> @ant1po1e
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};
