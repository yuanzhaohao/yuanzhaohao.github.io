<!--
date: 2013-10-07
title: 优化篇-Javascript 的加载和执行
description: 首先理解一个概念，Javascript 的阻塞性，浏览器在执行和加载 Javascript 代码的时候，浏览器不能同时做其他事情。也就是说，页面的下周和渲染都必须停下来等待 Javascript 脚步执行完成。
-->

## 优化篇-Javascript 的加载和执行

> 首先理解一个概念，Javascript 的阻塞性，浏览器在执行和加载 Javascript 代码的时候，浏览器不能同时做其他事情。也就是说，页面的下周和渲染都必须停下来等待 Javascript 脚步执行完成。

看看下面这段简单的代码：

 <html> <head> <title>example</title> </head> <body> <p> <script type="text/javascript" src="file.js"></script> </p> </body> </html>

上面的代码中，页面并不会因为 script 标签在 p 标签内，就先渲染完 p 标签，而是加载并执行 Javascript 代码，然后再继续渲染页面。在这个过程中，页面的渲染和用户交互就会完全被阻塞；

### 脚本的位置

很多开发人员往往会写出下面的 html 代码，尤其是刚接触前端的孩子；

```html
<html>
  <head>
    <title>example2</title>
    <script type="text/javascript" src="file1.js"></script>
    <script type="text/javascript" src="file2.js"></script>
    <script type="text/javascript" src="file3.js"></script>
  </head>
  <body>
    不多说别的东西，好好准备吧！
  </body>
</html>
```

上面的代码存在严重的性能问题：由于脚本会阻塞页面渲染，这段代码会等到三个 js 文件全部下载并执行完毕之后，页面的渲染才会继续。把脚本放在顶部会通常会导致页面显示空白，此时页面无法渲染，用户也无法进行页面操作；

因此 Javascript 脚本最佳放置位置应该是页面的尾部：

```html
<html>
  <head>
    <title>example3</title>
  </head>
  <body>
    不多说别的东西，好好准备吧！
    <script type="text/javascript" src="file1.js"></script>
    <script type="text/javascript" src="file2.js"></script>
    <script type="text/javascript" src="file3.js"></script>
  </body>
</html>
```

### 组织脚本

页面在加载的过程中，每遇到一个 script 标签的时候，都会因执行脚本而导致一定的延时。这里最佳的解决办法就是尽可能少使用 script 标签，也就是把脚本压缩并合并，这里推荐 gruntjs；

### 无阻塞脚本

无阻塞脚本的秘诀在于，在页面加载完成之后，再加载 Javascript 脚本，也就是在 window 对象触发 load 事件之后，再下载脚本；

#### 方法一：延迟脚本

（我困得不行了，先睡觉吧，明天再弄吧！）

好吧，今天继续写这篇文章吧！（ps：今天的工作还是没有做完，难道又要 delay 了，这是神马节奏呀！脸皮不够厚呀！）

HTML4.01 为 script 标签定义了 defer 属性，这个属性的用途是表示脚本在执行的时候不会影响到页面的构造。也就是脚本会延迟到整个页面都解析完毕后再运行。因此，在 script 标签里面设置 defer 属性，相当于告诉浏览器立刻下载，但延迟执行。

```html
<html>
  <head>
    <title>New Document</title>
    <script type="text/javascript" defer="defer" src="example1.js"></script>
    <script type="text/javascript" defer="defer" src="example2.js"></script>
  </head>
  <body>
    <!--这里放内容-->
  </body>
</html>
```

这个例子中，虽然我们把 script 元素放在了文档的<head>元素中，但其中包含的脚本将延迟到浏览器遇到</html\>标签后在执行。

#### 动态脚本元素

也就是通过 DOM 方法创建 script 标签，从而加载 js 文件。无论何时启动下载，文件的下载和执行过程都不会阻塞页面的加载。

```js
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'jquery.js';
document.getElementsByTagName('head')[0].appendChild(script);
```

使用这种动态脚本元素的方法，下载文件时，通常返回的代码就会立刻执行。现在的问题是必须跟踪并确保脚本下载完成；

现代浏览器（除了 IE8 以及其以下的 IE 浏览器，其它浏览器包括 IE9，IE10 都可以称为现代浏览器了，IE9 和 IE10 的兼容性已经改善很多了）会在 script 标签接收完成后时触发一个 load 事件。

```js
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'jquery.js';
script.onload = function() {
  console.log('jquery loaded!');
};
document.getElementsByTagName('head')[0].appendChild(script);
```

在非现代浏览器（哈哈，这里的非现代浏览器就是指 IE8 及其以下的 ie 浏览器了，真心想说一句：fx ie），会触发一个 readystatechange 函数；script 标签会根据一个 readyState 属性来判断脚本的下载情况，下面是这个属性的 5 个属性值；

- uninitialized：初始状态；
- loading：开始下载；
- loaded：下载完成；
- interactive：数据完成下载但还尚不可使用；
- complete：所有的数据已经准备就绪；

具体代码如下：

```js
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'jquery.js';
script.onreadystatechange = function() {
  if (script.readyState === 'loaded' || script.readyState === 'complete') {
    script.onreadystatechange = null;
    alert('jquery loaded!');
  }
};
document.getElementsByTagName('head')[0].appendChild(script);
```

**兼容性较好的函数：**

```js
function loadScript(url, callback) {
  if (typeof url === 'string' && typeof callback === 'function') {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function() {
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  var script = document.createElement('script');
  script.type = 'text/javascript';
}
loadScript('jquery.js', function() {
  document.write('jquery loaded!');
});
```

#### XHR 脚本注入

顾名思义，就是创建 XHR 对象，然后用它来下载 Javascript 文件，最后通过创建 script 标签将代码注入到页面中去。

```js
var xhr = new XMLHttpRequest();
xhr.open('get', 'jquery.js', true);
xhr.onreadystatechange = function() {
  console.log(xhr.readyState);
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      var script = document.createElement('script');
      script.type = 'text/javascirpt';
      script.text = xhr.responseText;
      document.body.appendChild(script);
    }
  }
};
```

这项技术最大的优点就是异步执行吧，而且兼容性很好。但缺点也很明显，那就是**跨域问题**了
