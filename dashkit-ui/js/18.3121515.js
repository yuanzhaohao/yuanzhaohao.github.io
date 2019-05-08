webpackJsonp([18,90,91],{"8BA9":function(e,a,n){e.exports={code:'import { Card } from \'dashkit-ui\';\nconst cardStyle = {\n  width: 240,\n};\n\nconst collapseStyle = {\n  marginTop: 20,\n};\n\nconst Demo = () => (\n  <div>\n    <Card style={cardStyle} collapse={true}>\n      <Card.Header>Header</Card.Header>\n      <Card.Body>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</Card.Body>\n    </Card>\n\n    <Card.Collapse style={collapseStyle} defaultActiveIndexs={[\'1\']}>\n      <Card index="1">\n        <Card.Header>This is header 1</Card.Header>\n        <Card.Body>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</Card.Body>\n      </Card>\n      <Card index="2">\n        <Card.Header>This is header 1</Card.Header>\n        <Card.Body>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</Card.Body>\n      </Card>\n      <Card index="3">\n        <Card.Header>This is header 3</Card.Header>\n        <Card.Body>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</Card.Body>\n      </Card>\n    </Card.Collapse>\n  </div>\n);\n\nReactDOM.render(\n  <Demo />,\n  mountNode\n);\n',meta:{order:1,title:{"zh-CN":"基本","en-US":"Collapse"},subtitle:{"zh-CN":"<p>基本用法。</p>\n","en-US":"<p>Basic usage.</p>\n"},__content:""},preview:function(){var e=n("GiK3"),a=(n("O27J"),n("qMEF")),t={width:240},d={marginTop:20},r=function(){return e.createElement("div",null,e.createElement(a.Card,{style:t,collapse:!0},e.createElement(a.Card.Header,null,"Header"),e.createElement(a.Card.Body,null,"A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.")),e.createElement(a.Card.Collapse,{style:d,defaultActiveIndexs:["1"]},e.createElement(a.Card,{index:"1"},e.createElement(a.Card.Header,null,"This is header 1"),e.createElement(a.Card.Body,null,"A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.")),e.createElement(a.Card,{index:"2"},e.createElement(a.Card.Header,null,"This is header 1"),e.createElement(a.Card.Body,null,"A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.")),e.createElement(a.Card,{index:"3"},e.createElement(a.Card.Header,null,"This is header 3"),e.createElement(a.Card.Body,null,"A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."))))};return e.createElement(r,null)}}},exPU:function(e,a,n){e.exports={markdown:'<h1>Card</h1>\n<p>The card is composed of three components: Header, Body, and Footer. It can be combined or used separately.</p>\n<div id="demos"></div>\n<h2>API</h2>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n',demos:{basic:n("h4cH"),collapse:n("8BA9")}}},h4cH:function(e,a,n){e.exports={code:"import { Card } from 'dashkit-ui';\n\nconst cardStyle = {\n  width: 240,\n  height: 300,\n  display: 'inline-flex',\n  marginRight: 20,\n};\nconst gray = { background: '#f7f7f7' };\n\nconst Demo = () => (\n  <div>\n    <Card style={cardStyle}>\n      <Card.Header>Header</Card.Header>\n      <Card.Body>Body</Card.Body>\n      <Card.Footer>Footer</Card.Footer>\n    </Card>\n\n    <Card style={cardStyle}>\n      <Card.Header style={gray}>Header</Card.Header>\n      <Card.Body>Body</Card.Body>\n      <Card.Footer style={gray}>Footer</Card.Footer>\n    </Card>\n  </div>\n);\n\nReactDOM.render(\n  <Demo />,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本用法。</p>\n","en-US":"<p>Basic usage.</p>\n"},__content:""},preview:function(){var e=n("GiK3"),a=(n("O27J"),n("qMEF")),t={width:240,height:300,display:"inline-flex",marginRight:20},d={background:"#f7f7f7"},r=function(){return e.createElement("div",null,e.createElement(a.Card,{style:t},e.createElement(a.Card.Header,null,"Header"),e.createElement(a.Card.Body,null,"Body"),e.createElement(a.Card.Footer,null,"Footer")),e.createElement(a.Card,{style:t},e.createElement(a.Card.Header,{style:d},"Header"),e.createElement(a.Card.Body,null,"Body"),e.createElement(a.Card.Footer,{style:d},"Footer")))};return e.createElement(r,null)}}}});
//# sourceMappingURL=18.3121515.js.map