(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{120:function(e,n){e.exports={markdown:"<h2>H5 页面的终端适配方案探索</h2>\n<p>在移动端的时代，终端适配一直以来都是一个头痛的难题。为了解决 h5 页面的终端适配问题，业界也做了不少的探索，比如我以前的团队实现的<a href=\"https://github.com/amfe/article/issues/17\">基于 rem 的 flexible 布局</a>，以及大漠老师近期提出的<a href=\"https://www.w3cplus.com/css/vw-for-layout.html\">基于 vw 的布局方案</a>。</p>\n<p>以上两个解决方案是比较优秀的解决方案，但同时也存在了一些问题，比如说前者在我厂的 qq 浏览器（一般是 Android）上就存在着一堆问题导致方案不可用；而后者虽然简单方便，但是兼容性并不是很好，Android4.3 以下的手机是不支持 vw 单位的。于是本人在这两套方案的基础上，实现了另外一套方案。</p>\n<p>话不多说，先上图</p>\n<div style=\"width: 100%;\">\n\t<img src=\"http://km.oa.com/files/photos/pictures/201711/1510664226_87_w1080_h1920.jpeg\" style=\"float: left; width: 23%; margin-right: 7px;\">\n\t<img src=\"http://km.oa.com/files/photos/pictures/201711/1510664107_12_w563_h1000.png\" style=\"float: left; width: 23%; margin-right: 7px;\">\n\t<img src=\"http://km.oa.com/files/photos/pictures/201711/1510664107_6_w640_h1136.jpeg\" style=\"float: left; width: 23%; margin-right: 7px;\">\n\t<img src=\"http://km.oa.com/files/photos/pictures/201711/1510664225_13_w1080_h1440.jpeg\" style=\"float: left; width: 23%;\">\n\t<p style=\"clear: both;\"></p>\n</div>\n<p>（分别是 iPhone7p、iPhone7、iPhone5 和两台低端 Android 手机）</p>\n<h3>解决思路</h3>\n<img src=\"http://km.oa.com/files/photos/captures/201712/1512715435_52_w1022_h882.png\" style=\"display: block; width: 70%; margin: 0 auto\">\n<p>大体的思路如下：</p>\n<ul>\n<li>\n<p>生产：在构建端，实现了 postcss-px2viewport 的工具来自动化处理 css 代码。开发者只需要根据视觉稿标准来编写即可，剩余的转换工作交由 postcss-px2viewport 自动转换。</p>\n</li>\n<li>\n<p>使用：在 app 端，名为 viewport.js 的 sdk 会识别当前设备的基本信息，包括设备类型（Android or iPhone）、retina 屏、Android 版本等信息，以此来选择不同的样式进行布局。</p>\n</li>\n</ul>\n<p>下面将讲讲其中的细节</p>\n<h3>适配方案</h3>\n<p>在移动端布局，我们需要面对两个最为重要的问题：</p>\n<ul>\n<li>各终端下的适配问题</li>\n<li>Retina 屏的细节处理</li>\n</ul>\n<p>方案大概的思路如下：</p>\n<ul>\n<li>默认使用 vw 作为布局单位，对于不支持 vw 单位的，则使用 rem 进行布局</li>\n<li>对于标记了<code>/*px*/</code>的，则转换为<code>[data-dpr=&quot;1&quot;]</code>、<code>[data-dpr=&quot;2&quot;]</code>、<code>[data-dpr=&quot;3&quot;]</code>三种不同的<code>px</code>值</li>\n<li>对于标记了<code>/*no*/</code>的，则不做处理，依然使用<code>px</code>进行布局</li>\n</ul>\n<h4>终端适配</h4>\n<p>先普及一下 rem 和 vw 的基本概念</p>\n<ul>\n<li>rem 单位：在 W3C 规范中是这样描述 rem 的:Relative to font-size of the root element。也就是说，<code>rem</code>是相对于根元素<code>&lt;html&gt;</code>的<code>font-size</code>来做计算。</li>\n<li>vw 单位：在 W3C 规范中是这样描述 rem 的: Relative to 1% of the height of the viewport. <code>vw</code>是 Viewport's width 的简写，<code>1vw</code>等于<code>window.innerWidth</code>的 1%。</li>\n</ul>\n<p>无论是使用 rem 单位还是使用 vw 单位，只要把样式里面的 px 换算成 rem 或者 vw 就能轻松进行布局。不得不说，rem 的方案给我一种 hack vw 的感觉，但是 rem 的方案确实兼容性确实比 vw 方案要好。</p>\n<p>因此，我们需要把设计稿（一般视觉稿都是基于 750 的标准来实现的）中的<code>px</code>转换为<code>rem</code>或者<code>vw</code>，为此，我专门写了一个 postcss 插件<a href=\"https://github.com/yuanzhaohao/postcss-px2viewport\">postcss-px2viewport</a>。把<code>px</code>转换为<code>vw</code>单位，同时针对 Android4.3 以下版本的手机把 css 转换成<code>rem</code></p>\n<pre><code class=\"language-css\">.class {\n  width: 750px;\n  background-size: 30px 10px;\n}\n</code></pre>\n<p>经过<a href=\"https://github.com/yuanzhaohao/postcss-px2viewport\">postcss-px2viewport</a>处理，会转换成以下这样：</p>\n<pre><code class=\"language-css\">.class {\n  width: 10vw;\n  background-size: 4vw 1.3333333vw;\n}\n[data-rem='true'] .class {\n  width: 10rem;\n  background-size: 0.4rem 0.1333333rem;\n}\n</code></pre>\n<h4>Retina 屏的细节处理</h4>\n<p><code>rem</code>和<code>vw</code>都是一种等比压缩的布局方案，在现实开发中，不可避免地需要使用 px 单位的使用。最常见的就是字体，我们都是希望使用 px 进行布局的，因为在换算的过程中，有可能<strong>呈现出来</strong>的大小可能是 13px、15px 这样的奇数值。所以在各个终端下，设计师希望看到的字体是一致的（小于 12px 的情况除外）。</p>\n<p>那么是不是这样意味着所有的设备都设置一样的 px 呢？答案显然不是的。我们依然需要针对不同的设备像素比(dpr)来计算不同的<code>px</code>。下面再普及一些基本概念：</p>\n<ul>\n<li>物理像素：物理像素又被称为设备像素，他是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。正是这些设备像素的微小距离欺骗了我们肉眼看到的图像效果。</li>\n<li>CSS 像素：CSS 像素是一个抽像的单位，主要使用在浏览器上，用来精确度量 Web 页面上的内容。一般情况之下，CSS 像素称为与设备无关的像素(device-independent pixel)，简称 DIPs。</li>\n<li>设备像素比(dpr)：是指在移动开发中 1 个 css 像素占用多少物理像素，比如<code>dpr=2</code>代表 1 个 css 像素用<code>2x2个</code>物理像素来绘制。在 JavaScript 中，可以通过<code>window.devicePixelRatio</code>获取到当前设备的 dpr。</li>\n</ul>\n<p>在不同的屏幕上，CSS 像素所呈现的物理尺寸是一致的，而不同的是 CSS 像素所对应的物理像素具数是不一致的。在普通屏幕下 1 个 CSS 像素对应 1 个物理像素，而在 Retina 屏幕下，1 个 CSS 像素对应的却是 4 个物理像素。</p>\n<p>因此，在本方案依然会根据不同的设备的<code>devicePixelRatio</code>来动态设置 viewport 的 scale，并且使用<code>[data-dpr]</code>属性来区分不同<code>dpr</code>下的的<code>px</code>大小。这里依然是使用到了<a href=\"https://github.com/yuanzhaohao/postcss-px2viewport\">postcss-px2viewport</a>处理。</p>\n<pre><code class=\"language-css\">.class {\n  height: 64px; /*px*/\n  font-size: 28px; /*px*/\n  border: 1px solid #ddd; /*no*/\n}\n</code></pre>\n<p>经过<a href=\"https://github.com/yuanzhaohao/postcss-px2viewport\">postcss-px2viewport</a>处理，会转换成以下这样：</p>\n<pre><code class=\"language-css\">[data-dpr='1'] .selector {\n  height: 32px;\n  font-size: 14px;\n}\n[data-dpr='2'] .selector {\n  height: 64px;\n  font-size: 28px;\n}\n[data-dpr='3'] .selector {\n  height: 96px;\n  font-size: 42px;\n}\n</code></pre>\n<h4>关于 postcss-px2viewport 的使用</h4>\n<p>可以看下这个简单的<a href=\"https://github.com/yuanzhaohao/postcss-px2viewport/blob/master/example/index.js\">例子</a></p>\n<pre><code class=\"language-javascript\">var fs = require('fs');\nvar path = require('path');\nvar postcss = require('postcss');\nvar px2viewport = require('..');\nvar srcPath = path.join(__dirname, 'source.css');\nvar destPath = path.join(__dirname, 'dest.css');\nvar srcText = fs.readFileSync(srcPath, 'utf8');\nvar outputText = postcss(\n  px2viewport({\n    viewportWidth: 750, // 设备屏幕宽度，即视觉稿标准宽度，默认是750\n    unitPrecision: 7, // 最多保留小数点最后的位数，默认是7\n    minPixelValue: 1, // 最小px数，小于此数值，不作处理，默认是1\n    baseDpr: 2, // 屏幕dpr，即视觉稿的标准dpr，默认是750\n  }),\n).process(srcText).css;\n\nfs.writeFile(destPath, outputText, function(err) {\n  if (err) throw err;\n  console.log('File with viewport units written.');\n});\n</code></pre>\n<p>最后附上<code>viewport.js</code>的代码</p>\n<pre><code class=\"language-javascript\">(function(win) {\n  var doc = win.document;\n  var docEl = doc.documentElement;\n  var metaEl = doc.querySelector('meta[name=&quot;viewport&quot;]');\n  var tid = 0;\n  var dpr = 1;\n  var scale = 0;\n  var androidMinVer = [4, 3]; //低于或等于Android4.3版本的，则使用rem方案\n\n  if (!metaEl) {\n    metaEl = doc.createElement('meta');\n  }\n\n  metaEl.setAttribute('name', 'viewport');\n  win.addEventListener(\n    'resize',\n    function() {\n      clearTimeout(tid);\n      tid = setTimeout(refresh, 300);\n    },\n    false,\n  );\n  win.addEventListener(\n    'pageshow',\n    function(e) {\n      if (e.persisted) {\n        clearTimeout(tid);\n        tid = setTimeout(refresh, 300);\n      }\n    },\n    false,\n  );\n\n  function refresh() {\n    var devicePixelRatio = win.devicePixelRatio;\n    var detector = new Detector();\n    var isUseRem;\n    if (detector.iOS || (detector.Android &amp;&amp; detector.checkAndVer(androidMinVer))) {\n      if (devicePixelRatio &gt;= 3) {\n        dpr = 3;\n      } else if (devicePixelRatio &gt;= 2) {\n        dpr = 2;\n      } else {\n        dpr = 1;\n      }\n    } else {\n      dpr = 1;\n    }\n\n    scale = 1 / dpr;\n\n    metaEl.setAttribute(\n      'content',\n      'width=device-width,initial-scale=' +\n        scale +\n        ', maximum-scale=' +\n        scale +\n        ', minimum-scale=' +\n        scale +\n        ', user-scalable=no',\n    );\n    if (docEl.firstElementChild) {\n      docEl.firstElementChild.appendChild(metaEl);\n    } else {\n      var wrap = doc.createElement('div');\n      wrap.appendChild(metaEl);\n      doc.write(wrap.innerHTML);\n    }\n    docEl.setAttribute('data-dpr', dpr);\n    if (detector.Android &amp;&amp; !detector.checkAndVer(androidMinVer)) {\n      var width = docEl.getBoundingClientRect().width;\n      var rem = width / 10;\n      docEl.setAttribute('data-rem', 'true');\n      docEl.style.fontSize = rem + 'px';\n    } else {\n      docEl.setAttribute('data-rem', 'false');\n    }\n  }\n\n  function Detector() {\n    var ua = win.navigator.userAgent;\n    this.androidMatch = ua.match(/Android ([\\d\\.]+)/);\n    this.iOSMatch = ua.match(/(ipod|iphone|ipad)/i);\n    this.Android = !!this.androidMatch;\n    this.iOS = !!this.iOSMatch;\n  }\n\n  Detector.prototype.checkAndVer = function(version) {\n    if (this.Android) {\n      var localVersion = this.androidMatch[1].split('.');\n      var len = Math.min(version.length, localVersion.length);\n      for (var i = 0; i &lt; len; i++) {\n        if (parseInt(localVersion[i]) == parseInt(version[i])) continue;\n        return parseInt(localVersion[i]) &gt; parseInt(version[i]) ? true : false;\n      }\n      return false;\n    }\n  };\n\n  refresh();\n})(window);\n</code></pre>\n<p>欢迎讨论：）</p>\n<h4>链接</h4>\n<ul>\n<li><a href=\"https://github.com/yuanzhaohao/postcss-px2viewport\">postcss-px2viewport</a></li>\n<li><a href=\"https://github.com/yuanzhaohao/seven-cli\">seven-cli</a></li>\n</ul>\n"}}}]);