export const AccordionFolder = ({ label, children, isOpen, onToggle }) => {
	return (
		<div>
			<button
				onClick={onToggle}
				className="flex items-center w-full p-2 text-left hover:bg-[#3f4450] hover:text-white transition">
				{isOpen ? (
					<i className="bi bi-caret-down-fill mr-2" />
				) : (
					<i className="bi bi-caret-right-fill mr-2" />
				)}
				<i className="bi bi-folder-fill mr-2" />
				{label}
			</button>
			{isOpen && <div className="ml-6">{children}</div>}
		</div>
	);
};

export const AccordionFile = ({ label, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="flex items-center w-full p-2 text-left hover:bg-[#3f4450] hover:text-white transition">
			{label}
		</button>
	);
};
