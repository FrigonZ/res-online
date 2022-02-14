/* eslint-disable no-console */
import { LogInfo, LogType } from '../constant';

export const logInfos: LogInfo[] = [];

const LogColorMap = {
  [LogType.LOG]: '\x1b[37m',
  [LogType.INFO]: '\x1b[33m',
  [LogType.ERROR]: '\x1b[31m',
};

export const doLog = (msg: string, type = LogType.LOG) => {
  console.log(LogColorMap[type], `[${type}]: ${msg}`);
  logInfos.push({
    type,
    msg,
    time: new Date().toLocaleTimeString(),
  });
};

export const logError = (key: string, data?: any) => {
  doLog(key, LogType.ERROR);
  if (data) {
    doLog(JSON.stringify(data), LogType.INFO);
  }
};
