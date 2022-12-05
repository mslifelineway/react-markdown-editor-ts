import { ICommand, TextAreaTextApi, TextState } from "@uiw/react-md-editor";
import { FcFlowChart } from "react-icons/fc";

/**
 * Flowchart, Diagram etc. library
 */
export const flowchart: ICommand = {
  name: "flowchart",
  keyCommand: "flowchart",
  buttonProps: { "aria-label": "Insert flowchart" },
  icon: (
    <span title="Insert flowchart">
      <FcFlowChart />
    </span>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    const prefix = "```mermaid\n";
    let modifyText = `${prefix} ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `${prefix}`;
    }
    modifyText += " \n```";
    api.replaceSelection(modifyText);
  },
};
