import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Editor from "./containers/Editor";
import EditorPreview from "./containers/EditorPreview";
import { paths } from "./utils/constants";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={paths.root} element={<Editor />} />
        <Route path={paths.mdEditor} element={<Editor />} />
        <Route path={paths.mdEditorPreview} element={<EditorPreview />} />
      </Routes>
    </Router>
  );
};
