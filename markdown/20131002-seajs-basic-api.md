## seajs 解读基本的 api

> 下面的这篇文章有很多地方都是参考 seajs 的官方文档，其实看了网上不少关于 seajs 的博客，写的都没哟官方文档清晰。今天把 seajs 的常用的 api 整理了一遍，整理完之后，觉得 seajs 用起来貌似并不难。

官方文档链接：[https://github.com/seajs/seajs/issues/266](https://github.com/seajs/seajs/issues/266)

#### seajs.config

对 seajs 进行配置。详细参数以及参数的作用如下：

    seajs.config({

      // 别名配置
      alias: {
        'es5-safe': 'gallery/es5-safe/0.9.3/es5-safe',
        'json': 'gallery/json/1.0.2/json',
        'jquery': 'jquery/jquery/1.10.1/jquery'
      },

      // 路径配置
      paths: {
        'gallery': 'https://a.alipayobjects.com/gallery'
      },

      // 变量配置
      vars: {
        'locale': 'zh-cn'
      },

      // 映射配置
      map: [
        ['http://example.com/js/app/', 'http://localhost/js/app/']
      ],

      // 预加载项
      preload: [
        Function.prototype.bind ? '' : 'es5-safe',
        this.JSON ? '' : 'json'
      ],

      // 调试模式
      debug: true,

      // Sea.js 的基础路径
      base: 'http://example.com/path/to/base/',

      // 文件编码
      charset: 'utf-8'
    });

需要注意的问题

**避免缓存**

目前我知道的，有两种方式：配置 map，配置 debug

在使用 map 的时候，遇到了下面的问题：**Uncaught TypeError: Cannot call method 'exec' of undefined **

map 配置代码如下：

    map: [
    	[/^.*$/, function(url) {
    		url += ( url.indexOf( '?' ) === -1 ? '?' : '&' ) + 'ts=' + new Date().getTime();
    		console.log( url );
    		return url;
    	}]
    ]

**预加载**

另外一个问题就是预加载的问题了，其实使用预加载这个配置可以很好地避免 ie 低版本的神奇不支持很多 js 或者 json 这些方法。

    seajs.config({
        alias:{
            'es5-shim': '//cdnjs.cloudflare.com/ajax/libs/es5-shim/1.2.4/es5-shim.min'
        }
        ,preload:[Array.isArray ? '' : 'es5-shim']
    });

**注意**：preload 需要等到 use 执行的时候才加载。

    seajs.config({
      preload: 'a'
    });

    // 在加载 b 之前，会确保模块 a 已经加载并执行好
    seajs.use('./b');

第二点，preload 配置不能放在模块文件里面：

    seajs.config({
      preload: 'a'
    });

    define(function(require, exports) {
      // 此处执行时，不能保证模块 a 已经加载并执行好
    });

**多次配置自动合并**

seajs.config 可以多次运行，每次运行时，会对配置项进行合并操作：

    // 第一个config
    seajs.config({
      alias: {
        'jquery': 'path/to/jquery.js',
        'a': 'path/to/a.js'
      },
      preload: ['seajs-text']
    });

    // 第二个config
    seajs.config({
      alias: {
        'underscore': 'path/to/underscore.js',
        'a': 'path/to/biz/a.js'
      },
      preload: ['seajs-combo']
    });

上面两处 config 运行的结果是：

     alias = {
       'jquery': 'path/to/jquery.js',
       'underscore': 'path/to/underscore.js',
       'a': 'path/to/biz/a.js'
     };

     preload = ['seajs-text', 'seajs-combo'];

即：config 会自动合并不存在的项，对存在的项则进行覆盖。

#### seajs.use

用来在页面中加载一个或多个模块。这个函数支持两个参数，一个是模块（可以是一个模块，也可以是多个模块），另外一个是回调函数，是加载完函数之后执行的回调函数。

    // 加载一个模块
    seajs.use('./a');

    // 加载一个模块，在加载完成时，执行回调
    seajs.use('./a', function(a) {
      a.doSomething();
    });

    // 加载多个模块，在加载完成时，执行回调
    seajs.use(['./a', './b'], function(a, b) {
      a.doSomething();
      b.doSomething();
    });

#### define

`define(id?, deps?, factory)`这个函数也可以接受两个以上参数。字符串 `id` 表示模块标识，数组 `deps` 是模块依赖。（但`id`和`deps`这两个参数具体是怎么用的，还不是很明白！）

这个函数最主要的参数其实那个工厂函数，网上看到一些博客说推荐只写这个工厂函数作为参数。（但`id`和`deps`这两个参数是有什么用呢？玉伯之所以这样设计，肯定是有什么用处才加进去的，求解吖...）

下面详细说说这个工厂函数的三个参数：

    define(function( require, exports, modules ) {
    	// some code here
    });

- **require**：用来获取指定模块的接口。
- **exports**：用来在模块内部对外提供接口。
- **module**：是一个对象，上面存储了与当前模块相关联的一些属性和方法。

下面对以上三个参数做一下介绍。

#### require

当使用同步加载时，可直接使用`require(id)`，这里面的 require 函数接受 **模块标识** 作为唯一参数，用来获取其他模块提供的接口。

    define(function(require, exports) {

      // 获取模块 a 的接口
      var a = require('./a');

      // 调用模块 a 的方法
      a.doSomething();

    });

**注意**：在开发时，`require` 的书写需要遵循一些简单约定。

**1. 正确拼写**

模块 factory 构造方法的第一个参数 必须 命名为 `require` 。

    // 错误！
    define(function(req) {
      // ...
    });

    // 正确！
    define(function(require) {
      // ...
    });

**2. 不要修改**

不要重命名 require 函数，或在任何作用域中给 require 重新赋值。

    // 错误 - 重命名 "require"！
    var req = require, mod = req("./mod");

    // 错误 - 重定义 "require"!
    require = function() {};

    // 错误 - 重定义 "require" 为函数参数！
    function F(require) {}

    // 错误 - 在内嵌作用域内重定义了 "require"！
    function F() {
      var require = function() {};
    }

**3. 使用直接量**

require 的参数值 必须 是字符串直接量。

    // 错误！
    require(myModule);

    // 错误！
    require("my-" + "module");

    // 错误！
    require("MY-MODULE".toLowerCase());

    // 正确！
    require("my-module");

在书写模块代码时，必须遵循这些规则。其实只要把 require 看做是语法关键字 就好啦。

**关于动态依赖**

有时会希望可以使用 require 来进行条件加载：

    if (todayIsWeekend)
      require("play");
    else
      require("work");

但请牢记，从静态分析的角度来看，这个模块同时依赖 `play` 和 `work` 两个模块，加载器会把这两个模块文件都下载下来。 这种情况下，推荐使用 `require.async` 来进行条件加载。

#### require.async

`require.async(id, callback?)`方法用来在模块内部异步加载模块，并在加载完成后执行指定回调。callback 参数可选。

    define(function(require, exports, module) {

      // 异步加载一个模块，在加载完成时，执行回调
      require.async('./b', function(b) {
        b.doSomething();
      });

      // 异步加载多个模块，在加载完成时，执行回调
      require.async(['./c', './d'], function(c, d) {
        c.doSomething();
        d.doSomething();
      });

    });

**注意**：`require` 是同步往下执行，`require.async` 则是异步回调执行。`require.async` 一般用来加载可延迟异步加载的模块。

#### require.resolve

`require.resolve(id)`使用模块系统内部的路径解析机制来解析并返回模块路径。该函数不会加载模块，只返回解析后的绝对路径。

    define(function(require, exports) {

      console.log(require.resolve('./b'));
      // ==> http://example.com/path/to/b.js

    });

这可以用来获取模块路径，一般用在插件环境或需动态拼接模块路径的场景下。

（不同的三个 require 方法具有三种不同的应用，seajs 的设计真的是博大精深呀！）

#### exports

`exports` 是一个对象，用来向外提供模块接口。

**三种使用 exports 的方法**

    define(function(require, exports) {

      // 对外提供 foo 属性
      exports.foo = 'bar';

      // 对外提供 doSomething 方法
      exports.doSomething = function() {};

    });

除了给 exports 对象增加成员，还可以使用 return 直接向外提供接口。

    define(function(require) {

      // 通过 return 直接提供接口
      return {
        foo: 'bar',
        doSomething: function() {};
      };

    });

如果 return 语句是模块中的唯一代码，还可简化为：

    define({
      foo: 'bar',
      doSomething: function() {};
    });

上面这种格式特别适合定义 JSONP 模块。

**注意**：下面这种写法是错误的！

    define(function(require, exports) {

      // 错误用法！！!
      exports = {
        foo: 'bar',
        doSomething: function() {};
      };

    });

正确的写法是用 return 或者给 module.exports 赋值：

    define(function(require, exports, module) {

      // 正确写法
      module.exports = {
        foo: 'bar',
        doSomething: function() {};
      };

    });

**提示**：`exports` 仅仅是 `module.exports` 的一个引用。在 `factory` 内部给 `exports` 重新赋值时，并不会改变 `module.exports` 的值。因此给 `exports` 赋值是无效的，不能用来更改模块接口。

另外，值得一提的是，一般可以在两个地方调用`exports`变量，一个在`seajs.use()`里面，一个在别的模块里面调用。 define( function( require, exports, module ) { exports.a = 'call highcharts'; }); seajs.use( './static//js/highcharts' ,function( highcharts ) { console.log( highcharts.a ) });

    // test.js
    define(function(require, exports, module) {
    	exports.foo = 'call test.js';
    });
    // test2.js
    define(function(require, exports, module) {
    	var test = require( './test' );
    	// call test.js
    	console.log( test.foo );
    });

#### module

`module` 是一个对象，上面存储了与当前模块相关联的一些属性和方法。

**module.id**

模块的唯一标识。

    define('id', [], function(require, exports, module) {

      // 模块代码

    });

上面代码中，`define` 的第一个参数就是模块标识。（ps：我至今还不知道上面的那种 define 的用法是怎么用的:(）

**module.uri**

根据模块系统的路径解析规则得到的模块绝对路径。

    define(function(require, exports, module) {

      console.log(module.uri);
      // ==> http://example.com/path/to/this/file.js

    });

一般情况下（没有在 define 中手写 id 参数时），`module.id` 的值就是 `module.uri`，两者完全相同。

**module.dependencies**

`dependencies` 是一个数组，表示当前模块的依赖。

（下面的一篇博客就通过一个比较生动的例子对 seajs 进行使用了！哈哈，终于到大展身手的时候了！）
