webpackJsonp([17,27,28],{cKAV:function(e,n,t){e.exports={code:"import { Table } from 'dashkit-ui';\n\nconst columns = [\n  {\n    title: 'Date',\n    dataIndex: 'date',\n    width: 120\n  },\n  {\n    title: 'Name',\n    dataIndex: 'name',\n    width: 100\n  },\n  {\n    title: 'Address',\n    dataIndex: 'address'\n  }\n];\n\nconst dataSource = [{\n  date: '2016-05-03',\n  name: 'Tom',\n  address: 'No. 189, Grove St, Los Angeles'\n}, {\n  date: '2016-05-02',\n  name: 'Tom',\n  address: 'No. 189, Grove St, Los Angeles'\n}, {\n  date: '2016-05-04',\n  name: 'Tom',\n  address: 'No. 189, Grove St, Los Angeles'\n}, {\n  date: '2016-05-01',\n  name: 'Tom',\n  address: 'No. 189, Grove St, Los Angeles'\n}];\n\n\nReactDOM.render(\n  <Table columns={columns} dataSource={dataSource} />,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本的使用。</p>\n","en-US":"<p>The most basic usage.</p>\n"},__content:""},preview:function(){var e=t("GiK3"),n=(t("O27J"),t("qMEF")),d=[{title:"Date",dataIndex:"date",width:120},{title:"Name",dataIndex:"name",width:100},{title:"Address",dataIndex:"address"}],a=[{date:"2016-05-03",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-02",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-04",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-01",name:"Tom",address:"No. 189, Grove St, Los Angeles"}];return e.createElement(n.Table,{columns:d,dataSource:a})}}},mybs:function(e,n,t){e.exports={code:"import { Table } from 'dashkit-ui';\n\nconst columns = [\n  {\n    title: 'Date',\n    dataIndex: 'date',\n    width: 120\n  },\n  {\n    title: 'Name',\n    dataIndex: 'name',\n    width: 100\n  },\n  {\n    title: 'Address',\n    dataIndex: 'address'\n  }\n];\n\nconst dataSource = [\n  {\n    date: '2016-05-03',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  },\n  {\n    date: '2016-05-02',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  },\n  {\n    date: '2016-05-04',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  },\n  {\n    date: '2016-05-01',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  },\n  {\n    date: '2016-05-03',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  },\n  {\n    date: '2016-05-02',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  },\n  {\n    date: '2016-05-04',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  },\n  {\n    date: '2016-05-01',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  },\n  {\n    date: '2016-05-03',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  },\n  {\n    date: '2016-05-02',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  },\n  {\n    date: '2016-05-04',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  },\n  {\n    date: '2016-05-01',\n    name: 'Tom',\n    address: 'No. 189, Grove St, Los Angeles'\n  }\n];\n\n\nReactDOM.render(\n  <Table\n    columns={columns}\n    dataSource={dataSource}\n    fixed\n    scroll={{\n      y: 250,\n    }}\n  />,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本的使用。</p>\n","en-US":"<p>The most basic usage.</p>\n"},__content:""},preview:function(){var e=t("GiK3"),n=(t("O27J"),t("qMEF")),d=[{title:"Date",dataIndex:"date",width:120},{title:"Name",dataIndex:"name",width:100},{title:"Address",dataIndex:"address"}],a=[{date:"2016-05-03",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-02",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-04",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-01",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-03",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-02",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-04",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-01",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-03",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-02",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-04",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-01",name:"Tom",address:"No. 189, Grove St, Los Angeles"}];return e.createElement(n.Table,{columns:d,dataSource:a,fixed:!0,scroll:{y:250}})}}},naUc:function(e,n,t){e.exports={markdown:'<h1>Table</h1>\n<p>A table displays rows of data.</p>\n<div id="demos"></div>\n<h2>API</h2>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>total</td>\n<td>total number of pages</td>\n<td>number</td>\n<td>0</td>\n</tr>\n<tr>\n<td>current</td>\n<td>current page</td>\n<td>number</td>\n<td>1</td>\n</tr>\n<tr>\n<td>pageSize</td>\n<td>number of each page</td>\n<td>number</td>\n<td>20</td>\n</tr>\n<tr>\n<td>range</td>\n<td>number of display pages</td>\n<td>number</td>\n<td>7</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>change</code> event handler</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n',demos:{basic:t("cKAV"),fixed:t("mybs")}}}});
//# sourceMappingURL=17.0cf9421.js.map