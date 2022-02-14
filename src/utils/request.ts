/**
 * 拼接请求uri
 * @param uri 原始uri
 * @param params 参数对象
 * @returns 请求uri
 */
export const joinParams = (uri: string, params: Record<string, string>) => {
  let result = `${uri}?`;
  Object.keys(params).forEach((key) => {
    result += `${key}=${params[key]}&`;
  });
  return result;
};
