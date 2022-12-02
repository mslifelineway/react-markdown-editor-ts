import React, { ReactNode, useEffect, useRef } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import {
  TextState,
  TextAreaTextApi,
  ICommand,
} from "@uiw/react-md-editor/lib/commands";
import rehypeSanitize from "rehype-sanitize";
import { ExecuteCommandType } from "../types/mdeditor.types";
import { customToolbar } from "../components/mdeditor/customizedToolbar";
import { codePreview } from "../components/mdeditor/customPreviewButton";
import { getCodeString } from "rehype-rewrite";
import katex from "katex"; //for mathematical representation writting
import domToImage from "dom-to-image"; //for downloading a section by id or class into image format
import mermaid from "mermaid"; //to generation of diagram and flowchart from text in a similar manner as markdown
import { CodeComponent, CodeProps } from "react-markdown/lib/ast-to-react";

import { clear, getData, setData } from "../utils/localstorage";
import { Link } from "react-router-dom";
import { paths } from "../utils/constants";
import { Options } from "react-markdown";

import "../styles/mdeditor.styles.css";
import "katex/dist/katex.css";

type MarkdownPreviewProps = {
  className?: string;
  source?: string;
  style?: React.CSSProperties;
  warpperElement?: HTMLDivElement;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
} & Options;

const mdKaTeX = `This is to display the 
\`\$\$\c = \\pm\\sqrt{a^2 + b^2}\$\$\`
 in one line

\`\`\`KaTeX
c = \\pm\\sqrt{a^2 + b^2}
\`\`\`
`;

/**
 * This will download a section in the image format
 */
const textToImage: ICommand = {
  name: "Text To Image",
  keyCommand: "text2image",
  buttonProps: { "aria-label": "Insert title3" },
  icon: (
    <svg width="12" height="12" viewBox="0 0 20 20">
      <path
        fill="currentColor"
        d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
      ></path>
    </svg>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    const dom = document.getElementsByClassName("data2image")[0];
    console.log("===> dom: ", dom);
    if (dom) {
      console.log("==> editor found: ");
      domToImage.toJpeg(dom, {}).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = dataUrl;
        link.click();
      });
    } else {
      console.log("==> class not found: ");
    }
  },
};

const title3 = {
  name: "title3",
  keyCommand: "title3",
  buttonProps: { "aria-label": "Insert title3" },
  icon: (
    <svg width="12" height="12" viewBox="0 0 520 520">
      <path
        fill="currentColor"
        d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
      />
    </svg>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    let modifyText = `### ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `### `;
    }
    api.replaceSelection(modifyText);
  },
};

const title2 = {
  name: "title2",
  keyCommand: "title2",
  render: (
    command: ICommand,
    disabled: boolean,
    executeCommand: ExecuteCommandType
  ) => {
    return (
      <button
        aria-label="Insert title2"
        disabled={disabled}
        onClick={(evn) => {
          // evn.stopPropagation();
          executeCommand(command, command.groupName);
        }}
      >
        <svg width="12" height="12" viewBox="0 0 520 520">
          <path
            fill="currentColor"
            d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
          />
        </svg>
      </button>
    );
  },
  execute: (state: TextState, api: TextAreaTextApi) => {
    let modifyText = `## ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `## `;
    }
    api.replaceSelection(modifyText);
  },
};

