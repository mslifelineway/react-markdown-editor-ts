import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import { customToolbar } from "./customizedToolbar";
import { previewOptions } from "./previews";
import { customCommands, extraCommands } from "./commands";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

import "./mdeditor.styles.css";
import "katex/dist/katex.css";

const defaultPlaceholder = "Please enter the markdown text!";

export enum EditorMode {
  edit = "edit",
  view = "view",
}

export type ReactMDEditorProps = {
  mode: EditorMode;
  value?: string;
  handleChange?: (value?: string) => void;
  placeholder?: string;
};

const ReactMDEditor = ({
  mode = EditorMode.edit,
  value,
  handleChange,
  placeholder = defaultPlaceholder,
}: ReactMDEditorProps) => {
  const editorProps: MDEditorProps = {
    value,
    preview: "edit",
  };

  if (mode === EditorMode.view) {
    editorProps.hideToolbar = true;
    editorProps.preview = "preview";
  } else {
    editorProps.onChange = handleChange;
  }

  return (
    <div data-color-mode="light">
      <div className="container">
        <MDEditor
          {...editorProps}
          previewOptions={{
            rehypePlugins: [
              [
                rehypeSanitize,
                {
                  ...defaultSchema,

                  attributes: {
                    ...defaultSchema.attributes,
                    code: [
                      ...(defaultSchema?.attributes?.code || []),
                      // List of all allowed languages:
                      [
                        "className",
                        "language-KaTeX",
                        "language-mermaid",
                        "language-js",
                        "language-jsx",
                        "language-ts",
                        "language-tsx",
                        "language-css",
                        "language-md",
                      ],
                    ],
                  },
                },
              ],
            ],
            ...previewOptions,
          }}
          textareaProps={{
            placeholder,
          }}
          commands={customCommands}
          extraCommands={extraCommands}
          components={{
            toolbar: customToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default ReactMDEditor;
