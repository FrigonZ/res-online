export const generateFileKey = (name: string) => {
  let key = Date.now().toString(16);
  const pos = name.lastIndexOf('.');
  if (pos !== -1) {
    key += name.substring(pos, name.length);
  }

  return key;
};