const mdMermaid = `The following are some examples of the diagrams, charts and graphs that can be made using Mermaid and the Markdown-inspired text specific to it. 

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

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);

const Code = ({ inline, children = [], className, ...props }: CodeProps) => {
  const demoid = useRef(`dome${randomid()}`);
  const code = "";
  //   const code = getCode(children);
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
        demo.current.innerHTML = error;
      }
    }
  }, [code, demo]);

  if (
    typeof code === "string" &&
    typeof className === "string" &&
    /^language-mermaid/.test(className.toLocaleLowerCase())
  ) {
    return (
      <code ref={demo}>
        <code id={demoid.current} style={{ display: "none" }} />
      </code>
    );
  }
  return <code className={String(className)}>{children}</code>;
};

// const getCode = (arr: ReactNode[]) =>
//   arr
//     .map((dt: ReactNode) => {
//       if (!dt) return false;
//       if (typeof dt === "string") {
//         return dt;
//       }
//       if (dt.props && dt.props.children) {
//         return getCode(dt.props.children);
//       }
//       return false;
//     })
//     .filter(Boolean)
//     .join("");

let defaultValue = getData() || "";
defaultValue = mdKaTeX;
defaultValue = mdMermaid;

const MdEditor = () => {
  const [value, setValue] = React.useState<string>(defaultValue);

  const handleChange = (value: string = "") => {
    setValue(value);
    setData(value);
  };

  return (
    <div data-color-mode="dark">
      <div className="container">
        <MDEditor
          value={value}
          onChange={handleChange}
          preview="edit"
          // previewOptions={{
          //   rehypePlugins: [[rehypeSanitize]],
          // }}
          // previewOptions={{
          //   rehypePlugins: [[rehypeSanitize]],
          //   components: {
          //     code: ({ inline, children = [], className, ...props }) => {
          //       const txt = children[0] || "";
          //       if (inline) {
          //         if (typeof txt === "string" && /^\$\$(.*)\$\$/.test(txt)) {
          //           const html = katex.renderToString(
          //             txt.replace(/^\$\$(.*)\$\$/, "$1"),
          //             {
          //               throwOnError: false,
          //             }
          //           );
          //           return <code dangerouslySetInnerHTML={{ __html: html }} />;
          //         }
          //         return <code>{txt}</code>;
          //       }
          //       const code =
          //         props.node && props.node.children
          //           ? getCodeString(props.node.children)
          //           : txt;
          //       if (
          //         typeof code === "string" &&
          //         typeof className === "string" &&
          //         /^language-katex/.test(className.toLocaleLowerCase())
          //       ) {
          //         const html = katex.renderToString(code, {
          //           throwOnError: false,
          //         });
          //         return (
          //           <code
          //             style={{ fontSize: "150%" }}
          //             dangerouslySetInnerHTML={{ __html: html }}
          //           />
          //         );
          //       }
          //       return <code className={String(className)}>{txt}</code>;
          //     },
          //   },
          // }}
          previewOptions={{
            components: {
              code: Code,
            },
          }}

          // commands={[
          //   // Custom Toolbars
          //   title3,
          //   title2,
          //   commands.group(
          //     [
          //       commands.title1,
          //       commands.title2,
          //       commands.title3,
          //       commands.title4,
          //       commands.title5,
          //       commands.title6,
          //     ],
          //     {
          //       name: "title",
          //       groupName: "title",
          //       buttonProps: { "aria-label": "Insert title" },
          //     }
          //   ),
          //   commands.divider,
          //   commands.group([], {
          //     name: "update",
          //     groupName: "update",
          //     icon: (
          //       <svg viewBox="0 0 1024 1024" width="12" height="12">
          //         <path
          //           fill="currentColor"
          //           d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z"
          //         />
          //       </svg>
          //     ),
          //     children: ({ close, execute, getState, textApi }) => {
          //       return (
          //         <div style={{ width: 120, padding: 10 }}>
          //           <div>My Custom Toolbar</div>
          //           <button
          //             type="button"
          //             onClick={() => console.log("> execute: >>>>>")}
          //           >
          //             State
          //           </button>
          //           <button type="button" onClick={() => close()}>
          //             Close
          //           </button>
          //           <button type="button" onClick={() => execute()}>
          //             Execute
          //           </button>
          //         </div>
          //       );
          //     },
          //     execute: (state, api) => {
          //       console.log(">>>>>>update>>>>>", state);
          //     },
          //     buttonProps: { "aria-label": "Insert title" },
          //   }),
          // ]}
          // commands={[commands.codeEdit, commands.codePreview]}
          // extraCommands={[
          //   commands.group(
          //     [
          //       commands.title1,
          //       commands.title2,
          //       commands.title3,
          //       commands.title4,
          //       commands.title5,
          //       commands.title6,
          //     ],
          //     {
          //       name: "title",
          //       groupName: "title",
          //       buttonProps: { "aria-label": "Insert title" },
          //     }
          //   ),
          //   commands.divider,
          //   commands.group([], {
          //     name: "update",
          //     groupName: "update",
          //     icon: (
          //       <svg viewBox="0 0 1024 1024" width="12" height="12">
          //         <path
          //           fill="currentColor"
          //           d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z"
          //         />
          //       </svg>
          //     ),
          //     children: ({ close, execute, getState, textApi }) => {
          //       return (
          //         <div style={{ width: 120, padding: 10 }}>
          //           <div>My Custom Toolbar</div>
          //           <button
          //             type="button"
          //             onClick={() => console.log("> execute: >>>>>")}
          //           >
          //             State
          //           </button>
          //           <button type="button" onClick={() => close()}>
          //             Close
          //           </button>
          //           <button type="button" onClick={() => execute()}>
          //             Execute
          //           </button>
          //         </div>
          //       );
          //     },
          //     execute: (state, api) => {
          //       console.log(">>>>>>update>>>>>", state);
          //     },
          //     buttonProps: { "aria-label": "Insert title" },
          //   }),
          //   commands.divider,
          //   commands.fullscreen,
          // ]}
          // extraCommands={[codePreview, commands.fullscreen]}
          // components={{
          //   toolbar: customToolbar,
          // }}
          // commands={[textToImage, commands.divider]}
        />

        <div style={{ marginTop: 20, marginLeft: 40 }}>
          <button onClick={clear}>Clear Storage Data</button>
          <Link to={paths.mdEditorPreview}>Preview</Link>
        </div>
      </div>
    </div>
  );
};

export default MdEditor;
