function findSubStr(str1, str2) {
  if (str1.length > str2.length) {
    [str1, str2] = [str2, str1];
  }
  let length = str1.length;
  let j = str1.length;
  while (j--) {
    for (let i = 0; i < length - j; i++) {
      const current = str1.substr(i, j);
      if (str2.indexOf(current) >= 0) {
        return current;
      }
    }
  }

  return '';
}

console.log(findSubStr('aaa3333', 'baa333cc'));
console.log(findSubStr('aaaX3333--', 'baa333ccX3333333x'));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleepTest() {
  console.log('step 1');
  await sleep(1000);
  console.log('step 2');
}

sleepTest();

function throttleSimple(fn, ms, context) {
  let lastTime = null;

  return function() {
    let newTime = +new Date();
    if (!lastTime || lastTime - newTime > ms) {
      fn.apply(context, arguments);
      lastTime = newTime;
    }
  };
}

function throttleAnother(fn, ms, context) {
  let pending = false;

  return function() {
    if (!pending) {
      const self = this;
      const args = arguments;
      pending = true;
      setTimeout(function() {
        fn.apply(context || self, args);
        pending = false;
      }, ms);
    }
  };
}

function debounceSimple(fn, ms, context) {
  let timer = null;

  return function() {
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, ms);
  };
}

/**
比如说 var a = new b()
创建一个新的对象 newObj{}
继承被实例化函数的原型 ：newObj.__proto__ = b.prototype
将这个对象newObj绑定到构造函数b中的 this
如果没有返回其他对象，new 操作符调用的函数则会返回这个对象newObj
*/

Function.prototype.myBind = function(context) {
  const args = Array.prototype.slice.call(arguments, 1);
  const self = this;

  return function() {
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(context, args.concat(bindArgs));
  };
};

function bFn(name) {
  this.name = name;
}

var obj = {};

var bar = bFn.myBind(obj);
bar('jack');
console.log(obj.name);

function step(n) {
  if (n < 3) {
    return n;
  }
  const ary = [];

  ary[0] = 1;
  ary[1] = 2;
  for (let i = 2; i < n; i++) {
    ary[i] = ary[i - 1] + ary[i - 2];
  }
  return ary[n - 1];
}

function stepAnother(n) {
  let last = 1;
  let nextLast = 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result = last + nextLast;
    nextLast = last;
    last = result;
  }
  return result;
}
console.log('step', step(5), step(10));
console.log('stepAnother', stepAnother(5), stepAnother(10));
