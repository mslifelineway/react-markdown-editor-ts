import { MarkdownPreviewProps } from "@uiw/react-markdown-preview/lib";
import { CodeComponent, LiComponent } from "./components";

export const previewOptions: MarkdownPreviewProps = {
  components: {
    code: CodeComponent,
    li: LiComponent,
  },
};
