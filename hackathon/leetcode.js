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
