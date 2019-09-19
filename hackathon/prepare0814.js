function findLongestSubStr(str1, str2) {
  if (str1.length > str2.length) {
    [str1, str2] = [str2, str1];
  }
  const length = str1.length;
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

console.log(findLongestSubStr('aaaa2233214', 'aaaa22ddfa'));

function throttleSimple(fn, ms, context) {
  let lastTime = null;

  return function() {
    let newTime = !new Date();
    if (!lastTime || lastTime - newTime > ms) {
      fn.apply(context || this, arguments);
      lastTime = newTime;
    }
  };
}

function throttleAnother(fn, ms = 150, context) {
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

document.addEventListener(
  'touchmove',
  throttleAnother(function() {
    console.log('call throttle touchmove');
  }, 200),
  false,
);

function debounceSimple(fn, ms = 150, context) {
  let timer = null;

  return function() {
    const args = arguments;
    const self = this;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context || self, ms);
    }, ms);
  };
}

Function.prototype.myBind = function(context) {
  const args = Array.prototype.slice.call(arguments, 1);
  const self = this;

  return function() {
    const bindArgs = Array.prototype.slice.call(arguments);

    return self.apply(context, args.concat(bindArgs));
  };
};

function clone(originalObject, circular) {
  // First create an empty object with
  // same prototype of our original source
  var propertyIndex,
    descriptor,
    keys,
    current,
    nextSource,
    indexOf,
    copies = [
      {
        source: originalObject,
        target: Object.create(Object.getPrototypeOf(originalObject)),
      },
    ],
    cloneObject = copies[0].target,
    sourceReferences = [originalObject],
    targetReferences = [cloneObject];
  // First in, first out
  while ((current = copies.shift())) {
    keys = Object.getOwnPropertyNames(current.source);
    for (propertyIndex = 0; propertyIndex < keys.length; propertyIndex++) {
      // Save the source's descriptor
      descriptor = Object.getOwnPropertyDescriptor(current.source, keys[propertyIndex]);
      if (!descriptor.value || typeof descriptor.value !== 'object') {
        Object.defineProperty(current.target, keys[propertyIndex], descriptor);
        continue;
      }
      nextSource = descriptor.value;
      descriptor.value = Array.isArray(nextSource)
        ? []
        : Object.create(Object.getPrototypeOf(nextSource));
      if (circular) {
        indexOf = sourceReferences.indexOf(nextSource);
        if (indexOf !== -1) {
          // The source is already referenced, just assign reference
          descriptor.value = targetReferences[indexOf];
          Object.defineProperty(current.target, keys[propertyIndex], descriptor);
          continue;
        }
        sourceReferences.push(nextSource);
        targetReferences.push(descriptor.value);
      }
      Object.defineProperty(current.target, keys[propertyIndex], descriptor);
      copies.push({ source: nextSource, target: descriptor.value });
    }
  }
  return cloneObject;
}
