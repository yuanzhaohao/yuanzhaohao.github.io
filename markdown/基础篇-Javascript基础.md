> 都快四点半了。拖延症又发作了，55555。我觉得，不管结局怎样，认真去准备，即使失败了，也不会后悔。伟哥拿到了令人羡慕的东西了，在羡慕之余，我也相信，我也会拥有属于自己的东西；

> 同时，我希望自己在写这篇博客的时候，能认真、细致、深入地去了解Javascript这一门语言的精髓。任何时候，只有自己心里静下来的时候，才能够细致地进行思考。在写这篇博客的时候，我也希望自己能真正地让自己的心静下来，不得不说，自己的心最近真有点浮躁！

## Javascript的组成 ##
一个完整的Javascript应该由以下三部分组成：

- 核心（ECMAScript）
- 文档对象模型（DOM）
- 浏览器对象对象模型（BOM）

#### ECMAScript ####
ECMAScript是通过ECMA-262标准化的脚本程序设计语言。ECMA-262定义的只是这门语言的基础，而在此基础上可以构建更完善的脚本语言。另外，值得一提的是，Web浏览器只是ECMAScript实现的**宿主环境**之一。

ECMAScript至今已经出现6个版本了，今年5月份吧，ECMAScript已经出来第六版了。（其实本人对ECMAScript6规法也不是很了解，因为刚出来没多久，有空再去看看浏览器对它的支持吧！）

#### DOM ####
文档对象模型是针对XML但经过扩展用于HTML的API。DOM把整个页面映射成一个多层节点结构。

    <html>
		<head>
			<title>简单的页面</title>
		</head>
		<body>
			<p>Helloworld!</p>
		</body>
	</html>

在DOM中，上面的html代码会被映射成一个分层节点图。

图片2：

所谓DOM（Document Object Model）操作，我觉得就是指通过DOM这套API，把文档节点转换成对象；

值得注意的是，并不是只针对Javascript，很多其它语言也都可以实现DOM；

#### BOM ####
支持可以访问和操作浏览器窗口的浏览器对象模型，提供与浏览器交互的方法和接口；

## ECMAScript语法基础 ##

#### 数据类型 ####
ECMAScript有5种简单数据类型（Undefined、Null、Boolean、Number、String）和1种复杂数据类型（Object）

由于Javascript是松散类型的，因此我们在使用这些数据类型的时候，有必要对这些数据类型进行判断。在判断数据类型的时候，undefined、number、String，我都会用typeof进行判断：

    if( typeof n1 === 'string' )

还有function，我也是用typeof来判断，对于引用类型，比如Object、Array等，我一般会用instanceof来判断。

在判断函数参数的时候，这样的语法必须要杜绝

    if( n1 )

	or like this

	if( n1 != null )

	and so on

上面的例子非常不好（**我认为学习编程一段时间后，所追求的就不能是实现功能那么简单，更多的要学会如何去优化自己的代码；这里就再扯一句我自己的观点：要学好一门语言，关键在于两点：基础和思想；把基础学好自然不用说，把开发思想学好，能让我们在项目开发中，处于一个大局观，针对不同的项目，可以使用不同的开发思想。**）

#### Number篇 ####

说到number类型，我第一个想到的是一个很特殊的NaN，也就是Not a Number。

NaN是一个很特殊的数值，是ES1引入的一个变量，是全局作用域的属性，在高级浏览器中是只读属性，最重要的是它不和任何值相等，包括它自己本身；

那么如何来判断一个值是否为NaN呢？下面的函数可以解决这个问题

    function isNaNFn( num ) {
		return typeof num === 'number' && isNaN( num );
	}

**数值转换：**

有三个方法可以将非数值转换成数值：Number()、parseInt()、parseFloat()

简单说说Number()和parseInt()这两个函数的区别吧。前者只接收一个参数，而后者接收两个参数，其中第二个参数为进制数。

两者最大的不同在于处理字符串：Number()转换空字符串的时候，会返回0；而parseInt()为NaN。

当字符串不为空的时候，Number()会做很多的判断：

1、如果字符串中只包含数字，那么就会转换成10进制数；

2、如果有小数点，就会转换成浮点数；

3、如果包含16进制格式，就会将其转换成相同大小的10进制数；

