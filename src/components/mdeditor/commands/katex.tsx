import { ICommand, TextAreaTextApi, TextState } from "@uiw/react-md-editor";
import { TbMathSymbols } from "react-icons/tb";

/**
 * Mathematics typesetting library
 */
export const kaTeX: ICommand = {
  name: "Mathematics",
  keyCommand: "mathematics",
  buttonProps: { "aria-label": "Insert Mathematics" },
  icon: (
    <span title="Insert Mathematics">
      <TbMathSymbols />
    </span>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    const prefix = "```KaTeX\n";
    let modifyText = `${prefix} ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `${prefix}`;
    }
    modifyText += " \n```";
    api.replaceSelection(modifyText);
  },
};
