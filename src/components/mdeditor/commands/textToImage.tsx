import { ICommand } from "@uiw/react-md-editor";
import domToImage from "dom-to-image";

import { GoCloudDownload } from "react-icons/go";
import { toast } from "react-toastify";

/**
 * Download all sections having className 'data2image' in to image
 */
export const textToImage: ICommand = {
  name: "Text To Image",
  keyCommand: "text2image",
  buttonProps: { "aria-label": "Insert title3" },
  icon: (
    <span title="Download Text To Image, Add this `data2image` class!">
      <GoCloudDownload />
    </span>
  ),
  execute: () => {
    const dom = document.getElementsByClassName("data2image")[0];
    if (dom) {
      domToImage.toJpeg(dom, {}).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = dataUrl;
        link.click();
      });
      toast.success("File downloaded successfully!");
    } else {
      toast.error("No element found with class name 'data2image'!");
    }
  },
};
