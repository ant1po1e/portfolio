import { C } from "../../data/colors";

export default function TerminalLine({ line }) {
  if (!line?.type) return null;

  switch (line.type) {
    case "divider":
      return <div className="my-3 border-t" style={{ borderColor: C.border }} />;

    case "system":
      return (
        <div className="mb-1" style={{ color: C.muted }}>
          <span style={{ color: C.green }}>→ </span>{line.text}
        </div>
      );

    case "input":
      return (
        <div className="mb-1">
          <span style={{ color: C.green }}>ant1po1e</span>
          <span style={{ color: C.muted }}>@portfolio</span>
          <span style={{ color: C.text }}>:~$ </span>
          <span style={{ color: C.blue }}>{line.text}</span>
        </div>
      );

    case "output":
      return <div className="mb-3 pl-1">{line.element}</div>;

    case "error":
      return (
        <div className="mb-2" style={{ color: C.red }}>
          ✗ {line.text}
        </div>
      );

    default:
      return null;
  }
}
