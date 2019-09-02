/**
 * wangxingnan@bytedance.com对所有人说： (06:38 下午)
 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。
你有多少种不同的方法可以爬到楼顶呢？
注意：给定 n 是一个正整数。
*/

function step(n) {
  if (n < 3) {
    return n;
  }
  const ary = [];
  ary[0] = 1;
  ary[1] = 2;
  for (let i = 2; i < n - 1; i++) {
    ary[i] = ary[i - 1] + ary[i - 2];
  }
  return ary[n - 1];
}

function stepAnother(n) {
  let result = 1;
  let last = 1;
  let tempLast = 1;

  for (let i = 2; i <= n; i++) {
    result = tempLast + last;
    tempLast = last;
    last = result;
  }

  return result;
}

function step2(n) {
  return step2(n - 2) + step2(n - 1);
}
