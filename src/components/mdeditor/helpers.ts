export const checkAllowedLanguage = (
  allowedLanguage: string,
  codePropsLanguage: string
): boolean => {
  const test = /^/;
  const regex = new RegExp(
    test.toString().replace("/^/", `^${allowedLanguage}`)
  );
  return regex.test(codePropsLanguage.toLocaleLowerCase());
};

export const randomid = () =>
  parseInt(String(Math.random() * 1e15), 10).toString(36);
