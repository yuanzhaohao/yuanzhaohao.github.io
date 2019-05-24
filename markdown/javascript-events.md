<!--
date: 2013-09-23
title: 基础篇-Javascript 事件处理
description: 昨天遇到加号操作符的问题，今天恰好在**米憎**的博客里面看到一篇关于加号操作符的文章，所以就想写一篇文章总结一下；
-->

## 基础篇-Javascript 事件处理

> 事件处理是 JS 里面很有趣的东西。今天我主要从事件流、事件处理程序（三种不同方式的事件处理程序）、不同的事件类型来介绍事件处理。

#### 事件流

事件流描述的是从页面接收事件的顺序。分两种事件流，一是事件冒泡，二是事件捕获。

**事件冒泡**：就是指从事件开始触发的节点逐级向上传播到文档(document)

```html
<html>
  <head>
    <title>简单的页面</title>
  </head>
  <body>
    <p>Helloworld!</p>
  </body>
</html>
```

像上面的代码，如果点击了上面的`p`标签，那么按照事件冒泡的处理方式，`click`事件实惠按照下面的顺序进行传播： `<p>` - `<body>` - `<html>` - `document`

**事件捕获**：指从文档（document）逐级传播到事件开始触发的节点。

而对于事件捕获来说，对于上面的代码，点击了`p`标签之后，则会按照完全相反的顺序进行传播：`document` - `<html>` - `<body>` - `<p>`

#### 事件处理程序

##### html 代码指定事件处理程序

首先，对于我们每一个学习网站开发的人来说，下面的代码，一定都会有所接触。

```html
<input type="button" value="click me" name="click" onclick="alert( this.name );" />
```

这样的代码实际上有很多不好的地方。

第一，如果用户在页面解析`onclick`里面指定代码之前就点击触发里面的代码，那么就会引发错误。

解决办法：设置`try{ } catch ( ex ) { }`

    <input type="button" value="click me" name="click" onclick="try{ alert( this.name ); } catch ( ex ) { }" />

第二，HTML 代码和 Javascript 代码紧密耦合。

上面这种添加事件处理的写法非常不好，我们应该摒弃它。

##### DOM0 级事件处理程序

这种方式也就是讲一个函数赋值给一个事件处理程序属性。

```js
var btn = document.getElementById('tx');
btn.onclick = function() {
  console.log('clicked');
  console.log(this === btn); // true
};
```

删除该事件处理程序，只要把该属性设置为 null 就可以了。`btn.onclick = null;`

使用 DOM0 级事件处理程序，需要注意以下几点：

1、这种方式只可以添加一个事件处理程序，如果添加多个，那么后面的添加的将会覆盖前面添加的。

2、这种方式添加事件处理程序，函数的作用域是绑定在添加事件的元素上的。

##### DOM2 级事件处理程序

DOM2 级事件处理程序定义了两个函数：`addEventListener()`和`removeEventListener()`；两者都是接收三个参数：事件名称、事件处理程序、是否在捕获阶段调用事件处理程序（true 为在捕获阶段调用事件处理程序，false 为在冒泡阶段调用事件处理程序）

```js
btn.addEventListener(
  'click',
  function() {
    console.log('clicked'); // 'clicked'
    console.log(this === btn); // true
  },
  false,
);
```

有两点需要注意的是：

1、这种方式的事件处理程序的作用域一般是在绑定事件的元素上面；

2、这种方式支持添加多个事件处理程序，而且执行的顺序是按照添加程序的先后顺序来的（有点类似于队列那样，先进先出）。

3、很多同学都认为 IE 不支持这种事件处理程序，其实 IE9、IE10 以及刚刚出来的 IE11 都是已经支持的了。支持这种事件处理程序的浏览器包括：IE9+、Firefox、Safari、Chrome 和 Opera。

4、利用`addEventListener()`添加事件处理程序，只能通过`removeEventListener()`来移除，举个例子，上面的代码中，添加的是匿名函数，那么使用`removeEventListener()`是无法移除的哈，`removeEvnetListener()`是移除同名的事件处理函数。

##### IE 事件处理程序

IE 事件处理程序中，也有两个类似于 DOM2 级事件处理程序的函数：`attachEvent()`和`detachEvent()`。这两个函数都支持两个参数：事件名称以及事件处理程序函数。

```js
var btn = document.getElementById('tx');
btn.attachEvent('onclick', function() {
  alert('clicked');
  alert(window === this);
});
btn.attachEvent('onclick', function() {
  alert('clicked2');
});
```

需要注意以下几点：

1、事件处理程序可以添加多个，但是执行顺序是按照添加顺序的相反顺序执行的（有点类似于栈了，先进后出）

