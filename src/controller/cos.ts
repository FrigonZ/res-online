import { isArray } from 'util';
import { Ctx } from '../constant';
import { doUpload, getObjectUrl } from '../cos/cos';
import { generateFileKey } from '../utils/file';
import { ResponseWrap } from '../utils/response';

export const upload = async (ctx: Ctx) => {
  if (!ctx.request.files) {
    ResponseWrap.fail(ctx, '无文件');
    return;
  }
  const { file } = ctx.request.files;
  if (isArray(file)) {
    ResponseWrap.fail(ctx);
    return;
  }
  const { path, name } = file;
  if (!name) {
    ResponseWrap.fail(ctx, '文件异常');
    return;
  }
  const key = generateFileKey(name);
  const data = await doUpload(path, key);
  if (!data) {
    ResponseWrap.fail(ctx, '请求失败');
    return;
  }
  ResponseWrap.success(ctx, { url: getObjectUrl(key) });
};
