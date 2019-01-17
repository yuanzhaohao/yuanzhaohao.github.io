webpackJsonp([68],{CL4F:function(e,n,a){e.exports={code:'import { Calendar, Grid } from \'dashkit-ui\';\nconst { Col, Row } = Grid;\n\nfunction onChange(value) {\n  console.log(`value: ${value}`);\n}\n\nReactDOM.render(\n  <div>\n    <Row className="calendar-item">\n      <Col xs>\n        <p>Day Picker</p>\n        <Calendar onChange={onChange} />\n      </Col>\n      <Col xs>\n        <p>Week Picker</p>\n        <Calendar onChange={onChange} type="week" format="yyyy Wo" />\n      </Col>\n    </Row>\n    <Row className="calendar-item">\n      <Col xs>\n        <p>Month Picker</p>\n        <Calendar onChange={onChange} type="month" />\n      </Col>\n      <Col xs>\n        <p>Year Picker</p>\n        <Calendar onChange={onChange} type="year" />\n      </Col>\n    </Row>\n    <Row className="calendar-item">\n      <Col xs>\n        <p>Time Picker</p>\n        <Calendar onChange={onChange} type="time" />\n      </Col>\n      <Col xs>\n        <p>Datetime Picker</p>\n        <Calendar onChange={onChange} type="datetime" />\n      </Col>\n    </Row>\n    <Row className="calendar-item">\n      <Col xs>\n        <p>Range Picker</p>\n        <Calendar onChange={onChange} type="day" range />\n      </Col>\n    </Row>\n    <Row className="calendar-item">\n      <Col xs>\n        <Calendar onChange={onChange} type="datetime" range />\n      </Col>\n    </Row>\n  </div>,\n  mountNode\n);\n',meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本用法，可以用<code>defaultChecked</code>来定义checkbox默认的值。</p>\n","en-US":"<p>Use <code>defaultChecked</code> to define Checkbox's value.</p>\n"},__content:""},preview:function(){function e(e){console.log("value: "+e)}var n=a("GiK3"),t=(a("O27J"),a("qMEF")),l=t.Grid.Col,r=t.Grid.Row;return n.createElement("div",null,n.createElement(r,{className:"calendar-item"},n.createElement(l,{xs:!0},n.createElement("p",null,"Day Picker"),n.createElement(t.Calendar,{onChange:e})),n.createElement(l,{xs:!0},n.createElement("p",null,"Week Picker"),n.createElement(t.Calendar,{onChange:e,type:"week",format:"yyyy Wo"}))),n.createElement(r,{className:"calendar-item"},n.createElement(l,{xs:!0},n.createElement("p",null,"Month Picker"),n.createElement(t.Calendar,{onChange:e,type:"month"})),n.createElement(l,{xs:!0},n.createElement("p",null,"Year Picker"),n.createElement(t.Calendar,{onChange:e,type:"year"}))),n.createElement(r,{className:"calendar-item"},n.createElement(l,{xs:!0},n.createElement("p",null,"Time Picker"),n.createElement(t.Calendar,{onChange:e,type:"time"})),n.createElement(l,{xs:!0},n.createElement("p",null,"Datetime Picker"),n.createElement(t.Calendar,{onChange:e,type:"datetime"}))),n.createElement(r,{className:"calendar-item"},n.createElement(l,{xs:!0},n.createElement("p",null,"Range Picker"),n.createElement(t.Calendar,{onChange:e,type:"day",range:!0}))),n.createElement(r,{className:"calendar-item"},n.createElement(l,{xs:!0},n.createElement(t.Calendar,{onChange:e,type:"datetime",range:!0}))))}}}});
//# sourceMappingURL=68.c77ff35.js.map