webpackJsonp([56],{vYRd:function(e,n,c){e.exports={code:"import { Message, Button } from 'dashkit-ui';\n\nconst show = () => {\n  Message.show('Setup a callback function', 1.5, () => Message.success('Callback successfully!'))\n};\n\nReactDOM.render(\n  <Button onClick={show}>Set up a callback</Button>,\n  mountNode\n);\n",meta:{order:2,title:{"zh-CN":"回调","en-US":"Callback"},subtitle:{"zh-CN":"<p>可以设置<code>onClose</code>回调函数。</p>\n","en-US":"<p>Use <code>onClose</code> to set callback Function.</p>\n"},__content:""},preview:function(){var e=c("GiK3"),n=(c("O27J"),c("qMEF")),t=function(){n.Message.show("Setup a callback function",1.5,function(){return n.Message.success("Callback successfully!")})};return e.createElement(n.Button,{onClick:t},"Set up a callback")}}}});
//# sourceMappingURL=56.99c924f.js.map