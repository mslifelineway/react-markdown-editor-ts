import { useState } from "react";
import { getCodeString } from "rehype-rewrite";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { IoCopyOutline } from "react-icons/io5";
import { BiCheckDouble } from "react-icons/bi";

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
}: CodeProps): JSX.Element | null => {
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
    /^language-jsx/.test(className.toLocaleLowerCase())
  ) {
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
          }}
          onClick={handleCopy}
        >
          {isCopied ? (
            <BiCheckDouble style={{ color: "green" }} />
          ) : (
            <IoCopyOutline style={{ color: `rgb(0, 119, 170)` }} />
          )}
        </div>
        <SyntaxHighlighter language="javascript">{code}</SyntaxHighlighter>
      </>
    );
  }
  console.log("===> null resp..........");
  return null;
};
