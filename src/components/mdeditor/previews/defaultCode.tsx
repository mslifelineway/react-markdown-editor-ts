import { getCodeString } from "rehype-rewrite";
import { CodeProps } from "react-markdown/lib/ast-to-react";

/**
 * highlight js, jsx ts or tsx code
 * @param param0
 * @returns
 */
export const DefaultCode = ({
  children = [],
  className,
  ...props
}: CodeProps): JSX.Element | null => {
  const txt = children[0] || "";

  const code =
    props.node && props.node.children
      ? getCodeString(props.node.children)
      : txt;
  return <code>{code}</code>;
};
