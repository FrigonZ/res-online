import { LogType } from '../../constant';
import { doLog, getLogInfos, logError, resetLogInfos } from '../logger';

describe('doLog', () => {
  it('log default type', () => {
    doLog('');
    const logInfos = getLogInfos();
    const type = logInfos.pop()?.type;
    expect(type).toBe(LogType.LOG);
  });

  it('log special type', () => {
    doLog('', LogType.INFO);
    const logInfos = getLogInfos();
    const type = logInfos.pop()?.type;
    expect(type).toBe(LogType.INFO);
  });

  it('log error', () => {
    logError('key', new Error(), { data: 'data' });
    const logInfos = getLogInfos();
    const type = logInfos.pop()?.type;
    expect(type).toBe(LogType.ERROR);
  });

  it('log error2', () => {
    logError('key', {}, { data: 'data' });
    const logInfos = getLogInfos();
    const type = logInfos.pop()?.type;
    expect(type).toBe(LogType.ERROR);
  });

  it('reset', () => {
    resetLogInfos();
    const logInfos = getLogInfos();
    expect(logInfos.length).toBe(0);
  });
});
