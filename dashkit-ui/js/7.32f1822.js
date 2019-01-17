webpackJsonp([7,31,32,33],{"845I":function(e,t,n){e.exports={code:"import { Radio } from 'dashkit-ui';\n\nfunction onChange(e) {\n  console.log(`change to ${e.target.checked}`)\n}\n\nReactDOM.render(\n  <Radio defaultChecked={false} onChange={onChange}>Option</Radio>,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本用法，可以用<code>defaultChecked</code>来定义radio默认的值。</p>\n","en-US":"<p>Use <code>defaultChecked</code> to define the value of checkbox.</p>\n"},__content:""},preview:function(){function e(e){console.log("change to "+e.target.checked)}var t=n("GiK3"),o=(n("O27J"),n("qMEF"));return t.createElement(o.Radio,{defaultChecked:!1,onChange:e},"Option")}}},Edev:function(e,t,n){e.exports={markdown:'<h1>Radio</h1>\n<p>A group of options for multiple choices.</p>\n<div id="demos"></div>\n<h2>Radio</h2>\n<h3>Radio</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>style</td>\n<td>style of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>disabled</td>\n<td>disable the radio</td>\n<td>boolean</td>\n<td>false</td>\n</tr>\n<tr>\n<td>checked</td>\n<td>value of radio</td>\n<td>boolean</td>\n<td>-</td>\n</tr>\n<tr>\n<td>defaultChecked</td>\n<td>default value</td>\n<td>boolean</td>\n<td>-</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>change</code> event handler</td>\n<td><code>(event: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void</code></td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<h3>Radio.Group</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>defaultValue</td>\n<td>Default selected value</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>min</td>\n<td>Minimum</td>\n<td>number</td>\n<td>-</td>\n</tr>\n<tr>\n<td>max</td>\n<td>Maximum</td>\n<td>number</td>\n<td>-</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>change</code> event handler</td>\n<td><code>(options: string[]) =&gt; void</code></td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n',demos:{basic:n("845I"),disabled:n("svTK"),group:n("p4Xn")}}},p4Xn:function(e,t,n){e.exports={code:"import { Radio } from 'dashkit-ui';\nconst RadioGroup = Radio.Group;\n\nclass App extends React.Component {\n  state = {\n    value: 1,\n  };\n\n  render() {\n    const { value } = this.state;\n    return (\n      <RadioGroup onChange={this.handleChange} value={value}>\n        <Radio value={1}>A</Radio>\n        <Radio value={2}>B</Radio>\n        <Radio value={3}>C</Radio>\n        <Radio value={4}>D</Radio>\n      </RadioGroup>\n    );\n  }\n\n  handleChange = (value) => {\n    console.log(`value`, value)\n    this.setState({ value });\n  }\n}\n\nReactDOM.render(<App />, mountNode);\n",meta:{order:3,title:{"zh-CN":"单选框组","en-US":"Radio Group"},subtitle:{"zh-CN":"<p>适用于在多个互斥的选项中选择的场景。</p>\n","en-US":"<p>Suitable for choosing from some mutually exclusive options.</p>\n"},__content:""},preview:function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n("GiK3"),d=(n("O27J"),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),r=n("qMEF"),i=r.Radio.Group,l=function(n){function l(){var n,o,a,d;e(this,l);for(var r=arguments.length,i=Array(r),c=0;c<r;c++)i[c]=arguments[c];return o=a=t(this,(n=l.__proto__||Object.getPrototypeOf(l)).call.apply(n,[this].concat(i))),a.state={value:1},a.handleChange=function(e){console.log("value",e),a.setState({value:e})},d=o,t(a,d)}return o(l,n),d(l,[{key:"render",value:function(){var e=this.state.value;return a.createElement(i,{onChange:this.handleChange,value:e},a.createElement(r.Radio,{value:1},"A"),a.createElement(r.Radio,{value:2},"B"),a.createElement(r.Radio,{value:3},"C"),a.createElement(r.Radio,{value:4},"D"))}}]),l}(a.Component);return a.createElement(l,null)}}},svTK:function(e,t,n){e.exports={code:'import { Radio, Button } from \'dashkit-ui\';\n\nclass App extends React.Component {\n  state = {\n    disabled: true,\n  }\n\n  toggleDisabled = () => {\n    this.setState({\n      disabled: !this.state.disabled,\n    });\n  }\n\n  render() {\n    const { disabled } = this.state;\n    return (\n      <div>\n        <div className="checkbox-list">\n          <Radio disabled={disabled}>Disabled 1</Radio>\n          <Radio defaultChecked disabled={disabled}>Disabled 2</Radio>\n        </div>\n        <div style={{ marginTop: 20 }}>\n          <Button type="primary" onClick={this.toggleDisabled} size="small">\n            Toggle disabled\n          </Button>\n        </div>\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<App />, mountNode);\n',meta:{order:2,title:{"zh-CN":"禁用","en-US":"Disabled"},subtitle:{"zh-CN":"<p>使用<code>disabled</code>禁用radio.</p>\n","en-US":"<p>Use <code>disabled</code> to disable Radio.</p>\n"},__content:""},preview:function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n("GiK3"),d=(n("O27J"),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),r=n("qMEF"),i=function(n){function i(){var n,o,a,d;e(this,i);for(var r=arguments.length,l=Array(r),c=0;c<r;c++)l[c]=arguments[c];return o=a=t(this,(n=i.__proto__||Object.getPrototypeOf(i)).call.apply(n,[this].concat(l))),a.state={disabled:!0},a.toggleDisabled=function(){a.setState({disabled:!a.state.disabled})},d=o,t(a,d)}return o(i,n),d(i,[{key:"render",value:function(){var e=this.state.disabled;return a.createElement("div",null,a.createElement("div",{className:"checkbox-list"},a.createElement(r.Radio,{disabled:e},"Disabled 1"),a.createElement(r.Radio,{defaultChecked:!0,disabled:e},"Disabled 2")),a.createElement("div",{style:{marginTop:20}},a.createElement(r.Button,{type:"primary",onClick:this.toggleDisabled,size:"small"},"Toggle disabled")))}}]),i}(a.Component);return a.createElement(i,null)}}}});
//# sourceMappingURL=7.32f1822.js.map