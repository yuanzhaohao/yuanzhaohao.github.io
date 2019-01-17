webpackJsonp([33],{svTK:function(e,t,n){e.exports={code:'import { Radio, Button } from \'dashkit-ui\';\n\nclass App extends React.Component {\n  state = {\n    disabled: true,\n  }\n\n  toggleDisabled = () => {\n    this.setState({\n      disabled: !this.state.disabled,\n    });\n  }\n\n  render() {\n    const { disabled } = this.state;\n    return (\n      <div>\n        <div className="checkbox-list">\n          <Radio disabled={disabled}>Disabled 1</Radio>\n          <Radio defaultChecked disabled={disabled}>Disabled 2</Radio>\n        </div>\n        <div style={{ marginTop: 20 }}>\n          <Button type="primary" onClick={this.toggleDisabled} size="small">\n            Toggle disabled\n          </Button>\n        </div>\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<App />, mountNode);\n',meta:{order:2,title:{"zh-CN":"禁用","en-US":"Disabled"},subtitle:{"zh-CN":"<p>使用<code>disabled</code>禁用radio.</p>\n","en-US":"<p>Use <code>disabled</code> to disable Radio.</p>\n"},__content:""},preview:function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n("GiK3"),o=(n("O27J"),function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}()),r=n("qMEF"),l=function(n){function l(){var n,i,a,o;e(this,l);for(var r=arguments.length,d=Array(r),s=0;s<r;s++)d[s]=arguments[s];return i=a=t(this,(n=l.__proto__||Object.getPrototypeOf(l)).call.apply(n,[this].concat(d))),a.state={disabled:!0},a.toggleDisabled=function(){a.setState({disabled:!a.state.disabled})},o=i,t(a,o)}return i(l,n),o(l,[{key:"render",value:function(){var e=this.state.disabled;return a.createElement("div",null,a.createElement("div",{className:"checkbox-list"},a.createElement(r.Radio,{disabled:e},"Disabled 1"),a.createElement(r.Radio,{defaultChecked:!0,disabled:e},"Disabled 2")),a.createElement("div",{style:{marginTop:20}},a.createElement(r.Button,{type:"primary",onClick:this.toggleDisabled,size:"small"},"Toggle disabled")))}}]),l}(a.Component);return a.createElement(l,null)}}}});
//# sourceMappingURL=33.523fc66.js.map