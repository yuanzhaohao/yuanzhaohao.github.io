webpackJsonp([31],{C7j1:function(e,n,t){e.exports={code:'import { Icon } from \'dashkit-ui\';\n\nclass IconList extends React.Component {\n  render() {\n    const dataSource = Icon.types[\'media-controls\'];\n\n    return (\n      <div className="icon-list clearfix">\n        {dataSource.map((name, key) =>\n          <div className="icon-item-wrapper" key={key}>\n            <div className="icon-item">\n              <Icon type={name} />\n              <span>{name}</span>\n            </div>\n          </div>\n        )}\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<IconList />, mountNode);\n',meta:{order:2,title:{"zh-CN":"媒体","en-US":"Media"},subtitle:{"zh-CN":"<p>媒体控制。</p>\n","en-US":"<p>Media controls.</p>\n"},__content:""},preview:function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function r(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var o=t("GiK3"),a=(t("O27J"),function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}()),i=t("qMEF"),c=function(t){function c(){return e(this,c),n(this,(c.__proto__||Object.getPrototypeOf(c)).apply(this,arguments))}return r(c,t),a(c,[{key:"render",value:function(){var e=i.Icon.types["media-controls"];return o.createElement("div",{className:"icon-list clearfix"},e.map(function(e,n){return o.createElement("div",{className:"icon-item-wrapper",key:n},o.createElement("div",{className:"icon-item"},o.createElement(i.Icon,{type:e}),o.createElement("span",null,e)))}))}}]),c}(o.Component);return o.createElement(c,null)}}}});
//# sourceMappingURL=31.4c119f4.js.map