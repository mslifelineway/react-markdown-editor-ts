import { ICommand } from "@uiw/react-md-editor/lib/commands";

export type ExecuteCommandType = (command: ICommand, name?: string) => void;
