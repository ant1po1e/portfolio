export const Sidebar = () => {
	return (
		<div className="min-h-full text-2xl border-r border-l border-[#404551] text-[#7c7f85] hidden md:block">
			<div className="p-4 shadow-[inset_3px_0_0_0_rgba(92,65,139)] bg-[#282c34]">
				<svg
					stroke="currentColor"
					fill="currentColor"
					stroke-width="0"
					viewBox="0 0 24 24"
					className="text-[24px] text-white md:hover:cursor-pointer"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M17.5 0h-9L7 1.5V6H2.5L1 7.5v15.07L2.5 24h12.07L16 22.57V18h4.7l1.3-1.43V4.5L17.5 0zm0 2.12l2.38 2.38H17.5V2.12zm-3 20.38h-12v-15H7v9.07L8.5 18h6v4.5zm6-6h-12v-15H16V6h4.5v10.5z"></path>
				</svg>
			</div>
			<div className="p-4">
				<svg
					stroke="currentColor"
					fill="currentColor"
					stroke-width="0"
					viewBox="0 0 24 24"
					className="text-[24px] md:hover:cursor-pointer md:hover:text-white transition duration-300"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M21.007 8.222A3.738 3.738 0 0 0 15.045 5.2a3.737 3.737 0 0 0 1.156 6.583 2.988 2.988 0 0 1-2.668 1.67h-2.99a4.456 4.456 0 0 0-2.989 1.165V7.4a3.737 3.737 0 1 0-1.494 0v9.117a3.776 3.776 0 1 0 1.816.099 2.99 2.99 0 0 1 2.668-1.667h2.99a4.484 4.484 0 0 0 4.223-3.039 3.736 3.736 0 0 0 3.25-3.687zM4.565 3.738a2.242 2.242 0 1 1 4.484 0 2.242 2.242 0 0 1-4.484 0zm4.484 16.441a2.242 2.242 0 1 1-4.484 0 2.242 2.242 0 0 1 4.484 0zm8.221-9.715a2.242 2.242 0 1 1 0-4.485 2.242 2.242 0 0 1 0 4.485z"></path>
				</svg>
			</div>
		</div>
	);
};
