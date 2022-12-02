import { ICommand } from "@uiw/react-md-editor/lib/commands";
import { ExecuteCommandType } from "../../types/mdeditor.types";

export const customToolbar = (
  command: ICommand,
  disabled: boolean,
  executeCommand: ExecuteCommandType
) => {
  if (command.keyCommand === "code") {
    return (
      <button
        aria-label="Insert code"
        disabled={disabled}
        onClick={(evn) => {
          evn.stopPropagation();
          executeCommand(command, command.groupName);
        }}
      >
        Code
      </button>
    );
  }
};
