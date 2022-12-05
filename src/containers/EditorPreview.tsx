import ReactMDEditor, {
  EditorMode,
  ReactMDEditorProps,
} from "../components/mdeditor/ReactMDEditor";
import { getData } from "../utils/localstorage";

const EditorPreview = () => {
  const props: ReactMDEditorProps = {
    mode: EditorMode.view,
    value: getData() || "",
  };

  return <ReactMDEditor {...props} />;
};

export default EditorPreview;
