import { useContext } from "react";
import { toast } from "react-toastify";
import { ContextStore, EditorContext } from "@uiw/react-md-editor/lib/Context";

const CustomPreviewButton = (): JSX.Element => {
  const ctx: ContextStore | null = useContext<ContextStore>(EditorContext);

  if (!ctx) {
    toast.error("Editor context couldn't be found!");
    return <p>Editor context found null!</p>;
  }

  const { preview, dispatch } = ctx;
  if (!dispatch) {
    toast.error("Dispatch was found null in the editor context!");
    //   return <p>Dispatch was found null in the editor context!</p>;
  }

  const click = () => {
    dispatch &&
      dispatch({
        preview: preview === "edit" ? "preview" : "edit",
      });
  };

  if (preview === "edit") {
    return (
      <svg width="12" height="12" viewBox="0 0 520 520" onClick={click}>
        <polygon
          fill="currentColor"
          points="0 71.293 0 122 319 122 319 397 0 397 0 449.707 372 449.413 372 71.293"
        />
        <polygon
          fill="currentColor"
          points="429 71.293 520 71.293 520 122 481 123 481 396 520 396 520 449.707 429 449.413"
        />
      </svg>
    );
  }

  return (
    <div>
      View
      <svg width="12" height="12" viewBox="0 0 520 520" onClick={click}>
        <polygon
          fill="currentColor"
          points="0 71.293 0 122 38.023 123 38.023 398 0 397 0 449.707 91.023 450.413 91.023 72.293"
        />
        <polygon
          fill="currentColor"
          points="148.023 72.293 520 71.293 520 122 200.023 124 200.023 397 520 396 520 449.707 148.023 450.413"
        />
      </svg>
    </div>
  );
};

export const codePreview = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  icon: <CustomPreviewButton />,
};
