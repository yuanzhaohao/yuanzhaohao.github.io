## seajs 基础篇

> 听说过**模块化**这个词已经很久了，之前暑假的时候，在达哥的介绍下，写了一些关于 seajs 的小 demo。最近趁着有空，上网查找了一些资料，对 Javascript 模块规范有了一些理解，另外把 seajs 重新看了一遍，所以就写写一些文章来总结最近的学习成果了！

#### 模块化

**什么是模块？**

在前端开发领域，一个模块，可以是 JS 模块，也可以是 CSS 模块，或是 Template 等模块。在 Sea.js 里，我们专注于 JS 模块（其他类型的模块可以转换为 JS 模块）：

- 模块是一段 JavaScript 代码，具有统一的基本书写格式。
- 模块之间通过基本交互规则，能彼此引用，协同工作。

从上面模块的定义，我是这么理解 Javascript 模块化：按照统一的书写格式，将 Javascript 代码以模块进行组织，每一个模块互不干扰但可以相互引用（按需加载）。

**Javascript 模块规范**

目前，通行的 Javascript 模块规范共有两种：CommonJS、AMD 以及 CMD

**服务器端**

CommonJS 是针对服务器端的 nodejs 所设立的一个规范，在全局情况下，会有一个`require()`函数，用户加载模块。具体的用法如下：（其实我也不是很懂 nodejs，nodejs 也是一个相当火的东西呀，有空还是多接触比较好！）

    var math = require( 'math' );
    math.add( 2, 3 );

**浏览器端**

浏览器端主要是通过下面的方法实现模块化的：所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。有两大模块定义规范**AMD**和**CMD**

- AMD（Asynchronous Module Definition）：异步模块定义。
- CMD（Common Module Definition）：通用模块定义。

#### AMD 与 CMD 的区别

- AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
- CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

区别：

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.

2. CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：

   // CMD define(function(require, exports, module) { var a = require('./a') a.doSomething() // 此处略去 100 行 var b = require('./b') // 依赖可以就近书写 b.doSomething() // ... })

   // AMD 默认推荐的是 define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好 a.doSomething() // 此处略去 100 行 b.doSomething() ... })

虽然 AMD 也支持 CMD 的写法，同时还支持将 require 作为依赖项传递，但 RequireJS 的作者默认是最喜欢上面的写法，也是官方文档里默认的模块定义写法。

3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。

（呵呵，大牛不愧是大牛，果然给力吖！）

#### seajs 实现模块化

（以 highcharts 插件的一个实例为例！今天仅仅介绍最简单的用法，高手勿吐槽:)）

目录结构如下：

    // highcharts.html
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
    <meta charset="utf-8">
    <title>highcharts的一次尝试使用模块化</title>
    </head>
    <body>
    <div id="container" style="width: 600px; height: 400px; margin: 0 auto;"></div>

    <script src="lib/seajs/2.1.1/sea.js"></script>
    <script>
    seajs.config({
    	base: './lib',
    	alias: {
    		'jquery': 'jquery/jquery/1.10.1/jquery.js',
    		'highcharts': 'highcharts/3.0.5/highcharts.js',
    		'highcharts-more': 'highcharts/3.0.5/highcharts-more.js'
    	}
    });
    seajs.use( './static/js/highcharts' );
    </script>
    </body>
    </html>

highcharts.js 里面使用 define 定义模块，利用`require()`方法把需要加载的类库加载进来

    //highcharts.js
    define( function( require, exports, module ) {
    	var $ = require( 'jquery' );

    	$( '#container' ).html( 'highcharts test' );

    	require( 'highcharts' );
    	require( 'highcharts-more' );

    	$('#container').highcharts({

            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                zoomType: 'xy'
            },

            title: {
                text: 'Highcharts bubbles with radial gradient fill'
            },

            xAxis: {
                gridLineWidth: 1
            },

            yAxis: {
                startOnTick: false,
                endOnTick: false
            },

            series: [{
                data: [
                    [9, 81, 63],
                    [98, 5, 89],
                    [51, 50, 73],
                    [41, 22, 14],
                    [58, 24, 20],
                    [78, 37, 34],
                    [55, 56, 53],
                    [18, 45, 70],
                    [42, 44, 28],
                    [3, 52, 59],
                    [31, 18, 97],
                    [79, 91, 63],
                    [93, 23, 23],
                    [44, 83, 22]
                ],
                marker: {
                     fillColor: {
                         radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                         stops: [
                             [0, 'rgba(255,255,255,0.5)'],
                             [1, 'rgba(69,114,167,0.5)']
                         ]
                     }
                }
            }, {
                data: [
                    [42, 38, 20],
                    [6, 18, 1],
                    [1, 93, 55],
                    [57, 2, 90],
                    [80, 76, 22],
                    [11, 74, 96],
                    [88, 56, 10],
                    [30, 47, 49],
                    [57, 62, 98],
                    [4, 16, 16],
                    [46, 10, 11],
                    [22, 87, 89],
                    [57, 91, 82],
                    [45, 15, 98]
                ],
                marker: {
                     fillColor: {
                         radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                         stops: [
                             [0, 'rgba(255,255,255,0.5)'],
                             [1, 'rgba(170,70,67,0.5)']
                         ]
                     }
                }
            }]

        });
    });

用浏览器打开 highcharts.html，会出现下面的页面！

（seajs 的具体每一个方法，请看下一篇文章！）
