import { C } from "../../data/colors";
import { PROJECTS_DATA } from "../../data/content";

export default function ProjectsModal() {
  return (
    <div className="text-sm">
      {PROJECTS_DATA.map((p) => {
        const isActive = p.status === "active";
        return (
          <div
            key={p.name}
            className="mb-4 p-3 rounded-r-md border-l-2"
            style={{ background: `${C.border}55`, borderColor: isActive ? C.green : C.muted }}
          >
            <div className="flex justify-between items-center flex-wrap gap-2 mb-1">
              <span className="font-bold" style={{ color: C.blue }}>~/{p.name}</span>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-1.5 py-0.5 rounded border"
                  style={{ color: isActive ? C.green : C.muted, borderColor: isActive ? C.green : C.muted }}
                >
                  {p.status}
                </span>
                {p.url && p.url !== "#" ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-xs px-2 py-0.5 rounded border
                      md:transition-colors md:duration-150
                      md:hover:bg-[#58A6FF22]
                    "
                    style={{ color: C.blue, borderColor: C.blue, textDecoration: "none" }}
                  >
                    open →
                  </a>
                ) : (
                  <span
                    className="text-xs px-2 py-0.5 rounded border opacity-40"
                    style={{ color: C.muted, borderColor: C.border }}
                  >
                    open →
                  </span>
                )}
              </div>
            </div>
            <p className="mb-2" style={{ color: C.text }}>{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="text-xs" style={{ color: C.muted }}>#{s}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
