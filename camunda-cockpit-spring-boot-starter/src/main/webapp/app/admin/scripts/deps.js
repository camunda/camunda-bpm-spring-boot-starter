var requirejs, require, define;
!function (global) {
  function isFunction(e) {
    return "[object Function]" === ostring.call(e)
  }

  function isArray(e) {
    return "[object Array]" === ostring.call(e)
  }

  function each(e, t) {
    if (e) {
      var n;
      for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1);
    }
  }

  function eachReverse(e, t) {
    if (e) {
      var n;
      for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1);
    }
  }

  function hasProp(e, t) {
    return hasOwn.call(e, t)
  }

  function getOwn(e, t) {
    return hasProp(e, t) && e[t]
  }

  function eachProp(e, t) {
    var n;
    for (n in e)if (hasProp(e, n) && t(e[n], n))break
  }

  function mixin(e, t, n, r) {
    return t && eachProp(t, function (t, i) {
      (n || !hasProp(e, i)) && (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[i] = t : (e[i] || (e[i] = {}), mixin(e[i], t, n, r)))
    }), e
  }

  function bind(e, t) {
    return function () {
      return t.apply(e, arguments)
    }
  }

  function scripts() {
    return document.getElementsByTagName("script")
  }

  function defaultOnError(e) {
    throw e
  }

  function getGlobal(e) {
    if (!e)return e;
    var t = global;
    return each(e.split("."), function (e) {
      t = t[e]
    }), t
  }

  function makeError(e, t, n, r) {
    var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
    return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
  }

  function newContext(e) {
    function t(e) {
      var t, n;
      for (t = 0; t < e.length; t++)if (n = e[t], "." === n)e.splice(t, 1), t -= 1; else if (".." === n) {
        if (0 === t || 1 == t && ".." === e[2] || ".." === e[t - 1])continue;
        t > 0 && (e.splice(t - 1, 2), t -= 2)
      }
    }

    function n(e, n, r) {
      var i, o, a, s, u, l, c, p, f, d, h, g, m = n && n.split("/"), v = k.map, $ = v && v["*"];
      if (e && (e = e.split("/"), c = e.length - 1, k.nodeIdCompat && jsSuffixRegExp.test(e[c]) && (e[c] = e[c].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && m && (g = m.slice(0, m.length - 1), e = g.concat(e)), t(e), e = e.join("/")), r && v && (m || $)) {
        a = e.split("/");
        e:for (s = a.length; s > 0; s -= 1) {
          if (l = a.slice(0, s).join("/"), m)for (u = m.length; u > 0; u -= 1)if (o = getOwn(v, m.slice(0, u).join("/")), o && (o = getOwn(o, l))) {
            p = o, f = s;
            break e
          }
          !d && $ && getOwn($, l) && (d = getOwn($, l), h = s)
        }
        !p && d && (p = d, f = h), p && (a.splice(0, f, p), e = a.join("/"))
      }
      return i = getOwn(k.pkgs, e), i ? i : e
    }

    function r(e) {
      isBrowser && each(scripts(), function (t) {
        return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === b.contextName ? (t.parentNode.removeChild(t), !0) : void 0
      })
    }

    function i(e) {
      var t = getOwn(k.paths, e);
      return t && isArray(t) && t.length > 1 ? (t.shift(), b.require.undef(e), b.makeRequire(null, {skipMap: !0})([e]), !0) : void 0
    }

    function o(e) {
      var t, n = e ? e.indexOf("!") : -1;
      return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
    }

    function a(e, t, r, i) {
      var a, s, u, l, c = null, p = t ? t.name : null, f = e, d = !0, h = "";
      return e || (d = !1, e = "_@r" + (O += 1)), l = o(e), c = l[0], e = l[1], c && (c = n(c, p, i), s = getOwn(D, c)), e && (c ? h = s && s.normalize ? s.normalize(e, function (e) {
        return n(e, p, i)
      }) : -1 === e.indexOf("!") ? n(e, p, i) : e : (h = n(e, p, i), l = o(h), c = l[0], h = l[1], r = !0, a = b.nameToUrl(h))), u = !c || s || r ? "" : "_unnormalized" + (N += 1), {
        prefix: c,
        name: h,
        parentMap: t,
        unnormalized: !!u,
        url: a,
        originalName: f,
        isDefine: d,
        id: (c ? c + "!" + h : h) + u
      }
    }

    function s(e) {
      var t = e.id, n = getOwn(C, t);
      return n || (n = C[t] = new b.Module(e)), n
    }

    function u(e, t, n) {
      var r = e.id, i = getOwn(C, r);
      !hasProp(D, r) || i && !i.defineEmitComplete ? (i = s(e), i.error && "error" === t ? n(i.error) : i.on(t, n)) : "defined" === t && n(D[r])
    }

    function l(e, t) {
      var n = e.requireModules, r = !1;
      t ? t(e) : (each(n, function (t) {
        var n = getOwn(C, t);
        n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
      }), r || req.onError(e))
    }

    function c() {
      globalDefQueue.length && (apsp.apply(S, [S.length, 0].concat(globalDefQueue)), globalDefQueue = [])
    }

    function p(e) {
      delete C[e], delete E[e]
    }

    function f(e, t, n) {
      var r = e.map.id;
      e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function (r, i) {
        var o = r.id, a = getOwn(C, o);
        !a || e.depMatched[i] || n[o] || (getOwn(t, o) ? (e.defineDep(i, D[o]), e.check()) : f(a, t, n))
      }), n[r] = !0)
    }

    function d() {
      var e, t, n = 1e3 * k.waitSeconds, o = n && b.startTime + n < (new Date).getTime(), a = [], s = [], u = !1, c = !0;
      if (!$) {
        if ($ = !0, eachProp(E, function (e) {
            var n = e.map, l = n.id;
            if (e.enabled && (n.isDefine || s.push(e), !e.error))if (!e.inited && o)i(l) ? (t = !0, u = !0) : (a.push(l), r(l)); else if (!e.inited && e.fetched && n.isDefine && (u = !0, !n.prefix))return c = !1
          }), o && a.length)return e = makeError("timeout", "Load timeout for modules: " + a, null, a), e.contextName = b.contextName, l(e);
        c && each(s, function (e) {
          f(e, {}, {})
        }), o && !t || !u || !isBrowser && !isWebWorker || x || (x = setTimeout(function () {
          x = 0, d()
        }, 50)), $ = !1
      }
    }

    function h(e) {
      hasProp(D, e[0]) || s(a(e[0], null, !0)).init(e[1], e[2])
    }

    function g(e, t, n, r) {
      e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
    }

    function m(e) {
      var t = e.currentTarget || e.srcElement;
      return g(t, b.onScriptLoad, "load", "onreadystatechange"), g(t, b.onScriptError, "error"), {
        node: t,
        id: t && t.getAttribute("data-requiremodule")
      }
    }

    function v() {
      var e;
      for (c(); S.length;) {
        if (e = S.shift(), null === e[0])return l(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
        h(e)
      }
    }

    var $, y, b, w, x, k = {
      waitSeconds: 7,
      baseUrl: "./",
      paths: {},
      bundles: {},
      pkgs: {},
      shim: {},
      config: {}
    }, C = {}, E = {}, T = {}, S = [], D = {}, A = {}, M = {}, O = 1, N = 1;
    return w = {
      require: function (e) {
        return e.require ? e.require : e.require = b.makeRequire(e.map)
      }, exports: function (e) {
        return e.usingExports = !0, e.map.isDefine ? e.exports ? D[e.map.id] = e.exports : e.exports = D[e.map.id] = {} : void 0
      }, module: function (e) {
        return e.module ? e.module : e.module = {
          id: e.map.id, uri: e.map.url, config: function () {
            return getOwn(k.config, e.map.id) || {}
          }, exports: e.exports || (e.exports = {})
        }
      }
    }, y = function (e) {
      this.events = getOwn(T, e.id) || {}, this.map = e, this.shim = getOwn(k.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
    }, y.prototype = {
      init: function (e, t, n, r) {
        r = r || {}, this.inited || (this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function (e) {
          this.emit("error", e)
        })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check())
      }, defineDep: function (e, t) {
        this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
      }, fetch: function () {
        if (!this.fetched) {
          this.fetched = !0, b.startTime = (new Date).getTime();
          var e = this.map;
          return this.shim ? void b.makeRequire(this.map, {enableBuildCallback: !0})(this.shim.deps || [], bind(this, function () {
            return e.prefix ? this.callPlugin() : this.load()
          })) : e.prefix ? this.callPlugin() : this.load()
        }
      }, load: function () {
        var e = this.map.url;
        A[e] || (A[e] = !0, b.load(this.map.id, e))
      }, check: function () {
        if (this.enabled && !this.enabling) {
          var e, t, n = this.map.id, r = this.depExports, i = this.exports, o = this.factory;
          if (this.inited) {
            if (this.error)this.emit("error", this.error); else if (!this.defining) {
              if (this.defining = !0, this.depCount < 1 && !this.defined) {
                if (isFunction(o)) {
                  if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)try {
                    i = b.execCb(n, o, r, i)
                  } catch (a) {
                    e = a
                  } else i = b.execCb(n, o, r, i);
                  if (this.map.isDefine && void 0 === i && (t = this.module, t ? i = t.exports : this.usingExports && (i = this.exports)), e)return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", l(this.error = e)
                } else i = o;
                this.exports = i, this.map.isDefine && !this.ignore && (D[n] = i, req.onResourceLoad && req.onResourceLoad(b, this.map, this.depMaps)), p(n), this.defined = !0
              }
              this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
            }
          } else this.fetch()
        }
      }, callPlugin: function () {
        var e = this.map, t = e.id, r = a(e.prefix);
        this.depMaps.push(r), u(r, "defined", bind(this, function (r) {
          var i, o, c, f = getOwn(M, this.map.id), d = this.map.name, h = this.map.parentMap ? this.map.parentMap.name : null, g = b.makeRequire(e.parentMap, {enableBuildCallback: !0});
          return this.map.unnormalized ? (r.normalize && (d = r.normalize(d, function (e) {
              return n(e, h, !0)
            }) || ""), o = a(e.prefix + "!" + d, this.map.parentMap), u(o, "defined", bind(this, function (e) {
            this.init([], function () {
              return e
            }, null, {enabled: !0, ignore: !0})
          })), c = getOwn(C, o.id), void(c && (this.depMaps.push(o), this.events.error && c.on("error", bind(this, function (e) {
            this.emit("error", e)
          })), c.enable()))) : f ? (this.map.url = b.nameToUrl(f), void this.load()) : (i = bind(this, function (e) {
            this.init([], function () {
              return e
            }, null, {enabled: !0})
          }), i.error = bind(this, function (e) {
            this.inited = !0, this.error = e, e.requireModules = [t], eachProp(C, function (e) {
              0 === e.map.id.indexOf(t + "_unnormalized") && p(e.map.id)
            }), l(e)
          }), i.fromText = bind(this, function (n, r) {
            var o = e.name, u = a(o), c = useInteractive;
            r && (n = r), c && (useInteractive = !1), s(u), hasProp(k.config, t) && (k.config[o] = k.config[t]);
            try {
              req.exec(n)
            } catch (p) {
              return l(makeError("fromtexteval", "fromText eval for " + t + " failed: " + p, p, [t]))
            }
            c && (useInteractive = !0), this.depMaps.push(u), b.completeLoad(o), g([o], i)
          }), void r.load(e.name, g, i, k))
        })), b.enable(r, this), this.pluginMaps[r.id] = r
      }, enable: function () {
        E[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (e, t) {
          var n, r, i;
          if ("string" == typeof e) {
            if (e = a(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, i = getOwn(w, e.id))return void(this.depExports[t] = i(this));
            this.depCount += 1, u(e, "defined", bind(this, function (e) {
              this.defineDep(t, e), this.check()
            })), this.errback && u(e, "error", bind(this, this.errback))
          }
          n = e.id, r = C[n], hasProp(w, n) || !r || r.enabled || b.enable(e, this)
        })), eachProp(this.pluginMaps, bind(this, function (e) {
          var t = getOwn(C, e.id);
          t && !t.enabled && b.enable(e, this)
        })), this.enabling = !1, this.check()
      }, on: function (e, t) {
        var n = this.events[e];
        n || (n = this.events[e] = []), n.push(t)
      }, emit: function (e, t) {
        each(this.events[e], function (e) {
          e(t)
        }), "error" === e && delete this.events[e]
      }
    }, b = {
      config: k,
      contextName: e,
      registry: C,
      defined: D,
      urlFetched: A,
      defQueue: S,
      Module: y,
      makeModuleMap: a,
      nextTick: req.nextTick,
      onError: l,
      configure: function (e) {
        e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
        var t = k.shim, n = {paths: !0, bundles: !0, config: !0, map: !0};
        eachProp(e, function (e, t) {
          n[t] ? (k[t] || (k[t] = {}), mixin(k[t], e, !0, !0)) : k[t] = e
        }), e.bundles && eachProp(e.bundles, function (e, t) {
          each(e, function (e) {
            e !== t && (M[e] = t)
          })
        }), e.shim && (eachProp(e.shim, function (e, n) {
          isArray(e) && (e = {deps: e}), !e.exports && !e.init || e.exportsFn || (e.exportsFn = b.makeShimExports(e)), t[n] = e
        }), k.shim = t), e.packages && each(e.packages, function (e) {
          var t, n;
          e = "string" == typeof e ? {name: e} : e, n = e.name, t = e.location, t && (k.paths[n] = e.location), k.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
        }), eachProp(C, function (e, t) {
          e.inited || e.map.unnormalized || (e.map = a(t))
        }), (e.deps || e.callback) && b.require(e.deps || [], e.callback)
      },
      makeShimExports: function (e) {
        function t() {
          var t;
          return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
        }

        return t
      },
      makeRequire: function (t, i) {
        function o(n, r, u) {
          var c, p, f;
          return i.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0), "string" == typeof n ? isFunction(r) ? l(makeError("requireargs", "Invalid require call"), u) : t && hasProp(w, n) ? w[n](C[t.id]) : req.get ? req.get(b, n, t, o) : (p = a(n, t, !1, !0), c = p.id, hasProp(D, c) ? D[c] : l(makeError("notloaded", 'Module name "' + c + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), b.nextTick(function () {
            v(), f = s(a(null, t)), f.skipMap = i.skipMap, f.init(n, r, u, {enabled: !0}), d()
          }), o)
        }

        return i = i || {}, mixin(o, {
          isBrowser: isBrowser, toUrl: function (e) {
            var r, i = e.lastIndexOf("."), o = e.split("/")[0], a = "." === o || ".." === o;
            return -1 !== i && (!a || i > 1) && (r = e.substring(i, e.length), e = e.substring(0, i)), b.nameToUrl(n(e, t && t.id, !0), r, !0)
          }, defined: function (e) {
            return hasProp(D, a(e, t, !1, !0).id)
          }, specified: function (e) {
            return e = a(e, t, !1, !0).id, hasProp(D, e) || hasProp(C, e)
          }
        }), t || (o.undef = function (e) {
          c();
          var n = a(e, t, !0), i = getOwn(C, e);
          r(e), delete D[e], delete A[n.url], delete T[e], eachReverse(S, function (t, n) {
            t[0] === e && S.splice(n, 1)
          }), i && (i.events.defined && (T[e] = i.events), p(e))
        }), o
      },
      enable: function (e) {
        var t = getOwn(C, e.id);
        t && s(e).enable()
      },
      completeLoad: function (e) {
        var t, n, r, o = getOwn(k.shim, e) || {}, a = o.exports;
        for (c(); S.length;) {
          if (n = S.shift(), null === n[0]) {
            if (n[0] = e, t)break;
            t = !0
          } else n[0] === e && (t = !0);
          h(n)
        }
        if (r = getOwn(C, e), !t && !hasProp(D, e) && r && !r.inited) {
          if (!(!k.enforceDefine || a && getGlobal(a)))return i(e) ? void 0 : l(makeError("nodefine", "No define call for " + e, null, [e]));
          h([e, o.deps || [], o.exportsFn])
        }
        d()
      },
      nameToUrl: function (e, t, n) {
        var r, i, o, a, s, u, l, c = getOwn(k.pkgs, e);
        if (c && (e = c), l = getOwn(M, e))return b.nameToUrl(l, t, n);
        if (req.jsExtRegExp.test(e))s = e + (t || ""); else {
          for (r = k.paths, i = e.split("/"), o = i.length; o > 0; o -= 1)if (a = i.slice(0, o).join("/"), u = getOwn(r, a)) {
            isArray(u) && (u = u[0]), i.splice(0, o, u);
            break
          }
          s = i.join("/"), s += t || (/^data\:|\?/.test(s) || n ? "" : ".js"), s = ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : k.baseUrl) + s
        }
        return k.urlArgs ? s + ((-1 === s.indexOf("?") ? "?" : "&") + k.urlArgs) : s
      },
      load: function (e, t) {
        req.load(b, e, t)
      },
      execCb: function (e, t, n, r) {
        return t.apply(r, n)
      },
      onScriptLoad: function (e) {
        if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
          interactiveScript = null;
          var t = m(e);
          b.completeLoad(t.id)
        }
      },
      onScriptError: function (e) {
        var t = m(e);
        return i(t.id) ? void 0 : l(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
      }
    }, b.require = b.makeRequire(), b
  }

  function getInteractiveScript() {
    return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function (e) {
      return "interactive" === e.readyState ? interactiveScript = e : void 0
    }), interactiveScript)
  }

  var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.14", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
  if ("undefined" == typeof define) {
    if ("undefined" != typeof requirejs) {
      if (isFunction(requirejs))return;
      cfg = requirejs, requirejs = void 0
    }
    "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function (e, t, n, r) {
      var i, o, a = defContextName;
      return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = n, n = r) : e = []), o && o.context && (a = o.context), i = getOwn(contexts, a), i || (i = contexts[a] = req.s.newContext(a)), o && i.configure(o), i.require(e, t, n)
    }, req.config = function (e) {
      return req(e)
    }, req.nextTick = "undefined" != typeof setTimeout ? function (e) {
      setTimeout(e, 4)
    } : function (e) {
      e()
    }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
      contexts: contexts,
      newContext: newContext
    }, req({}), each(["toUrl", "undef", "defined", "specified"], function (e) {
      req[e] = function () {
        var t = contexts[defContextName];
        return t.require[e].apply(t, arguments)
      }
    }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (e) {
      var t = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
      return t.type = e.scriptType || "text/javascript", t.charset = "utf-8", t.async = !0, t
    }, req.load = function (e, t, n) {
      var r, i = e && e.config || {};
      if (isBrowser)return r = req.createNode(i, t, n), r.setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = n, currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r;
      if (isWebWorker)try {
        importScripts(n), e.completeLoad(t)
      } catch (o) {
        e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, o, [t]))
      }
    }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (e) {
      return head || (head = e.parentNode), dataMain = e.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
    }), define = function (e, t, n) {
      var r, i;
      "string" != typeof e && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (e, n) {
        t.push(n)
      }), t = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([e, t, n])
    }, define.amd = {jQuery: !0}, req.exec = function (text) {
      return eval(text)
    }, req(cfg)
  }
}(this), define("requirejs", function () {
}), function (e, t) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document)throw new Error("jQuery requires a window with a document");
    return t(e)
  } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
  function n(e) {
    var t = e.length, n = Z.type(e);
    return "function" === n || Z.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
  }

  function r(e, t, n) {
    if (Z.isFunction(t))return Z.grep(e, function (e, r) {
      return !!t.call(e, r, e) !== n
    });
    if (t.nodeType)return Z.grep(e, function (e) {
      return e === t !== n
    });
    if ("string" == typeof t) {
      if (st.test(t))return Z.filter(t, e, n);
      t = Z.filter(t, e)
    }
    return Z.grep(e, function (e) {
      return z.call(t, e) >= 0 !== n
    })
  }

  function i(e, t) {
    for (; (e = e[t]) && 1 !== e.nodeType;);
    return e
  }

  function o(e) {
    var t = ht[e] = {};
    return Z.each(e.match(dt) || [], function (e, n) {
      t[n] = !0
    }), t
  }

  function a() {
    K.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1), Z.ready()
  }

  function s() {
    Object.defineProperty(this.cache = {}, 0, {
      get: function () {
        return {}
      }
    }), this.expando = Z.expando + Math.random()
  }

  function u(e, t, n) {
    var r;
    if (void 0 === n && 1 === e.nodeType)if (r = "data-" + t.replace(bt, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
      try {
        n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : yt.test(n) ? Z.parseJSON(n) : n
      } catch (i) {
      }
      $t.set(e, t, n)
    } else n = void 0;
    return n
  }

  function l() {
    return !0
  }

  function c() {
    return !1
  }

  function p() {
    try {
      return K.activeElement
    } catch (e) {
    }
  }

  function f(e, t) {
    return Z.nodeName(e, "table") && Z.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
  }

  function d(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
  }

  function h(e) {
    var t = Rt.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute("type"), e
  }

  function g(e, t) {
    for (var n = 0, r = e.length; r > n; n++)vt.set(e[n], "globalEval", !t || vt.get(t[n], "globalEval"))
  }

  function m(e, t) {
    var n, r, i, o, a, s, u, l;
    if (1 === t.nodeType) {
      if (vt.hasData(e) && (o = vt.access(e), a = vt.set(t, o), l = o.events)) {
        delete a.handle, a.events = {};
        for (i in l)for (n = 0, r = l[i].length; r > n; n++)Z.event.add(t, i, l[i][n])
      }
      $t.hasData(e) && (s = $t.access(e), u = Z.extend({}, s), $t.set(t, u))
    }
  }

  function v(e, t) {
    var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
    return void 0 === t || t && Z.nodeName(e, t) ? Z.merge([e], n) : n
  }

  function $(e, t) {
    var n = t.nodeName.toLowerCase();
    "input" === n && Ct.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
  }

  function y(t, n) {
    var r, i = Z(n.createElement(t)).appendTo(n.body), o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : Z.css(i[0], "display");
    return i.detach(), o
  }

  function b(e) {
    var t = K, n = It[e];
    return n || (n = y(e, t), "none" !== n && n || (Ft = (Ft || Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Ft[0].contentDocument, t.write(), t.close(), n = y(e, t), Ft.detach()), It[e] = n), n
  }

  function w(e, t, n) {
    var r, i, o, a, s = e.style;
    return n = n || _t(e), n && (a = n.getPropertyValue(t) || n[t]), n && ("" !== a || Z.contains(e.ownerDocument, e) || (a = Z.style(e, t)), Ut.test(a) && Vt.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
  }

  function x(e, t) {
    return {
      get: function () {
        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
      }
    }
  }

  function k(e, t) {
    if (t in e)return t;
    for (var n = t[0].toUpperCase() + t.slice(1), r = t, i = Gt.length; i--;)if (t = Gt[i] + n, t in e)return t;
    return r
  }

  function C(e, t, n) {
    var r = Wt.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
  }

  function E(e, t, n, r, i) {
    for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += Z.css(e, n + xt[o], !0, i)), r ? ("content" === n && (a -= Z.css(e, "padding" + xt[o], !0, i)), "margin" !== n && (a -= Z.css(e, "border" + xt[o] + "Width", !0, i))) : (a += Z.css(e, "padding" + xt[o], !0, i), "padding" !== n && (a += Z.css(e, "border" + xt[o] + "Width", !0, i)));
    return a
  }

  function T(e, t, n) {
    var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = _t(e), a = "border-box" === Z.css(e, "boxSizing", !1, o);
    if (0 >= i || null == i) {
      if (i = w(e, t, o), (0 > i || null == i) && (i = e.style[t]), Ut.test(i))return i;
      r = a && (Q.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
    }
    return i + E(e, t, n || (a ? "border" : "content"), r, o) + "px"
  }

  function S(e, t) {
    for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++)r = e[a], r.style && (o[a] = vt.get(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && kt(r) && (o[a] = vt.access(r, "olddisplay", b(r.nodeName)))) : (i = kt(r), "none" === n && i || vt.set(r, "olddisplay", i ? n : Z.css(r, "display"))));
    for (a = 0; s > a; a++)r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
    return e
  }

  function D(e, t, n, r, i) {
    return new D.prototype.init(e, t, n, r, i)
  }

  function A() {
    return setTimeout(function () {
      Qt = void 0
    }), Qt = Z.now()
  }

  function M(e, t) {
    var n, r = 0, i = {height: e};
    for (t = t ? 1 : 0; 4 > r; r += 2 - t)n = xt[r], i["margin" + n] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e), i
  }

  function O(e, t, n) {
    for (var r, i = (nn[t] || []).concat(nn["*"]), o = 0, a = i.length; a > o; o++)if (r = i[o].call(n, t, e))return r
  }

  function N(e, t, n) {
    var r, i, o, a, s, u, l, c, p = this, f = {}, d = e.style, h = e.nodeType && kt(e), g = vt.get(e, "fxshow");
    n.queue || (s = Z._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function () {
      s.unqueued || u()
    }), s.unqueued++, p.always(function () {
      p.always(function () {
        s.unqueued--, Z.queue(e, "fx").length || s.empty.fire()
      })
    })), 1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], l = Z.css(e, "display"), c = "none" === l ? vt.get(e, "olddisplay") || b(e.nodeName) : l, "inline" === c && "none" === Z.css(e, "float") && (d.display = "inline-block")), n.overflow && (d.overflow = "hidden", p.always(function () {
      d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
    }));
    for (r in t)if (i = t[r], Jt.exec(i)) {
      if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
        if ("show" !== i || !g || void 0 === g[r])continue;
        h = !0
      }
      f[r] = g && g[r] || Z.style(e, r)
    } else l = void 0;
    if (Z.isEmptyObject(f))"inline" === ("none" === l ? b(e.nodeName) : l) && (d.display = l); else {
      g ? "hidden"in g && (h = g.hidden) : g = vt.access(e, "fxshow", {}), o && (g.hidden = !h), h ? Z(e).show() : p.done(function () {
        Z(e).hide()
      }), p.done(function () {
        var t;
        vt.remove(e, "fxshow");
        for (t in f)Z.style(e, t, f[t])
      });
      for (r in f)a = O(h ? g[r] : 0, r, p), r in g || (g[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
    }
  }

  function P(e, t) {
    var n, r, i, o, a;
    for (n in e)if (r = Z.camelCase(n), i = t[r], o = e[n], Z.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = Z.cssHooks[r], a && "expand"in a) {
      o = a.expand(o), delete e[r];
      for (n in o)n in e || (e[n] = o[n], t[n] = i)
    } else t[r] = i
  }

  function q(e, t, n) {
    var r, i, o = 0, a = tn.length, s = Z.Deferred().always(function () {
      delete u.elem
    }), u = function () {
      if (i)return !1;
      for (var t = Qt || A(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++)l.tweens[a].run(o);
      return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
    }, l = s.promise({
      elem: e,
      props: Z.extend({}, t),
      opts: Z.extend(!0, {specialEasing: {}}, n),
      originalProperties: t,
      originalOptions: n,
      startTime: Qt || A(),
      duration: n.duration,
      tweens: [],
      createTween: function (t, n) {
        var r = Z.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
        return l.tweens.push(r), r
      },
      stop: function (t) {
        var n = 0, r = t ? l.tweens.length : 0;
        if (i)return this;
        for (i = !0; r > n; n++)l.tweens[n].run(1);
        return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
      }
    }), c = l.props;
    for (P(c, l.opts.specialEasing); a > o; o++)if (r = tn[o].call(l, e, c, l.opts))return r;
    return Z.map(c, O, l), Z.isFunction(l.opts.start) && l.opts.start.call(e, l), Z.fx.timer(Z.extend(u, {
      elem: e,
      anim: l,
      queue: l.opts.queue
    })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
  }

  function j(e) {
    return function (t, n) {
      "string" != typeof t && (n = t, t = "*");
      var r, i = 0, o = t.toLowerCase().match(dt) || [];
      if (Z.isFunction(n))for (; r = o[i++];)"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
    }
  }

  function R(e, t, n, r) {
    function i(s) {
      var u;
      return o[s] = !0, Z.each(e[s] || [], function (e, s) {
        var l = s(t, n, r);
        return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
      }), u
    }

    var o = {}, a = e === xn;
    return i(t.dataTypes[0]) || !o["*"] && i("*")
  }

  function H(e, t) {
    var n, r, i = Z.ajaxSettings.flatOptions || {};
    for (n in t)void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    return r && Z.extend(!0, e, r), e
  }

  function L(e, t, n) {
    for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0];)u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
    if (r)for (i in s)if (s[i] && s[i].test(r)) {
      u.unshift(i);
      break
    }
    if (u[0]in n)o = u[0]; else {
      for (i in n) {
        if (!u[0] || e.converters[i + " " + u[0]]) {
          o = i;
          break
        }
        a || (a = i)
      }
      o = o || a
    }
    return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
  }

  function F(e, t, n, r) {
    var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
    if (c[1])for (a in e.converters)l[a.toLowerCase()] = e.converters[a];
    for (o = c.shift(); o;)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())if ("*" === o)o = u; else if ("*" !== u && u !== o) {
      if (a = l[u + " " + o] || l["* " + o], !a)for (i in l)if (s = i.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
        a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));
        break
      }
      if (a !== !0)if (a && e["throws"])t = a(t); else try {
        t = a(t)
      } catch (p) {
        return {state: "parsererror", error: a ? p : "No conversion from " + u + " to " + o}
      }
    }
    return {state: "success", data: t}
  }

  function I(e, t, n, r) {
    var i;
    if (Z.isArray(t))Z.each(t, function (t, i) {
      n || Tn.test(e) ? r(e, i) : I(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
    }); else if (n || "object" !== Z.type(t))r(e, t); else for (i in t)I(e + "[" + i + "]", t[i], n, r)
  }

  function V(e) {
    return Z.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
  }

  var U = [], _ = U.slice, B = U.concat, W = U.push, z = U.indexOf, Y = {}, X = Y.toString, G = Y.hasOwnProperty, Q = {}, K = e.document, J = "2.1.1", Z = function (e, t) {
    return new Z.fn.init(e, t)
  }, et = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, tt = /^-ms-/, nt = /-([\da-z])/gi, rt = function (e, t) {
    return t.toUpperCase()
  };
  Z.fn = Z.prototype = {
    jquery: J, constructor: Z, selector: "", length: 0, toArray: function () {
      return _.call(this)
    }, get: function (e) {
      return null != e ? 0 > e ? this[e + this.length] : this[e] : _.call(this)
    }, pushStack: function (e) {
      var t = Z.merge(this.constructor(), e);
      return t.prevObject = this, t.context = this.context, t
    }, each: function (e, t) {
      return Z.each(this, e, t)
    }, map: function (e) {
      return this.pushStack(Z.map(this, function (t, n) {
        return e.call(t, n, t)
      }))
    }, slice: function () {
      return this.pushStack(_.apply(this, arguments))
    }, first: function () {
      return this.eq(0)
    }, last: function () {
      return this.eq(-1)
    }, eq: function (e) {
      var t = this.length, n = +e + (0 > e ? t : 0);
      return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
    }, end: function () {
      return this.prevObject || this.constructor(null)
    }, push: W, sort: U.sort, splice: U.splice
  }, Z.extend = Z.fn.extend = function () {
    var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
    for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || Z.isFunction(a) || (a = {}), s === u && (a = this, s--); u > s; s++)if (null != (e = arguments[s]))for (t in e)n = a[t], r = e[t], a !== r && (l && r && (Z.isPlainObject(r) || (i = Z.isArray(r))) ? (i ? (i = !1, o = n && Z.isArray(n) ? n : []) : o = n && Z.isPlainObject(n) ? n : {}, a[t] = Z.extend(l, o, r)) : void 0 !== r && (a[t] = r));
    return a
  }, Z.extend({
    expando: "jQuery" + (J + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
      throw new Error(e)
    }, noop: function () {
    }, isFunction: function (e) {
      return "function" === Z.type(e)
    }, isArray: Array.isArray, isWindow: function (e) {
      return null != e && e === e.window
    }, isNumeric: function (e) {
      return !Z.isArray(e) && e - parseFloat(e) >= 0
    }, isPlainObject: function (e) {
      return "object" !== Z.type(e) || e.nodeType || Z.isWindow(e) ? !1 : e.constructor && !G.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
    }, isEmptyObject: function (e) {
      var t;
      for (t in e)return !1;
      return !0
    }, type: function (e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Y[X.call(e)] || "object" : typeof e
    }, globalEval: function (e) {
      var t, n = eval;
      e = Z.trim(e), e && (1 === e.indexOf("use strict") ? (t = K.createElement("script"), t.text = e, K.head.appendChild(t).parentNode.removeChild(t)) : n(e))
    }, camelCase: function (e) {
      return e.replace(tt, "ms-").replace(nt, rt)
    }, nodeName: function (e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each: function (e, t, r) {
      var i, o = 0, a = e.length, s = n(e);
      if (r) {
        if (s)for (; a > o && (i = t.apply(e[o], r), i !== !1); o++); else for (o in e)if (i = t.apply(e[o], r), i === !1)break
      } else if (s)for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++); else for (o in e)if (i = t.call(e[o], o, e[o]), i === !1)break;
      return e
    }, trim: function (e) {
      return null == e ? "" : (e + "").replace(et, "")
    }, makeArray: function (e, t) {
      var r = t || [];
      return null != e && (n(Object(e)) ? Z.merge(r, "string" == typeof e ? [e] : e) : W.call(r, e)), r
    }, inArray: function (e, t, n) {
      return null == t ? -1 : z.call(t, e, n)
    }, merge: function (e, t) {
      for (var n = +t.length, r = 0, i = e.length; n > r; r++)e[i++] = t[r];
      return e.length = i, e
    }, grep: function (e, t, n) {
      for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++)r = !t(e[o], o), r !== s && i.push(e[o]);
      return i
    }, map: function (e, t, r) {
      var i, o = 0, a = e.length, s = n(e), u = [];
      if (s)for (; a > o; o++)i = t(e[o], o, r), null != i && u.push(i); else for (o in e)i = t(e[o], o, r), null != i && u.push(i);
      return B.apply([], u)
    }, guid: 1, proxy: function (e, t) {
      var n, r, i;
      return "string" == typeof t && (n = e[t], t = e, e = n), Z.isFunction(e) ? (r = _.call(arguments, 2), i = function () {
        return e.apply(t || this, r.concat(_.call(arguments)))
      }, i.guid = e.guid = e.guid || Z.guid++, i) : void 0
    }, now: Date.now, support: Q
  }), Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
    Y["[object " + t + "]"] = t.toLowerCase()
  });
  var it = function (e) {
    function t(e, t, n, r) {
      var i, o, a, s, u, l, p, d, h, g;
      if ((t ? t.ownerDocument || t : I) !== N && O(t), t = t || N, n = n || [], !e || "string" != typeof e)return n;
      if (1 !== (s = t.nodeType) && 9 !== s)return [];
      if (q && !r) {
        if (i = $t.exec(e))if (a = i[1]) {
          if (9 === s) {
            if (o = t.getElementById(a), !o || !o.parentNode)return n;
            if (o.id === a)return n.push(o), n
          } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && L(t, o) && o.id === a)return n.push(o), n
        } else {
          if (i[2])return Z.apply(n, t.getElementsByTagName(e)), n;
          if ((a = i[3]) && w.getElementsByClassName && t.getElementsByClassName)return Z.apply(n, t.getElementsByClassName(a)), n
        }
        if (w.qsa && (!j || !j.test(e))) {
          if (d = p = F, h = t, g = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
            for (l = E(e), (p = t.getAttribute("id")) ? d = p.replace(bt, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", u = l.length; u--;)l[u] = d + f(l[u]);
            h = yt.test(e) && c(t.parentNode) || t, g = l.join(",")
          }
          if (g)try {
            return Z.apply(n, h.querySelectorAll(g)), n
          } catch (m) {
          } finally {
            p || t.removeAttribute("id")
          }
        }
      }
      return S(e.replace(ut, "$1"), t, n, r)
    }

    function n() {
      function e(n, r) {
        return t.push(n + " ") > x.cacheLength && delete e[t.shift()], e[n + " "] = r
      }

      var t = [];
      return e
    }

    function r(e) {
      return e[F] = !0, e
    }

    function i(e) {
      var t = N.createElement("div");
      try {
        return !!e(t)
      } catch (n) {
        return !1
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null
      }
    }

    function o(e, t) {
      for (var n = e.split("|"), r = e.length; r--;)x.attrHandle[n[r]] = t
    }

    function a(e, t) {
      var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || X) - (~e.sourceIndex || X);
      if (r)return r;
      if (n)for (; n = n.nextSibling;)if (n === t)return -1;
      return e ? 1 : -1
    }

    function s(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return "input" === n && t.type === e
      }
    }

    function u(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return ("input" === n || "button" === n) && t.type === e
      }
    }

    function l(e) {
      return r(function (t) {
        return t = +t, r(function (n, r) {
          for (var i, o = e([], n.length, t), a = o.length; a--;)n[i = o[a]] && (n[i] = !(r[i] = n[i]))
        })
      })
    }

    function c(e) {
      return e && typeof e.getElementsByTagName !== Y && e
    }

    function p() {
    }

    function f(e) {
      for (var t = 0, n = e.length, r = ""; n > t; t++)r += e[t].value;
      return r
    }

    function d(e, t, n) {
      var r = t.dir, i = n && "parentNode" === r, o = U++;
      return t.first ? function (t, n, o) {
        for (; t = t[r];)if (1 === t.nodeType || i)return e(t, n, o)
      } : function (t, n, a) {
        var s, u, l = [V, o];
        if (a) {
          for (; t = t[r];)if ((1 === t.nodeType || i) && e(t, n, a))return !0
        } else for (; t = t[r];)if (1 === t.nodeType || i) {
          if (u = t[F] || (t[F] = {}), (s = u[r]) && s[0] === V && s[1] === o)return l[2] = s[2];
          if (u[r] = l, l[2] = e(t, n, a))return !0
        }
      }
    }

    function h(e) {
      return e.length > 1 ? function (t, n, r) {
        for (var i = e.length; i--;)if (!e[i](t, n, r))return !1;
        return !0
      } : e[0]
    }

    function g(e, n, r) {
      for (var i = 0, o = n.length; o > i; i++)t(e, n[i], r);
      return r
    }

    function m(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
      return a
    }

    function v(e, t, n, i, o, a) {
      return i && !i[F] && (i = v(i)), o && !o[F] && (o = v(o, a)), r(function (r, a, s, u) {
        var l, c, p, f = [], d = [], h = a.length, v = r || g(t || "*", s.nodeType ? [s] : s, []), $ = !e || !r && t ? v : m(v, f, e, s, u), y = n ? o || (r ? e : h || i) ? [] : a : $;
        if (n && n($, y, s, u), i)for (l = m(y, d), i(l, [], s, u), c = l.length; c--;)(p = l[c]) && (y[d[c]] = !($[d[c]] = p));
        if (r) {
          if (o || e) {
            if (o) {
              for (l = [], c = y.length; c--;)(p = y[c]) && l.push($[c] = p);
              o(null, y = [], l, u)
            }
            for (c = y.length; c--;)(p = y[c]) && (l = o ? tt.call(r, p) : f[c]) > -1 && (r[l] = !(a[l] = p))
          }
        } else y = m(y === a ? y.splice(h, y.length) : y), o ? o(null, a, y, u) : Z.apply(a, y)
      })
    }

    function $(e) {
      for (var t, n, r, i = e.length, o = x.relative[e[0].type], a = o || x.relative[" "], s = o ? 1 : 0, u = d(function (e) {
        return e === t
      }, a, !0), l = d(function (e) {
        return tt.call(t, e) > -1
      }, a, !0), c = [function (e, n, r) {
        return !o && (r || n !== D) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r))
      }]; i > s; s++)if (n = x.relative[e[s].type])c = [d(h(c), n)]; else {
        if (n = x.filter[e[s].type].apply(null, e[s].matches), n[F]) {
          for (r = ++s; i > r && !x.relative[e[r].type]; r++);
          return v(s > 1 && h(c), s > 1 && f(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(ut, "$1"), n, r > s && $(e.slice(s, r)), i > r && $(e = e.slice(r)), i > r && f(e))
        }
        c.push(n)
      }
      return h(c)
    }

    function y(e, n) {
      var i = n.length > 0, o = e.length > 0, a = function (r, a, s, u, l) {
        var c, p, f, d = 0, h = "0", g = r && [], v = [], $ = D, y = r || o && x.find.TAG("*", l), b = V += null == $ ? 1 : Math.random() || .1, w = y.length;
        for (l && (D = a !== N && a); h !== w && null != (c = y[h]); h++) {
          if (o && c) {
            for (p = 0; f = e[p++];)if (f(c, a, s)) {
              u.push(c);
              break
            }
            l && (V = b)
          }
          i && ((c = !f && c) && d--, r && g.push(c))
        }
        if (d += h, i && h !== d) {
          for (p = 0; f = n[p++];)f(g, v, a, s);
          if (r) {
            if (d > 0)for (; h--;)g[h] || v[h] || (v[h] = K.call(u));
            v = m(v)
          }
          Z.apply(u, v), l && !r && v.length > 0 && d + n.length > 1 && t.uniqueSort(u)
        }
        return l && (V = b, D = $), g
      };
      return i ? r(a) : a
    }

    var b, w, x, k, C, E, T, S, D, A, M, O, N, P, q, j, R, H, L, F = "sizzle" + -new Date, I = e.document, V = 0, U = 0, _ = n(), B = n(), W = n(), z = function (e, t) {
      return e === t && (M = !0), 0
    }, Y = "undefined", X = 1 << 31, G = {}.hasOwnProperty, Q = [], K = Q.pop, J = Q.push, Z = Q.push, et = Q.slice, tt = Q.indexOf || function (e) {
        for (var t = 0, n = this.length; n > t; t++)if (this[t] === e)return t;
        return -1
      }, nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", rt = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ot = it.replace("w", "w#"), at = "\\[" + rt + "*(" + it + ")(?:" + rt + "*([*^$|!~]?=)" + rt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ot + "))|)" + rt + "*\\]", st = ":(" + it + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + at + ")*)|.*)\\)|)", ut = new RegExp("^" + rt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + rt + "+$", "g"), lt = new RegExp("^" + rt + "*," + rt + "*"), ct = new RegExp("^" + rt + "*([>+~]|" + rt + ")" + rt + "*"), pt = new RegExp("=" + rt + "*([^\\]'\"]*?)" + rt + "*\\]", "g"), ft = new RegExp(st), dt = new RegExp("^" + ot + "$"), ht = {
      ID: new RegExp("^#(" + it + ")"),
      CLASS: new RegExp("^\\.(" + it + ")"),
      TAG: new RegExp("^(" + it.replace("w", "w*") + ")"),
      ATTR: new RegExp("^" + at),
      PSEUDO: new RegExp("^" + st),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + rt + "*(even|odd|(([+-]|)(\\d*)n|)" + rt + "*(?:([+-]|)" + rt + "*(\\d+)|))" + rt + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + nt + ")$", "i"),
      needsContext: new RegExp("^" + rt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + rt + "*((?:-\\d)?\\d*)" + rt + "*\\)|)(?=[^-]|$)", "i")
    }, gt = /^(?:input|select|textarea|button)$/i, mt = /^h\d$/i, vt = /^[^{]+\{\s*\[native \w/, $t = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, yt = /[+~]/, bt = /'|\\/g, wt = new RegExp("\\\\([\\da-f]{1,6}" + rt + "?|(" + rt + ")|.)", "ig"), xt = function (e, t, n) {
      var r = "0x" + t - 65536;
      return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
    };
    try {
      Z.apply(Q = et.call(I.childNodes), I.childNodes), Q[I.childNodes.length].nodeType
    } catch (kt) {
      Z = {
        apply: Q.length ? function (e, t) {
          J.apply(e, et.call(t))
        } : function (e, t) {
          for (var n = e.length, r = 0; e[n++] = t[r++];);
          e.length = n - 1
        }
      }
    }
    w = t.support = {}, C = t.isXML = function (e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return t ? "HTML" !== t.nodeName : !1
    }, O = t.setDocument = function (e) {
      var t, n = e ? e.ownerDocument || e : I, r = n.defaultView;
      return n !== N && 9 === n.nodeType && n.documentElement ? (N = n, P = n.documentElement, q = !C(n), r && r !== r.top && (r.addEventListener ? r.addEventListener("unload", function () {
        O()
      }, !1) : r.attachEvent && r.attachEvent("onunload", function () {
        O()
      })), w.attributes = i(function (e) {
        return e.className = "i", !e.getAttribute("className")
      }), w.getElementsByTagName = i(function (e) {
        return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
      }), w.getElementsByClassName = vt.test(n.getElementsByClassName) && i(function (e) {
          return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
        }), w.getById = i(function (e) {
        return P.appendChild(e).id = F, !n.getElementsByName || !n.getElementsByName(F).length
      }), w.getById ? (x.find.ID = function (e, t) {
        if (typeof t.getElementById !== Y && q) {
          var n = t.getElementById(e);
          return n && n.parentNode ? [n] : []
        }
      }, x.filter.ID = function (e) {
        var t = e.replace(wt, xt);
        return function (e) {
          return e.getAttribute("id") === t
        }
      }) : (delete x.find.ID, x.filter.ID = function (e) {
        var t = e.replace(wt, xt);
        return function (e) {
          var n = typeof e.getAttributeNode !== Y && e.getAttributeNode("id");
          return n && n.value === t
        }
      }), x.find.TAG = w.getElementsByTagName ? function (e, t) {
        return typeof t.getElementsByTagName !== Y ? t.getElementsByTagName(e) : void 0
      } : function (e, t) {
        var n, r = [], i = 0, o = t.getElementsByTagName(e);
        if ("*" === e) {
          for (; n = o[i++];)1 === n.nodeType && r.push(n);
          return r
        }
        return o
      }, x.find.CLASS = w.getElementsByClassName && function (e, t) {
          return typeof t.getElementsByClassName !== Y && q ? t.getElementsByClassName(e) : void 0
        }, R = [], j = [], (w.qsa = vt.test(n.querySelectorAll)) && (i(function (e) {
        e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && j.push("[*^$]=" + rt + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || j.push("\\[" + rt + "*(?:value|" + nt + ")"), e.querySelectorAll(":checked").length || j.push(":checked")
      }), i(function (e) {
        var t = n.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && j.push("name" + rt + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || j.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), j.push(",.*:")
      })), (w.matchesSelector = vt.test(H = P.matches || P.webkitMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector || P.msMatchesSelector)) && i(function (e) {
        w.disconnectedMatch = H.call(e, "div"), H.call(e, "[s!='']:x"), R.push("!=", st)
      }), j = j.length && new RegExp(j.join("|")), R = R.length && new RegExp(R.join("|")), t = vt.test(P.compareDocumentPosition), L = t || vt.test(P.contains) ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
      } : function (e, t) {
        if (t)for (; t = t.parentNode;)if (t === e)return !0;
        return !1
      }, z = t ? function (e, t) {
        if (e === t)return M = !0, 0;
        var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !w.sortDetached && t.compareDocumentPosition(e) === r ? e === n || e.ownerDocument === I && L(I, e) ? -1 : t === n || t.ownerDocument === I && L(I, t) ? 1 : A ? tt.call(A, e) - tt.call(A, t) : 0 : 4 & r ? -1 : 1)
      } : function (e, t) {
        if (e === t)return M = !0, 0;
        var r, i = 0, o = e.parentNode, s = t.parentNode, u = [e], l = [t];
        if (!o || !s)return e === n ? -1 : t === n ? 1 : o ? -1 : s ? 1 : A ? tt.call(A, e) - tt.call(A, t) : 0;
        if (o === s)return a(e, t);
        for (r = e; r = r.parentNode;)u.unshift(r);
        for (r = t; r = r.parentNode;)l.unshift(r);
        for (; u[i] === l[i];)i++;
        return i ? a(u[i], l[i]) : u[i] === I ? -1 : l[i] === I ? 1 : 0
      }, n) : N
    }, t.matches = function (e, n) {
      return t(e, null, null, n)
    }, t.matchesSelector = function (e, n) {
      if ((e.ownerDocument || e) !== N && O(e), n = n.replace(pt, "='$1']"), !(!w.matchesSelector || !q || R && R.test(n) || j && j.test(n)))try {
        var r = H.call(e, n);
        if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)return r
      } catch (i) {
      }
      return t(n, N, null, [e]).length > 0
    }, t.contains = function (e, t) {
      return (e.ownerDocument || e) !== N && O(e), L(e, t)
    }, t.attr = function (e, t) {
      (e.ownerDocument || e) !== N && O(e);
      var n = x.attrHandle[t.toLowerCase()], r = n && G.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !q) : void 0;
      return void 0 !== r ? r : w.attributes || !q ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
    }, t.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e)
    }, t.uniqueSort = function (e) {
      var t, n = [], r = 0, i = 0;
      if (M = !w.detectDuplicates, A = !w.sortStable && e.slice(0), e.sort(z), M) {
        for (; t = e[i++];)t === e[i] && (r = n.push(i));
        for (; r--;)e.splice(n[r], 1)
      }
      return A = null, e
    }, k = t.getText = function (e) {
      var t, n = "", r = 0, i = e.nodeType;
      if (i) {
        if (1 === i || 9 === i || 11 === i) {
          if ("string" == typeof e.textContent)return e.textContent;
          for (e = e.firstChild; e; e = e.nextSibling)n += k(e)
        } else if (3 === i || 4 === i)return e.nodeValue
      } else for (; t = e[r++];)n += k(t);
      return n
    }, x = t.selectors = {
      cacheLength: 50,
      createPseudo: r,
      match: ht,
      attrHandle: {},
      find: {},
      relative: {
        ">": {dir: "parentNode", first: !0},
        " ": {dir: "parentNode"},
        "+": {dir: "previousSibling", first: !0},
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        ATTR: function (e) {
          return e[1] = e[1].replace(wt, xt), e[3] = (e[3] || e[4] || e[5] || "").replace(wt, xt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        }, CHILD: function (e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
        }, PSEUDO: function (e) {
          var t, n = !e[6] && e[2];
          return ht.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ft.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
        }
      },
      filter: {
        TAG: function (e) {
          var t = e.replace(wt, xt).toLowerCase();
          return "*" === e ? function () {
            return !0
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t
          }
        }, CLASS: function (e) {
          var t = _[e + " "];
          return t || (t = new RegExp("(^|" + rt + ")" + e + "(" + rt + "|$)")) && _(e, function (e) {
              return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== Y && e.getAttribute("class") || "")
            })
        }, ATTR: function (e, n, r) {
          return function (i) {
            var o = t.attr(i, e);
            return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
          }
        }, CHILD: function (e, t, n, r, i) {
          var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
          return 1 === r && 0 === i ? function (e) {
            return !!e.parentNode
          } : function (t, n, u) {
            var l, c, p, f, d, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, v = s && t.nodeName.toLowerCase(), $ = !u && !s;
            if (m) {
              if (o) {
                for (; g;) {
                  for (p = t; p = p[g];)if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType)return !1;
                  h = g = "only" === e && !h && "nextSibling"
                }
                return !0
              }
              if (h = [a ? m.firstChild : m.lastChild], a && $) {
                for (c = m[F] || (m[F] = {}), l = c[e] || [], d = l[0] === V && l[1], f = l[0] === V && l[2], p = d && m.childNodes[d]; p = ++d && p && p[g] || (f = d = 0) || h.pop();)if (1 === p.nodeType && ++f && p === t) {
                  c[e] = [V, d, f];
                  break
                }
              } else if ($ && (l = (t[F] || (t[F] = {}))[e]) && l[0] === V)f = l[1]; else for (; (p = ++d && p && p[g] || (f = d = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++f || ($ && ((p[F] || (p[F] = {}))[e] = [V, f]), p !== t)););
              return f -= i, f === r || f % r === 0 && f / r >= 0
            }
          }
        }, PSEUDO: function (e, n) {
          var i, o = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
          return o[F] ? o(n) : o.length > 1 ? (i = [e, e, "", n], x.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
            for (var r, i = o(e, n), a = i.length; a--;)r = tt.call(e, i[a]), e[r] = !(t[r] = i[a])
          }) : function (e) {
            return o(e, 0, i)
          }) : o
        }
      },
      pseudos: {
        not: r(function (e) {
          var t = [], n = [], i = T(e.replace(ut, "$1"));
          return i[F] ? r(function (e, t, n, r) {
            for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
          }) : function (e, r, o) {
            return t[0] = e, i(t, null, o, n), !n.pop()
          }
        }), has: r(function (e) {
          return function (n) {
            return t(e, n).length > 0
          }
        }), contains: r(function (e) {
          return function (t) {
            return (t.textContent || t.innerText || k(t)).indexOf(e) > -1
          }
        }), lang: r(function (e) {
          return dt.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(wt, xt).toLowerCase(), function (t) {
            var n;
            do if (n = q ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
            return !1
          }
        }), target: function (t) {
          var n = e.location && e.location.hash;
          return n && n.slice(1) === t.id
        }, root: function (e) {
          return e === P
        }, focus: function (e) {
          return e === N.activeElement && (!N.hasFocus || N.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        }, enabled: function (e) {
          return e.disabled === !1
        }, disabled: function (e) {
          return e.disabled === !0
        }, checked: function (e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected
        }, selected: function (e) {
          return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
        }, empty: function (e) {
          for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
          return !0
        }, parent: function (e) {
          return !x.pseudos.empty(e)
        }, header: function (e) {
          return mt.test(e.nodeName)
        }, input: function (e) {
          return gt.test(e.nodeName)
        }, button: function (e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t
        }, text: function (e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
        }, first: l(function () {
          return [0]
        }), last: l(function (e, t) {
          return [t - 1]
        }), eq: l(function (e, t, n) {
          return [0 > n ? n + t : n]
        }), even: l(function (e, t) {
          for (var n = 0; t > n; n += 2)e.push(n);
          return e
        }), odd: l(function (e, t) {
          for (var n = 1; t > n; n += 2)e.push(n);
          return e
        }), lt: l(function (e, t, n) {
          for (var r = 0 > n ? n + t : n; --r >= 0;)e.push(r);
          return e
        }), gt: l(function (e, t, n) {
          for (var r = 0 > n ? n + t : n; ++r < t;)e.push(r);
          return e
        })
      }
    }, x.pseudos.nth = x.pseudos.eq;
    for (b in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})x.pseudos[b] = s(b);
    for (b in{submit: !0, reset: !0})x.pseudos[b] = u(b);
    return p.prototype = x.filters = x.pseudos, x.setFilters = new p, E = t.tokenize = function (e, n) {
      var r, i, o, a, s, u, l, c = B[e + " "];
      if (c)return n ? 0 : c.slice(0);
      for (s = e, u = [], l = x.preFilter; s;) {
        (!r || (i = lt.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = ct.exec(s)) && (r = i.shift(), o.push({
          value: r,
          type: i[0].replace(ut, " ")
        }), s = s.slice(r.length));
        for (a in x.filter)!(i = ht[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({
          value: r,
          type: a,
          matches: i
        }), s = s.slice(r.length));
        if (!r)break
      }
      return n ? s.length : s ? t.error(e) : B(e, u).slice(0)
    }, T = t.compile = function (e, t) {
      var n, r = [], i = [], o = W[e + " "];
      if (!o) {
        for (t || (t = E(e)), n = t.length; n--;)o = $(t[n]), o[F] ? r.push(o) : i.push(o);
        o = W(e, y(i, r)), o.selector = e
      }
      return o
    }, S = t.select = function (e, t, n, r) {
      var i, o, a, s, u, l = "function" == typeof e && e, p = !r && E(e = l.selector || e);
      if (n = n || [], 1 === p.length) {
        if (o = p[0] = p[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && q && x.relative[o[1].type]) {
          if (t = (x.find.ID(a.matches[0].replace(wt, xt), t) || [])[0], !t)return n;
          l && (t = t.parentNode), e = e.slice(o.shift().value.length)
        }
        for (i = ht.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !x.relative[s = a.type]);)if ((u = x.find[s]) && (r = u(a.matches[0].replace(wt, xt), yt.test(o[0].type) && c(t.parentNode) || t))) {
          if (o.splice(i, 1), e = r.length && f(o), !e)return Z.apply(n, r), n;
          break
        }
      }
      return (l || T(e, p))(r, t, !q, n, yt.test(e) && c(t.parentNode) || t), n
    }, w.sortStable = F.split("").sort(z).join("") === F, w.detectDuplicates = !!M, O(), w.sortDetached = i(function (e) {
      return 1 & e.compareDocumentPosition(N.createElement("div"))
    }), i(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
    }) || o("type|href|height|width", function (e, t, n) {
      return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
    }), w.attributes && i(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
    }) || o("value", function (e, t, n) {
      return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
    }), i(function (e) {
      return null == e.getAttribute("disabled")
    }) || o(nt, function (e, t, n) {
      var r;
      return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
    }), t
  }(e);
  Z.find = it, Z.expr = it.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = it.uniqueSort, Z.text = it.getText, Z.isXMLDoc = it.isXML, Z.contains = it.contains;
  var ot = Z.expr.match.needsContext, at = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, st = /^.[^:#\[\.,]*$/;
  Z.filter = function (e, t, n) {
    var r = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? Z.find.matchesSelector(r, e) ? [r] : [] : Z.find.matches(e, Z.grep(t, function (e) {
      return 1 === e.nodeType
    }))
  }, Z.fn.extend({
    find: function (e) {
      var t, n = this.length, r = [], i = this;
      if ("string" != typeof e)return this.pushStack(Z(e).filter(function () {
        for (t = 0; n > t; t++)if (Z.contains(i[t], this))return !0
      }));
      for (t = 0; n > t; t++)Z.find(e, i[t], r);
      return r = this.pushStack(n > 1 ? Z.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
    }, filter: function (e) {
      return this.pushStack(r(this, e || [], !1))
    }, not: function (e) {
      return this.pushStack(r(this, e || [], !0))
    }, is: function (e) {
      return !!r(this, "string" == typeof e && ot.test(e) ? Z(e) : e || [], !1).length
    }
  });
  var ut, lt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ct = Z.fn.init = function (e, t) {
    var n, r;
    if (!e)return this;
    if ("string" == typeof e) {
      if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : lt.exec(e), !n || !n[1] && t)return !t || t.jquery ? (t || ut).find(e) : this.constructor(t).find(e);
      if (n[1]) {
        if (t = t instanceof Z ? t[0] : t, Z.merge(this, Z.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : K, !0)), at.test(n[1]) && Z.isPlainObject(t))for (n in t)Z.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
        return this
      }
      return r = K.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = K, this.selector = e, this
    }
    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : Z.isFunction(e) ? "undefined" != typeof ut.ready ? ut.ready(e) : e(Z) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), Z.makeArray(e, this))
  };
  ct.prototype = Z.fn, ut = Z(K);
  var pt = /^(?:parents|prev(?:Until|All))/, ft = {children: !0, contents: !0, next: !0, prev: !0};
  Z.extend({
    dir: function (e, t, n) {
      for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)if (1 === e.nodeType) {
        if (i && Z(e).is(n))break;
        r.push(e)
      }
      return r
    }, sibling: function (e, t) {
      for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
      return n
    }
  }), Z.fn.extend({
    has: function (e) {
      var t = Z(e, this), n = t.length;
      return this.filter(function () {
        for (var e = 0; n > e; e++)if (Z.contains(this, t[e]))return !0
      })
    }, closest: function (e, t) {
      for (var n, r = 0, i = this.length, o = [], a = ot.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && Z.find.matchesSelector(n, e))) {
        o.push(n);
        break
      }
      return this.pushStack(o.length > 1 ? Z.unique(o) : o)
    }, index: function (e) {
      return e ? "string" == typeof e ? z.call(Z(e), this[0]) : z.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (e, t) {
      return this.pushStack(Z.unique(Z.merge(this.get(), Z(e, t))))
    }, addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
  }), Z.each({
    parent: function (e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    }, parents: function (e) {
      return Z.dir(e, "parentNode")
    }, parentsUntil: function (e, t, n) {
      return Z.dir(e, "parentNode", n)
    }, next: function (e) {
      return i(e, "nextSibling")
    }, prev: function (e) {
      return i(e, "previousSibling")
    }, nextAll: function (e) {
      return Z.dir(e, "nextSibling")
    }, prevAll: function (e) {
      return Z.dir(e, "previousSibling")
    }, nextUntil: function (e, t, n) {
      return Z.dir(e, "nextSibling", n)
    }, prevUntil: function (e, t, n) {
      return Z.dir(e, "previousSibling", n)
    }, siblings: function (e) {
      return Z.sibling((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
      return Z.sibling(e.firstChild)
    }, contents: function (e) {
      return e.contentDocument || Z.merge([], e.childNodes)
    }
  }, function (e, t) {
    Z.fn[e] = function (n, r) {
      var i = Z.map(this, t, n);
      return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = Z.filter(r, i)), this.length > 1 && (ft[e] || Z.unique(i), pt.test(e) && i.reverse()), this.pushStack(i)
    }
  });
  var dt = /\S+/g, ht = {};
  Z.Callbacks = function (e) {
    e = "string" == typeof e ? ht[e] || o(e) : Z.extend({}, e);
    var t, n, r, i, a, s, u = [], l = !e.once && [], c = function (o) {
      for (t = e.memory && o, n = !0, s = i || 0, i = 0, a = u.length, r = !0; u && a > s; s++)if (u[s].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
        t = !1;
        break
      }
      r = !1, u && (l ? l.length && c(l.shift()) : t ? u = [] : p.disable())
    }, p = {
      add: function () {
        if (u) {
          var n = u.length;
          !function o(t) {
            Z.each(t, function (t, n) {
              var r = Z.type(n);
              "function" === r ? e.unique && p.has(n) || u.push(n) : n && n.length && "string" !== r && o(n)
            })
          }(arguments), r ? a = u.length : t && (i = n, c(t))
        }
        return this
      }, remove: function () {
        return u && Z.each(arguments, function (e, t) {
          for (var n; (n = Z.inArray(t, u, n)) > -1;)u.splice(n, 1), r && (a >= n && a--, s >= n && s--)
        }), this
      }, has: function (e) {
        return e ? Z.inArray(e, u) > -1 : !(!u || !u.length)
      }, empty: function () {
        return u = [], a = 0, this
      }, disable: function () {
        return u = l = t = void 0, this
      }, disabled: function () {
        return !u
      }, lock: function () {
        return l = void 0, t || p.disable(), this
      }, locked: function () {
        return !l
      }, fireWith: function (e, t) {
        return !u || n && !l || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? l.push(t) : c(t)), this
      }, fire: function () {
        return p.fireWith(this, arguments), this
      }, fired: function () {
        return !!n
      }
    };
    return p
  }, Z.extend({
    Deferred: function (e) {
      var t = [["resolve", "done", Z.Callbacks("once memory"), "resolved"], ["reject", "fail", Z.Callbacks("once memory"), "rejected"], ["notify", "progress", Z.Callbacks("memory")]], n = "pending", r = {
        state: function () {
          return n
        }, always: function () {
          return i.done(arguments).fail(arguments), this
        }, then: function () {
          var e = arguments;
          return Z.Deferred(function (n) {
            Z.each(t, function (t, o) {
              var a = Z.isFunction(e[t]) && e[t];
              i[o[1]](function () {
                var e = a && a.apply(this, arguments);
                e && Z.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
              })
            }), e = null
          }).promise()
        }, promise: function (e) {
          return null != e ? Z.extend(e, r) : r
        }
      }, i = {};
      return r.pipe = r.then, Z.each(t, function (e, o) {
        var a = o[2], s = o[3];
        r[o[1]] = a.add, s && a.add(function () {
          n = s
        }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
          return i[o[0] + "With"](this === i ? r : this, arguments), this
        }, i[o[0] + "With"] = a.fireWith
      }), r.promise(i), e && e.call(i, i), i
    }, when: function (e) {
      var t, n, r, i = 0, o = _.call(arguments), a = o.length, s = 1 !== a || e && Z.isFunction(e.promise) ? a : 0, u = 1 === s ? e : Z.Deferred(), l = function (e, n, r) {
        return function (i) {
          n[e] = this, r[e] = arguments.length > 1 ? _.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
        }
      };
      if (a > 1)for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++)o[i] && Z.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --s;
      return s || u.resolveWith(r, o), u.promise()
    }
  });
  var gt;
  Z.fn.ready = function (e) {
    return Z.ready.promise().done(e), this
  }, Z.extend({
    isReady: !1, readyWait: 1, holdReady: function (e) {
      e ? Z.readyWait++ : Z.ready(!0)
    }, ready: function (e) {
      (e === !0 ? --Z.readyWait : Z.isReady) || (Z.isReady = !0, e !== !0 && --Z.readyWait > 0 || (gt.resolveWith(K, [Z]), Z.fn.triggerHandler && (Z(K).triggerHandler("ready"), Z(K).off("ready"))))
    }
  }), Z.ready.promise = function (t) {
    return gt || (gt = Z.Deferred(), "complete" === K.readyState ? setTimeout(Z.ready) : (K.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1))), gt.promise(t)
  }, Z.ready.promise();
  var mt = Z.access = function (e, t, n, r, i, o, a) {
    var s = 0, u = e.length, l = null == n;
    if ("object" === Z.type(n)) {
      i = !0;
      for (s in n)Z.access(e, t, s, n[s], !0, o, a)
    } else if (void 0 !== r && (i = !0, Z.isFunction(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
        return l.call(Z(e), n)
      })), t))for (; u > s; s++)t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
    return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
  };
  Z.acceptData = function (e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
  }, s.uid = 1, s.accepts = Z.acceptData, s.prototype = {
    key: function (e) {
      if (!s.accepts(e))return 0;
      var t = {}, n = e[this.expando];
      if (!n) {
        n = s.uid++;
        try {
          t[this.expando] = {value: n}, Object.defineProperties(e, t)
        } catch (r) {
          t[this.expando] = n, Z.extend(e, t)
        }
      }
      return this.cache[n] || (this.cache[n] = {}), n
    }, set: function (e, t, n) {
      var r, i = this.key(e), o = this.cache[i];
      if ("string" == typeof t)o[t] = n; else if (Z.isEmptyObject(o))Z.extend(this.cache[i], t); else for (r in t)o[r] = t[r];
      return o
    }, get: function (e, t) {
      var n = this.cache[this.key(e)];
      return void 0 === t ? n : n[t]
    }, access: function (e, t, n) {
      var r;
      return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, Z.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
    }, remove: function (e, t) {
      var n, r, i, o = this.key(e), a = this.cache[o];
      if (void 0 === t)this.cache[o] = {}; else {
        Z.isArray(t) ? r = t.concat(t.map(Z.camelCase)) : (i = Z.camelCase(t), t in a ? r = [t, i] : (r = i, r = r in a ? [r] : r.match(dt) || [])), n = r.length;
        for (; n--;)delete a[r[n]]
      }
    }, hasData: function (e) {
      return !Z.isEmptyObject(this.cache[e[this.expando]] || {})
    }, discard: function (e) {
      e[this.expando] && delete this.cache[e[this.expando]]
    }
  };
  var vt = new s, $t = new s, yt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, bt = /([A-Z])/g;
  Z.extend({
    hasData: function (e) {
      return $t.hasData(e) || vt.hasData(e)
    }, data: function (e, t, n) {
      return $t.access(e, t, n)
    }, removeData: function (e, t) {
      $t.remove(e, t)
    }, _data: function (e, t, n) {
      return vt.access(e, t, n)
    }, _removeData: function (e, t) {
      vt.remove(e, t)
    }
  }), Z.fn.extend({
    data: function (e, t) {
      var n, r, i, o = this[0], a = o && o.attributes;
      if (void 0 === e) {
        if (this.length && (i = $t.get(o), 1 === o.nodeType && !vt.get(o, "hasDataAttrs"))) {
          for (n = a.length; n--;)a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = Z.camelCase(r.slice(5)), u(o, r, i[r])));
          vt.set(o, "hasDataAttrs", !0)
        }
        return i
      }
      return "object" == typeof e ? this.each(function () {
        $t.set(this, e)
      }) : mt(this, function (t) {
        var n, r = Z.camelCase(e);
        if (o && void 0 === t) {
          if (n = $t.get(o, e), void 0 !== n)return n;
          if (n = $t.get(o, r), void 0 !== n)return n;
          if (n = u(o, r, void 0), void 0 !== n)return n
        } else this.each(function () {
          var n = $t.get(this, r);
          $t.set(this, r, t), -1 !== e.indexOf("-") && void 0 !== n && $t.set(this, e, t)
        })
      }, null, t, arguments.length > 1, null, !0)
    }, removeData: function (e) {
      return this.each(function () {
        $t.remove(this, e)
      })
    }
  }), Z.extend({
    queue: function (e, t, n) {
      var r;
      return e ? (t = (t || "fx") + "queue", r = vt.get(e, t), n && (!r || Z.isArray(n) ? r = vt.access(e, t, Z.makeArray(n)) : r.push(n)), r || []) : void 0
    }, dequeue: function (e, t) {
      t = t || "fx";
      var n = Z.queue(e, t), r = n.length, i = n.shift(), o = Z._queueHooks(e, t), a = function () {
        Z.dequeue(e, t)
      };
      "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
    }, _queueHooks: function (e, t) {
      var n = t + "queueHooks";
      return vt.get(e, n) || vt.access(e, n, {
          empty: Z.Callbacks("once memory").add(function () {
            vt.remove(e, [t + "queue", n])
          })
        })
    }
  }), Z.fn.extend({
    queue: function (e, t) {
      var n = 2;
      return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? Z.queue(this[0], e) : void 0 === t ? this : this.each(function () {
        var n = Z.queue(this, e, t);
        Z._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && Z.dequeue(this, e)
      })
    }, dequeue: function (e) {
      return this.each(function () {
        Z.dequeue(this, e)
      })
    }, clearQueue: function (e) {
      return this.queue(e || "fx", [])
    }, promise: function (e, t) {
      var n, r = 1, i = Z.Deferred(), o = this, a = this.length, s = function () {
        --r || i.resolveWith(o, [o])
      };
      for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)n = vt.get(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
      return s(), i.promise(t)
    }
  });
  var wt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, xt = ["Top", "Right", "Bottom", "Left"], kt = function (e, t) {
    return e = t || e, "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e)
  }, Ct = /^(?:checkbox|radio)$/i;
  !function () {
    var e = K.createDocumentFragment(), t = e.appendChild(K.createElement("div")), n = K.createElement("input");
    n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), Q.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", Q.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
  }();
  var Et = "undefined";
  Q.focusinBubbles = "onfocusin"in e;
  var Tt = /^key/, St = /^(?:mouse|pointer|contextmenu)|click/, Dt = /^(?:focusinfocus|focusoutblur)$/, At = /^([^.]*)(?:\.(.+)|)$/;
  Z.event = {
    global: {},
    add: function (e, t, n, r, i) {
      var o, a, s, u, l, c, p, f, d, h, g, m = vt.get(e);
      if (m)for (n.handler && (o = n, n = o.handler, i = o.selector), n.guid || (n.guid = Z.guid++), (u = m.events) || (u = m.events = {}), (a = m.handle) || (a = m.handle = function (t) {
        return typeof Z !== Et && Z.event.triggered !== t.type ? Z.event.dispatch.apply(e, arguments) : void 0
      }), t = (t || "").match(dt) || [""], l = t.length; l--;)s = At.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d && (p = Z.event.special[d] || {}, d = (i ? p.delegateType : p.bindType) || d, p = Z.event.special[d] || {}, c = Z.extend({
        type: d,
        origType: g,
        data: r,
        handler: n,
        guid: n.guid,
        selector: i,
        needsContext: i && Z.expr.match.needsContext.test(i),
        namespace: h.join(".")
      }, o), (f = u[d]) || (f = u[d] = [], f.delegateCount = 0, p.setup && p.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), p.add && (p.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, c) : f.push(c), Z.event.global[d] = !0)
    },
    remove: function (e, t, n, r, i) {
      var o, a, s, u, l, c, p, f, d, h, g, m = vt.hasData(e) && vt.get(e);
      if (m && (u = m.events)) {
        for (t = (t || "").match(dt) || [""], l = t.length; l--;)if (s = At.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
          for (p = Z.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = u[d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = f.length; o--;)c = f[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, p.remove && p.remove.call(e, c));
          a && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || Z.removeEvent(e, d, m.handle), delete u[d])
        } else for (d in u)Z.event.remove(e, d + t[l], n, r, !0);
        Z.isEmptyObject(u) && (delete m.handle, vt.remove(e, "events"))
      }
    },
    trigger: function (t, n, r, i) {
      var o, a, s, u, l, c, p, f = [r || K], d = G.call(t, "type") ? t.type : t, h = G.call(t, "namespace") ? t.namespace.split(".") : [];
      if (a = s = r = r || K, 3 !== r.nodeType && 8 !== r.nodeType && !Dt.test(d + Z.event.triggered) && (d.indexOf(".") >= 0 && (h = d.split("."), d = h.shift(), h.sort()), l = d.indexOf(":") < 0 && "on" + d, t = t[Z.expando] ? t : new Z.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : Z.makeArray(n, [t]), p = Z.event.special[d] || {}, i || !p.trigger || p.trigger.apply(r, n) !== !1)) {
        if (!i && !p.noBubble && !Z.isWindow(r)) {
          for (u = p.delegateType || d, Dt.test(u + d) || (a = a.parentNode); a; a = a.parentNode)f.push(a), s = a;
          s === (r.ownerDocument || K) && f.push(s.defaultView || s.parentWindow || e)
        }
        for (o = 0; (a = f[o++]) && !t.isPropagationStopped();)t.type = o > 1 ? u : p.bindType || d, c = (vt.get(a, "events") || {})[t.type] && vt.get(a, "handle"), c && c.apply(a, n), c = l && a[l], c && c.apply && Z.acceptData(a) && (t.result = c.apply(a, n), t.result === !1 && t.preventDefault());
        return t.type = d, i || t.isDefaultPrevented() || p._default && p._default.apply(f.pop(), n) !== !1 || !Z.acceptData(r) || l && Z.isFunction(r[d]) && !Z.isWindow(r) && (s = r[l], s && (r[l] = null), Z.event.triggered = d, r[d](), Z.event.triggered = void 0, s && (r[l] = s)), t.result
      }
    },
    dispatch: function (e) {
      e = Z.event.fix(e);
      var t, n, r, i, o, a = [], s = _.call(arguments), u = (vt.get(this, "events") || {})[e.type] || [], l = Z.event.special[e.type] || {};
      if (s[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
        for (a = Z.event.handlers.call(this, e, u), t = 0; (i = a[t++]) && !e.isPropagationStopped();)for (e.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((Z.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
        return l.postDispatch && l.postDispatch.call(this, e), e.result
      }
    },
    handlers: function (e, t) {
      var n, r, i, o, a = [], s = t.delegateCount, u = e.target;
      if (s && u.nodeType && (!e.button || "click" !== e.type))for (; u !== this; u = u.parentNode || this)if (u.disabled !== !0 || "click" !== e.type) {
        for (r = [], n = 0; s > n; n++)o = t[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? Z(i, this).index(u) >= 0 : Z.find(i, this, null, [u]).length), r[i] && r.push(o);
        r.length && a.push({elem: u, handlers: r})
      }
      return s < t.length && a.push({elem: this, handlers: t.slice(s)}), a
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "), filter: function (e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (e, t) {
        var n, r, i, o = t.button;
        return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || K, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
      }
    },
    fix: function (e) {
      if (e[Z.expando])return e;
      var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
      for (a || (this.fixHooks[i] = a = St.test(i) ? this.mouseHooks : Tt.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new Z.Event(o), t = r.length; t--;)n = r[t], e[n] = o[n];
      return e.target || (e.target = K), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, o) : e
    },
    special: {
      load: {noBubble: !0}, focus: {
        trigger: function () {
          return this !== p() && this.focus ? (this.focus(), !1) : void 0
        }, delegateType: "focusin"
      }, blur: {
        trigger: function () {
          return this === p() && this.blur ? (this.blur(), !1) : void 0
        }, delegateType: "focusout"
      }, click: {
        trigger: function () {
          return "checkbox" === this.type && this.click && Z.nodeName(this, "input") ? (this.click(), !1) : void 0
        }, _default: function (e) {
          return Z.nodeName(e.target, "a")
        }
      }, beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
        }
      }
    },
    simulate: function (e, t, n, r) {
      var i = Z.extend(new Z.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
      r ? Z.event.trigger(i, null, t) : Z.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
    }
  }, Z.removeEvent = function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n, !1)
  }, Z.Event = function (e, t) {
    return this instanceof Z.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? l : c) : this.type = e, t && Z.extend(this, t), this.timeStamp = e && e.timeStamp || Z.now(), void(this[Z.expando] = !0)) : new Z.Event(e, t)
  }, Z.Event.prototype = {
    isDefaultPrevented: c,
    isPropagationStopped: c,
    isImmediatePropagationStopped: c,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = l, e && e.preventDefault && e.preventDefault()
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = l, e && e.stopPropagation && e.stopPropagation()
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = l, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
    }
  }, Z.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, t) {
    Z.event.special[e] = {
      delegateType: t, bindType: t, handle: function (e) {
        var n, r = this, i = e.relatedTarget, o = e.handleObj;
        return (!i || i !== r && !Z.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
      }
    }
  }), Q.focusinBubbles || Z.each({focus: "focusin", blur: "focusout"}, function (e, t) {
    var n = function (e) {
      Z.event.simulate(t, e.target, Z.event.fix(e), !0)
    };
    Z.event.special[t] = {
      setup: function () {
        var r = this.ownerDocument || this, i = vt.access(r, t);
        i || r.addEventListener(e, n, !0), vt.access(r, t, (i || 0) + 1)
      }, teardown: function () {
        var r = this.ownerDocument || this, i = vt.access(r, t) - 1;
        i ? vt.access(r, t, i) : (r.removeEventListener(e, n, !0), vt.remove(r, t))
      }
    }
  }), Z.fn.extend({
    on: function (e, t, n, r, i) {
      var o, a;
      if ("object" == typeof e) {
        "string" != typeof t && (n = n || t, t = void 0);
        for (a in e)this.on(a, t, n, e[a], i);
        return this
      }
      if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1)r = c; else if (!r)return this;
      return 1 === i && (o = r, r = function (e) {
        return Z().off(e), o.apply(this, arguments)
      }, r.guid = o.guid || (o.guid = Z.guid++)), this.each(function () {
        Z.event.add(this, e, r, n, t)
      })
    }, one: function (e, t, n, r) {
      return this.on(e, t, n, r, 1)
    }, off: function (e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj)return r = e.handleObj, Z(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
      if ("object" == typeof e) {
        for (i in e)this.off(i, t, e[i]);
        return this
      }
      return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = c), this.each(function () {
        Z.event.remove(this, e, n, t)
      })
    }, trigger: function (e, t) {
      return this.each(function () {
        Z.event.trigger(e, t, this)
      })
    }, triggerHandler: function (e, t) {
      var n = this[0];
      return n ? Z.event.trigger(e, t, n, !0) : void 0
    }
  });
  var Mt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Ot = /<([\w:]+)/, Nt = /<|&#?\w+;/, Pt = /<(?:script|style|link)/i, qt = /checked\s*(?:[^=]|=\s*.checked.)/i, jt = /^$|\/(?:java|ecma)script/i, Rt = /^true\/(.*)/, Ht = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Lt = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  Lt.optgroup = Lt.option, Lt.tbody = Lt.tfoot = Lt.colgroup = Lt.caption = Lt.thead, Lt.th = Lt.td, Z.extend({
    clone: function (e, t, n) {
      var r, i, o, a, s = e.cloneNode(!0), u = Z.contains(e.ownerDocument, e);
      if (!(Q.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Z.isXMLDoc(e)))for (a = v(s), o = v(e), r = 0, i = o.length; i > r; r++)$(o[r], a[r]);
      if (t)if (n)for (o = o || v(e), a = a || v(s), r = 0, i = o.length; i > r; r++)m(o[r], a[r]); else m(e, s);
      return a = v(s, "script"), a.length > 0 && g(a, !u && v(e, "script")), s
    }, buildFragment: function (e, t, n, r) {
      for (var i, o, a, s, u, l, c = t.createDocumentFragment(), p = [], f = 0, d = e.length; d > f; f++)if (i = e[f], i || 0 === i)if ("object" === Z.type(i))Z.merge(p, i.nodeType ? [i] : i); else if (Nt.test(i)) {
        for (o = o || c.appendChild(t.createElement("div")), a = (Ot.exec(i) || ["", ""])[1].toLowerCase(), s = Lt[a] || Lt._default, o.innerHTML = s[1] + i.replace(Mt, "<$1></$2>") + s[2], l = s[0]; l--;)o = o.lastChild;
        Z.merge(p, o.childNodes), o = c.firstChild, o.textContent = ""
      } else p.push(t.createTextNode(i));
      for (c.textContent = "", f = 0; i = p[f++];)if ((!r || -1 === Z.inArray(i, r)) && (u = Z.contains(i.ownerDocument, i), o = v(c.appendChild(i), "script"), u && g(o), n))for (l = 0; i = o[l++];)jt.test(i.type || "") && n.push(i);
      return c
    }, cleanData: function (e) {
      for (var t, n, r, i, o = Z.event.special, a = 0; void 0 !== (n = e[a]); a++) {
        if (Z.acceptData(n) && (i = n[vt.expando], i && (t = vt.cache[i]))) {
          if (t.events)for (r in t.events)o[r] ? Z.event.remove(n, r) : Z.removeEvent(n, r, t.handle);
          vt.cache[i] && delete vt.cache[i]
        }
        delete $t.cache[n[$t.expando]]
      }
    }
  }), Z.fn.extend({
    text: function (e) {
      return mt(this, function (e) {
        return void 0 === e ? Z.text(this) : this.empty().each(function () {
          (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
        })
      }, null, e, arguments.length)
    }, append: function () {
      return this.domManip(arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = f(this, e);
          t.appendChild(e)
        }
      })
    }, prepend: function () {
      return this.domManip(arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = f(this, e);
          t.insertBefore(e, t.firstChild)
        }
      })
    }, before: function () {
      return this.domManip(arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this)
      })
    }, after: function () {
      return this.domManip(arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
      })
    }, remove: function (e, t) {
      for (var n, r = e ? Z.filter(e, this) : this, i = 0; null != (n = r[i]); i++)t || 1 !== n.nodeType || Z.cleanData(v(n)), n.parentNode && (t && Z.contains(n.ownerDocument, n) && g(v(n, "script")), n.parentNode.removeChild(n));
      return this
    }, empty: function () {
      for (var e, t = 0; null != (e = this[t]); t++)1 === e.nodeType && (Z.cleanData(v(e, !1)), e.textContent = "");
      return this
    }, clone: function (e, t) {
      return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
        return Z.clone(this, e, t)
      })
    }, html: function (e) {
      return mt(this, function (e) {
        var t = this[0] || {}, n = 0, r = this.length;
        if (void 0 === e && 1 === t.nodeType)return t.innerHTML;
        if ("string" == typeof e && !Pt.test(e) && !Lt[(Ot.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = e.replace(Mt, "<$1></$2>");
          try {
            for (; r > n; n++)t = this[n] || {}, 1 === t.nodeType && (Z.cleanData(v(t, !1)), t.innerHTML = e);
            t = 0
          } catch (i) {
          }
        }
        t && this.empty().append(e)
      }, null, e, arguments.length)
    }, replaceWith: function () {
      var e = arguments[0];
      return this.domManip(arguments, function (t) {
        e = this.parentNode, Z.cleanData(v(this)), e && e.replaceChild(t, this)
      }), e && (e.length || e.nodeType) ? this : this.remove()
    }, detach: function (e) {
      return this.remove(e, !0)
    }, domManip: function (e, t) {
      e = B.apply([], e);
      var n, r, i, o, a, s, u = 0, l = this.length, c = this, p = l - 1, f = e[0], g = Z.isFunction(f);
      if (g || l > 1 && "string" == typeof f && !Q.checkClone && qt.test(f))return this.each(function (n) {
        var r = c.eq(n);
        g && (e[0] = f.call(this, n, r.html())), r.domManip(e, t)
      });
      if (l && (n = Z.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
        for (i = Z.map(v(n, "script"), d), o = i.length; l > u; u++)a = n, u !== p && (a = Z.clone(a, !0, !0), o && Z.merge(i, v(a, "script"))), t.call(this[u], a, u);
        if (o)for (s = i[i.length - 1].ownerDocument, Z.map(i, h), u = 0; o > u; u++)a = i[u], jt.test(a.type || "") && !vt.access(a, "globalEval") && Z.contains(s, a) && (a.src ? Z._evalUrl && Z._evalUrl(a.src) : Z.globalEval(a.textContent.replace(Ht, "")))
      }
      return this
    }
  }), Z.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, t) {
    Z.fn[e] = function (e) {
      for (var n, r = [], i = Z(e), o = i.length - 1, a = 0; o >= a; a++)n = a === o ? this : this.clone(!0), Z(i[a])[t](n), W.apply(r, n.get());
      return this.pushStack(r)
    }
  });
  var Ft, It = {}, Vt = /^margin/, Ut = new RegExp("^(" + wt + ")(?!px)[a-z%]+$", "i"), _t = function (e) {
    return e.ownerDocument.defaultView.getComputedStyle(e, null)
  };
  !function () {
    function t() {
      a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a.innerHTML = "", i.appendChild(o);
      var t = e.getComputedStyle(a, null);
      n = "1%" !== t.top, r = "4px" === t.width, i.removeChild(o)
    }

    var n, r, i = K.documentElement, o = K.createElement("div"), a = K.createElement("div");
    a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", Q.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", o.appendChild(a), e.getComputedStyle && Z.extend(Q, {
      pixelPosition: function () {
        return t(), n
      }, boxSizingReliable: function () {
        return null == r && t(), r
      }, reliableMarginRight: function () {
        var t, n = a.appendChild(K.createElement("div"));
        return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", i.appendChild(o), t = !parseFloat(e.getComputedStyle(n, null).marginRight), i.removeChild(o), t
      }
    }))
  }(), Z.swap = function (e, t, n, r) {
    var i, o, a = {};
    for (o in t)a[o] = e.style[o], e.style[o] = t[o];
    i = n.apply(e, r || []);
    for (o in t)e.style[o] = a[o];
    return i
  };
  var Bt = /^(none|table(?!-c[ea]).+)/, Wt = new RegExp("^(" + wt + ")(.*)$", "i"), zt = new RegExp("^([+-])=(" + wt + ")", "i"), Yt = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  }, Xt = {letterSpacing: "0", fontWeight: "400"}, Gt = ["Webkit", "O", "Moz", "ms"];
  Z.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = w(e, "opacity");
            return "" === n ? "1" : n
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {"float": "cssFloat"},
    style: function (e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i, o, a, s = Z.camelCase(t), u = e.style;
        return t = Z.cssProps[s] || (Z.cssProps[s] = k(u, s)), a = Z.cssHooks[t] || Z.cssHooks[s], void 0 === n ? a && "get"in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t] : (o = typeof n, "string" === o && (i = zt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(Z.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || Z.cssNumber[s] || (n += "px"), Q.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), a && "set"in a && void 0 === (n = a.set(e, n, r)) || (u[t] = n)), void 0)
      }
    },
    css: function (e, t, n, r) {
      var i, o, a, s = Z.camelCase(t);
      return t = Z.cssProps[s] || (Z.cssProps[s] = k(e.style, s)), a = Z.cssHooks[t] || Z.cssHooks[s], a && "get"in a && (i = a.get(e, !0, n)), void 0 === i && (i = w(e, t, r)), "normal" === i && t in Xt && (i = Xt[t]), "" === n || n ? (o = parseFloat(i), n === !0 || Z.isNumeric(o) ? o || 0 : i) : i
    }
  }), Z.each(["height", "width"], function (e, t) {
    Z.cssHooks[t] = {
      get: function (e, n, r) {
        return n ? Bt.test(Z.css(e, "display")) && 0 === e.offsetWidth ? Z.swap(e, Yt, function () {
          return T(e, t, r)
        }) : T(e, t, r) : void 0
      }, set: function (e, n, r) {
        var i = r && _t(e);
        return C(e, n, r ? E(e, t, r, "border-box" === Z.css(e, "boxSizing", !1, i), i) : 0)
      }
    }
  }), Z.cssHooks.marginRight = x(Q.reliableMarginRight, function (e, t) {
    return t ? Z.swap(e, {display: "inline-block"}, w, [e, "marginRight"]) : void 0
  }), Z.each({margin: "", padding: "", border: "Width"}, function (e, t) {
    Z.cssHooks[e + t] = {
      expand: function (n) {
        for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)i[e + xt[r] + t] = o[r] || o[r - 2] || o[0];
        return i
      }
    }, Vt.test(e) || (Z.cssHooks[e + t].set = C)
  }), Z.fn.extend({
    css: function (e, t) {
      return mt(this, function (e, t, n) {
        var r, i, o = {}, a = 0;
        if (Z.isArray(t)) {
          for (r = _t(e), i = t.length; i > a; a++)o[t[a]] = Z.css(e, t[a], !1, r);
          return o
        }
        return void 0 !== n ? Z.style(e, t, n) : Z.css(e, t)
      }, e, t, arguments.length > 1)
    }, show: function () {
      return S(this, !0)
    }, hide: function () {
      return S(this)
    }, toggle: function (e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        kt(this) ? Z(this).show() : Z(this).hide()
      })
    }
  }), Z.Tween = D, D.prototype = {
    constructor: D, init: function (e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (Z.cssNumber[n] ? "" : "px")
    }, cur: function () {
      var e = D.propHooks[this.prop];
      return e && e.get ? e.get(this) : D.propHooks._default.get(this)
    }, run: function (e) {
      var t, n = D.propHooks[this.prop];
      return this.pos = t = this.options.duration ? Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : D.propHooks._default.set(this), this
    }
  }, D.prototype.init.prototype = D.prototype, D.propHooks = {
    _default: {
      get: function (e) {
        var t;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Z.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
      }, set: function (e) {
        Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
      }
    }
  }, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
    set: function (e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
  }, Z.easing = {
    linear: function (e) {
      return e
    }, swing: function (e) {
      return .5 - Math.cos(e * Math.PI) / 2
    }
  }, Z.fx = D.prototype.init, Z.fx.step = {};
  var Qt, Kt, Jt = /^(?:toggle|show|hide)$/, Zt = new RegExp("^(?:([+-])=|)(" + wt + ")([a-z%]*)$", "i"), en = /queueHooks$/, tn = [N], nn = {
    "*": [function (e, t) {
      var n = this.createTween(e, t), r = n.cur(), i = Zt.exec(t), o = i && i[3] || (Z.cssNumber[e] ? "" : "px"), a = (Z.cssNumber[e] || "px" !== o && +r) && Zt.exec(Z.css(n.elem, e)), s = 1, u = 20;
      if (a && a[3] !== o) {
        o = o || a[3], i = i || [], a = +r || 1;
        do s = s || ".5", a /= s, Z.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --u)
      }
      return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
    }]
  };
  Z.Animation = Z.extend(q, {
    tweener: function (e, t) {
      Z.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
      for (var n, r = 0, i = e.length; i > r; r++)n = e[r], nn[n] = nn[n] || [], nn[n].unshift(t)
    }, prefilter: function (e, t) {
      t ? tn.unshift(e) : tn.push(e)
    }
  }), Z.speed = function (e, t, n) {
    var r = e && "object" == typeof e ? Z.extend({}, e) : {
      complete: n || !n && t || Z.isFunction(e) && e,
      duration: e,
      easing: n && t || t && !Z.isFunction(t) && t
    };
    return r.duration = Z.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in Z.fx.speeds ? Z.fx.speeds[r.duration] : Z.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      Z.isFunction(r.old) && r.old.call(this), r.queue && Z.dequeue(this, r.queue)
    }, r
  }, Z.fn.extend({
    fadeTo: function (e, t, n, r) {
      return this.filter(kt).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
    }, animate: function (e, t, n, r) {
      var i = Z.isEmptyObject(e), o = Z.speed(t, n, r), a = function () {
        var t = q(this, Z.extend({}, e), o);
        (i || vt.get(this, "finish")) && t.stop(!0)
      };
      return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
    }, stop: function (e, t, n) {
      var r = function (e) {
        var t = e.stop;
        delete e.stop, t(n)
      };
      return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
        var t = !0, i = null != e && e + "queueHooks", o = Z.timers, a = vt.get(this);
        if (i)a[i] && a[i].stop && r(a[i]); else for (i in a)a[i] && a[i].stop && en.test(i) && r(a[i]);
        for (i = o.length; i--;)o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
        (t || !n) && Z.dequeue(this, e)
      })
    }, finish: function (e) {
      return e !== !1 && (e = e || "fx"), this.each(function () {
        var t, n = vt.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = Z.timers, a = r ? r.length : 0;
        for (n.finish = !0, Z.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
        for (t = 0; a > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
        delete n.finish
      })
    }
  }), Z.each(["toggle", "show", "hide"], function (e, t) {
    var n = Z.fn[t];
    Z.fn[t] = function (e, r, i) {
      return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(M(t, !0), e, r, i)
    }
  }), Z.each({
    slideDown: M("show"),
    slideUp: M("hide"),
    slideToggle: M("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function (e, t) {
    Z.fn[e] = function (e, n, r) {
      return this.animate(t, e, n, r)
    }
  }), Z.timers = [], Z.fx.tick = function () {
    var e, t = 0, n = Z.timers;
    for (Qt = Z.now(); t < n.length; t++)e = n[t], e() || n[t] !== e || n.splice(t--, 1);
    n.length || Z.fx.stop(), Qt = void 0
  }, Z.fx.timer = function (e) {
    Z.timers.push(e), e() ? Z.fx.start() : Z.timers.pop()
  }, Z.fx.interval = 13, Z.fx.start = function () {
    Kt || (Kt = setInterval(Z.fx.tick, Z.fx.interval))
  }, Z.fx.stop = function () {
    clearInterval(Kt), Kt = null
  }, Z.fx.speeds = {slow: 600, fast: 200, _default: 400}, Z.fn.delay = function (e, t) {
    return e = Z.fx ? Z.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
      var r = setTimeout(t, e);
      n.stop = function () {
        clearTimeout(r)
      }
    })
  }, function () {
    var e = K.createElement("input"), t = K.createElement("select"), n = t.appendChild(K.createElement("option"));
    e.type = "checkbox", Q.checkOn = "" !== e.value, Q.optSelected = n.selected, t.disabled = !0, Q.optDisabled = !n.disabled, e = K.createElement("input"), e.value = "t", e.type = "radio", Q.radioValue = "t" === e.value
  }();
  var rn, on, an = Z.expr.attrHandle;
  Z.fn.extend({
    attr: function (e, t) {
      return mt(this, Z.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
      return this.each(function () {
        Z.removeAttr(this, e)
      })
    }
  }), Z.extend({
    attr: function (e, t, n) {
      var r, i, o = e.nodeType;
      if (e && 3 !== o && 8 !== o && 2 !== o)return typeof e.getAttribute === Et ? Z.prop(e, t, n) : (1 === o && Z.isXMLDoc(e) || (t = t.toLowerCase(), r = Z.attrHooks[t] || (Z.expr.match.bool.test(t) ? on : rn)), void 0 === n ? r && "get"in r && null !== (i = r.get(e, t)) ? i : (i = Z.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set"in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void Z.removeAttr(e, t))
    }, removeAttr: function (e, t) {
      var n, r, i = 0, o = t && t.match(dt);
      if (o && 1 === e.nodeType)for (; n = o[i++];)r = Z.propFix[n] || n, Z.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
    }, attrHooks: {
      type: {
        set: function (e, t) {
          if (!Q.radioValue && "radio" === t && Z.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
          }
        }
      }
    }
  }), on = {
    set: function (e, t, n) {
      return t === !1 ? Z.removeAttr(e, n) : e.setAttribute(n, n), n
    }
  }, Z.each(Z.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var n = an[t] || Z.find.attr;
    an[t] = function (e, t, r) {
      var i, o;
      return r || (o = an[t], an[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, an[t] = o), i
    }
  });
  var sn = /^(?:input|select|textarea|button)$/i;
  Z.fn.extend({
    prop: function (e, t) {
      return mt(this, Z.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
      return this.each(function () {
        delete this[Z.propFix[e] || e]
      })
    }
  }), Z.extend({
    propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
      var r, i, o, a = e.nodeType;
      if (e && 3 !== a && 8 !== a && 2 !== a)return o = 1 !== a || !Z.isXMLDoc(e), o && (t = Z.propFix[t] || t, i = Z.propHooks[t]), void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
    }, propHooks: {
      tabIndex: {
        get: function (e) {
          return e.hasAttribute("tabindex") || sn.test(e.nodeName) || e.href ? e.tabIndex : -1
        }
      }
    }
  }), Q.optSelected || (Z.propHooks.selected = {
    get: function (e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null
    }
  }), Z.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    Z.propFix[this.toLowerCase()] = this
  });
  var un = /[\t\r\n\f]/g;
  Z.fn.extend({
    addClass: function (e) {
      var t, n, r, i, o, a, s = "string" == typeof e && e, u = 0, l = this.length;
      if (Z.isFunction(e))return this.each(function (t) {
        Z(this).addClass(e.call(this, t, this.className))
      });
      if (s)for (t = (e || "").match(dt) || []; l > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(un, " ") : " ")) {
        for (o = 0; i = t[o++];)r.indexOf(" " + i + " ") < 0 && (r += i + " ");
        a = Z.trim(r), n.className !== a && (n.className = a)
      }
      return this
    }, removeClass: function (e) {
      var t, n, r, i, o, a, s = 0 === arguments.length || "string" == typeof e && e, u = 0, l = this.length;
      if (Z.isFunction(e))return this.each(function (t) {
        Z(this).removeClass(e.call(this, t, this.className))
      });
      if (s)for (t = (e || "").match(dt) || []; l > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(un, " ") : "")) {
        for (o = 0; i = t[o++];)for (; r.indexOf(" " + i + " ") >= 0;)r = r.replace(" " + i + " ", " ");
        a = e ? Z.trim(r) : "", n.className !== a && (n.className = a)
      }
      return this
    }, toggleClass: function (e, t) {
      var n = typeof e;
      return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(Z.isFunction(e) ? function (n) {
        Z(this).toggleClass(e.call(this, n, this.className, t), t)
      } : function () {
        if ("string" === n)for (var t, r = 0, i = Z(this), o = e.match(dt) || []; t = o[r++];)i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else(n === Et || "boolean" === n) && (this.className && vt.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : vt.get(this, "__className__") || "")
      })
    }, hasClass: function (e) {
      for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(un, " ").indexOf(t) >= 0)return !0;
      return !1
    }
  });
  var ln = /\r/g;
  Z.fn.extend({
    val: function (e) {
      var t, n, r, i = this[0];
      {
        if (arguments.length)return r = Z.isFunction(e), this.each(function (n) {
          var i;
          1 === this.nodeType && (i = r ? e.call(this, n, Z(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : Z.isArray(i) && (i = Z.map(i, function (e) {
            return null == e ? "" : e + ""
          })), t = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], t && "set"in t && void 0 !== t.set(this, i, "value") || (this.value = i))
        });
        if (i)return t = Z.valHooks[i.type] || Z.valHooks[i.nodeName.toLowerCase()], t && "get"in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(ln, "") : null == n ? "" : n)
      }
    }
  }), Z.extend({
    valHooks: {
      option: {
        get: function (e) {
          var t = Z.find.attr(e, "value");
          return null != t ? t : Z.trim(Z.text(e))
        }
      }, select: {
        get: function (e) {
          for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++)if (n = r[u], !(!n.selected && u !== i || (Q.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && Z.nodeName(n.parentNode, "optgroup"))) {
            if (t = Z(n).val(), o)return t;
            a.push(t)
          }
          return a
        }, set: function (e, t) {
          for (var n, r, i = e.options, o = Z.makeArray(t), a = i.length; a--;)r = i[a], (r.selected = Z.inArray(r.value, o) >= 0) && (n = !0);
          return n || (e.selectedIndex = -1), o
        }
      }
    }
  }), Z.each(["radio", "checkbox"], function () {
    Z.valHooks[this] = {
      set: function (e, t) {
        return Z.isArray(t) ? e.checked = Z.inArray(Z(e).val(), t) >= 0 : void 0
      }
    }, Q.checkOn || (Z.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value
    })
  }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
    Z.fn[t] = function (e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
    }
  }), Z.fn.extend({
    hover: function (e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    }, bind: function (e, t, n) {
      return this.on(e, null, t, n)
    }, unbind: function (e, t) {
      return this.off(e, null, t)
    }, delegate: function (e, t, n, r) {
      return this.on(t, e, n, r)
    }, undelegate: function (e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }
  });
  var cn = Z.now(), pn = /\?/;
  Z.parseJSON = function (e) {
    return JSON.parse(e + "")
  }, Z.parseXML = function (e) {
    var t, n;
    if (!e || "string" != typeof e)return null;
    try {
      n = new DOMParser, t = n.parseFromString(e, "text/xml")
    } catch (r) {
      t = void 0
    }
    return (!t || t.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + e), t
  };
  var fn, dn, hn = /#.*$/, gn = /([?&])_=[^&]*/, mn = /^(.*?):[ \t]*([^\r\n]*)$/gm, vn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, $n = /^(?:GET|HEAD)$/, yn = /^\/\//, bn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, wn = {}, xn = {}, kn = "*/".concat("*");
  try {
    dn = location.href
  } catch (Cn) {
    dn = K.createElement("a"), dn.href = "", dn = dn.href
  }
  fn = bn.exec(dn.toLowerCase()) || [], Z.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: dn,
      type: "GET",
      isLocal: vn.test(fn[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": kn,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {xml: /xml/, html: /html/, json: /json/},
      responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
      converters: {"* text": String, "text html": !0, "text json": Z.parseJSON, "text xml": Z.parseXML},
      flatOptions: {url: !0, context: !0}
    },
    ajaxSetup: function (e, t) {
      return t ? H(H(e, Z.ajaxSettings), t) : H(Z.ajaxSettings, e)
    },
    ajaxPrefilter: j(wn),
    ajaxTransport: j(xn),
    ajax: function (e, t) {
      function n(e, t, n, a) {
        var u, c, v, $, b, x = t;
        2 !== y && (y = 2, s && clearTimeout(s), r = void 0, o = a || "", w.readyState = e > 0 ? 4 : 0, u = e >= 200 && 300 > e || 304 === e, n && ($ = L(p, w, n)), $ = F(p, $, w, u), u ? (p.ifModified && (b = w.getResponseHeader("Last-Modified"), b && (Z.lastModified[i] = b), b = w.getResponseHeader("etag"), b && (Z.etag[i] = b)), 204 === e || "HEAD" === p.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = $.state, c = $.data, v = $.error, u = !v)) : (v = x, (e || !x) && (x = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || x) + "", u ? h.resolveWith(f, [c, x, w]) : h.rejectWith(f, [w, x, v]), w.statusCode(m), m = void 0, l && d.trigger(u ? "ajaxSuccess" : "ajaxError", [w, p, u ? c : v]), g.fireWith(f, [w, x]), l && (d.trigger("ajaxComplete", [w, p]), --Z.active || Z.event.trigger("ajaxStop")))
      }

      "object" == typeof e && (t = e, e = void 0), t = t || {};
      var r, i, o, a, s, u, l, c, p = Z.ajaxSetup({}, t), f = p.context || p, d = p.context && (f.nodeType || f.jquery) ? Z(f) : Z.event, h = Z.Deferred(), g = Z.Callbacks("once memory"), m = p.statusCode || {}, v = {}, $ = {}, y = 0, b = "canceled", w = {
        readyState: 0,
        getResponseHeader: function (e) {
          var t;
          if (2 === y) {
            if (!a)for (a = {}; t = mn.exec(o);)a[t[1].toLowerCase()] = t[2];
            t = a[e.toLowerCase()]
          }
          return null == t ? null : t
        },
        getAllResponseHeaders: function () {
          return 2 === y ? o : null
        },
        setRequestHeader: function (e, t) {
          var n = e.toLowerCase();
          return y || (e = $[n] = $[n] || e, v[e] = t), this
        },
        overrideMimeType: function (e) {
          return y || (p.mimeType = e), this
        },
        statusCode: function (e) {
          var t;
          if (e)if (2 > y)for (t in e)m[t] = [m[t], e[t]]; else w.always(e[w.status]);
          return this
        },
        abort: function (e) {
          var t = e || b;
          return r && r.abort(t), n(0, t), this
        }
      };
      if (h.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, p.url = ((e || p.url || dn) + "").replace(hn, "").replace(yn, fn[1] + "//"), p.type = t.method || t.type || p.method || p.type, p.dataTypes = Z.trim(p.dataType || "*").toLowerCase().match(dt) || [""], null == p.crossDomain && (u = bn.exec(p.url.toLowerCase()), p.crossDomain = !(!u || u[1] === fn[1] && u[2] === fn[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (fn[3] || ("http:" === fn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = Z.param(p.data, p.traditional)), R(wn, p, t, w), 2 === y)return w;
      l = p.global, l && 0 === Z.active++ && Z.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !$n.test(p.type), i = p.url, p.hasContent || (p.data && (i = p.url += (pn.test(i) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = gn.test(i) ? i.replace(gn, "$1_=" + cn++) : i + (pn.test(i) ? "&" : "?") + "_=" + cn++)), p.ifModified && (Z.lastModified[i] && w.setRequestHeader("If-Modified-Since", Z.lastModified[i]), Z.etag[i] && w.setRequestHeader("If-None-Match", Z.etag[i])), (p.data && p.hasContent && p.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", p.contentType), w.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + kn + "; q=0.01" : "") : p.accepts["*"]);
      for (c in p.headers)w.setRequestHeader(c, p.headers[c]);
      if (p.beforeSend && (p.beforeSend.call(f, w, p) === !1 || 2 === y))return w.abort();
      b = "abort";
      for (c in{success: 1, error: 1, complete: 1})w[c](p[c]);
      if (r = R(xn, p, t, w)) {
        w.readyState = 1, l && d.trigger("ajaxSend", [w, p]), p.async && p.timeout > 0 && (s = setTimeout(function () {
          w.abort("timeout")
        }, p.timeout));
        try {
          y = 1, r.send(v, n)
        } catch (x) {
          if (!(2 > y))throw x;
          n(-1, x)
        }
      } else n(-1, "No Transport");
      return w
    },
    getJSON: function (e, t, n) {
      return Z.get(e, t, n, "json")
    },
    getScript: function (e, t) {
      return Z.get(e, void 0, t, "script")
    }
  }), Z.each(["get", "post"], function (e, t) {
    Z[t] = function (e, n, r, i) {
      return Z.isFunction(n) && (i = i || r, r = n, n = void 0), Z.ajax({
        url: e,
        type: t,
        dataType: i,
        data: n,
        success: r
      })
    }
  }), Z.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    Z.fn[t] = function (e) {
      return this.on(t, e)
    }
  }), Z._evalUrl = function (e) {
    return Z.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
  }, Z.fn.extend({
    wrapAll: function (e) {
      var t;
      return Z.isFunction(e) ? this.each(function (t) {
        Z(this).wrapAll(e.call(this, t))
      }) : (this[0] && (t = Z(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        for (var e = this; e.firstElementChild;)e = e.firstElementChild;
        return e
      }).append(this)), this)
    }, wrapInner: function (e) {
      return this.each(Z.isFunction(e) ? function (t) {
        Z(this).wrapInner(e.call(this, t))
      } : function () {
        var t = Z(this), n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e)
      })
    }, wrap: function (e) {
      var t = Z.isFunction(e);
      return this.each(function (n) {
        Z(this).wrapAll(t ? e.call(this, n) : e)
      })
    }, unwrap: function () {
      return this.parent().each(function () {
        Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes)
      }).end()
    }
  }), Z.expr.filters.hidden = function (e) {
    return e.offsetWidth <= 0 && e.offsetHeight <= 0
  }, Z.expr.filters.visible = function (e) {
    return !Z.expr.filters.hidden(e)
  };
  var En = /%20/g, Tn = /\[\]$/, Sn = /\r?\n/g, Dn = /^(?:submit|button|image|reset|file)$/i, An = /^(?:input|select|textarea|keygen)/i;
  Z.param = function (e, t) {
    var n, r = [], i = function (e, t) {
      t = Z.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
    };
    if (void 0 === t && (t = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || e.jquery && !Z.isPlainObject(e))Z.each(e, function () {
      i(this.name, this.value)
    }); else for (n in e)I(n, e[n], t, i);
    return r.join("&").replace(En, "+")
  }, Z.fn.extend({
    serialize: function () {
      return Z.param(this.serializeArray())
    }, serializeArray: function () {
      return this.map(function () {
        var e = Z.prop(this, "elements");
        return e ? Z.makeArray(e) : this
      }).filter(function () {
        var e = this.type;
        return this.name && !Z(this).is(":disabled") && An.test(this.nodeName) && !Dn.test(e) && (this.checked || !Ct.test(e))
      }).map(function (e, t) {
        var n = Z(this).val();
        return null == n ? null : Z.isArray(n) ? Z.map(n, function (e) {
          return {name: t.name, value: e.replace(Sn, "\r\n")}
        }) : {name: t.name, value: n.replace(Sn, "\r\n")}
      }).get()
    }
  }), Z.ajaxSettings.xhr = function () {
    try {
      return new XMLHttpRequest
    } catch (e) {
    }
  };
  var Mn = 0, On = {}, Nn = {0: 200, 1223: 204}, Pn = Z.ajaxSettings.xhr();
  e.ActiveXObject && Z(e).on("unload", function () {
    for (var e in On)On[e]()
  }), Q.cors = !!Pn && "withCredentials"in Pn, Q.ajax = Pn = !!Pn, Z.ajaxTransport(function (e) {
    var t;
    return Q.cors || Pn && !e.crossDomain ? {
      send: function (n, r) {
        var i, o = e.xhr(), a = ++Mn;
        if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (i in e.xhrFields)o[i] = e.xhrFields[i];
        e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
        for (i in n)o.setRequestHeader(i, n[i]);
        t = function (e) {
          return function () {
            t && (delete On[a], t = o.onload = o.onerror = null, "abort" === e ? o.abort() : "error" === e ? r(o.status, o.statusText) : r(Nn[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {text: o.responseText} : void 0, o.getAllResponseHeaders()))
          }
        }, o.onload = t(), o.onerror = t("error"), t = On[a] = t("abort");
        try {
          o.send(e.hasContent && e.data || null)
        } catch (s) {
          if (t)throw s
        }
      }, abort: function () {
        t && t()
      }
    } : void 0
  }), Z.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
    contents: {script: /(?:java|ecma)script/},
    converters: {
      "text script": function (e) {
        return Z.globalEval(e), e
      }
    }
  }), Z.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
  }), Z.ajaxTransport("script", function (e) {
    if (e.crossDomain) {
      var t, n;
      return {
        send: function (r, i) {
          t = Z("<script>").prop({async: !0, charset: e.scriptCharset, src: e.url}).on("load error", n = function (e) {
            t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
          }), K.head.appendChild(t[0])
        }, abort: function () {
          n && n()
        }
      }
    }
  });
  var qn = [], jn = /(=)\?(?=&|$)|\?\?/;
  Z.ajaxSetup({
    jsonp: "callback", jsonpCallback: function () {
      var e = qn.pop() || Z.expando + "_" + cn++;
      return this[e] = !0, e
    }
  }), Z.ajaxPrefilter("json jsonp", function (t, n, r) {
    var i, o, a, s = t.jsonp !== !1 && (jn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && jn.test(t.data) && "data");
    return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = Z.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(jn, "$1" + i) : t.jsonp !== !1 && (t.url += (pn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
      return a || Z.error(i + " was not called"), a[0]
    }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
      a = arguments
    }, r.always(function () {
      e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, qn.push(i)), a && Z.isFunction(o) && o(a[0]), a = o = void 0
    }), "script") : void 0
  }), Z.parseHTML = function (e, t, n) {
    if (!e || "string" != typeof e)return null;
    "boolean" == typeof t && (n = t, t = !1), t = t || K;
    var r = at.exec(e), i = !n && [];
    return r ? [t.createElement(r[1])] : (r = Z.buildFragment([e], t, i), i && i.length && Z(i).remove(), Z.merge([], r.childNodes))
  };
  var Rn = Z.fn.load;
  Z.fn.load = function (e, t, n) {
    if ("string" != typeof e && Rn)return Rn.apply(this, arguments);
    var r, i, o, a = this, s = e.indexOf(" ");
    return s >= 0 && (r = Z.trim(e.slice(s)), e = e.slice(0, s)), Z.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && Z.ajax({
      url: e,
      type: i,
      dataType: "html",
      data: t
    }).done(function (e) {
      o = arguments, a.html(r ? Z("<div>").append(Z.parseHTML(e)).find(r) : e)
    }).complete(n && function (e, t) {
        a.each(n, o || [e.responseText, t, e])
      }), this
  }, Z.expr.filters.animated = function (e) {
    return Z.grep(Z.timers, function (t) {
      return e === t.elem
    }).length
  };
  var Hn = e.document.documentElement;
  Z.offset = {
    setOffset: function (e, t, n) {
      var r, i, o, a, s, u, l, c = Z.css(e, "position"), p = Z(e), f = {};
      "static" === c && (e.style.position = "relative"), s = p.offset(), o = Z.css(e, "top"), u = Z.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = p.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), Z.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using"in t ? t.using.call(e, f) : p.css(f)
    }
  }, Z.fn.extend({
    offset: function (e) {
      if (arguments.length)return void 0 === e ? this : this.each(function (t) {
        Z.offset.setOffset(this, e, t)
      });
      var t, n, r = this[0], i = {top: 0, left: 0}, o = r && r.ownerDocument;
      if (o)return t = o.documentElement, Z.contains(t, r) ? (typeof r.getBoundingClientRect !== Et && (i = r.getBoundingClientRect()), n = V(o), {
        top: i.top + n.pageYOffset - t.clientTop,
        left: i.left + n.pageXOffset - t.clientLeft
      }) : i
    }, position: function () {
      if (this[0]) {
        var e, t, n = this[0], r = {top: 0, left: 0};
        return "fixed" === Z.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), Z.nodeName(e[0], "html") || (r = e.offset()), r.top += Z.css(e[0], "borderTopWidth", !0), r.left += Z.css(e[0], "borderLeftWidth", !0)), {
          top: t.top - r.top - Z.css(n, "marginTop", !0),
          left: t.left - r.left - Z.css(n, "marginLeft", !0)
        }
      }
    }, offsetParent: function () {
      return this.map(function () {
        for (var e = this.offsetParent || Hn; e && !Z.nodeName(e, "html") && "static" === Z.css(e, "position");)e = e.offsetParent;
        return e || Hn
      })
    }
  }), Z.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, n) {
    var r = "pageYOffset" === n;
    Z.fn[t] = function (i) {
      return mt(this, function (t, i, o) {
        var a = V(t);
        return void 0 === o ? a ? a[n] : t[i] : void(a ? a.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o)
      }, t, i, arguments.length, null)
    }
  }), Z.each(["top", "left"], function (e, t) {
    Z.cssHooks[t] = x(Q.pixelPosition, function (e, n) {
      return n ? (n = w(e, t), Ut.test(n) ? Z(e).position()[t] + "px" : n) : void 0
    })
  }), Z.each({Height: "height", Width: "width"}, function (e, t) {
    Z.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
      Z.fn[r] = function (r, i) {
        var o = arguments.length && (n || "boolean" != typeof r), a = n || (r === !0 || i === !0 ? "margin" : "border");
        return mt(this, function (t, n, r) {
          var i;
          return Z.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? Z.css(t, n, a) : Z.style(t, n, r, a)
        }, t, o ? r : void 0, o, null)
      }
    })
  }), Z.fn.size = function () {
    return this.length
  }, Z.fn.andSelf = Z.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
    return Z
  });
  var Ln = e.jQuery, Fn = e.$;
  return Z.noConflict = function (t) {
    return e.$ === Z && (e.$ = Fn), t && e.jQuery === Z && (e.jQuery = Ln), Z
  }, typeof t === Et && (e.jQuery = e.$ = Z), Z
}), function (e, t, n) {
  "use strict";
  function r(e) {
    return function () {
      var t, n, r = arguments[0], i = "[" + (e ? e + ":" : "") + r + "] ", o = arguments[1], a = arguments, s = function (e) {
        return "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? JSON.stringify(e) : e
      };
      for (t = i + o.replace(/\{\d+\}/g, function (e) {
          var t, n = +e.slice(1, -1);
          return n + 2 < a.length ? (t = a[n + 2], "function" == typeof t ? t.toString().replace(/ ?\{[\s\S]*$/, "") : "undefined" == typeof t ? "undefined" : "string" != typeof t ? _(t) : t) : e
        }), t = t + "\nhttp://errors.angularjs.org/1.2.16/" + (e ? e + "/" : "") + r, n = 2; n < arguments.length; n++)t = t + (2 == n ? "?" : "&") + "p" + (n - 2) + "=" + encodeURIComponent(s(arguments[n]));
      return new Error(t)
    }
  }

  function i(e) {
    if (null == e || T(e))return !1;
    var t = e.length;
    return 1 === e.nodeType && t ? !0 : b(e) || k(e) || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
  }

  function o(e, t, n) {
    var r;
    if (e)if (C(e))for (r in e)"prototype" == r || "length" == r || "name" == r || e.hasOwnProperty && !e.hasOwnProperty(r) || t.call(n, e[r], r); else if (e.forEach && e.forEach !== o)e.forEach(t, n); else if (i(e))for (r = 0; r < e.length; r++)t.call(n, e[r], r); else for (r in e)e.hasOwnProperty(r) && t.call(n, e[r], r);
    return e
  }

  function a(e) {
    var t = [];
    for (var n in e)e.hasOwnProperty(n) && t.push(n);
    return t.sort()
  }

  function s(e, t, n) {
    for (var r = a(e), i = 0; i < r.length; i++)t.call(n, e[r[i]], r[i]);
    return r
  }

  function u(e) {
    return function (t, n) {
      e(n, t)
    }
  }

  function l() {
    for (var e, t = Dr.length; t;) {
      if (t--, e = Dr[t].charCodeAt(0), 57 == e)return Dr[t] = "A", Dr.join("");
      if (90 != e)return Dr[t] = String.fromCharCode(e + 1), Dr.join("");
      Dr[t] = "0"
    }
    return Dr.unshift("0"), Dr.join("")
  }

  function c(e, t) {
    t ? e.$$hashKey = t : delete e.$$hashKey
  }

  function p(e) {
    var t = e.$$hashKey;
    return o(arguments, function (t) {
      t !== e && o(t, function (t, n) {
        e[n] = t
      })
    }), c(e, t), e
  }

  function f(e) {
    return parseInt(e, 10)
  }

  function d(e, t) {
    return p(new (p(function () {
    }, {prototype: e})), t)
  }

  function h() {
  }

  function g(e) {
    return e
  }

  function m(e) {
    return function () {
      return e
    }
  }

  function v(e) {
    return "undefined" == typeof e
  }

  function $(e) {
    return "undefined" != typeof e
  }

  function y(e) {
    return null != e && "object" == typeof e
  }

  function b(e) {
    return "string" == typeof e
  }

  function w(e) {
    return "number" == typeof e
  }

  function x(e) {
    return "[object Date]" === Er.call(e)
  }

  function k(e) {
    return "[object Array]" === Er.call(e)
  }

  function C(e) {
    return "function" == typeof e
  }

  function E(e) {
    return "[object RegExp]" === Er.call(e)
  }

  function T(e) {
    return e && e.document && e.location && e.alert && e.setInterval
  }

  function S(e) {
    return e && e.$evalAsync && e.$watch
  }

  function D(e) {
    return "[object File]" === Er.call(e)
  }

  function A(e) {
    return "[object Blob]" === Er.call(e)
  }

  function M(e) {
    return !(!e || !(e.nodeName || e.prop && e.attr && e.find))
  }

  function O(e, t, n) {
    var r = [];
    return o(e, function (e, i, o) {
      r.push(t.call(n, e, i, o))
    }), r
  }

  function N(e, t) {
    return -1 != P(e, t)
  }

  function P(e, t) {
    if (e.indexOf)return e.indexOf(t);
    for (var n = 0; n < e.length; n++)if (t === e[n])return n;
    return -1
  }

  function q(e, t) {
    var n = P(e, t);
    return n >= 0 && e.splice(n, 1), t
  }

  function j(e, t) {
    if (T(e) || S(e))throw Tr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
    if (t) {
      if (e === t)throw Tr("cpi", "Can't copy! Source and destination are identical.");
      if (k(e)) {
        t.length = 0;
        for (var n = 0; n < e.length; n++)t.push(j(e[n]))
      } else {
        var r = t.$$hashKey;
        o(t, function (e, n) {
          delete t[n]
        });
        for (var i in e)t[i] = j(e[i]);
        c(t, r)
      }
    } else t = e, e && (k(e) ? t = j(e, []) : x(e) ? t = new Date(e.getTime()) : E(e) ? t = new RegExp(e.source) : y(e) && (t = j(e, {})));
    return t
  }

  function R(e, t) {
    t = t || {};
    for (var n in e)!e.hasOwnProperty(n) || "$" === n.charAt(0) && "$" === n.charAt(1) || (t[n] = e[n]);
    return t
  }

  function H(e, t) {
    if (e === t)return !0;
    if (null === e || null === t)return !1;
    if (e !== e && t !== t)return !0;
    var r, i, o, a = typeof e, s = typeof t;
    if (a == s && "object" == a) {
      if (!k(e)) {
        if (x(e))return x(t) && e.getTime() == t.getTime();
        if (E(e) && E(t))return e.toString() == t.toString();
        if (S(e) || S(t) || T(e) || T(t) || k(t))return !1;
        o = {};
        for (i in e)if ("$" !== i.charAt(0) && !C(e[i])) {
          if (!H(e[i], t[i]))return !1;
          o[i] = !0
        }
        for (i in t)if (!o.hasOwnProperty(i) && "$" !== i.charAt(0) && t[i] !== n && !C(t[i]))return !1;
        return !0
      }
      if (!k(t))return !1;
      if ((r = e.length) == t.length) {
        for (i = 0; r > i; i++)if (!H(e[i], t[i]))return !1;
        return !0
      }
    }
    return !1
  }

  function L() {
    return t.securityPolicy && t.securityPolicy.isActive || t.querySelector && !(!t.querySelector("[ng-csp]") && !t.querySelector("[data-ng-csp]"))
  }

  function F(e, t, n) {
    return e.concat(kr.call(t, n))
  }

  function I(e, t) {
    return kr.call(e, t || 0)
  }

  function V(e, t) {
    var n = arguments.length > 2 ? I(arguments, 2) : [];
    return !C(t) || t instanceof RegExp ? t : n.length ? function () {
      return arguments.length ? t.apply(e, n.concat(kr.call(arguments, 0))) : t.apply(e, n)
    } : function () {
      return arguments.length ? t.apply(e, arguments) : t.call(e)
    }
  }

  function U(e, r) {
    var i = r;
    return "string" == typeof e && "$" === e.charAt(0) ? i = n : T(r) ? i = "$WINDOW" : r && t === r ? i = "$DOCUMENT" : S(r) && (i = "$SCOPE"), i
  }

  function _(e, t) {
    return "undefined" == typeof e ? n : JSON.stringify(e, U, t ? "  " : null)
  }

  function B(e) {
    return b(e) ? JSON.parse(e) : e
  }

  function W(e) {
    if ("function" == typeof e)e = !0; else if (e && 0 !== e.length) {
      var t = dr("" + e);
      e = !("f" == t || "0" == t || "false" == t || "no" == t || "n" == t || "[]" == t)
    } else e = !1;
    return e
  }

  function z(e) {
    e = yr(e).clone();
    try {
      e.empty()
    } catch (t) {
    }
    var n = 3, r = yr("<div>").append(e).html();
    try {
      return e[0].nodeType === n ? dr(r) : r.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (e, t) {
        return "<" + dr(t)
      })
    } catch (t) {
      return dr(r)
    }
  }

  function Y(e) {
    try {
      return decodeURIComponent(e)
    } catch (t) {
    }
  }

  function X(e) {
    var t, n, r = {};
    return o((e || "").split("&"), function (e) {
      if (e && (t = e.split("="), n = Y(t[0]), $(n))) {
        var i = $(t[1]) ? Y(t[1]) : !0;
        r[n] ? k(r[n]) ? r[n].push(i) : r[n] = [r[n], i] : r[n] = i
      }
    }), r
  }

  function G(e) {
    var t = [];
    return o(e, function (e, n) {
      k(e) ? o(e, function (e) {
        t.push(K(n, !0) + (e === !0 ? "" : "=" + K(e, !0)))
      }) : t.push(K(n, !0) + (e === !0 ? "" : "=" + K(e, !0)))
    }), t.length ? t.join("&") : ""
  }

  function Q(e) {
    return K(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
  }

  function K(e, t) {
    return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
  }

  function J(e, n) {
    function r(e) {
      e && s.push(e)
    }

    var i, a, s = [e], u = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"], l = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    o(u, function (n) {
      u[n] = !0, r(t.getElementById(n)), n = n.replace(":", "\\:"), e.querySelectorAll && (o(e.querySelectorAll("." + n), r), o(e.querySelectorAll("." + n + "\\:"), r), o(e.querySelectorAll("[" + n + "]"), r))
    }), o(s, function (e) {
      if (!i) {
        var t = " " + e.className + " ", n = l.exec(t);
        n ? (i = e, a = (n[2] || "").replace(/\s+/g, ",")) : o(e.attributes, function (t) {
          !i && u[t.name] && (i = e, a = t.value)
        })
      }
    }), i && n(i, a ? [a] : [])
  }

  function Z(n, r) {
    var i = function () {
      if (n = yr(n), n.injector()) {
        var e = n[0] === t ? "document" : z(n);
        throw Tr("btstrpd", "App Already Bootstrapped with this Element '{0}'", e)
      }
      r = r || [], r.unshift(["$provide", function (e) {
        e.value("$rootElement", n)
      }]), r.unshift("ng");
      var i = qt(r);
      return i.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate", function (e, t, n, r) {
        e.$apply(function () {
          t.data("$injector", r), n(t)(e)
        })
      }]), i
    }, a = /^NG_DEFER_BOOTSTRAP!/;
    return e && !a.test(e.name) ? i() : (e.name = e.name.replace(a, ""), void(Sr.resumeBootstrap = function (e) {
      o(e, function (e) {
        r.push(e)
      }), i()
    }))
  }

  function et(e, t) {
    return t = t || "_", e.replace(Mr, function (e, n) {
      return (n ? t : "") + e.toLowerCase()
    })
  }

  function tt() {
    br = e.jQuery, br ? (yr = br, p(br.fn, {
      scope: Wr.scope,
      isolateScope: Wr.isolateScope,
      controller: Wr.controller,
      injector: Wr.injector,
      inheritedData: Wr.inheritedData
    }), pt("remove", !0, !0, !1), pt("empty", !1, !1, !1), pt("html", !1, !1, !0)) : yr = gt, Sr.element = yr
  }

  function nt(e, t, n) {
    if (!e)throw Tr("areq", "Argument '{0}' is {1}", t || "?", n || "required");
    return e
  }

  function rt(e, t, n) {
    return n && k(e) && (e = e[e.length - 1]), nt(C(e), t, "not a function, got " + (e && "object" == typeof e ? e.constructor.name || "Object" : typeof e)), e
  }

  function it(e, t) {
    if ("hasOwnProperty" === e)throw Tr("badname", "hasOwnProperty is not a valid {0} name", t)
  }

  function ot(e, t, n) {
    if (!t)return e;
    for (var r, i = t.split("."), o = e, a = i.length, s = 0; a > s; s++)r = i[s], e && (e = (o = e)[r]);
    return !n && C(e) ? V(o, e) : e
  }

  function at(e) {
    var t = e[0], n = e[e.length - 1];
    if (t === n)return yr(t);
    var r = t, i = [r];
    do {
      if (r = r.nextSibling, !r)break;
      i.push(r)
    } while (r !== n);
    return yr(i)
  }

  function st(e) {
    function t(e, t, n) {
      return e[t] || (e[t] = n())
    }

    var n = r("$injector"), i = r("ng"), o = t(e, "angular", Object);
    return o.$$minErr = o.$$minErr || r, t(o, "module", function () {
      var e = {};
      return function (r, o, a) {
        var s = function (e, t) {
          if ("hasOwnProperty" === e)throw i("badname", "hasOwnProperty is not a valid {0} name", t)
        };
        return s(r, "module"), o && e.hasOwnProperty(r) && (e[r] = null), t(e, r, function () {
          function e(e, n, r) {
            return function () {
              return t[r || "push"]([e, n, arguments]), u
            }
          }

          if (!o)throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", r);
          var t = [], i = [], s = e("$injector", "invoke"), u = {
            _invokeQueue: t,
            _runBlocks: i,
            requires: o,
            name: r,
            provider: e("$provide", "provider"),
            factory: e("$provide", "factory"),
            service: e("$provide", "service"),
            value: e("$provide", "value"),
            constant: e("$provide", "constant", "unshift"),
            animation: e("$animateProvider", "register"),
            filter: e("$filterProvider", "register"),
            controller: e("$controllerProvider", "register"),
            directive: e("$compileProvider", "directive"),
            config: s,
            run: function (e) {
              return i.push(e), this
            }
          };
          return a && s(a), u
        })
      }
    })
  }

  function ut(t) {
    p(t, {
      bootstrap: Z,
      copy: j,
      extend: p,
      equals: H,
      element: yr,
      forEach: o,
      injector: qt,
      noop: h,
      bind: V,
      toJson: _,
      fromJson: B,
      identity: g,
      isUndefined: v,
      isDefined: $,
      isString: b,
      isFunction: C,
      isObject: y,
      isNumber: w,
      isElement: M,
      isArray: k,
      version: Or,
      isDate: x,
      lowercase: dr,
      uppercase: gr,
      callbacks: {counter: 0},
      $$minErr: r,
      $$csp: L
    }), wr = st(e);
    try {
      wr("ngLocale")
    } catch (n) {
      wr("ngLocale", []).provider("$locale", rn)
    }
    wr("ng", ["ngLocale"], ["$provide", function (e) {
      e.provider({$$sanitizeUri: On}), e.provider("$compile", Vt).directive({
        a: Ei,
        input: ji,
        textarea: ji,
        form: Ai,
        script: vo,
        select: bo,
        style: xo,
        option: wo,
        ngBind: Yi,
        ngBindHtml: Gi,
        ngBindTemplate: Xi,
        ngClass: Qi,
        ngClassEven: Ji,
        ngClassOdd: Ki,
        ngCloak: Zi,
        ngController: eo,
        ngForm: Mi,
        ngHide: co,
        ngIf: no,
        ngInclude: ro,
        ngInit: oo,
        ngNonBindable: ao,
        ngPluralize: so,
        ngRepeat: uo,
        ngShow: lo,
        ngStyle: po,
        ngSwitch: fo,
        ngSwitchWhen: ho,
        ngSwitchDefault: go,
        ngOptions: yo,
        ngTransclude: mo,
        ngModel: Vi,
        ngList: Bi,
        ngChange: Ui,
        required: _i,
        ngRequired: _i,
        ngValue: zi
      }).directive({ngInclude: io}).directive(Ti).directive(to), e.provider({
        $anchorScroll: jt,
        $animate: ei,
        $browser: Lt,
        $cacheFactory: Ft,
        $controller: Bt,
        $document: Wt,
        $exceptionHandler: zt,
        $filter: Un,
        $interpolate: tn,
        $interval: nn,
        $http: Kt,
        $httpBackend: Zt,
        $location: vn,
        $log: $n,
        $parse: Tn,
        $rootScope: Mn,
        $q: Sn,
        $sce: Rn,
        $sceDelegate: jn,
        $sniffer: Hn,
        $templateCache: It,
        $timeout: Ln,
        $window: Vn,
        $$rAF: An,
        $$asyncCallback: Rt
      })
    }])
  }

  function lt() {
    return ++qr
  }

  function ct(e) {
    return e.replace(Hr, function (e, t, n, r) {
      return r ? n.toUpperCase() : n
    }).replace(Lr, "Moz$1")
  }

  function pt(e, t, n, r) {
    function i(e) {
      var i, a, s, u, l, c, p, f = n && e ? [this.filter(e)] : [this], d = t;
      if (!r || null != e)for (; f.length;)for (i = f.shift(), a = 0, s = i.length; s > a; a++)for (u = yr(i[a]), d ? u.triggerHandler("$destroy") : d = !d, l = 0, c = (p = u.children()).length; c > l; l++)f.push(br(p[l]));
      return o.apply(this, arguments)
    }

    var o = br.fn[e];
    o = o.$original || o, i.$original = o, br.fn[e] = i
  }

  function ft(e) {
    return !Vr.test(e)
  }

  function dt(e, t) {
    var n, r, i, o, a, s, u = t.createDocumentFragment(), l = [];
    if (ft(e))l.push(t.createTextNode(e)); else {
      for (n = u.appendChild(t.createElement("div")), r = (Ur.exec(e) || ["", ""])[1].toLowerCase(), i = Br[r] || Br._default, n.innerHTML = "<div>&#160;</div>" + i[1] + e.replace(_r, "<$1></$2>") + i[2], n.removeChild(n.firstChild), o = i[0]; o--;)n = n.lastChild;
      for (a = 0, s = n.childNodes.length; s > a; ++a)l.push(n.childNodes[a]);
      n = u.firstChild, n.textContent = ""
    }
    return u.textContent = "", u.innerHTML = "", l
  }

  function ht(e, n) {
    n = n || t;
    var r;
    return (r = Ir.exec(e)) ? [n.createElement(r[1])] : dt(e, n)
  }

  function gt(e) {
    if (e instanceof gt)return e;
    if (b(e) && (e = Ar(e)), !(this instanceof gt)) {
      if (b(e) && "<" != e.charAt(0))throw Fr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
      return new gt(e)
    }
    if (b(e)) {
      Et(this, ht(e));
      var n = yr(t.createDocumentFragment());
      n.append(this)
    } else Et(this, e)
  }

  function mt(e) {
    return e.cloneNode(!0)
  }

  function vt(e) {
    yt(e);
    for (var t = 0, n = e.childNodes || []; t < n.length; t++)vt(n[t])
  }

  function $t(e, t, n, r) {
    if ($(r))throw Fr("offargs", "jqLite#off() does not support the `selector` argument");
    var i = bt(e, "events"), a = bt(e, "handle");
    a && (v(t) ? o(i, function (t, n) {
      Rr(e, n, t), delete i[n]
    }) : o(t.split(" "), function (t) {
      v(n) ? (Rr(e, t, i[t]), delete i[t]) : q(i[t] || [], n)
    }))
  }

  function yt(e, t) {
    var r = e[Pr], i = Nr[r];
    if (i) {
      if (t)return void delete Nr[r].data[t];
      i.handle && (i.events.$destroy && i.handle({}, "$destroy"), $t(e)), delete Nr[r], e[Pr] = n
    }
  }

  function bt(e, t, n) {
    var r = e[Pr], i = Nr[r || -1];
    return $(n) ? (i || (e[Pr] = r = lt(), i = Nr[r] = {}), void(i[t] = n)) : i && i[t]
  }

  function wt(e, t, n) {
    var r = bt(e, "data"), i = $(n), o = !i && $(t), a = o && !y(t);
    if (r || a || bt(e, "data", r = {}), i)r[t] = n; else {
      if (!o)return r;
      if (a)return r && r[t];
      p(r, t)
    }
  }

  function xt(e, t) {
    return e.getAttribute ? (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + t + " ") > -1 : !1
  }

  function kt(e, t) {
    t && e.setAttribute && o(t.split(" "), function (t) {
      e.setAttribute("class", Ar((" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Ar(t) + " ", " ")))
    })
  }

  function Ct(e, t) {
    if (t && e.setAttribute) {
      var n = (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
      o(t.split(" "), function (e) {
        e = Ar(e), -1 === n.indexOf(" " + e + " ") && (n += e + " ")
      }), e.setAttribute("class", Ar(n))
    }
  }

  function Et(e, t) {
    if (t) {
      t = t.nodeName || !$(t.length) || T(t) ? [t] : t;
      for (var n = 0; n < t.length; n++)e.push(t[n])
    }
  }

  function Tt(e, t) {
    return St(e, "$" + (t || "ngController") + "Controller")
  }

  function St(e, t, r) {
    e = yr(e), 9 == e[0].nodeType && (e = e.find("html"));
    for (var i = k(t) ? t : [t]; e.length;) {
      for (var o = e[0], a = 0, s = i.length; s > a; a++)if ((r = e.data(i[a])) !== n)return r;
      e = yr(o.parentNode || 11 === o.nodeType && o.host)
    }
  }

  function Dt(e) {
    for (var t = 0, n = e.childNodes; t < n.length; t++)vt(n[t]);
    for (; e.firstChild;)e.removeChild(e.firstChild)
  }

  function At(e, t) {
    var n = zr[t.toLowerCase()];
    return n && Yr[e.nodeName] && n
  }

  function Mt(e, n) {
    var r = function (r, i) {
      if (r.preventDefault || (r.preventDefault = function () {
          r.returnValue = !1
        }), r.stopPropagation || (r.stopPropagation = function () {
          r.cancelBubble = !0
        }), r.target || (r.target = r.srcElement || t), v(r.defaultPrevented)) {
        var a = r.preventDefault;
        r.preventDefault = function () {
          r.defaultPrevented = !0, a.call(r)
        }, r.defaultPrevented = !1
      }
      r.isDefaultPrevented = function () {
        return r.defaultPrevented || r.returnValue === !1
      };
      var s = R(n[i || r.type] || []);
      o(s, function (t) {
        t.call(e, r)
      }), 8 >= $r ? (r.preventDefault = null, r.stopPropagation = null, r.isDefaultPrevented = null) : (delete r.preventDefault, delete r.stopPropagation, delete r.isDefaultPrevented)
    };
    return r.elem = e, r
  }

  function Ot(e) {
    var t, r = typeof e;
    return "object" == r && null !== e ? "function" == typeof(t = e.$$hashKey) ? t = e.$$hashKey() : t === n && (t = e.$$hashKey = l()) : t = e, r + ":" + t
  }

  function Nt(e) {
    o(e, this.put, this)
  }

  function Pt(e) {
    var t, n, r, i;
    return "function" == typeof e ? (t = e.$inject) || (t = [], e.length && (n = e.toString().replace(Kr, ""), r = n.match(Xr), o(r[1].split(Gr), function (e) {
      e.replace(Qr, function (e, n, r) {
        t.push(r)
      })
    })), e.$inject = t) : k(e) ? (i = e.length - 1, rt(e[i], "fn"), t = e.slice(0, i)) : rt(e, "fn", !0), t
  }

  function qt(e) {
    function t(e) {
      return function (t, n) {
        return y(t) ? void o(t, u(e)) : e(t, n)
      }
    }

    function n(e, t) {
      if (it(e, "service"), (C(t) || k(t)) && (t = w.instantiate(t)), !t.$get)throw Jr("pget", "Provider '{0}' must define $get factory method.", e);
      return $[e + d] = t
    }

    function r(e, t) {
      return n(e, {$get: t})
    }

    function i(e, t) {
      return r(e, ["$injector", function (e) {
        return e.instantiate(t)
      }])
    }

    function a(e, t) {
      return r(e, m(t))
    }

    function s(e, t) {
      it(e, "constant"), $[e] = t, x[e] = t
    }

    function l(e, t) {
      var n = w.get(e + d), r = n.$get;
      n.$get = function () {
        var e = E.invoke(r, n);
        return E.invoke(t, null, {$delegate: e})
      }
    }

    function c(e) {
      var t, n, r, i, a = [];
      return o(e, function (e) {
        if (!v.get(e)) {
          v.put(e, !0);
          try {
            if (b(e))for (t = wr(e), a = a.concat(c(t.requires)).concat(t._runBlocks), n = t._invokeQueue, r = 0, i = n.length; i > r; r++) {
              var o = n[r], s = w.get(o[0]);
              s[o[1]].apply(s, o[2])
            } else C(e) ? a.push(w.invoke(e)) : k(e) ? a.push(w.invoke(e)) : rt(e, "module")
          } catch (u) {
            throw k(e) && (e = e[e.length - 1]), u.message && u.stack && -1 == u.stack.indexOf(u.message) && (u = u.message + "\n" + u.stack), Jr("modulerr", "Failed to instantiate module {0} due to:\n{1}", e, u.stack || u.message || u)
          }
        }
      }), a
    }

    function p(e, t) {
      function n(n) {
        if (e.hasOwnProperty(n)) {
          if (e[n] === f)throw Jr("cdep", "Circular dependency found: {0}", g.join(" <- "));
          return e[n]
        }
        try {
          return g.unshift(n), e[n] = f, e[n] = t(n)
        } catch (r) {
          throw e[n] === f && delete e[n], r
        } finally {
          g.shift()
        }
      }

      function r(e, t, r) {
        var i, o, a, s = [], u = Pt(e);
        for (o = 0, i = u.length; i > o; o++) {
          if (a = u[o], "string" != typeof a)throw Jr("itkn", "Incorrect injection token! Expected service name as string, got {0}", a);
          s.push(r && r.hasOwnProperty(a) ? r[a] : n(a))
        }
        return e.$inject || (e = e[i]), e.apply(t, s)
      }

      function i(e, t) {
        var n, i, o = function () {
        };
        return o.prototype = (k(e) ? e[e.length - 1] : e).prototype, n = new o, i = r(e, n, t), y(i) || C(i) ? i : n
      }

      return {
        invoke: r, instantiate: i, get: n, annotate: Pt, has: function (t) {
          return $.hasOwnProperty(t + d) || e.hasOwnProperty(t)
        }
      }
    }

    var f = {}, d = "Provider", g = [], v = new Nt, $ = {
      $provide: {
        provider: t(n),
        factory: t(r),
        service: t(i),
        value: t(a),
        constant: t(s),
        decorator: l
      }
    }, w = $.$injector = p($, function () {
      throw Jr("unpr", "Unknown provider: {0}", g.join(" <- "))
    }), x = {}, E = x.$injector = p(x, function (e) {
      var t = w.get(e + d);
      return E.invoke(t.$get, t)
    });
    return o(c(e), function (e) {
      E.invoke(e || h)
    }), E
  }

  function jt() {
    var e = !0;
    this.disableAutoScrolling = function () {
      e = !1
    }, this.$get = ["$window", "$location", "$rootScope", function (t, n, r) {
      function i(e) {
        var t = null;
        return o(e, function (e) {
          t || "a" !== dr(e.nodeName) || (t = e)
        }), t
      }

      function a() {
        var e, r = n.hash();
        r ? (e = s.getElementById(r)) ? e.scrollIntoView() : (e = i(s.getElementsByName(r))) ? e.scrollIntoView() : "top" === r && t.scrollTo(0, 0) : t.scrollTo(0, 0)
      }

      var s = t.document;
      return e && r.$watch(function () {
        return n.hash()
      }, function () {
        r.$evalAsync(a)
      }), a
    }]
  }

  function Rt() {
    this.$get = ["$$rAF", "$timeout", function (e, t) {
      return e.supported ? function (t) {
        return e(t)
      } : function (e) {
        return t(e, 0, !1)
      }
    }]
  }

  function Ht(e, t, r, i) {
    function a(e) {
      try {
        e.apply(null, I(arguments, 1))
      } finally {
        if ($--, 0 === $)for (; y.length;)try {
          y.pop()()
        } catch (t) {
          r.error(t)
        }
      }
    }

    function s(e, t) {
      !function n() {
        o(x, function (e) {
          e()
        }), w = t(n, e)
      }()
    }

    function u() {
      E = null, k != l.url() && (k = l.url(), o(T, function (e) {
        e(l.url())
      }))
    }

    var l = this, c = t[0], p = e.location, f = e.history, d = e.setTimeout, g = e.clearTimeout, m = {};
    l.isMock = !1;
    var $ = 0, y = [];
    l.$$completeOutstandingRequest = a, l.$$incOutstandingRequestCount = function () {
      $++
    }, l.notifyWhenNoOutstandingRequests = function (e) {
      o(x, function (e) {
        e()
      }), 0 === $ ? e() : y.push(e)
    };
    var w, x = [];
    l.addPollFn = function (e) {
      return v(w) && s(100, d), x.push(e), e
    };
    var k = p.href, C = t.find("base"), E = null;
    l.url = function (t, n) {
      if (p !== e.location && (p = e.location), f !== e.history && (f = e.history), t) {
        if (k == t)return;
        return k = t, i.history ? n ? f.replaceState(null, "", t) : (f.pushState(null, "", t), C.attr("href", C.attr("href"))) : (E = t, n ? p.replace(t) : p.href = t), l
      }
      return E || p.href.replace(/%27/g, "'")
    };
    var T = [], S = !1;
    l.onUrlChange = function (t) {
      return S || (i.history && yr(e).on("popstate", u), i.hashchange ? yr(e).on("hashchange", u) : l.addPollFn(u), S = !0), T.push(t), t
    }, l.baseHref = function () {
      var e = C.attr("href");
      return e ? e.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
    };
    var D = {}, A = "", M = l.baseHref();
    l.cookies = function (e, t) {
      var i, o, a, s, u;
      if (!e) {
        if (c.cookie !== A)for (A = c.cookie, o = A.split("; "), D = {}, s = 0; s < o.length; s++)a = o[s], u = a.indexOf("="), u > 0 && (e = unescape(a.substring(0, u)), D[e] === n && (D[e] = unescape(a.substring(u + 1))));
        return D
      }
      t === n ? c.cookie = escape(e) + "=;path=" + M + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : b(t) && (i = (c.cookie = escape(e) + "=" + escape(t) + ";path=" + M).length + 1, i > 4096 && r.warn("Cookie '" + e + "' possibly not set or overflowed because it was too large (" + i + " > 4096 bytes)!"))
    }, l.defer = function (e, t) {
      var n;
      return $++, n = d(function () {
        delete m[n], a(e)
      }, t || 0), m[n] = !0, n
    }, l.defer.cancel = function (e) {
      return m[e] ? (delete m[e], g(e), a(h), !0) : !1
    }
  }

  function Lt() {
    this.$get = ["$window", "$log", "$sniffer", "$document", function (e, t, n, r) {
      return new Ht(e, r, t, n)
    }]
  }

  function Ft() {
    this.$get = function () {
      function e(e, n) {
        function i(e) {
          e != f && (d ? d == e && (d = e.n) : d = e, o(e.n, e.p), o(e, f), f = e, f.n = null)
        }

        function o(e, t) {
          e != t && (e && (e.p = t), t && (t.n = e))
        }

        if (e in t)throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", e);
        var a = 0, s = p({}, n, {id: e}), u = {}, l = n && n.capacity || Number.MAX_VALUE, c = {}, f = null, d = null;
        return t[e] = {
          put: function (e, t) {
            if (l < Number.MAX_VALUE) {
              var n = c[e] || (c[e] = {key: e});
              i(n)
            }
            if (!v(t))return e in u || a++, u[e] = t, a > l && this.remove(d.key), t
          }, get: function (e) {
            if (l < Number.MAX_VALUE) {
              var t = c[e];
              if (!t)return;
              i(t)
            }
            return u[e]
          }, remove: function (e) {
            if (l < Number.MAX_VALUE) {
              var t = c[e];
              if (!t)return;
              t == f && (f = t.p), t == d && (d = t.n), o(t.n, t.p), delete c[e]
            }
            delete u[e], a--
          }, removeAll: function () {
            u = {}, a = 0, c = {}, f = d = null
          }, destroy: function () {
            u = null, s = null, c = null, delete t[e]
          }, info: function () {
            return p({}, s, {size: a})
          }
        }
      }

      var t = {};
      return e.info = function () {
        var e = {};
        return o(t, function (t, n) {
          e[n] = t.info()
        }), e
      }, e.get = function (e) {
        return t[e]
      }, e
    }
  }

  function It() {
    this.$get = ["$cacheFactory", function (e) {
      return e("templates")
    }]
  }

  function Vt(e, r) {
    var i = {}, a = "Directive", s = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, l = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, c = /^(on[a-z]+|formaction)$/;
    this.directive = function f(t, n) {
      return it(t, "directive"), b(t) ? (nt(n, "directiveFactory"), i.hasOwnProperty(t) || (i[t] = [], e.factory(t + a, ["$injector", "$exceptionHandler", function (e, n) {
        var r = [];
        return o(i[t], function (i, o) {
          try {
            var a = e.invoke(i);
            C(a) ? a = {compile: m(a)} : !a.compile && a.link && (a.compile = m(a.link)), a.priority = a.priority || 0, a.index = o, a.name = a.name || t, a.require = a.require || a.controller && a.name, a.restrict = a.restrict || "A", r.push(a)
          } catch (s) {
            n(s)
          }
        }), r
      }])), i[t].push(n)) : o(t, u(f)), this
    }, this.aHrefSanitizationWhitelist = function (e) {
      return $(e) ? (r.aHrefSanitizationWhitelist(e), this) : r.aHrefSanitizationWhitelist()
    }, this.imgSrcSanitizationWhitelist = function (e) {
      return $(e) ? (r.imgSrcSanitizationWhitelist(e), this) : r.imgSrcSanitizationWhitelist()
    }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function (e, r, u, f, h, v, $, w, x, E, T, S) {
      function D(e, t, n, r, i) {
        e instanceof yr || (e = yr(e)), o(e, function (t, n) {
          3 == t.nodeType && t.nodeValue.match(/\S+/) && (e[n] = t = yr(t).wrap("<span></span>").parent()[0])
        });
        var a = M(e, t, e, n, r, i);
        return A(e, "ng-scope"), function (t, n, r) {
          nt(t, "scope");
          var i = n ? Wr.clone.call(e) : e;
          o(r, function (e, t) {
            i.data("$" + t + "Controller", e)
          });
          for (var s = 0, u = i.length; u > s; s++) {
            var l = i[s], c = l.nodeType;
            (1 === c || 9 === c) && i.eq(s).data("$scope", t)
          }
          return n && n(i, t), a && a(t, i, i), i
        }
      }

      function A(e, t) {
        try {
          e.addClass(t)
        } catch (n) {
        }
      }

      function M(e, t, r, i, o, a) {
        function s(e, r, i, o) {
          var a, s, u, l, c, p, f, d, g, m = r.length, v = new Array(m);
          for (f = 0; m > f; f++)v[f] = r[f];
          for (f = 0, g = 0, d = h.length; d > f; g++)u = v[g], a = h[f++], s = h[f++], l = yr(u), a ? (a.scope ? (c = e.$new(), l.data("$scope", c)) : c = e, p = a.transclude, p || !o && t ? a(s, c, u, i, O(e, p || t)) : a(s, c, u, i, o)) : s && s(e, u.childNodes, n, o)
        }

        for (var u, l, c, p, f, d, h = [], g = 0; g < e.length; g++)u = new J, l = N(e[g], [], u, 0 === g ? i : n, o), c = l.length ? j(l, e[g], u, t, r, null, [], [], a) : null, c && c.scope && A(yr(e[g]), "ng-scope"), f = c && c.terminal || !(p = e[g].childNodes) || !p.length ? null : M(p, c ? c.transclude : t), h.push(c, f), d = d || c || f, a = null;
        return d ? s : null
      }

      function O(e, t) {
        return function (n, r, i) {
          var o = !1;
          n || (n = e.$new(), n.$$transcluded = !0, o = !0);
          var a = t(n, r, i);
          return o && a.on("$destroy", V(n, n.$destroy)), a
        }
      }

      function N(e, t, n, r, i) {
        var o, a, u = e.nodeType, c = n.$attr;
        switch (u) {
          case 1:
            F(t, Ut(xr(e).toLowerCase()), "E", r, i);
            for (var p, f, d, h, g, m = e.attributes, v = 0, $ = m && m.length; $ > v; v++) {
              var y = !1, w = !1;
              if (p = m[v], !$r || $r >= 8 || p.specified) {
                f = p.name, h = Ut(f), it.test(h) && (f = et(h.substr(6), "-"));
                var x = h.replace(/(Start|End)$/, "");
                h === x + "Start" && (y = f, w = f.substr(0, f.length - 5) + "end", f = f.substr(0, f.length - 6)), d = Ut(f.toLowerCase()), c[d] = f, n[d] = g = Ar(p.value), At(e, d) && (n[d] = !0), G(e, t, g, d), F(t, d, "A", r, i, y, w)
              }
            }
            if (a = e.className, b(a) && "" !== a)for (; o = l.exec(a);)d = Ut(o[2]), F(t, d, "C", r, i) && (n[d] = Ar(o[3])), a = a.substr(o.index + o[0].length);
            break;
          case 3:
            Y(t, e.nodeValue);
            break;
          case 8:
            try {
              o = s.exec(e.nodeValue), o && (d = Ut(o[1]), F(t, d, "M", r, i) && (n[d] = Ar(o[2])))
            } catch (k) {
            }
        }
        return t.sort(B), t
      }

      function P(e, t, n) {
        var r = [], i = 0;
        if (t && e.hasAttribute && e.hasAttribute(t)) {
          do {
            if (!e)throw ti("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", t, n);
            1 == e.nodeType && (e.hasAttribute(t) && i++, e.hasAttribute(n) && i--), r.push(e), e = e.nextSibling
          } while (i > 0)
        } else r.push(e);
        return yr(r)
      }

      function q(e, t, n) {
        return function (r, i, o, a, s) {
          return i = P(i[0], t, n), e(r, i, o, a, s)
        }
      }

      function j(e, i, a, s, l, c, p, f, d) {
        function h(e, t, n, r) {
          e && (n && (e = q(e, n, r)), e.require = x.require, (F === x || x.$$isolateScope) && (e = K(e, {isolateScope: !0})), p.push(e)), t && (n && (t = q(t, n, r)), t.require = x.require, (F === x || x.$$isolateScope) && (t = K(t, {isolateScope: !0})), f.push(t))
        }

        function g(e, t, n) {
          var r, i = "data", a = !1;
          if (b(e)) {
            for (; "^" == (r = e.charAt(0)) || "?" == r;)e = e.substr(1), "^" == r && (i = "inheritedData"), a = a || "?" == r;
            if (r = null, n && "data" === i && (r = n[e]), r = r || t[i]("$" + e + "Controller"), !r && !a)throw ti("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", e, E);
            return r
          }
          return k(e) && (r = [], o(e, function (e) {
            r.push(g(e, t, n))
          })), r
        }

        function m(e, t, s, l, c) {
          function d(e, t) {
            var r;
            return arguments.length < 2 && (t = e, e = n), X && (r = E), c(e, t, r)
          }

          var h, m, y, b, w, x, k, C, E = {};
          if (h = i === s ? a : R(a, new J(yr(s), a.$attr)), m = h.$$element, F) {
            var T = /^\s*([@=&])(\??)\s*(\w*)\s*$/, S = yr(s);
            k = t.$new(!0), V && V === F.$$originalDirective ? S.data("$isolateScope", k) : S.data("$isolateScopeNoTemplate", k), A(S, "ng-isolate-scope"), o(F.scope, function (e, n) {
              var i, o, a, s, u = e.match(T) || [], l = u[3] || n, c = "?" == u[2], p = u[1];
              switch (k.$$isolateBindings[n] = p + l, p) {
                case"@":
                  h.$observe(l, function (e) {
                    k[n] = e
                  }), h.$$observers[l].$$scope = t, h[l] && (k[n] = r(h[l])(t));
                  break;
                case"=":
                  if (c && !h[l])return;
                  o = v(h[l]), s = o.literal ? H : function (e, t) {
                    return e === t
                  }, a = o.assign || function () {
                      throw i = k[n] = o(t), ti("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", h[l], F.name)
                    }, i = k[n] = o(t), k.$watch(function () {
                    var e = o(t);
                    return s(e, k[n]) || (s(e, i) ? a(t, e = k[n]) : k[n] = e), i = e
                  }, null, o.literal);
                  break;
                case"&":
                  o = v(h[l]), k[n] = function (e) {
                    return o(t, e)
                  };
                  break;
                default:
                  throw ti("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", F.name, n, e)
              }
            })
          }
          for (C = c && d, j && o(j, function (e) {
            var n, r = {$scope: e === F || e.$$isolateScope ? k : t, $element: m, $attrs: h, $transclude: C};
            x = e.controller, "@" == x && (x = h[e.name]), n = $(x, r), E[e.name] = n, X || m.data("$" + e.name + "Controller", n), e.controllerAs && (r.$scope[e.controllerAs] = n)
          }), y = 0, b = p.length; b > y; y++)try {
            w = p[y], w(w.isolateScope ? k : t, m, h, w.require && g(w.require, m, E), C)
          } catch (D) {
            u(D, z(m))
          }
          var M = t;
          for (F && (F.template || null === F.templateUrl) && (M = k), e && e(M, s.childNodes, n, c), y = f.length - 1; y >= 0; y--)try {
            w = f[y], w(w.isolateScope ? k : t, m, h, w.require && g(w.require, m, E), C)
          } catch (D) {
            u(D, z(m))
          }
        }

        d = d || {};
        for (var w, x, E, T, S, M, O = -Number.MAX_VALUE, j = d.controllerDirectives, F = d.newIsolateScopeDirective, V = d.templateDirective, B = d.nonTlbTranscludeDirective, Y = !1, X = d.hasElementTranscludeDirective, G = a.$$element = yr(i), Z = c, et = s, tt = 0, nt = e.length; nt > tt; tt++) {
          x = e[tt];
          var it = x.$$start, ot = x.$$end;
          if (it && (G = P(i, it, ot)), T = n, O > x.priority)break;
          if ((M = x.scope) && (w = w || x, x.templateUrl || (W("new/isolated scope", F, x, G), y(M) && (F = x))), E = x.name, !x.templateUrl && x.controller && (M = x.controller, j = j || {}, W("'" + E + "' controller", j[E], x, G), j[E] = x), (M = x.transclude) && (Y = !0, x.$$tlb || (W("transclusion", B, x, G), B = x), "element" == M ? (X = !0, O = x.priority, T = P(i, it, ot), G = a.$$element = yr(t.createComment(" " + E + ": " + a[E] + " ")), i = G[0], Q(l, yr(I(T)), i), et = D(T, s, O, Z && Z.name, {nonTlbTranscludeDirective: B})) : (T = yr(mt(i)).contents(), G.empty(), et = D(T, s))), x.template)if (W("template", V, x, G), V = x, M = C(x.template) ? x.template(G, a) : x.template, M = rt(M), x.replace) {
            if (Z = x, T = ft(M) ? [] : yr(M), i = T[0], 1 != T.length || 1 !== i.nodeType)throw ti("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", E, "");
            Q(l, G, i);
            var at = {$attr: {}}, st = N(i, [], at), ut = e.splice(tt + 1, e.length - (tt + 1));
            F && L(st), e = e.concat(st).concat(ut), U(a, at), nt = e.length
          } else G.html(M);
          if (x.templateUrl)W("template", V, x, G), V = x, x.replace && (Z = x), m = _(e.splice(tt, e.length - tt), G, a, l, et, p, f, {
            controllerDirectives: j,
            newIsolateScopeDirective: F,
            templateDirective: V,
            nonTlbTranscludeDirective: B
          }), nt = e.length; else if (x.compile)try {
            S = x.compile(G, a, et), C(S) ? h(null, S, it, ot) : S && h(S.pre, S.post, it, ot)
          } catch (lt) {
            u(lt, z(G))
          }
          x.terminal && (m.terminal = !0, O = Math.max(O, x.priority))
        }
        return m.scope = w && w.scope === !0, m.transclude = Y && et, d.hasElementTranscludeDirective = X, m
      }

      function L(e) {
        for (var t = 0, n = e.length; n > t; t++)e[t] = d(e[t], {$$isolateScope: !0})
      }

      function F(t, r, o, s, l, c, p) {
        if (r === l)return null;
        var f = null;
        if (i.hasOwnProperty(r))for (var h, g = e.get(r + a), m = 0, v = g.length; v > m; m++)try {
          h = g[m], (s === n || s > h.priority) && -1 != h.restrict.indexOf(o) && (c && (h = d(h, {
            $$start: c,
            $$end: p
          })), t.push(h), f = h)
        } catch ($) {
          u($)
        }
        return f
      }

      function U(e, t) {
        var n = t.$attr, r = e.$attr, i = e.$$element;
        o(e, function (r, i) {
          "$" != i.charAt(0) && (t[i] && (r += ("style" === i ? ";" : " ") + t[i]), e.$set(i, r, !0, n[i]))
        }), o(t, function (t, o) {
          "class" == o ? (A(i, t), e["class"] = (e["class"] ? e["class"] + " " : "") + t) : "style" == o ? (i.attr("style", i.attr("style") + ";" + t), e.style = (e.style ? e.style + ";" : "") + t) : "$" == o.charAt(0) || e.hasOwnProperty(o) || (e[o] = t, r[o] = n[o])
        })
      }

      function _(e, t, n, r, i, a, s, u) {
        var l, c, d = [], g = t[0], m = e.shift(), v = p({}, m, {
          templateUrl: null,
          transclude: null,
          replace: null,
          $$originalDirective: m
        }), $ = C(m.templateUrl) ? m.templateUrl(t, n) : m.templateUrl;
        return t.empty(), f.get(E.getTrustedResourceUrl($), {cache: h}).success(function (p) {
          var f, h, b, w;
          if (p = rt(p), m.replace) {
            if (b = ft(p) ? [] : yr(p), f = b[0], 1 != b.length || 1 !== f.nodeType)throw ti("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", m.name, $);
            h = {$attr: {}}, Q(r, t, f);
            var x = N(f, [], h);
            y(m.scope) && L(x), e = x.concat(e), U(n, h)
          } else f = g, t.html(p);
          for (e.unshift(v), l = j(e, f, n, i, t, m, a, s, u), o(r, function (e, n) {
            e == f && (r[n] = t[0])
          }), c = M(t[0].childNodes, i); d.length;) {
            var k = d.shift(), C = d.shift(), E = d.shift(), T = d.shift(), S = t[0];
            if (C !== g) {
              var D = C.className;
              u.hasElementTranscludeDirective && m.replace || (S = mt(f)), Q(E, yr(C), S), A(yr(S), D)
            }
            w = l.transclude ? O(k, l.transclude) : T, l(c, k, S, r, w)
          }
          d = null
        }).error(function (e, t, n, r) {
          throw ti("tpload", "Failed to load template: {0}", r.url)
        }), function (e, t, n, r, i) {
          d ? (d.push(t), d.push(n), d.push(r), d.push(i)) : l(c, t, n, r, i)
        }
      }

      function B(e, t) {
        var n = t.priority - e.priority;
        return 0 !== n ? n : e.name !== t.name ? e.name < t.name ? -1 : 1 : e.index - t.index
      }

      function W(e, t, n, r) {
        if (t)throw ti("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", t.name, n.name, e, z(r))
      }

      function Y(e, t) {
        var n = r(t, !0);
        n && e.push({
          priority: 0, compile: m(function (e, t) {
            var r = t.parent(), i = r.data("$binding") || [];
            i.push(n), A(r.data("$binding", i), "ng-binding"), e.$watch(n, function (e) {
              t[0].nodeValue = e
            })
          })
        })
      }

      function X(e, t) {
        if ("srcdoc" == t)return E.HTML;
        var n = xr(e);
        return "xlinkHref" == t || "FORM" == n && "action" == t || "IMG" != n && ("src" == t || "ngSrc" == t) ? E.RESOURCE_URL : void 0
      }

      function G(e, t, n, i) {
        var o = r(n, !0);
        if (o) {
          if ("multiple" === i && "SELECT" === xr(e))throw ti("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", z(e));
          t.push({
            priority: 100, compile: function () {
              return {
                pre: function (t, n, a) {
                  var s = a.$$observers || (a.$$observers = {});
                  if (c.test(i))throw ti("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                  o = r(a[i], !0, X(e, i)), o && (a[i] = o(t), (s[i] || (s[i] = [])).$$inter = !0, (a.$$observers && a.$$observers[i].$$scope || t).$watch(o, function (e, t) {
                    "class" === i && e != t ? a.$updateClass(e, t) : a.$set(i, e)
                  }))
                }
              }
            }
          })
        }
      }

      function Q(e, n, r) {
        var i, o, a = n[0], s = n.length, u = a.parentNode;
        if (e)for (i = 0, o = e.length; o > i; i++)if (e[i] == a) {
          e[i++] = r;
          for (var l = i, c = l + s - 1, p = e.length; p > l; l++, c++)p > c ? e[l] = e[c] : delete e[l];
          e.length -= s - 1;
          break
        }
        u && u.replaceChild(r, a);
        var f = t.createDocumentFragment();
        f.appendChild(a), r[yr.expando] = a[yr.expando];
        for (var d = 1, h = n.length; h > d; d++) {
          var g = n[d];
          yr(g).remove(), f.appendChild(g), delete n[d]
        }
        n[0] = r, n.length = 1
      }

      function K(e, t) {
        return p(function () {
          return e.apply(null, arguments)
        }, e, t)
      }

      var J = function (e, t) {
        this.$$element = e, this.$attr = t || {}
      };
      J.prototype = {
        $normalize: Ut, $addClass: function (e) {
          e && e.length > 0 && T.addClass(this.$$element, e)
        }, $removeClass: function (e) {
          e && e.length > 0 && T.removeClass(this.$$element, e)
        }, $updateClass: function (e, t) {
          var n = _t(e, t), r = _t(t, e);
          0 === n.length ? T.removeClass(this.$$element, r) : 0 === r.length ? T.addClass(this.$$element, n) : T.setClass(this.$$element, n, r)
        }, $set: function (e, t, r, i) {
          var a, s = At(this.$$element[0], e);
          s && (this.$$element.prop(e, t), i = s), this[e] = t, i ? this.$attr[e] = i : (i = this.$attr[e], i || (this.$attr[e] = i = et(e, "-"))), a = xr(this.$$element), ("A" === a && "href" === e || "IMG" === a && "src" === e) && (this[e] = t = S(t, "src" === e)), r !== !1 && (null === t || t === n ? this.$$element.removeAttr(i) : this.$$element.attr(i, t));
          var l = this.$$observers;
          l && o(l[e], function (e) {
            try {
              e(t)
            } catch (n) {
              u(n)
            }
          })
        }, $observe: function (e, t) {
          var n = this, r = n.$$observers || (n.$$observers = {}), i = r[e] || (r[e] = []);
          return i.push(t), w.$evalAsync(function () {
            i.$$inter || t(n[e])
          }), t
        }
      };
      var Z = r.startSymbol(), tt = r.endSymbol(), rt = "{{" == Z || "}}" == tt ? g : function (e) {
        return e.replace(/\{\{/g, Z).replace(/}}/g, tt)
      }, it = /^ngAttr[A-Z]/;
      return D
    }]
  }

  function Ut(e) {
    return ct(e.replace(ni, ""))
  }

  function _t(e, t) {
    var n = "", r = e.split(/\s+/), i = t.split(/\s+/);
    e:for (var o = 0; o < r.length; o++) {
      for (var a = r[o], s = 0; s < i.length; s++)if (a == i[s])continue e;
      n += (n.length > 0 ? " " : "") + a
    }
    return n
  }

  function Bt() {
    var e = {}, t = /^(\S+)(\s+as\s+(\w+))?$/;
    this.register = function (t, n) {
      it(t, "controller"), y(t) ? p(e, t) : e[t] = n
    }, this.$get = ["$injector", "$window", function (n, i) {
      return function (o, a) {
        var s, u, l, c;
        if (b(o) && (u = o.match(t), l = u[1], c = u[3], o = e.hasOwnProperty(l) ? e[l] : ot(a.$scope, l, !0) || ot(i, l, !0), rt(o, l, !0)), s = n.instantiate(o, a), c) {
          if (!a || "object" != typeof a.$scope)throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", l || o.name, c);
          a.$scope[c] = s
        }
        return s
      }
    }]
  }

  function Wt() {
    this.$get = ["$window", function (e) {
      return yr(e.document)
    }]
  }

  function zt() {
    this.$get = ["$log", function (e) {
      return function () {
        e.error.apply(e, arguments)
      }
    }]
  }

  function Yt(e) {
    var t, n, r, i = {};
    return e ? (o(e.split("\n"), function (e) {
      r = e.indexOf(":"), t = dr(Ar(e.substr(0, r))), n = Ar(e.substr(r + 1)), t && (i[t] ? i[t] += ", " + n : i[t] = n)
    }), i) : i
  }

  function Xt(e) {
    var t = y(e) ? e : n;
    return function (n) {
      return t || (t = Yt(e)), n ? t[dr(n)] || null : t
    }
  }

  function Gt(e, t, n) {
    return C(n) ? n(e, t) : (o(n, function (n) {
      e = n(e, t)
    }), e)
  }

  function Qt(e) {
    return e >= 200 && 300 > e
  }

  function Kt() {
    var e = /^\s*(\[|\{[^\{])/, t = /[\}\]]\s*$/, r = /^\)\]\}',?\n/, i = {"Content-Type": "application/json;charset=utf-8"}, a = this.defaults = {
      transformResponse: [function (n) {
        return b(n) && (n = n.replace(r, ""), e.test(n) && t.test(n) && (n = B(n))), n
      }],
      transformRequest: [function (e) {
        return !y(e) || D(e) || A(e) ? e : _(e)
      }],
      headers: {common: {Accept: "application/json, text/plain, */*"}, post: j(i), put: j(i), patch: j(i)},
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN"
    }, u = this.interceptors = [], l = this.responseInterceptors = [];
    this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function (e, t, r, i, c, f) {
      function d(e) {
        function r(e) {
          var t = p({}, e, {data: Gt(e.data, e.headers, s.transformResponse)});
          return Qt(e.status) ? t : c.reject(t)
        }

        function i(e) {
          function t(e) {
            var t;
            o(e, function (n, r) {
              C(n) && (t = n(), null != t ? e[r] = t : delete e[r])
            })
          }

          var n, r, i, s = a.headers, u = p({}, e.headers);
          s = p({}, s.common, s[dr(e.method)]), t(s), t(u);
          e:for (n in s) {
            r = dr(n);
            for (i in u)if (dr(i) === r)continue e;
            u[n] = s[n]
          }
          return u
        }

        var s = {method: "get", transformRequest: a.transformRequest, transformResponse: a.transformResponse}, u = i(e);
        p(s, e), s.headers = u, s.method = gr(s.method);
        var l = In(s.url) ? t.cookies()[s.xsrfCookieName || a.xsrfCookieName] : n;
        l && (u[s.xsrfHeaderName || a.xsrfHeaderName] = l);
        var f = function (e) {
          u = e.headers;
          var t = Gt(e.data, Xt(u), e.transformRequest);
          return v(e.data) && o(u, function (e, t) {
            "content-type" === dr(t) && delete u[t]
          }), v(e.withCredentials) && !v(a.withCredentials) && (e.withCredentials = a.withCredentials), m(e, t, u).then(r, r)
        }, d = [f, n], h = c.when(s);
        for (o(E, function (e) {
          (e.request || e.requestError) && d.unshift(e.request, e.requestError), (e.response || e.responseError) && d.push(e.response, e.responseError)
        }); d.length;) {
          var g = d.shift(), $ = d.shift();
          h = h.then(g, $)
        }
        return h.success = function (e) {
          return h.then(function (t) {
            e(t.data, t.status, t.headers, s)
          }), h
        }, h.error = function (e) {
          return h.then(null, function (t) {
            e(t.data, t.status, t.headers, s)
          }), h
        }, h
      }

      function h() {
        o(arguments, function (e) {
          d[e] = function (t, n) {
            return d(p(n || {}, {method: e, url: t}))
          }
        })
      }

      function g() {
        o(arguments, function (e) {
          d[e] = function (t, n, r) {
            return d(p(r || {}, {method: e, url: t, data: n}))
          }
        })
      }

      function m(t, n, r) {
        function o(e, t, n, r) {
          l && (Qt(e) ? l.put(g, [e, t, Yt(n), r]) : l.remove(g)), s(t, e, n, r), i.$$phase || i.$apply()
        }

        function s(e, n, r, i) {
          n = Math.max(n, 0), (Qt(n) ? f.resolve : f.reject)({
            data: e,
            status: n,
            headers: Xt(r),
            config: t,
            statusText: i
          })
        }

        function u() {
          var e = P(d.pendingRequests, t);
          -1 !== e && d.pendingRequests.splice(e, 1)
        }

        var l, p, f = c.defer(), h = f.promise, g = w(t.url, t.params);
        if (d.pendingRequests.push(t), h.then(u, u), (t.cache || a.cache) && t.cache !== !1 && "GET" == t.method && (l = y(t.cache) ? t.cache : y(a.cache) ? a.cache : x), l)if (p = l.get(g), $(p)) {
          if (p.then)return p.then(u, u), p;
          k(p) ? s(p[1], p[0], j(p[2]), p[3]) : s(p, 200, {}, "OK")
        } else l.put(g, h);
        return v(p) && e(t.method, g, n, o, r, t.timeout, t.withCredentials, t.responseType), h
      }

      function w(e, t) {
        if (!t)return e;
        var n = [];
        return s(t, function (e, t) {
          null === e || v(e) || (k(e) || (e = [e]), o(e, function (e) {
            y(e) && (e = _(e)), n.push(K(t) + "=" + K(e))
          }))
        }), n.length > 0 && (e += (-1 == e.indexOf("?") ? "?" : "&") + n.join("&")), e
      }

      var x = r("$http"), E = [];
      return o(u, function (e) {
        E.unshift(b(e) ? f.get(e) : f.invoke(e))
      }), o(l, function (e, t) {
        var n = b(e) ? f.get(e) : f.invoke(e);
        E.splice(t, 0, {
          response: function (e) {
            return n(c.when(e))
          }, responseError: function (e) {
            return n(c.reject(e))
          }
        })
      }), d.pendingRequests = [], h("get", "delete", "head", "jsonp"), g("post", "put"), d.defaults = a, d
    }]
  }

  function Jt(t) {
    if (8 >= $r && (!t.match(/^(get|post|head|put|delete|options)$/i) || !e.XMLHttpRequest))return new e.ActiveXObject("Microsoft.XMLHTTP");
    if (e.XMLHttpRequest)return new e.XMLHttpRequest;
    throw r("$httpBackend")("noxhr", "This browser does not support XMLHttpRequest.")
  }

  function Zt() {
    this.$get = ["$browser", "$window", "$document", function (e, t, n) {
      return en(e, Jt, e.defer, t.angular.callbacks, n[0])
    }]
  }

  function en(e, t, n, r, i) {
    function a(e, t) {
      var n = i.createElement("script"), r = function () {
        n.onreadystatechange = n.onload = n.onerror = null, i.body.removeChild(n), t && t()
      };
      return n.type = "text/javascript", n.src = e, $r && 8 >= $r ? n.onreadystatechange = function () {
        /loaded|complete/.test(n.readyState) && r()
      } : n.onload = n.onerror = function () {
        r()
      }, i.body.appendChild(n), r
    }

    var s = -1;
    return function (i, u, l, c, p, f, d, g) {
      function m() {
        y = s, w && w(), x && x.abort()
      }

      function v(t, r, i, o, a) {
        C && n.cancel(C), w = x = null, 0 === r && (r = i ? 200 : "file" == Fn(u).protocol ? 404 : 0), r = 1223 === r ? 204 : r, a = a || "", t(r, i, o, a), e.$$completeOutstandingRequest(h)
      }

      var y;
      if (e.$$incOutstandingRequestCount(), u = u || e.url(), "jsonp" == dr(i)) {
        var b = "_" + (r.counter++).toString(36);
        r[b] = function (e) {
          r[b].data = e
        };
        var w = a(u.replace("JSON_CALLBACK", "angular.callbacks." + b), function () {
          r[b].data ? v(c, 200, r[b].data) : v(c, y || -2), r[b] = Sr.noop
        })
      } else {
        var x = t(i);
        if (x.open(i, u, !0), o(p, function (e, t) {
            $(e) && x.setRequestHeader(t, e)
          }), x.onreadystatechange = function () {
            if (x && 4 == x.readyState) {
              var e = null, t = null;
              y !== s && (e = x.getAllResponseHeaders(), t = "response"in x ? x.response : x.responseText), v(c, y || x.status, t, e, x.statusText || "")
            }
          }, d && (x.withCredentials = !0), g)try {
          x.responseType = g
        } catch (k) {
          if ("json" !== g)throw k
        }
        x.send(l || null)
      }
      if (f > 0)var C = n(m, f); else f && f.then && f.then(m)
    }
  }

  function tn() {
    var e = "{{", t = "}}";
    this.startSymbol = function (t) {
      return t ? (e = t, this) : e
    }, this.endSymbol = function (e) {
      return e ? (t = e, this) : t
    }, this.$get = ["$parse", "$exceptionHandler", "$sce", function (n, r, i) {
      function o(o, u, l) {
        for (var c, p, f, d, h = 0, g = [], m = o.length, $ = !1, y = []; m > h;)-1 != (c = o.indexOf(e, h)) && -1 != (p = o.indexOf(t, c + a)) ? (h != c && g.push(o.substring(h, c)), g.push(f = n(d = o.substring(c + a, p))), f.exp = d, h = p + s, $ = !0) : (h != m && g.push(o.substring(h)), h = m);
        if ((m = g.length) || (g.push(""), m = 1), l && g.length > 1)throw ri("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", o);
        return !u || $ ? (y.length = m, f = function (e) {
          try {
            for (var t, n = 0, a = m; a > n; n++)"function" == typeof(t = g[n]) && (t = t(e), t = l ? i.getTrusted(l, t) : i.valueOf(t), null === t || v(t) ? t = "" : "string" != typeof t && (t = _(t))), y[n] = t;
            return y.join("")
          } catch (s) {
            var u = ri("interr", "Can't interpolate: {0}\n{1}", o, s.toString());
            r(u)
          }
        }, f.exp = o, f.parts = g, f) : void 0
      }

      var a = e.length, s = t.length;
      return o.startSymbol = function () {
        return e
      }, o.endSymbol = function () {
        return t
      }, o
    }]
  }

  function nn() {
    this.$get = ["$rootScope", "$window", "$q", function (e, t, n) {
      function r(r, o, a, s) {
        var u = t.setInterval, l = t.clearInterval, c = n.defer(), p = c.promise, f = 0, d = $(s) && !s;
        return a = $(a) ? a : 0, p.then(null, null, r), p.$$intervalId = u(function () {
          c.notify(f++), a > 0 && f >= a && (c.resolve(f), l(p.$$intervalId), delete i[p.$$intervalId]), d || e.$apply()
        }, o), i[p.$$intervalId] = c, p
      }

      var i = {};
      return r.cancel = function (e) {
        return e && e.$$intervalId in i ? (i[e.$$intervalId].reject("canceled"), clearInterval(e.$$intervalId), delete i[e.$$intervalId], !0) : !1
      }, r
    }]
  }

  function rn() {
    this.$get = function () {
      return {
        id: "en-us",
        NUMBER_FORMATS: {
          DECIMAL_SEP: ".",
          GROUP_SEP: ",",
          PATTERNS: [{
            minInt: 1,
            minFrac: 0,
            maxFrac: 3,
            posPre: "",
            posSuf: "",
            negPre: "-",
            negSuf: "",
            gSize: 3,
            lgSize: 3
          }, {
            minInt: 1,
            minFrac: 2,
            maxFrac: 2,
            posPre: "¤",
            posSuf: "",
            negPre: "(¤",
            negSuf: ")",
            gSize: 3,
            lgSize: 3
          }],
          CURRENCY_SYM: "$"
        },
        DATETIME_FORMATS: {
          MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
          SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
          DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
          SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
          AMPMS: ["AM", "PM"],
          medium: "MMM d, y h:mm:ss a",
          "short": "M/d/yy h:mm a",
          fullDate: "EEEE, MMMM d, y",
          longDate: "MMMM d, y",
          mediumDate: "MMM d, y",
          shortDate: "M/d/yy",
          mediumTime: "h:mm:ss a",
          shortTime: "h:mm a"
        },
        pluralCat: function (e) {
          return 1 === e ? "one" : "other"
        }
      }
    }
  }

  function on(e) {
    for (var t = e.split("/"), n = t.length; n--;)t[n] = Q(t[n]);
    return t.join("/")
  }

  function an(e, t, n) {
    var r = Fn(e, n);
    t.$$protocol = r.protocol, t.$$host = r.hostname, t.$$port = f(r.port) || oi[r.protocol] || null
  }

  function sn(e, t, n) {
    var r = "/" !== e.charAt(0);
    r && (e = "/" + e);
    var i = Fn(e, n);
    t.$$path = decodeURIComponent(r && "/" === i.pathname.charAt(0) ? i.pathname.substring(1) : i.pathname), t.$$search = X(i.search), t.$$hash = decodeURIComponent(i.hash), t.$$path && "/" != t.$$path.charAt(0) && (t.$$path = "/" + t.$$path)
  }

  function un(e, t) {
    return 0 === t.indexOf(e) ? t.substr(e.length) : void 0
  }

  function ln(e) {
    var t = e.indexOf("#");
    return -1 == t ? e : e.substr(0, t)
  }

  function cn(e) {
    return e.substr(0, ln(e).lastIndexOf("/") + 1)
  }

  function pn(e) {
    return e.substring(0, e.indexOf("/", e.indexOf("//") + 2))
  }

  function fn(e, t) {
    this.$$html5 = !0, t = t || "";
    var r = cn(e);
    an(e, this, e), this.$$parse = function (t) {
      var n = un(r, t);
      if (!b(n))throw ai("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', t, r);
      sn(n, this, e), this.$$path || (this.$$path = "/"), this.$$compose()
    }, this.$$compose = function () {
      var e = G(this.$$search), t = this.$$hash ? "#" + Q(this.$$hash) : "";
      this.$$url = on(this.$$path) + (e ? "?" + e : "") + t, this.$$absUrl = r + this.$$url.substr(1)
    }, this.$$rewrite = function (i) {
      var o, a;
      return (o = un(e, i)) !== n ? (a = o, (o = un(t, o)) !== n ? r + (un("/", o) || o) : e + a) : (o = un(r, i)) !== n ? r + o : r == i + "/" ? r : void 0
    }
  }

  function dn(e, t) {
    var n = cn(e);
    an(e, this, e), this.$$parse = function (r) {
      function i(e, t, n) {
        var r, i = /^\/?.*?:(\/.*)/;
        return 0 === t.indexOf(n) && (t = t.replace(n, "")), i.exec(t) ? e : (r = i.exec(e), r ? r[1] : e)
      }

      var o = un(e, r) || un(n, r), a = "#" == o.charAt(0) ? un(t, o) : this.$$html5 ? o : "";
      if (!b(a))throw ai("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', r, t);
      sn(a, this, e), this.$$path = i(this.$$path, a, e), this.$$compose()
    }, this.$$compose = function () {
      var n = G(this.$$search), r = this.$$hash ? "#" + Q(this.$$hash) : "";
      this.$$url = on(this.$$path) + (n ? "?" + n : "") + r, this.$$absUrl = e + (this.$$url ? t + this.$$url : "")
    }, this.$$rewrite = function (t) {
      return ln(e) == ln(t) ? t : void 0
    }
  }

  function hn(e, t) {
    this.$$html5 = !0, dn.apply(this, arguments);
    var n = cn(e);
    this.$$rewrite = function (r) {
      var i;
      return e == ln(r) ? r : (i = un(n, r)) ? e + t + i : n === r + "/" ? n : void 0
    }
  }

  function gn(e) {
    return function () {
      return this[e]
    }
  }

  function mn(e, t) {
    return function (n) {
      return v(n) ? this[e] : (this[e] = t(n), this.$$compose(), this)
    }
  }

  function vn() {
    var t = "", n = !1;
    this.hashPrefix = function (e) {
      return $(e) ? (t = e, this) : t
    }, this.html5Mode = function (e) {
      return $(e) ? (n = e, this) : n
    }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function (r, i, o, a) {
      function s(e) {
        r.$broadcast("$locationChangeSuccess", u.absUrl(), e)
      }

      var u, l, c, p = i.baseHref(), f = i.url();
      n ? (c = pn(f) + (p || "/"), l = o.history ? fn : hn) : (c = ln(f), l = dn), u = new l(c, "#" + t), u.$$parse(u.$$rewrite(f)), a.on("click", function (t) {
        if (!t.ctrlKey && !t.metaKey && 2 != t.which) {
          for (var n = yr(t.target); "a" !== dr(n[0].nodeName);)if (n[0] === a[0] || !(n = n.parent())[0])return;
          var o = n.prop("href");
          y(o) && "[object SVGAnimatedString]" === o.toString() && (o = Fn(o.animVal).href);
          var s = u.$$rewrite(o);
          o && !n.attr("target") && s && !t.isDefaultPrevented() && (t.preventDefault(), s != i.url() && (u.$$parse(s), r.$apply(), e.angular["ff-684208-preventDefault"] = !0))
        }
      }), u.absUrl() != f && i.url(u.absUrl(), !0), i.onUrlChange(function (e) {
        u.absUrl() != e && (r.$evalAsync(function () {
          var t = u.absUrl();
          u.$$parse(e), r.$broadcast("$locationChangeStart", e, t).defaultPrevented ? (u.$$parse(t), i.url(t)) : s(t)
        }), r.$$phase || r.$digest())
      });
      var d = 0;
      return r.$watch(function () {
        var e = i.url(), t = u.$$replace;
        return d && e == u.absUrl() || (d++, r.$evalAsync(function () {
          r.$broadcast("$locationChangeStart", u.absUrl(), e).defaultPrevented ? u.$$parse(e) : (i.url(u.absUrl(), t), s(e))
        })), u.$$replace = !1, d
      }), u
    }]
  }

  function $n() {
    var e = !0, t = this;
    this.debugEnabled = function (t) {
      return $(t) ? (e = t, this) : e
    }, this.$get = ["$window", function (n) {
      function r(e) {
        return e instanceof Error && (e.stack ? e = e.message && -1 === e.stack.indexOf(e.message) ? "Error: " + e.message + "\n" + e.stack : e.stack : e.sourceURL && (e = e.message + "\n" + e.sourceURL + ":" + e.line)), e
      }

      function i(e) {
        var t = n.console || {}, i = t[e] || t.log || h, a = !1;
        try {
          a = !!i.apply
        } catch (s) {
        }
        return a ? function () {
          var e = [];
          return o(arguments, function (t) {
            e.push(r(t))
          }), i.apply(t, e)
        } : function (e, t) {
          i(e, null == t ? "" : t)
        }
      }

      return {
        log: i("log"), info: i("info"), warn: i("warn"), error: i("error"), debug: function () {
          var n = i("debug");
          return function () {
            e && n.apply(t, arguments)
          }
        }()
      }
    }]
  }

  function yn(e, t) {
    if ("constructor" === e)throw ui("isecfld", 'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}', t);
    return e
  }

  function bn(e, t) {
    if (e) {
      if (e.constructor === e)throw ui("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
      if (e.document && e.location && e.alert && e.setInterval)throw ui("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", t);
      if (e.children && (e.nodeName || e.prop && e.attr && e.find))throw ui("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", t)
    }
    return e
  }

  function wn(e, t, r, i, o) {
    o = o || {};
    for (var a, s = t.split("."), u = 0; s.length > 1; u++) {
      a = yn(s.shift(), i);
      var l = e[a];
      l || (l = {}, e[a] = l), e = l, e.then && o.unwrapPromises && (si(i), "$$v"in e || !function (e) {
        e.then(function (t) {
          e.$$v = t
        })
      }(e), e.$$v === n && (e.$$v = {}), e = e.$$v)
    }
    return a = yn(s.shift(), i), e[a] = r, r
  }

  function xn(e, t, r, i, o, a, s) {
    return yn(e, a), yn(t, a), yn(r, a), yn(i, a), yn(o, a), s.unwrapPromises ? function (s, u) {
      var l, c = u && u.hasOwnProperty(e) ? u : s;
      return null == c ? c : (c = c[e], c && c.then && (si(a), "$$v"in c || (l = c, l.$$v = n, l.then(function (e) {
        l.$$v = e
      })), c = c.$$v), t ? null == c ? n : (c = c[t], c && c.then && (si(a), "$$v"in c || (l = c, l.$$v = n, l.then(function (e) {
        l.$$v = e
      })), c = c.$$v), r ? null == c ? n : (c = c[r], c && c.then && (si(a), "$$v"in c || (l = c, l.$$v = n, l.then(function (e) {
        l.$$v = e
      })), c = c.$$v), i ? null == c ? n : (c = c[i], c && c.then && (si(a), "$$v"in c || (l = c, l.$$v = n, l.then(function (e) {
        l.$$v = e
      })), c = c.$$v), o ? null == c ? n : (c = c[o], c && c.then && (si(a), "$$v"in c || (l = c, l.$$v = n, l.then(function (e) {
        l.$$v = e
      })), c = c.$$v), c) : c) : c) : c) : c)
    } : function (a, s) {
      var u = s && s.hasOwnProperty(e) ? s : a;
      return null == u ? u : (u = u[e], t ? null == u ? n : (u = u[t], r ? null == u ? n : (u = u[r], i ? null == u ? n : (u = u[i], o ? null == u ? n : u = u[o] : u) : u) : u) : u)
    }
  }

  function kn(e, t) {
    return yn(e, t), function (t, r) {
      return null == t ? n : (r && r.hasOwnProperty(e) ? r : t)[e]
    }
  }

  function Cn(e, t, r) {
    return yn(e, r), yn(t, r), function (r, i) {
      return null == r ? n : (r = (i && i.hasOwnProperty(e) ? i : r)[e], null == r ? n : r[t])
    }
  }

  function En(e, t, r) {
    if (hi.hasOwnProperty(e))return hi[e];
    var i, a = e.split("."), s = a.length;
    if (t.unwrapPromises || 1 !== s)if (t.unwrapPromises || 2 !== s)if (t.csp)i = 6 > s ? xn(a[0], a[1], a[2], a[3], a[4], r, t) : function (e, i) {
      var o, u = 0;
      do o = xn(a[u++], a[u++], a[u++], a[u++], a[u++], r, t)(e, i), i = n, e = o; while (s > u);
      return o
    }; else {
      var u = "var p;\n";
      o(a, function (e, n) {
        yn(e, r), u += "if(s == null) return undefined;\ns=" + (n ? "s" : '((k&&k.hasOwnProperty("' + e + '"))?k:s)') + '["' + e + '"];\n' + (t.unwrapPromises ? 'if (s && s.then) {\n pw("' + r.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "")
      }), u += "return s;";
      var l = new Function("s", "k", "pw", u);
      l.toString = m(u), i = t.unwrapPromises ? function (e, t) {
        return l(e, t, si)
      } : l
    } else i = Cn(a[0], a[1], r); else i = kn(a[0], r);
    return "hasOwnProperty" !== e && (hi[e] = i), i
  }

  function Tn() {
    var e = {}, t = {csp: !1, unwrapPromises: !1, logPromiseWarnings: !0};
    this.unwrapPromises = function (e) {
      return $(e) ? (t.unwrapPromises = !!e, this) : t.unwrapPromises
    }, this.logPromiseWarnings = function (e) {
      return $(e) ? (t.logPromiseWarnings = e, this) : t.logPromiseWarnings
    }, this.$get = ["$filter", "$sniffer", "$log", function (n, r, i) {
      return t.csp = r.csp, si = function (e) {
        t.logPromiseWarnings && !li.hasOwnProperty(e) && (li[e] = !0, i.warn("[$parse] Promise found in the expression `" + e + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
      }, function (r) {
        var i;
        switch (typeof r) {
          case"string":
            if (e.hasOwnProperty(r))return e[r];
            var o = new fi(t), a = new di(o, n, t);
            return i = a.parse(r, !1), "hasOwnProperty" !== r && (e[r] = i), i;
          case"function":
            return r;
          default:
            return h
        }
      }
    }]
  }

  function Sn() {
    this.$get = ["$rootScope", "$exceptionHandler", function (e, t) {
      return Dn(function (t) {
        e.$evalAsync(t)
      }, t)
    }]
  }

  function Dn(e, t) {
    function r(e) {
      return e
    }

    function i(e) {
      return l(e)
    }

    function a(e) {
      var t = s(), n = 0, r = k(e) ? [] : {};
      return o(e, function (e, i) {
        n++, u(e).then(function (e) {
          r.hasOwnProperty(i) || (r[i] = e, --n || t.resolve(r))
        }, function (e) {
          r.hasOwnProperty(i) || t.reject(e)
        })
      }), 0 === n && t.resolve(r), t.promise
    }

    var s = function () {
      var o, a, l = [];
      return a = {
        resolve: function (t) {
          if (l) {
            var r = l;
            l = n, o = u(t), r.length && e(function () {
              for (var e, t = 0, n = r.length; n > t; t++)e = r[t], o.then(e[0], e[1], e[2])
            })
          }
        }, reject: function (e) {
          a.resolve(c(e))
        }, notify: function (t) {
          if (l) {
            var n = l;
            l.length && e(function () {
              for (var e, r = 0, i = n.length; i > r; r++)e = n[r], e[2](t)
            })
          }
        }, promise: {
          then: function (e, n, a) {
            var u = s(), c = function (n) {
              try {
                u.resolve((C(e) ? e : r)(n))
              } catch (i) {
                u.reject(i), t(i)
              }
            }, p = function (e) {
              try {
                u.resolve((C(n) ? n : i)(e))
              } catch (r) {
                u.reject(r), t(r)
              }
            }, f = function (e) {
              try {
                u.notify((C(a) ? a : r)(e))
              } catch (n) {
                t(n)
              }
            };
            return l ? l.push([c, p, f]) : o.then(c, p, f), u.promise
          }, "catch": function (e) {
            return this.then(null, e)
          }, "finally": function (e) {
            function t(e, t) {
              var n = s();
              return t ? n.resolve(e) : n.reject(e), n.promise
            }

            function n(n, i) {
              var o = null;
              try {
                o = (e || r)()
              } catch (a) {
                return t(a, !1)
              }
              return o && C(o.then) ? o.then(function () {
                return t(n, i)
              }, function (e) {
                return t(e, !1)
              }) : t(n, i)
            }

            return this.then(function (e) {
              return n(e, !0)
            }, function (e) {
              return n(e, !1)
            })
          }
        }
      }
    }, u = function (t) {
      return t && C(t.then) ? t : {
        then: function (n) {
          var r = s();
          return e(function () {
            r.resolve(n(t))
          }), r.promise
        }
      }
    }, l = function (e) {
      var t = s();
      return t.reject(e), t.promise
    }, c = function (n) {
      return {
        then: function (r, o) {
          var a = s();
          return e(function () {
            try {
              a.resolve((C(o) ? o : i)(n))
            } catch (e) {
              a.reject(e), t(e)
            }
          }), a.promise
        }
      }
    }, p = function (n, o, a, c) {
      var p, f = s(), d = function (e) {
        try {
          return (C(o) ? o : r)(e)
        } catch (n) {
          return t(n), l(n)
        }
      }, h = function (e) {
        try {
          return (C(a) ? a : i)(e)
        } catch (n) {
          return t(n), l(n)
        }
      }, g = function (e) {
        try {
          return (C(c) ? c : r)(e)
        } catch (n) {
          t(n)
        }
      };
      return e(function () {
        u(n).then(function (e) {
          p || (p = !0, f.resolve(u(e).then(d, h, g)))
        }, function (e) {
          p || (p = !0, f.resolve(h(e)))
        }, function (e) {
          p || f.notify(g(e))
        })
      }), f.promise
    };
    return {defer: s, reject: l, when: p, all: a}
  }

  function An() {
    this.$get = ["$window", "$timeout", function (e, t) {
      var n = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame, r = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.webkitCancelRequestAnimationFrame, i = !!n, o = i ? function (e) {
        var t = n(e);
        return function () {
          r(t)
        }
      } : function (e) {
        var n = t(e, 16.66, !1);
        return function () {
          t.cancel(n)
        }
      };
      return o.supported = i, o
    }]
  }

  function Mn() {
    var e = 10, t = r("$rootScope"), n = null;
    this.digestTtl = function (t) {
      return arguments.length && (e = t), e
    }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function (r, a, s, u) {
      function c() {
        this.$id = l(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$postDigestQueue = [], this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = {}
      }

      function p(e) {
        if (v.$$phase)throw t("inprog", "{0} already in progress", v.$$phase);
        v.$$phase = e
      }

      function f() {
        v.$$phase = null
      }

      function d(e, t) {
        var n = s(e);
        return rt(n, t), n
      }

      function g(e, t, n) {
        do e.$$listenerCount[n] -= t, 0 === e.$$listenerCount[n] && delete e.$$listenerCount[n]; while (e = e.$parent)
      }

      function m() {
      }

      c.prototype = {
        constructor: c, $new: function (e) {
          var t, n;
          return e ? (n = new c, n.$root = this.$root, n.$$asyncQueue = this.$$asyncQueue, n.$$postDigestQueue = this.$$postDigestQueue) : (t = function () {
          }, t.prototype = this, n = new t, n.$id = l()), n["this"] = n, n.$$listeners = {}, n.$$listenerCount = {}, n.$parent = this, n.$$watchers = n.$$nextSibling = n.$$childHead = n.$$childTail = null, n.$$prevSibling = this.$$childTail, this.$$childHead ? (this.$$childTail.$$nextSibling = n, this.$$childTail = n) : this.$$childHead = this.$$childTail = n, n
        }, $watch: function (e, t, r) {
          var i = this, o = d(e, "watch"), a = i.$$watchers, s = {fn: t, last: m, get: o, exp: e, eq: !!r};
          if (n = null, !C(t)) {
            var u = d(t || h, "listener");
            s.fn = function (e, t, n) {
              u(n)
            }
          }
          if ("string" == typeof e && o.constant) {
            var l = s.fn;
            s.fn = function (e, t, n) {
              l.call(this, e, t, n), q(a, s)
            }
          }
          return a || (a = i.$$watchers = []), a.unshift(s), function () {
            q(a, s), n = null
          }
        }, $watchCollection: function (e, t) {
          function n() {
            o = f(l);
            var e, t;
            if (y(o))if (i(o)) {
              a !== d && (a = d, m = a.length = 0, p++), e = o.length, m !== e && (p++, a.length = m = e);
              for (var n = 0; e > n; n++) {
                var r = a[n] !== a[n] && o[n] !== o[n];
                r || a[n] === o[n] || (p++, a[n] = o[n])
              }
            } else {
              a !== h && (a = h = {}, m = 0, p++), e = 0;
              for (t in o)o.hasOwnProperty(t) && (e++, a.hasOwnProperty(t) ? a[t] !== o[t] && (p++, a[t] = o[t]) : (m++, a[t] = o[t], p++));
              if (m > e) {
                p++;
                for (t in a)a.hasOwnProperty(t) && !o.hasOwnProperty(t) && (m--, delete a[t])
              }
            } else a !== o && (a = o, p++);
            return p
          }

          function r() {
            if (g ? (g = !1, t(o, o, l)) : t(o, u, l), c)if (y(o))if (i(o)) {
              u = new Array(o.length);
              for (var e = 0; e < o.length; e++)u[e] = o[e]
            } else {
              u = {};
              for (var n in o)hr.call(o, n) && (u[n] = o[n])
            } else u = o
          }

          var o, a, u, l = this, c = t.length > 1, p = 0, f = s(e), d = [], h = {}, g = !0, m = 0;
          return this.$watch(n, r)
        }, $digest: function () {
          var r, i, o, s, u, l, c, d, h, g, v, $ = this.$$asyncQueue, y = this.$$postDigestQueue, b = e, w = this, x = [];
          p("$digest"), n = null;
          do {
            for (l = !1, d = w; $.length;) {
              try {
                v = $.shift(), v.scope.$eval(v.expression)
              } catch (k) {
                f(), a(k)
              }
              n = null
            }
            e:do {
              if (s = d.$$watchers)for (u = s.length; u--;)try {
                if (r = s[u])if ((i = r.get(d)) === (o = r.last) || (r.eq ? H(i, o) : "number" == typeof i && "number" == typeof o && isNaN(i) && isNaN(o))) {
                  if (r === n) {
                    l = !1;
                    break e
                  }
                } else l = !0, n = r, r.last = r.eq ? j(i) : i, r.fn(i, o === m ? i : o, d), 5 > b && (h = 4 - b, x[h] || (x[h] = []), g = C(r.exp) ? "fn: " + (r.exp.name || r.exp.toString()) : r.exp, g += "; newVal: " + _(i) + "; oldVal: " + _(o), x[h].push(g))
              } catch (k) {
                f(), a(k)
              }
              if (!(c = d.$$childHead || d !== w && d.$$nextSibling))for (; d !== w && !(c = d.$$nextSibling);)d = d.$parent
            } while (d = c);
            if ((l || $.length) && !b--)throw f(), t("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", e, _(x))
          } while (l || $.length);
          for (f(); y.length;)try {
            y.shift()()
          } catch (k) {
            a(k)
          }
        }, $destroy: function () {
          if (!this.$$destroyed) {
            var e = this.$parent;
            this.$broadcast("$destroy"), this.$$destroyed = !0, this !== v && (o(this.$$listenerCount, V(null, g, this)), e.$$childHead == this && (e.$$childHead = this.$$nextSibling), e.$$childTail == this && (e.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], this.$destroy = this.$digest = this.$apply = h, this.$on = this.$watch = function () {
              return h
            })
          }
        }, $eval: function (e, t) {
          return s(e)(this, t)
        }, $evalAsync: function (e) {
          v.$$phase || v.$$asyncQueue.length || u.defer(function () {
            v.$$asyncQueue.length && v.$digest()
          }), this.$$asyncQueue.push({scope: this, expression: e})
        }, $$postDigest: function (e) {
          this.$$postDigestQueue.push(e)
        }, $apply: function (e) {
          try {
            return p("$apply"), this.$eval(e)
          } catch (t) {
            a(t)
          } finally {
            f();
            try {
              v.$digest()
            } catch (t) {
              throw a(t), t
            }
          }
        }, $on: function (e, t) {
          var n = this.$$listeners[e];
          n || (this.$$listeners[e] = n = []), n.push(t);
          var r = this;
          do r.$$listenerCount[e] || (r.$$listenerCount[e] = 0), r.$$listenerCount[e]++; while (r = r.$parent);
          var i = this;
          return function () {
            n[P(n, t)] = null, g(i, 1, e)
          }
        }, $emit: function (e) {
          var t, n, r, i = [], o = this, s = !1, u = {
            name: e, targetScope: o, stopPropagation: function () {
              s = !0
            }, preventDefault: function () {
              u.defaultPrevented = !0
            }, defaultPrevented: !1
          }, l = F([u], arguments, 1);
          do {
            for (t = o.$$listeners[e] || i, u.currentScope = o, n = 0, r = t.length; r > n; n++)if (t[n])try {
              t[n].apply(null, l)
            } catch (c) {
              a(c)
            } else t.splice(n, 1), n--, r--;
            if (s)return u;
            o = o.$parent
          } while (o);
          return u
        }, $broadcast: function (e) {
          for (var t, n, r, i = this, o = i, s = i, u = {
            name: e, targetScope: i, preventDefault: function () {
              u.defaultPrevented = !0
            }, defaultPrevented: !1
          }, l = F([u], arguments, 1); o = s;) {
            for (u.currentScope = o, t = o.$$listeners[e] || [], n = 0, r = t.length; r > n; n++)if (t[n])try {
              t[n].apply(null, l)
            } catch (c) {
              a(c)
            } else t.splice(n, 1), n--, r--;
            if (!(s = o.$$listenerCount[e] && o.$$childHead || o !== i && o.$$nextSibling))for (; o !== i && !(s = o.$$nextSibling);)o = o.$parent
          }
          return u
        }
      };
      var v = new c;
      return v
    }]
  }

  function On() {
    var e = /^\s*(https?|ftp|mailto|tel|file):/, t = /^\s*(https?|ftp|file):|data:image\//;
    this.aHrefSanitizationWhitelist = function (t) {
      return $(t) ? (e = t, this) : e
    }, this.imgSrcSanitizationWhitelist = function (e) {
      return $(e) ? (t = e, this) : t
    }, this.$get = function () {
      return function (n, r) {
        var i, o = r ? t : e;
        return $r && !($r >= 8) || (i = Fn(n).href, "" === i || i.match(o)) ? n : "unsafe:" + i
      }
    }
  }

  function Nn(e) {
    return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
  }

  function Pn(e) {
    if ("self" === e)return e;
    if (b(e)) {
      if (e.indexOf("***") > -1)throw gi("iwcard", "Illegal sequence *** in string matcher.  String: {0}", e);
      return e = Nn(e).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + e + "$")
    }
    if (E(e))return new RegExp("^" + e.source + "$");
    throw gi("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
  }

  function qn(e) {
    var t = [];
    return $(e) && o(e, function (e) {
      t.push(Pn(e))
    }), t
  }

  function jn() {
    this.SCE_CONTEXTS = mi;
    var e = ["self"], t = [];
    this.resourceUrlWhitelist = function (t) {
      return arguments.length && (e = qn(t)), e
    }, this.resourceUrlBlacklist = function (e) {
      return arguments.length && (t = qn(e)), t
    }, this.$get = ["$injector", function (r) {
      function i(e, t) {
        return "self" === e ? In(t) : !!e.exec(t.href)
      }

      function o(n) {
        var r, o, a = Fn(n.toString()), s = !1;
        for (r = 0, o = e.length; o > r; r++)if (i(e[r], a)) {
          s = !0;
          break
        }
        if (s)for (r = 0, o = t.length; o > r; r++)if (i(t[r], a)) {
          s = !1;
          break
        }
        return s
      }

      function a(e) {
        var t = function (e) {
          this.$$unwrapTrustedValue = function () {
            return e
          }
        };
        return e && (t.prototype = new e), t.prototype.valueOf = function () {
          return this.$$unwrapTrustedValue()
        }, t.prototype.toString = function () {
          return this.$$unwrapTrustedValue().toString()
        }, t
      }

      function s(e, t) {
        var r = f.hasOwnProperty(e) ? f[e] : null;
        if (!r)throw gi("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", e, t);
        if (null === t || t === n || "" === t)return t;
        if ("string" != typeof t)throw gi("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", e);
        return new r(t)
      }

      function u(e) {
        return e instanceof p ? e.$$unwrapTrustedValue() : e
      }

      function l(e, t) {
        if (null === t || t === n || "" === t)return t;
        var r = f.hasOwnProperty(e) ? f[e] : null;
        if (r && t instanceof r)return t.$$unwrapTrustedValue();
        if (e === mi.RESOURCE_URL) {
          if (o(t))return t;
          throw gi("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", t.toString())
        }
        if (e === mi.HTML)return c(t);
        throw gi("unsafe", "Attempting to use an unsafe value in a safe context.")
      }

      var c = function () {
        throw gi("unsafe", "Attempting to use an unsafe value in a safe context.")
      };
      r.has("$sanitize") && (c = r.get("$sanitize"));
      var p = a(), f = {};
      return f[mi.HTML] = a(p), f[mi.CSS] = a(p), f[mi.URL] = a(p), f[mi.JS] = a(p), f[mi.RESOURCE_URL] = a(f[mi.URL]), {
        trustAs: s,
        getTrusted: l,
        valueOf: u
      }
    }]
  }

  function Rn() {
    var e = !0;
    this.enabled = function (t) {
      return arguments.length && (e = !!t), e
    }, this.$get = ["$parse", "$sniffer", "$sceDelegate", function (t, n, r) {
      if (e && n.msie && n.msieDocumentMode < 8)throw gi("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
      var i = j(mi);
      i.isEnabled = function () {
        return e
      }, i.trustAs = r.trustAs, i.getTrusted = r.getTrusted, i.valueOf = r.valueOf, e || (i.trustAs = i.getTrusted = function (e, t) {
        return t
      }, i.valueOf = g), i.parseAs = function (e, n) {
        var r = t(n);
        return r.literal && r.constant ? r : function (t, n) {
          return i.getTrusted(e, r(t, n))
        }
      };
      var a = i.parseAs, s = i.getTrusted, u = i.trustAs;
      return o(mi, function (e, t) {
        var n = dr(t);
        i[ct("parse_as_" + n)] = function (t) {
          return a(e, t)
        }, i[ct("get_trusted_" + n)] = function (t) {
          return s(e, t)
        }, i[ct("trust_as_" + n)] = function (t) {
          return u(e, t)
        }
      }), i
    }]
  }

  function Hn() {
    this.$get = ["$window", "$document", function (e, t) {
      var n, r, i = {}, o = f((/android (\d+)/.exec(dr((e.navigator || {}).userAgent)) || [])[1]), a = /Boxee/i.test((e.navigator || {}).userAgent), s = t[0] || {}, u = s.documentMode, l = /^(Moz|webkit|O|ms)(?=[A-Z])/, c = s.body && s.body.style, p = !1, d = !1;
      if (c) {
        for (var h in c)if (r = l.exec(h)) {
          n = r[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
          break
        }
        n || (n = "WebkitOpacity"in c && "webkit"), p = !!("transition"in c || n + "Transition"in c), d = !!("animation"in c || n + "Animation"in c), !o || p && d || (p = b(s.body.style.webkitTransition), d = b(s.body.style.webkitAnimation))
      }
      return {
        history: !(!e.history || !e.history.pushState || 4 > o || a),
        hashchange: "onhashchange"in e && (!u || u > 7),
        hasEvent: function (e) {
          if ("input" == e && 9 == $r)return !1;
          if (v(i[e])) {
            var t = s.createElement("div");
            i[e] = "on" + e in t
          }
          return i[e]
        },
        csp: L(),
        vendorPrefix: n,
        transitions: p,
        animations: d,
        android: o,
        msie: $r,
        msieDocumentMode: u
      }
    }]
  }

  function Ln() {
    this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function (e, t, n, r) {
      function i(i, a, s) {
        var u, l = n.defer(), c = l.promise, p = $(s) && !s;
        return u = t.defer(function () {
          try {
            l.resolve(i())
          } catch (t) {
            l.reject(t), r(t)
          } finally {
            delete o[c.$$timeoutId]
          }
          p || e.$apply()
        }, a), c.$$timeoutId = u, o[u] = l, c
      }

      var o = {};
      return i.cancel = function (e) {
        return e && e.$$timeoutId in o ? (o[e.$$timeoutId].reject("canceled"), delete o[e.$$timeoutId], t.defer.cancel(e.$$timeoutId)) : !1
      }, i
    }]
  }

  function Fn(e) {
    var t = e;
    return $r && (vi.setAttribute("href", t), t = vi.href), vi.setAttribute("href", t), {
      href: vi.href,
      protocol: vi.protocol ? vi.protocol.replace(/:$/, "") : "",
      host: vi.host,
      search: vi.search ? vi.search.replace(/^\?/, "") : "",
      hash: vi.hash ? vi.hash.replace(/^#/, "") : "",
      hostname: vi.hostname,
      port: vi.port,
      pathname: "/" === vi.pathname.charAt(0) ? vi.pathname : "/" + vi.pathname
    }
  }

  function In(e) {
    var t = b(e) ? Fn(e) : e;
    return t.protocol === $i.protocol && t.host === $i.host
  }

  function Vn() {
    this.$get = m(e)
  }

  function Un(e) {
    function t(r, i) {
      if (y(r)) {
        var a = {};
        return o(r, function (e, n) {
          a[n] = t(n, e)
        }), a
      }
      return e.factory(r + n, i)
    }

    var n = "Filter";
    this.register = t, this.$get = ["$injector", function (e) {
      return function (t) {
        return e.get(t + n)
      }
    }], t("currency", Bn), t("date", Jn), t("filter", _n), t("json", Zn), t("limitTo", er), t("lowercase", ki), t("number", Wn), t("orderBy", tr), t("uppercase", Ci)
  }

  function _n() {
    return function (e, t, n) {
      if (!k(e))return e;
      var r = typeof n, i = [];
      i.check = function (e) {
        for (var t = 0; t < i.length; t++)if (!i[t](e))return !1;
        return !0
      }, "function" !== r && (n = "boolean" === r && n ? function (e, t) {
        return Sr.equals(e, t)
      } : function (e, t) {
        if (e && t && "object" == typeof e && "object" == typeof t) {
          for (var r in e)if ("$" !== r.charAt(0) && hr.call(e, r) && n(e[r], t[r]))return !0;
          return !1
        }
        return t = ("" + t).toLowerCase(), ("" + e).toLowerCase().indexOf(t) > -1
      });
      var o = function (e, t) {
        if ("string" == typeof t && "!" === t.charAt(0))return !o(e, t.substr(1));
        switch (typeof e) {
          case"boolean":
          case"number":
          case"string":
            return n(e, t);
          case"object":
            switch (typeof t) {
              case"object":
                return n(e, t);
              default:
                for (var r in e)if ("$" !== r.charAt(0) && o(e[r], t))return !0
            }
            return !1;
          case"array":
            for (var i = 0; i < e.length; i++)if (o(e[i], t))return !0;
            return !1;
          default:
            return !1
        }
      };
      switch (typeof t) {
        case"boolean":
        case"number":
        case"string":
          t = {$: t};
        case"object":
          for (var a in t)!function (e) {
            "undefined" != typeof t[e] && i.push(function (n) {
              return o("$" == e ? n : n && n[e], t[e])
            })
          }(a);
          break;
        case"function":
          i.push(t);
          break;
        default:
          return e
      }
      for (var s = [], u = 0; u < e.length; u++) {
        var l = e[u];
        i.check(l) && s.push(l)
      }
      return s
    }
  }

  function Bn(e) {
    var t = e.NUMBER_FORMATS;
    return function (e, n) {
      return v(n) && (n = t.CURRENCY_SYM), zn(e, t.PATTERNS[1], t.GROUP_SEP, t.DECIMAL_SEP, 2).replace(/\u00A4/g, n)
    }
  }

  function Wn(e) {
    var t = e.NUMBER_FORMATS;
    return function (e, n) {
      return zn(e, t.PATTERNS[0], t.GROUP_SEP, t.DECIMAL_SEP, n)
    }
  }

  function zn(e, t, n, r, i) {
    if (null == e || !isFinite(e) || y(e))return "";
    var o = 0 > e;
    e = Math.abs(e);
    var a = e + "", s = "", u = [], l = !1;
    if (-1 !== a.indexOf("e")) {
      var c = a.match(/([\d\.]+)e(-?)(\d+)/);
      c && "-" == c[2] && c[3] > i + 1 ? a = "0" : (s = a, l = !0)
    }
    if (l)i > 0 && e > -1 && 1 > e && (s = e.toFixed(i)); else {
      var p = (a.split(yi)[1] || "").length;
      v(i) && (i = Math.min(Math.max(t.minFrac, p), t.maxFrac));
      var f = Math.pow(10, i);
      e = Math.round(e * f) / f;
      var d = ("" + e).split(yi), h = d[0];
      d = d[1] || "";
      var g, m = 0, $ = t.lgSize, b = t.gSize;
      if (h.length >= $ + b)for (m = h.length - $, g = 0; m > g; g++)(m - g) % b === 0 && 0 !== g && (s += n), s += h.charAt(g);
      for (g = m; g < h.length; g++)(h.length - g) % $ === 0 && 0 !== g && (s += n), s += h.charAt(g);
      for (; d.length < i;)d += "0";
      i && "0" !== i && (s += r + d.substr(0, i))
    }
    return u.push(o ? t.negPre : t.posPre), u.push(s), u.push(o ? t.negSuf : t.posSuf), u.join("")
  }

  function Yn(e, t, n) {
    var r = "";
    for (0 > e && (r = "-", e = -e), e = "" + e; e.length < t;)e = "0" + e;
    return n && (e = e.substr(e.length - t)), r + e
  }

  function Xn(e, t, n, r) {
    return n = n || 0, function (i) {
      var o = i["get" + e]();
      return (n > 0 || o > -n) && (o += n), 0 === o && -12 == n && (o = 12), Yn(o, t, r)
    }
  }

  function Gn(e, t) {
    return function (n, r) {
      var i = n["get" + e](), o = gr(t ? "SHORT" + e : e);
      return r[o][i]
    }
  }

  function Qn(e) {
    var t = -1 * e.getTimezoneOffset(), n = t >= 0 ? "+" : "";
    return n += Yn(Math[t > 0 ? "floor" : "ceil"](t / 60), 2) + Yn(Math.abs(t % 60), 2)
  }

  function Kn(e, t) {
    return e.getHours() < 12 ? t.AMPMS[0] : t.AMPMS[1]
  }

  function Jn(e) {
    function t(e) {
      var t;
      if (t = e.match(n)) {
        var r = new Date(0), i = 0, o = 0, a = t[8] ? r.setUTCFullYear : r.setFullYear, s = t[8] ? r.setUTCHours : r.setHours;
        t[9] && (i = f(t[9] + t[10]), o = f(t[9] + t[11])), a.call(r, f(t[1]), f(t[2]) - 1, f(t[3]));
        var u = f(t[4] || 0) - i, l = f(t[5] || 0) - o, c = f(t[6] || 0), p = Math.round(1e3 * parseFloat("0." + (t[7] || 0)));
        return s.call(r, u, l, c, p), r
      }
      return e
    }

    var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function (n, r) {
      var i, a, s = "", u = [];
      if (r = r || "mediumDate", r = e.DATETIME_FORMATS[r] || r, b(n) && (n = xi.test(n) ? f(n) : t(n)), w(n) && (n = new Date(n)), !x(n))return n;
      for (; r;)a = wi.exec(r), a ? (u = F(u, a, 1), r = u.pop()) : (u.push(r), r = null);
      return o(u, function (t) {
        i = bi[t], s += i ? i(n, e.DATETIME_FORMATS) : t.replace(/(^'|'$)/g, "").replace(/''/g, "'")
      }), s
    }
  }

  function Zn() {
    return function (e) {
      return _(e, !0)
    }
  }

  function er() {
    return function (e, t) {
      if (!k(e) && !b(e))return e;
      if (t = f(t), b(e))return t ? t >= 0 ? e.slice(0, t) : e.slice(t, e.length) : "";
      var n, r, i = [];
      for (t > e.length ? t = e.length : t < -e.length && (t = -e.length), t > 0 ? (n = 0, r = t) : (n = e.length + t, r = e.length); r > n; n++)i.push(e[n]);
      return i
    }
  }

  function tr(e) {
    return function (t, n, r) {
      function i(e, t) {
        for (var r = 0; r < n.length; r++) {
          var i = n[r](e, t);
          if (0 !== i)return i
        }
        return 0
      }

      function o(e, t) {
        return W(t) ? function (t, n) {
          return e(n, t)
        } : e
      }

      function a(e, t) {
        var n = typeof e, r = typeof t;
        return n == r ? ("string" == n && (e = e.toLowerCase(), t = t.toLowerCase()), e === t ? 0 : t > e ? -1 : 1) : r > n ? -1 : 1
      }

      if (!k(t))return t;
      if (!n)return t;
      n = k(n) ? n : [n], n = O(n, function (t) {
        var n = !1, r = t || g;
        if (b(t) && (("+" == t.charAt(0) || "-" == t.charAt(0)) && (n = "-" == t.charAt(0), t = t.substring(1)), r = e(t), r.constant)) {
          var i = r();
          return o(function (e, t) {
            return a(e[i], t[i])
          }, n)
        }
        return o(function (e, t) {
          return a(r(e), r(t))
        }, n)
      });
      for (var s = [], u = 0; u < t.length; u++)s.push(t[u]);
      return s.sort(o(i, r))
    }
  }

  function nr(e) {
    return C(e) && (e = {link: e}), e.restrict = e.restrict || "AC", m(e)
  }

  function rr(e, t, n, r) {
    function i(t, n) {
      n = n ? "-" + et(n, "-") : "", r.removeClass(e, (t ? Hi : Ri) + n), r.addClass(e, (t ? Ri : Hi) + n)
    }

    var a = this, s = e.parent().controller("form") || Si, u = 0, l = a.$error = {}, c = [];
    a.$name = t.name || t.ngForm, a.$dirty = !1, a.$pristine = !0, a.$valid = !0, a.$invalid = !1, s.$addControl(a), e.addClass(Li), i(!0), a.$addControl = function (e) {
      it(e.$name, "input"), c.push(e), e.$name && (a[e.$name] = e)
    }, a.$removeControl = function (e) {
      e.$name && a[e.$name] === e && delete a[e.$name], o(l, function (t, n) {
        a.$setValidity(n, !0, e)
      }), q(c, e)
    }, a.$setValidity = function (e, t, n) {
      var r = l[e];
      if (t)r && (q(r, n), r.length || (u--, u || (i(t), a.$valid = !0, a.$invalid = !1), l[e] = !1, i(!0, e), s.$setValidity(e, !0, a))); else {
        if (u || i(t), r) {
          if (N(r, n))return
        } else l[e] = r = [], u++, i(!1, e), s.$setValidity(e, !1, a);
        r.push(n), a.$valid = !1, a.$invalid = !0
      }
    }, a.$setDirty = function () {
      r.removeClass(e, Li), r.addClass(e, Fi), a.$dirty = !0, a.$pristine = !1, s.$setDirty()
    }, a.$setPristine = function () {
      r.removeClass(e, Fi), r.addClass(e, Li), a.$dirty = !1, a.$pristine = !0, o(c, function (e) {
        e.$setPristine()
      })
    }
  }

  function ir(e, t, r, i) {
    return e.$setValidity(t, r), r ? i : n
  }

  function or(e, t, n) {
    var r = n.prop("validity");
    if (y(r)) {
      var i = function (n) {
        return e.$error[t] || !(r.badInput || r.customError || r.typeMismatch) || r.valueMissing ? n : void e.$setValidity(t, !1)
      };
      e.$parsers.push(i)
    }
  }

  function ar(e, t, n, i, o, a) {
    var s = t.prop("validity");
    if (!o.android) {
      var u = !1;
      t.on("compositionstart", function () {
        u = !0
      }), t.on("compositionend", function () {
        u = !1, l()
      })
    }
    var l = function () {
      if (!u) {
        var r = t.val();
        W(n.ngTrim || "T") && (r = Ar(r)), (i.$viewValue !== r || s && "" === r && !s.valueMissing) && (e.$$phase ? i.$setViewValue(r) : e.$apply(function () {
          i.$setViewValue(r)
        }))
      }
    };
    if (o.hasEvent("input"))t.on("input", l); else {
      var c, p = function () {
        c || (c = a.defer(function () {
          l(), c = null
        }))
      };
      t.on("keydown", function (e) {
        var t = e.keyCode;
        91 === t || t > 15 && 19 > t || t >= 37 && 40 >= t || p()
      }), o.hasEvent("paste") && t.on("paste cut", p)
    }
    t.on("change", l), i.$render = function () {
      t.val(i.$isEmpty(i.$viewValue) ? "" : i.$viewValue)
    };
    var d, h, g = n.ngPattern;
    if (g) {
      var m = function (e, t) {
        return ir(i, "pattern", i.$isEmpty(t) || e.test(t), t)
      };
      h = g.match(/^\/(.*)\/([gim]*)$/), h ? (g = new RegExp(h[1], h[2]), d = function (e) {
        return m(g, e)
      }) : d = function (n) {
        var i = e.$eval(g);
        if (!i || !i.test)throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", g, i, z(t));
        return m(i, n)
      }, i.$formatters.push(d), i.$parsers.push(d)
    }
    if (n.ngMinlength) {
      var v = f(n.ngMinlength), $ = function (e) {
        return ir(i, "minlength", i.$isEmpty(e) || e.length >= v, e)
      };
      i.$parsers.push($), i.$formatters.push($)
    }
    if (n.ngMaxlength) {
      var y = f(n.ngMaxlength), b = function (e) {
        return ir(i, "maxlength", i.$isEmpty(e) || e.length <= y, e)
      };
      i.$parsers.push(b), i.$formatters.push(b)
    }
  }

  function sr(e, t, r, i, o, a) {
    if (ar(e, t, r, i, o, a), i.$parsers.push(function (e) {
        var t = i.$isEmpty(e);
        return t || Pi.test(e) ? (i.$setValidity("number", !0), "" === e ? null : t ? e : parseFloat(e)) : (i.$setValidity("number", !1), n)
      }), or(i, "number", t), i.$formatters.push(function (e) {
        return i.$isEmpty(e) ? "" : "" + e
      }), r.min) {
      var s = function (e) {
        var t = parseFloat(r.min);
        return ir(i, "min", i.$isEmpty(e) || e >= t, e)
      };
      i.$parsers.push(s), i.$formatters.push(s)
    }
    if (r.max) {
      var u = function (e) {
        var t = parseFloat(r.max);
        return ir(i, "max", i.$isEmpty(e) || t >= e, e)
      };
      i.$parsers.push(u), i.$formatters.push(u)
    }
    i.$formatters.push(function (e) {
      return ir(i, "number", i.$isEmpty(e) || w(e), e)
    })
  }

  function ur(e, t, n, r, i, o) {
    ar(e, t, n, r, i, o);
    var a = function (e) {
      return ir(r, "url", r.$isEmpty(e) || Oi.test(e), e)
    };
    r.$formatters.push(a), r.$parsers.push(a)
  }

  function lr(e, t, n, r, i, o) {
    ar(e, t, n, r, i, o);
    var a = function (e) {
      return ir(r, "email", r.$isEmpty(e) || Ni.test(e), e)
    };
    r.$formatters.push(a), r.$parsers.push(a)
  }

  function cr(e, t, n, r) {
    v(n.name) && t.attr("name", l()), t.on("click", function () {
      t[0].checked && e.$apply(function () {
        r.$setViewValue(n.value)
      })
    }), r.$render = function () {
      var e = n.value;
      t[0].checked = e == r.$viewValue
    }, n.$observe("value", r.$render)
  }

  function pr(e, t, n, r) {
    var i = n.ngTrueValue, o = n.ngFalseValue;
    b(i) || (i = !0), b(o) || (o = !1), t.on("click", function () {
      e.$apply(function () {
        r.$setViewValue(t[0].checked)
      })
    }), r.$render = function () {
      t[0].checked = r.$viewValue
    }, r.$isEmpty = function (e) {
      return e !== i
    }, r.$formatters.push(function (e) {
      return e === i
    }), r.$parsers.push(function (e) {
      return e ? i : o
    })
  }

  function fr(e, t) {
    return e = "ngClass" + e, ["$animate", function (n) {
      function r(e, t) {
        var n = [];
        e:for (var r = 0; r < e.length; r++) {
          for (var i = e[r], o = 0; o < t.length; o++)if (i == t[o])continue e;
          n.push(i)
        }
        return n
      }

      function i(e) {
        if (k(e))return e;
        if (b(e))return e.split(" ");
        if (y(e)) {
          var t = [];
          return o(e, function (e, n) {
            e && t.push(n)
          }), t
        }
        return e
      }

      return {
        restrict: "AC", link: function (a, s, u) {
          function l(e) {
            var t = p(e, 1);
            u.$addClass(t)
          }

          function c(e) {
            var t = p(e, -1);
            u.$removeClass(t)
          }

          function p(e, t) {
            var n = s.data("$classCounts") || {}, r = [];
            return o(e, function (e) {
              (t > 0 || n[e]) && (n[e] = (n[e] || 0) + t, n[e] === +(t > 0) && r.push(e))
            }), s.data("$classCounts", n), r.join(" ")
          }

          function f(e, t) {
            var i = r(t, e), o = r(e, t);
            o = p(o, -1), i = p(i, 1), 0 === i.length ? n.removeClass(s, o) : 0 === o.length ? n.addClass(s, i) : n.setClass(s, i, o)
          }

          function d(e) {
            if (t === !0 || a.$index % 2 === t) {
              var n = i(e || []);
              if (h) {
                if (!H(e, h)) {
                  var r = i(h);
                  f(r, n)
                }
              } else l(n)
            }
            h = j(e)
          }

          var h;
          a.$watch(u[e], d, !0), u.$observe("class", function () {
            d(a.$eval(u[e]))
          }), "ngClass" !== e && a.$watch("$index", function (n, r) {
            var o = 1 & n;
            if (o !== r & 1) {
              var s = i(a.$eval(u[e]));
              o === t ? l(s) : c(s)
            }
          })
        }
      }
    }]
  }

  var dr = function (e) {
    return b(e) ? e.toLowerCase() : e
  }, hr = Object.prototype.hasOwnProperty, gr = function (e) {
    return b(e) ? e.toUpperCase() : e
  }, mr = function (e) {
    return b(e) ? e.replace(/[A-Z]/g, function (e) {
      return String.fromCharCode(32 | e.charCodeAt(0))
    }) : e
  }, vr = function (e) {
    return b(e) ? e.replace(/[a-z]/g, function (e) {
      return String.fromCharCode(-33 & e.charCodeAt(0))
    }) : e
  };
  "i" !== "I".toLowerCase() && (dr = mr, gr = vr);
  var $r, yr, br, wr, xr, kr = [].slice, Cr = [].push, Er = Object.prototype.toString, Tr = r("ng"), Sr = (e.angular, e.angular || (e.angular = {})), Dr = ["0", "0", "0"];
  $r = f((/msie (\d+)/.exec(dr(navigator.userAgent)) || [])[1]), isNaN($r) && ($r = f((/trident\/.*; rv:(\d+)/.exec(dr(navigator.userAgent)) || [])[1])), h.$inject = [], g.$inject = [];
  var Ar = function () {
    return String.prototype.trim ? function (e) {
      return b(e) ? e.trim() : e
    } : function (e) {
      return b(e) ? e.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : e
    }
  }();
  xr = 9 > $r ? function (e) {
    return e = e.nodeName ? e : e[0], e.scopeName && "HTML" != e.scopeName ? gr(e.scopeName + ":" + e.nodeName) : e.nodeName
  } : function (e) {
    return e.nodeName ? e.nodeName : e[0].nodeName
  };
  var Mr = /[A-Z]/g, Or = {
    full: "1.2.16",
    major: 1,
    minor: 2,
    dot: 16,
    codeName: "badger-enumeration"
  }, Nr = gt.cache = {}, Pr = gt.expando = "ng-" + (new Date).getTime(), qr = 1, jr = e.document.addEventListener ? function (e, t, n) {
    e.addEventListener(t, n, !1)
  } : function (e, t, n) {
    e.attachEvent("on" + t, n)
  }, Rr = e.document.removeEventListener ? function (e, t, n) {
    e.removeEventListener(t, n, !1)
  } : function (e, t, n) {
    e.detachEvent("on" + t, n)
  }, Hr = (gt._data = function (e) {
    return this.cache[e[this.expando]] || {}
  }, /([\:\-\_]+(.))/g), Lr = /^moz([A-Z])/, Fr = r("jqLite"), Ir = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Vr = /<|&#?\w+;/, Ur = /<([\w:]+)/, _r = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Br = {
    option: [1, '<select multiple="multiple">', "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  Br.optgroup = Br.option, Br.tbody = Br.tfoot = Br.colgroup = Br.caption = Br.thead, Br.th = Br.td;
  var Wr = gt.prototype = {
    ready: function (n) {
      function r() {
        i || (i = !0, n())
      }

      var i = !1;
      "complete" === t.readyState ? setTimeout(r) : (this.on("DOMContentLoaded", r), gt(e).on("load", r))
    }, toString: function () {
      var e = [];
      return o(this, function (t) {
        e.push("" + t)
      }), "[" + e.join(", ") + "]"
    }, eq: function (e) {
      return yr(e >= 0 ? this[e] : this[this.length + e])
    }, length: 0, push: Cr, sort: [].sort, splice: [].splice
  }, zr = {};
  o("multiple,selected,checked,disabled,readOnly,required,open".split(","), function (e) {
    zr[dr(e)] = e
  });
  var Yr = {};
  o("input,select,option,textarea,button,form,details".split(","), function (e) {
    Yr[gr(e)] = !0
  }), o({
    data: wt, inheritedData: St, scope: function (e) {
      return yr(e).data("$scope") || St(e.parentNode || e, ["$isolateScope", "$scope"])
    }, isolateScope: function (e) {
      return yr(e).data("$isolateScope") || yr(e).data("$isolateScopeNoTemplate")
    }, controller: Tt, injector: function (e) {
      return St(e, "$injector")
    }, removeAttr: function (e, t) {
      e.removeAttribute(t)
    }, hasClass: xt, css: function (e, t, r) {
      if (t = ct(t), !$(r)) {
        var i;
        return 8 >= $r && (i = e.currentStyle && e.currentStyle[t], "" === i && (i = "auto")), i = i || e.style[t], 8 >= $r && (i = "" === i ? n : i), i
      }
      e.style[t] = r
    }, attr: function (e, t, r) {
      var i = dr(t);
      if (zr[i]) {
        if (!$(r))return e[t] || (e.attributes.getNamedItem(t) || h).specified ? i : n;
        r ? (e[t] = !0, e.setAttribute(t, i)) : (e[t] = !1, e.removeAttribute(i))
      } else if ($(r))e.setAttribute(t, r); else if (e.getAttribute) {
        var o = e.getAttribute(t, 2);
        return null === o ? n : o
      }
    }, prop: function (e, t, n) {
      return $(n) ? void(e[t] = n) : e[t]
    }, text: function () {
      function e(e, n) {
        var r = t[e.nodeType];
        return v(n) ? r ? e[r] : "" : void(e[r] = n)
      }

      var t = [];
      return 9 > $r ? (t[1] = "innerText", t[3] = "nodeValue") : t[1] = t[3] = "textContent", e.$dv = "", e
    }(), val: function (e, t) {
      if (v(t)) {
        if ("SELECT" === xr(e) && e.multiple) {
          var n = [];
          return o(e.options, function (e) {
            e.selected && n.push(e.value || e.text)
          }), 0 === n.length ? null : n
        }
        return e.value
      }
      e.value = t
    }, html: function (e, t) {
      if (v(t))return e.innerHTML;
      for (var n = 0, r = e.childNodes; n < r.length; n++)vt(r[n]);
      e.innerHTML = t
    }, empty: Dt
  }, function (e, t) {
    gt.prototype[t] = function (t, r) {
      var i, o;
      if (e !== Dt && (2 == e.length && e !== xt && e !== Tt ? t : r) === n) {
        if (y(t)) {
          for (i = 0; i < this.length; i++)if (e === wt)e(this[i], t); else for (o in t)e(this[i], o, t[o]);
          return this
        }
        for (var a = e.$dv, s = a === n ? Math.min(this.length, 1) : this.length, u = 0; s > u; u++) {
          var l = e(this[u], t, r);
          a = a ? a + l : l
        }
        return a
      }
      for (i = 0; i < this.length; i++)e(this[i], t, r);
      return this
    }
  }), o({
    removeData: yt, dealoc: vt, on: function ko(e, n, r, i) {
      if ($(i))throw Fr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
      var a = bt(e, "events"), s = bt(e, "handle");
      a || bt(e, "events", a = {}), s || bt(e, "handle", s = Mt(e, a)), o(n.split(" "), function (n) {
        var i = a[n];
        if (!i) {
          if ("mouseenter" == n || "mouseleave" == n) {
            var o = t.body.contains || t.body.compareDocumentPosition ? function (e, t) {
              var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
              return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function (e, t) {
              if (t)for (; t = t.parentNode;)if (t === e)return !0;
              return !1
            };
            a[n] = [];
            var u = {mouseleave: "mouseout", mouseenter: "mouseover"};
            ko(e, u[n], function (e) {
              var t = this, r = e.relatedTarget;
              (!r || r !== t && !o(t, r)) && s(e, n)
            })
          } else jr(e, n, s), a[n] = [];
          i = a[n]
        }
        i.push(r)
      })
    }, off: $t, one: function (e, t, n) {
      e = yr(e), e.on(t, function r() {
        e.off(t, n), e.off(t, r)
      }), e.on(t, n)
    }, replaceWith: function (e, t) {
      var n, r = e.parentNode;
      vt(e), o(new gt(t), function (t) {
        n ? r.insertBefore(t, n.nextSibling) : r.replaceChild(t, e), n = t
      })
    }, children: function (e) {
      var t = [];
      return o(e.childNodes, function (e) {
        1 === e.nodeType && t.push(e)
      }), t
    }, contents: function (e) {
      return e.contentDocument || e.childNodes || []
    }, append: function (e, t) {
      o(new gt(t), function (t) {
        (1 === e.nodeType || 11 === e.nodeType) && e.appendChild(t)
      })
    }, prepend: function (e, t) {
      if (1 === e.nodeType) {
        var n = e.firstChild;
        o(new gt(t), function (t) {
          e.insertBefore(t, n)
        })
      }
    }, wrap: function (e, t) {
      t = yr(t)[0];
      var n = e.parentNode;
      n && n.replaceChild(t, e), t.appendChild(e)
    }, remove: function (e) {
      vt(e);
      var t = e.parentNode;
      t && t.removeChild(e)
    }, after: function (e, t) {
      var n = e, r = e.parentNode;
      o(new gt(t), function (e) {
        r.insertBefore(e, n.nextSibling), n = e
      })
    }, addClass: Ct, removeClass: kt, toggleClass: function (e, t, n) {
      t && o(t.split(" "), function (t) {
        var r = n;
        v(r) && (r = !xt(e, t)), (r ? Ct : kt)(e, t)
      })
    }, parent: function (e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    }, next: function (e) {
      if (e.nextElementSibling)return e.nextElementSibling;
      for (var t = e.nextSibling; null != t && 1 !== t.nodeType;)t = t.nextSibling;
      return t
    }, find: function (e, t) {
      return e.getElementsByTagName ? e.getElementsByTagName(t) : []
    }, clone: mt, triggerHandler: function (e, t, n) {
      var r = (bt(e, "events") || {})[t];
      n = n || [];
      var i = [{preventDefault: h, stopPropagation: h}];
      o(r, function (t) {
        t.apply(e, i.concat(n))
      })
    }
  }, function (e, t) {
    gt.prototype[t] = function (t, n, r) {
      for (var i, o = 0; o < this.length; o++)v(i) ? (i = e(this[o], t, n, r), $(i) && (i = yr(i))) : Et(i, e(this[o], t, n, r));
      return $(i) ? i : this
    }, gt.prototype.bind = gt.prototype.on, gt.prototype.unbind = gt.prototype.off
  }), Nt.prototype = {
    put: function (e, t) {
      this[Ot(e)] = t
    }, get: function (e) {
      return this[Ot(e)]
    }, remove: function (e) {
      var t = this[e = Ot(e)];
      return delete this[e], t
    }
  };
  var Xr = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, Gr = /,/, Qr = /^\s*(_?)(\S+?)\1\s*$/, Kr = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Jr = r("$injector"), Zr = r("$animate"), ei = ["$provide", function (e) {
    this.$$selectors = {}, this.register = function (t, n) {
      var r = t + "-animation";
      if (t && "." != t.charAt(0))throw Zr("notcsel", "Expecting class selector starting with '.' got '{0}'.", t);
      this.$$selectors[t.substr(1)] = r, e.factory(r, n)
    }, this.classNameFilter = function (e) {
      return 1 === arguments.length && (this.$$classNameFilter = e instanceof RegExp ? e : null), this.$$classNameFilter
    }, this.$get = ["$timeout", "$$asyncCallback", function (e, t) {
      function n(e) {
        e && t(e)
      }

      return {
        enter: function (e, t, r, i) {
          r ? r.after(e) : (t && t[0] || (t = r.parent()), t.append(e)), n(i)
        }, leave: function (e, t) {
          e.remove(), n(t)
        }, move: function (e, t, n, r) {
          this.enter(e, t, n, r)
        }, addClass: function (e, t, r) {
          t = b(t) ? t : k(t) ? t.join(" ") : "", o(e, function (e) {
            Ct(e, t)
          }), n(r)
        }, removeClass: function (e, t, r) {
          t = b(t) ? t : k(t) ? t.join(" ") : "", o(e, function (e) {
            kt(e, t)
          }), n(r)
        }, setClass: function (e, t, r, i) {
          o(e, function (e) {
            Ct(e, t), kt(e, r)
          }), n(i)
        }, enabled: h
      }
    }]
  }], ti = r("$compile");
  Vt.$inject = ["$provide", "$$sanitizeUriProvider"];
  var ni = /^(x[\:\-_]|data[\:\-_])/i, ri = r("$interpolate"), ii = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, oi = {
    http: 80,
    https: 443,
    ftp: 21
  }, ai = r("$location");
  hn.prototype = dn.prototype = fn.prototype = {
    $$html5: !1,
    $$replace: !1,
    absUrl: gn("$$absUrl"),
    url: function (e, t) {
      if (v(e))return this.$$url;
      var n = ii.exec(e);
      return n[1] && this.path(decodeURIComponent(n[1])), (n[2] || n[1]) && this.search(n[3] || ""), this.hash(n[5] || "", t), this
    },
    protocol: gn("$$protocol"),
    host: gn("$$host"),
    port: gn("$$port"),
    path: mn("$$path", function (e) {
      return "/" == e.charAt(0) ? e : "/" + e
    }),
    search: function (e, t) {
      switch (arguments.length) {
        case 0:
          return this.$$search;
        case 1:
          if (b(e))this.$$search = X(e); else {
            if (!y(e))throw ai("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
            this.$$search = e
          }
          break;
        default:
          v(t) || null === t ? delete this.$$search[e] : this.$$search[e] = t
      }
      return this.$$compose(), this
    },
    hash: mn("$$hash", g),
    replace: function () {
      return this.$$replace = !0, this
    }
  };
  var si, ui = r("$parse"), li = {}, ci = {
    "null": function () {
      return null
    }, "true": function () {
      return !0
    }, "false": function () {
      return !1
    }, undefined: h, "+": function (e, t, r, i) {
      return r = r(e, t), i = i(e, t), $(r) ? $(i) ? r + i : r : $(i) ? i : n
    }, "-": function (e, t, n, r) {
      return n = n(e, t), r = r(e, t), ($(n) ? n : 0) - ($(r) ? r : 0)
    }, "*": function (e, t, n, r) {
      return n(e, t) * r(e, t)
    }, "/": function (e, t, n, r) {
      return n(e, t) / r(e, t)
    }, "%": function (e, t, n, r) {
      return n(e, t) % r(e, t)
    }, "^": function (e, t, n, r) {
      return n(e, t) ^ r(e, t)
    }, "=": h, "===": function (e, t, n, r) {
      return n(e, t) === r(e, t)
    }, "!==": function (e, t, n, r) {
      return n(e, t) !== r(e, t)
    }, "==": function (e, t, n, r) {
      return n(e, t) == r(e, t)
    }, "!=": function (e, t, n, r) {
      return n(e, t) != r(e, t)
    }, "<": function (e, t, n, r) {
      return n(e, t) < r(e, t)
    }, ">": function (e, t, n, r) {
      return n(e, t) > r(e, t)
    }, "<=": function (e, t, n, r) {
      return n(e, t) <= r(e, t)
    }, ">=": function (e, t, n, r) {
      return n(e, t) >= r(e, t)
    }, "&&": function (e, t, n, r) {
      return n(e, t) && r(e, t)
    }, "||": function (e, t, n, r) {
      return n(e, t) || r(e, t)
    }, "&": function (e, t, n, r) {
      return n(e, t) & r(e, t)
    }, "|": function (e, t, n, r) {
      return r(e, t)(e, t, n(e, t))
    }, "!": function (e, t, n) {
      return !n(e, t)
    }
  }, pi = {n: "\n", f: "\f", r: "\r", t: "	", v: "", "'": "'", '"': '"'}, fi = function (e) {
    this.options = e
  };
  fi.prototype = {
    constructor: fi, lex: function (e) {
      this.text = e, this.index = 0, this.ch = n, this.lastCh = ":", this.tokens = [];
      for (var t, r = []; this.index < this.text.length;) {
        if (this.ch = this.text.charAt(this.index), this.is("\"'"))this.readString(this.ch); else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek()))this.readNumber(); else if (this.isIdent(this.ch))this.readIdent(), this.was("{,") && "{" === r[0] && (t = this.tokens[this.tokens.length - 1]) && (t.json = -1 === t.text.indexOf(".")); else if (this.is("(){}[].,;:?"))this.tokens.push({
          index: this.index,
          text: this.ch,
          json: this.was(":[,") && this.is("{[") || this.is("}]:,")
        }), this.is("{[") && r.unshift(this.ch), this.is("}]") && r.shift(), this.index++; else {
          if (this.isWhitespace(this.ch)) {
            this.index++;
            continue
          }
          var i = this.ch + this.peek(), o = i + this.peek(2), a = ci[this.ch], s = ci[i], u = ci[o];
          u ? (this.tokens.push({
            index: this.index,
            text: o,
            fn: u
          }), this.index += 3) : s ? (this.tokens.push({
            index: this.index,
            text: i,
            fn: s
          }), this.index += 2) : a ? (this.tokens.push({
            index: this.index,
            text: this.ch,
            fn: a,
            json: this.was("[,:") && this.is("+-")
          }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
        }
        this.lastCh = this.ch
      }
      return this.tokens
    }, is: function (e) {
      return -1 !== e.indexOf(this.ch)
    }, was: function (e) {
      return -1 !== e.indexOf(this.lastCh)
    }, peek: function (e) {
      var t = e || 1;
      return this.index + t < this.text.length ? this.text.charAt(this.index + t) : !1
    }, isNumber: function (e) {
      return e >= "0" && "9" >= e
    }, isWhitespace: function (e) {
      return " " === e || "\r" === e || "	" === e || "\n" === e || "" === e || " " === e
    }, isIdent: function (e) {
      return e >= "a" && "z" >= e || e >= "A" && "Z" >= e || "_" === e || "$" === e
    }, isExpOperator: function (e) {
      return "-" === e || "+" === e || this.isNumber(e)
    }, throwError: function (e, t, n) {
      n = n || this.index;
      var r = $(t) ? "s " + t + "-" + this.index + " [" + this.text.substring(t, n) + "]" : " " + n;
      throw ui("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", e, r, this.text)
    }, readNumber: function () {
      for (var e = "", t = this.index; this.index < this.text.length;) {
        var n = dr(this.text.charAt(this.index));
        if ("." == n || this.isNumber(n))e += n; else {
          var r = this.peek();
          if ("e" == n && this.isExpOperator(r))e += n; else if (this.isExpOperator(n) && r && this.isNumber(r) && "e" == e.charAt(e.length - 1))e += n; else {
            if (!this.isExpOperator(n) || r && this.isNumber(r) || "e" != e.charAt(e.length - 1))break;
            this.throwError("Invalid exponent")
          }
        }
        this.index++
      }
      e = 1 * e, this.tokens.push({
        index: t, text: e, json: !0, fn: function () {
          return e
        }
      })
    }, readIdent: function () {
      for (var e, t, n, r, i = this, o = "", a = this.index; this.index < this.text.length && (r = this.text.charAt(this.index), "." === r || this.isIdent(r) || this.isNumber(r));)"." === r && (e = this.index), o += r, this.index++;
      if (e)for (t = this.index; t < this.text.length;) {
        if (r = this.text.charAt(t), "(" === r) {
          n = o.substr(e - a + 1), o = o.substr(0, e - a), this.index = t;
          break
        }
        if (!this.isWhitespace(r))break;
        t++
      }
      var s = {index: a, text: o};
      if (ci.hasOwnProperty(o))s.fn = ci[o], s.json = ci[o]; else {
        var u = En(o, this.options, this.text);
        s.fn = p(function (e, t) {
          return u(e, t)
        }, {
          assign: function (e, t) {
            return wn(e, o, t, i.text, i.options)
          }
        })
      }
      this.tokens.push(s), n && (this.tokens.push({index: e, text: ".", json: !1}), this.tokens.push({
        index: e + 1,
        text: n,
        json: !1
      }))
    }, readString: function (e) {
      var t = this.index;
      this.index++;
      for (var n = "", r = e, i = !1; this.index < this.text.length;) {
        var o = this.text.charAt(this.index);
        if (r += o, i) {
          if ("u" === o) {
            var a = this.text.substring(this.index + 1, this.index + 5);
            a.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + a + "]"), this.index += 4, n += String.fromCharCode(parseInt(a, 16))
          } else {
            var s = pi[o];
            n += s ? s : o
          }
          i = !1
        } else if ("\\" === o)i = !0; else {
          if (o === e)return this.index++, void this.tokens.push({
            index: t,
            text: r,
            string: n,
            json: !0,
            fn: function () {
              return n
            }
          });
          n += o
        }
        this.index++
      }
      this.throwError("Unterminated quote", t)
    }
  };
  var di = function (e, t, n) {
    this.lexer = e, this.$filter = t, this.options = n
  };
  di.ZERO = p(function () {
    return 0
  }, {constant: !0}), di.prototype = {
    constructor: di, parse: function (e, t) {
      this.text = e, this.json = t, this.tokens = this.lexer.lex(e), t && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function () {
        this.throwError("is not valid json", {text: e, index: 0})
      });
      var n = t ? this.primary() : this.statements();
      return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), n.literal = !!n.literal, n.constant = !!n.constant, n
    }, primary: function () {
      var e;
      if (this.expect("("))e = this.filterChain(), this.consume(")"); else if (this.expect("["))e = this.arrayDeclaration(); else if (this.expect("{"))e = this.object(); else {
        var t = this.expect();
        e = t.fn, e || this.throwError("not a primary expression", t), t.json && (e.constant = !0, e.literal = !0)
      }
      for (var n, r; n = this.expect("(", "[", ".");)"(" === n.text ? (e = this.functionCall(e, r), r = null) : "[" === n.text ? (r = e, e = this.objectIndex(e)) : "." === n.text ? (r = e, e = this.fieldAccess(e)) : this.throwError("IMPOSSIBLE");
      return e
    }, throwError: function (e, t) {
      throw ui("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", t.text, e, t.index + 1, this.text, this.text.substring(t.index))
    }, peekToken: function () {
      if (0 === this.tokens.length)throw ui("ueoe", "Unexpected end of expression: {0}", this.text);
      return this.tokens[0]
    }, peek: function (e, t, n, r) {
      if (this.tokens.length > 0) {
        var i = this.tokens[0], o = i.text;
        if (o === e || o === t || o === n || o === r || !e && !t && !n && !r)return i
      }
      return !1
    }, expect: function (e, t, n, r) {
      var i = this.peek(e, t, n, r);
      return i ? (this.json && !i.json && this.throwError("is not valid json", i), this.tokens.shift(), i) : !1
    }, consume: function (e) {
      this.expect(e) || this.throwError("is unexpected, expecting [" + e + "]", this.peek())
    }, unaryFn: function (e, t) {
      return p(function (n, r) {
        return e(n, r, t)
      }, {constant: t.constant})
    }, ternaryFn: function (e, t, n) {
      return p(function (r, i) {
        return e(r, i) ? t(r, i) : n(r, i)
      }, {constant: e.constant && t.constant && n.constant})
    }, binaryFn: function (e, t, n) {
      return p(function (r, i) {
        return t(r, i, e, n)
      }, {constant: e.constant && n.constant})
    }, statements: function () {
      for (var e = []; ;)if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && e.push(this.filterChain()), !this.expect(";"))return 1 === e.length ? e[0] : function (t, n) {
        for (var r, i = 0; i < e.length; i++) {
          var o = e[i];
          o && (r = o(t, n))
        }
        return r
      }
    }, filterChain: function () {
      for (var e, t = this.expression(); ;) {
        if (!(e = this.expect("|")))return t;
        t = this.binaryFn(t, e.fn, this.filter())
      }
    }, filter: function () {
      for (var e = this.expect(), t = this.$filter(e.text), n = []; ;) {
        if (!(e = this.expect(":"))) {
          var r = function (e, r, i) {
            for (var o = [i], a = 0; a < n.length; a++)o.push(n[a](e, r));
            return t.apply(e, o)
          };
          return function () {
            return r
          }
        }
        n.push(this.expression())
      }
    }, expression: function () {
      return this.assignment()
    }, assignment: function () {
      var e, t, n = this.ternary();
      return (t = this.expect("=")) ? (n.assign || this.throwError("implies assignment but [" + this.text.substring(0, t.index) + "] can not be assigned to", t), e = this.ternary(), function (t, r) {
        return n.assign(t, e(t, r), r)
      }) : n
    }, ternary: function () {
      var e, t, n = this.logicalOR();
      return (t = this.expect("?")) ? (e = this.ternary(), (t = this.expect(":")) ? this.ternaryFn(n, e, this.ternary()) : void this.throwError("expected :", t)) : n
    }, logicalOR: function () {
      for (var e, t = this.logicalAND(); ;) {
        if (!(e = this.expect("||")))return t;
        t = this.binaryFn(t, e.fn, this.logicalAND())
      }
    }, logicalAND: function () {
      var e, t = this.equality();
      return (e = this.expect("&&")) && (t = this.binaryFn(t, e.fn, this.logicalAND())), t
    }, equality: function () {
      var e, t = this.relational();
      return (e = this.expect("==", "!=", "===", "!==")) && (t = this.binaryFn(t, e.fn, this.equality())), t
    }, relational: function () {
      var e, t = this.additive();
      return (e = this.expect("<", ">", "<=", ">=")) && (t = this.binaryFn(t, e.fn, this.relational())), t
    }, additive: function () {
      for (var e, t = this.multiplicative(); e = this.expect("+", "-");)t = this.binaryFn(t, e.fn, this.multiplicative());
      return t
    }, multiplicative: function () {
      for (var e, t = this.unary(); e = this.expect("*", "/", "%");)t = this.binaryFn(t, e.fn, this.unary());
      return t
    }, unary: function () {
      var e;
      return this.expect("+") ? this.primary() : (e = this.expect("-")) ? this.binaryFn(di.ZERO, e.fn, this.unary()) : (e = this.expect("!")) ? this.unaryFn(e.fn, this.unary()) : this.primary()
    }, fieldAccess: function (e) {
      var t = this, n = this.expect().text, r = En(n, this.options, this.text);
      return p(function (t, n, i) {
        return r(i || e(t, n))
      }, {
        assign: function (r, i, o) {
          return wn(e(r, o), n, i, t.text, t.options)
        }
      })
    }, objectIndex: function (e) {
      var t = this, r = this.expression();
      return this.consume("]"), p(function (i, o) {
        var a, s, u = e(i, o), l = r(i, o);
        return u ? (a = bn(u[l], t.text), a && a.then && t.options.unwrapPromises && (s = a, "$$v"in a || (s.$$v = n, s.then(function (e) {
          s.$$v = e
        })), a = a.$$v), a) : n
      }, {
        assign: function (n, i, o) {
          var a = r(n, o), s = bn(e(n, o), t.text);
          return s[a] = i
        }
      })
    }, functionCall: function (e, t) {
      var n = [];
      if (")" !== this.peekToken().text)do n.push(this.expression()); while (this.expect(","));
      this.consume(")");
      var r = this;
      return function (i, o) {
        for (var a = [], s = t ? t(i, o) : i, u = 0; u < n.length; u++)a.push(n[u](i, o));
        var l = e(i, o, s) || h;
        bn(s, r.text), bn(l, r.text);
        var c = l.apply ? l.apply(s, a) : l(a[0], a[1], a[2], a[3], a[4]);
        return bn(c, r.text)
      }
    }, arrayDeclaration: function () {
      var e = [], t = !0;
      if ("]" !== this.peekToken().text)do {
        if (this.peek("]"))break;
        var n = this.expression();
        e.push(n), n.constant || (t = !1)
      } while (this.expect(","));
      return this.consume("]"), p(function (t, n) {
        for (var r = [], i = 0; i < e.length; i++)r.push(e[i](t, n));
        return r
      }, {literal: !0, constant: t})
    }, object: function () {
      var e = [], t = !0;
      if ("}" !== this.peekToken().text)do {
        if (this.peek("}"))break;
        var n = this.expect(), r = n.string || n.text;
        this.consume(":");
        var i = this.expression();
        e.push({key: r, value: i}), i.constant || (t = !1)
      } while (this.expect(","));
      return this.consume("}"), p(function (t, n) {
        for (var r = {}, i = 0; i < e.length; i++) {
          var o = e[i];
          r[o.key] = o.value(t, n)
        }
        return r
      }, {literal: !0, constant: t})
    }
  };
  var hi = {}, gi = r("$sce"), mi = {
    HTML: "html",
    CSS: "css",
    URL: "url",
    RESOURCE_URL: "resourceUrl",
    JS: "js"
  }, vi = t.createElement("a"), $i = Fn(e.location.href, !0);
  Un.$inject = ["$provide"], Bn.$inject = ["$locale"], Wn.$inject = ["$locale"];
  var yi = ".", bi = {
    yyyy: Xn("FullYear", 4),
    yy: Xn("FullYear", 2, 0, !0),
    y: Xn("FullYear", 1),
    MMMM: Gn("Month"),
    MMM: Gn("Month", !0),
    MM: Xn("Month", 2, 1),
    M: Xn("Month", 1, 1),
    dd: Xn("Date", 2),
    d: Xn("Date", 1),
    HH: Xn("Hours", 2),
    H: Xn("Hours", 1),
    hh: Xn("Hours", 2, -12),
    h: Xn("Hours", 1, -12),
    mm: Xn("Minutes", 2),
    m: Xn("Minutes", 1),
    ss: Xn("Seconds", 2),
    s: Xn("Seconds", 1),
    sss: Xn("Milliseconds", 3),
    EEEE: Gn("Day"),
    EEE: Gn("Day", !0),
    a: Kn,
    Z: Qn
  }, wi = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, xi = /^\-?\d+$/;
  Jn.$inject = ["$locale"];
  var ki = m(dr), Ci = m(gr);
  tr.$inject = ["$parse"];
  var Ei = m({
    restrict: "E", compile: function (e, n) {
      return 8 >= $r && (n.href || n.name || n.$set("href", ""), e.append(t.createComment("IE fix"))), n.href || n.xlinkHref || n.name ? void 0 : function (e, t) {
        var n = "[object SVGAnimatedString]" === Er.call(t.prop("href")) ? "xlink:href" : "href";
        t.on("click", function (e) {
          t.attr(n) || e.preventDefault()
        })
      }
    }
  }), Ti = {};
  o(zr, function (e, t) {
    if ("multiple" != e) {
      var n = Ut("ng-" + t);
      Ti[n] = function () {
        return {
          priority: 100, link: function (e, r, i) {
            e.$watch(i[n], function (e) {
              i.$set(t, !!e)
            })
          }
        }
      }
    }
  }), o(["src", "srcset", "href"], function (e) {
    var t = Ut("ng-" + e);
    Ti[t] = function () {
      return {
        priority: 99, link: function (n, r, i) {
          var o = e, a = e;
          "href" === e && "[object SVGAnimatedString]" === Er.call(r.prop("href")) && (a = "xlinkHref", i.$attr[a] = "xlink:href", o = null), i.$observe(t, function (e) {
            e && (i.$set(a, e), $r && o && r.prop(o, i[a]))
          })
        }
      }
    }
  });
  var Si = {$addControl: h, $removeControl: h, $setValidity: h, $setDirty: h, $setPristine: h};
  rr.$inject = ["$element", "$attrs", "$scope", "$animate"];
  var Di = function (e) {
    return ["$timeout", function (t) {
      var r = {
        name: "form", restrict: e ? "EAC" : "E", controller: rr, compile: function () {
          return {
            pre: function (e, r, i, o) {
              if (!i.action) {
                var a = function (e) {
                  e.preventDefault ? e.preventDefault() : e.returnValue = !1
                };
                jr(r[0], "submit", a), r.on("$destroy", function () {
                  t(function () {
                    Rr(r[0], "submit", a)
                  }, 0, !1)
                })
              }
              var s = r.parent().controller("form"), u = i.name || i.ngForm;
              u && wn(e, u, o, u), s && r.on("$destroy", function () {
                s.$removeControl(o), u && wn(e, u, n, u), p(o, Si)
              })
            }
          }
        }
      };
      return r
    }]
  }, Ai = Di(), Mi = Di(!0), Oi = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Ni = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i, Pi = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, qi = {
    text: ar,
    number: sr,
    url: ur,
    email: lr,
    radio: cr,
    checkbox: pr,
    hidden: h,
    button: h,
    submit: h,
    reset: h,
    file: h
  }, ji = ["$browser", "$sniffer", function (e, t) {
    return {
      restrict: "E", require: "?ngModel", link: function (n, r, i, o) {
        o && (qi[dr(i.type)] || qi.text)(n, r, i, o, t, e)
      }
    }
  }], Ri = "ng-valid", Hi = "ng-invalid", Li = "ng-pristine", Fi = "ng-dirty", Ii = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function (e, t, n, i, a, s) {
    function u(e, t) {
      t = t ? "-" + et(t, "-") : "", s.removeClass(i, (e ? Hi : Ri) + t), s.addClass(i, (e ? Ri : Hi) + t)
    }

    this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = n.name;
    var l = a(n.ngModel), c = l.assign;
    if (!c)throw r("ngModel")("nonassign", "Expression '{0}' is non-assignable. Element: {1}", n.ngModel, z(i));
    this.$render = h, this.$isEmpty = function (e) {
      return v(e) || "" === e || null === e || e !== e
    };
    var p = i.inheritedData("$formController") || Si, f = 0, d = this.$error = {};
    i.addClass(Li), u(!0), this.$setValidity = function (e, t) {
      d[e] !== !t && (t ? (d[e] && f--, f || (u(!0), this.$valid = !0, this.$invalid = !1)) : (u(!1), this.$invalid = !0, this.$valid = !1, f++), d[e] = !t, u(t, e), p.$setValidity(e, t, this))
    }, this.$setPristine = function () {
      this.$dirty = !1, this.$pristine = !0, s.removeClass(i, Fi), s.addClass(i, Li)
    }, this.$setViewValue = function (n) {
      this.$viewValue = n, this.$pristine && (this.$dirty = !0, this.$pristine = !1, s.removeClass(i, Li), s.addClass(i, Fi), p.$setDirty()), o(this.$parsers, function (e) {
        n = e(n)
      }), this.$modelValue !== n && (this.$modelValue = n, c(e, n), o(this.$viewChangeListeners, function (e) {
        try {
          e()
        } catch (n) {
          t(n)
        }
      }))
    };
    var g = this;
    e.$watch(function () {
      var t = l(e);
      if (g.$modelValue !== t) {
        var n = g.$formatters, r = n.length;
        for (g.$modelValue = t; r--;)t = n[r](t);
        g.$viewValue !== t && (g.$viewValue = t, g.$render())
      }
      return t
    })
  }], Vi = function () {
    return {
      require: ["ngModel", "^?form"], controller: Ii, link: function (e, t, n, r) {
        var i = r[0], o = r[1] || Si;
        o.$addControl(i), e.$on("$destroy", function () {
          o.$removeControl(i)
        })
      }
    }
  }, Ui = m({
    require: "ngModel", link: function (e, t, n, r) {
      r.$viewChangeListeners.push(function () {
        e.$eval(n.ngChange)
      })
    }
  }), _i = function () {
    return {
      require: "?ngModel", link: function (e, t, n, r) {
        if (r) {
          n.required = !0;
          var i = function (e) {
            return n.required && r.$isEmpty(e) ? void r.$setValidity("required", !1) : (r.$setValidity("required", !0), e)
          };
          r.$formatters.push(i), r.$parsers.unshift(i), n.$observe("required", function () {
            i(r.$viewValue)
          })
        }
      }
    }
  }, Bi = function () {
    return {
      require: "ngModel", link: function (e, t, r, i) {
        var a = /\/(.*)\//.exec(r.ngList), s = a && new RegExp(a[1]) || r.ngList || ",", u = function (e) {
          if (!v(e)) {
            var t = [];
            return e && o(e.split(s), function (e) {
              e && t.push(Ar(e))
            }), t
          }
        };
        i.$parsers.push(u), i.$formatters.push(function (e) {
          return k(e) ? e.join(", ") : n
        }), i.$isEmpty = function (e) {
          return !e || !e.length
        }
      }
    }
  }, Wi = /^(true|false|\d+)$/, zi = function () {
    return {
      priority: 100, compile: function (e, t) {
        return Wi.test(t.ngValue) ? function (e, t, n) {
          n.$set("value", e.$eval(n.ngValue))
        } : function (e, t, n) {
          e.$watch(n.ngValue, function (e) {
            n.$set("value", e)
          })
        }
      }
    }
  }, Yi = nr(function (e, t, r) {
    t.addClass("ng-binding").data("$binding", r.ngBind), e.$watch(r.ngBind, function (e) {
      t.text(e == n ? "" : e)
    })
  }), Xi = ["$interpolate", function (e) {
    return function (t, n, r) {
      var i = e(n.attr(r.$attr.ngBindTemplate));
      n.addClass("ng-binding").data("$binding", i), r.$observe("ngBindTemplate", function (e) {
        n.text(e)
      })
    }
  }], Gi = ["$sce", "$parse", function (e, t) {
    return function (n, r, i) {
      function o() {
        return (a(n) || "").toString()
      }

      r.addClass("ng-binding").data("$binding", i.ngBindHtml);
      var a = t(i.ngBindHtml);
      n.$watch(o, function () {
        r.html(e.getTrustedHtml(a(n)) || "")
      })
    }
  }], Qi = fr("", !0), Ki = fr("Odd", 0), Ji = fr("Even", 1), Zi = nr({
    compile: function (e, t) {
      t.$set("ngCloak", n), e.removeClass("ng-cloak")
    }
  }), eo = [function () {
    return {scope: !0, controller: "@", priority: 500}
  }], to = {};
  o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (e) {
    var t = Ut("ng-" + e);
    to[t] = ["$parse", function (n) {
      return {
        compile: function (r, i) {
          var o = n(i[t]);
          return function (t, n) {
            n.on(dr(e), function (e) {
              t.$apply(function () {
                o(t, {$event: e})
              })
            })
          }
        }
      }
    }]
  });
  var no = ["$animate", function (e) {
    return {
      transclude: "element",
      priority: 600,
      terminal: !0,
      restrict: "A",
      $$tlb: !0,
      link: function (n, r, i, o, a) {
        var s, u, l;
        n.$watch(i.ngIf, function (o) {
          W(o) ? u || (u = n.$new(), a(u, function (n) {
            n[n.length++] = t.createComment(" end ngIf: " + i.ngIf + " "), s = {clone: n}, e.enter(n, r.parent(), r)
          })) : (l && (l.remove(), l = null), u && (u.$destroy(), u = null), s && (l = at(s.clone), e.leave(l, function () {
            l = null
          }), s = null))
        })
      }
    }
  }], ro = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function (e, t, n, r, i) {
    return {
      restrict: "ECA",
      priority: 400,
      terminal: !0,
      transclude: "element",
      controller: Sr.noop,
      compile: function (o, a) {
        var s = a.ngInclude || a.src, u = a.onload || "", l = a.autoscroll;
        return function (o, a, c, p, f) {
          var d, h, g, m = 0, v = function () {
            h && (h.remove(), h = null), d && (d.$destroy(), d = null), g && (r.leave(g, function () {
              h = null
            }), h = g, g = null)
          };
          o.$watch(i.parseAsResourceUrl(s), function (i) {
            var s = function () {
              !$(l) || l && !o.$eval(l) || n()
            }, c = ++m;
            i ? (e.get(i, {cache: t}).success(function (e) {
              if (c === m) {
                var t = o.$new();
                p.template = e;
                var n = f(t, function (e) {
                  v(), r.enter(e, null, a, s)
                });
                d = t, g = n, d.$emit("$includeContentLoaded"), o.$eval(u)
              }
            }).error(function () {
              c === m && v()
            }), o.$emit("$includeContentRequested")) : (v(), p.template = null)
          })
        }
      }
    }
  }], io = ["$compile", function (e) {
    return {
      restrict: "ECA", priority: -400, require: "ngInclude", link: function (t, n, r, i) {
        n.html(i.template), e(n.contents())(t)
      }
    }
  }], oo = nr({
    priority: 450, compile: function () {
      return {
        pre: function (e, t, n) {
          e.$eval(n.ngInit)
        }
      }
    }
  }), ao = nr({terminal: !0, priority: 1e3}), so = ["$locale", "$interpolate", function (e, t) {
    var n = /{}/g;
    return {
      restrict: "EA", link: function (r, i, a) {
        var s = a.count, u = a.$attr.when && i.attr(a.$attr.when), l = a.offset || 0, c = r.$eval(u) || {}, p = {}, f = t.startSymbol(), d = t.endSymbol(), h = /^when(Minus)?(.+)$/;
        o(a, function (e, t) {
          h.test(t) && (c[dr(t.replace("when", "").replace("Minus", "-"))] = i.attr(a.$attr[t]))
        }), o(c, function (e, r) {
          p[r] = t(e.replace(n, f + s + "-" + l + d))
        }), r.$watch(function () {
          var t = parseFloat(r.$eval(s));
          return isNaN(t) ? "" : (t in c || (t = e.pluralCat(t - l)), p[t](r, i, !0))
        }, function (e) {
          i.text(e)
        })
      }
    }
  }], uo = ["$parse", "$animate", function (e, n) {
    function a(e) {
      return e.clone[0]
    }

    function s(e) {
      return e.clone[e.clone.length - 1]
    }

    var u = "$$NG_REMOVED", l = r("ngRepeat");
    return {
      transclude: "element", priority: 1e3, terminal: !0, $$tlb: !0, link: function (r, c, p, f, d) {
        var h, g, m, v, $, y, b, w, x, k = p.ngRepeat, C = k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), E = {$id: Ot};
        if (!C)throw l("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", k);
        if (y = C[1], b = C[2], h = C[3], h ? (g = e(h), m = function (e, t, n) {
            return x && (E[x] = e), E[w] = t, E.$index = n, g(r, E)
          }) : (v = function (e, t) {
            return Ot(t)
          }, $ = function (e) {
            return e
          }), C = y.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !C)throw l("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", y);
        w = C[3] || C[1], x = C[2];
        var T = {};
        r.$watchCollection(b, function (e) {
          var p, f, h, g, y, b, C, E, S, D, A, M, O = c[0], N = {}, P = [];
          if (i(e))D = e, S = m || v; else {
            S = m || $, D = [];
            for (b in e)e.hasOwnProperty(b) && "$" != b.charAt(0) && D.push(b);
            D.sort()
          }
          for (g = D.length, f = P.length = D.length, p = 0; f > p; p++)if (b = e === D ? p : D[p], C = e[b], E = S(b, C, p), it(E, "`track by` id"), T.hasOwnProperty(E))A = T[E], delete T[E], N[E] = A, P[p] = A; else {
            if (N.hasOwnProperty(E))throw o(P, function (e) {
              e && e.scope && (T[e.id] = e)
            }), l("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}", k, E);
            P[p] = {id: E}, N[E] = !1
          }
          for (b in T)T.hasOwnProperty(b) && (A = T[b], M = at(A.clone), n.leave(M), o(M, function (e) {
            e[u] = !0
          }), A.scope.$destroy());
          for (p = 0, f = D.length; f > p; p++) {
            if (b = e === D ? p : D[p], C = e[b], A = P[p], P[p - 1] && (O = s(P[p - 1])), A.scope) {
              y = A.scope, h = O;
              do h = h.nextSibling; while (h && h[u]);
              a(A) != h && n.move(at(A.clone), null, yr(O)), O = s(A)
            } else y = r.$new();
            y[w] = C, x && (y[x] = b), y.$index = p, y.$first = 0 === p, y.$last = p === g - 1, y.$middle = !(y.$first || y.$last), y.$odd = !(y.$even = 0 === (1 & p)), A.scope || d(y, function (e) {
              e[e.length++] = t.createComment(" end ngRepeat: " + k + " "), n.enter(e, null, yr(O)), O = e, A.scope = y, A.clone = e, N[A.id] = A
            })
          }
          T = N
        })
      }
    }
  }], lo = ["$animate", function (e) {
    return function (t, n, r) {
      t.$watch(r.ngShow, function (t) {
        e[W(t) ? "removeClass" : "addClass"](n, "ng-hide")
      })
    }
  }], co = ["$animate", function (e) {
    return function (t, n, r) {
      t.$watch(r.ngHide, function (t) {
        e[W(t) ? "addClass" : "removeClass"](n, "ng-hide")
      })
    }
  }], po = nr(function (e, t, n) {
    e.$watch(n.ngStyle, function (e, n) {
      n && e !== n && o(n, function (e, n) {
        t.css(n, "")
      }), e && t.css(e)
    }, !0)
  }), fo = ["$animate", function (e) {
    return {
      restrict: "EA", require: "ngSwitch", controller: ["$scope", function () {
        this.cases = {}
      }], link: function (t, n, r, i) {
        var a, s, u, l = r.ngSwitch || r.on, c = [];
        t.$watch(l, function (n) {
          var l, p = c.length;
          if (p > 0) {
            if (u) {
              for (l = 0; p > l; l++)u[l].remove();
              u = null
            }
            for (u = [], l = 0; p > l; l++) {
              var f = s[l];
              c[l].$destroy(), u[l] = f, e.leave(f, function () {
                u.splice(l, 1), 0 === u.length && (u = null)
              })
            }
          }
          s = [], c = [], (a = i.cases["!" + n] || i.cases["?"]) && (t.$eval(r.change), o(a, function (n) {
            var r = t.$new();
            c.push(r), n.transclude(r, function (t) {
              var r = n.element;
              s.push(t), e.enter(t, r.parent(), r)
            })
          }))
        })
      }
    }
  }], ho = nr({
    transclude: "element", priority: 800, require: "^ngSwitch", link: function (e, t, n, r, i) {
      r.cases["!" + n.ngSwitchWhen] = r.cases["!" + n.ngSwitchWhen] || [], r.cases["!" + n.ngSwitchWhen].push({
        transclude: i,
        element: t
      })
    }
  }), go = nr({
    transclude: "element", priority: 800, require: "^ngSwitch", link: function (e, t, n, r, i) {
      r.cases["?"] = r.cases["?"] || [], r.cases["?"].push({transclude: i, element: t})
    }
  }), mo = nr({
    link: function (e, t, n, i, o) {
      if (!o)throw r("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", z(t));
      o(function (e) {
        t.empty(), t.append(e)
      })
    }
  }), vo = ["$templateCache", function (e) {
    return {
      restrict: "E", terminal: !0, compile: function (t, n) {
        if ("text/ng-template" == n.type) {
          var r = n.id, i = t[0].text;
          e.put(r, i)
        }
      }
    }
  }], $o = r("ngOptions"), yo = m({terminal: !0}), bo = ["$compile", "$parse", function (e, r) {
    var i = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, s = {$setViewValue: h};
    return {
      restrict: "E",
      require: ["select", "?ngModel"],
      controller: ["$element", "$scope", "$attrs", function (e, t, n) {
        var r, i, o = this, a = {}, u = s;
        o.databound = n.ngModel, o.init = function (e, t, n) {
          u = e, r = t, i = n
        }, o.addOption = function (t) {
          it(t, '"option value"'), a[t] = !0, u.$viewValue == t && (e.val(t), i.parent() && i.remove())
        }, o.removeOption = function (e) {
          this.hasOption(e) && (delete a[e], u.$viewValue == e && this.renderUnknownOption(e))
        }, o.renderUnknownOption = function (t) {
          var n = "? " + Ot(t) + " ?";
          i.val(n), e.prepend(i), e.val(n), i.prop("selected", !0)
        }, o.hasOption = function (e) {
          return a.hasOwnProperty(e)
        }, t.$on("$destroy", function () {
          o.renderUnknownOption = h
        })
      }],
      link: function (s, u, l, c) {
        function p(e, t, n, r) {
          n.$render = function () {
            var e = n.$viewValue;
            r.hasOption(e) ? (E.parent() && E.remove(), t.val(e), "" === e && h.prop("selected", !0)) : v(e) && h ? t.val("") : r.renderUnknownOption(e)
          }, t.on("change", function () {
            e.$apply(function () {
              E.parent() && E.remove(), n.$setViewValue(t.val())
            })
          })
        }

        function f(e, t, n) {
          var r;
          n.$render = function () {
            var e = new Nt(n.$viewValue);
            o(t.find("option"), function (t) {
              t.selected = $(e.get(t.value))
            })
          }, e.$watch(function () {
            H(r, n.$viewValue) || (r = j(n.$viewValue), n.$render())
          }), t.on("change", function () {
            e.$apply(function () {
              var e = [];
              o(t.find("option"), function (t) {
                t.selected && e.push(t.value)
              }), n.$setViewValue(e)
            })
          })
        }

        function d(t, o, s) {
          function u() {
            var e, n, r, i, u, l, m, b, T, S, D, A, M, O, N, P = {"": []}, q = [""], j = s.$modelValue, R = g(t) || [], H = f ? a(R) : R, L = {}, F = !1;
            if (y)if (v && k(j)) {
              F = new Nt([]);
              for (var I = 0; I < j.length; I++)L[p] = j[I], F.put(v(t, L), j[I])
            } else F = new Nt(j);
            for (D = 0; T = H.length, T > D; D++) {
              if (m = D, f) {
                if (m = H[D], "$" === m.charAt(0))continue;
                L[f] = m
              }
              if (L[p] = R[m], e = d(t, L) || "", (n = P[e]) || (n = P[e] = [], q.push(e)), y)A = $(F.remove(v ? v(t, L) : h(t, L))); else {
                if (v) {
                  var V = {};
                  V[p] = j, A = v(t, V) === v(t, L)
                } else A = j === h(t, L);
                F = F || A
              }
              N = c(t, L), N = $(N) ? N : "", n.push({id: v ? v(t, L) : f ? H[D] : D, label: N, selected: A})
            }
            for (y || (w || null === j ? P[""].unshift({id: "", label: "", selected: !F}) : F || P[""].unshift({
              id: "?",
              label: "",
              selected: !0
            })), S = 0, b = q.length; b > S; S++) {
              for (e = q[S], n = P[e], E.length <= S ? (i = {
                element: C.clone().attr("label", e),
                label: n.label
              }, u = [i], E.push(u), o.append(i.element)) : (u = E[S], i = u[0], i.label != e && i.element.attr("label", i.label = e)), M = null, D = 0, T = n.length; T > D; D++)r = n[D], (l = u[D + 1]) ? (M = l.element, l.label !== r.label && M.text(l.label = r.label), l.id !== r.id && M.val(l.id = r.id), l.selected !== r.selected && M.prop("selected", l.selected = r.selected)) : ("" === r.id && w ? O = w : (O = x.clone()).val(r.id).attr("selected", r.selected).text(r.label), u.push(l = {
                element: O,
                label: r.label,
                id: r.id,
                selected: r.selected
              }), M ? M.after(O) : i.element.append(O), M = O);
              for (D++; u.length > D;)u.pop().element.remove()
            }
            for (; E.length > S;)E.pop()[0].element.remove()
          }

          var l;
          if (!(l = b.match(i)))throw $o("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", b, z(o));
          var c = r(l[2] || l[1]), p = l[4] || l[6], f = l[5], d = r(l[3] || ""), h = r(l[2] ? l[1] : p), g = r(l[7]), m = l[8], v = m ? r(l[8]) : null, E = [[{
            element: o,
            label: ""
          }]];
          w && (e(w)(t), w.removeClass("ng-scope"), w.remove()), o.empty(), o.on("change", function () {
            t.$apply(function () {
              var e, r, i, a, u, l, c, d, m, $ = g(t) || [], b = {};
              if (y) {
                for (i = [], l = 0, d = E.length; d > l; l++)for (e = E[l], u = 1, c = e.length; c > u; u++)if ((a = e[u].element)[0].selected) {
                  if (r = a.val(), f && (b[f] = r), v)for (m = 0; m < $.length && (b[p] = $[m], v(t, b) != r); m++); else b[p] = $[r];
                  i.push(h(t, b))
                }
              } else {
                if (r = o.val(), "?" == r)i = n; else if ("" === r)i = null; else if (v) {
                  for (m = 0; m < $.length; m++)if (b[p] = $[m], v(t, b) == r) {
                    i = h(t, b);
                    break
                  }
                } else b[p] = $[r], f && (b[f] = r), i = h(t, b);
                E[0].length > 1 && E[0][1].id !== r && (E[0][1].selected = !1)
              }
              s.$setViewValue(i)
            })
          }), s.$render = u, t.$watch(u)
        }

        if (c[1]) {
          for (var h, g = c[0], m = c[1], y = l.multiple, b = l.ngOptions, w = !1, x = yr(t.createElement("option")), C = yr(t.createElement("optgroup")), E = x.clone(), T = 0, S = u.children(), D = S.length; D > T; T++)if ("" === S[T].value) {
            h = w = S.eq(T);
            break
          }
          g.init(m, w, E), y && (m.$isEmpty = function (e) {
            return !e || 0 === e.length
          }), b ? d(s, u, m) : y ? f(s, u, m) : p(s, u, m, g)
        }
      }
    }
  }], wo = ["$interpolate", function (e) {
    var t = {addOption: h, removeOption: h};
    return {
      restrict: "E", priority: 100, compile: function (n, r) {
        if (v(r.value)) {
          var i = e(n.text(), !0);
          i || r.$set("value", n.text())
        }
        return function (e, n, r) {
          var o = "$selectController", a = n.parent(), s = a.data(o) || a.parent().data(o);
          s && s.databound ? n.prop("selected", !1) : s = t, i ? e.$watch(i, function (e, t) {
            r.$set("value", e), e !== t && s.removeOption(t), s.addOption(e)
          }) : s.addOption(r.value), n.on("$destroy", function () {
            s.removeOption(r.value)
          })
        }
      }
    }
  }], xo = m({restrict: "E", terminal: !0});
  return e.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (tt(), ut(Sr), void yr(t).ready(function () {
    J(t, Z)
  }))
}(window, document), !angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>'), define("angular", ["jquery"], function (e) {
  return function () {
    var t;
    return t || e.angular
  }
}(this)), function (e, t) {
  "use strict";
  function n() {
    function e(e, n) {
      return t.extend(new (t.extend(function () {
      }, {prototype: e})), n)
    }

    function n(e, t) {
      var n = t.caseInsensitiveMatch, r = {originalPath: e, regexp: e}, i = r.keys = [];
      return e = e.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function (e, t, n, r) {
        var o = "?" === r ? r : null, a = "*" === r ? r : null;
        return i.push({
          name: n,
          optional: !!o
        }), t = t || "", "" + (o ? "" : t) + "(?:" + (o ? t : "") + (a && "(.+?)" || "([^/]+)") + (o || "") + ")" + (o || "")
      }).replace(/([\/$\*])/g, "\\$1"), r.regexp = new RegExp("^" + e + "$", n ? "i" : ""), r
    }

    var r = {};
    this.when = function (e, i) {
      if (r[e] = t.extend({reloadOnSearch: !0}, i, e && n(e, i)), e) {
        var o = "/" == e[e.length - 1] ? e.substr(0, e.length - 1) : e + "/";
        r[o] = t.extend({redirectTo: e}, n(o, i))
      }
      return this
    }, this.otherwise = function (e) {
      return this.when(null, e), this
    }, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce", function (n, i, o, a, s, u, l, c) {
      function p(e, t) {
        var n = t.keys, r = {};
        if (!t.regexp)return null;
        var i = t.regexp.exec(e);
        if (!i)return null;
        for (var o = 1, a = i.length; a > o; ++o) {
          var s = n[o - 1], u = "string" == typeof i[o] ? decodeURIComponent(i[o]) : i[o];
          s && u && (r[s.name] = u)
        }
        return r
      }

      function f() {
        var e = d(), r = m.current;
        e && r && e.$$route === r.$$route && t.equals(e.pathParams, r.pathParams) && !e.reloadOnSearch && !g ? (r.params = e.params, t.copy(r.params, o), n.$broadcast("$routeUpdate", r)) : (e || r) && (g = !1, n.$broadcast("$routeChangeStart", e, r), m.current = e, e && e.redirectTo && (t.isString(e.redirectTo) ? i.path(h(e.redirectTo, e.params)).search(e.params).replace() : i.url(e.redirectTo(e.pathParams, i.path(), i.search())).replace()), a.when(e).then(function () {
          if (e) {
            var n, r, i = t.extend({}, e.resolve);
            return t.forEach(i, function (e, n) {
              i[n] = t.isString(e) ? s.get(e) : s.invoke(e)
            }), t.isDefined(n = e.template) ? t.isFunction(n) && (n = n(e.params)) : t.isDefined(r = e.templateUrl) && (t.isFunction(r) && (r = r(e.params)), r = c.getTrustedResourceUrl(r), t.isDefined(r) && (e.loadedTemplateUrl = r, n = u.get(r, {cache: l}).then(function (e) {
              return e.data
            }))), t.isDefined(n) && (i.$template = n), a.all(i)
          }
        }).then(function (i) {
          e == m.current && (e && (e.locals = i, t.copy(e.params, o)), n.$broadcast("$routeChangeSuccess", e, r))
        }, function (t) {
          e == m.current && n.$broadcast("$routeChangeError", e, r, t)
        }))
      }

      function d() {
        var n, o;
        return t.forEach(r, function (r) {
          !o && (n = p(i.path(), r)) && (o = e(r, {params: t.extend({}, i.search(), n), pathParams: n}), o.$$route = r)
        }), o || r[null] && e(r[null], {params: {}, pathParams: {}})
      }

      function h(e, n) {
        var r = [];
        return t.forEach((e || "").split(":"), function (e, t) {
          if (0 === t)r.push(e); else {
            var i = e.match(/(\w+)(.*)/), o = i[1];
            r.push(n[o]), r.push(i[2] || ""), delete n[o]
          }
        }), r.join("")
      }

      var g = !1, m = {
        routes: r, reload: function () {
          g = !0, n.$evalAsync(f)
        }
      };
      return n.$on("$locationChangeSuccess", f), m
    }]
  }

  function r() {
    this.$get = function () {
      return {}
    }
  }

  function i(e, n, r) {
    return {
      restrict: "ECA", terminal: !0, priority: 400, transclude: "element", link: function (i, o, a, s, u) {
        function l() {
          d && (d.remove(), d = null), p && (p.$destroy(), p = null), f && (r.leave(f, function () {
            d = null
          }), d = f, f = null)
        }

        function c() {
          var a = e.current && e.current.locals, s = a && a.$template;
          if (t.isDefined(s)) {
            var c = i.$new(), d = e.current, m = u(c, function (e) {
              r.enter(e, null, f || o, function () {
                !t.isDefined(h) || h && !i.$eval(h) || n()
              }), l()
            });
            f = m, p = d.scope = c, p.$emit("$viewContentLoaded"), p.$eval(g)
          } else l()
        }

        var p, f, d, h = a.autoscroll, g = a.onload || "";
        i.$on("$routeChangeSuccess", c), c()
      }
    }
  }

  function o(e, t, n) {
    return {
      restrict: "ECA", priority: -400, link: function (r, i) {
        var o = n.current, a = o.locals;
        i.html(a.$template);
        var s = e(i.contents());
        if (o.controller) {
          a.$scope = r;
          var u = t(o.controller, a);
          o.controllerAs && (r[o.controllerAs] = u), i.data("$ngControllerController", u), i.children().data("$ngControllerController", u)
        }
        s(r)
      }
    }
  }

  var a = t.module("ngRoute", ["ng"]).provider("$route", n);
  a.provider("$routeParams", r), a.directive("ngView", i), a.directive("ngView", o), i.$inject = ["$route", "$anchorScroll", "$animate"], o.$inject = ["$compile", "$controller", "$route"]
}(window, window.angular), define("angular-route", function () {
}), function (e, t, n) {
  "use strict";
  function r(e) {
    return null != e && "" !== e && "hasOwnProperty" !== e && s.test("." + e)
  }

  function i(e, t) {
    if (!r(t))throw a("badmember", 'Dotted member path "@{0}" is invalid.', t);
    for (var i = t.split("."), o = 0, s = i.length; s > o && e !== n; o++) {
      var u = i[o];
      e = null !== e ? e[u] : n
    }
    return e
  }

  function o(e, n) {
    n = n || {}, t.forEach(n, function (e, t) {
      delete n[t]
    });
    for (var r in e)!e.hasOwnProperty(r) || "$" === r.charAt(0) && "$" === r.charAt(1) || (n[r] = e[r]);
    return n
  }

  var a = t.$$minErr("$resource"), s = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;
  t.module("ngResource", ["ng"]).factory("$resource", ["$http", "$q", function (e, r) {
    function s(e) {
      return u(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function u(e, t) {
      return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
    }

    function l(e, t) {
      this.template = e, this.defaults = t || {}, this.urlParams = {}
    }

    function c(s, u, v) {
      function $(e, t) {
        var n = {};
        return t = h({}, u, t), d(t, function (t, r) {
          m(t) && (t = t()), n[r] = t && t.charAt && "@" == t.charAt(0) ? i(e, t.substr(1)) : t
        }), n
      }

      function y(e) {
        return e.resource
      }

      function b(e) {
        o(e || {}, this)
      }

      var w = new l(s);
      return v = h({}, p, v), d(v, function (i, s) {
        var u = /^(POST|PUT|PATCH)$/i.test(i.method);
        b[s] = function (s, l, c, p) {
          var v, x, k, C = {};
          switch (arguments.length) {
            case 4:
              k = p, x = c;
            case 3:
            case 2:
              if (!m(l)) {
                C = s, v = l, x = c;
                break
              }
              if (m(s)) {
                x = s, k = l;
                break
              }
              x = l, k = c;
            case 1:
              m(s) ? x = s : u ? v = s : C = s;
              break;
            case 0:
              break;
            default:
              throw a("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length)
          }
          var E = this instanceof b, T = E ? v : i.isArray ? [] : new b(v), S = {}, D = i.interceptor && i.interceptor.response || y, A = i.interceptor && i.interceptor.responseError || n;
          d(i, function (e, t) {
            "params" != t && "isArray" != t && "interceptor" != t && (S[t] = g(e))
          }), u && (S.data = v), w.setUrlParams(S, h({}, $(v, i.params || {}), C), i.url);
          var M = e(S).then(function (e) {
            var n = e.data, r = T.$promise;
            if (n) {
              if (t.isArray(n) !== !!i.isArray)throw a("badcfg", "Error in resource configuration. Expected response to contain an {0} but got an {1}", i.isArray ? "array" : "object", t.isArray(n) ? "array" : "object");
              i.isArray ? (T.length = 0, d(n, function (e) {
                T.push(new b(e))
              })) : (o(n, T), T.$promise = r)
            }
            return T.$resolved = !0, e.resource = T, e
          }, function (e) {
            return T.$resolved = !0, (k || f)(e), r.reject(e)
          });
          return M = M.then(function (e) {
            var t = D(e);
            return (x || f)(t, e.headers), t
          }, A), E ? M : (T.$promise = M, T.$resolved = !1, T)
        }, b.prototype["$" + s] = function (e, t, n) {
          m(e) && (n = t, t = e, e = {});
          var r = b[s].call(this, e, this, t, n);
          return r.$promise || r
        }
      }), b.bind = function (e) {
        return c(s, h({}, u, e), v)
      }, b
    }

    var p = {
      get: {method: "GET"},
      save: {method: "POST"},
      query: {method: "GET", isArray: !0},
      remove: {method: "DELETE"},
      "delete": {method: "DELETE"}
    }, f = t.noop, d = t.forEach, h = t.extend, g = t.copy, m = t.isFunction;
    return l.prototype = {
      setUrlParams: function (e, n, r) {
        var i, o, u = this, l = r || u.template, c = u.urlParams = {};
        d(l.split(/\W/), function (e) {
          if ("hasOwnProperty" === e)throw a("badname", "hasOwnProperty is not a valid parameter name.");
          !new RegExp("^\\d+$").test(e) && e && new RegExp("(^|[^\\\\]):" + e + "(\\W|$)").test(l) && (c[e] = !0)
        }), l = l.replace(/\\:/g, ":"), n = n || {}, d(u.urlParams, function (e, r) {
          i = n.hasOwnProperty(r) ? n[r] : u.defaults[r], t.isDefined(i) && null !== i ? (o = s(i), l = l.replace(new RegExp(":" + r + "(\\W|$)", "g"), function (e, t) {
            return o + t
          })) : l = l.replace(new RegExp("(/?):" + r + "(\\W|$)", "g"), function (e, t, n) {
            return "/" == n.charAt(0) ? n : t + n
          })
        }), l = l.replace(/\/+$/, "") || "/", l = l.replace(/\/\.(?=\w+($|\?))/, "."), e.url = l.replace(/\/\\\./, "/."), d(n, function (t, n) {
          u.urlParams[n] || (e.params = e.params || {}, e.params[n] = t)
        })
      }
    }, c
  }])
}(window, window.angular), define("angular-resource", function () {
}), function (e, t) {
  "use strict";
  function n() {
    this.$get = ["$$sanitizeUri", function (e) {
      return function (t) {
        var n = [];
        return o(t, u(n, function (t, n) {
          return !/^unsafe/.test(e(t, n))
        })), n.join("")
      }
    }]
  }

  function r(e) {
    var n = [], r = u(n, t.noop);
    return r.chars(e), n.join("")
  }

  function i(e) {
    var t, n = {}, r = e.split(",");
    for (t = 0; t < r.length; t++)n[r[t]] = !0;
    return n
  }

  function o(e, n) {
    function r(e, r, o, s) {
      if (r = t.lowercase(r), k[r])for (; $.last() && C[$.last()];)i("", $.last());
      x[r] && $.last() == r && i("", r), s = y[r] || !!s, s || $.push(r);
      var u = {};
      o.replace(f, function (e, t, n, r, i) {
        var o = n || r || i || "";
        u[t] = a(o)
      }), n.start && n.start(r, u, s)
    }

    function i(e, r) {
      var i, o = 0;
      if (r = t.lowercase(r))for (o = $.length - 1; o >= 0 && $[o] != r; o--);
      if (o >= 0) {
        for (i = $.length - 1; i >= o; i--)n.end && n.end($[i]);
        $.length = o
      }
    }

    var o, s, u, $ = [], b = e;
    for ($.last = function () {
      return $[$.length - 1]
    }; e;) {
      if (s = !0, $.last() && E[$.last()])e = e.replace(new RegExp("(.*)<\\s*\\/\\s*" + $.last() + "[^>]*>", "i"), function (e, t) {
        return t = t.replace(g, "$1").replace(v, "$1"), n.chars && n.chars(a(t)), ""
      }), i("", $.last()); else if (0 === e.indexOf("<!--") ? (o = e.indexOf("--", 4), o >= 0 && e.lastIndexOf("-->", o) === o && (n.comment && n.comment(e.substring(4, o)), e = e.substring(o + 3), s = !1)) : m.test(e) ? (u = e.match(m), u && (e = e.replace(u[0], ""), s = !1)) : h.test(e) ? (u = e.match(p), u && (e = e.substring(u[0].length), u[0].replace(p, i), s = !1)) : d.test(e) && (u = e.match(c), u && (e = e.substring(u[0].length), u[0].replace(c, r), s = !1)), s) {
        o = e.indexOf("<");
        var w = 0 > o ? e : e.substring(0, o);
        e = 0 > o ? "" : e.substring(o), n.chars && n.chars(a(w))
      }
      if (e == b)throw l("badparse", "The sanitizer was unable to parse the following block of html: {0}", e);
      b = e
    }
    i()
  }

  function a(e) {
    if (!e)return "";
    var t = M.exec(e), n = t[1], r = t[3], i = t[2];
    return i && (A.innerHTML = i.replace(/</g, "&lt;"), i = "textContent"in A ? A.textContent : A.innerText), n + i + r
  }

  function s(e) {
    return e.replace(/&/g, "&amp;").replace($, function (e) {
      return "&#" + e.charCodeAt(0) + ";"
    }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  function u(e, n) {
    var r = !1, i = t.bind(e, e.push);
    return {
      start: function (e, o, a) {
        e = t.lowercase(e), !r && E[e] && (r = e), r || T[e] !== !0 || (i("<"), i(e), t.forEach(o, function (r, o) {
          var a = t.lowercase(o), u = "img" === e && "src" === a || "background" === a;
          D[a] !== !0 || S[a] === !0 && !n(r, u) || (i(" "), i(o), i('="'), i(s(r)), i('"'))
        }), i(a ? "/>" : ">"))
      }, end: function (e) {
        e = t.lowercase(e), r || T[e] !== !0 || (i("</"), i(e), i(">")), e == r && (r = !1)
      }, chars: function (e) {
        r || i(s(e))
      }
    }
  }

  var l = t.$$minErr("$sanitize"), c = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, p = /^<\s*\/\s*([\w:-]+)[^>]*>/, f = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, d = /^</, h = /^<\s*\//, g = /<!--(.*?)-->/g, m = /<!DOCTYPE([^>]*?)>/i, v = /<!\[CDATA\[(.*?)]]>/g, $ = /([^\#-~| |!])/g, y = i("area,br,col,hr,img,wbr"), b = i("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), w = i("rp,rt"), x = t.extend({}, w, b), k = t.extend({}, b, i("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), C = t.extend({}, w, i("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")), E = i("script,style"), T = t.extend({}, y, k, C, x), S = i("background,cite,href,longdesc,src,usemap"), D = t.extend({}, S, i("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")), A = document.createElement("pre"), M = /^(\s*)([\s\S]*?)(\s*)$/;
  t.module("ngSanitize", []).provider("$sanitize", n), t.module("ngSanitize").filter("linky", ["$sanitize", function (e) {
    var n = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/, i = /^mailto:/;
    return function (o, a) {
      function s(e) {
        e && d.push(r(e))
      }

      function u(e, n) {
        d.push("<a "), t.isDefined(a) && (d.push('target="'), d.push(a), d.push('" ')), d.push('href="'), d.push(e), d.push('">'), s(n), d.push("</a>")
      }

      if (!o)return o;
      for (var l, c, p, f = o, d = []; l = f.match(n);)c = l[0], l[2] == l[3] && (c = "mailto:" + c), p = l.index, s(f.substr(0, p)), u(c, l[0].replace(i, "")), f = f.substring(p + l[0].length);
      return s(f), e(d.join(""))
    }
  }])
}(window, window.angular), define("angular-sanitize", function () {
}), angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/day.html", "template/datepicker/month.html", "template/datepicker/popup.html", "template/datepicker/year.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"]), angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope", function (e, t, n) {
  function r(e) {
    for (var t in e)if (void 0 !== o.style[t])return e[t]
  }

  var i = function (r, o, a) {
    a = a || {};
    var s = e.defer(), u = i[a.animation ? "animationEndEventName" : "transitionEndEventName"], l = function () {
      n.$apply(function () {
        r.unbind(u, l), s.resolve(r)
      })
    };
    return u && r.bind(u, l), t(function () {
      angular.isString(o) ? r.addClass(o) : angular.isFunction(o) ? o(r) : angular.isObject(o) && r.css(o), u || s.resolve(r)
    }), s.promise.cancel = function () {
      u && r.unbind(u, l), s.reject("Transition cancelled")
    }, s.promise
  }, o = document.createElement("trans"), a = {
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd",
    transition: "transitionend"
  }, s = {
    WebkitTransition: "webkitAnimationEnd",
    MozTransition: "animationend",
    OTransition: "oAnimationEnd",
    transition: "animationend"
  };
  return i.transitionEndEventName = r(a), i.animationEndEventName = r(s), i
}]), angular.module("ui.bootstrap.collapse", ["ui.bootstrap.transition"]).directive("collapse", ["$transition", function (e) {
  return {
    link: function (t, n, r) {
      function i(t) {
        function r() {
          l === i && (l = void 0)
        }

        var i = e(n, t);
        return l && l.cancel(), l = i, i.then(r, r), i
      }

      function o() {
        c ? (c = !1, a()) : (n.removeClass("collapse").addClass("collapsing"), i({height: n[0].scrollHeight + "px"}).then(a))
      }

      function a() {
        n.removeClass("collapsing"), n.addClass("collapse in"), n.css({height: "auto"})
      }

      function s() {
        if (c)c = !1, u(), n.css({height: 0}); else {
          n.css({height: n[0].scrollHeight + "px"});
          {
            n[0].offsetWidth
          }
          n.removeClass("collapse in").addClass("collapsing"), i({height: 0}).then(u)
        }
      }

      function u() {
        n.removeClass("collapsing"), n.addClass("collapse")
      }

      var l, c = !0;
      t.$watch(r.collapse, function (e) {
        e ? s() : o()
      })
    }
  }
}]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", {closeOthers: !0}).controller("AccordionController", ["$scope", "$attrs", "accordionConfig", function (e, t, n) {
  this.groups = [], this.closeOthers = function (r) {
    var i = angular.isDefined(t.closeOthers) ? e.$eval(t.closeOthers) : n.closeOthers;
    i && angular.forEach(this.groups, function (e) {
      e !== r && (e.isOpen = !1)
    })
  }, this.addGroup = function (e) {
    var t = this;
    this.groups.push(e), e.$on("$destroy", function () {
      t.removeGroup(e)
    })
  }, this.removeGroup = function (e) {
    var t = this.groups.indexOf(e);
    -1 !== t && this.groups.splice(t, 1)
  }
}]).directive("accordion", function () {
  return {
    restrict: "EA",
    controller: "AccordionController",
    transclude: !0,
    replace: !1,
    templateUrl: "template/accordion/accordion.html"
  }
}).directive("accordionGroup", function () {
  return {
    require: "^accordion",
    restrict: "EA",
    transclude: !0,
    replace: !0,
    templateUrl: "template/accordion/accordion-group.html",
    scope: {heading: "@", isOpen: "=?", isDisabled: "=?"},
    controller: function () {
      this.setHeading = function (e) {
        this.heading = e
      }
    },
    link: function (e, t, n, r) {
      r.addGroup(e), e.$watch("isOpen", function (t) {
        t && r.closeOthers(e)
      }), e.toggleOpen = function () {
        e.isDisabled || (e.isOpen = !e.isOpen)
      }
    }
  }
}).directive("accordionHeading", function () {
  return {
    restrict: "EA",
    transclude: !0,
    template: "",
    replace: !0,
    require: "^accordionGroup",
    link: function (e, t, n, r, i) {
      r.setHeading(i(e, function () {
      }))
    }
  }
}).directive("accordionTransclude", function () {
  return {
    require: "^accordionGroup", link: function (e, t, n, r) {
      e.$watch(function () {
        return r[n.accordionTransclude]
      }, function (e) {
        e && (t.html(""), t.append(e))
      })
    }
  }
}), angular.module("ui.bootstrap.alert", []).controller("AlertController", ["$scope", "$attrs", function (e, t) {
  e.closeable = "close"in t
}]).directive("alert", function () {
  return {
    restrict: "EA",
    controller: "AlertController",
    templateUrl: "template/alert/alert.html",
    transclude: !0,
    replace: !0,
    scope: {type: "@", close: "&"}
  }
}), angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function () {
  return function (e, t, n) {
    t.addClass("ng-binding").data("$binding", n.bindHtmlUnsafe), e.$watch(n.bindHtmlUnsafe, function (e) {
      t.html(e || "")
    })
  }
}), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
  activeClass: "active",
  toggleEvent: "click"
}).controller("ButtonsController", ["buttonConfig", function (e) {
  this.activeClass = e.activeClass || "active", this.toggleEvent = e.toggleEvent || "click"
}]).directive("btnRadio", function () {
  return {
    require: ["btnRadio", "ngModel"], controller: "ButtonsController", link: function (e, t, n, r) {
      var i = r[0], o = r[1];
      o.$render = function () {
        t.toggleClass(i.activeClass, angular.equals(o.$modelValue, e.$eval(n.btnRadio)))
      }, t.bind(i.toggleEvent, function () {
        var r = t.hasClass(i.activeClass);
        (!r || angular.isDefined(n.uncheckable)) && e.$apply(function () {
          o.$setViewValue(r ? null : e.$eval(n.btnRadio)), o.$render()
        })
      })
    }
  }
}).directive("btnCheckbox", function () {
  return {
    require: ["btnCheckbox", "ngModel"], controller: "ButtonsController", link: function (e, t, n, r) {
      function i() {
        return a(n.btnCheckboxTrue, !0)
      }

      function o() {
        return a(n.btnCheckboxFalse, !1)
      }

      function a(t, n) {
        var r = e.$eval(t);
        return angular.isDefined(r) ? r : n
      }

      var s = r[0], u = r[1];
      u.$render = function () {
        t.toggleClass(s.activeClass, angular.equals(u.$modelValue, i()))
      }, t.bind(s.toggleEvent, function () {
        e.$apply(function () {
          u.$setViewValue(t.hasClass(s.activeClass) ? o() : i()), u.$render()
        })
      })
    }
  }
}), angular.module("ui.bootstrap.carousel", ["ui.bootstrap.transition"]).controller("CarouselController", ["$scope", "$timeout", "$transition", function (e, t, n) {
  function r() {
    i();
    var n = +e.interval;
    !isNaN(n) && n >= 0 && (a = t(o, n))
  }

  function i() {
    a && (t.cancel(a), a = null)
  }

  function o() {
    s ? (e.next(), r()) : e.pause()
  }

  var a, s, u = this, l = u.slides = e.slides = [], c = -1;
  u.currentSlide = null;
  var p = !1;
  u.select = e.select = function (i, o) {
    function a() {
      if (!p) {
        if (u.currentSlide && angular.isString(o) && !e.noTransition && i.$element) {
          i.$element.addClass(o);
          {
            i.$element[0].offsetWidth
          }
          angular.forEach(l, function (e) {
            angular.extend(e, {direction: "", entering: !1, leaving: !1, active: !1})
          }), angular.extend(i, {
            direction: o,
            active: !0,
            entering: !0
          }), angular.extend(u.currentSlide || {}, {
            direction: o,
            leaving: !0
          }), e.$currentTransition = n(i.$element, {}), function (t, n) {
            e.$currentTransition.then(function () {
              s(t, n)
            }, function () {
              s(t, n)
            })
          }(i, u.currentSlide)
        } else s(i, u.currentSlide);
        u.currentSlide = i, c = f, r()
      }
    }

    function s(t, n) {
      angular.extend(t, {direction: "", active: !0, leaving: !1, entering: !1}), angular.extend(n || {}, {
        direction: "",
        active: !1,
        leaving: !1,
        entering: !1
      }), e.$currentTransition = null
    }

    var f = l.indexOf(i);
    void 0 === o && (o = f > c ? "next" : "prev"), i && i !== u.currentSlide && (e.$currentTransition ? (e.$currentTransition.cancel(), t(a)) : a())
  }, e.$on("$destroy", function () {
    p = !0
  }), u.indexOfSlide = function (e) {
    return l.indexOf(e)
  }, e.next = function () {
    var t = (c + 1) % l.length;
    return e.$currentTransition ? void 0 : u.select(l[t], "next")
  }, e.prev = function () {
    var t = 0 > c - 1 ? l.length - 1 : c - 1;
    return e.$currentTransition ? void 0 : u.select(l[t], "prev")
  }, e.isActive = function (e) {
    return u.currentSlide === e
  }, e.$watch("interval", r), e.$on("$destroy", i), e.play = function () {
    s || (s = !0, r())
  }, e.pause = function () {
    e.noPause || (s = !1, i())
  }, u.addSlide = function (t, n) {
    t.$element = n, l.push(t), 1 === l.length || t.active ? (u.select(l[l.length - 1]), 1 == l.length && e.play()) : t.active = !1
  }, u.removeSlide = function (e) {
    var t = l.indexOf(e);
    l.splice(t, 1), l.length > 0 && e.active ? u.select(t >= l.length ? l[t - 1] : l[t]) : c > t && c--
  }
}]).directive("carousel", [function () {
  return {
    restrict: "EA",
    transclude: !0,
    replace: !0,
    controller: "CarouselController",
    require: "carousel",
    templateUrl: "template/carousel/carousel.html",
    scope: {interval: "=", noTransition: "=", noPause: "="}
  }
}]).directive("slide", function () {
  return {
    require: "^carousel",
    restrict: "EA",
    transclude: !0,
    replace: !0,
    templateUrl: "template/carousel/slide.html",
    scope: {active: "=?"},
    link: function (e, t, n, r) {
      r.addSlide(e, t), e.$on("$destroy", function () {
        r.removeSlide(e)
      }), e.$watch("active", function (t) {
        t && r.select(e)
      })
    }
  }
}), angular.module("ui.bootstrap.dateparser", []).service("dateParser", ["$locale", "orderByFilter", function (e, t) {
  function n(e) {
    var n = [], r = e.split("");
    return angular.forEach(i, function (t, i) {
      var o = e.indexOf(i);
      if (o > -1) {
        e = e.split(""), r[o] = "(" + t.regex + ")", e[o] = "$";
        for (var a = o + 1, s = o + i.length; s > a; a++)r[a] = "", e[a] = "$";
        e = e.join(""), n.push({index: o, apply: t.apply})
      }
    }), {regex: new RegExp("^" + r.join("") + "$"), map: t(n, "index")}
  }

  function r(e, t, n) {
    return 1 === t && n > 28 ? 29 === n && (e % 4 === 0 && e % 100 !== 0 || e % 400 === 0) : 3 === t || 5 === t || 8 === t || 10 === t ? 31 > n : !0
  }

  this.parsers = {};
  var i = {
    yyyy: {
      regex: "\\d{4}", apply: function (e) {
        this.year = +e
      }
    }, yy: {
      regex: "\\d{2}", apply: function (e) {
        this.year = +e + 2e3
      }
    }, y: {
      regex: "\\d{1,4}", apply: function (e) {
        this.year = +e
      }
    }, MMMM: {
      regex: e.DATETIME_FORMATS.MONTH.join("|"), apply: function (t) {
        this.month = e.DATETIME_FORMATS.MONTH.indexOf(t)
      }
    }, MMM: {
      regex: e.DATETIME_FORMATS.SHORTMONTH.join("|"), apply: function (t) {
        this.month = e.DATETIME_FORMATS.SHORTMONTH.indexOf(t)
      }
    }, MM: {
      regex: "0[1-9]|1[0-2]", apply: function (e) {
        this.month = e - 1
      }
    }, M: {
      regex: "[1-9]|1[0-2]", apply: function (e) {
        this.month = e - 1
      }
    }, dd: {
      regex: "[0-2][0-9]{1}|3[0-1]{1}", apply: function (e) {
        this.date = +e
      }
    }, d: {
      regex: "[1-2]?[0-9]{1}|3[0-1]{1}", apply: function (e) {
        this.date = +e
      }
    }, EEEE: {regex: e.DATETIME_FORMATS.DAY.join("|")}, EEE: {regex: e.DATETIME_FORMATS.SHORTDAY.join("|")}
  };
  this.parse = function (t, i) {
    if (!angular.isString(t) || !i)return t;
    i = e.DATETIME_FORMATS[i] || i, this.parsers[i] || (this.parsers[i] = n(i));
    var o = this.parsers[i], a = o.regex, s = o.map, u = t.match(a);
    if (u && u.length) {
      for (var l, c = {year: 1900, month: 0, date: 1, hours: 0}, p = 1, f = u.length; f > p; p++) {
        var d = s[p - 1];
        d.apply && d.apply.call(c, u[p])
      }
      return r(c.year, c.month, c.date) && (l = new Date(c.year, c.month, c.date, c.hours)), l
    }
  }
}]), angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window", function (e, t) {
  function n(e, n) {
    return e.currentStyle ? e.currentStyle[n] : t.getComputedStyle ? t.getComputedStyle(e)[n] : e.style[n]
  }

  function r(e) {
    return "static" === (n(e, "position") || "static")
  }

  var i = function (t) {
    for (var n = e[0], i = t.offsetParent || n; i && i !== n && r(i);)i = i.offsetParent;
    return i || n
  };
  return {
    position: function (t) {
      var n = this.offset(t), r = {top: 0, left: 0}, o = i(t[0]);
      o != e[0] && (r = this.offset(angular.element(o)), r.top += o.clientTop - o.scrollTop, r.left += o.clientLeft - o.scrollLeft);
      var a = t[0].getBoundingClientRect();
      return {
        width: a.width || t.prop("offsetWidth"),
        height: a.height || t.prop("offsetHeight"),
        top: n.top - r.top,
        left: n.left - r.left
      }
    }, offset: function (n) {
      var r = n[0].getBoundingClientRect();
      return {
        width: r.width || n.prop("offsetWidth"),
        height: r.height || n.prop("offsetHeight"),
        top: r.top + (t.pageYOffset || e[0].documentElement.scrollTop),
        left: r.left + (t.pageXOffset || e[0].documentElement.scrollLeft)
      }
    }, positionElements: function (e, t, n, r) {
      var i, o, a, s, u = n.split("-"), l = u[0], c = u[1] || "center";
      i = r ? this.offset(e) : this.position(e), o = t.prop("offsetWidth"), a = t.prop("offsetHeight");
      var p = {
        center: function () {
          return i.left + i.width / 2 - o / 2
        }, left: function () {
          return i.left
        }, right: function () {
          return i.left + i.width
        }
      }, f = {
        center: function () {
          return i.top + i.height / 2 - a / 2
        }, top: function () {
          return i.top
        }, bottom: function () {
          return i.top + i.height
        }
      };
      switch (l) {
        case"right":
          s = {top: f[c](), left: p[l]()};
          break;
        case"left":
          s = {top: f[c](), left: i.left - o};
          break;
        case"bottom":
          s = {top: f[l](), left: p[c]()};
          break;
        default:
          s = {top: i.top - a, left: p[c]()}
      }
      return s
    }
  }
}]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.dateparser", "ui.bootstrap.position"]).constant("datepickerConfig", {
  formatDay: "dd",
  formatMonth: "MMMM",
  formatYear: "yyyy",
  formatDayHeader: "EEE",
  formatDayTitle: "MMMM yyyy",
  formatMonthTitle: "yyyy",
  datepickerMode: "day",
  minMode: "day",
  maxMode: "year",
  showWeeks: !0,
  startingDay: 0,
  yearRange: 20,
  minDate: null,
  maxDate: null
}).controller("DatepickerController", ["$scope", "$attrs", "$parse", "$interpolate", "$timeout", "$log", "dateFilter", "datepickerConfig", function (e, t, n, r, i, o, a, s) {
  var u = this, l = {$setViewValue: angular.noop};
  this.modes = ["day", "month", "year"], angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "minMode", "maxMode", "showWeeks", "startingDay", "yearRange"], function (n, i) {
    u[n] = angular.isDefined(t[n]) ? 8 > i ? r(t[n])(e.$parent) : e.$parent.$eval(t[n]) : s[n]
  }), angular.forEach(["minDate", "maxDate"], function (r) {
    t[r] ? e.$parent.$watch(n(t[r]), function (e) {
      u[r] = e ? new Date(e) : null, u.refreshView()
    }) : u[r] = s[r] ? new Date(s[r]) : null
  }), e.datepickerMode = e.datepickerMode || s.datepickerMode, e.uniqueId = "datepicker-" + e.$id + "-" + Math.floor(1e4 * Math.random()), this.activeDate = angular.isDefined(t.initDate) ? e.$parent.$eval(t.initDate) : new Date, e.isActive = function (t) {
    return 0 === u.compare(t.date, u.activeDate) ? (e.activeDateId = t.uid, !0) : !1
  }, this.init = function (e) {
    l = e, l.$render = function () {
      u.render()
    }
  }, this.render = function () {
    if (l.$modelValue) {
      var e = new Date(l.$modelValue), t = !isNaN(e);
      t ? this.activeDate = e : o.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'), l.$setValidity("date", t)
    }
    this.refreshView()
  }, this.refreshView = function () {
    if (this.element) {
      this._refreshView();
      var e = l.$modelValue ? new Date(l.$modelValue) : null;
      l.$setValidity("date-disabled", !e || this.element && !this.isDisabled(e))
    }
  }, this.createDateObject = function (e, t) {
    var n = l.$modelValue ? new Date(l.$modelValue) : null;
    return {
      date: e,
      label: a(e, t),
      selected: n && 0 === this.compare(e, n),
      disabled: this.isDisabled(e),
      current: 0 === this.compare(e, new Date)
    }
  }, this.isDisabled = function (n) {
    return this.minDate && this.compare(n, this.minDate) < 0 || this.maxDate && this.compare(n, this.maxDate) > 0 || t.dateDisabled && e.dateDisabled({
        date: n,
        mode: e.datepickerMode
      })
  }, this.split = function (e, t) {
    for (var n = []; e.length > 0;)n.push(e.splice(0, t));
    return n
  }, e.select = function (t) {
    if (e.datepickerMode === u.minMode) {
      var n = l.$modelValue ? new Date(l.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
      n.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), l.$setViewValue(n), l.$render()
    } else u.activeDate = t, e.datepickerMode = u.modes[u.modes.indexOf(e.datepickerMode) - 1]
  }, e.move = function (e) {
    var t = u.activeDate.getFullYear() + e * (u.step.years || 0), n = u.activeDate.getMonth() + e * (u.step.months || 0);
    u.activeDate.setFullYear(t, n, 1), u.refreshView()
  }, e.toggleMode = function (t) {
    t = t || 1, e.datepickerMode === u.maxMode && 1 === t || e.datepickerMode === u.minMode && -1 === t || (e.datepickerMode = u.modes[u.modes.indexOf(e.datepickerMode) + t])
  }, e.keys = {
    13: "enter",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  var c = function () {
    i(function () {
      u.element[0].focus()
    }, 0, !1)
  };
  e.$on("datepicker.focus", c), e.keydown = function (t) {
    var n = e.keys[t.which];
    if (n && !t.shiftKey && !t.altKey)if (t.preventDefault(), t.stopPropagation(), "enter" === n || "space" === n) {
      if (u.isDisabled(u.activeDate))return;
      e.select(u.activeDate), c()
    } else!t.ctrlKey || "up" !== n && "down" !== n ? (u.handleKeyDown(n, t), u.refreshView()) : (e.toggleMode("up" === n ? 1 : -1), c())
  }
}]).directive("datepicker", function () {
  return {
    restrict: "EA",
    replace: !0,
    templateUrl: "template/datepicker/datepicker.html",
    scope: {datepickerMode: "=?", dateDisabled: "&"},
    require: ["datepicker", "?^ngModel"],
    controller: "DatepickerController",
    link: function (e, t, n, r) {
      var i = r[0], o = r[1];
      o && i.init(o)
    }
  }
}).directive("daypicker", ["dateFilter", function (e) {
  return {
    restrict: "EA",
    replace: !0,
    templateUrl: "template/datepicker/day.html",
    require: "^datepicker",
    link: function (t, n, r, i) {
      function o(e, t) {
        return 1 !== t || e % 4 !== 0 || e % 100 === 0 && e % 400 !== 0 ? u[t] : 29
      }

      function a(e, t) {
        var n = new Array(t), r = new Date(e), i = 0;
        for (r.setHours(12); t > i;)n[i++] = new Date(r), r.setDate(r.getDate() + 1);
        return n
      }

      function s(e) {
        var t = new Date(e);
        t.setDate(t.getDate() + 4 - (t.getDay() || 7));
        var n = t.getTime();
        return t.setMonth(0), t.setDate(1), Math.floor(Math.round((n - t) / 864e5) / 7) + 1
      }

      t.showWeeks = i.showWeeks, i.step = {months: 1}, i.element = n;
      var u = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      i._refreshView = function () {
        var n = i.activeDate.getFullYear(), r = i.activeDate.getMonth(), o = new Date(n, r, 1), u = i.startingDay - o.getDay(), l = u > 0 ? 7 - u : -u, c = new Date(o);
        l > 0 && c.setDate(-l + 1);
        for (var p = a(c, 42), f = 0; 42 > f; f++)p[f] = angular.extend(i.createDateObject(p[f], i.formatDay), {
          secondary: p[f].getMonth() !== r,
          uid: t.uniqueId + "-" + f
        });
        t.labels = new Array(7);
        for (var d = 0; 7 > d; d++)t.labels[d] = {abbr: e(p[d].date, i.formatDayHeader), full: e(p[d].date, "EEEE")};
        if (t.title = e(i.activeDate, i.formatDayTitle), t.rows = i.split(p, 7), t.showWeeks) {
          t.weekNumbers = [];
          for (var h = s(t.rows[0][0].date), g = t.rows.length; t.weekNumbers.push(h++) < g;);
        }
      }, i.compare = function (e, t) {
        return new Date(e.getFullYear(), e.getMonth(), e.getDate()) - new Date(t.getFullYear(), t.getMonth(), t.getDate())
      }, i.handleKeyDown = function (e) {
        var t = i.activeDate.getDate();
        if ("left" === e)t -= 1; else if ("up" === e)t -= 7; else if ("right" === e)t += 1; else if ("down" === e)t += 7; else if ("pageup" === e || "pagedown" === e) {
          var n = i.activeDate.getMonth() + ("pageup" === e ? -1 : 1);
          i.activeDate.setMonth(n, 1), t = Math.min(o(i.activeDate.getFullYear(), i.activeDate.getMonth()), t)
        } else"home" === e ? t = 1 : "end" === e && (t = o(i.activeDate.getFullYear(), i.activeDate.getMonth()));
        i.activeDate.setDate(t)
      }, i.refreshView()
    }
  }
}]).directive("monthpicker", ["dateFilter", function (e) {
  return {
    restrict: "EA",
    replace: !0,
    templateUrl: "template/datepicker/month.html",
    require: "^datepicker",
    link: function (t, n, r, i) {
      i.step = {years: 1}, i.element = n, i._refreshView = function () {
        for (var n = new Array(12), r = i.activeDate.getFullYear(), o = 0; 12 > o; o++)n[o] = angular.extend(i.createDateObject(new Date(r, o, 1), i.formatMonth), {uid: t.uniqueId + "-" + o});
        t.title = e(i.activeDate, i.formatMonthTitle), t.rows = i.split(n, 3)
      }, i.compare = function (e, t) {
        return new Date(e.getFullYear(), e.getMonth()) - new Date(t.getFullYear(), t.getMonth())
      }, i.handleKeyDown = function (e) {
        var t = i.activeDate.getMonth();
        if ("left" === e)t -= 1; else if ("up" === e)t -= 3; else if ("right" === e)t += 1; else if ("down" === e)t += 3; else if ("pageup" === e || "pagedown" === e) {
          var n = i.activeDate.getFullYear() + ("pageup" === e ? -1 : 1);
          i.activeDate.setFullYear(n)
        } else"home" === e ? t = 0 : "end" === e && (t = 11);
        i.activeDate.setMonth(t)
      }, i.refreshView()
    }
  }
}]).directive("yearpicker", ["dateFilter", function () {
  return {
    restrict: "EA",
    replace: !0,
    templateUrl: "template/datepicker/year.html",
    require: "^datepicker",
    link: function (e, t, n, r) {
      function i(e) {
        return parseInt((e - 1) / o, 10) * o + 1
      }

      var o = r.yearRange;
      r.step = {years: o}, r.element = t, r._refreshView = function () {
        for (var t = new Array(o), n = 0, a = i(r.activeDate.getFullYear()); o > n; n++)t[n] = angular.extend(r.createDateObject(new Date(a + n, 0, 1), r.formatYear), {uid: e.uniqueId + "-" + n});
        e.title = [t[0].label, t[o - 1].label].join(" - "), e.rows = r.split(t, 5)
      }, r.compare = function (e, t) {
        return e.getFullYear() - t.getFullYear()
      }, r.handleKeyDown = function (e) {
        var t = r.activeDate.getFullYear();
        "left" === e ? t -= 1 : "up" === e ? t -= 5 : "right" === e ? t += 1 : "down" === e ? t += 5 : "pageup" === e || "pagedown" === e ? t += ("pageup" === e ? -1 : 1) * r.step.years : "home" === e ? t = i(r.activeDate.getFullYear()) : "end" === e && (t = i(r.activeDate.getFullYear()) + o - 1), r.activeDate.setFullYear(t)
      }, r.refreshView()
    }
  }
}]).constant("datepickerPopupConfig", {
  datepickerPopup: "yyyy-MM-dd",
  currentText: "Today",
  clearText: "Clear",
  closeText: "Done",
  closeOnDateSelection: !0,
  appendToBody: !1,
  showButtonBar: !0
}).directive("datepickerPopup", ["$compile", "$parse", "$document", "$position", "dateFilter", "dateParser", "datepickerPopupConfig", function (e, t, n, r, i, o, a) {
  return {
    restrict: "EA",
    require: "ngModel",
    scope: {isOpen: "=?", currentText: "@", clearText: "@", closeText: "@", dateDisabled: "&"},
    link: function (s, u, l, c) {
      function p(e) {
        return e.replace(/([A-Z])/g, function (e) {
          return "-" + e.toLowerCase()
        })
      }

      function f(e) {
        if (e) {
          if (angular.isDate(e) && !isNaN(e))return c.$setValidity("date", !0), e;
          if (angular.isString(e)) {
            var t = o.parse(e, d) || new Date(e);
            return isNaN(t) ? void c.$setValidity("date", !1) : (c.$setValidity("date", !0), t)
          }
          return void c.$setValidity("date", !1)
        }
        return c.$setValidity("date", !0), null
      }

      var d, h = angular.isDefined(l.closeOnDateSelection) ? s.$parent.$eval(l.closeOnDateSelection) : a.closeOnDateSelection, g = angular.isDefined(l.datepickerAppendToBody) ? s.$parent.$eval(l.datepickerAppendToBody) : a.appendToBody;
      s.showButtonBar = angular.isDefined(l.showButtonBar) ? s.$parent.$eval(l.showButtonBar) : a.showButtonBar, s.getText = function (e) {
        return s[e + "Text"] || a[e + "Text"]
      }, l.$observe("datepickerPopup", function (e) {
        d = e || a.datepickerPopup, c.$render()
      });
      var m = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
      m.attr({"ng-model": "date", "ng-change": "dateSelection()"});
      var v = angular.element(m.children()[0]);
      l.datepickerOptions && angular.forEach(s.$parent.$eval(l.datepickerOptions), function (e, t) {
        v.attr(p(t), e)
      }), s.watchData = {}, angular.forEach(["minDate", "maxDate", "datepickerMode"], function (e) {
        if (l[e]) {
          var n = t(l[e]);
          if (s.$parent.$watch(n, function (t) {
              s.watchData[e] = t
            }), v.attr(p(e), "watchData." + e), "datepickerMode" === e) {
            var r = n.assign;
            s.$watch("watchData." + e, function (e, t) {
              e !== t && r(s.$parent, e)
            })
          }
        }
      }), l.dateDisabled && v.attr("date-disabled", "dateDisabled({ date: date, mode: mode })"), c.$parsers.unshift(f), s.dateSelection = function (e) {
        angular.isDefined(e) && (s.date = e), c.$setViewValue(s.date), c.$render(), h && (s.isOpen = !1, u[0].focus())
      }, u.bind("input change keyup", function () {
        s.$apply(function () {
          s.date = c.$modelValue
        })
      }), c.$render = function () {
        var e = c.$viewValue ? i(c.$viewValue, d) : "";
        u.val(e), s.date = f(c.$modelValue)
      };
      var $ = function (e) {
        s.isOpen && e.target !== u[0] && s.$apply(function () {
          s.isOpen = !1
        })
      }, y = function (e) {
        s.keydown(e)
      };
      u.bind("keydown", y), s.keydown = function (e) {
        27 === e.which ? (e.preventDefault(), e.stopPropagation(), s.close()) : 40 !== e.which || s.isOpen || (s.isOpen = !0)
      }, s.$watch("isOpen", function (e) {
        e ? (s.$broadcast("datepicker.focus"), s.position = g ? r.offset(u) : r.position(u), s.position.top = s.position.top + u.prop("offsetHeight"), n.bind("click", $)) : n.unbind("click", $)
      }), s.select = function (e) {
        if ("today" === e) {
          var t = new Date;
          angular.isDate(c.$modelValue) ? (e = new Date(c.$modelValue), e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate())) : e = new Date(t.setHours(0, 0, 0, 0))
        }
        s.dateSelection(e)
      }, s.close = function () {
        s.isOpen = !1, u[0].focus()
      };
      var b = e(m)(s);
      m.remove(), g ? n.find("body").append(b) : u.after(b), s.$on("$destroy", function () {
        b.remove(), u.unbind("keydown", y), n.unbind("click", $)
      })
    }
  }
}]).directive("datepickerPopupWrap", function () {
  return {
    restrict: "EA",
    replace: !0,
    transclude: !0,
    templateUrl: "template/datepicker/popup.html",
    link: function (e, t) {
      t.bind("click", function (e) {
        e.preventDefault(), e.stopPropagation()
      })
    }
  }
}), angular.module("ui.bootstrap.dropdown", []).constant("dropdownConfig", {openClass: "open"}).service("dropdownService", ["$document", function (e) {
  var t = null;
  this.open = function (i) {
    t || (e.bind("click", n), e.bind("keydown", r)), t && t !== i && (t.isOpen = !1), t = i
  }, this.close = function (i) {
    t === i && (t = null, e.unbind("click", n), e.unbind("keydown", r))
  };
  var n = function (e) {
    var n = t.getToggleElement();
    e && n && n[0].contains(e.target) || t.$apply(function () {
      t.isOpen = !1
    })
  }, r = function (e) {
    27 === e.which && (t.focusToggleElement(), n())
  }
}]).controller("DropdownController", ["$scope", "$attrs", "$parse", "dropdownConfig", "dropdownService", "$animate", function (e, t, n, r, i, o) {
  var a, s = this, u = e.$new(), l = r.openClass, c = angular.noop, p = t.onToggle ? n(t.onToggle) : angular.noop;
  this.init = function (r) {
    s.$element = r, t.isOpen && (a = n(t.isOpen), c = a.assign, e.$watch(a, function (e) {
      u.isOpen = !!e
    }))
  }, this.toggle = function (e) {
    return u.isOpen = arguments.length ? !!e : !u.isOpen
  }, this.isOpen = function () {
    return u.isOpen
  }, u.getToggleElement = function () {
    return s.toggleElement
  }, u.focusToggleElement = function () {
    s.toggleElement && s.toggleElement[0].focus()
  }, u.$watch("isOpen", function (t, n) {
    o[t ? "addClass" : "removeClass"](s.$element, l), t ? (u.focusToggleElement(), i.open(u)) : i.close(u), c(e, t), angular.isDefined(t) && t !== n && p(e, {open: !!t})
  }), e.$on("$locationChangeSuccess", function () {
    u.isOpen = !1
  }), e.$on("$destroy", function () {
    u.$destroy()
  })
}]).directive("dropdown", function () {
  return {
    restrict: "CA", controller: "DropdownController", link: function (e, t, n, r) {
      r.init(t)
    }
  }
}).directive("dropdownToggle", function () {
  return {
    restrict: "CA", require: "?^dropdown", link: function (e, t, n, r) {
      if (r) {
        r.toggleElement = t;
        var i = function (i) {
          i.preventDefault(), t.hasClass("disabled") || n.disabled || e.$apply(function () {
            r.toggle()
          })
        };
        t.bind("click", i), t.attr({"aria-haspopup": !0, "aria-expanded": !1}), e.$watch(r.isOpen, function (e) {
          t.attr("aria-expanded", !!e)
        }), e.$on("$destroy", function () {
          t.unbind("click", i)
        })
      }
    }
  }
}), angular.module("ui.bootstrap.modal", ["ui.bootstrap.transition"]).factory("$$stackedMap", function () {
  return {
    createNew: function () {
      var e = [];
      return {
        add: function (t, n) {
          e.push({key: t, value: n})
        }, get: function (t) {
          for (var n = 0; n < e.length; n++)if (t == e[n].key)return e[n]
        }, keys: function () {
          for (var t = [], n = 0; n < e.length; n++)t.push(e[n].key);
          return t
        }, top: function () {
          return e[e.length - 1]
        }, remove: function (t) {
          for (var n = -1, r = 0; r < e.length; r++)if (t == e[r].key) {
            n = r;
            break
          }
          return e.splice(n, 1)[0]
        }, removeTop: function () {
          return e.splice(e.length - 1, 1)[0]
        }, length: function () {
          return e.length
        }
      }
    }
  }
}).directive("modalBackdrop", ["$timeout", function (e) {
  return {
    restrict: "EA", replace: !0, templateUrl: "template/modal/backdrop.html", link: function (t, n, r) {
      t.backdropClass = r.backdropClass || "", t.animate = !1, e(function () {
        t.animate = !0
      })
    }
  }
}]).directive("modalWindow", ["$modalStack", "$timeout", function (e, t) {
  return {
    restrict: "EA", scope: {index: "@", animate: "="}, replace: !0, transclude: !0, templateUrl: function (e, t) {
      return t.templateUrl || "template/modal/window.html"
    }, link: function (n, r, i) {
      r.addClass(i.windowClass || ""), n.size = i.size, t(function () {
        n.animate = !0, r[0].querySelectorAll("[autofocus]").length || r[0].focus()
      }), n.close = function (t) {
        var n = e.getTop();
        n && n.value.backdrop && "static" != n.value.backdrop && t.target === t.currentTarget && (t.preventDefault(), t.stopPropagation(), e.dismiss(n.key, "backdrop click"))
      }
    }
  }
}]).directive("modalTransclude", function () {
  return {
    link: function (e, t, n, r, i) {
      i(e.$parent, function (e) {
        t.empty(), t.append(e)
      })
    }
  }
}).factory("$modalStack", ["$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap", function (e, t, n, r, i, o) {
  function a() {
    for (var e = -1, t = d.keys(), n = 0; n < t.length; n++)d.get(t[n]).value.backdrop && (e = n);
    return e
  }

  function s(e) {
    var t = n.find("body").eq(0), r = d.get(e).value;
    d.remove(e), l(r.modalDomEl, r.modalScope, 300, function () {
      r.modalScope.$destroy(), t.toggleClass(f, d.length() > 0), u()
    })
  }

  function u() {
    if (c && -1 == a()) {
      var e = p;
      l(c, p, 150, function () {
        e.$destroy(), e = null
      }), c = void 0, p = void 0
    }
  }

  function l(n, r, i, o) {
    function a() {
      a.done || (a.done = !0, n.remove(), o && o())
    }

    r.animate = !1;
    var s = e.transitionEndEventName;
    if (s) {
      var u = t(a, i);
      n.bind(s, function () {
        t.cancel(u), a(), r.$apply()
      })
    } else t(a)
  }

  var c, p, f = "modal-open", d = o.createNew(), h = {};
  return i.$watch(a, function (e) {
    p && (p.index = e)
  }), n.bind("keydown", function (e) {
    var t;
    27 === e.which && (t = d.top(), t && t.value.keyboard && (e.preventDefault(), i.$apply(function () {
      h.dismiss(t.key, "escape key press")
    })))
  }), h.open = function (e, t) {
    d.add(e, {deferred: t.deferred, modalScope: t.scope, backdrop: t.backdrop, keyboard: t.keyboard});
    var o = n.find("body").eq(0), s = a();
    if (s >= 0 && !c) {
      p = i.$new(!0), p.index = s;
      var u = angular.element("<div modal-backdrop></div>");
      u.attr("backdrop-class", t.backdropClass), c = r(u)(p), o.append(c)
    }
    var l = angular.element("<div modal-window></div>");
    l.attr({
      "template-url": t.windowTemplateUrl,
      "window-class": t.windowClass,
      size: t.size,
      index: d.length() - 1,
      animate: "animate"
    }).html(t.content);
    var h = r(l)(t.scope);
    d.top().value.modalDomEl = h, o.append(h), o.addClass(f)
  }, h.close = function (e, t) {
    var n = d.get(e);
    n && (n.value.deferred.resolve(t), s(e))
  }, h.dismiss = function (e, t) {
    var n = d.get(e);
    n && (n.value.deferred.reject(t), s(e))
  }, h.dismissAll = function (e) {
    for (var t = this.getTop(); t;)this.dismiss(t.key, e), t = this.getTop()
  }, h.getTop = function () {
    return d.top()
  }, h
}]).provider("$modal", function () {
  var e = {
    options: {backdrop: !0, keyboard: !0},
    $get: ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack", function (t, n, r, i, o, a, s) {
      function u(e) {
        return e.template ? r.when(e.template) : i.get(angular.isFunction(e.templateUrl) ? e.templateUrl() : e.templateUrl, {cache: o}).then(function (e) {
          return e.data
        })
      }

      function l(e) {
        var n = [];
        return angular.forEach(e, function (e) {
          (angular.isFunction(e) || angular.isArray(e)) && n.push(r.when(t.invoke(e)))
        }), n
      }

      var c = {};
      return c.open = function (t) {
        var i = r.defer(), o = r.defer(), c = {
          result: i.promise, opened: o.promise, close: function (e) {
            s.close(c, e)
          }, dismiss: function (e) {
            s.dismiss(c, e)
          }
        };
        if (t = angular.extend({}, e.options, t), t.resolve = t.resolve || {}, !t.template && !t.templateUrl)throw new Error("One of template or templateUrl options is required.");
        var p = r.all([u(t)].concat(l(t.resolve)));
        return p.then(function (e) {
          var r = (t.scope || n).$new();
          r.$close = c.close, r.$dismiss = c.dismiss;
          var o, u = {}, l = 1;
          t.controller && (u.$scope = r, u.$modalInstance = c, angular.forEach(t.resolve, function (t, n) {
            u[n] = e[l++]
          }), o = a(t.controller, u), t.controllerAs && (r[t.controllerAs] = o)), s.open(c, {
            scope: r,
            deferred: i,
            content: e[0],
            backdrop: t.backdrop,
            keyboard: t.keyboard,
            backdropClass: t.backdropClass,
            windowClass: t.windowClass,
            windowTemplateUrl: t.windowTemplateUrl,
            size: t.size
          })
        }, function (e) {
          i.reject(e)
        }), p.then(function () {
          o.resolve(!0)
        }, function () {
          o.reject(!1)
        }), c
      }, c
    }]
  };
  return e
}), angular.module("ui.bootstrap.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse", function (e, t, n) {
  var r = this, i = {$setViewValue: angular.noop}, o = t.numPages ? n(t.numPages).assign : angular.noop;
  this.init = function (o, a) {
    i = o, this.config = a, i.$render = function () {
      r.render()
    }, t.itemsPerPage ? e.$parent.$watch(n(t.itemsPerPage), function (t) {
      r.itemsPerPage = parseInt(t, 10), e.totalPages = r.calculateTotalPages()
    }) : this.itemsPerPage = a.itemsPerPage
  }, this.calculateTotalPages = function () {
    var t = this.itemsPerPage < 1 ? 1 : Math.ceil(e.totalItems / this.itemsPerPage);
    return Math.max(t || 0, 1)
  }, this.render = function () {
    e.page = parseInt(i.$viewValue, 10) || 1
  }, e.selectPage = function (t) {
    e.page !== t && t > 0 && t <= e.totalPages && (i.$setViewValue(t), i.$render())
  }, e.getText = function (t) {
    return e[t + "Text"] || r.config[t + "Text"]
  }, e.noPrevious = function () {
    return 1 === e.page
  }, e.noNext = function () {
    return e.page === e.totalPages
  }, e.$watch("totalItems", function () {
    e.totalPages = r.calculateTotalPages()
  }), e.$watch("totalPages", function (t) {
    o(e.$parent, t), e.page > t ? e.selectPage(t) : i.$render()
  })
}]).constant("paginationConfig", {
  itemsPerPage: 10,
  boundaryLinks: !1,
  directionLinks: !0,
  firstText: "First",
  previousText: "Previous",
  nextText: "Next",
  lastText: "Last",
  rotate: !0
}).directive("pagination", ["$parse", "paginationConfig", function (e, t) {
  return {
    restrict: "EA",
    scope: {totalItems: "=", firstText: "@", previousText: "@", nextText: "@", lastText: "@"},
    require: ["pagination", "?ngModel"],
    controller: "PaginationController",
    templateUrl: "template/pagination/pagination.html",
    replace: !0,
    link: function (n, r, i, o) {
      function a(e, t, n) {
        return {number: e, text: t, active: n}
      }

      function s(e, t) {
        var n = [], r = 1, i = t, o = angular.isDefined(c) && t > c;
        o && (p ? (r = Math.max(e - Math.floor(c / 2), 1), i = r + c - 1, i > t && (i = t, r = i - c + 1)) : (r = (Math.ceil(e / c) - 1) * c + 1, i = Math.min(r + c - 1, t)));
        for (var s = r; i >= s; s++) {
          var u = a(s, s, s === e);
          n.push(u)
        }
        if (o && !p) {
          if (r > 1) {
            var l = a(r - 1, "...", !1);
            n.unshift(l)
          }
          if (t > i) {
            var f = a(i + 1, "...", !1);
            n.push(f)
          }
        }
        return n
      }

      var u = o[0], l = o[1];
      if (l) {
        var c = angular.isDefined(i.maxSize) ? n.$parent.$eval(i.maxSize) : t.maxSize, p = angular.isDefined(i.rotate) ? n.$parent.$eval(i.rotate) : t.rotate;
        n.boundaryLinks = angular.isDefined(i.boundaryLinks) ? n.$parent.$eval(i.boundaryLinks) : t.boundaryLinks, n.directionLinks = angular.isDefined(i.directionLinks) ? n.$parent.$eval(i.directionLinks) : t.directionLinks, u.init(l, t), i.maxSize && n.$parent.$watch(e(i.maxSize), function (e) {
          c = parseInt(e, 10), u.render()
        });
        var f = u.render;
        u.render = function () {
          f(), n.page > 0 && n.page <= n.totalPages && (n.pages = s(n.page, n.totalPages))
        }
      }
    }
  }
}]).constant("pagerConfig", {
  itemsPerPage: 10,
  previousText: "« Previous",
  nextText: "Next »",
  align: !0
}).directive("pager", ["pagerConfig", function (e) {
  return {
    restrict: "EA",
    scope: {totalItems: "=", previousText: "@", nextText: "@"},
    require: ["pager", "?ngModel"],
    controller: "PaginationController",
    templateUrl: "template/pagination/pager.html",
    replace: !0,
    link: function (t, n, r, i) {
      var o = i[0], a = i[1];
      a && (t.align = angular.isDefined(r.align) ? t.$parent.$eval(r.align) : e.align, o.init(a, e))
    }
  }
}]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).provider("$tooltip", function () {
  function e(e) {
    var t = /[A-Z]/g, n = "-";
    return e.replace(t, function (e, t) {
      return (t ? n : "") + e.toLowerCase()
    })
  }

  var t = {placement: "top", animation: !0, popupDelay: 0}, n = {
    mouseenter: "mouseleave",
    click: "click",
    focus: "blur"
  }, r = {};
  this.options = function (e) {
    angular.extend(r, e)
  }, this.setTriggers = function (e) {
    angular.extend(n, e)
  }, this.$get = ["$window", "$compile", "$timeout", "$parse", "$document", "$position", "$interpolate", function (i, o, a, s, u, l, c) {
    return function (p, f, d) {
      function h(e) {
        var t = e || g.trigger || d, r = n[t] || t;
        return {show: t, hide: r}
      }

      var g = angular.extend({}, t, r), m = e(p), v = c.startSymbol(), $ = c.endSymbol(), y = "<div " + m + '-popup title="' + v + "tt_title" + $ + '" content="' + v + "tt_content" + $ + '" placement="' + v + "tt_placement" + $ + '" animation="tt_animation" is-open="tt_isOpen"></div>';
      return {
        restrict: "EA", scope: !0, compile: function () {
          var e = o(y);
          return function (t, n, r) {
            function o() {
              t.tt_isOpen ? d() : c()
            }

            function c() {
              (!E || t.$eval(r[f + "Enable"])) && (t.tt_popupDelay ? x || (x = a(m, t.tt_popupDelay, !1), x.then(function (e) {
                e()
              })) : m()())
            }

            function d() {
              t.$apply(function () {
                v()
              })
            }

            function m() {
              return x = null, w && (a.cancel(w), w = null), t.tt_content ? ($(), b.css({
                top: 0,
                left: 0,
                display: "block"
              }), k ? u.find("body").append(b) : n.after(b), T(), t.tt_isOpen = !0, t.$digest(), T) : angular.noop
            }

            function v() {
              t.tt_isOpen = !1, a.cancel(x), x = null, t.tt_animation ? w || (w = a(y, 500)) : y()
            }

            function $() {
              b && y(), b = e(t, function () {
              }), t.$digest()
            }

            function y() {
              w = null, b && (b.remove(), b = null)
            }

            var b, w, x, k = angular.isDefined(g.appendToBody) ? g.appendToBody : !1, C = h(void 0), E = angular.isDefined(r[f + "Enable"]), T = function () {
              var e = l.positionElements(n, b, t.tt_placement, k);
              if (k) {
                var r = {
                  left: 5,
                  width: angular.element(i).width() - 5
                }, o = b.find(".tooltip-arrow"), a = b.width(), s = Math.abs(e.left + a - r.width);
                if (e.left < r.left)o.css("left", a / 2 + (e.left - r.left) + "px"), e.left = r.left + "px"; else if (e.left + a > r.width) {
                  var u = a / 2 + Math.abs(r.width - (e.left + a));
                  o.css("left", u + "px"), e.left = e.left - s + "px"
                } else e.left += "px";
                e.top += "px"
              } else e.top += "px", e.left += "px";
              b.css(e)
            };
            t.tt_isOpen = !1, r.$observe(p, function (e) {
              t.tt_content = e, !e && t.tt_isOpen && v()
            }), r.$observe(f + "Title", function (e) {
              t.tt_title = e
            }), r.$observe(f + "Placement", function (e) {
              t.tt_placement = angular.isDefined(e) ? e : g.placement
            }), r.$observe(f + "PopupDelay", function (e) {
              var n = parseInt(e, 10);
              t.tt_popupDelay = isNaN(n) ? g.popupDelay : n
            });
            var S = function () {
              n.unbind(C.show, c), n.unbind(C.hide, d)
            };
            r.$observe(f + "Trigger", function (e) {
              S(), C = h(e), C.show === C.hide ? n.bind(C.show, o) : (n.bind(C.show, c), n.bind(C.hide, d))
            });
            var D = t.$eval(r[f + "Animation"]);
            t.tt_animation = angular.isDefined(D) ? !!D : g.animation, r.$observe(f + "AppendToBody", function (e) {
              k = angular.isDefined(e) ? s(e)(t) : k
            }), k && t.$on("$locationChangeSuccess", function () {
              t.tt_isOpen && v()
            }), t.$on("$destroy", function () {
              a.cancel(w), a.cancel(x), S(), y()
            })
          }
        }
      }
    }
  }]
}).directive("tooltipPopup", function () {
  return {
    restrict: "EA",
    replace: !0,
    scope: {content: "@", placement: "@", animation: "&", isOpen: "&"},
    templateUrl: "template/tooltip/tooltip-popup.html"
  }
}).directive("tooltip", ["$tooltip", function (e) {
  return e("tooltip", "tooltip", "mouseenter")
}]).directive("tooltipHtmlUnsafePopup", function () {
  return {
    restrict: "EA",
    replace: !0,
    scope: {content: "@", placement: "@", animation: "&", isOpen: "&"},
    templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
  }
}).directive("tooltipHtmlUnsafe", ["$tooltip", function (e) {
  return e("tooltipHtmlUnsafe", "tooltip", "mouseenter")
}]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverPopup", function () {
  return {
    restrict: "EA",
    replace: !0,
    scope: {title: "@", content: "@", placement: "@", animation: "&", isOpen: "&"},
    templateUrl: "template/popover/popover.html"
  }
}).directive("popover", ["$tooltip", function (e) {
  return e("popover", "popover", "click")
}]), angular.module("ui.bootstrap.progressbar", []).constant("progressConfig", {
  animate: !0,
  max: 100
}).controller("ProgressController", ["$scope", "$attrs", "progressConfig", function (e, t, n) {
  var r = this, i = angular.isDefined(t.animate) ? e.$parent.$eval(t.animate) : n.animate;
  this.bars = [], e.max = angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max, this.addBar = function (t, n) {
    i || n.css({transition: "none"}), this.bars.push(t), t.$watch("value", function (n) {
      t.percent = +(100 * n / e.max).toFixed(2)
    }), t.$on("$destroy", function () {
      n = null, r.removeBar(t)
    })
  }, this.removeBar = function (e) {
    this.bars.splice(this.bars.indexOf(e), 1)
  }
}]).directive("progress", function () {
  return {
    restrict: "EA",
    replace: !0,
    transclude: !0,
    controller: "ProgressController",
    require: "progress",
    scope: {},
    templateUrl: "template/progressbar/progress.html"
  }
}).directive("bar", function () {
  return {
    restrict: "EA",
    replace: !0,
    transclude: !0,
    require: "^progress",
    scope: {value: "=", type: "@"},
    templateUrl: "template/progressbar/bar.html",
    link: function (e, t, n, r) {
      r.addBar(e, t)
    }
  }
}).directive("progressbar", function () {
  return {
    restrict: "EA",
    replace: !0,
    transclude: !0,
    controller: "ProgressController",
    scope: {value: "=", type: "@"},
    templateUrl: "template/progressbar/progressbar.html",
    link: function (e, t, n, r) {
      r.addBar(e, angular.element(t.children()[0]))
    }
  }
}), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
  max: 5,
  stateOn: null,
  stateOff: null
}).controller("RatingController", ["$scope", "$attrs", "ratingConfig", function (e, t, n) {
  var r = {$setViewValue: angular.noop};
  this.init = function (i) {
    r = i, r.$render = this.render, this.stateOn = angular.isDefined(t.stateOn) ? e.$parent.$eval(t.stateOn) : n.stateOn, this.stateOff = angular.isDefined(t.stateOff) ? e.$parent.$eval(t.stateOff) : n.stateOff;
    var o = angular.isDefined(t.ratingStates) ? e.$parent.$eval(t.ratingStates) : new Array(angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max);
    e.range = this.buildTemplateObjects(o)
  }, this.buildTemplateObjects = function (e) {
    for (var t = 0, n = e.length; n > t; t++)e[t] = angular.extend({index: t}, {
      stateOn: this.stateOn,
      stateOff: this.stateOff
    }, e[t]);
    return e
  }, e.rate = function (t) {
    !e.readonly && t >= 0 && t <= e.range.length && (r.$setViewValue(t), r.$render())
  }, e.enter = function (t) {
    e.readonly || (e.value = t), e.onHover({value: t})
  }, e.reset = function () {
    e.value = r.$viewValue, e.onLeave()
  }, e.onKeydown = function (t) {
    /(37|38|39|40)/.test(t.which) && (t.preventDefault(), t.stopPropagation(), e.rate(e.value + (38 === t.which || 39 === t.which ? 1 : -1)))
  }, this.render = function () {
    e.value = r.$viewValue
  }
}]).directive("rating", function () {
  return {
    restrict: "EA",
    require: ["rating", "ngModel"],
    scope: {readonly: "=?", onHover: "&", onLeave: "&"},
    controller: "RatingController",
    templateUrl: "template/rating/rating.html",
    replace: !0,
    link: function (e, t, n, r) {
      var i = r[0], o = r[1];
      o && i.init(o)
    }
  }
}), angular.module("ui.bootstrap.tabs", []).controller("TabsetController", ["$scope", function (e) {
  var t = this, n = t.tabs = e.tabs = [];
  t.select = function (e) {
    angular.forEach(n, function (t) {
      t.active && t !== e && (t.active = !1, t.onDeselect())
    }), e.active = !0, e.onSelect()
  }, t.addTab = function (e) {
    n.push(e), 1 === n.length ? e.active = !0 : e.active && t.select(e)
  }, t.removeTab = function (e) {
    var r = n.indexOf(e);
    if (e.active && n.length > 1) {
      var i = r == n.length - 1 ? r - 1 : r + 1;
      t.select(n[i])
    }
    n.splice(r, 1)
  }
}]).directive("tabset", function () {
  return {
    restrict: "EA",
    transclude: !0,
    replace: !0,
    scope: {type: "@"},
    controller: "TabsetController",
    templateUrl: "template/tabs/tabset.html",
    link: function (e, t, n) {
      e.vertical = angular.isDefined(n.vertical) ? e.$parent.$eval(n.vertical) : !1, e.justified = angular.isDefined(n.justified) ? e.$parent.$eval(n.justified) : !1
    }
  }
}).directive("tab", ["$parse", function (e) {
  return {
    require: "^tabset",
    restrict: "EA",
    replace: !0,
    templateUrl: "template/tabs/tab.html",
    transclude: !0,
    scope: {active: "=?", heading: "@", onSelect: "&select", onDeselect: "&deselect"},
    controller: function () {
    },
    compile: function (t, n, r) {
      return function (t, n, i, o) {
        t.$watch("active", function (e) {
          e && o.select(t)
        }), t.disabled = !1, i.disabled && t.$parent.$watch(e(i.disabled), function (e) {
          t.disabled = !!e
        }), t.select = function () {
          t.disabled || (t.active = !0)
        }, o.addTab(t), t.$on("$destroy", function () {
          o.removeTab(t)
        }), t.$transcludeFn = r
      }
    }
  }
}]).directive("tabHeadingTransclude", [function () {
  return {
    restrict: "A", require: "^tab", link: function (e, t) {
      e.$watch("headingElement", function (e) {
        e && (t.html(""), t.append(e))
      })
    }
  }
}]).directive("tabContentTransclude", function () {
  function e(e) {
    return e.tagName && (e.hasAttribute("tab-heading") || e.hasAttribute("data-tab-heading") || "tab-heading" === e.tagName.toLowerCase() || "data-tab-heading" === e.tagName.toLowerCase())
  }

  return {
    restrict: "A", require: "^tabset", link: function (t, n, r) {
      var i = t.$eval(r.tabContentTransclude);
      i.$transcludeFn(i.$parent, function (t) {
        angular.forEach(t, function (t) {
          e(t) ? i.headingElement = t : n.append(t)
        })
      })
    }
  }
}), angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
  hourStep: 1,
  minuteStep: 1,
  showMeridian: !0,
  meridians: null,
  readonlyInput: !1,
  mousewheel: !0
}).controller("TimepickerController", ["$scope", "$attrs", "$parse", "$log", "$locale", "timepickerConfig", function (e, t, n, r, i, o) {
  function a() {
    var t = parseInt(e.hours, 10), n = e.showMeridian ? t > 0 && 13 > t : t >= 0 && 24 > t;
    return n ? (e.showMeridian && (12 === t && (t = 0), e.meridian === g[1] && (t += 12)), t) : void 0
  }

  function s() {
    var t = parseInt(e.minutes, 10);
    return t >= 0 && 60 > t ? t : void 0
  }

  function u(e) {
    return angular.isDefined(e) && e.toString().length < 2 ? "0" + e : e
  }

  function l(e) {
    c(), h.$setViewValue(new Date(d)), p(e)
  }

  function c() {
    h.$setValidity("time", !0), e.invalidHours = !1, e.invalidMinutes = !1
  }

  function p(t) {
    var n = d.getHours(), r = d.getMinutes();
    e.showMeridian && (n = 0 === n || 12 === n ? 12 : n % 12), e.hours = "h" === t ? n : u(n), e.minutes = "m" === t ? r : u(r), e.meridian = d.getHours() < 12 ? g[0] : g[1]
  }

  function f(e) {
    var t = new Date(d.getTime() + 6e4 * e);
    d.setHours(t.getHours(), t.getMinutes()), l()
  }

  var d = new Date, h = {$setViewValue: angular.noop}, g = angular.isDefined(t.meridians) ? e.$parent.$eval(t.meridians) : o.meridians || i.DATETIME_FORMATS.AMPMS;
  this.init = function (n, r) {
    h = n, h.$render = this.render;
    var i = r.eq(0), a = r.eq(1), s = angular.isDefined(t.mousewheel) ? e.$parent.$eval(t.mousewheel) : o.mousewheel;
    s && this.setupMousewheelEvents(i, a), e.readonlyInput = angular.isDefined(t.readonlyInput) ? e.$parent.$eval(t.readonlyInput) : o.readonlyInput, this.setupInputEvents(i, a)
  };
  var m = o.hourStep;
  t.hourStep && e.$parent.$watch(n(t.hourStep), function (e) {
    m = parseInt(e, 10)
  });
  var v = o.minuteStep;
  t.minuteStep && e.$parent.$watch(n(t.minuteStep), function (e) {
    v = parseInt(e, 10)
  }), e.showMeridian = o.showMeridian, t.showMeridian && e.$parent.$watch(n(t.showMeridian), function (t) {
    if (e.showMeridian = !!t, h.$error.time) {
      var n = a(), r = s();
      angular.isDefined(n) && angular.isDefined(r) && (d.setHours(n), l())
    } else p()
  }), this.setupMousewheelEvents = function (t, n) {
    var r = function (e) {
      e.originalEvent && (e = e.originalEvent);
      var t = e.wheelDelta ? e.wheelDelta : -e.deltaY;
      return e.detail || t > 0
    };
    t.bind("mousewheel wheel", function (t) {
      e.$apply(r(t) ? e.incrementHours() : e.decrementHours()), t.preventDefault()
    }), n.bind("mousewheel wheel", function (t) {
      e.$apply(r(t) ? e.incrementMinutes() : e.decrementMinutes()), t.preventDefault()
    })
  }, this.setupInputEvents = function (t, n) {
    if (e.readonlyInput)return e.updateHours = angular.noop, void(e.updateMinutes = angular.noop);
    var r = function (t, n) {
      h.$setViewValue(null), h.$setValidity("time", !1), angular.isDefined(t) && (e.invalidHours = t), angular.isDefined(n) && (e.invalidMinutes = n)
    };
    e.updateHours = function () {
      var e = a();
      angular.isDefined(e) ? (d.setHours(e), l("h")) : r(!0)
    }, t.bind("blur", function () {
      !e.invalidHours && e.hours < 10 && e.$apply(function () {
        e.hours = u(e.hours)
      })
    }), e.updateMinutes = function () {
      var e = s();
      angular.isDefined(e) ? (d.setMinutes(e), l("m")) : r(void 0, !0)
    }, n.bind("blur", function () {
      !e.invalidMinutes && e.minutes < 10 && e.$apply(function () {
        e.minutes = u(e.minutes)
      })
    })
  }, this.render = function () {
    var e = h.$modelValue ? new Date(h.$modelValue) : null;
    isNaN(e) ? (h.$setValidity("time", !1), r.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (e && (d = e), c(), p())
  }, e.incrementHours = function () {
    f(60 * m)
  }, e.decrementHours = function () {
    f(60 * -m)
  }, e.incrementMinutes = function () {
    f(v)
  }, e.decrementMinutes = function () {
    f(-v)
  }, e.toggleMeridian = function () {
    f(720 * (d.getHours() < 12 ? 1 : -1))
  }
}]).directive("timepicker", function () {
  return {
    restrict: "EA",
    require: ["timepicker", "?^ngModel"],
    controller: "TimepickerController",
    replace: !0,
    scope: {},
    templateUrl: "template/timepicker/timepicker.html",
    link: function (e, t, n, r) {
      var i = r[0], o = r[1];
      o && i.init(o, t.find("input"))
    }
  }
}), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).factory("typeaheadParser", ["$parse", function (e) {
  var t = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
  return {
    parse: function (n) {
      var r = n.match(t);
      if (!r)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + n + '".');
      return {itemName: r[3], source: e(r[4]), viewMapper: e(r[2] || r[1]), modelMapper: e(r[1])}
    }
  }
}]).directive("typeahead", ["$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser", function (e, t, n, r, i, o, a) {
  var s = [9, 13, 27, 38, 40];
  return {
    require: "ngModel", link: function (u, l, c, p) {
      var f, d = u.$eval(c.typeaheadMinLength) || 1, h = u.$eval(c.typeaheadWaitMs) || 0, g = u.$eval(c.typeaheadEditable) !== !1, m = t(c.typeaheadLoading).assign || angular.noop, v = t(c.typeaheadOnSelect), $ = c.typeaheadInputFormatter ? t(c.typeaheadInputFormatter) : void 0, y = c.typeaheadAppendToBody ? u.$eval(c.typeaheadAppendToBody) : !1, b = t(c.ngModel).assign, w = a.parse(c.typeahead), x = u.$new();
      u.$on("$destroy", function () {
        x.$destroy()
      });
      var k = "typeahead-" + x.$id + "-" + Math.floor(1e4 * Math.random());
      l.attr({"aria-autocomplete": "list", "aria-expanded": !1, "aria-owns": k});
      var C = angular.element("<div typeahead-popup></div>");
      C.attr({
        id: k,
        matches: "matches",
        active: "activeIdx",
        select: "select(activeIdx)",
        query: "query",
        position: "position"
      }), angular.isDefined(c.typeaheadTemplateUrl) && C.attr("template-url", c.typeaheadTemplateUrl);
      var E = function () {
        x.matches = [], x.activeIdx = -1, l.attr("aria-expanded", !1)
      }, T = function (e) {
        return k + "-option-" + e
      };
      x.$watch("activeIdx", function (e) {
        0 > e ? l.removeAttr("aria-activedescendant") : l.attr("aria-activedescendant", T(e))
      });
      var S = function (e) {
        var t = {$viewValue: e};
        m(u, !0), n.when(w.source(u, t)).then(function (n) {
          var r = e === p.$viewValue;
          if (r && f)if (n.length > 0) {
            x.activeIdx = 0, x.matches.length = 0;
            for (var i = 0; i < n.length; i++)t[w.itemName] = n[i], x.matches.push({
              id: T(i),
              label: w.viewMapper(x, t),
              model: n[i]
            });
            x.query = e, x.position = y ? o.offset(l) : o.position(l), x.position.top = x.position.top + l.prop("offsetHeight"), l.attr("aria-expanded", !0)
          } else E();
          r && m(u, !1)
        }, function () {
          E(), m(u, !1)
        })
      };
      E(), x.query = void 0;
      var D, A = function (e) {
        D = r(function () {
          S(e)
        }, h)
      }, M = function () {
        D && r.cancel(D)
      };
      p.$parsers.unshift(function (e) {
        return f = !0, e && e.length >= d ? h > 0 ? (M(), A(e)) : S(e) : (m(u, !1), M(), E()), g ? e : e ? void p.$setValidity("editable", !1) : (p.$setValidity("editable", !0), e)
      }), p.$formatters.push(function (e) {
        var t, n, r = {};
        return $ ? (r.$model = e, $(u, r)) : (r[w.itemName] = e, t = w.viewMapper(u, r), r[w.itemName] = void 0, n = w.viewMapper(u, r), t !== n ? t : e)
      }), x.select = function (e) {
        var t, n, i = {};
        i[w.itemName] = n = x.matches[e].model, t = w.modelMapper(u, i), b(u, t), p.$setValidity("editable", !0), v(u, {
          $item: n,
          $model: t,
          $label: w.viewMapper(u, i)
        }), E(), r(function () {
          l[0].focus()
        }, 0, !1)
      }, l.bind("keydown", function (e) {
        0 !== x.matches.length && -1 !== s.indexOf(e.which) && (e.preventDefault(), 40 === e.which ? (x.activeIdx = (x.activeIdx + 1) % x.matches.length, x.$digest()) : 38 === e.which ? (x.activeIdx = (x.activeIdx ? x.activeIdx : x.matches.length) - 1, x.$digest()) : 13 === e.which || 9 === e.which ? x.$apply(function () {
          x.select(x.activeIdx)
        }) : 27 === e.which && (e.stopPropagation(), E(), x.$digest()))
      }), l.bind("blur", function () {
        f = !1
      });
      var O = function (e) {
        l[0] !== e.target && (E(), x.$digest())
      };
      i.bind("click", O), u.$on("$destroy", function () {
        i.unbind("click", O)
      });
      var N = e(C)(x);
      y ? i.find("body").append(N) : l.after(N)
    }
  }
}]).directive("typeaheadPopup", function () {
  return {
    restrict: "EA",
    scope: {matches: "=", query: "=", active: "=", position: "=", select: "&"},
    replace: !0,
    templateUrl: "template/typeahead/typeahead-popup.html",
    link: function (e, t, n) {
      e.templateUrl = n.templateUrl, e.isOpen = function () {
        return e.matches.length > 0
      }, e.isActive = function (t) {
        return e.active == t
      }, e.selectActive = function (t) {
        e.active = t
      }, e.selectMatch = function (t) {
        e.select({activeIdx: t})
      }
    }
  }
}).directive("typeaheadMatch", ["$http", "$templateCache", "$compile", "$parse", function (e, t, n, r) {
  return {
    restrict: "EA", scope: {index: "=", match: "=", query: "="}, link: function (i, o, a) {
      var s = r(a.templateUrl)(i.$parent) || "template/typeahead/typeahead-match.html";
      e.get(s, {cache: t}).success(function (e) {
        o.replaceWith(n(e.trim())(i))
      })
    }
  }
}]).filter("typeaheadHighlight", function () {
  function e(e) {
    return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
  }

  return function (t, n) {
    return n ? ("" + t).replace(new RegExp(e(n), "gi"), "<strong>$&</strong>") : t
  }
}), angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function (e) {
  e.put("template/accordion/accordion-group.html", '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a href class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n')
}]), angular.module("template/accordion/accordion.html", []).run(["$templateCache", function (e) {
  e.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>')
}]), angular.module("template/alert/alert.html", []).run(["$templateCache", function (e) {
  e.put("template/alert/alert.html", '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissable\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')
}]), angular.module("template/carousel/carousel.html", []).run(["$templateCache", function (e) {
  e.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n')
}]), angular.module("template/carousel/slide.html", []).run(["$templateCache", function (e) {
  e.put("template/carousel/slide.html", "<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n")
}]), angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function (e) {
  e.put("template/datepicker/datepicker.html", '<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>')
}]), angular.module("template/datepicker/day.html", []).run(["$templateCache", function (e) {
  e.put("template/datepicker/day.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-show="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/datepicker/month.html", []).run(["$templateCache", function (e) {
  e.put("template/datepicker/month.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/datepicker/popup.html", []).run(["$templateCache", function (e) {
  e.put("template/datepicker/popup.html", '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)">\n	<li ng-transclude></li>\n	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group pull-left">\n			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n	</li>\n</ul>\n')
}]), angular.module("template/datepicker/year.html", []).run(["$templateCache", function (e) {
  e.put("template/datepicker/year.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/modal/backdrop.html", []).run(["$templateCache", function (e) {
  e.put("template/modal/backdrop.html", '<div class="modal-backdrop fade {{ backdropClass }}"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')
}]), angular.module("template/modal/window.html", []).run(["$templateCache", function (e) {
  e.put("template/modal/window.html", '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" modal-transclude></div></div>\n</div>')
}]), angular.module("template/pagination/pager.html", []).run(["$templateCache", function (e) {
  e.put("template/pagination/pager.html", '<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>')
}]), angular.module("template/pagination/pagination.html", []).run(["$templateCache", function (e) {
  e.put("template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>')
}]), angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function (e) {
  e.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')
}]), angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function (e) {
  e.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
}]), angular.module("template/popover/popover.html", []).run(["$templateCache", function (e) {
  e.put("template/popover/popover.html", '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')
}]), angular.module("template/progressbar/bar.html", []).run(["$templateCache", function (e) {
  e.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>')
}]), angular.module("template/progressbar/progress.html", []).run(["$templateCache", function (e) {
  e.put("template/progressbar/progress.html", '<div class="progress" ng-transclude></div>')
}]), angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function (e) {
  e.put("template/progressbar/progressbar.html", '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n</div>')
}]), angular.module("template/rating/rating.html", []).run(["$templateCache", function (e) {
  e.put("template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n        <span class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    </i>\n</span>')
}]), angular.module("template/tabs/tab.html", []).run(["$templateCache", function (e) {
  e.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')
}]), angular.module("template/tabs/tabset.html", []).run(["$templateCache", function (e) {
  e.put("template/tabs/tabset.html", '<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
}]), angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function (e) {
  e.put("template/timepicker/timepicker.html", '<table>\n	<tbody>\n		<tr class="text-center">\n			<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n		<tr>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n				<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td>:</td>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n				<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n		</tr>\n		<tr class="text-center">\n			<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n	</tbody>\n</table>\n')
}]), angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function (e) {
  e.put("template/typeahead/typeahead-match.html", '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')
}]), angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function (e) {
  e.put("template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')
}]), define("angular-bootstrap", function () {
}), define("ngParse", [], function () {
  function e(e) {
    return "function" == typeof e
  }

  function t(e) {
    return a.test(e)
  }

  function n(e) {
    return e.replace(/\./g, "/")
  }

  function r(t, n, i) {
    var o;
    if (t)if (e(t))for (o in t)"prototype" != o && "length" != o && "name" != o && t.hasOwnProperty(o) && n.call(i, t[o], o); else if (t.forEach && t.forEach !== r)t.forEach(n, i); else if (isArrayLike(t))for (o = 0; o < t.length; o++)n.call(i, t[o], o); else for (o in t)t.hasOwnProperty(o) && n.call(i, t[o], o);
    return t
  }

  function i(e, i) {
    var a = [], s = [];
    return r(i, function (e) {
      var r = e.match(o);
      if (r) {
        var i = r[1], u = r[3];
        u || t(i) || (u = n(i)), s.push(i), u && a.push(u)
      } else a.push(e)
    }), {name: e, fileDependencies: a, moduleDependencies: s}
  }

  var o = /^module:([^:]*)(:(.*))?$/, a = /^ng/;
  return {parseNgModule: i}
}), function (e) {
  define("ngDefine", ["angular", "ngParse"], function (t, n) {
    function r(e) {
      return Array.prototype.slice.call(e, 0)
    }

    function i(t, i, o, s) {
      s || (s = o, o = null);
      var u, l, c = n.parseNgModule(i, o || []), p = c.moduleDependencies, f = c.fileDependencies;
      try {
        t.module(i), l = !0
      } catch (d) {
        l = !1
      }
      if (p.length && l)throw new Error("Cannot re-define angular module " + i + " with new dependencies [" + p + "]. Make sure the module is not defined else where or define a sub-module with additional angular module dependencies instead.");
      p.length || !l ? (u = t.module(i, p), a(i, "defined with dependencies", p)) : (u = t.module(i), a(i, "looked up")), define(f, function () {
        var t = r(arguments);
        return t.unshift(u), s.apply(e, t), a(i, "loaded"), u
      })
    }

    var o = function (e, n, r) {
      if (!n)throw new Error("wrong number of arguments, expected name[, dependencies], body");
      i(t, e, n, r)
    };
    void 0 === typeof e || e.ngDefine || (e.ngDefine = o);
    var a = function () {
      var t;
      return Function.prototype.bind && e.console && e.console.log && (t = Function.prototype.bind.call(e.console.log, e.console)), function () {
        if (o.debug && t) {
          var e = r(arguments);
          e.unshift("[ngDefine]"), t.apply(t, e)
        }
      }
    }();
    return o
  })
}(window), define("domReady", [], function () {
  "use strict";
  function e(e) {
    var t;
    for (t = 0; t < e.length; t += 1)e[t](l)
  }

  function t() {
    var t = c;
    u && t.length && (c = [], e(t))
  }

  function n() {
    u || (u = !0, a && clearInterval(a), t())
  }

  function r(e) {
    return u ? e(l) : c.push(e), r
  }

  var i, o, a, s = "undefined" != typeof window && window.document, u = !s, l = s ? document : null, c = [];
  if (s) {
    if (document.addEventListener)document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1); else if (window.attachEvent) {
      window.attachEvent("onload", n), o = document.createElement("div");
      try {
        i = null === window.frameElement
      } catch (p) {
      }
      o.doScroll && i && window.external && (a = setInterval(function () {
        try {
          o.doScroll(), n()
        } catch (e) {
        }
      }, 30))
    }
    "complete" === document.readyState && n()
  }
  return r.version = "2.0.1", r.load = function (e, t, n, i) {
    i.isBuild ? n(null) : r(n)
  }, r
}), define("camunda-admin-ui-deps", function () {
});
//# sourceMappingURL=deps.js
//# sourceMappingURL=deps.js.map
