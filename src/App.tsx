import React from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MdEditor from "./containers/MdEditor";
import { paths } from "./utils/constants";
import MdEditorPreview from "./containers/MdEditorPreview";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={paths.root} element={<MdEditor />} />
        <Route path={paths.mdEditor} element={<MdEditor />} />
        <Route path={paths.mdEditorPreview} element={<MdEditorPreview />} />
        <Route path={paths.markdownEditor} element={<MarkdownEditor />} />
      </Routes>
    </Router>
  );
};
