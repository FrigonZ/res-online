import jwt from 'jsonwebtoken';
import { jwtSecret } from '../constant/config';

/** jwt有效时间 */
const expiresIn = '24h';

/** 加密 */
export const sign = (payload: any) =>
  jwt.sign(payload, jwtSecret, {
    expiresIn,
  });

/** 解密 */
export const verify = (token: string) => {
  try {
    const decode = jwt.verify(token, jwtSecret);
    if (typeof decode === 'string') return {};
    return decode;
  } catch (error) {
    return {};
  }
};
