import { commands } from "@uiw/react-md-editor";
import { ICommand } from "@uiw/react-md-editor/lib/commands";
import { textToImage } from "./textToImage";
import { kaTeX } from "./katex";
import { flowchart } from "./flowchart";
import { table } from "./table";
import { headings } from "./headings";

export const customCommands: ICommand[] = [
  headings,
  commands.bold,
  commands.italic,
  commands.strikethrough,
  commands.quote,
  commands.divider,
  commands.hr,
  commands.divider,
  commands.code,
  commands.codeBlock,
  kaTeX,
  flowchart,
  commands.divider,
  commands.link,
  commands.image,
  commands.divider,
  commands.unorderedListCommand,
  commands.orderedListCommand,
  commands.checkedListCommand,
  table,
  commands.divider,
  textToImage,
  commands.divider,
];

export const extraCommands = [
  commands.divider,
  commands.codeEdit,
  commands.codeLive,
  commands.codePreview,
  commands.divider,
  commands.fullscreen,
];
