webpackJsonp([37],{oFJZ:function(e,t,n){e.exports={code:"import { Popover, Button } from 'dashkit-ui';\n\nclass App extends React.Component {\n  state = {\n    visible: false,\n  }\n\n  render() {\n    return (\n      <Popover\n        content={<a onClick={this.hide} style={{cursor: 'pointer'}}>Close</a>}\n        title=\"Title\"\n        trigger=\"click\"\n        visible={this.state.visible}\n      >\n        <Button onClick={this.handleClick}>Click me</Button>\n      </Popover>\n    );\n  }\n\n  handleClick = () => {\n    console.log('click handleClick')\n    const { visible } = this.state;\n    this.setState({\n      visible: !visible\n    });\n  }\n\n  hide = () => {\n    this.setState({\n      visible: false,\n    });\n  }\n}\n\nReactDOM.render(\n  <App />,\n  mountNode\n);\n",meta:{order:3,title:{"zh-CN":"受控组件","en-US":"Controlled Component"},subtitle:{"zh-CN":"<p>受控组件的用法</p>\n","en-US":"<p>Controlled Component usage.</p>\n"},__content:""},preview:function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n("GiK3"),r=(n("O27J"),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),l=n("qMEF"),c=function(n){function c(){var n,o,i,r;e(this,c);for(var l=arguments.length,s=Array(l),a=0;a<l;a++)s[a]=arguments[a];return o=i=t(this,(n=c.__proto__||Object.getPrototypeOf(c)).call.apply(n,[this].concat(s))),i.state={visible:!1},i.handleClick=function(){console.log("click handleClick");var e=i.state.visible;i.setState({visible:!e})},i.hide=function(){i.setState({visible:!1})},r=o,t(i,r)}return o(c,n),r(c,[{key:"render",value:function(){return i.createElement(l.Popover,{content:i.createElement("a",{onClick:this.hide,style:{cursor:"pointer"}},"Close"),title:"Title",trigger:"click",visible:this.state.visible},i.createElement(l.Button,{onClick:this.handleClick},"Click me"))}}]),c}(i.Component);return i.createElement(c,null)}}}});
//# sourceMappingURL=37.d17bcd8.js.map