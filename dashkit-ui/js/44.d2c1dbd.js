webpackJsonp([44],{E1QF:function(e,t,n){e.exports={code:"import { Layout } from 'dashkit-ui';\nconst { Header, Footer, Sidebar, Content } = Layout;\n\nReactDOM.render(\n  <div className=\"layout-list\">\n    <Layout>\n      <Header>Header</Header>\n      <Content>Content</Content>\n      <Footer>Footer</Footer>\n    </Layout>\n\n    <Layout>\n      <Header>Header</Header>\n      <Layout>\n        <Sidebar>Sidebar</Sidebar>\n        <Content>Content</Content>\n      </Layout>\n      <Footer>Footer</Footer>\n    </Layout>\n\n    <Layout>\n      <Header>Header</Header>\n      <Layout>\n        <Content>Content</Content>\n        <Sidebar>Sidebar</Sidebar>\n      </Layout>\n      <Footer>Footer</Footer>\n    </Layout>\n\n    <Layout>\n      <Sidebar>Sidebar</Sidebar>\n      <Layout>\n        <Header>Header</Header>\n        <Content>Content</Content>\n        <Footer>Footer</Footer>\n      </Layout>\n    </Layout>\n  </div>,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本用法。</p>\n","en-US":"<p>Classic page layouts.</p>\n"},__content:""},preview:function(){var e=n("GiK3"),t=(n("O27J"),n("qMEF")),a=t.Layout.Header,o=t.Layout.Footer,r=t.Layout.Sidebar,l=t.Layout.Content;return e.createElement("div",{className:"layout-list"},e.createElement(t.Layout,null,e.createElement(a,null,"Header"),e.createElement(l,null,"Content"),e.createElement(o,null,"Footer")),e.createElement(t.Layout,null,e.createElement(a,null,"Header"),e.createElement(t.Layout,null,e.createElement(r,null,"Sidebar"),e.createElement(l,null,"Content")),e.createElement(o,null,"Footer")),e.createElement(t.Layout,null,e.createElement(a,null,"Header"),e.createElement(t.Layout,null,e.createElement(l,null,"Content"),e.createElement(r,null,"Sidebar")),e.createElement(o,null,"Footer")),e.createElement(t.Layout,null,e.createElement(r,null,"Sidebar"),e.createElement(t.Layout,null,e.createElement(a,null,"Header"),e.createElement(l,null,"Content"),e.createElement(o,null,"Footer"))))}}}});
//# sourceMappingURL=44.d2c1dbd.js.map