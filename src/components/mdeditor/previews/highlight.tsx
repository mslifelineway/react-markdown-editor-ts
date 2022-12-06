import { useState } from "react";
import { getCodeString } from "rehype-rewrite";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { IoCopyOutline } from "react-icons/io5";
import { BiCheck } from "react-icons/bi";
import { checkAllowedLanguage } from "../helpers";
import { allowedLanguages } from "../constants";

/**
 * highlight js, jsx ts or tsx code
 * @param param0
 * @returns
 */
export const HighlightCode = ({
  inline,
  children = [],
  className,
  ...props
}: CodeProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const txt = children[0] || "";

  const code =
    props.node && props.node.children
      ? getCodeString(props.node.children)
      : txt;

  const handleCopy = () => {
    if (typeof code === "string") {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  if (
    typeof code === "string" &&
    typeof className === "string" &&
    (checkAllowedLanguage(allowedLanguages.js, className.toLocaleLowerCase()) ||
      checkAllowedLanguage(
        allowedLanguages.jsx,
        className.toLocaleLowerCase()
      ) ||
      checkAllowedLanguage(
        allowedLanguages.ts,
        className.toLocaleLowerCase()
      ) ||
      checkAllowedLanguage(allowedLanguages.tsx, className.toLocaleLowerCase()))
  ) {
    return (
      <div style={{ position: "relative" }} className="highlight">
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
            zIndex: 1,
            border: `1px solid ${isCopied ? "green" : `rgb(0, 119, 170)`}`,
            color: isCopied ? "green" : `rgb(0, 119, 170)`,
            padding: "3px",
            borderRadius: "4px",
            fontSize: "14px",
            display: "flex",
          }}
          onClick={handleCopy}
        >
          {isCopied ? <BiCheck /> : <IoCopyOutline />}
        </div>
        <SyntaxHighlighter language="javascript">{code}</SyntaxHighlighter>
      </div>
    );
  }
};
