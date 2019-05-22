(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [4],
  {
    103: function(n, t, e) {
      'use strict';
      e.r(t);
      var r = e(0);
      var o = e.n(r);
      var i =
        (undefined && undefined.__extends) ||
        (function() {
          var r = function(n, t) {
            r =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(n, t) {
                  n.__proto__ = t;
                }) ||
              function(n, t) {
                for (var e in t) if (t.hasOwnProperty(e)) n[e] = t[e];
              };
            return r(n, t);
          };
          return function(n, t) {
            r(n, t);
            function e() {
              this.constructor = n;
            }
            n.prototype = t === null ? Object.create(t) : ((e.prototype = t.prototype), new e());
          };
        })();
      var u = (function(n) {
        i(t, n);
        function t() {
          return (n !== null && n.apply(this, arguments)) || this;
        }
        t.prototype.render = function() {
          return r['createElement'](
            'div',
            { className: 'list-container' },
            r['createElement']('h1', null, "Yzh's Blog"),
          );
        };
        return t;
      })(r['Component']);
      t['default'] = u;
    },
  },
]);
