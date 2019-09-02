<!--
date: 2019-08-25
title: Redux工作原理解读
description: 随着web开发日趋复杂，前端需要管理比任何时候都要多的state（状态）。Redux应运而生，基本思想是保证数据的单向流动，同时便于控制、使用、测试。
-->

## redux 工作原理解读

> 随着 web 开发日趋复杂，前端需要管理比任何时候都要多的 state（状态）。redux 应运而生，基本思想是保证数据的单向流动，同时便于控制、使用、测试。

参考官网的[例子](https://codesandbox.io/s/github/reactjs/redux/tree/master/examples/counter)，简单讲讲。

```js
import { createStore } from 'redux';

function count(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// store的创建
const store = createStore(count);

// store里面的数据发生改变时，触发的回调函数
store.subscribe(function() {
  console.log('current state is: ', store.getState());
});

// 改变store里面的方法
store.dispatch({ type: 'INCREMENT' }); // current state is: 1
store.dispatch({ type: 'INCREMENT' }); // current state is: 2
store.dispatch({ type: 'DECREMENT' }); // current state is: 3
```

#### createStore 的实现

上面的例子可以看出，`createStore`作为生成 sore 的函数，是 redux 中比较核心的 API。我们直接看看其源码

```js
import $$observable from 'symbol-observable';

import ActionTypes from './utils/actionTypes';
import isPlainObject from './utils/isPlainObject';

export default function createStore(reducer, preloadedState, enhancer) {
  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
        'createStore(). This is not supported. Instead, compose them ' +
        'together to a single function.',
    );
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function getState() {
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.',
      );
    }

    return currentState;
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. ' +
          'See https://redux.js.org/api-reference/store#subscribelistener for more details.',
      );
    }

    let isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api-reference/store#subscribelistener for more details.',
        );
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' + 'Use custom middleware for async actions.',
      );
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?',
      );
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }

    return action;
  }

  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.REPLACE });
  }

  function observable() {
    const outerSubscribe = subscribe;
    return {
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return { unsubscribe };
      },

      [$$observable]() {
        return this;
      },
    };
  }

  dispatch({ type: ActionTypes.INIT });

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable,
  };
}
```

我们先看看`createStore`返回什么内容:

```js
return {
  dispatch,
  subscribe,
  getState,
  replaceReducer,
  [$$observable]: observable,
};
```

每个属性的含义是:

- dispatch: 用于 action 的分发
- subscribe: 注册 listener，store 里面 state 发生改变后，执行该 listener
- getState: 读取 store 当前的 state
- replaceReducer: 替换 reducer，改变 state 修改的逻辑

再看看输入端的参数：

- reducer: 用来描述 action 如何改变 state，改变 store 里面的 state
- preloadedState: 可以是初始化的 state，也可以是 enhancer。若传入的参数是`function`，则会替代 enhancer，否则是初始化的 state。
- enhancer: 是一个高阶函数，用于拓展 store 的功能，如 redux 自带的模块`applyMiddleware`就是一个 enhancer 函数。

这里需要解释一下`enhancer`的作用。一个 store enhancer，实际上就是一个高阶函数，它的参数是创建 store 的函数（store creator），返回值是一个可以创建功能更加强大的 store 的函数(enhanced store creator)，这和 React 中的高阶组件的概念很相似。store enhancer 函数的结构一般如下：

```js
function enhancerCreator() {
  return createStore => (reducer, initialState, enhancer) => {
    // do something based old store
    return { ...store, dispatch }; // return a new enhanced store
  };
}
```

每一个 enhancer 都会改变默认的 dispatch，redux 里 enhancer 的源码如下：

```js
if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
  enhancer = preloadedState;
  preloadedState = undefined;
}

if (typeof enhancer !== 'undefined') {
  if (typeof enhancer !== 'function') {
    throw new Error('Expected the enhancer to be a function.');
  }

  return enhancer(createStore)(reducer, preloadedState);
}
```
