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
  function s(b) {
    a = a + b;
    return s;
  }
  s.toString = function() {
    return a;
  };

  return s;
}

console.log(add(1)(2));
