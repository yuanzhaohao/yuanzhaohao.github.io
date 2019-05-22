## 优化篇-前端开发优化技巧

> 假期马上结束，上班之后，可能就更没时间去写这些博客了，所以今天抽空出来整理一下 web 前端优化的一些技巧，算是对自己所学过的东西的一种总结吧！

首先来扯扯前端优化的作用，也就是我们为什么要进行前端优化呢？

我认为最主要的是以下两点：

- 从用户的角度来看，前端优化能让页面加载得更快、对用户的响应更加及时，能够为用户提供更加友好的体验；
- 能够减少请求所占的带宽，节省可观的资源；

总之，前端优化还有很多很多的好处，我能想到的暂时也就上面两条。

好吧，入正题吧！我认为前端优化主要分两大方向，第一是页面级别的优化，例如减少 HTTP 请求数、脚本的无阻塞加载等；第二是代码级别的优化，也就是 Javascript 代码、HTML 代码、CSS 代码的优化吧！

### 页面级别的优化

#### 减少 HTTP 请求数

一个完整的 HTTP 请求大概要经过下面一些步骤：DNS 寻址、与服务器建立连接、发送数据、等待服务器响应、接收数据。由上面可以看出一次完整的 HTTP 请求是一个比较“复杂”的过程，因此我们有必要通过一些途径来减少 HTTP 请求数。

1）资源的合并和压缩：这里面主要就是将多个 css 文件合并和压缩成一个 css 文件，将 js 文件合并和压缩成一个 js 文件。尽可能地压缩并合并在一起；这里我们可以使用**GruntJS**来做这些事情。

2）CSS Sprite 技术：也就是将多个图片（一般是小图标之类的）整合成一张图片，利用 CSS background 相关元素进行背景图绝对定位；

3）Lazy Load Image：也就是在页面刚加载的时候可以只加载第一屏的图片，当用户继续往后滚屏的时候才加载后续的图片。（jQuery 里面有一个插件 Lazyload.js，能实现看似延迟加载的效果，但事实上这个插件对现代浏览器并不起作用！）

4）设置 HTTP 缓存（这是最有效减少 HTTP 请求数的方法）：缓存的力量是强大的，恰当的缓存设置可以大大的减少 HTTP 请求。

这里稍微提一下和 HTTP 缓存有关的知识

与 HTTP 缓存有关的 header

**Request**

- Cache-Control:max-age=0（以秒为单位）
- Connection:keep-alive（重复利用 socket，不需要重新建立连接）
- If-Modified-Since:Sun, 15 Sep 2013 14:06:30 GMT（缓存文件的最后修改时间）
- If-None-Match:"d0000000032e4-1a82-4e66c98210580"（缓存文件的 Etag 值）
- Pragma: no-cache（不使用缓存，这个还没用过，不知道有啥意义）

**Response**

- Cache-Control:public （响应被缓存，并且在多用户间共享）
- Cache-Control:private（响应只能作为私有缓存，不能在用户之间共享）
- Cache-Control:no-cache（提醒浏览器要从服务器提取文档进行验证）
- Cache-Control:no-store（绝对禁止缓存，用于机密，敏感文件）
- Cache-Control:max-age=2592000（在 Date 的基础上，2592000 秒之后缓存过期，与 Expires 对应）
- Date:Sat, 12 Oct 2013 03:21:01 GMT（response 发送的时间）
- ETag:"d0000000032e4-1a82-4e66c98210580"（服务器端文件的 Etag 值）
- Expires:Mon, 11 Nov 2013 03:21:01 GMT（缓存过期的时间，是绝对时间，Expires 减去 Date 的时间就是 Cache-Control:max-age=2592000）

如果同时存在 cache-control 和 Expires，浏览器总是优先使用 cache-control，如果没有 cache-control 才考虑 Expires

**Web 服务器通过 2 种方式来判断浏览器缓存是否是最新的**

