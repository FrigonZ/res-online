/* eslint-disable no-console */
import { LogInfo, LogType } from '../constant';

export const logInfos: LogInfo[] = [];

const LogColorMap = {
  [LogType.LOG]: '\x1b[37m',
  [LogType.WARN]: '\x1b[33m',
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
