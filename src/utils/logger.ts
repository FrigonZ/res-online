/* eslint-disable no-console */
import { LogInfo, LogType } from '../constant';
import { Logs } from '../entity/log';

/** 日志缓存 */
let logInfos: LogInfo[] = [];

/** 日志上传计时器 */
let logTimer: NodeJS.Timer;

/** 日记上传步长 */
const timeStep = 60000;

const LogColorMap = {
  [LogType.LOG]: '\x1b[37m',
  [LogType.INFO]: '\x1b[33m',
  [LogType.ERROR]: '\x1b[31m',
};

/**
 * 打印日志
 * @param msg 日志信息
 * @param type 日志类型
 * @param key 日志key
 */
export const doLog = (msg: string, type = LogType.LOG, key = '') => {
  console.log(LogColorMap[type], `[${type}]: ${msg}`);
  if (type === LogType.LOG) return;

  // info, error类型异常写入缓存
  logInfos.push({
    key,
    type,
    msg,
    time: new Date(),
  });
};

/**
 * 标准错误输出
 * @param key 日志key
 * @param error 捕获异常
 * @param data 引发异常数据
 */
export const logError = (key: string, error: unknown, data?: any) => {
  if (error instanceof Error) {
    doLog(error.name, LogType.ERROR, key);
    if (data) {
      doLog(JSON.stringify({ msg: error.message, data }), LogType.INFO, key);
    }
  } else {
    doLog('', LogType.ERROR, key);
    if (data) {
      doLog(JSON.stringify({ msg: '', data }), LogType.INFO, key);
    }
  }
};

/** 重置日志缓存 */
export const resetLogInfos = () => {
  logInfos = [];
};

/** 获取日志缓存 */
export const getLogInfos = () => logInfos;

/** 日志缓存写入数据库 */
export const write = async () => {
  try {
    if (!logInfos.length) return;
    console.log(logInfos);
    let overflow = 0;
    const target = logInfos.map((logInfo) => {
      if (logInfo.msg.length > 254) {
        if (logInfo.msg.length > overflow) overflow = logInfo.msg.length;
        return {
          ...logInfo,
          msg: logInfo.msg.substring(0, 254),
        };
      }
      return logInfo;
    });
    if (overflow) {
      logInfos.push({
        key: 'msg.overflow',
        msg: overflow as any,
        type: LogType.INFO,
        time: new Date(),
      });
    }
    const result = await Logs.insert(target);
    if (result.identifiers.length) {
      resetLogInfos();
    }
  } catch (error) {
    logError(`logger.write`, error);
  }
};

/** 初始化日志写入计时器 */
export const setLogTimer = () => {
  logTimer = setInterval(write, timeStep);
  doLog('start interval');
};

/** 清楚日志计时器 */
export const removeLogTimer = () => {
  if (logTimer) clearInterval(logTimer);
  doLog('stop interval');
};
