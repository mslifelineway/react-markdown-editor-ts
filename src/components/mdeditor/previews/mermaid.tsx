import { ReactNode, useEffect, useRef } from "react";
import mermaid from "mermaid";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { checkAllowedLanguage } from "../helpers";
import { allowedLanguages } from "../constants";

export const randomid = () =>
  parseInt(String(Math.random() * 1e15), 10).toString(36);

export const getCode = (arr: ReactNode[] = []): string => {
  return arr
    .map((dt: ReactNode) => {
      if (!dt) return false;
      if (typeof dt === "string") {
        return dt;
      }
      dt = dt as JSX.Element;
      if (dt.props && dt.props.children) {
        return getCode(dt.props.children);
      }
      return false;
    })
    .filter(Boolean)
    .join("");
};

//mermaid components for maths
export const MermaidCode = ({
  inline,
  children = [],
  className,
}: CodeProps) => {
  const demoid = useRef(`dome${randomid()}`);
  const code = getCode(children);
  const demo = useRef(null);

  useEffect(() => {
    if (demo.current) {
      try {
        const str = mermaid.render(
          demoid.current,
          code,
          () => null,
          demo.current
        );
        // @ts-ignore
        demo.current.innerHTML = str;
      } catch (error) {
        // @ts-ignore
        // demo.current.innerHTML = error;
        demo.current.innerHTML = code; //we don't want to show the error, just show the code as it is
      }
    }
  }, [code, demo]);

  if (
    typeof code === "string" &&
    typeof className === "string" &&
    checkAllowedLanguage(allowedLanguages.katex, className.toLocaleLowerCase())
  ) {
    return (
      <code ref={demo}>
        <code id={demoid.current} style={{ display: "none" }} />
      </code>
    );
  }

  return (
    <code ref={demo} className="chart">
      <code className={String(className)}>{children}</code>
    </code>
  );
};
