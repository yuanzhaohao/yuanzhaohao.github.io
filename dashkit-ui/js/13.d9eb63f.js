webpackJsonp([13,18,71],{CL4F:function(e,n,t){e.exports={code:'import { Calendar, Grid } from \'dashkit-ui\';\nconst { Col, Row } = Grid;\n\nfunction onChange(value) {\n  console.log(`value: ${value}`);\n}\n\nReactDOM.render(\n  <div>\n    <Row className="calendar-item">\n      <Col xs>\n        <p>Day Picker</p>\n        <Calendar onChange={onChange} />\n      </Col>\n      <Col xs>\n        <p>Week Picker</p>\n        <Calendar onChange={onChange} type="week" format="yyyy Wo" />\n      </Col>\n    </Row>\n    <Row className="calendar-item">\n      <Col xs>\n        <p>Month Picker</p>\n        <Calendar onChange={onChange} type="month" />\n      </Col>\n      <Col xs>\n        <p>Year Picker</p>\n        <Calendar onChange={onChange} type="year" />\n      </Col>\n    </Row>\n    <Row className="calendar-item">\n      <Col xs>\n        <p>Time Picker</p>\n        <Calendar onChange={onChange} type="time" />\n      </Col>\n      <Col xs>\n        <p>Datetime Picker</p>\n        <Calendar onChange={onChange} type="datetime" />\n      </Col>\n    </Row>\n    <Row className="calendar-item">\n      <Col xs>\n        <p>Range Picker</p>\n        <Calendar onChange={onChange} type="day" range />\n      </Col>\n    </Row>\n    <Row className="calendar-item">\n      <Col xs>\n        <Calendar onChange={onChange} type="datetime" range />\n      </Col>\n    </Row>\n  </div>,\n  mountNode\n);\n',meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本用法，可以用<code>defaultChecked</code>来定义checkbox默认的值。</p>\n","en-US":"<p>Use <code>defaultChecked</code> to define Checkbox's value.</p>\n"},__content:""},preview:function(){function e(e){console.log("value: "+e)}var n=t("GiK3"),r=(t("O27J"),t("qMEF")),a=r.Grid.Col,o=r.Grid.Row;return n.createElement("div",null,n.createElement(o,{className:"calendar-item"},n.createElement(a,{xs:!0},n.createElement("p",null,"Day Picker"),n.createElement(r.Calendar,{onChange:e})),n.createElement(a,{xs:!0},n.createElement("p",null,"Week Picker"),n.createElement(r.Calendar,{onChange:e,type:"week",format:"yyyy Wo"}))),n.createElement(o,{className:"calendar-item"},n.createElement(a,{xs:!0},n.createElement("p",null,"Month Picker"),n.createElement(r.Calendar,{onChange:e,type:"month"})),n.createElement(a,{xs:!0},n.createElement("p",null,"Year Picker"),n.createElement(r.Calendar,{onChange:e,type:"year"}))),n.createElement(o,{className:"calendar-item"},n.createElement(a,{xs:!0},n.createElement("p",null,"Time Picker"),n.createElement(r.Calendar,{onChange:e,type:"time"})),n.createElement(a,{xs:!0},n.createElement("p",null,"Datetime Picker"),n.createElement(r.Calendar,{onChange:e,type:"datetime"}))),n.createElement(o,{className:"calendar-item"},n.createElement(a,{xs:!0},n.createElement("p",null,"Range Picker"),n.createElement(r.Calendar,{onChange:e,type:"day",range:!0}))),n.createElement(o,{className:"calendar-item"},n.createElement(a,{xs:!0},n.createElement(r.Calendar,{onChange:e,type:"datetime",range:!0}))))}}},KjkI:function(e,n,t){e.exports={code:"import { Calendar } from 'dashkit-ui';\nimport { addDays, addMonths } from 'dashkit-ui/Calendar/utils';\n\nfunction onChange(value) {\n  console.log(`value: ${value}`);\n}\n\nfunction getMaxDate() {\n  const date = new Date();\n  date.setHours(23, 59, 59, 999);\n  return addDays(date, 1);\n}\n\nfunction getMinDate() {\n  const date = new Date();\n  return addMonths(date, -6);\n}\n\nclass Demo extends React.Component {\n  render() {\n    return (\n      <Calendar onChange={onChange} min={getMinDate()} max={getMaxDate()} type=\"datetime\" range />\n    );\n  }\n}\n\nReactDOM.render(\n  <Demo />,\n  mountNode\n);\n",meta:{order:2,title:{"zh-CN":"时间限制","en-US":"Minimum / Maximum"},subtitle:{"zh-CN":"<p>使用<code>min</code>和<code>max</code>能实现时间的控制。</p>\n","en-US":"<p>The <code>min</code> and <code>max</code> properties can help you to limit the time.</p>\n"},__content:""},preview:function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function r(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}function a(e){console.log("value: "+e)}function o(){var e=new Date;return e.setHours(23,59,59,999),(0,d.addDays)(e,1)}function u(){var e=new Date;return(0,d.addMonths)(e,-6)}var i=t("GiK3"),l=(t("O27J"),function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}()),c=t("qMEF"),d=t("a0eM"),s=function(t){function d(){return e(this,d),n(this,(d.__proto__||Object.getPrototypeOf(d)).apply(this,arguments))}return r(d,t),l(d,[{key:"render",value:function(){return i.createElement(c.Calendar,{onChange:a,min:u(),max:o(),type:"datetime",range:!0})}}]),d}(i.Component);return i.createElement(s,null)}}},a0eM:function(e,n,t){"use strict";function r(e,n){for(var t=[],r=0,a=e.length;r<a;r++)t.push(e[r].substr(0,n));return t}function a(e){var n=["th","st","nd","rd"],t=e%100;return e+(n[(t-20)%10]||n[t]||n[0])}function o(e,n){void 0===n&&(n=2);for(var t=String(e);t.length<n;)t="0"+e;return t}function u(e){if(arguments.length<1)throw new TypeError("1 argument required, but only "+arguments.length+" present");return e instanceof Date?new Date(e.getTime()):"number"==typeof e?new Date(e):"string"==typeof e?new Date(e):new Date(NaN)}function i(e,n){n=Number(n);var t=u(e);return t.setDate(t.getDate()+n),t}function l(e,n){n=Number(n);var t=u(e),r=t.getMonth()+n,a=new Date(0);a.setFullYear(t.getFullYear(),r,1),a.setHours(0,0,0,0);var o=M(a);return t.setMonth(r,Math.min(o,t.getDate())),t}function c(e,n){return n=Number(n),l(e,12*n)}function d(e){var n=u(e),t=n.getDay(),r=6-t;return n.setDate(n.getDate()+r),n.setHours(23,59,59,999),n}function s(e){var n=u(e),t=n.getMonth();return n.setFullYear(n.getFullYear(),t+1,0),n.setHours(23,59,59,999),n}function m(e){var n=u(e);return n.setHours(0,0,0,0),n}function h(e){var n=u(e);return n.setDate(1),n.setHours(0,0,0,0),n}function f(e){var n=u(e),t=n.getDay(),r=t;return n.setDate(n.getDate()-r),n.setHours(0,0,0,0),n}function g(e){return null!==e&&void 0!==e&&(!isNaN(new Date(e).getTime())&&!Array.isArray(e))}function y(e,n){if(arguments.length<2)throw new TypeError("2 arguments required, but only "+arguments.length+" present");var t=m(e),r=m(n);return t.getTime()===r.getTime()}function p(e,n){if(arguments.length<2)throw new TypeError("2 arguments required, but only "+arguments.length+" present");var t=f(e),r=f(n);return t.getTime()===r.getTime()}function C(e,n){if(arguments.length<2)throw new TypeError("2 arguments required, but only "+arguments.length+" present");var t=u(e),r=u(n);return t.getFullYear()===r.getFullYear()&&t.getMonth()===r.getMonth()}function D(e,n){if(arguments.length<2)throw new TypeError("2 arguments required, but only "+arguments.length+" present");var t=u(e),r=u(n);return t.getFullYear()===r.getFullYear()}function v(e,n){if(arguments.length<2)throw new TypeError("2 arguments required, but only "+arguments.length+" present");var t=u(e),r=u(n),a=t.getTime()-r.getTime();return a<0?-1:a>0?1:a}function M(e){var n=u(e),t=n.getFullYear(),r=n.getMonth(),a=new Date(0);return a.setFullYear(t,r+1,0),a.setHours(0,0,0,0),a.getDate()}function w(e){var n=u(e);n.setHours(0,0,0,0),n.setDate(n.getDate()+3-(n.getDay()+6)%7);var t=new Date(n.getFullYear(),0,4);return 1+Math.round(((n.getTime()-t.getTime())/864e5-3+(t.getDay()+6)%7)/7)}function b(e){return l(e,-1)}function E(e){return l(e,1)}function k(e){return l(e,-12)}function S(e){return l(e,12)}function F(e){var n=u(e),t=d(s(n)),r=f(h(n));r.setHours(n.getHours()),r.setMinutes(n.getMinutes()),r.setSeconds(n.getSeconds());for(var a=[];r.getTime()<t.getTime();)a.push(r),r=i(r,1);return a}function x(e,n){if(arguments.length<2)throw new TypeError("2 argument required, but only "+arguments.length+" present");var t=u(e),r=[];return n=n.replace(R,function(e,n){return r.push(n),"??"}),n=n.replace(H,function(e){return e in G?G[e](t):e.slice(1,e.length-1)}),n.replace(/\?\?/g,function(){return r.shift()})}function T(e,n){if(arguments.length<2)throw new TypeError("2 argument required, but only "+arguments.length+" present");e=String(e),n=String(n);var t={},r=!0;if(n.replace(H,function(n){if(J[n]){var a=J[n],o=e.search(a[0]);~o?e.replace(a[0],function(n){return"function"==typeof a[1]&&a[1](t,n),e=e.substr(o+n.length),n}):r=!1}return J[n]?"":n.slice(1,n.length-1)}),!r)return u(n);var a=new Date;!0===t.isPm&&null!=t.hour&&12!=+t.hour?t.hour=+t.hour+12:!1===t.isPm&&12==+t.hour&&(t.hour=0);var o;return null!=t.timezoneOffset?(t.minute=+(t.minute||0)-+t.timezoneOffset,o=new Date(Date.UTC(t.year||a.getFullYear(),t.month||0,t.day||1,t.hour||0,t.minute||0,t.second||0,t.millisecond||0))):o=new Date(t.year||a.getFullYear(),t.month||0,t.day||1,t.hour||0,t.minute||0,t.second||0,t.millisecond||0),o}Object.defineProperty(n,"__esModule",{value:!0}),t.d(n,"weekdayValues",function(){return A}),t.d(n,"monthValues",function(){return j}),t.d(n,"allPlaceholders",function(){return z}),t.d(n,"allFormats",function(){return U}),n.shorten=r,n.getDaySuffix=a,n.pad=o,n.toDate=u,n.addDays=i,n.addMonths=l,n.addYears=c,n.endOfWeek=d,n.endOfMonth=s,n.startOfDay=m,n.startOfMonth=h,n.startOfWeek=f,n.isDate=g,n.isSameDay=y,n.isSameWeek=p,n.isSameMonth=C,n.isSameYear=D,n.compareAsc=v,n.getDayNumberOfMouth=M,n.getWeekNumberOfYear=w,n.prevMonth=b,n.nextMonth=E,n.prevYear=k,n.nextYear=S,n.getDaysOfMonth=F,n.formatDate=x,n.parseDate=T;var H=/d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|WW|Wo|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,N=/\d\d?/,P=/\d{3}/,O=/\d{4}/,Y=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,R=/\[([^]*?)\]/gm,W=["am","pm"],_=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],q=["January","February","March","April","May","June","July","August","September","October","November","December"],A={short:r(_,3),long:_},j={short:r(q,3),long:q},z={day:"Select date",time:"Select time",week:"Select week",month:"Select month",year:"Select year",datetime:"Select Datetime",range:{day:["Start day","End day"],time:["Start time","End time"],week:["Start week","End week"],month:["Start month","End month"],year:["Start year","End year"],datetime:["Start time","End time"]}},U={day:"yyyy-MM-dd",time:"HH:mm:ss",week:"yyyy WW",month:"yyyy-MM",year:"yyyy",datetime:"yyyy-MM-dd HH:mm:ss"},G={D:function(e){return e.getDay()},DD:function(e){return o(e.getDay())},Do:function(e){return a(e.getDate())},d:function(e){return e.getDate()},dd:function(e){return o(e.getDate())},M:function(e){return e.getMonth()+1},MM:function(e){return o(e.getMonth()+1)},yy:function(e){return String(e.getFullYear()).substr(2)},yyyy:function(e){return e.getFullYear()},h:function(e){return e.getHours()%12||12},hh:function(e){return o(e.getHours()%12||12)},H:function(e){return e.getHours()},HH:function(e){return o(e.getHours())},m:function(e){return e.getMinutes()},mm:function(e){return o(e.getMinutes())},s:function(e){return e.getSeconds()},ss:function(e){return o(e.getSeconds())},S:function(e){return Math.round(e.getMilliseconds()/100)},SS:function(e){return o(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return o(e.getMilliseconds(),3)},a:function(e){return e.getHours()<12?W[0]:W[1]},A:function(e){return e.getHours()<12?W[0].toUpperCase():W[1].toUpperCase()},WW:function(e){return o(w(e))},Wo:function(e){return a(w(e))},ZZ:function(e){var n=e.getTimezoneOffset();return(n>0?"-":"+")+o(100*Math.floor(Math.abs(n)/60)+Math.abs(n)%60,4)}},J={d:[N,function(e,n){e.day=n}],M:[N,function(e,n){e.month=n-1}],h:[N,function(e,n){e.hour=n}],m:[N,function(e,n){e.minute=n}],s:[N,function(e,n){e.second=n}],yy:[N,function(e,n){var t=new Date,r=+(""+t.getFullYear()).substr(0,2);e.year=""+(n>68?r-1:r)+n}],yyyy:[O,function(e,n){e.year=n}],S:[/\d/,function(e,n){e.millisecond=100*n}],SS:[/\d{2}/,function(e,n){e.millisecond=10*n}],SSS:[P,function(e,n){e.millisecond=n}],D:[N],ddd:[Y],a:[Y,function(e,n){var t=n.toLowerCase();t===W[0]?e.isPm=!1:t===W[1]&&(e.isPm=!0)}],ZZ:[/[\+\-]\d\d:?\d\d/,function(e,n){var t=(n+"").match(/([\+\-]|\d\d)/gi);if(t&&t[1]){var r=60*t[1]+parseInt(t[2],10);e.timezoneOffset="+"===t[0]?r:-r}}]};J.DD=J.D,J.Do=J.dd=J.d,J.mm=J.m,J.hh=J.H=J.HH=J.h,J.MM=J.M,J.ss=J.s,J.A=J.a},vPy1:function(e,n,t){e.exports={markdown:'<h1>Calendar</h1>\n<p>To select or input a date.</p>\n<div id="demos"></div>\n<h2>API</h2>\n<h3>Calendar</h3>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>style</td>\n<td>style of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>disabled</td>\n<td>disable the checkbox</td>\n<td>boolean</td>\n<td>false</td>\n</tr>\n<tr>\n<td>checked</td>\n<td>value of checkbox</td>\n<td>boolean</td>\n<td>-</td>\n</tr>\n<tr>\n<td>defaultChecked</td>\n<td>default value</td>\n<td>boolean</td>\n<td>-</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>change</code> event handler</td>\n<td><code>(event: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void</code></td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n',demos:{basic:t("CL4F"),"min-max":t("KjkI")}}}});
//# sourceMappingURL=13.d9eb63f.js.map