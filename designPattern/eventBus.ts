//全局事件总线
interface EventBus {
  //   handlers: Map<string, Function[]>;
}

class EventEmitter implements EventBus {
  //用于存储事件与回调之前的对应关系
  private handlers: Map<string, Function[]> = new Map();

  //on方法用于安装事件监听器，接受目标时间名和回调函数
  on(eventName: string, cb: Function) {
    //检查事件对应的回调是否存在，若不存在则创建
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    // 将回调添加到事件对应的回调列表
    this.handlers.get(eventName)?.push(cb);
  }

  //emit方法用于触发目标事件，接受事件名和参数
  emit(eventName: string, ...args: any[]) {
    //检查事件是否存在
    if (this.handlers.has(eventName)) {
      //存在则依次执行事件对应的回调
      this.handlers.get(eventName)?.forEach((cb) => {
        cb(...args);
      });
    }
  }

  //off方法用于移除某个事件回调队列里的指定回调函数
  off(eventName: string, cb: Function) {
    const callbacks = this.handlers.get(eventName);
    const index = callbacks?.indexOf(cb) || -1;
    if (callbacks && index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  //once方法同on，但是回调函数只会触发一次
  once(eventName: string, cb: Function) {
    const wrapper = (...args: any[]) => {
      cb(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
