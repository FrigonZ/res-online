import Cos = require('cos-nodejs-sdk-v5');
import fs from 'fs';
import { Duplex } from 'stream';
import { bucket, cosBase, cosId, cosKey, region } from '../constant';
import { logError } from './logger';

export const cos = new Cos({
  SecretId: cosId,
  SecretKey: cosKey,
});

export const doUpload = (source: string | Buffer, key: string) => {
  let img: any;
  if (Buffer.isBuffer(source)) {
    img = new Duplex();
    img.push(source);
    img.push(null);
  } else {
    img = fs.createReadStream(source);
  }
  const promise = new Promise((resolve) => {
    cos.putObject(
      {
        Bucket: bucket,
        Region: region,
        Key: key,
        StorageClass: 'STANDARD',
        Body: img,
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
  return promise;
};

export const getObjectUrl = (key: string) => {
  return cosBase + key;
};