**第一种**、浏览器把缓存文件的最后修改时间通过 header “If-Modified-Since”来告诉 Web 服务器。

1. 浏览器客户端想请求一个文档， 首先检查本地缓存，发现存在这个文档的缓存， 获取缓存中文档的最后修改时间，通过： If-Modified-Since， 发送 Request 给 Web 服务器。

2. Web 服务器收到 Request，将服务器的文档修改时间（Last-Modified）: 跟 request header 中的，If-Modified-Since 相比较， 如果时间是一样的， 说明缓存还是最新的， Web 服务器将发送 304 Not Modified 给浏览器客户端， 告诉客户端直接使用缓存里的版本。

3. 假如该文档已经被更新了。Web 服务器将发送该文档的最新版本给浏览器客户端

**第二种**、浏览器把缓存文件的 ETag，通过 header “If-None-Match”来告诉 Web 服务器。

（ETag 是根据实体内容生成的一段 hash 字符串，可以标识资源的状态。当资源发送改变时，ETag 也随之发生变化。）

如果 If-None-Math 和服务器端的 ETag 相同，那么服务器端就会告诉客户端使用本地缓存文件。

**为什么使用 ETag 呢？ 主要是为了解决 Last-Modified 无法解决的一些问题。**

1. 某些服务器不能精确得到文件的最后修改时间， 这样就无法通过最后修改时间来判断文件是否更新了。

2. 某些文件的修改非常频繁，在秒以下的时间内进行修改. Last-Modified 只能精确到秒。

3. 一些文件的最后修改时间改变了，但是内容并未改变。 我们不希望客户端认为这个文件修改了。

**设置缓存的一些方法**

**通过 html 的 meta 标签设置 Expires 和 Cache-Control**

    <meta http-equiv="Cache-Control" content="max-age=2592000" />
    <meta http-equiv="Expires" content="Mon, 11 Nov 2013 03:21:01 GMT" />

**通过 mod_expires 模块设置 Expires**

    <IfModule mod_expires.c>
    	ExpiresActive on
    	ExpiresDefault "access plus 30 days"
    	ExpiresByType css/html "access plus 30 days"
    	ExpiresByType css/css  "access plus 30 days"
    	ExpiresByType images/gif "access plus 30 days"
    	ExpiresByType images/png "access plus 30 days"
    	ExpiresByType images/jpeg "access plus 30 days"
    	ExpiresByType images/ico "access plus 30 days"
    </IfModule>

**通过 mod_headers 模块来设置 Expires**

    <FilesMatch "\.(ico|pdf|flv|jpg|jpeg|png|gif|js|css|swf)$">
    	Header set Cache-Control “max-age=604800, public”
    </FilesMatch>
    <FilesMatch "\.(xml|txt)$">
    	Header set Cache-Control “max-age=18000, public, must-revalidate”
    </FilesMatch>
    <FilesMatch "\.(html|htm|php)$">
    	Header set Cache-Control “max-age=3600, must-revalidate”
    </FilesMatch>

