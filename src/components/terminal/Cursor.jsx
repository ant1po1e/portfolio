import { useState, useEffect } from "react";
import { C } from "../../data/colors";
import useIsMobile from "../../hooks/useIsMobile";

export default function Cursor() {
  const isMobile = useIsMobile();
  const [on, setOn] = useState(true);

  useEffect(() => {
    if (isMobile) return;
    const t = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(t);
  }, [isMobile]);

  return (
    <span
      className="inline-block w-2 align-text-bottom"
      style={{
        height: "1.1em",
        background: C.green,
        marginLeft: 1,
        opacity: isMobile ? 1 : (on ? 1 : 0),
      }}
    />
  );
}
