import Websocket = require('ws');
import { OrderAction, WebSocketRequest, WebSocketUniq } from '../constant';
import { doLog } from '../utils/logger';

/** 存储所有socket连接 */
export const socketList: SocketItem[] = [];

/** 心跳频率 1分钟 */
const HEART_BEAT_STEP = 60000;

/** socket区分 */
let socketId = 0;

export interface SocketItemProps {
  socket: Websocket;
}

/** socket连接包装类 */
export class SocketItem {
  public key: string;

  private socket: Websocket;

  /** 待发送队列 */
  private waitData: WebSocketUniq[] = [];

  /** 返回数 */
  private rspNum = 0;

  /** 心跳计时器 */
  private heartBeat: NodeJS.Timer;

  public constructor(props: SocketItemProps) {
    // 将包装好的连接推入数组
    const { socket } = props;
    this.socket = socket;
    this.key = `socket-${socketId}`;
    socketId += 1;
    socketList.push(this);
    this.initListener();
    this.heartBeat = setTimeout(this.heartBeatReaction, HEART_BEAT_STEP);
  }

  /** 初始化监听器 */
  private initListener() {
    this.socket.on('message', this.handleReceive);
    this.socket.on('close', this.handleClose);
  }

  /** 当接收到信息时，重置心跳计时器 */
  private resetHeartBeat() {
    this.heartBeat = setTimeout(this.heartBeatReaction, HEART_BEAT_STEP);
  }

  /** 心跳停跳事件，无响应等待1分钟后断开连接 */
  private heartBeatReaction() {
    this.heartBeat = setTimeout(this.socket.terminate, HEART_BEAT_STEP);
  }

  /** 接收信息处理 */
  private handleReceive(data: WebSocketRequest) {
    const { data: orders = [] } = data;
    this.resetHeartBeat();
    orders.some(async (order) => {
      await this.handleOrderActions(order);
    });
    this.handleSend();

    doLog(JSON.stringify({ key: this.key, data }));
  }

  /** 发送所有待发送数据 */
  private handleSend() {
    if (!this.waitData.length) return;
    const ids = this.waitData.map((data) => data.id).join(',');
    doLog(JSON.stringify({ key: this.key, ids }));
    this.socket.send(this.waitData);
  }

  /** 关闭连接处理 */
  private handleClose() {
    const index = socketList.findIndex((socket) => socket.key === this.key);
    socketList.splice(index);
    this.handleSend();
    clearTimeout(this.heartBeat);
  }

  /**
   * 添加待发送数据
   * @param data 发送数据
   * @param immediately 是否立即发送，默认为false
   */
  public addWaitData(data: WebSocketUniq, immediately = false) {
    this.waitData.push(data);
    doLog(JSON.stringify({ key: this.key, data }));
    if (immediately) this.handleSend();
  }

  /** 根据接收事件类型进行事件分发 */
  private async handleOrderActions(order: WebSocketUniq) {
    const { action } = order;
    switch (action) {
      case OrderAction.GET:
        await this.handleGet(order);
        break;
      case OrderAction.SET:
        await this.handleSet(order);
        break;
      case OrderAction.CONFIRM:
        this.handleConfirm(order);
        break;
      case OrderAction.FINISH:
        this.handleFinish(order);
        break;
      default:
        break;
    }
  }

  /** 获取返回包id */
  private getRspId() {
    this.rspNum += 1;
    return `rsp${this.rspNum}`;
  }

  /** 处理get请求 */
  private async handleGet(order: WebSocketUniq) {
    const { id, options } = order;
    const { time } = options;
    // get datas with time
    const data = time;
    this.addWaitData({
      id: this.getRspId(),
      action: OrderAction.CONFIRM,
      options: { oid: id },
      data,
    });
  }

  /** 处理set请求 */
  private async handleSet(order: WebSocketUniq) {
    const { id, options } = order;
    const { wsid, status } = options;
    // get datas with wsid status
    const data = { wsid, status };
    this.addWaitData({
      id: this.getRspId(),
      action: OrderAction.CONFIRM,
      options: { oid: id },
      data,
    });
  }

  /** 处理确认请求 */
  private handleConfirm({ options }: WebSocketUniq) {
    const { oid } = options;
    const index = this.waitData.findIndex((order) => order.id === oid);
    if (index === -1) return;
    this.waitData.splice(index);
  }

  /** 处理结束请求 */
  private handleFinish(order: WebSocketUniq) {
    const { id } = order;
    this.addWaitData({
      action: OrderAction.CONFIRM,
      options: {
        oid: id,
      },
      id: this.getRspId(),
    });
    this.socket.terminate();
  }
}
