import {
  LiComponent as LiComponentType,
  LiProps,
} from "react-markdown/lib/ast-to-react";
import { getCodeString } from "rehype-rewrite";
import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

export const LiComponent: LiComponentType = (liProps: LiProps) => {
  const { children, node, ordered, checked } = liProps;
  const txt = children?.[0] || "";

  const code = node && node.children ? getCodeString(node.children) : txt;

  //case 1: checked = true/false & ordered = false ==> Checked list
  //case 2: ordered = false && checked === null ==> unordered list
  //case 3: ordered = true ===> ordered list

  if (ordered === false && typeof checked === "boolean") {
    return (
      <li className={String(liProps.className || "") + " checked-list"}>
        <div className="list-item">
          {checked ? (
            <IoIosCheckbox
              className="checked-icon"
              color="green"
              fontSize={22}
            />
          ) : (
            <MdOutlineCheckBoxOutlineBlank
              className="unchecked-icon"
              fontSize={22}
            />
          )}
          <span>{code}</span>
        </div>
      </li>
    );
  }
  if (ordered === false && checked === null) {
    return <li className="unordered-list">{code}</li>;
  }
  return (
    <li className={String(liProps.className || "") + " ordered-list"}>
      {code}
    </li>
  );
};
