webpackJsonp([29],{HFpJ:function(e,n,t){e.exports={code:"import { Pagination } from 'dashkit-ui';\n\nclass Demo extends React.Component {\n  state = {\n    current: 10,\n  };\n\n  render() {\n    return (\n      <Pagination total={500} current={this.state.current} pageSize={10} onChange={this.handleChange} />\n    );\n  }\n\n  handleChange = (current) => {\n    console.log(`Current page: ${current}`);\n    this.setState({ current })\n  }\n}\n\nReactDOM.render(\n  <Demo />,\n  mountNode\n);\n",meta:{order:2,title:{"zh-CN":"受控组件","en-US":"Controlled usage"},subtitle:{"zh-CN":"<p>受控组件，使用<code>current</code>来控制分页。</p>\n","en-US":"<p>Controlled usage. Use <code>current</code> property to control the pagination.</p>\n"},__content:""},preview:function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function r(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var o=t("GiK3"),a=(t("O27J"),function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}()),c=t("qMEF"),i=function(t){function i(){var t,r,o,a;e(this,i);for(var c=arguments.length,u=Array(c),l=0;l<c;l++)u[l]=arguments[l];return r=o=n(this,(t=i.__proto__||Object.getPrototypeOf(i)).call.apply(t,[this].concat(u))),o.state={current:10},o.handleChange=function(e){console.log("Current page: "+e),o.setState({current:e})},a=r,n(o,a)}return r(i,t),a(i,[{key:"render",value:function(){return o.createElement(c.Pagination,{total:500,current:this.state.current,pageSize:10,onChange:this.handleChange})}}]),i}(o.Component);return o.createElement(i,null)}}}});
//# sourceMappingURL=29.aad25e8.js.map