import React from "react";
import { Link } from "react-router-dom";
import ReactMDEditor, {
  EditorMode,
  ReactMDEditorProps,
} from "../components/mdeditor/ReactMDEditor";
import { paths } from "../utils/constants";
import { clear, getData, setData } from "../utils/localstorage";

/**------------ */
// eslint-disable-next-line no-useless-escape
const mdKaTeX = `This is to display the \`\$\$\c = \\pm\\sqrt{a^2 + b^2}\$\$\` in one line
\`\`\`KaTeX
c = \\pm\\sqrt{a^2 + b^2}
\`\`\`
`;

/**
 * This will download a section in the image format
 */

const mdMermaid = `The following are some examples of the diagrams,
\`\`\`mermaid
graph TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`

\`\`\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
 John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
\`\`\`
`;

const jsxCode = `
\`\`\`jsx
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import MDEditor from "@uiw/react-md-editor";
import mermaid from "mermaid";
\`\`\`
`;

let defaultValue = getData() || "";
defaultValue = mdKaTeX;
defaultValue += mdMermaid;
defaultValue += jsxCode;

/**------------ */
const Editor = () => {
  const [value, setValue] = React.useState<string>(defaultValue);

  const handleChange = (value: string = "") => {
    setValue(value);
    setData(value);
  };

  const props: ReactMDEditorProps = {
    mode: EditorMode.edit,
    value,
    handleChange,
  };

  return (
    <>
      <ReactMDEditor {...props} />;
      <div style={{ marginTop: 20, marginLeft: 40 }}>
        <button onClick={clear}>Clear Storage Data</button>
        <Link to={paths.mdEditorPreview}>Preview</Link>
      </div>
    </>
  );
};

export default Editor;
