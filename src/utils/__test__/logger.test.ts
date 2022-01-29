import { LogType } from '../../constant';
import { doLog, logInfos } from '../logger';

describe('doLog', () => {
  it('log default type', () => {
    doLog('');
    const type = logInfos.pop()?.type;
    expect(type).toBe(LogType.LOG);
  });

  it('log special type', () => {
    doLog('', LogType.ERROR);
    const type = logInfos.pop()?.type;
    expect(type).toBe(LogType.ERROR);
  });
});
