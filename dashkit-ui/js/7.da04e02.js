webpackJsonp([7,24,25],{"6xhK":function(e,n,t){e.exports={markdown:'<h1>Menu</h1>\n<p>Powerful and responsive navigation header, the menu. Includes support for branding, navigation, and more, including support for the collapse plugin</p>\n<div id="demos"></div>\n<h2>API</h2>\n<h3>Menu</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>style</td>\n<td>style</td>\n<td>number</td>\n<td>0</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>change</code> event handler</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n',demos:{sidebar:t("juDL"),theme:t("jj1g")}}},jj1g:function(e,n,t){e.exports={code:'import { Menu, Switch } from \'dashkit-ui\';\nconst { Item, SubMenu } = Menu;\n\nclass MenuDemo extends React.Component {\n  state = {\n    theme: \'light\',\n  };\n  render() {\n    const { theme } = this.state;\n    return (\n      <div className="menu-theme">\n        <Switch\n          className="menu-theme-switch"\n          checked={theme === \'dark\'}\n          onChange={this.handleSwitchChange}\n          checkedChildren="Dark"\n          unCheckedChildren="Light"\n        />\n\n        <Menu defaultActive="Dashboard" defaultOpeneds={[\'Layouts\', \'Menu\']} theme={theme}>\n          <Item icon="home" index="Dashboard">Dashboard</Item>\n          <Item icon="clipboard" index="Getting started">Getting started</Item>\n          <SubMenu icon="book-open" title="Components" index="Components">\n            <Item index="Alert">Alert</Item>\n            <Item index="button">Button</Item>\n            <Item index="input">Input</Item>\n            <Item index="Layout">Layout</Item>\n            <SubMenu title="Menu" index="Menu">\n              <Item index="MenuItem">MenuItem</Item>\n              <Item index="MenuSubmenu">MenuSubmenu</Item>\n            </SubMenu>\n          </SubMenu>\n          <Item icon="git-branch" index="Changelog" disabled>Changelog</Item>\n          <SubMenu icon="layout" index="Layouts" title="Layouts">\n            <Item index="Slidenav">Slidenav</Item>\n            <Item index="Topnav">Topnav</Item>\n          </SubMenu>\n          <SubMenu icon="file" index="Empty submenu" title="Empty submenu">\n          </SubMenu>\n        </Menu>\n      </div>\n    );\n  }\n\n  handleSwitchChange = (checked) => {\n    this.setState({\n      theme: checked ? \'dark\' : \'light\',\n    });\n  }\n}\n\nReactDOM.render(\n  <MenuDemo />,\n  mountNode\n);\n',meta:{order:2,title:{"zh-CN":"主题","en-US":"Theme"},subtitle:{"zh-CN":"<p>主题。</p>\n","en-US":"<p>Provides <code>light</code> and <code>dark</code> themes.</p>\n"},__content:""},preview:function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function o(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var i=t("GiK3"),a=(t("O27J"),function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}()),u=t("qMEF"),r=u.Menu.Item,d=u.Menu.SubMenu,m=function(t){function m(){var t,o,i,a;e(this,m);for(var u=arguments.length,r=Array(u),d=0;d<u;d++)r[d]=arguments[d];return o=i=n(this,(t=m.__proto__||Object.getPrototypeOf(m)).call.apply(t,[this].concat(r))),i.state={theme:"light"},i.handleSwitchChange=function(e){i.setState({theme:e?"dark":"light"})},a=o,n(i,a)}return o(m,t),a(m,[{key:"render",value:function(){var e=this.state.theme;return i.createElement("div",{className:"menu-theme"},i.createElement(u.Switch,{className:"menu-theme-switch",checked:"dark"===e,onChange:this.handleSwitchChange,checkedChildren:"Dark",unCheckedChildren:"Light"}),i.createElement(u.Menu,{defaultActive:"Dashboard",defaultOpeneds:["Layouts","Menu"],theme:e},i.createElement(r,{icon:"home",index:"Dashboard"},"Dashboard"),i.createElement(r,{icon:"clipboard",index:"Getting started"},"Getting started"),i.createElement(d,{icon:"book-open",title:"Components",index:"Components"},i.createElement(r,{index:"Alert"},"Alert"),i.createElement(r,{index:"button"},"Button"),i.createElement(r,{index:"input"},"Input"),i.createElement(r,{index:"Layout"},"Layout"),i.createElement(d,{title:"Menu",index:"Menu"},i.createElement(r,{index:"MenuItem"},"MenuItem"),i.createElement(r,{index:"MenuSubmenu"},"MenuSubmenu"))),i.createElement(r,{icon:"git-branch",index:"Changelog",disabled:!0},"Changelog"),i.createElement(d,{icon:"layout",index:"Layouts",title:"Layouts"},i.createElement(r,{index:"Slidenav"},"Slidenav"),i.createElement(r,{index:"Topnav"},"Topnav")),i.createElement(d,{icon:"file",index:"Empty submenu",title:"Empty submenu"})))}}]),m}(i.Component);return i.createElement(m,null)}}},juDL:function(e,n,t){e.exports={code:'import { Menu, Grid } from \'dashkit-ui\';\nconst { Row, Col } = Grid;\nconst { Item, SubMenu } = Menu;\n\nclass MenuDemo extends React.Component {\n  render() {\n    const { theme } = this.props;\n    return (\n      <Menu defaultActive="Dashboard" defaultOpeneds={[\'Layouts\', \'Menu\']} theme={theme}>\n        <Item icon="home" index="Dashboard">Dashboard</Item>\n        <Item icon="clipboard" index="Getting started">Getting started</Item>\n        <SubMenu icon="book-open" title="Components" index="Components">\n          <Item index="Alert">Alert</Item>\n          <Item index="button">Button</Item>\n          <Item index="input">Input</Item>\n          <Item index="Layout">Layout</Item>\n          <SubMenu title="Menu" index="Menu">\n            <Item index="MenuItem">MenuItem</Item>\n            <Item index="MenuSubmenu">MenuSubmenu</Item>\n          </SubMenu>\n        </SubMenu>\n        <Item icon="git-branch" index="Changelog" disabled>Changelog</Item>\n        <SubMenu icon="layout" index="Layouts" title="Layouts">\n          <Item index="Slidenav">Slidenav</Item>\n          <Item index="Topnav">Topnav</Item>\n        </SubMenu>\n        <SubMenu icon="file" index="Empty submenu" title="Empty submenu">\n        </SubMenu>\n      </Menu>\n    );\n  }\n}\n\nReactDOM.render(\n  <Row>\n    <Col xs={6} className="menu-item">\n      <MenuDemo theme="light" />\n    </Col>\n    <Col xs={6} className="menu-item">\n      <MenuDemo theme="dark" />\n    </Col>\n  </Row>,\n  mountNode\n);\n',meta:{order:1,title:{"zh-CN":"侧边栏","en-US":"Sidebar"},subtitle:{"zh-CN":"<p>垂直排列的菜单。</p>\n","en-US":"<p>Vertical Menu.</p>\n"},__content:""},preview:function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function o(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var i=t("GiK3"),a=(t("O27J"),function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}()),u=t("qMEF"),r=u.Grid.Row,d=u.Grid.Col,m=u.Menu.Item,c=u.Menu.SubMenu,l=function(t){function r(){return e(this,r),n(this,(r.__proto__||Object.getPrototypeOf(r)).apply(this,arguments))}return o(r,t),a(r,[{key:"render",value:function(){var e=this.props.theme;return i.createElement(u.Menu,{defaultActive:"Dashboard",defaultOpeneds:["Layouts","Menu"],theme:e},i.createElement(m,{icon:"home",index:"Dashboard"},"Dashboard"),i.createElement(m,{icon:"clipboard",index:"Getting started"},"Getting started"),i.createElement(c,{icon:"book-open",title:"Components",index:"Components"},i.createElement(m,{index:"Alert"},"Alert"),i.createElement(m,{index:"button"},"Button"),i.createElement(m,{index:"input"},"Input"),i.createElement(m,{index:"Layout"},"Layout"),i.createElement(c,{title:"Menu",index:"Menu"},i.createElement(m,{index:"MenuItem"},"MenuItem"),i.createElement(m,{index:"MenuSubmenu"},"MenuSubmenu"))),i.createElement(m,{icon:"git-branch",index:"Changelog",disabled:!0},"Changelog"),i.createElement(c,{icon:"layout",index:"Layouts",title:"Layouts"},i.createElement(m,{index:"Slidenav"},"Slidenav"),i.createElement(m,{index:"Topnav"},"Topnav")),i.createElement(c,{icon:"file",index:"Empty submenu",title:"Empty submenu"}))}}]),r}(i.Component);return i.createElement(r,null,i.createElement(d,{xs:6,className:"menu-item"},i.createElement(l,{theme:"light"})),i.createElement(d,{xs:6,className:"menu-item"},i.createElement(l,{theme:"dark"})))}}}});
//# sourceMappingURL=7.da04e02.js.map