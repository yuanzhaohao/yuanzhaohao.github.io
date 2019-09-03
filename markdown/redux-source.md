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

##### enhancer

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

#### subscribe & dispatch

下面说下 subscribe 方法，请看源码：

```js
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
```

subscribe 函数实现了一个订阅机制，在 subscribe 函数传入 listener 回调函数，然后在 dispatch 的时候执行这些 listeners。值得一提的是，subscribe 函数的返回值是一个 unsubscribe 函数，用于接触该 listener 的订阅。

dispatch 方法，通过 action 该改变 state，然后执行 subscribe 注册的方法。

```js
function dispatch(action) {
  if (!isPlainObject(action)) {
    throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
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
```

replaceReducer 方法用于动态更新当前 currentReducer 。 通过对外暴露 replaceReducer API, 外部可以直接调用这个方法来替换当前 currentReducer

```js
function replaceReducer(nextReducer) {
  if (typeof nextReducer !== 'function') {
    throw new Error('Expected the nextReducer to be a function.');
  }

  currentReducer = nextReducer;
  dispatch({ type: ActionTypes.REPLACE });
}
```

#### combineReducers

顾名思义，combineReducers 作用是将多个 reducer 合并成一个 reducer 并传入 createStore 函数。

```js
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  // 首先会过滤不合法的reducer
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`);
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);

  let unexpectedKeyCache;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  // 返回一个combination方法 这个方法传入state 和action  返回一个新的状态树
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache,
      );
      if (warningMessage) {
        warning(warningMessage);
      }
    }

    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
```

#### bindActionCreator

在上面的 demo 中，要执行 state 的改变，需要手动 dispatch。为了减少手动操作 dispatch 操作，redux 提供了`bindActionCreator`把 action creators 转化成一个可以执行 dispatch 的函数。

```js
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. ` +
        `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`,
    );
  }

  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
```

举个例子，比如 actions.js

```js
export function increment() {
  return {
    type: 'INCREMENT',
  };
}
export function decrement() {
  return {
    type: 'DECREMENT',
  };
}
```

经过`bindActionCreators`转化后，就会变成：

```js
{
  increment: () => dispatch(decrement());
  decrement: () => dispatch(decrement());
}
```

`react-redux`里的 connect 组件的第二个参数`mapDispatchToProps`会调用这个方法对 action 进行转换。

#### compose & applyMiddleware

上面也提及，applyMiddleware 实际上是一个 enhancer，用于增强 store 的 dispatch 功能。这个函数实际上是实现了函数式编程中的柯里化

```js
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.',
      );
    };

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}
```

下面是 compose 的源码

```js
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

核心的代码在于`funcs.reduce((a, b) => (...args) => a(b(...args)))`，compose 函数的作用在于将 chain 中的所有匿名函数，[f1, f2, ... , fx, ..., fn]，组装成一个新的函数，即新的 dispatch，当新 dispatch 执行时，[f1, f2, ... , fx, ..., fn]，从右到左依次执行（ 所以顺序很重要）。举个例子，加入 n=3，当 compose 执行完后，我们得到的 dispatch 是这样的：

```js
dispatch = f1(f2(f3(store.dispatch))))
```

#### 与 React 搭配

React 有 props 和 state，props 是父级分发下来的属性，state 是组件内部可以自行管理的状态。但是 React 没有数据向上回溯的能力，数据只能单向向下分发，或者自行内部消化。

redux 的出现，能够更好地对 state 进行管理，通过集中化 state 到所有组件最顶层，然后分发给所有组件。为了结合 React 和 redux，我们一般会用`react-redux`工具。

这个工具的核心有两个：

- Provider: 是一个通过 React 的 context api 实现的组件，作为应用顶层的入口，需要把 redux 的 store 传入
- connect: 是一个高阶函数，接受`mapStateToProps`和`mapDispatchToProps`这两个核心参数。
  - mapStateToProps: 需要绑定一个函数，它的参数是 state，最后会 return 你需要的 state。
  - mapDispatchToProps: 这个参数可以是对象或者是函数。主要作用是分发 action。如果是对象，必须是 actionCreators 对象，就像上面的 demo 那样。
