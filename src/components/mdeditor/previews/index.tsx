import { CodeProps } from "react-markdown/lib/ast-to-react";
import { HighlightCode } from "./highlight";
import { MermaidCode } from "./mermaid";
import { katexCode } from "./katex";

const CustomCodeComponent = (codeProps: CodeProps) => {
  const katexResult = katexCode(codeProps);
  if (katexResult) return katexResult;

  const HighlightCodeResult = HighlightCode(codeProps);
  if (HighlightCodeResult) return HighlightCodeResult;

  return <MermaidCode {...codeProps} />;
};

export const previewOptions = {
  components: {
    code: CustomCodeComponent,
  },
};
