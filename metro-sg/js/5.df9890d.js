(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [5],
  {
    157: function(n, t, e) {
      var r = e(158);
      if (typeof r === 'string') r = [[n.i, r, '']];
      var o;
      var i;
      var a = { hmr: true };
      a.transform = o;
      a.insertInto = undefined;
      var s = e(8)(r, a);
      if (r.locals) n.exports = r.locals;
      if (false) {
      }
    },
    158: function(n, t, e) {
      t = n.exports = e(7)(false);
      t.push([
        n.i,
        '.index-container {\n  position: absolute;\n  top: 80px;\n  left: 50%;\n  width: 360px;\n  -webkit-transform: translate3d(-50%, 0, 0);\n          transform: translate3d(-50%, 0, 0); }\n\n.search-panel {\n  width: 100%;\n  padding: 24px;\n  border: 1px solid #d2ddec;\n  background-color: #fff;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border-radius: 5px; }\n\n.search-station-reverse {\n  width: 24px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  .search-station-reverse-icon {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    cursor: pointer;\n    width: 24px;\n    height: 24px;\n    color: #6c757d;\n    -webkit-transition: color 300ms ease;\n    transition: color 300ms ease; }\n    .search-station-reverse-icon:hover {\n      color: #2c7be5; }\n  .search-station-reverse-down, .search-station-reverse-up {\n    font-size: 16px; }\n  .search-station-reverse-up {\n    margin-top: -5px; }\n  .search-station-reverse-down {\n    margin-top: 5px;\n    margin-left: -10px; }\n\n.search-station-select {\n  width: 100%; }\n  .search-station-select .prefix-from {\n    color: #2c7be5; }\n  .search-station-select .prefix-to {\n    color: #e63757; }\n\n.search-btn {\n  width: 100%;\n  margin-top: 24px;\n  padding: 0 48px; }\n\n.from-station,\n.to-station {\n  width: 100%; }\n\n.to-station {\n  margin-top: 16px; }\n\n.route-panel {\n  width: 100%;\n  margin-top: 10px;\n  padding: 24px;\n  border: 1px solid #d2ddec;\n  background-color: #fff;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n\n@media only screen and (min-width: 320px) and (max-width: 568px) {\n  .index-container {\n    width: 100%;\n    top: 0;\n    padding: 0; }\n  .search-panel,\n  .route-panel {\n    border: 0; } }\n',
        '',
      ]);
    },
    159: function(n, t, e) {
      'use strict';
      e.r(t);
      var r = {};
      e.r(r);
      e.d(r, 'fetchStationData', function() {
        return g;
      });
      e.d(r, 'getMetroRoutes', function() {
        return _;
      });
      e.d(r, 'updateStation', function() {
        return O;
      });
      var i = e(0);
      var a = e(69);
      var o = e(44);
      var s = e(43);
      var c = e(75);
      var u = e.n(c);
      function f(n) {
        return n;
      }
      var l = u.a.create({ xsrfCookieName: 'csrfToken', xsrfHeaderName: 'x-csrf-token' });
      function p(n) {
        return l.get(n).then(function n(t) {
          return t.data;
        });
      }
      var d = e(31);
      var h = f(function() {
        return { type: d['a'].FETCH_STATION_DATA };
      });
      var v = f(function(n) {
        return { type: d['a'].FETCH_STATION_DATA_FULFILLED, data: n };
      });
      var b = f(function() {
        return { type: d['a'].FETCH_STATION_DATA_REJECTED };
      });
      var y = f(function(n, t) {
        return { type: d['a'].GET_METRO_ROUTES, from: n, to: t };
      });
      var m = f(function(n, t) {
        return { type: d['a'].UPDATE_STATION, station: n, key: t };
      });
      var x =
        (undefined && undefined.__awaiter) ||
        function(i, a, s, c) {
          return new (s || (s = Promise))(function(n, t) {
            function e(n) {
              try {
                o(c.next(n));
              } catch (n) {
                t(n);
              }
            }
            function r(n) {
              try {
                o(c['throw'](n));
              } catch (n) {
                t(n);
              }
            }
            function o(t) {
              t.done
                ? n(t.value)
                : new s(function(n) {
                    n(t.value);
                  }).then(e, r);
            }
            o((c = c.apply(i, a || [])).next());
          });
        };
      var w =
        (undefined && undefined.__generator) ||
        function(n, e) {
          var r = {
              label: 0,
              sent: function() {
                if (a[0] & 1) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            },
            o,
            i,
            a,
            t;
          return (
            (t = { next: s(0), throw: s(1), return: s(2) }),
            typeof Symbol === 'function' &&
              (t[Symbol.iterator] = function() {
                return this;
              }),
            t
          );
          function s(t) {
            return function(n) {
              return c([t, n]);
            };
          }
          function c(t) {
            if (o) throw new TypeError('Generator is already executing.');
            while (r)
              try {
                if (
                  ((o = 1),
                  i &&
                    (a =
                      t[0] & 2
                        ? i['return']
                        : t[0]
                        ? i['throw'] || ((a = i['return']) && a.call(i), 0)
                        : i.next) &&
                    !(a = a.call(i, t[1])).done)
                )
                  return a;
                if (((i = 0), a)) t = [t[0] & 2, a.value];
                switch (t[0]) {
                  case 0:
                  case 1:
                    a = t;
                    break;
                  case 4:
                    r.label++;
                    return { value: t[1], done: false };
                  case 5:
                    r.label++;
                    i = t[1];
                    t = [0];
                    continue;
                  case 7:
                    t = r.ops.pop();
                    r.trys.pop();
                    continue;
                  default:
                    if (
                      !((a = r.trys), (a = a.length > 0 && a[a.length - 1])) &&
                      (t[0] === 6 || t[0] === 2)
                    ) {
                      r = 0;
                      continue;
                    }
                    if (t[0] === 3 && (!a || (t[1] > a[0] && t[1] < a[3]))) {
                      r.label = t[1];
                      break;
                    }
                    if (t[0] === 6 && r.label < a[1]) {
                      r.label = a[1];
                      a = t;
                      break;
                    }
                    if (a && r.label < a[2]) {
                      r.label = a[2];
                      r.ops.push(t);
                      break;
                    }
                    if (a[2]) r.ops.pop();
                    r.trys.pop();
                    continue;
                }
                t = e.call(n, r);
              } catch (n) {
                t = [6, n];
                i = 0;
              } finally {
                o = a = 0;
              }
            if (t[0] & 5) throw t[1];
            return { value: t[0] ? t[1] : void 0, done: true };
          }
        };
      function g() {
        var n = this;
        return function(r) {
          return x(n, void 0, void 0, function() {
            var t, e;
            return w(this, function(n) {
              switch (n.label) {
                case 0:
                  r(h());
                  n.label = 1;
                case 1:
                  n.trys.push([1, 3, , 4]);
                  return [4, p('/mock-api/stations.json')];
                case 2:
                  t = n.sent();
                  if (t) {
                    r(v(t));
                  } else {
                    r(b());
                  }
                  return [3, 4];
                case 3:
                  e = n.sent();
                  a['c'].error('Failure to fetch station data!');
                  r(b());
                  return [3, 4];
                case 4:
                  return [2];
              }
            });
          });
        };
      }
      function _(e, r) {
        var n = this;
        return function(t) {
          return x(n, void 0, void 0, function() {
            return w(this, function(n) {
              t(y(e, r));
              return [2];
            });
          });
        };
      }
      function O(e, r) {
        var n = this;
        return function(t) {
          return x(n, void 0, void 0, function() {
            return w(this, function(n) {
              t(m(e, r));
              return [2];
            });
          });
        };
      }
      var k =
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
      var E =
        (undefined && undefined.__assign) ||
        function() {
          E =
            Object.assign ||
            function(n) {
              for (var t, e = 1, r = arguments.length; e < r; e++) {
                t = arguments[e];
                for (var o in t) if (Object.prototype.hasOwnProperty.call(t, o)) n[o] = t[o];
              }
              return n;
            };
          return E.apply(this, arguments);
        };
      var S = a['d'].Option,
        j = a['d'].OptionGroup;
      var T = function(n) {
        var t = n.list;
        return { list: t };
      };
      var C = E({}, r, s['routerActions']);
      var A = (function(n) {
        k(t, n);
        function t() {
          return (n !== null && n.apply(this, arguments)) || this;
        }
        t.prototype.render = function() {
          var t = this;
          var n = this.props.list,
            e = n.lineData,
            r = n.fromStation,
            o = n.toStation;
          return i['createElement'](
            'div',
            { className: 'search-station-select' },
            i['createElement'](
              a['d'],
              {
                placeholder: 'Starting Point',
                value: r,
                onChange: this.handleStationChange.bind(this, 'fromStation'),
                className: 'from-station',
                prefix: 'circle',
                prefixClassName: 'prefix-from',
              },
              Object.keys(e).map(function(n) {
                return i['createElement'](
                  j,
                  { label: n, key: n },
                  e[n].stations.map(function(n) {
                    return i['createElement'](
                      S,
                      { key: n, value: n, filterOption: t.filterOption },
                      n,
                    );
                  }),
                );
              }),
            ),
            i['createElement'](
              a['d'],
              {
                placeholder: 'Destination',
                value: o,
                onChange: this.handleStationChange.bind(this, 'toStation'),
                className: 'to-station',
                prefix: 'map-pin',
                prefixClassName: 'prefix-to',
              },
              Object.keys(e).map(function(n) {
                return i['createElement'](
                  j,
                  { label: n, key: n },
                  e[n].stations.map(function(n) {
                    return i['createElement'](
                      S,
                      { key: n, value: n, filterOption: t.filterOption },
                      n,
                    );
                  }),
                );
              }),
            ),
          );
        };
        t.prototype.filterOption = function(n, t) {
          return t.toLowerCase().indexOf(n.toLowerCase()) !== -1;
        };
        t.prototype.handleStationChange = function(n, t) {
          this.props.updateStation(t, n);
        };
        return t;
      })(i['Component']);
      var N = Object(o['connect'])(T, C)(A);
      var P =
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
      var D =
        (undefined && undefined.__assign) ||
        function() {
          D =
            Object.assign ||
            function(n) {
              for (var t, e = 1, r = arguments.length; e < r; e++) {
                t = arguments[e];
                for (var o in t) if (Object.prototype.hasOwnProperty.call(t, o)) n[o] = t[o];
              }
              return n;
            };
          return D.apply(this, arguments);
        };
      var L = function(n) {
        var t = n.list;
        return { list: t };
      };
      var R = D({}, r, s['routerActions']);
      var F = (function(n) {
        P(t, n);
        function t() {
          return (n !== null && n.apply(this, arguments)) || this;
        }
        t.prototype.render = function() {
          var n = this.props.list.shortestRoutes;
          return n && n.length
            ? i['createElement'](
                a['b'].Collapse,
                { className: 'route-panel' },
                n.map(function(n, t) {
                  return i['createElement'](
                    a['b'],
                    { key: n.join(','), index: t },
                    i['createElement'](a['b'].Header, null, 'Route ', t + 1),
                    i['createElement'](a['b'].Body, null, n.join(' -> ')),
                  );
                }),
              )
            : null;
        };
        return t;
      })(i['Component']);
      var I = Object(o['connect'])(L, R)(F);
      var z = e(157);
      var H =
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
      var M =
        (undefined && undefined.__assign) ||
        function() {
          M =
            Object.assign ||
            function(n) {
              for (var t, e = 1, r = arguments.length; e < r; e++) {
                t = arguments[e];
                for (var o in t) if (Object.prototype.hasOwnProperty.call(t, o)) n[o] = t[o];
              }
              return n;
            };
          return M.apply(this, arguments);
        };
      var G = function(n) {
        var t = n.list;
        return { list: t };
      };
      var J = M({}, r, s['routerActions']);
      var U = (function(n) {
        H(t, n);
        function t() {
          var r = (n !== null && n.apply(this, arguments)) || this;
          r.handleSearch = function() {
            var n = r.props.list,
              t = n.fromStation,
              e = n.toStation;
            if (!t) {
              a['c'].info('Please choose starting point');
              return;
            }
            if (!e) {
              a['c'].info('Please choose destination');
              return;
            }
            if (t === e) {
              a['c'].info('Please choose different stations');
              return;
            }
            r.props.getMetroRoutes(t, e);
          };
          return r;
        }
        t.prototype.componentDidMount = function() {
          var n = this.props.list,
            t = n.data,
            e = n.isLoading;
          if (!t && !e) {
            this.props.fetchStationData();
          }
        };
        t.prototype.render = function() {
          var n = this.props.list.isLoading;
          return i['createElement'](
            a['e'],
            { wrapperClassName: 'index-container', spinning: n },
            i['createElement'](
              'div',
              { className: 'search-panel' },
              i['createElement'](N, null),
              i['createElement'](
                a['a'],
                {
                  className: 'search-btn',
                  onClick: this.handleSearch,
                  type: 'primary',
                  icon: 'search',
                },
                'Search',
              ),
            ),
            i['createElement'](I, null),
          );
        };
        return t;
      })(i['Component']);
      var B = (t['default'] = Object(o['connect'])(G, J)(U));
    },
  },
]);
