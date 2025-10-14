import { Typewriter } from "react-simple-typewriter";

export const HeroSection = () => {
	return (
		<div className="flex flex-col md:flex-row flex-grow justify-center items-center p-4 md:p-10">
			<div className="mx-auto text-start w-full md:w-1/2">
				<h1 className="text-white text-4xl md:text-7xl">Yudha Pratama</h1>

				<div className="flex flex-wrap justify-center md:justify-start mx-auto mt-1 md:mt-3 text-xl md:text-3xl neon">
					<div
						className="font-mono font-medium code-pink"
						aria-label="Roles I do">
						<Typewriter
							words={[
								"> Web Developer",
								"> Game Developer",
								"> Photographer",
							]}
							cursor
							delaySpeed={2000}
							loop
						/>
					</div>
				</div>

				<pre className="flex flex-wrap justify-start mt-3">
					<code className="text-base mb-5">
						<span className="code-gray">
							// Simplicity meets functionality. <br />
							// Powered by coffee & code. <br />
						</span>
						<span className="code-pink">public string</span>
						<span className="code-blue"> GetAlias</span>
						<span className="code-default">() {"{"}</span> <br />
						<span className="code-purple">{"\t"}return </span>
						<span className="code-green">"ant1po1e"</span>
						<span className="code-gray">;</span> <br />
						<span className="code-default">{"}"}</span>
					</code>
				</pre>
			</div>

			<div className="mx-auto">
				<div className="relative w-full h-full md:w-80 md:h-80 rounded-xl overflow-hidden shadow-xl border border-[#404551] bg-[#282c34] backdrop-blur-sm">
					<div className="flex items-center space-x-2 px-3 py-2 bg-[#282c34] border-b border-[#404551]">
						<span className="w-3 h-3 bg-red-500 rounded-full"></span>
						<span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
						<span className="w-3 h-3 bg-green-500 rounded-full"></span>
						<span className="ml-auto text-[#888] text-xs select-none">
							profile.webp
						</span>
					</div>

					{/* Kalau ada di public/img/profile.webp → src="/img/profile.webp" */}
					<img
						src="/profile.webp"
						alt="Antipole Art"
						className="object-cover w-full h-full"
					/>
				</div>
			</div>
		</div>
	);
};
