import { C } from "../../data/colors";
import { ABOUT_DATA } from "../../data/content";

export default function AboutModal() {
  return (
    <div className="text-sm leading-relaxed">
      <p className="font-bold text-lg mb-1" style={{ color: C.green }}>
        # {ABOUT_DATA.name}
      </p>
      <p className="mb-4 text-xs" style={{ color: C.muted }}>
        ## {ABOUT_DATA.role}
      </p>
      {ABOUT_DATA.bio.map((para, i) => (
        <p key={i} className="mb-4 leading-7" style={{ color: C.text }}>{para}</p>
      ))}
      <div className="pt-3 mt-1 border-t" style={{ borderColor: C.border }}>
        {ABOUT_DATA.meta.map(({ key, value, highlight }) => (
          <div key={key} className="flex gap-3 mb-2">
            <span className="w-24 shrink-0" style={{ color: C.blue }}>{key}:</span>
            <span style={{ color: highlight ? C.green : C.text }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
