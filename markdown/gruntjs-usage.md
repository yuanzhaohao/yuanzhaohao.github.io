<!--
date: 2013-08-16
title: gruntjs的使用
description: gruntjs 是 javascript 项目的构建工具，也是基于 nodejs 的一个命令行工具。现在很多开源的 js 项目都是基于它进行构建的。
-->

## gruntjs 的使用

> gruntjs 是 javascript 项目的构建工具，也是基于 nodejs 的一个命令行工具。现在很多开源的 js 项目都是基于它进行构建的。

gruntjs 主要有以下一些作用：

- 合并 js 文件
- 压缩 js 文件
- 单元测试（基于 QUnit）
- 编译 less 等文件

目前我只知道有以上一些作用，用起来感觉很牛逼的样子，不过，确实是很好用，很给力。

#### 一、gruntjs 的安装

使用-g 进行全局安装 gruntjs，在命令行里面输入 `npm install -g grunt-cli` 当然，前提是要安装 nodejs，这个我这里就不说了（其实 nodejs 我也不太懂，有空可以研究研究，哈哈）

下面我就按照官方提供的例子讲解吧（速战速决）！

首先新建一个 gruntjs 目录（建了一个 gruntjs-again），在这个目录下面新建一个 package.json 的文件。在这个文件输入一段 json 格式的字符串 { "name": "gruntjs-again", "version": "0.1.0", "author": "yzh", "description": "gruntjs-again wonderfull", "devDependencies": { "grunt": "~0.4.1", "grunt-contrib-jshint": "~0.6.0", "grunt-contrib-nodeunit": "~0.2.0", "grunt-contrib-uglify": "~0.2.2" } }

打开命令行，进入到这个目录下面，输入`npm install`，安装依赖库；

安装完依赖库之后，新建一个叫 Gruntfile.js 的文件，并输入以下代码（当然这是官方的 demo）

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: { banner: '/_! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> _/\n' },
      build: { src: 'src/<%= pkg.name %>.js', dest: 'build/<%= pkg.name %>.min.js' },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};
```

按照代码中的提示，在根目录下新建一个 src 和 build 的文件夹，再在 src 文件夹下面新建一个和 name 相同的文件，我得 package.json 的 name 是 gruntjs-again，那就新建一个 gruntjs-again.js 文件。

回到命令行，输入`grunt`执行 Gruntfile.js

就会出现以下的结果

![gruntjs-usage](/static/gruntjs-usage-1.png)

#### gruntjs 进阶篇

现在是下班时间，大家都走了，组里只剩下我一个，真的很安静，哈哈，感觉挺不错的。

以下的内容参考了别人的文章：[文章链接](http://www.cnblogs.com/zhepama/archive/2013/05/15/3080736.html)

新建一个目录，我这里是 gruntjs，和上面一样，在这个目录下面新建 package.json 文件，输入以下代码：

```json
{
  "name": "my-gruntjs-project-name",
  "author": "yzh",
  "version": "0.1.0",
  "description": "项目描述神马的",
  "dependencies": {
    "grunt": "*",
    "grunt-contrib-less": "*",
    "grunt-contrib-watch": "*",
    "grunt-contrib-uglify": "*",
    "grunt-contrib-cssmin": "*",
    "grunt-contrib-copy": "*"
  },
  "devDependencies": {
    "grunt": "~0.4.1"
  }
}
```

以上的 package.json 将会为这个项目添加五个依赖库，分别是

- 编译 less 的 grunt-contrib-less；
- 监控文件的 grunt-contrib-watch；
- 合并并压缩 js 文件的 grunt-contrib-uglify；
- 压缩 css 文件的 grunt-contrib-cssmin；
- 复制文件的 grunt-contrib-cssmin；

进入 gruntjs 这个目录，在命令行中，执行`npm install`执行安装依赖库（这里我就不截图了）

新建以下一些文件

![gruntjs-usage](/static/gruntjs-usage-2.png)

新建 Gruntfile.js 文件，在 Gruntfile.js 文件输入以下代码

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // 编译 LESS 文件
    less: {
      compile: {
        files: {
          'assets/css/app.css': 'assets/css/app.less',
        },
      },
    },

    // 压缩 CSS 文件
    cssmin: {
      options: {
        report: 'gzip',
      },
      combine: {
        files: {
          'assets/css/app.min.css': 'assets/css/app.css',
        },
      },
    },

    // 压缩合并 JS 文件
    uglify: {
      options: {
        report: 'gzip',
        mangle: true, // Specify mangle: false to prevent changes to your variable and function names.
        banner:
          '/** \n' +
          ' * -------------------------------------------------------------\n' +
          ' * @version: <%= pkg.version%> \n' +
          ' * @author: <%= pkg.author%> \n' +
          ' * @description: <%= pkg.description%> \n' +
          ' * ------------------------------------------------------------- \n' +
          ' */ \n\n',
      },
      myTarget: {
        files: {
          'assets/js/app.min.js': ['assets/js/app.js', 'assets/js/book.js'],

          'assets/js/lib/libs.min.js': ['assets/js/lib/jquery-1.9.1.js', 'assets/js/lib/sizzle.js'],
        },
      },
    },

    // 复制文件，打包到 dest 文件夹目录下
    copy: {
      main: {
        files: [
          { src: 'index.html', dest: 'dest/index.html' },
          { src: ['assets/css/app.min.css'], dest: 'dest/' },
          { src: ['assets/js/lib/libs.min.js'], dest: 'dest/' },
          { src: ['assets/js/app.min.js'], dest: 'dest/' },
        ],
      },
    },

    // 监控 LESS 文件
    watch: {
      scripts: {
        files: ['assets/css/*.less'],
        tasks: ['less', 'cssmin'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'copy']);
};
```

最后，执行`grunt`，你会发现 dest 目录下面有 css 目录、js 目录以及 index.html 文件，这些都是 grunt-contrib-copy 在起作用。而在 assets 目录下，你会发现经过压缩的 css 文件，以及经过压缩和合并的 js 文件，这是 cssmin 和 uglify，less 在起作用

那 watch 有啥用呢？在命令行里面执行`grunt watch`，当你修改 less 文件的时候，css 和 cssmin 文件都会被修改，这就是我觉得很神奇的地方，这到底是神马原理呢？这估计得以后学了 nodejs 之后才知道了。
