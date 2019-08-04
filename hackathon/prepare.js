'use strict';

/**
 * valid-parentheses/
 */

var isValid = function(s) {
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
};

console.log(isValid(''));
console.log(isValid('[['));
console.log(isValid('()'));
console.log(isValid('()[]{}'));
console.log(isValid('([)]'));
console.log(isValid('{[]}'));

var longestSubstring = function(s) {
  if (s.lengh == 0) {
    return '';
  }
  let subStr = s.charAt(0);
  let len = 1;
  let strMap = [subStr];
  for (let i = 0; i < s.length; i++) {
    const index = subStr.indexOf(s[i]);
    if (index !== -1) {
      subStr = subStr.substr(index + 1) + s[i];
    } else {
      subStr = subStr + s[i];
    }
    if (subStr.length > len) {
      len = subStr.length;
      strMap.push(subStr);
    }
  }
  console.log(strMap);
  return len;
};

console.log(longestSubstring('abcabcbb'));
function add(a) {
  function fn(b) {
    a += b;
    fn.val = a;
    return fn;
  }
  fn.val = a;
  return fn;
}

console.log(add(1).val);
console.log(add(1)(2).val);
console.log(add(1)(2)(3).val);

function fn(n) {
  let f = m => fn(m + n);
  f.val = n;
  return f;
}

console.log(fn(1).val);
console.log(fn(1)(2).val);
console.log(fn(1)(2)(3).val);

// const a1 = add(1);
// const a2 = add(1)(2);
// const a3 = add(1)(2)(3);

// console.log(a1.val);
// console.log(a2.val);
// console.log(a3.val);

// function add(a) {
//   function mid(f,b){
//   	function r(c){
//   		return mid(r,c)
//   	}
//   	r.valueOf = function(){
//   		return f.valueOf() + b
//   	}
//   	return r
//   }
//   function start(b){
//     return mid(start,b)
//   }
//   start.valueOf = function() {return a}
//   return start
// }

// function add(x) {
//   function helper(y, x) {
//     var sum = y + x;
//     var f = helper.bind(null, sum);
//     f.toString = function () {
//       return '' + sum;
//     };
//     f.valueOf = function () {
//       return sum;
//     };
//     return f;
//   }
//   return helper(x, 0);
// }

// console.log(+add(1));
// console.log(add(1)(2)(3));

/**
 * bind，call，apply三个函数的认识，自己实现一下bind方法。
 */
Function.prototype.bindFunction = function(context) {
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);

  return function() {
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(context, args.concat(bindArgs));
  };
};

var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
}

var bindFoo = bar.bindFunction(foo, 'display');
bindFoo('18');

// arguments转换数组
//
function testArgs(a, b, c) {
  console.log([...arguments]);
  console.log(Array.from(arguments));
}
testArgs(1, 2, 3);

// 拷贝数组
//
const ary = [1, 2];
console.log(ary.slice());
console.log([].concat(ary));
console.log(Array.from(ary));
console.log([...ary]);

// 清空数组
//
ary.splice(0, ary.length);
console.log(ary);

var ary2 = [1, 3];
ary2.length = 0;
console.log(ary2);

var ary3 = [1, 2];
ary3 = [];
console.log(ary3);

// 判断数组
//
console.log(Object.prototype.toString.call(ary) === '[object Array]');
console.log(ary instanceof Array);
console.log(Array.isArray(ary));

// 非严格比较操作符
//
console.log([] == false);
console.log(!![] == true);
console.log([1] == [1]);

// Event loop
//
function eventLoop() {
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

  // script start
  // a1 start
  // a2
  // promise2
  // script end
  // promise1
  // a1 end
  // promise2.then
  // promise3
  // setTimeout
}

//
function eventLoop2() {
  console.log('script start');

  async function async1() {
    await async2();
    console.log('async1 end');
  }
  async function async2() {
    console.log('async2 end');
  }
  async1();

  setTimeout(function() {
    console.log('setTimeout');
  }, 0);

  new Promise(resolve => {
    console.log('Promise');
    resolve();
  })
    .then(function() {
      console.log('promise1');
    })
    .then(function() {
      console.log('promise2');
    });

  console.log('script end');
  // script start
  // async2 end
  // Promise
  // script end
  // async1 end
  // promise1
  // promise2
  // setTimeout
}

// sleep函数
//
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function test() {
  console.log('Hello');
  await sleep(3000);
  console.log('world');
}

test();

// bind的实现
// 1. 改变原函数的this，绑定上下文，返回原函数的拷贝
// 2、绑定函数被调用的时候，bing额外的参数能传递到被绑定的函数
// 3、能使用new关键字创建对象
//
Function.prototype.myBind = function(context) {
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);
  const fn = function() {
    const bindArgs = Array.prototype.slice.call(arguments);
    const newContext = this instanceof self ? this : context;
    return self.apply(newContext, args.concat(bindArgs));
  };
  fn.prototype = this.prototype;
  return fn;
};

function bFn(name) {
  this.name = name;
}

var obj = {};

var bar = bFn.myBind(obj);
bar('jack');
console.log(obj.name);

var tar = bFn.myBind(obj, 'rose');
tar();
console.log(obj.name);

var alice = new bar('Alice');
console.log(obj.name);
console.log(alice.name);

function throttle(context, fn, ms) {
  let lastTime = null;

  return function() {
    let newTime = +new Date();
    if (newTime - lastTime > ms || !lastTime) {
      fn.apply(context, arguments);
      lastTime = newTime;
    }
  };
}

let fnT = () => {
  console.log('boom');
};

// setInterval(throttle(window, fnT, 1000), 100);
