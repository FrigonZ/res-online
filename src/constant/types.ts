/** 日志类型 */
export const enum LogType {
  LOG = 'LOG',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/** 日志结构 */
export interface LogInfo {
  type: LogType;
  time: string;
  msg: string;
}
