import axios from 'axios';
import { URI } from '../constant';
import { joinParams } from './request';
import { appid, secret } from '../constant/config';
import { logError } from './logger';

let accessToken = '';

export const refreshToken = async () => {
  try {
    const resData = await axios.get(
      joinParams(URI.WX_ACCESS_TOKEN, {
        appid,
        secret,
        grant_type: 'client_credential',
      })
    );

    const { access_token: token } = resData.data;
    accessToken = token;
    return accessToken;
  } catch (error) {
    logError('access-token.refreshToken', error);
    return '';
  }
};

export const getAccessToken = async () => {
  if (accessToken) return accessToken;
  const token = await refreshToken();
  return token;
};
