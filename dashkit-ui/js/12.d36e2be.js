webpackJsonp([12,29],{E1QF:function(t,e,n){t.exports={code:"import { Layout } from 'dashkit-ui';\nconst { Header, Footer, Sidebar, Content } = Layout;\n\nReactDOM.render(\n  <div className=\"layout-list\">\n    <Layout>\n      <Header>Header</Header>\n      <Content>Content</Content>\n      <Footer>Footer</Footer>\n    </Layout>\n\n    <Layout>\n      <Header>Header</Header>\n      <Layout>\n        <Sidebar>Sidebar</Sidebar>\n        <Content>Content</Content>\n      </Layout>\n      <Footer>Footer</Footer>\n    </Layout>\n\n    <Layout>\n      <Header>Header</Header>\n      <Layout>\n        <Content>Content</Content>\n        <Sidebar>Sidebar</Sidebar>\n      </Layout>\n      <Footer>Footer</Footer>\n    </Layout>\n\n    <Layout>\n      <Sidebar>Sidebar</Sidebar>\n      <Layout>\n        <Header>Header</Header>\n        <Content>Content</Content>\n        <Footer>Footer</Footer>\n      </Layout>\n    </Layout>\n  </div>,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本用法。</p>\n","en-US":"<p>Classic page layouts.</p>\n"},__content:""},preview:function(){var t=n("GiK3"),e=(n("O27J"),n("qMEF")),a=e.Layout.Header,o=e.Layout.Footer,r=e.Layout.Sidebar,d=e.Layout.Content;return t.createElement("div",{className:"layout-list"},t.createElement(e.Layout,null,t.createElement(a,null,"Header"),t.createElement(d,null,"Content"),t.createElement(o,null,"Footer")),t.createElement(e.Layout,null,t.createElement(a,null,"Header"),t.createElement(e.Layout,null,t.createElement(r,null,"Sidebar"),t.createElement(d,null,"Content")),t.createElement(o,null,"Footer")),t.createElement(e.Layout,null,t.createElement(a,null,"Header"),t.createElement(e.Layout,null,t.createElement(d,null,"Content"),t.createElement(r,null,"Sidebar")),t.createElement(o,null,"Footer")),t.createElement(e.Layout,null,t.createElement(r,null,"Sidebar"),t.createElement(e.Layout,null,t.createElement(a,null,"Header"),t.createElement(d,null,"Content"),t.createElement(o,null,"Footer"))))}}},Z30B:function(t,e,n){t.exports={markdown:'<h1>Layout</h1>\n<p>Handling the overall layout of a page.</p>\n<div id="demos"></div>\n<h2>API</h2>\n<h3>Layout</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<h3>Layout.Sidebar</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<h3>Layout.Header</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<h3>Layout.Content</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<h3>Layout.Footer</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n',demos:{basic:n("E1QF")}}}});
//# sourceMappingURL=12.d36e2be.js.map