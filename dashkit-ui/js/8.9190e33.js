webpackJsonp([8,38,39,40],{BptB:function(e,n,o){e.exports={markdown:'<h1>Message</h1>\n<p>A message is displayed at top and center and will be dismissed automatically.</p>\n<div id="demos"></div>\n<h3>API</h3>\n<p>This components provides some static methods, with usage and arguments as following:</p>\n<ul>\n<li><code>message.success(content, [duration], onClose)</code></li>\n<li><code>message.error(content, [duration], onClose)</code></li>\n<li><code>message.info(content, [duration], onClose)</code></li>\n<li><code>message.warning(content, [duration], onClose)</code></li>\n<li><code>message.warn(content, [duration], onClose)</code> // alias of warning</li>\n<li><code>message.loading(content, [duration], onClose)</code></li>\n</ul>\n',demos:{basic:o("jt2I"),callback:o("vYRd"),duration:o("Tl6M")}}},Tl6M:function(e,n,o){e.exports={code:"import { Message, Button } from 'dashkit-ui';\n\nconst show = () => {\n  Message.show('Display a 10s time message', 10);\n};\n\nReactDOM.render(\n  <Button onClick={show}>Display a 10s time message</Button>,\n  mountNode\n);\n",meta:{order:1,title:{"zh-CN":"时间","en-US":"Duration"},subtitle:{"zh-CN":"<p>可以设置<code>duration</code>控制展示的时间。</p>\n","en-US":"<p>Use <code>duration</code> to control display time.</p>\n"},__content:""},preview:function(){var e=o("GiK3"),n=(o("O27J"),o("qMEF")),s=function(){n.Message.show("Display a 10s time message",10)};return e.createElement(n.Button,{onClick:s},"Display a 10s time message")}}},jt2I:function(e,n,o){e.exports={code:"import { Message, Button } from 'dashkit-ui';\n\nconst show = () => {\n  Message.show('This is a message of show');\n};\n\nconst success = () => {\n  Message.success('This is a message of success');\n};\n\nconst error = () => {\n  Message.error('This is a message of error');\n};\n\nconst info = () => {\n  Message.info('This is a message of info');\n};\n\nconst warning = () => {\n  Message.warning('This is message of warning');\n};\n\nReactDOM.render(\n  <div className=\"message-wrapper\">\n    <Button onClick={show}>Show</Button>\n    <Button onClick={success}>Success</Button>\n    <Button onClick={error}>Error</Button>\n    <Button onClick={info}>Info</Button>\n    <Button onClick={warning}>Warning</Button>\n  </div>,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>使用<code>show</code>、<code>success</code>、<code>error</code>、<code>info</code>、<code>warning</code>来展示不同的消息。</p>\n","en-US":"<p>Use <code>show</code>, <code>success</code>, <code>error</code>, <code>info</code>, <code>warning</code> to show different messages.</p>\n"},__content:""},preview:function(){var e=o("GiK3"),n=(o("O27J"),o("qMEF")),s=function(){n.Message.show("This is a message of show")},t=function(){n.Message.success("This is a message of success")},c=function(){n.Message.error("This is a message of error")},a=function(){n.Message.info("This is a message of info")},i=function(){n.Message.warning("This is message of warning")};return e.createElement("div",{className:"message-wrapper"},e.createElement(n.Button,{onClick:s},"Show"),e.createElement(n.Button,{onClick:t},"Success"),e.createElement(n.Button,{onClick:c},"Error"),e.createElement(n.Button,{onClick:a},"Info"),e.createElement(n.Button,{onClick:i},"Warning"))}}},vYRd:function(e,n,o){e.exports={code:"import { Message, Button } from 'dashkit-ui';\n\nconst show = () => {\n  Message.show('Setup a callback function', 1.5, () => Message.success('Callback successfully!'))\n};\n\nReactDOM.render(\n  <Button onClick={show}>Set up a callback</Button>,\n  mountNode\n);\n",meta:{order:2,title:{"zh-CN":"回调","en-US":"Callback"},subtitle:{"zh-CN":"<p>可以设置<code>onClose</code>回调函数。</p>\n","en-US":"<p>Use <code>onClose</code> to set callback Function.</p>\n"},__content:""},preview:function(){var e=o("GiK3"),n=(o("O27J"),o("qMEF")),s=function(){n.Message.show("Setup a callback function",1.5,function(){return n.Message.success("Callback successfully!")})};return e.createElement(n.Button,{onClick:s},"Set up a callback")}}}});
//# sourceMappingURL=8.9190e33.js.map