(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{123:function(e,n){e.exports={markdown:"\x3c!--\ndate: 2013-10-02\ntitle: seajs 解读基本的 api\ndescription: 下面的这篇文章有很多地方都是参考 seajs 的官方文档，其实看了网上不少关于 seajs 的博客，写的都没哟官方文档清晰。今天把 seajs 的常用的 api 整理了一遍，整理完之后，觉得 seajs 用起来貌似并不难。\n--\x3e\n<h2>seajs 解读基本的 api</h2>\n<blockquote>\n<p>下面的这篇文章有很多地方都是参考 seajs 的官方文档，其实看了网上不少关于 seajs 的博客，写的都没哟官方文档清晰。今天把 seajs 的常用的 api 整理了一遍，整理完之后，觉得 seajs 用起来貌似并不难。</p>\n</blockquote>\n<p>官方文档链接：<a href=\"https://github.com/seajs/seajs/issues/266\">https://github.com/seajs/seajs/issues/266</a></p>\n<h4>seajs.config</h4>\n<p>对 seajs 进行配置。详细参数以及参数的作用如下：</p>\n<pre><code class=\"language-js\">seajs.config({\n  // 别名配置\n  alias: {\n    'es5-safe': 'gallery/es5-safe/0.9.3/es5-safe',\n    json: 'gallery/json/1.0.2/json',\n    jquery: 'jquery/jquery/1.10.1/jquery',\n  },\n\n  // 路径配置\n  paths: {\n    gallery: 'https://a.alipayobjects.com/gallery',\n  },\n\n  // 变量配置\n  vars: {\n    locale: 'zh-cn',\n  },\n\n  // 映射配置\n  map: [['http://example.com/js/app/', 'http://localhost/js/app/']],\n\n  // 预加载项\n  preload: [Function.prototype.bind ? '' : 'es5-safe', this.JSON ? '' : 'json'],\n\n  // 调试模式\n  debug: true,\n\n  // Sea.js 的基础路径\n  base: 'http://example.com/path/to/base/',\n\n  // 文件编码\n  charset: 'utf-8',\n});\n</code></pre>\n<p>需要注意的问题</p>\n<p><strong>避免缓存</strong></p>\n<p>目前我知道的，有两种方式：配置 map，配置 debug</p>\n<p>在使用 map 的时候，遇到了下面的问题：**Uncaught TypeError: Cannot call method 'exec' of undefined **</p>\n<p>map 配置代码如下：</p>\n<pre><code class=\"language-js\">map: [\n  [\n    /^.*$/,\n    function(url) {\n      url += (url.indexOf('?') === -1 ? '?' : '&amp;') + 'ts=' + new Date().getTime();\n      console.log(url);\n      return url;\n    },\n  ],\n];\n</code></pre>\n<p><strong>预加载</strong></p>\n<p>另外一个问题就是预加载的问题了，其实使用预加载这个配置可以很好地避免 ie 低版本的神奇不支持很多 js 或者 json 这些方法。</p>\n<pre><code class=\"language-js\">seajs.config({\n  alias: {\n    'es5-shim': '//cdnjs.cloudflare.com/ajax/libs/es5-shim/1.2.4/es5-shim.min',\n  },\n  preload: [Array.isArray ? '' : 'es5-shim'],\n});\n</code></pre>\n<p><strong>注意</strong>：preload 需要等到 use 执行的时候才加载。</p>\n<pre><code class=\"language-js\">seajs.config({\n  preload: 'a',\n});\n\n// 在加载 b 之前，会确保模块 a 已经加载并执行好\nseajs.use('./b');\n</code></pre>\n<p>第二点，preload 配置不能放在模块文件里面：</p>\n<pre><code class=\"language-js\">seajs.config({\n  preload: 'a',\n});\n\ndefine(function(require, exports) {\n  // 此处执行时，不能保证模块 a 已经加载并执行好\n});\n</code></pre>\n<p><strong>多次配置自动合并</strong></p>\n<p>seajs.config 可以多次运行，每次运行时，会对配置项进行合并操作：</p>\n<pre><code class=\"language-js\">// 第一个config\nseajs.config({\n  alias: {\n    jquery: 'path/to/jquery.js',\n    a: 'path/to/a.js',\n  },\n  preload: ['seajs-text'],\n});\n\n// 第二个config\nseajs.config({\n  alias: {\n    underscore: 'path/to/underscore.js',\n    a: 'path/to/biz/a.js',\n  },\n  preload: ['seajs-combo'],\n});\n</code></pre>\n<p>上面两处 config 运行的结果是：</p>\n<pre><code class=\"language-js\">alias = {\n  jquery: 'path/to/jquery.js',\n  underscore: 'path/to/underscore.js',\n  a: 'path/to/biz/a.js',\n};\n\npreload = ['seajs-text', 'seajs-combo'];\n</code></pre>\n<p>即：config 会自动合并不存在的项，对存在的项则进行覆盖。</p>\n<h4>seajs.use</h4>\n<p>用来在页面中加载一个或多个模块。这个函数支持两个参数，一个是模块（可以是一个模块，也可以是多个模块），另外一个是回调函数，是加载完函数之后执行的回调函数。</p>\n<pre><code class=\"language-js\">// 加载一个模块\nseajs.use('./a');\n\n// 加载一个模块，在加载完成时，执行回调\nseajs.use('./a', function(a) {\n  a.doSomething();\n});\n\n// 加载多个模块，在加载完成时，执行回调\nseajs.use(['./a', './b'], function(a, b) {\n  a.doSomething();\n  b.doSomething();\n});\n</code></pre>\n<h4>define</h4>\n<p><code>define(id?, deps?, factory)</code>这个函数也可以接受两个以上参数。字符串 <code>id</code> 表示模块标识，数组 <code>deps</code> 是模块依赖。（但<code>id</code>和<code>deps</code>这两个参数具体是怎么用的，还不是很明白！）</p>\n<p>这个函数最主要的参数其实那个工厂函数，网上看到一些博客说推荐只写这个工厂函数作为参数。（但<code>id</code>和<code>deps</code>这两个参数是有什么用呢？玉伯之所以这样设计，肯定是有什么用处才加进去的，求解吖...）</p>\n<p>下面详细说说这个工厂函数的三个参数：</p>\n<pre><code class=\"language-js\">define(function(require, exports, modules) {\n  // some code here\n});\n</code></pre>\n<ul>\n<li><strong>require</strong>：用来获取指定模块的接口。</li>\n<li><strong>exports</strong>：用来在模块内部对外提供接口。</li>\n<li><strong>module</strong>：是一个对象，上面存储了与当前模块相关联的一些属性和方法。</li>\n</ul>\n<p>下面对以上三个参数做一下介绍。</p>\n<h4>require</h4>\n<p>当使用同步加载时，可直接使用<code>require(id)</code>，这里面的 require 函数接受 <strong>模块标识</strong> 作为唯一参数，用来获取其他模块提供的接口。</p>\n<pre><code class=\"language-js\">define(function(require, exports) {\n  // 获取模块 a 的接口\n  var a = require('./a');\n\n  // 调用模块 a 的方法\n  a.doSomething();\n});\n</code></pre>\n<p><strong>注意</strong>：在开发时，<code>require</code> 的书写需要遵循一些简单约定。</p>\n<p><strong>1. 正确拼写</strong></p>\n<p>模块 factory 构造方法的第一个参数 必须 命名为 <code>require</code> 。</p>\n<pre><code class=\"language-js\">// 错误！\ndefine(function(req) {\n  // ...\n});\n\n// 正确！\ndefine(function(require) {\n  // ...\n});\n</code></pre>\n<p><strong>2. 不要修改</strong></p>\n<p>不要重命名 require 函数，或在任何作用域中给 require 重新赋值。</p>\n<pre><code class=\"language-js\">// 错误 - 重命名 &quot;require&quot;！\nvar req = require,\n  mod = req('./mod');\n\n// 错误 - 重定义 &quot;require&quot;!\nrequire = function() {};\n\n// 错误 - 重定义 &quot;require&quot; 为函数参数！\nfunction F(require) {}\n\n// 错误 - 在内嵌作用域内重定义了 &quot;require&quot;！\nfunction F() {\n  var require = function() {};\n}\n</code></pre>\n<p><strong>3. 使用直接量</strong></p>\n<p>require 的参数值 必须 是字符串直接量。</p>\n<pre><code class=\"language-js\">// 错误！\nrequire(myModule);\n\n// 错误！\nrequire('my-' + 'module');\n\n// 错误！\nrequire('MY-MODULE'.toLowerCase());\n\n// 正确！\nrequire('my-module');\n</code></pre>\n<p>在书写模块代码时，必须遵循这些规则。其实只要把 require 看做是语法关键字 就好啦。</p>\n<p><strong>关于动态依赖</strong></p>\n<p>有时会希望可以使用 require 来进行条件加载：</p>\n<pre><code class=\"language-js\">if (todayIsWeekend) require('play');\nelse require('work');\n</code></pre>\n<p>但请牢记，从静态分析的角度来看，这个模块同时依赖 <code>play</code> 和 <code>work</code> 两个模块，加载器会把这两个模块文件都下载下来。 这种情况下，推荐使用 <code>require.async</code> 来进行条件加载。</p>\n<h4>require.async</h4>\n<p><code>require.async(id, callback?)</code>方法用来在模块内部异步加载模块，并在加载完成后执行指定回调。callback 参数可选。</p>\n<pre><code class=\"language-js\">define(function(require, exports, module) {\n  // 异步加载一个模块，在加载完成时，执行回调\n  require.async('./b', function(b) {\n    b.doSomething();\n  });\n\n  // 异步加载多个模块，在加载完成时，执行回调\n  require.async(['./c', './d'], function(c, d) {\n    c.doSomething();\n    d.doSomething();\n  });\n});\n</code></pre>\n<p><strong>注意</strong>：<code>require</code> 是同步往下执行，<code>require.async</code> 则是异步回调执行。<code>require.async</code> 一般用来加载可延迟异步加载的模块。</p>\n<h4>require.resolve</h4>\n<p><code>require.resolve(id)</code>使用模块系统内部的路径解析机制来解析并返回模块路径。该函数不会加载模块，只返回解析后的绝对路径。</p>\n<pre><code class=\"language-js\">define(function(require, exports) {\n  console.log(require.resolve('./b'));\n  // ==&gt; http://example.com/path/to/b.js\n});\n</code></pre>\n<p>这可以用来获取模块路径，一般用在插件环境或需动态拼接模块路径的场景下。</p>\n<p>（不同的三个 require 方法具有三种不同的应用，seajs 的设计真的是博大精深呀！）</p>\n<h4>exports</h4>\n<p><code>exports</code> 是一个对象，用来向外提供模块接口。</p>\n<p><strong>三种使用 exports 的方法</strong></p>\n<pre><code class=\"language-js\">define(function(require, exports) {\n  // 对外提供 foo 属性\n  exports.foo = 'bar';\n\n  // 对外提供 doSomething 方法\n  exports.doSomething = function() {};\n});\n</code></pre>\n<p>除了给 exports 对象增加成员，还可以使用 return 直接向外提供接口。</p>\n<pre><code class=\"language-js\">    define(function(require) {\n\n      // 通过 return 直接提供接口\n      return {\n        foo: 'bar',\n        doSomething: function() {};\n      };\n\n    });\n</code></pre>\n<p>如果 return 语句是模块中的唯一代码，还可简化为：</p>\n<pre><code class=\"language-js\">    define({\n      foo: 'bar',\n      doSomething: function() {};\n    });\n</code></pre>\n<p>上面这种格式特别适合定义 JSONP 模块。</p>\n<p><strong>注意</strong>：下面这种写法是错误的！</p>\n<pre><code class=\"language-js\">    define(function(require, exports) {\n\n      // 错误用法！！!\n      exports = {\n        foo: 'bar',\n        doSomething: function() {};\n      };\n\n    });\n</code></pre>\n<p>正确的写法是用 return 或者给 module.exports 赋值：</p>\n<pre><code class=\"language-js\">    define(function(require, exports, module) {\n\n      // 正确写法\n      module.exports = {\n        foo: 'bar',\n        doSomething: function() {};\n      };\n\n    });\n</code></pre>\n<p><strong>提示</strong>：<code>exports</code> 仅仅是 <code>module.exports</code> 的一个引用。在 <code>factory</code> 内部给 <code>exports</code> 重新赋值时，并不会改变 <code>module.exports</code> 的值。因此给 <code>exports</code> 赋值是无效的，不能用来更改模块接口。</p>\n<p>另外，值得一提的是，一般可以在两个地方调用<code>exports</code>变量，一个在<code>seajs.use()</code>里面，一个在别的模块里面调用。</p>\n<pre><code class=\"language-js\">define(function(require, exports, module) {\n  exports.a = 'call highcharts';\n});\nseajs.use('./static//js/highcharts', function(highcharts) {\n  console.log(highcharts.a);\n});\n\n// test.js\ndefine(function(require, exports, module) {\n  exports.foo = 'call test.js';\n});\n// test2.js\ndefine(function(require, exports, module) {\n  var test = require('./test');\n  // call test.js\n  console.log(test.foo);\n});\n</code></pre>\n<h4>module</h4>\n<p><code>module</code> 是一个对象，上面存储了与当前模块相关联的一些属性和方法。</p>\n<p><strong>module.id</strong></p>\n<p>模块的唯一标识。</p>\n<pre><code class=\"language-js\">define('id', [], function(require, exports, module) {\n  // 模块代码\n});\n</code></pre>\n<p>上面代码中，<code>define</code> 的第一个参数就是模块标识。（ps：我至今还不知道上面的那种 define 的用法是怎么用的:(）</p>\n<p><strong>module.uri</strong></p>\n<p>根据模块系统的路径解析规则得到的模块绝对路径。</p>\n<pre><code class=\"language-js\">define(function(require, exports, module) {\n  console.log(module.uri);\n  // ==&gt; http://example.com/path/to/this/file.js\n});\n</code></pre>\n<p>一般情况下（没有在 define 中手写 id 参数时），<code>module.id</code> 的值就是 <code>module.uri</code>，两者完全相同。</p>\n<p><strong>module.dependencies</strong></p>\n<p><code>dependencies</code> 是一个数组，表示当前模块的依赖。</p>\n<p>（下面的一篇博客就通过一个比较生动的例子对 seajs 进行使用了！哈哈，终于到大展身手的时候了！）</p>\n"}}}]);