webpackJsonp([55],{sA6h:function(e,t,n){e.exports={code:'import { Alert } from \'dashkit-ui\';\n\nconst onClose = function (e) {\n  window.alert(\'I was closed.\');\n};\n\nReactDOM.render(\n  <div className="alert-wrapper">\n    <Alert type="info" closable>A simple info alert with close button!</Alert>\n    <Alert type="success" closable onClose={onClose}>\n      <h4>Well done!</h4>\n      Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.\n      <hr />\n      Whenever you need to, be sure to use margin utilities to keep things nice and tidy.\n    </Alert>\n  </div>,\n  mountNode\n);\n',meta:{order:1,title:{"zh-CN":"关闭","en-US":"Closable"},subtitle:{"zh-CN":"<p>可关闭，可以用<code>closable</code>控制展示关闭按钮。</p>\n","en-US":"<p>Can be closable. Use <code>Closable</code> to close the Alert.</p>\n"},__content:""},preview:function(){var e=n("GiK3"),t=(n("O27J"),n("qMEF")),o=function(e){window.alert("I was closed.")};return e.createElement("div",{className:"alert-wrapper"},e.createElement(t.Alert,{type:"info",closable:!0},"A simple info alert with close button!"),e.createElement(t.Alert,{type:"success",closable:!0,onClose:o},e.createElement("h4",null,"Well done!"),"Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.",e.createElement("hr",null),"Whenever you need to, be sure to use margin utilities to keep things nice and tidy."))}}}});
//# sourceMappingURL=55.4ffe1f6.js.map