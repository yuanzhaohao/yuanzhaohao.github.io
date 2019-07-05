(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{77:function(n,t){n.exports={markdown:"<h2>重新整理我的博客</h2>\n<blockquote>\n<p>自从工作之后，已经很久没有写过博客了。一是之前在国内的公司工作会比较忙，一天工作下来之后，已经没有多少时间写 blog 了。另一方面，阿里和腾讯内部有公司的博客，之前也在上面写过不少，不过离职之后，都没有拿出来。最近发现 Github Pages 是个很好的东西，于是乎，我就花了一些时间，重新整理了一下我的博客，用 GitHub Pages 搭建静态博客。</p>\n</blockquote>\n<h4>原理</h4>\n<p>原理其实不难，在 github.com 上新建一个 repo，以 github 的名称开头的域名项目，比如我的 id 是 yuanzhaohao，新建一个 yuanzhaohao.github.io 的项目。具体教程可以参考这篇官方的文章<a href=\"https://pages.github.com/\">Websites for you and your projects</a></p>\n<h4>项目目录</h4>\n<ul>\n<li>root\n<ul>\n<li>src\n<ul>\n<li>data.json: 构建脚本自动生成的 markdown 列表数据</li>\n<li>components</li>\n<li>entry</li>\n<li>lib</li>\n</ul>\n</li>\n<li>static: 静态文件存放目录</li>\n<li>srcipts: 脚本构建，包括 webpack 配置等</li>\n<li>typings: 普通的 typings</li>\n<li>js: scripts 构建出来的文件目录</li>\n<li>markdown: markdown 文件存放目录，会被自动构建到代码中</li>\n<li>index.html: 构建出来的页面入口文件</li>\n<li>.prettierrc: 美化代码以及 markdown 的配置</li>\n<li>tsconfig.json: ts 的配置</li>\n<li>tslint.json: tslint 的语法检测</li>\n<li>...</li>\n</ul>\n</li>\n</ul>\n<h4>技术栈</h4>\n<p>在技术选型上，采用 React+Redux+React-router+Typescript，源文件是 markdown 文件，所以需要简单地写一下 webpack 的 markdown loader。</p>\n<p>markdown 文件的 loader 代码如下，在 scriprs/markdown-loader.js 里，原理也很简单，也就是用<code>markdown-it</code>，把 markdown 文件转化为 html 源代码，再输出为 commonjs module 即可。</p>\n<pre><code class=\"language-js\">'use strict';\n\nconst fs = require('fs-extra');\nconst path = require('path');\n// const marked = require('marked');\nconst md = require('markdown-it')({\n  html: true,\n});\nconst glob = require('glob');\n\nmodule.exports = function(source, options) {\n  if (this.cacheable) {\n    this.cacheable();\n  }\n\n  const sourcePath = path.dirname(this.resourcePath);\n  const basename = path.basename(this.resourcePath, '.md');\n\n  // 处理页头的meta信息\n  source = source.replace(//gi, '');\n\n  return `module.exports = {` + `\\n  markdown: ${JSON.stringify(md.render(source))},` + `};`;\n};\n</code></pre>\n<p>在构建的时候，会自动获取 markdown 目录下的文件生成一个列表的 json 数据文件</p>\n<pre><code class=\"language-js\">'use strict';\n\nconst fs = require('fs-extra');\nconst path = require('path');\nconst glob = require('glob');\nconst webpack = require('webpack');\nconst rm = require('rimraf');\nconst md = require('markdown-it')({\n  html: true,\n});\nconst utils = require('./utils');\nconst config = require('./config');\nconst webpackConfig = require('./webpack.prod.config');\nconst rootPath = utils.resolve('./');\nconst markdownPath = utils.resolve(config.markdownPath);\nconst srcPath = utils.resolve(config.srcPath);\nlet distPath = utils.resolve(config.distPath);\n\nif (rootPath === distPath) {\n  distPath = path.join(rootPath, './js');\n}\n\nnew Promise(function(resolve, reject) {\n  const data = glob\n    .sync(path.join(markdownPath, './*.md'))\n    .map(filepath =&gt; {\n      const sourceText = fs.readFileSync(filepath, 'utf8');\n      const name = path.basename(filepath, '.md');\n      const metaData = utils.yamlFront(sourceText);\n      if (metaData.description) {\n        metaData.description = md.render(metaData.description);\n      }\n      return {\n        ...metaData,\n        name,\n      };\n    })\n    .filter(v =&gt; v.date)\n    .sort((a, b) =&gt; {\n      const d1 = +new Date(a.date);\n      const d2 = +new Date(b.date);\n      return d2 - d1;\n    });\n\n  fs.writeFile(path.join(srcPath, './data.json'), JSON.stringify(data, null, 2), function(err) {\n    if (err) {\n      reject(err);\n    }\n    utils.success('Data json file written.');\n\n    resolve();\n  });\n})\n  .then(function() {\n    rm(distPath, () =&gt; {\n      webpack(webpackConfig, (err, stats) =&gt; {\n        if (err || stats.hasErrors()) {\n          utils.fatal(err);\n        }\n      });\n    });\n  })\n  .catch(function(err) {\n    utils.fatal(err);\n  });\n</code></pre>\n"}}}]);