webpackJsonp([73],{"8uKy":function(e,t,n){e.exports={code:"import { Checkbox, Button } from 'dashkit-ui';\n\nclass App extends React.Component {\n  state = {\n    checked: true,\n    disabled: false,\n  };\n\n  toggleChecked = () => {\n    this.setState({ checked: !this.state.checked });\n  }\n\n  toggleDisable = () => {\n    this.setState({ disabled: !this.state.disabled });\n  }\n\n  onChange = (e) => {\n    console.log('checked = ', e.target.checked);\n    this.setState({\n      checked: e.target.checked,\n    });\n  }\n\n  render() {\n    const label = `${this.state.checked ? 'Checked' : 'Unchecked'}-${this.state.disabled ? 'Disabled' : 'Enabled'}`;\n    return (\n      <div>\n        <p style={{ marginBottom: '20px' }}>\n          <Checkbox\n            checked={this.state.checked}\n            disabled={this.state.disabled}\n            onChange={this.onChange}\n          >\n            {label}\n          </Checkbox>\n        </p>\n        <p>\n          <Button\n            type=\"primary\"\n            size=\"small\"\n            onClick={this.toggleChecked}\n          >\n            {!this.state.checked ? 'Check' : 'Uncheck'}\n          </Button>\n          <Button\n            style={{ marginLeft: '10px' }}\n            type=\"primary\"\n            size=\"small\"\n            onClick={this.toggleDisable}\n          >\n            {!this.state.disabled ? 'Disable' : 'Enable'}\n          </Button>\n        </p>\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<App />, mountNode);\n",meta:{order:3,title:{"zh-CN":"受控组件","en-US":"Controlled component"},subtitle:{"zh-CN":"<p>受控组件用法.</p>\n","en-US":"<p>Controlled component usage.</p>\n"},__content:""},preview:function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n("GiK3"),o=(n("O27J"),function(){function e(e,t){for(var n=0;n<t.length;n++){var c=t[n];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}return function(t,n,c){return n&&e(t.prototype,n),c&&e(t,c),t}}()),s=n("qMEF"),i=function(n){function i(){var n,c,a,o;e(this,i);for(var s=arguments.length,l=Array(s),r=0;r<s;r++)l[r]=arguments[r];return c=a=t(this,(n=i.__proto__||Object.getPrototypeOf(i)).call.apply(n,[this].concat(l))),a.state={checked:!0,disabled:!1},a.toggleChecked=function(){a.setState({checked:!a.state.checked})},a.toggleDisable=function(){a.setState({disabled:!a.state.disabled})},a.onChange=function(e){console.log("checked = ",e.target.checked),a.setState({checked:e.target.checked})},o=c,t(a,o)}return c(i,n),o(i,[{key:"render",value:function(){var e=(this.state.checked?"Checked":"Unchecked")+"-"+(this.state.disabled?"Disabled":"Enabled");return a.createElement("div",null,a.createElement("p",{style:{marginBottom:"20px"}},a.createElement(s.Checkbox,{checked:this.state.checked,disabled:this.state.disabled,onChange:this.onChange},e)),a.createElement("p",null,a.createElement(s.Button,{type:"primary",size:"small",onClick:this.toggleChecked},this.state.checked?"Uncheck":"Check"),a.createElement(s.Button,{style:{marginLeft:"10px"},type:"primary",size:"small",onClick:this.toggleDisable},this.state.disabled?"Enable":"Disable")))}}]),i}(a.Component);return a.createElement(i,null)}}}});
//# sourceMappingURL=73.20059b2.js.map