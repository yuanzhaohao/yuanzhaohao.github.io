// 深拷贝
//
function clone(originalSource) {
  const cloneObject = {};
  const stack = [
    {
      source: originalSource,
      target: cloneObject,
    },
  ];
  // const sourceReferences = [originalSource];
  // const targetReferences = [cloneObject];
  let current;

  while ((current = stack.shift())) {
    const keys = Object.keys(current.source);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let value = current.source[key];
      if (value === null || typeof value !== 'object') {
        current.target[key] = value;
        continue;
      }

      const nextSource = value;
      const newValue = Array.isArray(nextSource) ? [] : {};

      // 检测是否存在循环引用
      // const index = sourceReferences.indexOf(nextSource);
      // if (index !== -1) {
      //   newValue = targetReferences[index];
      //   current.target[key] = newValue;
      //   continue;
      // }
      // sourceReferences.push(nextSource);
      // targetReferences.push(newValue);

      current.target[key] = newValue;
      stack.push({
        source: nextSource,
        target: newValue,
      });
    }
  }

  return cloneObject;
}

function cloneDeep(originalSource) {
  const cloneObject = {};
  const stack = [
    {
      source: originalSource,
      target: cloneObject,
    },
  ];
  let current;

  while ((current = stack.shift())) {
    const keys = Object.keys(current.source);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = current.source[key];
      if (value === null || typeof value !== 'object') {
        current.target[key] = value;
        continue;
      }

      const nextSource = value;
      const newValue = Array.isArray(nextSource) ? [] : {};

      current.target[key] = newValue;
      stack.push({
        source: nextSource,
        target: newValue,
      });
    }
  }

  return cloneObject;
}

let objC = {
  a: 'df',
  b: [1, 2, 3],
  c: {
    v: 'fdsf',
    d: 1,
    c: true,
    a: {
      d: 'fdf',
    },
  },
  d: 'ccccc',
  er: 1,
};

console.log(clone(objC));
console.log(cloneDeep(objC));

// 非严格比对
//
if ([] == false) {
  console.log(1);
}
if ({} == false) {
  console.log(2);
}
if ([]) {
  console.log(3);
}
if ([1] == [1]) {
  console.log(4);
}

/**
 * script start
 * a1 start
 * a2
 * promise2
 * script end
 * promise1
 * a1 end
 * promise2.then
 * promise3
 * setTimeout
 */
// async function a1() {
//   console.log('a1 start');
//   await a2();
//   console.log('a1 end');
// }
// async function a2() {
//   console.log('a2');
// }

// console.log('script start');

// setTimeout(() => {
//   console.log('setTimeout');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('promise1');
// });

// a1();

// let promise2 = new Promise(resolve => {
//   resolve('promise2.then');
//   console.log('promise2');
// });

// promise2.then(res => {
//   console.log(res);
//   Promise.resolve().then(() => {
//     console.log('promise3');
//   });
// });
// console.log('script end');

/**
 * 函数节流
 */
function throttle(fn, ms = 150, context) {
  let lastTime;

  return function() {
    let newTime = !new Date();
    const args = arguments;
    if (!lastTime || newTime - lastTime >= ms) {
      fn.apply(context, args);
    }
  };
}

/**
 * 输出1， 2， 3
 */
// for (let i = 0; i < 3; i++) {
//   const j = i + 1;
//   setTimeout(function() {
//     console.log(j);
//   }, 0);
// }

// for (let i = 1; i <= 3; i++) {
//   const j = i;
//   new Promise((resolve) => {
//     console.log(j);
//     resolve();
//   });
// }

/**
 * EventEmitter
 */
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (!Array.isArray(this.events[event])) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      const listeners = this.events[event];
      for (let i = 0; i < listeners.length; i++) {
        listeners[i].apply(this, args);
      }
    }
  }

  remove(event, listener) {
    if (this.events[event]) {
      const listeners = this.events[event];
      const idx = listeners.indexOf(listener);
      if (idx !== -1) {
        listeners.splice(idx, 1);
      }
    }
  }

  once(event, listener) {
    const self = this;
    self.on(event, function fn() {
      this.remove(event, fn);
      listener.apply(self, arguments);
    });
  }
}