4、如果是空字符串，就会转换成0；

5、如果包含上述字符以外的字符，就会转换成NaN；

而parseInt就不一样，它在转换字符串的时候，更多的是看该字符串是否符合数值模式。它会忽略字符串前面的空格，直到找到第一个非空字符，否则就会返回NaN（这也是为什么parseInt处理空字符串的时候会返回NaN的原因所在）如果遇到了非数字字符，就会停止解析后面的字符，比如处理1234yzh，就会返回1234；

因此，在处理整数的时候，我觉得还是使用parseInt()比较合理;

parseFloat是返回浮点数，处理规则和parseInt差不多；

#### String篇 ####
字符串应该在任何一门语言中，都占用了很高的使用率，JS在操作字符串的时候，给我们提供了很多非常有用的函数。

首先来讲讲字符串的创建，有两种方式：第一使用String引用类型，第二种就是直接赋值；

    var s1 = new String( 'test' ),
		s2 = 'test';
	console.log( s1 === s2 );

大家猜猜，以上的代码执行之后，会输出什么？

答案是**false**

这是为什么呢？其实道理很简单，因为s1和s2的数据类型不一样，如果执行的是`s1 == s2`，就会返回`true`，因为在执行`s1==s2`的时候，会发生类型转换。

大家不妨用typeof操作符来执行一下`typeof s1`和`typeof s2`，那么答案就很容易明白了！

**下面说说字符串常用的函数**

**访问字符串中特定字符的方法：**charAt()和charCodeAt()，两者都接收一个数字参数，也就是基于0的字符位置;
	
	var str = 'Hello world'; 
    console.log( str.charAt( 1 ) );

上面的结果返回'e'

	var str = 'Hello world'; 
    console.log( str.charCodeAt( 1 ) );

上面的结果返回：101

**利用charCodeAt()编写的获取字符串字节的函数：**

	function getStrBytes( str ) {
		if( typeof str === 'string' ) {
			var len = i = str.length;
	
			while( i-- ) {
				if( str.charCodeAt( i ) > 255 ) {
					len++;
				}
			}
			return len;
		}
		return 0;
	}

调用方法：getStrBytes( '噬魂123' );

**字符串的拼接：**

**加（+）和加等于（+=）操作符**

    str += 'one' + 'two';

上面的代码运行的时候，会经过**4**个步骤：

1、在内存中创建一个临时字符串；

2、拼接后的字符串“onetwo”被赋值给该临时字符串；

3、临时字符串与当前str拼接；

4、最后把结果赋值给str；

为避免临时字符串的产生，可以用下面的方式实现同样的效果：

    str = str + 'one' + 'two';

**使用函数concat()**

    var str = 'hello '.concat( 'world!' );

**使用数组（对于字节很长的字符串，是一个比较好的方法！）**

	var str = ['hello', ' world!'].join('');

**三种方式的比较**

