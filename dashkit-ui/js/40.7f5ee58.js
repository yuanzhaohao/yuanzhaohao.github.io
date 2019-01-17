webpackJsonp([40],{jt2I:function(e,n,s){e.exports={code:"import { Message, Button } from 'dashkit-ui';\n\nconst show = () => {\n  Message.show('This is a message of show');\n};\n\nconst success = () => {\n  Message.success('This is a message of success');\n};\n\nconst error = () => {\n  Message.error('This is a message of error');\n};\n\nconst info = () => {\n  Message.info('This is a message of info');\n};\n\nconst warning = () => {\n  Message.warning('This is message of warning');\n};\n\nReactDOM.render(\n  <div className=\"message-wrapper\">\n    <Button onClick={show}>Show</Button>\n    <Button onClick={success}>Success</Button>\n    <Button onClick={error}>Error</Button>\n    <Button onClick={info}>Info</Button>\n    <Button onClick={warning}>Warning</Button>\n  </div>,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>使用<code>show</code>、<code>success</code>、<code>error</code>、<code>info</code>、<code>warning</code>来展示不同的消息。</p>\n","en-US":"<p>Use <code>show</code>, <code>success</code>, <code>error</code>, <code>info</code>, <code>warning</code> to show different messages.</p>\n"},__content:""},preview:function(){var e=s("GiK3"),n=(s("O27J"),s("qMEF")),o=function(){n.Message.show("This is a message of show")},c=function(){n.Message.success("This is a message of success")},t=function(){n.Message.error("This is a message of error")},i=function(){n.Message.info("This is a message of info")},r=function(){n.Message.warning("This is message of warning")};return e.createElement("div",{className:"message-wrapper"},e.createElement(n.Button,{onClick:o},"Show"),e.createElement(n.Button,{onClick:c},"Success"),e.createElement(n.Button,{onClick:t},"Error"),e.createElement(n.Button,{onClick:i},"Info"),e.createElement(n.Button,{onClick:r},"Warning"))}}}});
//# sourceMappingURL=40.7f5ee58.js.map