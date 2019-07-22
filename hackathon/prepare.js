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
