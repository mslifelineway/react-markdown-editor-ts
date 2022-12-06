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
