import { MDEDITOR_CONTENT } from "./constants";

export const setData = (content: string) => {
  return localStorage.setItem(MDEDITOR_CONTENT, content);
};

export const getData = () => {
  return localStorage.getItem(MDEDITOR_CONTENT);
};

export const removeData = () => {
  return localStorage.removeItem(MDEDITOR_CONTENT);
};

export const clear = () => {
  return localStorage.clear();
};
