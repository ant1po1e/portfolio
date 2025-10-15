export const CodeLine = ({ number, children }) => {
	return (
		<div
			className="flex items-start font-mono leading-relaxed"
			style={{
				tabSize: 4,
				whiteSpace: "pre-wrap",
				wordBreak: "break-word",
			}}>
			<span
				className="text-[#3e4451] select-none text-right pr-4"
				style={{
					minWidth: "2.5em", 
					display: "inline-block",
				}}>
				{number}
			</span>
			<span className="flex-1">{children}</span>
		</div>
	);
};
