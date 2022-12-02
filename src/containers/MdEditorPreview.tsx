import React from "react";
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
import { getData } from "../utils/localstorage";
import { getCodeString } from "rehype-rewrite";
import katex from "katex"; //for mathematical representation writting
import domToImage from "dom-to-image"; //for downloading a section by id or class into image format
import mermaid from "mermaid"; //to generation of diagram and flowchart from text in a similar manner as markdown

import "../styles/mdeditor.styles.css";
import "katex/dist/katex.css";

const MdEditorPreview = () => {
  const value: string = getData() as string;

  return (
    <div className="container">
      <div className="data2image">
        <img
          src="/logo192.png"
          alt="logo"
          style={{ width: 80, height: 80, padding: 10 }}
        />
        <img
          src="/logo512.png"
          alt="logo"
          style={{ width: 80, height: 80, padding: 10 }}
        />
      </div>
      <MDEditor
        value={value}
        preview="preview"
        // previewOptions={{
        //   rehypePlugins: [[rehypeSanitize]],
        // }}
        hideToolbar={true}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          components: {
            code: ({ inline, children = [], className, ...props }) => {
              const txt = children[0] || "";
              if (inline) {
                if (typeof txt === "string" && /^\$\$(.*)\$\$/.test(txt)) {
                  const html = katex.renderToString(
                    txt.replace(/^\$\$(.*)\$\$/, "$1"),
                    {
                      throwOnError: false,
                    }
                  );
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
                /^language-katex/.test(className.toLocaleLowerCase())
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
            },
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
    </div>
  );
};

export default MdEditorPreview;
