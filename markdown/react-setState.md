<!--
date: 2019-08-28
title: React setState流程解析
description: React作为目前最热门的前端开发框架，实现了model和View的单向数据绑定，在修改数据的同时，实现了View层的刷新，大大简化了我们的操作。这个特性主要归功于`setState()`方法。本人主要来探寻一下setState的流程。
-->

## React setState 流程解析

> React 作为目前最热门的前端开发框架，实现了 model 和 View 的单向数据绑定，在修改数据的同时，实现了 View 层的刷新，大大简化了我们的操作。这个特性主要归功于`setState()`方法。本人主要来探寻一下 setState 的流程。

举一个最经典的例子。

```js
incrementCount() {
  this.setState({count: this.state.count + 1});
}

handleSomething() {
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
}
```

在上面的代码里，我们希望执行完`handleSomething()`之后，`this.state.count`能递加 3，然鹅最后结果只增加了 1。为了解决上面的问题，可以传递一个函数来访问当前的 state 值，从而链式地进行更新，确保他们是一个建立在另一个之上的，这样就能得到最初想要的结果了。

```js
incrementCount() {
  this.setState((state) => {
    return {count: state.count + 1}
  });
}

handleSomething() {
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
}
```

那么为什么会产生上面这样的现象呢？原因就是`setState`方法。React 组件是靠单向数据流构建页面的，除了 props 之外，自身的 state 也是改变状态引起组件渲染的主要因素。为了节省消耗，setState 方法有自己的一套更新策略，目的是为了减少 state 更新对页面渲染的消耗。

我们可以看下 setState 的代码。(from react 16.9.0 `packages/react/src/ReactBaseClasses.js`)

```js
Component.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === 'object' || typeof partialState === 'function' || partialState == null,
    'setState(...): takes an object of state variables to update or a ' +
      'function which returns an object of state variables.',
  );
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
```

从上面可以看出，setState 的核心是`updater.enqueueSetState`方法。这里的`updater`是`renderer`在渲染时注入的对象，而这个对象是`reconciler`提供的。

这里需要解释一下`renderer`和`reconciler`。

- renderer: 渲染器. Dan 曾经说过，“A renderer teaches React to talk to a specific host environment and manage its host instances.”渲染器用于管理 React 和宿主环境直接的通信以及管理宿主实例。常见的 renderer 包括 react-dom、react-native 等。
- reconciler: React 里的协调算法，`setState`的主要就是靠这套算法来实现的。React 15 以及更早版本所用的是`Stack reconciler`，React 16 则引进了`Fiber reconciler`。这是 React 16 最核心的一次更新。

这里强烈推荐这两篇文章《(Inside Fiber: in-depth overview of the new reconciliation algorithm in React)[https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e]》《(React as a UI Runtime)[https://overreacted.io/react-as-a-ui-runtime/]》
