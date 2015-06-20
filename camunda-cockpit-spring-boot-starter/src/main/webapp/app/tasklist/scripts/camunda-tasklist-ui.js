!function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define("camunda-bpm-sdk-js", [], e); else {
    var n;
    "undefined" != typeof window ? n = window : "undefined" != typeof global ? n = global : "undefined" != typeof self && (n = self), n.CamSDK = e()
  }
}(function () {
  var define, module, exports;
  return function e(n, t, i) {
    function a(s, o) {
      if (!t[s]) {
        if (!n[s]) {
          var l = "function" == typeof require && require;
          if (!o && l)return l(s, !0);
          if (r)return r(s, !0);
          throw new Error("Cannot find module '" + s + "'")
        }
        var c = t[s] = {exports: {}};
        n[s][0].call(c.exports, function (e) {
          var t = n[s][1][e];
          return a(t ? t : e)
        }, c, c.exports, e, n, t, i)
      }
      return t[s].exports
    }

    for (var r = "function" == typeof require && require, s = 0; s < i.length; s++)a(i[s]);
    return a
  }({
    1: [function (_dereq_, module, exports) {
      "use strict";
      var CamundaForm = _dereq_("./../../forms/camunda-form"), angular = window.angular, $ = CamundaForm.$, constants = _dereq_("./../../forms/constants"), CamundaFormAngular = CamundaForm.extend({
        renderForm: function () {
          function e(e, n) {
            var t = $(n);
            if (!t.attr("ng-model")) {
              var i = t.attr(constants.DIRECTIVE_CAM_VARIABLE_NAME);
              i && t.attr("ng-model", i)
            }
          }

          var n = this;
          CamundaForm.prototype.renderForm.apply(this, arguments);
          for (var t = 0; t < this.formFieldHandlers.length; t++) {
            var i = this.formFieldHandlers[t], a = i.selector;
            $(a, n.formElement).each(e)
          }
          var r = n.formElement.injector();
          if (r) {
            var s = n.formElement.scope();
            r.invoke(["$compile", function (e) {
              e(n.formElement)(s)
            }])
          }
        }, executeFormScript: function (script) {
          var injector = this.formElement.injector(), scope = this.formElement.scope();
          !function (camForm, $scope) {
            var inject = function (e) {
              if (!angular.isFunction(e) && !angular.isArray(e))throw new Error("Must call inject(array|fn)");
              injector.instantiate(e, {$scope: scope})
            };
            eval(script)
          }(this, scope)
        }, fireEvent: function () {
          var e = this, n = arguments, t = this.formElement.scope(), i = function () {
            CamundaForm.prototype.fireEvent.apply(e, n)
          }, a = e.formElement.injector();
          a && a.invoke(["$rootScope", function (e) {
            var n = e.$$phase;
            "$apply" !== n && "$digest" !== n ? t.$apply(function () {
              i()
            }) : i()
          }])
        }
      });
      module.exports = CamundaFormAngular
    }, {"./../../forms/camunda-form": 25, "./../../forms/constants": 26}], 2: [function (e, n) {
      "use strict";
      var t = window.angular, i = e("./camunda-form-angular"), a = e("./../../forms/type-util").isType, r = t.module("cam.embedded.forms", []);
      r.directive("camVariableName", ["$rootScope", function (e) {
        return {
          require: "ngModel", link: function (n, t, i, a) {
            t.on("camFormVariableApplied", function (t, i) {
              var r = e.$$phase;
              "$apply" !== r && "$digest" !== r ? n.$apply(function () {
                a.$setViewValue(i)
              }) : a.$setViewValue(i)
            })
          }
        }
      }]), r.directive("camVariableType", [function () {
        return {
          require: "ngModel", link: function (e, n, t, i) {
            var r = function (e) {
              var r = t.camVariableType;
              return i.$setValidity("camVariableType", !0), (e || e === !1 || "Bytes" === r) && (i.$pristine && (i.$pristine = !1, i.$dirty = !0, n.addClass("ng-dirty"), n.removeClass("ng-pristine")), -1 !== ["Boolean", "String", "Bytes"].indexOf(r) || a(e, r) || i.$setValidity("camVariableType", !1), "file" === t.type && "Bytes" === r && n[0].files && n[0].files[0] && n[0].files[0].size > (t.camMaxFilesize || 5e6) && i.$setValidity("camVariableType", !1)), e
            };
            i.$parsers.unshift(r), i.$formatters.push(r), t.$observe("camVariableType", function () {
              return r(i.$viewValue)
            }), n.bind("change", function () {
              r(i.$viewValue), e.$apply()
            })
          }
        }
      }]), n.exports = i
    }, {"./../../forms/type-util": 31, "./camunda-form-angular": 1}], 3: [function (e, n) {
      n.exports = {Client: e("./../api-client"), Form: e("./forms"), utils: e("./../utils")}
    }, {"./../api-client": 6, "./../utils": 33, "./forms": 2}], 4: [function (e, n) {
      "use strict";
      function t() {
      }

      var i = e("./../events"), a = e("./../base-class"), r = a.extend({
        initialize: function () {
          this.http = this.constructor.http
        }
      }, {
        path: "", http: {}, create: function () {
        }, list: function (e, n) {
          "function" == typeof e && (n = e, e = {}), e = e || {}, n = n || t;
          var i = this, a = {count: 0, items: []};
          return this.http.get(this.path + "/count", {
            data: e, done: function (t, r) {
              return t ? (i.trigger("error", t), n(t)) : (a.count = r.count, void i.http.get(i.path, {
                data: e,
                done: function (t, r) {
                  return t ? (i.trigger("error", t), n(t)) : (a.items = r, a.firstResult = parseInt(e.firstResult || 0, 10), a.maxResults = a.firstResult + parseInt(e.maxResults || 10, 10), i.trigger("loaded", a), void n(t, a))
                }
              }))
            }
          })
        }, update: function () {
        }, "delete": function () {
        }
      });
      i.attach(r), n.exports = r
    }, {"./../base-class": 23, "./../events": 24}], 5: [function (e, n) {
      (function (t) {
        "use strict";
        function i(e, n) {
          return function (t, i) {
            return t || !i.ok && !i.noContent ? (t = t || i.error || new Error("The " + i.req.method + " request on " + i.req.url + " failed"), i.body && i.body.message && (t.message = i.body.message), e.trigger("error", t), n(t)) : ("application/hal+json" === i.type && (i.body && 0 !== Object.keys(i.body).length || (i.body = JSON.parse(i.text)), i.body = s.solveHALEmbedded(i.body)), void n(null, i.body ? i.body : i.text ? i.text : ""))
          }
        }

        var a = e("superagent"), r = e("./../events"), s = e("./../utils"), o = function () {
        }, l = function (e) {
          if (e = e || {}, !e.baseUrl)throw new Error("HttpClient needs a `baseUrl` configuration property.");
          r.attach(this), this.config = e
        };
        l.prototype.post = function (e, n) {
          n = n || {};
          var r = n.done || o, s = this, l = this.config.baseUrl + (e ? "/" + e : ""), c = a.post(l);
          if ("undefined" != typeof t)Object.keys(n.fields || {}).forEach(function (e) {
            c.field(e, n.fields[e])
          }), (n.attachments || []).forEach(function (e) {
            c.attach("data", new t(e.content), {filename: e.name})
          }); else if (n.fields || n.attachments)return r(new Error("Multipart request is only supported in node.js environement."));
          c.set("Accept", "application/hal+json, application/json; q=0.5").send(n.data || {}).query(n.query || {}), c.end(i(s, r))
        }, l.prototype.get = function (e, n) {
          var t = this.config.baseUrl + (e ? "/" + e : "");
          return this.load(t, n)
        }, l.prototype.load = function (e, n) {
          n = n || {};
          var t = n.done || o, r = this, s = n.accept || "application/hal+json, application/json; q=0.5", l = a.get(e).set("Accept", s).query(n.data || {});
          l.end(i(r, t))
        }, l.prototype.put = function (e, n) {
          n = n || {};
          var t = n.done || o, r = this, s = this.config.baseUrl + (e ? "/" + e : ""), l = a.put(s).set("Accept", "application/hal+json, application/json; q=0.5").send(n.data || {});
          l.end(i(r, t))
        }, l.prototype.del = function (e, n) {
          n = n || {};
          var t = n.done || o, r = this, s = this.config.baseUrl + (e ? "/" + e : ""), l = a.del(s).set("Accept", "application/hal+json, application/json; q=0.5").send(n.data || {});
          l.end(i(r, t))
        }, l.prototype.options = function (e, n) {
          n = n || {};
          var t = n.done || o, r = this, s = this.config.baseUrl + (e ? "/" + e : ""), l = a("OPTIONS", s).set("Accept", "application/hal+json, application/json; q=0.5");
          l.end(i(r, t))
        }, n.exports = l
      }).call(this, e("buffer").Buffer)
    }, {"./../events": 24, "./../utils": 33, buffer: 34, superagent: 38}], 6: [function (e, n) {
      "use strict";
      function t(e) {
        if (!e)throw new Error("Needs configuration");
        if (!e.apiUri)throw new Error("An apiUri is required");
        i.attach(this), e.engine = e.engine || "default", e.mock = "undefined" != typeof e.mock ? e.mock : !0, e.resources = e.resources || {}, this.HttpClient = e.HttpClient || t.HttpClient, this.baseUrl = e.apiUri, "/" !== this.baseUrl.slice(-1) && (this.baseUrl += "/"), this.baseUrl += "engine/" + e.engine, this.config = e, this.initialize()
      }

      var i = e("./../events");
      t.HttpClient = e("./http-client"), function (n) {
        n.config = {};
        var t = {};
        n.initialize = function () {
          function n(e) {
            i.trigger("error", e)
          }

          t.authorization = e("./resources/authorization"), t.deployment = e("./resources/deployment"), t.filter = e("./resources/filter"), t.history = e("./resources/history"), t["process-definition"] = e("./resources/process-definition"), t["process-instance"] = e("./resources/process-instance"), t.task = e("./resources/task"), t.variable = e("./resources/variable"), t["case-execution"] = e("./resources/case-execution"), t["case-instance"] = e("./resources/case-instance"), t["case-definition"] = e("./resources/case-definition"), t.user = e("./resources/user"), t.group = e("./resources/group"), t.incident = e("./resources/incident"), t.job = e("./resources/job"), t.metrics = e("./resources/metrics");
          var i = this;
          this.http = new this.HttpClient({baseUrl: this.baseUrl});
          var a, r, s, o;
          for (a in t) {
            r = {
              name: a,
              mock: this.config.mock,
              baseUrl: this.baseUrl,
              headers: {}
            }, s = this.config.resources[a] || {};
            for (o in s)r[o] = s[o];
            t[a].http = new this.HttpClient(r), t[a].http.on("error", n)
          }
        }, n.resource = function (e) {
          return t[e]
        }
      }(t.prototype), n.exports = t
    }, {
      "./../events": 24,
      "./http-client": 5,
      "./resources/authorization": 7,
      "./resources/case-definition": 8,
      "./resources/case-execution": 9,
      "./resources/case-instance": 10,
      "./resources/deployment": 11,
      "./resources/filter": 12,
      "./resources/group": 13,
      "./resources/history": 14,
      "./resources/incident": 15,
      "./resources/job": 16,
      "./resources/metrics": 17,
      "./resources/process-definition": 18,
      "./resources/process-instance": 19,
      "./resources/task": 20,
      "./resources/user": 21,
      "./resources/variable": 22
    }], 7: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "authorization", i.list = function (e, n) {
        return this.http.get(this.path, {data: e, done: n})
      }, i.get = function (e, n) {
        return this.http.get(this.path + "/" + e, {done: n})
      }, i.create = function (e, n) {
        return this.http.post(this.path + "/create", {data: e, done: n})
      }, i.update = function (e, n) {
        return this.http.put(this.path + "/" + e.id, {data: e, done: n})
      }, i.save = function (e, n) {
        return i[e.id ? "update" : "create"](e, n)
      }, i["delete"] = function (e, n) {
        return this.http.del(this.path + "/" + e, {done: n})
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 8: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "case-definition", i.list = function (e, n) {
        return this.http.get(this.path, {data: e, done: n})
      }, i.create = function (e, n, t) {
        this.http.post(this.path + "/" + e + "/create", {data: n, done: t})
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 9: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "case-execution", i.list = function (e, n) {
        return this.http.get(this.path, {
          data: e, done: function (e, t) {
            return e ? n(e) : void n(null, t)
          }
        })
      }, i.disable = function (e, n, t) {
        this.http.post(this.path + "/" + e + "/disable", {data: n, done: t})
      }, i.reenable = function (e, n, t) {
        this.http.post(this.path + "/" + e + "/reenable", {data: n, done: t})
      }, i.manualStart = function (e, n, t) {
        this.http.post(this.path + "/" + e + "/manual-start", {data: n, done: t})
      }, i.complete = function (e, n, t) {
        this.http.post(this.path + "/" + e + "/complete", {data: n, done: t})
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 10: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "case-instance", i.list = function (e, n) {
        return this.http.get(this.path, {data: e, done: n})
      }, i.close = function (e, n, t) {
        this.http.post(this.path + "/" + e + "/close", {data: n, done: t})
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 11: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "deployment", i.create = function (e, n) {
        var t = {"deployment-name": e.deploymentName}, i = Array.isArray(e.files) ? e.files : [e.files];
        return e.enableDuplicateFiltering && (t["enable-duplicate-filtering"] = "true"), e.deployChangedOnly && (t["deploy-changed-only"] = "true"), this.http.post(this.path + "/create", {
          data: {},
          fields: t,
          attachments: i,
          done: n
        })
      }, i.list = function () {
        t.list.apply(this, arguments)
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 12: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "filter", i.get = function (e, n) {
        return this.http.get(this.path + "/" + e, {done: n})
      }, i.list = function (e, n) {
        return this.http.get(this.path, {data: e, done: n})
      }, i.getTasks = function (e, n) {
        var t = this.path + "/";
        return "string" == typeof e ? (t = t + e + "/list", e = {}) : (t = t + e.id + "/list", delete e.id), t += "?firstResult=" + (e.firstResult || 0), t += "&maxResults=" + (e.maxResults || 15), this.http.post(t, {
          data: e,
          done: n
        })
      }, i.create = function (e, n) {
        return this.http.post(this.path + "/create", {data: e, done: n})
      }, i.update = function (e, n) {
        return this.http.put(this.path + "/" + e.id, {data: e, done: n})
      }, i.save = function (e, n) {
        return i[e.id ? "update" : "create"](e, n)
      }, i["delete"] = function (e, n) {
        return this.http.del(this.path + "/" + e, {done: n})
      }, i.authorizations = function (e, n) {
        return 1 === arguments.length ? this.http.options(this.path, {done: e}) : this.http.options(this.path + "/" + e, {done: n})
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 13: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "group", i.create = function (e, n) {
        return this.http.post(this.path + "/create", {
          data: e, done: n || function () {
          }
        })
      }, i.count = function (e, n) {
        1 === arguments.length ? (n = e, e = {}) : e = e || {}, this.http.get(this.path + "/count", {
          data: e,
          done: n || function () {
          }
        })
      }, i.get = function (e, n) {
        var t = "string" == typeof e ? e : e.id;
        this.http.get(this.path + "/" + t, {
          data: e, done: n || function () {
          }
        })
      }, i.list = function (e, n) {
        this.http.get(this.path, {
          data: e, done: n || function () {
          }
        })
      }, i.createMember = function (e, n) {
        return this.http.put(this.path + "/" + e.id + "/members/" + e.userId, {
          data: e, done: n || function () {
          }
        })
      }, i.deleteMember = function (e, n) {
        return this.http.del(this.path + "/" + e.id + "/members/" + e.userId, {
          data: e, done: n || function () {
          }
        })
      }, i.update = function (e, n) {
        return this.http.put(this.path + "/" + e.id, {
          data: e, done: n || function () {
          }
        })
      }, i["delete"] = function (e, n) {
        return this.http.del(this.path + "/" + e.id, {
          data: e, done: n || function () {
          }
        })
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 14: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "history", i.userOperation = function (e, n) {
        return arguments.length < 2 && (n = arguments[0], e = {}), this.http.get(this.path + "/user-operation", {
          data: e,
          done: n
        })
      }, i.processInstance = function (e, n) {
        arguments.length < 2 && (n = arguments[0], e = {});
        var t = {}, i = {}, a = ["firstResult", "maxResults"];
        for (var r in e)a.indexOf(r) > -1 ? i[r] = e[r] : t[r] = e[r];
        return this.http.post(this.path + "/process-instance", {data: t, query: i, done: n})
      }, i.processInstanceCount = function (e, n) {
        return arguments.length < 2 && (n = arguments[0], e = {}), this.http.post(this.path + "/process-instance/count", {
          data: e,
          done: n
        })
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 15: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "incident", i.get = function (e, n) {
        this.http.get(this.path, {data: e, done: n})
      }, i.count = function (e, n) {
        this.http.get(this.path + "/count", {data: e, done: n})
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 16: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "job", i.list = function (e, n) {
        var t = this.path;
        return t += "?firstResult=" + (e.firstResult || 0), e.maxResults && (t += "&maxResults=" + e.maxResults), this.http.post(t, {
          data: e,
          done: n
        })
      }, i.setRetries = function (e, n) {
        return this.http.put(this.path + "/" + e.id + "/retries", {data: e, done: n})
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 17: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "metrics", i.sum = function (e, n) {
        var t = this.path + "/" + e.name + "/sum";
        return delete e.name, this.http.get(t, {data: e, done: n})
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 18: [function (e, n) {
      "use strict";
      function t() {
      }

      var i = e("./../abstract-client-resource"), a = i.extend({
        suspend: function (e, n) {
          return "function" == typeof e && (n = e, e = {}), e = e || {}, n = n || t, this.http.post(this.path, {done: n})
        }, stats: function (e) {
          return this.http.post(this.path, {done: e || t})
        }, start: function (e) {
          return this.http.post(this.path, {data: {}, done: e})
        }
      }, {
        path: "process-definition", get: function (e, n) {
          return this.http.get(this.path + "/" + e, {done: n})
        }, getByKey: function (e, n) {
          return this.http.get(this.path + "/key/" + e, {done: n})
        }, list: function () {
          i.list.apply(this, arguments)
        }, formVariables: function (e, n) {
          var t = "";
          if (e.key)t = "key/" + e.key; else {
            if (!e.id)return n(new Error("Process definition task variables needs either a key or an id."));
            t = e.id
          }
          var i = {deserializeValues: e.deserializeValues};
          return e.names && (i.variableNames = (e.names || []).join(",")), this.http.get(this.path + "/" + t + "/form-variables", {
            data: i,
            done: n || function () {
            }
          })
        }, submitForm: function (e, n) {
          var t = "";
          if (e.key)t = "key/" + e.key; else {
            if (!e.id)return n(new Error("Process definition task variables needs either a key or an id."));
            t = e.id
          }
          return this.http.post(this.path + "/" + t + "/submit-form", {
            data: {
              businessKey: e.businessKey,
              variables: e.variables
            }, done: n || function () {
            }
          })
        }, startForm: function (e, n) {
          var i = this.path + "/" + (e.key ? "key/" + e.key : e.id) + "/startForm";
          return this.http.get(i, {done: n || t})
        }, xml: function (e, n) {
          var i = this.path + "/" + (e.id ? e.id : "key/" + e.key) + "/xml";
          return this.http.get(i, {done: n || t})
        }, submit: function (e, n) {
          var t = this.path;
          return t += e.key ? "/key/" + e.key : "/" + e.id, t += "/submit-form", this.http.post(t, {data: e, done: n})
        }, suspend: function (e, n, i) {
          return "function" == typeof n && (i = n, n = {}), n = n || {}, i = i || t, e = Array.isArray(e) ? e : [e], this.http.post(this.path, {done: i})
        }, start: function (e, n) {
          return this.http.post(this.path + "/" + (e.id ? e.id : "key/" + e.key) + "/start", {data: e, done: n})
        }
      });
      n.exports = a
    }, {"./../abstract-client-resource": 4}], 19: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend({}, {
        path: "process-instance", create: function (e, n) {
          return this.http.post(e, n)
        }, list: function () {
          t.list.apply(this, arguments)
        }, modify: function (e, n) {
          this.http.post(this.path + "/" + e.id + "/modification", {
            data: {
              instructions: e.instructions,
              skipCustomListeners: e.skipCustomListeners,
              skipIoMappings: e.skipIoMappings
            }, done: n
          })
        }
      });
      n.exports = i
    }, {"./../abstract-client-resource": 4}], 20: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "task", i.list = function (e, n) {
        return this.http.get(this.path, {
          data: e, done: function (e, t) {
            if (e)return n(e);
            var i = t._embedded.task || t._embedded.tasks, a = t._embedded.processDefinition;
            for (var r in i) {
              var s = i[r];
              s._embedded = s._embedded || {};
              for (var o in a)if (a[o].id === s.processDefinitionId) {
                s._embedded.processDefinition = [a[o]];
                break
              }
            }
            n(null, t)
          }
        })
      }, i.get = function (e, n) {
        return this.http.get(this.path + "/" + e, {done: n})
      }, i.comments = function (e, n) {
        return this.http.get(this.path + "/" + e + "/comment", {done: n})
      }, i.identityLinks = function (e, n) {
        return this.http.get(this.path + "/" + e + "/identity-links", {done: n})
      }, i.identityLinksAdd = function (e, n, t) {
        return this.http.post(this.path + "/" + e + "/identity-links", {data: n, done: t})
      }, i.identityLinksDelete = function (e, n, t) {
        return this.http.post(this.path + "/" + e + "/identity-links/delete", {data: n, done: t})
      }, i.createComment = function (e, n, t) {
        return this.http.post(this.path + "/" + e + "/comment/create", {data: {message: n}, done: t})
      }, i.create = function (e, n) {
        return this.http.post(this.path + "/create", {data: e, done: n})
      }, i.update = function (e, n) {
        return this.http.put(this.path + "/" + e.id, {data: e, done: n})
      }, i.assignee = function (e, n, t) {
        var i = {userId: n};
        return 2 === arguments.length && (e = arguments[0].taskId, i.userId = arguments[0].userId, t = arguments[1]), this.http.post(this.path + "/" + e + "/assignee", {
          data: i,
          done: t
        })
      }, i.delegate = function (e, n, t) {
        var i = {userId: n};
        return 2 === arguments.length && (e = arguments[0].taskId, i.userId = arguments[0].userId, t = arguments[1]), this.http.post(this.path + "/" + e + "/delegate", {
          data: i,
          done: t
        })
      }, i.claim = function (e, n, t) {
        var i = {userId: n};
        return 2 === arguments.length && (e = arguments[0].taskId, i.userId = arguments[0].userId, t = arguments[1]), this.http.post(this.path + "/" + e + "/claim", {
          data: i,
          done: t
        })
      }, i.unclaim = function (e, n) {
        return "string" != typeof e && (e = e.taskId), this.http.post(this.path + "/" + e + "/unclaim", {done: n})
      }, i.submitForm = function (e, n) {
        return e.id ? this.http.post(this.path + "/" + e.id + "/submit-form", {
          data: {variables: e.variables},
          done: n || function () {
          }
        }) : n(new Error("Task submitForm needs a task id."))
      }, i.formVariables = function (e, n) {
        var t = "";
        if (e.key)t = "key/" + e.key; else {
          if (!e.id)return n(new Error("Task variables needs either a key or an id."));
          t = e.id
        }
        var i = {deserializeValues: e.deserializeValues};
        return e.names && (i.variableNames = e.names.join(",")), this.http.get(this.path + "/" + t + "/form-variables", {
          data: i,
          done: n || function () {
          }
        })
      }, i.form = function (e, n) {
        return this.http.get(this.path + "/" + e + "/form", {done: n})
      }, i.localVariable = function (e, n) {
        return this.http.put(this.path + "/" + e.id + "/localVariables/" + e.varId, {data: e, done: n})
      }, i.localVariables = function (e, n) {
        return this.http.get(this.path + "/" + e + "/localVariables", {done: n})
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 21: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "user", i.create = function (e, n) {
        e = e || {};
        var t = ["id", "firstName", "lastName", "password"];
        for (var i in t) {
          var a = t[i];
          if (!e[a])return n(new Error("Missing " + a + " option to create user"))
        }
        var r = {
          profile: {id: e.id, firstName: e.firstName, lastName: e.lastName},
          credentials: {password: e.password}
        };
        return e.email && (r.profile.email = e.email), this.http.post(this.path + "/create", {
          data: r,
          done: n || function () {
          }
        })
      }, i.list = function (e, n) {
        1 === arguments.length ? (n = e, e = {}) : e = e || {}, this.http.get(this.path, {
          data: e,
          done: n || function () {
          }
        })
      }, i.count = function (e, n) {
        1 === arguments.length ? (n = e, e = {}) : e = e || {}, this.http.get(this.path + "/count", {
          data: e,
          done: n || function () {
          }
        })
      }, i.profile = function (e, n) {
        var t = "string" == typeof e ? e : e.id;
        this.http.del(this.path + "/" + t + "/profile", {
          done: n || function () {
          }
        })
      }, i.updateProfile = function (e, n) {
        return e = e || {}, e.id ? void this.http.put(this.path + "/" + e.id + "/profile", {
          data: e,
          done: n || function () {
          }
        }) : n(new Error("Missing id option to update user profile"))
      }, i.updateCredentials = function (e, n) {
        if (e = e || {}, !e.id)return n(new Error("Missing id option to update user credentials"));
        if (!e.password)return n(new Error("Missing password option to update user credentials"));
        var t = {password: e.password};
        e.authenticatedUserPassword && (t.authenticatedUserPassword = e.authenticatedUserPassword), this.http.put(this.path + "/" + e.id + "/credentials", {
          data: t,
          done: n || function () {
          }
        })
      }, i["delete"] = function (e, n) {
        var t = "string" == typeof e ? e : e.id;
        this.http.del(this.path + "/" + t, {
          done: n || function () {
          }
        })
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 22: [function (e, n) {
      "use strict";
      var t = e("./../abstract-client-resource"), i = t.extend();
      i.path = "variable-instance", i.instances = function (e, n) {
        this.http.post(this.path, {data: e, done: n})
      }, n.exports = i
    }, {"./../abstract-client-resource": 4}], 23: [function (e, n) {
      "use strict";
      function t() {
      }

      function i() {
        this.initialize()
      }

      var a = e("./events");
      i.extend = function (e, n) {
        e = e || {}, n = n || {};
        var t, i, a, r, s = this;
        t = e && Object.hasOwnProperty.call(s, "constructor") ? e.constructor : function () {
          return s.apply(this, arguments)
        };
        for (a in s)t[a] = s[a];
        for (a in n)t[a] = n[a];
        i = function () {
          this.constructor = t
        }, i.prototype = s.prototype, t.prototype = new i;
        for (r in e)t.prototype[r] = e[r];
        return t
      }, i.prototype.initialize = t, a.attach(i), n.exports = i
    }, {"./events": 24}], 24: [function (e, n) {
      "use strict";
      function t(e) {
        var n, t = [];
        for (n in e)t.push(e[n]);
        return t
      }

      function i(e) {
        var n, t = !1;
        return function () {
          return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
        }
      }

      function a(e, n) {
        e._events = e._events || {}, e._events[n] = e._events[n] || []
      }

      var r = {};
      r.attach = function (e) {
        e.on = this.on, e.once = this.once, e.off = this.off, e.trigger = this.trigger, e._events = {}
      }, r.on = function (e, n) {
        return a(this, e), this._events[e].push(n), this
      }, r.once = function (e, n) {
        var t = this, a = i(function () {
          t.off(e, i), n.apply(this, arguments)
        });
        return a._callback = n, this.on(e, a)
      }, r.off = function (e, n) {
        if (a(this, e), !n)return delete this._events[e], this;
        var t, i = [];
        for (t in this._events[e])this._events[e][t] !== n && i.push(this._events[e][t]);
        return this._events[e] = i, this
      }, r.trigger = function () {
        var e = t(arguments), n = e.shift();
        a(this, n);
        var i;
        for (i in this._events[n])this._events[n][i](this, e);
        return this
      }, n.exports = r
    }, {}], 25: [function (_dereq_, module, exports) {
      "use strict";
      function CamundaForm(e) {
        if (!e)throw new Error("CamundaForm need to be initialized with options.");
        var n = e.done = e.done || function (e) {
            if (e)throw e
          };
        return this.client = e.client ? e.client : new CamSDK.Client(e.clientConfig || {}), e.taskId || e.processDefinitionId || e.processDefinitionKey ? (this.taskId = e.taskId, this.processDefinitionId = e.processDefinitionId, this.processDefinitionKey = e.processDefinitionKey, this.formElement = e.formElement, this.containerElement = e.containerElement, this.formUrl = e.formUrl, this.formElement || this.containerElement ? this.formElement || this.formUrl ? (this.variableManager = new VariableManager({client: this.client}), this.formFieldHandlers = e.formFieldHandlers || [InputFieldHandler, ChoicesFieldHandler], this.businessKey = null, this.fields = [], this.scripts = [], this.options = e, Events.attach(this), void this.initialize(n)) : n(new Error("Camunda form needs to be intialized with either 'formElement' or 'formUrl'")) : n(new Error("CamundaForm needs to be initilized with either 'formElement' or 'containerElement'"))) : n(new Error("Cannot initialize Taskform: either 'taskId' or 'processDefinitionId' or 'processDefinitionKey' must be provided"))
      }

      var $ = _dereq_("./dom-lib"), VariableManager = _dereq_("./variable-manager"), InputFieldHandler = _dereq_("./controls/input-field-handler"), ChoicesFieldHandler = _dereq_("./controls/choices-field-handler"), BaseClass = _dereq_("./../base-class"), constants = _dereq_("./constants"), Events = _dereq_("./../events");
      CamundaForm.prototype.initializeHandler = function (e) {
        var n = this, t = e.selector;
        $(t, n.formElement).each(function () {
          n.fields.push(new e(this, n.variableManager))
        })
      }, CamundaForm.prototype.initialize = function (e) {
        e = e || function (e) {
            if (e)throw e
          };
        var n = this;
        if (this.formUrl)this.client.http.load(this.formUrl, {
          accept: "*/*", done: function (t, i) {
            if (t)return e(t);
            try {
              n.renderForm(i), n.initializeForm(e)
            } catch (a) {
              e(a)
            }
          }, data: {noCache: Date.now()}
        }); else try {
          this.initializeForm(e)
        } catch (t) {
          e(t)
        }
      }, CamundaForm.prototype.renderForm = function (e) {
        $(this.containerElement).html("").append('<div class="injected-form-wrapper">' + e + "</div>");
        var n = this.formElement = $("form", this.containerElement);
        if (1 !== n.length)throw new Error("Form must provide exaclty one element <form ..>");
        n.attr("name") || n.attr("name", "$$camForm")
      }, CamundaForm.prototype.initializeForm = function (e) {
        var n = this;
        this.initializeFormScripts(), this.initializeFieldHandlers(), this.executeFormScripts(), this.fireEvent("form-loaded"), this.fetchVariables(function (t, i) {
          if (t)throw t;
          n.mergeVariables(i), n.storeOriginalValues(i), n.fireEvent("variables-fetched"), n.restore(), n.fireEvent("variables-restored"), n.applyVariables(), n.fireEvent("variables-applied"), e(null, n)
        })
      }, CamundaForm.prototype.initializeFieldHandlers = function () {
        for (var e in this.formFieldHandlers)this.initializeHandler(this.formFieldHandlers[e])
      }, CamundaForm.prototype.initializeFormScripts = function () {
        for (var e = $("script[" + constants.DIRECTIVE_CAM_SCRIPT + "]", this.formElement), n = 0; n < e.length; n++)this.scripts.push(e[n].text)
      }, CamundaForm.prototype.executeFormScripts = function () {
        for (var e = 0; e < this.scripts.length; e++)this.executeFormScript(this.scripts[e])
      }, CamundaForm.prototype.executeFormScript = function (script) {
        !function (camForm) {
          eval(script)
        }(this)
      }, CamundaForm.prototype.store = function (e) {
        var n = this.taskId || this.processDefinitionId || this.caseInstanceId;
        if (!n) {
          if ("function" == typeof e)return e(new Error("Cannot determine the storage ID"));
          throw new Error("Cannot determine the storage ID")
        }
        if (this.storePrevented = !1, this.fireEvent("store"), !this.storePrevented) {
          try {
            this.retrieveVariables();
            var t = {date: Date.now(), vars: {}};
            for (var i in this.variableManager.variables)"Bytes" !== this.variableManager.variables[i].type && (t.vars[i] = this.variableManager.variables[i].value);
            localStorage.setItem("camForm:" + n, JSON.stringify(t))
          } catch (a) {
            if ("function" == typeof e)return e(a);
            throw a
          }
          this.fireEvent("variables-stored"), "function" == typeof e && e()
        }
      }, CamundaForm.prototype.isRestorable = function () {
        var e = this.taskId || this.processDefinitionId || this.caseInstanceId;
        if (!e)throw new Error("Cannot determine the storage ID");
        if (!localStorage.getItem("camForm:" + e))return !1;
        var n = localStorage.getItem("camForm:" + e);
        try {
          n = JSON.parse(n)
        } catch (t) {
          return !1
        }
        return n && Object.keys(n).length ? !0 : !1
      }, CamundaForm.prototype.restore = function (e) {
        var n, t = this.variableManager.variables, i = this.taskId || this.processDefinitionId || this.caseDefinitionId;
        if (!i) {
          if ("function" == typeof e)return e(new Error("Cannot determine the storage ID"));
          throw new Error("Cannot determine the storage ID")
        }
        if (this.isRestorable()) {
          try {
            n = localStorage.getItem("camForm:" + i), n = JSON.parse(n).vars
          } catch (a) {
            if ("function" == typeof e)return e(a);
            throw a
          }
          for (var r in n)t[r] ? t[r].value = n[r] : t[r] = {name: r, value: n[r]};
          "function" == typeof e && e()
        } else if ("function" == typeof e)return e()
      }, CamundaForm.prototype.submit = function (e) {
        var n = this.taskId || this.processDefinitionId;
        if (this.submitPrevented = !1, this.fireEvent("submit"), !this.submitPrevented) {
          try {
            this.retrieveVariables()
          } catch (t) {
            return e(t)
          }
          var i = this;
          this.transformFiles(function () {
            localStorage.removeItem("camForm:" + n), i.submitVariables(function (n, t) {
              return n ? (i.fireEvent("submit-failed", n), e(n)) : (i.fireEvent("submit-success"), void e(null, t))
            })
          })
        }
      }, CamundaForm.prototype.transformFiles = function (e) {
        var n = this, t = 1, i = function () {
          0 === --t && e()
        }, a = function (e) {
          if (0 === e)return "0 Byte";
          var n = 1e3, t = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(e) / Math.log(n));
          return (e / Math.pow(n, i)).toPrecision(3) + " " + t[i]
        };
        for (var r in this.fields) {
          var s = this.fields[r].element[0];
          if ("file" === s.getAttribute("type"))if ("function" == typeof FileReader && s.files.length > 0) {
            if (s.files[0].size > (parseInt(s.getAttribute("cam-max-filesize"), 10) || 5e6))throw new Error("Maximum file size of " + a(parseInt(s.getAttribute("cam-max-filesize"), 10) || 5e6) + " exceeded.");
            var o = new FileReader;
            o.onloadend = function (e) {
              return function (t) {
                for (var a = "", r = new Uint8Array(t.target.result), s = r.byteLength, o = 0; s > o; o++)a += String.fromCharCode(r[o]);
                n.variableManager.variables[n.fields[e].variableName].value = btoa(a), i()
              }
            }(r), o.readAsArrayBuffer(s.files[0]), t++
          } else n.variableManager.variables[n.fields[r].variableName].value = null
        }
        i()
      }, CamundaForm.prototype.fetchVariables = function (e) {
        e = e || function () {
          };
        var n = this.variableManager.variableNames();
        if (n.length) {
          var t = {names: n, deserializeValues: !1};
          this.taskId ? (t.id = this.taskId, this.client.resource("task").formVariables(t, e)) : (t.id = this.processDefinitionId, t.key = this.processDefinitionKey, this.client.resource("process-definition").formVariables(t, e))
        } else e()
      }, CamundaForm.prototype.submitVariables = function (e) {
        e = e || function () {
          };
        var n = this.variableManager, t = n.variables, i = {};
        for (var a in t)if (n.isDirty(a)) {
          var r = t[a].value;
          n.isJsonVariable(a) && (r = JSON.stringify(r)), i[a] = {value: r, type: t[a].type, valueInfo: t[a].valueInfo}
        }
        var s = {variables: i};
        if (this.taskId)s.id = this.taskId, this.client.resource("task").submitForm(s, e); else {
          var o = this.businessKey || this.formElement.find('input[type="text"][cam-business-key]').val();
          o && (s.businessKey = o), s.id = this.processDefinitionId, s.key = this.processDefinitionKey, this.client.resource("process-definition").submitForm(s, e)
        }
      }, CamundaForm.prototype.storeOriginalValues = function (e) {
        for (var n in e)this.variableManager.setOriginalValue(n, e[n].value)
      }, CamundaForm.prototype.mergeVariables = function (e) {
        var n = this.variableManager.variables;
        for (var t in e) {
          if (n[t])for (var i in e[t])n[t][i] = n[t][i] || e[t][i]; else n[t] = e[t];
          this.variableManager.isJsonVariable(t) && (n[t].value = JSON.parse(e[t].value)), this.variableManager.isVariablesFetched = !0
        }
      }, CamundaForm.prototype.applyVariables = function () {
        for (var e in this.fields)this.fields[e].applyValue()
      }, CamundaForm.prototype.retrieveVariables = function () {
        for (var e in this.fields)this.fields[e].getValue()
      }, CamundaForm.prototype.fireEvent = function (e, n) {
        this.trigger(e, n)
      }, CamundaForm.$ = $, CamundaForm.VariableManager = VariableManager, CamundaForm.fields = {}, CamundaForm.fields.InputFieldHandler = InputFieldHandler, CamundaForm.fields.ChoicesFieldHandler = ChoicesFieldHandler, CamundaForm.cleanLocalStorage = function (e) {
        for (var n = 0; n < localStorage.length; n++) {
          var t = localStorage.key(n);
          if (0 === t.indexOf("camForm:")) {
            var i = JSON.parse(localStorage.getItem(t));
            i.date < e && (localStorage.removeItem(t), n--)
          }
        }
      }, CamundaForm.extend = BaseClass.extend, module.exports = CamundaForm
    }, {
      "./../base-class": 23,
      "./../events": 24,
      "./constants": 26,
      "./controls/choices-field-handler": 28,
      "./controls/input-field-handler": 29,
      "./dom-lib": 30,
      "./variable-manager": 32
    }], 26: [function (e, n) {
      "use strict";
      n.exports = {
        DIRECTIVE_CAM_FORM: "cam-form",
        DIRECTIVE_CAM_VARIABLE_NAME: "cam-variable-name",
        DIRECTIVE_CAM_VARIABLE_TYPE: "cam-variable-type",
        DIRECTIVE_CAM_CHOICES: "cam-choices",
        DIRECTIVE_CAM_SCRIPT: "cam-script"
      }
    }, {}], 27: [function (e, n) {
      "use strict";
      function t() {
      }

      function i(e, n) {
        this.element = r(e), this.variableManager = n, this.variableName = null, this.initialize()
      }

      var a = e("../../base-class"), r = e("./../dom-lib");
      i.selector = null, i.extend = a.extend, i.prototype.initialize = t, i.prototype.applyValue = t, i.prototype.getValue = t, n.exports = i
    }, {"../../base-class": 23, "./../dom-lib": 30}], 28: [function (e, n) {
      "use strict";
      var t = e("./../constants"), i = e("./abstract-form-field"), a = e("./../dom-lib"), r = i.extend({
        initialize: function () {
          var e = this.variableName = this.element.attr(t.DIRECTIVE_CAM_VARIABLE_NAME), n = this.variableType = this.element.attr(t.DIRECTIVE_CAM_VARIABLE_TYPE), i = this.choicesVariableName = this.element.attr(t.DIRECTIVE_CAM_CHOICES);
          this.variableManager.createVariable({
            name: e,
            type: n,
            value: this.element.val() || null
          }), i && this.variableManager.fetchVariable(i), this.originalValue = this.element.val() || null, this.previousValue = this.originalValue, this.variableName = e
        }, applyValue: function () {
          var e = this.element[0].selectedIndex;
          if (this.choicesVariableName) {
            var n = this.variableManager.variableValue(this.choicesVariableName);
            if (n)if (n instanceof Array)for (var t = 0; t < n.length; t++) {
              var i = n[t];
              this.element.find('option[text="' + i + '"]').length || this.element.append(a("<option>", {
                value: i,
                text: i
              }))
            } else for (var r in n)this.element.find('option[value="' + r + '"]').length || this.element.append(a("<option>", {
              value: r,
              text: n[r]
            }))
          }
          this.element[0].selectedIndex = e, this.previousValue = this.element.val() || "";
          var s = this.variableManager.variableValue(this.variableName);
          return s !== this.previousValue && (this.element.val(s), this.element.trigger("camFormVariableApplied", s)), this
        }, getValue: function () {
          var e, n = this.element.prop("multiple");
          return n ? (e = [], this.element.find("option:selected").each(function () {
            e.push(a(this).val())
          })) : e = this.element.find("option:selected").attr("value"), this.variableManager.variableValue(this.variableName, e), e
        }
      }, {selector: "select[" + t.DIRECTIVE_CAM_VARIABLE_NAME + "]"});
      n.exports = r
    }, {"./../constants": 26, "./../dom-lib": 30, "./abstract-form-field": 27}], 29: [function (e, n) {
      "use strict";
      var t = e("./../constants"), i = e("./abstract-form-field"), a = (e("./../dom-lib"), function (e) {
        return "checkbox" === e.attr("type") && "Boolean" === e.attr(t.DIRECTIVE_CAM_VARIABLE_TYPE)
      }), r = i.extend({
        initialize: function () {
          var e = this.element.attr(t.DIRECTIVE_CAM_VARIABLE_NAME), n = this.element.attr(t.DIRECTIVE_CAM_VARIABLE_TYPE);
          this.variableManager.createVariable({
            name: e,
            type: n
          }), this.originalValue = this.element.val(), this.previousValue = this.originalValue, this.variableName = e, this.getValue()
        }, applyValue: function () {
          this.previousValue = this.getValueFromHtmlControl() || "";
          var e = this.variableManager.variableValue(this.variableName);
          return e !== this.previousValue && (this.applyValueToHtmlControl(e), this.element.trigger("camFormVariableApplied", e)), this
        }, getValue: function () {
          var e = this.getValueFromHtmlControl();
          return this.variableManager.variableValue(this.variableName, e), e
        }, getValueFromHtmlControl: function () {
          return a(this.element) ? this.element.prop("checked") : this.element.val()
        }, applyValueToHtmlControl: function (e) {
          a(this.element) ? this.element.prop("checked", e) : "file" !== this.element[0].type && this.element.val(e)
        }
      }, {selector: "input[" + t.DIRECTIVE_CAM_VARIABLE_NAME + "],textarea[" + t.DIRECTIVE_CAM_VARIABLE_NAME + "]"});
      n.exports = r
    }, {"./../constants": 26, "./../dom-lib": 30, "./abstract-form-field": 27}], 30: [function (e, n) {
      (function (e) {
        "use strict";
        !function (n) {
          n("undefined" != typeof window ? window : e)
        }(function (e) {
          e = e || {}, n.exports = e.jQuery || (e.angular ? e.angular.element : !1) || e.Zepto
        })
      }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}], 31: [function (e, n) {
      "use strict";
      var t = /^-?[\d]+$/, i = /^(0|(-?(((0|[1-9]\d*)\.\d+)|([1-9]\d*))))([eE][-+]?[0-9]+)?$/, a = /^(true|false)$/, r = /^(\d{2}|\d{4})(?:\-)([0]{1}\d{1}|[1]{1}[0-2]{1})(?:\-)([0-2]{1}\d{1}|[3]{1}[0-1]{1})T(?:\s)?([0-1]{1}\d{1}|[2]{1}[0-3]{1}):([0-5]{1}\d{1}):([0-5]{1}\d{1})?$/, s = function (e, n) {
        switch (n) {
          case"Integer":
          case"Long":
          case"Short":
            return t.test(e);
          case"Float":
          case"Double":
            return i.test(e);
          case"Boolean":
            return a.test(e);
          case"Date":
            return r.test(e)
        }
      }, o = function (e, n) {
        if ("string" == typeof e && (e = e.trim()), "String" === n || "Bytes" === n)return e;
        if (!s(e, n))throw new Error("Value '" + e + "' is not of type " + n);
        switch (n) {
          case"Integer":
          case"Long":
          case"Short":
            return parseInt(e, 10);
          case"Float":
          case"Double":
            return parseFloat(e);
          case"Boolean":
            return "true" === e;
          case"Date":
            return e
        }
      };
      n.exports = {convertToType: o, isType: s}
    }, {}], 32: [function (e, n) {
      "use strict";
      function t() {
        this.variables = {}, this.isVariablesFetched = !1
      }

      var i = e("./type-util").convertToType;
      t.prototype.fetchVariable = function (e) {
        if (this.isVariablesFetched)throw new Error("Illegal State: cannot call fetchVariable(), variables already fetched.");
        this.createVariable({name: e})
      }, t.prototype.createVariable = function (e) {
        if (this.variables[e.name])throw new Error("Cannot add variable with name " + e.name + ": already exists.");
        this.variables[e.name] = e
      }, t.prototype.destroyVariable = function (e) {
        if (!this.variables[e])throw new Error("Cannot remove variable with name " + e + ": variable does not exist.");
        delete this.variables[e]
      }, t.prototype.setOriginalValue = function (e, n) {
        if (!this.variables[e])throw new Error("Cannot set original value of variable with name " + e + ": variable does not exist.");
        this.variables[e].originalValue = n
      }, t.prototype.variable = function (e) {
        return this.variables[e]
      }, t.prototype.variableValue = function (e, n) {
        var t = this.variable(e);
        return "undefined" == typeof n || null === n ? n = null : "" === n && "String" !== t.type ? n = null : "string" == typeof n && "String" !== t.type && (n = i(n, t.type)), 2 === arguments.length && (t.value = n), t.value
      }, t.prototype.isDirty = function (e) {
        var n = this.variable(e);
        return this.isJsonVariable(e) ? n.originalValue !== JSON.stringify(n.value) : n.originalValue !== n.value || "Object" === n.type
      }, t.prototype.isJsonVariable = function (e) {
        var n = this.variable(e), t = n.type, i = ["Object", "json", "Json"], a = i.indexOf(t);
        return 0 === a ? -1 !== n.valueInfo.serializationDataFormat.indexOf("application/json") : -1 !== a
      }, t.prototype.variableNames = function () {
        return Object.keys(this.variables)
      }, n.exports = t
    }, {"./type-util": 31}], 33: [function (e, n) {
      "use strict";
      function t(e, n, t) {
        if (t = t || function () {
            }, !e.length)return t();
        var i = 0, a = function () {
          n(e[i], function (n) {
            n ? (t(n), t = function () {
            }) : (i += 1, i >= e.length ? t() : a())
          })
        };
        a()
      }

      var i = n.exports = {typeUtils: e("./forms/type-util")};
      i.solveHALEmbedded = function (e) {
        function n(n) {
          if ("Id" !== n.slice(-2))return !1;
          var t = n.slice(0, -2), i = e._embedded;
          return !(!i[t] || !i[t].length)
        }

        function t(e) {
          var t = Object.keys(e);
          for (var i in t)"_" !== t[i][0] && n(t[i]) || t.splice(i, 1);
          return t
        }

        var i = Object.keys(e._embedded || {});
        for (var a in i) {
          var r = i[a];
          for (var s in e._embedded[r]) {
            e._embedded[r][s]._embedded = e._embedded[r][s]._embedded || {};
            var o = t(e._embedded[r][s]);
            for (var l in o) {
              var c = o[l];
              if (e._embedded[r][s][c]) {
                var u = e._embedded[c.slice(0, -2)];
                for (var d in u)u[d].id === e._embedded[r][s][c] && (e._embedded[r][s]._embedded[c.slice(0, -2)] = [u[d]])
              }
            }
          }
        }
        return e
      }, i.series = function (e, n) {
        n = n || function () {
          };
        var i = {};
        t(Object.keys(e), function (n, t) {
          e[n](function (e) {
            var a = Array.prototype.slice.call(arguments, 1);
            a.length <= 1 && (a = a[0]), i[n] = a, t(e)
          })
        }, function (e) {
          n(e, i)
        })
      }
    }, {"./forms/type-util": 31}], 34: [function (e, n, t) {
      function i(e, n, t) {
        if (!(this instanceof i))return new i(e, n, t);
        var a, r = typeof e;
        if ("number" === r)a = e > 0 ? e >>> 0 : 0; else if ("string" === r)"base64" === n && (e = I(e)), a = i.byteLength(e, n); else {
          if ("object" !== r || null === e)throw new TypeError("must start with number, buffer, array or string");
          "Buffer" === e.type && $(e.data) && (e = e.data), a = +e.length > 0 ? Math.floor(+e.length) : 0
        }
        if (this.length > N)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + N.toString(16) + " bytes");
        var s;
        i.TYPED_ARRAY_SUPPORT ? s = i._augment(new Uint8Array(a)) : (s = this, s.length = a, s._isBuffer = !0);
        var o;
        if (i.TYPED_ARRAY_SUPPORT && "number" == typeof e.byteLength)s._set(e); else if (_(e))if (i.isBuffer(e))for (o = 0; a > o; o++)s[o] = e.readUInt8(o); else for (o = 0; a > o; o++)s[o] = (e[o] % 256 + 256) % 256; else if ("string" === r)s.write(e, 0, n); else if ("number" === r && !i.TYPED_ARRAY_SUPPORT && !t)for (o = 0; a > o; o++)s[o] = 0;
        return s
      }

      function a(e, n, t, i) {
        t = Number(t) || 0;
        var a = e.length - t;
        i ? (i = Number(i), i > a && (i = a)) : i = a;
        var r = n.length;
        if (r % 2 !== 0)throw new Error("Invalid hex string");
        i > r / 2 && (i = r / 2);
        for (var s = 0; i > s; s++) {
          var o = parseInt(n.substr(2 * s, 2), 16);
          if (isNaN(o))throw new Error("Invalid hex string");
          e[t + s] = o
        }
        return s
      }

      function r(e, n, t, i) {
        var a = S(T(n), e, t, i);
        return a
      }

      function s(e, n, t, i) {
        var a = S(x(n), e, t, i);
        return a
      }

      function o(e, n, t, i) {
        return s(e, n, t, i)
      }

      function l(e, n, t, i) {
        var a = S(R(n), e, t, i);
        return a
      }

      function c(e, n, t, i) {
        var a = S(F(n), e, t, i, 2);
        return a
      }

      function u(e, n, t) {
        return L.fromByteArray(0 === n && t === e.length ? e : e.slice(n, t))
      }

      function d(e, n, t) {
        var i = "", a = "";
        t = Math.min(e.length, t);
        for (var r = n; t > r; r++)e[r] <= 127 ? (i += C(a) + String.fromCharCode(e[r]), a = "") : a += "%" + e[r].toString(16);
        return i + C(a)
      }

      function p(e, n, t) {
        var i = "";
        t = Math.min(e.length, t);
        for (var a = n; t > a; a++)i += String.fromCharCode(e[a]);
        return i
      }

      function f(e, n, t) {
        return p(e, n, t)
      }

      function m(e, n, t) {
        var i = e.length;
        (!n || 0 > n) && (n = 0), (!t || 0 > t || t > i) && (t = i);
        for (var a = "", r = n; t > r; r++)a += D(e[r]);
        return a
      }

      function h(e, n, t) {
        for (var i = e.slice(n, t), a = "", r = 0; r < i.length; r += 2)a += String.fromCharCode(i[r] + 256 * i[r + 1]);
        return a
      }

      function v(e, n, t) {
        if (e % 1 !== 0 || 0 > e)throw new RangeError("offset is not uint");
        if (e + n > t)throw new RangeError("Trying to access beyond buffer length")
      }

      function g(e, n, t, a, r, s) {
        if (!i.isBuffer(e))throw new TypeError("buffer must be a Buffer instance");
        if (n > r || s > n)throw new TypeError("value is out of bounds");
        if (t + a > e.length)throw new TypeError("index out of range")
      }

      function b(e, n, t, i) {
        0 > n && (n = 65535 + n + 1);
        for (var a = 0, r = Math.min(e.length - t, 2); r > a; a++)e[t + a] = (n & 255 << 8 * (i ? a : 1 - a)) >>> 8 * (i ? a : 1 - a)
      }

      function y(e, n, t, i) {
        0 > n && (n = 4294967295 + n + 1);
        for (var a = 0, r = Math.min(e.length - t, 4); r > a; a++)e[t + a] = n >>> 8 * (i ? a : 3 - a) & 255
      }

      function k(e, n, t, i, a, r) {
        if (n > a || r > n)throw new TypeError("value is out of bounds");
        if (t + i > e.length)throw new TypeError("index out of range")
      }

      function E(e, n, t, i, a) {
        return a || k(e, n, t, 4, 3.4028234663852886e38, -3.4028234663852886e38), P.write(e, n, t, i, 23, 4), t + 4
      }

      function w(e, n, t, i, a) {
        return a || k(e, n, t, 8, 1.7976931348623157e308, -1.7976931348623157e308), P.write(e, n, t, i, 52, 8), t + 8
      }

      function I(e) {
        for (e = A(e).replace(V, ""); e.length % 4 !== 0;)e += "=";
        return e
      }

      function A(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
      }

      function _(e) {
        return $(e) || i.isBuffer(e) || e && "object" == typeof e && "number" == typeof e.length
      }

      function D(e) {
        return 16 > e ? "0" + e.toString(16) : e.toString(16)
      }

      function T(e) {
        for (var n = [], t = 0; t < e.length; t++) {
          var i = e.charCodeAt(t);
          if (127 >= i)n.push(i); else {
            var a = t;
            i >= 55296 && 57343 >= i && t++;
            for (var r = encodeURIComponent(e.slice(a, t + 1)).substr(1).split("%"), s = 0; s < r.length; s++)n.push(parseInt(r[s], 16))
          }
        }
        return n
      }

      function x(e) {
        for (var n = [], t = 0; t < e.length; t++)n.push(255 & e.charCodeAt(t));
        return n
      }

      function F(e) {
        for (var n, t, i, a = [], r = 0; r < e.length; r++)n = e.charCodeAt(r), t = n >> 8, i = n % 256, a.push(i), a.push(t);
        return a
      }

      function R(e) {
        return L.toByteArray(e)
      }

      function S(e, n, t, i, a) {
        a && (i -= i % a);
        for (var r = 0; i > r && !(r + t >= n.length || r >= e.length); r++)n[r + t] = e[r];
        return r
      }

      function C(e) {
        try {
          return decodeURIComponent(e)
        } catch (n) {
          return String.fromCharCode(65533)
        }
      }

      var L = e("base64-js"), P = e("ieee754"), $ = e("is-array");
      t.Buffer = i, t.SlowBuffer = i, t.INSPECT_MAX_BYTES = 50, i.poolSize = 8192;
      var N = 1073741823;
      i.TYPED_ARRAY_SUPPORT = function () {
        try {
          var e = new ArrayBuffer(0), n = new Uint8Array(e);
          return n.foo = function () {
            return 42
          }, 42 === n.foo() && "function" == typeof n.subarray && 0 === new Uint8Array(1).subarray(1, 1).byteLength
        } catch (t) {
          return !1
        }
      }(), i.isBuffer = function (e) {
        return !(null == e || !e._isBuffer)
      }, i.compare = function (e, n) {
        if (!i.isBuffer(e) || !i.isBuffer(n))throw new TypeError("Arguments must be Buffers");
        for (var t = e.length, a = n.length, r = 0, s = Math.min(t, a); s > r && e[r] === n[r]; r++);
        return r !== s && (t = e[r], a = n[r]), a > t ? -1 : t > a ? 1 : 0
      }, i.isEncoding = function (e) {
        switch (String(e).toLowerCase()) {
          case"hex":
          case"utf8":
          case"utf-8":
          case"ascii":
          case"binary":
          case"base64":
          case"raw":
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
            return !0;
          default:
            return !1
        }
      }, i.concat = function (e, n) {
        if (!$(e))throw new TypeError("Usage: Buffer.concat(list[, length])");
        if (0 === e.length)return new i(0);
        if (1 === e.length)return e[0];
        var t;
        if (void 0 === n)for (n = 0, t = 0; t < e.length; t++)n += e[t].length;
        var a = new i(n), r = 0;
        for (t = 0; t < e.length; t++) {
          var s = e[t];
          s.copy(a, r), r += s.length
        }
        return a
      }, i.byteLength = function (e, n) {
        var t;
        switch (e += "", n || "utf8") {
          case"ascii":
          case"binary":
          case"raw":
            t = e.length;
            break;
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
            t = 2 * e.length;
            break;
          case"hex":
            t = e.length >>> 1;
            break;
          case"utf8":
          case"utf-8":
            t = T(e).length;
            break;
          case"base64":
            t = R(e).length;
            break;
          default:
            t = e.length
        }
        return t
      }, i.prototype.length = void 0, i.prototype.parent = void 0, i.prototype.toString = function (e, n, t) {
        var i = !1;
        if (n >>>= 0, t = void 0 === t || 1 / 0 === t ? this.length : t >>> 0, e || (e = "utf8"), 0 > n && (n = 0), t > this.length && (t = this.length), n >= t)return "";
        for (; ;)switch (e) {
          case"hex":
            return m(this, n, t);
          case"utf8":
          case"utf-8":
            return d(this, n, t);
          case"ascii":
            return p(this, n, t);
          case"binary":
            return f(this, n, t);
          case"base64":
            return u(this, n, t);
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
            return h(this, n, t);
          default:
            if (i)throw new TypeError("Unknown encoding: " + e);
            e = (e + "").toLowerCase(), i = !0
        }
      }, i.prototype.equals = function (e) {
        if (!i.isBuffer(e))throw new TypeError("Argument must be a Buffer");
        return 0 === i.compare(this, e)
      }, i.prototype.inspect = function () {
        var e = "", n = t.INSPECT_MAX_BYTES;
        return this.length > 0 && (e = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (e += " ... ")), "<Buffer " + e + ">"
      }, i.prototype.compare = function (e) {
        if (!i.isBuffer(e))throw new TypeError("Argument must be a Buffer");
        return i.compare(this, e)
      }, i.prototype.get = function (e) {
        return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e)
      }, i.prototype.set = function (e, n) {
        return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e, n)
      }, i.prototype.write = function (e, n, t, i) {
        if (isFinite(n))isFinite(t) || (i = t, t = void 0); else {
          var u = i;
          i = n, n = t, t = u
        }
        n = Number(n) || 0;
        var d = this.length - n;
        t ? (t = Number(t), t > d && (t = d)) : t = d, i = String(i || "utf8").toLowerCase();
        var p;
        switch (i) {
          case"hex":
            p = a(this, e, n, t);
            break;
          case"utf8":
          case"utf-8":
            p = r(this, e, n, t);
            break;
          case"ascii":
            p = s(this, e, n, t);
            break;
          case"binary":
            p = o(this, e, n, t);
            break;
          case"base64":
            p = l(this, e, n, t);
            break;
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
            p = c(this, e, n, t);
            break;
          default:
            throw new TypeError("Unknown encoding: " + i)
        }
        return p
      }, i.prototype.toJSON = function () {
        return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
      }, i.prototype.slice = function (e, n) {
        var t = this.length;
        if (e = ~~e, n = void 0 === n ? t : ~~n, 0 > e ? (e += t, 0 > e && (e = 0)) : e > t && (e = t), 0 > n ? (n += t, 0 > n && (n = 0)) : n > t && (n = t), e > n && (n = e), i.TYPED_ARRAY_SUPPORT)return i._augment(this.subarray(e, n));
        for (var a = n - e, r = new i(a, void 0, !0), s = 0; a > s; s++)r[s] = this[s + e];
        return r
      }, i.prototype.readUInt8 = function (e, n) {
        return n || v(e, 1, this.length), this[e]
      }, i.prototype.readUInt16LE = function (e, n) {
        return n || v(e, 2, this.length), this[e] | this[e + 1] << 8
      }, i.prototype.readUInt16BE = function (e, n) {
        return n || v(e, 2, this.length), this[e] << 8 | this[e + 1]
      }, i.prototype.readUInt32LE = function (e, n) {
        return n || v(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
      }, i.prototype.readUInt32BE = function (e, n) {
        return n || v(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
      }, i.prototype.readInt8 = function (e, n) {
        return n || v(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
      }, i.prototype.readInt16LE = function (e, n) {
        n || v(e, 2, this.length);
        var t = this[e] | this[e + 1] << 8;
        return 32768 & t ? 4294901760 | t : t
      }, i.prototype.readInt16BE = function (e, n) {
        n || v(e, 2, this.length);
        var t = this[e + 1] | this[e] << 8;
        return 32768 & t ? 4294901760 | t : t
      }, i.prototype.readInt32LE = function (e, n) {
        return n || v(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
      }, i.prototype.readInt32BE = function (e, n) {
        return n || v(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
      }, i.prototype.readFloatLE = function (e, n) {
        return n || v(e, 4, this.length), P.read(this, e, !0, 23, 4)
      }, i.prototype.readFloatBE = function (e, n) {
        return n || v(e, 4, this.length), P.read(this, e, !1, 23, 4)
      }, i.prototype.readDoubleLE = function (e, n) {
        return n || v(e, 8, this.length), P.read(this, e, !0, 52, 8)
      }, i.prototype.readDoubleBE = function (e, n) {
        return n || v(e, 8, this.length), P.read(this, e, !1, 52, 8)
      }, i.prototype.writeUInt8 = function (e, n, t) {
        return e = +e, n >>>= 0, t || g(this, e, n, 1, 255, 0), i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[n] = e, n + 1
      }, i.prototype.writeUInt16LE = function (e, n, t) {
        return e = +e, n >>>= 0, t || g(this, e, n, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[n] = e, this[n + 1] = e >>> 8) : b(this, e, n, !0), n + 2
      }, i.prototype.writeUInt16BE = function (e, n, t) {
        return e = +e, n >>>= 0, t || g(this, e, n, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[n] = e >>> 8, this[n + 1] = e) : b(this, e, n, !1), n + 2
      }, i.prototype.writeUInt32LE = function (e, n, t) {
        return e = +e, n >>>= 0, t || g(this, e, n, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[n + 3] = e >>> 24, this[n + 2] = e >>> 16, this[n + 1] = e >>> 8, this[n] = e) : y(this, e, n, !0), n + 4
      }, i.prototype.writeUInt32BE = function (e, n, t) {
        return e = +e, n >>>= 0, t || g(this, e, n, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[n] = e >>> 24, this[n + 1] = e >>> 16, this[n + 2] = e >>> 8, this[n + 3] = e) : y(this, e, n, !1), n + 4
      }, i.prototype.writeInt8 = function (e, n, t) {
        return e = +e, n >>>= 0, t || g(this, e, n, 1, 127, -128), i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 0 > e && (e = 255 + e + 1), this[n] = e, n + 1
      }, i.prototype.writeInt16LE = function (e, n, t) {
        return e = +e, n >>>= 0, t || g(this, e, n, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[n] = e, this[n + 1] = e >>> 8) : b(this, e, n, !0), n + 2
      }, i.prototype.writeInt16BE = function (e, n, t) {
        return e = +e, n >>>= 0, t || g(this, e, n, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[n] = e >>> 8, this[n + 1] = e) : b(this, e, n, !1), n + 2
      }, i.prototype.writeInt32LE = function (e, n, t) {
        return e = +e, n >>>= 0, t || g(this, e, n, 4, 2147483647, -2147483648), i.TYPED_ARRAY_SUPPORT ? (this[n] = e, this[n + 1] = e >>> 8, this[n + 2] = e >>> 16, this[n + 3] = e >>> 24) : y(this, e, n, !0), n + 4
      }, i.prototype.writeInt32BE = function (e, n, t) {
        return e = +e, n >>>= 0, t || g(this, e, n, 4, 2147483647, -2147483648), 0 > e && (e = 4294967295 + e + 1), i.TYPED_ARRAY_SUPPORT ? (this[n] = e >>> 24, this[n + 1] = e >>> 16, this[n + 2] = e >>> 8, this[n + 3] = e) : y(this, e, n, !1), n + 4
      }, i.prototype.writeFloatLE = function (e, n, t) {
        return E(this, e, n, !0, t)
      }, i.prototype.writeFloatBE = function (e, n, t) {
        return E(this, e, n, !1, t)
      }, i.prototype.writeDoubleLE = function (e, n, t) {
        return w(this, e, n, !0, t)
      }, i.prototype.writeDoubleBE = function (e, n, t) {
        return w(this, e, n, !1, t)
      }, i.prototype.copy = function (e, n, t, a) {
        var r = this;
        if (t || (t = 0), a || 0 === a || (a = this.length), n || (n = 0), a !== t && 0 !== e.length && 0 !== r.length) {
          if (t > a)throw new TypeError("sourceEnd < sourceStart");
          if (0 > n || n >= e.length)throw new TypeError("targetStart out of bounds");
          if (0 > t || t >= r.length)throw new TypeError("sourceStart out of bounds");
          if (0 > a || a > r.length)throw new TypeError("sourceEnd out of bounds");
          a > this.length && (a = this.length), e.length - n < a - t && (a = e.length - n + t);
          var s = a - t;
          if (1e3 > s || !i.TYPED_ARRAY_SUPPORT)for (var o = 0; s > o; o++)e[o + n] = this[o + t]; else e._set(this.subarray(t, t + s), n)
        }
      }, i.prototype.fill = function (e, n, t) {
        if (e || (e = 0), n || (n = 0), t || (t = this.length), n > t)throw new TypeError("end < start");
        if (t !== n && 0 !== this.length) {
          if (0 > n || n >= this.length)throw new TypeError("start out of bounds");
          if (0 > t || t > this.length)throw new TypeError("end out of bounds");
          var i;
          if ("number" == typeof e)for (i = n; t > i; i++)this[i] = e; else {
            var a = T(e.toString()), r = a.length;
            for (i = n; t > i; i++)this[i] = a[i % r]
          }
          return this
        }
      }, i.prototype.toArrayBuffer = function () {
        if ("undefined" != typeof Uint8Array) {
          if (i.TYPED_ARRAY_SUPPORT)return new i(this).buffer;
          for (var e = new Uint8Array(this.length), n = 0, t = e.length; t > n; n += 1)e[n] = this[n];
          return e.buffer
        }
        throw new TypeError("Buffer.toArrayBuffer not supported in this browser")
      };
      var O = i.prototype;
      i._augment = function (e) {
        return e.constructor = i, e._isBuffer = !0, e._get = e.get, e._set = e.set, e.get = O.get, e.set = O.set, e.write = O.write, e.toString = O.toString, e.toLocaleString = O.toString, e.toJSON = O.toJSON, e.equals = O.equals, e.compare = O.compare, e.copy = O.copy, e.slice = O.slice, e.readUInt8 = O.readUInt8, e.readUInt16LE = O.readUInt16LE, e.readUInt16BE = O.readUInt16BE, e.readUInt32LE = O.readUInt32LE, e.readUInt32BE = O.readUInt32BE, e.readInt8 = O.readInt8, e.readInt16LE = O.readInt16LE, e.readInt16BE = O.readInt16BE, e.readInt32LE = O.readInt32LE, e.readInt32BE = O.readInt32BE, e.readFloatLE = O.readFloatLE, e.readFloatBE = O.readFloatBE, e.readDoubleLE = O.readDoubleLE, e.readDoubleBE = O.readDoubleBE, e.writeUInt8 = O.writeUInt8, e.writeUInt16LE = O.writeUInt16LE, e.writeUInt16BE = O.writeUInt16BE, e.writeUInt32LE = O.writeUInt32LE, e.writeUInt32BE = O.writeUInt32BE, e.writeInt8 = O.writeInt8, e.writeInt16LE = O.writeInt16LE, e.writeInt16BE = O.writeInt16BE, e.writeInt32LE = O.writeInt32LE, e.writeInt32BE = O.writeInt32BE, e.writeFloatLE = O.writeFloatLE, e.writeFloatBE = O.writeFloatBE, e.writeDoubleLE = O.writeDoubleLE, e.writeDoubleBE = O.writeDoubleBE, e.fill = O.fill, e.inspect = O.inspect, e.toArrayBuffer = O.toArrayBuffer, e
      };
      var V = /[^+\/0-9A-z]/g
    }, {"base64-js": 35, ieee754: 36, "is-array": 37}], 35: [function (e, n, t) {
      var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      !function (e) {
        "use strict";
        function n(e) {
          var n = e.charCodeAt(0);
          return n === s ? 62 : n === o ? 63 : l > n ? -1 : l + 10 > n ? n - l + 26 + 26 : u + 26 > n ? n - u : c + 26 > n ? n - c + 26 : void 0
        }

        function t(e) {
          function t(e) {
            c[d++] = e
          }

          var i, a, s, o, l, c;
          if (e.length % 4 > 0)throw new Error("Invalid string. Length must be a multiple of 4");
          var u = e.length;
          l = "=" === e.charAt(u - 2) ? 2 : "=" === e.charAt(u - 1) ? 1 : 0, c = new r(3 * e.length / 4 - l), s = l > 0 ? e.length - 4 : e.length;
          var d = 0;
          for (i = 0, a = 0; s > i; i += 4, a += 3)o = n(e.charAt(i)) << 18 | n(e.charAt(i + 1)) << 12 | n(e.charAt(i + 2)) << 6 | n(e.charAt(i + 3)), t((16711680 & o) >> 16), t((65280 & o) >> 8), t(255 & o);
          return 2 === l ? (o = n(e.charAt(i)) << 2 | n(e.charAt(i + 1)) >> 4, t(255 & o)) : 1 === l && (o = n(e.charAt(i)) << 10 | n(e.charAt(i + 1)) << 4 | n(e.charAt(i + 2)) >> 2, t(o >> 8 & 255), t(255 & o)), c
        }

        function a(e) {
          function n(e) {
            return i.charAt(e)
          }

          function t(e) {
            return n(e >> 18 & 63) + n(e >> 12 & 63) + n(e >> 6 & 63) + n(63 & e)
          }

          var a, r, s, o = e.length % 3, l = "";
          for (a = 0, s = e.length - o; s > a; a += 3)r = (e[a] << 16) + (e[a + 1] << 8) + e[a + 2], l += t(r);
          switch (o) {
            case 1:
              r = e[e.length - 1], l += n(r >> 2), l += n(r << 4 & 63), l += "==";
              break;
            case 2:
              r = (e[e.length - 2] << 8) + e[e.length - 1], l += n(r >> 10), l += n(r >> 4 & 63), l += n(r << 2 & 63), l += "="
          }
          return l
        }

        var r = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "+".charCodeAt(0), o = "/".charCodeAt(0), l = "0".charCodeAt(0), c = "a".charCodeAt(0), u = "A".charCodeAt(0);
        e.toByteArray = t, e.fromByteArray = a
      }("undefined" == typeof t ? this.base64js = {} : t)
    }, {}], 36: [function (e, n, t) {
      t.read = function (e, n, t, i, a) {
        var r, s, o = 8 * a - i - 1, l = (1 << o) - 1, c = l >> 1, u = -7, d = t ? a - 1 : 0, p = t ? -1 : 1, f = e[n + d];
        for (d += p, r = f & (1 << -u) - 1, f >>= -u, u += o; u > 0; r = 256 * r + e[n + d], d += p, u -= 8);
        for (s = r & (1 << -u) - 1, r >>= -u, u += i; u > 0; s = 256 * s + e[n + d], d += p, u -= 8);
        if (0 === r)r = 1 - c; else {
          if (r === l)return s ? 0 / 0 : 1 / 0 * (f ? -1 : 1);
          s += Math.pow(2, i), r -= c
        }
        return (f ? -1 : 1) * s * Math.pow(2, r - i)
      }, t.write = function (e, n, t, i, a, r) {
        var s, o, l, c = 8 * r - a - 1, u = (1 << c) - 1, d = u >> 1, p = 23 === a ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = i ? 0 : r - 1, m = i ? 1 : -1, h = 0 > n || 0 === n && 0 > 1 / n ? 1 : 0;
        for (n = Math.abs(n), isNaN(n) || 1 / 0 === n ? (o = isNaN(n) ? 1 : 0, s = u) : (s = Math.floor(Math.log(n) / Math.LN2), n * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), n += s + d >= 1 ? p / l : p * Math.pow(2, 1 - d), n * l >= 2 && (s++, l /= 2), s + d >= u ? (o = 0, s = u) : s + d >= 1 ? (o = (n * l - 1) * Math.pow(2, a), s += d) : (o = n * Math.pow(2, d - 1) * Math.pow(2, a), s = 0)); a >= 8; e[t + f] = 255 & o, f += m, o /= 256, a -= 8);
        for (s = s << a | o, c += a; c > 0; e[t + f] = 255 & s, f += m, s /= 256, c -= 8);
        e[t + f - m] |= 128 * h
      }
    }, {}], 37: [function (e, n) {
      var t = Array.isArray, i = Object.prototype.toString;
      n.exports = t || function (e) {
          return !!e && "[object Array]" == i.call(e)
        }
    }, {}], 38: [function (e, n) {
      function t() {
      }

      function i(e) {
        var n = {}.toString.call(e);
        switch (n) {
          case"[object File]":
          case"[object Blob]":
          case"[object FormData]":
            return !0;
          default:
            return !1
        }
      }

      function a() {
        if (v.XMLHttpRequest && ("file:" != v.location.protocol || !v.ActiveXObject))return new XMLHttpRequest;
        try {
          return new ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
        }
        try {
          return new ActiveXObject("Msxml2.XMLHTTP.6.0")
        } catch (e) {
        }
        try {
          return new ActiveXObject("Msxml2.XMLHTTP.3.0")
        } catch (e) {
        }
        try {
          return new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
        }
        return !1
      }

      function r(e) {
        return e === Object(e)
      }

      function s(e) {
        if (!r(e))return e;
        var n = [];
        for (var t in e)null != e[t] && n.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
        return n.join("&")
      }

      function o(e) {
        for (var n, t, i = {}, a = e.split("&"), r = 0, s = a.length; s > r; ++r)t = a[r], n = t.split("="), i[decodeURIComponent(n[0])] = decodeURIComponent(n[1]);
        return i
      }

      function l(e) {
        var n, t, i, a, r = e.split(/\r?\n/), s = {};
        r.pop();
        for (var o = 0, l = r.length; l > o; ++o)t = r[o], n = t.indexOf(":"), i = t.slice(0, n).toLowerCase(), a = g(t.slice(n + 1)), s[i] = a;
        return s
      }

      function c(e) {
        return e.split(/ *; */).shift()
      }

      function u(e) {
        return h(e.split(/ *; */), function (e, n) {
          var t = n.split(/ *= */), i = t.shift(), a = t.shift();
          return i && a && (e[i] = a), e
        }, {})
      }

      function d(e, n) {
        n = n || {}, this.req = e, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method ? this.xhr.responseText : null, this.setStatusProperties(this.xhr.status), this.header = this.headers = l(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this.setHeaderProperties(this.header), this.body = "HEAD" != this.req.method ? this.parseBody(this.text) : null
      }

      function p(e, n) {
        var t = this;
        m.call(this), this._query = this._query || [], this.method = e, this.url = n, this.header = {}, this._header = {}, this.on("end", function () {
          var e = null, n = null;
          try {
            n = new d(t)
          } catch (i) {
            e = new Error("Parser is unable to parse the response"), e.parse = !0, e.original = i
          }
          t.callback(e, n)
        })
      }

      function f(e, n) {
        return "function" == typeof n ? new p("GET", e).end(n) : 1 == arguments.length ? new p("GET", e) : new p(e, n)
      }

      var m = e("emitter"), h = e("reduce"), v = "undefined" == typeof window ? this : window, g = "".trim ? function (e) {
        return e.trim()
      } : function (e) {
        return e.replace(/(^\s*|\s*$)/g, "")
      };
      f.serializeObject = s, f.parseString = o, f.types = {
        html: "text/html",
        json: "application/json",
        xml: "application/xml",
        urlencoded: "application/x-www-form-urlencoded",
        form: "application/x-www-form-urlencoded",
        "form-data": "application/x-www-form-urlencoded"
      }, f.serialize = {
        "application/x-www-form-urlencoded": s,
        "application/json": JSON.stringify
      }, f.parse = {
        "application/x-www-form-urlencoded": o,
        "application/json": JSON.parse
      }, d.prototype.get = function (e) {
        return this.header[e.toLowerCase()]
      }, d.prototype.setHeaderProperties = function () {
        var e = this.header["content-type"] || "";
        this.type = c(e);
        var n = u(e);
        for (var t in n)this[t] = n[t]
      }, d.prototype.parseBody = function (e) {
        var n = f.parse[this.type];
        return n && e && e.length ? n(e) : null
      }, d.prototype.setStatusProperties = function (e) {
        var n = e / 100 | 0;
        this.status = e, this.statusType = n, this.info = 1 == n, this.ok = 2 == n, this.clientError = 4 == n, this.serverError = 5 == n, this.error = 4 == n || 5 == n ? this.toError() : !1, this.accepted = 202 == e, this.noContent = 204 == e || 1223 == e, this.badRequest = 400 == e, this.unauthorized = 401 == e, this.notAcceptable = 406 == e, this.notFound = 404 == e, this.forbidden = 403 == e
      }, d.prototype.toError = function () {
        var e = this.req, n = e.method, t = e.url, i = "cannot " + n + " " + t + " (" + this.status + ")", a = new Error(i);
        return a.status = this.status, a.method = n, a.url = t, a
      }, f.Response = d, m(p.prototype), p.prototype.use = function (e) {
        return e(this), this
      }, p.prototype.timeout = function (e) {
        return this._timeout = e, this
      }, p.prototype.clearTimeout = function () {
        return this._timeout = 0, clearTimeout(this._timer), this
      }, p.prototype.abort = function () {
        return this.aborted ? void 0 : (this.aborted = !0, this.xhr.abort(), this.clearTimeout(), this.emit("abort"), this)
      }, p.prototype.set = function (e, n) {
        if (r(e)) {
          for (var t in e)this.set(t, e[t]);
          return this
        }
        return this._header[e.toLowerCase()] = n, this.header[e] = n, this
      }, p.prototype.unset = function (e) {
        return delete this._header[e.toLowerCase()], delete this.header[e], this
      }, p.prototype.getHeader = function (e) {
        return this._header[e.toLowerCase()]
      }, p.prototype.type = function (e) {
        return this.set("Content-Type", f.types[e] || e), this
      }, p.prototype.accept = function (e) {
        return this.set("Accept", f.types[e] || e), this
      }, p.prototype.auth = function (e, n) {
        var t = btoa(e + ":" + n);
        return this.set("Authorization", "Basic " + t), this
      }, p.prototype.query = function (e) {
        return "string" != typeof e && (e = s(e)), e && this._query.push(e), this
      }, p.prototype.field = function (e, n) {
        return this._formData || (this._formData = new FormData), this._formData.append(e, n), this
      }, p.prototype.attach = function (e, n, t) {
        return this._formData || (this._formData = new FormData), this._formData.append(e, n, t), this
      }, p.prototype.send = function (e) {
        var n = r(e), t = this.getHeader("Content-Type");
        if (n && r(this._data))for (var i in e)this._data[i] = e[i]; else"string" == typeof e ? (t || this.type("form"), t = this.getHeader("Content-Type"), this._data = "application/x-www-form-urlencoded" == t ? this._data ? this._data + "&" + e : e : (this._data || "") + e) : this._data = e;
        return n ? (t || this.type("json"), this) : this
      }, p.prototype.callback = function (e, n) {
        var t = this._callback;
        return this.clearTimeout(), 2 == t.length ? t(e, n) : e ? this.emit("error", e) : void t(n)
      }, p.prototype.crossDomainError = function () {
        var e = new Error("Origin is not allowed by Access-Control-Allow-Origin");
        e.crossDomain = !0, this.callback(e)
      }, p.prototype.timeoutError = function () {
        var e = this._timeout, n = new Error("timeout of " + e + "ms exceeded");
        n.timeout = e, this.callback(n)
      }, p.prototype.withCredentials = function () {
        return this._withCredentials = !0, this
      }, p.prototype.end = function (e) {
        var n = this, r = this.xhr = a(), s = this._query.join("&"), o = this._timeout, l = this._formData || this._data;
        if (this._callback = e || t, r.onreadystatechange = function () {
            return 4 == r.readyState ? 0 == r.status ? n.aborted ? n.timeoutError() : n.crossDomainError() : void n.emit("end") : void 0
          }, r.upload && (r.upload.onprogress = function (e) {
            e.percent = e.loaded / e.total * 100, n.emit("progress", e)
          }), o && !this._timer && (this._timer = setTimeout(function () {
            n.abort()
          }, o)), s && (s = f.serializeObject(s), this.url += ~this.url.indexOf("?") ? "&" + s : "?" + s), r.open(this.method, this.url, !0), this._withCredentials && (r.withCredentials = !0), "GET" != this.method && "HEAD" != this.method && "string" != typeof l && !i(l)) {
          var c = f.serialize[this.getHeader("Content-Type")];
          c && (l = c(l))
        }
        for (var u in this.header)null != this.header[u] && r.setRequestHeader(u, this.header[u]);
        return this.emit("request", this), r.send(l), this
      }, f.Request = p, f.get = function (e, n, t) {
        var i = f("GET", e);
        return "function" == typeof n && (t = n, n = null), n && i.query(n), t && i.end(t), i
      }, f.head = function (e, n, t) {
        var i = f("HEAD", e);
        return "function" == typeof n && (t = n, n = null), n && i.send(n), t && i.end(t), i
      }, f.del = function (e, n) {
        var t = f("DELETE", e);
        return n && t.end(n), t
      }, f.patch = function (e, n, t) {
        var i = f("PATCH", e);
        return "function" == typeof n && (t = n, n = null), n && i.send(n), t && i.end(t), i
      }, f.post = function (e, n, t) {
        var i = f("POST", e);
        return "function" == typeof n && (t = n, n = null), n && i.send(n), t && i.end(t), i
      }, f.put = function (e, n, t) {
        var i = f("PUT", e);
        return "function" == typeof n && (t = n, n = null), n && i.send(n), t && i.end(t), i
      }, n.exports = f
    }, {emitter: 39, reduce: 40}], 39: [function (e, n) {
      function t(e) {
        return e ? i(e) : void 0
      }

      function i(e) {
        for (var n in t.prototype)e[n] = t.prototype[n];
        return e
      }

      n.exports = t, t.prototype.on = t.prototype.addEventListener = function (e, n) {
        return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(n), this
      }, t.prototype.once = function (e, n) {
        function t() {
          i.off(e, t), n.apply(this, arguments)
        }

        var i = this;
        return this._callbacks = this._callbacks || {}, t.fn = n, this.on(e, t), this
      }, t.prototype.off = t.prototype.removeListener = t.prototype.removeAllListeners = t.prototype.removeEventListener = function (e, n) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length)return this._callbacks = {}, this;
        var t = this._callbacks[e];
        if (!t)return this;
        if (1 == arguments.length)return delete this._callbacks[e], this;
        for (var i, a = 0; a < t.length; a++)if (i = t[a], i === n || i.fn === n) {
          t.splice(a, 1);
          break
        }
        return this
      }, t.prototype.emit = function (e) {
        this._callbacks = this._callbacks || {};
        var n = [].slice.call(arguments, 1), t = this._callbacks[e];
        if (t) {
          t = t.slice(0);
          for (var i = 0, a = t.length; a > i; ++i)t[i].apply(this, n)
        }
        return this
      }, t.prototype.listeners = function (e) {
        return this._callbacks = this._callbacks || {}, this._callbacks[e] || []
      }, t.prototype.hasListeners = function (e) {
        return !!this.listeners(e).length
      }
    }, {}], 40: [function (e, n) {
      n.exports = function (e, n, t) {
        for (var i = 0, a = e.length, r = 3 == arguments.length ? t : e[i++]; a > i;)r = n.call(null, r, e[i], ++i, e);
        return r
      }
    }, {}]
  }, {}, [3])(3)
}), function (e) {
  function n(e) {
    function n(e) {
      return a(e) ? e : [e]
    }

    function t(e) {
      return Array.prototype.slice.apply(e)
    }

    var i = e.module("dataDepend", []), a = e.isArray, r = e.isFunction, s = (e.isObject, e.forEach), o = (e.extend, ["$rootScope", "$injector", "$q", function (i, o, l) {
      function c(i, o) {
        function c(e) {
          function n(n) {
            var t = i[n];
            return t || e && (t = e.get(n)), t
          }

          function t(e, t) {
            if (n(e))throw new Error("[dataDepend] provider with key " + e + " already registered");
            i[e] = t
          }

          var i = {};
          return {local: i, get: n, put: t}
        }

        function u() {
          return f++
        }

        function d(n) {
          function i(e) {
            var n = P.value;
            P.$loaded = !0, delete P.$error, S = !1, n !== e && (P.value = e, E("setLoaded", n, " -> ", e), m())
          }

          function c(e) {
            var n = F[e];
            return n || (F[e] = n = {}), n
          }

          function u() {
            P.$loaded = !1, C = !1
          }

          function d(e) {
            var n = _.get(e);
            if (!n)throw new Error("[dataDepend] No provider for " + e);
            return n
          }

          function p(e) {
            s(R, e)
          }

          function f(e) {
            s(D, e)
          }

          function m() {
            p(function (e) {
              e.parentChanged()
            })
          }

          function h() {
            function e(e, n) {
              var t = c(e), i = t.value;
              E("resolveDependencies", e, ":", i, "->", n), i !== n && (E("resolveDependencies", "changed"), t.value = n, S = !0)
            }

            var n = [];
            return f(function (t) {
              var i = d(t), a = i.resolve().then(function (n) {
                return e(t, n), n
              }, function (e) {
                throw new Error("<" + t + "> <- " + e.message)
              });
              n.push(a)
            }), l.all(n).then(function () {
              var n = [];
              return f(function (t) {
                var i = d(t).get();
                e(t, i), n.push(i)
              }), n
            })
          }

          function v(e) {
            u(), E("asyncLoad: init load");
            var n = h().then(function (t) {
              if (E("asyncLoad dependencies resolved", t), L !== n)return E("asyncLoad: skip (new load request)"), L;
              var i = b();
              if (T && (S || e || 0 == t.length)) {
                E("asyncLoad: call factory");
                try {
                  i = T.apply(T, t)
                } catch (a) {
                  throw new Error("unresolvable: " + a.message)
                }
              }
              return i
            }).then(function (e) {
              return L !== n ? (E("asyncLoad: skip (new load request)"), L) : (E("asyncLoad: load complete"), L = null, i(e), e)
            }, function (e) {
              if (L !== n)return E("asyncLoad: skip (new load request)"), L;
              throw E("asyncLoad: load error"), L = null, P.$error = e, S = !1, e
            });
            return n
          }

          function g() {
            return E("parentChanged START"), L ? void E("parentChanged SKIP (loading)") : (C = !0, x && (E("parentChanged RESOLVE async"), o(function () {
              E("parentChanged RESOLVE"), y()
            })), void m())
          }

          function b() {
            return P.value
          }

          function y(e) {
            e = e || {};
            var n = e.reload;
            return (C || n) && (L = v(n)), L ? (E("resolve: load async"), L) : (E("resolve: load sync"), l.when(b()))
          }

          function k(e) {
            if (T)throw new Error("[dataDepend] Cannot set value, was using factory");
            if (r(e))throw new Error("[dataDepend] Cannot refine static value using factory function");
            i(e)
          }

          function E() {
          }

          function w(n) {
            function i(e) {
              return e ? e[o] : e
            }

            function r() {
              var e = t(arguments);
              return c.apply(null, e).then(i)
            }

            function s() {
              var e = t(arguments);
              return i(l.apply(null, e))
            }

            if (!a($.produces))throw new Error("[dataDepend] Provider does not produce multiple values");
            var o = $.produces.indexOf(n), l = $.get, c = $.resolve, u = e.extend({}, $, {resolve: r, get: s});
            return u
          }

          function I() {
            f(function (e) {
              var n = d(e), t = n.children, i = t.indexOf($);
              -1 !== i && t.splice(i, 1)
            })
          }

          n = n || {};
          var A = n.produces, _ = n.registry, D = n.dependencies || [], T = n.factory, x = n.eager || !1, F = {}, R = [], S = !0, C = !0, L = null, P = {$loaded: !1}, $ = {
            produces: A,
            data: P,
            get: b,
            set: k,
            resolve: y,
            children: R,
            filter: w,
            destroy: I,
            parentChanged: g
          };
          f(function (e) {
            d(e).children.push($)
          }), x && (E("resolve async"), o(function () {
            E("resolve"), y()
          })), T || i(n.value);
          var N = {
            reload: function () {
              y({reload: !0})
            }
          };
          return e.extend(P, N), $
        }

        function p(e, t) {
          function o(e, t) {
            var s = "provider$" + u();
            if (t ? e = n(e) : (t = e, e = i(t), a(t) && (t = t[t.length - 1])), !r(t))throw new Error('[dataDepend] Must provide callback as second parameter or use [ "A", "B", function(a, b) { } ] notation');
            var o = l({produces: s, factory: t, dependencies: e, eager: !0, registry: y});
            return o.data
          }

          function l(e) {
            var n, t = e.produces;
            if (!t)throw new Error("[dataDepend] Must provide produces when creating new provider");
            return n = d(e), a(t) ? s(t, function (e) {
              y.put(e, n.filter(e))
            }) : y.put(t, n), n
          }

          function f(n, t) {
            t = t || n;
            var i = n + ":old";
            m(n, e.$eval(t)), m(i, null);
            var a = y.get(n), r = y.get(i);
            return e.$watch(t, function (e, n) {
              e !== n && (a.set(e), r.set(n))
            }), a.data
          }

          function m(e, n) {
            var t, s, o;
            if (y.get(e))throw new Error("[dataDepend] provider for " + e + " already registered");
            return (r(n) || a(n) && r(n[n.length - 1])) && (t = n, s = i(t), n = void 0, a(t) && (t = t[t.length - 1])), o = l({
              produces: e,
              factory: t,
              value: n,
              dependencies: s,
              registry: y
            }), o.data
          }

          function h(e, n) {
            if ("string" != typeof e)throw new Error("[dataDepend] expected name to be a string, got " + e);
            var t = y.get(e);
            if (!t)throw new Error("[dataDepend] no provider with name " + e);
            t.set(n)
          }

          function v(e) {
            var n = y.get(e);
            if (!n)throw new Error('[dataDepend] Provider "' + e + '" does not exists');
            n.resolve({reload: !0})
          }

          function g() {
            var e = y.local;
            s(e, function (e) {
              e.destroy()
            })
          }

          function b(e) {
            return p(e, y)
          }

          var y = c(t);
          return e.$on("$destroy", g), {
            $providers: y,
            observe: o,
            provide: m,
            set: h,
            changed: v,
            watchScope: f,
            newChild: b
          }
        }

        var f = 0;
        return {create: p}
      }

      return c(o.annotate, function (e) {
        i.$evalAsync(e)
      })
    }]);
    return i.factory("dataDepend", o), i
  }

  if ("function" == typeof define && define.amd)define("angular-data-depend", ["angular"], function (e) {
    return n(e)
  }); else {
    if (void 0 === typeof e)throw new Error("[dataDepend] Failed to bind: AngularJS not available on window or via AMD");
    n(e)
  }
}(angular), define("scripts/config/date", [], function () {
  "use strict";
  return ["camDateFormatProvider", "configurationProvider", function (e, n) {
    for (var t = ["monthName", "day", "abbr", "normal", "long", "short"], i = 0; i < t.length; i++)e.setDateFormat(n.getDateFormat(t[i]), t[i])
  }]
}), define("text!scripts/index.html", [], function () {
  return '<div class="columns"\n     ng-controller="camLayoutCtrl">\n\n  <!-- # filters column -->\n  <section class="column task-filters"\n           ng-controller="camFiltersCtrl">\n    <header class="cell top">\n      <button class="btn btn-link"\n              ng-show="userCanCreateFilter"\n              ng-click="openModal($event)">\n        <span class="glyphicon glyphicon-plus-sign"></span>\n        {{ \'FILTER_CREATE\' | translate }}\n      </button>\n\n      <button ng-click="toggleRegion($event)"\n              data-region="filters"\n              class="region-toggle btn btn-link">\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n    </header>\n\n    <div class="cell content">\n      <div cam-tasklist-filters\n           filters-data="filtersData"\n           open-modal="openModal"></div>\n    </div>\n  </section>\n  <!-- / filters column -->\n\n\n\n\n\n  <!-- # list column -->\n  <section class="column tasks-list"\n           ng-controller="camListCtrl">\n    <header class="cell top">\n      <div cam-sorting-choices\n           tasklist-data="tasklistData"></div>\n\n      <button ng-click="toggleRegion($event)"\n              data-region="list"\n              class="region-toggle btn btn-link">\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n    </header>\n\n    <div class="cell content">\n      <view ng-repeat="tasklistPlugin in tasklistPlugins"\n            provider="tasklistPlugin"\n            vars="tasklistVars" />\n\n      <div cam-tasks\n           tasklist-data="tasklistData"></div>\n    </div>\n  </section>\n  <!-- / list column -->\n\n\n\n\n\n  <!-- # task column -->\n  <section class="column task-details"\n           ng-controller="camTaskActionCtrl">\n    <header class="cell top">\n      <button ng-click="toggleRegion($event)"\n              data-region="task"\n              class="region-toggle btn btn-link">\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n\n      <button ng-click="maximizeRegion($event)"\n              data-region="task"\n              class="btn btn-link maximize">\n        <span class="glyphicon glyphicon-resize-full"></span>\n      </button>\n\n      <button ng-click="resetRegions($event)"\n              class="btn btn-link reset-regions">\n        <span class="glyphicon glyphicon-resize-small"></span>\n      </button>\n\n      <div class="task-actions"\n           ng-show="task"\n           ng-repeat="taskAction in taskActions">\n        <view provider="taskAction" vars="taskVars">\n      </div>\n    </header>\n\n    <div class="cell content">\n      <div cam-tasklist-task\n           tasklist-data="tasklistData"></div>\n    </div>\n  </section>\n  <!-- # task column -->\n\n</div>\n'
}), define("text!scripts/user/controller/cam-auth-login.html", [], function () {
  return '<div class="form-signin-container">\n  <form role="form"\n        name="signinForm"\n        class="form-signin cam-auth-login ">\n\n    <div class="auth-fields">\n\n      <h2 translate="PLEASE_SIGN_IN">Please sign in</h2>\n\n      <div notifications-panel />\n\n      <div class="form-group">\n        <input required\n               autofocus="autofocus"\n               tabindex="1"\n               ng-model="username"\n               name="username"\n               type="text"\n               class="form-control"\n               id="signinFormInputUsername"\n               placeholder="{{ \'USERNAME\' | translate }}"\n               auto-fill>\n      </div>\n\n      <div class="form-group">\n        <input required\n               tabindex="2"\n               ng-model="password"\n               name="password"\n               type="password"\n               class="form-control"\n               id="signinFormInputPassword"\n               placeholder="{{ \'PASSWORD\' | translate }}"\n               auto-fill>\n      </div>\n\n    </div>\n\n    <div class="auth-actions">\n      <button class="btn btn-lg btn-primary"\n              tabindex="3"\n              type="submit"\n              ng-disabled="!username || !password"\n              ng-click="login()"\n              translate="SIGN_IN_ACTION">Sign in</button>\n    </div>\n  </form>\n</div>\n'
}), define("scripts/api/index", ["angular", "camunda-bpm-sdk-js"], function (e, n) {
  "use strict";
  var t = e.module("cam.tasklist.client", []);
  return t.value("HttpClient", n.Client), t.value("CamForm", n.Form), t.factory("camAPIHttpClient", ["$rootScope", "$location", "$translate", "Notifications", function (t, i, a, r) {
    function s(e) {
      this._wrapped = new n.Client.HttpClient(e)
    }

    return e.forEach(["post", "get", "load", "put", "del", "options", "head"], function (e) {
      s.prototype[e] = function (n, i) {
        if (i.done) {
          if (!t.authentication)return i.done(new Error("Not authenticated"));
          var s = i.done;
          i.done = function (e, n) {
            function i() {
              return e && 401 === e.status ? (t.$broadcast("authentication.changed", null), t.authentication = null, a(["SESSION_EXPIRED", "SESSION_EXPIRED_MESSAGE"]).then(function (e) {
                r.addError({status: e.SESSION_EXPIRED, message: e.SESSION_EXPIRED_MESSAGE, exclusive: !0})
              }), void t.$broadcast("authentication.login.required")) : void s(e, n)
            }

            var o = t.$$phase;
            "$apply" !== o && "$digest" !== o ? t.$apply(i) : i()
          }, this._wrapped[e](n, i)
        }
      }
    }), e.forEach(["on", "once", "off", "trigger"], function (e) {
      s.prototype[e] = function () {
        this._wrapped[e].apply(this, arguments)
      }
    }), s
  }]), t.factory("camAPI", ["camAPIHttpClient", "$window", "Uri", function (e, t, i) {
    var a = {apiUri: "engine-rest/api/engine", HttpClient: e, engine: i.appUri(":engine")};
    if (t.tasklistConf)for (var r in t.tasklistConf)a[r] = t.tasklistConf[r];
    return new n.Client(a)
  }]), t
}), define("scripts/user/controller/cam-user-logout-ctrl", [], function () {
  "use strict";
  return ["$translate", "AuthenticationService", "Notifications", function (e, n, t) {
    n.logout().then(function () {
      e("LOGGED_OUT").then(function (e) {
        t.add({status: e, exclusive: !0})
      })
    })
  }]
}), define("scripts/user/controller/cam-user-login-ctrl", [], function () {
  "use strict";
  return ["$scope", "$translate", "AuthenticationService", "Notifications", function (e, n, t, i) {
    function a() {
      n("LOGGED_IN").then(function (e) {
        i.addMessage({duration: 5e3, status: e, exclusive: !0})
      })
    }

    function r() {
      n("CREDENTIALS_ERROR").then(function (n) {
        i.addError({status: n, scope: e})
      })
    }

    e.login = function () {
      t.login(e.username, e.password).then(a, r)
    }
  }]
}), define("scripts/user/index", ["angular", "camunda-commons-ui/auth/index", "../api/index", "./controller/cam-user-logout-ctrl", "./controller/cam-user-login-ctrl"], function (e, n, t, i, a) {
  "use strict";
  var r = e.module("cam.tasklist.user", [n.name, t.name]);
  return r.controller("camUserLogoutCtrl", i), r.controller("camUserLoginCtrl", a), r
}), define("scripts/config/routes", ["text!./../index.html", "text!./../user/controller/cam-auth-login.html", "./../user/index"], function (e, n) {
  "use strict";
  return ["$routeProvider", function (t) {
    t.when("/", {
      template: e,
      controller: "camTasklistViewCtrl",
      authentication: "required",
      reloadOnSearch: !1
    }).when("/login", {template: n, controller: "camUserLoginCtrl"}).when("/logout", {
      template: n,
      authentication: "required",
      controller: "camUserLogoutCtrl"
    }).otherwise({redirectTo: "/"})
  }]
}), define("scripts/config/locales", ["moment", "angular"], function (e, n) {
  "use strict";
  return function (t, i) {
    t.factory("localeLoader", ["$q", "$http", "Notifications", function (e, t, i) {
      return function (a) {
        if (!a || !n.isString(a.prefix) || !n.isString(a.suffix))throw new Error("Couldn't load static files, no prefix or suffix specified!");
        var r = e.defer();
        return t(n.extend({
          url: [a.prefix, a.key, a.suffix].join(""),
          method: "GET",
          params: ""
        }, a.$http)).success(function (e) {
          "function" == typeof a.callback && a.callback(null, e, a.key), r.resolve(e.labels)
        }).error(function (e) {
          "function" == typeof a.callback && a.callback(e, null, a.key), i.addError({
            status: "Error in localization configuration",
            message: '"' + a.key + '" is declared as available locale, but no such locale file exists.'
          }), r.reject(a.key)
        }), r.promise
      }
    }]), t.config(["$translateProvider", "configurationProvider", function (t, a) {
      var r = a.getAvailableLocales(), s = a.getFallbackLocale();
      t.useLoader("localeLoader", {
        prefix: i + "/app/tasklist/locales/", suffix: ".json", callback: function (n, t, i) {
          !n && t && t.dateLocales && e.lang(i || s, t.dateLocales)
        }
      }), t.registerAvailableLanguageKeys(r), t.fallbackLanguage(s), t.determinePreferredLanguage(function () {
        var e = window.navigator, t = ((n.isArray(e.languages) ? e.languages[0] : e.language || e.browserLanguage || e.systemLanguage || e.userLanguage) || "").split("-"), i = r.indexOf(n.lowercase(t[0]));
        return i > -1 ? r[i] : s
      })
    }])
  }
}), define("scripts/config/tooltip", [], function () {
  "use strict";
  return ["$tooltipProvider", function (e) {
    e.options({appendToBody: !0, popupDelay: 500})
  }]
}), define("scripts/config/uris", ["angular"], function () {
  "use strict";
  return function (e, n) {
    e.config(["UriProvider", function (e) {
      e.replace(":appName", "tasklist"), e.replace("app://", n.href), e.replace("adminbase://", n["app-root"] + "/app/admin/"), e.replace("tasklistbase://", n["app-root"] + "/app/tasklist/"), e.replace("cockpitbase://", n["app-root"] + "/app/cockpit/"), e.replace("admin://", n["admin-api"]), e.replace("plugin://", n["admin-api"] + "plugin/"), e.replace("engine://", n["engine-api"]), e.replace(":engine", ["$window", function (e) {
        var n = e.location.href, t = n.match(/\/app\/tasklist\/(\w+)(|\/)/);
        if (t)return t[1];
        throw new Error("no process engine selected")
      }])
    }])
  }
}), define("scripts/controller/cam-tasklist-app-ctrl", ["angular"], function () {
  "use strict";
  var e = function () {
    function e() {
      this.refreshProvider = null
    }

    return e
  }();
  return ["$scope", function (n) {
    n.tasklistApp = new e
  }]
}), define("scripts/controller/cam-tasklist-view-ctrl", ["angular"], function (e) {
  "use strict";
  function n(e) {
    return {
      refreshTaskList: function () {
        e.changed("taskList")
      }
    }
  }

  return ["$scope", "$q", "$location", "$interval", "search", "dataDepend", "camAPI", function (t, i, a, r, s, o, l) {
    function c(e) {
      var n = a.search() || {};
      return n[e] || null
    }

    function u(e) {
      s.updateSilently(e)
    }

    t.$on("$destroy", function () {
      t.tasklistApp.refreshProvider = null
    });
    var d = t.tasklistData = o.create(t);
    t.tasklistApp && (t.tasklistApp.refreshProvider = n(d));
    var p, f = c("task"), m = c("detailsTab"), h = l.resource("filter"), v = l.resource("task");
    d.provide("filters", [function () {
      var e = i.defer();
      return h.list({itemCount: !1, resoureType: "Task"}, function (n, t) {
        n ? e.reject(n) : e.resolve(t)
      }), e.promise
    }]), d.provide("currentFilter", ["filters", function (n) {
      for (var t, i, a = c("filter"), r = 0; i = n[r]; r++) {
        if (a === i.id) {
          t = i;
          break
        }
        (!t || i.properties.priority < t.properties.priority) && (t = i)
      }
      if (p && p.id !== t.id) {
        var s = c("page");
        s && u({page: "1"})
      }
      return t && t.id !== a && u({filter: t.id}), e.copy(t)
    }]), d.provide("searchQuery", {
      processVariables: [],
      taskVariables: [],
      caseInstanceVariables: []
    }), d.provide("taskListQuery", ["currentFilter", "searchQuery", function (n, t) {
      if (!n)return null;
      var i = e.copy(t), a = 15 * ((c("page") || 1) - 1), r = c("sorting");
      try {
        r = JSON.parse(r)
      } catch (s) {
        r = [{}]
      }
      return r = Array.isArray(r) && r.length ? r : [{}], r[0].sortOrder = r[0].sortOrder || "desc", r[0].sortBy = r[0].sortBy || "created", i.id = n.id, i.firstResult = a, i.maxResults = 15, i.sorting = r, i.active = !0, i
    }]), d.provide("taskList", ["taskListQuery", function (n) {
      var t = i.defer();
      return n && null !== n.id ? h.getTasks(e.copy(n), function (e, n) {
        e ? t.reject(e) : t.resolve(n)
      }) : t.resolve({count: 0, _embedded: {}}), t.promise
    }]), d.provide("taskId", {taskId: f}), d.provide("task", ["taskId", function (e) {
      var n = i.defer(), t = e.taskId;
      return "string" != typeof t ? n.resolve(null) : v.get(t, function (e, t) {
        e ? n.reject(e) : n.resolve(t)
      }), n.promise
    }]), d.observe("currentFilter", function (e) {
      p = e
    });
    var g;
    d.observe("currentFilter", function (e) {
      g && r.cancel(g), e && e.properties.refresh && (g = r(function () {
        t.tasklistApp && t.tasklistApp.refreshProvider ? t.tasklistApp.refreshProvider.refreshTaskList() : r.cancel(g)
      }, 1e4))
    }), t.$on("$routeChanged", function () {
      var e = f, n = m;
      f = c("task"), m = c("detailsTab"), (e !== f || n === m) && d.set("taskId", {taskId: f}), p = null, d.changed("currentFilter")
    })
  }]
}), define("scripts/services/cam-tasklist-assign-notification", [], function () {
  "use strict";
  return ["camAPI", "Notifications", "$translate", function (e, n, t) {
    var i = e.resource("task");
    return function (e) {
      e.assignee && (e.processInstanceId || e.caseInstanceId) && i.list(e, function (i, a) {
        if (a._embedded.task.length > 0) {
          for (var r, s = "", o = 0; r = a._embedded.task[o]; o++)s += '<a ng-href="#/?task=' + r.id + '" ng-click="removeNotification(notification)">' + r.name + "</a>, ";
          t(e.processInstanceId ? "ASSIGN_NOTE_PROCESS" : "ASSIGN_NOTE_CASE").then(function (e) {
            n.addMessage({duration: 16e3, status: e, message: s.slice(0, -2)})
          })
        }
      })
    }
  }]
}), define("scripts/services/cam-tasklist-configuration", ["angular"], function () {
  "use strict";
  var e = window.camTasklistConf, n = {
    dateFormat: {
      monthName: "MMMM",
      day: "DD",
      abbr: "lll",
      normal: "LLL",
      "long": "LLLL",
      "short": "LL"
    }, locales: {availableLocales: ["en"], fallbackLocale: "en"}
  };
  return [function () {
    this.getDateFormat = function (t) {
      var i = e.dateFormat || n.dateFormat;
      return i[t] || n.dateFormat[t]
    }, this.getFallbackLocale = function () {
      return e.locales && e.locales.fallbackLocale ? e.locales.fallbackLocale : n.locales.fallbackLocale
    }, this.getAvailableLocales = function () {
      return e.locales && e.locales.availableLocales ? e.locales.availableLocales : n.locales.availableLocales
    }, this.getDateLocales = function () {
      return e.camDateLocales
    }, this.$get = function () {
      return this
    }
  }]
}), define("text!scripts/variable/directives/cam-tasklist-variables.html", [], function () {
  return '<div class="variables-list"\n     ng-class="{expanded: (expanded && shownVariablesCount > 2)}">\n\n  <!-- <h6 class="col-xs-12"\n      translate="TASK_VARIABLES">Variables</h6> -->\n\n  <div ng-repeat="(delta, info) in variableDefinitions"\n       ng-if="variablesByName[info.name] || filterProperties.showUndefinedVariable">\n    <div class="col-xs-12 col-lg-6">\n\n      <div class="row variable-item">\n        <!-- <span class="col-xs-4 col-lg-12"\n              ng-click="selectValue($event)"> -->\n        <span class="col-xs-4 col-lg-12">\n          <strong class="variable-label"\n                  ng-class="{\'undefined\' : !variablesByName[info.name] && filterProperties.showUndefinedVariable}"\n                  tooltip-placement="top"\n                  tooltip="{{ info.name }}">\n            {{ info.label }}:\n          </strong>\n        </span>\n\n\n        <span class="col-xs-8 col-lg-12"\n              ng-if="!variablesByName[info.name] && filterProperties.showUndefinedVariable">\n          <span class="variable-value undefined"\n                translate="UNDEFINED_VARIABLE">\n            &lt;Undefined&gt;\n          </span>\n        </span>\n\n\n        <span class="col-xs-8 col-lg-12"\n              ng-if="(variablesByName[info.name] && variablesByName[info.name].value !== null) || variablesByName[info.name].type === \'Bytes\'"\n              ng-switch="variablesByName[info.name].type">\n          <span class="variable-value"\n                ng-switch-when="Date"\n                tooltip-placement="top"\n                tooltip="{{ variablesByName[info.name].value | camDate }}">\n            {{ variablesByName[info.name].value | camDate }}\n          </span>\n\n          <span class="variable-value"\n                ng-switch-when="Null">\n            {{ variablesByName[info.name].value }}\n          </span>\n\n          <a class="variable-value variable-type"\n             ng-switch-when="Object"\n             ng-click="showValue(variablesByName[info.name], $event)">\n            {{ variablesByName[info.name].valueInfo.objectTypeName }}\n          </a>\n\n          <a class="variable-value"\n             ng-switch-when="Bytes"\n             ng-click="download(variablesByName[info.name], $event)">\n            {{ \'DOWNLOAD\' | translate }}\n            <span class="glyphicon glyphicon-download"></span>\n          </a>\n\n          <span class="variable-value"\n                ng-switch-default\n                tooltip-placement="top"\n                tooltip="{{ variablesByName[info.name].value }}">\n            {{ variablesByName[info.name].value }}\n          </span>\n        </span>\n\n        <span class="col-xs-8 col-lg-12"\n          ng-if="variablesByName[info.name].value === null && variablesByName[info.name].type !== \'Bytes\'">\n          <span class="variable-value variable-empty-value"\n                translate="EMPTY_VALUE">Empty</span>\n        </span>\n      </div>\n\n    </div>\n  </div>\n\n\n  <div class="shutter"\n       ng-if="shownVariablesCount > 2"\n       ng-click="toggle($event)"\n       tooltip-placement="bottom"\n       tooltip="{{ (expanded ? \'LESS_VARIABLES\' : \'MORE_VARIABLES\') | translate }}">\n    <a class="glyphicon"\n       ng-class="{\'glyphicon-chevron-up\': expanded, \'glyphicon-chevron-down\': !expanded}">\n    </a>\n  </div>\n</div>\n\n'
}), define("text!scripts/variable/modals/cam-tasklist-variables-detail-modal.html", [], function () {
  return '<div class="modal-header">\n  <h3 class="modal-title">\n    <span translate="VARIABLE_VALUE">Value of</span>\n    {{ variable.name }}\n  </h3>\n</div>\n\n<div class="modal-body">\n  <div class="form-group">\n    <label translate="VARIABLE_VALUE_INFO">Value Info</label>\n  </div>\n  <div class="form-group">\n    {{ \'VARIABLE_OBJECT_TYPE_NAME\' | translate }}:\n    <code class="variable-type">{{ type }}</code>\n  </div>\n  <div class="form-group">\n    {{ \'VARIABLE_SERIALIZATION_DATA_FORMAT\' | translate }}:\n    <code class="variable-type">{{ dataFormat }}</code>\n  </div>\n\n  <div class="form-group">\n    <label translate="VARIABLE_VALUE">Value</label>\n  </div>\n\n   <ul class="nav nav-tabs">\n    <li ng-class="{ active: selectedTab === \'serialized\' }">\n      <a href ng-click="selectTab(\'serialized\')">{{ \'SERIALIZED\' | translate }}</a>\n    </li>\n    <li ng-class="{ active: selectedTab === \'deserialized\' }">\n      <a href ng-click="selectTab(\'deserialized\')">{{ \'DESERIALIZED\' | translate }}</a>\n    </li>\n  </ul>\n\n  <div ng-show="selectedTab === \'serialized\'" class="tab-content">\n    <textarea disabled\n              ng-model="value"\n              rows="10"\n              class="form-control input-xxlarge">\n    </textarea>\n  </div>\n  <div ng-show="selectedTab === \'deserialized\'" class="tab-content">\n    <div class="alert alert-warning"\n         role="alert" \n         ng-show="deserializationError">\n      <strong>{{ \'DESERIALIZATION_ERROR\' | translate }}</strong>:\n      {{ deserializationError }}\n    </div>\n    <div ng-show="!deserializationError">\n      <textarea disabled\n                ng-model="valueDeserialized"\n                rows="10"\n                class="form-control input-xxlarge">\n      </textarea>\n    </div>\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <div class="row row-action">\n    <div class="col-xs-12">\n      <button class="btn btn-xs btn-link"\n              type="submit"\n              ng-click="$dismiss()"\n              translate="CLOSE">Close</button>\n    </div>\n  </div>\n</div>\n'
}), define("scripts/variable/directives/cam-tasklist-variables", ["angular", "text!./cam-tasklist-variables.html", "text!../modals/cam-tasklist-variables-detail-modal.html"], function (e, n, t) {
  "use strict";
  return ["$modal", "$window", "Uri", function (i, a, r) {
    return {
      template: n, scope: {variables: "=", filterProperties: "="}, link: function (n) {
        n.variableDefinitions = [], n.variablesByName = {}, n.expanded = !1, n.shownVariablesCount = 0, n.toggle = function (e) {
          n.expanded = !n.expanded, e && e.preventDefault && e.preventDefault(), e.stopPropagation()
        }, n.showValue = function (e, n) {
          n.preventDefault(), n.stopPropagation(), i.open({
            template: t,
            windowClass: "variable-modal-detail",
            resolve: {
              details: function () {
                return e
              }
            },
            controller: "camTasklistVariablesDetailsModalCtrl"
          })
        }, n.download = function (e, n) {
          n.preventDefault(), n.stopPropagation();
          var t = e._links.self.href + "/data";
          t = r.appUri("engine://engine/:engine" + t), a.open(t, "download")
        }, n.filterProperties && (n.variableDefinitions = n.filterProperties.variables || {}, e.forEach(n.variables, function (e) {
          n.variablesByName[e.name] = e
        }), n.shownVariablesCount = Object.keys(n.filterProperties.showUndefinedVariable ? n.variableDefinitions : n.variablesByName).length)
      }
    }
  }]
}), define("scripts/variable/modals/cam-tasklist-variables-detail-modal", ["angular"], function () {
  "use strict";
  return ["$scope", "$http", "Uri", "details", function (e, n, t, i) {
    switch (e.$on("$locationChangeSuccess", function () {
      e.$dismiss()
    }), e.value = null, e.valueDeserialized = null, e.deserializationError = null, e.type = null, e.dataFormat = null, e.variable = i, e.selectedTab = "serialized", e.variable.type) {
      case"Object":
        e.type = e.variable.valueInfo.objectTypeName, e.value = e.variable.value, e.dataFormat = e.variable.valueInfo.serializationDataFormat, n({
          method: "GET",
          url: t.appUri("engine://engine/:engine" + e.variable._links.self.href)
        }).success(function (n) {
          e.valueDeserialized = JSON.stringify(n.value)
        }).error(function (n) {
          e.deserializationError = n.message
        });
        break;
      default:
        e.value = e.variable.value
    }
    e.selectTab = function (n) {
      e.selectedTab = n
    }
  }]
}), function () {
  "use strict";
  function e(e, n) {
    return e.module("angularMoment", []).constant("angularMomentConfig", {
      preprocess: null,
      timezone: "",
      format: null,
      statefulFilters: !0
    }).constant("moment", n).constant("amTimeAgoConfig", {
      withoutSuffix: !1,
      serverTime: null,
      titleFormat: null
    }).directive("amTimeAgo", ["$window", "moment", "amMoment", "amTimeAgoConfig", "angularMomentConfig", function (n, t, i, a, r) {
      return function (s, o, l) {
        function c() {
          var e;
          if (a.serverTime) {
            var n = (new Date).getTime(), i = n - k + a.serverTime;
            e = t(i)
          } else e = t();
          return e
        }

        function u() {
          v && (n.clearTimeout(v), v = null)
        }

        function d(e) {
          if (o.text(e.from(c(), b)), y && !o.attr("title") && o.attr("title", e.local().format(y)), !I) {
            var t = Math.abs(c().diff(e, "minute")), i = 3600;
            1 > t ? i = 1 : 60 > t ? i = 30 : 180 > t && (i = 300), v = n.setTimeout(function () {
              d(e)
            }, 1e3 * i)
          }
        }

        function p(e) {
          A && o.attr("datetime", e)
        }

        function f() {
          if (u(), m) {
            var e = i.preprocessDate(m, E, g);
            d(e), p(e.toISOString())
          }
        }

        var m, h, v = null, g = r.format, b = a.withoutSuffix, y = a.titleFormat, k = (new Date).getTime(), E = r.preprocess, w = l.amTimeAgo.replace(/^::/, ""), I = 0 === l.amTimeAgo.indexOf("::"), A = "TIME" === o[0].nodeName.toUpperCase();
        h = s.$watch(w, function (e) {
          return "undefined" == typeof e || null === e || "" === e ? (u(), void(m && (o.text(""), p(""), m = null))) : (m = e, f(), void(void 0 !== e && I && h()))
        }), e.isDefined(l.amWithoutSuffix) && s.$watch(l.amWithoutSuffix, function (e) {
          "boolean" == typeof e ? (b = e, f()) : b = a.withoutSuffix
        }), l.$observe("amFormat", function (e) {
          "undefined" != typeof e && (g = e, f())
        }), l.$observe("amPreprocess", function (e) {
          E = e, f()
        }), s.$on("$destroy", function () {
          u()
        }), s.$on("amMoment:localeChanged", function () {
          f()
        })
      }
    }]).service("amMoment", ["moment", "$rootScope", "$log", "angularMomentConfig", function (n, t, i, a) {
      this.preprocessors = {utc: n.utc, unix: n.unix}, this.changeLocale = function (i) {
        var a = n.locale(i);
        return e.isDefined(i) && t.$broadcast("amMoment:localeChanged"), a
      }, this.preprocessDate = function (t, r, s) {
        return e.isUndefined(r) && (r = a.preprocess), this.preprocessors[r] ? this.preprocessors[r](t, s) : (r && i.warn("angular-moment: Ignoring unsupported value for preprocess: " + r), !isNaN(parseFloat(t)) && isFinite(t) ? n(parseInt(t, 10)) : n(t, s))
      }, this.applyTimezone = function (e) {
        var n = a.timezone;
        return e && n && (e.tz ? e = e.tz(n) : i.warn("angular-moment: timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?")), e
      }
    }]).filter("amCalendar", ["moment", "amMoment", "angularMomentConfig", function (e, n, t) {
      function i(t, i) {
        if ("undefined" == typeof t || null === t)return "";
        t = n.preprocessDate(t, i);
        var a = e(t);
        return a.isValid() ? n.applyTimezone(a).calendar() : ""
      }

      return i.$stateful = t.statefulFilters, i
    }]).filter("amDateFormat", ["moment", "amMoment", "angularMomentConfig", function (e, n, t) {
      function i(t, i, a) {
        if ("undefined" == typeof t || null === t)return "";
        t = n.preprocessDate(t, a);
        var r = e(t);
        return r.isValid() ? n.applyTimezone(r).format(i) : ""
      }

      return i.$stateful = t.statefulFilters, i
    }]).filter("amDurationFormat", ["moment", "angularMomentConfig", function (e, n) {
      function t(n, t, i) {
        return "undefined" == typeof n || null === n ? "" : e.duration(n, t).humanize(i)
      }

      return t.$stateful = n.statefulFilters, t
    }]).filter("amTimeAgo", ["moment", "amMoment", "angularMomentConfig", function (e, n, t) {
      function i(t, i, a) {
        if ("undefined" == typeof t || null === t)return "";
        t = n.preprocessDate(t, i);
        var r = e(t);
        return r.isValid() ? n.applyTimezone(r).fromNow(a) : ""
      }

      return i.$stateful = t.statefulFilters, i
    }])
  }

  "function" == typeof define && define.amd ? define("angular-moment", ["angular", "moment"], e) : "undefined" != typeof module && module && module.exports ? e(angular, require("moment")) : e(angular, window.moment)
}(), define("scripts/variable/index", ["angular", "./directives/cam-tasklist-variables", "./modals/cam-tasklist-variables-detail-modal", "angular-moment"], function (e, n, t) {
  "use strict";
  var i = e.module("cam.tasklist.variables", ["ui.bootstrap", "angularMoment"]);
  return i.directive("camTasklistVariables", n), i.controller("camTasklistVariablesDetailsModalCtrl", t), i
}), define("scripts/tasklist/controller/cam-tasklist-list-ctrl", [], function () {
  "use strict";
  return ["$scope", "Views", function (e, n) {
    e.tasklistVars = {read: ["tasklistData"]}, e.tasklistPlugins = n.getProviders({component: "tasklist.list"})
  }]
}), define("text!scripts/tasklist/directives/cam-tasklist-sorting-choices.html", [], function () {
  return '<span class="sorting-label hidden-xs hidden-sm hidden-md"\n      translate="SORT_BY"></span>\n\n<ol class="sorting-choice list-inline">\n  <li ng-repeat="(index, sorting) in sortings"\n      class="sorting-choice dropdown"\n      is-open="openDropdowns[index]"\n      on-toggle="openDropdown(index, open)">\n    <a class="glyphicon glyphicon-minus-sign"\n       ng-if="sortings.length > 1"\n       ng-click="removeSorting(index)"\n       tooltip-placement="bottom"\n       tooltip="{{ \'REMOVE_SORTING\' | translate }}"></a>\n\n    <a href\n       tabindex="-1"\n       class="dropdown-toggle">\n      <span class="sort-by">{{ byLabel(index) }}</span>\n    </a>\n\n    <a href\n       tabindex="-1"\n       tooltip="{{ (sorting.order === \'desc\' ? \'DESC\' : \'ASC\') | translate }}"\n       class="sort-direction glyphicon"\n       ng-class="sorting.order === \'asc\' ? \'glyphicon-chevron-up\' : \'glyphicon-chevron-down\'"\n       ng-click="changeOrder(index)"></a>\n\n    <ul cam-sorting-dropdown\n        options="availableOptions"\n        click-handler="changeSorting(index, id, type, value)"\n        reset-function="resetFunctions[index]"\n        change="true">\n    </ul>\n  </li>\n\n  <li class="dropdown new-sort"\n      is-open="openDropdownNew"\n      on-toggle="openDropdown(-1, open)">\n    <a href\n       class="dropdown-toggle">\n      <span class="glyphicon glyphicon-plus-sign"\n            tooltip="{{ \'ADD_SORT_BY\' | translate }}"></span>\n      <span class="hidden-xs hidden-sm hidden-md"\n            translate="ADD_SORT_BY"></span>\n    </a>\n\n    <ul cam-sorting-dropdown\n        options="availableOptions"\n        click-handler="addSorting(id, type, value)"\n        reset-function="resetFunctions[-1]">\n    </ul>\n  </li>\n</ol>\n'
}), define("scripts/tasklist/directives/cam-tasklist-sorting-choices", ["angular", "text!./cam-tasklist-sorting-choices.html"], function (e, n) {
  "use strict";
  function t(e) {
    return JSON.stringify(e.map(function (e) {
      var n = {sortBy: e.by, sortOrder: e.order};
      if (e.by.indexOf("Variable") > -1) {
        if (!e.parameters)throw new Error("Variable sorting needs parameters");
        n.parameters = e.parameters
      }
      return n
    }))
  }

  return ["search", "$translate", "$location", "$timeout", function (i, a, r, s) {
    return {
      restrict: "A", scope: {tasklistData: "="}, template: n, controller: [function () {
      }], link: function (n, o) {
        function l() {
          p && s.cancel(p), p = s(function () {
            var e = o.parents(".columns"), n = e.find(".cell.top"), t = e.find(".cell.content"), i = u.hasClass("list-column-close");
            if (o.css("height", "auto"), i) {
              var a = parseInt(n.css("min-height"), 10);
              return n.css("height", a), void t.css("top", a)
            }
            var r = o.height(), s = o.parent();
            s.height(r);
            var l = r;
            n.height(l), t.css("top", l + 30), p = null
          }, 100)
        }

        function c(e) {
          var n = e.parent().position().left, t = e.outerWidth() + n;
          t > o.outerWidth() && e.css("left", o.outerWidth() - t + "px")
        }

        var u = e.element("body"), d = o.find(".new-sort .dropdown-menu");
        n.sortings = [{order: "desc", by: "created"}], n.openDropdowns = [], n.openDropdownNew = !1, n.sortedOn = [];
        var p;
        n.$on("layout:change", l), n.uniqueProps = {
          priority: a.instant("PRIORITY"),
          created: a.instant("CREATION_DATE"),
          dueDate: a.instant("DUE_DATE"),
          followUpDate: a.instant("FOLLOW_UP_DATE"),
          nameCaseInsensitive: a.instant("TASK_NAME"),
          assignee: a.instant("ASSIGNEE")
        }, n.byLabel = function (e) {
          if (!n.sortings[e])return "";
          var t = n.sortings[e].by;
          return n.uniqueProps[t] ? n.uniqueProps[t].toLowerCase() : n.sortings[e] && n.sortings[e].parameters ? n.sortings[e].parameters.variable : ""
        };
        var f = n.tasklistData.newChild(n);
        f.observe("taskListQuery", function (t) {
          if (t) {
            var i = JSON.parse((r.search() || {}).sorting || "[]");
            n.sortedOn = [], n.openDropdowns = [], n.availableOptions = e.copy(n.uniqueProps), n.sortings = i.map(function (e) {
              n.sortedOn.push(e.sortBy), n.openDropdowns.push(!1), delete n.availableOptions[e.sortBy];
              var t = {order: e.sortOrder, by: e.sortBy};
              return e.parameters && (t.parameters = e.parameters), t
            }), n.sortings.length || n.addSorting("created"), l()
          }
        }), n.$watch("sortings.length", function (e, t) {
          e !== t && n.updateSortings()
        }), n.$watch("sortings", l, !0), n.$watch("openDropdowns", function (n) {
          var t = n.indexOf(!0), i = o.find("li.sorting-choice .dropdown-menu").css("left", "auto");
          t > -1 && i[t] && c(e.element(i[t]))
        }, !0), n.$watch("openDropdownNew", function (e) {
          e ? c(d) : d.css("left", "auto")
        }), n.changeSorting = function (e, t, i, a) {
          n.sortings[e].by = t, delete n.sortings[e].parameters, i && (n.sortings[e].parameters = {
            variable: a,
            type: i
          }), n.updateSortings()
        }, n.resetFunctions = [], n.openDropdown = function (e, t) {
          if (t) {
            var i = n.sortings[e];
            i ? n.resetFunctions[e](i.by, i.parameters && i.parameters.type, i.parameters && i.parameters.variable) : n.resetFunctions[e]()
          }
        }, n.updateSortings = function () {
          n.openDropdowns = [], n.sortedOn = n.sortings.map(function (e) {
            return n.openDropdowns.push(!1), e.by
          }), i.updateSilently({sorting: t(n.sortings)}), f.changed("taskListQuery"), l()
        }, n.addSorting = function (e, t, i) {
          var a = {order: "desc", by: e};
          t && (a.parameters = {variable: i, type: t}), n.sortings.push(a), n.updateSortings()
        }, n.removeSorting = function (e) {
          n.sortings.splice(e, 1), n.updateSortings()
        }, n.changeOrder = function (e) {
          n.sortings[e].order = "asc" === n.sortings[e].order ? "desc" : "asc", n.updateSortings()
        }
      }
    }
  }]
}), define("text!scripts/tasklist/directives/cam-tasklist-sorting-dropdown.html", [], function () {
  return '<ul class="dropdown-menu">\n  <!-- single time selectable -->\n  <li ng-repeat="(name, label) in options">\n    <a tabindex="-1"\n       translate="{{ label }}"\n       ng-click="handleClick($event, name)">\n    </a>\n  </li>\n\n  <li class="divider"\n      ng-if="hasOptions()"></li>\n\n  <!-- multiple times selectable -->\n  <li ng-repeat="(name, label) in sortableVariables"\n      ng-click="showInputs($event, name)"\n      ng-class="{\'active\': name === focusedOn}">\n    <a translate="{{ label }}"\n       tabindex="-1"></a>\n\n    <div ng-show="name === focusedOn"\n         cam-sorting-inputs\n         change="change"\n         apply-handler="handleClick($event, name)"\n         variable="variable"\n         reset-function="resetInputs[name]"></div>\n  </li>\n\n</ul>\n'
}), define("scripts/tasklist/directives/cam-tasklist-sorting-dropdown", ["angular", "text!./cam-tasklist-sorting-dropdown.html"], function (e, n) {
  "use strict";
  return ["$translate", function (e) {
    return {
      restrict: "A",
      replace: !0,
      template: n,
      scope: {options: "=", clickHandler: "&", change: "&", resetFunction: "="},
      link: function (n) {
        n.change = n.$eval(n.change), n.variable = {varName: "", varType: "Integer"}, n.hasOptions = function () {
          return n.options && Object.keys(n.options).length > 0
        }, n.resetInputs = {}, n.resetFunction = function (e, t, i) {
          n.sortableVariables[e] ? (n.focusedOn = e, n.variable.varType = t, n.variable.varName = i) : (n.focusedOn = null, n.variable.varType = "Integer", n.variable.varName = "")
        }, n.handleClick = function (e, t) {
          n.clickHandler(n.sortableVariables[t] ? {
            $event: e,
            id: t,
            type: n.variable.varType,
            value: n.variable.varName
          } : {$event: e, id: t})
        }, n.sortableVariables = {
          processVariable: e.instant("PROCESS_VARIABLE"),
          executionVariable: e.instant("EXECUTION_VARIABLE"),
          taskVariable: e.instant("TASK_VARIABLE"),
          caseExecutionVariable: e.instant("CASE_EXECUTION_VARIABLE"),
          caseInstanceVariable: e.instant("CASE_INSTANCE_VARIABLE")
        }, n.showInputs = function (e, t) {
          e.preventDefault(), e.stopPropagation(), n.focusedOn = t
        }
      }
    }
  }]
}), define("text!scripts/tasklist/directives/cam-tasklist-sorting-inputs.html", [], function () {
  return '<div class="variable-inputs">\n  <div class="form-group">\n    <input type="text"\n           placeholder="{{ \'VARIABLE_NAME\' | translate }}"\n           class="form-control"\n           ng-model="variable.varName"\n           autofocus />\n  </div>\n\n  <div class="form-group">\n    <select class="form-control"\n            ng-model="variable.varType">\n      <option ng-repeat="(varType, varText) in variableTypes"\n              ng-selected="varType === variable.varType"\n              value="{{ varType }}">{{ varText }}</option>\n    </select>\n  </div>\n\n  <div class="form-group actions">\n    <button ng-click="applySorting($event)"\n            ng-disabled="!variable"\n            class="btn btn-primary btn-sm">\n      {{ (change ? \'CHANGE\' : \'ADD\') | translate }}\n    </button>\n  </div>\n</div>\n'
}), define("scripts/tasklist/directives/cam-tasklist-sorting-inputs", ["angular", "text!./cam-tasklist-sorting-inputs.html"], function (e, n) {
  "use strict";
  return ["$translate", function (e) {
    return {
      restrict: "AC",
      replace: !0,
      template: n,
      scope: {change: "=", applyHandler: "&", resetFunction: "=", variable: "="},
      controller: ["$scope", function (n) {
        n.variableTypes = {
          Boolean: e.instant("BOOLEAN"),
          Double: e.instant("DOUBLE"),
          Date: e.instant("DATE"),
          Integer: e.instant("INTEGER"),
          Long: e.instant("LONG"),
          Short: e.instant("SHORT"),
          String: e.instant("STRING")
        }, n.applySorting = function (e) {
          n.applyHandler({$event: e})
        }
      }]
    }
  }]
}), define("text!scripts/tasklist/directives/cam-tasklist-tasks.html", [], function () {
  return '<div ng-show="!state.$loaded && !state.$error"\n     class="loader">\n  <span class="animate-spin glyphicon glyphicon-refresh"></span>\n  {{ \'LOADING\' | translate }}\n</div>\n\n<div ng-show="state.$error" class="alert alert-danger" role="alert">\n  <span class="glyphicon glyphicon-exclamation-sign"></span>\n  <strong class="status">{{ \'FAILURE\' | translate }}:</strong>\n  <span class="message">{{ \'TASK_LIST_LOADING_FAILURE\' | translate }}</span>\n</div>\n\n<div ng-show="state.$loaded && !state.$error">\n\n  <div ng-hide="totalItems"\n       class="well">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'NO_MATCHING_TASK\' | translate }}\n  </div>\n\n  <div ng-show="totalItems && !tasks" class="well">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'RESTRICTION_NOTICE\' | translate }}\n    <a ng-click="resetPage()">{{ \'RESET_PAGE\' | translate }}</a>\n  </div>\n\n  <div ng-show="totalItems"\n       tabindex="0"\n       ng-keydown="handleKeydown($event)">\n    <ol class="tasks-list list-unstyled">\n      <li class="task"\n          ng-repeat="(delta, task) in tasks"\n          ng-class="{active: currentTaskId === task.id}">\n\n        <div class="priority"\n             tooltip-placement="right"\n             tooltip="{{ \'PRIORITY\' | translate }}">\n          {{ task.priority }}\n        </div>\n\n        <div class="clickable"\n             ng-click="focus($event, task)">\n          <div class="names">\n            <h4 class="task">\n              <a ng-href="{{ getHrefUrl(task) }}"\n                 ng-click="focus($event, task)">\n                {{ task.name || task.taskDefinitionKey || task.id }}\n              </a>\n            </h4>\n\n            <h6 class="process-definition"\n                ng-if="task.processDefinitionId">\n              {{ task._embedded.processDefinition[0].name || task._embedded.processDefinition[0].key }}\n            </h6>\n\n            <h6 class="case-definition"\n                ng-if="task.caseDefinitionId">\n              {{ task._embedded.caseDefinition[0].name || task._embedded.caseDefinition[0].key }}\n            </h6>\n          </div>\n\n\n          <div class="row"\n               ng-click="focus($event, task)">\n            <ul class="col-sm-12 col-md-6 dates list-inline">\n              <li class="creation-date">\n                <span tooltip-placement="top"\n                      tooltip="{{ \'CREATION_DATE\' | translate }}"\n                      class="glyphicon glyphicon-bookmark"></span>\n                <span tooltip-placement="top"\n                      tooltip="{{ task.created | camDate:\'long\' }}"\n                      am-time-ago="task.created">{{ task.created }}</span>\n              </li>\n\n              <li class="followup-date"\n                  ng-if="!!task.followUp"\n                  ng-class="{overdue: task.followUp && (task.followUp < now) }">\n                <span tooltip-placement="top"\n                      tooltip="{{ \'FOLLOW_UP_DATE\' | translate }}"\n                      class="glyphicon glyphicon-calendar"></span>\n                <span tooltip-placement="top"\n                      tooltip="{{ task.followUp | camDate:\'long\' }}"\n                      am-time-ago="task.followUp">{{ task.followUp }}</span>\n              </li>\n\n              <li class="due-date"\n                  ng-if="!!task.due"\n                  ng-class="{overdue: task.due && (task.due < now) }">\n                <span tooltip-placement="top"\n                      tooltip="{{ \'DUE_DATE\' | translate }}"\n                      class="glyphicon glyphicon-bell"></span>\n                <span tooltip-placement="top"\n                      tooltip="{{ task.due | camDate:\'long\' }}"\n                      am-time-ago="task.due">{{ task.due }}</span>\n              </li>\n            </ul>\n\n            <ul class="col-sm-12 col-md-6 actors list-inline"\n                ng-if="!!task.assignee">\n              <li class="assignee">\n                <span tooltip-placement="top"\n                      tooltip="{{ \'ASSIGNEE\' | translate }}"\n                      class="glyphicon glyphicon-user"></span>\n                <span ng-if="assignees[task.assignee] && ( assignees[task.assignee].firstName || assignees[task.assignee].lastName )">\n                  <span tooltip-placement="top"\n                        tooltip="{{ assignees[task.assignee].firstName }} {{ assignees[task.assignee].lastName }} ({{ task.assignee }})">\n                    {{ assignees[task.assignee].firstName }} {{ assignees[task.assignee].lastName }}\n                  </span>\n                </span>\n                <span ng-if="!(assignees[task.assignee] && ( assignees[task.assignee].firstName || assignees[task.assignee].lastName ))">\n                  <span tooltip-placement="top"\n                        tooltip="{{ task.assignee }}">\n                    {{ task.assignee }}\n                  </span>\n                </span>\n              </li>\n            </ul>\n          </div>\n\n          <div cam-tasklist-variables\n               filter-properties="filterProperties"\n               variables="task._embedded.variable"\n               class="row variables" />\n       </div>\n      </li>\n    </ol>\n  </div>\n</div>\n\n<pagination ng-show="state.$loaded && totalItems > pageSize"\n            total-items="totalItems"\n            items-per-page="pageSize"\n            max-size="5"\n            class="pagination-sm"\n            boundary-links="true"\n            ng-model="pageNum"\n            ng-change="pageChange()"\n            next-text="&rsaquo;"\n            last-text="&raquo;"\n            previous-text="&lsaquo;"\n            first-text="&laquo;"></pagination>\n'
}), define("scripts/tasklist/directives/cam-tasklist-tasks", ["angular", "moment", "text!./cam-tasklist-tasks.html"], function (e, n, t) {
  "use strict";
  var i = e.element;
  return [function () {
    return {
      restrict: "A",
      scope: {tasklistData: "="},
      template: t,
      controller: ["$scope", "$location", "search", "$timeout", "$element", function (n, t, a, r, s) {
        function o(e) {
          a.updateSilently(e)
        }

        var l = !1;
        n.pageNum = 1, n.pageSize = null, n.totalItems = 0, n.now = (new Date).toJSON(), n.filterProperties = null;
        var c = n.tasklistData.newChild(n);
        n.query = {}, n.assignees = {};
        var u = function (e) {
          for (var t = 0; t < e.length; t++)n.assignees[e[t].id] = e[t]
        };
        n.state = c.observe("taskList", function (e) {
          n.totalItems = e.count, n.tasks = e._embedded.task, e._embedded.assignee && u(e._embedded.assignee), l && (n.focus(null, n.tasks["first" === l ? 0 : n.pageSize - 1]), r(function () {
            s.find("div[ng-keydown]").trigger("focus").find("li.active")[0].scrollIntoView(!1)
          }, 0), l = !1)
        }), c.observe("taskListQuery", function (t) {
          t && (n.query = e.copy(t), n.pageSize = n.query.maxResults, n.pageNum = n.query.firstResult / n.pageSize + 1)
        }), c.observe("taskId", function (e) {
          n.currentTaskId = e.taskId
        }), c.observe(["currentFilter", function (e) {
          e && (n.filterProperties = null !== e ? e.properties : null)
        }]), n.focus = function (e, i) {
          e && e.preventDefault();
          var a = i.id;
          c.set("taskId", {taskId: a}), n.currentTaskId = a;
          var r = t.search() || {};
          r.task = a, o(r)
        };
        var d = function () {
          for (var e = 0; e < n.tasks.length - 1; e++)if (n.tasks[e].id === n.currentTaskId)return n.focus(null, n.tasks[e + 1]);
          n.pageNum < Math.ceil(n.totalItems / n.pageSize) && (n.pageNum++, l = "first", n.pageChange())
        }, p = function () {
          for (var e = 1; e < n.tasks.length; e++)if (n.tasks[e].id === n.currentTaskId)return n.focus(null, n.tasks[e - 1]);
          n.pageNum > 1 && (n.pageNum--, l = "last", n.pageChange())
        };
        n.handleKeydown = function (e) {
          40 === e.keyCode ? (e.preventDefault(), d(e)) : 38 === e.keyCode && (e.preventDefault(), p()), r(function () {
            var n = i(e.target).find("li.active")[0];
            n && n.scrollIntoView(!1)
          })
        }, n.getHrefUrl = function (e) {
          var n = "#/?task=" + e.id, i = t.search().detailsTab;
          return i && (n = n + "&detailsTab=" + i), n
        }, n.pageChange = function () {
          o({page: n.pageNum}), c.changed("taskListQuery")
        }, n.resetPage = function () {
          o({page: 1}), c.changed("taskListQuery")
        }
      }]
    }
  }]
}), define("scripts/tasklist/filters/cam-query-component", ["angular", "moment"], function () {
  "use strict";
  return ["$filter", function (e) {
    function n(e) {
      return e.match(t)
    }

    var t = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/, i = e("camDate");
    return function (e) {
      return e && n(e) ? i(e, "abbr") : e ? e : "??"
    }
  }]
}), define("text!scripts/tasklist/plugins/cam-tasklist-search-plugin.html", [], function () {
  return '<div cam-widget-search\n     cam-widget-search-valid-searches="searches"\n     cam-widget-search-translations="translations"\n     cam-widget-search-types="types"\n     cam-widget-search-operators="operators"\n/>\n'
}), define("text!scripts/tasklist/plugins/cam-tasklist-search-plugin-config.json", [], function () {
  return '{\n  "types": [\n    {\n      "id": {\n        "key": "processVariables",\n        "value": "PROCESS_VARIABLE"\n      },\n      "extended": true,\n      "allowDates": true\n    },\n    {\n      "id": {\n        "key": "taskVariables",\n        "value": "TASK_VARIABLE"\n      },\n      "extended": true,\n      "allowDates": true\n    },\n    {\n      "id": {\n        "key": "caseInstanceVariables",\n        "value": "CASE_VARIABLE"\n      },\n      "extended": true,\n      "allowDates": true\n    },\n    {\n      "id": {\n        "key": "processInstanceId",\n        "value": "PROCESS_INSTANCE_ID"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "processInstanceBusinessKey",\n        "value": "PROCESS_INSTANCE_BUSINESS_KEY"\n      },\n      "operators": [\n        {\n          "key": "Like",\n          "value": "LIKE"\n        },{\n          "key": "eq",\n          "value": "="\n        }\n\n      ]\n    },    {\n      "id": {\n        "key": "processDefinitionId",\n        "value": "PROCESS_DEFINITION_ID"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "processDefinitionKey",\n        "value": "PROCESS_DEFINITION_KEY"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "processDefinitionName",\n        "value": "PROCESS_DEFINITION_NAME"\n      },\n      "operators": [\n        {\n          "key": "Like",\n          "value": "LIKE"\n        },{\n          "key": "eq",\n          "value": "="\n        }\n\n      ]\n    },    {\n      "id": {\n        "key": "executionId",\n        "value": "EXECUTION_ID"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "caseInstanceId",\n        "value": "CASE_INSTANCE_ID"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "caseInstanceBusinessKey",\n        "value": "CASE_INSTANCE_BUSINESS_KEY"\n      },\n      "operators": [\n        {\n          "key": "Like",\n          "value": "LIKE"\n        },{\n          "key": "eq",\n          "value": "="\n        }\n\n      ]\n    },    {\n      "id": {\n        "key": "caseDefinitionId",\n        "value": "CASE_DEFINITION_ID"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "caseDefinitionKey",\n        "value": "CASE_DEFINITION_KEY"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "caseDefinitionName",\n        "value": "CASE_DEFINITION_NAME"\n      },\n      "operators": [\n        {\n          "key": "Like",\n          "value": "LIKE"\n        },{\n          "key": "eq",\n          "value": "="\n        }\n\n      ]\n    },    {\n      "id": {\n        "key": "caseExecutionId",\n        "value": "CASE_EXECUTION_ID"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "assignee",\n        "value": "ASSIGNEE"\n      },\n      "operators": [\n        {\n          "key": "Like",\n          "value": "LIKE"\n        },{\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "owner",\n        "value": "OWNER"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "candidateGroup",\n        "value": "CANDIDATE_GROUP"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "candidateUser",\n        "value": "CANDIDATE_USER"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "involvedUser",\n        "value": "INVOLVED_USER"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "taskDefinitionKey",\n        "value": "TASK_DEFINITION_KEY"\n      },\n      "operators": [\n        {\n          "key": "Like",\n          "value": "LIKE"\n        },{\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "name",\n        "value": "NAME"\n      },\n      "operators": [\n        {\n          "key": "Like",\n          "value": "LIKE"\n        },{\n          "key": "eq",\n          "value": "="\n        }\n\n      ],\n      "default": true\n    },    {\n      "id": {\n        "key": "description",\n        "value": "DESCRIPTION"\n      },\n      "operators": [\n        {\n          "key": "Like",\n          "value": "LIKE"\n        },{\n          "key": "eq",\n          "value": "="\n        }\n\n      ]\n    },    {\n      "id": {\n        "key": "priority",\n        "value": "PRIORITY"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        },\n        {\n          "key": "max",\n          "value": "<="\n        },\n        {\n          "key": "min",\n          "value": ">="\n        }\n      ]\n    },    {\n      "id": {\n        "key": "due",\n        "value": "DUE_DATE"\n      },\n      "operators": [\n        {\n          "key": "Before",\n          "value": "BEFORE"\n        },\n        {\n          "key": "After",\n          "value": "AFTER"\n        }\n      ],\n      "allowDates": true,\n      "enforceDates": true\n    },    {\n      "id": {\n        "key": "followUp",\n        "value": "FOLLOW_UP_DATE"\n      },\n      "operators": [\n        {\n          "key": "Before",\n          "value": "BEFORE"\n        },\n        {\n          "key": "After",\n          "value": "AFTER"\n        }\n      ],\n      "allowDates": true,\n      "enforceDates": true\n    },    {\n      "id": {\n        "key": "created",\n        "value": "CREATION_DATE"\n      },\n      "operators": [\n        {\n          "key": "Before",\n          "value": "BEFORE"\n        },\n        {\n          "key": "After",\n          "value": "AFTER"\n        }\n      ],\n      "allowDates": true,\n      "enforceDates": true\n    },    {\n      "id": {\n        "key": "delegationState",\n        "value": "DELEGATION_STATE"\n      },\n      "operators": [\n        {\n          "key": "eq",\n          "value": "="\n        }\n      ]\n    }\n  ],\n  "operators": {\n    "date": [\n      {\n        "key": "lteq",\n        "value": "BEFORE"\n      },\n      {\n        "key": "gteq",\n        "value": "AFTER"\n      }\n    ],\n    "boolean": [\n      {\n        "key": "eq",\n        "value": "="\n      },\n      {\n        "key": "neq",\n        "value": "!="\n      }\n    ],\n    "object": [\n      {\n        "key": "eq",\n        "value": "="\n      },\n      {\n        "key": "neq",\n        "value": "!="\n      }\n    ],\n    "number": [\n      {\n        "key": "eq",\n        "value": "="\n      },\n      {\n        "key": "neq",\n        "value": "!="\n      },\n      {\n        "key": "gt",\n        "value": ">"\n      },\n      {\n        "key": "gteq",\n        "value": ">="\n      },\n      {\n        "key": "lt",\n        "value": "<"\n      },\n      {\n        "key": "lteq",\n        "value": "<="\n      }\n    ],\n    "string": [\n      {\n        "key": "eq",\n        "value": "="\n      },\n      {\n        "key": "neq",\n        "value": "!="\n      },\n      {\n        "key": "gt",\n        "value": ">"\n      },\n      {\n        "key": "gteq",\n        "value": ">="\n      },\n      {\n        "key": "lt",\n        "value": "<"\n      },\n      {\n        "key": "lteq",\n        "value": "<="\n      },\n      {\n        "key": "like",\n        "value": "like"\n      }\n    ],\n    "undefined": [\n      {\n        "key": "eq",\n        "value": "="\n      },\n      {\n        "key": "neq",\n        "value": "!="\n      },\n      {\n        "key": "gt",\n        "value": ">"\n      },\n      {\n        "key": "gteq",\n        "value": ">="\n      },\n      {\n        "key": "lt",\n        "value": "<"\n      },\n      {\n        "key": "lteq",\n        "value": "<="\n      },\n      {\n        "key": "like",\n        "value": "like"\n      }\n    ]\n  },\n  "tooltips": {\n    "inputPlaceholder": "SEARCH_PLACEHOLDER",\n    "invalid": "INVALID_SEARCH",\n    "deleteSearch": "DELETE_SEARCH",\n    "type": "TYPE",\n    "name": "PROPERTY",\n    "operator": "OPERATOR",\n    "value": "VALUE"\n  }\n}\n'
}), define("scripts/tasklist/plugins/cam-tasklist-search-plugin", ["angular", "text!./cam-tasklist-search-plugin.html", "text!./cam-tasklist-search-plugin-config.json"], function (e, n, t) {
  "use strict";
  var i = /^[\s]*(\#|\$)\{/, a = JSON.parse(t), r = function (e) {
    return isNaN(e) || "" === e.trim() ? "true" === e ? !0 : "false" === e ? !1 : "NULL" === e ? null : 0 === e.indexOf("'") && e.lastIndexOf("'") === e.length - 1 ? e.substr(1, e.length - 2) : e : +e
  }, s = function (e, n) {
    return "Like" === n || "like" === n ? "%" + e + "%" : e
  }, o = function (e, n, t, a) {
    var r = n;
    return -1 !== ["Like", "Before", "After"].indexOf(t) && (r += t), i.test(a) && -1 !== ["assignee", "owner", "candidateGroup", "candidateUser", "involvedUser"].indexOf(n) && (r += "Expression"), r
  }, l = ["$scope", "$translate", function (n, t) {
    n.searches = [], n.translations = {}, e.forEach(a.tooltips, function (e, i) {
      n.translations[i] = t.instant(e)
    }), n.types = a.types.map(function (e) {
      return e.id.value = t.instant(e.id.value), e.operators && (e.operators = e.operators.map(function (e) {
        return e.value = t.instant(e.value), e
      })), e
    }), n.operators = a.operators, e.forEach(n.operators.date, function (e) {
      e.value = t.instant(e.value)
    });
    var i = n.tasklistData.newChild(n);
    n.$watch("searches", function () {
      var t = {};
      t.processVariables = [], t.taskVariables = [], t.caseInstanceVariables = [], e.forEach(n.searches, function (e) {
        "object" == typeof t[e.type.value.key] ? t[e.type.value.key].push({
          name: "object" == typeof e.name.value ? e.name.value.key : e.name.value,
          operator: e.operator.value.key,
          value: s(r(e.value.value), e.operator.value.key)
        }) : t[o(e, e.type.value.key, e.operator.value.key, e.value.value)] = s(r(e.value.value), e.operator.value.key)
      }), i.set("searchQuery", t)
    }, !0), i.observe("currentFilter", function (t) {
      e.forEach(n.types, function (e) {
        e.potentialNames = [];
        for (var n = 0; n < (t.properties.variables && t.properties.variables.length); n++) {
          var i = t.properties.variables[n];
          e.potentialNames.push({key: i.name, value: i.label + " (" + i.name + ")"})
        }
      }), e.forEach(n.searches, function (e) {
        e.potentialNames = n.types.filter(function (n) {
          return n.id.key === e.type.value.key
        })[0].potentialNames
      })
    })
  }], c = function (e) {
    e.registerDefaultView("tasklist.list", {id: "task-search", template: n, controller: l, priority: 100})
  };
  return c.$inject = ["ViewsProvider"], c
}), define("scripts/tasklist/index", ["angular", "./controller/cam-tasklist-list-ctrl", "./directives/cam-tasklist-sorting-choices", "./directives/cam-tasklist-sorting-dropdown", "./directives/cam-tasklist-sorting-inputs", "./directives/cam-tasklist-tasks", "./filters/cam-query-component", "./plugins/cam-tasklist-search-plugin"], function (e, n, t, i, a, r, s, o) {
  "use strict";
  var l = e.module("cam.tasklist.tasklist", ["ui.bootstrap"]);
  return l.controller("camListCtrl", n), l.directive("camSortingChoices", t), l.directive("camSortingDropdown", i), l.directive("camSortingInputs", a), l.directive("camTasks", r), l.filter("camQueryComponent", s), l.config(o), l
}), define("text!scripts/task/directives/cam-tasklist-task.html", [], function () {
  return '<div ng-show="!taskState.$loaded"\n     class="loader">\n  <span class="animate-spin glyphicon glyphicon-refresh"></span>\n  {{ \'LOADING\' | translate }}\n</div>\n\n<div ng-show="taskState.$loaded">\n  <div ng-hide="task">\n    <div class="no-task well">\n      <span class="glyphicon glyphicon-info-sign"></span>\n      {{ \'SELECT_TASK_IN_LIST\' | translate }}\n    </div>\n  </div>\n\n  <section ng-if="task" class="task-card">\n    <header class="row">\n      <div class="col-xs-12">\n        <div class="names">\n          <h2 class="task">{{ task.name || task.taskDefinitionKey || task.id }}</h2>\n          <h4 class="process-definition"\n              ng-if="task.processDefinitionId">\n            {{ task._embedded.processDefinition[0].name || task._embedded.processDefinition[0].key }}\n          </h4>\n          <h4 class="case-definition"\n              ng-if="task.caseDefinitionId">\n            {{ task._embedded.caseDefinition[0].name || task._embedded.caseDefinition[0].key }}\n          </h4>\n        </div>\n\n        <div cam-tasklist-task-meta\n             task-data="taskData"\n             error-handler="errorHandler"></div>\n      </div>\n    </header>\n\n    <div class="row tabbed-content">\n\n      <div ng-show="taskDetailTabs.length" class="col-xs-12">\n        <ul class="nav nav-tabs">\n          <li ng-class="{ active: selectedTaskDetailTab == taskDetailTab }" ng-repeat="taskDetailTab in taskDetailTabs">\n            <a href ng-click="selectTaskDetailTab(taskDetailTab)">{{ taskDetailTab.label | translate }}</a>\n          </li>\n        </ul>\n\n        <div class="tab-content">\n          <view provider="selectedTaskDetailTab" vars="taskVars" />\n        </div>\n\n      </div>\n    </div>\n\n  </section>\n\n</div>\n\n\n'
}), define("scripts/task/directives/cam-tasklist-task", ["angular", "text!./cam-tasklist-task.html", "jquery"], function (e, n) {
  "use strict";
  !function () {
    function e() {
      this.errorProvider = null
    }

    return e
  }();
  return [function () {
    return {
      restrict: "A",
      scope: {tasklistData: "="},
      template: n,
      controller: ["$scope", "$q", "$location", "$translate", "Notifications", "camAPI", "Views", "search", function (n, t, i, a, r, s, o, l) {
        function c(e, t) {
          a(e).then(function (e) {
            r.addError({status: e, message: t ? t.message : "", exclusive: !0, scope: n})
          })
        }

        function u(e) {
          if (e) {
            if (-1 !== e.indexOf("task is null") || -1 !== e.indexOf("No matching task"))return "TASK_NOT_EXIST";
            if (-1 !== e.indexOf("is suspended"))return "INSTANCE_SUSPENDED"
          }
          return e
        }

        function d(n) {
          if (n) {
            var t = i.search() || {};
            delete t.task, delete t.detailsTab, i.search(e.copy(t))
          } else f.set("taskId", {taskId: null});
          f.changed("taskList")
        }

        function p(e) {
          var t = l().detailsTab;
          if (e && e.length) {
            if (t) {
              var i = o.getProvider({component: "tasklist.task.detail", id: t});
              if (i && -1 != e.indexOf(i))return void(n.selectedTaskDetailTab = i)
            }
            l.updateSilently({detailsTab: null}), n.selectedTaskDetailTab = e[0]
          }
        }

        var f = (s.resource("task"), n.taskData = n.tasklistData.newChild(n));
        n.errorHandler = function (e, n) {
          var t = u(n.message);
          return "TASK_NOT_EXIST" === t || "INSTANCE_SUSPENDED" === t ? a(t).then(function (t) {
            n.message = t, c(e, n), d(!0)
          }) : void c(e, n)
        }, n.$watch("taskState.$error", function (e) {
          if (e) {
            var n = u(e.message);
            c(n, e), d(!1)
          }
        }), f.provide("assignee", ["task", function (e) {
          if (e && e._embedded && e._embedded.identityLink)for (var n = 0; n < e._embedded.identityLink.length; n++)if ("assignee" === e._embedded.identityLink[n].type)return e._embedded.identityLink[n]._embedded.user ? e._embedded.identityLink[n]._embedded.user[0] : {id: e._embedded.identityLink[n].userId};
          return null
        }]), f.provide("groups", ["task", function (e) {
          var n = [];
          if (e && e._embedded && e._embedded.identityLink)for (var t = 0; t < e._embedded.identityLink.length; t++)"candidate" === e._embedded.identityLink[t].type && null !== e._embedded.identityLink[t].groupId && n.push(e._embedded.identityLink[t]._embedded.group ? e._embedded.identityLink[t]._embedded.group[0] : {id: e._embedded.identityLink[t].groupId});
          return n
        }]), f.provide("isAssignee", ["assignee", function (e) {
          return !!e && e.id === n.$root.authentication.name
        }]), f.provide("processDefinition", ["task", function (e) {
          return e && e._embedded && e._embedded.processDefinition ? e._embedded.processDefinition[0] : null
        }]), f.provide("caseDefinition", ["task", function (e) {
          return e && e._embedded && e._embedded.caseDefinition ? e._embedded.caseDefinition[0] : null
        }]), n.taskState = f.observe("task", function (e) {
          n.task = e
        }), f.observe("isAssignee", function (e) {
          n.isAssignee = e
        }), n.taskVars = {read: ["task", "taskData", "errorHandler"]}, n.taskDetailTabs = o.getProviders({component: "tasklist.task.detail"}), n.selectedTaskDetailTab = n.taskDetailTabs[0], n.selectTaskDetailTab = function (e) {
          n.selectedTaskDetailTab = e, l.updateSilently({detailsTab: e.id})
        }, p(n.taskDetailTabs), n.$on("$routeChanged", function () {
          p(n.taskDetailTabs)
        })
      }]
    }
  }]
}), define("text!scripts/task/directives/cam-tasklist-task-meta.html", [], function () {
  return '<ul class="meta list-inline dates times">\n\n  <li>\n\n    <span cam-widget-inline-field\n          class="followup-date"\n          ng-class="{overdue: task.followUp && (task.followUp < now) }"\n          type="datetime"\n          change="saveFollowUpDate(this)"\n          on-start-editing="startEditingFollowUpDate(this)"\n          on-cancel-editing="cancelEditingFollowUpDate(this)"\n          value="task.followUp">\n      <span tooltip-placement="top"\n            tooltip="{{ \'FOLLOW_UP_DATE\' | translate }}"\n            class="glyphicon glyphicon-calendar"></span>\n\n      <span ng-if="task.followUp"\n            tooltip-placement="top"\n            tooltip="{{ task.followUp | camDate:\'long\' }}"\n            am-time-ago="task.followUp">{{ task.followUp }}</span>\n      <a href\n         ng-if="!task.followUp"\n         translate="SET_FOLLOW_UP_DATE">Set follow up</a>\n    </span>\n\n    <a href\n       ng-if="task.followUp && !editingState.followUp"\n       tooltip-placement="top"\n       tooltip="{{ \'RESET_FOLLOW_UP_DATE\' | translate }}"\n       ng-click="resetFollowUpDate()"\n       class="reset-follow-up-date glyphicon glyphicon-remove">\n    </a>\n\n  </li>\n\n  <li>\n\n    <span cam-widget-inline-field\n          class="due-date"\n          ng-class="{overdue: task.due && (task.due < now) }"\n          type="datetime"\n          change="saveDueDate(this)"\n          on-start-editing="startEditingDueDate(this)"\n          on-cancel-editing="cancelEditingDueDate(this)"\n          value="task.due">\n\n      <span tooltip-placement="top"\n            tooltip="{{ \'DUE_DATE\' | translate }}"\n            class="glyphicon glyphicon-bell"></span>\n\n      <span ng-if="task.due"\n            tooltip-placement="top"\n            tooltip="{{ task.due | camDate:\'long\' }}"\n            am-time-ago="task.due">{{ task.due }}</span>\n\n      <a href\n         ng-if="!task.due"\n         translate="SET_DUE_DATE">Set due date</a>\n    </span>\n\n    <a href\n       ng-if="task.due && !editingState.due"\n       tooltip-placement="top"\n       tooltip="{{ \'RESET_DUE_DATE\' | translate }}"\n       ng-click="resetDueDate()"\n       class="reset-due-date glyphicon glyphicon-remove">\n    </a>\n  </li>\n</ul>\n\n\n<ul class="meta list-inline actors">\n  <li class="groups">\n    <span ng-click="editGroups()">\n      <span tooltip-placement="top"\n            tooltip="{{ \'GROUPS\' | translate }}"\n            class="glyphicon glyphicon-th"></span>\n\n      <a href ng-if="groupNames.length > 0">\n        {{ groupNames.join(\', \') }}\n      </a>\n\n      <a href ng-if="groupNames.length === 0"\n         translate="ADD_GROUPS">\n        Add groups\n      </a>\n    </span>\n  </li>\n\n  <li class="assignee set-value"\n      ng-if="!task.assignee">\n    <span tooltip-placement="top"\n          tooltip="{{ \'ASSIGNEE\' | translate }}"\n          class="glyphicon glyphicon-user"></span>\n\n    <a href\n       class="claim"\n       ng-click="claim()"\n       translate="CLAIM_TASK">Claim</a>\n  </li>\n\n  <li class="assignee"\n      ng-if="task.assignee">\n    <span cam-widget-inline-field\n          class="set-value"\n          type="text"\n          validate="validateUser(this)"\n          change="assign(this)"\n          on-start-editing="startEditingAssignee(this)"\n          on-cancel-editing="cancelEditingAssignee(this)"\n          value="assignee.id">\n\n      <span tooltip-placement="top"\n            tooltip="{{ \'ASSIGNEE\' | translate }}"\n            class="glyphicon glyphicon-user"></span>\n      <span ng-if="assignee.firstName || assignee.lastName">{{ assignee.firstName }} {{ assignee.lastName }}</span>\n      <span ng-if="!(assignee.firstName || assignee.lastName)">{{ assignee.id }}</span>\n    </span>\n\n    <a href\n       ng-if="isAssignee && !editingState.assignee"\n       tooltip-placement="top"\n       tooltip="{{ \'UNCLAIM_TASK\' | translate }}"\n       ng-click="unclaim()"\n       class="unclaim glyphicon glyphicon-remove">\n    </a>\n\n    <a href\n       ng-if="!isAssignee && !editingState.assignee"\n       tooltip-placement="top"\n       tooltip="{{ \'RESET_TASK_ASSIGNEE\' | translate }}"\n       ng-click="resetAssignee()"\n       class="reset-assignee glyphicon glyphicon-remove">\n    </a>\n\n  </li>\n\n</ul>\n'
}), define("text!scripts/task/modals/cam-tasklist-groups-modal.html", [], function () {
  return '<div class="modal-header">\n  <h3 class="modal-title">\n    {{ \'MANAGE_GROUPS\' | translate }}\n  </h3>\n</div>\n\n<div class="modal-body groups-modal">\n\n  <div notifications-panel></div>\n\n  <form name="taskGroupForm"\n        class="form-horizontal"\n        ng-controller="camTaskGroupsCtrl"\n        ng-hide="!modalGroupsState.$loaded || modalGroupsState.$error"\n        ng-submit="(isValid() && addGroup())">\n\n  <div ng-show="!modalGroupsState.$loaded && !modalGroupsState.$error"\n       class="loader">\n    <span class="animate-spin glyphicon glyphicon-refresh"></span>\n    {{ \'LOADING\' | translate }}\n  </div>\n\n  <div class="text-help">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'USE_ADD_GROUP\' | translate }}\n  </div>\n\n    <div class="form-group">\n      <div class="col-xs-4 align-right">\n        <button class="btn btn-link"\n                ng-click="addGroup()"\n                type="button"\n                ng-disabled="!isValid()">\n          <span class="hidden-sm hidden-xs">{{ \'GROUP_ADD\' | translate }}</span>\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </button>\n      </div>\n\n      <div class="col-xs-8"\n           ng-class="{\'has-error\': newGroup.error }">\n        <input type="text"\n               name="newGroup"\n               required\n               placeholder="{{ \'GROUP_ID\' | translate }}"\n               class="form-control"\n               ng-model="newGroup.groupId"\n               ng-change="validateNewGroup()"/>\n\n        <span ng-if="newGroup.error"\n              class="help-block">\n          {{ newGroup.error.message | translate }}\n        </span>\n      </div>\n    </div>\n\n    <div class="form-group values"\n         ng-repeat="group in _groups">\n      <div class="col-xs-4 row-action">\n        <a href\n           ng-click="removeGroup(group, $index)"\n           class="glyphicon glyphicon-minus-sign"></a>\n      </div>\n\n      <div class="col-xs-8 value">\n        {{ group.id }}\n      </div>\n    </div>\n\n  </form>\n\n</div>\n\n<div class="modal-footer">\n  <div class="row row-action">\n    <div class="col-xs-12">\n      <button class="btn btn-xs btn-link"\n              type="button"\n              ng-click="$dismiss()"\n              translate="CLOSE">Close</button>\n    </div>\n  </div>\n</div>\n'
}), define("scripts/task/directives/cam-tasklist-task-meta", ["angular", "text!./cam-tasklist-task-meta.html", "text!../modals/cam-tasklist-groups-modal.html"], function (e, n, t) {
  "use strict";
  e.element;
  return ["$modal", "camAPI", function (i, a) {
    var r = a.resource("task");
    return {
      scope: {taskData: "=", successHandler: "&", errorHandler: "&"},
      template: n,
      controller: ["$scope", function (n) {
        function a() {
          f.changed("task"), f.changed("taskList")
        }

        function s(e) {
          return function (t) {
            d(e, !1), n.task[e] = t.varValue, l()
          }
        }

        function o(e) {
          return function () {
            n.task[e] = null, l()
          }
        }

        function l() {
          var e = n.task;
          delete e._embedded, delete e._links, r.update(e, function (e) {
            return a(), e ? m("TASK_UPDATE_ERROR", e) : void 0
          })
        }

        function c(e) {
          return function () {
            d(e, !0)
          }
        }

        function u(e) {
          return function () {
            d(e, !1)
          }
        }

        function d(e, t) {
          n.editingState[e] = t
        }

        function p(e) {
          var n = h[e];
          return function (e) {
            return e ? m(n.error, e) : void a()
          }
        }

        var f = n.taskData.newChild(n), m = (n.successHandler() || function () {
        }, n.errorHandler() || function () {
        });
        f.observe("task", function (t) {
          n.task = e.copy(t)
        }), f.observe("assignee", function (t) {
          n.assignee = e.copy(t)
        }), f.observe("isAssignee", function (e) {
          n.isAssignee = e
        }), f.observe("groups", function (e) {
          e = e || [];
          for (var t, i = [], a = 0; t = e[a]; a++)i.push(t.name || t.id);
          n.groupNames = i
        }), n.saveFollowUpDate = s("followUp"), n.resetFollowUpDate = o("followUp"), n.startEditingFollowUpDate = c("followUp"), n.cancelEditingFollowUpDate = u("followUp"), n.saveDueDate = s("due"), n.resetDueDate = o("due"), n.startEditingDueDate = c("due"), n.cancelEditingDueDate = u("due"), n.editingState = {
          followUp: !1,
          due: !1,
          assignee: !1
        }, n.now = (new Date).toJSON();
        var h = {
          assigned: {error: "ASSIGNED_ERROR"},
          assigneeReseted: {error: "ASSIGNEE_RESET_ERROR"},
          claimed: {error: "CLAIM_ERROR"},
          unclaimed: {error: "UNCLAIM_ERROR"}
        };
        n.startEditingAssignee = c("assignee"), n.cancelEditingAssignee = u("assignee"), n.assign = function (e) {
          d("assignee", !1);
          var t = e.varValue.trim();
          t ? g(t) : n.isAssignee ? v() : b()
        };
        var v = (n.claim = function () {
          var e = n.$root.authentication.name;
          r.claim(n.task.id, e, p("claimed"))
        }, n.unclaim = function () {
          r.unclaim(n.task.id, p("unclaimed"))
        }), g = n.setAssignee = function (e) {
          r.assignee(n.task.id, e, p("assigned"))
        }, b = n.resetAssignee = function () {
          r.assignee(n.task.id, null, p("assigneeReseted"))
        };
        n.editGroups = function () {
          function e() {
            a && (f.set("taskId", {taskId: n.task.id}), f.changed("taskList"))
          }

          var a;
          i.open({
            scope: n,
            windowClass: "filter-edit-modal",
            template: t,
            controller: "camGroupEditModalCtrl",
            resolve: {
              taskMetaData: function () {
                return f
              }, groupsChanged: function () {
                return function () {
                  a = !0
                }
              }, errorHandler: function () {
                return n.errorHandler
              }
            }
          }).result.then(e, e)
        }
      }]
    }
  }]
}), define("scripts/task/controller/cam-tasklist-task-action-ctrl", [], function () {
  "use strict";
  return ["$scope", "Views", "CamForm", function (e, n, t) {
    var i = e.taskData = e.tasklistData.newChild(e);
    i.observe("task", function (n) {
      e.task = n
    }), t.cleanLocalStorage(Date.now() - 6048e5), e.taskVars = {read: ["task", "taskData"]}, e.taskActions = n.getProviders({component: "tasklist.task.action"})
  }]
}), define("scripts/task/controller/cam-tasklist-task-groups-ctrl", ["angular"], function (e) {
  "use strict";
  var n = "candidate";
  return ["$scope", "$translate", "$q", "Notifications", "camAPI", function (t, i, a, r, s) {
    var o = s.resource("task"), l = null, c = {
      groupId: null,
      type: n
    }, u = t.newGroup = e.copy(c), d = t.taskGroupsData, p = t.groupsChanged, f = t.errorHandler();
    t._groups = [];
    var m = {};
    i(["FAILURE", "INIT_GROUPS_FAILURE", "ADD_GROUP_FAILED", "REMOVE_GROUP_FAILED"]).then(function (e) {
      m.failure = e.FAILURE, m.initGroupsFailed = e.INIT_GROUPS_FAILURE, m.addGroupFailed = e.ADD_GROUP_FAILED, m.removeGroupFailed = e.REMOVE_GROUP_FAILED
    }), t.modalGroupsState = d.observe("groups", function (n) {
      t._groups = e.copy(n) || [], t.validateNewGroup()
    }), d.observe("task", function (e) {
      l = e
    }), t.$watch("modalGroupsState.$error", function (e) {
      e && r.addError({status: m.failure, message: m.initGroupsFailed, exclusive: !0, scope: t})
    }), t.addGroup = function () {
      var n = l.id;
      p(), delete u.error, o.identityLinksAdd(n, u, function (n) {
        return n ? f("TASK_UPDATE_ERROR", n) : (t.taskGroupForm.$setPristine(), t._groups.push({id: u.groupId}), void(u = t.newGroup = e.copy(c)))
      })
    }, t.removeGroup = function (e, i) {
      var a = l.id;
      p(), o.identityLinksDelete(a, {type: n, groupId: e.id}, function (e) {
        return e ? r.addError({
          status: m.failure,
          message: m.removeGroupFailed,
          exclusive: !0,
          scope: t
        }) : void t._groups.splice(i, 1)
      })
    }, t.validateNewGroup = function () {
      if (delete u.error, t.taskGroupForm && t.taskGroupForm.newGroup) {
        t.taskGroupForm.newGroup.$setValidity("duplicate", !0);
        var e = u.groupId;
        if (e)for (var n, i = 0; n = t._groups[i]; i++)e === n.id && (u.error = {message: "DUPLICATE_GROUP"}, t.taskGroupForm.newGroup.$setValidity("duplicate", !1))
      }
    }, t.isValid = function () {
      return !u.groupId || u.error ? !1 : !0
    }
  }]
}), define("text!scripts/task/plugins/detail/cam-tasklist-task-detail-form-plugin.html", [], function () {
  return '<div class="form-pane">\n\n  <div ng-if="taskFormState.$error" class="alert alert-danger" role="alert">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    <strong class="status">{{ \'FORM_FAILURE\' | translate }}</strong>\n    <span class="message">{{ taskFormState.$error.message }}</span>\n  </div>\n\n  <div ng-if="taskFormState.$loaded && !taskFormState.$error"\n       cam-tasklist-form\n       tasklist-form="taskForm"\n       on-form-completion-callback="completionCallback"\n       options="options"\n       params="params" >\n  </div>\n\n</div>'
}), define("scripts/task/plugins/detail/cam-tasklist-task-detail-form-plugin", ["angular", "text!./cam-tasklist-task-detail-form-plugin.html"], function (e, n) {
  "use strict";
  var t = ["$scope", "$location", "$q", "camAPI", "assignNotification", function (n, t, i, a, r) {
    function s() {
      var e = t.search();
      delete e.task, delete e.detailsTab, t.search(e), u.changed("taskList")
    }

    var o = a.resource("task"), l = n.errorHandler, c = n.options = {
      hideCompleteButton: !1,
      hideLoadVariablesButton: !1,
      disableCompleteButton: !1,
      disableForm: !1,
      disableAddVariableButton: !1
    }, u = n.taskData.newChild(n);
    u.provide("taskForm", ["task", function (e) {
      var n = i.defer();
      return e && e.id ? (o.form(e.id, function (e, t) {
        e ? n.reject(e) : n.resolve(t)
      }), n.promise) : n.resolve(null)
    }]), u.observe(["task", "isAssignee", function (t, i) {
      n.options = e.copy(c), n.params = t && t.id ? {taskId: t.id} : null, n.options.disableCompleteButton = !i, n.options.disableForm = !i, n.options.disableAddVariableButton = !i
    }]), n.taskFormState = u.observe("taskForm", function (t) {
      n.taskForm = e.copy(t)
    }), n.completionCallback = function (e) {
      return e ? l("COMPLETE_ERROR", e) : (n.task.processInstanceId ? r({
        assignee: n.task.assignee,
        processInstanceId: n.task.processInstanceId
      }) : n.task.caseInstanceId && r({assignee: n.task.assignee, caseInstanceId: n.task.caseInstanceId}), void s())
    }
  }], i = function (e) {
    e.registerDefaultView("tasklist.task.detail", {
      id: "task-detail-form",
      label: "FORM",
      template: n,
      controller: t,
      priority: 1e3
    })
  };
  return i.$inject = ["ViewsProvider"], i
}), define("text!scripts/task/plugins/detail/cam-tasklist-task-detail-history-plugin.html", [], function () {
  return '<div class="history-pane">\n\n  <div ng-show="!state.$loaded"\n       class="loader">\n    <span class="animate-spin glyphicon glyphicon-refresh"></span>\n    {{ \'LOADING\' | translate }}\n  </div>\n\n  <div ng-hide="!state.$loaded">\n    <div ng-if="!days.length">\n      <div class="well">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'NO_HISTORY\' | translate }}\n      </div>\n    </div>\n\n    <div ng-if="days.length"\n         class="day row"\n         ng-repeat="day in days | orderBy:\'-date\'">\n      <div class="col-xs-2">\n        <div class="date-badge">\n          <div>\n            <span class="day">{{ day.date | camDate:\'day\' }}</span>\n            <span class="month">{{ day.date | camDate:\'monthName\' }}</span>\n            <span class="year">{{ day.date | date:\'yyyy\' }}</span>\n          </div>\n        </div>\n      </div>\n\n      <div class="col-xs-10">\n        <div class="instant row"\n             ng-repeat="event in day.events | orderBy:\'-time\'">\n          <div class="col-xs-2 operation-meta">\n            <div class="operation-time"\n                 tooltip-placement="left"\n                 tooltip="{{ event.time | camDate:\'long\' }}">{{ event.time | date:\'HH:mm\' }}</div>\n            <div class="operation-user">{{ event.userId }}</div>\n          </div>\n\n          <div class="col-xs-10 operation-detail">\n            <div class="row">\n              <h4 class="col-xs-12">{{ event.type | translate }}</h4>\n            </div>\n\n            <div class="row event-body">\n              <div class="line"\n                   ng-repeat="subEvent in event.subEvents"\n                   ng-if="event.type !== \'Comment\'">\n                <h5 class="col-sm-12 col-md-3 event-property">{{ subEvent.property | translate }}</h5>\n\n                <div class="col-sm-12 col-md-9">\n                  <div class="new-value" ng-if="subEvent.newValue">\n                    <span ng-if="subEvent.propertyIsDate">{{ subEvent.newValue | camDate }}</span>\n                    <span ng-if="!subEvent.propertyIsDate">{{ subEvent.newValue }}</span>\n                  </div>\n\n                  <div class="original-value"\n                       ng-if="subEvent.orgValue">\n                    <span ng-if="subEvent.propertyIsDate">{{ subEvent.orgValue | camDate }}</span>\n                    <span ng-if="!subEvent.propertyIsDate">{{ subEvent.orgValue }}</span>\n                  </div>\n                </div>\n              </div>\n              <div class="col-xs-12"\n                   ng-if="event.type === \'Comment\'"\n                   nl2br="event.message" />\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n'
}), define("scripts/task/plugins/detail/cam-tasklist-task-detail-history-plugin", ["jquery", "moment", "text!./cam-tasklist-task-detail-history-plugin.html"], function (e, n, t) {
  "use strict";
  function i(e) {
    return -1 !== ["dueDate", "followUpDate"].indexOf(e)
  }

  var a = function (t, i) {
    var a = e.grep(t, function (e) {
      return n(e.date).format("YYYY-MM-DD") === n(i).format("YYYY-MM-DD")
    });
    return a.length > 0 ? a[0] : (a = {date: i, events: []}, t.push(a), a)
  }, r = function (n, t) {
    var i = e.grep(n, function (e) {
      return e.operationId === t.operationId
    });
    return i.length > 0 ? i[0] : (i = {
      time: t.timestamp,
      type: t.operationType,
      operationId: t.operationId,
      userId: t.userId,
      subEvents: []
    }, n.push(i), i)
  }, s = ["$scope", "camAPI", "$q", function (e, n, t) {
    var s = n.resource("history"), o = n.resource("task"), l = e.taskData.newChild(e);
    l.provide("history", ["task", function (e) {
      var n = t.defer();
      return e ? (s.userOperation({taskId: e.id}, function (e, t) {
        e ? n.reject(e) : n.resolve(t)
      }), n.promise) : n.resolve(null)
    }]), l.provide("comments", ["task", function (e) {
      var n = t.defer();
      return e ? (o.comments(e.id, function (e, t) {
        e ? n.reject(e) : n.resolve(t)
      }), n.promise) : n.resolve(null)
    }]), l.provide("orderedHistoryAndCommentsByDay", ["history", "comments", function (e, n) {
      e = e || {}, n = n || {};
      for (var t, s, o = [], l = 0; s = e[l]; l++) {
        t = a(o, s.timestamp);
        var c = r(t.events, s);
        i(s.property) && (s.propertyIsDate = !0, s.newValue = s.newValue ? parseInt(s.newValue, 10) : null, s.orgValue = s.orgValue ? parseInt(s.orgValue, 10) : null), c.subEvents.push(s)
      }
      l = 0, t = null;
      for (var u; u = n[l]; l++)t = a(o, u.time), u.type = "Comment", t.events.push(u);
      return o
    }]), e.state = l.observe("orderedHistoryAndCommentsByDay", function (n) {
      e.days = n
    })
  }], o = function (e) {
    e.registerDefaultView("tasklist.task.detail", {
      id: "task-detail-history",
      label: "HISTORY",
      template: t,
      controller: s,
      priority: 800
    })
  };
  return o.$inject = ["ViewsProvider"], o
}), define("text!scripts/task/plugins/detail/cam-tasklist-task-detail-diagram-plugin.html", [], function () {
  return '<div ng-show="!processDiagramState.$loaded"\n     class="loader">\n  <span class="animate-spin glyphicon glyphicon-refresh"></span>\n  {{ \'LOADING\' | translate }}\n</div>\n\n<div ng-if="processDiagramState.$loaded">\n\n  <div ng-show="!processDefinition || !processDiagram.bpmn20xml"\n       class="well">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'NO_DIAGRAM\' | translate }}\n  </div>\n\n  <div ng-hide="!processDefinition || !processDiagram.bpmn20xml">\n    <div class="diagram-pane"\n         cam-widget-bpmn-viewer\n         diagram-data="processDiagram.bpmn20xml"\n         on-load="highlightTask()"\n         control="control">\n    </div>\n  </div>\n\n</div>\n'
}), define("scripts/task/plugins/detail/cam-tasklist-task-detail-diagram-plugin", ["text!./cam-tasklist-task-detail-diagram-plugin.html"], function (e) {
  "use strict";
  var n = ["$scope", "$q", "camAPI", function (e, n, t) {
    var i = t.resource("process-definition"), a = e.taskData.newChild(e);
    a.provide("bpmn20xml", ["processDefinition", function (e) {
      var t = n.defer();
      return e ? (i.xml(e, function (e, n) {
        e ? t.reject(e) : t.resolve(n)
      }), t.promise) : t.resolve(null)
    }]), a.provide("processDiagram", ["bpmn20xml", "processDefinition", "task", function (e, n, t) {
      var i = {};
      return i.processDefinition = n, i.task = t, i.bpmn20xml = (e || {}).bpmn20Xml, i
    }]), a.observe("processDefinition", function (n) {
      e.processDefinition = n
    }), e.processDiagramState = a.observe("processDiagram", function (n) {
      e.processDiagram = n
    }), e.control = {}, e.highlightTask = function () {
      e.control.highlight(e.processDiagram.task.taskDefinitionKey)
    }
  }], t = function (t) {
    t.registerDefaultView("tasklist.task.detail", {
      id: "task-detail-diagram",
      label: "DIAGRAM",
      template: e,
      controller: n,
      priority: 600
    })
  };
  return t.$inject = ["ViewsProvider"], t
}), define("text!scripts/task/plugins/detail/cam-tasklist-task-detail-description-plugin.html", [], function () {
  return '<div class="description-pane">\n  <div ng-hide="task.description"\n       class="well">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'NO_DESCRIPTION\' | translate }}\n  </div>\n  <div ng-show="task.description">\n    {{ task.description }}\n  </div>\n</div>\n'
}), define("scripts/task/plugins/detail/cam-tasklist-task-detail-description-plugin", ["text!./cam-tasklist-task-detail-description-plugin.html"], function (e) {
  "use strict";
  var n = ["$scope", function () {
  }], t = function (t) {
    t.registerDefaultView("tasklist.task.detail", {
      id: "task-detail-description",
      label: "DESCRIPTION",
      template: e,
      controller: n,
      priority: 100
    })
  };
  return t.$inject = ["ViewsProvider"], t
}), define("text!scripts/task/plugins/action/cam-tasklist-task-action-comment-plugin.html", [], function () {
  return '<a href\n   ng-click="createComment()">\n  {{ \'COMMENT_CREATE\' | translate }}\n  <span class="glyphicon glyphicon-plus-sign"></span>\n</a>'
}), define("text!scripts/task/plugins/action/modals/cam-tasklist-comment-form.html", [], function () {
  return '<form class="form form-horizontal"\n      name="newComment"\n      role="form">\n\n  <div class="modal-header">\n    <h3 class="modal-title">\n      {{ \'COMMENT_CREATE\' | translate }}\n    </h3>\n  </div>\n\n  <div class="modal-body">\n      <textarea class="form-control"\n             id="comment-form-message"\n             ng-model="comment.message"\n             placeholder="{{ \'COMMENT_MESSAGE_PLACEHOLDER\' | translate }}">\n      </textarea>\n  </div>\n\n  <div class="modal-footer">\n    <div class="row row-action">\n      <div class="col-xs-12">\n        <button class="btn btn-xs btn-link"\n                type="button"\n                ng-click="$dismiss()"\n                translate="CLOSE">Close</button>\n\n        <button class="btn btn-primary"\n                type="submit"\n                ng-disabled="!comment.message"\n                ng-click="submit()"\n                translate="SAVE">Save</button>\n\n      </div>\n    </div>\n  </div>\n</form>\n'
}), define("scripts/task/plugins/action/cam-tasklist-task-action-comment-plugin", ["text!./cam-tasklist-task-action-comment-plugin.html", "text!./modals/cam-tasklist-comment-form.html"], function (e, n) {
  "use strict";
  var t = ["$scope", "$modal", function (e, t) {
    var i = e.taskData.newChild(e);
    i.observe("task", function (n) {
      e.task = n
    }), e.createComment = function () {
      t.open({
        scope: e,
        windowClass: "filter-edit-modal",
        size: "lg",
        template: n,
        controller: "camCommentCreateModalCtrl",
        resolve: {
          task: function () {
            return e.task
          }
        }
      }).result.then(function () {
        i.changed("task")
      })
    }
  }], i = function (n) {
    n.registerDefaultView("tasklist.task.action", {
      id: "task-action-comment",
      template: e,
      controller: t,
      priority: 100
    })
  };
  return i.$inject = ["ViewsProvider"], i
}), define("scripts/task/plugins/action/modals/cam-tasklist-comment-form", [], function () {
  "use strict";
  return ["$scope", "$translate", "Notifications", "camAPI", "task", function (e, n, t, i, a) {
    function r(i, a) {
      n(i).then(function (n) {
        t.addError({status: n, message: a ? a.message : "", exclusive: !0, scope: e})
      })
    }

    var s = i.resource("task");
    e.comment = {message: ""}, e.$on("$locationChangeSuccess", function () {
      e.$dismiss()
    }), e.submit = function () {
      s.createComment(a.id, e.comment.message, function (n) {
        return n ? r("COMMENT_SAVE_ERROR", n) : void e.$close()
      })
    }
  }]
}), define("scripts/task/modals/cam-tasklist-groups-modal", [], function () {
  "use strict";
  return ["$scope", "taskMetaData", "groupsChanged", function (e, n, t) {
    e.taskGroupsData = n.newChild(e), e.groupsChanged = t || function () {
      }, e.$on("$locationChangeSuccess", function () {
      e.$dismiss()
    })
  }]
}), define("scripts/task/index", ["angular", "moment", "./directives/cam-tasklist-task", "./directives/cam-tasklist-task-meta", "./controller/cam-tasklist-task-action-ctrl", "./controller/cam-tasklist-task-groups-ctrl", "./plugins/detail/cam-tasklist-task-detail-form-plugin", "./plugins/detail/cam-tasklist-task-detail-history-plugin", "./plugins/detail/cam-tasklist-task-detail-diagram-plugin", "./plugins/detail/cam-tasklist-task-detail-description-plugin", "./plugins/action/cam-tasklist-task-action-comment-plugin", "./plugins/action/modals/cam-tasklist-comment-form", "./modals/cam-tasklist-groups-modal", "../api/index", "angular-bootstrap"], function (e, n, t, i, a, r, s, o, l, c, u, d, p, f) {
  "use strict";
  var m = e.module("cam.tasklist.task", [f.name, "ui.bootstrap", "cam.tasklist.form", "angularMoment"]);
  return m.directive("camTasklistTask", t), m.directive("camTasklistTaskMeta", i), m.controller("camTaskActionCtrl", a), m.controller("camTaskGroupsCtrl", r), m.config(s), m.config(o), m.config(l), m.config(c), m.config(u), m.controller("camCommentCreateModalCtrl", d), m.controller("camGroupEditModalCtrl", p), m
}), define("text!scripts/process/plugins/action/cam-tasklist-navbar-action-start-process-plugin.html", [], function () {
  return '<a ng-click="open()"\n   href>\n  <span class="glyphicon glyphicon-list-alt"></span>\n  {{ \'START_PROCESS\' | translate }}\n</a>\n'
}), define("text!scripts/process/plugins/action/modals/cam-tasklist-process-start-modal.html", [], function () {
  return '<div class="modal-header">\n  <div class="row">\n    <div class="col-xs-6">\n      <h3 class="modal-title">{{ \'START_PROCESS\' | translate }}</h3>\n    </div>\n\n    <div class="col-xs-6">\n      <form>\n        <div class="form-group has-feedback"\n             ng-show="!PROCESS_TO_START_SELECTED">\n          <input type="text"\n                 ng-model="page.searchValue"\n                 placeholder="{{ \'SEARCH_PROCESS_BY_NAME\' | translate }}"\n                 ng-change="lookupProcessDefinitionByName()"\n                 class="form-control">\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n<div class="modal-body">\n\n  <div notifications-panel />\n\n  <div ng-show="!PROCESS_TO_START_SELECTED">\n\n    <div ng-show="!processDefinitionState.$loaded || lookupProcessDefinitionByName.$loading"\n       class="loader">\n      <span class="animate-spin glyphicon glyphicon-refresh"></span>\n      {{ \'LOADING\' | translate }}\n    </div>\n\n    <div ng-hide="!processDefinitionState.$loaded || lookupProcessDefinitionByName.$loading">\n\n      <div ng-hide="page.total"\n           class="well">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'NO_PROCESS_DEFINITION_AVAILABLE\' | translate }}\n      </div>\n\n      <div ng-show="page.total" class="available-processes">\n\n        <div class="text-help">\n          <span class="glyphicon glyphicon-info-sign"></span>\n          {{ \'CLICK_PROCESS_TO_START\' | translate }}\n        </div>\n\n        <ul class="processes">\n          <li ng-repeat="processDefinition in processDefinitions">\n            <a href ng-click="selectProcessDefinition(processDefinition)">\n              {{ processDefinition.name || processDefinition.key }}\n            </a>\n          </li>\n        </ul>\n\n      </div>\n\n      <pagination ng-show="page.total > page.size"\n                  total-items="page.total"\n                  items-per-page="page.size"\n                  max-size="5"\n                  class="pagination-sm"\n                  boundary-links="true"\n                  ng-model="page.current"\n                  ng-change="pageChange()"\n                  next-text="&rsaquo;"\n                  last-text="&raquo;"\n                  previous-text="&lsaquo;"\n                  first-text="&laquo;"></pagination>\n    </div>\n  </div>\n\n  <div ng-if="PROCESS_TO_START_SELECTED">\n\n    <div ng-if="startFormState.$error" class="alert alert-danger" role="alert">\n      <span class="glyphicon glyphicon-exclamation-sign"></span>\n      <strong class="status">{{ \'FORM_FAILURE\' | translate }}</strong>\n      <span class="message">{{ startFormState.$error.message }}</span>\n    </div>\n\n    <div ng-if="startFormState.$loaded && !startFormState.$error"\n         cam-tasklist-form\n         tasklist-form="startForm"\n         on-form-completion-callback="completionCallback"\n         on-form-completion="registerCompletionHandler"\n         on-form-validation="notifyFormValidation"\n         options="options"\n         params="params" >\n    </div>\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <div ng-if="!PROCESS_TO_START_SELECTED"\n       class="row row-action">\n\n    <div class="col-xs-12">\n      <button class="btn btn-xs btn-link"\n              type="button"\n              ng-click="$dismiss()">\n        {{ \'CLOSE\' | translate }}\n      </button>\n    </div>\n  </div>\n\n  <div ng-if="PROCESS_TO_START_SELECTED"\n       class="row">\n\n    <div class="col-xs-4 align-left">\n      <button class="btn btn-xs btn-link"\n              type="button"\n              ng-click="back()">\n        {{ \'BACK\' | translate }}\n      </button>\n    </div>\n\n    <div class="col-xs-8">\n      <button class="btn btn-xs btn-link"\n              type="button"\n              ng-click="$dismiss()">\n        {{ \'CLOSE\' | translate }}\n      </button>\n\n      <button class="btn btn-primary"\n              type="submit"\n              ng-disabled="$invalid"\n              ng-click="startProcessInstance()">\n        {{ \'START\' | translate }}\n      </button>\n    </div>\n\n  </div>\n\n</div>\n'
}), define("scripts/process/plugins/action/cam-tasklist-navbar-action-start-process-plugin", ["text!./cam-tasklist-navbar-action-start-process-plugin.html", "text!./modals/cam-tasklist-process-start-modal.html"], function (e, n) {
  "use strict";
  var t = ["$scope", "$modal", "$q", "camAPI", "dataDepend", function (e, t, i, a, r) {
    var s = a.resource("process-definition"), o = e.processData = r.create(e), l = {
      latest: !0,
      active: !0,
      firstResult: 0,
      maxResults: 15
    };
    o.provide("processDefinitionQuery", l), o.provide("processDefinitions", ["processDefinitionQuery", function (e) {
      var n = i.defer();
      return s.list(e, function (e, t) {
        e ? n.reject(e) : n.resolve(t)
      }), n.promise
    }]), o.provide("currentProcessDefinitionId", {id: null}), o.provide("startForm", ["currentProcessDefinitionId", function (e) {
      var n = i.defer();
      return e.id ? s.startForm(e, function (e, t) {
        e ? n.reject(e) : n.resolve(t)
      }) : n.resolve(null), n.promise
    }]), e.open = function () {
      o.set("processDefinitionQuery", angular.copy(l)), t.open({
        size: "lg",
        controller: "camProcessStartModalCtrl",
        template: n,
        resolve: {
          processData: function () {
            return o
          }
        }
      }).result.then(function () {
        e.tasklistApp && e.tasklistApp.refreshProvider && e.tasklistApp.refreshProvider.refreshTaskList()
      })
    }
  }], i = function (n) {
    n.registerDefaultView("tasklist.navbar.action", {
      id: "start-process-action",
      template: e,
      controller: t,
      priority: 100
    })
  };
  return i.$inject = ["ViewsProvider"], i
}), define("scripts/process/plugins/action/modals/cam-tasklist-process-start-modal", ["angular"], function (e) {
  "use strict";
  return ["$rootScope", "$scope", "$translate", "debounce", "Notifications", "processData", "assignNotification", function (n, t, i, a, r, s, o) {
    function l(e, n) {
      i(e).then(function (e) {
        r.addError({status: e, message: n ? n.message : "", scope: t})
      })
    }

    function c(e) {
      i(e).then(function (e) {
        r.addMessage({duration: 3e3, status: e})
      })
    }

    t.$on("$locationChangeSuccess", function () {
      t.$dismiss()
    });
    var u = s.newChild(t);
    u.set("currentProcessDefinitionId", {id: null});
    var d = t.options = {
      hideCompleteButton: !0,
      hideLoadVariablesButton: !0,
      disableForm: !1,
      disableAddVariableButton: !1
    };
    t.PROCESS_TO_START_SELECTED = !1;
    var p = null, f = t.page = {total: 0, current: 1, searchValue: null};
    t.triggerOnStart = function () {
    }, u.observe("processDefinitionQuery", function (n) {
      p = e.copy(n), f.size = n.maxResults, f.current = n.firstResult / f.size + 1
    }), t.startFormState = u.observe("startForm", function (n) {
      t.startForm = e.copy(n)
    }), t.processDefinitionState = u.observe("processDefinitions", function (e) {
      f.total = e.count, t.processDefinitions = e.items.sort(function (e, n) {
        var t = (e.name || e.key).toLowerCase(), i = (n.name || n.key).toLowerCase();
        return i > t ? -1 : t > i ? 1 : 0
      })
    }), t.pageChange = function () {
      p.firstResult = f.size * (f.current - 1), u.set("processDefinitionQuery", p)
    }, t.lookupProcessDefinitionByName = a(function () {
      var e = f.searchValue;
      e ? p.nameLike = "%" + e + "%" : delete p.nameLike, p.firstResult = 0, u.set("processDefinitionQuery", p)
    }, 2e3), t.selectProcessDefinition = function (n) {
      t.PROCESS_TO_START_SELECTED = !0;
      var i = n.id, a = n.key;
      t.options = e.copy(d), t.params = {
        processDefinitionId: i,
        processDefinitionKey: a
      }, u.set("currentProcessDefinitionId", {id: i})
    }, t.$invalid = !0, t.back = function () {
      t.$invalid = !0, t.PROCESS_TO_START_SELECTED = !1, t.options = d, u.set("currentProcessDefinitionId", {id: null})
    };
    var m = [];
    t.$on("$destroy", function () {
      for (var e; e = m.pop();)"function" == typeof e && e()
    }), t.completionCallback = function (e, i) {
      return e ? l("PROCESS_START_ERROR", e) : (m.push(function () {
        c("PROCESS_START_OK"), o({assignee: n.authentication.name, processInstanceId: i.id})
      }), void t.$close())
    }, t.registerCompletionHandler = function (e) {
      t.triggerOnStart = e || function () {
        }
    }, t.startProcessInstance = function () {
      t.triggerOnStart()
    }, t.notifyFormValidation = function (e) {
      t.$invalid = e
    }
  }]
}), define("scripts/process/index", ["angular", "./plugins/action/cam-tasklist-navbar-action-start-process-plugin", "./plugins/action/modals/cam-tasklist-process-start-modal"], function (e, n, t) {
  "use strict";
  var i = e.module("cam.tasklist.process", ["cam.tasklist.client", "cam.tasklist.form", "ui.bootstrap"]);
  return i.config(n), i.controller("camProcessStartModalCtrl", t), i
}), define("text!scripts/navigation/directives/cam-tasklist-navigation.html", [], function () {
  return '<div class="container-fluid">\n  <!-- Brand and toggle get grouped for better mobile display -->\n  <div class="navbar-header">\n    <button type="button"\n            class="navbar-toggle"\n            data-toggle="collapse"\n            data-target=".navbar-collapse">\n      <span class="sr-only"\n            translate="TOGGLE_NAVIGATION">Toggle navigation</span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n    </button>\n\n    <a class="navbar-brand"\n       title="{{ \'APP_VENDOR\' | translate }} {{ \'TASKLIST_APP\' | translate }}"\n       ng-href="{{ \'tasklistbase://\' | uri }}">\n       {{ \'APP_VENDOR\' | translate }} {{ \'TASKLIST_APP\' | translate }}\n    </a>\n  </div>\n\n  <!-- Collect the nav links, forms, and other content for toggling -->\n  <div class="collapse navbar-collapse"\n       id="cam-tasklist-navigation">\n    <ul class="nav navbar-nav navbar-right">\n\n      <li ng-repeat="actionProvider in navbarActions"\n          ng-class="actionProvider.id">\n        <view cam-if-logged-in\n              ng-cloak\n              provider="actionProvider"\n              vars="navbarVars">\n        </view>\n      </li>\n\n\n      <li class="divider-vertical"\n          cam-if-logged-in\n          ng-cloak></li>\n\n\n      <li engine-select></li>\n\n\n      <li class="user-account dropdown"\n          cam-if-logged-in\n          ng-cloak>\n        <a tooltip-placement="left"\n           tooltip="{{ \'MANAGE_ACCOUNT\' | translate }}"\n           href\n           class="dropdown-toggle"\n           data-toggle="dropdown">\n          <span class="glyphicon glyphicon-user"></span>\n          {{ authentication.name }}\n        </a>\n        <ul class="dropdown-menu">\n          <li class="user-profile">\n            <a ng-href="{{ \'adminbase://:engine\' | uri }}/#/users/{{ authentication.name }}?tab=profile"\n               translate="MY_PROFILE">\n              My Profile\n            </a>\n          </li>\n\n          <li class="divider"></li>\n\n          <li class="sign-out">\n            <a href="#/logout"\n               translate="SIGN_OUT_ACTION">\n              Sign out\n            </a>\n          </li>\n        </ul>\n      </li>\n\n\n      <li class="divider-vertical"\n          cam-if-logged-in\n          ng-cloak></li>\n\n\n      <li class="app-switch dropdown">\n        <a href\n           class="dropdown-toggle"\n           data-toggle="dropdown">\n          <span class="glyphicon glyphicon-home"></span>\n          <span class="caret"></span>\n        </a>\n\n        <ul class="dropdown-menu">\n          <li ng-if="!authentication || authentication.canAccess(\'admin\')">\n            <a ng-href="{{ \'../../admin/:engine/\' | uri }}"\n               translate="ADMIN_APP">Admin</a>\n          </li>\n\n          <li ng-if="!authentication || authentication.canAccess(\'cockpit\')">\n            <a ng-href="{{ \'../../cockpit/:engine/\' | uri }}"\n               translate="COCKPIT_APP">Cockpit</a>\n          </li>\n        </ul>\n      </li>\n    </ul>\n  </div><!-- /.navbar-collapse -->\n</div><!-- /.container-fluid -->\n'
}), define("scripts/navigation/directives/cam-tasklist-navigation", ["text!./cam-tasklist-navigation.html"], function (e) {
  "use strict";
  return function () {
    return {
      template: e, controller: ["$scope", "Views", function (e, n) {
        e.navbarVars = {read: ["tasklistApp"]}, e.navbarActions = n.getProviders({component: "tasklist.navbar.action"})
      }]
    }
  }
}), define("scripts/navigation/controllers/cam-layout-ctrl", ["angular"], function (e) {
  "use strict";
  var n = e.element, t = n("body");
  return ["$scope", "$timeout", function (e, i) {
    function a(e) {
      return n(e.currentTarget).attr("data-region")
    }

    function r(e) {
      return t.hasClass(e + "-column-close")
    }

    function s(e) {
      return t.removeClass(e + "-column-close")
    }

    function o(e) {
      return t.addClass(e + "-column-close")
    }

    e.toggleVariableSearch = function (e) {
      e && e.preventDefault && e.preventDefault(), n(".tasks-list").toggleClass("show-search")
    }, e.toggleRegion = function (n) {
      n && n.preventDefault && n.preventDefault();
      var o = a(n);
      "task" === o ? r("list") && !r("task") && s("list") : "list" === o && r("task") && !r("list") && s("task"), t.toggleClass(o + "-column-close"), i(function () {
        e.$root.$broadcast("layout:change")
      }, 600)
    }, e.maximizeRegion = function (e) {
      e && e.preventDefault && e.preventDefault(), o("filters"), o("list"), s("task")
    }, e.resetRegions = function (e) {
      e && e.preventDefault && e.preventDefault(), s("filters"), s("list"), s("task")
    }
  }]
}), define("scripts/navigation/index", ["angular", "./directives/cam-tasklist-navigation", "./controllers/cam-layout-ctrl", "camunda-commons-ui/util/index"], function (e, n, t) {
  "use strict";
  var i = e.module("cam.tasklist.navigation", [require("camunda-commons-ui/util/index").name, "ui.bootstrap", "cam.tasklist.user"]);
  return i.controller("camLayoutCtrl", t), i.directive("camTasklistNavigation", n), i
}), define("text!scripts/form/directives/cam-tasklist-form.html", [], function () {
  return '<div ng-show="tasklistForm && !$loaded"\n     class="loader">\n  <span class="animate-spin glyphicon glyphicon-refresh"></span>\n  {{ \'LOADING\' | translate }}\n</div>\n\n<div ng-if="tasklistForm.type" ng-show="tasklistForm && $loaded" ng-class="{ \'disabled-form\' : options.disableForm}">\n\n  <div ng-show="tasklistForm.$error" class="alert alert-danger" role="alert">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    <strong class="status">{{ \'FORM_FAILURE\' | translate }}</strong>\n    <span class="message">{{ tasklistForm.$error.message | translate }}</span>\n  </div>\n\n  <div ng-switch="tasklistForm.type" ng-show="!tasklistForm.$error">\n\n    <div ng-switch-when="embedded">\n      <div cam-tasklist-form-embedded>\n      </div>\n    </div>\n\n    <div ng-switch-when="external">\n      <div cam-tasklist-form-external>\n      </div>\n    </div>\n\n    <div ng-switch-default>\n      <div cam-tasklist-form-generic>\n      </div>\n    </div>\n\n  </div>\n\n  <div class="form-actions" ng-show="showCompleteButton()">\n    <button class="btn btn-primary"\n            type="submit"\n            ng-click="save($event)"\n            ng-hide="tasklistForm.type === \'generic\'"\n            tooltip-placement="top"\n            tooltip="{{ \'SAVE_HINT\' | translate }}"\n            ng-disabled="!$dirty">\n      {{ \'SAVE\' | translate }}\n    </button>\n    <button class="btn btn-primary"\n            type="submit"\n            ng-click="complete()"\n            ng-disabled="disableCompleteButton()">\n      {{ \'COMPLETE\' | translate }}\n    </button>\n  </div>\n\n</div>\n'
}), define("scripts/form/directives/cam-tasklist-form", ["angular", "text!./cam-tasklist-form.html"], function (e, n) {
  "use strict";
  function t(e) {
    var n = [];
    for (var t in e)e[t] && n.push(e[t]);
    return n
  }

  var i = "embedded:", a = "app:", r = "engine:", s = function () {
  };
  return [function () {
    return {
      restrict: "A",
      scope: {
        tasklistForm: "=",
        options: "=",
        params: "=",
        onFormCompletionCallback: "&",
        onFormCompletion: "&",
        onFormValidation: "&"
      },
      template: n,
      controller: ["$scope", "Uri", function (e, n) {
        function o(e) {
          var s = e.key, o = e.contextPath;
          return s ? (0 === s.indexOf(i) ? (s = s.substring(i.length), e.type = "embedded") : e.type = "external", 0 === s.indexOf(a) && o && (s = t([o, s.substring(a.length)]).join("/").replace(/\/([\/]+)/, "/")), 0 === s.indexOf(r) && (s = n.appUri(s)), void(e.key = s)) : void(e.type = "generic")
        }

        e.onFormCompletionCallback = e.onFormCompletionCallback() || s, e.onFormCompletion = e.onFormCompletion() || s, e.onFormValidation = e.onFormValidation() || s, e.completionHandler = s, e.saveHandler = s, e.$loaded = !1, e.$watch("tasklistForm", function (n) {
          e.$loaded = !1, n && o(n)
        });
        var l = function (n, t) {
          e.onFormCompletionCallback(n, t)
        }, c = e.complete = function () {
          e.completionHandler(l)
        };
        e.onFormCompletion(c), e.showCompleteButton = function () {
          return e.options && !e.options.hideCompleteButton && e.$loaded
        }, e.disableCompleteButton = function () {
          return e.$invalid || e.options && e.options.disableCompleteButton
        };
        e.save = function (n) {
          e.saveHandler(n)
        };
        this.notifyFormInitialized = function () {
          e.$loaded = !0
        }, this.notifyFormInitializationFailed = function (n) {
          e.tasklistForm.$error = n, this.notifyFormInitialized(), this.notifyFormValidated(!0)
        }, this.notifyFormCompleted = function (n) {
          e.onFormCompletion(n)
        }, this.notifyFormValidated = function (n) {
          e.$invalid = n, e.onFormValidation(n)
        }, this.notifyFormDirty = function (n) {
          e.$dirty = n
        }, this.getOptions = function () {
          return e.options || {}
        }, this.getTasklistForm = function () {
          return e.tasklistForm
        }, this.getParams = function () {
          return e.params || {}
        }, this.registerCompletionHandler = function (n) {
          e.completionHandler = n || s
        }, this.registerSaveHandler = function (n) {
          e.saveHandler = n || s
        }
      }]
    }
  }]
}), define("text!scripts/form/directives/cam-tasklist-form-generic.html", [], function () {
  return '<div class="generic-form-fields">\n\n  <div class="text-help">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'USE_GENERIC_FORM\' | translate }}\n  </div>\n\n  <div cam-tasklist-form-generic-variables>\n  </div>\n\n</div>\n'
}), define("scripts/form/directives/cam-tasklist-form-generic", ["angular", "text!./cam-tasklist-form-generic.html"], function (e, n) {
  "use strict";
  return ["CamForm", "camAPI", function (t, i) {
    return {
      restrict: "A", require: "^camTasklistForm", scope: !0, template: n, link: function (n, a, r, s) {
        function o(n, a) {
          a = e.copy(a), delete a.processDefinitionKey, e.extend(a, {client: i, formElement: u, done: m}), d = new t(a)
        }

        function l() {
          var e = d.variableManager.variables;
          for (var n in e)d.variableManager.destroyVariable(n)
        }

        function c() {
          d.fields = []
        }

        n.showBusinessKeyField = !!s.getParams().processDefinitionId;
        var u = a.find("form"), d = null, p = {$valid: !1, $invalid: !0}, f = !1;
        n.$watch(function () {
          return f
        }, function (e) {
          e && (o(e, s.getParams()), f = !1)
        }), n.$watch(function () {
          return s.getTasklistForm()
        }, function (e) {
          e && (f = !0, n.variables = [])
        }), n.$watch(function () {
          return p && p.$valid
        }, function (e) {
          s.notifyFormValidated(!e)
        });
        var m = function (e, n) {
          if (e)return s.notifyFormInitializationFailed(e);
          d = n;
          var t = n.formElement.attr("name"), i = n.formElement.scope();
          i && (p = i[t], s.notifyFormInitialized())
        }, h = function (e) {
          function n(n, t) {
            return l(), c(), e(n, t)
          }

          try {
            d.initializeFieldHandlers()
          } catch (t) {
            return n(t)
          }
          var i = d.variableManager.variables;
          for (var a in i)i[a].value = null;
          d.submit(n)
        };
        s.registerCompletionHandler(h)
      }
    }
  }]
}), define("text!scripts/form/directives/cam-tasklist-form-generic-variables.html", [], function () {
  return '<form name="generic-form"\n      class="form-horizontal">\n\n  <div ng-if="showBusinessKeyField"\n       class="form-group">\n    <label for="business-key-field"\n           translate="BUSINESS_KEY"\n           class="control-label col-xs-2">Business key</label>\n    <div class="col-xs-10">\n      <input type="text"\n             id="business-key-field"\n             cam-business-key\n             class="form-control" />\n    </div>\n  </div>\n\n\n  <div class="form-group labels-left">\n    <div class="col-xs-2 row-action">\n      <a ng-click="addVariable()"\n         ng-disabled="options.disableAddVariableButton">\n        <span class="hidden-xs hidden-sm"\n              translate="ADD_VARIABLE">Add variable</span>\n        <span class="glyphicon glyphicon-plus-sign"></span>\n      </a>\n    </div>\n\n\n\n    <div class="col-xs-10"\n         ng-if="variables.length">\n      <div class="row">\n        <label class="control-label col-xs-4"\n               translate="NAME">Name</label>\n\n\n\n        <label class="control-label col-xs-4"\n               translate="TYPE">Type</label>\n\n\n\n        <label class="control-label col-xs-4"\n               translate="VALUE">Value</label>\n      </div>\n    </div>\n  </div>\n\n\n\n  <div ng-if="variables.length"\n       ng-repeat="(delta, variable) in variables"\n       class="form-group"\n       ng-form="repeatForm">\n\n    <div class="col-xs-2 row-action">\n      <a ng-click="removeVariable(delta)"\n         ng-if="!variable.fixedName">\n        <span class="hidden-sm hidden-xs"\n              translate="REMOVE">Remove</span>\n        <span class="glyphicon glyphicon-minus-sign"></span>\n      </a>\n    </div>\n\n\n\n    <div class="col-xs-10">\n      <div class="row">\n        <div class="col-xs-4">\n          <input required\n                 type="text"\n                 class="form-control"\n                 placeholder="{{ \'VARIABLE_NAME\' | translate }}"\n                 ng-model="variable.name"\n                 name="name"\n                 cam-unique-value="{{ getVariableNames() }}"\n                 ng-readonly="variable.fixedName" />\n          <span ng-if="repeatForm.name.$invalid && repeatForm.name.$dirty" class="has-error">\n            <span ng-if="repeatForm.name.$error.required"\n                  class="help-block">\n              {{ \'REQUIRED_FIELD\' | translate }}\n            </span>\n            <span ng-if="repeatForm.name.$error.camUniqueValue"\n                  class="help-block">\n              {{ \'REQUIRE_UNIQUE_NAME\' | translate }}\n            </span>\n          </span>\n        </div>\n\n\n\n        <div class="col-xs-4">\n          <select required\n                  ng-disabled="!variable.name"\n                  class="form-control"\n                  ng-model="variable.type">\n\n            <option disabled\n                    value=""\n                    translate="VARIABLE_TYPE">Type</option>\n\n            <option value="Boolean">Boolean</option>\n            <option value="Short">Short</option>\n            <option value="Integer">Integer</option>\n            <option value="Long">Long</option>\n            <option value="Double">Double</option>\n            <option value="String">String</option>\n            <option value="Date">Date</option>\n          </select>\n        </div>\n\n\n\n        <div class="col-xs-4"\n             ng-switch="variable.type">\n          <input ng-switch-when=""\n                 readonly\n                 type="text"\n                 class="form-control"\n                 placeholder="{{ \'VARIABLE_VALUE\' | translate }}" />\n\n\n          <input ng-switch-when="Boolean"\n                 class="form-control"\n                 type="checkbox"\n                 ng-model="variable.value"\n                 ng-checked="variable.value"\n                 cam-variable-name="{{ variable.name }}"\n                 cam-variable-type="{{ variable.type }}" />\n\n\n          <input ng-switch-default\n                 class="form-control"\n                 type="{{ variableTypes[variable.type] }}"\n                 required\n                 ng-model="variable.value"\n                 name="value"\n                 cam-variable-name="{{ variable.name }}"\n                 cam-variable-type="{{ variable.type }}"\n                 placeholder="{{ \'VARIABLE_VALUE\' | translate }}" />\n\n          <span ng-if="repeatForm.value.$invalid && repeatForm.value.$dirty" class="has-error">\n            <span ng-if="repeatForm.value.$error.required"\n                  class="help-block">\n              {{ \'REQUIRED_FIELD\' | translate }}\n            </span>\n            <span ng-if="repeatForm.value.$error.camVariableType"\n                  class="help-block">\n              Only a {{ variable.type }} value is allowed\n            </span>\n          </span>\n\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="form-group"\n       ng-if="!options.hideLoadVariablesButton && !variablesLoaded">\n    <div class="col-xs-2 row-action">\n      <a ng-click="loadVariables()">\n        <span class="hidden-sm hidden-xs"\n              translate="LOAD_VARIABLES">Load Variables</span>\n        <span class="glyphicon glyphicon-download"></span>\n      </a>\n    </div>\n  </div>\n\n</form>\n'
}), define("scripts/form/directives/cam-tasklist-form-generic-variables", ["angular", "text!./cam-tasklist-form-generic-variables.html"], function (e, n) {
  "use strict";
  return ["camAPI", "Notifications", "$translate", function (t, i, a) {
    return {
      restrict: "A", require: "^camTasklistForm", template: n, link: function (n, r, s, o) {
        var l = t.resource("task");
        n.$watch("tasklistForm", function () {
          n.variablesLoaded = !1
        });
        var c = {name: "", value: "", type: ""}, u = n.variableTypes = {
          Boolean: "checkbox",
          Integer: "text",
          Long: "text",
          Short: "text",
          Double: "text",
          String: "text",
          Date: "text"
        };
        n.addVariable = function () {
          var t = e.copy(c);
          n.variables.push(t)
        }, n.removeVariable = function (t) {
          var i = [];
          e.forEach(n.variables, function (e, n) {
            n != t && i.push(e)
          }), n.variables = i
        }, n.getVariableNames = function () {
          return n.variables.map(function (e) {
            return e.name
          })
        }, n.loadVariables = function () {
          n.variablesLoaded = !0, l.formVariables({id: o.getParams().taskId, deserializeValues: !1}, function (t, r) {
            if (t)return n.variablesLoaded = !1, a("LOAD_VARIABLES_FAILURE").then(function (e) {
              i.addError({status: e, message: t.message, scope: n})
            });
            var s = !1;
            e.forEach(r, function (e, t) {
              u[e.type] && (n.variables.push({name: t, value: e.value, type: e.type, fixedName: !0}), s = !0)
            }), s || a("NO_TASK_VARIABLES").then(function (e) {
              i.addMessage({duration: 5e3, status: e, scope: n})
            })
          })
        }
      }
    }
  }]
}), define("text!scripts/form/directives/cam-tasklist-form-embedded.html", [], function () {
  return '<div class="form-container">\n</div>'
}), define("scripts/form/directives/cam-tasklist-form-embedded", ["angular", "text!./cam-tasklist-form-embedded.html"], function (e, n) {
  "use strict";
  return ["CamForm", "camAPI", "$timeout", function (t, i, a) {
    return {
      restrict: "A", require: "^camTasklistForm", scope: !0, template: n, link: function (n, r, s, o) {
        function l(n, a, r) {
          var s = a.key;
          r = e.copy(r), delete r.processDefinitionKey, e.extend(r, {
            containerElement: n,
            client: i,
            formUrl: s,
            done: p
          }), u = new t(r)
        }

        var c = r.find(".form-container"), u = null, d = n.form = {$valid: !1, $invalid: !0};
        n.$watch("tasklistForm", function (e) {
          e && l(c, e, o.getParams())
        }), n.$watch(function () {
          return d && d.$valid
        }, function (e) {
          o.notifyFormValidated(!e)
        }), n.$watch(function () {
          return d && d.$dirty
        }, function (e) {
          o.notifyFormDirty(e)
        });
        var p = function (e, n) {
          if (e)return o.notifyFormInitializationFailed(e);
          u = n;
          var t = n.formElement.attr("name"), i = n.formElement.scope();
          i && (d = i[t], d.$setPristine(), o.notifyFormInitialized())
        }, f = function (e) {
          u.submit(e)
        }, m = function (n) {
          d.$setPristine(), u.store(), a(function () {
            e.element(n.target).triggerHandler($.Event("mouseleave"))
          })
        };
        o.registerCompletionHandler(f), o.registerSaveHandler(m), n.$on("authentication.login.required", function () {
          m()
        })
      }
    }
  }]
}), define("text!scripts/form/directives/cam-tasklist-form-external.html", [], function () {
  return '<div class="text-help">\n  <span class="glyphicon glyphicon-info-sign"></span>\n  {{ EXTERNAL_FORM_NOTE | translate }}\n</div>\n\n<a ng-href="{{ externalFormUrl  }}"\n   class="external-form">\n  {{ \'EXTERNAL_FORM_LINK\' |translate }}\n  <span class="glyphicon glyphicon-folder-open"></span>\n</a>\n'
}), define("scripts/form/directives/cam-tasklist-form-external", ["angular", "text!./cam-tasklist-form-external.html"], function (e, n) {
  "use strict";
  return ["$location", function (e) {
    return {
      restrict: "A", require: "^camTasklistForm", scope: !0, template: n, link: function (n, t, i, a) {
        a.notifyFormValidated(!0), n.externalFormUrl = null, n.EXTERNAL_FORM_NOTE = null, n.$watch(function () {
          return a.getTasklistForm() && a.getParams()
        }, function (t) {
          if (t) {
            var i = a.getTasklistForm(), r = a.getParams(), s = i.key, o = r.taskId, l = r.processDefinitionKey, c = null;
            if (o)c = "taskId=" + o, n.EXTERNAL_FORM_NOTE = "TASK_EXTERNAL_FORM_NOTE"; else {
              if (!l)return a.notifyFormInitializationFailed({message: "INIT_EXTERNAL_FORM_FAILED"});
              c = "processDefinitionKey=" + l, n.EXTERNAL_FORM_NOTE = "PROCESS_EXTERNAL_FORM_NOTE"
            }
            var u = e.absUrl(), d = e.url();
            u = u.replace(d, "/"), n.externalFormUrl = encodeURI(s + "?" + c + "&callbackUrl=" + u), a.notifyFormInitialized()
          }
        }), n.$watch(function () {
          return a.getOptions()
        }, function (e) {
          e && (e.hideCompleteButton = !0)
        })
      }
    }
  }]
}), define("scripts/form/directives/cam-tasklist-unique-value", [], function () {
  "use strict";
  return [function () {
    return {
      require: "ngModel", link: function (e, n, t, i) {
        var a = function (e) {
          var a = JSON.parse(t.camUniqueValue);
          if (i.$setValidity("camUniqueValue", !0), e) {
            i.$pristine && (i.$pristine = !1, i.$dirty = !0, n.addClass("ng-dirty"), n.removeClass("ng-pristine"));
            for (var r = !1, s = 0; s < a.length; s++)if (a[s] === e) {
              if (r) {
                i.$setValidity("camUniqueValue", !1);
                break
              }
              r = !0
            }
          }
          return e
        };
        i.$parsers.unshift(a), i.$formatters.push(a), t.$observe("camUniqueValue", function () {
          return a(i.$viewValue)
        })
      }
    }
  }]
}), define("scripts/form/index", ["angular", "./directives/cam-tasklist-form", "./directives/cam-tasklist-form-generic", "./directives/cam-tasklist-form-generic-variables", "./directives/cam-tasklist-form-embedded", "./directives/cam-tasklist-form-external", "./directives/cam-tasklist-unique-value"], function (e, n, t, i, a, r, s) {
  "use strict";
  var o = e.module("cam.tasklist.form", ["ui.bootstrap"]);
  return o.directive("camTasklistForm", n), o.directive("camTasklistFormGeneric", t), o.directive("camTasklistFormGenericVariables", i), o.directive("camTasklistFormEmbedded", a), o.directive("camTasklistFormExternal", r), o.directive("camUniqueValue", s), o
}), define("text!scripts/filter/directives/cam-tasklist-filters.html", [], function () {
  return '<div ng-show="!state.$loaded && !state.$error"\n     class="loader">\n  <span class="animate-spin glyphicon glyphicon-refresh"></span>\n  {{ \'LOADING\' | translate }}\n</div>\n\n<div ng-show="state.$error" class="alert alert-danger" role="alert">\n  <span class="glyphicon glyphicon-exclamation-sign"></span>\n  <strong class="status">{{ \'FAILURE\' | translate }}:</strong>\n  <span class="message">{{ \'FILTERS_LOADING_FAILURE\' | translate }}</span>\n</div>\n\n<div ng-show="state.$loaded && !state.$error">\n\n  <div ng-hide="totalItems"\n       class="well">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'NO_AVAILABLE_FILTER\' | translate }}\n  </div>\n\n  <div ng-show="totalItems"\n       ng-repeat="(delta, filter) in filters | orderBy:\'properties.priority\'"\n       class="task-filter-wrapper"\n       ng-class="{active: isFocused(filter)}"\n       ng-style="{\'z-index\': ((filters.length + 10) - delta) }">\n\n    <div class="task-filter"\n         ng-style="filter.style"\n         ng-click="focus(filter)">\n\n      <div ng-if="isFocused(filter)"\n           class="counter">{{ filterCount }}</div>\n\n      <a ng-click="openModal($event, filter)"\n         class="edit-filter">\n        <span class="glyphicon glyphicon-pencil"></span>\n        <span class="hidden-sm hidden-xs hidden-md"\n              translate="FILTER_DETAILS">Filter details</span>\n      </a>\n\n      <h4 class="name"\n          tooltip="{{ filter.properties.description }}"\n          tooltip-placement="top">{{ filter.name }}</h4>\n    </div>\n  </div>\n</div>\n'
}), define("scripts/filter/directives/cam-tasklist-filters", ["text!./cam-tasklist-filters.html", "angular"], function (e, n) {
  "use strict";
  var t = (n.element, n.forEach, function () {
  });
  return [function () {
    return {
      restrict: "A",
      scope: {filtersData: "=", openModal: "&"},
      template: e,
      controller: ["$scope", "search", function (e, n) {
        var i = e.filtersData = e.filtersData.newChild(e);
        e.openModal = e.openModal() || t, i.observe("taskList", function (n) {
          e.filterCount = n.count
        }), e.state = i.observe("filters", function (n) {
          e.totalItems = n.length;
          for (var t, i = 0; t = n[i]; i++)t.style = {
            "border-color": t.properties.color,
            "background-color": t.properties.color
          };
          e.filters = n
        }), i.observe("currentFilter", function (n) {
          e.currentFilter = n
        }), e.focus = function (t) {
          e.filterCount = void 0, n.updateSilently({filter: t.id}), i.changed("currentFilter")
        }, e.isFocused = function (n) {
          return n.id === e.currentFilter.id
        }
      }]
    }
  }]
}), define("text!scripts/filter/directives/cam-tasklist-filter-modal-form.html", [], function () {
  return '<form name="filterForm" role="form">\n\n  <accordion close-others="true">\n\n    <accordion-group is-open="accordion.general">\n\n      <accordion-heading>\n        {{ \'FILTER_FORM_BASICS\' | translate }}\n        <span class="glyphicon glyphicon-exclamation-sign"\n              ng-show="showHint(\'filterGeneralForm\')"></span>\n      </accordion-heading>\n\n      <div class="task-filter-hint text-help">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'FILTER_FORM_BASICS_HINT\' | translate }}\n      </div>\n\n      <div cam-tasklist-filter-modal-form-general\n           filter="filter"\n           accesses="accesses">\n      </div>\n\n    </accordion-group>\n\n    <accordion-group is-open="accordion.criteria">\n      <accordion-heading>\n        {{ \'FILTER_FORM_CRITERIA\' | translate }}\n        <span class="glyphicon glyphicon-exclamation-sign"\n              ng-show="showHint(\'filterCriteriaForm\')"></span>\n      </accordion-heading>\n\n      <div class="task-filter-hint text-help">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'FILTER_FORM_CRITERIA_HINT\' | translate }}\n      </div>\n\n      <div cam-tasklist-filter-modal-form-criteria\n           filter="filter"\n           accesses="accesses">\n      </div>\n\n    </accordion-group>\n\n    <accordion-group is-open="accordion.permission">\n      <accordion-heading>\n        {{ \'FILTER_FORM_PERMISSIONS\' | translate }}\n        <span class="glyphicon glyphicon-exclamation-sign"\n              ng-show="showHint(\'filterPermissionForm\')"></span>\n      </accordion-heading>\n\n      <div class="task-filter-hint text-help">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'FILTER_FORM_PERMISSIONS_HINT\' | translate }}\n      </div>\n\n      <div cam-tasklist-filter-modal-form-permission\n           filter="filter"\n           accesses="accesses"\n           filter-modal-form-data="filterModalFormData"\n           is-open="accordion.permission">\n      </div>\n\n    </accordion-group>\n\n    <accordion-group is-open="accordion.variable">\n      <accordion-heading>\n        {{ \'FILTER_FORM_VARIABLES\' | translate }}\n        <span class="glyphicon glyphicon-exclamation-sign"\n              ng-show="showHint(\'filterVariableForm\')"></span>\n      </accordion-heading>\n\n      <div class="task-filter-hint text-help">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'FILTER_FORM_VARIABLES_HINT\' | translate }}\n      </div>\n\n      <div cam-tasklist-filter-modal-form-variable\n           filter="filter"\n           accesses="accesses">\n      </div>\n\n    </accordion-group>\n\n  </accordion>\n\n</form>\n\n'
}), define("scripts/filter/directives/cam-tasklist-filter-modal-form", ["angular", "text!./cam-tasklist-filter-modal-form.html"], function (e, n) {
  "use strict";
  var t = e.isArray, i = function () {
  }, a = "general", r = "permission", s = "criteria", o = "variable";
  return [function () {
    return {
      restrict: "A",
      scope: {filter: "=", filterModalData: "=", registerIsValidProvider: "&", registerPostFilterSavedProvider: "&"},
      template: n,
      controller: ["$scope", function (e) {
        var n = e.filterModalFormData = e.filterModalData.newChild(e);
        e.registerIsValidProvider = e.registerIsValidProvider() || i, e.registerPostFilterSavedProvider = e.registerPostFilterSavedProvider() || i;
        var l = a;
        e.accordion = {
          general: l === a,
          permission: l === r,
          criteria: l === s,
          variable: l === o
        }, n.observe("accesses", function (n) {
          e.accesses = n
        });
        var c = function () {
          return e.filterForm.$valid
        };
        e.registerIsValidProvider(c);
        var u = {};
        this.registerHintProvider = function (e, n) {
          n = n || i, u[e] = n
        }, e.showHint = function (e) {
          var n = u[e];
          return n && n()
        };
        var d = [];
        this.registerPostFilterSavedProvider = function (e) {
          d.push(e || function (e, n) {
              return n()
            })
        };
        var p = function (e, n) {
          var i = d.length;
          if (0 === i)return n();
          for (var a, r = [], s = function (e) {
            if (i -= 1, e && (t(e) ? e.length && (r = r.concat(e)) : r.push(e)), 0 === i) {
              if (1 === r.length)return n(r[0]);
              if (r.length)return n(r);
              n()
            }
          }, o = 0; a = d[o]; o++)a(e, s)
        };
        e.registerPostFilterSavedProvider(p), this.removeArrayItem = function (e, n) {
          var t = [];
          for (var i in e)i != n && t.push(e[i]);
          return t
        }
      }]
    }
  }]
}), define("text!scripts/filter/directives/cam-tasklist-filter-modal-form-general.html", [], function () {
  return '<div ng-form class="form-horizontal" role="form" name="filterGeneralForm">\n\n  <div class="row">\n    <div class="col-xs-8">\n      <div class="form-group">\n\n        <label for="filterName"\n               class="col-xs-3 control-label"\n               translate="FILTER_NAME_LABEL">Name</label>\n\n        <div class="col-xs-9">\n          <input class="form-control"\n                 name="filterName"\n                 ng-model="filter.name"\n                 type="text"\n                 required\n                 placeholder="{{ \'FILTER_NAME_PLACEHOLDER\' | translate }}"\n                 ng-readonly="filter.id && !accesses.update"\n                 ng-disabled="filter.id && !accesses.update" />\n\n          <span ng-if="this.filterGeneralForm.filterName.$invalid && this.filterGeneralForm.filterName.$dirty"\n                class="has-error">\n            <span ng-show="this.filterGeneralForm.filterName.$error.required" class="help-block">\n              {{ \'REQUIRED_FIELD\' | translate }}\n            </span>\n          </span>\n\n        </div>\n\n      </div>\n    </div>\n\n    <div class="col-xs-4">\n\n      <div class="form-group">\n\n        <label for="filter-form-color"\n               class="col-xs-6 control-label"\n               translate="FILTER_COLOR_LABEL">Color</label>\n\n        <div class="col-xs-6">\n\n          <input class="form-control"\n                 name="filterColor"\n                 ng-model="filter.properties.color"\n                 ng-pattern="/^#([0-9a-f]{6}|[0-9a-f]{3})$/i"\n                 type="color"\n                 ng-readonly="filter.id && !accesses.update"\n                 ng-disabled="filter.id && !accesses.update" />\n\n          <span ng-if="this.filterGeneralForm.filterColor.$invalid && this.filterGeneralForm.filterColor.$dirty"\n                class="has-error">\n            <span ng-show="this.filterGeneralForm.filterColor.$error.pattern" class="help-block">\n              {{ \'REQUIRED_HEX_COLOR_FIELD\' | translate }}\n            </span>\n          </span>\n\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-xs-8">\n      <div class="form-group">\n\n        <label for="filter-form-description"\n               class="col-xs-3 control-label"\n               translate="FILTER_DESCRIPTION_LABEL">Description</label>\n\n        <div class="col-xs-9">\n          <input class="col-xs-9 form-control"\n                 name="filterDescription"\n                 ng-model="filter.properties.description"\n                 type="text"\n                 placeholder="{{ \'FILTER_DESCRIPTION_PLACEHOLDER\' | translate }}"\n                 ng-readonly="filter.id && !accesses.update"\n                 ng-disabled="filter.id && !accesses.update" />\n        </div>\n\n      </div>\n    </div>\n\n    <div class="col-xs-4">\n      <div class="form-group">\n\n        <label for="filter-form-priority"\n               class="col-xs-6 control-label"\n               translate="FILTER_PRIORITY_LABEL">Priority</label>\n\n        <div class="col-xs-6">\n          <input class="form-control"\n                 name="filterPriority"\n                 ng-model="filter.properties.priority"\n                 ng-pattern="/^-?[\\d]+$/"\n                 type="text"\n                 ng-readonly="filter.id && !accesses.update"\n                 ng-disabled="filter.id && !accesses.update" />\n\n\n          <span ng-if="this.filterGeneralForm.filterPriority.$invalid && this.filterGeneralForm.filterPriority.$dirty"\n                class="has-error">\n            <span ng-show="this.filterGeneralForm.filterPriority.$error.pattern" class="help-block">\n              {{ \'REQUIRED_INTEGER_FIELD\' | translate }}\n            </span>\n          </span>\n\n        </div>\n\n      </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-xs-8">\n    </div>\n\n    <div class="col-xs-4">\n      <label for="filter-form-refresh"\n             class="col-xs-6 control-label">\n        {{ \'FILTER_REFRESH_LABEL\' | translate }}\n      </label>\n\n      <div class="col-xs-6">\n        <input class="form-control"\n               name="filterRefresh"\n               ng-model="filter.properties.refresh"\n               type="checkbox"\n               tooltip-append-to-body="false"\n               tooltip="{{ \'FILTER_REFRESH_TOOLTIP\' | translate }}"\n               ng-disabled="filter.id && !accesses.update" />\n      </div>\n    </div>\n  </div>\n\n</div>\n'
}), define("scripts/filter/directives/cam-tasklist-filter-modal-form-general", ["angular", "text!./cam-tasklist-filter-modal-form-general.html"], function (e, n) {
  "use strict";
  return [function () {
    return {
      restrict: "A",
      require: "^camTasklistFilterModalForm",
      scope: {filter: "=", accesses: "="},
      template: n,
      link: function (e, n, t, i) {
        var a = e.filterGeneralForm, r = [];
        r.push(a.filterColor), r.push(a.filterName), r.push(a.filterPriority), r.push(a.filterDescription), r.push(a.filterRefresh);
        var s = function () {
          for (var e, n = 0; e = r[n]; n++)if (e.$dirty && e.$invalid)return !0;
          return !1
        };
        i.registerHintProvider("filterGeneralForm", s)
      }
    }
  }]
}), define("text!scripts/filter/directives/cam-tasklist-filter-modal-form-criteria.html", [], function () {
  return '<div ng-form class="form-horizontal" name="filterCriteriaForm" role="form">\n\n  <div class="row labels-left">\n    <div class="col-xs-2 row-action" ng-show="!filter.id || (filter.id && accesses.update)">\n      <a ng-click="addCriterion()"\n         href>\n        <span class="hidden-sm hidden-xs">{{ \'FILTER_ADD_CRITERION\' | translate }}</span>\n        <span class="glyphicon glyphicon-plus-sign"></span>\n      </a>\n    </div>\n\n    <div ng-class="{ \'col-xs-10\': !filter.id || (filter.id && accesses.update) , \'col-xs-12\': !(!filter.id || (filter.id && accesses.update)) }">\n      <div class="form-group" ng-show="query.length">\n        <label class="col-xs-6 control-label"\n               translate="FILTER_CRITERIA_KEY">Key</label>\n        <label class="col-xs-6 control-label"\n               translate="FILTER_CRITERIA_VALUE">Value</label>\n      </div>\n    </div>\n  </div>\n\n  <div ng-repeat="(delta, queryParam) in query" class="row">\n\n    <div ng-form name="criteriaFieldForm">\n      <div ng-init="addForm(this.criteriaFieldForm)"></div>\n\n      <div class="col-xs-2 row-action" ng-show="!filter.id || (filter.id && accesses.update)">\n        <a ng-click="removeCriterion(delta)"\n           href>\n          <span class="hidden-sm hidden-xs">{{ \'FILTER_REMOVE_CRITERION\' | translate }}</span>\n          <span class="glyphicon glyphicon-minus-sign"></span>\n        </a>\n      </div>\n\n      <div ng-class="{ \'col-xs-10\': !filter.id || (filter.id && accesses.update) , \'col-xs-12\': !(!filter.id || (filter.id && accesses.update)) }">\n        <div class="form-group">\n\n          <div class="col-xs-6">\n\n            <select class="form-control"\n                    ng-model="queryParam.key"\n                    name="queryParamKey"\n                    ng-change="valueChanged(queryParam, this.criteriaFieldForm.queryParamValue)"\n                    cam-unique-value="{{ getQueryParamKeys() }}"\n                    required\n                    ng-disabled="filter.id && !accesses.update">\n              <optgroup ng-repeat="criteriaGroup in criteria"\n                        label="{{ criteriaGroup.group | translate }}">\n\n                <option ng-repeat="criterion in criteriaGroup.options"\n                        ng-selected="criterion.name === getCriterionName(queryParam.key)"\n                        ng-value="criterion.name">\n\n                  {{ criterion.label | translate }}\n                  {{ (criterion.expressionSupport ? \'*\' : \'\') }}\n\n                </option>\n              </optgroup>\n\n            </select>\n            <div ng-if="this.criteriaFieldForm.queryParamKey.$invalid && this.criteriaFieldForm.queryParamKey.$dirty"\n                    class="has-error">\n                <span ng-show="this.criteriaFieldForm.queryParamKey.$error.required" class="help-block">\n                  {{ \'REQUIRED_FIELD\' | translate }}\n                </span>\n                <span ng-show="this.criteriaFieldForm.queryParamKey.$error.camUniqueValue" class="help-block">\n                  {{ \'REQUIRE_UNIQUE_KEY\' | translate }}\n                </span>\n            </div>\n          </div>\n\n          <div class="col-xs-6">\n\n            <div ng-if="!booleanCriterion[getCriterionName(queryParam.key)]">\n              <input class="form-control"\n                     name="queryParamValue"\n                     type="text"\n                     ng-model="queryParam.value"\n                     ng-change="valueChanged(queryParam, this.criteriaFieldForm.queryParamValue)"\n                     required\n                     ng-readonly="filter.id && !accesses.update"\n                     ng-disabled="filter.id && !accesses.update" />\n              <span class="help-block text-help"\n                    ng-show="isCriteriaHelpAvailable(queryParam.key)">\n                {{ getCriteriaHelp(queryParam.key) | translate }}\n              </span>\n\n              <div ng-if="this.criteriaFieldForm.queryParamValue.$invalid && this.criteriaFieldForm.queryParamValue.$dirty"\n                   class="has-error">\n                <span ng-show="this.criteriaFieldForm.queryParamValue.$error.required"\n                      class="help-block">\n                  {{ \'REQUIRED_FIELD\' | translate }}\n                </span>\n                <span ng-show="this.criteriaFieldForm.queryParamValue.$error.number"\n                      class="help-block">\n                  {{ \'REQUIRED_INTEGER_FIELD\' | translate }}\n                </span>\n                <span ng-show="this.criteriaFieldForm.queryParamValue.$error.date"\n                      class="help-block">\n                  {{ \'INVALID_DATE\' | translate }}\n                </span>\n              </div>\n            </div>\n\n            <div ng-if="booleanCriterion[getCriterionName(queryParam.key)]"\n                 class="form-control-static">\n              <span class="glyphicon glyphicon-ok"></span>\n              <input type="hidden"\n                     name="queryParamValue"\n                     ng-model="queryParam.value" />\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n\n  <div ng-if="canIncludeAssignedTasks()"\n       class="row">\n    <div class="col-xs-10 col-xs-offset-2 checkbox">\n      <label>\n        <input type="checkbox"\n               class="form-control"\n               ng-model="filter.includeAssignedTasks" />\n        {{ \'FILTER_CRITERIA_INCLUDE_ASSIGNED_TASKS\' | translate }}\n      </label>\n      <div class="help-block"\n           translate="FILTER_CRITERIA_INCLUDE_ASSIGNED_TASKS_HINT"></div>\n    </div>\n  </div>\n</div>\n'
}), define("scripts/filter/directives/cam-tasklist-filter-modal-criteria", [], function () {
  "use strict";
  function e(e, n, t) {
    return function (i) {
      return t && s.test(i) ? {valid: !0} : e.test(i) ? {valid: !0} : {valid: !1, error: n || "format"}
    }
  }

  var n = "E.g.: `${ now() }`, `${ dateTime() }` or `${ dateTime().plusWeeks(2) }`", t = "E.g.: `${ currentUser() }`", i = "List of values separated by comma or an expression which evaluates to a list. E.g.: `camunda-admin, accounting` or `${ currentUserGroups() }`", a = "List of values seperated by comma. E.g.: `keyC, keyA, keyB`", r = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})(|Z)$/, s = /^[\s]*(\#|\$)\{/, o = /^-?[\d]+$/, l = [{
    group: "Process Instance",
    options: [{name: "processInstanceId", label: "Id"}, {
      name: "processInstanceBusinessKey",
      label: "Business Key"
    }, {name: "processInstanceBusinessKeyLike", label: "Business Key Like"}]
  }, {
    group: "Process definition",
    options: [{name: "processDefinitionId", label: "Id"}, {
      name: "processDefinitionKey",
      label: "Key"
    }, {name: "processDefinitionKeyIn", label: "Key In", help: a}, {
      name: "processDefinitionName",
      label: "Name"
    }, {name: "processDefinitionNameLike", label: "Name Like"}]
  }, {
    group: "Case Instance",
    options: [{name: "caseInstanceId", label: "Id"}, {
      name: "caseInstanceBusinessKey",
      label: "Business Key"
    }, {name: "caseInstanceBusinessKeyLike", label: "Business Key Like"}]
  }, {
    group: "Case definition",
    options: [{name: "caseDefinitionId", label: "Id"}, {
      name: "caseDefinitionKey",
      label: "Key"
    }, {name: "caseDefinitionName", label: "Name"}, {name: "caseDefinitionNameLike", label: "Name Like"}]
  }, {
    group: "Other",
    options: [{name: "active", label: "Active", bool: !0}, {
      name: "activityInstanceIdIn",
      label: "Activity Instance Id In",
      help: a
    }, {name: "executionId", label: "Execution Id"}]
  }, {
    group: "User / Group",
    options: [{name: "assignee", label: "Assignee", expressionSupport: !0, help: t}, {
      name: "assigneeLike",
      label: "Assignee Like",
      expressionSupport: !0,
      help: t
    }, {name: "owner", label: "Owner", expressionSupport: !0, help: t}, {
      name: "candidateGroup",
      label: "Candidate Group",
      expressionSupport: !0,
      includeAssignedTasksSupport: !0
    }, {
      name: "candidateGroups",
      label: "Candidate Groups",
      expressionSupport: !0,
      help: i,
      includeAssignedTasksSupport: !0
    }, {
      name: "candidateUser",
      label: "Candidate User",
      expressionSupport: !0,
      help: t,
      includeAssignedTasksSupport: !0
    }, {name: "involvedUser", label: "Involved User", expressionSupport: !0, help: t}, {
      name: "unassigned",
      label: "Unassigned",
      bool: !0
    }, {name: "delegationState", label: "Delegation State"}]
  }, {
    group: "Task",
    options: [{name: "taskDefinitionKey", label: "Definition Key"}, {
      name: "taskDefinitionKeyIn",
      label: "Definition Key In",
      help: a
    }, {name: "taskDefinitionKeyLike", label: "Definition Key Like"}, {name: "name", label: "Name"}, {
      name: "nameLike",
      label: "Name Like"
    }, {name: "description", label: "Description"}, {
      name: "descriptionLike",
      label: "Description Like"
    }, {name: "priority", label: "Priority", validate: e(o, "number")}, {
      name: "maxPriority",
      label: "Priority Max",
      validate: e(o, "number")
    }, {name: "minPriority", label: "Priority Min", validate: e(o, "number")}]
  }, {
    group: "Dates",
    validate: e(r, "date", !0),
    options: [{name: "createdBefore", label: "Created Before", expressionSupport: !0, help: n}, {
      name: "createdAfter",
      label: "Created After",
      expressionSupport: !0,
      help: n
    }, {name: "dueBefore", label: "Due Before", expressionSupport: !0, help: n}, {
      name: "dueAfter",
      label: "Due After",
      expressionSupport: !0,
      help: n
    }, {name: "followUpAfter", label: "Follow Up After", expressionSupport: !0, help: n}, {
      name: "followUpBefore",
      label: "Follow Up Before",
      expressionSupport: !0,
      help: n
    }, {name: "followUpBeforeOrNotExistent", label: "Follow Up Before or Not Existent", expressionSupport: !0, help: n}]
  }];
  return l.map(function (e) {
    return e.name = e.group.toLowerCase().replace(/[^a-z0-9-]+/g, "-"), e
  })
}), define("scripts/filter/directives/cam-tasklist-filter-modal-form-criteria", ["angular", "text!./cam-tasklist-filter-modal-form-criteria.html", "./cam-tasklist-filter-modal-criteria"], function (e, n, t) {
  "use strict";
  var i = e.forEach, a = e.copy, r = {}, s = {}, o = {}, l = {}, c = {}, u = function () {
    return {valid: !0}
  };
  return i(t, function (e) {
    i(e.options, function (n) {
      r[n.name] = n.includeAssignedTasksSupport, r[n.name] && (r[n.name + "Expression"] = !0), n.bool && (s[n.name] = !0), o[n.name] = n.expressionSupport, l[n.name] = n.help || e.help, c[n.name] = n.validate || e.validate || u
    })
  }), [function () {
    return {
      restrict: "A",
      require: "^camTasklistFilterModalForm",
      scope: {filter: "=", accesses: "="},
      template: n,
      link: function (e, n, i, u) {
        var d = {key: "", value: ""};
        e.criteria = t, e.criteriaExpressionSupport = o, e.criteriaHelp = l, e.booleanCriterion = s, e.query = e.filter.query = e.filter.query || [], e.query = e.filter.query = e.query.filter(function (n) {
          return "includeAssignedTasks" === n.key && (e.includeAssignedTasks = e.filter.includeAssignedTasks = n.value), "includeAssignedTasks" !== n.key
        }), e.canIncludeAssignedTasks = function () {
          for (var n = 0; n < e.query.length; n++)if (r[e.query[n].key])return !0;
          return !1
        }, e.$watch("query", function () {
          e.includeAssignedTasks = e.filter.includeAssignedTasks = e.canIncludeAssignedTasks() && e.filter.includeAssignedTasks
        }, !0);
        var p = function () {
          for (var e, n = 0; e = f[n]; n++) {
            var t = e.queryParamKey, i = e.queryParamValue;
            if (t.$dirty && t.$invalid)return !0;
            if (i.$dirty && i.$invalid)return !0
          }
          return !1
        };
        u.registerHintProvider("filterCriteriaForm", p);
        var f = [];
        e.addForm = function (e) {
          f.push(e)
        }, e.addCriterion = function () {
          var n = a(d);
          e.query.push(n)
        }, e.removeCriterion = function (n) {
          e.filter.query = e.query = u.removeArrayItem(e.query, n), f = u.removeArrayItem(f, n)
        }, e.valueChanged = function (e, n) {
          if (n.$setValidity("number", !0), n.$setValidity("date", !0), s[e.key])e.value = !0; else if (e.value) {
            n.$pristine && n.$setViewValue(e.value);
            var t = m(e.key), i = c[t](e.value);
            i.valid || n.$setValidity(i.error, !1)
          }
        }, e.getQueryParamKeys = function () {
          for (var n, t = [], i = 0; n = e.query[i]; i++) {
            var a = m(n.key);
            t.push(a), o[a] && t.push(a + "Expression")
          }
          return t
        };
        var m = e.getCriterionName = function (e) {
          if (!e)return e;
          var n = e.replace("Expression", "");
          return n
        }, h = e.getCriteriaHelp = function (e) {
          return e = m(e), l[e]
        };
        e.isCriteriaHelpAvailable = function (e) {
          return !!h(e)
        }
      }
    }
  }]
}), define("text!scripts/filter/directives/cam-tasklist-filter-modal-form-variable.html", [], function () {
  return '<div ng-form class="form-horizontal" name="filterVariableForm" role="form">\n\n  <div ng-show="variables.length > 5"\n       class="alert alert-warning"\n       role="alert">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    {{ \'FILTER_VARIABLES_AMOUNT_WARNING\' | translate }}\n  </div>\n\n\n  <div class="row labels-left">\n    <div class="col-xs-12">\n      <div class="undefined-variable checkbox">\n        <label>\n          <input type="checkbox"\n                 class="form-control"\n                 ng-model="filter.properties.showUndefinedVariable" />\n          {{ \'FILTER_FORM_VARIABLES_SHOW_UNDEFINED\' | translate }}\n        </label>\n      </div>\n    </div>\n\n    <div class="col-xs-2 row-action" ng-show="!filter.id || (filter.id && accesses.update)">\n      <a ng-click="addVariable()"\n         href>\n        <span class="hidden-sm hidden-xs">{{ \'FILTER_ADD_VARIABLE\' | translate }}</span>\n        <span class="glyphicon glyphicon-plus-sign"></span>\n      </a>\n    </div>\n\n    <div ng-class="{ \'col-xs-10\': !filter.id || (filter.id && accesses.update) , \'col-xs-12\': !(!filter.id || (filter.id && accesses.update)) }">\n      <div class="form-group" ng-show="variables.length">\n        <label class="col-xs-6 control-label"\n               translate="FILTER_VARIABLE_NAME">Name</label>\n        <label class="col-xs-6 control-label"\n               translate="FILTER_VARIABLE_LABEL">Label</label>\n      </div>\n    </div>\n  </div>\n\n  <div ng-repeat="(delta, variable) in variables" class="row">\n\n    <div ng-form name="variableFieldForm">\n      <div ng-init="addForm(this.variableFieldForm)"></div>\n\n      <div class="col-xs-2 row-action" ng-show="!filter.id || (filter.id && accesses.update)">\n        <a ng-click="removeVariable(delta)"\n           href>\n          <span class="hidden-sm hidden-xs">{{ \'FILTER_REMOVE_VARIABLE\' | translate }}</span>\n          <span class="glyphicon glyphicon-minus-sign"></span>\n        </a>\n      </div>\n\n\n      <div ng-class="{ \'col-xs-10\': !filter.id || (filter.id && accesses.update) , \'col-xs-12\': !(!filter.id || (filter.id && accesses.update)) }">\n        <div class="form-group">\n\n          <div class="col-xs-6">\n\n            <input class="form-control"\n                   type="text"\n                   name="variableName"\n                   ng-model="variable.name"\n                   placeholder="{{ \'FILTER_VARIABLE_NAME_PLACEHOLDER\' | translate }}"\n                   required\n                   ng-readonly="filter.id && !accesses.update"\n                   ng-disabled="filter.id && !accesses.update" />\n\n              <div ng-if="this.variableFieldForm.variableName.$invalid && this.variableFieldForm.variableName.$dirty"\n                    class="has-error">\n                <span ng-show="this.variableFieldForm.variableName.$error.required" class="help-block">\n                  {{ \'REQUIRED_FIELD\' | translate }}\n                </span>\n              </div>\n\n          </div>\n\n          <div class="col-xs-6">\n            <input class="form-control"\n                   type="text"\n                   name="variableLabel"\n                   ng-model="variable.label"\n                   placeholder="{{ \'FILTER_VARIABLE_LABEL_PLACEHOLDER\' | translate }}"\n                   required\n                   ng-readonly="filter.id && !accesses.update"\n                   ng-disabled="filter.id && !accesses.update" />\n              <div ng-if="this.variableFieldForm.variableLabel.$invalid && this.variableFieldForm.variableLabel.$dirty"\n                    class="has-error">\n                <span ng-show="this.variableFieldForm.variableLabel.$error.required" class="help-block">\n                  {{ \'REQUIRED_FIELD\' | translate }}\n                </span>\n              </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n'
}), define("scripts/filter/directives/cam-tasklist-filter-modal-form-variable", ["text!./cam-tasklist-filter-modal-form-variable.html"], function (e) {
  "use strict";
  var n = angular.copy;
  return [function () {
    return {
      restrict: "A",
      require: "^camTasklistFilterModalForm",
      scope: {filter: "=", accesses: "="},
      template: e,
      link: function (e, t, i, a) {
        var r = {name: "", label: ""};
        e.filter.properties.showUndefinedVariable = e.filter.properties.showUndefinedVariable || !1, e.variables = e.filter.properties.variables = e.filter.properties.variables || [];
        var s = function () {
          for (var e, n = 0; e = o[n]; n++) {
            var t = e.variableName, i = e.variableLabel;
            if (t.$dirty && t.$invalid)return !0;
            if (i.$dirty && i.$invalid)return !0
          }
          return !1
        };
        a.registerHintProvider("filterVariableForm", s);
        var o = [];
        e.addForm = function (e) {
          o.push(e)
        }, e.addVariable = function () {
          var t = n(r);
          e.variables.push(t)
        }, e.removeVariable = function (n) {
          e.filter.properties.variables = e.variables = a.removeArrayItem(e.variables, n), o = a.removeArrayItem(o, n)
        }
      }
    }
  }]
}), define("text!scripts/filter/directives/cam-tasklist-filter-modal-form-permission.html", [], function () {
  return '<div ng-form class="form-horizontal" name="filterPermissionForm" role="form">\n\n  <div ng-show="!authorizationState.$loaded && !authorizationState.$error"\n       class="loader">\n    <span class="animate-spin glyphicon glyphicon-refresh"></span>\n    {{ \'LOADING\' | translate }}\n  </div>\n\n  <div ng-show="authorizationState.$error" class="alert alert-danger" role="alert">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    <strong class="status">{{ \'FAILURE\' | translate }}:</strong>\n    <span class="message">{{ \'FILTER_FORM_PERMISSIONS_LOADING_FAILURE\' | translate }}</span>\n  </div>\n\n  <div ng-show="authorizationState.$loaded && !authorizationState.$error">\n\n    <div class="alert alert-warning">\n      <span class="glyphicon glyphicon-exclamation-sign"></span>\n      <span>{{ \'FILTER_FORM_PERMISSIONS_EDIT_HINT\' | translate }}</span>\n    </div>\n\n    <div class="global-access checkbox form-control-static"\n         ng-show="!filter.id || (filter.id && accesses.update)">\n      <label>\n        <input type="checkbox"\n               class="form-control"\n               ng-model="isGlobalReadAuthorization"\n               ng-change="globalReadAuthorizationChanged()"\n               ng-disabled="filter.id && !accesses.update" />\n         {{ \'FILTER_FORM_PERMISSIONS_GLOBAL\' | translate }}\n      </label>\n    </div>\n\n    <div class="user-read-permissions"\n         ng-show="(!filter.id || (filter.id && accesses.update)) && !isGlobalReadAuthorization">\n      <div class="form-group labels-left">\n\n        <div class="col-xs-2 align-right">\n          <button class="btn btn-link"\n                  ng-click="addReadPermission()"\n                  type="button"\n                  ng-disabled="disableAddButton()">\n            <span class="hidden-sm hidden-xs">{{ \'ADD_PERMISSION\' | translate }}</span>\n            <span class="glyphicon glyphicon-plus-sign"></span>\n          </button>\n        </div>\n\n        <label class="col-xs-2 control-label">\n          {{ \'FILTER_FORM_PERMISSION_GROUP_USER\' | translate }}\n        </label>\n        <label class="col-xs-8 control-label">\n          {{ \'FILTER_FORM_PERMISSION_IDENTIFIER\' | translate }}\n        </label>\n      </div>\n\n\n\n\n\n\n\n      <div class="form-group"\n           ng-repeat="auth in getReadAuthorizations(authorizations)">\n        <div class="col-xs-2 row-action"\n             ng-show="!filter.id || (filter.id && accesses.update)">\n          <button class="btn btn-link btn-remove"\n                  ng-if="!isGlobalReadAuthorization"\n                  ng-click="removeReadPermission(auth)">\n            <span class="hidden-sm hidden-xs">\n              {{ \'FILTER_FORM_PERMISSIONS_REMOVE\' | translate }}\n            </span>\n            <span class="glyphicon glyphicon-minus-sign"></span>\n          </button>\n        </div>\n\n        <div class="col-xs-2">\n          <span class="fake-button">\n            <span class="glyphicon"\n                  ng-class="\'glyphicon-\' + (!!auth.userId ? \'user\' : \'th\')"></span>\n          </span>\n        </div>\n\n        <div class="form-control-static"\n             ng-class="{ \'col-xs-8\': !filter.id || (filter.id && accesses.update) , \'col-xs-10\': !(!filter.id || (filter.id && accesses.update)) }">\n\n          {{ (auth.userId || auth.groupId) }}\n        </div>\n      </div><!-- repeat auth -->\n\n      <div class="form-group new-permission"\n           ng-if="showNewPermissionFields">\n        <div class="col-xs-2 col-xs-offset-2">\n          <button class="btn btn-default"\n                  type="button"\n                  tooltip-append-to-body="false"\n                  tooltip="{{ \'FILTER_FORM_PERMISSIONS_IDENTITY_TYPE_TOOLTIP\' | translate }}: {{ (newPermission.type === \'user\' ? \'FILTER_FORM_PERMISSIONS_IDENTITY_TYPE_USER\' : \'FILTER_FORM_PERMISSIONS_IDENTITY_TYPE_GROUP\') | translate }}"\n                  ng-click="switchType()"\n                  ng-disabled="isGlobalReadAuthorization">\n            <span class="glyphicon"\n                  ng-class="newPermission.type === \'user\' ? \'glyphicon-user\' : \'glyphicon-th\'"></span>\n          </button>\n        </div>\n\n        <div class="col-xs-8">\n          <input type="text"\n                 name="newPermission"\n                 placeholder="{{ (newPermission.type === \'user\' ? \'FILTER_FORM_PERMISSIONS_USER_ID\' : \'FILTER_FORM_PERMISSIONS_GROUP_ID\') | translate }}"\n                 class="form-control"\n                 ng-model="newPermission.id"\n                 ng-change="validateNewPermission()"\n                 ng-keydown="keyPressed($event)"\n                 ng-readonly="isGlobalReadAuthorization"\n                 ng-disabled="filter.id && !accesses.update" />\n\n          <div ng-if="this.filterPermissionForm.newPermission.$invalid && this.filterPermissionForm.newPermission.$dirty"\n               class="has-error">\n            <span ng-show="this.filterPermissionForm.newPermission.$error.required"\n                  class="help-block">\n              {{ \'REQUIRED_FIELD\' | translate }}\n            </span>\n            <span ng-show="this.filterPermissionForm.newPermission.$error.duplicate && newPermission.type === \'user\'"\n                  class="help-block">\n              {{ \'FILTER_FORM_PERMISSIONS_DUPLICATE_USER\' | translate }}\n            </span>\n            <span ng-show="this.filterPermissionForm.newPermission.$error.duplicate && newPermission.type === \'group\'"\n                  class="help-block">\n              {{ \'FILTER_FORM_PERMISSIONS_DUPLICATE_GROUP\' | translate }}\n            </span>\n          </div>\n        </div>\n      </div><!-- new perm -->\n    </div>\n\n  </div>\n\n</div>\n'
}), define("scripts/filter/directives/cam-tasklist-filter-modal-form-permission", ["angular", "text!./cam-tasklist-filter-modal-form-permission.html"], function (e, n) {
  "use strict";
  var t = e.copy, i = 5;
  return ["camAPI", "$q", function (a, r) {
    return {
      restrict: "A",
      require: "^camTasklistFilterModalForm",
      scope: {filter: "=", accesses: "=", filterModalFormData: "=", isOpen: "="},
      template: n,
      link: function (n, s, o, l) {
        function c(e, n) {
          function i(e, i) {
            var r = i.$permissions;
            delete i.$permissions, delete i.$$hashKey, i.resourceId = i.resourceId || n.id;
            var o = function (n, o) {
              s -= 1, n ? (N.push({
                status: "FILTER_FORM_PERMISSIONS_SAVE_ERROR",
                error: n
              }), i.$permissions = r) : "create" === e ? (i.id = o.id, i.permissions = t(o.permissions || []), i.$permissions = t(o.permissions || [])) : ("delete" === e && (i.id = null), i.permissions = t(i.permissions || []), i.$permissions = t(i.permissions || [])), 0 === s && a.resolve()
            };
            "create" === e ? I.create(i, o) : "update" === e ? I.update(i, o) : "delete" === e && I["delete"](i.id, o)
          }

          var a = r.defer();
          e = e || [];
          var s = e.length;
          0 === s && a.resolve();
          for (var o, l = 0; o = e[l]; l++) {
            var c = o.type, u = o.authorization;
            i(c, u)
          }
          return a.promise
        }

        function u(e) {
          for (var n, i = 0; n = e[i]; i++)n.$permissions = t(n.permissions || [])
        }

        function d() {
          return _.newPermission
        }

        function p(e) {
          return e && 0 === e.type
        }

        function f(e) {
          return e && 1 === e.type
        }

        function m(e) {
          e = e || {};
          var n = e.userId || e.groupId;
          return "*" === n
        }

        function h(e, n) {
          return !!e[n]
        }

        function v(e) {
          if (e && e.permissions)for (var n, t = e.permissions, i = 0; n = t[i]; i++)if ("READ" === n || "ALL" === n)return !0;
          return !1
        }

        function g(e) {
          for (var n, t = 0; n = e[t]; t++)if (p(n))return n
        }

        function b(e) {
          for (var n, t = [], i = 0; n = e[i]; i++)f(n) && !m(n) && v(n) && t.push(n);
          return t
        }

        function y(e, n) {
          for (var t, i = k(e, n), a = {}, r = 0; t = i[r]; r++) {
            var s = t[n];
            a[s] = t
          }
          return a
        }

        function k(e, n) {
          for (var t, i = [], a = 0; t = e[a]; a++)f(t) && h(t, n) && !m(t) && i.push(t);
          return i
        }

        function E(e) {
          if (e) {
            var n = e.permissions;
            e.permissions = n && n.length ? n && 1 === n.length ? e.permissions.concat(["READ"]) : ["ALL"] : ["READ"]
          }
        }

        function w(e) {
          if (e) {
            var n = e.permissions;
            if (n && 1 === n.length) {
              var t = n[0];
              "ALL" === t ? e.permissions = ["UPDATE", "DELETE"] : "READ" === t && (e.permissions = [])
            } else {
              e.permissions = [];
              for (var i, a = 0; i = n[a]; a++)"READ" !== i && e.permissions.push(i)
            }
          }
        }

        n.showNewPermissionFields = !1, n.$watch("isOpen", function (e, t) {
          n.disableAddButton() || e || !t || n.addReadPermission(), n.showNewPermissionFields = !1
        }), n.$on("pre-submit", function () {
          n.disableAddButton() || n.addReadPermission(), n.showNewPermissionFields = !1
        });
        var I = a.resource("authorization"), A = n.filterModalFormData.newChild(n), _ = n.filterPermissionForm, D = null, T = null, x = null, F = null, R = {
          resourceType: i,
          permissions: ["READ"]
        }, S = {type: "user", id: null}, C = n.newPermission = t(S), L = function () {
          var e = d();
          return e && e.$error && e.$error.duplicate
        };
        l.registerHintProvider("filterPermissionForm", L), A.provide("authorizations", ["filter", function (e) {
          var n = r.defer();
          return e && e.id ? I.list({resourceType: i, resourceId: e.id}, function (e, t) {
            e ? n.reject(e) : n.resolve(t)
          }) : n.resolve([]), n.promise
        }]), n.authorizationState = A.observe("authorizations", function (e) {
          D = n.authorizations = t(e) || [], u(D), T = g(D), n.isGlobalReadAuthorization = v(T), x = y(D, "groupId"), F = y(D, "userId")
        }), n.globalReadAuthorizationChanged = function () {
          n.isGlobalReadAuthorization ? (T ? E(T) : (T = e.extend({
            userId: "*",
            type: 0
          }, R), D.push(T)), C.id = null, P()) : T && w(T)
        }, n.switchType = function () {
          C.type = "user" === C.type ? "group" : "user", P()
        }, n.getReadAuthorizations = function (e) {
          return e ? b(e) : void 0
        };
        var P = n.validateNewPermission = function () {
          var e = d();
          if (e) {
            e.$setValidity("authorization", !0), e.$setValidity("duplicate", !0);
            var n = C.id;
            if (n) {
              var t = "user" === C.type ? F : x, i = t[n];
              if (i && v(i))return e.$setValidity("duplicate", !1)
            }
          }
        };
        n.disableAddButton = function () {
          if (!n.showNewPermissionFields)return !1;
          var e = d();
          return n.isGlobalReadAuthorization || !C.id || e && e.$error && e.$error.duplicate
        };
        var $ = n.addReadPermission = function () {
          if (!n.showNewPermissionFields)return void(n.showNewPermissionFields = !0);
          var t = d(), i = C.id, a = "user" === C.type ? F : x, r = a[i];
          if (r) {
            E(r);
            var s = D;
            D = n.authorizations = [];
            for (var o, l = 0; o = s[l]; l++)o !== r && D.push(o);
            D.push(r)
          } else {
            r = {type: 1};
            var c = "user" === C.type ? "userId" : "groupId";
            r[c] = i, e.extend(r, R), D.push(r), a[i] = r
          }
          C.id = null, t.$setValidity("authorization", !0), t.$setPristine()
        };
        n.keyPressed = function (e) {
          var n = e.keyCode;
          if (13 === n) {
            e.preventDefault && e.preventDefault();
            var t = d();
            return C.id && t && (!t.$error || !t.$error.duplicate) && $()
          }
        }, n.removeReadPermission = function (e) {
          w(e), P()
        };
        var N = [], O = function (e, t) {
          var i = [];
          if (N = [], n.isGlobalReadAuthorization)for (var a, r = 0; a = D[r]; r++)f(a) && v(a) && w(a);
          for (var s, o = 0; s = D[o]; o++) {
            var l = s.permissions, u = s.$permissions;
            (f(s) || p(s)) && (s.id ? !l.length && u.length ? i.push({
              type: "delete",
              authorization: s
            }) : l.length !== u.length && i.push({
              type: "update",
              authorization: s
            }) : l.length && i.push({type: "create", authorization: s}))
          }
          c(i, e).then(function () {
            return N && N.length || (N = null), "function" == typeof t ? t(N) : void 0
          })
        };
        l.registerPostFilterSavedProvider(O)
      }
    }
  }]
}), define("text!scripts/filter/modals/cam-tasklist-filter-modal.html", [], function () {
  return '<div class="modal-header">\n  <h3 class="modal-title">\n    {{ (\n      filter.id && !deletion ?\n      (accesses.update ? \'FILTER_EDIT\' : \'FILTER_DETAILS\') :\n      (deletion ? \'FILTER_DELETE\' : \'FILTER_CREATE\')\n    ) | translate }}\n  </h3>\n</div>\n\n\n\n<div class="modal-body">\n\n  <div notifications-panel />\n\n  <div ng-show="!deletion"\n       cam-tasklist-filter-modal-form\n       filter="filter"\n       filter-modal-data="filterModalData"\n       register-is-valid-provider="registerValidationProvider"\n       register-post-filter-saved-provider="registerPostFilterSavedProvider">\n  </div>\n\n  <div ng-show="deletion"\n       class="alert alert-warning"\n       role="alert">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    {{ \'FILTER_DELETION_WARNING\' | translate }}\n  </div>\n\n</div>\n\n\n<div class="modal-footer">\n\n  <div class="row row-action">\n\n    <div class="col-xs-4 align-left">\n\n      <button ng-show="!deletion && filter.id && accesses.delete"\n              class="btn btn-xs btn-link"\n              type="button"\n              ng-click="confirmDeletion()"\n              translate="FILTER_DELETE">Delete filter</button>\n\n\n      <button ng-show="deletion"\n              class="btn btn-xs btn-link"\n              type="button"\n              ng-click="abortDeletion()"\n              translate="FILTER_EDIT">Edit filter</button>\n    </div>\n\n    <div class="col-xs-8">\n      <div class="row">\n        <div class="col-xs-12">\n\n          <button class="btn btn-xs btn-link"\n                  type="button"\n                  ng-click="$dismiss()"\n                  translate="CLOSE">Close</button>\n\n          <button ng-if="!deletion && (!filter.id || (filter.id && accesses.update))"\n                  class="btn btn-primary"\n                  type="submit"\n                  ng-disabled="!isValid()"\n                  ng-click="submit()"\n                  translate="SAVE">Save</button>\n\n\n          <button ng-if="deletion"\n                  class="btn btn-primary"\n                  type="submit"\n                  ng-click="delete()"\n                  translate="DELETE">Delete</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n'
}), define("scripts/filter/controllers/cam-tasklist-filters-ctrl", ["text!./../modals/cam-tasklist-filter-modal.html"], function (e) {
  "use strict";
  return ["$scope", "$modal", "$q", "camAPI", function (n, t, i, a) {
    var r = n.filtersData = n.tasklistData.newChild(n), s = a.resource("filter");
    n.userCanCreateFilter = !1, r.provide("filterAuthorizations", function () {
      var e = i.defer();
      return s.authorizations(function (n, t) {
        n ? e.reject(n) : e.resolve(t)
      }), e.promise
    }), r.provide("userCanCreateFilter", ["filterAuthorizations", function (e) {
      e = e || {};
      for (var n, t = e.links || [], i = 0; n = t[i]; i++)if ("create" === n.rel)return !0;
      return !1
    }]), r.observe("userCanCreateFilter", function (e) {
      n.userCanCreateFilter = e
    }), n.openModal = function (n, i) {
      n.stopPropagation(), t.open({
        windowClass: "filter-modal",
        size: "lg",
        controller: "camFilterModalCtrl",
        template: e,
        resolve: {
          filter: function () {
            return i
          }, filtersData: function () {
            return r
          }
        }
      }).result.then(function () {
        r.changed("filters")
      }, function () {
        r.changed("filters")
      })
    }
  }]
}), define("scripts/filter/modals/cam-tasklist-filter-modal", ["angular"], function (e) {
  "use strict";
  function n(e, n) {
    if (p.test(e)) {
      "%" !== n[0] && (n = "%" + n);
      var t = n.length - 1;
      "%" !== n[t] && (n += "%")
    }
    return n
  }

  function t(e, n) {
    return p.test(e) && ("%" === n[0] && (n = n.slice(1, n.length)), "%" === n.slice(-1) && (n = n.slice(0, -1))), n
  }

  function i(e) {
    return f.test(e)
  }

  function a(e) {
    return m.test(e)
  }

  function r(e) {
    return o(Object.keys(e), function (n) {
      "$" === n[0] || l(e[n]) && !e[n].length ? delete e[n] : (c(e[n]) || l(e[n])) && (e[n] = r(e[n]))
    }), e
  }

  var s = e.copy, o = e.forEach, l = e.isArray, c = e.isObject, u = "Task", d = "#EEEEEE", p = /Like$/, f = /Variables$/, m = /^[\s]*(\#|\$)\{/;
  return ["$scope", "$translate", "$q", "Notifications", "camAPI", "filter", "filtersData", function (e, c, p, f, m, h, v) {
    function g(n, t, i) {
      c(n).then(function (n) {
        f.addError({status: n, message: t ? t.message : "", exclusive: i, scope: e})
      })
    }

    var b = m.resource("filter"), y = e.filterModalData = v.newChild(e);
    e.$on("$locationChangeStart", function () {
      e.$dismiss()
    }), e.deletion = !1, e.filter = s(h || {}), e.filter.name = e.filter.name, e.filter.properties = e.filter.properties || {}, e.filter.properties.description = e.filter.properties.description, e.filter.properties.priority = parseInt(e.filter.properties.priority || 0, 10), e.filter.properties.color = e.filter.properties.color || d, e.filter.properties.refresh = e.filter.properties.refresh || !1, e.filter.properties.showUndefinedVariable = e.filter.properties.showUndefinedVariable || !1;
    var k = e.filter.id;
    e.filter.properties.variables = e.filter.properties.variables || [];
    var E = e.filter.query = e.filter.query || {}, w = [], I = [];
    for (var A in E) {
      var _ = E[A];
      i(A) ? I.push({key: A, value: _}) : w.push({key: A, value: t(A, _)})
    }
    e.filter.query = w, y.provide("filter", e.filter), y.provide("userFilterAccess", ["filter", function (e) {
      var n = p.defer();
      return e && e.id ? b.authorizations(e.id, function (e, t) {
        e ? n.reject(e) : n.resolve(t)
      }) : n.resolve({links: []}), n.promise
    }]), y.provide("accesses", ["userFilterAccess", function (e) {
      var n = {};
      return o(e.links, function (e) {
        n[e.rel] = !0
      }), n
    }]), y.observe("accesses", function (n) {
      e.accesses = n
    });
    var D = function () {
      return !1
    };
    e.isValid = D, e.registerValidationProvider = function (n) {
      e.isValid = n || D
    };
    var T = function (e, n) {
      return n()
    };
    e.registerPostFilterSavedProvider = function (e) {
      T = e || T
    }, e.submit = function () {
      e.$broadcast("pre-submit");
      for (var t, s = (e.filter.query || []).concat(I), o = {}, c = 0; t = s[c]; c++) {
        var p = t.key, f = t.value;
        if (!i(p))if (f = n(p, f), a(f) ? -1 === p.indexOf("Expression") && (p += "Expression") : -1 !== p.indexOf("Expression") && (p = p.slice(0, p.indexOf("Expression"))), "candidateGroups" === p || "In" === p.slice(-2)) {
          if ("string" == typeof f) {
            f = f.split(",");
            for (var m = 0; m < f.length; m++)f[m] && (f[m] = f[m].trim())
          }
        } else f = "" + f;
        o[p] = f
      }
      e.filter.includeAssignedTasks && (o.includeAssignedTasks = !0);
      var h = {
        id: k,
        name: e.filter.name,
        resourceType: u,
        query: o,
        properties: {
          description: e.filter.properties.description,
          priority: parseInt(e.filter.properties.priority || 0, 10),
          color: e.filter.properties.color || d,
          refresh: e.filter.properties.refresh,
          variables: e.filter.properties.variables,
          showUndefinedVariable: e.filter.properties.showUndefinedVariable
        }
      };
      r(h), b.save(h, function (n, t) {
        return n ? g("FILTER_SAVE_ERROR", n, !0) : (h.id = k = k || t.id, void T(h, function (n) {
          if (n)if (l(n) && n.length)for (var t, i = 0; t = n[i]; i++)g(t.status, t.error, 0 === i); else g(n.status, n.error, !0); else e.$close()
        }))
      })
    }, e.abortDeletion = function () {
      e.deletion = !1
    }, e.confirmDeletion = function () {
      e.deletion = !0
    }, e["delete"] = function () {
      b["delete"](e.filter.id, function (n) {
        return n ? g("FILTER_DELETION_ERROR", n, !0) : void e.$close()
      })
    }
  }]
}), define("scripts/filter/index", ["angular", "./directives/cam-tasklist-filters", "./directives/cam-tasklist-filter-modal-form", "./directives/cam-tasklist-filter-modal-form-general", "./directives/cam-tasklist-filter-modal-form-criteria", "./directives/cam-tasklist-filter-modal-form-variable", "./directives/cam-tasklist-filter-modal-form-permission", "./controllers/cam-tasklist-filters-ctrl", "./modals/cam-tasklist-filter-modal"], function (e, n, t, i, a, r, s, o, l) {
  "use strict";
  var c = e.module("cam.tasklist.filter", ["ui.bootstrap"]);
  return c.directive("camTasklistFilters", n), c.directive("camTasklistFilterModalForm", t), c.directive("camTasklistFilterModalFormGeneral", i), c.directive("camTasklistFilterModalFormCriteria", a), c.directive("camTasklistFilterModalFormVariable", r), c.directive("camTasklistFilterModalFormPermission", s), c.controller("camFiltersCtrl", o), c.controller("camFilterModalCtrl", l), c
}), define("camunda-tasklist-ui", ["camunda-commons-ui", "camunda-bpm-sdk-js", "angular-data-depend", "scripts/config/date", "scripts/config/routes", "scripts/config/locales", "scripts/config/tooltip", "scripts/config/uris", "scripts/controller/cam-tasklist-app-ctrl", "scripts/controller/cam-tasklist-view-ctrl", "scripts/services/cam-tasklist-assign-notification", "scripts/services/cam-tasklist-configuration", "scripts/user/index", "scripts/variable/index", "scripts/tasklist/index", "scripts/task/index", "scripts/process/index", "scripts/navigation/index", "scripts/form/index", "scripts/filter/index", "scripts/api/index", "text!scripts/index.html"], function () {
  "use strict";
  function e() {
    var e = require("angular"), n = e.element;
    n(document).ready(function () {
      e.bootstrap(document, ["cam.tasklist", "cam.embedded.forms", "cam.tasklist.custom"]), setTimeout(function () {
        var e = n("[autofocus]");
        e.length && e[0].focus()
      }, 300)
    })
  }

  function n() {
    function n() {
      for (var e = t.element("base"), n = {}, i = ["href", "app-root", "admin-api", "engine-api"], a = 0; a < i.length; a++)n[i[a]] = e.attr(i[a]);
      return n
    }

    var t = require("angular"), r = (t.element, ["cam.commons", "pascalprecht.translate", "ngRoute", "dataDepend", require("scripts/user/index").name, require("scripts/variable/index").name, require("scripts/tasklist/index").name, require("scripts/task/index").name, require("scripts/process/index").name, require("scripts/navigation/index").name, require("scripts/form/index").name, require("scripts/filter/index").name, require("scripts/api/index").name].concat(i.map(function (e) {
      return e.ngModuleName
    }))), s = n();
    if (a = t.module("cam.tasklist", r), a.factory("assignNotification", require("scripts/services/cam-tasklist-assign-notification")), a.provider("configuration", require("scripts/services/cam-tasklist-configuration")), require("scripts/config/locales")(a, s["app-root"]), require("scripts/config/uris")(a, s), a.config(require("scripts/config/routes")), a.config(require("scripts/config/date")), a.config(require("scripts/config/tooltip")), a.controller("camTasklistAppCtrl", require("scripts/controller/cam-tasklist-app-ctrl")), a.controller("camTasklistViewCtrl", require("scripts/controller/cam-tasklist-view-ctrl")), "undefined" != typeof window.camTasklistConf && window.camTasklistConf.customScripts) {
      var o = window.camTasklistConf.customScripts || {}, l = {};
      ["baseUrl", "paths", "bundles", "shim", "map", "config", "packages", "waitSeconds", "context", "callback", "enforceDefine", "xhtml", "urlArgs", "scriptType"].forEach(function (e) {
        o[e] && (l[e] = o[e])
      }), require.config(l), require(o.deps || [], function () {
        t.module("cam.tasklist.custom", o.ngDeps), e.apply(this, arguments)
      })
    } else t.module("cam.tasklist.custom", []), require([], function () {
      e()
    })
  }

  var t = window.PLUGIN_PACKAGES || [], i = window.PLUGIN_DEPENDENCIES || [];
  require.config({packages: t});
  var a, r = ["camunda-commons-ui"].concat(i.map(function (e) {
    return e.requirePackageName
  }));
  require(r, n)
});
//# sourceMappingURL=camunda-tasklist-ui.js
//# sourceMappingURL=camunda-tasklist-ui.js.map
