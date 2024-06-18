//观察者模式（发布订阅模式）

//发布者接口
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

class ConcreteSubject implements Subject {
  public state: number; //业务数据
  private observers: Observer[] = []; //订阅者列表
  //添加订阅接口
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("Subject: Observer has been attached already.");
    }
    console.log("Subject: Attached an observer.");
    this.observers.push(observer);
  }
  //取消订阅接口
  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("Subject: Nonexistent observer.");
    }
    this.observers.splice(observerIndex, 1);
    console.log("Subject: Detached an observer.");
  }

  //通知订阅者
  public notify(): void {
    console.log("Subject:Notifying observers...");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  //业务行为
  public someBusinessLogic(): void {
    console.log("\nSubject:I `m doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));
    console.log(`Subject:My state has just changed to:${this.state}`);
    this.notify();
  }
}

interface Observer {
  // Receive update from subject.
  update(subject: Subject): void;
}

//具体的观察者类
class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log("cConcreteObserverA:Rected to the Event");
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (
      subject instanceof ConcreteSubject &&
      (subject.state === 0 || subject.state >= 2)
    ) {
      console.log("ConcreteObserverB: Reacted to the event.");
    }
  }
}

//创建发布者

const subject = new ConcreteSubject();

//观察者A类型的成员
const observer1 = new ConcreteObserverA();
subject.attach(observer1); //添加订阅
//观察者B类型的成员
const observer2 = new ConcreteObserverB();
subject.attach(observer2); //添加订阅

//更新事件
subject.someBusinessLogic();
subject.someBusinessLogic();

//移除订阅
subject.detach(observer2);
subject.someBusinessLogic();