这里使用了firejspt.js，这个小工具还不错，，下载地址：[http://code.google.com/p/firejspt/downloads/list](http://code.google.com/p/firejspt/downloads/list)

    function test2() {
		var newStr = '',
			i = 1350000;
	
		while( i-- ) {
			newStr += 'hello' + ' world!';
		}
	}
	
	function test1() {
		var newStr = '',
			arr = [],
			i = 1350000;
	
		while( i-- ) {
			arr.push( 'hello', ' world!' );
		}
		newStr = arr.join( '' );
	}
	
	function test3() {
		var newStr = '',
			i = 1350000;
	
		while( i-- ) {
			newStr.concat( 'hello', ' world!' );
		}
	}
	
	jspt.test( function() {
		test1();
	});
	
	jspt.test( function() {
		test2();
	});
	
	jspt.test( function() {
		test3();
	});

执行结果：

在ie和chrome下面测试了一下，竟然发现效率最高的是加（+）操作符，看来书上的知识不可尽信，关键还是自己动手去实践。所以还是那句话：**知识是死的，人是活的**，多动手，比死看书有用多了，尽管书本知识也很重要；

这里有一篇比较好的文章，是外国人写的（ps：不得不说，其实很多时候，还是老外写的东西比较给力！）[这是链接](http://dev.opera.com/articles/view/efficient-javascript/)

**截取字符串：**

js中有三个截取字符串的方法：substring()、substr()、以及 slice()

三者的联系和区别

当三者都是接受一个参数，并且这个参数为正整数的时候，其实三者是没有啥区别的；

	var str = 'hello world';
    console.log( str.substring( 3 ) );
	console.log( str.substr( 3 ) );
	console.log( str.slice( 3 ) );

三者的执行结果都是：'llo world'

当三者都是接受一个参数，并且这个参数为负整数的时候，substring会把这个负数转换成0，就相当于substring(0)；而substr和slice都是从字符串逆序截取字符串

    var str = 'hello world';
    console.log( str.substring( 3 ) );
	console.log( str.substr( 3 ) );
	console.log( str.slice( 3 ) );

上面执行的结果分别为：'hello world'、'rld'、'rld'

当三者接收两个参数，并且两个参数都是正数的时候，substring和slice的返回结果都一样，而substr则不一样。三者的第一个参数都是指位置，substr的第二个参数表示长度，而substring和slice都是表示位置；

    var str = 'hello world';
    console.log( str.substring( 3, 7 ) );
	console.log( str.substr( 3, 7 ) );
	console.log( str.slice( 3, 7 ) );

上面执行的结果分别为：'lo w'、'lo worl'、'lo w'

当三者接收两个参数，并且两个参数都是负数的时候，三者的结果都不一样，substring会把负参数转换成0，而substr也会转换成0，所以substr返回的是空字符串；

    var str = 'hello world';
    console.log( str.substring( 3, -4 ) );
	console.log( str.substr( 3, -4 ) );
	console.log( str.slice( 3, -4 ) );

上面执行的结果分别为：'hel'、''、'lo w'

#### Array类型 ####
数组在js中应用也非常广泛，总的来说，因为js中没有栈、队列这样的数据结构，很多时候，我们都是用数组来模拟这样的数据结构；

**模拟栈方法：**

    var colors = [];
	// 入栈
	colors.push( 'red', 'green' );
	// 出栈
	colors.pop();

**模拟队列方法：**

	var colors = [];
	// 入队
	colors.push( 'red', 'green' );
	// 出队
	colors.shift();

数组中，我认为最强悍的函数就是：**splice()**。它可以删除、插入、替换数组元素；

具体用法：splice()至少接收**2**个参数，第一个参数代表起始位置，第二个参数代表删除的项数；举个例子

    var colors = ['red', 'green', 'yellow'];
	console.log( colors.splice( 0, 1 ) );

上面的代码会返回：["green", "yellow"]

上面的例子是删除的用法，如果要删除第二项，那就是`colors.splice( 1, 1 )`

其实这个函数最给力的是它可以**插入和替换**数组元素：

	var colors = ['red', 'green', 'yellow'];
	console.log( colors.splice( 0, 0, 'black' ) );

上面的代码会在red元素后面插入black，返回的结果是：["black", "red", "green", "yellow"]

	var colors = ['red', 'green', 'yellow'];
	console.log( colors.splice( 0, 1, 'black' ) );

上面的代码会先删除red元素，再插入black，返回的结果是：["black", "green", "yellow"]；

举一个比较有趣的例子：**数组去重问题**

    Array.prototype.delRepeat = function() {
		var i = this.length,
			obj = {};
	
		while( i-- ) {
			if( !obj[ this[i] ] ) {
				obj[ this[i] ] = true;
			} else {
				this.splice( i, 1 );
			}
		}
	
		return this;
	}

上面是在Array的原型链添加delRepeat()方法，调用方法是：arr.delRepeat();

#### Function类型（函数） ####

**理解参数：**在ECMAScript函数里面，即使该函数在定义的时候只接受两个参数，但是调用这个函数的时候，未必要传两个参数，可以一个、两个、三个...

之所以会这样，是因为ECMAScript里面的参数是由内部的一个数组来表示的，也就是arguments；

    function add() {
		return arguments[0] + arguments[1];
	}
	console.log( add( 10, 20 ) ); 

上面会输出：30；

有一点值得注意，arguments的值永远会与对应命名的参数的值保持同步。arguments的长度由传入的参数的个数所决定，没有传递值的参数将会自动被赋值为undefined；

    function add( num1, num2 ) {
		arguments[1] = 10;
		return arguments[0] + num2;
	}
	console.log( add( 10, 20 ) );

上面会输出：20；

另外有一点需要特别注意，造成上面的现象出现，并不是因为num2和arguments[1]公用相同的内存空间，相反，**他们的内存空间是独立的**。

还有就是arguments有一个属性：callee，它指向拥有该arguments对象的函数。

**没有函数重载：**
如果定义了两个重名的函数，那么后面定义的函数将会覆盖前面定义的函数；对于**没有函数重载**的理解，我觉得可以把函数名想象成指针，这样理解起来就容易许多了。

**关于内部对象this：**
this对象所引用的是函数执行时的执行环境吧。

要理解this对象，首先要理解作用域链的相关知识。

实际上，每一个JS函数都是一个对象，更确切地说，是Function对象的一个实例。Function对象里面有一个Scope的内部属性，这个属性包含的就是函数的作用域链。

每一个函数被创建的时候，它的作用域链就会填充相关的数据。举个例子（假设它是全局环境下定义的函数）

    function sum( num1, num2 ) {
		return num1 + num2;
	}

上面的代码中，当sum函数被创建的时候，它的scope属性里面，也就是它的作用域链里面会填入一个全局对象。

当调用这个函数的时候，`var s = sum( 5, 10 );`，就会产生一个**运行期上下文**（函数每次执行，都会产生对应的运行期上下文，函数执行完毕后，运行期上下文就会被销毁。），运行期上下文定义了函数调用的执行环境。当运行期上下文被创建之后，就会复制该函数的scope属性中的对象到自己的作用域中，同时生成一个**活动对象**填入自己的作用域中。也就是说，此时该运行期上下文的作用链里面有两个对象，一个是全局对象，一个活动对象。

（图片）

值得一提的是，全局对象的访问会排在活动对象的前面，假如要访问某个变量，那么就会先查看活动对象，然后再查看全局对象，因此标识符的优化，在js优化中也是重要的一环。

说到作用域了，也不得不提一下**闭包**，闭包为何物呢？很多同学一直都弄不懂这个概念。（其实，我也是花了很大的经历，才稍微有点点弄懂）。

**闭包：**闭包其实也是函数，只不过闭包比较特殊而已。它是**有能力访问其他函数作用域的函数**。举个例子

    function sum( num1, num2 ) {
		return function() {
			return num1 + num2;
		}
	}
	console.log( sum( 5, 10 )() );

从上面的代码来看，sum函数返回的匿名函数就是一个闭包，为什么说它是闭包呢？原因很简单，因为它访问了num1和num2了。

那么这个闭包的作用域是怎么样的呢？

由上个例子可以知道，创建这个闭包之后，该闭包的作用域链就会填入两个对象：全局对象和sum函数执行时的活动对象。当执行这个闭包的时候，闭包本身也是函数，因此它也会创建一个运行期上下文，同时把闭包的作用域链的全局对象和sum函数的活动对象填入到自己的作用域链中，同时会生成自己的活动对象，填入到作用域链的最顶端。
关系如下图所示：

（图片）

这里又提到了**匿名函数**，这里也扯一下匿名函数吧。

	setTimeout( function() {
		//some code
	}, 123)
上面的setTimeout里面的函数，就是一个匿名函数哈。

再举个例子，我们经常用到的jQuery，第一句话就是`(function( window, undefined ) {})(window)`，这也是一个匿名函数。作用大概是在页面下载代码的过程中就把代码加到执行环境中。

说起匿名函数，有两点需要记住，第一，它没有名字（呵呵），第二，它的作用域是全局作用域。

刚刚上网找了一篇文章：[链接](http://dancewithnet.com/2008/05/07/javascript-anonymous-function/)。作者绝对是大牛级别的，里面详细介绍了匿名函数。

（每逢佳节倍思亲，今天是中秋节，大概长这么大第一次自己一个人过中秋节呀，55555...说多了都是泪，继续把这篇博客写完吧！）

昨天晚上在网上看到了一篇博客，里面提到一道有趣的题目

    function test() {
         this.name = 'taobao';
         this.waitMes = function (){
         //隔5秒钟执行this.name
         }
	}

上面的题目要求是每隔5秒钟执行`this.name`，很明显是要用到`setInterval`函数。这里也得分一些情况吧，刚看到代码的时候，我还以为有很多面向对象的东西，其实如果没有太多要求，直接执行就好，因为test函数是在全局作用域下的，所以就不用考虑`setInterval`的问题了；

    function test(){
		this.name = 'taobao';
		this.waitMes = function (){
			setInterval( function() {
				console.log( this.name );
			}, 2000);
		}
		this.waitMes();
	}
	test();

或者，像这样

	(function test(){
		this.name = 'taobao';
		this.waitMes = function (){
			setInterval( function() {
				console.log( this.name );
			}, 2000);
		}
		this.waitMes();
	})();

个人更推荐上面的第二种。上面的第二种是把函数声明转换成函数表达式直接执行的。

看来苏洋前辈说得对，对于很多js的细节，我并没有注意到，刚刚看了一下函数声明和函数表示表达式的区别，这里也扯一下；

函数声明是类似于下面的代码：

	console.log( sum( 10, 10 ) );
    function sum( num1, num2 ) {
		return num1 + num2;
	}

而函数表达式类似于下面这样的：

	console.log( sum( 10, 10 ) );
    var sum = function() {
		return num1 + num2;
	}

看到上面两段代码，很多人（包括今天以前的我）都以为输出的结果是一样的，但是事实上，第二段代码是会报错的，因为sum函数在执行`sum( 10, 10 )`的时候还没有初始化，这就是函数声明和函数表达式的最大区别：**Javascript引擎会把函数声明提前执行，而函数表达式要等到Javascript引擎读取到那段代码之后才执行**；

类似于这样的写法，就是把函数声明转换成函数表达式：
	
	(function() {
		// some code...
	})();

上面的代码其实最大的好处有两个，一个是立刻执行，另外一个就是拥有了**块级作用域**，外部是不能访问到上面函数内部的代码。这又令我想起jQuery的开头和结尾的代码`(function( window, undefined ) { })( window )`


当使用`new`操作符实例化出一个实例的时候，情况有些特殊，因为`new`操作符会把this指向实例本身，而前文也提到`setInterval`的作用域是全局作用域的，所以它的this指向的是window对象，因此在`waitMes()`函数里面要把`this`对象赋值给`waitMes()`函数的局部变量。

	function Test() {
		this.name = 'Yzh';
		this.waitMes = function() {
			var self = this;
			setInterval( function() {
				console.log( self.name );
			}, 5000);
		};
	}
	var t = new Test();
	t.waitMes();




说到闭包，我们每一个初学者都会遇到下标的问题，在这里我花了一些时间去总结了一下解决的方法。

**闭包下标问题**：请看下面的代码

    function createF() {
		var result = [];
	
		for( var i = 0; i < 10; i++ ) {
			result[i] = function() {
				console.log( i );
			}
		}
		return result;
	}
	var r = createF();	
	r[1]();

执行result数组里面的每一个子函数，控制台打印出来都是10。首先来分析一下造成上面那种现象的原因吧。首先，result数组里面的每一个函数都是闭包，这是毋庸置疑的，所以这些函数保存了`creatF()`函数的活动对象，而活动对象里面的`i`变量最终的值是10，所以每一个result子函数的结果都是10；

那么有什么方法解决呢？本人总结了一些小方法（纯个人兴趣，哈哈）

1、在每一个result子函数里面使用局部变量把i“存起来”；

	function createF() {
		var result = [];
	
		for( var i = 0; i < 10; i++ ) {
			result[i] = function() {
				var r = i;
				console.log( r );
			}
		}
		return result;
	}

2、加一层闭包，i以函数参数形式传递给内层函数函数；

    function createF() {
		var result = [];
	
		for( var i = 0; i < 10; i++ ) {
			result[i] = function( num ) {
				return function() {
					console.log( num );	
				}
			}( i );
		}
		return result;
	}

3、使用Function对象实例化出一个函数；

	function createF() {
		var result = [];
	
		for( var i = 0; i < 10; i++ ) {
			result[i] = new Function("console.log(" + i + ");");
		}
		return result;
	}

目前只发现以上三种写法，至于其他的，其实就是上面三种演变过来的。

（下面的内容请看《基础篇-Javascript面向对象》）

