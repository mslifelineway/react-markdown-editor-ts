import { ICommand, TextAreaTextApi, TextState } from "@uiw/react-md-editor";
import { AiOutlineTable } from "react-icons/ai";

/**
 *
 */
export const table: ICommand = {
  name: "table",
  keyCommand: "table",
  buttonProps: { "aria-label": "Insert table" },
  icon: (
    <span title="Insert table">
      <AiOutlineTable />
    </span>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    const prefix = `
  | Header 1 | Header 2 |
  | --------- | --------- |
  | Cell 1   | Cell 1   |
  | Cell 2   | Cell 2   |\n`;

    let modifyText = `${prefix}\n`;

    // modifyText += " \n```";
    api.replaceSelection(modifyText);
  },
};
