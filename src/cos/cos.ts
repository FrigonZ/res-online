import Cos = require('cos-nodejs-sdk-v5');
import fs from 'fs';
import { bucket, cosBase, cosId, cosKey, region } from '../constant';
import { logError } from '../utils/logger';

export const cos = new Cos({
  SecretId: cosId,
  SecretKey: cosKey,
});

export const doUpload = (path: string, key: string) => {
  return new Promise((resolve) => {
    cos.putObject(
      {
        Bucket: bucket,
        Region: region,
        Key: key,
        StorageClass: 'STANDARD',
        Body: fs.createReadStream(path),
        ContentLength: fs.statSync(path).size,
      },
      (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          logError('cos.doUpload', err, err);
          resolve(null);
        }
      }
    );
  });
};

export const getObjectUrl = (key: string) => {
  return cosBase + key;
};
