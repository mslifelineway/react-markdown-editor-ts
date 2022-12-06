import { getCodeString } from "rehype-rewrite";
import katex from "katex";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { allowedLanguages } from "../constants";
import { checkAllowedLanguage } from "../helpers";

//Katext - for flowchart or diagram etc
export const katexCode = ({
  inline,
  children = [],
  className,
  ...props
}: CodeProps) => {
  const txt = children[0] || "";
  if (inline) {
    if (typeof txt === "string" && /^\$\$(.*)\$\$/.test(txt)) {
      const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, "$1"), {
        throwOnError: false,
      });
      return <code dangerouslySetInnerHTML={{ __html: html }} />;
    }
    return <code>{txt}</code>;
  }
  const code =
    props.node && props.node.children
      ? getCodeString(props.node.children)
      : txt;
  if (
    typeof code === "string" &&
    typeof className === "string" &&
    checkAllowedLanguage(allowedLanguages.katex, className.toLocaleLowerCase())
  ) {
    const html = katex.renderToString(code, {
      throwOnError: false,
    });
    return (
      <code
        style={{ fontSize: "150%" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return <code className={String(className)}>{txt}</code>;
};
