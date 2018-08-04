webpackJsonp([1],{"4dK/":function(e,t,n){var r=n("u7lB");"string"==typeof r&&(r=[[e.i,r,""]]);var i={hmr:!0};i.transform=void 0,i.insertInto=void 0;n("MTIv")(r,i);r.locals&&(e.exports=r.locals)},Ajwm:function(e,t,n){"use strict";function r(e,t){function n(){a.aspect=e.clientWidth/e.clientHeight,c.setSize(e.clientWidth,e.clientHeight)}function r(){requestAnimationFrame(r),i()}function i(){var e=5e-4*Date.now();a.position.x=2.5*Math.sin(e),a.position.z=2.5*Math.cos(e),a.lookAt(o),c.render(s,a)}var a,o,s,c;!function(){a=new THREE.PerspectiveCamera(20,window.innerWidth/window.innerHeight,1,5),a.position.set(1,0,1),o=new THREE.Vector3(0,0,0),s=new THREE.Scene,s.background=new THREE.Color(16777215),s.fog=new THREE.Fog(16777215,0,15);var r=new THREE.Mesh(new THREE.PlaneBufferGeometry(40,40),new THREE.MeshPhongMaterial({color:16777215,specular:16777215}));r.rotation.x=-Math.PI/2,r.position.y=-.3,s.add(r),r.receiveShadow=!0,(new THREE.PLYLoader).load(t,function(e){e.computeVertexNormals();var t=new THREE.MeshStandardMaterial({color:16777215}),n=new THREE.Mesh(e,t);n.scale.multiplyScalar(4e-4),n.castShadow=!0,n.receiveShadow=!0,s.add(n)}),c=new THREE.WebGLRenderer({antialias:!0}),c.setPixelRatio(window.devicePixelRatio),c.setSize(window.innerWidth,window.innerHeight),e.appendChild(c.domElement),window.addEventListener("resize",n,!1)}(),r(),s.add(new THREE.HemisphereLight(16777215))}Object.defineProperty(t,"__esModule",{value:!0}),n("HVQN"),t.default=r},HVQN:function(e,t,n){"use strict";THREE.PLYLoader=function(e){this.manager=void 0!==e?e:THREE.DefaultLoadingManager,this.propertyNameMapping={}},THREE.PLYLoader.prototype={constructor:THREE.PLYLoader,load:function(e,t,n,r){var i=this,a=new THREE.FileLoader(this.manager);a.setResponseType("arraybuffer"),a.load(e,function(e){t(i.parse(e))},n,r)},setPropertyNameMapping:function(e){this.propertyNameMapping=e},parse:function(e){function t(e){var t=/ply([\s\S]*)end_header\s/,n="",r=0,i=t.exec(e);null!==i&&(n=i[1],r=i[0].length);for(var a,o,s,c={comments:[],elements:[],headerLength:r},u=n.split("\n"),p=0;p<u.length;p++){var d=u[p];if(""!==(d=d.trim()))switch(s=d.split(/\s+/),o=s.shift(),d=s.join(" "),o){case"format":c.format=s[0],c.version=s[1];break;case"comment":c.comments.push(d);break;case"element":void 0!==a&&c.elements.push(a),a={},a.name=s[0],a.count=parseInt(s[1]),a.properties=[];break;case"property":a.properties.push(function(e,t){var n={type:e[0]};return"list"===n.type?(n.name=e[3],n.countType=e[1],n.itemType=e[2]):n.name=e[1],n.name in t&&(n.name=t[n.name]),n}(s,l.propertyNameMapping));break;default:console.log("unhandled",o,s)}}return void 0!==a&&c.elements.push(a),c}function n(e,t){switch(t){case"char":case"uchar":case"short":case"ushort":case"int":case"uint":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":return parseInt(e);case"float":case"double":case"float32":case"float64":return parseFloat(e)}}function r(e,t){for(var r=t.split(/\s+/),i={},a=0;a<e.length;a++)if("list"===e[a].type){for(var o=[],s=n(r.shift(),e[a].countType),c=0;c<s;c++)o.push(n(r.shift(),e[a].itemType));i[e[a].name]=o}else i[e[a].name]=n(r.shift(),e[a].type);return i}function i(e,t){var n,i={indices:[],vertices:[],normals:[],uvs:[],colors:[]},s=/end_header\s([\s\S]*)$/,c="";null!==(n=s.exec(e))&&(c=n[1]);for(var u=c.split("\n"),l=0,p=0,d=0;d<u.length;d++){var f=u[d];if(""!==(f=f.trim())){p>=t.elements[l].count&&(l++,p=0);var h=r(t.elements[l].properties,f);o(i,t.elements[l].name,h),p++}}return a(i)}function a(e){var t=new THREE.BufferGeometry;return e.indices.length>0&&t.setIndex(e.indices),t.addAttribute("position",new THREE.Float32BufferAttribute(e.vertices,3)),e.normals.length>0&&t.addAttribute("normal",new THREE.Float32BufferAttribute(e.normals,3)),e.uvs.length>0&&t.addAttribute("uv",new THREE.Float32BufferAttribute(e.uvs,2)),e.colors.length>0&&t.addAttribute("color",new THREE.Float32BufferAttribute(e.colors,3)),t.computeBoundingSphere(),t}function o(e,t,n){if("vertex"===t)e.vertices.push(n.x,n.y,n.z),"nx"in n&&"ny"in n&&"nz"in n&&e.normals.push(n.nx,n.ny,n.nz),"s"in n&&"t"in n&&e.uvs.push(n.s,n.t),"red"in n&&"green"in n&&"blue"in n&&e.colors.push(n.red/255,n.green/255,n.blue/255);else if("face"===t){var r=n.vertex_indices||n.vertex_index;3===r.length?e.indices.push(r[0],r[1],r[2]):4===r.length&&(e.indices.push(r[0],r[1],r[3]),e.indices.push(r[1],r[2],r[3]))}}function s(e,t,n,r){switch(n){case"int8":case"char":return[e.getInt8(t),1];case"uint8":case"uchar":return[e.getUint8(t),1];case"int16":case"short":return[e.getInt16(t,r),2];case"uint16":case"ushort":return[e.getUint16(t,r),2];case"int32":case"int":return[e.getInt32(t,r),4];case"uint32":case"uint":return[e.getUint32(t,r),4];case"float32":case"float":return[e.getFloat32(t,r),4];case"float64":case"double":return[e.getFloat64(t,r),8]}}function c(e,t,n,r){for(var i,a={},o=0,c=0;c<n.length;c++)if("list"===n[c].type){var u=[];i=s(e,t+o,n[c].countType,r);var l=i[0];o+=i[1];for(var p=0;p<l;p++)i=s(e,t+o,n[c].itemType,r),u.push(i[0]),o+=i[1];a[n[c].name]=u}else i=s(e,t+o,n[c].type,r),a[n[c].name]=i[0],o+=i[1];return[a,o]}var u,l=this;if(e instanceof ArrayBuffer){var p=THREE.LoaderUtils.decodeText(new Uint8Array(e)),d=t(p);u="ascii"===d.format?i(p,d):function(e,t){for(var n,r={indices:[],vertices:[],normals:[],uvs:[],colors:[]},i="binary_little_endian"===t.format,s=new DataView(e,t.headerLength),u=0,l=0;l<t.elements.length;l++)for(var p=0;p<t.elements[l].count;p++){n=c(s,u,t.elements[l].properties,i),u+=n[1];var d=n[0];o(r,t.elements[l].name,d)}return a(r)}(e,d)}else u=i(e,t(e));return u}}},UpER:function(e,t,n){"use strict";function r(e){return e.index}Object.defineProperty(t,"__esModule",{value:!0});var i=n("4dK/"),a=(n.n(i),n("GiK3")),o=(n.n(a),n("RH2O")),s=n("Ajwm"),c=n.n(s),u=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),l={},p=function(e){function t(t){var n=e.call(this,t)||this;return n.threeApp=0,n}return u(t,e),t.prototype.componentDidMount=function(){this.threeApp=new c.a(this.refs["three-canvas"],"./static/Lucy100k.ply")},t.prototype.render=function(){return a.createElement("div",{className:"index-container"},a.createElement("div",{className:"index-inner",ref:"three-canvas"}))},t}(a.Component);t.default=Object(o.b)(r,l)(p)},u7lB:function(e,t,n){t=e.exports=n("FZ+f")(!1),t.push([e.i,'.index-container {\n  width: 100%;\n}\n.index-inner {\n  width: 100vw;\n  height: 100vh;\n  background-color: #fff;\n  overflow: hidden;\n}[data-rem="true"] .index-inner {\n  width: 10rem\n}\n',""])}});
//# sourceMappingURL=1.17a2dfe.js.map