webpackJsonp([44],{jj1g:function(e,n,t){e.exports={code:'import { Menu, Switch } from \'dashkit-ui\';\nconst { Item, SubMenu } = Menu;\n\nclass MenuDemo extends React.Component {\n  state = {\n    theme: \'light\',\n  };\n  render() {\n    const { theme } = this.state;\n    return (\n      <div className="menu-theme">\n        <Switch\n          className="menu-theme-switch"\n          checked={theme === \'dark\'}\n          onChange={this.handleSwitchChange}\n          checkedChildren="Dark"\n          unCheckedChildren="Light"\n        />\n\n        <Menu defaultActive="Dashboard" defaultOpeneds={[\'Layouts\', \'Menu\']} theme={theme}>\n          <Item icon="home" index="Dashboard">Dashboard</Item>\n          <Item icon="clipboard" index="Getting started">Getting started</Item>\n          <SubMenu icon="book-open" title="Components" index="Components">\n            <Item index="Alert">Alert</Item>\n            <Item index="button">Button</Item>\n            <Item index="input">Input</Item>\n            <Item index="Layout">Layout</Item>\n            <SubMenu title="Menu" index="Menu">\n              <Item index="MenuItem">MenuItem</Item>\n              <Item index="MenuSubmenu">MenuSubmenu</Item>\n            </SubMenu>\n          </SubMenu>\n          <Item icon="git-branch" index="Changelog" disabled>Changelog</Item>\n          <SubMenu icon="layout" index="Layouts" title="Layouts">\n            <Item index="Slidenav">Slidenav</Item>\n            <Item index="Topnav">Topnav</Item>\n          </SubMenu>\n          <SubMenu icon="file" index="Empty submenu" title="Empty submenu">\n          </SubMenu>\n        </Menu>\n      </div>\n    );\n  }\n\n  handleSwitchChange = (checked) => {\n    this.setState({\n      theme: checked ? \'dark\' : \'light\',\n    });\n  }\n}\n\nReactDOM.render(\n  <MenuDemo />,\n  mountNode\n);\n',meta:{order:2,title:{"zh-CN":"主题","en-US":"Theme"},subtitle:{"zh-CN":"<p>主题。</p>\n","en-US":"<p>Provides <code>light</code> and <code>dark</code> themes.</p>\n"},__content:""},preview:function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function i(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var a=t("GiK3"),o=(t("O27J"),function(){function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}()),u=t("qMEF"),r=u.Menu.Item,c=u.Menu.SubMenu,m=function(t){function m(){var t,i,a,o;e(this,m);for(var u=arguments.length,r=Array(u),c=0;c<u;c++)r[c]=arguments[c];return i=a=n(this,(t=m.__proto__||Object.getPrototypeOf(m)).call.apply(t,[this].concat(r))),a.state={theme:"light"},a.handleSwitchChange=function(e){a.setState({theme:e?"dark":"light"})},o=i,n(a,o)}return i(m,t),o(m,[{key:"render",value:function(){var e=this.state.theme;return a.createElement("div",{className:"menu-theme"},a.createElement(u.Switch,{className:"menu-theme-switch",checked:"dark"===e,onChange:this.handleSwitchChange,checkedChildren:"Dark",unCheckedChildren:"Light"}),a.createElement(u.Menu,{defaultActive:"Dashboard",defaultOpeneds:["Layouts","Menu"],theme:e},a.createElement(r,{icon:"home",index:"Dashboard"},"Dashboard"),a.createElement(r,{icon:"clipboard",index:"Getting started"},"Getting started"),a.createElement(c,{icon:"book-open",title:"Components",index:"Components"},a.createElement(r,{index:"Alert"},"Alert"),a.createElement(r,{index:"button"},"Button"),a.createElement(r,{index:"input"},"Input"),a.createElement(r,{index:"Layout"},"Layout"),a.createElement(c,{title:"Menu",index:"Menu"},a.createElement(r,{index:"MenuItem"},"MenuItem"),a.createElement(r,{index:"MenuSubmenu"},"MenuSubmenu"))),a.createElement(r,{icon:"git-branch",index:"Changelog",disabled:!0},"Changelog"),a.createElement(c,{icon:"layout",index:"Layouts",title:"Layouts"},a.createElement(r,{index:"Slidenav"},"Slidenav"),a.createElement(r,{index:"Topnav"},"Topnav")),a.createElement(c,{icon:"file",index:"Empty submenu",title:"Empty submenu"})))}}]),m}(a.Component);return a.createElement(m,null)}}}});
//# sourceMappingURL=44.9f8d388.js.map