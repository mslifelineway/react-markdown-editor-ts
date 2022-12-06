import { commands, ICommand } from "@uiw/react-md-editor";
import { FaHeading } from "react-icons/fa";

export const headings: ICommand = commands.group(
  [
    commands.title1,
    commands.title2,
    commands.title3,
    commands.title4,
    commands.title5,
    commands.title6,
  ],
  {
    name: "title",
    groupName: "title",
    buttonProps: { "aria-label": "Insert title" },
    icon: (
      <span title="Insert title">
        <FaHeading />
      </span>
    ),
  }
);
