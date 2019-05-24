<!--
date: 2013-10-12
title: http 缓存
description: 关于 http，我相信大家都耳熟能详，但我今天要讲的是关于 http 缓存的东西，所以我就不扯太多 HTTP 的概念了。
-->

## http 缓存

关于 http，我相信大家都耳熟能详，但我今天要讲的是关于 http 缓存的东西，所以我就不扯太多 HTTP 的概念了。

### http 请求的过程

一次 http 请求大概会经历下面一些步骤：DNS 寻址、与服务器建立连接、发送数据、等待服务器响应、接收数据。

我们打开一个网页的时候，是要发送很多次 HTTP 请求的：首先，会发送一次 HTTP 请求，获取服务器的 html，然后服务器返回响应信息（html 代码是存在实体内容，也就是 body 里面的）；然后浏览器会分析第一次请求得到的 html 代码，然后会发送很多请求，去请求 html 代码上面的资源，比如 css 文件、js 文件、图片文件等等；

我在上一篇博客里面也提到过，缓存的力量是强大的，利用缓存可以减少发送 http 请求，也就是可以减少一些操作，最终达到优化的目的；（不过，像云龙所说的，也不能一味地追求减少 HTTP 请求，合理地利用并发下载，也许会更有效！并发下载这一块以后再慢慢探究吧！）

另外，上一篇博客里面理解的 HTTP 缓存有误，迟些我会去修正！

### 与 http 缓存相关的 header

#### Request

- Cache-Control:max-age=0（以秒为单位）
- Connection:keep-alive（重复利用 socket，不需要重新建立连接）
- If-Modified-Since:Sun, 15 Sep 2013 14:06:30 GMT（缓存文件的最后修改时间）
- If-None-Match:"d0000000032e4-1a82-4e66c98210580"（缓存文件的 Etag 值）
- Pragma: no-cache（不使用缓存，这个还没用过，不知道有啥意义）

#### Response

- Cache-Control:public （响应被缓存，并且在多用户间共享）
- Cache-Control:private（响应只能作为私有缓存，不能在用户之间共享）
- Cache-Control:no-cache（提醒浏览器要从服务器提取文档进行验证）
- Cache-Control:no-store（绝对禁止缓存，用于机密，敏感文件）
- Cache-Control:max-age=2592000（在 Date 的基础上，2592000 秒之后缓存过期，与 Expires 对应）
- Date:Sat, 12 Oct 2013 03:21:01 GMT（response 发送的时间）
- ETag:"d0000000032e4-1a82-4e66c98210580"（服务器端文件的 Etag 值）
- Expires:Mon, 11 Nov 2013 03:21:01 GMT（缓存过期的时间，是绝对时间，Expires 减去 Date 的时间就是 Cache-Control:max-age=2592000）

需要注意的是：允许客户端在这个时间之前不去检查（发请求），等同 max-age 的效果。但是如果同时存在，则被 Cache-Control 的 max-age 覆盖。

对于 Cache-Control，还有几个属性，我上网查了一下，不是很理解这几个属性的用法；

- no-store：用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存
- min-fresh：指示客户机可以接收响应时间小于当前时间加上指定时间的响应。
- max-stale：指示客户机可以接收超出超时期间的响应消息。如果指定 max-stale 消息的值，那么客户机可以 接收超出超时期指定值之内的响应消息。

### 设置 http 缓存

#### 通过 html 的 meta 标签设置 Expires 和 Cache-Control

```html
<meta http-equiv="Cache-Control" content="max-age=2592000" />
<meta http-equiv="Expires" content="Mon, 11 Nov 2013 03:21:01 GMT" />
```

#### 通过 mod_expires 模块设置 Expires

```html
<IfModule mod_expires.c>
  ExpiresActive on ExpiresDefault "access plus 30 days" ExpiresByType css/html "access plus 30 days"
  ExpiresByType css/css "access plus 30 days" ExpiresByType images/gif "access plus 30 days"
  ExpiresByType images/png "access plus 30 days" ExpiresByType images/jpeg "access plus 30 days"
  ExpiresByType images/ico "access plus 30 days"
</IfModule>
```

#### 通过 mod_headers 模块来设置 Expires

```html
    <FilesMatch "\.(ico|pdf|flv|jpg|jpeg|png|gif|js|css|swf)$">
    	Header set Cache-Control “max-age=604800, public”
    </FilesMatch>
    <FilesMatch "\.(xml|txt)$">
    	Header set Cache-Control “max-age=18000, public, must-revalidate”
    </FilesMatch>
    <FilesMatch "\.(html|htm|php)$">
    	Header set Cache-Control “max-age=3600, must-revalidate”
    </FilesMatch>
```

