<!--
date: 2013-12-07
title: 学习篇-data类型的url格式
description: 这两天在学习 FIS，遇到一个 data 类型的 url 格式的问题，FIS 有一项功能就是把普通的图片 url（一般是图片）转化成 data 类型的 url，这里进行总结一下，毕竟周末了，还是有时间总结滴。
-->

## 学习篇-data 类型的 url 格式

> 头晕沉沉的，效率极差，这是感冒的节奏！似乎每到了年底，负能量都是满满的，这种感觉让人有点不爽，看来要注意调节自己的情绪了！11 月份从上海离职后，回学校休息了两周（其实那段时间一直在生病，也许一回去不太适应重庆的气候吧！），12 月初就赶过来帝都入职。这行程有点紧，同时确实有点累

> 这两天在学习 FIS，遇到一个 data 类型的 url 格式的问题，FIS 有一项功能就是把普通的图片 url（一般是图片）转化成 data 类型的 url，这里进行总结一下，毕竟周末了，还是有时间总结滴。

#### 神马是 data 类型的 url

所谓的 data 类型的 url 就是指直接嵌在网页当中，而不是从网页中载入。一般情况下，是用在小文件中，这样也避免文件过大的话，会导致文档内容过多。这样做的好处也很明显，那就是减少了 http 请求。

#### data 类型 url 的形式

大概可以分成下面几种：

- data:, 文本数据
- data:text/plain, 文本数据
- data:text/html, HTML 代码
- data:text/html;base64, base64 编码的 HTML 代码
- data:text/css, CSS 代码
- data:text/css;base64, base64 编码的 CSS 代码
- data:text/javascript, Javascript 代码
- data:text/javascript;base64, base64 编码的 Javascript 代码
- data:image/gif;base64, base64 编码的 gif 图片数据
- data:image/png;base64, base64 编码的 png 图片数据
- data:image/jpeg;base64, base64 编码的 jpeg 图片数据
- data:image/x-icon;base64, base64 编码的 icon 图片数据

因为 url 是一种基于文本的协议，所以 gif/png/jpeg 这种二进制属于需要用 base64 进行编码。换句话说，引入 base64 以后，就可以支持任意形式的数据格式了。

至于**base64**的具体原理和方法，这里有一个链接说得很详细（表示看的有点晕，计算机基础课程木有学好）：[维基百科**base64 的解释**](http://zh.wikipedia.org/wiki/Base64)

下面举个例子，可以看到百度的 logo：

```html
<img
  src="data:image/gif;base64,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"
/>
```

#### data 类型 url 的应用实例

在 html 代码中 img 标签中使用，代码如下：

```html
<img src="data:image/png;base64,fadsfadfasdfas..." />
```

在 css 代码中使用，代码如下：

```html
<style type="text/css">
  background-image: url(data:image/gif;base64,fadfadfasdfasdsd...);
</style>
```

在 css 链接处使用，代码如下：

```html
<link rel="stylesheet" type="text/css" href="data:text/css;base64,gsgsfasdfafdsafa..." />
```

在 javascript 链接处使用，代码如下：

```html
    <script type="text/javascript" src="data:text/javascript;base64,fsdfasfa...">
```

#### base64 的在线转换

- [http://www.greywyvern.com/code/php/binary2base64](http://www.greywyvern.com/code/php/binary2base64)
- [http://www.kawa.net/works/js/data-scheme/base64-e.html](http://www.kawa.net/works/js/data-scheme/base64-e.html)

参考文章链接（文章作者有点黄，哈哈）：[http://www.bobopo.com/article/code/data_url.htm](http://www.bobopo.com/article/code/data_url.htm)
