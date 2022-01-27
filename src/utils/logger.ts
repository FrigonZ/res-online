import { LogInfo, LogType } from '../constant';

const logInfos: LogInfo[] = [];

export const doLog = (msg: string, type = LogType.LOG) => {
  console.log(`[ ${type} ]: ${msg}`);
  logInfos.push({
    type,
    msg,
    time: new Date().toLocaleTimeString(),
  });
};