值得注意的是：上面两种配置，我都是使用 Apache 来设置的，前提一定要配置 Apache 配置环境支持那两个模块；

另外的话，这里我是通过一个分布式文件.htaccess 来设置服务器（由于没有接触过 nginx，貌似 nginx 里面的配置和 Apache 里面的设置方法差不多！）

### 举一个使用了 Expires 的例子

其实，我有时候觉得自己还算蛮幸运的，可以认识到很多很厉害的前辈，并能得到他们的指点；（ps：其实下面的例子是一位前辈给我提的，他的名字我就不提了，尊重隐私权，哈哈！）

我们来定义一个应用场景：假如有一个用户在浏览一个网页，而这个网页他之前完全没有浏览过，另外一方面，网站站长在他的服务器下面设置了 HTTP 缓存，他是通过`Expires`设置了一个时间，假设是当前时间的前提下再加 10 分钟；（我们以一张设置了`Expires`的图片为例！）

#### 第一次请求

当用户第一次进入这个网页，浏览器发起 http 请求，这时候，浏览器会检测一下浏览器有没有这张图片的缓存文件。（因为第一次浏览，自然没有缓存），这时候，浏览器就会发送**Request**给服务器。

服务器那边，会响应请求，然后会把**Response**返回到浏览器那边。

Response 会包括下面一些 header：

- Date:Sat, 12 Oct 2013 07:31:10 GMT
- ETag:"d0000000032e4-1a82-4e66c98210580"
- Expires:Mon, 11 Nov 2013 07:31:10 GMT
- Keep-Alive:timeout=5, max=98
- Last-Modified:Sun, 15 Sep 2013 14:06:30 GMT

最后，浏览器接收到响应，会进行下面两个步骤：

- 把信息与资源存起来
- 展示资源内容

上面是一次完整的 HTTP 请求。

#### 第二次请求

假设是第一次请求之后 10 分钟内；

这时候，浏览器会检测浏览器是否有这张图片的缓存，发现有缓存，于是她检查一下缓存信息，发现过期时间还没有到。这时候，浏览器就会直接展示缓存数据。

这次浏览器并没有向服务器发送请求，而是直接读取缓存数据。

值得注意的是：按**刷新**按钮和按**回车**按钮得到的结果是不一样的，按刷新按钮，浏览器会向服务器发送数据，而按回车，浏览器会直接读缓存，两者是不一样的。

#### 第三次请求

假设这是第一次请求之后 20 分钟发送的请求；

这时候，浏览器会执行和上面刚开始相同的操作，就是会检测缓存的信息。

浏览器若发现缓存过期时间已经到了，就会向服务器发送**Request**，这个请求信息会比第一次多几个个 header：

- If-Modified-Since:Sun, 15 Sep 2013 14:06:30 GMT
- If-None-Match:"d0000000032e4-1a82-4e66c98210580"

**服务器**：服务器接到请求信息之后，发现请求信息里面有`If-Modified-Since`和`If-None-Match`，这时候，就会进行下面一下操作；

- 判断当前资源的时间`Last-Modified`，与`If-Modified-Since`比较，如果相同，那就向浏览器返回`304`；
- 如果发现`Last-Modified`和`If-Modified-Since`相同，那就再判断`If-None-Match`和`Etag`，如果相同，那就返回`304`；如果不相同，那就返回`200`，同时会像第一次请求那样发送资源等数据；

**回到浏览器**：浏览器接收到响应信息之后，判断状态码，如果是`304`，直接读缓存；如果是`200`，直接读响应信息返回的资源，并把资源和 header 存起来；

这里提一下`Last-Modified`和`Etag`的区别；

ETag 是服务端产生的一段 hash 代码，然后发给浏览器。

为什么使用 ETag 呢？ 主要是为了解决 Last-Modified 无法解决的一些问题。

- 某些服务器不能精确得到文件的最后修改时间， 这样就无法通过最后修改时间来判断文件是否更新了；
- 某些文件的修改非常频繁，在秒以下的时间内进行修改. Last-Modified 只能精确到秒；
- 一些文件的最后修改时间改变了，但是内容并未改变。 我们不希望客户端认为这个文件修改了；

### 写在最后

趁着开会的时候，把这篇博客写完，上面的内容也是本人的愚见，不一定对，欢迎大家拍砖；

#### 参考博客

- [http://www.cnblogs.com/TankXiao/archive/2012/11/28/2793365.html](http://www.cnblogs.com/TankXiao/archive/2012/11/28/2793365.html)
- [http://hi.baidu.com/75526201/item/3528ca2a9429e680af48f597](http://hi.baidu.com/75526201/item/3528ca2a9429e680af48f597)
