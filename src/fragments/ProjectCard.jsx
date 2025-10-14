export const ProjectCard = ({ filename, image, title, desc, stack, url }) => {
	return (
		<div className="bg-[#21252b] rounded-lg overflow-hidden shadow-md border border-[#404551]">
			{/* Topbar ala VSCode */}
			<div className="flex items-center space-x-2 px-3 py-2 border-b border-[#404551] bg-[#282c34]">
				<span className="w-3 h-3 bg-red-500 rounded-full"></span>
				<span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
				<span className="w-3 h-3 bg-green-500 rounded-full"></span>
				<span className="ml-auto text-[#888] text-xs select-none font-mono">
					{filename}
				</span>
			</div>

			{/* Image + Hover overlay */}
			<div className="relative group">
				<img
					src={image}
					alt={title}
					className="w-full h-auto object-cover transition duration-300"
				/>
				<div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300">
					<div className="bg-white bg-opacity-70 px-4 py-4 rounded">
						<img
							src={`https://skillicons.dev/icons?i=${stack}`}
							alt="Stack"
							className="h-10"
						/>
					</div>
				</div>
			</div>

			{/* Text info */}
			<div className="p-4 font-mono text-white">
				<h4 className="font-bold text-base md:text-lg mb-1">{title}</h4>
				<p className="text-[#7c7f85] text-sm md:text-base">{desc}</p>

				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="relative flex text-sm md:text-base items-center justify-start mt-2 py-2 pl-4 pr-12 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded md:hover:pl-10 md:hover:pr-6 group">
					View Project
					<span className="absolute left-0 pl-2.5 -translate-x-12 md:group-hover:translate-x-0 ease-out duration-200">
						&gt;
					</span>
				</a>
			</div>
		</div>
	);
};
