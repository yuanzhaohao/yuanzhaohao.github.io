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

let obj = {
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

console.log(clone(obj));
console.log(cloneDeep(obj));

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
async function a1() {
  console.log('a1 start');
  await a2();
  console.log('a1 end');
}
async function a2() {
  console.log('a2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise1');
});

a1();

let promise2 = new Promise(resolve => {
  resolve('promise2.then');
  console.log('promise2');
});

promise2.then(res => {
  console.log(res);
  Promise.resolve().then(() => {
    console.log('promise3');
  });
});
console.log('script end');

/**
 * bind的实现
 */
Function.prototype.myBind = function(context) {
  const args = Array.prototype.slice.call(arguments, 1);
  const self = this;

  return function() {
    self.apply(context, args.concat(Array.prototype.slice.call(arguments)));
  };
};

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
