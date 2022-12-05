import { ToastContainerProps } from "react-toastify";

export const paths = {
  root: "/",
  mdEditor: "/mdeditor",
  mdEditorPreview: "/mdeditor/view",
};

export const toastProps: ToastContainerProps = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  theme: "light",
};

export const MDEDITOR_CONTENT = "MDEDITOR_CONTENT";
