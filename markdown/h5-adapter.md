<!--
date: 2017-12-25
title: H5页面的终端适配方案探索
description: 在移动端的时代，终端适配一直以来都是一个头痛的难题。为了解决h5页面的终端适配问题，业界也做了不少的探索，比如我以前的团队实现的[基于rem的flexible布局](https://github.com/amfe/article/issues/17)，以及大漠老师近期提出的[基于vw的布局方案](https://www.w3cplus.com/css/vw-for-layout.html)。
-->

## H5 页面的终端适配方案探索

在移动端的时代，终端适配一直以来都是一个头痛的难题。为了解决 h5 页面的终端适配问题，业界也做了不少的探索，比如我以前的团队实现的[基于 rem 的 flexible 布局](https://github.com/amfe/article/issues/17)，以及大漠老师近期提出的[基于 vw 的布局方案](https://www.w3cplus.com/css/vw-for-layout.html)。

以上两个解决方案是比较优秀的解决方案，但同时也存在了一些问题，比如说前者在我厂的 qq 浏览器（一般是 Android）上就存在着一堆问题导致方案不可用；而后者虽然简单方便，但是兼容性并不是很好，Android4.3 以下的手机是不支持 vw 单位的。于是本人在这两套方案的基础上，实现了另外一套方案。

话不多说，先上图

<div style="width: 100%;">
	<img src="/static/img/h5-adapter-iphone7p.jpg" style="float: left; width: 30%; margin-right: 7px;">
	<img src="/static/img/h5-adapter-iphone7.jpg" style="float: left; width: 30%; margin-right: 7px;">
	<img src="/static/img/h5-adapter-android.jpg" style="float: left; width: 30%; margin-right: 7px;">
	<p style="clear: both;"></p>
</div>

（分别是 iPhone7p、iPhone7 和两台低端 Android 手机）

### 解决思路

![h5-adapter](/static/img/h5-adapter-theory.png)

大体的思路如下：

- 生产：在构建端，实现了 postcss-px2viewport 的工具来自动化处理 css 代码。开发者只需要根据视觉稿标准来编写即可，剩余的转换工作交由 postcss-px2viewport 自动转换。

- 使用：在 app 端，名为 viewport.js 的 sdk 会识别当前设备的基本信息，包括设备类型（Android or iPhone）、retina 屏、Android 版本等信息，以此来选择不同的样式进行布局。

下面将讲讲其中的细节

### 适配方案

在移动端布局，我们需要面对两个最为重要的问题：

- 各终端下的适配问题
- Retina 屏的细节处理

方案大概的思路如下：

- 默认使用 vw 作为布局单位，对于不支持 vw 单位的，则使用 rem 进行布局
- 对于标记了`/*px*/`的，则转换为`[data-dpr="1"]`、`[data-dpr="2"]`、`[data-dpr="3"]`三种不同的`px`值
- 对于标记了`/*no*/`的，则不做处理，依然使用`px`进行布局

#### 终端适配

先普及一下 rem 和 vw 的基本概念

- rem 单位：在 W3C 规范中是这样描述 rem 的:Relative to font-size of the root element。也就是说，`rem`是相对于根元素`<html>`的`font-size`来做计算。
- vw 单位：在 W3C 规范中是这样描述 rem 的: Relative to 1% of the height of the viewport. `vw`是 Viewport's width 的简写，`1vw`等于`window.innerWidth`的 1%。

无论是使用 rem 单位还是使用 vw 单位，只要把样式里面的 px 换算成 rem 或者 vw 就能轻松进行布局。不得不说，rem 的方案给我一种 hack vw 的感觉，但是 rem 的方案确实兼容性确实比 vw 方案要好。

因此，我们需要把设计稿（一般视觉稿都是基于 750 的标准来实现的）中的`px`转换为`rem`或者`vw`，为此，我专门写了一个 postcss 插件[postcss-px2viewport](https://github.com/yuanzhaohao/postcss-px2viewport)。把`px`转换为`vw`单位，同时针对 Android4.3 以下版本的手机把 css 转换成`rem`

```css
.class {
  width: 750px;
  background-size: 30px 10px;
}
```

经过[postcss-px2viewport](https://github.com/yuanzhaohao/postcss-px2viewport)处理，会转换成以下这样：

```css
.class {
  width: 10vw;
  background-size: 4vw 1.3333333vw;
}
[data-rem='true'] .class {
  width: 10rem;
  background-size: 0.4rem 0.1333333rem;
}
```

#### Retina 屏的细节处理

`rem`和`vw`都是一种等比压缩的布局方案，在现实开发中，不可避免地需要使用 px 单位的使用。最常见的就是字体，我们都是希望使用 px 进行布局的，因为在换算的过程中，有可能**呈现出来**的大小可能是 13px、15px 这样的奇数值。所以在各个终端下，设计师希望看到的字体是一致的（小于 12px 的情况除外）。

那么是不是这样意味着所有的设备都设置一样的 px 呢？答案显然不是的。我们依然需要针对不同的设备像素比(dpr)来计算不同的`px`。下面再普及一些基本概念：

- 物理像素：物理像素又被称为设备像素，他是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。正是这些设备像素的微小距离欺骗了我们肉眼看到的图像效果。
- CSS 像素：CSS 像素是一个抽像的单位，主要使用在浏览器上，用来精确度量 Web 页面上的内容。一般情况之下，CSS 像素称为与设备无关的像素(device-independent pixel)，简称 DIPs。
- 设备像素比(dpr)：是指在移动开发中 1 个 css 像素占用多少物理像素，比如`dpr=2`代表 1 个 css 像素用`2x2个`物理像素来绘制。在 JavaScript 中，可以通过`window.devicePixelRatio`获取到当前设备的 dpr。

在不同的屏幕上，CSS 像素所呈现的物理尺寸是一致的，而不同的是 CSS 像素所对应的物理像素具数是不一致的。在普通屏幕下 1 个 CSS 像素对应 1 个物理像素，而在 Retina 屏幕下，1 个 CSS 像素对应的却是 4 个物理像素。

因此，在本方案依然会根据不同的设备的`devicePixelRatio`来动态设置 viewport 的 scale，并且使用`[data-dpr]`属性来区分不同`dpr`下的的`px`大小。这里依然是使用到了[postcss-px2viewport](https://github.com/yuanzhaohao/postcss-px2viewport)处理。

```css
.class {
  height: 64px; /*px*/
  font-size: 28px; /*px*/
  border: 1px solid #ddd; /*no*/
}
```

经过[postcss-px2viewport](https://github.com/yuanzhaohao/postcss-px2viewport)处理，会转换成以下这样：

```css
[data-dpr='1'] .selector {
  height: 32px;
  font-size: 14px;
}
[data-dpr='2'] .selector {
  height: 64px;
  font-size: 28px;
}
[data-dpr='3'] .selector {
  height: 96px;
  font-size: 42px;
}
```

#### 关于 postcss-px2viewport 的使用

可以看下这个简单的[例子](https://github.com/yuanzhaohao/postcss-px2viewport/blob/master/example/index.js)

```javascript
var fs = require('fs');
var path = require('path');
var postcss = require('postcss');
var px2viewport = require('..');
var srcPath = path.join(__dirname, 'source.css');
var destPath = path.join(__dirname, 'dest.css');
var srcText = fs.readFileSync(srcPath, 'utf8');
var outputText = postcss(
  px2viewport({
    viewportWidth: 750, // 设备屏幕宽度，即视觉稿标准宽度，默认是750
    unitPrecision: 7, // 最多保留小数点最后的位数，默认是7
    minPixelValue: 1, // 最小px数，小于此数值，不作处理，默认是1
    baseDpr: 2, // 屏幕dpr，即视觉稿的标准dpr，默认是750
  }),
).process(srcText).css;

fs.writeFile(destPath, outputText, function(err) {
  if (err) throw err;
  console.log('File with viewport units written.');
});
```

最后附上`viewport.js`的代码

```javascript
(function(win) {
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var tid = 0;
  var dpr = 1;
  var scale = 0;
  var androidMinVer = [4, 3]; //低于或等于Android4.3版本的，则使用rem方案

  if (!metaEl) {
    metaEl = doc.createElement('meta');
  }

  metaEl.setAttribute('name', 'viewport');
  win.addEventListener(
    'resize',
    function() {
      clearTimeout(tid);
      tid = setTimeout(refresh, 300);
    },
    false,
  );
  win.addEventListener(
    'pageshow',
    function(e) {
      if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refresh, 300);
      }
    },
    false,
  );

  function refresh() {
    var devicePixelRatio = win.devicePixelRatio;
    var detector = new Detector();
    var isUseRem;
    if (detector.iOS || (detector.Android && detector.checkAndVer(androidMinVer))) {
      if (devicePixelRatio >= 3) {
        dpr = 3;
      } else if (devicePixelRatio >= 2) {
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      dpr = 1;
    }

    scale = 1 / dpr;

    metaEl.setAttribute(
      'content',
      'width=device-width,initial-scale=' +
        scale +
        ', maximum-scale=' +
        scale +
        ', minimum-scale=' +
        scale +
        ', user-scalable=no',
    );
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      var wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
    docEl.setAttribute('data-dpr', dpr);
    if (detector.Android && !detector.checkAndVer(androidMinVer)) {
      var width = docEl.getBoundingClientRect().width;
      var rem = width / 10;
      docEl.setAttribute('data-rem', 'true');
      docEl.style.fontSize = rem + 'px';
    } else {
      docEl.setAttribute('data-rem', 'false');
    }
  }

  function Detector() {
    var ua = win.navigator.userAgent;
    this.androidMatch = ua.match(/Android ([\d\.]+)/);
    this.iOSMatch = ua.match(/(ipod|iphone|ipad)/i);
    this.Android = !!this.androidMatch;
    this.iOS = !!this.iOSMatch;
  }

  Detector.prototype.checkAndVer = function(version) {
    if (this.Android) {
      var localVersion = this.androidMatch[1].split('.');
      var len = Math.min(version.length, localVersion.length);
      for (var i = 0; i < len; i++) {
        if (parseInt(localVersion[i]) == parseInt(version[i])) continue;
        return parseInt(localVersion[i]) > parseInt(version[i]) ? true : false;
      }
      return false;
    }
  };

  refresh();
})(window);
```

欢迎讨论：）

#### 链接

- [postcss-px2viewport](https://github.com/yuanzhaohao/postcss-px2viewport)
- [seven-cli](https://github.com/yuanzhaohao/seven-cli)
