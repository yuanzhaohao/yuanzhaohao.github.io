webpackJsonp([34],{juDL:function(e,n,t){e.exports={code:'import { Menu, Grid } from \'dashkit-ui\';\nconst { Row, Col } = Grid;\nconst { Item, SubMenu, ItemGroup } = Menu;\n\nclass MenuDemo extends React.Component {\n  render() {\n    const { theme } = this.props;\n    return (\n      <Menu\n        defaultActive="Dashboard"\n        defaultOpeneds={[\'Layouts\', \'Menu\']}\n        theme={theme}\n        onSelect={this.onMenuSelect}\n        onOpen={this.onSubMenuOpen}\n      >\n        <Item icon="home" index="Dashboard">Dashboard</Item>\n        <Item icon="clipboard" index="Getting started">Getting started</Item>\n        <SubMenu icon="book-open" title="Components" index="Components">\n          <Item index="Alert">Alert</Item>\n          <Item index="button">Button</Item>\n          <Item index="input">Input</Item>\n          <Item index="Layout">Layout</Item>\n          <SubMenu title="Menu" index="Menu">\n            <Item index="MenuItem">MenuItem</Item>\n            <Item index="MenuSubmenu">MenuSubmenu</Item>\n          </SubMenu>\n        </SubMenu>\n        <Item icon="git-branch" index="Changelog" disabled>Changelog</Item>\n        <SubMenu icon="layout" index="Layouts" title="Layouts">\n          <Item index="Slidenav">Slidenav</Item>\n          <ItemGroup title="ItemGroup">\n            <Item index="ItemGroup1">ItemGroup1</Item>\n            <Item index="ItemGroup2">ItemGroup2</Item>\n          </ItemGroup>\n        </SubMenu>\n        <SubMenu icon="file" index="Empty submenu" title="Empty submenu">\n        </SubMenu>\n      </Menu>\n    );\n  }\n\n  onMenuSelect = (index) => {\n    console.log(`item selected: ${index}`);\n  }\n\n  onSubMenuOpen = (index) => {\n    console.log(`submunu opened: ${index}`);\n  }\n}\n\nReactDOM.render(\n  <Row>\n    <Col xs={6} className="menu-vertical-item">\n      <MenuDemo theme="light" />\n    </Col>\n    <Col xs={6} className="menu-vertical-item">\n      <MenuDemo theme="dark" />\n    </Col>\n  </Row>,\n  mountNode\n);\n',meta:{order:0,title:{"zh-CN":"侧边栏","en-US":"Sidebar"},subtitle:{"zh-CN":"<p>垂直排列的菜单。</p>\n","en-US":"<p>Vertical Menu.</p>\n"},__content:""},preview:function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function o(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var u=t("GiK3"),i=(t("O27J"),function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}()),r=t("qMEF"),a=r.Grid.Row,m=r.Grid.Col,l=r.Menu.Item,c=r.Menu.SubMenu,d=r.Menu.ItemGroup,s=function(t){function a(){var t,o,u,i;e(this,a);for(var r=arguments.length,m=Array(r),l=0;l<r;l++)m[l]=arguments[l];return o=u=n(this,(t=a.__proto__||Object.getPrototypeOf(a)).call.apply(t,[this].concat(m))),u.onMenuSelect=function(e){console.log("item selected: "+e)},u.onSubMenuOpen=function(e){console.log("submunu opened: "+e)},i=o,n(u,i)}return o(a,t),i(a,[{key:"render",value:function(){var e=this.props.theme;return u.createElement(r.Menu,{defaultActive:"Dashboard",defaultOpeneds:["Layouts","Menu"],theme:e,onSelect:this.onMenuSelect,onOpen:this.onSubMenuOpen},u.createElement(l,{icon:"home",index:"Dashboard"},"Dashboard"),u.createElement(l,{icon:"clipboard",index:"Getting started"},"Getting started"),u.createElement(c,{icon:"book-open",title:"Components",index:"Components"},u.createElement(l,{index:"Alert"},"Alert"),u.createElement(l,{index:"button"},"Button"),u.createElement(l,{index:"input"},"Input"),u.createElement(l,{index:"Layout"},"Layout"),u.createElement(c,{title:"Menu",index:"Menu"},u.createElement(l,{index:"MenuItem"},"MenuItem"),u.createElement(l,{index:"MenuSubmenu"},"MenuSubmenu"))),u.createElement(l,{icon:"git-branch",index:"Changelog",disabled:!0},"Changelog"),u.createElement(c,{icon:"layout",index:"Layouts",title:"Layouts"},u.createElement(l,{index:"Slidenav"},"Slidenav"),u.createElement(d,{title:"ItemGroup"},u.createElement(l,{index:"ItemGroup1"},"ItemGroup1"),u.createElement(l,{index:"ItemGroup2"},"ItemGroup2"))),u.createElement(c,{icon:"file",index:"Empty submenu",title:"Empty submenu"}))}}]),a}(u.Component);return u.createElement(a,null,u.createElement(m,{xs:6,className:"menu-vertical-item"},u.createElement(s,{theme:"light"})),u.createElement(m,{xs:6,className:"menu-vertical-item"},u.createElement(s,{theme:"dark"})))}}}});
//# sourceMappingURL=34.e3083c7.js.map