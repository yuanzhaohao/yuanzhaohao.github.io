webpackJsonp([37],{Dp5F:function(e,n,o){e.exports={code:"import { Pagination } from 'dashkit-ui';\n\nfunction onChange(page) {\n  console.log(`current page: ${page}`);\n}\n\nReactDOM.render(\n  <Pagination\n    total={500}\n    defaultCurrent={10}\n    onChange={onChange}\n  />,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>非受控组件的用法，可以用<code>total</code>、<code>defaultCurrent</code>、 <code>pageSize</code> 和 <code>range</code>来控制页面。</p>\n","en-US":"<p>Uncontrolled usage. Use <code>total</code>, <code>current</code>, <code>pageSize</code> and <code>range</code> to control Pagination.</p>\n"},__content:""},preview:function(){function e(e){console.log("current page: "+e)}var n=o("GiK3"),t=(o("O27J"),o("qMEF"));return n.createElement(t.Pagination,{total:500,defaultCurrent:10,onChange:e})}}}});
//# sourceMappingURL=37.2f9dc56.js.map