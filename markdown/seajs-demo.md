<!--
date: 2013-10-05
title: seajs 写的一个例子
description: 昨天晚上花时间写了一个 seajs 的 demo，下面简单介绍一下！因为还是第一次使用 seajs 开发，所以有很多细节的东西，我觉得运用得还不是很熟练。总的来说包括三个对象，一个是布局 Layout 对象，另外一个是弹出层 Dialog 对象，最后一个是 highcharts 对象（主要用于在 dialog 弹出层里面加内容的）。
-->

## seajs 写的一个例子

> 昨天晚上花时间写了一个 seajs 的 demo，下面简单介绍一下！因为还是第一次使用 seajs 开发，所以有很多细节的东西，我觉得运用得还不是很熟练。总的来说包括三个对象，一个是布局 Layout 对象，另外一个是弹出层 Dialog 对象，最后一个是 highcharts 对象（主要用于在 dialog 弹出层里面加内容的）。

#### 布局 Layout 对象

这个布局，总的来说，是参考了我之前做的一个[网页版简历](http://yzh.ap01.aws.af.cm/)来写的（其实之前做的这个网页版简历还有不少地方需要改进，如果有时间，希望能用自己最近学习的 seajs 和 angularjs 的知识用到这个网页版简历里面去，但马上就要投入战斗了，都不知道有木有时间去重构代码呢！）

ps：有点小后悔，有一段时间没有使用 gruntjs 了，一不小心吧源文件也压缩了，结果只能到[jsbeautifier](http://jsbeautifier.org/)还原了，但代码风格和我写得有很大的不同了，哎，看来以后写代码的时候，如果代码量比较大，还是记得备份代码，不然出现错误操作了，那就悲剧了。（还好今天是写 demo）另外，seajs 也有一个专门的项目构建工具 SPM，如果项目遵循推荐的标准目录结构，貌似还蛮简单的。（因为这个 demo 的目录并不是 seajs 官方推荐的，今天就先不用 SPM 构建了，改天再用吧！）

```js
// layout.js
define(function(a, b, c) {
  function d(a, b, c, d) {
    (this.prevBtn = e(a)), (this.nextBtn = e(b)), (this.item = e(c).children()), (this.menu = e(d));
  }
  var e = a('jquery');
  (d.prototype = {
    constructor: d,
    init: function() {
      var a = this.prevBtn,
        b = this.nextBtn,
        c = this.item,
        d = this.menu;
      a.bind('click', function() {
        if ((c.stop(!1, !0), !c.is(':animated'))) {
          c.animate(
            {
              left: '+=1124px',
            },
            300,
          ).animate(
            {
              left: '-=100px',
            },
            300,
          );
          var e = c.eq(3).css('left');
          switch (e) {
            case '0px':
              b.show();
              break;
            case '2048px':
              a.hide();
          }
          d.find('.active')
            .removeClass('active')
            .prev()
            .addClass('active');
        }
        return !1;
      }),
        b.bind('click', function() {
          if ((c.stop(!1, !0), !c.is(':animated'))) {
            c.animate(
              {
                left: '-=1124px',
              },
              300,
            ).animate(
              {
                left: '+=100px',
              },
              300,
            );
            var e = c.eq(0).css('left');
            switch (e) {
              case '-2048px':
                b.hide();
                break;
              case '0px':
                a.show();
            }
            d.find('.active')
              .removeClass('active')
              .next()
              .addClass('active');
          }
          return !1;
        }),
        d.delegate('li', 'click', function() {
          var f = e(this),
            g = f.index(),
            h = d.find('.active').index(),
            i = h - g;
          if (
            (f
              .addClass('active')
              .siblings()
              .removeClass('active'),
            c.stop(!1, !0),
            !c.is(':animated'))
          )
            switch (
              (c
                .animate(
                  {
                    left: '+=' + 1074 * i,
                  },
                  300,
                )
                .animate(
                  {
                    left: '-=' + 50 * i,
                  },
                  400,
                ),
              g)
            ) {
              case 3:
                b.hide(), a.show();
                break;
              case 0:
                b.show(), a.hide();
                break;
              default:
                b.show(), a.show();
            }
        });
    },
  }),
    (c.exports = d);
});
```

大概的原理就是在 layout 这个模块里面定义一个对象，最后通过`module.exports`对外输出这个对象。

调用的方法如下（可参考入口模块`main.js`）： // 调用布局对象 // @param1：向左滚动按钮 // @param2：向右滚动按钮 // @param3：主体内容 // @param4：头部菜单按钮 var layout = new Layout( "#prev-btn", "#next-btn", "#play", "#menu" ); layout.init();

#### 弹出层 dialog 对象

代码稍微简单一些：

```js
define(function(require, exports, module) {
  var $ = require('jquery');

  function Dialog(play, dialog, mask, close) {
    this.play = $(play);
    this.dialog = $(dialog);
    this.mask = $(mask);
    this.close = $(close);
  }

  Dialog.prototype = {
    constructor: Dialog,

    init: function() {
      var play = this.play,
        close = this.close,
        dialog = this.dialog,
        mask = this.mask;

      close.bind('click', function() {
        dialog.hide();
        mask.hide();
      });

      mask.bind('click', function() {
        dialog.hide();
        $(this).hide();
      });

      play.delegate('button', 'click', function(event) {
        dialog.show();
        mask.show();
      });
    },
  };

  module.exports = Dialog;
});
```

实现的原理和上面一样，调用方法如下：

```js
// 调用调用弹出层对象
// @param1：主体内容
// @param2：弹出层
// @param3：透明层
// @param4：关闭弹出层的按钮
var dialog = new Dialog('#play', '#dialog', '#dialog-mask', '#close');
dialog.init();
```

#### 图表 chart 对象

```js
define(function(require, exports, module) {
  var $ = require('jquery');

  require('highcharts');
  require('highcharts-more');

  function Chart(play, content) {
    this.button = $(play).find('button');
    this.content = $(content);
  }

  Chart.prototype = {
    constructor: Chart,
    data: require('./chartData'),

    init: function() {
      var button = this.button,
        content = this.content,
        data = this.data;

      $.each(button, function(k, v) {
        $(this).bind('click', function() {
          content.highcharts(data[k]);
        });
      });
    },
  };
  module.exports = Chart;
});
```

调用方法如下：

```js
// 调用调用图表对象
// @param1：主体内容
// @param2：弹出层内容
var chart = new Chart('#play', '#content');
chart.init();
```

#### 写在最后

**关于学习新的东西：**现在前端这个领域（也不仅仅是前端这个领域吧，计算机很多领域都是这样）可以用一个词语来形容，那就是**日新月异**。几乎每隔一段时间，都会出现一些之前从未听过的东西。

对于这些新东西，我觉得不能刻意去追求这些新东西，因为这些光鲜亮丽，华而不实的东西，说不定哪一天就过时了。对于这么多的新东西，我觉得要慎重去选择，选择一些有知名度的、对自己的开发有所帮助的、在很长一段时间不会“过时”的东西来学，这样才有意义。

同时，有一点，我觉得非常重要，那就是**基础**，基础就像功夫片里面的内功一样，内功练好了，武功就很容易练了。放弃对基础的学习，而跑去学习一些“新东西”，这是一种舍本逐末的行为，非常不可取的，呵呵

曾经在一篇博客上面看到一句话：**毕业真正考量的不是学到了多少东西，而是是否有足够强大的学习能力。**

所以，在这句话的基础上，我想再加一句：**强大的学习能力取决于是否有强大的基础。**
