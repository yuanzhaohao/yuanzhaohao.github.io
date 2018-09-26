webpackJsonp([7,24,25],{"6xhK":function(e,n,t){e.exports={markdown:'<h1>Menu</h1>\n<p>Powerful and responsive navigation header, the menu. Includes support for branding, navigation, and more, including support for the collapse plugin</p>\n<div id="demos"></div>\n<h2>API</h2>\n<h3>Menu</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>style</td>\n<td>style</td>\n<td>number</td>\n<td>0</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>change</code> event handler</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n',demos:{sidebar:t("juDL"),theme:t("jj1g")}}},jj1g:function(e,n,t){e.exports={code:'import { Menu, Switch } from \'dashkit-ui\';\nconst { Item, SubMenu } = Menu;\n\nclass MenuDemo extends React.Component {\n  state = {\n    theme: \'light\',\n  };\n  render() {\n    const { theme } = this.state;\n    return (\n      <div className="menu-theme">\n        <Switch\n          className="menu-theme-switch"\n          checked={theme === \'dark\'}\n          onChange={this.handleSwitchChange}\n          checkedChildren="Dark"\n          unCheckedChildren="Light"\n        />\n\n        <Menu defaultActive="Dashboard" defaultOpeneds={[\'Layouts\', \'Menu\']} theme={theme}>\n          <Item icon="home" index="Dashboard">Dashboard</Item>\n          <Item icon="clipboard" index="Getting started">Getting started</Item>\n          <SubMenu icon="book-open" title="Components" index="Components">\n            <Item index="Alert">Alert</Item>\n            <Item index="button">Button</Item>\n            <Item index="input">Input</Item>\n            <Item index="Layout">Layout</Item>\n            <SubMenu title="Menu" index="Menu">\n              <Item index="MenuItem">MenuItem</Item>\n              <Item index="MenuSubmenu">MenuSubmenu</Item>\n            </SubMenu>\n          </SubMenu>\n          <Item icon="git-branch" index="Changelog" disabled>Changelog</Item>\n          <SubMenu icon="layout" index="Layouts" title="Layouts">\n            <Item index="Slidenav">Slidenav</Item>\n            <Item index="Topnav">Topnav</Item>\n          </SubMenu>\n          <SubMenu icon="file" index="Empty submenu" title="Empty submenu">\n          </SubMenu>\n        </Menu>\n      </div>\n    );\n  }\n\n  handleSwitchChange = (checked) => {\n    this.setState({\n      theme: checked ? \'dark\' : \'light\',\n    });\n  }\n}\n\nReactDOM.render(\n  <MenuDemo />,\n  mountNode\n);\n',meta:{order:2,title:{"zh-CN":"主题","en-US":"Theme"},subtitle:{"zh-CN":"<p>主题。</p>\n","en-US":"<p>Provides <code>light</code> and <code>dark</code> themes.</p>\n"},__content:""},preview:function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function o(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var i=t("GiK3"),u=(t("O27J"),function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}()),a=t("qMEF"),r=a.Menu.Item,l=a.Menu.SubMenu,d=function(t){function d(){var t,o,i,u;e(this,d);for(var a=arguments.length,r=Array(a),l=0;l<a;l++)r[l]=arguments[l];return o=i=n(this,(t=d.__proto__||Object.getPrototypeOf(d)).call.apply(t,[this].concat(r))),i.state={theme:"light"},i.handleSwitchChange=function(e){i.setState({theme:e?"dark":"light"})},u=o,n(i,u)}return o(d,t),u(d,[{key:"render",value:function(){var e=this.state.theme;return i.createElement("div",{className:"menu-theme"},i.createElement(a.Switch,{className:"menu-theme-switch",checked:"dark"===e,onChange:this.handleSwitchChange,checkedChildren:"Dark",unCheckedChildren:"Light"}),i.createElement(a.Menu,{defaultActive:"Dashboard",defaultOpeneds:["Layouts","Menu"],theme:e},i.createElement(r,{icon:"home",index:"Dashboard"},"Dashboard"),i.createElement(r,{icon:"clipboard",index:"Getting started"},"Getting started"),i.createElement(l,{icon:"book-open",title:"Components",index:"Components"},i.createElement(r,{index:"Alert"},"Alert"),i.createElement(r,{index:"button"},"Button"),i.createElement(r,{index:"input"},"Input"),i.createElement(r,{index:"Layout"},"Layout"),i.createElement(l,{title:"Menu",index:"Menu"},i.createElement(r,{index:"MenuItem"},"MenuItem"),i.createElement(r,{index:"MenuSubmenu"},"MenuSubmenu"))),i.createElement(r,{icon:"git-branch",index:"Changelog",disabled:!0},"Changelog"),i.createElement(l,{icon:"layout",index:"Layouts",title:"Layouts"},i.createElement(r,{index:"Slidenav"},"Slidenav"),i.createElement(r,{index:"Topnav"},"Topnav")),i.createElement(l,{icon:"file",index:"Empty submenu",title:"Empty submenu"})))}}]),d}(i.Component);return i.createElement(d,null)}}},juDL:function(e,n,t){e.exports={code:'import { Menu, Grid } from \'dashkit-ui\';\nconst { Row, Col } = Grid;\nconst { Item, SubMenu } = Menu;\n\nclass MenuDemo extends React.Component {\n  render() {\n    const { theme } = this.props;\n    return (\n      <Menu\n        defaultActive="Dashboard"\n        defaultOpeneds={[\'Layouts\', \'Menu\']}\n        theme={theme}\n        onSelect={this.onMenuSelect}\n        onOpen={this.onSubMenuOpen}\n      >\n        <Item icon="home" index="Dashboard">Dashboard</Item>\n        <Item icon="clipboard" index="Getting started">Getting started</Item>\n        <SubMenu icon="book-open" title="Components" index="Components">\n          <Item index="Alert">Alert</Item>\n          <Item index="button">Button</Item>\n          <Item index="input">Input</Item>\n          <Item index="Layout">Layout</Item>\n          <SubMenu title="Menu" index="Menu">\n            <Item index="MenuItem">MenuItem</Item>\n            <Item index="MenuSubmenu">MenuSubmenu</Item>\n          </SubMenu>\n        </SubMenu>\n        <Item icon="git-branch" index="Changelog" disabled>Changelog</Item>\n        <SubMenu icon="layout" index="Layouts" title="Layouts">\n          <Item index="Slidenav">Slidenav</Item>\n          <Item index="Topnav">Topnav</Item>\n        </SubMenu>\n        <SubMenu icon="file" index="Empty submenu" title="Empty submenu">\n        </SubMenu>\n      </Menu>\n    );\n  }\n\n  onMenuSelect = (index) => {\n    console.log(`item selected: ${index}`);\n  }\n\n  onSubMenuOpen = (index) => {\n    console.log(`submunu opened: ${index}`);\n  }\n}\n\nReactDOM.render(\n  <Row>\n    <Col xs={6} className="menu-item">\n      <MenuDemo theme="light" />\n    </Col>\n    <Col xs={6} className="menu-item">\n      <MenuDemo theme="dark" />\n    </Col>\n  </Row>,\n  mountNode\n);\n',meta:{order:1,title:{"zh-CN":"侧边栏","en-US":"Sidebar"},subtitle:{"zh-CN":"<p>垂直排列的菜单。</p>\n","en-US":"<p>Vertical Menu.</p>\n"},__content:""},preview:function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function o(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var i=t("GiK3"),u=(t("O27J"),function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}()),a=t("qMEF"),r=a.Grid.Row,l=a.Grid.Col,d=a.Menu.Item,c=a.Menu.SubMenu,m=function(t){function r(){var t,o,i,u;e(this,r);for(var a=arguments.length,l=Array(a),d=0;d<a;d++)l[d]=arguments[d];return o=i=n(this,(t=r.__proto__||Object.getPrototypeOf(r)).call.apply(t,[this].concat(l))),i.onMenuSelect=function(e){console.log("item selected: "+e)},i.onSubMenuOpen=function(e){console.log("submunu opened: "+e)},u=o,n(i,u)}return o(r,t),u(r,[{key:"render",value:function(){var e=this.props.theme;return i.createElement(a.Menu,{defaultActive:"Dashboard",defaultOpeneds:["Layouts","Menu"],theme:e,onSelect:this.onMenuSelect,onOpen:this.onSubMenuOpen},i.createElement(d,{icon:"home",index:"Dashboard"},"Dashboard"),i.createElement(d,{icon:"clipboard",index:"Getting started"},"Getting started"),i.createElement(c,{icon:"book-open",title:"Components",index:"Components"},i.createElement(d,{index:"Alert"},"Alert"),i.createElement(d,{index:"button"},"Button"),i.createElement(d,{index:"input"},"Input"),i.createElement(d,{index:"Layout"},"Layout"),i.createElement(c,{title:"Menu",index:"Menu"},i.createElement(d,{index:"MenuItem"},"MenuItem"),i.createElement(d,{index:"MenuSubmenu"},"MenuSubmenu"))),i.createElement(d,{icon:"git-branch",index:"Changelog",disabled:!0},"Changelog"),i.createElement(c,{icon:"layout",index:"Layouts",title:"Layouts"},i.createElement(d,{index:"Slidenav"},"Slidenav"),i.createElement(d,{index:"Topnav"},"Topnav")),i.createElement(c,{icon:"file",index:"Empty submenu",title:"Empty submenu"}))}}]),r}(i.Component);return i.createElement(r,null,i.createElement(l,{xs:6,className:"menu-item"},i.createElement(m,{theme:"light"})),i.createElement(l,{xs:6,className:"menu-item"},i.createElement(m,{theme:"dark"})))}}}});
//# sourceMappingURL=7.9b48f4e.js.map