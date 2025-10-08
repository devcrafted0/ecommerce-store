import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";

export default function BodyPortal({ children }: { children: ReactNode }) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const el: HTMLDivElement = document.createElement("div");
    document.body.appendChild(el);
    setContainer(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  if (!container) return null;

  return createPortal(children, container);
}
