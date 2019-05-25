<!--
date: 2019-05-25
title: 重新整理我的博客
description: 自从工作之后，已经很久没有写过博客了。一是之前在国内的公司工作会比较忙，一天工作下来之后，已经没有多少时间写blog了。另一方面，阿里和腾讯内部有公司的博客，之前也在上面写过不少，不过离职之后，都没有拿出来。最近发现Github Pages是个很好的东西，于是乎，我就花了一些时间，重新整理了一下我的博客，用GitHub Pages搭建静态博客。
-->

## 重新整理我的博客

> 自从工作之后，已经很久没有写过博客了。一是之前在国内的公司工作会比较忙，一天工作下来之后，已经没有多少时间写 blog 了。另一方面，阿里和腾讯内部有公司的博客，之前也在上面写过不少，不过离职之后，都没有拿出来。最近发现 Github Pages 是个很好的东西，于是乎，我就花了一些时间，重新整理了一下我的博客，用 GitHub Pages 搭建静态博客。

#### 原理

原理其实不难，在 github.com 上新建一个 repo，以 github 的名称开头的域名项目，比如我的 id 是 yuanzhaohao，新建一个 yuanzhaohao.github.io 的项目。具体教程可以参考这篇官方的文章[Websites for you and your projects](https://pages.github.com/)

#### 项目目录

- root
  - src
    - data.json: 构建脚本自动生成的 markdown 列表数据
    - components
    - entry
    - lib
  - static: 静态文件存放目录
  - srcipts: 脚本构建，包括 webpack 配置等
  - typings: 普通的 typings
  - js: scripts 构建出来的文件目录
  - markdown: markdown 文件存放目录，会被自动构建到代码中
  - index.html: 构建出来的页面入口文件
  - .prettierrc: 美化代码以及 markdown 的配置
  - tsconfig.json: ts 的配置
  - tslint.json: tslint 的语法检测
  - ...

#### 技术栈

在技术选型上，采用 React+Redux+React-router+Typescript，源文件是 markdown 文件，所以需要简单地写一下 webpack 的 markdown loader。

markdown 文件的 loader 代码如下，在 scriprs/markdown-loader.js 里，原理也很简单，也就是用`markdown-it`，把 markdown 文件转化为 html 源代码，再输出为 commonjs module 即可。

```js
'use strict';

const fs = require('fs-extra');
const path = require('path');
// const marked = require('marked');
const md = require('markdown-it')({
  html: true,
});
const glob = require('glob');

module.exports = function(source, options) {
  if (this.cacheable) {
    this.cacheable();
  }

  const sourcePath = path.dirname(this.resourcePath);
  const basename = path.basename(this.resourcePath, '.md');

  // 处理页头的meta信息
  source = source.replace(/<!--(.*)\s?([^]+?)-->/gi, '');

  return `module.exports = {` + `\n  markdown: ${JSON.stringify(md.render(source))},` + `};`;
};
```
