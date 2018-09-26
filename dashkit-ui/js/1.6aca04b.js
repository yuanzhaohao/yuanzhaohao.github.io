webpackJsonp([1,11,12,13,14],{Favh:function(e,t,n){e.exports={code:"import { Switch } from 'dashkit-ui';\n\nReactDOM.render(\n  <Switch checked={true} disabled={true} />,\n  mountNode\n);\n",meta:{order:2,title:{"zh-CN":"禁用","en-US":"Disabled"},subtitle:{"zh-CN":"<p>使用<code>disabled</code>来决定是否禁用switch，默认值是<code>false</code>。</p>\n","en-US":"<p>Add the <code>disabled</code> property to determine if the switch is disabled.</p>\n"},__content:""},preview:function(){var e=n("GiK3"),t=(n("O27J"),n("qMEF"));return e.createElement(t.Switch,{checked:!0,disabled:!0})}}},IsGj:function(e,t,n){e.exports={code:"import { Switch } from 'dashkit-ui';\n\nfunction onChange(checked) {\n  console.log(`switch to ${checked}`);\n}\n\nReactDOM.render(\n  <Switch defaultChecked onChange={onChange} />,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本的使用。</p>\n","en-US":"<p>The most basic usage.</p>\n"},__content:""},preview:function(){function e(e){console.log("switch to "+e)}var t=n("GiK3"),d=(n("O27J"),n("qMEF"));return t.createElement(d.Switch,{defaultChecked:!0,onChange:e})}}},et27:function(e,t,n){e.exports={code:'import { Switch } from \'dashkit-ui\';\n\nReactDOM.render(\n  <div className="switch-list">\n    <Switch size="large" />\n    <Switch size="default" />\n    <Switch size="small" />\n  </div>,\n  mountNode\n);\n',meta:{order:1,title:{"zh-CN":"尺寸","en-US":"Sizes"},subtitle:{"zh-CN":"<p>可以设置<code>size</code>属性来定义尺寸，属性值包括<code>large</code>、<code>default</code>、<code>small</code>，默认是<code>default</code>。</p>\n","en-US":"<p>If a large or small switch is desired, set the size property to either <code>large</code> or <code>small</code> respectively. Omit the <code>size</code> property for a button with the default size.</p>\n"},__content:""},preview:function(){var e=n("GiK3"),t=(n("O27J"),n("qMEF"));return e.createElement("div",{className:"switch-list"},e.createElement(t.Switch,{size:"large"}),e.createElement(t.Switch,{size:"default"}),e.createElement(t.Switch,{size:"small"}))}}},"jk4/":function(e,t,n){e.exports={markdown:'<h1>Switch</h1>\n<p>Replaces a standard checkbox input with a switch button.</p>\n<div id="demos"></div>\n<h2>API</h2>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>total</td>\n<td>total number of pages</td>\n<td>number</td>\n<td>0</td>\n</tr>\n<tr>\n<td>current</td>\n<td>current page</td>\n<td>number</td>\n<td>1</td>\n</tr>\n<tr>\n<td>pageSize</td>\n<td>number of each page</td>\n<td>number</td>\n<td>20</td>\n</tr>\n<tr>\n<td>range</td>\n<td>number of display pages</td>\n<td>number</td>\n<td>7</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>change</code> event handler</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n',demos:{basic:n("IsGj"),children:n("zVHs"),disabled:n("Favh"),size:n("et27")}}},zVHs:function(e,t,n){e.exports={code:'import { Switch } from \'dashkit-ui\';\n\nReactDOM.render(\n  <div className="switch-list">\n    <Switch size="large" checkedChildren="Open" unCheckedChildren="Close" />\n    <Switch size="default" checkedChildren="Open" unCheckedChildren="Close" />\n    <Switch size="small" checkedChildren="Open" unCheckedChildren="Close" />\n  </div>,\n  mountNode\n);\n',meta:{order:4,title:{"zh-CN":"子组件","en-US":"Children"},subtitle:{"zh-CN":"<p>自定义文字的使用。</p>\n","en-US":"<p>use <code>checkedChildren</code> and <code>unCheckedChildren</code> to define children.</p>\n"},__content:""},preview:function(){var e=n("GiK3"),t=(n("O27J"),n("qMEF"));return e.createElement("div",{className:"switch-list"},e.createElement(t.Switch,{size:"large",checkedChildren:"Open",unCheckedChildren:"Close"}),e.createElement(t.Switch,{size:"default",checkedChildren:"Open",unCheckedChildren:"Close"}),e.createElement(t.Switch,{size:"small",checkedChildren:"Open",unCheckedChildren:"Close"}))}}}});
//# sourceMappingURL=1.6aca04b.js.map