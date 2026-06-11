import { C } from "../../data/colors";
import { CONTACT_DATA } from "../../data/content";

export default function ContactModal() {
  return (
    <div className="text-sm">
      <p className="mb-3" style={{ color: C.green }}>
        $ echo "Let's build something together"
      </p>
      <p className="mb-5 leading-7" style={{ color: C.text }}>
        I'm always open to interesting projects, collaborations, or just a
        good chat about tech. Feel free to reach out through any channel below.
      </p>
      {CONTACT_DATA.map(({ platform, handle, icon }) => (
        <div
          key={platform}
          className="flex items-center gap-3 py-2.5 border-b"
          style={{ borderColor: C.border }}
        >
          <span className="w-5 text-center" style={{ color: C.purple }}>{icon}</span>
          <span className="w-20 shrink-0" style={{ color: C.blue }}>{platform}</span>
          <span style={{ color: C.text }}>{handle}</span>
        </div>
      ))}
      <p className="mt-4 text-xs" style={{ color: C.muted }}>
        <span style={{ color: C.green }}>→</span> Response time: usually within 24h
      </p>
    </div>
  );
}
