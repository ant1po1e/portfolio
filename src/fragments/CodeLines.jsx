// src/fragments/CodeLines.jsx
import React from "react";

/**
 * CodeLine
 * props:
 *  - number: nomor baris (number)
 *  - children: konten (bisa React nodes)
 *  - highlight (optional): boolean untuk highlight baris
 */
export const CodeLine = ({ number, children, highlight = false }) => {
	return (
		<div className="flex items-start">
			<div className="w-10 text-right select-none pr-4 text-[#3e4451]">
				{number}
			</div>
			<div
				className={`flex-1 font-mono text-sm md:text-base leading-6 whitespace-pre ${
					highlight ? "bg-white/5 rounded px-2" : ""
				}`}>
				{children}
			</div>
		</div>
	);
};