const eventEmitter = new EventEmitter();
eventEmitter.on('event1', function(a) {
  console.log('call event1', a);
});
eventEmitter.once('once event', function(a) {
  console.log('call once event', a);
});

document.addEventListener('click', function() {
  eventEmitter.emit('event1', 1);
  eventEmitter.emit('once event', 2);
});

/**
 * bind的实现
 * 默认绑定
 * 隐式绑定
 * 显式绑定
 * new 绑定
 */
Function.prototype.myBind = function(context, ...args) {
  const self = this;

  function bindFn(...bindArgs) {
    self.apply(this instanceof self ? this : context, args.concat(bindArgs));
  }
  function loop() {}

  loop.prototype = this.prototype;
  bindFn.prototype = new loop();

  return bindFn;
};

function foo(name) {
  this.name = name;
}

const obj = {};
const bar = foo.myBind(obj);
bar('Jack');
console.log('bind', obj.name);
const alice = new bar('Alice');
console.log(obj.name);
console.log(alice.name);

/**
 * 实现一个sendRequest，有最大请求并发限制
 */
const fetchData = url => {
  return window.fetch(url).then(function(response) {
    return response.json();
  });
};
const sendRequest = async (urls, max, callback) => {
  let current = 0;
  const total = urls.length;
  const totalResp = {};
  const handler = () => {
    if (urls.length) {
      const url = urls.shift();
      current++;
      fetch(url).then(function(resp) {
        current--;
        if (current < max) {
          handler();
        }
        totalResp[url] = resp;
        if (Object.keys(totalResp).length >= total) {
          callback();
        }
      });
    }
  };

  for (let i = 0; i < max; i++) {
    handler();
  }

  return new Promise(resolve => {
    resolve(totalResp);
  });
};

(async function() {
  const resp = await sendRequest(
    [
      './birthday.html',
      './coding.js',
      './index.html',
      './love.html',
      './prepare.html',
      './prepare.js',
      './prepare.css',
    ],
    3,
    () => {
      console.log('call callback');
    },
  );
  console.log(resp);
})();

/**
 * sleep函数
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

async function testSleep() {
  console.log('Hello');
  await sleep(3000);
  console.log('world');
}
testSleep();

/**
 * 最大不重复子串
 */
function longestSubStr(str) {
  if (str.length === 0) {
    return '';
  }
  let subStr = str.charAt(0);
  let len = subStr.length;
  let result = subStr;
  for (let i = 1; i < str.length; i++) {
    const index = subStr.indexOf(str[i]);
    if (index !== -1) {
      subStr = subStr.substr(index + 1) + str[i];
    } else {
      subStr += str[i];
    }
    if (subStr.length > len) {
      len = subStr.length;
      result = subStr;
    }
  }
  return result;
}

console.log(longestSubStr('abcdbsbc'));
console.log(longestSubStr('abcabcbb'));

/**
 * 括号比对
 */
function parentheseValid(s) {
  if (s === '') {
    return true;
  }
  const stack = [];
  const left = ['(', '[', '{'];
  const right = [')', ']', '}'];
  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    if (left.indexOf(item) !== -1) {
      stack.push(item);
      continue;
    }
    if (right.indexOf(item) !== -1) {
      const p = stack.pop();
      switch (item) {
        case ')':
          if (p !== '(') {
            return false;
          }
          break;
        case '}':
          if (p !== '{') {
            return false;
          }
          break;
        case ']':
          if (p !== '[') {
            return false;
          }
          break;
      }
    }
  }
  return stack.length === 0;
}
console.log(parentheseValid(''));
console.log(parentheseValid('[['));
console.log(parentheseValid('()'));
console.log(parentheseValid('()[]{}'));
console.log(parentheseValid('([)]'));
console.log(parentheseValid('{[]}'));
