import axios from 'axios';
import { URI } from '../constant';
import { getAccessToken } from './access-token';
import { logError } from './logger';
import { joinParams } from './request';

export const getWxacode = async (
  path: string,
  env: string,
  isRetry = false
): Promise<Buffer | null> => {
  try {
    const token = await getAccessToken();
    const resData = await axios.post(
      joinParams(URI.WX_ACODE_GET, {
        access_token: token,
      }),
      {
        path,
        env_version: env,
      },
      {
        responseType: 'arraybuffer',
      }
    );
    const { errcode } = resData.data;
    if (errcode && !isRetry) {
      const data: Buffer | null = await getWxacode(path, env, true);
      return data;
    }
    return resData.data as Buffer;
  } catch (error) {
    logError('wxacode.getWxacode', error);
    return null;
  }
};