（以上关于 HTTP 缓存的知识，参考了下面的博客：[http://www.cnblogs.com/TankXiao/archive/2012/11/28/2793365.html](http://www.cnblogs.com/TankXiao/archive/2012/11/28/2793365.html)）

**Update**：上面对 HTTP 缓存的理解还有一些改进，在另外一篇文章里面有介绍：[HTTP 缓存的一些总结](http://yzhblog.ap01.aws.af.cm/?p=169)

另外我在知乎上面提问了一个关于**前端图片资源的优化**：[http://www.zhihu.com/question/21815101](http://www.zhihu.com/question/21815101)

#### 将外部脚本置底

顾名思义，也就是把 js 文件放在底部。原因很简单，因为浏览器遇到`<script>`标签的时候，会停止加载图片、样式等其他资源，直到`<script>`标签的内容加载并执行完后，才继续加载。

如果将脚本放在比较靠前的位置，则会影响整个页面的加载速度从而影响用户体验。将脚本尽可能的往后挪，能减少对**并发下载**的影响。

#### 无阻塞脚本

常用的两种方法是**动态脚本元素**以及**XHR 注入**

**动态脚本元素的简单介绍**

也就是通过 DOM 方法创建 script 标签，从而加载 js 文件。无论何时启动下载，文件的下载和执行过程都不会阻塞页面的加载。 // @param1:脚本路径 // @param2:回调函数 // description:针对 IE8 以下版本浏览器和现代浏览器做了两种处理，如果是 IE8 以下的浏览器，就使用 readyState 属性来完成。 function loadScript( url, callback ) { if( typeof url === 'string' && typeof callback === 'function' ) { var script = document.createElement( 'script' ); script.type = 'text/javascript'; if( script.readyState ) { script.onreadystatechange = function() { if( script.readyState === 'loaded' || script.readyState === 'complete' ) { script.onreadystatechange = null; callback(); } }; } else { script.onload = function() { callback(); }; } script.src = url; document.getElementsByTagName( 'head' )[0].appendChild( script ); } var script = document.createElement( 'script' ); script.type = 'text/javascript'; } loadScript( 'jquery.js', function() { document.write( 'jquery loaded!' ); })

**XHR 脚本注入**

顾名思义，就是创建 XHR 对象，然后用它来下载 Javascript 文件，最后通过创建 script 标签将代码注入到页面中去。

    var xhr = new XMLHttpRequest();
    xhr.open( 'get', 'jquery.js', true );
    xhr.onreadystatechange = function() {
    	console.log( xhr.readyState );
    	if( xhr.readyState === 4 ) {
    		if( xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 ) {
    			var script = document.createElement( 'script' );
    			script.type = 'text/javascirpt';
    			script.text = xhr.responseText;
    			document.body.appendChild( script );
    		}
    	}
    }

#### 将 CSS 放在 HEAD 中

如果将 CSS 放在其他地方比如 BODY 中，则浏览器有可能还未下载和解析到 CSS 就已经开始渲染页面了，这就导致页面由无 CSS 状态跳转到 CSS 状态，用户体验比较糟糕。除此之外，有些浏览器会在 CSS 下载完成后才开始渲染页面，如果 CSS 放在靠下的位置则会导致浏览器将渲染时间推迟。

#### 代码级别的优化

#### css 篇

这里主要谈谈 css 选择器的优化

    div.nav < ul li a[title]

上面的实例来说，浏览器首先会尝试在你的 HTML 标签中寻找“a[title]”元素，接着在匹配“li 和 ul”，最后在去匹配“div.nav”。这就是前成所主的“选择器从右到左的原则”。

选择器的最后一部分，也就是选择器的最右边（在这个例子中就是 a[title]部分）部分被称为“关键选择器”，它将决定你的选择器的效率如何？是高还是低。

**附表：css 选择器优先级**

选择器有一个固有的效率，我们来看 Steve Souders 给排的一个顺序：

- id 选择器（#myid）
- 类选择器（.myclassname）
- 标签选择器（div,h1,p）
- 相邻选择器（h1+p）
- 子选择器（ul > li）
- 后代选择器（li a）
- 通配符选择器（\*）
- 属性选择器（a[rel="external"]）
- 伪类选择器（a:hover,li:nth-child）

上面九种选择器的效率是从高到低排下来的，基中 ID 选择器的效率是最高，而伪类选择器的效率则是最底。

**综合上面的顺序，我们清楚的知道，id 和类名用于关键选择器上效率是最高的，而 CSS3 的仿伪类和属性选择器，虽然使用方便，但其效率却是最低的**。我们下面一起来看几个实例的对比：

    div #myid

效率要比下面的高：

    #myid div

#### Javascript 篇

下面浅谈一下 Javascript 方面的优化。

**DOM**：DOM 操作应该是脚本中最耗性能的一类操作，例如增加、修改、删除 DOM 元素或者对 DOM 集合进行操作。所以第一条规则是**尽可能减少 DOM 操作**。请看下面代码：

    var list = document.getElementById( 'myList' );
    	item,
    	i = 10;
    while( i-- ) {
    	item = document.createElement( 'li' );
    	list.prependChild( item );
    	item.appendChild( document.createTextNode( 'Item' + i ) );
    }

以上面的代码为例，说一些优化 DOM 操作的一些小技巧：

（1）使用`innerHTML`（要比 DOM 创建节点要快的多）

优化代码如下：

    var list = document.getElementById( 'myList' );
    	html = '',
    	i = 10;
    while( i-- ) {
    	html += '<li>Item '+i+'</li>';
    }
    list.innerHTML = html;

（2）使用 HTMLCollection。也就是把 DOM 对象存入数组或者原生 js 对象里面。

    var img = document.getElementByTagName( 'img' );
    ...

**按需加载类库**：按需加载这个概念，在 Javascript 模块化里面是比较重要的概念，详情请看 seajs 或者 requirejs 这些模块化类库的使用。

**使用事件委托**

在 Javascript 里面，如果添加的事件处理程序过多，那么性能就越差。这个比较容易理解：每一个函数都是一个对象，都会占用内存；内存中的对象越多，性能就越差。

所谓事件委托就是指利用事件冒泡，只指定一个事件处理程序，去管理多个同类型的事件处理程序。

html 代码

    <ul id="myList">
    	<li id="one">one</li>
    	<li id="two">two</li>
    	<li id="three">three</li>
    </ul>

js 代码

    //使用DOM2级添加事件处理程序
    var list = document.getElementById( 'myList' );
    list.addEventListener( 'click', function( event ) {
    	var target = event.target;
    	switch( target.id ) {
    		case 'one':
    			alert( 'one' );
    			break;
    		case 'two':
    			alert( 'two' );
    			break;
    		case 'three':
    			alert( 'three' );
    			break;
    	}
    }, false);

上面代码，我只是在 id 为 myList 的节点里面添加了一个`click`事件，而不必在每一个`li`里面添加`click`事件。

**作用域链的查找**（一般指减少全局作用域的查找）

优化前的代码：

    var globalVar = 1;
    function myCallback( info ) {
    	var i = 1000000;
    	while( i-- ) {
    		//每次访问globalVar都需要查找到作用域链最顶端，本例中需要访问100000次
    		globalVar += i;
    	}
    }

优化后的代码：

    var globalVar = 1;
    function myCallback( info ) {
    	//局部变量缓存全局变量
    	var localVar = globalVar,
    		i = 1000000;
    	while( i-- ) {
    		//访问局部变量是最快的
    		localVar += i;
    	}
    	//本例中只需要访问2次全局变量
    	globalVar = localVar;
    }

另外，要注意少使用闭包

**函数节流**

函数节流是指某些操作不可以在没有间断的情况下连续重复执行。最常见的就是窗口的`resize`操作。

    // @param1:要执行的函数
    // @param2:在哪个作用域里面执行
    function throttle( method, context ) {
    	clearTimeout( method.tId );
    	method.tId = setTimeout( function() {
    		method.call( context );
    	}, 100);
    }

**循环**

    for( var i = 0; i < arr.length; i++ )

可以把数组的长度提取出来，优化后的代码如下：

    var len = arr.length;
    for( var i = 0; i < len; i++ )

一般我比较喜欢这样写

    var i = arr.length;
    while( i-- ) {
    	...
    }

**AJAX**

ajax 的总结，在我的另外一篇文章里面有过总结：[整理一下 AJAX 的知识点](http://yzhblog.ap01.aws.af.cm/?p=55)

（能想到的 Javascript 优化方面的技巧，大概就这么多，后面想到了，再加进去吧！）