2、事件处理程序函数的作用域是全局作用域；

3、支持这种事件处理程序的主流浏览器不仅仅是 IE 哦，还有 Opera

4、有点类似于 DOM2 级事件处理程序了，用`attachEvent()`添加的事件处理程序，只能用`dettachEvent()`来移除。

##### 事件对象

所谓事件对象就是指触发 DOM 上的某个事件的时候，会产生一个事件对象 event；我觉得事件对象大概是事件处理程序里面最有趣的东西了，尤其是 DOM 中的事件对象，提供了很多有趣的属性；

**DOM 中的事件对象**：支持 DOM 事件处理程序的浏览器会传入一个 event 对象；

下面简单介绍几个 DOM 中 event 对象有趣的属性：

**currentTarget 和 target**：

currentTarget 是指当前事件处理程序正在处理的那个元素，在事件处理程序内部，this 始终和 currentTarget 相等。

target 是指事件的目标；

如果直接把事件处理程序指定给目标元素，则 this、currentTarget 和 target 包含相同的值。

```js
btn.addEventListener(
  'click',
  function(event) {
    console.log(this === event.currentTarget);
    console.log(this === event.target);
  },
  false,
);
```

上面的结果会返回两个`true`。

```js
btn.addEventListener(
  'click',
  function(event) {
    console.log(this === event.currentTarget);
    console.log(this === event.target);
  },
  false,
);

body.addEventListener(
  'click',
  function(event) {
    console.log(body === event.currentTarget);
    console.log(btn === event.target);
  },
  false,
);
```

如果点击了 btn 按钮，那么将会输出：true、true、true、true；如果点击的是非 btn 的里面的东西，那么就会返回 true、false；

**stopPropagation()**：这个方法用于停止事件在 DOM 中的传播。

以上的代码为例：如果加入在 btn 的事件处理程序里面加入`event.stopPropagation()`，那么点击 btn 之后，是不会出现后面两个 true 的，因为这个方法已经阻止事件的冒泡行为。

**preventDefault()**：这个方法是用于元素阻止默认的行为。

举个最简单的例子，如果在一个 a 标签上面设置了 click 事件，而这个事件处理程序里面有`event.preventDefault()`方法的话，那么 a 标签里面设置的 href 是没有效果的，因为已经阻止了默认的行为。

**IE 中的事件对象**

IE 里面的事件对象的获取有两种方式，如果没有为事件处理函数传入 event 对象，那么可以通过 window 对象来访问 event 对象。也就是`window.event`

**IE 中事件对象的一些有趣属性和方法**

上面提到 DOM 里面有`stopPropagation()`和`preventDefault()`方法，那么在 IE 的事件对象里面也有对应的方法或者属性来实现类似的效果，那就是`cancelBubble`和`returnValue`；

当`cancelBubble`变成`true`的时候（当然，它的默认值是 false），就会阻止事件处理程序的冒泡。

当`returnValue`变成`false`的时候，就会阻止元素的默认行为。

对，还有一个很有趣的属性，和 DOM 中 target 相对应的属性，说到这里，大家应该也猜到是获取事件目标的的属性了，没错，那就是`srcElement`。是 IE 中的事件对象获取事件目标的属性。

**兼容 DOM 和 IE 的事件模块**

```js
    function EventClass() {

    }
    EventClass.prototype = {
    	constructor: EventClass,
    	addEvent: function( elem, type, handler ) {
    		if( document.addEventListener ) {
    			elem.addEventListener( type, handler, false );
    		} else if( document.attachEvent ) {
    			var f = handler.call( elem );
    			elem.attachEvent( 'on'+type, f );
    		} else {
    			elem.'on'+type = handler;
    		}
    	},
    	removeEvent: function() {
    		if( document.removeEventListener ) {
    			elem.removeEventListener( type, handler, false );
    		} else if( document.detachEvent ) {
    			var f = handler.call( elem );
    			elem.detachEvent( 'on'+type, f );
    		} else {
    			elem.'on'+type = null;
    		}
    	},
    	getEvent: function( event ) {
    		return event ? event : window.event;
    	},
    	getTarget: function( event ) {
    		return event.target || event.srcElement;
    	},
    	stopPropagation: function( event ) {
    		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    	},
    	preventDefault: function( event ) {
    		event.preventDefault ? event.preventDefault() : event.returnValue = false;
    	}
    };
```

（写得相对比较简单，哈哈。后面还会谈很多和事件处理有关的知识，熟话说：温故而知新。这句话还是说得很有道理的。不管怎么样，follow my heart，只要问心无愧就好！）
