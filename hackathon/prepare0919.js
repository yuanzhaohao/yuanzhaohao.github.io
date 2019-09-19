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
    console.log(keys);
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
