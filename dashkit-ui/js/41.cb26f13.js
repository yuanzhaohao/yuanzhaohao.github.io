webpackJsonp([41],{KylI:function(e,n,t){e.exports={code:'import { Grid } from \'dashkit-ui\';\nconst { Row, Col } = Grid;\n\nReactDOM.render(\n  <div className="grid-alignment">\n    <h4 className="grid-title grid-title-first">.around-</h4>\n    <Row>\n      <Col xs={12}>\n        <div className="grid-box">\n          <Row around="xs">\n            <Col xs={2}>\n              <div className="grid-box grid-box-nested"></div>\n            </Col>\n            <Col xs={2}>\n              <div className="grid-box grid-box-nested"></div>\n            </Col>\n            <Col xs={2}>\n              <div className="grid-box grid-box-nested"></div>\n            </Col>\n          </Row>\n        </div>\n      </Col>\n    </Row>\n\n    <h4 className="grid-title grid-title-first">.between-</h4>\n    <Row>\n      <Col xs={12}>\n        <div className="grid-box">\n          <Row between="xs">\n            <Col xs={2}>\n              <div className="grid-box grid-box-nested"></div>\n            </Col>\n            <Col xs={2}>\n              <div className="grid-box grid-box-nested"></div>\n            </Col>\n            <Col xs={2}>\n              <div className="grid-box grid-box-nested"></div>\n            </Col>\n          </Row>\n        </div>\n      </Col>\n    </Row>\n\n  </div>,\n  mountNode\n);\n',meta:{order:6,title:{"zh-CN":"分布","en-US":"Distribution"},subtitle:{"zh-CN":"<p>可以使用<code>around</code> <code>between</code>, 将元素对齐到行开头或结尾以及列的顶部、底部或中心</p>\n","en-US":"<p>Use <code>around</code> <code>between</code> to distribute the contents of a row or column.</p>\n"},__content:""},preview:function(){var e=t("GiK3"),n=(t("O27J"),t("qMEF")),d=n.Grid.Row,i=n.Grid.Col;return e.createElement("div",{className:"grid-alignment"},e.createElement("h4",{className:"grid-title grid-title-first"},".around-"),e.createElement(d,null,e.createElement(i,{xs:12},e.createElement("div",{className:"grid-box"},e.createElement(d,{around:"xs"},e.createElement(i,{xs:2},e.createElement("div",{className:"grid-box grid-box-nested"})),e.createElement(i,{xs:2},e.createElement("div",{className:"grid-box grid-box-nested"})),e.createElement(i,{xs:2},e.createElement("div",{className:"grid-box grid-box-nested"})))))),e.createElement("h4",{className:"grid-title grid-title-first"},".between-"),e.createElement(d,null,e.createElement(i,{xs:12},e.createElement("div",{className:"grid-box"},e.createElement(d,{between:"xs"},e.createElement(i,{xs:2},e.createElement("div",{className:"grid-box grid-box-nested"})),e.createElement(i,{xs:2},e.createElement("div",{className:"grid-box grid-box-nested"})),e.createElement(i,{xs:2},e.createElement("div",{className:"grid-box grid-box-nested"})))))))}}}});
//# sourceMappingURL=41.cb26f13.js.map