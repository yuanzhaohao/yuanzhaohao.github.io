(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{121:function(n,t){n.exports={markdown:"\x3c!--\ndate: 2013-09-17\ntitle: Javascript加号操作符\ndescription: 昨天遇到加号操作符的问题，今天恰好在**米憎**的博客里面看到一篇关于加号操作符的文章，所以就想写一篇文章总结一下；\n--\x3e\n<h2>Javascript 加号操作符</h2>\n<blockquote>\n<p>昨天遇到加号操作符的问题，今天恰好在<strong>米憎</strong>的博客里面看到一篇关于加号操作符的文章，所以就想写一篇文章总结一下；</p>\n</blockquote>\n<p>在开始之前，不妨先思考一个小问题：<code>&quot;Why am I a &quot;+ typeof + &quot;&quot;;</code></p>\n<p>上面的结果会返回什么呢？</p>\n<p>我们很多同学（包括我自己）在看到这小段代码的时候，估计都会微微一笑：不就是字符串拼接嘛。</p>\n<p>但是看完代码之后，不少人又会疑惑，到底这段小代码会输出什么结果呢？</p>\n<p>我们先来分解一下这段代码：<code>&quot;Why am I a &quot;+ ( typeof + ( &quot;&quot; ) );</code></p>\n<p>由上面可以知道，最关键的是<code>typeof + ( &quot;&quot; )</code></p>\n<p>其实上面的代码就相当于：<code>typeof Number( &quot;&quot; )</code>。<code>Number( &quot;&quot; )</code>的返回结果是 0（Number()函数操作，大家不妨百度一下）</p>\n<p>大家看到这里，大概已经知道结果会返回什么了吧？没错，就是<strong>Why am I a number</strong>;</p>\n<p>很神奇吧！加号操作符更神奇的事情，还在后面呢？（又快到两点了，为了避免今天完成不了工作，我还是先把工作做完吧！）</p>\n<p>（都已经九点了，把博客写完回去小屋洗澡睡觉！）</p>\n<p>这里说说加号操作符的使用：</p>\n<p>1、如果都是数值，那么就会执行常规的加法操作。</p>\n<p>如果有一个是 NaN，那么就会返回 NaN；</p>\n<p>如果是 Infinity 加 Infinity，则会返回 Infinity；</p>\n<p>如果是-Infinity 加-Infinity，则会返回-Infinity；</p>\n<p>如果是-Infinity 加 Infinity，则会返回 NaN；</p>\n<p>2、如果操作数里面有字符串，那就有意思了；</p>\n<pre><code>console.log( 'test' + 1 + 2 );\nconsole.log( 1 + 2 + 'test' );\nconsole.log( [ 'test', 'test2' ] + 'test3' );\nconsole.log( {\n\ttest: 'test2',\n\ttest2: 'test'\n} + 'test' );\nconsole.log( 1 + { test: 1 } );\nconsole.log( { tt: 1 } + 1 );\n</code></pre>\n<p>上面的结果分别输出：'test12'、'3test'、&quot;test,test2test3&quot;、&quot;[object Object]test&quot;、 &quot;1[object Object]&quot;、1（真是神奇的事情）</p>\n<p>由上面的结果，我们大概可以总结出一些结论：使用数组的时候，数组会调用<code>toString()</code>方法，把数组转换成字符串，最后再拼接;当使用对象的时候，最后一个例子的结果，真的不太理解，倒数第二个，也是调用了对象的<code>toString()</code>方法转换成字符串。</p>\n<p>原来，再看回米憎前辈的那篇博客，上面好像也出现最后那个例子的情况，原来是 Chrome 控制台的原因；上面最后一个例子就相当于<code>{ tt: 1 }: + 1</code>，所以最后才返回 1；真正的结果应该是'[object Object]1'</p>\n<p>总结出以下一些结论：</p>\n<ul>\n<li>如果加号操作符两侧都是数值，那么就是普通的加法运算；</li>\n<li>如果两边有一处是字符串或者数组或者对象，那么就是把这些变量转换成字符串，再进行拼接；</li>\n</ul>\n<p>回到头部的那个&quot;Why am I a number&quot;，对于<code>+ ( &quot;&quot; )</code>，其实实际上就是<code>Number( '' )</code>。</p>\n<p>关于这个 Number()方法的使用，我在另外一篇博客里面也有介绍，博客链接：<a href=\"http://yzhblog.ap01.aws.af.cm/?p=102\">http://yzhblog.ap01.aws.af.cm/?p=102</a>。</p>\n<p>这里粘贴过来哈：</p>\n<ul>\n<li>如果是 Boolean 类型，true、false 会分别转换成 1 和 0；</li>\n<li>如果是数字，只是简单的传入和返回；</li>\n<li>如果是 null，就返回 0；</li>\n<li>如果是 undefined，就返回 NaN；</li>\n<li>如果空字符串，就返回 0；如果是非空字符串，处理情况比较复杂，</li>\n</ul>\n<p>1、如果字符串中只包含数字，那么就会转换成 10 进制数；</p>\n<p>2、如果有小数点，就会转换成浮点数；</p>\n<p>3、如果包含 16 进制格式，就会将其转换成相同大小的 10 进制数；</p>\n<p>4、如果是空字符串，就会转换成 0；</p>\n<p>5、如果包含上述字符以外的字符，就会转换成 NaN；</p>\n<ul>\n<li>如果是对象，一般情况下，都是返回 NaN；</li>\n</ul>\n<p>（终于写完了，都 10 点了，哎呀，赶紧回去了！+_+）</p>\n"}}}]);