import { C } from "../../data/colors";

/**
 * Command registry.
 * Each entry:
 *   output  — React element shown inline in the terminal
 *   modal?  — key passed to TerminalModal (optional)
 */
const COMMANDS = {
  help: {
    output: (
      <div>
        <p className="mb-2" style={{ color: C.green }}>Available commands:</p>
        {[
          ["about",    "Learn about me"],
          ["profile",   "View my profile picture"],
          ["skills",   "My technical skills"],
          ["projects", "What I've built"],
          ["contact",  "Get in touch"],
          ["clear",    "Clear terminal"],
          ["help",     "Show this help message"],
        ].map(([cmd, desc]) => (
          <div key={cmd} className="flex gap-4 mb-1">
            <span className="w-20 shrink-0" style={{ color: C.blue }}>{cmd}</span>
            <span style={{ color: C.muted }}>— {desc}</span>
          </div>
        ))}
      </div>
    ),
  },
  about:    { modal: "about",    output: <span style={{ color: C.muted }}>Opening about.txt…</span>    },
  skills:   { modal: "skills",   output: <span style={{ color: C.muted }}>Loading skills.json…</span>  },
  projects: { modal: "projects", output: <span style={{ color: C.muted }}>Fetching projects…</span>    },
  contact:  { modal: "contact",  output: <span style={{ color: C.muted }}>Opening contact.sh…</span>   },
  profile:  { modal: "profile",  output: <span style={{ color: C.muted }}>Opening profile.webp…</span>   },
};

export default COMMANDS;
