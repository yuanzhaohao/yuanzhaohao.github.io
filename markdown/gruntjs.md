### gruntjs的使用 ###
> gruntjs是javascript项目的构建工具，也是基于nodejs的一个命令行工具。现在很多开源的js项目都是基于它进行构建的。本人也只是初步接触这个工具，请勿吐槽哈，呵呵！

gruntjs主要有以下一些作用：

- 合并js文件
- 压缩js文件
- 单元测试（基于QUnit）
- 编译less等文件

目前我只知道有以上一些作用，用起来感觉很牛逼的样子，不过，确实是很好用，很给力。

### 一、gruntjs的安装 ###
使用-g进行全局安装gruntjs，在命令行里面输入
`npm install -g grunt-cli`
当然，前提是要安装nodejs，这个我这里就不说了（其实nodejs我也不太懂，有空可以研究研究，哈哈）

下面我就按照官方提供的例子讲解吧（速战速决）！

首先新建一个gruntjs目录（建了一个gruntjs-again），在这个目录下面新建一个package.json的文件。在这个文件输入一段json格式的字符串
    
	{
	  "name": "gruntjs-again",
	  "version": "0.1.0",
	  "author": "yzh",
	  "description": "gruntjs-again wonderfull",
	  "devDependencies": {
	    "grunt": "~0.4.1",
	    "grunt-contrib-jshint": "~0.6.0",
	    "grunt-contrib-nodeunit": "~0.2.0",
	    "grunt-contrib-uglify": "~0.2.2"
	  }
	}

打开命令行，进入到这个目录下面，输入`npm install`，安装依赖库；

安装完依赖库之后，新建一个叫Gruntfile.js的文件，并输入以下代码（当然这是官方的demo）
    
	module.exports = function(grunt) {
	
	  // Project configuration.
	  grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    uglify: {
	      options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      },
	      build: {
	        src: 'src/<%= pkg.name %>.js',
	        dest: 'build/<%= pkg.name %>.min.js'
	      }
	    }
	  });
	
	  // Load the plugin that provides the "uglify" task.
	  grunt.loadNpmTasks('grunt-contrib-uglify');
	
	  // Default task(s).
	  grunt.registerTask('default', ['uglify']);
	
	};
按照代码中的提示，在根目录下新建一个src和build的文件夹，再在src文件夹下面新建一个和name相同的文件，我得package.json的name是gruntjs-again，那就新建一个gruntjs-again.js文件。

回到命令行，输入`grunt`执行Gruntfile.js

就会出现以下的结果


以上就是grunt的最基本的操作，今天晚上下班后，再好好整理一些更有趣、更神奇的应用。要开始上班了，，不然要被骂了，哈哈。（@yzh_2013.08.16 10:38）

#### gruntjs进阶篇 ####
现在是下班时间，大家都走了，组里只剩下我一个，真的很安静，哈哈，感觉挺不错的。

以下的内容参考了别人的文章：[文章链接](http://www.cnblogs.com/zhepama/archive/2013/05/15/3080736.html)

新建一个目录，我这里是gruntjs，和上面一样，在这个目录下面新建package.json文件，输入以下代码：

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
以上的package.json将会为这个项目添加五个依赖库，分别是

- 编译less的grunt-contrib-less；
- 监控文件的grunt-contrib-watch；
- 合并并压缩js文件的grunt-contrib-uglify；
- 压缩css文件的grunt-contrib-cssmin；
- 复制文件的grunt-contrib-cssmin；

进入gruntjs这个目录，在命令行中，执行`npm install`执行安装依赖库（这里我就不截图了）

新建以下一些文件，

新建Gruntfile.js文件，在Gruntfile.js文件输入以下代码

    module.exports = function (grunt) {
	    grunt.initConfig({
	        pkg: grunt.file.readJSON('package.json'),
	 
	        // 编译 LESS 文件
	        less: {
	            compile: {
	                files: {
	                    'assets/css/app.css': 'assets/css/app.less'
	                }
	            }
	        },
	 
	        // 压缩 CSS 文件
	        cssmin: {
	            options: {
	                report: 'gzip'
	            },
	            combine: {
	                files: {
	                  'assets/css/app.min.css': 'assets/css/app.css'
	                }
	            }
	        },
	 
	        // 压缩合并 JS 文件
	        uglify: {
	            options: {
	                report: 'gzip',
	                mangle: true, // Specify mangle: false to prevent changes to your variable and function names.
	                banner: '/** \n' +
	                        ' * -------------------------------------------------------------\n' +
	                        ' * @version: <%= pkg.version%> \n' +
	                        ' * @author: <%= pkg.author%> \n' +
	                        ' * @description: <%= pkg.description%> \n' +
	                        ' * ------------------------------------------------------------- \n' +
	                        ' */ \n\n'
	            },
	            myTarget: {
	                files: {
	                    'assets/js/app.min.js': ['assets/js/app.js',
	                                             'assets/js/book.js'],
	
	                    'assets/js/lib/libs.min.js': ['assets/js/lib/jquery-1.9.1.js',
	                                                  'assets/js/lib/sizzle.js']
	                }
	            }
	        },
	 
	        // 复制文件，打包到 dest 文件夹目录下
	        copy: {
	            main: {
	                files: [
	                    { src: 'index.html', dest: 'dest/index.html' },
	                    { src: ['assets/css/app.min.css'], dest: 'dest/' },
	                    { src: ['assets/js/lib/libs.min.js'], dest: 'dest/' },
	                    { src: ['assets/js/app.min.js'], dest: 'dest/' }
	                ]
	            }
	        },
	 
	        // 监控 LESS 文件
	        watch: {
	            scripts: {
	                files: ['assets/css/*.less'],
	                tasks: ['less', 'cssmin']
	            }
	        }
	 
	    });
	 
	    grunt.loadNpmTasks('grunt-contrib-less');
	    grunt.loadNpmTasks('grunt-contrib-uglify');
	    grunt.loadNpmTasks('grunt-contrib-cssmin');
	    grunt.loadNpmTasks('grunt-contrib-watch');
	    grunt.loadNpmTasks('grunt-contrib-copy');
	 
	    grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'copy']);
	 
	};

最后，执行`grunt`，你会发现dest目录下面有css目录、js目录以及index.html文件，这些都是grunt-contrib-copy在起作用。而在assets目录下，你会发现经过压缩的css文件，以及经过压缩和合并的js文件，这是cssmin和uglify，less在起作用

那watch有啥用呢？在命令行里面执行`grunt watch`，当你修改less文件的时候，css和cssmin文件都会被修改，这就是我觉得很神奇的地方，这到底是神马原理呢？这估计得以后学了nodejs之后才知道了。好了不说了，都快九点了，才回去了！（20130816 20:48）
