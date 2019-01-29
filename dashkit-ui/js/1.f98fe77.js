webpackJsonp([1,70,71,72,73,74,75],{"+M4p":function(e,t,n){e.exports={code:"import { Checkbox } from 'dashkit-ui';\n\nconst cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];\n\nclass App extends React.Component {\n  state = {\n    checkedCities: cityOptions.slice(0, 2),\n    indeterminate: true,\n    checkAll: false,\n  };\n\n  render() {\n    return (\n      <div>\n        <div className=\"checkbox-checkall\">\n          <Checkbox\n            indeterminate={this.state.indeterminate}\n            onChange={this.onCheckAllChange}\n            checked={this.state.checkAll}\n          >\n            Check all\n          </Checkbox>\n        </div>\n        <br />\n        <Checkbox.Group\n          options={cityOptions}\n          value={this.state.checkedCities}\n          onChange={this.onGroupChange}\n        >\n          {cityOptions.map((city, index) =>\n            <Checkbox key={index} value={city}>{city}</Checkbox>\n          )}\n        </Checkbox.Group>\n      </div>\n    );\n  }\n\n  onGroupChange = (value) => {\n    const checkedCount = value.length;\n    const citiesLength = cityOptions.length;\n    console.log(value);\n\n    this.setState({\n      checkedCities: value,\n      indeterminate: checkedCount > 0 && checkedCount < citiesLength,\n      checkAll: checkedCount === citiesLength,\n    });\n  }\n\n  onCheckAllChange = (e) => {\n    const { checked } = e.target;\n    const checkedCities = checked ? cityOptions : [];\n\n    this.setState({\n      checkedCities,\n      indeterminate: false,\n      checkAll: checked,\n    });\n  }\n}\n\nReactDOM.render(<App />, mountNode);\n",meta:{order:3,title:{"zh-CN":"多选框组","en-US":"Checkbox Group"},subtitle:{"zh-CN":"<p>适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</p>\n","en-US":"<p>It is used for multiple checkboxes which are bound in one group, and indicates whether one option is selected by checking if it is checked.</p>\n"},__content:""},preview:function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=n("GiK3"),i=(n("O27J"),function(){function e(e,t){for(var n=0;n<t.length;n++){var c=t[n];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}return function(t,n,c){return n&&e(t.prototype,n),c&&e(t,c),t}}()),a=n("qMEF"),r=["Shanghai","Beijing","Guangzhou","Shenzhen"],d=function(n){function d(){var n,c,o,i;e(this,d);for(var a=arguments.length,h=Array(a),l=0;l<a;l++)h[l]=arguments[l];return c=o=t(this,(n=d.__proto__||Object.getPrototypeOf(d)).call.apply(n,[this].concat(h))),o.state={checkedCities:r.slice(0,2),indeterminate:!0,checkAll:!1},o.onGroupChange=function(e){var t=e.length,n=r.length;console.log(e),o.setState({checkedCities:e,indeterminate:t>0&&t<n,checkAll:t===n})},o.onCheckAllChange=function(e){var t=e.target.checked,n=t?r:[];o.setState({checkedCities:n,indeterminate:!1,checkAll:t})},i=c,t(o,i)}return c(d,n),i(d,[{key:"render",value:function(){return o.createElement("div",null,o.createElement("div",{className:"checkbox-checkall"},o.createElement(a.Checkbox,{indeterminate:this.state.indeterminate,onChange:this.onCheckAllChange,checked:this.state.checkAll},"Check all")),o.createElement("br",null),o.createElement(a.Checkbox.Group,{options:r,value:this.state.checkedCities,onChange:this.onGroupChange},r.map(function(e,t){return o.createElement(a.Checkbox,{key:t,value:e},e)})))}}]),d}(o.Component);return o.createElement(d,null)}}},"1Yhh":function(e,t,n){e.exports={markdown:'<h1>Checkbox</h1>\n<p>A group of options for multiple choices.</p>\n<div id="demos"></div>\n<h2>API</h2>\n<h3>Checkbox</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>style</td>\n<td>style of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>disabled</td>\n<td>disable the checkbox</td>\n<td>boolean</td>\n<td>false</td>\n</tr>\n<tr>\n<td>checked</td>\n<td>value of checkbox</td>\n<td>boolean</td>\n<td>-</td>\n</tr>\n<tr>\n<td>defaultChecked</td>\n<td>default value</td>\n<td>boolean</td>\n<td>-</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>change</code> event handler</td>\n<td><code>(event: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void</code></td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<h3>Checkbox.Group</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>defaultValue</td>\n<td>Default selected value</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>min</td>\n<td>Minimum</td>\n<td>number</td>\n<td>-</td>\n</tr>\n<tr>\n<td>max</td>\n<td>Maximum</td>\n<td>number</td>\n<td>-</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>change</code> event handler</td>\n<td><code>(options: string[]) =&gt; void</code></td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n',demos:{basic:n("hAUj"),checked:n("CDLT"),controlled:n("8uKy"),disabled:n("CQ58"),group:n("+M4p"),"min-max":n("lCT9")}}},"8uKy":function(e,t,n){e.exports={code:"import { Checkbox, Button } from 'dashkit-ui';\n\nclass App extends React.Component {\n  state = {\n    checked: true,\n    disabled: false,\n  };\n\n  toggleChecked = () => {\n    this.setState({ checked: !this.state.checked });\n  }\n\n  toggleDisable = () => {\n    this.setState({ disabled: !this.state.disabled });\n  }\n\n  onChange = (e) => {\n    console.log('checked = ', e.target.checked);\n    this.setState({\n      checked: e.target.checked,\n    });\n  }\n\n  render() {\n    const label = `${this.state.checked ? 'Checked' : 'Unchecked'}-${this.state.disabled ? 'Disabled' : 'Enabled'}`;\n    return (\n      <div>\n        <p style={{ marginBottom: '20px' }}>\n          <Checkbox\n            checked={this.state.checked}\n            disabled={this.state.disabled}\n            onChange={this.onChange}\n          >\n            {label}\n          </Checkbox>\n        </p>\n        <p>\n          <Button\n            type=\"primary\"\n            size=\"small\"\n            onClick={this.toggleChecked}\n          >\n            {!this.state.checked ? 'Check' : 'Uncheck'}\n          </Button>\n          <Button\n            style={{ marginLeft: '10px' }}\n            type=\"primary\"\n            size=\"small\"\n            onClick={this.toggleDisable}\n          >\n            {!this.state.disabled ? 'Disable' : 'Enable'}\n          </Button>\n        </p>\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<App />, mountNode);\n",meta:{order:3,title:{"zh-CN":"受控组件","en-US":"Controlled component"},subtitle:{"zh-CN":"<p>受控组件用法.</p>\n","en-US":"<p>Controlled component usage.</p>\n"},__content:""},preview:function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=n("GiK3"),i=(n("O27J"),function(){function e(e,t){for(var n=0;n<t.length;n++){var c=t[n];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}return function(t,n,c){return n&&e(t.prototype,n),c&&e(t,c),t}}()),a=n("qMEF"),r=function(n){function r(){var n,c,o,i;e(this,r);for(var a=arguments.length,d=Array(a),h=0;h<a;h++)d[h]=arguments[h];return c=o=t(this,(n=r.__proto__||Object.getPrototypeOf(r)).call.apply(n,[this].concat(d))),o.state={checked:!0,disabled:!1},o.toggleChecked=function(){o.setState({checked:!o.state.checked})},o.toggleDisable=function(){o.setState({disabled:!o.state.disabled})},o.onChange=function(e){console.log("checked = ",e.target.checked),o.setState({checked:e.target.checked})},i=c,t(o,i)}return c(r,n),i(r,[{key:"render",value:function(){var e=(this.state.checked?"Checked":"Unchecked")+"-"+(this.state.disabled?"Disabled":"Enabled");return o.createElement("div",null,o.createElement("p",{style:{marginBottom:"20px"}},o.createElement(a.Checkbox,{checked:this.state.checked,disabled:this.state.disabled,onChange:this.onChange},e)),o.createElement("p",null,o.createElement(a.Button,{type:"primary",size:"small",onClick:this.toggleChecked},this.state.checked?"Uncheck":"Check"),o.createElement(a.Button,{style:{marginLeft:"10px"},type:"primary",size:"small",onClick:this.toggleDisable},this.state.disabled?"Enable":"Disable")))}}]),r}(o.Component);return o.createElement(r,null)}}},CDLT:function(e,t,n){e.exports={code:"import { Checkbox } from 'dashkit-ui';\n\nReactDOM.render(\n  <div className=\"checkbox-list\">\n    <Checkbox checked={false}>checked false</Checkbox>\n    <Checkbox checked={true}>checked true</Checkbox>\n    <Checkbox indeterminate>checked indeterminate</Checkbox>\n  </div>\n  ,\n  mountNode\n);\n",meta:{order:1,title:{"zh-CN":"状态","en-US":"Checked"},subtitle:{"zh-CN":"<p>使用<code>checked</code>设置受控组件.</p>\n","en-US":"<p>Use <code>disabled</code> to defined Controlled component.</p>\n"},__content:""},preview:function(){var e=n("GiK3"),t=(n("O27J"),n("qMEF"));return e.createElement("div",{className:"checkbox-list"},e.createElement(t.Checkbox,{checked:!1},"checked false"),e.createElement(t.Checkbox,{checked:!0},"checked true"),e.createElement(t.Checkbox,{indeterminate:!0},"checked indeterminate"))}}},CQ58:function(e,t,n){e.exports={code:"import { Checkbox } from 'dashkit-ui';\n\nReactDOM.render(\n  <div className=\"checkbox-list\">\n    <Checkbox disabled>Disabled 1</Checkbox>\n    <Checkbox defaultChecked disabled>Disabled 2</Checkbox>\n  </div>,\n  mountNode\n);\n",meta:{order:2,title:{"zh-CN":"禁用","en-US":"Disabled"},subtitle:{"zh-CN":"<p>使用<code>disabled</code>禁用checkbox.</p>\n","en-US":"<p>Use <code>disabled</code> to disable Checkbox.</p>\n"},__content:""},preview:function(){var e=n("GiK3"),t=(n("O27J"),n("qMEF"));return e.createElement("div",{className:"checkbox-list"},e.createElement(t.Checkbox,{disabled:!0},"Disabled 1"),e.createElement(t.Checkbox,{defaultChecked:!0,disabled:!0},"Disabled 2"))}}},hAUj:function(e,t,n){e.exports={code:"import { Checkbox } from 'dashkit-ui';\n\nfunction onChange(e) {\n  console.log(`change to ${e.target.checked}`)\n}\n\nReactDOM.render(\n  <Checkbox defaultChecked onChange={onChange}>Option</Checkbox>,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本用法，可以用<code>defaultChecked</code>来定义checkbox默认的值。</p>\n","en-US":"<p>Use <code>defaultChecked</code> to define Checkbox's value.</p>\n"},__content:""},preview:function(){function e(e){console.log("change to "+e.target.checked)}var t=n("GiK3"),c=(n("O27J"),n("qMEF"));return t.createElement(c.Checkbox,{defaultChecked:!0,onChange:e},"Option")}}},lCT9:function(e,t,n){e.exports={code:"import { Checkbox } from 'dashkit-ui';\n\nconst cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];\n\nclass App extends React.Component {\n  state = {\n    checkedCities: cityOptions.slice(0, 2),\n    indeterminate: true,\n    checkAll: false,\n  };\n\n  render() {\n    return (\n      <Checkbox.Group\n        options={cityOptions}\n        value={this.state.checkedCities}\n        onChange={this.onGroupChange}\n        max={2}\n        min={1}\n      >\n        {cityOptions.map((city, index) =>\n          <Checkbox key={index} value={city}>{city}</Checkbox>\n        )}\n      </Checkbox.Group>\n    );\n  }\n\n  onGroupChange = (value) => {\n    const checkedCount = value.length;\n    const citiesLength = cityOptions.length;\n\n    this.setState({\n      checkedCities: value,\n      indeterminate: checkedCount > 0 && checkedCount < citiesLength,\n      checkAll: checkedCount === citiesLength,\n    });\n  }\n}\n\nReactDOM.render(<App />, mountNode);\n",meta:{order:4,title:{"zh-CN":"数量的限制","en-US":"Minimum / Maximum"},subtitle:{"zh-CN":"<p>使用<code>min</code>和<code>max</code>能实现最多以及最少选项。</p>\n","en-US":"<p>The <code>min</code> and <code>max</code> properties can help you to limit the number of checked items.</p>\n"},__content:""},preview:function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=n("GiK3"),i=(n("O27J"),function(){function e(e,t){for(var n=0;n<t.length;n++){var c=t[n];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}return function(t,n,c){return n&&e(t.prototype,n),c&&e(t,c),t}}()),a=n("qMEF"),r=["Shanghai","Beijing","Guangzhou","Shenzhen"],d=function(n){function d(){var n,c,o,i;e(this,d);for(var a=arguments.length,h=Array(a),l=0;l<a;l++)h[l]=arguments[l];return c=o=t(this,(n=d.__proto__||Object.getPrototypeOf(d)).call.apply(n,[this].concat(h))),o.state={checkedCities:r.slice(0,2),indeterminate:!0,checkAll:!1},o.onGroupChange=function(e){var t=e.length,n=r.length;o.setState({checkedCities:e,indeterminate:t>0&&t<n,checkAll:t===n})},i=c,t(o,i)}return c(d,n),i(d,[{key:"render",value:function(){return o.createElement(a.Checkbox.Group,{options:r,value:this.state.checkedCities,onChange:this.onGroupChange,max:2,min:1},r.map(function(e,t){return o.createElement(a.Checkbox,{key:t,value:e},e)}))}}]),d}(o.Component);return o.createElement(d,null)}}}});
//# sourceMappingURL=1.f98fe77.js.map