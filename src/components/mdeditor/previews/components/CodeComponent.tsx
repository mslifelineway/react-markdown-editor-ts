import {
  CodeComponent as CodeComponentType,
  CodeProps,
} from "react-markdown/lib/ast-to-react";
import { HighlightCode } from "../highlight";
import { MermaidCode } from "../mermaid";
import { katexCode } from "../katex";
import { DefaultCode } from "../defaultCode";
import { allowedLanguages } from "../../constants";
import { checkAllowedLanguage } from "../../helpers";

export const CodeComponent: CodeComponentType = (codeProps: CodeProps) => {
  const language = codeProps.className || "";

  if (checkAllowedLanguage(allowedLanguages.katex, language)) {
    const result = katexCode(codeProps);
    if (result) {
      return result;
    }
  }

  if (
    checkAllowedLanguage(allowedLanguages.js, language) ||
    checkAllowedLanguage(allowedLanguages.jsx, language) ||
    checkAllowedLanguage(allowedLanguages.ts, language) ||
    checkAllowedLanguage(allowedLanguages.tsx, language)
  ) {
    const result = HighlightCode(codeProps);
    if (result) {
      return result;
    }
  }
  if (checkAllowedLanguage(allowedLanguages.mermaid, language)) {
    const result = <MermaidCode {...codeProps} />;
    if (result) {
      return result;
    }
  }
  return <DefaultCode {...codeProps} />;
};
