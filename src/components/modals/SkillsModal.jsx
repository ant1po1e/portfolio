import { C } from "../../data/colors";
import { SKILLS_DATA } from "../../data/content";

export default function SkillsModal() {
  return (
    <div className="text-sm">
      <p className="mb-3 text-xs" style={{ color: C.muted }}>
        {`{ `}<span style={{ color: C.yellow }}>"skills"</span>{`: {`}
      </p>
      {SKILLS_DATA.map(({ category, items, color }) => (
        <div key={category} className="mb-4 pl-4">
          <p className="mb-2">
            <span style={{ color: C.yellow }}>"{category}"</span>
            <span style={{ color: C.text }}>: [</span>
          </p>
          <div className="pl-4 flex flex-wrap gap-2 mb-1">
            {items.map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 rounded text-xs border"
                style={{ color, background: `${color}18`, borderColor: `${color}55` }}
              >
                {item}
              </span>
            ))}
          </div>
          <span style={{ color: C.text }}>]</span>
        </div>
      ))}
      <p style={{ color: C.muted }}>{"}}"}</p>
    </div>
  );
}
