import { ICommand } from "@uiw/react-md-editor/lib/commands";
import { ExecuteCommandType } from "./mdeditor.types";
import { BsCodeSlash } from "react-icons/bs";
import { BiCodeBlock } from "react-icons/bi";
import { RiHeading } from "react-icons/ri";

export const customToolbar = (
  command: ICommand,
  disabled: boolean,
  executeCommand: ExecuteCommandType
) => {
  const buttonProps = {
    disabled,
    onClick: () => {
      executeCommand(command, command.groupName);
    },
  };

  if (command.keyCommand === "code") {
    return (
      <button
        aria-label="Insert code"
        title="Insert code"
        disabled={disabled}
        onClick={(evn) => {
          evn.stopPropagation();
          executeCommand(command, command.groupName);
        }}
      >
        <BsCodeSlash />
      </button>
    );
  }

  if (command.keyCommand === "codeBlock") {
    return (
      <button
        aria-label="Insert code block"
        title="Insert code block"
        disabled={disabled}
        onClick={(evn) => {
          evn.stopPropagation();
          executeCommand(command, command.groupName);
        }}
      >
        <BiCodeBlock />
      </button>
    );
  }

  if (command.keyCommand === "title1") {
    return (
      <button aria-label="Insert H1" title="Insert H1" {...buttonProps}>
        <RiHeading />1
      </button>
    );
  }

  if (command.keyCommand === "title2") {
    return (
      <button aria-label="Insert H2" title="Insert H2" {...buttonProps}>
        <RiHeading />2
      </button>
    );
  }

  if (command.keyCommand === "title3") {
    return (
      <button aria-label="Insert H3" title="Insert H3" {...buttonProps}>
        <RiHeading />3
      </button>
    );
  }

  if (command.keyCommand === "title4") {
    return (
      <button aria-label="Insert H4" title="Insert H4" {...buttonProps}>
        <RiHeading />4
      </button>
    );
  }

  if (command.keyCommand === "title5") {
    return (
      <button aria-label="Insert H5" title="Insert H5" {...buttonProps}>
        <RiHeading />5
      </button>
    );
  }

  if (command.keyCommand === "title6") {
    return (
      <button aria-label="Insert H6" title="Insert H6" {...buttonProps}>
        <RiHeading />6
      </button>
    );
  }
};
