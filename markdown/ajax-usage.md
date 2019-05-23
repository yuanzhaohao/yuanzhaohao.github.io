<!--
date: 2013-08-13
title: 整理一下 AJAX 的知识点
description: ajax 技术的核心在于 XMLHttpRequest 对象（简称 XHR），它允许异步发送和接收数据。所有主流浏览器都对它提供了完善的支持，而且它还能精确地控制发送请求和数据接收。你可以在请求中添加任何头信息和参数，并读取服务器返回的所有头信息，以及响应文本。
-->

## 整理一下 AJAX 的知识点

ajax 技术的核心在于 XMLHttpRequest 对象（简称 XHR），它允许异步发送和接收数据。所有主流浏览器都对它提供了完善的支持，而且它还能精确地控制发送请求和数据接收。你可以在请求中添加任何头信息和参数，并读取服务器返回的所有头信息，以及响应文本。

#### 创建 XHR 对象

创建的 XHR 对象的时候，有以下需要注意的问题：IE7+、Firefox、Opera、Chrome 和 Safari 都支持原生的 XHR 对象，所以在这些浏览器中创建 XHR 对象，直接 new XMLHttpRequest()就可以了。然而，在 IE 早期的版本，是利用 ActiveX 对象生成的。 **兼容性比较好的创建 XHR 对象代码**

function createXHR() { if( typeof XMLHttpRequest !== 'undefined' ) { return new XMLHttpRequest(); } else if( ActiveXObject !== 'undefined' ) { var version = [ 'MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMHttp'], len = version.length; for( var i = 0; i < len; i++ ) { try{ new ActiveXObject( version[i] ); arguments.callee.activeXString = version[i]; break; } catch( ex ) { } } return new ActiveXObject( arguments.callee.activeXString ); } }

#### XHR 对象的用法

- 打开请求：open( type, url, boolean )，接收三个参数：数据类型、url、异步发送请求的布尔值
- 发送数据：send( data )，接收一个参数，即要发送的数据
- 响应信息：responseText，响应主体被返回的文本。status，响应的 http 状态码

##### 同步请求

    var xhr = createXHR();
    xhr.open( 'get', 'fuxi.html', false );
    xhr.send( null );
    if( xhr.status === 200 || xhr.status === 304 ) {
        console.log( xhr.responseText );
    } else {
    	console.log( 'error' );
    }

##### 异步请求

    var xhr = createXHR(),
    	url = 'fuxi.html',
    	params = [
    		'id=1234',
    		'limit=20'
    	];

    xhr.onreadystatechange = function() {
    	if( xhr.readyState === 4 ) {
    		if( xhr.status === 200 || xhr.status === 304 ) {
    			console.log( xhr.responseText );
    		} else {
    			console.log( 'error' );
    		}
    	}
    }
    xhr.open( 'get', [ url, '?', params.join( '&' ) ].join( '' ), true );
    xhr.send( null );

发送异步请求的时候，可以通过检测对象的 readyState 属性来判断请求/响应过程的当前活动阶段。

- 0：未初始化。尚未调用 open()方法。
- 1：启动。已经调用了 open()方法，但尚未调用 send()方法。
- 2：发送。已经调用 send()方法，但尚未接收到响应。
- 3：接收。已经接收到部分响应数据。
- 4：完成。已经接收到全部的响应数据，而且已经可以在客户端中显示。

只要 readyState 属性的值由一个值变成另外一个值，都会触发一次 onreadystatechange 事件。需注意的是，以上代码中，必须在 open 函数之前调用 onreadystatechange()函数，因为这样才能确保浏览器的兼容性。而且以上代码利用了 DOM0 级方法添加了事件处理程序，因为并不是所有的浏览器都支持 DOM2 级事件，同时并没有向 onreadystatechange 事件处理程序中添加 event 对象，是因为 onreadystatechange 的作用域问题。onreadystatechange 函数的 this 关键字指向的是 XHR 对象，而不是事件处理对象 event。

**异步和同步的区别：**同步和异步最大的区别就是发送同步请求的时候，在接收到响应信息的之前，是不能做任何事情的，处于等待状态。等到服务器端返回响应信息了，客户端才能继续处理其他程序。而异步则不一样，在接收到响应信息之前，客户端是可以处理其它程序的，javascript 是基于单线程的，那它是怎么实现这种 ajax 异步处理的呢，这个待会我再好好说说。同步和异步还有其它的一些不同，主要在于发送数据的格式不太一样，这里我摘抄了一段别人的博客：[http://my.oschina.net/leoson/blog/108708](http://my.oschina.net/leoson/blog/108708 'Ajax工作原理')异步传输是面向字符的传输，它的单位是字符；而同步传输是面向比特的传输，它的单位是桢，它传输的时候要求接受方和发送方的时钟是保持一致的。

好了，关于刚刚说到的 ajax 异步处理，javascript 明明是单线程的，到底是怎么实现异步的呢？我研究了一下，javascript 引擎是单线程运行的,浏览器无论在什么时候都只且只有一个线程在运行 javascript 程序。这就像一个队列一样，不断会有新的程序插在队列后面，按照插入的顺序执行。如果队列非空，引擎就从队列头取出一个任务，直到该任务处理完,即返回后引擎接着运行下一个任务，在任务没返回前队列中的其它任务是没法被执行的。其实 ajax 异步也就是利用了回调函数，也就是 onreadystatechange 函数设置的程序，但一次函数执行完后，就向队列后面插入回调函数。

##### 头信息操作

- 设置请求头信息：setRequestHeader( myHeader, myValue );
- 获得响应头信息：getResponseHeader( myHeader );
- 获取所有响应头信息：getAllResponseHeaders();

**get 和 post 的区别：**如果请求并不会改变服务器状态，只会获取数据（这称为“幂等行为”，所谓幂等就是指一个操作重复执行 N 次得到的结果与执行一次是相等的），那就选择 get 请求。而 post 请求通常用于向服务器发送应该被保存的数据。与 get 请求相比，post 请求消耗的资源会更过一些，从性能的角度，发送相同的数据，get 请求最多可以达到 post 请求的两倍。与 post 请求相比，经 get 请求的数据会被浏览器缓存起来，如果多次请求同一数据，可以提高性能。但是由于 ie 对 url 长度有所限制，当请求的 url 的长度超过 2048 个字符的时候，应该选择 post 方式。
