define("camunda-commons-ui/util/uriFilter", [], function () {
  "use strict";
  var e = ["Uri", function (e) {
    return function (t) {
      return e.appUri(t)
    }
  }];
  return e
}), define("camunda-commons-ui/util/uriProvider", ["angular"], function (e) {
  "use strict";
  return function () {
    var t = /[\w]+:\/\/|:[\w]+/g, n = {};
    this.replace = function (e, t) {
      n[e] = t
    }, this.$get = ["$injector", function (r) {
      return {
        appUri: function (i) {
          var a = i.replace(t, function (t) {
            var i = n[t];
            return void 0 === i ? t : ((e.isFunction(i) || e.isArray(i)) && (i = r.invoke(i)), i)
          });
          return a
        }
      }
    }]
  }
}), define("camunda-commons-ui/util/notifications", ["angular"], function (e) {
  "use strict";
  return ["$filter", "$timeout", function (t, n) {
    return {
      notifications: [], consumers: [], addError: function (e) {
        e.type || (e.type = "danger"), this.add(e)
      }, addMessage: function (e) {
        e.type || (e.type = "info"), this.add(e)
      }, add: function (t) {
        var r = this, i = this.notifications, a = this.consumers, o = t.exclusive;
        if (o)if ("boolean" == typeof o)this.clearAll(); else {
          var s = {};
          e.forEach(o, function (e) {
            s[e] = t[e]
          }), r.clear(s)
        }
        i.push(t);
        for (var u, l = a.length - 1; (u = a[l]) && !u.add(t); l--);
        t.duration && n(function () {
          t.scope && delete t.scope, r.clear(t)
        }, t.duration), t.scope && t.scope.$on("$destroy", function () {
          delete t.scope, r.clear(t)
        })
      }, clear: function (n) {
        var r = this.notifications, i = this.consumers, a = [];
        "string" == typeof n && (n = {status: n}), a = t("filter")(r, n), a.push(n), e.forEach(a, function (t) {
          var n = r.indexOf(t);
          -1 != n && r.splice(n, 1), e.forEach(i, function (e) {
            e.remove(t)
          })
        })
      }, clearAll: function () {
        for (var e = this.notifications; e.length;) {
          var t = e.pop();
          this.clear(t)
        }
      }, registerConsumer: function (e) {
        this.consumers.push(e)
      }, unregisterConsumer: function (e) {
        var t = this.consumers, n = t.indexOf(e);
        -1 != n && t.splice(n, 1)
      }
    }
  }]
}), define("camunda-commons-ui/util/index", ["angular", "./uriFilter", "./uriProvider", "./notifications"], function (e, t, n, r) {
  "use strict";
  return e.module("cam.commons.util", []).filter("uri", t).provider("Uri", n).service("Notifications", r)
}), define("camunda-commons-ui/util", ["camunda-commons-ui/util/index"], function (e) {
  return e
}), define("text", {
  load: function (e) {
    throw new Error("Dynamic load not allowed: " + e)
  }
}), define("text!camunda-commons-ui/auth/page/login.html", [], function () {
  return '<!-- # CE - camunda-commons-ui/lib/auth/page/login.html -->\n<div class="form-signin-container">\n  <form class="form-signin"\n        ng-submit="login()"\n        name="signinForm"\n        request-aware>\n    <h2 class="form-signin-heading">Please sign in</h2>\n\n    <div notifications-panel\n         class="notifications-panel"></div>\n\n    <input autofocus\n           tabindex="1"\n           type="text"\n           class="form-control"\n           placeholder="Username"\n           auto-fill ng-model="username" />\n    <input tabindex="2"\n           type="password"\n           class="form-control"\n           placeholder="Password"\n           auto-fill\n           ng-model="password" />\n    <button tabindex="3"\n            class="btn btn-lg btn-primary"\n            type="submit">Sign in</button>\n  </form>\n</div>\n<!-- / CE - camunda-commons-ui/lib/auth/page/login.html -->\n'
}), define("camunda-commons-ui/auth/page/login", ["angular", "text!./login.html"], function (e, t) {
  "use strict";
  var n = e.element, r = ["$scope", "$rootScope", "AuthenticationService", "Notifications", "$location", function (e, t, r, i, a) {
    if (t.authentication)return a.path("/");
    t.showBreadcrumbs = !1;
    var o = n('form[name="signinForm"] [autofocus]')[0];
    o && o.focus(), e.login = function () {
      r.login(e.username, e.password).then(function () {
        i.clearAll()
      })["catch"](function () {
        i.addError({
          status: "Login Failed",
          message: "Wrong credentials or missing access rights to application",
          scope: e
        })
      })
    }
  }];
  return ["$routeProvider", function (e) {
    e.when("/login", {template: t, controller: r})
  }]
}), define("camunda-commons-ui/auth/directives/camIfLoggedIn", [], function () {
  "use strict";
  return ["$animate", "$rootScope", function (e, t) {
    return {
      transclude: "element", priority: 1e3, terminal: !0, restrict: "A", compile: function (n, r, i) {
        return function (n, r) {
          function a(t) {
            o && (e.leave(o), o = void 0), s && (s.$destroy(), s = void 0), t && (s = n.$new(), i(s, function (t) {
              o = t, e.enter(t, r.parent(), r)
            }))
          }

          var o, s;
          n.$on("authentication.changed", function (e, t) {
            a(t)
          }), a(t.authentication)
        }
      }
    }
  }]
}), define("camunda-commons-ui/auth/directives/camIfLoggedOut", [], function () {
  "use strict";
  return ["$animate", "$rootScope", function (e, t) {
    return {
      transclude: "element", priority: 1e3, terminal: !0, restrict: "A", compile: function (n, r, i) {
        return function (n, r) {
          function a(t) {
            o && (e.leave(o), o = void 0), s && (s.$destroy(), s = void 0), t && (s = n.$new(), i(s, function (t) {
              o = t, e.enter(t, r.parent(), r)
            }))
          }

          var o, s;
          n.$on("authentication.changed", function (e, t) {
            a(!t)
          }), a(!t.authentication)
        }
      }
    }
  }]
}), define("camunda-commons-ui/auth/util/authentication", ["angular"], function (e) {
  "use strict";
  function t(t) {
    e.extend(this, t)
  }

  return t.prototype.canAccess = function (e) {
    return this.authorizedApps && -1 !== this.authorizedApps.indexOf(e)
  }, t
}), define("camunda-commons-ui/auth/service/authenticationService", ["require", "angular", "jquery", "../util/authentication"], function (e) {
  "use strict";
  var t = e("jquery"), n = e("../util/authentication");
  return ["$rootScope", "$q", "$http", "Uri", function (e, r, i, a) {
    function o(t, n, r) {
      e.$broadcast(t, n, r)
    }

    function s(e) {
      if (200 !== e.status)return r.reject(e);
      var t = e.data;
      return new n({name: t.userId, authorizedApps: t.authorizedApps})
    }

    function u(t) {
      e.authentication = t, o("authentication.changed", t)
    }

    this.updateAuthentication = u, this.login = function (e, n) {
      function l(e) {
        return u(e), o("authentication.login.success", e), e
      }

      function c(e) {
        return o("authentication.login.failure", e), r.reject(e)
      }

      var p = t.param({username: e, password: n});
      return i({
        method: "POST",
        url: a.appUri("admin://auth/user/:engine/login/:appName"),
        data: p,
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      }).then(s).then(l, c)
    }, this.logout = function () {
      function e(e) {
        u(null), o("authentication.logout.success", e)
      }

      function t(e) {
        return o("authentication.logout.failure", e), r.reject(e)
      }

      return i.post(a.appUri("admin://auth/user/:engine/logout")).then(e, t)
    };
    var l;
    e.$on("authentication.changed", function (e, t) {
      l = r[t ? "when" : "reject"](t)
    }), this.getAuthentication = function () {
      function t(e) {
        return u(e), e
      }

      return l || (l = e.authentication ? r.when(e.authentication) : i.get(a.appUri("admin://auth/user/:engine")).then(s).then(t)), l
    }, e.$on("$routeChangeStart", function (e, t) {
      t.authentication && (t.resolve || (t.resolve = {}), t.resolve.authentication || (t.resolve.authentication = ["AuthenticationService", function (e) {
        return e.getAuthentication()["catch"](function (e) {
          return "optional" === t.authentication ? null : (o("authentication.login.required", t), r.reject(e))
        })
      }]))
    })
  }]
}), define("camunda-commons-ui/auth/index", ["angular", "angular-route", "../util/index", "./page/login", "./directives/camIfLoggedIn", "./directives/camIfLoggedOut", "./service/authenticationService"], function (e, t, n, r, i, a, o) {
  "use strict";
  var s = e.module("cam.commons.auth", [e.module("ngRoute").name, n.name]);
  return s.config(r).run(["$rootScope", "$location", function (e, t) {
    var n;
    e.$on("authentication.login.required", function (r) {
      e.$evalAsync(function () {
        var e = t.url();
        "/login" === e || r.defaultPrevented || (n = e, t.url("/login"))
      })
    }), e.$on("authentication.login.success", function (r) {
      e.$evalAsync(function () {
        r.defaultPrevented || (t.url(n || "/").replace(), n = null)
      })
    })
  }]).run(["$cacheFactory", "$rootScope", "$location", function (e, t, n) {
    t.$on("authentication.logout.success", function (r) {
      t.$evalAsync(function () {
        r.defaultPrevented || (e.get("$http").removeAll(), n.url("/"))
      })
    })
  }]).run(["$rootScope", "Notifications", function (e, t) {
    e.$on("authentication.login.required", function () {
      t.addError({
        status: "Unauthorized",
        message: "Login is required to access the resource",
        http: !0,
        exclusive: ["http"]
      })
    })
  }]).run(["AuthenticationService", function () {
  }]).directive("camIfLoggedIn", i).directive("camIfLoggedOut", a).service("AuthenticationService", o), s
}), define("camunda-commons-ui/pages/index", ["angular", "angular-route"], function (e) {
  "use strict";
  function t(e) {
    var t = "camunda Login";
    -1 !== e.indexOf("/cockpit/") ? t = "camunda Cockpit" : -1 !== e.indexOf("/tasklist/") ? t = "camunda Tasklist" : -1 !== e.indexOf("/admin/") && (t = "camunda Admin"), n("head title").text(t)
  }

  var n = e.element, r = e.module("camunda.common.pages", ["ngRoute"]), i = ["$rootScope", "$location", "Notifications", "AuthenticationService", function (e, n, r, i) {
    function a(e) {
      e.http = !0, e.exclusive = ["http"], r.addError(e)
    }

    function o(r, o) {
      var s = o.status, u = o.data;
      switch (s) {
        case 500:
          a(u && u.message ? {
            status: "Server Error",
            message: u.message,
            exceptionType: u.exceptionType
          } : {
            status: "Server Error",
            message: "The server reported an internal error. Try to refresh the page or login and out of the application."
          });
          break;
        case 0:
          a({status: "Request Timeout", message: "Your request timed out. Try to refresh the page."});
          break;
        case 401:
          -1 !== n.absUrl().indexOf("/setup/#") ? n.path("/setup") : (a({
            type: "warning",
            status: "Session ended",
            message: "Your session timed out or was ended from another browser window. Please signin again."
          }), t(n.absUrl()), i.updateAuthentication(null), e.$broadcast("authentication.login.required"));
          break;
        case 403:
          a("AuthorizationException" == u.type ? {
            status: "Access Denied",
            message: "You are unauthorized to " + u.permissionName.toLowerCase() + " " + u.resourceName.toLowerCase() + (u.resourceId ? " " + u.resourceId : "s") + "."
          } : {
            status: "Access Denied",
            message: "Executing an action has been denied by the server. Try to refresh the page."
          });
          break;
        case 404:
          a({status: "Not found", message: "A resource you requested could not be found."});
          break;
        default:
          a({
            status: "Communication Error",
            message: "The application received an unexpected " + s + " response from the server. Try to refresh the page or login and out of the application."
          })
      }
    }

    e.$on("httpError", o)
  }], a = ["$scope", "$http", "$location", "$window", "Uri", "Notifications", function (t, n, r, i, a, o) {
    var s = a.appUri(":engine"), u = {};
    n.get(a.appUri("engine://engine/")).then(function (n) {
      t.engines = n.data, e.forEach(t.engines, function (e) {
        u[e.name] = e
      }), t.currentEngine = u[s], t.currentEngine || (o.addError({
        status: "Not found",
        message: "The process engine you are trying to access does not exist",
        scope: t
      }), r.path("/"))
    }), t.$watch("currentEngine", function (e) {
      e && s !== e.name && (i.location.href = a.appUri("app://../" + e.name + "/"))
    })
  }], o = ["$scope", "$location", function (e, t) {
    e.activeClass = function (e) {
      var n = t.absUrl();
      return -1 != n.indexOf(e) ? "active" : ""
    }
  }], s = ["$scope", "$window", "$cacheFactory", "$location", "Notifications", "AuthenticationService", "Uri", function (e, t, n, r, i, a) {
    e.logout = function () {
      a.logout()
    }
  }];
  return r.run(i).controller("ProcessEngineSelectionController", a).controller("AuthenticationController", s).controller("NavigationController", o)
}), define("camunda-commons-ui/plugin/view", ["angular"], function (e) {
  "use strict";
  return function (t) {
    t.directive("view", ["$q", "$http", "$templateCache", "$anchorScroll", "$compile", "$controller", function (t, n, r, i, a, o) {
      return {
        restrict: "ECA", terminal: !0, link: function (s, u, l) {
          function c() {
            h && (h.$destroy(), h = null)
          }

          function p() {
            u.html(""), c()
          }

          function d(e) {
            var t = e.template;
            if (t)return t;
            var i = e.url;
            return n.get(i, {cache: r}).then(function (e) {
              return e.data
            })
          }

          function f() {
            var n = s.$eval(l.provider), r = s.$eval(l.vars) || {};
            return n ? void t.when(d(n)).then(function (t) {
              u.html(t), c();
              var l, p = a(u.contents()), d = {};
              h = s.$new(!0), r && (r.read && e.forEach(r.read, function (e) {
                h[e] = s[e], s.$watch(e, function (t) {
                  h[e] = t
                })
              }), r.write && e.forEach(r.write, function (e) {
                h.$watch(e, function (t) {
                  s[e] = t
                })
              })), n.controller && (d.$scope = h, l = o(n.controller, d), u.children().data("$ngControllerController", l)), p(h), h.$emit("$pluginContentLoaded"), i()
            }, function (e) {
              throw p(), e
            }) : void p()
          }

          var h;
          s.$watch(l.provider, f)
        }
      }
    }])
  }
}), define("camunda-commons-ui/plugin/service", ["angular"], function (e) {
  "use strict";
  return function (t) {
    function n(e) {
      return String.prototype.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
    }

    t._camPlugins = {};
    var r, i = [], a = e.element("base").attr("cam-exclude-plugins") || "";
    a && (e.forEach(a.split(","), function (e) {
      e = e.split(":");
      var t = "*";
      e.length >= 2 && n(e[1]) && (t = n(e.pop())), e = n(e.shift()), e && i.push(e + ":" + t)
    }), r = new RegExp("(" + i.join("|") + ")", "i"));
    var o = [function () {
      function e(e, t) {
        for (var n, r = t.priority || 0, i = 0; n = e[i]; i++)if (!n.priority || n.priority < r)return void e.splice(i, 0, t);
        e.push(t)
      }

      function n(t, n, r) {
        var i = r[t] = r[t] || [];
        e(i, n)
      }

      var i = {};
      this.registerPlugin = function (e, a, o) {
        if (t._camPlugins[a + ":" + o.id] = !1, !r || !r.test(a + ":" + o.id)) {
          t._camPlugins[a + ":" + o.id] = !0;
          var s = i[e] = i[e] || {};
          n(a, o, s)
        }
      }, this.$get = ["$filter", function (e) {
        var t = {
          getAllProviders: function (e) {
            return i[e] || {}
          }, getProviders: function (t, n) {
            if (!t)throw new Error("No type given");
            var r = n.component;
            if (!r)throw new Error("No component given");
            var a = (i[t] || {})[r];
            return n.id && (a = e("filter")(a, {id: n.id})), a || []
          }, getProvider: function (e, t) {
            var n = this.getProviders(e, t);
            return (n || [])[0]
          }
        };
        return t
      }]
    }];
    t.provider("Plugins", o);
    var s = ["PluginsProvider", function (t) {
      this.registerDefaultView = function (e, n) {
        r && r.test(e + ":" + n.id) || t.registerPlugin("view", e, n)
      }, this.registerView = function (e, n) {
        t.registerPlugin("view", e, n)
      }, this.$get = ["Uri", "Plugins", function (t, n) {
        function r(n) {
          e.forEach(n, function (n) {
            e.forEach(n, function (e) {
              e.url && (e.url = require.toUrl(t.appUri(e.url)))
            })
          })
        }

        function i() {
          a || (r(n.getAllProviders("view")), a = !0)
        }

        var a = !1, o = {
          getProviders: function (e) {
            return i(), n.getProviders("view", e)
          }, getProvider: function (e) {
            var t = this.getProviders(e);
            return (t || [])[0]
          }
        };
        return o
      }]
    }];
    t.provider("Views", s);
    var u = ["PluginsProvider", function (t) {
      this.registerData = function (e, n) {
        t.registerPlugin("data", e, n)
      }, this.$get = ["Plugins", "$injector", function (t, n) {
        var r = {
          getProviders: function (e) {
            return t.getProviders("data", e)
          }, getProvider: function (e) {
            var t = this.getProviders(e);
            return (t || [])[0]
          }, instantiateProviders: function (t, r) {
            var i = this.getProviders({component: t});
            e.forEach(i, function (e) {
              n.instantiate(e.controller, r)
            })
          }
        };
        return r
      }]
    }];
    t.provider("Data", u)
  }
}), define("camunda-commons-ui/plugin/index", ["angular", "./view", "./service"], function (e, t, n) {
  "use strict";
  var r = e.module("cockpit.plugin", []);
  return t(r), n(r), r
}), define("camunda-commons-ui/directives/email", [], function () {
  "use strict";
  return function () {
    return {
      restrict: "A", require: "ngModel", link: function (e, t, n, r) {
        var i = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        r.$parsers.unshift(function (e) {
          return i.test(e) || !e ? (r.$setValidity("email", !0), e) : (r.$setValidity("email", !1), null)
        })
      }
    }
  }
}), define("text!camunda-commons-ui/directives/engineSelect.html", [], function () {
  return '<li class="dropdown engine-select"\n    ng-show="engines.length > 1 && currentEngine">\n<!-- # CE - camunda-commons-ui/lib/directives/engineSelect.html -->\n  <a href\n     class="dropdown-toggle"\n     data-toggle="dropdown">\n    <span class="glyphicon glyphicon-info-sign glyphicon glyphicon-info-sign "\n          tooltip="If you have multiple engines running you can select the process engine here. The data displayed in this application is based on the selected engine only."\n          tooltip-placement="bottom"></span>\n    {{ currentEngine.name }}\n  </a>\n  <ul class="dropdown-menu dropdown-menu-right">\n    <li ng-repeat="(id, engine) in engines">\n      <a ng-href="{{ \'app://../\' + engine.name + \'/\' | uri }}">\n        {{ engine.name }}\n      </a>\n    </li>\n  </ul>\n<!-- / CE - camunda-commons-ui/lib/directives/engineSelect.html -->\n</li>\n'
}), define("camunda-commons-ui/directives/engineSelect", ["angular", "text!./engineSelect.html"], function (e, t) {
  "use strict";
  var n = e.element, r = ["$scope", "$http", "$location", "$window", "Uri", "Notifications", function (t, n, r, i, a, o) {
    var s = a.appUri(":engine"), u = {};
    n.get(a.appUri("engine://engine/")).then(function (n) {
      t.engines = n.data, e.forEach(t.engines, function (e) {
        u[e.name] = e
      }), t.currentEngine = u[s], t.currentEngine || (o.addError({
        status: "Not found",
        message: "The process engine you are trying to access does not exist",
        scope: t
      }), r.path("/dashboard"))
    })
  }];
  return function () {
    return {
      template: t, replace: !0, controller: r, link: function (e, t, r) {
        var i;
        e.$watch(r.ngShow, function (e) {
          e && !i && (i = n('<li class="divider-vertical"></li>').insertAfter(t)), !e && i && (i.remove(), i = null)
        }), e.$on("$destroy", function () {
          i && i.remove()
        })
      }
    }
  }
}), define("camunda-commons-ui/directives/autoFill", [], function () {
  "use strict";
  return ["$interval", function (e) {
    return {
      restrict: "A", require: "ngModel", link: function (t, n, r, i) {
        var a = e(function () {
          var t = n.val();
          t !== i.$viewValue && (i.$setViewValue(t), i.$setPristine()), "function" != typeof document.contains || document.contains(n[0]) ? "function" != typeof document.contains && e.cancel(a) : e.cancel(a)
        }, 500)
      }
    }
  }]
}), define("text!camunda-commons-ui/directives/inPlaceTextField.html", [], function () {
  return '<!-- # CE - camunda-commons-ui/lib/directives/inPlaceTextField.html -->\n<div in-place-text-field-root>\n  <div ng-if="!editing">\n    {{ context[property] }}\n    <span class="edit-toggle"\n          ng-click="enter()">\n      <span class="glyphicon glyphicon-pencil"></span>\n    </span>\n  </div>\n\n  <form ng-if="editing"\n        ng-submit="submit()"\n        class="inline-edit"\n        name="inPlaceTextFieldForm"\n        novalidate\n        request-aware>\n\n    <fieldset>\n      <!-- {{ value }} -->\n      <input name="value"\n             ng-model="value"\n             type="text"\n             class="in-place-edit form-control"\n             placeholder="{{ placeholder }}"\n             autofocus\n             required>\n    </fieldset>\n\n    <div class="inline-edit-footer">\n\n      <p class="error" ng-show="error">\n        {{ error.message }}\n      </p>\n\n      <div class="btn-group">\n        <button type="submit"\n                class="btn btn-sm btn-primary"\n                ng-disabled="inPlaceTextFieldForm.$invalid">\n          <span class="glyphicon glyphicon-ok "></span>\n        </button>\n        <button type="button"\n                class="btn btn-sm btn-default"\n                ng-click="leave()">\n          <span class="glyphicon glyphicon-ban-circle"></span>\n        </button>\n      </div>\n    </div>\n\n  </form>\n</div>\n<!-- / CE - camunda-commons-ui/lib/directives/inPlaceTextField.html -->\n'
}), define("camunda-commons-ui/directives/inPlaceTextField", ["angular", "text!./inPlaceTextField.html"], function (e, t) {
  "use strict";
  return [function () {
    function n(t) {
      t.value = t.context[t.property] || t.defaultValue || null, t.enter = function () {
        t.editing = !0, t.value = t.context[t.property]
      }, t.submit = function () {
        var n = this;
        return t.context[t.property] === n.value ? void t.leave() : (t.context[t.property] = n.value, e.isFunction(t.$parent[t.submitCallback]) && t.$parent[t.submitCallback](n), void t.leave())
      }, t.leave = function () {
        t.editing = !1
      }
    }

    return {
      restrict: "E",
      scope: {
        unserializeCallback: "@unserialize",
        serializeCallback: "@serialize",
        initializeCallback: "@initialize",
        enterCallback: "@enter",
        validateCallback: "@validate",
        submitCallback: "@submit",
        successCallback: "@success",
        errorCallback: "@error",
        leaveCallback: "@leave",
        context: "=",
        property: "@",
        defaultValue: "@default"
      },
      template: t,
      link: function (e) {
        if (!e.property)throw new Error("You must specify a property of the context to be editable");
        var t = e.initializeCallback ? e.$parent[e.initializeCallback] : function (e, t) {
          t()
        };
        t(e, function () {
          n(e)
        })
      }
    }
  }]
}), define("camunda-commons-ui/directives/notificationsPanel", ["angular-sanitize"], function () {
  "use strict";
  var e = '<div class="notifications">  <div ng-repeat="notification in notifications" class="alert" ng-class="notificationClass(notification)">    <button type="button" class="close" ng-click="removeNotification(notification)">&times;</button>    <strong class="status" ng-bind-html="trustHTML(notification.status)" compile-template></strong>     <strong ng-if="notification.message">:</strong>    <span class="message" ng-bind-html="trustHTML(notification.message)" compile-template></span>  </div></div>';
  return ["Notifications", "$filter", "$sce", function (t, n, r) {
    return {
      restrict: "EA", scope: {filter: "=notificationsFilter"}, template: e, link: function (e) {
        function i(e) {
          return a ? !!n("filter")([e], a).length : !0
        }

        var a = e.filter, o = e.notifications = [], s = {
          add: function (e) {
            return i(e) ? (o.push(e), !0) : !1
          }, remove: function (e) {
            var t = o.indexOf(e);
            -1 != t && o.splice(t, 1)
          }
        };
        t.registerConsumer(s), e.removeNotification = function (e) {
          o.splice(o.indexOf(e), 1)
        }, e.notificationClass = function (e) {
          var t = ["danger", "error", "success", "warning", "info"], n = "info";
          return t.indexOf(e.type) > -1 && (n = e.type), "alert-" + n
        }, e.trustHTML = function (e) {
          return r.trustAsHtml(e)
        }, e.$on("$destroy", function () {
          t.unregisterConsumer(s)
        })
      }
    }
  }]
}), define("camunda-commons-ui/directives/password", [], function () {
  "use strict";
  return function () {
    return {
      restrict: "A", require: "ngModel", link: function (e, t, n, r) {
        r.$parsers.unshift(function (e) {
          return e && e.length >= 8 ? r.$setValidity("password", !0) : r.$setValidity("password", !1), e
        })
      }
    }
  }
}), define("camunda-commons-ui/directives/passwordRepeat", [], function () {
  "use strict";
  return function () {
    return {
      restrict: "A", require: "ngModel", link: function (e, t, n, r) {
        var i = n.passwordRepeat;
        r.$parsers.unshift(function (t) {
          var n = e.$eval(i), a = t == n;
          return r.$setValidity("passwordRepeat", a), t
        }), e.$watch(i, function (e) {
          var t = e == r.$viewValue;
          r.$setValidity("passwordRepeat", t), t || r.$setViewValue(r.$viewValue)
        })
      }
    }
  }
}), define("camunda-commons-ui/directives/requestAware", ["angular", "jquery"], function (e, t) {
  "use strict";
  return [function () {
    return {
      require: "form", link: function (e, n, r, i) {
        function a(e) {
          i.$setValidity("request", e)
        }

        function o(e) {
          var r = t(":input", n);
          e ? r.removeAttr("disabled") : r.attr("disabled", "disabled")
        }

        function s(e) {
          o(e), a(e)
        }

        i.$load = {
          start: function () {
            e.$broadcast("formLoadStarted")
          }, finish: function () {
            e.$broadcast("formLoadFinished")
          }
        }, e.$on("formLoadStarted", function () {
          s(!1)
        }), e.$on("formLoadFinished", function () {
          s(!0)
        }), "manual" != r.requestAware && (e.$on("requestStarted", function () {
          i.$load.start()
        }), e.$on("requestFinished", function () {
          i.$load.finish()
        }))
      }
    }
  }]
}), define("camunda-commons-ui/directives/showIfAuthorized", [], function () {
  "use strict";
  var e = {application: 0, user: 1, group: 2, "group membership": 3, authorization: 4}, t = function (t, n, r) {
    var i = {};
    return i.permissionName = t, i.resourceName = n, i.resourceType = e[n], r && (i.resourceId = r), i
  };
  return ["$animate", "AuthorizationResource", function (e, n) {
    return {
      transclude: "element", priority: 1e3, terminal: !0, restrict: "A", compile: function (r, i, a) {
        return function (r, o) {
          var s, u, l = i.authPermission, c = i.authResourceName, p = r.$eval(i.authResourceId);
          n.check(t(l, c, p)).$promise.then(function (t) {
            s && (e.leave(s), s = void 0), u && (u.$destroy(), u = void 0), t.authorized && (u = r.$new(), a(u, function (t) {
              s = t, e.enter(t, o.parent(), o)
            }))
          })
        }
      }
    }
  }]
}), define("camunda-commons-ui/directives/compileTemplate", [], function () {
  "use strict";
  return ["$compile", "$parse", function (e, t) {
    return {
      restrict: "A", link: function (n, r, i) {
        function a() {
          return (o(n) || "").toString()
        }

        var o = t(i.ngBindHtml);
        n.$watch(a, function () {
          e(r.contents())(n)
        })
      }
    }
  }]
}), define("camunda-commons-ui/directives/nl2br", [], function () {
  "use strict";
  return [function () {
    return {
      scope: {original: "=nl2br"}, link: function (e, t) {
        t.html((e.original || "").replace(/\n/g, "<br/>"))
      }
    }
  }]
}), define("camunda-commons-ui/directives/instantTypeahead", [], function () {
  "use strict";
  var e = "[$empty$]";
  return ["$timeout", function (t) {
    return {
      restrict: "A", require: "ngModel", link: function (n, r, i, a) {
        t(function () {
          a.$parsers.unshift(function (t) {
            var n = t ? t : e;
            return a.$viewValue = n, n
          }), a.$parsers.push(function (t) {
            return t === e ? "" : t
          }), n.instantTypeahead = function (t, n) {
            return n === e || ("" + t).toLowerCase().indexOf(("" + n).toLowerCase()) > -1
          }, r.bind("click", function () {
            r.trigger("input")
          })
        })
      }
    }
  }]
}), define("camunda-commons-ui/directives/index", ["angular", "./email", "./engineSelect", "./autoFill", "./inPlaceTextField", "./notificationsPanel", "./password", "./passwordRepeat", "./requestAware", "./showIfAuthorized", "./compileTemplate", "./nl2br", "./instantTypeahead", "../util/index", "angular-bootstrap"], function (e, t, n, r, i, a, o, s, u, l, c, p, d, f) {
  "use strict";
  var h = e.module("camunda.common.directives", ["ui.bootstrap", f.name]);
  return h.directive("email", t), h.directive("autoFill", r), h.directive("engineSelect", n), h.directive("camInPlaceTextField", i), h.directive("notificationsPanel", a), h.directive("password", o), h.directive("passwordRepeat", s), h.directive("showIfAuthorized", l), h.directive("compileTemplate", c), h.directive("nl2br", p), h.directive("instantTypeahead", d), h.config(["$modalProvider", "$tooltipProvider", function (e, t) {
    e.options = {backdrop: !0, keyboard: !0}, t.options({animation: !0, popupDelay: 100, appendToBody: !0})
  }]), h
}), define("camunda-commons-ui/resources/authorizationResource", [], function () {
  "use strict";
  return ["$resource", "Uri", function (e, t) {
    return e(t.appUri("engine://engine/:engine/authorization/:action"), {action: "@action"}, {
      check: {
        method: "GET",
        params: {action: "check"},
        cache: !0
      }, count: {method: "GET", params: {action: "count"}}, create: {method: "POST", params: {action: "create"}}
    })
  }]
}), define("camunda-commons-ui/resources/index", ["angular", "./authorizationResource"], function (e, t) {
  "use strict";
  var n = e.module("camunda.common.resources", []);
  return n.factory("AuthorizationResource", t), n
}), define("camunda-commons-ui/search/index", ["angular"], function (e) {
  "use strict";
  var t = ["$location", "$rootScope", function (t, n) {
    var r = !1;
    n.$on("$routeUpdate", function (e, t) {
      r ? r = !1 : n.$broadcast("$routeChanged", t)
    }), n.$on("$routeChangeSuccess", function () {
      r = !1
    });
    var i = function () {
      Array.prototype.slice(arguments);
      return t.search.apply(t, arguments)
    };
    return i.updateSilently = function (n) {
      var i = t.absUrl();
      e.forEach(n, function (e, n) {
        t.search(n, e)
      });
      var a = t.absUrl();
      a != i && (r = !0)
    }, i
  }], n = e.module("camunda.common.search", []);
  return n.factory("search", t), n
}), define("camunda-commons-ui/services/escape", [], function () {
  "use strict";
  return function () {
    return function (e) {
      return encodeURIComponent(e).replace(/%2F/g, "%252F").replace(/\*/g, "%2A").replace(/%5C/g, "%255C")
    }
  }
}), define("camunda-commons-ui/services/debounce", [], function () {
  "use strict";
  return ["$timeout", function (e) {
    return function (t, n) {
      var r, i = function () {
        var a = this, o = arguments;
        i.$loading = !0, r && e.cancel(r), r = e(function () {
          r = null, i.$loading = !1, t.apply(a, o)
        }, n)
      };
      return i
    }
  }]
}), define("camunda-commons-ui/services/RequestLogger", [], function () {
  "use strict";
  return ["$rootScope", function (e) {
    var t = 0;
    return {
      logStarted: function () {
        t || e.$broadcast("requestStarted"), t++
      }, logFinished: function () {
        t--, t || e.$broadcast("requestFinished")
      }
    }
  }]
}), define("camunda-commons-ui/services/ResourceResolver", [], function () {
  "use strict";
  return ["$route", "$q", "$location", "Notifications", function (e, t, n, r) {
    function i(i, a) {
      function o(e) {
        u.resolve(e)
      }

      function s(e) {
        var t, i, a = "/dashboard";
        404 === e.status ? (t = "No " + p + " with ID " + l, i = !0) : 401 === e.status ? (t = "Authentication failed. Your session might have expired, you need to login.", a = "/login") : t = "Received " + e.status + " from server.", n.path(a), i && n.replace(), r.addError({
          status: "Failed to display " + p,
          message: t,
          http: !0,
          exclusive: ["http"]
        }), u.reject(t)
      }

      var u = t.defer(), l = e.current.params[i], c = a.resolve, p = a.name || "entity", d = c(l);
      if (d.$promise.then)d = d.$promise.then(function (e) {
        o(e)
      }, s); else {
        if (!d.then)throw new Error("No promise returned by #resolve");
        d = d.then(o, s)
      }
      return u.promise
    }

    return {getByRouteParam: i}
  }]
}), define("camunda-commons-ui/services/index", ["angular", "./../util/index", "./escape", "./debounce", "./RequestLogger", "./ResourceResolver"], function (e, t, n, r, i, a) {
  "use strict";
  var o = e.module("camunda.common.services", [t.name]);
  return o.filter("escape", n), o.factory("debounce", r), o.factory("RequestLogger", i), o.factory("ResourceResolver", a), o.config(["$httpProvider", function (e) {
    e.responseInterceptors.push(["$rootScope", "$q", "RequestLogger", function (e, t, n) {
      return function (r) {
        function i(e) {
          return n.logFinished(), e
        }

        function a(r) {
          n.logFinished();
          var i = {status: parseInt(r.status), response: r, data: r.data};
          return e.$broadcast("httpError", i), t.reject(r)
        }

        return n.logStarted(), r.then(i, a)
      }
    }])
  }]), o.config(["$httpProvider", "$windowProvider", function (e, t) {
    var n = t.$get(), r = n.location.href, i = r.match(/\/app\/(\w+)\/(\w+)\//);
    if (!i)throw new Error("no process engine selected");
    e.defaults.headers.get = {"X-Authorized-Engine": i[2]}
  }]), o
}), define("text!camunda-commons-ui/widgets/inline-field/cam-widget-inline-field.html", [], function () {
  return '<span ng-show="!editing"\n      ng-click="startEditing()"\n      ng-transclude\n      class="view-value">\n</span>\n\n<span ng-if="editing && (varType === \'datetime\' || varType === \'date\' || varType === \'time\')"\n      class="preview">\n  {{ dateValue | camDate }}\n</span>\n\n<span ng-if="editing"\n      class="edit">\n\n  <input ng-if="simpleField"\n         class="form-control"\n         type="{{ varType }}"\n         ng-model="editValue"\n         ng-keydown="handleKeydown($event)"\n         placeholder="{{ placeholder }}" />\n\n  <span ng-show="varType === \'datetime\' || varType === \'date\' || varType === \'time\'"\n        class="cam-widget-inline-field field-control">\n\n    <datepicker class="datepicker"\n                ng-if="varType === \'datetime\' || varType === \'date\'"\n                type="text"\n                ng-required="true"\n                is-open="datePickerOptions.isOpen"\n                show-button-bar="false"\n\n                ng-model="dateValue"\n                ng-change="changeDate(this)" />\n\n    <timepicker class="timepicker"\n                ng-if="varType === \'datetime\' || varType === \'time\'"\n                show-meridian="false"\n\n                ng-model="dateValue"\n                ng-change="changeDate(this)" />\n  </span>\n\n  <input ng-if="varType === \'option\' && options[0].value"\n         class="form-control"\n         type="text"\n         ng-model="editValue"\n         ng-keydown="handleKeydown($event)"\n         typeahead="option as option.value for option in options | filter:$viewValue:instantTypeahead"\n         typeahead-on-select="saveSelection($item)"\n         instant-typeahead />\n  <input ng-if="varType === \'option\' && !options[0].value"\n         class="form-control"\n         type="text"\n         ng-model="editValue"\n         ng-keydown="handleKeydown($event)"\n         typeahead="option for option in options | filter:$viewValue:instantTypeahead"\n         typeahead-on-select="saveSelection($item)"\n         instant-typeahead />\n\n  <span ng-show="varType !== \'option\'"\n        class="cam-widget-inline-field btn-group">\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-click="changeType()"\n            ng-if="flexible">\n      <span class="glyphicon"\n            ng-class="\'glyphicon-\' + (varType === \'text\' ? \'calendar\' : \'pencil\')"></span>\n    </button>\n\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-click="applyChange($event)">\n      <span class="glyphicon glyphicon-ok"></span>\n    </button>\n\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-click="cancelChange($event)">\n      <span class="glyphicon glyphicon-remove"></span>\n    </button>\n  </span>\n</span>\n'
}), define("camunda-commons-ui/widgets/inline-field/cam-widget-inline-field", ["text!./cam-widget-inline-field.html", "angular", "jquery"], function (e, t, n) {
  "use strict";
  return ["$timeout", "$filter", "$document", function (r, i, a) {
    return {
      scope: {
        varValue: "=value",
        varType: "@type",
        validator: "&validate",
        change: "&",
        onStart: "&onStartEditing",
        onCancel: "&onCancelEditing",
        placeholder: "@",
        options: "=?",
        allowNonOptions: "@",
        flexible: "@"
      }, template: e, link: function (e, o) {
        function s(e) {
          var t, n, r, i, a, o, s, u = E.exec(e);
          return u ? (t = parseInt(u[1] || 0, 10), n = parseInt(u[2] || 0, 10) - 1, r = parseInt(u[3] || 0, 10), i = parseInt(u[4] || 0, 10), a = parseInt(u[5] || 0, 10), o = parseInt(u[6] || 0, 10), s = parseInt(u[7] || 0, 10), new Date(t, n, r, i, a, o, s)) : void 0
        }

        function u() {
          return ["datetime", "date", "time"].indexOf(e.varType) > -1
        }

        function l() {
          return ["color", "email", "month", "number", "range", "tel", "text", "time", "url", "week"].indexOf(e.varType) > -1
        }

        function c() {
          if (e.editing = !1, e.invalid = !1, e.editValue = e.varValue, e.validator = e.validator || function () {
              }, e.onStart = e.onStart || function () {
              }, e.onCancel = e.onCancel || function () {
              }, e.change = e.change || function () {
              }, e.options = e.options || [], e.allowNonOptions = e.allowNonOptions || !1, e.flexible = e.flexible || !1, e.varType = e.varType ? e.varType : "text", e.simpleField = l(), u()) {
            var t = e.varValue, n = null;
            n = t ? s(t) : Date.now(), e.dateValue = n
          }
        }

        function p(e) {
          if (!e || !e.length)return !1;
          var t = e.parent();
          return t && t.length ? "body" === t[0].tagName.toLowerCase() : !1
        }

        function d() {
          var e = o.offset();
          v.show().css({
            left: e.left + (o.outerWidth() - v.outerWidth()),
            top: e.top - v.outerHeight()
          }), y.show().css({left: e.left, top: e.top + o.outerHeight()})
        }

        function f() {
          v = (v && v.length ? v : o.find(".btn-group")).hide(), p(v) || b.append(v), y = (y && y.length ? y : o.find(".field-control")).hide(), p(y) || b.append(y), r(d, 50)
        }

        function h(t) {
          r(function () {
            (!e.editing || t) && (v && v.remove && v.remove(), v = null, y && y.remove && y.remove(), y = null)
          }, 50)
        }

        function m(e) {
          return o[0].contains(e.target) || v && v.length && v[0].contains(e.target) || y && y.length && y[0].contains(e.target)
        }

        function g(t) {
          if (e.editing && !m(t)) {
            var r = n(t.target), i = "ng-binding text-muted";
            if (!r.hasClass(i)) {
              var a = r.children();
              a.hasClass(i) || e.$apply(e.cancelChange)
            }
          }
        }

        var v, y, b = t.element("body"), w = i("date"), x = "yyyy-MM-dd'T'HH:mm:ss", E = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/;
        e.editing = !1, e.$on("$locationChangeSuccess", function () {
          e.cancelChange()
        }), e.$on("$destroy", function () {
          h(!0)
        }), e.$watch("editing", function (t, n) {
          t !== n && (e.editing ? (f(), o.addClass("inline-editing")) : (h(), o.removeClass("inline-editing")))
        }), e.changeType = function () {
          e.varType = "datetime" === e.varType ? "text" : "datetime", c(), e.editing = !0, o[0].attributes.type.value = e.varType, e.simpleField = l()
        }, e.startEditing = function () {
          if (!e.editing) {
            c(), e.editing = !0, e.onStart(e);
            var t = e.editValue;
            e.editValue = "", r(function () {
              r(function () {
                o.find('[ng-model="editValue"]').trigger("input"), e.editValue = t, t && r(function () {
                  for (var e = "object" == typeof t ? t.value : t, r = o.find("li[ng-mouseenter]"), i = 0; i < r.length; i++) {
                    var a = r[i];
                    if (0 === a.innerText.indexOf(e))return void n(a).trigger("mouseenter")
                  }
                })
              })
            }), r(function () {
              n('[ng-model="editValue"]').focus(), n('[ng-model="editValue"]').select(), a.bind("click", g)
            }, 50)
          }
        }, e.applyChange = function (t, r) {
          if (e.invalid = e.validator(e), !e.invalid) {
            if (e.simpleField)e.editValue = n('[ng-model="editValue"]').val(), e.varValue = e.editValue; else if ("option" === e.varType) {
              if (-1 === e.options.indexOf(t) && !e.allowNonOptions)return void e.cancelChange();
              e.editValue = t || n('[ng-model="editValue"]').val(), e.varValue = e.editValue
            } else u() && (e.varValue = w(e.dateValue, x));
            e.$event = r, e.change(e), e.editing = !1, a.unbind("click", g)
          }
        }, e.cancelChange = function () {
          e.editing = !1, e.onCancel(e), a.unbind("click", g)
        }, e.changeDate = function (t) {
          e.editValue = e.dateValue = t.dateValue
        }, e.selectNextInlineField = function (e) {
          for (var t = n("[cam-widget-inline-field][type='text'], [cam-widget-inline-field][type='option']"), i = e * (t.length - 1); i !== !e * (t.length - 1); i += 2 * !e - 1)if (t[i] === o[0])return void r(function () {
            var a = n(t[i + 2 * !e - 1]);
            a.find(".view-value").click(), r(function () {
              a.find("input").select()
            })
          });
          r(function () {
            n(t[e * t.length - 1]).find(".view-value").click()
          })
        }, e.handleKeydown = function (t) {
          13 === t.keyCode ? (e.applyChange(e.selection, t), t.preventDefault()) : 27 === t.keyCode ? (e.cancelChange(t), t.preventDefault()) : 9 === t.keyCode && (e.applyChange(e.selection, t), e.selectNextInlineField(t.shiftKey), t.preventDefault()), e.selection = null
        }, e.selection = null, e.saveSelection = function (t) {
          e.selection = t, r(function () {
            e.selection === t && e.applyChange(t)
          })
        }
      }, transclude: !0
    }
  }]
}), define("text!camunda-commons-ui/widgets/search-pill/cam-widget-search-pill.html", [], function () {
  return '<!-- CE # camunda-commons-ui/lib/widgets/search-pill/search-pill.html -->\n<span class="search-label"\n      ng-class="{\'invalid\': !valid}">\n  <a href\n     ng-click="onDelete()"\n     tooltip-placement="top"\n     tooltip="{{ deleteText }}"\n     class="remove-search glyphicon glyphicon-remove">\n  </a>\n\n  <span class="glyphicon glyphicon-exclamation-sign valid-hide"\n        ng-if="invalidText"\n        tooltip-placement="top"\n        tooltip="{{ invalidText }}"></span>\n  <span class="glyphicon glyphicon-exclamation-sign valid-hide"\n        ng-if="!invalidText"></span>\n\n  <span cam-widget-inline-field\n        class="set-value"\n        type="option"\n        options="type.values"\n        change="changeSearch(\'type\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'type\')"\n        value="type.value">\n    <span ng-if="type.tooltip"\n          tooltip-placement="top"\n          tooltip="{{type.tooltip}}">\n      {{ type.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="!type.tooltip">\n      {{ type.value.value | camQueryComponent }}\n    </span>\n  </span>\n  <span ng-if="extended">\n    :\n    <span ng-if="potentialNames.length <= 0">\n      <span ng-if="!!name.value.value">\n        <span cam-widget-inline-field\n              class="set-value"\n              type="text"\n              change="changeSearch(\'name\', varValue, $event)"\n              on-start-editing="clearEditTrigger(\'name\')"\n              value="name.value.value">\n          <span ng-if="name.tooltip"\n                tooltip-placement="top"\n                tooltip="{{name.tooltip}}">\n              {{ name.value.value | camQueryComponent }}\n          </span>\n          <span ng-if="!name.tooltip">\n              {{ name.value.value | camQueryComponent }}\n          </span>\n        </span>\n      </span>\n      <span ng-if="!name.value.value">\n        <span cam-widget-inline-field\n              class="set-value"\n              type="text"\n              change="changeSearch(\'name\', varValue, $event)"\n              on-start-editing="clearEditTrigger(\'name\')"\n              value="name.value">\n          <span ng-if="name.tooltip"\n                tooltip-placement="top"\n                tooltip="{{name.tooltip}}">\n              {{ name.value | camQueryComponent }}\n          </span>\n          <span ng-if="!name.tooltip">\n              {{ name.value | camQueryComponent }}\n          </span>\n        </span>\n      </span>\n    </span>\n    <span ng-if="potentialNames.length > 0">\n      <span cam-widget-inline-field\n            class="set-value"\n            type="option"\n            options="potentialNames"\n            allow-non-options="true"\n            change="changeSearch(\'name\', varValue, $event)"\n            on-start-editing="clearEditTrigger(\'name\')"\n            value="name.value">\n        <span ng-if="name.tooltip"\n              tooltip-placement="top"\n              tooltip="{{name.tooltip}}">\n          <span ng-if="name.value.key">\n            {{ name.value.value | camQueryComponent }}\n          </span>\n          <span ng-if="!name.value.key">\n            {{ name.value | camQueryComponent }}\n          </span>\n        </span>\n        <span ng-if="!name.tooltip">\n          <span ng-if="name.value.key">\n            {{ name.value.value | camQueryComponent }}\n          </span>\n          <span ng-if="!name.value.key">\n            {{ name.value | camQueryComponent }}\n          </span>\n        </span>\n      </span>\n    </span>\n  </span>\n\n  <span cam-widget-inline-field\n        class="set-value"\n        type="option"\n        options="operator.values"\n        change="changeSearch(\'operator\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'operator\')"\n        value="operator.value">\n    <span ng-if="operator.tooltip"\n          tooltip-placement="top"\n          tooltip="{{operator.tooltip}}">\n      {{ operator.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="!operator.tooltip">\n      {{ operator.value.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span cam-widget-inline-field\n        class="set-value"\n        type="{{ valueType }}"\n        change="changeSearch(\'value\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'value\')"\n        value="value.value"\n        flexible="{{ allowDates }}">\n    <span class="visible-whitespace"\n          ng-if="value.tooltip"\n          tooltip-placement="top"\n          tooltip="{{value.tooltip}}">{{ value.value | camQueryComponent }}</span>\n    <span class="visible-whitespace"\n          ng-if="!value.tooltip">{{ value.value | camQueryComponent }}</span>\n  </span>\n</span>\n<!-- CE / camunda-commons-ui/lib/widgets/search-pill/search-pill.html -->\n'
}), define("camunda-commons-ui/widgets/search-pill/cam-widget-search-pill", ["text!./cam-widget-search-pill.html", "angular", "jquery"], function (e) {
  "use strict";
  return ["$timeout", function (t) {
    return {
      restrict: "A",
      scope: {
        valid: "=",
        extended: "=",
        allowDates: "=",
        enforceDates: "=",
        invalidText: "@",
        deleteText: "@",
        type: "=",
        name: "=",
        potentialNames: "=?",
        operator: "=",
        value: "=",
        onChange: "&",
        onDelete: "&"
      },
      link: function (e, n) {
        e.valueType = e.enforceDates ? "datetime" : "text", e.potentialNames = e.potentialNames || [], e.changeSearch = function (t, n, r) {
          var i = e[t].value;
          e[t].value = n, e[t].inEdit = !1, "function" == typeof e.onChange && e.onChange({
            field: t,
            before: i,
            value: n,
            $event: r
          })
        }, e.clearEditTrigger = function (t) {
          e[t].inEdit = !1
        }, e.$watch("allowDates", function (t) {
          t || (e.valueType = "text")
        }), e.$watch("enforceDates", function (t) {
          t && (e.valueType = "datetime")
        });
        var r = function (e) {
          t(function () {
            n.find("[cam-widget-inline-field][value='" + e + ".value']").find(".view-value").click()
          })
        };
        e.$watch("value", function (e) {
          return e && e.inEdit && r("value")
        }, !0), e.$watch("name", function (e) {
          return e && e.inEdit && r("name")
        }, !0), e.$watch("type", function (e) {
          return e && e.inEdit && r("type")
        }, !0)
      },
      template: e
    }
  }]
}), define("camunda-commons-ui/widgets/search-pill/cam-query-component", ["angular"], function () {
  "use strict";
  return ["$filter", function (e) {
    function t(e) {
      return e.match(n)
    }

    var n = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/, r = e("camDate");
    return function (e) {
      return e && t(e) ? r(e) : e ? e : "??"
    }
  }]
}), define("text!camunda-commons-ui/widgets/header/cam-widget-header.html", [], function () {
  return '<div class="navbar-header">\n  <button type="button"\n          class="navbar-toggle collapsed">\n    <span class="sr-only">Toggle navigation</span>\n    <span class="icon-bar"></span>\n    <span class="icon-bar"></span>\n    <span class="icon-bar"></span>\n  </button>\n\n  <a class="navbar-brand"\n     href="#/"\n     title="{{ brandName }}">\n    {{ brandName }}\n  </a>\n</div>\n\n<div ng-transclude></div>\n\n<ul class="cam-nav nav navbar-nav">\n\n  <li engine-select></li>\n\n  <li class="account dropdown"\n      ng-if="authentication.name"\n      ng-cloak>\n    <a href\n       class="dropdown-toggle">\n      <span class="glyphicon glyphicon-user "></span>\n      {{ authentication.name }}\n    </a>\n\n    <ul class="dropdown-menu dropdown-menu-right">\n      <li class="profile">\n        <a ng-href="{{ \'../../admin/:engine/#/users/\' + authentication.name + \'?tab=profile\' | uri }}">\n          My Profile\n        </a>\n      </li>\n\n      <li class="divider"></li>\n\n      <li class="logout">\n        <a href\n           ng-click="logout()">\n          Sign out\n        </a>\n      </li>\n    </ul>\n  </li>\n\n  <li class="divider-vertical"\n      ng-if="authentication.name"\n      ng-cloak></li>\n\n  <li class="app-switch dropdown">\n    <a href\n       class="dropdown-toggle">\n      <span class="glyphicon glyphicon-home"></span>\n      <span class="caret"></span>\n    </a>\n\n    <ul class="dropdown-menu dropdown-menu-right">\n      <li ng-repeat="(appName, app) in apps"\n          ng-if="appName !== currentApp && (!authentication || authentication.canAccess(appName))"\n          ng-class="appName">\n        <a ng-href="{{ \'../../\' + appName + \'/:engine/\' | uri }}">\n          {{ app.label }}\n        </a>\n      </li>\n    </ul>\n  </li>\n</ul>\n'
}), define("camunda-commons-ui/widgets/header/cam-widget-header", ["angular", "text!./cam-widget-header.html"], function (e, t) {
  "use strict";
  function n(t) {
    var n = e.copy(r);
    return t && delete n[t], n
  }

  var r = {admin: {label: "Admin"}, cockpit: {label: "Cockpit"}, tasklist: {label: "Tasklist"}};
  return [function () {
    return {
      transclude: !0,
      template: t,
      scope: {authentication: "=", currentApp: "@", brandName: "@"},
      controller: ["$scope", "AuthenticationService", function (e, t) {
        e.apps = n(e.currentApp), e.logout = t.logout, e.$watch("currentApp", function () {
          e.apps = n(e.currentApp)
        })
      }]
    }
  }]
}), define("text!camunda-commons-ui/widgets/footer/cam-widget-footer.html", [], function () {
  return '<div class="container-fluid">\n  <div class="row">\n    <div class="col-xs-12">\n      Powered by <a href="http://camunda.org">camunda BPM</a> /\n      <span class="version">{{version}}</span>\n    </div>\n  </div>\n</div>\n'
}), define("camunda-commons-ui/widgets/footer/cam-widget-footer", ["text!./cam-widget-footer.html"], function (e) {
  "use strict";
  return [function () {
    return {template: e, scope: {version: "@"}}
  }]
}), define("text!camunda-commons-ui/widgets/loader/cam-widget-loader.html", [], function () {
  return '<div class="loader-state loaded"\n     ng-show="loadingState === \'LOADED\'"\n     ng-transclude></div>\n\n<div class="loader-state loading"\n     ng-if="loadingState === \'LOADING\'">\n  <span class="glyphicon glyphicon-refresh animate-spin"></span>\n  {{ textLoading }}\n</div>\n\n<div class="loader-state empty"\n     ng-if="loadingState === \'EMPTY\'">\n  {{ textEmpty }}\n</div>\n\n<div class="loader-state alert alert-danger"\n     ng-if="loadingState === \'ERROR\'">\n  {{ textError }}\n</div>\n'
}), define("camunda-commons-ui/widgets/loader/cam-widget-loader", ["angular", "text!./cam-widget-loader.html"], function (e, t) {
  "use strict";
  return [function () {
    return {
      transclude: !0,
      template: t,
      scope: {loadingState: "@", textEmpty: "@", textError: "@", textLoading: "@"},
      compile: function (t, n) {
        e.isDefined(n.textLoading) || (n.textLoading = "Loading…"), e.isDefined(n.loadingState) || (n.loadingState = "INITIAL")
      }
    }
  }]
}), define("text!camunda-commons-ui/widgets/debug/cam-widget-debug.html", [], function () {
  return '<div class="debug">\n  <div class="col-xs-2">\n    <button class="btn btn-default btn-round"\n            ng-click="toggleOpen()"\n            tooltip="{{tooltip}}">\n      <span class="glyphicon"\n            ng-class="{\'glyphicon-eye-open\': !open, \'glyphicon-eye-close\': open}"></span>\n    </button>\n  </div>\n  <div class="col-xs-10"\n       ng-show="open">\n    <code>{{ varName }}</code>\n    <pre>{{ debugged | json }}</pre>\n  </div>\n</div>\n'
}), define("camunda-commons-ui/widgets/debug/cam-widget-debug", ["angular", "text!./cam-widget-debug.html"], function (e, t) {
  "use strict";
  return [function () {
    return {
      template: t,
      scope: {debugged: "=", open: "@", tooltip: "@camWidgetDebugTooltip"},
      link: function (e, t, n) {
        e.varName = n.debugged, e.toggleOpen = function () {
          e.open = !e.open
        }
      }
    }
  }]
}), define("text!camunda-commons-ui/widgets/variable/cam-widget-variable.html", [], function () {
  return '<div ng-if="display && isShown(\'type\')"\n     class="type">{{ variable.type }}</div>\n<div ng-if="display && isShown(\'name\')"\n     class="name">{{ variable.name }}</div>\n<div ng-if="display && isShown(\'value\') && isPrimitive()"\n     ng-class="{null: isNull()}"\n     class="value">\n  <span ng-if="isNull()"\n        class="null-symbol">&lt;null&gt;</span>\n  {{ (variable.value === null ? \'\' : variable.value.toString()) }}\n</div>\n<div ng-if="display && isShown(\'value\') && variable.type === \'Object\'"\n     ng-class="{null: isNull()}"\n     class="value">\n  <a ng-click="editVariableValue()">\n    {{ variable.valueInfo.objectTypeName }}\n  </a>\n</div>\n\n\n<div ng-if="!display"\n     class="input-group editing">\n  <div ng-if="isShown(\'type\')"\n       class="input-group-btn type">\n    <select class="form-control"\n            ng-model="variable.type"\n            ng-options="variableType for variableType in variableTypes track by variableType"\n            required>\n    </select>\n  </div><!-- /btn-group -->\n\n  <input ng-if="isShown(\'name\')"\n         type="text"\n         class="form-control name"\n         ng-model="variable.name"\n         placeholder="varName"\n         required />\n\n  <div ng-if="isShown(\'value\') && !isNull()"\n       class="value-wrapper input-group"\n       ng-class="{checkbox: useCheckbox()}">\n    <div ng-if="variable.type !== \'Null\'"\n         class="input-group-btn">\n      <a ng-click="setNull()"\n         class="btn btn-default set-null"\n         tooltip="Set value to &quot;null&quot;">\n        <span class="glyphicon glyphicon-remove"></span>\n      </a>\n    </div>\n\n    <input ng-if="isPrimitive() && !useCheckbox()"\n           type="text"\n           class="form-control value"\n           ng-model="variable.value"\n           placeholder="Value of the variable"\n           cam-variable-validator="{{variable.type}}" />\n\n    <input ng-if="useCheckbox()"\n           type="checkbox"\n           class="value"\n           ng-model="variable.value"\n           placeholder="Value of the variable"\n           cam-variable-validator="{{variable.type}}" />\n\n    <div ng-if="variable.type === \'Object\'"\n         class="value form-control-static">\n      <a ng-click="editVariableValue()">\n        {{ variable.valueInfo.objectTypeName || \'&lt;undefined&gt;\' }}\n      </a>\n    </div>\n  </div>\n\n  <div ng-if="variable.type !== \'Null\' && isShown(\'value\') && isNull()"\n       ng-click="setNonNull()"\n       class="value-wrapper value null-value btn btn-default"\n       tooltip="Re-set to previous or default value">\n    <span class="null-symbol">&lt;null&gt;</span>\n  </div>\n\n  <div ng-if="variable.type === \'Null\'"\n       class="value-wrapper value btn no-click null-value">\n    <span class="null-symbol">&lt;null&gt;</span>\n  </div>\n</div>\n'
}), define("text!camunda-commons-ui/widgets/variable/cam-widget-variable-dialog.html", [], function () {
  return '<!-- # CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html -->\n<div class="modal-header">\n  <h3>Inspect "{{ variable.name }}" variable</h3>\n</div>\n\n<div class="modal-body">\n  <div ng-if="readonly">\n    <p>\n      Object type name: <code>{{ variable.valueInfo.objectTypeName }}</code>\n    </p>\n\n    <p>\n      Serialization Data Format: <code>{{ variable.valueInfo.serializationDataFormat }}</code>\n    </p>\n  </div>\n\n  <div ng-if="!readonly"\n       class="form-group">\n    <label for="object-type-name">Object type name</label>\n    <input type="text"\n           id="object-type-name"\n           class="form-control"\n           ng-model="variable.valueInfo.objectTypeName" />\n  </div>\n\n  <div ng-if="!readonly"\n       class="form-group">\n    <label for="serialization-data-format">Serialization data format</label>\n    <input type="text"\n           id="serialization-data-format"\n           class="form-control"\n           ng-model="variable.valueInfo.serializationDataFormat" />\n  </div>\n\n  <div class="form-group">\n    <label for="serialized-value">Serialized value</label>\n    <textarea ng-model="variable.value"\n              id="serialized-value"\n              rows="10"\n              class="form-control"\n              ng-disabled="readonly"></textarea>\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="$dismiss(\'close\')">\n    Close\n  </button>\n\n  <button class="btn btn-primary"\n          ng-if="!readonly"\n          ng-disabled="!hasChanged(\'serialized\')"\n          ng-click="$close(variable)">\n    Change\n  </button>\n</div>\n<!-- / CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html -->\n'
}), !function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define("camunda-bpm-sdk-js-type-utils", [], e); else {
    var t;
    "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self);
    var n = t;
    n = n.CamSDK || (n.CamSDK = {}), n = n.utils || (n.utils = {}), n.typeUtils = e()
  }
}(function () {
  return function e(t, n, r) {
    function i(o, s) {
      if (!n[o]) {
        if (!t[o]) {
          var u = "function" == typeof require && require;
          if (!s && u)return u(o, !0);
          if (a)return a(o, !0);
          throw new Error("Cannot find module '" + o + "'")
        }
        var l = n[o] = {exports: {}};
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return i(n ? n : e)
        }, l, l.exports, e, t, n, r)
      }
      return n[o].exports
    }

    for (var a = "function" == typeof require && require, o = 0; o < r.length; o++)i(r[o]);
    return i
  }({
    1: [function (e, t) {
      "use strict";
      var n = /^-?[\d]+$/, r = /^(0|(-?(((0|[1-9]\d*)\.\d+)|([1-9]\d*))))([eE][-+]?[0-9]+)?$/, i = /^(true|false)$/, a = /^(\d{2}|\d{4})(?:\-)([0]{1}\d{1}|[1]{1}[0-2]{1})(?:\-)([0-2]{1}\d{1}|[3]{1}[0-1]{1})T(?:\s)?([0-1]{1}\d{1}|[2]{1}[0-3]{1}):([0-5]{1}\d{1}):([0-5]{1}\d{1})?$/, o = function (e, t) {
        switch (t) {
          case"Integer":
          case"Long":
          case"Short":
            return n.test(e);
          case"Float":
          case"Double":
            return r.test(e);
          case"Boolean":
            return i.test(e);
          case"Date":
            return a.test(e)
        }
      }, s = function (e, t) {
        if ("string" == typeof e && (e = e.trim()), "String" === t || "Bytes" === t)return e;
        if (!o(e, t))throw new Error("Value '" + e + "' is not of type " + t);
        switch (t) {
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
      t.exports = {convertToType: s, isType: o}
    }, {}]
  }, {}, [1])(1)
}), define("camunda-commons-ui/widgets/variable/cam-widget-variable", ["angular", "text!./cam-widget-variable.html", "text!./cam-widget-variable-dialog.html", "camunda-bpm-sdk-js-type-utils"], function (e, t, n, r) {
  "use strict";
  function i(e) {
    return e = e || new Date, e.toISOString().slice(0, -5)
  }

  var a = ["Boolean", "Date", "Double", "Integer", "Long", "Null", "Object", "Short", "String"], o = ["$scope", "$http", "variable", "readonly", function (t, n, r, i) {
    t.variable = r, t.readonly = i;
    var a = e.copy(r);
    t.hasChanged = function () {
      return a.valueInfo = a.valueInfo || {}, r.valueInfo = r.valueInfo || {}, a.value !== r.value || a.valueInfo.serializationDataFormat !== r.valueInfo.serializationDataFormat || a.valueInfo.objectTypeName !== r.valueInfo.objectTypeName
    }
  }];
  return ["$modal", function (s) {
    return {
      template: t, scope: {variable: "=camVariable", display: "@?", shown: "=?"}, link: function (t, u) {
        function l() {
          if (t.valid = t.variable.name && t.variable.type ? null === t.variable.value || ["String", "Object", "Null"].indexOf(t.variable.type) > -1 ? !0 : r.isType(t.variable.value, t.variable.type) : !1, t.valid && t.variable.type && null !== t.variable.value && t.isPrimitive(t.variable.type)) {
            var e;
            e = "Boolean" !== t.variable.type ? r.convertToType(t.variable.value, t.variable.type) : t.variable.value ? "false" !== t.variable.value : !1, typeof t.variable.value != typeof e && (t.variable.value = e)
          }
        }

        t.variableTypes = e.copy(a), t.isPrimitive = function (e) {
          return e = e || t.variable.type, e ? ["Boolean", "Date", "Double", "Integer", "Long", "Short", "String"].indexOf(e) >= 0 : !0
        };
        var c = {Boolean: !1, Date: i(), Double: 0, Integer: 0, Long: 0, Null: "", Short: 0, String: "", Object: {}};
        t.useCheckbox = function () {
          return "Boolean" === t.variable.type
        }, t.isShown = function (e) {
          return Array.isArray(t.shown) && t.shown.length ? t.shown.indexOf(e) > -1 : !0
        }, t.shownClasses = function () {
          return Array.isArray(t.shown) && t.shown.length ? t.shown.map(function (e) {
            return "show-" + e
          }).join(" ") : ""
        }, t.$watch("shown", function () {
          u.removeClass("show-type show-name show-value").addClass(t.shownClasses())
        }), t.valid = !0, t.$watch("variable.value", l), t.$watch("variable.name", l), t.$watch("variable.type", l), l();
        var p = t.variable.value;
        t.$watch("variable.type", function (e, n) {
          "Boolean" === e ? null !== t.variable.value && (p = t.variable.value, t.variable.value = "false" === t.variable.value ? !1 : !!t.variable.value) : "Boolean" === n && (t.variable.value = p);
          var r = u[0].classList;
          n && r.remove("var-type-" + n.toLowerCase()), e && r.add("var-type-" + e.toLowerCase())
        }), t.isNull = function () {
          return null === t.variable.value
        }, t.setNonNull = function () {
          t.variable.value = p || c[t.variable.type]
        }, t.setNull = function () {
          p = t.variable.value, t.variable.value = null
        }, t.editVariableValue = function () {
          s.open({
            template: n, controller: o, windowClass: "cam-widget-variable-dialog", resolve: {
              variable: function () {
                return e.copy(t.variable)
              }, readonly: function () {
                return t.display
              }
            }
          }).result.then(function (e) {
            t.variable.value = e.value, t.variable.valueInfo = e.valueInfo
          })
        }
      }
    }
  }]
}), define("text!camunda-commons-ui/widgets/search/cam-widget-search.html", [], function () {
  return '<form class="search-field"\n      ng-submit="createSearch()"\n      ng-class="{\'has-search\': searches.length}">\n  <div class="form-container search-container">\n    <span cam-widget-search-pill\n          ng-repeat="search in searches"\n          extended="search.extended"\n          allow-dates="search.allowDates"\n          enforce-dates="search.enforceDates"\n          valid="search.valid"\n          name="search.name"\n          potential-names="search.potentialNames"\n          type="search.type"\n          operator="search.operator"\n          value="search.value"\n          invalid-text="{{ translations.invalid }}"\n          delete-text="{{ translations.deleteSearch }}"\n          on-change="handleChange($index, field, before, value, $event)"\n          on-delete="deleteSearch($index)"\n    />\n\n    <input class="form-control main-field"\n           type="text"\n           placeholder="{{ translations.inputPlaceholder }}"\n           ng-model="inputQuery"\n           ng-keydown="onKeydown($event)"\n           typeahead="type as type.value for type in dropdownTypes | filter:$viewValue:instantTypeahead"\n           typeahead-on-select="createSearch($item)"\n           instant-typeahead\n    />\n\n  </div>\n</form>\n'
}), define("camunda-commons-ui/widgets/search/cam-widget-search", ["text!./cam-widget-search.html", "angular", "jquery"], function (e, t, n) {
  "use strict";
  function r(e) {
    return e && "string" == typeof e && e.match(i) ? "date" : typeof e
  }

  var i = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/, a = function (e) {
    return e.type.value && (!e.extended || e.name.value) && e.operator.value && e.value.value && ("date" === r(e.value.value) || !e.enforceDates)
  }, o = function (e) {
    if (!e.value)return void(e.value = e.values[0]);
    var t = e.values.map(function (e) {
      return e.key
    }).indexOf(e.value.key);
    e.value = e.values[-1 === t ? 0 : t]
  }, s = function (e) {
    return isNaN(e) || "" === e.trim() ? "true" === e ? !0 : "false" === e ? !1 : "NULL" === e ? null : e : +e
  };
  return ["$timeout", "$location", "search", function (i, u, l) {
    return {
      restrict: "A",
      scope: {
        types: "=camWidgetSearchTypes",
        translations: "=camWidgetSearchTranslations",
        operators: "=camWidgetSearchOperators",
        searches: "=?camWidgetSearchSearches",
        validSearches: "=?camWidgetSearchValidSearches",
        searchId: "@camWidgetSearchId"
      },
      link: function (e, c) {
        var p = e.searchId || "search";
        e.searchTypes = e.types.map(function (e) {
          return e.id
        });
        var d = e.types.reduce(function (e, t) {
          return e || (t["default"] ? t : null)
        }, null), f = function () {
          var n = e.searches.map(function (e) {
            return e.type.value.key
          }).reduce(function (e, t) {
            return -1 === e.indexOf(t) && e.push(t), e
          }, []), r = n.map(function (e) {
            return h(e).groups
          }).filter(function (e) {
            return !!e
          }).reduce(function (e, n) {
            if (e) {
              if (0 === e.length)return t.copy(n);
              for (var r = 0; r < e.length; r++)-1 === n.indexOf(e[r]) && (e.splice(r, 1), r--);
              return 0 === e.length ? null : e
            }
            return null
          }, []);
          return null === r ? [] : 0 === r.length ? e.searchTypes : e.searchTypes.filter(function (e) {
            var t = h(e.key).groups;
            if (!t)return !0;
            for (var n = 0; n < t.length; n++)if (r.indexOf(t[n]) > -1)return !0;
            return !1
          })
        }, h = function (t) {
          return e.types.reduce(function (e, n) {
            return e || (n.id.key === t ? n : null)
          }, null)
        }, m = function (t, n) {
          return t.operators || e.operators[r(s(n))]
        }, g = function () {
          var n = JSON.parse((u.search() || {})[p + "Query"] || "[]"), r = [];
          return t.forEach(n, function (t) {
            var n = h(t.type), i = {
              extended: n.extended,
              type: {
                values: f(), value: f().reduce(function (e, n) {
                  return e || (n.key === t.type ? n : null)
                }, null), tooltip: e.translations.type
              },
              name: {value: t.name, tooltip: e.translations.name},
              operator: {tooltip: e.translations.operator},
              value: {value: t.value, tooltip: e.translations.value},
              allowDates: n.allowDates,
              enforceDates: n.enforceDates,
              potentialNames: n.potentialNames || []
            };
            i.operator.values = m(n, i.value.value), i.operator.value = i.operator.values.reduce(function (e, n) {
              return e || (n.key === t.operator ? n : null)
            }, null), i.valid = a(i), r.push(i)
          }), r
        };
        e.searches = e.searches || [], e.searches = g(), e.validSearchesBuffer = e.searches.reduce(function (e, t) {
          return t.valid && e.push(t), e
        }, []), e.validSearches = t.copy(e.validSearchesBuffer);
        var v = function (t, n) {
          var r = e.searches[t];
          if (!r.valid) {
            if (r.extended && !r.name.value && "name" !== n)return void(r.name.inEdit = !0);
            if ("value" !== n)return void(r.value.inEdit = !0)
          }
          for (var i = 1; i < e.searches.length; i++) {
            var a = (i + t) % e.searches.length;
            if (r = e.searches[a], !r.valid)return void(r.extended && !r.name.value ? r.name.inEdit = !0 : r.value.inEdit = !0)
          }
        };
        e.createSearch = function (t) {
          if (t || e.inputQuery) {
            var n = t ? "" : e.inputQuery;
            t = t && h(t.key) || d;
            var r = m(t, n);
            e.searches.push({
              extended: t.extended,
              type: {values: f(), value: t.id, tooltip: e.translations.type},
              name: {value: "", inEdit: t.extended, tooltip: e.translations.name},
              operator: {value: r[0], values: r, tooltip: e.translations.operator},
              value: {value: n, inEdit: !t.extended && !n, tooltip: e.translations.value},
              allowDates: t.allowDates,
              enforceDates: t.enforceDates,
              potentialNames: t.potentialNames
            });
            var o = e.searches[e.searches.length - 1];
            o.valid = a(o), n ? e.inputQuery = "" : i(function () {
              i(function () {
                e.inputQuery = "", c.find(".search-container > input").blur()
              })
            })
          }
        }, e.deleteSearch = function (t) {
          e.searches.splice(t, 1)
        }, e.handleChange = function (t, n, r, s, u) {
          var l, p = e.searches[t];
          "type" === n ? (l = h(s.key), p.extended = l.extended, p.allowDates = l.allowDates, !p.enforceDates && l.enforceDates && (p.value.value = ""), p.enforceDates = l.enforceDates, p.operator.values = m(l, p.value.value), o(p.operator)) : "value" === n && (t === e.searches.length - 1 && i(function () {
            c.find(".search-container > input").focus()
          }), l = h(p.type.value.key), l.operators || (p.operator.values = m(l, p.value.value), o(p.operator))), p.valid = a(p), u && 13 === u.keyCode && v(t, n)
        }, e.onKeydown = function (t) {
          if (9 !== t.keyCode || e.inputQuery)-1 !== [38, 40, 13].indexOf(t.keyCode) && 0 === c.find(".dropdown-menu").length && i(function () {
            n(t.target).trigger("input")
          }); else {
            t.preventDefault(), t.stopPropagation();
            var r = e.searches[t.shiftKey ? e.searches.length - 1 : 0];
            r && (t.shiftKey ? r.value.inEdit = !0 : r.type.inEdit = !0)
          }
        };
        var y = function (e) {
          var n = [];
          return t.forEach(e, function (e) {
            n.push({type: e.type.value.key, operator: e.operator.value.key, value: e.value.value, name: e.name.value})
          }), n
        };
        e.$watch("searches", function () {
          var n = e.searches;
          t.forEach(n, function (t) {
            t.valid && -1 === e.validSearchesBuffer.indexOf(t) && e.validSearchesBuffer.push(t)
          }), t.forEach(e.validSearchesBuffer, function (t, r) {
            t.valid && -1 !== n.indexOf(t) || e.validSearchesBuffer.splice(r, 1)
          });
          var r = {};
          r[p + "Query"] = JSON.stringify(y(e.validSearchesBuffer)), l.updateSilently(r), w()
        }, !0);
        var b;
        e.$watch("validSearchesBuffer", function () {
          i.cancel(b), b = i(function () {
            e.validSearches = t.copy(e.validSearchesBuffer)
          })
        }, !0);
        var w = function () {
          var t = f();
          e.dropdownTypes = t;
          for (var n = 0; n < e.searches.length; n++)e.searches[n].type.values = t
        };
        e.$watch("types", function () {
          t.forEach(e.searches, function (e) {
            e.potentialNames = h(e.type.value.key).potentialNames || []
          })
        }, !0), e.dropdownTypes = f()
      },
      template: e
    }
  }]
}), !function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define("bpmn-io", [], e); else {
    var t;
    "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.BpmnJS = e()
  }
}(function () {
  var e;
  return function t(e, n, r) {
    function i(o, s) {
      if (!n[o]) {
        if (!e[o]) {
          var u = "function" == typeof require && require;
          if (!s && u)return u(o, !0);
          if (a)return a(o, !0);
          var l = new Error("Cannot find module '" + o + "'");
          throw l.code = "MODULE_NOT_FOUND", l
        }
        var c = n[o] = {exports: {}};
        e[o][0].call(c.exports, function (t) {
          var n = e[o][1][t];
          return i(n ? n : t)
        }, c, c.exports, t, e, n, r)
      }
      return n[o].exports
    }

    for (var a = "function" == typeof require && require, o = 0; o < r.length; o++)i(r[o]);
    return i
  }({
    1: [function (e, t) {
      function n(e) {
        r.call(this, e)
      }

      var r = e(2);
      n.prototype = Object.create(r.prototype), t.exports = n, n.prototype._navigationModules = [e(60), e(58)], n.prototype._modules = [].concat(n.prototype._modules, n.prototype._navigationModules)
    }, {2: 2, 58: 58, 60: 60}],
    2: [function (e, t) {
      function n(e, t) {
        var n = e.get("eventBus");
        t.forEach(function (e) {
          n.on(e.event, e.handler)
        })
      }

      function r(e) {
        var t = /unparsable content <([^>]+)> detected([\s\S]*)$/, n = t.exec(e.message);
        return n && (e.message = "unparsable content <" + n[1] + "> detected; this may indicate an invalid BPMN 2.0 diagram file" + n[2]), e
      }

      function i(e) {
        return e + (l(e) ? "px" : "")
      }

      function a(e) {
        this.options = e = o({}, g, e || {});
        var t = e.container;
        t.get && (t = t.get(0)), u(t) && (t = p(t));
        var n = this.container = c('<div class="bjs-container"></div>');
        t.appendChild(n), o(n.style, {width: i(e.width), height: i(e.height), position: e.position});
        var r = "iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRFiMte9PrwldFwfcZPqtqN0+zEyOe1XLgjvuKncsJAZ70y6fXh3vDT////UrQV////G2zN+AAAABB0Uk5T////////////////////AOAjXRkAAAHDSURBVHjavJZJkoUgDEBJmAX8979tM8u3E6x20VlYJfFFMoL4vBDxATxZcakIOJTWSmxvKWVIkJ8jHvlRv1F2LFrVISCZI+tCtQx+XfewgVTfyY3plPiQEAzI3zWy+kR6NBhFBYeBuscJLOUuA2WVLpCjVIaFzrNQZArxAZKUQm6gsj37L9Cb7dnIBUKxENaaMJQqMpDXvSL+ktxdGRm2IsKgJGGPg7atwUG5CcFUEuSv+CwQqizTrvDTNXdMU2bMiDWZd8d7QIySWVRsb2vBBioxOFt4OinPBapL+neAb5KL5IJ8szOza2/DYoipUCx+CjO0Bpsv0V6mktNZ+k8rlABlWG0FrOpKYVo8DT3dBeLEjUBAj7moDogVii7nSS9QzZnFcOVBp1g2PyBQ3Vr5aIapN91VJy33HTJLC1iX2FY6F8gRdaAeIEfVONgtFCzZTmoLEdOjBDfsIOA6128gw3eu1shAajdZNAORxuQDJN5A5PbEG6gNIu24QJD5iNyRMZIr6bsHbCtCU/OaOaSvgkUyDMdDa1BXGf5HJ1To+/Ym6mCKT02Y+/Sa126ZKyd3jxhzpc1r8zVL6YM1Qy/kR4ABAFJ6iQUnivhAAAAAAElFTkSuQmCC", a = '<a href="http://bpmn.io" target="_blank" class="bjs-powered-by" title="Powered by bpmn.io" style="position: absolute; bottom: 15px; right: 15px; z-index: 100"><img src="data:image/png;base64,' + r + '"></a>';
        n.appendChild(c(a))
      }

      var o = e(159), s = e(163), u = e(156), l = e(153), c = e(173), p = e(175), d = e(176), f = e(35), h = e(14), m = e(9), g = {
        width: "100%",
        height: "100%",
        position: "relative",
        container: "body"
      };
      a.prototype.importXML = function (e, t) {
        var n = this;
        this.moddle = this.createModdle(), this.moddle.fromXML(e, "bpmn:Definitions", function (e, i, a) {
          if (e)return e = r(e), t(e);
          var o = a.warnings;
          n.importDefinitions(i, function (e, n) {
            return e ? t(e) : void t(null, o.concat(n || []))
          })
        })
      }, a.prototype.saveXML = function (e, t) {
        t || (t = e, e = {});
        var n = this.definitions;
        return n ? void this.moddle.toXML(n, e, t) : t(new Error("no definitions loaded"))
      }, a.prototype.createModdle = function () {
        return new h(this.options.moddleExtensions)
      }, a.prototype.saveSVG = function (e, t) {
        t || (t = e, e = {});
        var n = this.get("canvas"), r = n.getDefaultLayer(), i = n._svg.select("defs"), a = r.innerSVG(), o = i && i.outerSVG() || "", s = r.getBBox(), u = '<?xml version="1.0" encoding="utf-8"?>\n<!-- created with bpmn-js / http://bpmn.io -->\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + s.width + '" height="' + s.height + '" viewBox="' + s.x + " " + s.y + " " + s.width + " " + s.height + '" version="1.1">' + o + a + "</svg>";
        t(null, u)
      }, a.prototype.get = function (e) {
        if (!this.diagram)throw new Error("no diagram loaded");
        return this.diagram.get(e)
      }, a.prototype.invoke = function (e) {
        if (!this.diagram)throw new Error("no diagram loaded");
        return this.diagram.invoke(e)
      }, a.prototype.importDefinitions = function (e, t) {
        try {
          this.diagram && this.clear(), this.definitions = e;
          var n = this.diagram = this._createDiagram(this.options);
          this._init(n), m.importBpmnDiagram(n, e, t)
        } catch (r) {
          t(r)
        }
      }, a.prototype._init = function (e) {
        n(e, this.__listeners || [])
      }, a.prototype._createDiagram = function (e) {
        var t = [].concat(e.modules || this.getModules(), e.additionalModules || []);
        return t.unshift({
          bpmnjs: ["value", this],
          moddle: ["value", this.moddle]
        }), e = s(e, "additionalModules"), e = o(e, {canvas: {container: this.container}, modules: t}), new f(e)
      }, a.prototype.getModules = function () {
        return this._modules
      }, a.prototype.clear = function () {
        var e = this.diagram;
        e && e.destroy()
      }, a.prototype.destroy = function () {
        this.clear(), d(this.container)
      }, a.prototype.on = function (e, t) {
        var n = this.diagram, r = this.__listeners = this.__listeners || [];
        r.push({event: e, handler: t}), n && n.get("eventBus").on(e, t)
      }, a.prototype._modules = [e(3), e(55), e(51)], t.exports = a
    }, {
      14: 14,
      153: 153,
      156: 156,
      159: 159,
      163: 163,
      173: 173,
      175: 175,
      176: 176,
      3: 3,
      35: 35,
      51: 51,
      55: 55,
      9: 9
    }],
    3: [function (e, t) {
      t.exports = {__depends__: [e(6), e(11)]}
    }, {11: 11, 6: 6}],
    4: [function (e, t) {
      function n(e, t, n) {
        function h(e, t) {
          G[e] = t
        }

        function m(e) {
          return G[e]
        }

        function g(e) {
          function t(e, t) {
            var n = a({
              fill: "black",
              strokeWidth: 1,
              strokeLinecap: "round",
              strokeDasharray: "none"
            }, t.attrs), r = t.ref || {x: 0, y: 0}, i = t.scale || 1;
            "none" === n.strokeDasharray && (n.strokeDasharray = [1e4, 1]);
            var o = t.element.attr(n).marker(0, 0, 20, 20, r.x, r.y).attr({markerWidth: 20 * i, markerHeight: 20 * i});
            return h(e, o)
          }

          t("sequenceflow-end", {
            element: e.path("M 1 5 L 11 10 L 1 15 Z"),
            ref: {x: 11, y: 10},
            scale: .5
          }), t("messageflow-start", {
            element: e.circle(6, 6, 5),
            attrs: {fill: "white", stroke: "black"},
            ref: {x: 6, y: 6}
          }), t("messageflow-end", {
            element: e.path("M 1 5 L 11 10 L 1 15 Z"),
            attrs: {fill: "white", stroke: "black"},
            ref: {x: 11, y: 10}
          }), t("data-association-end", {
            element: e.path("M 1 5 L 11 10 L 1 15"),
            attrs: {fill: "white", stroke: "black"},
            ref: {x: 11, y: 10},
            scale: .5
          }), t("conditional-flow-marker", {
            element: e.path("M 0 10 L 8 6 L 16 10 L 8 14 Z"),
            attrs: {fill: "white", stroke: "black"},
            ref: {x: -1, y: 10},
            scale: .5
          }), t("conditional-default-flow-marker", {
            element: e.path("M 1 4 L 5 16"),
            attrs: {stroke: "black"},
            ref: {x: -5, y: 10},
            scale: .5
          })
        }

        function v(e, n, i) {
          return r(n) || (i = n, n = []), t.style(n || [], a(i, e || {}))
        }

        function y(e, t, n, r, a) {
          i(r) && (a = r, r = 0), r = r || 0, a = v(a, {stroke: "black", strokeWidth: 2, fill: "white"});
          var o = t / 2, s = n / 2;
          return e.circle(o, s, Math.round((t + n) / 4 - r)).attr(a)
        }

        function b(e, t, n, r, a, o) {
          return i(a) && (o = a, a = 0), a = a || 0, o = v(o, {
            stroke: "black",
            strokeWidth: 2,
            fill: "white"
          }), e.rect(a, a, t - 2 * a, n - 2 * a, r).attr(o)
        }

        function w(e, t, n, r) {
          var i = t / 2, a = n / 2, o = [i, 0, t, a, i, n, 0, a];
          return r = v(r, {stroke: "black", strokeWidth: 2, fill: "white"}), e.polygon(o).attr(r)
        }

        function x(e, t, n) {
          return n = v(n, ["no-fill"], {stroke: "black", strokeWidth: 2, fill: "none"}), f(t, n).appendTo(e)
        }

        function E(e, t, n) {
          return n = v(n, ["no-fill"], {strokeWidth: 2, stroke: "black"}), e.path(t).attr(n)
        }

        function _(e) {
          return function (t, n) {
            return Y[e](t, n)
          }
        }

        function A(e) {
          return Y[e]
        }

        function S(e, t) {
          var n = F(e), r = B(n);
          return $(n, "bpmn:MessageEventDefinition") ? A("bpmn:MessageEventDefinition")(t, e, r) : $(n, "bpmn:TimerEventDefinition") ? A("bpmn:TimerEventDefinition")(t, e, r) : $(n, "bpmn:ConditionalEventDefinition") ? A("bpmn:ConditionalEventDefinition")(t, e) : $(n, "bpmn:SignalEventDefinition") ? A("bpmn:SignalEventDefinition")(t, e, r) : $(n, "bpmn:CancelEventDefinition") && $(n, "bpmn:TerminateEventDefinition", {parallelMultiple: !1}) ? A("bpmn:MultipleEventDefinition")(t, e, r) : $(n, "bpmn:CancelEventDefinition") && $(n, "bpmn:TerminateEventDefinition", {parallelMultiple: !0}) ? A("bpmn:ParallelMultipleEventDefinition")(t, e, r) : $(n, "bpmn:EscalationEventDefinition") ? A("bpmn:EscalationEventDefinition")(t, e, r) : $(n, "bpmn:LinkEventDefinition") ? A("bpmn:LinkEventDefinition")(t, e, r) : $(n, "bpmn:ErrorEventDefinition") ? A("bpmn:ErrorEventDefinition")(t, e, r) : $(n, "bpmn:CancelEventDefinition") ? A("bpmn:CancelEventDefinition")(t, e, r) : $(n, "bpmn:CompensateEventDefinition") ? A("bpmn:CompensateEventDefinition")(t, e, r) : $(n, "bpmn:TerminateEventDefinition") ? A("bpmn:TerminateEventDefinition")(t, e, r) : null
        }

        function C(e, t, n) {
          return z.createText(e, t || "", n).addClass("djs-label")
        }

        function T(e, t, n) {
          var r = F(t);
          return C(e, r.name, {box: t, align: n, padding: 5})
        }

        function D(e, t, n) {
          var r = F(t);
          return r.name || (t.hidden = !0), C(e, r.name, {box: t, align: n, style: {fontSize: "11px"}})
        }

        function k(e, t, n) {
          var r = C(e, t, {box: {height: 30, width: n.height}, align: "center-middle"}), i = -1 * n.height;
          r.transform("rotate(270) translate(" + i + ",0)")
        }

        function I(e) {
          for (var t = e.waypoints, n = "m  " + t[0].x + "," + t[0].y, r = 1; r < t.length; r++)n += "L" + t[r].x + "," + t[r].y + " ";
          return n
        }

        function M(e, t, n) {
          var r, i = F(t), a = u(n, "SubProcessMarker");
          return r = a ? {seq: -21, parallel: -22, compensation: -42, loop: -18, adhoc: 10} : {
            seq: -3,
            parallel: -6,
            compensation: -27,
            loop: 0,
            adhoc: 10
          }, o(n, function (n) {
            A(n)(e, t, r)
          }), "bpmn:AdHocSubProcess" === i.$type && A("AdhocMarker")(e, t, r), i.loopCharacteristics && void 0 === i.loopCharacteristics.isSequential ? void A("LoopMarker")(e, t, r) : (i.loopCharacteristics && void 0 !== i.loopCharacteristics.isSequential && !i.loopCharacteristics.isSequential && A("ParallelMarker")(e, t, r), i.loopCharacteristics && i.loopCharacteristics.isSequential && A("SequentialMarker")(e, t, r), void(i.isForCompensation && A("CompensationMarker")(e, t, r)))
        }

        function R(e, t) {
          var n = t.type, r = Y[n];
          return r ? r(e, t) : c.prototype.drawShape.apply(this, [e, t])
        }

        function P(e, t) {
          var n = t.type, r = Y[n];
          return r ? r(e, t) : c.prototype.drawConnection.apply(this, [e, t])
        }

        function N(e, t) {
          var r = (t.height - 16) / t.height, i = n.getScaledPath("DATA_OBJECT_COLLECTION_PATH", {
            xScaleFactor: 1,
            yScaleFactor: 1,
            containerWidth: t.width,
            containerHeight: t.height,
            position: {mx: .451, my: r}
          });
          E(e, i, {strokeWidth: 2})
        }

        function O(e) {
          return e.isCollection || e.elementObjectRef && e.elementObjectRef.isCollection
        }

        function L(e) {
          return e.businessObject.di
        }

        function F(e) {
          return e.businessObject
        }

        function $(e, t, n) {
          function r(e, t) {
            return s(t, function (t, n) {
              return e[n] == t
            })
          }

          return l(e.eventDefinitions, function (i) {
            return i.$type === t && r(e, n)
          })
        }

        function B(e) {
          return "bpmn:IntermediateThrowEvent" === e.$type || "bpmn:EndEvent" === e.$type
        }

        c.call(this, t);
        var U = 10, V = 3, j = {fontFamily: "Arial, sans-serif", fontSize: "12px"}, z = new p({
          style: j,
          size: {width: 100}
        }), G = {}, Y = {
          "bpmn:Event": function (e, t, n) {
            return y(e, t.width, t.height, n)
          },
          "bpmn:StartEvent": function (e, t) {
            var n = {}, r = F(t);
            r.isInterrupting || (n = {strokeDasharray: "6", strokeLinecap: "round"});
            var i = A("bpmn:Event")(e, t, n);
            return S(t, e), i
          },
          "bpmn:MessageEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_MESSAGE", {
              xScaleFactor: .9,
              yScaleFactor: .9,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .235, my: .315}
            }), a = r ? "black" : "white", o = r ? "white" : "black", s = E(e, i, {strokeWidth: 1, fill: a, stroke: o});
            return s
          },
          "bpmn:TimerEventDefinition": function (e, t) {
            var r = y(e, t.width, t.height, .2 * t.height, {strokeWidth: 2}), i = n.getScaledPath("EVENT_TIMER_WH", {
              xScaleFactor: .75,
              yScaleFactor: .75,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .5, my: .5}
            });
            E(e, i, {strokeWidth: 2, strokeLinecap: "square"});
            for (var a = 0; 12 > a; a++) {
              var o = n.getScaledPath("EVENT_TIMER_LINE", {
                xScaleFactor: .75,
                yScaleFactor: .75,
                containerWidth: t.width,
                containerHeight: t.height,
                position: {mx: .5, my: .5}
              }), s = t.width / 2, u = t.height / 2;
              E(e, o, {
                strokeWidth: 1,
                strokeLinecap: "square",
                transform: "rotate(" + 30 * a + "," + u + "," + s + ")"
              })
            }
            return r
          },
          "bpmn:EscalationEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_ESCALATION", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .5, my: .555}
            }), a = r ? "black" : "none";
            return E(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:ConditionalEventDefinition": function (e, t) {
            var r = n.getScaledPath("EVENT_CONDITIONAL", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .5, my: .222}
            });
            return E(e, r, {strokeWidth: 1})
          },
          "bpmn:LinkEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_LINK", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .57, my: .263}
            }), a = r ? "black" : "none";
            return E(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:ErrorEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_ERROR", {
              xScaleFactor: 1.1,
              yScaleFactor: 1.1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .2, my: .722}
            }), a = r ? "black" : "none";
            return E(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:CancelEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_CANCEL_45", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .638, my: -.055}
            }), a = r ? "black" : "none";
            return E(e, i, {strokeWidth: 1, fill: a}).transform("rotate(45)")
          },
          "bpmn:CompensateEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_COMPENSATION", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .201, my: .472}
            }), a = r ? "black" : "none";
            return E(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:SignalEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_SIGNAL", {
              xScaleFactor: .9,
              yScaleFactor: .9,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .5, my: .2}
            }), a = r ? "black" : "none";
            return E(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:MultipleEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_MULTIPLE", {
              xScaleFactor: 1.1,
              yScaleFactor: 1.1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .222, my: .36}
            }), a = r ? "black" : "none";
            return E(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:ParallelMultipleEventDefinition": function (e, t) {
            var r = n.getScaledPath("EVENT_PARALLEL_MULTIPLE", {
              xScaleFactor: 1.2,
              yScaleFactor: 1.2,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .458, my: .194}
            });
            return E(e, r, {strokeWidth: 1})
          },
          "bpmn:EndEvent": function (e, t) {
            var n = A("bpmn:Event")(e, t, {strokeWidth: 4});
            return S(t, e, !0), n
          },
          "bpmn:TerminateEventDefinition": function (e, t) {
            var n = y(e, t.width, t.height, 8, {strokeWidth: 4, fill: "black"});
            return n
          },
          "bpmn:IntermediateEvent": function (e, t) {
            var n = A("bpmn:Event")(e, t, {strokeWidth: 1});
            return y(e, t.width, t.height, V, {strokeWidth: 1, fill: "none"}), S(t, e), n
          },
          "bpmn:IntermediateCatchEvent": _("bpmn:IntermediateEvent"),
          "bpmn:IntermediateThrowEvent": _("bpmn:IntermediateEvent"),
          "bpmn:Activity": function (e, t, n) {
            return b(e, t.width, t.height, U, n)
          },
          "bpmn:Task": function (e, t) {
            var n = A("bpmn:Activity")(e, t);
            return T(e, t, "center-middle"), M(e, t), n
          },
          "bpmn:ServiceTask": function (e, t) {
            var r = A("bpmn:Task")(e, t), i = n.getScaledPath("TASK_TYPE_SERVICE", {abspos: {x: 12, y: 18}});
            E(e, i, {strokeWidth: 1, fill: "none"});
            var a = n.getScaledPath("TASK_TYPE_SERVICE_FILL", {abspos: {x: 17.2, y: 18}});
            E(e, a, {strokeWidth: 0, stroke: "none", fill: "white"});
            var o = n.getScaledPath("TASK_TYPE_SERVICE", {abspos: {x: 17, y: 22}});
            return E(e, o, {strokeWidth: 1, fill: "white"}), r
          },
          "bpmn:UserTask": function (e, t) {
            var r = A("bpmn:Task")(e, t), i = 15, a = 12, o = n.getScaledPath("TASK_TYPE_USER_1", {
              abspos: {
                x: i,
                y: a
              }
            });
            E(e, o, {strokeWidth: .5, fill: "none"});
            var s = n.getScaledPath("TASK_TYPE_USER_2", {abspos: {x: i, y: a}});
            E(e, s, {strokeWidth: .5, fill: "none"});
            var u = n.getScaledPath("TASK_TYPE_USER_3", {abspos: {x: i, y: a}});
            return E(e, u, {strokeWidth: .5, fill: "black"}), r
          },
          "bpmn:ManualTask": function (e, t) {
            var r = A("bpmn:Task")(e, t), i = n.getScaledPath("TASK_TYPE_MANUAL", {abspos: {x: 17, y: 15}});
            return E(e, i, {strokeWidth: .25, fill: "white", stroke: "black"}), r
          },
          "bpmn:SendTask": function (e, t) {
            var r = A("bpmn:Task")(e, t), i = n.getScaledPath("TASK_TYPE_SEND", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: 21,
              containerHeight: 14,
              position: {mx: .285, my: .357}
            });
            return E(e, i, {strokeWidth: 1, fill: "black", stroke: "white"}), r
          },
          "bpmn:ReceiveTask": function (e, t) {
            var r, i = F(t), a = A("bpmn:Task")(e, t);
            return i.instantiate ? (y(e, 28, 28, 4.4, {strokeWidth: 1}), r = n.getScaledPath("TASK_TYPE_INSTANTIATING_SEND", {
              abspos: {
                x: 7.77,
                y: 9.52
              }
            })) : r = n.getScaledPath("TASK_TYPE_SEND", {
              xScaleFactor: .9,
              yScaleFactor: .9,
              containerWidth: 21,
              containerHeight: 14,
              position: {mx: .3, my: .4}
            }), E(e, r, {strokeWidth: 1}), a
          },
          "bpmn:ScriptTask": function (e, t) {
            var r = A("bpmn:Task")(e, t), i = n.getScaledPath("TASK_TYPE_SCRIPT", {abspos: {x: 15, y: 20}});
            return E(e, i, {strokeWidth: 1}), r
          },
          "bpmn:BusinessRuleTask": function (e, t) {
            var r = A("bpmn:Task")(e, t), i = n.getScaledPath("TASK_TYPE_BUSINESS_RULE_HEADER", {
              abspos: {
                x: 8,
                y: 8
              }
            }), a = E(e, i);
            a.attr({strokeWidth: 1, fill: "AAA"});
            var o = n.getScaledPath("TASK_TYPE_BUSINESS_RULE_MAIN", {abspos: {x: 8, y: 8}}), s = E(e, o);
            return s.attr({strokeWidth: 1}), r
          },
          "bpmn:SubProcess": function (e, t, n) {
            var r = A("bpmn:Activity")(e, t, n), i = F(t), a = d.isExpanded(i), o = !!i.triggeredByEvent;
            return o && r.attr({strokeDasharray: "1,2"}), T(e, t, a ? "center-top" : "center-middle"), a ? M(e, t) : M(e, t, ["SubProcessMarker"]), r
          },
          "bpmn:AdHocSubProcess": function (e, t) {
            return A("bpmn:SubProcess")(e, t)
          },
          "bpmn:Transaction": function (e, n) {
            var r = A("bpmn:SubProcess")(e, n), i = t.style(["no-fill", "no-events"]);
            return b(e, n.width, n.height, U - 2, V, i), r
          },
          "bpmn:CallActivity": function (e, t) {
            return A("bpmn:SubProcess")(e, t, {strokeWidth: 5})
          },
          "bpmn:Participant": function (e, t) {
            var n = A("bpmn:Lane")(e, t), r = d.isExpandedPool(F(t));
            if (r) {
              x(e, [{x: 30, y: 0}, {x: 30, y: t.height}]);
              var i = F(t).name;
              k(e, i, t)
            } else {
              var a = F(t).name;
              C(e, a, {box: t, align: "center-middle"})
            }
            var o = !!F(t).participantMultiplicity;
            return o && A("ParticipantMultiplicityMarker")(e, t), n
          },
          "bpmn:Lane": function (e, t) {
            var n = b(e, t.width, t.height, 0, {fill: "none"}), r = F(t);
            if ("bpmn:Lane" === r.$type) {
              var i = r.name;
              k(e, i, t)
            }
            return n
          },
          "bpmn:InclusiveGateway": function (e, t) {
            var n = w(e, t.width, t.height);
            return y(e, t.width, t.height, .24 * t.height, {strokeWidth: 2.5, fill: "none"}), n
          },
          "bpmn:ExclusiveGateway": function (e, t) {
            var r = w(e, t.width, t.height), i = n.getScaledPath("GATEWAY_EXCLUSIVE", {
              xScaleFactor: .4,
              yScaleFactor: .4,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .32, my: .3}
            });
            return L(t).isMarkerVisible && E(e, i, {strokeWidth: 1, fill: "black"}), r
          },
          "bpmn:ComplexGateway": function (e, t) {
            var r = w(e, t.width, t.height), i = n.getScaledPath("GATEWAY_COMPLEX", {
              xScaleFactor: .5,
              yScaleFactor: .5,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .46, my: .26}
            });
            return E(e, i, {strokeWidth: 1, fill: "black"}), r
          },
          "bpmn:ParallelGateway": function (e, t) {
            var r = w(e, t.width, t.height), i = n.getScaledPath("GATEWAY_PARALLEL", {
              xScaleFactor: .6,
              yScaleFactor: .6,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .46, my: .2}
            });
            return E(e, i, {strokeWidth: 1, fill: "black"}), r
          },
          "bpmn:EventBasedGateway": function (e, t) {
            function r() {
              var r = n.getScaledPath("GATEWAY_EVENT_BASED", {
                xScaleFactor: .18,
                yScaleFactor: .18,
                containerWidth: t.width,
                containerHeight: t.height,
                position: {mx: .36, my: .44}
              });
              E(e, r, {strokeWidth: 2, fill: "none"})
            }

            var i = F(t), a = w(e, t.width, t.height);
            y(e, t.width, t.height, .2 * t.height, {strokeWidth: 1, fill: "none"});
            var o = i.eventGatewayType, s = !!i.instantiate;
            if ("Parallel" === o) {
              var u = n.getScaledPath("GATEWAY_PARALLEL", {
                xScaleFactor: .4,
                yScaleFactor: .4,
                containerWidth: t.width,
                containerHeight: t.height,
                position: {mx: .474, my: .296}
              }), l = E(e, u);
              l.attr({strokeWidth: 1, fill: "none"})
            } else if ("Exclusive" === o) {
              if (!s) {
                var c = y(e, t.width, t.height, .26 * t.height);
                c.attr({strokeWidth: 1, fill: "none"})
              }
              r()
            }
            return a
          },
          "bpmn:Gateway": function (e, t) {
            return w(e, t.width, t.height)
          },
          "bpmn:SequenceFlow": function (e, t) {
            var n = I(t), r = E(e, n, {markerEnd: m("sequenceflow-end")}), i = F(t), a = t.source.businessObject;
            return i.conditionExpression && a.$instanceOf("bpmn:Task") && r.attr({markerStart: m("conditional-flow-marker")}), a["default"] && a.$instanceOf("bpmn:Gateway") && a["default"] === i && r.attr({markerStart: m("conditional-default-flow-marker")}), r
          },
          "bpmn:Association": function (e, t, n) {
            return n = a({strokeDasharray: "1,6", strokeLinecap: "round"}, n || {}), x(e, t.waypoints, n)
          },
          "bpmn:DataInputAssociation": function (e, t) {
            return A("bpmn:Association")(e, t, {markerEnd: m("data-association-end")})
          },
          "bpmn:DataOutputAssociation": function (e, t) {
            return A("bpmn:Association")(e, t, {markerEnd: m("data-association-end")})
          },
          "bpmn:MessageFlow": function (e, t) {
            var r = F(t), i = L(t), a = I(t), o = E(e, a, {
              markerEnd: m("messageflow-end"),
              markerStart: m("messageflow-start"),
              strokeDasharray: "10",
              strokeLinecap: "round",
              strokeWidth: 1
            });
            if (r.messageRef) {
              var s = o.getPointAtLength(o.getTotalLength() / 2), u = n.getScaledPath("MESSAGE_FLOW_MARKER", {
                abspos: {
                  x: s.x,
                  y: s.y
                }
              }), l = {strokeWidth: 1};
              "initiating" === i.messageVisibleKind ? (l.fill = "white", l.stroke = "black") : (l.fill = "#888", l.stroke = "white"), E(e, u, l)
            }
            return o
          },
          "bpmn:DataObject": function (e, t) {
            var r = n.getScaledPath("DATA_OBJECT_PATH", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .474, my: .296}
            }), i = E(e, r, {fill: "white"}), a = F(t);
            return O(a) && N(e, t), i
          },
          "bpmn:DataObjectReference": _("bpmn:DataObject"),
          "bpmn:DataInput": function (e, t) {
            var r = n.getRawPath("DATA_ARROW"), i = A("bpmn:DataObject")(e, t);
            return E(e, r, {strokeWidth: 1}), i
          },
          "bpmn:DataOutput": function (e, t) {
            var r = n.getRawPath("DATA_ARROW"), i = A("bpmn:DataObject")(e, t);
            return E(e, r, {strokeWidth: 1, fill: "black"}), i
          },
          "bpmn:DataStoreReference": function (e, t) {
            var r = n.getScaledPath("DATA_STORE", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: 0, my: .133}
            }), i = E(e, r, {strokeWidth: 2, fill: "white"});
            return i
          },
          "bpmn:BoundaryEvent": function (e, t) {
            var n = F(t), r = n.cancelActivity, i = {strokeLinecap: "round", strokeWidth: 1};
            r || (i.strokeDasharray = "6");
            var a = A("bpmn:Event")(e, t, i);
            return y(e, t.width, t.height, V, i), S(t, e), a
          },
          "bpmn:Group": function (e, t) {
            return b(e, t.width, t.height, U, {
              strokeWidth: 1,
              strokeDasharray: "8,3,1,3",
              fill: "none",
              pointerEvents: "none"
            })
          },
          label: function (e, t) {
            return D(e, t, "")
          },
          "bpmn:TextAnnotation": function (e, t) {
            var r = {
              fill: "none",
              stroke: "none"
            }, i = b(e, t.width, t.height, 0, 0, r), a = n.getScaledPath("TEXT_ANNOTATION", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: 0, my: 0}
            });
            E(e, a);
            var o = F(t).text || "";
            return C(e, o, {box: t, align: "left-middle", padding: 5}), i
          },
          ParticipantMultiplicityMarker: function (e, t) {
            var r = n.getScaledPath("MARKER_PARALLEL", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: t.width / 2 / t.width, my: (t.height - 15) / t.height}
            });
            E(e, r)
          },
          SubProcessMarker: function (e, t) {
            var r = b(e, 14, 14, 0, {strokeWidth: 1});
            r.transform("translate(" + (t.width / 2 - 7.5) + "," + (t.height - 20) + ")");
            var i = n.getScaledPath("MARKER_SUB_PROCESS", {
              xScaleFactor: 1.5,
              yScaleFactor: 1.5,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 - 7.5) / t.width, my: (t.height - 20) / t.height}
            });
            E(e, i)
          },
          ParallelMarker: function (e, t, r) {
            var i = n.getScaledPath("MARKER_PARALLEL", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 + r.parallel) / t.width, my: (t.height - 20) / t.height}
            });
            E(e, i)
          },
          SequentialMarker: function (e, t, r) {
            var i = n.getScaledPath("MARKER_SEQUENTIAL", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 + r.seq) / t.width, my: (t.height - 19) / t.height}
            });
            E(e, i)
          },
          CompensationMarker: function (e, t, r) {
            var i = n.getScaledPath("MARKER_COMPENSATION", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 + r.compensation) / t.width, my: (t.height - 13) / t.height}
            });
            E(e, i, {strokeWidth: 1})
          },
          LoopMarker: function (e, t, r) {
            var i = n.getScaledPath("MARKER_LOOP", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 + r.loop) / t.width, my: (t.height - 7) / t.height}
            });
            E(e, i, {strokeWidth: 1, fill: "none", strokeLinecap: "round", strokeMiterlimit: .5})
          },
          AdhocMarker: function (e, t, r) {
            var i = n.getScaledPath("MARKER_ADHOC", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 + r.adhoc) / t.width, my: (t.height - 15) / t.height}
            });
            E(e, i, {strokeWidth: 1, fill: "black"})
          }
        };
        e.on("canvas.init", function (e) {
          g(e.svg)
        }), this.drawShape = R, this.drawConnection = P
      }

      var r = e(150), i = e(154), a = e(159), o = e(80), s = e(77), u = e(82), l = e(85), c = e(43), p = e(68), d = e(12), f = c.createLine;
      n.prototype = Object.create(c.prototype), n.$inject = ["eventBus", "styles", "pathMap"], t.exports = n
    }, {12: 12, 150: 150, 154: 154, 159: 159, 43: 43, 68: 68, 77: 77, 80: 80, 82: 82, 85: 85}],
    5: [function (e, t) {
      function n() {
        this.pathMap = {
          EVENT_MESSAGE: {
            d: "m {mx},{my} l 0,{e.y1} l {e.x1},0 l 0,-{e.y1} z l {e.x0},{e.y0} l {e.x0},-{e.y0}",
            height: 36,
            width: 36,
            heightElements: [6, 14],
            widthElements: [10.5, 21]
          },
          EVENT_SIGNAL: {
            d: "M {mx},{my} l {e.x0},{e.y0} l -{e.x1},0 Z",
            height: 36,
            width: 36,
            heightElements: [18],
            widthElements: [10, 20]
          },
          EVENT_ESCALATION: {
            d: "m {mx},{my} c -{e.x1},{e.y0} -{e.x3},{e.y1} -{e.x5},{e.y4} {e.x1},-{e.y3} {e.x3},-{e.y5} {e.x5},-{e.y6} {e.x0},{e.y3} {e.x2},{e.y5} {e.x4},{e.y6} -{e.x0},-{e.y0} -{e.x2},-{e.y1} -{e.x4},-{e.y4} z",
            height: 36,
            width: 36,
            heightElements: [2.382, 4.764, 4.926, 6.589333, 7.146, 13.178667, 19.768],
            widthElements: [2.463, 2.808, 4.926, 5.616, 7.389, 8.424]
          },
          EVENT_CONDITIONAL: {
            d: "M {e.x0},{e.y0} l {e.x1},0 l 0,{e.y2} l -{e.x1},0 Z M {e.x2},{e.y3} l {e.x0},0 M {e.x2},{e.y4} l {e.x0},0 M {e.x2},{e.y5} l {e.x0},0 M {e.x2},{e.y6} l {e.x0},0 M {e.x2},{e.y7} l {e.x0},0 M {e.x2},{e.y8} l {e.x0},0 ",
            height: 36,
            width: 36,
            heightElements: [8.5, 14.5, 18, 11.5, 14.5, 17.5, 20.5, 23.5, 26.5],
            widthElements: [10.5, 14.5, 12.5]
          },
          EVENT_LINK: {
            d: "m {mx},{my} 0,{e.y0} -{e.x1},0 0,{e.y1} {e.x1},0 0,{e.y0} {e.x0},-{e.y2} -{e.x0},-{e.y2} z",
            height: 36,
            width: 36,
            heightElements: [4.4375, 6.75, 7.8125],
            widthElements: [9.84375, 13.5]
          },
          EVENT_ERROR: {
            d: "m {mx},{my} {e.x0},-{e.y0} {e.x1},-{e.y1} {e.x2},{e.y2} {e.x3},-{e.y3} -{e.x4},{e.y4} -{e.x5},-{e.y5} z",
            height: 36,
            width: 36,
            heightElements: [.023, 8.737, 8.151, 16.564, 10.591, 8.714],
            widthElements: [.085, 6.672, 6.97, 4.273, 5.337, 6.636]
          },
          EVENT_CANCEL_45: {
            d: "m {mx},{my} -{e.x1},0 0,{e.x0} {e.x1},0 0,{e.y1} {e.x0},0 0,-{e.y1} {e.x1},0 0,-{e.y0} -{e.x1},0 0,-{e.y1} -{e.x0},0 z",
            height: 36,
            width: 36,
            heightElements: [4.75, 8.5],
            widthElements: [4.75, 8.5]
          },
          EVENT_COMPENSATION: {
            d: "m {mx},{my} {e.x0},-{e.y0} 0,{e.y1} z m {e.x0},0 {e.x0},-{e.y0} 0,{e.y1} z",
            height: 36,
            width: 36,
            heightElements: [5, 10],
            widthElements: [10]
          },
          EVENT_TIMER_WH: {
            d: "M {mx},{my} l {e.x0},-{e.y0} m -{e.x0},{e.y0} l {e.x1},{e.y1} ",
            height: 36,
            width: 36,
            heightElements: [10, 2],
            widthElements: [3, 7]
          },
          EVENT_TIMER_LINE: {
            d: "M {mx},{my} m {e.x0},{e.y0} l -{e.x1},{e.y1} ",
            height: 36,
            width: 36,
            heightElements: [10, 3],
            widthElements: [0, 0]
          },
          EVENT_MULTIPLE: {
            d: "m {mx},{my} {e.x1},-{e.y0} {e.x1},{e.y0} -{e.x0},{e.y1} -{e.x2},0 z",
            height: 36,
            width: 36,
            heightElements: [6.28099, 12.56199],
            widthElements: [3.1405, 9.42149, 12.56198]
          },
          EVENT_PARALLEL_MULTIPLE: {
            d: "m {mx},{my} {e.x0},0 0,{e.y1} {e.x1},0 0,{e.y0} -{e.x1},0 0,{e.y1} -{e.x0},0 0,-{e.y1} -{e.x1},0 0,-{e.y0} {e.x1},0 z",
            height: 36,
            width: 36,
            heightElements: [2.56228, 7.68683],
            widthElements: [2.56228, 7.68683]
          },
          GATEWAY_EXCLUSIVE: {
            d: "m {mx},{my} {e.x0},{e.y0} {e.x1},{e.y0} {e.x2},0 {e.x4},{e.y2} {e.x4},{e.y1} {e.x2},0 {e.x1},{e.y3} {e.x0},{e.y3} {e.x3},0 {e.x5},{e.y1} {e.x5},{e.y2} {e.x3},0 z",
            height: 17.5,
            width: 17.5,
            heightElements: [8.5, 6.5312, -6.5312, -8.5],
            widthElements: [6.5, -6.5, 3, -3, 5, -5]
          },
          GATEWAY_PARALLEL: {
            d: "m {mx},{my} 0,{e.y1} -{e.x1},0 0,{e.y0} {e.x1},0 0,{e.y1} {e.x0},0 0,-{e.y1} {e.x1},0 0,-{e.y0} -{e.x1},0 0,-{e.y1} -{e.x0},0 z",
            height: 30,
            width: 30,
            heightElements: [5, 12.5],
            widthElements: [5, 12.5]
          },
          GATEWAY_EVENT_BASED: {
            d: "m {mx},{my} {e.x0},{e.y0} {e.x0},{e.y1} {e.x1},{e.y2} {e.x2},0 z",
            height: 11,
            width: 11,
            heightElements: [-6, 6, 12, -12],
            widthElements: [9, -3, -12]
          },
          GATEWAY_COMPLEX: {
            d: "m {mx},{my} 0,{e.y0} -{e.x0},-{e.y1} -{e.x1},{e.y2} {e.x0},{e.y1} -{e.x2},0 0,{e.y3} {e.x2},0  -{e.x0},{e.y1} l {e.x1},{e.y2} {e.x0},-{e.y1} 0,{e.y0} {e.x3},0 0,-{e.y0} {e.x0},{e.y1} {e.x1},-{e.y2} -{e.x0},-{e.y1} {e.x2},0 0,-{e.y3} -{e.x2},0 {e.x0},-{e.y1} -{e.x1},-{e.y2} -{e.x0},{e.y1} 0,-{e.y0} -{e.x3},0 z",
            height: 17.125,
            width: 17.125,
            heightElements: [4.875, 3.4375, 2.125, 3],
            widthElements: [3.4375, 2.125, 4.875, 3]
          },
          DATA_OBJECT_PATH: {
            d: "m 0,0 {e.x1},0 {e.x0},{e.y0} 0,{e.y1} -{e.x2},0 0,-{e.y2} {e.x1},0 0,{e.y0} {e.x0},0",
            height: 61,
            width: 51,
            heightElements: [10, 50, 60],
            widthElements: [10, 40, 50, 60]
          },
          DATA_OBJECT_COLLECTION_PATH: {
            d: "m {mx}, {my} m  0 15  l 0 -15 m  4 15  l 0 -15 m  4 15  l 0 -15 ",
            height: 61,
            width: 51,
            heightElements: [12],
            widthElements: [1, 6, 12, 15]
          },
          DATA_ARROW: {
            d: "m 5,9 9,0 0,-3 5,5 -5,5 0,-3 -9,0 z",
            height: 61,
            width: 51,
            heightElements: [],
            widthElements: []
          },
          DATA_STORE: {
            d: "m  {mx},{my} l  0,{e.y2} c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0 l  0,-{e.y2} c -{e.x0},-{e.y1} -{e.x1},-{e.y1} -{e.x2},0c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0 m  -{e.x2},{e.y0}c  {e.x0},{e.y1} {e.x1},{e.y1} {e.x2},0m  -{e.x2},{e.y0}c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0",
            height: 61,
            width: 61,
            heightElements: [7, 10, 45],
            widthElements: [2, 58, 60]
          },
          TEXT_ANNOTATION: {
            d: "m {mx}, {my} m 10,0 l -10,0 l 0,{e.y0} l 10,0",
            height: 30,
            width: 10,
            heightElements: [30],
            widthElements: [10]
          },
          MARKER_SUB_PROCESS: {
            d: "m{mx},{my} m 7,2 l 0,10 m -5,-5 l 10,0",
            height: 10,
            width: 10,
            heightElements: [],
            widthElements: []
          },
          MARKER_PARALLEL: {
            d: "m{mx},{my} m 3,2 l 0,10 m 3,-10 l 0,10 m 3,-10 l 0,10",
            height: 10,
            width: 10,
            heightElements: [],
            widthElements: []
          },
          MARKER_SEQUENTIAL: {
            d: "m{mx},{my} m 0,3 l 10,0 m -10,3 l 10,0 m -10,3 l 10,0",
            height: 10,
            width: 10,
            heightElements: [],
            widthElements: []
          },
          MARKER_COMPENSATION: {
            d: "m {mx},{my} 8,-5 0,10 z m 9,0 8,-5 0,10 z",
            height: 10,
            width: 21,
            heightElements: [],
            widthElements: []
          },
          MARKER_LOOP: {
            d: "m {mx},{my} c 3.526979,0 6.386161,-2.829858 6.386161,-6.320661 0,-3.490806 -2.859182,-6.320661 -6.386161,-6.320661 -3.526978,0 -6.38616,2.829855 -6.38616,6.320661 0,1.745402 0.714797,3.325567 1.870463,4.469381 0.577834,0.571908 1.265885,1.034728 2.029916,1.35457 l -0.718163,-3.909793 m 0.718163,3.909793 -3.885211,0.802902",
            height: 13.9,
            width: 13.7,
            heightElements: [],
            widthElements: []
          },
          MARKER_ADHOC: {
            d: "m {mx},{my} m 0.84461,2.64411 c 1.05533,-1.23780996 2.64337,-2.07882 4.29653,-1.97997996 2.05163,0.0805 3.85579,1.15803 5.76082,1.79107 1.06385,0.34139996 2.24454,0.1438 3.18759,-0.43767 0.61743,-0.33642 1.2775,-0.64078 1.7542,-1.17511 0,0.56023 0,1.12046 0,1.6807 -0.98706,0.96237996 -2.29792,1.62393996 -3.6918,1.66181996 -1.24459,0.0927 -2.46671,-0.2491 -3.59505,-0.74812 -1.35789,-0.55965 -2.75133,-1.33436996 -4.27027,-1.18121996 -1.37741,0.14601 -2.41842,1.13685996 -3.44288,1.96782996 z",
            height: 4,
            width: 15,
            heightElements: [],
            widthElements: []
          },
          TASK_TYPE_SEND: {
            d: "m {mx},{my} l 0,{e.y1} l {e.x1},0 l 0,-{e.y1} z l {e.x0},{e.y0} l {e.x0},-{e.y0}",
            height: 14,
            width: 21,
            heightElements: [6, 14],
            widthElements: [10.5, 21]
          },
          TASK_TYPE_SCRIPT: {
            d: "m {mx},{my} c 9.966553,-6.27276 -8.000926,-7.91932 2.968968,-14.938 l -8.802728,0 c -10.969894,7.01868 6.997585,8.66524 -2.968967,14.938 z m -7,-12 l 5,0 m -4.5,3 l 4.5,0 m -3,3 l 5,0m -4,3 l 5,0",
            height: 15,
            width: 12.6,
            heightElements: [6, 14],
            widthElements: [10.5, 21]
          },
          TASK_TYPE_USER_1: {d: "m {mx},{my} c 0.909,-0.845 1.594,-2.049 1.594,-3.385 0,-2.554 -1.805,-4.62199999 -4.357,-4.62199999 -2.55199998,0 -4.28799998,2.06799999 -4.28799998,4.62199999 0,1.348 0.974,2.562 1.89599998,3.405 -0.52899998,0.187 -5.669,2.097 -5.794,4.7560005 v 6.718 h 17 v -6.718 c 0,-2.2980005 -5.5279996,-4.5950005 -6.0509996,-4.7760005 zm -8,6 l 0,5.5 m 11,0 l 0,-5"},
          TASK_TYPE_USER_2: {d: "m {mx},{my} m 2.162,1.009 c 0,2.4470005 -2.158,4.4310005 -4.821,4.4310005 -2.66499998,0 -4.822,-1.981 -4.822,-4.4310005 "},
          TASK_TYPE_USER_3: {d: "m {mx},{my} m -6.9,-3.80 c 0,0 2.25099998,-2.358 4.27399998,-1.177 2.024,1.181 4.221,1.537 4.124,0.965 -0.098,-0.57 -0.117,-3.79099999 -4.191,-4.13599999 -3.57499998,0.001 -4.20799998,3.36699999 -4.20699998,4.34799999 z"},
          TASK_TYPE_MANUAL: {d: "m {mx},{my} c 0.234,-0.01 5.604,0.008 8.029,0.004 0.808,0 1.271,-0.172 1.417,-0.752 0.227,-0.898 -0.334,-1.314 -1.338,-1.316 -2.467,-0.01 -7.886,-0.004 -8.108,-0.004 -0.014,-0.079 0.016,-0.533 0,-0.61 0.195,-0.042 8.507,0.006 9.616,0.002 0.877,-0.007 1.35,-0.438 1.353,-1.208 0.003,-0.768 -0.479,-1.09 -1.35,-1.091 -2.968,-0.002 -9.619,-0.013 -9.619,-0.013 v -0.591 c 0,0 5.052,-0.016 7.225,-0.016 0.888,-0.002 1.354,-0.416 1.351,-1.193 -0.006,-0.761 -0.492,-1.196 -1.361,-1.196 -3.473,-0.005 -10.86,-0.003 -11.0829995,-0.003 -0.022,-0.047 -0.045,-0.094 -0.069,-0.139 0.3939995,-0.319 2.0409995,-1.626 2.4149995,-2.017 0.469,-0.4870005 0.519,-1.1650005 0.162,-1.6040005 -0.414,-0.511 -0.973,-0.5 -1.48,-0.236 -1.4609995,0.764 -6.5999995,3.6430005 -7.7329995,4.2710005 -0.9,0.499 -1.516,1.253 -1.882,2.19 -0.37000002,0.95 -0.17,2.01 -0.166,2.979 0.004,0.718 -0.27300002,1.345 -0.055,2.063 0.629,2.087 2.425,3.312 4.859,3.318 4.6179995,0.014 9.2379995,-0.139 13.8569995,-0.158 0.755,-0.004 1.171,-0.301 1.182,-1.033 0.012,-0.754 -0.423,-0.969 -1.183,-0.973 -1.778,-0.01 -5.824,-0.004 -6.04,-0.004 10e-4,-0.084 0.003,-0.586 10e-4,-0.67 z"},
          TASK_TYPE_INSTANTIATING_SEND: {d: "m {mx},{my} l 0,8.4 l 12.6,0 l 0,-8.4 z l 6.3,3.6 l 6.3,-3.6"},
          TASK_TYPE_SERVICE: {d: "m {mx},{my} v -1.71335 c 0.352326,-0.0705 0.703932,-0.17838 1.047628,-0.32133 0.344416,-0.14465 0.665822,-0.32133 0.966377,-0.52145 l 1.19431,1.18005 1.567487,-1.57688 -1.195028,-1.18014 c 0.403376,-0.61394 0.683079,-1.29908 0.825447,-2.01824 l 1.622133,-0.01 v -2.2196 l -1.636514,0.01 c -0.07333,-0.35153 -0.178319,-0.70024 -0.323564,-1.04372 -0.145244,-0.34406 -0.321407,-0.6644 -0.522735,-0.96217 l 1.131035,-1.13631 -1.583305,-1.56293 -1.129598,1.13589 c -0.614052,-0.40108 -1.302883,-0.68093 -2.022633,-0.82247 l 0.0093,-1.61852 h -2.241173 l 0.0042,1.63124 c -0.353763,0.0736 -0.705369,0.17977 -1.049785,0.32371 -0.344415,0.14437 -0.665102,0.32092 -0.9635006,0.52046 l -1.1698628,-1.15823 -1.5667691,1.5792 1.1684265,1.15669 c -0.4026573,0.61283 -0.68308,1.29797 -0.8247287,2.01713 l -1.6588041,0.003 v 2.22174 l 1.6724648,-0.006 c 0.073327,0.35077 0.1797598,0.70243 0.3242851,1.04472 0.1452428,0.34448 0.3214064,0.6644 0.5227339,0.96066 l -1.1993431,1.19723 1.5840256,1.56011 1.1964668,-1.19348 c 0.6140517,0.40346 1.3028827,0.68232 2.0233517,0.82331 l 7.19e-4,1.69892 h 2.226848 z m 0.221462,-3.9957 c -1.788948,0.7502 -3.8576,-0.0928 -4.6097055,-1.87438 -0.7521065,-1.78321 0.090598,-3.84627 1.8802645,-4.59604 1.78823,-0.74936 3.856881,0.0929 4.608987,1.87437 0.752106,1.78165 -0.0906,3.84612 -1.879546,4.59605 z"},
          TASK_TYPE_SERVICE_FILL: {d: "m {mx},{my} c -1.788948,0.7502 -3.8576,-0.0928 -4.6097055,-1.87438 -0.7521065,-1.78321 0.090598,-3.84627 1.8802645,-4.59604 1.78823,-0.74936 3.856881,0.0929 4.608987,1.87437 0.752106,1.78165 -0.0906,3.84612 -1.879546,4.59605 z"},
          TASK_TYPE_BUSINESS_RULE_HEADER: {d: "m {mx},{my} 0,4 20,0 0,-4 z"},
          TASK_TYPE_BUSINESS_RULE_MAIN: {d: "m {mx},{my} 0,12 20,0 0,-12 zm 0,8 l 20,0 m -13,-4 l 0,8"},
          MESSAGE_FLOW_MARKER: {d: "m {mx},{my} m -10.5 ,-7 l 0,14 l 21,0 l 0,-14 z l 10.5,6 l 10.5,-6"}
        }, this.getRawPath = function (e) {
          return this.pathMap[e].d
        }, this.getScaledPath = function (e, t) {
          var n, i, a = this.pathMap[e];
          t.abspos ? (n = t.abspos.x, i = t.abspos.y) : (n = t.containerWidth * t.position.mx, i = t.containerHeight * t.position.my);
          var o = {};
          if (t.position) {
            for (var s = t.containerHeight / a.height * t.yScaleFactor, u = t.containerWidth / a.width * t.xScaleFactor, l = 0; l < a.heightElements.length; l++)o["y" + l] = a.heightElements[l] * s;
            for (var c = 0; c < a.widthElements.length; c++)o["x" + c] = a.widthElements[c] * u
          }
          var p = r.format(a.d, {mx: n, my: i, e: o});
          return p
        }
      }

      var r = e(71);
      t.exports = n
    }, {71: 71}],
    6: [function (e, t) {
      t.exports = {renderer: ["type", e(4)], pathMap: ["type", e(5)]}
    }, {4: 4, 5: 5}],
    7: [function (e, t) {
      function n(e, t) {
        return a({id: e.id, type: e.$type, businessObject: e}, t)
      }

      function r(e) {
        return o(e, function (e) {
          return {x: e.x, y: e.y}
        })
      }

      function i(e, t, n, r) {
        this._eventBus = e, this._canvas = t, this._elementFactory = n, this._elementRegistry = r
      }

      var a = e(159), o = e(83), s = e(13), u = s.hasExternalLabel, l = s.getExternalLabelBounds, c = e(12).isExpanded, p = e(10).elementToString;
      i.$inject = ["eventBus", "canvas", "elementFactory", "elementRegistry"], t.exports = i, i.prototype.add = function (e, t) {
        var i, a = e.di;
        if (a.$instanceOf("bpmndi:BPMNPlane"))i = this._elementFactory.createRoot(n(e)), this._canvas.setRootElement(i); else if (a.$instanceOf("bpmndi:BPMNShape")) {
          var o = !c(e), s = t && (t.hidden || t.collapsed), l = e.di.bounds;
          i = this._elementFactory.createShape(n(e, {
            collapsed: o,
            hidden: s,
            x: Math.round(l.x),
            y: Math.round(l.y),
            width: Math.round(l.width),
            height: Math.round(l.height)
          })), this._canvas.addShape(i, t)
        } else {
          if (!a.$instanceOf("bpmndi:BPMNEdge"))throw new Error("unknown di " + p(a) + " for element " + p(e));
          var d = this._getSource(e), f = this._getTarget(e);
          i = this._elementFactory.createConnection(n(e, {
            source: d,
            target: f,
            waypoints: r(e.di.waypoint)
          })), this._canvas.addConnection(i, t)
        }
        return u(e) && this.addLabel(e, i), this._eventBus.fire("bpmnElement.added", {element: i}), i
      }, i.prototype.addLabel = function (e, t) {
        var r = l(e, t), i = this._elementFactory.createLabel(n(e, {
          id: e.id + "_label",
          labelTarget: t,
          type: "label",
          hidden: t.hidden,
          x: Math.round(r.x),
          y: Math.round(r.y),
          width: Math.round(r.width),
          height: Math.round(r.height)
        }));
        return this._canvas.addShape(i, t.parent)
      }, i.prototype._getEnd = function (e, t) {
        var n, r, i = e.$type;
        if (r = e[t + "Ref"], "source" === t && "bpmn:DataInputAssociation" === i && (r = r && r[0]), ("source" === t && "bpmn:DataOutputAssociation" === i || "target" === t && "bpmn:DataInputAssociation" === i) && (r = e.$parent), n = r && this._getElement(r))return n;
        throw new Error(r ? "element " + p(r) + " referenced by " + p(e) + "#" + t + "Ref not yet drawn" : p(e) + "#" + t + "Ref not specified")
      }, i.prototype._getSource = function (e) {
        return this._getEnd(e, "source")
      }, i.prototype._getTarget = function (e) {
        return this._getEnd(e, "target")
      }, i.prototype._getElement = function (e) {
        return this._elementRegistry.get(e.id)
      }
    }, {10: 10, 12: 12, 13: 13, 159: 159, 83: 83}],
    8: [function (e, t) {
      function n(e, t) {
        return e.$instanceOf(t)
      }

      function r(e) {
        return o(e.rootElements, function (e) {
          return n(e, "bpmn:Process") || n(e, "bpmn:Collaboration")
        })
      }

      function i(e) {
        function t(e, t) {
          return function (n) {
            e(n, t)
          }
        }

        function i(t, n) {
          var r = t.gfx;
          if (r)throw new Error("already rendered " + l(t));
          return e.element(t, n)
        }

        function o(t, n) {
          return e.root(t, n)
        }

        function u(e, t) {
          try {
            return e.di && i(e, t)
          } catch (n) {
            p(n.message, {element: e, error: n}), console.error("failed to import " + l(e)), console.error(n)
          }
        }

        function p(t, n) {
          e.error(t, n)
        }

        function d(e) {
          var t = e.bpmnElement;
          t ? t.di ? p("multiple DI elements defined for " + l(t), {element: t}) : (c.bind(t, "di"), t.di = e) : p("no bpmnElement referenced in " + l(e), {element: e})
        }

        function f(e) {
          h(e.plane)
        }

        function h(e) {
          d(e), s(e.planeElement, m)
        }

        function m(e) {
          d(e)
        }

        function g(e, t) {
          var i = e.diagrams;
          if (t && -1 === i.indexOf(t))throw new Error("diagram not part of bpmn:Definitions");
          if (!t && i && i.length && (t = i[0]), t) {
            f(t);
            var a = t.plane;
            if (!a)throw new Error("no plane for " + l(t));
            var s = a.bpmnElement;
            if (!s) {
              if (s = r(e), !s)return p("no process or collaboration present to display");
              p("correcting missing bpmnElement on " + l(a) + " to " + l(s)), a.bpmnElement = s, d(a)
            }
            var u = o(s, a);
            if (n(s, "bpmn:Process"))y(s, u); else {
              if (!n(s, "bpmn:Collaboration"))throw new Error("unsupported bpmnElement for " + l(a) + " : " + l(s));
              U(s, u), b(e.rootElements, u)
            }
            v(j)
          }
        }

        function v(e) {
          s(e, function (e) {
            e()
          })
        }

        function y(e, t) {
          L(e, t), T(e.ioSpecification, t), C(e.artifacts, t), V.push(e)
        }

        function b(e) {
          var r = a(e, function (e) {
            return n(e, "bpmn:Process") && e.laneSets && -1 === V.indexOf(e)
          });
          r.forEach(t(y))
        }

        function w(e, t) {
          u(e, t)
        }

        function x(e, n) {
          s(e, t(w, n))
        }

        function E(e, t) {
          u(e, t)
        }

        function _(e, t) {
          u(e, t)
        }

        function A(e, t) {
          u(e, t)
        }

        function S(e, t) {
          u(e, t)
        }

        function C(e, t) {
          s(e, function (e) {
            n(e, "bpmn:Association") ? j.push(function () {
              S(e, t)
            }) : S(e, t)
          })
        }

        function T(e, n) {
          e && (s(e.dataInputs, t(_, n)), s(e.dataOutputs, t(A, n)))
        }

        function D(e, t) {
          L(e, t), C(e.artifacts, t)
        }

        function k(e, t) {
          var r = u(e, t);
          n(e, "bpmn:SubProcess") && D(e, r || t)
        }

        function I(e, t) {
          u(e, t)
        }

        function M(e, t) {
          u(e, t)
        }

        function R(e, t) {
          u(e, t)
        }

        function P(e, t) {
          var n = u(e, t);
          if (e.childLaneSet)N(e.childLaneSet, n || t); else {
            var r = a(e.flowNodeRef, function (e) {
              return "bpmn:BoundaryEvent" !== e.$type
            });
            $(r, n || t)
          }
        }

        function N(e, n) {
          s(e.lanes, t(P, n))
        }

        function O(e, n) {
          s(e, t(N, n))
        }

        function L(e, t) {
          e.laneSets ? (O(e.laneSets, t), F(e.flowElements)) : $(e.flowElements, t)
        }

        function F(e, t) {
          s(e, function (e) {
            n(e, "bpmn:SequenceFlow") ? j.push(function () {
              I(e, t)
            }) : n(e, "bpmn:BoundaryEvent") ? j.unshift(function () {
              R(e, t)
            }) : n(e, "bpmn:DataObject") || (n(e, "bpmn:DataStoreReference") ? M(e, t) : n(e, "bpmn:DataObjectReference") && M(e, t))
          })
        }

        function $(e, r) {
          s(e, function (e) {
            n(e, "bpmn:SequenceFlow") ? j.push(function () {
              I(e, r)
            }) : n(e, "bpmn:BoundaryEvent") ? j.unshift(function () {
              R(e, r)
            }) : n(e, "bpmn:FlowNode") ? (k(e, r), n(e, "bpmn:Activity") && (T(e.ioSpecification, r), j.push(function () {
              s(e.dataInputAssociations, t(E, r)), s(e.dataOutputAssociations, t(E, r))
            }))) : n(e, "bpmn:DataObject") || (n(e, "bpmn:DataStoreReference") ? M(e, r) : n(e, "bpmn:DataObjectReference") ? M(e, r) : p("unrecognized flowElement " + l(e) + " in context " + (r ? l(r.businessObject) : null), {
              element: e,
              context: r
            }))
          })
        }

        function B(e, t) {
          var n = u(e, t), r = e.processRef;
          r && y(r, n || t)
        }

        function U(e) {
          s(e.participants, t(B)), C(e.artifacts), j.push(function () {
            x(e.messageFlows)
          })
        }

        var V = [], j = [];
        return {handleDefinitions: g}
      }

      var a = e(78), o = e(79), s = e(80), u = e(185), l = e(10).elementToString, c = new u({
        name: "bpmnElement",
        enumerable: !0
      }, {name: "di"});
      t.exports = i
    }, {10: 10, 185: 185, 78: 78, 79: 79, 80: 80}],
    9: [function (e, t) {
      function n(e, t, n) {
        function i(e) {
          var t = {
            root: function (e) {
              return o.add(e)
            }, element: function (e, t) {
              return o.add(e, t)
            }, error: function (e, t) {
              u.push({message: e, context: t})
            }
          }, n = new r(t);
          n.handleDefinitions(e)
        }

        var a, o = e.get("bpmnImporter"), s = e.get("eventBus"), u = [];
        s.fire("import.start");
        try {
          i(t)
        } catch (l) {
          a = l
        }
        s.fire(a ? "import.error" : "import.success", {error: a, warnings: u}), n(a, u)
      }

      var r = e(8);
      t.exports.importBpmnDiagram = n
    }, {8: 8}],
    10: [function (e, t) {
      t.exports.elementToString = function (e) {
        return e ? "<" + e.$type + (e.id ? ' id="' + e.id : "") + '" />' : "<null>"
      }
    }, {}],
    11: [function (e, t) {
      t.exports = {bpmnImporter: ["type", e(7)]}
    }, {7: 7}],
    12: [function (e, t) {
      t.exports.isExpandedPool = function (e) {
        return !!e.processRef
      }, t.exports.isExpanded = function (e) {
        var t = !(e.$instanceOf("bpmn:SubProcess") || e.$instanceOf("bpmn:CallActivity")), n = t || e.di.isExpanded;
        return n
      }
    }, {}],
    13: [function (e, t) {
      var n = e(159), r = t.exports.DEFAULT_LABEL_SIZE = {width: 90, height: 20};
      t.exports.hasExternalLabel = function (e) {
        return e.$instanceOf("bpmn:Event") || e.$instanceOf("bpmn:Gateway") || e.$instanceOf("bpmn:DataStoreReference") || e.$instanceOf("bpmn:DataObjectReference") || e.$instanceOf("bpmn:SequenceFlow") || e.$instanceOf("bpmn:MessageFlow")
      };
      var i = t.exports.getWaypointsMid = function (e) {
        var t = e.length / 2 - 1, n = e[Math.floor(t)], r = e[Math.ceil(t + .01)];
        return {x: n.x + (r.x - n.x) / 2, y: n.y + (r.y - n.y) / 2}
      }, a = t.exports.getExternalLabelMid = function (e) {
        return e.waypoints ? i(e.waypoints) : {x: e.x + e.width / 2, y: e.y + e.height + r.height / 2}
      };
      t.exports.getExternalLabelBounds = function (e, t) {
        var i, o, s, u = e.di, l = u.label;
        return l && l.bounds ? (s = l.bounds, o = {
          width: Math.max(r.width, s.width),
          height: s.height
        }, i = {x: s.x + s.width / 2, y: s.y + s.height / 2}) : (i = a(t), o = r), n({
          x: i.x - o.width / 2,
          y: i.y - o.height / 2
        }, o)
      }
    }, {159: 159}],
    14: [function (e, t) {
      t.exports = e(16)
    }, {16: 16}],
    15: [function (e, t) {
      function n(e, t) {
        o.call(this, e, t)
      }

      var r = e(156), i = e(151), a = e(159), o = e(22), s = e(18), u = e(19);
      n.prototype = Object.create(o.prototype), t.exports = n, n.prototype.fromXML = function (e, t, n, o) {
        r(t) || (o = n, n = t, t = "bpmn:Definitions"), i(n) && (o = n, n = {});
        var u = new s(a({model: this, lax: !0}, n)), l = u.handler(t);
        u.fromXML(e, l, o)
      }, n.prototype.toXML = function (e, t, n) {
        i(t) && (n = t, t = {});
        var r = new u(t);
        try {
          var a = r.toXML(e);
          n(null, a)
        } catch (o) {
          n(o)
        }
      }
    }, {151: 151, 156: 156, 159: 159, 18: 18, 19: 19, 22: 22}],
    16: [function (e, t) {
      var n = e(159), r = e(15), i = {bpmn: e(31), bpmndi: e(32), dc: e(33), di: e(34)};
      t.exports = function (e, t) {
        return new r(n({}, i, e), t)
      }
    }, {15: 15, 159: 159, 31: 31, 32: 32, 33: 33, 34: 34}],
    17: [function (e, t) {
      function n(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
      }

      function r(e) {
        return e.charAt(0).toLowerCase() + e.slice(1)
      }

      function i(e) {
        return e.xml && "lowerCase" === e.xml.tagAlias
      }

      t.exports.aliasToName = function (e, t) {
        return i(t) ? n(e) : e
      }, t.exports.nameToAlias = function (e, t) {
        return i(t) ? r(e) : e
      }, t.exports.DEFAULT_NS_MAP = {xsi: "http://www.w3.org/2001/XMLSchema-instance"}, t.exports.XSI_TYPE = "xsi:type"
    }, {}],
    18: [function (e, t) {
      function n(e) {
        var t = e.attributes;
        return m(t, function (e, t) {
          var n, r;
          return t.local ? (r = _(t.name, t.prefix), n = r.name) : n = t.prefix, e[n] = t.value, e
        }, {})
      }

      function r(e, t, n) {
        var r, i = _(t.value), a = e.ns[i.prefix || ""], o = i.localName, s = a && n.getPackage(a);
        s && (r = s.xml && s.xml.typePrefix, r && 0 === o.indexOf(r) && (o = o.slice(r.length)), t.value = s.prefix + ":" + o)
      }

      function i(e, t, n) {
        var a, o;
        if (a = e.uri || n) {
          var s = t.getPackage(a);
          o = s ? s.prefix : e.prefix, e.prefix = o, e.uri = a
        }
        g(e.attributes, function (n) {
          n.uri === k && "type" === n.local && r(e, n, t), i(n, t, null)
        })
      }

      function a(e) {
        y(this, e);
        var t = this.elementsById = {}, n = this.references = [], r = this.warnings = [];
        this.addReference = function (e) {
          n.push(e)
        }, this.addElement = function (e, n) {
          if (!e || !n)throw new Error("[xml-reader] id or ctx must not be null");
          t[e] = n
        }, this.addWarning = function (e) {
          r.push(e)
        }
      }

      function o() {
      }

      function s() {
      }

      function u() {
      }

      function l(e, t) {
        this.property = e, this.context = t
      }

      function c(e, t) {
        this.element = t, this.propertyDesc = e
      }

      function p() {
      }

      function d(e, t, n) {
        this.model = e, this.type = e.getType(t), this.context = n
      }

      function f(e, t, n) {
        this.model = e, this.context = n
      }

      function h(e) {
        e instanceof E && (e = {model: e}), y(this, {lax: !1}, e)
      }

      var m = e(84), g = e(80), v = e(79), y = e(159), b = e(88), w = e(21), x = e(20).parser, E = e(22), _ = e(27).parseName, A = e(30), S = A.coerceType, C = A.isSimple, T = e(17), D = T.XSI_TYPE, k = T.DEFAULT_NS_MAP.xsi, I = T.aliasToName;
      o.prototype.handleEnd = function () {
      }, o.prototype.handleText = function () {
      }, o.prototype.handleNode = function () {
      }, s.prototype = new o, s.prototype.handleNode = function () {
        return this
      }, u.prototype = new o, u.prototype.handleText = function (e) {
        this.body = (this.body || "") + e
      }, l.prototype = new u, l.prototype.handleNode = function (e) {
        if (this.element)throw new Error("expected no sub nodes");
        return this.element = this.createReference(e), this
      }, l.prototype.handleEnd = function () {
        this.element.id = this.body
      }, l.prototype.createReference = function () {
        return {property: this.property.ns.name, id: ""}
      }, c.prototype = new u, c.prototype.handleEnd = function () {
        var e = this.body, t = this.element, n = this.propertyDesc;
        e = S(n.type, e), n.isMany ? t.get(n.name).push(e) : t.set(n.name, e)
      }, p.prototype = Object.create(u.prototype), p.prototype.handleNode = function (e) {
        var t, n = this, r = this.element;
        return r ? n = this.handleChild(e) : (r = this.element = this.createElement(e), t = r.id, t && this.context.addElement(t, r)), n
      }, d.prototype = new p, d.prototype.addReference = function (e) {
        this.context.addReference(e)
      }, d.prototype.handleEnd = function () {
        var e = this.body, t = this.element, n = t.$descriptor, r = n.bodyProperty;
        r && void 0 !== e && (e = S(r.type, e), t.set(r.name, e))
      }, d.prototype.createElement = function (e) {
        var t = n(e), r = this.type, i = r.$descriptor, a = this.context, o = new r({});
        return g(t, function (e, t) {
          var n = i.propertiesByName[t];
          n && n.isReference ? a.addReference({
            element: o,
            property: n.ns.name,
            id: e
          }) : (n && (e = S(n.type, e)), o.set(t, e))
        }), o
      }, d.prototype.getPropertyForNode = function (e) {
        var t, n, r, i = _(e.local, e.prefix), a = this.type, o = this.model, s = a.$descriptor, u = i.name, l = s.propertiesByName[u];
        if (l)return l.serialize === D && (r = e.attributes[D]) ? (t = r.value, n = o.getType(t), y({}, l, {effectiveType: n.$descriptor.name})) : l;
        var c = o.getPackage(i.prefix);
        if (c) {
          if (t = i.prefix + ":" + I(i.localName, s.$pkg), n = o.getType(t), l = v(s.properties, function (e) {
              return !e.isVirtual && !e.isReference && !e.isAttribute && n.hasType(e.type)
            }))return y({}, l, {effectiveType: n.$descriptor.name})
        } else if (l = v(s.properties, function (e) {
            return !e.isReference && !e.isAttribute && "Element" === e.type
          }))return l;
        throw new Error("unrecognized element <" + i.name + ">")
      }, d.prototype.toString = function () {
        return "ElementDescriptor[" + this.type.$descriptor.name + "]"
      }, d.prototype.valueHandler = function (e, t) {
        return new c(e, t)
      }, d.prototype.referenceHandler = function (e) {
        return new l(e, this.context)
      }, d.prototype.handler = function (e) {
        return "Element" === e ? new f(this.model, e, this.context) : new d(this.model, e, this.context)
      }, d.prototype.handleChild = function (e) {
        var t, n, r, i;
        if (t = this.getPropertyForNode(e), r = this.element, n = t.effectiveType || t.type, C(n))return this.valueHandler(t, r);
        i = t.isReference ? this.referenceHandler(t).handleNode(e) : this.handler(n).handleNode(e);
        var a = i.element;
        return void 0 !== a && (t.isMany ? r.get(t.name).push(a) : r.set(t.name, a), t.isReference ? (y(a, {element: r}), this.context.addReference(a)) : a.$parent = r), i
      }, f.prototype = Object.create(p.prototype), f.prototype.createElement = function (e) {
        var t = e.name, n = e.prefix, r = e.ns[n], i = e.attributes;
        return this.model.createAny(t, r, i)
      }, f.prototype.handleChild = function (e) {
        var t, n = new f(this.model, "Element", this.context).handleNode(e), r = this.element, i = n.element;
        return void 0 !== i && (t = r.$children = r.$children || [], t.push(i), i.$parent = r), n
      }, f.prototype.handleText = function (e) {
        this.body = this.body || "" + e
      }, f.prototype.handleEnd = function () {
        this.body && (this.element.$body = this.body)
      }, h.prototype.fromXML = function (e, t, n) {
        function r() {
          var e, t, n = d.elementsById, r = d.references;
          for (e = 0; t = r[e]; e++) {
            var i = t.element, a = n[t.id], o = i.$descriptor.propertiesByName[t.property];
            if (a || d.addWarning({
                message: "unresolved reference <" + t.id + ">",
                element: t.element,
                property: t.property,
                value: t.id
              }), o.isMany) {
              var s = i.get(o.name), u = s.indexOf(t);
              a ? s[u] = a : s.splice(u, 1)
            } else i.set(o.name, a)
          }
        }

        function o() {
          h.pop().handleEnd()
        }

        function u(e) {
          var t = h.peek();
          i(e, c);
          try {
            h.push(t.handleNode(e))
          } catch (n) {
            var r = this.line, a = this.column, o = "unparsable content <" + e.name + "> detected\n	line: " + r + "\n	column: " + a + "\n	nested error: " + n.message;
            if (!p)throw console.error("could not parse document"), console.error(n), new Error(o);
            d.addWarning({message: o, error: n}), console.warn("could not parse node"), console.warn(n), h.push(new s)
          }
        }

        function l(e) {
          h.peek().handleText(e)
        }

        var c = this.model, p = this.lax, d = new a({parseRoot: t}), f = new x(!0, {xmlns: !0, trim: !0}), h = new w;
        t.context = d, h.push(t), f.onopentag = u, f.oncdata = f.ontext = l, f.onclosetag = o, f.onend = r, b(function () {
          var r;
          try {
            f.write(e).close()
          } catch (i) {
            r = i
          }
          n(r, r ? void 0 : t.element, d)
        })
      }, h.prototype.handler = function (e) {
        return new d(this.model, e)
      }, t.exports = h, t.exports.ElementHandler = d
    }, {159: 159, 17: 17, 20: 20, 21: 21, 22: 22, 27: 27, 30: 30, 79: 79, 80: 80, 84: 84, 88: 88}],
    19: [function (e, t) {
      function n(e) {
        return b(e) ? e : (e.prefix ? e.prefix + ":" : "") + e.localName
      }

      function r(e, t) {
        return t.isGeneric ? t.name : x({localName: S(t.ns.localName, t.$pkg)}, e)
      }

      function i(e, t) {
        return x({localName: t.ns.localName}, e)
      }

      function a(e) {
        var t = e.$descriptor;
        return w(t.properties, function (t) {
          var n = t.name;
          if (!e.hasOwnProperty(n))return !1;
          var r = e[n];
          return r === t["default"] ? !1 : t.isMany ? r.length : !0
        })
      }

      function o(e) {
        return e = b(e) ? e : "" + e, e.replace(T, function (e) {
          return "&#" + I[e] + ";"
        })
      }

      function s(e) {
        return w(e, function (e) {
          return e.isAttr
        })
      }

      function u(e) {
        return w(e, function (e) {
          return !e.isAttr
        })
      }

      function l(e, t) {
        this.ns = t
      }

      function c() {
      }

      function p(e) {
        this.ns = e
      }

      function d(e, t) {
        this.body = [], this.attrs = [], this.parent = e, this.ns = t
      }

      function f(e, t) {
        d.call(this, e, t)
      }

      function h() {
        this.value = "", this.write = function (e) {
          this.value += e
        }
      }

      function m(e, t) {
        var n = [""];
        this.append = function (t) {
          return e.write(t), this
        }, this.appendNewLine = function () {
          return t && e.write("\n"), this
        }, this.appendIndent = function () {
          return t && e.write(n.join("  ")), this
        }, this.indent = function () {
          return n.push(""), this
        }, this.unindent = function () {
          return n.pop(), this
        }
      }

      function g(e) {
        function t(t, n) {
          var r = n || new h, i = new m(r, e.format);
          return e.preamble && i.append(C), (new d).build(t).serializeTo(i), n ? void 0 : r.value
        }

        return e = x({format: !1, preamble: !0}, e || {}), {toXML: t}
      }

      var v = e(83), y = e(80), b = e(156), w = e(78), x = e(159), E = e(30), _ = e(27).parseName, A = e(17), S = A.nameToAlias, C = '<?xml version="1.0" encoding="UTF-8"?>\n', T = /(<|>|'|"|&|\n\r|\n)/g, D = A.DEFAULT_NS_MAP, k = A.XSI_TYPE, I = {
        "\n": "10",
        "\n\r": "10",
        '"': "34",
        "'": "39",
        "<": "60",
        ">": "62",
        "&": "38"
      };
      l.prototype.build = function (e) {
        return this.element = e, this
      }, l.prototype.serializeTo = function (e) {
        e.appendIndent().append("<" + n(this.ns) + ">" + this.element.id + "</" + n(this.ns) + ">").appendNewLine()
      }, c.prototype.serializeValue = c.prototype.serializeTo = function (e) {
        var t = this.escape;
        t && e.append("<![CDATA["), e.append(this.value), t && e.append("]]>")
      }, c.prototype.build = function (e, t) {
        return this.value = t, "String" === e.type && T.test(t) && (this.escape = !0), this
      }, p.prototype = new c, p.prototype.serializeTo = function (e) {
        e.appendIndent().append("<" + n(this.ns) + ">"), this.serializeValue(e), e.append("</" + n(this.ns) + ">").appendNewLine()
      }, d.prototype.build = function (e) {
        this.element = e;
        var t = this.parseNsAttributes(e);
        if (this.ns || (this.ns = this.nsTagName(e.$descriptor)), e.$descriptor.isGeneric)this.parseGeneric(e); else {
          var n = a(e);
          this.parseAttributes(s(n)), this.parseContainments(u(n)), this.parseGenericAttributes(e, t)
        }
        return this
      }, d.prototype.nsTagName = function (e) {
        var t = this.logNamespaceUsed(e.ns);
        return r(t, e)
      }, d.prototype.nsPropertyTagName = function (e) {
        var t = this.logNamespaceUsed(e.ns);
        return i(t, e)
      }, d.prototype.isLocalNs = function (e) {
        return e.uri === this.ns.uri
      }, d.prototype.nsAttributeName = function (e) {
        var t;
        b(e) ? t = _(e) : e.ns && (t = e.ns);
        var n = this.logNamespaceUsed(t);
        return this.isLocalNs(n) ? {localName: t.localName} : x({localName: t.localName}, n)
      }, d.prototype.parseGeneric = function (e) {
        var t = this, n = this.body, r = this.attrs;
        y(e, function (e, i) {
          "$body" === i ? n.push((new c).build({type: "String"}, e)) : "$children" === i ? y(e, function (e) {
            n.push(new d(t).build(e))
          }) : 0 !== i.indexOf("$") && r.push({name: i, value: o(e)})
        })
      }, d.prototype.parseNsAttributes = function (e) {
        var t = this, n = e.$attrs, r = [];
        return y(n, function (e, n) {
          var i = _(n);
          "xmlns" === i.prefix ? t.logNamespace({
            prefix: i.localName,
            uri: e
          }) : i.prefix || "xmlns" !== i.localName ? r.push({name: n, value: e}) : t.logNamespace({uri: e})
        }), r
      }, d.prototype.parseGenericAttributes = function (e, t) {
        var n = this;
        y(t, function (t) {
          if (t.name !== k)try {
            n.addAttribute(n.nsAttributeName(t.name), t.value)
          } catch (r) {
            console.warn("[writer] missing namespace information for ", t.name, "=", t.value, "on", e, r)
          }
        })
      }, d.prototype.parseContainments = function (e) {
        var t = this, n = this.body, r = this.element;
        y(e, function (e) {
          var i = r.get(e.name), a = e.isReference, o = e.isMany, s = t.nsPropertyTagName(e);
          if (o || (i = [i]), e.isBody)n.push((new c).build(e, i[0])); else if (E.isSimple(e.type))y(i, function (t) {
            n.push(new p(s).build(e, t))
          }); else if (a)y(i, function (e) {
            n.push(new l(t, s).build(e))
          }); else {
            var u = e.serialize === k;
            y(i, function (e) {
              var r;
              r = u ? new f(t, s) : new d(t), n.push(r.build(e))
            })
          }
        })
      }, d.prototype.getNamespaces = function () {
        return this.parent ? this.namespaces = this.parent.getNamespaces() : this.namespaces || (this.namespaces = {
          prefixMap: {},
          uriMap: {},
          used: {}
        }), this.namespaces
      }, d.prototype.logNamespace = function (e) {
        var t = this.getNamespaces(), n = t.uriMap[e.uri];
        return n || (t.uriMap[e.uri] = e), t.prefixMap[e.prefix] = e.uri, e
      }, d.prototype.logNamespaceUsed = function (e) {
        var t = this.element, n = t.$model, r = this.getNamespaces(), i = e.prefix, a = e.uri || D[i] || r.prefixMap[i] || (n ? (n.getPackage(i) || {}).uri : null);
        if (!a)throw new Error("no namespace uri given for prefix <" + e.prefix + ">");
        return e = r.uriMap[a], e || (e = this.logNamespace({
          prefix: i,
          uri: a
        })), r.used[e.uri] || (r.used[e.uri] = e), e
      }, d.prototype.parseAttributes = function (e) {
        var t = this, n = this.element;
        y(e, function (e) {
          t.logNamespaceUsed(e.ns);
          var r = n.get(e.name);
          e.isReference && (r = r.id), t.addAttribute(t.nsAttributeName(e), r)
        })
      }, d.prototype.addAttribute = function (e, t) {
        var n = this.attrs;
        b(t) && (t = o(t)), n.push({name: e, value: t})
      }, d.prototype.serializeAttributes = function (e) {
        function t() {
          return v(a.used, function (e) {
            var t = "xmlns" + (e.prefix ? ":" + e.prefix : "");
            return {name: t, value: e.uri}
          })
        }

        var r = this.attrs, i = !this.parent, a = this.namespaces;
        i && (r = t().concat(r)), y(r, function (t) {
          e.append(" ").append(n(t.name)).append('="').append(t.value).append('"')
        })
      }, d.prototype.serializeTo = function (e) {
        var t = this.body.length, r = !(1 === this.body.length && this.body[0]instanceof c);
        e.appendIndent().append("<" + n(this.ns)), this.serializeAttributes(e), e.append(t ? ">" : " />"), t && (r && e.appendNewLine().indent(), y(this.body, function (t) {
          t.serializeTo(e)
        }), r && e.unindent().appendIndent(), e.append("</" + n(this.ns) + ">")), e.appendNewLine()
      }, f.prototype = new d, f.prototype.build = function (e) {
        var t = e.$descriptor;
        this.element = e, this.typeNs = this.nsTagName(t);
        var n = this.typeNs, r = e.$model.getPackage(n.uri), i = r.xml && r.xml.typePrefix || "";
        return this.addAttribute(this.nsAttributeName(k), (n.prefix ? n.prefix + ":" : "") + i + t.ns.localName), d.prototype.build.call(this, e)
      }, f.prototype.isLocalNs = function (e) {
        return e.uri === this.typeNs.uri
      }, t.exports = g
    }, {156: 156, 159: 159, 17: 17, 27: 27, 30: 30, 78: 78, 80: 80, 83: 83}],
    20: [function (e, t, n) {
      (function (t) {
        !function (n) {
          function r(e, t) {
            if (!(this instanceof r))return new r(e, t);
            var i = this;
            a(i), i.q = i.c = "", i.bufferCheckPosition = n.MAX_BUFFER_LENGTH, i.opt = t || {}, i.opt.lowercase = i.opt.lowercase || i.opt.lowercasetags, i.looseCase = i.opt.lowercase ? "toLowerCase" : "toUpperCase", i.tags = [], i.closed = i.closedRoot = i.sawRoot = !1, i.tag = i.error = null, i.strict = !!e, i.noscript = !(!e && !i.opt.noscript), i.state = G.BEGIN, i.ENTITIES = Object.create(n.ENTITIES), i.attribList = [], i.opt.xmlns && (i.ns = Object.create(V)), i.trackPosition = i.opt.position !== !1, i.trackPosition && (i.position = i.line = i.column = 0), f(i, "onready")
          }

          function i(e) {
            for (var t = Math.max(n.MAX_BUFFER_LENGTH, 10), r = 0, i = 0, a = T.length; a > i; i++) {
              var o = e[T[i]].length;
              if (o > t)switch (T[i]) {
                case"textNode":
                  m(e);
                  break;
                case"cdata":
                  h(e, "oncdata", e.cdata), e.cdata = "";
                  break;
                case"script":
                  h(e, "onscript", e.script), e.script = "";
                  break;
                default:
                  v(e, "Max buffer length exceeded: " + T[i])
              }
              r = Math.max(r, o)
            }
            e.bufferCheckPosition = n.MAX_BUFFER_LENGTH - r + e.position
          }

          function a(e) {
            for (var t = 0, n = T.length; n > t; t++)e[T[t]] = ""
          }

          function o(e) {
            m(e), "" !== e.cdata && (h(e, "oncdata", e.cdata), e.cdata = ""), "" !== e.script && (h(e, "onscript", e.script), e.script = "")
          }

          function s(e, t) {
            return new u(e, t)
          }

          function u(e, t) {
            if (!(this instanceof u))return new u(e, t);
            D.apply(this), this._parser = new r(e, t), this.writable = !0, this.readable = !0;
            var n = this;
            this._parser.onend = function () {
              n.emit("end")
            }, this._parser.onerror = function (e) {
              n.emit("error", e), n._parser.error = null
            }, this._decoder = null, I.forEach(function (e) {
              Object.defineProperty(n, "on" + e, {
                get: function () {
                  return n._parser["on" + e]
                }, set: function (t) {
                  return t ? void n.on(e, t) : (n.removeAllListeners(e), n._parser["on" + e] = t)
                }, enumerable: !0, configurable: !1
              })
            })
          }

          function l(e) {
            return e.split("").reduce(function (e, t) {
              return e[t] = !0, e
            }, {})
          }

          function c(e) {
            return "[object RegExp]" === Object.prototype.toString.call(e)
          }

          function p(e, t) {
            return c(e) ? !!t.match(e) : e[t]
          }

          function d(e, t) {
            return !p(e, t)
          }

          function f(e, t, n) {
            e[t] && e[t](n)
          }

          function h(e, t, n) {
            e.textNode && m(e), f(e, t, n)
          }

          function m(e) {
            e.textNode = g(e.opt, e.textNode), e.textNode && f(e, "ontext", e.textNode), e.textNode = ""
          }

          function g(e, t) {
            return e.trim && (t = t.trim()), e.normalize && (t = t.replace(/\s+/g, " ")), t
          }

          function v(e, t) {
            return m(e), e.trackPosition && (t += "\nLine: " + e.line + "\nColumn: " + e.column + "\nChar: " + e.c), t = new Error(t), e.error = t, f(e, "onerror", t), e
          }

          function y(e) {
            return e.closedRoot || b(e, "Unclosed root tag"), e.state !== G.BEGIN && e.state !== G.TEXT && v(e, "Unexpected end"), m(e), e.c = "", e.closed = !0, f(e, "onend"), r.call(e, e.strict, e.opt), e
          }

          function b(e, t) {
            if ("object" != typeof e || !(e instanceof r))throw new Error("bad call to strictFail");
            e.strict && v(e, t)
          }

          function w(e) {
            e.strict || (e.tagName = e.tagName[e.looseCase]());
            var t = e.tags[e.tags.length - 1] || e, n = e.tag = {name: e.tagName, attributes: {}};
            e.opt.xmlns && (n.ns = t.ns), e.attribList.length = 0
          }

          function x(e, t) {
            var n = e.indexOf(":"), r = 0 > n ? ["", e] : e.split(":"), i = r[0], a = r[1];
            return t && "xmlns" === e && (i = "xmlns", a = ""), {prefix: i, local: a}
          }

          function E(e) {
            if (e.strict || (e.attribName = e.attribName[e.looseCase]()), -1 !== e.attribList.indexOf(e.attribName) || e.tag.attributes.hasOwnProperty(e.attribName))return e.attribName = e.attribValue = "";
            if (e.opt.xmlns) {
              var t = x(e.attribName, !0), n = t.prefix, r = t.local;
              if ("xmlns" === n)if ("xml" === r && e.attribValue !== B)b(e, "xml: prefix must be bound to " + B + "\nActual: " + e.attribValue); else if ("xmlns" === r && e.attribValue !== U)b(e, "xmlns: prefix must be bound to " + U + "\nActual: " + e.attribValue); else {
                var i = e.tag, a = e.tags[e.tags.length - 1] || e;
                i.ns === a.ns && (i.ns = Object.create(a.ns)), i.ns[r] = e.attribValue
              }
              e.attribList.push([e.attribName, e.attribValue])
            } else e.tag.attributes[e.attribName] = e.attribValue, h(e, "onattribute", {
              name: e.attribName,
              value: e.attribValue
            });
            e.attribName = e.attribValue = ""
          }

          function _(e, t) {
            if (e.opt.xmlns) {
              var n = e.tag, r = x(e.tagName);
              n.prefix = r.prefix, n.local = r.local, n.uri = n.ns[r.prefix] || "", n.prefix && !n.uri && (b(e, "Unbound namespace prefix: " + JSON.stringify(e.tagName)), n.uri = r.prefix);
              var i = e.tags[e.tags.length - 1] || e;
              n.ns && i.ns !== n.ns && Object.keys(n.ns).forEach(function (t) {
                h(e, "onopennamespace", {prefix: t, uri: n.ns[t]})
              });
              for (var a = 0, o = e.attribList.length; o > a; a++) {
                var s = e.attribList[a], u = s[0], l = s[1], c = x(u, !0), p = c.prefix, d = c.local, f = "" == p ? "" : n.ns[p] || "", m = {
                  name: u,
                  value: l,
                  prefix: p,
                  local: d,
                  uri: f
                };
                p && "xmlns" != p && !f && (b(e, "Unbound namespace prefix: " + JSON.stringify(p)), m.uri = p), e.tag.attributes[u] = m, h(e, "onattribute", m)
              }
              e.attribList.length = 0
            }
            e.tag.isSelfClosing = !!t, e.sawRoot = !0, e.tags.push(e.tag), h(e, "onopentag", e.tag), t || (e.state = e.noscript || "script" !== e.tagName.toLowerCase() ? G.TEXT : G.SCRIPT, e.tag = null, e.tagName = ""), e.attribName = e.attribValue = "", e.attribList.length = 0
          }

          function A(e) {
            if (!e.tagName)return b(e, "Weird empty close tag."), e.textNode += "</>", void(e.state = G.TEXT);
            if (e.script) {
              if ("script" !== e.tagName)return e.script += "</" + e.tagName + ">", e.tagName = "", void(e.state = G.SCRIPT);
              h(e, "onscript", e.script), e.script = ""
            }
            var t = e.tags.length, n = e.tagName;
            e.strict || (n = n[e.looseCase]());
            for (var r = n; t--;) {
              var i = e.tags[t];
              if (i.name === r)break;
              b(e, "Unexpected close tag")
            }
            if (0 > t)return b(e, "Unmatched closing tag: " + e.tagName), e.textNode += "</" + e.tagName + ">", void(e.state = G.TEXT);
            e.tagName = n;
            for (var a = e.tags.length; a-- > t;) {
              var o = e.tag = e.tags.pop();
              e.tagName = e.tag.name, h(e, "onclosetag", e.tagName);
              var s = {};
              for (var u in o.ns)s[u] = o.ns[u];
              var l = e.tags[e.tags.length - 1] || e;
              e.opt.xmlns && o.ns !== l.ns && Object.keys(o.ns).forEach(function (t) {
                var n = o.ns[t];
                h(e, "onclosenamespace", {prefix: t, uri: n})
              })
            }
            0 === t && (e.closedRoot = !0), e.tagName = e.attribValue = e.attribName = "", e.attribList.length = 0, e.state = G.TEXT
          }

          function S(e) {
            var t, n = e.entity, r = n.toLowerCase(), i = "";
            return e.ENTITIES[n] ? e.ENTITIES[n] : e.ENTITIES[r] ? e.ENTITIES[r] : (n = r, "#" === n.charAt(0) && ("x" === n.charAt(1) ? (n = n.slice(2), t = parseInt(n, 16), i = t.toString(16)) : (n = n.slice(1), t = parseInt(n, 10), i = t.toString(10))), n = n.replace(/^0+/, ""), i.toLowerCase() !== n ? (b(e, "Invalid character entity"), "&" + e.entity + ";") : String.fromCodePoint(t))
          }

          function C(e) {
            var t = this;
            if (this.error)throw this.error;
            if (t.closed)return v(t, "Cannot write after close. Assign an onready handler.");
            if (null === e)return y(t);
            for (var n = 0, r = ""; t.c = r = e.charAt(n++);)switch (t.trackPosition && (t.position++, "\n" === r ? (t.line++, t.column = 0) : t.column++), t.state) {
              case G.BEGIN:
                "<" === r ? (t.state = G.OPEN_WAKA, t.startTagPosition = t.position) : d(M, r) && (b(t, "Non-whitespace before first tag."), t.textNode = r, t.state = G.TEXT);
                continue;
              case G.TEXT:
                if (t.sawRoot && !t.closedRoot) {
                  for (var a = n - 1; r && "<" !== r && "&" !== r;)r = e.charAt(n++), r && t.trackPosition && (t.position++, "\n" === r ? (t.line++, t.column = 0) : t.column++);
                  t.textNode += e.substring(a, n - 1)
                }
                "<" === r ? (t.state = G.OPEN_WAKA, t.startTagPosition = t.position) : (!d(M, r) || t.sawRoot && !t.closedRoot || b(t, "Text data outside of root node."), "&" === r ? t.state = G.TEXT_ENTITY : t.textNode += r);
                continue;
              case G.SCRIPT:
                "<" === r ? t.state = G.SCRIPT_ENDING : t.script += r;
                continue;
              case G.SCRIPT_ENDING:
                "/" === r ? t.state = G.CLOSE_TAG : (t.script += "<" + r, t.state = G.SCRIPT);
                continue;
              case G.OPEN_WAKA:
                if ("!" === r)t.state = G.SGML_DECL, t.sgmlDecl = ""; else if (p(M, r)); else if (p(j, r))t.state = G.OPEN_TAG, t.tagName = r; else if ("/" === r)t.state = G.CLOSE_TAG, t.tagName = ""; else if ("?" === r)t.state = G.PROC_INST, t.procInstName = t.procInstBody = ""; else {
                  if (b(t, "Unencoded <"), t.startTagPosition + 1 < t.position) {
                    var o = t.position - t.startTagPosition;
                    r = new Array(o).join(" ") + r
                  }
                  t.textNode += "<" + r, t.state = G.TEXT
                }
                continue;
              case G.SGML_DECL:
                (t.sgmlDecl + r).toUpperCase() === F ? (h(t, "onopencdata"), t.state = G.CDATA, t.sgmlDecl = "", t.cdata = "") : t.sgmlDecl + r === "--" ? (t.state = G.COMMENT, t.comment = "", t.sgmlDecl = "") : (t.sgmlDecl + r).toUpperCase() === $ ? (t.state = G.DOCTYPE, (t.doctype || t.sawRoot) && b(t, "Inappropriately located doctype declaration"), t.doctype = "", t.sgmlDecl = "") : ">" === r ? (h(t, "onsgmldeclaration", t.sgmlDecl), t.sgmlDecl = "", t.state = G.TEXT) : p(N, r) ? (t.state = G.SGML_DECL_QUOTED, t.sgmlDecl += r) : t.sgmlDecl += r;
                continue;
              case G.SGML_DECL_QUOTED:
                r === t.q && (t.state = G.SGML_DECL, t.q = ""), t.sgmlDecl += r;
                continue;
              case G.DOCTYPE:
                ">" === r ? (t.state = G.TEXT, h(t, "ondoctype", t.doctype), t.doctype = !0) : (t.doctype += r, "[" === r ? t.state = G.DOCTYPE_DTD : p(N, r) && (t.state = G.DOCTYPE_QUOTED, t.q = r));
                continue;
              case G.DOCTYPE_QUOTED:
                t.doctype += r, r === t.q && (t.q = "", t.state = G.DOCTYPE);
                continue;
              case G.DOCTYPE_DTD:
                t.doctype += r, "]" === r ? t.state = G.DOCTYPE : p(N, r) && (t.state = G.DOCTYPE_DTD_QUOTED, t.q = r);
                continue;
              case G.DOCTYPE_DTD_QUOTED:
                t.doctype += r, r === t.q && (t.state = G.DOCTYPE_DTD, t.q = "");
                continue;
              case G.COMMENT:
                "-" === r ? t.state = G.COMMENT_ENDING : t.comment += r;
                continue;
              case G.COMMENT_ENDING:
                "-" === r ? (t.state = G.COMMENT_ENDED, t.comment = g(t.opt, t.comment), t.comment && h(t, "oncomment", t.comment), t.comment = "") : (t.comment += "-" + r, t.state = G.COMMENT);
                continue;
              case G.COMMENT_ENDED:
                ">" !== r ? (b(t, "Malformed comment"), t.comment += "--" + r, t.state = G.COMMENT) : t.state = G.TEXT;
                continue;
              case G.CDATA:
                "]" === r ? t.state = G.CDATA_ENDING : t.cdata += r;
                continue;
              case G.CDATA_ENDING:
                "]" === r ? t.state = G.CDATA_ENDING_2 : (t.cdata += "]" + r, t.state = G.CDATA);
                continue;
              case G.CDATA_ENDING_2:
                ">" === r ? (t.cdata && h(t, "oncdata", t.cdata), h(t, "onclosecdata"), t.cdata = "", t.state = G.TEXT) : "]" === r ? t.cdata += "]" : (t.cdata += "]]" + r, t.state = G.CDATA);
                continue;
              case G.PROC_INST:
                "?" === r ? t.state = G.PROC_INST_ENDING : p(M, r) ? t.state = G.PROC_INST_BODY : t.procInstName += r;
                continue;
              case G.PROC_INST_BODY:
                if (!t.procInstBody && p(M, r))continue;
                "?" === r ? t.state = G.PROC_INST_ENDING : t.procInstBody += r;
                continue;
              case G.PROC_INST_ENDING:
                ">" === r ? (h(t, "onprocessinginstruction", {
                  name: t.procInstName,
                  body: t.procInstBody
                }), t.procInstName = t.procInstBody = "", t.state = G.TEXT) : (t.procInstBody += "?" + r, t.state = G.PROC_INST_BODY);
                continue;
              case G.OPEN_TAG:
                p(z, r) ? t.tagName += r : (w(t), ">" === r ? _(t) : "/" === r ? t.state = G.OPEN_TAG_SLASH : (d(M, r) && b(t, "Invalid character in tag name"), t.state = G.ATTRIB));
                continue;
              case G.OPEN_TAG_SLASH:
                ">" === r ? (_(t, !0), A(t)) : (b(t, "Forward-slash in opening tag not followed by >"), t.state = G.ATTRIB);
                continue;
              case G.ATTRIB:
                if (p(M, r))continue;
                ">" === r ? _(t) : "/" === r ? t.state = G.OPEN_TAG_SLASH : p(j, r) ? (t.attribName = r, t.attribValue = "", t.state = G.ATTRIB_NAME) : b(t, "Invalid attribute name");
                continue;
              case G.ATTRIB_NAME:
                "=" === r ? t.state = G.ATTRIB_VALUE : ">" === r ? (b(t, "Attribute without value"), t.attribValue = t.attribName, E(t), _(t)) : p(M, r) ? t.state = G.ATTRIB_NAME_SAW_WHITE : p(z, r) ? t.attribName += r : b(t, "Invalid attribute name");
                continue;
              case G.ATTRIB_NAME_SAW_WHITE:
                if ("=" === r)t.state = G.ATTRIB_VALUE; else {
                  if (p(M, r))continue;
                  b(t, "Attribute without value"), t.tag.attributes[t.attribName] = "", t.attribValue = "", h(t, "onattribute", {
                    name: t.attribName,
                    value: ""
                  }), t.attribName = "", ">" === r ? _(t) : p(j, r) ? (t.attribName = r, t.state = G.ATTRIB_NAME) : (b(t, "Invalid attribute name"), t.state = G.ATTRIB)
                }
                continue;
              case G.ATTRIB_VALUE:
                if (p(M, r))continue;
                p(N, r) ? (t.q = r, t.state = G.ATTRIB_VALUE_QUOTED) : (b(t, "Unquoted attribute value"), t.state = G.ATTRIB_VALUE_UNQUOTED, t.attribValue = r);
                continue;
              case G.ATTRIB_VALUE_QUOTED:
                if (r !== t.q) {
                  "&" === r ? t.state = G.ATTRIB_VALUE_ENTITY_Q : t.attribValue += r;
                  continue
                }
                E(t), t.q = "", t.state = G.ATTRIB_VALUE_CLOSED;
                continue;
              case G.ATTRIB_VALUE_CLOSED:
                p(M, r) ? t.state = G.ATTRIB : ">" === r ? _(t) : "/" === r ? t.state = G.OPEN_TAG_SLASH : p(j, r) ? (b(t, "No whitespace between attributes"), t.attribName = r, t.attribValue = "", t.state = G.ATTRIB_NAME) : b(t, "Invalid attribute name");
                continue;
              case G.ATTRIB_VALUE_UNQUOTED:
                if (d(L, r)) {
                  "&" === r ? t.state = G.ATTRIB_VALUE_ENTITY_U : t.attribValue += r;
                  continue
                }
                E(t), ">" === r ? _(t) : t.state = G.ATTRIB;
                continue;
              case G.CLOSE_TAG:
                if (t.tagName)">" === r ? A(t) : p(z, r) ? t.tagName += r : t.script ? (t.script += "</" + t.tagName, t.tagName = "", t.state = G.SCRIPT) : (d(M, r) && b(t, "Invalid tagname in closing tag"), t.state = G.CLOSE_TAG_SAW_WHITE);
                else {
                  if (p(M, r))continue;
                  d(j, r) ? t.script ? (t.script += "</" + r, t.state = G.SCRIPT) : b(t, "Invalid tagname in closing tag.") : t.tagName = r
                }
                continue;
              case G.CLOSE_TAG_SAW_WHITE:
                if (p(M, r))continue;
                ">" === r ? A(t) : b(t, "Invalid characters in closing tag");
                continue;
              case G.TEXT_ENTITY:
              case G.ATTRIB_VALUE_ENTITY_Q:
              case G.ATTRIB_VALUE_ENTITY_U:
                switch (t.state) {
                  case G.TEXT_ENTITY:
                    var s = G.TEXT, u = "textNode";
                    break;
                  case G.ATTRIB_VALUE_ENTITY_Q:
                    var s = G.ATTRIB_VALUE_QUOTED, u = "attribValue";
                    break;
                  case G.ATTRIB_VALUE_ENTITY_U:
                    var s = G.ATTRIB_VALUE_UNQUOTED, u = "attribValue"
                }
                ";" === r ? (t[u] += S(t), t.entity = "", t.state = s) : p(O, r) ? t.entity += r : (b(t, "Invalid character entity"), t[u] += "&" + t.entity + r, t.entity = "", t.state = s);
                continue;
              default:
                throw new Error(t, "Unknown state: " + t.state)
            }
            return t.position >= t.bufferCheckPosition && i(t), t
          }

          n.parser = function (e, t) {
            return new r(e, t)
          }, n.SAXParser = r, n.SAXStream = u, n.createStream = s, n.MAX_BUFFER_LENGTH = 65536;
          var T = ["comment", "sgmlDecl", "textNode", "tagName", "doctype", "procInstName", "procInstBody", "entity", "attribName", "attribValue", "cdata", "script"];
          n.EVENTS = ["text", "processinginstruction", "sgmldeclaration", "doctype", "comment", "attribute", "opentag", "closetag", "opencdata", "cdata", "closecdata", "error", "end", "ready", "script", "opennamespace", "closenamespace"], Object.create || (Object.create = function (e) {
            function t() {
              this.__proto__ = e
            }

            return t.prototype = e, new t
          }), Object.getPrototypeOf || (Object.getPrototypeOf = function (e) {
            return e.__proto__
          }), Object.keys || (Object.keys = function (e) {
            var t = [];
            for (var n in e)e.hasOwnProperty(n) && t.push(n);
            return t
          }), r.prototype = {
            end: function () {
              y(this)
            }, write: C, resume: function () {
              return this.error = null, this
            }, close: function () {
              return this.write(null)
            }, flush: function () {
              o(this)
            }
          };
          try {
            var D = e("stream").Stream
          } catch (k) {
            var D = function () {
            }
          }
          var I = n.EVENTS.filter(function (e) {
            return "error" !== e && "end" !== e
          });
          u.prototype = Object.create(D.prototype, {constructor: {value: u}}), u.prototype.write = function (n) {
            if ("function" == typeof t && "function" == typeof t.isBuffer && t.isBuffer(n)) {
              if (!this._decoder) {
                var r = e("string_decoder").StringDecoder;
                this._decoder = new r("utf8")
              }
              n = this._decoder.write(n)
            }
            return this._parser.write(n.toString()), this.emit("data", n), !0
          }, u.prototype.end = function (e) {
            return e && e.length && this.write(e), this._parser.end(), !0
          }, u.prototype.on = function (e, t) {
            var n = this;
            return n._parser["on" + e] || -1 === I.indexOf(e) || (n._parser["on" + e] = function () {
              var t = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
              t.splice(0, 0, e), n.emit.apply(n, t)
            }), D.prototype.on.call(n, e, t)
          };
          var M = "\r\n	 ", R = "0124356789", P = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", N = "'\"", O = R + P + "#", L = M + ">", F = "[CDATA[", $ = "DOCTYPE", B = "http://www.w3.org/XML/1998/namespace", U = "http://www.w3.org/2000/xmlns/", V = {
            xml: B,
            xmlns: U
          };
          M = l(M), R = l(R), P = l(P);
          var j = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, z = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040\.\d-]/;
          N = l(N), O = l(O), L = l(L);
          var G = 0;
          n.STATE = {
            BEGIN: G++,
            TEXT: G++,
            TEXT_ENTITY: G++,
            OPEN_WAKA: G++,
            SGML_DECL: G++,
            SGML_DECL_QUOTED: G++,
            DOCTYPE: G++,
            DOCTYPE_QUOTED: G++,
            DOCTYPE_DTD: G++,
            DOCTYPE_DTD_QUOTED: G++,
            COMMENT_STARTING: G++,
            COMMENT: G++,
            COMMENT_ENDING: G++,
            COMMENT_ENDED: G++,
            CDATA: G++,
            CDATA_ENDING: G++,
            CDATA_ENDING_2: G++,
            PROC_INST: G++,
            PROC_INST_BODY: G++,
            PROC_INST_ENDING: G++,
            OPEN_TAG: G++,
            OPEN_TAG_SLASH: G++,
            ATTRIB: G++,
            ATTRIB_NAME: G++,
            ATTRIB_NAME_SAW_WHITE: G++,
            ATTRIB_VALUE: G++,
            ATTRIB_VALUE_QUOTED: G++,
            ATTRIB_VALUE_CLOSED: G++,
            ATTRIB_VALUE_UNQUOTED: G++,
            ATTRIB_VALUE_ENTITY_Q: G++,
            ATTRIB_VALUE_ENTITY_U: G++,
            CLOSE_TAG: G++,
            CLOSE_TAG_SAW_WHITE: G++,
            SCRIPT: G++,
            SCRIPT_ENDING: G++
          }, n.ENTITIES = {
            amp: "&",
            gt: ">",
            lt: "<",
            quot: '"',
            apos: "'",
            AElig: 198,
            Aacute: 193,
            Acirc: 194,
            Agrave: 192,
            Aring: 197,
            Atilde: 195,
            Auml: 196,
            Ccedil: 199,
            ETH: 208,
            Eacute: 201,
            Ecirc: 202,
            Egrave: 200,
            Euml: 203,
            Iacute: 205,
            Icirc: 206,
            Igrave: 204,
            Iuml: 207,
            Ntilde: 209,
            Oacute: 211,
            Ocirc: 212,
            Ograve: 210,
            Oslash: 216,
            Otilde: 213,
            Ouml: 214,
            THORN: 222,
            Uacute: 218,
            Ucirc: 219,
            Ugrave: 217,
            Uuml: 220,
            Yacute: 221,
            aacute: 225,
            acirc: 226,
            aelig: 230,
            agrave: 224,
            aring: 229,
            atilde: 227,
            auml: 228,
            ccedil: 231,
            eacute: 233,
            ecirc: 234,
            egrave: 232,
            eth: 240,
            euml: 235,
            iacute: 237,
            icirc: 238,
            igrave: 236,
            iuml: 239,
            ntilde: 241,
            oacute: 243,
            ocirc: 244,
            ograve: 242,
            oslash: 248,
            otilde: 245,
            ouml: 246,
            szlig: 223,
            thorn: 254,
            uacute: 250,
            ucirc: 251,
            ugrave: 249,
            uuml: 252,
            yacute: 253,
            yuml: 255,
            copy: 169,
            reg: 174,
            nbsp: 160,
            iexcl: 161,
            cent: 162,
            pound: 163,
            curren: 164,
            yen: 165,
            brvbar: 166,
            sect: 167,
            uml: 168,
            ordf: 170,
            laquo: 171,
            not: 172,
            shy: 173,
            macr: 175,
            deg: 176,
            plusmn: 177,
            sup1: 185,
            sup2: 178,
            sup3: 179,
            acute: 180,
            micro: 181,
            para: 182,
            middot: 183,
            cedil: 184,
            ordm: 186,
            raquo: 187,
            frac14: 188,
            frac12: 189,
            frac34: 190,
            iquest: 191,
            times: 215,
            divide: 247,
            OElig: 338,
            oelig: 339,
            Scaron: 352,
            scaron: 353,
            Yuml: 376,
            fnof: 402,
            circ: 710,
            tilde: 732,
            Alpha: 913,
            Beta: 914,
            Gamma: 915,
            Delta: 916,
            Epsilon: 917,
            Zeta: 918,
            Eta: 919,
            Theta: 920,
            Iota: 921,
            Kappa: 922,
            Lambda: 923,
            Mu: 924,
            Nu: 925,
            Xi: 926,
            Omicron: 927,
            Pi: 928,
            Rho: 929,
            Sigma: 931,
            Tau: 932,
            Upsilon: 933,
            Phi: 934,
            Chi: 935,
            Psi: 936,
            Omega: 937,
            alpha: 945,
            beta: 946,
            gamma: 947,
            delta: 948,
            epsilon: 949,
            zeta: 950,
            eta: 951,
            theta: 952,
            iota: 953,
            kappa: 954,
            lambda: 955,
            mu: 956,
            nu: 957,
            xi: 958,
            omicron: 959,
            pi: 960,
            rho: 961,
            sigmaf: 962,
            sigma: 963,
            tau: 964,
            upsilon: 965,
            phi: 966,
            chi: 967,
            psi: 968,
            omega: 969,
            thetasym: 977,
            upsih: 978,
            piv: 982,
            ensp: 8194,
            emsp: 8195,
            thinsp: 8201,
            zwnj: 8204,
            zwj: 8205,
            lrm: 8206,
            rlm: 8207,
            ndash: 8211,
            mdash: 8212,
            lsquo: 8216,
            rsquo: 8217,
            sbquo: 8218,
            ldquo: 8220,
            rdquo: 8221,
            bdquo: 8222,
            dagger: 8224,
            Dagger: 8225,
            bull: 8226,
            hellip: 8230,
            permil: 8240,
            prime: 8242,
            Prime: 8243,
            lsaquo: 8249,
            rsaquo: 8250,
            oline: 8254,
            frasl: 8260,
            euro: 8364,
            image: 8465,
            weierp: 8472,
            real: 8476,
            trade: 8482,
            alefsym: 8501,
            larr: 8592,
            uarr: 8593,
            rarr: 8594,
            darr: 8595,
            harr: 8596,
            crarr: 8629,
            lArr: 8656,
            uArr: 8657,
            rArr: 8658,
            dArr: 8659,
            hArr: 8660,
            forall: 8704,
            part: 8706,
            exist: 8707,
            empty: 8709,
            nabla: 8711,
            isin: 8712,
            notin: 8713,
            ni: 8715,
            prod: 8719,
            sum: 8721,
            minus: 8722,
            lowast: 8727,
            radic: 8730,
            prop: 8733,
            infin: 8734,
            ang: 8736,
            and: 8743,
            or: 8744,
            cap: 8745,
            cup: 8746,
            "int": 8747,
            there4: 8756,
            sim: 8764,
            cong: 8773,
            asymp: 8776,
            ne: 8800,
            equiv: 8801,
            le: 8804,
            ge: 8805,
            sub: 8834,
            sup: 8835,
            nsub: 8836,
            sube: 8838,
            supe: 8839,
            oplus: 8853,
            otimes: 8855,
            perp: 8869,
            sdot: 8901,
            lceil: 8968,
            rceil: 8969,
            lfloor: 8970,
            rfloor: 8971,
            lang: 9001,
            rang: 9002,
            loz: 9674,
            spades: 9824,
            clubs: 9827,
            hearts: 9829,
            diams: 9830
          }, Object.keys(n.ENTITIES).forEach(function (e) {
            var t = n.ENTITIES[e], r = "number" == typeof t ? String.fromCharCode(t) : t;
            n.ENTITIES[e] = r
          });
          for (var G in n.STATE)n.STATE[n.STATE[G]] = G;
          G = n.STATE, String.fromCodePoint || !function () {
            var e = String.fromCharCode, t = Math.floor, n = function () {
              var n, r, i = 16384, a = [], o = -1, s = arguments.length;
              if (!s)return "";
              for (var u = ""; ++o < s;) {
                var l = Number(arguments[o]);
                if (!isFinite(l) || 0 > l || l > 1114111 || t(l) != l)throw RangeError("Invalid code point: " + l);
                65535 >= l ? a.push(l) : (l -= 65536, n = (l >> 10) + 55296, r = l % 1024 + 56320, a.push(n, r)), (o + 1 == s || a.length > i) && (u += e.apply(null, a), a.length = 0)
              }
              return u
            };
            Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
              value: n,
              configurable: !0,
              writable: !0
            }) : String.fromCodePoint = n
          }()
        }("undefined" == typeof n ? sax = {} : n)
      }).call(this, void 0)
    }, {undefined: void 0}],
    21: [function (t, n, r) {
      !function (t) {
        function i() {
          this.data = [null], this.top = 0
        }

        function a() {
          return new i
        }

        i.prototype.clear = function () {
          return this.data = [null], this.top = 0, this
        }, i.prototype.length = function () {
          return this.top
        }, i.prototype.peek = function () {
          return this.data[this.top]
        }, i.prototype.pop = function () {
          return this.top > 0 ? (this.top--, this.data.pop()) : void 0
        }, i.prototype.push = function (e) {
          return this.data[++this.top] = e, this
        }, "undefined" != typeof r ? n.exports = a : "function" == typeof e ? e(function () {
          return a
        }) : t.stack = a
      }(this)
    }, {}],
    22: [function (e, t) {
      t.exports = e(26)
    }, {26: 26}],
    23: [function (e, t) {
      function n() {
      }

      n.prototype.get = function (e) {
        return this.$model.properties.get(this, e)
      }, n.prototype.set = function (e, t) {
        this.$model.properties.set(this, e, t)
      }, t.exports = n
    }, {}],
    24: [function (e, t) {
      function n(e) {
        this.ns = e, this.name = e.name, this.allTypes = [], this.properties = [], this.propertiesByName = {}
      }

      var r = e(164), i = e(159), a = e(80), o = e(27).parseName;
      t.exports = n, n.prototype.build = function () {
        return r(this, ["ns", "name", "allTypes", "properties", "propertiesByName", "bodyProperty"])
      }, n.prototype.addProperty = function (e, t) {
        this.addNamedProperty(e, !0);
        var n = this.properties;
        void 0 !== t ? n.splice(t, 0, e) : n.push(e)
      }, n.prototype.replaceProperty = function (e, t) {
        var n = e.ns, r = this.properties, i = this.propertiesByName, a = e.name !== t.name;
        if (e.isBody) {
          if (!t.isBody)throw new Error("property <" + t.ns.name + "> must be body property to refine <" + e.ns.name + ">");
          this.setBodyProperty(t, !1)
        }
        this.addNamedProperty(t, a);
        var o = r.indexOf(e);
        if (-1 === o)throw new Error("property <" + n.name + "> not found in property list");
        r[o] = t, i[n.name] = i[n.localName] = t
      }, n.prototype.redefineProperty = function (e) {
        var t = e.ns.prefix, n = e.redefines.split("#"), r = o(n[0], t), i = o(n[1], r.prefix).name, a = this.propertiesByName[i];
        if (!a)throw new Error("refined property <" + i + "> not found");
        this.replaceProperty(a, e), delete e.redefines
      }, n.prototype.addNamedProperty = function (e, t) {
        var n = e.ns, r = this.propertiesByName;
        t && (this.assertNotDefined(e, n.name), this.assertNotDefined(e, n.localName)), r[n.name] = r[n.localName] = e
      }, n.prototype.removeNamedProperty = function (e) {
        var t = e.ns, n = this.propertiesByName;
        delete n[t.name], delete n[t.localName]
      }, n.prototype.setBodyProperty = function (e, t) {
        if (t && this.bodyProperty)throw new Error("body property defined multiple times (<" + this.bodyProperty.ns.name + ">, <" + e.ns.name + ">)");
        this.bodyProperty = e
      }, n.prototype.addIdProperty = function (e) {
        var t = o(e, this.ns.prefix), n = {name: t.localName, type: "String", isAttr: !0, ns: t};
        this.addProperty(n, 0)
      }, n.prototype.assertNotDefined = function (e) {
        var t = e.name, n = this.propertiesByName[t];
        if (n)throw new Error("property <" + t + "> already defined; override of <" + n.definedBy.ns.name + "#" + n.ns.name + "> by <" + e.definedBy.ns.name + "#" + e.ns.name + "> not allowed without redefines")
      }, n.prototype.hasProperty = function (e) {
        return this.propertiesByName[e]
      }, n.prototype.addTrait = function (e) {
        var t = this.allTypes;
        -1 === t.indexOf(e) && (a(e.properties, function (t) {
          t = i({}, t, {name: t.ns.localName}), Object.defineProperty(t, "definedBy", {value: e}), t.redefines ? this.redefineProperty(t) : (t.isBody && this.setBodyProperty(t), this.addProperty(t))
        }, this), t.push(e))
      }
    }, {159: 159, 164: 164, 27: 27, 80: 80}],
    25: [function (e, t) {
      function n(e, t) {
        this.model = e, this.properties = t
      }

      var r = e(80), i = e(23);
      t.exports = n, n.prototype.createType = function (e) {
        function t(e) {
          a.define(this, "$type", {
            value: s,
            enumerable: !0
          }), a.define(this, "$attrs", {value: {}}), a.define(this, "$parent", {writable: !0}), r(e, function (e, t) {
            this.set(t, e)
          }, this)
        }

        var n = this.model, a = this.properties, o = Object.create(i.prototype);
        r(e.properties, function (e) {
          e.isMany || void 0 === e["default"] || (o[e.name] = e["default"])
        }), a.defineModel(o, n), a.defineDescriptor(o, e);
        var s = e.ns.name;
        return t.prototype = o, t.hasType = o.$instanceOf = this.model.hasType, a.defineModel(t, n), a.defineDescriptor(t, e), t
      }
    }, {23: 23, 80: 80}],
    26: [function (e, t) {
      function n(e, t) {
        t = t || {}, this.properties = new l(this), this.factory = new s(this, this.properties), this.registry = new u(e, this.properties, t), this.typeCache = {}
      }

      var r = e(156), i = e(154), a = e(80), o = e(79), s = e(25), u = e(29), l = e(28), c = e(27).parseName;
      t.exports = n, n.prototype.create = function (e, t) {
        var n = this.getType(e);
        if (!n)throw new Error("unknown type <" + e + ">");
        return new n(t)
      }, n.prototype.getType = function (e) {
        var t = this.typeCache, n = r(e) ? e : e.ns.name, i = t[n];
        return i || (e = this.registry.getEffectiveDescriptor(n), i = t[n] = this.factory.createType(e)), i
      }, n.prototype.createAny = function (e, t, n) {
        var r = c(e), o = {$type: e}, s = {
          name: e,
          isGeneric: !0,
          ns: {prefix: r.prefix, localName: r.localName, uri: t}
        };
        return this.properties.defineDescriptor(o, s), this.properties.defineModel(o, this), this.properties.define(o, "$parent", {
          enumerable: !1,
          writable: !0
        }), a(n, function (e, t) {
          i(e) && void 0 !== e.value ? o[e.name] = e.value : o[t] = e
        }), o
      }, n.prototype.getPackage = function (e) {
        return this.registry.getPackage(e)
      }, n.prototype.getPackages = function () {
        return this.registry.getPackages()
      }, n.prototype.getElementDescriptor = function (e) {
        return e.$descriptor
      }, n.prototype.hasType = function (e, t) {
        void 0 === t && (t = e, e = this);
        var n = e.$model.getElementDescriptor(e);
        return !!o(n.allTypes, function (e) {
          return e.name === t
        })
      }, n.prototype.getPropertyDescriptor = function (e, t) {
        return this.getElementDescriptor(e).propertiesByName[t]
      }
    }, {154: 154, 156: 156, 25: 25, 27: 27, 28: 28, 29: 29, 79: 79, 80: 80}],
    27: [function (e, t) {
      t.exports.parseName = function (e, t) {
        var n, r, i = e.split(/:/);
        if (1 === i.length)n = e, r = t; else {
          if (2 !== i.length)throw new Error("expected <prefix:localName> or <localName>, got " + e);
          n = i[1], r = i[0]
        }
        return e = (r ? r + ":" : "") + n, {name: e, prefix: r, localName: n}
      }
    }, {}],
    28: [function (e, t) {
      function n(e) {
        this.model = e
      }

      t.exports = n, n.prototype.set = function (e, t, n) {
        var r = this.model.getPropertyDescriptor(e, t);
        r ? Object.defineProperty(e, r.name, {enumerable: !r.isReference, writable: !0, value: n}) : e.$attrs[t] = n
      }, n.prototype.get = function (e, t) {
        var n = this.model.getPropertyDescriptor(e, t);
        if (!n)return e.$attrs[t];
        var r = n.name;
        return !e[r] && n.isMany && Object.defineProperty(e, r, {
          enumerable: !n.isReference,
          writable: !0,
          value: []
        }), e[r]
      }, n.prototype.define = function (e, t, n) {
        Object.defineProperty(e, t, n)
      }, n.prototype.defineDescriptor = function (e, t) {
        this.define(e, "$descriptor", {value: t})
      }, n.prototype.defineModel = function (e, t) {
        this.define(e, "$model", {value: t})
      }
    }, {}],
    29: [function (e, t) {
      function n(e, t, n) {
        this.options = r({generateId: "id"}, n || {}), this.packageMap = {}, this.typeMap = {}, this.packages = [], this.properties = t, i(e, this.registerPackage, this)
      }

      var r = e(159), i = e(80), a = e(30), o = e(24), s = e(27).parseName, u = a.isBuiltIn;
      t.exports = n, n.prototype.getPackage = function (e) {
        return this.packageMap[e]
      }, n.prototype.getPackages = function () {
        return this.packages
      }, n.prototype.registerPackage = function (e) {
        e = r({}, e), i(e.types, function (t) {
          this.registerType(t, e)
        }, this), this.packageMap[e.uri] = this.packageMap[e.prefix] = e, this.packages.push(e)
      }, n.prototype.registerType = function (e, t) {
        e = r({}, e, {
          superClass: (e.superClass || []).slice(),
          "extends": (e["extends"] || []).slice(),
          properties: (e.properties || []).slice()
        });
        var n = s(e.name, t.prefix), a = n.name, o = {};
        i(e.properties, function (e) {
          var t = s(e.name, n.prefix), i = t.name;
          u(e.type) || (e.type = s(e.type, t.prefix).name), r(e, {ns: t, name: i}), o[i] = e
        }), r(e, {ns: n, name: a, propertiesByName: o}), i(e["extends"], function (e) {
          var t = this.typeMap[e];
          t.traits = t.traits || [], t.traits.push(a)
        }, this), this.definePackage(e, t), this.typeMap[a] = e
      }, n.prototype.mapTypes = function (e, t) {
        function n(n) {
          var r = s(n, u(n) ? "" : e.prefix);
          a.mapTypes(r, t)
        }

        var r = u(e.name) ? {name: e.name} : this.typeMap[e.name], a = this;
        if (!r)throw new Error("unknown type <" + e.name + ">");
        i(r.superClass, n), t(r), i(r.traits, n)
      }, n.prototype.getEffectiveDescriptor = function (e) {
        var t = s(e), n = new o(t);
        this.mapTypes(t, function (e) {
          n.addTrait(e)
        });
        var r = this.options.generateId;
        r && !n.hasProperty(r) && n.addIdProperty(r);
        var i = n.build();
        return this.definePackage(i, i.allTypes[i.allTypes.length - 1].$pkg), i
      }, n.prototype.definePackage = function (e, t) {
        this.properties.define(e, "$pkg", {value: t})
      }
    }, {159: 159, 24: 24, 27: 27, 30: 30, 80: 80}],
    30: [function (e, t) {
      var n = {String: !0, Boolean: !0, Integer: !0, Real: !0, Element: !0}, r = {
        String: function (e) {
          return e
        }, Boolean: function (e) {
          return "true" === e
        }, Integer: function (e) {
          return parseInt(e, 10)
        }, Real: function (e) {
          return parseFloat(e, 10)
        }
      };
      t.exports.coerceType = function (e, t) {
        var n = r[e];
        return n ? n(t) : t
      }, t.exports.isBuiltIn = function (e) {
        return !!n[e]
      }, t.exports.isSimple = function (e) {
        return !!r[e]
      }
    }, {}],
    31: [function (e, t) {
      t.exports = {
        name: "BPMN20",
        uri: "http://www.omg.org/spec/BPMN/20100524/MODEL",
        associations: [],
        types: [{
          name: "Interface",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "operations",
            type: "Operation",
            isMany: !0
          }, {name: "implementationRef", type: "String", isAttr: !0}]
        }, {
          name: "Operation",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "inMessageRef",
            type: "Message",
            isAttr: !0,
            isReference: !0
          }, {name: "outMessageRef", type: "Message", isAttr: !0, isReference: !0}, {
            name: "errorRefs",
            type: "Error",
            isMany: !0,
            isReference: !0
          }, {name: "implementationRef", type: "String", isAttr: !0}]
        }, {name: "EndPoint", superClass: ["RootElement"]}, {
          name: "Auditing",
          superClass: ["BaseElement"]
        }, {
          name: "GlobalTask",
          superClass: ["CallableElement"],
          properties: [{name: "resources", type: "ResourceRole", isMany: !0}]
        }, {name: "Monitoring", superClass: ["BaseElement"]}, {
          name: "Performer",
          superClass: ["ResourceRole"]
        }, {
          name: "Process",
          superClass: ["FlowElementsContainer", "CallableElement"],
          properties: [{name: "processType", type: "ProcessType", isAttr: !0}, {
            name: "isClosed",
            isAttr: !0,
            type: "Boolean"
          }, {name: "auditing", type: "Auditing"}, {name: "monitoring", type: "Monitoring"}, {
            name: "properties",
            type: "Property",
            isMany: !0
          }, {name: "supports", type: "Process", isMany: !0, isReference: !0}, {
            name: "definitionalCollaborationRef",
            type: "Collaboration",
            isAttr: !0,
            isReference: !0
          }, {name: "isExecutable", isAttr: !0, type: "Boolean"}, {
            name: "resources",
            type: "ResourceRole",
            isMany: !0
          }, {name: "artifacts", type: "Artifact", isMany: !0}, {
            name: "correlationSubscriptions",
            type: "CorrelationSubscription",
            isMany: !0
          }]
        }, {
          name: "LaneSet",
          superClass: ["BaseElement"],
          properties: [{name: "lanes", type: "Lane", isMany: !0}, {name: "name", isAttr: !0, type: "String"}]
        }, {
          name: "Lane",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "childLaneSet",
            type: "LaneSet",
            serialize: "xsi:type"
          }, {name: "partitionElementRef", type: "BaseElement", isAttr: !0, isReference: !0}, {
            name: "flowNodeRef",
            type: "FlowNode",
            isMany: !0,
            isReference: !0
          }, {name: "partitionElement", type: "BaseElement"}]
        }, {name: "GlobalManualTask", superClass: ["GlobalTask"]}, {
          name: "ManualTask",
          superClass: ["Task"]
        }, {
          name: "UserTask",
          superClass: ["Task"],
          properties: [{name: "renderings", type: "Rendering", isMany: !0}, {
            name: "implementation",
            isAttr: !0,
            type: "String"
          }]
        }, {name: "Rendering", superClass: ["BaseElement"]}, {
          name: "HumanPerformer",
          superClass: ["Performer"]
        }, {name: "PotentialOwner", superClass: ["HumanPerformer"]}, {
          name: "GlobalUserTask",
          superClass: ["GlobalTask"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}, {
            name: "renderings",
            type: "Rendering",
            isMany: !0
          }]
        }, {
          name: "Gateway",
          isAbstract: !0,
          superClass: ["FlowNode"],
          properties: [{name: "gatewayDirection", type: "GatewayDirection", "default": "Unspecified", isAttr: !0}]
        }, {
          name: "EventBasedGateway",
          superClass: ["Gateway"],
          properties: [{name: "instantiate", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "eventGatewayType",
            type: "EventBasedGatewayType",
            isAttr: !0,
            "default": "Exclusive"
          }]
        }, {
          name: "ComplexGateway",
          superClass: ["Gateway"],
          properties: [{name: "activationCondition", type: "Expression", serialize: "xsi:type"}, {
            name: "default",
            type: "SequenceFlow",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ExclusiveGateway",
          superClass: ["Gateway"],
          properties: [{name: "default", type: "SequenceFlow", isAttr: !0, isReference: !0}]
        }, {
          name: "InclusiveGateway",
          superClass: ["Gateway"],
          properties: [{name: "default", type: "SequenceFlow", isAttr: !0, isReference: !0}]
        }, {name: "ParallelGateway", superClass: ["Gateway"]}, {
          name: "RootElement",
          isAbstract: !0,
          superClass: ["BaseElement"]
        }, {
          name: "Relationship",
          superClass: ["BaseElement"],
          properties: [{name: "type", isAttr: !0, type: "String"}, {
            name: "direction",
            type: "RelationshipDirection",
            isAttr: !0
          }, {name: "sources", isMany: !0, isReference: !0, type: "Element"}, {
            name: "targets",
            isMany: !0,
            isReference: !0,
            type: "Element"
          }]
        }, {
          name: "BaseElement",
          isAbstract: !0,
          properties: [{name: "id", isAttr: !0, type: "String"}, {
            name: "extensionDefinitions",
            type: "ExtensionDefinition",
            isMany: !0,
            isReference: !0
          }, {name: "extensionElements", type: "ExtensionElements"}, {
            name: "documentation",
            type: "Documentation",
            isMany: !0
          }]
        }, {
          name: "Extension",
          properties: [{name: "mustUnderstand", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "definition",
            type: "ExtensionDefinition"
          }]
        }, {
          name: "ExtensionDefinition",
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "extensionAttributeDefinitions",
            type: "ExtensionAttributeDefinition",
            isMany: !0
          }]
        }, {
          name: "ExtensionAttributeDefinition",
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "type",
            isAttr: !0,
            type: "String"
          }, {name: "isReference", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "extensionDefinition",
            type: "ExtensionDefinition",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ExtensionElements",
          properties: [{name: "valueRef", isAttr: !0, isReference: !0, type: "Element"}, {
            name: "values",
            type: "Element",
            isMany: !0
          }, {name: "extensionAttributeDefinition", type: "ExtensionAttributeDefinition", isAttr: !0, isReference: !0}]
        }, {
          name: "Documentation",
          superClass: ["BaseElement"],
          properties: [{name: "text", type: "String", isBody: !0}, {
            name: "textFormat",
            "default": "text/plain",
            isAttr: !0,
            type: "String"
          }]
        }, {
          name: "Event",
          isAbstract: !0,
          superClass: ["FlowNode", "InteractionNode"],
          properties: [{name: "properties", type: "Property", isMany: !0}]
        }, {name: "IntermediateCatchEvent", superClass: ["CatchEvent"]}, {
          name: "IntermediateThrowEvent",
          superClass: ["ThrowEvent"]
        }, {name: "EndEvent", superClass: ["ThrowEvent"]}, {
          name: "StartEvent",
          superClass: ["CatchEvent"],
          properties: [{name: "isInterrupting", "default": !0, isAttr: !0, type: "Boolean"}]
        }, {
          name: "ThrowEvent",
          isAbstract: !0,
          superClass: ["Event"],
          properties: [{name: "inputSet", type: "InputSet"}, {
            name: "eventDefinitionRefs",
            type: "EventDefinition",
            isMany: !0,
            isReference: !0
          }, {name: "dataInputAssociation", type: "DataInputAssociation", isMany: !0}, {
            name: "dataInputs",
            type: "DataInput",
            isMany: !0
          }, {name: "eventDefinitions", type: "EventDefinition", isMany: !0}]
        }, {
          name: "CatchEvent",
          isAbstract: !0,
          superClass: ["Event"],
          properties: [{name: "parallelMultiple", isAttr: !0, type: "Boolean", "default": !1}, {
            name: "outputSet",
            type: "OutputSet"
          }, {
            name: "eventDefinitionRefs",
            type: "EventDefinition",
            isMany: !0,
            isReference: !0
          }, {name: "dataOutputAssociation", type: "DataOutputAssociation", isMany: !0}, {
            name: "dataOutputs",
            type: "DataOutput",
            isMany: !0
          }, {name: "eventDefinitions", type: "EventDefinition", isMany: !0}]
        }, {
          name: "BoundaryEvent",
          superClass: ["CatchEvent"],
          properties: [{name: "cancelActivity", "default": !0, isAttr: !0, type: "Boolean"}, {
            name: "attachedToRef",
            type: "Activity",
            isAttr: !0,
            isReference: !0
          }]
        }, {name: "EventDefinition", isAbstract: !0, superClass: ["RootElement"]}, {
          name: "CancelEventDefinition",
          superClass: ["EventDefinition"]
        }, {
          name: "ErrorEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "errorRef", type: "Error", isAttr: !0, isReference: !0}]
        }, {name: "TerminateEventDefinition", superClass: ["EventDefinition"]}, {
          name: "EscalationEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "escalationRef", type: "Escalation", isAttr: !0, isReference: !0}]
        }, {
          name: "Escalation",
          properties: [{name: "structureRef", type: "ItemDefinition", isAttr: !0, isReference: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }, {name: "escalationCode", isAttr: !0, type: "String"}],
          superClass: ["RootElement"]
        }, {
          name: "CompensateEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "waitForCompletion", isAttr: !0, type: "Boolean"}, {
            name: "activityRef",
            type: "Activity",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "TimerEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "timeDate", type: "Expression", serialize: "xsi:type"}, {
            name: "timeCycle",
            type: "Expression",
            serialize: "xsi:type"
          }, {name: "timeDuration", type: "Expression", serialize: "xsi:type"}]
        }, {
          name: "LinkEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "target",
            type: "LinkEventDefinition",
            isAttr: !0,
            isReference: !0
          }, {name: "source", type: "LinkEventDefinition", isMany: !0, isReference: !0}]
        }, {
          name: "MessageEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "messageRef", type: "Message", isAttr: !0, isReference: !0}, {
            name: "operationRef",
            type: "Operation",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ConditionalEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "condition", type: "Expression", serialize: "xsi:type"}]
        }, {
          name: "SignalEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "signalRef", type: "Signal", isAttr: !0, isReference: !0}]
        }, {
          name: "Signal",
          superClass: ["RootElement"],
          properties: [{name: "structureRef", type: "ItemDefinition", isAttr: !0, isReference: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }]
        }, {name: "ImplicitThrowEvent", superClass: ["ThrowEvent"]}, {
          name: "DataState",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}]
        }, {
          name: "ItemAwareElement",
          superClass: ["BaseElement"],
          properties: [{
            name: "itemSubjectRef",
            type: "ItemDefinition",
            isAttr: !0,
            isReference: !0
          }, {name: "dataState", type: "DataState"}]
        }, {
          name: "DataAssociation",
          superClass: ["BaseElement"],
          properties: [{name: "transformation", type: "FormalExpression"}, {
            name: "assignment",
            type: "Assignment",
            isMany: !0
          }, {name: "sourceRef", type: "ItemAwareElement", isMany: !0, isReference: !0}, {
            name: "targetRef",
            type: "ItemAwareElement",
            isReference: !0
          }]
        }, {
          name: "DataInput",
          superClass: ["ItemAwareElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "isCollection",
            "default": !1,
            isAttr: !0,
            type: "Boolean"
          }, {
            name: "inputSetRefs",
            type: "InputSet",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {
            name: "inputSetWithOptional",
            type: "InputSet",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {name: "inputSetWithWhileExecuting", type: "InputSet", isVirtual: !0, isMany: !0, isReference: !0}]
        }, {
          name: "DataOutput",
          superClass: ["ItemAwareElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "isCollection",
            "default": !1,
            isAttr: !0,
            type: "Boolean"
          }, {
            name: "outputSetRefs",
            type: "OutputSet",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {
            name: "outputSetWithOptional",
            type: "OutputSet",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {name: "outputSetWithWhileExecuting", type: "OutputSet", isVirtual: !0, isMany: !0, isReference: !0}]
        }, {
          name: "InputSet",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "dataInputRefs",
            type: "DataInput",
            isMany: !0,
            isReference: !0
          }, {
            name: "optionalInputRefs",
            type: "DataInput",
            isMany: !0,
            isReference: !0
          }, {name: "whileExecutingInputRefs", type: "DataInput", isMany: !0, isReference: !0}, {
            name: "outputSetRefs",
            type: "OutputSet",
            isMany: !0,
            isReference: !0
          }]
        }, {
          name: "OutputSet",
          superClass: ["BaseElement"],
          properties: [{name: "dataOutputRefs", type: "DataOutput", isMany: !0, isReference: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }, {name: "inputSetRefs", type: "InputSet", isMany: !0, isReference: !0}, {
            name: "optionalOutputRefs",
            type: "DataOutput",
            isMany: !0,
            isReference: !0
          }, {name: "whileExecutingOutputRefs", type: "DataOutput", isMany: !0, isReference: !0}]
        }, {
          name: "Property",
          superClass: ["ItemAwareElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}]
        }, {name: "DataInputAssociation", superClass: ["DataAssociation"]}, {
          name: "DataOutputAssociation",
          superClass: ["DataAssociation"]
        }, {
          name: "InputOutputSpecification",
          superClass: ["BaseElement"],
          properties: [{name: "inputSets", type: "InputSet", isMany: !0}, {
            name: "outputSets",
            type: "OutputSet",
            isMany: !0
          }, {name: "dataInputs", type: "DataInput", isMany: !0}, {name: "dataOutputs", type: "DataOutput", isMany: !0}]
        }, {
          name: "DataObject",
          superClass: ["FlowElement", "ItemAwareElement"],
          properties: [{name: "isCollection", "default": !1, isAttr: !0, type: "Boolean"}]
        }, {
          name: "InputOutputBinding",
          properties: [{name: "inputDataRef", type: "InputSet", isAttr: !0, isReference: !0}, {
            name: "outputDataRef",
            type: "OutputSet",
            isAttr: !0,
            isReference: !0
          }, {name: "operationRef", type: "Operation", isAttr: !0, isReference: !0}]
        }, {
          name: "Assignment",
          superClass: ["BaseElement"],
          properties: [{name: "from", type: "Expression", serialize: "xsi:type"}, {
            name: "to",
            type: "Expression",
            serialize: "xsi:type"
          }]
        }, {
          name: "DataStore",
          superClass: ["RootElement", "ItemAwareElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "capacity",
            isAttr: !0,
            type: "Integer"
          }, {name: "isUnlimited", "default": !0, isAttr: !0, type: "Boolean"}]
        }, {
          name: "DataStoreReference",
          superClass: ["ItemAwareElement", "FlowElement"],
          properties: [{name: "dataStoreRef", type: "DataStore", isAttr: !0, isReference: !0}]
        }, {
          name: "DataObjectReference",
          superClass: ["ItemAwareElement", "FlowElement"],
          properties: [{name: "dataObjectRef", type: "DataObject", isAttr: !0, isReference: !0}]
        }, {
          name: "ConversationLink",
          superClass: ["BaseElement"],
          properties: [{name: "sourceRef", type: "InteractionNode", isAttr: !0, isReference: !0}, {
            name: "targetRef",
            type: "InteractionNode",
            isAttr: !0,
            isReference: !0
          }, {name: "name", isAttr: !0, type: "String"}]
        }, {
          name: "ConversationAssociation",
          superClass: ["BaseElement"],
          properties: [{
            name: "innerConversationNodeRef",
            type: "ConversationNode",
            isAttr: !0,
            isReference: !0
          }, {name: "outerConversationNodeRef", type: "ConversationNode", isAttr: !0, isReference: !0}]
        }, {
          name: "CallConversation",
          superClass: ["ConversationNode"],
          properties: [{
            name: "calledCollaborationRef",
            type: "Collaboration",
            isAttr: !0,
            isReference: !0
          }, {name: "participantAssociations", type: "ParticipantAssociation", isMany: !0}]
        }, {name: "Conversation", superClass: ["ConversationNode"]}, {
          name: "SubConversation",
          superClass: ["ConversationNode"],
          properties: [{name: "conversationNodes", type: "ConversationNode", isMany: !0}]
        }, {
          name: "ConversationNode",
          isAbstract: !0,
          superClass: ["InteractionNode", "BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "participantRefs",
            type: "Participant",
            isMany: !0,
            isReference: !0
          }, {name: "messageFlowRefs", type: "MessageFlow", isMany: !0, isReference: !0}, {
            name: "correlationKeys",
            type: "CorrelationKey",
            isMany: !0
          }]
        }, {name: "GlobalConversation", superClass: ["Collaboration"]}, {
          name: "PartnerEntity",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "participantRef",
            type: "Participant",
            isMany: !0,
            isReference: !0
          }]
        }, {
          name: "PartnerRole",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "participantRef",
            type: "Participant",
            isMany: !0,
            isReference: !0
          }]
        }, {
          name: "CorrelationProperty",
          superClass: ["RootElement"],
          properties: [{
            name: "correlationPropertyRetrievalExpression",
            type: "CorrelationPropertyRetrievalExpression",
            isMany: !0
          }, {name: "name", isAttr: !0, type: "String"}, {
            name: "type",
            type: "ItemDefinition",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "Error",
          superClass: ["RootElement"],
          properties: [{name: "structureRef", type: "ItemDefinition", isAttr: !0, isReference: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }, {name: "errorCode", isAttr: !0, type: "String"}]
        }, {
          name: "CorrelationKey",
          superClass: ["BaseElement"],
          properties: [{
            name: "correlationPropertyRef",
            type: "CorrelationProperty",
            isMany: !0,
            isReference: !0
          }, {name: "name", isAttr: !0, type: "String"}]
        }, {name: "Expression", superClass: ["BaseElement"], isAbstract: !0}, {
          name: "FormalExpression",
          superClass: ["Expression"],
          properties: [{name: "language", isAttr: !0, type: "String"}, {
            name: "body",
            type: "String",
            isBody: !0
          }, {name: "evaluatesToTypeRef", type: "ItemDefinition", isAttr: !0, isReference: !0}]
        }, {
          name: "Message",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "itemRef",
            type: "ItemDefinition",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ItemDefinition",
          superClass: ["RootElement"],
          properties: [{name: "itemKind", type: "ItemKind", isAttr: !0}, {
            name: "structureRef",
            type: "String",
            isAttr: !0
          }, {name: "isCollection", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "import",
            type: "Import",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "FlowElement",
          isAbstract: !0,
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "auditing",
            type: "Auditing"
          }, {name: "monitoring", type: "Monitoring"}, {
            name: "categoryValueRef",
            type: "CategoryValue",
            isMany: !0,
            isReference: !0
          }]
        }, {
          name: "SequenceFlow",
          superClass: ["FlowElement"],
          properties: [{name: "isImmediate", isAttr: !0, type: "Boolean"}, {
            name: "conditionExpression",
            type: "Expression",
            serialize: "xsi:type"
          }, {name: "sourceRef", type: "FlowNode", isAttr: !0, isReference: !0}, {
            name: "targetRef",
            type: "FlowNode",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "FlowElementsContainer",
          isAbstract: !0,
          superClass: ["BaseElement"],
          properties: [{name: "laneSets", type: "LaneSet", isMany: !0}, {
            name: "flowElements",
            type: "FlowElement",
            isMany: !0
          }]
        }, {
          name: "CallableElement",
          isAbstract: !0,
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "ioSpecification",
            type: "InputOutputSpecification"
          }, {name: "supportedInterfaceRefs", type: "Interface", isMany: !0, isReference: !0}, {
            name: "ioBinding",
            type: "InputOutputBinding",
            isMany: !0
          }]
        }, {
          name: "FlowNode",
          isAbstract: !0,
          superClass: ["FlowElement"],
          properties: [{name: "incoming", type: "SequenceFlow", isMany: !0, isReference: !0}, {
            name: "outgoing",
            type: "SequenceFlow",
            isMany: !0,
            isReference: !0
          }, {name: "lanes", type: "Lane", isVirtual: !0, isMany: !0, isReference: !0}]
        }, {
          name: "CorrelationPropertyRetrievalExpression",
          superClass: ["BaseElement"],
          properties: [{name: "messagePath", type: "FormalExpression"}, {
            name: "messageRef",
            type: "Message",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "CorrelationPropertyBinding",
          superClass: ["BaseElement"],
          properties: [{name: "dataPath", type: "FormalExpression"}, {
            name: "correlationPropertyRef",
            type: "CorrelationProperty",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "Resource",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "resourceParameters",
            type: "ResourceParameter",
            isMany: !0
          }]
        }, {
          name: "ResourceParameter",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "isRequired",
            isAttr: !0,
            type: "Boolean"
          }, {name: "type", type: "ItemDefinition", isAttr: !0, isReference: !0}]
        }, {
          name: "CorrelationSubscription",
          superClass: ["BaseElement"],
          properties: [{
            name: "correlationKeyRef",
            type: "CorrelationKey",
            isAttr: !0,
            isReference: !0
          }, {name: "correlationPropertyBinding", type: "CorrelationPropertyBinding", isMany: !0}]
        }, {
          name: "MessageFlow",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "sourceRef",
            type: "InteractionNode",
            isAttr: !0,
            isReference: !0
          }, {name: "targetRef", type: "InteractionNode", isAttr: !0, isReference: !0}, {
            name: "messageRef",
            type: "Message",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "MessageFlowAssociation",
          superClass: ["BaseElement"],
          properties: [{
            name: "innerMessageFlowRef",
            type: "MessageFlow",
            isAttr: !0,
            isReference: !0
          }, {name: "outerMessageFlowRef", type: "MessageFlow", isAttr: !0, isReference: !0}]
        }, {
          name: "InteractionNode",
          isAbstract: !0,
          properties: [{
            name: "incomingConversationLinks",
            type: "ConversationLink",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {name: "outgoingConversationLinks", type: "ConversationLink", isVirtual: !0, isMany: !0, isReference: !0}]
        }, {
          name: "Participant",
          superClass: ["InteractionNode", "BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "interfaceRefs",
            type: "Interface",
            isMany: !0,
            isReference: !0
          }, {name: "participantMultiplicity", type: "ParticipantMultiplicity"}, {
            name: "endPointRefs",
            type: "EndPoint",
            isMany: !0,
            isReference: !0
          }, {name: "processRef", type: "Process", isAttr: !0, isReference: !0}]
        }, {
          name: "ParticipantAssociation",
          superClass: ["BaseElement"],
          properties: [{
            name: "innerParticipantRef",
            type: "Participant",
            isAttr: !0,
            isReference: !0
          }, {name: "outerParticipantRef", type: "Participant", isAttr: !0, isReference: !0}]
        }, {
          name: "ParticipantMultiplicity",
          properties: [{name: "minimum", "default": 0, isAttr: !0, type: "Integer"}, {
            name: "maximum",
            "default": 1,
            isAttr: !0,
            type: "Integer"
          }]
        }, {
          name: "Collaboration",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "isClosed",
            isAttr: !0,
            type: "Boolean"
          }, {name: "choreographyRef", type: "Choreography", isMany: !0, isReference: !0}, {
            name: "artifacts",
            type: "Artifact",
            isMany: !0
          }, {
            name: "participantAssociations",
            type: "ParticipantAssociation",
            isMany: !0
          }, {
            name: "messageFlowAssociations",
            type: "MessageFlowAssociation",
            isMany: !0
          }, {name: "conversationAssociations", type: "ConversationAssociation"}, {
            name: "participants",
            type: "Participant",
            isMany: !0
          }, {name: "messageFlows", type: "MessageFlow", isMany: !0}, {
            name: "correlationKeys",
            type: "CorrelationKey",
            isMany: !0
          }, {name: "conversations", type: "ConversationNode", isMany: !0}, {
            name: "conversationLinks",
            type: "ConversationLink",
            isMany: !0
          }]
        }, {
          name: "ChoreographyActivity",
          isAbstract: !0,
          superClass: ["FlowNode"],
          properties: [{
            name: "participantRefs",
            type: "Participant",
            isMany: !0,
            isReference: !0
          }, {
            name: "initiatingParticipantRef",
            type: "Participant",
            isAttr: !0,
            isReference: !0
          }, {name: "correlationKeys", type: "CorrelationKey", isMany: !0}, {
            name: "loopType",
            type: "ChoreographyLoopType",
            "default": "None",
            isAttr: !0
          }]
        }, {
          name: "CallChoreography",
          superClass: ["ChoreographyActivity"],
          properties: [{
            name: "calledChoreographyRef",
            type: "Choreography",
            isAttr: !0,
            isReference: !0
          }, {name: "participantAssociations", type: "ParticipantAssociation", isMany: !0}]
        }, {
          name: "SubChoreography",
          superClass: ["ChoreographyActivity", "FlowElementsContainer"],
          properties: [{name: "artifacts", type: "Artifact", isMany: !0}]
        }, {
          name: "ChoreographyTask",
          superClass: ["ChoreographyActivity"],
          properties: [{name: "messageFlowRef", type: "MessageFlow", isMany: !0, isReference: !0}]
        }, {
          name: "Choreography",
          superClass: ["FlowElementsContainer", "Collaboration"]
        }, {
          name: "GlobalChoreographyTask",
          superClass: ["Choreography"],
          properties: [{name: "initiatingParticipantRef", type: "Participant", isAttr: !0, isReference: !0}]
        }, {
          name: "TextAnnotation",
          superClass: ["Artifact"],
          properties: [{name: "text", type: "String"}, {
            name: "textFormat",
            "default": "text/plain",
            isAttr: !0,
            type: "String"
          }]
        }, {
          name: "Group",
          superClass: ["Artifact"],
          properties: [{name: "categoryValueRef", type: "CategoryValue", isAttr: !0, isReference: !0}]
        }, {
          name: "Association",
          superClass: ["Artifact"],
          properties: [{name: "associationDirection", type: "AssociationDirection", isAttr: !0}, {
            name: "sourceRef",
            type: "BaseElement",
            isAttr: !0,
            isReference: !0
          }, {name: "targetRef", type: "BaseElement", isAttr: !0, isReference: !0}]
        }, {
          name: "Category",
          superClass: ["RootElement"],
          properties: [{name: "categoryValue", type: "CategoryValue", isMany: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }]
        }, {name: "Artifact", isAbstract: !0, superClass: ["BaseElement"]}, {
          name: "CategoryValue",
          superClass: ["BaseElement"],
          properties: [{
            name: "categorizedFlowElements",
            type: "FlowElement",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {name: "value", isAttr: !0, type: "String"}]
        }, {
          name: "Activity",
          isAbstract: !0,
          superClass: ["FlowNode"],
          properties: [{
            name: "isForCompensation",
            "default": !1,
            isAttr: !0,
            type: "Boolean"
          }, {name: "loopCharacteristics", type: "LoopCharacteristics"}, {
            name: "resources",
            type: "ResourceRole",
            isMany: !0
          }, {name: "default", type: "SequenceFlow", isAttr: !0, isReference: !0}, {
            name: "properties",
            type: "Property",
            isMany: !0
          }, {name: "ioSpecification", type: "InputOutputSpecification"}, {
            name: "boundaryEventRefs",
            type: "BoundaryEvent",
            isMany: !0,
            isReference: !0
          }, {name: "dataInputAssociations", type: "DataInputAssociation", isMany: !0}, {
            name: "dataOutputAssociations",
            type: "DataOutputAssociation",
            isMany: !0
          }, {name: "startQuantity", "default": 1, isAttr: !0, type: "Integer"}, {
            name: "completionQuantity",
            "default": 1,
            isAttr: !0,
            type: "Integer"
          }]
        }, {
          name: "ServiceTask",
          superClass: ["Task"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}, {
            name: "operationRef",
            type: "Operation",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "SubProcess",
          superClass: ["Activity", "FlowElementsContainer"],
          properties: [{name: "triggeredByEvent", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "artifacts",
            type: "Artifact",
            isMany: !0
          }]
        }, {
          name: "LoopCharacteristics",
          isAbstract: !0,
          superClass: ["BaseElement"]
        }, {
          name: "MultiInstanceLoopCharacteristics",
          superClass: ["LoopCharacteristics"],
          properties: [{name: "isSequential", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "behavior",
            type: "MultiInstanceBehavior",
            "default": "All",
            isAttr: !0
          }, {name: "loopCardinality", type: "Expression", serialize: "xsi:type"}, {
            name: "loopDataInputRef",
            type: "ItemAwareElement",
            isAttr: !0,
            isReference: !0
          }, {name: "loopDataOutputRef", type: "ItemAwareElement", isAttr: !0, isReference: !0}, {
            name: "inputDataItem",
            type: "DataInput"
          }, {name: "outputDataItem", type: "DataOutput"}, {
            name: "completionCondition",
            type: "Expression",
            serialize: "xsi:type"
          }, {
            name: "complexBehaviorDefinition",
            type: "ComplexBehaviorDefinition",
            isMany: !0
          }, {
            name: "oneBehaviorEventRef",
            type: "EventDefinition",
            isAttr: !0,
            isReference: !0
          }, {name: "noneBehaviorEventRef", type: "EventDefinition", isAttr: !0, isReference: !0}]
        }, {
          name: "StandardLoopCharacteristics",
          superClass: ["LoopCharacteristics"],
          properties: [{name: "testBefore", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "loopCondition",
            type: "Expression",
            serialize: "xsi:type"
          }, {name: "loopMaximum", type: "Expression", serialize: "xsi:type"}]
        }, {
          name: "CallActivity",
          superClass: ["Activity"],
          properties: [{name: "calledElement", type: "String", isAttr: !0}]
        }, {name: "Task", superClass: ["Activity", "InteractionNode"]}, {
          name: "SendTask",
          superClass: ["Task"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}, {
            name: "operationRef",
            type: "Operation",
            isAttr: !0,
            isReference: !0
          }, {name: "messageRef", type: "Message", isAttr: !0, isReference: !0}]
        }, {
          name: "ReceiveTask",
          superClass: ["Task"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}, {
            name: "instantiate",
            "default": !1,
            isAttr: !0,
            type: "Boolean"
          }, {name: "operationRef", type: "Operation", isAttr: !0, isReference: !0}, {
            name: "messageRef",
            type: "Message",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ScriptTask",
          superClass: ["Task"],
          properties: [{name: "scriptFormat", isAttr: !0, type: "String"}, {name: "script", type: "String"}]
        }, {
          name: "BusinessRuleTask",
          superClass: ["Task"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}]
        }, {
          name: "AdHocSubProcess",
          superClass: ["SubProcess"],
          properties: [{name: "completionCondition", type: "Expression", serialize: "xsi:type"}, {
            name: "ordering",
            type: "AdHocOrdering",
            isAttr: !0
          }, {name: "cancelRemainingInstances", "default": !0, isAttr: !0, type: "Boolean"}]
        }, {
          name: "Transaction",
          superClass: ["SubProcess"],
          properties: [{name: "protocol", isAttr: !0, type: "String"}, {name: "method", isAttr: !0, type: "String"}]
        }, {
          name: "GlobalScriptTask",
          superClass: ["GlobalTask"],
          properties: [{name: "scriptLanguage", isAttr: !0, type: "String"}, {
            name: "script",
            isAttr: !0,
            type: "String"
          }]
        }, {
          name: "GlobalBusinessRuleTask",
          superClass: ["GlobalTask"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}]
        }, {
          name: "ComplexBehaviorDefinition",
          superClass: ["BaseElement"],
          properties: [{name: "condition", type: "FormalExpression"}, {name: "event", type: "ImplicitThrowEvent"}]
        }, {
          name: "ResourceRole",
          superClass: ["BaseElement"],
          properties: [{
            name: "resourceRef",
            type: "Resource",
            isAttr: !0,
            isReference: !0
          }, {
            name: "resourceParameterBindings",
            type: "ResourceParameterBinding",
            isMany: !0
          }, {name: "resourceAssignmentExpression", type: "ResourceAssignmentExpression"}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }]
        }, {
          name: "ResourceParameterBinding",
          properties: [{name: "expression", type: "Expression", serialize: "xsi:type"}, {
            name: "parameterRef",
            type: "ResourceParameter",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ResourceAssignmentExpression",
          properties: [{name: "expression", type: "Expression", serialize: "xsi:type"}]
        }, {
          name: "Import",
          properties: [{name: "importType", isAttr: !0, type: "String"}, {
            name: "location",
            isAttr: !0,
            type: "String"
          }, {name: "namespace", isAttr: !0, type: "String"}]
        }, {
          name: "Definitions",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "targetNamespace",
            isAttr: !0,
            type: "String"
          }, {
            name: "expressionLanguage",
            "default": "http://www.w3.org/1999/XPath",
            isAttr: !0,
            type: "String"
          }, {
            name: "typeLanguage",
            "default": "http://www.w3.org/2001/XMLSchema",
            isAttr: !0,
            type: "String"
          }, {name: "imports", type: "Import", isMany: !0}, {
            name: "extensions",
            type: "Extension",
            isMany: !0
          }, {name: "relationships", type: "Relationship", isMany: !0}, {
            name: "rootElements",
            type: "RootElement",
            isMany: !0
          }, {name: "diagrams", isMany: !0, type: "bpmndi:BPMNDiagram"}, {
            name: "exporter",
            isAttr: !0,
            type: "String"
          }, {name: "exporterVersion", isAttr: !0, type: "String"}]
        }],
        emumerations: [{
          name: "ProcessType",
          literalValues: [{name: "None"}, {name: "Public"}, {name: "Private"}]
        }, {
          name: "GatewayDirection",
          literalValues: [{name: "Unspecified"}, {name: "Converging"}, {name: "Diverging"}, {name: "Mixed"}]
        }, {
          name: "EventBasedGatewayType",
          literalValues: [{name: "Parallel"}, {name: "Exclusive"}]
        }, {
          name: "RelationshipDirection",
          literalValues: [{name: "None"}, {name: "Forward"}, {name: "Backward"}, {name: "Both"}]
        }, {
          name: "ItemKind",
          literalValues: [{name: "Physical"}, {name: "Information"}]
        }, {
          name: "ChoreographyLoopType",
          literalValues: [{name: "None"}, {name: "Standard"}, {name: "MultiInstanceSequential"}, {name: "MultiInstanceParallel"}]
        }, {
          name: "AssociationDirection",
          literalValues: [{name: "None"}, {name: "One"}, {name: "Both"}]
        }, {
          name: "MultiInstanceBehavior",
          literalValues: [{name: "None"}, {name: "One"}, {name: "All"}, {name: "Complex"}]
        }, {name: "AdHocOrdering", literalValues: [{name: "Parallel"}, {name: "Sequential"}]}],
        prefix: "bpmn",
        xml: {tagAlias: "lowerCase", typePrefix: "t"}
      }
    }, {}],
    32: [function (e, t) {
      t.exports = {
        name: "BPMNDI",
        uri: "http://www.omg.org/spec/BPMN/20100524/DI",
        types: [{
          name: "BPMNDiagram",
          properties: [{name: "plane", type: "BPMNPlane", redefines: "di:Diagram#rootElement"}, {
            name: "labelStyle",
            type: "BPMNLabelStyle",
            isMany: !0
          }],
          superClass: ["di:Diagram"]
        }, {
          name: "BPMNPlane",
          properties: [{
            name: "bpmnElement",
            isAttr: !0,
            isReference: !0,
            type: "bpmn:BaseElement",
            redefines: "di:DiagramElement#modelElement"
          }],
          superClass: ["di:Plane"]
        }, {
          name: "BPMNShape",
          properties: [{
            name: "bpmnElement",
            isAttr: !0,
            isReference: !0,
            type: "bpmn:BaseElement",
            redefines: "di:DiagramElement#modelElement"
          }, {name: "isHorizontal", isAttr: !0, type: "Boolean"}, {
            name: "isExpanded",
            isAttr: !0,
            type: "Boolean"
          }, {name: "isMarkerVisible", isAttr: !0, type: "Boolean"}, {
            name: "label",
            type: "BPMNLabel"
          }, {name: "isMessageVisible", isAttr: !0, type: "Boolean"}, {
            name: "participantBandKind",
            type: "ParticipantBandKind",
            isAttr: !0
          }, {name: "choreographyActivityShape", type: "BPMNShape", isAttr: !0, isReference: !0}],
          superClass: ["di:LabeledShape"]
        }, {
          name: "BPMNEdge",
          properties: [{name: "label", type: "BPMNLabel"}, {
            name: "bpmnElement",
            isAttr: !0,
            isReference: !0,
            type: "bpmn:BaseElement",
            redefines: "di:DiagramElement#modelElement"
          }, {
            name: "sourceElement",
            isAttr: !0,
            isReference: !0,
            type: "di:DiagramElement",
            redefines: "di:Edge#source"
          }, {
            name: "targetElement",
            isAttr: !0,
            isReference: !0,
            type: "di:DiagramElement",
            redefines: "di:Edge#target"
          }, {name: "messageVisibleKind", type: "MessageVisibleKind", isAttr: !0, "default": "initiating"}],
          superClass: ["di:LabeledEdge"]
        }, {
          name: "BPMNLabel",
          properties: [{
            name: "labelStyle",
            type: "BPMNLabelStyle",
            isAttr: !0,
            isReference: !0,
            redefines: "di:DiagramElement#style"
          }],
          superClass: ["di:Label"]
        }, {name: "BPMNLabelStyle", properties: [{name: "font", type: "dc:Font"}], superClass: ["di:Style"]}],
        emumerations: [{
          name: "ParticipantBandKind",
          literalValues: [{name: "top_initiating"}, {name: "middle_initiating"}, {name: "bottom_initiating"}, {name: "top_non_initiating"}, {name: "middle_non_initiating"}, {name: "bottom_non_initiating"}]
        }, {name: "MessageVisibleKind", literalValues: [{name: "initiating"}, {name: "non_initiating"}]}],
        associations: [],
        prefix: "bpmndi"
      }
    }, {}],
    33: [function (e, t) {
      t.exports = {
        name: "DC",
        uri: "http://www.omg.org/spec/DD/20100524/DC",
        types: [{name: "Boolean"}, {name: "Integer"}, {name: "Real"}, {name: "String"}, {
          name: "Font",
          properties: [{name: "name", type: "String", isAttr: !0}, {
            name: "size",
            type: "Real",
            isAttr: !0
          }, {name: "isBold", type: "Boolean", isAttr: !0}, {
            name: "isItalic",
            type: "Boolean",
            isAttr: !0
          }, {name: "isUnderline", type: "Boolean", isAttr: !0}, {name: "isStrikeThrough", type: "Boolean", isAttr: !0}]
        }, {
          name: "Point",
          properties: [{name: "x", type: "Real", "default": "0", isAttr: !0}, {
            name: "y",
            type: "Real",
            "default": "0",
            isAttr: !0
          }]
        }, {
          name: "Bounds",
          properties: [{name: "x", type: "Real", "default": "0", isAttr: !0}, {
            name: "y",
            type: "Real",
            "default": "0",
            isAttr: !0
          }, {name: "width", type: "Real", isAttr: !0}, {name: "height", type: "Real", isAttr: !0}]
        }],
        prefix: "dc",
        associations: []
      }
    }, {}],
    34: [function (e, t) {
      t.exports = {
        name: "DI",
        uri: "http://www.omg.org/spec/DD/20100524/DI",
        types: [{
          name: "DiagramElement",
          isAbstract: !0,
          properties: [{name: "extension", type: "Extension"}, {
            name: "owningDiagram",
            type: "Diagram",
            isReadOnly: !0,
            isVirtual: !0,
            isReference: !0
          }, {
            name: "owningElement",
            type: "DiagramElement",
            isReadOnly: !0,
            isVirtual: !0,
            isReference: !0
          }, {name: "modelElement", isReadOnly: !0, isVirtual: !0, isReference: !0, type: "Element"}, {
            name: "style",
            type: "Style",
            isReadOnly: !0,
            isVirtual: !0,
            isReference: !0
          }, {name: "ownedElement", type: "DiagramElement", isReadOnly: !0, isVirtual: !0, isMany: !0}]
        }, {name: "Node", isAbstract: !0, superClass: ["DiagramElement"]}, {
          name: "Edge",
          isAbstract: !0,
          superClass: ["DiagramElement"],
          properties: [{
            name: "source",
            type: "DiagramElement",
            isReadOnly: !0,
            isVirtual: !0,
            isReference: !0
          }, {
            name: "target",
            type: "DiagramElement",
            isReadOnly: !0,
            isVirtual: !0,
            isReference: !0
          }, {name: "waypoint", isUnique: !1, isMany: !0, type: "dc:Point", serialize: "xsi:type"}]
        }, {
          name: "Diagram",
          isAbstract: !0,
          properties: [{name: "rootElement", type: "DiagramElement", isReadOnly: !0, isVirtual: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }, {name: "documentation", isAttr: !0, type: "String"}, {
            name: "resolution",
            isAttr: !0,
            type: "Real"
          }, {name: "ownedStyle", type: "Style", isReadOnly: !0, isVirtual: !0, isMany: !0}]
        }, {
          name: "Shape",
          isAbstract: !0,
          superClass: ["Node"],
          properties: [{name: "bounds", type: "dc:Bounds"}]
        }, {
          name: "Plane",
          isAbstract: !0,
          superClass: ["Node"],
          properties: [{
            name: "planeElement",
            type: "DiagramElement",
            subsettedProperty: "DiagramElement-ownedElement",
            isMany: !0
          }]
        }, {
          name: "LabeledEdge",
          isAbstract: !0,
          superClass: ["Edge"],
          properties: [{
            name: "ownedLabel",
            type: "Label",
            isReadOnly: !0,
            subsettedProperty: "DiagramElement-ownedElement",
            isVirtual: !0,
            isMany: !0
          }]
        }, {
          name: "LabeledShape",
          isAbstract: !0,
          superClass: ["Shape"],
          properties: [{
            name: "ownedLabel",
            type: "Label",
            isReadOnly: !0,
            subsettedProperty: "DiagramElement-ownedElement",
            isVirtual: !0,
            isMany: !0
          }]
        }, {
          name: "Label",
          isAbstract: !0,
          superClass: ["Node"],
          properties: [{name: "bounds", type: "dc:Bounds"}]
        }, {name: "Style", isAbstract: !0}, {
          name: "Extension",
          properties: [{name: "values", type: "Element", isMany: !0}]
        }],
        associations: [],
        prefix: "di",
        xml: {tagAlias: "lowerCase"}
      }
    }, {}],
    35: [function (e, t) {
      t.exports = e(36)
    }, {36: 36}],
    36: [function (e, t) {
      function n(e) {
        function t(e) {
          return i.indexOf(e) >= 0
        }

        function n(e) {
          i.push(e)
        }

        function r(e) {
          t(e) || ((e.__depends__ || []).forEach(r), t(e) || (n(e), (e.__init__ || []).forEach(function (e) {
            o.push(e)
          })))
        }

        var i = [], o = [];
        e.forEach(r);
        var s = new a.Injector(i);
        return o.forEach(function (e) {
          try {
            s["string" == typeof e ? "get" : "invoke"](e)
          } catch (t) {
            throw console.error("Failed to instantiate component"), console.error(t.stack), t
          }
        }), s
      }

      function r(t) {
        t = t || {};
        var r = {config: ["value", t]}, i = e(42), a = [r, i].concat(t.modules || []);
        return n(a)
      }

      function i(e, t) {
        this.injector = t = t || r(e), this.get = t.get, this.invoke = t.invoke, this.get("eventBus").fire("diagram.init")
      }

      var a = e(73);
      t.exports = i, i.prototype.destroy = function () {
        this.get("eventBus").fire("diagram.destroy")
      }
    }, {42: 42, 73: 73}],
    37: [function (e, t) {
      function n(e, t) {
        return Math.round(e * t) / t
      }

      function r(e) {
        return u(e) ? e + "px" : e
      }

      function i(e) {
        e = l({}, {width: "100%", height: "100%"}, e);
        var t = e.container || document.body, n = document.createElement("div");
        return n.setAttribute("class", "djs-container"), l(n.style, {
          position: "relative",
          overflow: "hidden",
          width: r(e.width),
          height: r(e.height)
        }), t.appendChild(n), n
      }

      function a(e, t) {
        return e.group().attr({"class": t})
      }

      function o(e, t, n, r) {
        this._eventBus = t, this._elementRegistry = r, this._graphicsFactory = n, this._init(e || {})
      }

      function s(e, t) {
        var n = "matrix(" + t.a + "," + t.b + "," + t.c + "," + t.d + "," + t.e + "," + t.f + ")";
        e.setAttribute("transform", n)
      }

      var u = e(153), l = e(159), c = e(80), p = e(62), d = e(71), f = "base";
      o.$inject = ["config.canvas", "eventBus", "graphicsFactory", "elementRegistry"], t.exports = o, o.prototype._init = function (e) {
        var t = this._eventBus, n = i(e), r = d.createSnapAt("100%", "100%", n), o = a(r, "viewport"), s = this;
        this._container = n, this._svg = r, this._viewport = o, this._layers = {}, t.on("diagram.init", function () {
          t.fire("canvas.init", {svg: r, viewport: o})
        }), t.on("diagram.destroy", function () {
          var e = s._container.parentNode;
          e && e.removeChild(n), t.fire("canvas.destroy", {
            svg: s._svg,
            viewport: s._viewport
          }), s._svg.remove(), s._svg = s._container = s._layers = s._viewport = null
        })
      }, o.prototype.getDefaultLayer = function () {
        return this.getLayer(f)
      }, o.prototype.getLayer = function (e) {
        if (!e)throw new Error("must specify a name");
        var t = this._layers[e];
        return t || (t = this._layers[e] = a(this._viewport, "layer-" + e)), t
      }, o.prototype.getContainer = function () {
        return this._container
      }, o.prototype._updateMarker = function (e, t, n) {
        var r;
        e.id || (e = this._elementRegistry.get(e)), r = this.getGraphics(e), r && (r[n ? "addClass" : "removeClass"](t), this._eventBus.fire("element.marker.update", {
          element: e,
          gfx: r,
          marker: t,
          add: !!n
        }))
      }, o.prototype.addMarker = function (e, t) {
        this._updateMarker(e, t, !0)
      }, o.prototype.removeMarker = function (e, t) {
        this._updateMarker(e, t, !1)
      }, o.prototype.hasMarker = function (e, t) {
        e.id || (e = this._elementRegistry.get(e));
        var n = this.getGraphics(e);
        return n && n.hasClass(t)
      }, o.prototype.toggleMarker = function (e, t) {
        this.hasMarker(e, t) ? this.removeMarker(e, t) : this.addMarker(e, t)
      }, o.prototype.getRootElement = function () {
        return this._rootElement || this.setRootElement({id: "__implicitroot"}), this._rootElement
      }, o.prototype.setRootElement = function (e, t) {
        var n = this._rootElement, r = this._elementRegistry;
        if (n) {
          if (!t)throw new Error("rootElement already defined");
          r.remove(n)
        }
        return r.add(e, this.getDefaultLayer(), this._svg), this._rootElement = e, e
      }, o.prototype._ensureValidId = function (e) {
        if (!e.id)throw new Error("element must have an id");
        if (this._elementRegistry.get(e.id))throw new Error("element with id " + e.id + " already exists")
      }, o.prototype._setParent = function (e, t) {
        p.add(t.children, e), e.parent = t
      }, o.prototype._addElement = function (e, t, n) {
        n = n || this.getRootElement();
        var r = this._eventBus, i = this._graphicsFactory;
        this._ensureValidId(t), r.fire(e + ".add", {element: t, parent: n}), this._setParent(t, n);
        var a = i.create(e, t);
        return this._elementRegistry.add(t, a), i.update(e, t, a), r.fire(e + ".added", {element: t, gfx: a}), t
      }, o.prototype.addShape = function (e, t) {
        return this._addElement("shape", e, t)
      }, o.prototype.addConnection = function (e, t) {
        return this._addElement("connection", e, t)
      }, o.prototype._removeElement = function (e, t) {
        var n = this._elementRegistry, r = this._graphicsFactory, i = this._eventBus;
        return (e = n.get(e.id || e)) ? (i.fire(t + ".remove", {element: e}), r.remove(e), p.remove(e.parent && e.parent.children, e), e.parent = null, i.fire(t + ".removed", {element: e}), n.remove(e), e) : void 0
      }, o.prototype.removeShape = function (e) {
        return this._removeElement(e, "shape")
      }, o.prototype.removeConnection = function (e) {
        return this._removeElement(e, "connection")
      }, o.prototype.sendToFront = function (e, t) {
        t !== !1 && (t = !0), t && e.parent && this.sendToFront(e.parent), c(e.children, function (e) {
          this.sendToFront(e, !1)
        }, this);
        var n = this.getGraphics(e), r = n.parent();
        n.remove().appendTo(r)
      }, o.prototype.getGraphics = function (e) {
        return this._elementRegistry.getGraphics(e)
      }, o.prototype._fireViewboxChange = function () {
        this._eventBus.fire("canvas.viewbox.changed", {viewbox: this.viewbox(!1)})
      }, o.prototype.viewbox = function (e) {
        if (void 0 === e && this._cachedViewbox)return this._cachedViewbox;
        var t, r, i, a, o, s = this._viewport, u = this.getSize();
        return e ? (i = Math.min(u.width / e.width, u.height / e.height), r = (new d.Matrix).scale(i).translate(-e.x, -e.y), s.transform(r), this._fireViewboxChange(), e) : (t = this.getDefaultLayer().getBBox(!0), r = s.transform().localMatrix, i = n(r.a, 1e3), a = n(-r.e || 0, 1e3), o = n(-r.f || 0, 1e3), e = this._cachedViewbox = {
          x: a ? a / i : 0,
          y: o ? o / i : 0,
          width: u.width / i,
          height: u.height / i,
          scale: i,
          inner: {width: t.width, height: t.height, x: t.x, y: t.y},
          outer: u
        })
      }, o.prototype.scroll = function (e) {
        var t = this._viewport.node, n = t.getCTM();
        return e && (e = l({
          dx: 0,
          dy: 0
        }, e || {}), n = this._svg.node.createSVGMatrix().translate(e.dx, e.dy).multiply(n), s(t, n), this._fireViewboxChange()), {
          x: n.e,
          y: n.f
        }
      }, o.prototype.zoom = function (e, t) {
        if ("fit-viewport" === e)return this._fitViewport(t);
        var r = this.viewbox();
        if (void 0 === e)return r.scale;
        var i = r.outer;
        "auto" === t && (t = {x: i.width / 2, y: i.height / 2});
        var a = this._setZoom(e, t);
        return this._fireViewboxChange(), n(a.a, 1e3)
      }, o.prototype._fitViewport = function (e) {
        var t, n, r = this.viewbox(), i = r.outer, a = r.inner;
        return a.x >= 0 && a.y >= 0 && a.x + a.width <= i.width && a.y + a.height <= i.height && !e ? n = {
          x: 0,
          y: 0,
          width: Math.max(a.width + a.x, i.width),
          height: Math.max(a.height + a.y, i.height)
        } : (t = Math.min(1, i.width / a.width, i.height / a.height), n = {
          x: a.x + (e ? a.width / 2 - i.width / t / 2 : 0),
          y: a.y + (e ? a.height / 2 - i.height / t / 2 : 0),
          width: i.width / t,
          height: i.height / t
        }), this.viewbox(n), this.viewbox().scale
      }, o.prototype._setZoom = function (e, t) {
        var n, r, i, a, o, u = this._svg.node, c = this._viewport.node, p = u.createSVGMatrix(), d = u.createSVGPoint();
        i = c.getCTM();
        var f = i.a;
        return t ? (n = l(d, t), r = n.matrixTransform(i.inverse()), a = p.translate(r.x, r.y).scale(1 / f * e).translate(-r.x, -r.y), o = i.multiply(a)) : o = p.scale(e), s(this._viewport.node, o), o
      }, o.prototype.getSize = function () {
        return {width: this._container.clientWidth, height: this._container.clientHeight}
      }, o.prototype.getAbsoluteBBox = function (e) {
        var t, n = this.viewbox();
        if (e.waypoints) {
          var r = this.getGraphics(e), i = r.getBBox(!0);
          t = r.getBBox(), t.x -= i.x, t.y -= i.y, t.width += 2 * i.x, t.height += 2 * i.y
        } else t = e;
        var a = t.x * n.scale - n.x * n.scale, o = t.y * n.scale - n.y * n.scale, s = t.width * n.scale, u = t.height * n.scale;
        return {x: a, y: o, width: s, height: u}
      }
    }, {153: 153, 159: 159, 62: 62, 71: 71, 80: 80}],
    38: [function (e, t) {
      function n() {
        this._uid = 12
      }

      var r = e(56);
      t.exports = n, n.prototype.createRoot = function (e) {
        return this.create("root", e)
      }, n.prototype.createLabel = function (e) {
        return this.create("label", e)
      }, n.prototype.createShape = function (e) {
        return this.create("shape", e)
      }, n.prototype.createConnection = function (e) {
        return this.create("connection", e)
      }, n.prototype.create = function (e, t) {
        return t = t || {}, t.id || (t.id = e + "_" + this._uid++), r.create(e, t)
      }
    }, {56: 56}],
    39: [function (e, t) {
      function n() {
        this._elements = {}
      }

      var r = "data-element-id";
      t.exports = n, n.prototype.add = function (e, t, n) {
        var i = e.id;
        if (!i)throw new Error("element must have an id");
        if (this._elements[i])throw new Error("element with id " + i + " already added");
        t.attr(r, i), n && n.attr(r, i), this._elements[i] = {element: e, gfx: t, secondaryGfx: n}
      }, n.prototype.remove = function (e) {
        var t = this._elements, n = e.id || e, i = n && t[n];
        i && (i.gfx.attr(r, null), i.secondaryGfx && i.secondaryGfx.attr(r, null), delete t[n])
      }, n.prototype.get = function (e) {
        var t;
        t = "string" == typeof e ? e : e && e.attr(r);
        var n = this._elements[t];
        return n && n.element
      }, n.prototype.filter = function (e) {
        var t = this._elements, n = [];
        return Object.keys(t).forEach(function (r) {
          var i = t[r], a = i.element, o = i.gfx;
          e(a, o) && n.push(a)
        }), n
      }, n.prototype.getGraphics = function (e) {
        var t = e.id || e, n = this._elements[t];
        return n && n.gfx
      }
    }, {}],
    40: [function (e, t) {
      function n() {
      }

      function r() {
        this._listeners = {};
        var e = this;
        this.on("diagram.destroy", 1, function () {
          e._listeners = null
        })
      }

      var i = e(151), a = e(150), o = e(153), s = e(159), u = 1e3;
      n.prototype = {
        stopPropagation: function () {
          this.propagationStopped = !0
        }, preventDefault: function () {
          this.defaultPrevented = !0
        }, init: function (e) {
          s(this, e || {})
        }
      }, t.exports = r, t.exports.Event = n, r.prototype.on = function (e, t, n) {
        if (e = a(e) ? e : [e], i(t) && (n = t, t = u), !o(t))throw new Error("priority must be a number");
        var r = this, s = {priority: t, callback: n};
        e.forEach(function (e) {
          r._addListener(e, s)
        })
      }, r.prototype.once = function (e, t) {
        function n() {
          t.apply(r, arguments), r.off(e, n)
        }

        var r = this;
        this.on(e, n)
      }, r.prototype.off = function (e, t) {
        var n, r, i = this._getListeners(e);
        if (t)for (r = i.length - 1; n = i[r]; r--)n.callback === t && i.splice(r, 1); else i.length = 0
      }, r.prototype.fire = function (e, t) {
        var r, i, a, o, s, u;
        if (u = Array.prototype.slice.call(arguments), "string" == typeof e ? u.shift() : (r = e, e = r.type), !e)throw new Error("no event type specified");
        if (a = this._listeners[e], !a)return !0;
        t instanceof n ? r = t : (r = Object.create(n.prototype), r.init(t)), u[0] = r, i = r.type;
        try {
          for (e !== i && (r.type = e), o = 0, s; (s = a[o]) && !r.propagationStopped; o++)try {
            s.callback.apply(null, u) === !1 && r.preventDefault()
          } catch (l) {
            if (!this.handleError(l))throw console.error("unhandled error in event listener"), console.error(l.stack), l
          }
        } finally {
          e !== i && (r.type = i)
        }
        return r.defaultPrevented ? !1 : r.propagationStopped ? null : !0
      }, r.prototype.handleError = function (e) {
        return !this.fire("error", {error: e})
      }, r.prototype._addListener = function (e, t) {
        var n, r, i = this._getListeners(e);
        for (n = 0; r = i[n]; n++)if (r.priority < t.priority)return void i.splice(n, 0, t);
        i.push(t)
      }, r.prototype._getListeners = function (e) {
        var t = this._listeners[e];
        return t || (this._listeners[e] = t = []), t
      }
    }, {150: 150, 151: 151, 153: 153, 159: 159}],
    41: [function (e, t) {
      function n(e, t) {
        this._renderer = e, this._elementRegistry = t
      }

      var r = e(80), i = e(84), a = e(66), o = e(171);
      n.$inject = ["renderer", "elementRegistry"], t.exports = n, n.prototype._getChildren = function (e) {
        var t, n = this._elementRegistry.getGraphics(e);
        return e.parent ? (t = a.getChildren(n), t || (t = n.parent().group().attr("class", "djs-children"))) : t = n, t
      }, n.prototype._clear = function (e) {
        var t = a.getVisual(e);
        return o(t.node), t
      }, n.prototype._createContainer = function (e, t) {
        var n = t.group().attr("class", "djs-group"), r = n.group().attr("class", "djs-element djs-" + e);
        return r.group().attr("class", "djs-visual"), r
      }, n.prototype.create = function (e, t) {
        var n = this._getChildren(t.parent);
        return this._createContainer(e, n)
      }, n.prototype.updateContainments = function (e) {
        var t, n = this, a = this._elementRegistry;
        t = i(e, function (e, t) {
          return t.parent && (e[t.parent.id] = t.parent), e
        }, {}), r(t, function (e) {
          var t = n._getChildren(e), i = e.children;
          i && r(i.slice().reverse(), function (e) {
            var n = a.getGraphics(e);
            n.parent().prependTo(t)
          })
        })
      }, n.prototype.update = function (e, t, n) {
        var r = this._clear(n);
        if ("shape" === e)this._renderer.drawShape(r, t), n.translate(t.x, t.y); else {
          if ("connection" !== e)throw new Error("unknown type: " + e);
          this._renderer.drawConnection(r, t)
        }
        n.attr("display", t.hidden ? "none" : "block")
      }, n.prototype.remove = function (e) {
        var t = this._elementRegistry.getGraphics(e);
        t.parent().remove()
      }
    }, {171: 171, 66: 66, 80: 80, 84: 84}],
    42: [function (e, t) {
      t.exports = {
        __depends__: [e(45)],
        __init__: ["canvas"],
        canvas: ["type", e(37)],
        elementRegistry: ["type", e(39)],
        elementFactory: ["type", e(38)],
        eventBus: ["type", e(40)],
        graphicsFactory: ["type", e(41)]
      }
    }, {37: 37, 38: 38, 39: 39, 40: 40, 41: 41, 45: 45}],
    43: [function (e, t) {
      function n(e) {
        this.CONNECTION_STYLE = e.style(["no-fill"], {
          strokeWidth: 5,
          stroke: "fuchsia"
        }), this.SHAPE_STYLE = e.style({fill: "white", stroke: "fuchsia", strokeWidth: 2})
      }

      function r(e) {
        for (var t, n = "", r = 0; t = e[r]; r++)n += t.x + "," + t.y + " ";
        return n
      }

      function i(e, t) {
        return o.create("polyline", {points: r(e)}).attr(t || {})
      }

      function a(e, t) {
        return e.attr({points: r(t)})
      }

      var o = e(71);
      t.exports = n, n.$inject = ["styles"], n.prototype.drawShape = function (e, t) {
        return e.rect(0, 0, t.width || 0, t.height || 0, 10, 10).attr(this.SHAPE_STYLE)
      }, n.prototype.drawConnection = function (e, t) {
        return i(t.waypoints, this.CONNECTION_STYLE).appendTo(e)
      }, t.exports.createLine = i, t.exports.updateLine = a
    }, {71: 71}],
    44: [function (e, t) {
      function n() {
        var e = {"no-fill": {fill: "none"}, "no-border": {strokeOpacity: 0}, "no-events": {pointerEvents: "none"}};
        this.cls = function (e, t, n) {
          var r = this.style(t, n);
          return i(r, {"class": e})
        }, this.style = function (t, n) {
          r(t) || n || (n = t, t = []);
          var o = a(t, function (t, n) {
            return i(t, e[n] || {})
          }, {});
          return n ? i(o, n) : o
        }
      }

      var r = e(150), i = e(159), a = e(84);
      t.exports = n
    }, {150: 150, 159: 159, 84: 84}],
    45: [function (e, t) {
      t.exports = {renderer: ["type", e(43)], styles: ["type", e(44)]}
    }, {43: 43, 44: 44}],
    46: [function (e, t) {
      function n(e, t, n) {
        function a(n, r) {
          var i, a = r.delegateTarget || r.target, o = a && new u(a), s = t.get(o);
          o && s && (i = !e.fire(n, {element: s, gfx: o, originalEvent: r}), i && r.preventDefault())
        }

        function l(e) {
          var t = m[e];
          return t || (t = m[e] = function (t) {
            t.button || a(e, t)
          }), t
        }

        function c(e, t, n) {
          var r = l(n);
          r.$delegate = i.bind(e, v, t, r)
        }

        function p(e, t, n) {
          i.unbind(e, t, l(n).$delegate)
        }

        function d(e) {
          r(g, function (t, n) {
            c(e.node, n, t)
          })
        }

        function f(e) {
          r(g, function (t, n) {
            p(e.node, n, t)
          })
        }

        var h = n.cls("djs-hit", ["no-fill", "no-border"], {
          stroke: "white",
          strokeWidth: 15
        }), m = {}, g = {
          mouseover: "element.hover",
          mouseout: "element.out",
          click: "element.click",
          dblclick: "element.dblclick",
          mousedown: "element.mousedown",
          mouseup: "element.mouseup"
        }, v = "svg, .djs-element";
        e.on("canvas.destroy", function (e) {
          f(e.svg)
        }), e.on("canvas.init", function (e) {
          d(e.svg)
        }), e.on(["shape.added", "connection.added"], function (e) {
          var t, n, r = e.element, i = e.gfx;
          r.waypoints ? (t = o(r.waypoints), n = "connection") : (t = u.create("rect", {
            x: 0,
            y: 0,
            width: r.width,
            height: r.height
          }), n = "shape"), t.attr(h).appendTo(i.node)
        }), e.on("shape.changed", function (e) {
          var t = e.element, n = e.gfx, r = n.select(".djs-hit");
          r.attr({width: t.width, height: t.height})
        }), e.on("connection.changed", function (e) {
          var t = e.element, n = e.gfx, r = n.select(".djs-hit");
          s(r, t.waypoints)
        }), this.fire = a, this.mouseHandler = l, this.registerEvent = c, this.unregisterEvent = p
      }

      var r = e(80), i = e(172), a = e(43), o = a.createLine, s = a.updateLine, u = e(71);
      n.$inject = ["eventBus", "elementRegistry", "styles"], t.exports = n
    }, {172: 172, 43: 43, 71: 71, 80: 80}],
    47: [function (e, t) {
      t.exports = {__init__: ["interactionEvents"], interactionEvents: ["type", e(46)]}
    }, {46: 46}],
    48: [function (e, t) {
      function n(e, t) {
        function n(e) {
          return r.create("rect", u).prependTo(e)
        }

        function a(e, t) {
          e.attr({x: -s, y: -s, width: t.width + 2 * s, height: t.height + 2 * s})
        }

        function o(e, t) {
          var n = i(t);
          e.attr({x: n.x - s, y: n.y - s, width: n.width + 2 * s, height: n.height + 2 * s})
        }

        var s = 6, u = t.cls("djs-outline", ["no-fill"]);
        e.on(["shape.added", "shape.changed"], function (e) {
          var t = e.element, r = e.gfx, i = r.select(".djs-outline");
          i || (i = n(r, t)), a(i, t)
        }), e.on(["connection.added", "connection.changed"], function (e) {
          var t = e.element, r = e.gfx, i = r.select(".djs-outline");
          i || (i = n(r, t)), o(i, t)
        })
      }

      var r = e(71), i = e(64).getBBox;
      n.$inject = ["eventBus", "styles", "elementRegistry"], t.exports = n
    }, {64: 64, 71: 71}],
    49: [function (e, t) {
      t.exports = {__init__: ["outline"], outline: ["type", e(48)]}
    }, {48: 48}],
    50: [function (e, t) {
      function n(e) {
        var t = f('<div class="djs-overlay-container" style="position: absolute; width: 0; height: 0;" />');
        return e.insertBefore(t, e.firstChild), t
      }

      function r(e, t, n) {
        l(e.style, {left: t + "px", top: n + "px"})
      }

      function i(e, t) {
        e.style.display = t === !1 ? "none" : ""
      }

      function a(e, t, r, i) {
        this._eventBus = t, this._canvas = r, this._elementRegistry = i, this._ids = v, this._overlayDefaults = {
          show: {
            trigger: "automatic",
            minZoom: .7,
            maxZoom: 5
          }
        }, this._overlays = {}, this._overlayContainers = {}, this._overlayRoot = n(r.getContainer()), this._init(e)
      }

      var o = e(150), s = e(156), u = e(154), l = e(159), c = e(80), p = e(78), d = e(87), f = e(173), h = e(170), m = e(176), g = e(64).getBBox, v = new (e(67))("ov");
      a.$inject = ["config.overlays", "eventBus", "canvas", "elementRegistry"], t.exports = a, a.prototype.get = function (e) {
        if (s(e) && (e = {id: e}), e.element) {
          var t = this._getOverlayContainer(e.element, !0);
          return t ? e.type ? p(t.overlays, {type: e.type}) : t.overlays.slice() : []
        }
        return e.type ? p(this._overlays, {type: e.type}) : e.id ? this._overlays[e.id] : null
      }, a.prototype.add = function (e, t, n) {
        if (u(t) && (n = t, t = null), e.id || (e = this._elementRegistry.get(e)), !n.position)throw new Error("must specifiy overlay position");
        if (!n.html)throw new Error("must specifiy overlay html");
        if (!e)throw new Error("invalid element specified");
        var r = this._ids.next();
        return n = l({}, this._overlayDefaults, n, {id: r, type: t, element: e, html: n.html}), this._addOverlay(n), r
      }, a.prototype.remove = function (e) {
        var t = this.get(e) || [];
        o(t) || (t = [t]);
        var n = this;
        c(t, function (e) {
          var t = n._getOverlayContainer(e.element, !0);
          if (e && (m(e.html), m(e.htmlContainer), delete e.htmlContainer, delete e.element, delete n._overlays[e.id]), t) {
            var r = t.overlays.indexOf(e);
            -1 !== r && t.overlays.splice(r, 1)
          }
        })
      }, a.prototype.show = function () {
        i(this._overlayRoot)
      }, a.prototype.hide = function () {
        i(this._overlayRoot, !1)
      }, a.prototype._updateOverlayContainer = function (e) {
        var t = e.element, n = e.html, i = t.x, a = t.y;
        if (t.waypoints) {
          var o = g(t);
          i = o.x, a = o.y
        }
        r(n, i, a)
      }, a.prototype._updateOverlay = function (e) {
        var t = e.position, n = e.htmlContainer, i = e.element, a = t.left, o = t.top;
        if (void 0 !== t.right) {
          var s;
          s = i.waypoints ? g(i).width : i.width, a = -1 * t.right + s
        }
        if (void 0 !== t.bottom) {
          var u;
          u = i.waypoints ? g(i).height : i.height, o = -1 * t.bottom + u
        }
        r(n, a || 0, o || 0)
      }, a.prototype._createOverlayContainer = function (e) {
        var t = f('<div class="djs-overlays djs-overlays-' + e.id + '" style="position: absolute" />');
        this._overlayRoot.appendChild(t);
        var n = {html: t, element: e, overlays: []};
        return this._updateOverlayContainer(n), n
      }, a.prototype._updateRoot = function (e) {
        var t = e.scale || 1, n = e.scale || 1, r = "matrix(" + t + ",0,0," + n + "," + -1 * e.x * t + "," + -1 * e.y * n + ")";
        this._overlayRoot.style.transform = r, this._overlayRoot.style["-ms-transform"] = r
      }, a.prototype._getOverlayContainer = function (e, t) {
        var n = e && e.id || e, r = this._overlayContainers[n];
        return r || t || (r = this._overlayContainers[n] = this._createOverlayContainer(e)), r
      }, a.prototype._addOverlay = function (e) {
        var t, n, r = e.id, i = e.element, a = e.html;
        a.get && (a = a.get(0)), s(a) && (a = f(a)), n = this._getOverlayContainer(i), t = f('<div id="' + r + '" class="djs-overlay" style="position: absolute">'), t.appendChild(a), e.type && h(t).add("djs-overlay-" + e.type), e.htmlContainer = t, n.overlays.push(e), n.html.appendChild(t), this._overlays[r] = e, this._updateOverlay(e)
      }, a.prototype._updateOverlayVisibilty = function (e) {
        c(this._overlays, function (t) {
          var n = t.show, r = t.htmlContainer, a = !0;
          n && ((n.minZoom > e.scale || n.maxZoom < e.scale) && (a = !1), i(r, a))
        })
      }, a.prototype._init = function (e) {
        var t = this._eventBus, n = this, r = function (e) {
          n._updateRoot(e), n._updateOverlayVisibilty(e), n.show()
        };
        e && e.deferUpdate === !1 || (r = d(r, 300)), t.on("canvas.viewbox.changed", function (e) {
          n.hide(), r(e.viewbox)
        }), t.on(["shape.remove", "connection.remove"], function (e) {
          var t = n.get({element: e.element});
          c(t, function (e) {
            n.remove(e.id)
          })
        }), t.on(["element.changed"], function (e) {
          var t = e.element, r = n._getOverlayContainer(t, !0);
          r && (c(r.overlays, function (e) {
            n._updateOverlay(e)
          }), n._updateOverlayContainer(r))
        }), t.on("element.marker.update", function (e) {
          var t = n._getOverlayContainer(e.element, !0);
          t && h(t.html)[e.add ? "add" : "remove"](e.marker)
        })
      }
    }, {150: 150, 154: 154, 156: 156, 159: 159, 170: 170, 173: 173, 176: 176, 64: 64, 67: 67, 78: 78, 80: 80, 87: 87}],
    51: [function (e, t) {
      t.exports = {__init__: ["overlays"], overlays: ["type", e(50)]}
    }, {50: 50}],
    52: [function (e, t) {
      function n(e) {
        this._eventBus = e, this._selectedElements = [];
        var t = this;
        e.on(["shape.remove", "connection.remove"], function (e) {
          var n = e.element;
          t.deselect(n)
        })
      }

      var r = e(150), i = e(80);
      n.$inject = ["eventBus"], t.exports = n, n.prototype.deselect = function (e) {
        var t = this._selectedElements, n = t.indexOf(e);
        if (-1 !== n) {
          var r = t.slice();
          t.splice(n, 1), this._eventBus.fire("selection.changed", {oldSelection: r, newSelection: t})
        }
      }, n.prototype.get = function () {
        return this._selectedElements
      }, n.prototype.isSelected = function (e) {
        return -1 !== this._selectedElements.indexOf(e)
      }, n.prototype.select = function (e, t) {
        var n = this._selectedElements, a = n.slice();
        r(e) || (e = e ? [e] : []), t ? i(e, function (e) {
          -1 === n.indexOf(e) && n.push(e)
        }) : this._selectedElements = n = e.slice(), this._eventBus.fire("selection.changed", {
          oldSelection: a,
          newSelection: n
        })
      }
    }, {150: 150, 80: 80}],
    53: [function (e, t) {
      function n(e, t, n) {
        e.on("create.end", 500, function (e) {
          e.context.canExecute && t.select(e.shape)
        }), e.on("connect.end", 500, function (e) {
          e.context.canExecute && e.context.target && t.select(e.context.target)
        }), e.on("shape.move.end", 500, function (e) {
          t.select(e.context.shapes)
        }), e.on("element.click", function (e) {
          var i = e.element;
          if (i === n.getRootElement() && (i = null), t.isSelected(i))t.deselect(i); else {
            var a = r(e) || e, o = a.shiftKey;
            a.altKey || t.select(i, o)
          }
        })
      }

      var r = e(65).getOriginal;
      n.$inject = ["eventBus", "selection", "canvas"], t.exports = n
    }, {65: 65}],
    54: [function (e, t) {
      function n(e, t) {
        function n(e, n) {
          t.addMarker(e, n)
        }

        function o(e, n) {
          t.removeMarker(e, n)
        }

        this._multiSelectionBox = null, e.on("element.hover", function (e) {
          n(e.element, i)
        }), e.on("element.out", function (e) {
          o(e.element, i)
        }), e.on("selection.changed", function (e) {
          function t(e) {
            o(e, a)
          }

          function i(e) {
            n(e, a)
          }

          var s = e.oldSelection, u = e.newSelection;
          r(s, function (e) {
            -1 === u.indexOf(e) && t(e)
          }), r(u, function (e) {
            -1 === s.indexOf(e) && i(e)
          })
        })
      }

      var r = e(80), i = "hover", a = "selected";
      n.$inject = ["eventBus", "canvas", "selection", "graphicsFactory", "styles"], t.exports = n
    }, {80: 80}],
    55: [function (e, t) {
      t.exports = {
        __init__: ["selectionVisuals", "selectionBehavior"],
        __depends__: [e(47), e(49)],
        selection: ["type", e(52)],
        selectionVisuals: ["type", e(54)],
        selectionBehavior: ["type", e(53)]
      }
    }, {47: 47, 49: 49, 52: 52, 53: 53, 54: 54}],
    56: [function (e, t) {
      function n() {
        Object.defineProperty(this, "businessObject", {writable: !0}), l.bind(this, "parent"), c.bind(this, "label"), p.bind(this, "outgoing"), d.bind(this, "incoming")
      }

      function r() {
        n.call(this), l.bind(this, "children")
      }

      function i() {
        r.call(this)
      }

      function a() {
        r.call(this), c.bind(this, "labelTarget")
      }

      function o() {
        n.call(this), p.bind(this, "source"), d.bind(this, "target")
      }

      var s = e(159), u = e(185), l = new u({
        name: "children",
        enumerable: !0,
        collection: !0
      }, {name: "parent"}), c = new u({
        name: "label",
        enumerable: !0
      }, {name: "labelTarget"}), p = new u({
        name: "outgoing",
        collection: !0
      }, {name: "source"}), d = new u({name: "incoming", collection: !0}, {name: "target"});
      r.prototype = Object.create(n.prototype), i.prototype = Object.create(r.prototype), a.prototype = Object.create(r.prototype), o.prototype = Object.create(n.prototype);
      var f = {connection: o, shape: r, label: a, root: i};
      t.exports.create = function (e, t) {
        var n = f[e];
        if (!n)throw new Error("unknown type: <" + e + ">");
        return s(new n, t)
      }, t.exports.Base = n, t.exports.Root = i, t.exports.Shape = r, t.exports.Connection = o, t.exports.Label = a
    }, {159: 159, 185: 185}],
    57: [function (e, t) {
      function n(e, t) {
        return {x: e.x - t.x, y: e.y - t.y}
      }

      function r(e) {
        return Math.sqrt(Math.pow(e.x, 2) + Math.pow(e.y, 2))
      }

      function i(e, t) {
        function i(e) {
          var i = d.start, s = u.toPoint(e), c = n(s, i);
          if (!d.dragging && r(c) > l && (d.dragging = !0, o.install(), a.set("move")), d.dragging) {
            var p = d.last || d.start;
            c = n(s, p), t.scroll({dx: c.x, dy: c.y}), d.last = s
          }
          e.preventDefault()
        }

        function c(e) {
          s.unbind(document, "mousemove", i), s.unbind(document, "mouseup", c), d = null, a.unset(), u.stopEvent(e)
        }

        function p(e) {
          e.button || e.altKey || (d = {start: u.toPoint(e)}, s.bind(document, "mousemove", i), s.bind(document, "mouseup", c), u.stopEvent(e))
        }

        var d, f = t._container;
        s.bind(f, "mousedown", p)
      }

      var a = e(63), o = e(61), s = e(174), u = e(65), l = 15;
      i.$inject = ["eventBus", "canvas"], t.exports = i
    }, {174: 174, 61: 61, 63: 63, 65: 65}],
    58: [function (e, t) {
      t.exports = {__init__: ["moveCanvas"], moveCanvas: ["type", e(57)]}
    }, {57: 57}],
    59: [function (e, t) {
      function n(e, t) {
        function n(e) {
          return Math.max(s.min, Math.min(s.max, e))
        }

        function i() {
          t.zoom("fit-viewport")
        }

        function a(e, r) {
          var i = t.zoom(), a = Math.pow(1 + Math.abs(e / u), e > 0 ? 1 : -1);
          t.zoom(n(i * a), r)
        }

        function o(e) {
          r.bind(e, "wheel", function (e) {
            var n = 0 === e.deltaMode ? .025 : .5, r = e.shiftKey, i = e.ctrlKey, o = e.deltaX * n, s = e.deltaY * n;
            if (r || i) {
              var u = {};
              i ? u.dx = l * (o || s) : u.dy = l * (o || s), t.scroll(u)
            } else {
              var c = {};
              c = isNaN(e.offsetX) ? {x: e.layerX, y: e.layerY} : {x: e.offsetX, y: e.offsetY}, a(-1 * s, c)
            }
            e.preventDefault()
          })
        }

        var s = {min: .2, max: 4}, u = 5, l = 50;
        e.on("canvas.init", function (e) {
          o(e.svg.node)
        }), this.zoom = a, this.reset = i
      }

      var r = e(174);
      n.$inject = ["eventBus", "canvas"], t.exports = n
    }, {174: 174}],
    60: [function (e, t) {
      t.exports = {__init__: ["zoomScroll"], zoomScroll: ["type", e(59)]}
    }, {59: 59}],
    61: [function (e, t) {
      function n(e) {
        o(e), r(!1)
      }

      function r(e) {
        a[e ? "bind" : "unbind"](document.body, "click", n, !0)
      }

      function i() {
        return r(!0), function () {
          r(!1)
        }
      }

      var a = e(174), o = e(65).stopEvent;
      t.exports.install = i
    }, {174: 174, 65: 65}],
    62: [function (e, t) {
      t.exports.remove = function (e, t) {
        if (e && t) {
          var n = e.indexOf(t);
          if (-1 !== n)return e.splice(n, 1), t
        }
      }, t.exports.add = function (e, t, n) {
        if (e && t) {
          isNaN(n) && (n = -1);
          var r = e.indexOf(t);
          if (-1 !== r) {
            if (r === n)return;
            if (-1 === n)return;
            e.splice(r, 1)
          }
          -1 !== n ? e.splice(n, 0, t) : e.push(t)
        }
      }, t.exports.indexOf = function (e, t) {
        return e && t ? e.indexOf(t) : -1
      }
    }, {}],
    63: [function (e, t) {
      var n = e(170), r = /^djs-cursor-.*$/;
      t.exports.set = function (e) {
        var t = n(document.body);
        t.removeMatching(r), e && t.add("djs-cursor-" + e)
      }, t.exports.unset = function () {
        this.set(null)
      }
    }, {170: 170}],
    64: [function (e, t) {
      function n(e, t, n) {
        var r = !n || -1 === e.indexOf(t);
        return r && e.push(t), r
      }

      function r(e, t, n) {
        n = n || 0, f(e, function (e, i) {
          var a = t(e, i, n);
          c(a) && a.length && r(a, t, n + 1)
        })
      }

      function i(e, t, i) {
        var a = [], o = [];
        return r(e, function (e, r, s) {
          n(a, e, t);
          var u = e.children;
          return (-1 === i || i > s) && u && n(o, u, t) ? u : void 0
        }), a
      }

      function a(e, t) {
        return i(e, !t, 1)
      }

      function o(e, t) {
        return i(e, !t, -1)
      }

      function s(e) {
        function t(e) {
          i[e.source.id] && i[e.target.id] && (i[e.id] = e), a[e.source.id] && a[e.target.id] && (u[e.id] = s[e.id] = e), o[e.id] = e
        }

        function n(e) {
          return s[e.id] = e, e.waypoints ? void(u[e.id] = o[e.id] = e) : (a[e.id] = e, f(e.incoming, t), f(e.outgoing, t), e.children)
        }

        var i = d(e, function (e) {
          return e.id
        }), a = {}, o = {}, s = {}, u = {};
        return r(e, n), {allShapes: a, allConnections: o, topLevel: i, enclosedConnections: u, enclosedElements: s}
      }

      function u(e, t) {
        t = !!t, c(e) || (e = [e]);
        var n, r, i, a;
        return f(e, function (e) {
          var o = e;
          e.waypoints && !t && (o = u(e.waypoints, !0));
          var s = o.x, l = o.y, c = o.height || 0, p = o.width || 0;
          (n > s || void 0 === n) && (n = s), (r > l || void 0 === r) && (r = l), (s + p > i || void 0 === i) && (i = s + p), (l + c > a || void 0 === a) && (a = l + c)
        }), {x: n, y: r, height: a - r, width: i - n}
      }

      function l(e, t) {
        var n = {};
        return f(e, function (e) {
          var r = e;
          r.waypoints && (r = u(r)), !p(t.y) && r.x > t.x && (n[e.id] = e), !p(t.x) && r.y > t.y && (n[e.id] = e), r.x > t.x && r.y > t.y && (p(t.width) && p(t.height) && r.width + r.x < t.width + t.x && r.height + r.y < t.height + t.y ? n[e.id] = e : p(t.width) && p(t.height) || (n[e.id] = e))
        }), n
      }

      var c = e(150), p = e(153), d = e(81), f = e(80);
      t.exports.eachElement = r, t.exports.selfAndDirectChildren = a, t.exports.selfAndAllChildren = o, t.exports.getBBox = u, t.exports.getEnclosedElements = l, t.exports.getClosure = s
    }, {150: 150, 153: 153, 80: 80, 81: 81}],
    65: [function (e, t) {
      function n(e) {
        return e && e.preventDefault()
      }

      function r(e, t) {
        e && (e.stopPropagation && e.stopPropagation(), t && e.stopImmediatePropagation && e.stopImmediatePropagation())
      }

      function i(e) {
        return e.originalEvent || e.srcEvent
      }

      function a(e, t) {
        s(e, t), o(e)
      }

      function o(e) {
        n(e), n(i(e))
      }

      function s(e, t) {
        r(e, t), r(i(e), t)
      }

      function u(e) {
        return e.pointers && e.pointers.length && (e = e.pointers[0]), e.touches && e.touches.length && (e = e.touches[0]), e ? {
          x: e.clientX,
          y: e.clientY
        } : null
      }

      t.exports.getOriginal = i, t.exports.stopEvent = a, t.exports.preventDefault = o, t.exports.stopPropagation = s, t.exports.toPoint = u
    }, {}],
    66: [function (e, t) {
      function n(e) {
        return e.select(".djs-visual")
      }

      function r(e) {
        return e.parent().children()[1]
      }

      function i(e) {
        return n(e).select("*").getBBox()
      }

      t.exports.getVisual = n, t.exports.getChildren = r, t.exports.getBBox = i
    }, {}],
    67: [function (e, t) {
      function n(e) {
        this._counter = 0, this._prefix = (e ? e + "-" : "") + Math.floor(1e9 * Math.random()) + "-"
      }

      t.exports = n, n.prototype.next = function () {
        return this._prefix + ++this._counter
      }
    }, {}],
    68: [function (e, t) {
      function n(e) {
        var t = e.split("-");
        return {horizontal: t[0] || "center", vertical: t[1] || "top"}
      }

      function r(e) {
        return a(e) ? o({top: 0, left: 0, right: 0, bottom: 0}, e) : {top: e, left: e, right: e, bottom: e}
      }

      function i(e) {
        this._config = o({}, {size: d, padding: p, style: {}, align: "center-top"}, e || {})
      }

      var a = e(154), o = e(159), s = e(80), u = e(84), l = e(162), c = e(71), p = 0, d = {width: 150, height: 50};
      i.prototype.createText = function (e, t, i) {
        function a(e) {
          function t() {
            if (s.length < o.length) {
              var t = e[0] || "", n = o.slice(s.length);
              t = /-\s*$/.test(n) ? n.replace(/-\s*$/, "") + t.replace(/^\s+/, "") : n + " " + t, e[0] = t
            }
            return {width: a.width, height: a.height, text: s}
          }

          function n(e) {
            return v.textContent = e, v.getBBox()
          }

          function r(e, t) {
            var n, r = e.split(/(\s|-)/g), i = [], a = 0;
            if (r.length > 1)for (; n = r.shift();) {
              if (!(n.length + a < t)) {
                "-" === n && i.pop();
                break
              }
              i.push(n), a += n.length
            }
            return i.join("")
          }

          function i(e, t, n) {
            var i = e.length * (n / t), a = r(e, i);
            return a || (a = e.slice(0, Math.floor(i - 1))), a
          }

          for (var a, o = e.shift(), s = o; ;) {
            if (a = n(s), a.width < g)return t();
            s = i(s, a.width, g)
          }
        }

        var o = l({}, this._config.size, i.box || {}), p = l({}, this._config.style, i.style || {}), d = n(i.align || this._config.align), f = r(void 0 !== i.padding ? i.padding : this._config.padding), h = t.split(/\r?\n/g), m = [], g = o.width - f.left - f.right, v = e.text(0, 0, "").attr(p).node;
        for (v.ownerSVGElement.appendChild(v); h.length;)m.push(a(h));
        var y, b, w = u(m, function (e, t) {
          return e + t.height
        }, 0);
        switch (d.vertical) {
          case"middle":
            y = (o.height - w) / 2 - m[0].height / 4;
            break;
          default:
            y = f.top
        }
        var x = e.text().attr(p);
        return s(m, function (e) {
          switch (y += e.height, d.horizontal) {
            case"left":
              b = f.left;
              break;
            case"right":
              b = g - f.right - e.width;
              break;
            default:
              b = (g - e.width) / 2 + f.left
          }
          var t = c.create("tspan", {x: b, y: y}).node;
          t.textContent = e.text, x.append(t)
        }), v.parentNode.removeChild(v), x
      }, t.exports = i
    }, {154: 154, 159: 159, 162: 162, 71: 71, 80: 80, 84: 84}],
    69: [function (t, n) {
      !function (t) {
        var r, i, a = "0.4.2", o = "hasOwnProperty", s = /[\.\/]/, u = /\s*,\s*/, l = "*", c = function (e, t) {
          return e - t
        }, p = {n: {}}, d = function () {
          for (var e = 0, t = this.length; t > e; e++)if ("undefined" != typeof this[e])return this[e]
        }, f = function () {
          for (var e = this.length; --e;)if ("undefined" != typeof this[e])return this[e]
        }, h = function (e, t) {
          e = String(e);
          var n, a = i, o = Array.prototype.slice.call(arguments, 2), s = h.listeners(e), u = 0, l = [], p = {}, m = [], g = r;
          m.firstDefined = d, m.lastDefined = f, r = e, i = 0;
          for (var v = 0, y = s.length; y > v; v++)"zIndex"in s[v] && (l.push(s[v].zIndex), s[v].zIndex < 0 && (p[s[v].zIndex] = s[v]));
          for (l.sort(c); l[u] < 0;)if (n = p[l[u++]], m.push(n.apply(t, o)), i)return i = a, m;
          for (v = 0; y > v; v++)if (n = s[v], "zIndex"in n)if (n.zIndex == l[u]) {
            if (m.push(n.apply(t, o)), i)break;
            do if (u++, n = p[l[u]], n && m.push(n.apply(t, o)), i)break; while (n)
          } else p[n.zIndex] = n; else if (m.push(n.apply(t, o)), i)break;
          return i = a, r = g, m
        };
        h._events = p, h.listeners = function (e) {
          var t, n, r, i, a, o, u, c, d = e.split(s), f = p, h = [f], m = [];
          for (i = 0, a = d.length; a > i; i++) {
            for (c = [], o = 0, u = h.length; u > o; o++)for (f = h[o].n, n = [f[d[i]], f[l]], r = 2; r--;)t = n[r], t && (c.push(t), m = m.concat(t.f || []));
            h = c
          }
          return m
        }, h.on = function (e, t) {
          if (e = String(e), "function" != typeof t)return function () {
          };
          for (var n = e.split(u), r = 0, i = n.length; i > r; r++)!function (e) {
            for (var n, r = e.split(s), i = p, a = 0, o = r.length; o > a; a++)i = i.n, i = i.hasOwnProperty(r[a]) && i[r[a]] || (i[r[a]] = {n: {}});
            for (i.f = i.f || [], a = 0, o = i.f.length; o > a; a++)if (i.f[a] == t) {
              n = !0;
              break
            }
            !n && i.f.push(t)
          }(n[r]);
          return function (e) {
            +e == +e && (t.zIndex = +e)
          }
        }, h.f = function (e) {
          var t = [].slice.call(arguments, 1);
          return function () {
            h.apply(null, [e, null].concat(t).concat([].slice.call(arguments, 0)))
          }
        }, h.stop = function () {
          i = 1
        }, h.nt = function (e) {
          return e ? new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)").test(r) : r
        }, h.nts = function () {
          return r.split(s)
        }, h.off = h.unbind = function (e, t) {
          if (!e)return void(h._events = p = {n: {}});
          var n = e.split(u);
          if (n.length > 1)for (var r = 0, i = n.length; i > r; r++)h.off(n[r], t); else {
            n = e.split(s);
            var a, c, d, r, i, f, m, g = [p];
            for (r = 0, i = n.length; i > r; r++)for (f = 0; f < g.length; f += d.length - 2) {
              if (d = [f, 1], a = g[f].n, n[r] != l)a[n[r]] && d.push(a[n[r]]); else for (c in a)a[o](c) && d.push(a[c]);
              g.splice.apply(g, d)
            }
            for (r = 0, i = g.length; i > r; r++)for (a = g[r]; a.n;) {
              if (t) {
                if (a.f) {
                  for (f = 0, m = a.f.length; m > f; f++)if (a.f[f] == t) {
                    a.f.splice(f, 1);
                    break
                  }
                  !a.f.length && delete a.f
                }
                for (c in a.n)if (a.n[o](c) && a.n[c].f) {
                  var v = a.n[c].f;
                  for (f = 0, m = v.length; m > f; f++)if (v[f] == t) {
                    v.splice(f, 1);
                    break
                  }
                  !v.length && delete a.n[c].f
                }
              } else {
                delete a.f;
                for (c in a.n)a.n[o](c) && a.n[c].f && delete a.n[c].f
              }
              a = a.n
            }
          }
        }, h.once = function (e, t) {
          var n = function () {
            return h.unbind(e, n), t.apply(this, arguments)
          };
          return h.on(e, n)
        }, h.version = a, h.toString = function () {
          return "You are running Eve " + a
        }, "undefined" != typeof n && n.exports ? n.exports = h : "function" == typeof e && e.amd ? e("eve", [], function () {
          return h
        }) : t.eve = h
      }(this)
    }, {}],
    70: [function (t, n, r) {
      !function (i, a) {
        if ("function" == typeof e && e.amd)e(["eve"], function (e) {
          return a(i, e)
        }); else if ("undefined" != typeof r) {
          var o = t(69);
          n.exports = a(i, o)
        } else a(i, i.eve)
      }(window || this, function (e, t) {
        var n = function (t) {
          var n = {}, r = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
              setTimeout(e, 16)
            }, i = Array.isArray || function (e) {
              return e instanceof Array || "[object Array]" == Object.prototype.toString.call(e)
            }, a = 0, o = "M" + (+new Date).toString(36), s = function () {
            return o + (a++).toString(36)
          }, u = Date.now || function () {
              return +new Date
            }, l = function (e) {
            var t = this;
            if (null == e)return t.s;
            var n = t.s - e;
            t.b += t.dur * n, t.B += t.dur * n, t.s = e
          }, c = function (e) {
            var t = this;
            return null == e ? t.spd : void(t.spd = e)
          }, p = function (e) {
            var t = this;
            return null == e ? t.dur : (t.s = t.s * e / t.dur, void(t.dur = e))
          }, d = function () {
            var e = this;
            delete n[e.id], e.update(), t("mina.stop." + e.id, e)
          }, f = function () {
            var e = this;
            e.pdif || (delete n[e.id], e.update(), e.pdif = e.get() - e.b)
          }, h = function () {
            var e = this;
            e.pdif && (e.b = e.get() - e.pdif, delete e.pdif, n[e.id] = e)
          }, m = function () {
            var e, t = this;
            if (i(t.start)) {
              e = [];
              for (var n = 0, r = t.start.length; r > n; n++)e[n] = +t.start[n] + (t.end[n] - t.start[n]) * t.easing(t.s)
            } else e = +t.start + (t.end - t.start) * t.easing(t.s);
            t.set(e)
          }, g = function () {
            var e = 0;
            for (var i in n)if (n.hasOwnProperty(i)) {
              var a = n[i], o = a.get();
              e++, a.s = (o - a.b) / (a.dur / a.spd), a.s >= 1 && (delete n[i], a.s = 1, e--, function (e) {
                setTimeout(function () {
                  t("mina.finish." + e.id, e)
                })
              }(a)), a.update()
            }
            e && r(g)
          }, v = function (e, t, i, a, o, u, y) {
            var b = {
              id: s(),
              start: e,
              end: t,
              b: i,
              s: 0,
              dur: a - i,
              spd: 1,
              get: o,
              set: u,
              easing: y || v.linear,
              status: l,
              speed: c,
              duration: p,
              stop: d,
              pause: f,
              resume: h,
              update: m
            };
            n[b.id] = b;
            var w, x = 0;
            for (w in n)if (n.hasOwnProperty(w) && (x++, 2 == x))break;
            return 1 == x && r(g), b
          };
          return v.time = u, v.getById = function (e) {
            return n[e] || null
          }, v.linear = function (e) {
            return e
          }, v.easeout = function (e) {
            return Math.pow(e, 1.7)
          }, v.easein = function (e) {
            return Math.pow(e, .48)
          }, v.easeinout = function (e) {
            if (1 == e)return 1;
            if (0 == e)return 0;
            var t = .48 - e / 1.04, n = Math.sqrt(.1734 + t * t), r = n - t, i = Math.pow(Math.abs(r), 1 / 3) * (0 > r ? -1 : 1), a = -n - t, o = Math.pow(Math.abs(a), 1 / 3) * (0 > a ? -1 : 1), s = i + o + .5;
            return 3 * (1 - s) * s * s + s * s * s
          }, v.backin = function (e) {
            if (1 == e)return 1;
            var t = 1.70158;
            return e * e * ((t + 1) * e - t)
          }, v.backout = function (e) {
            if (0 == e)return 0;
            e -= 1;
            var t = 1.70158;
            return e * e * ((t + 1) * e + t) + 1
          }, v.elastic = function (e) {
            return e == !!e ? e : Math.pow(2, -10 * e) * Math.sin(2 * (e - .075) * Math.PI / .3) + 1
          }, v.bounce = function (e) {
            var t, n = 7.5625, r = 2.75;
            return 1 / r > e ? t = n * e * e : 2 / r > e ? (e -= 1.5 / r, t = n * e * e + .75) : 2.5 / r > e ? (e -= 2.25 / r, t = n * e * e + .9375) : (e -= 2.625 / r, t = n * e * e + .984375), t
          }, e.mina = v, v
        }("undefined" == typeof t ? function () {
        } : t), r = function (e) {
          function n(e, t) {
            if (e) {
              if (e.tagName)return E(e);
              if (i(e, "array") && n.set)return n.set.apply(n, e);
              if (e instanceof y)return e;
              if (null == t)return e = _.doc.querySelector(e), E(e)
            }
            return e = null == e ? "100%" : e, t = null == t ? "100%" : t, new x(e, t)
          }

          function r(e, t) {
            if (t) {
              if ("#text" == e && (e = _.doc.createTextNode(t.text || "")), "string" == typeof e && (e = r(e)), "string" == typeof t)return "xlink:" == t.substring(0, 6) ? e.getAttributeNS(G, t.substring(6)) : "xml:" == t.substring(0, 4) ? e.getAttributeNS(Y, t.substring(4)) : e.getAttribute(t);
              for (var n in t)if (t[A](n)) {
                var i = S(t[n]);
                i ? "xlink:" == n.substring(0, 6) ? e.setAttributeNS(G, n.substring(6), i) : "xml:" == n.substring(0, 4) ? e.setAttributeNS(Y, n.substring(4), i) : e.setAttribute(n, i) : e.removeAttribute(n)
              }
            } else e = _.doc.createElementNS(Y, e);
            return e
          }

          function i(e, t) {
            return t = S.prototype.toLowerCase.call(t), "finite" == t ? isFinite(e) : "array" == t && (e instanceof Array || Array.isArray && Array.isArray(e)) ? !0 : "null" == t && null === e || t == typeof e && null !== e || "object" == t && e === Object(e) || N.call(e).slice(8, -1).toLowerCase() == t
          }

          function a(e) {
            if ("function" == typeof e || Object(e) !== e)return e;
            var t = new e.constructor;
            for (var n in e)e[A](n) && (t[n] = a(e[n]));
            return t
          }

          function o(e, t) {
            for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return e.push(e.splice(n, 1)[0])
          }

          function s(e, t, n) {
            function r() {
              var i = Array.prototype.slice.call(arguments, 0), a = i.join("␀"), s = r.cache = r.cache || {}, u = r.count = r.count || [];
              return s[A](a) ? (o(u, a), n ? n(s[a]) : s[a]) : (u.length >= 1e3 && delete s[u.shift()], u.push(a), s[a] = e.apply(t, i), n ? n(s[a]) : s[a])
            }

            return r
          }

          function u(e, t, n, r, i, a) {
            if (null == i) {
              var o = e - n, s = t - r;
              return o || s ? (180 + 180 * D.atan2(-s, -o) / R + 360) % 360 : 0
            }
            return u(e, t, i, a) - u(n, r, i, a)
          }

          function l(e) {
            return e % 360 * R / 180
          }

          function c(e) {
            return 180 * e / R % 360
          }

          function p(e) {
            var t = [];
            return e = e.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function (e, n, r) {
              return r = r.split(/\s*,\s*|\s+/), "rotate" == n && 1 == r.length && r.push(0, 0), "scale" == n && (r.length > 2 ? r = r.slice(0, 2) : 2 == r.length && r.push(0, 0), 1 == r.length && r.push(r[0], 0, 0)), t.push("skewX" == n ? ["m", 1, 0, D.tan(l(r[0])), 1, 0, 0] : "skewY" == n ? ["m", 1, D.tan(l(r[0])), 0, 1, 0, 0] : [n.charAt(0)].concat(r)), e
            }), t
          }

          function d(e, t) {
            var r = J(e), i = new n.Matrix;
            if (r)for (var a = 0, o = r.length; o > a; a++) {
              var s, u, l, c, p, d = r[a], f = d.length, h = S(d[0]).toLowerCase(), m = d[0] != h, g = m ? i.invert() : 0;
              "t" == h && 2 == f ? i.translate(d[1], 0) : "t" == h && 3 == f ? m ? (s = g.x(0, 0), u = g.y(0, 0), l = g.x(d[1], d[2]), c = g.y(d[1], d[2]), i.translate(l - s, c - u)) : i.translate(d[1], d[2]) : "r" == h ? 2 == f ? (p = p || t, i.rotate(d[1], p.x + p.width / 2, p.y + p.height / 2)) : 4 == f && (m ? (l = g.x(d[2], d[3]), c = g.y(d[2], d[3]), i.rotate(d[1], l, c)) : i.rotate(d[1], d[2], d[3])) : "s" == h ? 2 == f || 3 == f ? (p = p || t, i.scale(d[1], d[f - 1], p.x + p.width / 2, p.y + p.height / 2)) : 4 == f ? m ? (l = g.x(d[2], d[3]), c = g.y(d[2], d[3]), i.scale(d[1], d[1], l, c)) : i.scale(d[1], d[1], d[2], d[3]) : 5 == f && (m ? (l = g.x(d[3], d[4]), c = g.y(d[3], d[4]), i.scale(d[1], d[2], l, c)) : i.scale(d[1], d[2], d[3], d[4])) : "m" == h && 7 == f && i.add(d[1], d[2], d[3], d[4], d[5], d[6])
            }
            return i
          }

          function f(e) {
            var t = e.node.ownerSVGElement && E(e.node.ownerSVGElement) || e.node.parentNode && E(e.node.parentNode) || n.select("svg") || n(0, 0), r = t.select("defs"), i = null == r ? !1 : r.node;
            return i || (i = w("defs", t.node).node), i
          }

          function h(e) {
            return e.node.ownerSVGElement && E(e.node.ownerSVGElement) || n.select("svg")
          }

          function m(e, t, n) {
            function i(e) {
              if (null == e)return P;
              if (e == +e)return e;
              r(l, {width: e});
              try {
                return l.getBBox().width
              } catch (t) {
                return 0
              }
            }

            function a(e) {
              if (null == e)return P;
              if (e == +e)return e;
              r(l, {height: e});
              try {
                return l.getBBox().height
              } catch (t) {
                return 0
              }
            }

            function o(r, i) {
              null == t ? u[r] = i(e.attr(r) || 0) : r == t && (u = i(null == n ? e.attr(r) || 0 : n))
            }

            var s = h(e).node, u = {}, l = s.querySelector(".svg---mgr");
            switch (l || (l = r("rect"), r(l, {
              x: -9e9,
              y: -9e9,
              width: 10,
              height: 10,
              "class": "svg---mgr",
              fill: "none"
            }), s.appendChild(l)), e.type) {
              case"rect":
                o("rx", i), o("ry", a);
              case"image":
                o("width", i), o("height", a);
              case"text":
                o("x", i), o("y", a);
                break;
              case"circle":
                o("cx", i), o("cy", a), o("r", i);
                break;
              case"ellipse":
                o("cx", i), o("cy", a), o("rx", i), o("ry", a);
                break;
              case"line":
                o("x1", i), o("x2", i), o("y1", a), o("y2", a);
                break;
              case"marker":
                o("refX", i), o("markerWidth", i), o("refY", a), o("markerHeight", a);
                break;
              case"radialGradient":
                o("fx", i), o("fy", a);
                break;
              case"tspan":
                o("dx", i), o("dy", a);
                break;
              default:
                o(t, i)
            }
            return s.removeChild(l), u
          }

          function v(e) {
            i(e, "array") || (e = Array.prototype.slice.call(arguments, 0));
            for (var t = 0, n = 0, r = this.node; this[t];)delete this[t++];
            for (t = 0; t < e.length; t++)"set" == e[t].type ? e[t].forEach(function (e) {
              r.appendChild(e.node)
            }) : r.appendChild(e[t].node);
            var a = r.childNodes;
            for (t = 0; t < a.length; t++)this[n++] = E(a[t]);
            return this
          }

          function y(e) {
            if (e.snap in q)return q[e.snap];
            var t;
            try {
              t = e.ownerSVGElement
            } catch (n) {
            }
            this.node = e, t && (this.paper = new x(t)), this.type = e.tagName;
            var r = this.id = z(this);
            if (this.anims = {}, this._ = {transform: []}, e.snap = r, q[r] = this, "g" == this.type && (this.add = v), this.type in{
                g: 1,
                mask: 1,
                pattern: 1,
                symbol: 1
              })for (var i in x.prototype)x.prototype[A](i) && (this[i] = x.prototype[i])
          }

          function b(e) {
            this.node = e
          }

          function w(e, t) {
            var n = r(e);
            t.appendChild(n);
            var i = E(n);
            return i
          }

          function x(e, t) {
            var n, i, a, o = x.prototype;
            if (e && "svg" == e.tagName) {
              if (e.snap in q)return q[e.snap];
              var s = e.ownerDocument;
              n = new y(e), i = e.getElementsByTagName("desc")[0], a = e.getElementsByTagName("defs")[0], i || (i = r("desc"), i.appendChild(s.createTextNode("Created with Snap")), n.node.appendChild(i)), a || (a = r("defs"), n.node.appendChild(a)), n.defs = a;
              for (var u in o)o[A](u) && (n[u] = o[u]);
              n.paper = n.root = n
            } else n = w("svg", _.doc.body), r(n.node, {height: t, version: 1.1, width: e, xmlns: Y});
            return n
          }

          function E(e) {
            return e ? e instanceof y || e instanceof b ? e : e.tagName && "svg" == e.tagName.toLowerCase() ? new x(e) : e.tagName && "object" == e.tagName.toLowerCase() && "image/svg+xml" == e.type ? new x(e.contentDocument.getElementsByTagName("svg")[0]) : new y(e) : e
          }

          n.version = "0.3.0", n.toString = function () {
            return "Snap v" + this.version
          }, n._ = {};
          var _ = {win: e.window, doc: e.window.document};
          n._.glob = _;
          {
            var A = "hasOwnProperty", S = String, C = parseFloat, T = parseInt, D = Math, k = D.max, I = D.min, M = D.abs, R = (D.pow, D.PI), P = (D.round, ""), N = Object.prototype.toString, O = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i, L = (n._.separator = /[,\s]+/, /[\s]*,[\s]*/), F = {
              hs: 1,
              rg: 1
            }, $ = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi, B = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi, U = /(-?\d*\.?\d*(?:e[\-+]?\\d+)?)[\s]*,?[\s]*/gi, V = 0, j = "S" + (+new Date).toString(36), z = function (e) {
              return (e && e.type ? e.type : P) + j + (V++).toString(36)
            }, G = "http://www.w3.org/1999/xlink", Y = "http://www.w3.org/2000/svg", q = {};
            n.url = function (e) {
              return "url('#" + e + "')"
            }
          }
          n._.$ = r, n._.id = z, n.format = function () {
            var e = /\{([^\}]+)\}/g, t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, n = function (e, n, r) {
              var i = r;
              return n.replace(t, function (e, t, n, r, a) {
                t = t || r, i && (t in i && (i = i[t]), "function" == typeof i && a && (i = i()))
              }), i = (null == i || i == r ? e : i) + ""
            };
            return function (t, r) {
              return S(t).replace(e, function (e, t) {
                return n(e, t, r)
              })
            }
          }(), n._.clone = a, n._.cacher = s, n.rad = l, n.deg = c, n.angle = u, n.is = i, n.snapTo = function (e, t, n) {
            if (n = i(n, "finite") ? n : 10, i(e, "array")) {
              for (var r = e.length; r--;)if (M(e[r] - t) <= n)return e[r]
            } else {
              e = +e;
              var a = t % e;
              if (n > a)return t - a;
              if (a > e - n)return t - a + e
            }
            return t
          }, n.getRGB = s(function (e) {
            if (!e || (e = S(e)).indexOf("-") + 1)return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: X};
            if ("none" == e)return {r: -1, g: -1, b: -1, hex: "none", toString: X};
            if (!(F[A](e.toLowerCase().substring(0, 2)) || "#" == e.charAt()) && (e = W(e)), !e)return {
              r: -1,
              g: -1,
              b: -1,
              hex: "none",
              error: 1,
              toString: X
            };
            var t, r, a, o, s, u, l = e.match(O);
            return l ? (l[2] && (a = T(l[2].substring(5), 16), r = T(l[2].substring(3, 5), 16), t = T(l[2].substring(1, 3), 16)), l[3] && (a = T((s = l[3].charAt(3)) + s, 16), r = T((s = l[3].charAt(2)) + s, 16), t = T((s = l[3].charAt(1)) + s, 16)), l[4] && (u = l[4].split(L), t = C(u[0]), "%" == u[0].slice(-1) && (t *= 2.55), r = C(u[1]), "%" == u[1].slice(-1) && (r *= 2.55), a = C(u[2]), "%" == u[2].slice(-1) && (a *= 2.55), "rgba" == l[1].toLowerCase().slice(0, 4) && (o = C(u[3])), u[3] && "%" == u[3].slice(-1) && (o /= 100)), l[5] ? (u = l[5].split(L), t = C(u[0]), "%" == u[0].slice(-1) && (t /= 100), r = C(u[1]), "%" == u[1].slice(-1) && (r /= 100), a = C(u[2]), "%" == u[2].slice(-1) && (a /= 100), ("deg" == u[0].slice(-3) || "°" == u[0].slice(-1)) && (t /= 360), "hsba" == l[1].toLowerCase().slice(0, 4) && (o = C(u[3])), u[3] && "%" == u[3].slice(-1) && (o /= 100), n.hsb2rgb(t, r, a, o)) : l[6] ? (u = l[6].split(L), t = C(u[0]), "%" == u[0].slice(-1) && (t /= 100), r = C(u[1]), "%" == u[1].slice(-1) && (r /= 100), a = C(u[2]), "%" == u[2].slice(-1) && (a /= 100), ("deg" == u[0].slice(-3) || "°" == u[0].slice(-1)) && (t /= 360), "hsla" == l[1].toLowerCase().slice(0, 4) && (o = C(u[3])), u[3] && "%" == u[3].slice(-1) && (o /= 100), n.hsl2rgb(t, r, a, o)) : (t = I(D.round(t), 255), r = I(D.round(r), 255), a = I(D.round(a), 255), o = I(k(o, 0), 1), l = {
              r: t,
              g: r,
              b: a,
              toString: X
            }, l.hex = "#" + (16777216 | a | r << 8 | t << 16).toString(16).slice(1), l.opacity = i(o, "finite") ? o : 1, l)) : {
              r: -1,
              g: -1,
              b: -1,
              hex: "none",
              error: 1,
              toString: X
            }
          }, n), n.hsb = s(function (e, t, r) {
            return n.hsb2rgb(e, t, r).hex
          }), n.hsl = s(function (e, t, r) {
            return n.hsl2rgb(e, t, r).hex
          }), n.rgb = s(function (e, t, n, r) {
            if (i(r, "finite")) {
              var a = D.round;
              return "rgba(" + [a(e), a(t), a(n), +r.toFixed(2)] + ")"
            }
            return "#" + (16777216 | n | t << 8 | e << 16).toString(16).slice(1)
          });
          var W = function (e) {
            var t = _.doc.getElementsByTagName("head")[0] || _.doc.getElementsByTagName("svg")[0], n = "rgb(255, 0, 0)";
            return (W = s(function (e) {
              if ("red" == e.toLowerCase())return n;
              t.style.color = n, t.style.color = e;
              var r = _.doc.defaultView.getComputedStyle(t, P).getPropertyValue("color");
              return r == n ? null : r
            }))(e)
          }, H = function () {
            return "hsb(" + [this.h, this.s, this.b] + ")"
          }, K = function () {
            return "hsl(" + [this.h, this.s, this.l] + ")"
          }, X = function () {
            return 1 == this.opacity || null == this.opacity ? this.hex : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")"
          }, Q = function (e, t, r) {
            if (null == t && i(e, "object") && "r"in e && "g"in e && "b"in e && (r = e.b, t = e.g, e = e.r), null == t && i(e, string)) {
              var a = n.getRGB(e);
              e = a.r, t = a.g, r = a.b
            }
            return (e > 1 || t > 1 || r > 1) && (e /= 255, t /= 255, r /= 255), [e, t, r]
          }, Z = function (e, t, r, a) {
            e = D.round(255 * e), t = D.round(255 * t), r = D.round(255 * r);
            var o = {r: e, g: t, b: r, opacity: i(a, "finite") ? a : 1, hex: n.rgb(e, t, r), toString: X};
            return i(a, "finite") && (o.opacity = a), o
          };
          n.color = function (e) {
            var t;
            return i(e, "object") && "h"in e && "s"in e && "b"in e ? (t = n.hsb2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.opacity = 1, e.hex = t.hex) : i(e, "object") && "h"in e && "s"in e && "l"in e ? (t = n.hsl2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.opacity = 1, e.hex = t.hex) : (i(e, "string") && (e = n.getRGB(e)), i(e, "object") && "r"in e && "g"in e && "b"in e && !("error"in e) ? (t = n.rgb2hsl(e), e.h = t.h, e.s = t.s, e.l = t.l, t = n.rgb2hsb(e), e.v = t.b) : (e = {hex: "none"}, e.r = e.g = e.b = e.h = e.s = e.v = e.l = -1, e.error = 1)), e.toString = X, e
          }, n.hsb2rgb = function (e, t, n, r) {
            i(e, "object") && "h"in e && "s"in e && "b"in e && (n = e.b, t = e.s, e = e.h, r = e.o), e *= 360;
            var a, o, s, u, l;
            return e = e % 360 / 60, l = n * t, u = l * (1 - M(e % 2 - 1)), a = o = s = n - l, e = ~~e, a += [l, u, 0, 0, u, l][e], o += [u, l, l, u, 0, 0][e], s += [0, 0, u, l, l, u][e], Z(a, o, s, r)
          }, n.hsl2rgb = function (e, t, n, r) {
            i(e, "object") && "h"in e && "s"in e && "l"in e && (n = e.l, t = e.s, e = e.h), (e > 1 || t > 1 || n > 1) && (e /= 360, t /= 100, n /= 100), e *= 360;
            var a, o, s, u, l;
            return e = e % 360 / 60, l = 2 * t * (.5 > n ? n : 1 - n), u = l * (1 - M(e % 2 - 1)), a = o = s = n - l / 2, e = ~~e, a += [l, u, 0, 0, u, l][e], o += [u, l, l, u, 0, 0][e], s += [0, 0, u, l, l, u][e], Z(a, o, s, r)
          }, n.rgb2hsb = function (e, t, n) {
            n = Q(e, t, n), e = n[0], t = n[1], n = n[2];
            var r, i, a, o;
            return a = k(e, t, n), o = a - I(e, t, n), r = 0 == o ? null : a == e ? (t - n) / o : a == t ? (n - e) / o + 2 : (e - t) / o + 4, r = (r + 360) % 6 * 60 / 360, i = 0 == o ? 0 : o / a, {
              h: r,
              s: i,
              b: a,
              toString: H
            }
          }, n.rgb2hsl = function (e, t, n) {
            n = Q(e, t, n), e = n[0], t = n[1], n = n[2];
            var r, i, a, o, s, u;
            return o = k(e, t, n), s = I(e, t, n), u = o - s, r = 0 == u ? null : o == e ? (t - n) / u : o == t ? (n - e) / u + 2 : (e - t) / u + 4, r = (r + 360) % 6 * 60 / 360, a = (o + s) / 2, i = 0 == u ? 0 : .5 > a ? u / (2 * a) : u / (2 - 2 * a), {
              h: r,
              s: i,
              l: a,
              toString: K
            }
          }, n.parsePathString = function (e) {
            if (!e)return null;
            var t = n.path(e);
            if (t.arr)return n.path.clone(t.arr);
            var r = {a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0}, a = [];
            return i(e, "array") && i(e[0], "array") && (a = n.path.clone(e)), a.length || S(e).replace($, function (e, t, n) {
              var i = [], o = t.toLowerCase();
              if (n.replace(U, function (e, t) {
                  t && i.push(+t)
                }), "m" == o && i.length > 2 && (a.push([t].concat(i.splice(0, 2))), o = "l", t = "m" == t ? "l" : "L"), "o" == o && 1 == i.length && a.push([t, i[0]]), "r" == o)a.push([t].concat(i)); else for (; i.length >= r[o] && (a.push([t].concat(i.splice(0, r[o]))), r[o]););
            }), a.toString = n.path.toString, t.arr = n.path.clone(a), a
          };
          var J = n.parseTransformString = function (e) {
            if (!e)return null;
            var t = [];
            return i(e, "array") && i(e[0], "array") && (t = n.path.clone(e)), t.length || S(e).replace(B, function (e, n, r) {
              {
                var i = [];
                n.toLowerCase()
              }
              r.replace(U, function (e, t) {
                t && i.push(+t)
              }), t.push([n].concat(i))
            }), t.toString = n.path.toString, t
          };
          n._.svgTransform2string = p, n._.rgTransform = /^[a-z][\s]*-?\.?\d/i, n._.transform2matrix = d, n._unit2px = m;
          _.doc.contains || _.doc.compareDocumentPosition ? function (e, t) {
            var n = 9 == e.nodeType ? e.documentElement : e, r = t && t.parentNode;
            return e == r || !(!r || 1 != r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
          } : function (e, t) {
            if (t)for (; t;)if (t = t.parentNode, t == e)return !0;
            return !1
          };
          n._.getSomeDefs = f, n._.getSomeSVG = h, n.select = function (e) {
            return e = S(e).replace(/([^\\]):/g, "$1\\:"), E(_.doc.querySelector(e))
          }, n.selectAll = function (e) {
            for (var t = _.doc.querySelectorAll(e), r = (n.set || Array)(), i = 0; i < t.length; i++)r.push(E(t[i]));
            return r
          }, setInterval(function () {
            for (var e in q)if (q[A](e)) {
              var t = q[e], n = t.node;
              ("svg" != t.type && !n.ownerSVGElement || "svg" == t.type && (!n.parentNode || "ownerSVGElement"in n.parentNode && !n.ownerSVGElement)) && delete q[e]
            }
          }, 1e4), y.prototype.attr = function (e, n) {
            {
              var r = this;
              r.node
            }
            if (!e)return r;
            if (i(e, "string")) {
              if (!(arguments.length > 1))return t("snap.util.getattr." + e, r).firstDefined();
              var a = {};
              a[e] = n, e = a
            }
            for (var o in e)e[A](o) && t("snap.util.attr." + o, r, e[o]);
            return r
          }, n.parse = function (e) {
            var t = _.doc.createDocumentFragment(), n = !0, r = _.doc.createElement("div");
            if (e = S(e), e.match(/^\s*<\s*svg(?:\s|>)/) || (e = "<svg>" + e + "</svg>", n = !1), r.innerHTML = e, e = r.getElementsByTagName("svg")[0])if (n)t = e; else {
              for (; e.firstChild;)t.appendChild(e.firstChild);
              r.innerHTML = P
            }
            return new b(t)
          }, n.fragment = function () {
            for (var e = Array.prototype.slice.call(arguments, 0), t = _.doc.createDocumentFragment(), r = 0, i = e.length; i > r; r++) {
              var a = e[r];
              a.node && a.node.nodeType && t.appendChild(a.node), a.nodeType && t.appendChild(a), "string" == typeof a && t.appendChild(n.parse(a).node)
            }
            return new b(t)
          }, n._.make = w, n._.wrap = E, x.prototype.el = function (e, t) {
            var n = w(e, this.node);
            return t && n.attr(t), n
          }, t.on("snap.util.getattr", function () {
            var e = t.nt();
            e = e.substring(e.lastIndexOf(".") + 1);
            var n = e.replace(/[A-Z]/g, function (e) {
              return "-" + e.toLowerCase()
            });
            return et[A](n) ? this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(n) : r(this.node, e)
          });
          var et = {
            "alignment-baseline": 0,
            "baseline-shift": 0,
            clip: 0,
            "clip-path": 0,
            "clip-rule": 0,
            color: 0,
            "color-interpolation": 0,
            "color-interpolation-filters": 0,
            "color-profile": 0,
            "color-rendering": 0,
            cursor: 0,
            direction: 0,
            display: 0,
            "dominant-baseline": 0,
            "enable-background": 0,
            fill: 0,
            "fill-opacity": 0,
            "fill-rule": 0,
            filter: 0,
            "flood-color": 0,
            "flood-opacity": 0,
            font: 0,
            "font-family": 0,
            "font-size": 0,
            "font-size-adjust": 0,
            "font-stretch": 0,
            "font-style": 0,
            "font-variant": 0,
            "font-weight": 0,
            "glyph-orientation-horizontal": 0,
            "glyph-orientation-vertical": 0,
            "image-rendering": 0,
            kerning: 0,
            "letter-spacing": 0,
            "lighting-color": 0,
            marker: 0,
            "marker-end": 0,
            "marker-mid": 0,
            "marker-start": 0,
            mask: 0,
            opacity: 0,
            overflow: 0,
            "pointer-events": 0,
            "shape-rendering": 0,
            "stop-color": 0,
            "stop-opacity": 0,
            stroke: 0,
            "stroke-dasharray": 0,
            "stroke-dashoffset": 0,
            "stroke-linecap": 0,
            "stroke-linejoin": 0,
            "stroke-miterlimit": 0,
            "stroke-opacity": 0,
            "stroke-width": 0,
            "text-anchor": 0,
            "text-decoration": 0,
            "text-rendering": 0,
            "unicode-bidi": 0,
            visibility: 0,
            "word-spacing": 0,
            "writing-mode": 0
          };
          t.on("snap.util.attr", function (e) {
            var n = t.nt(), i = {};
            n = n.substring(n.lastIndexOf(".") + 1), i[n] = e;
            var a = n.replace(/-(\w)/gi, function (e, t) {
              return t.toUpperCase()
            }), o = n.replace(/[A-Z]/g, function (e) {
              return "-" + e.toLowerCase()
            });
            et[A](o) ? this.node.style[a] = null == e ? P : e : r(this.node, i)
          }), function () {
          }(x.prototype), n.ajax = function (e, n, r, a) {
            var o = new XMLHttpRequest, s = z();
            if (o) {
              if (i(n, "function"))a = r, r = n, n = null; else if (i(n, "object")) {
                var u = [];
                for (var l in n)n.hasOwnProperty(l) && u.push(encodeURIComponent(l) + "=" + encodeURIComponent(n[l]));
                n = u.join("&")
              }
              return o.open(n ? "POST" : "GET", e, !0), n && (o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), o.setRequestHeader("Content-type", "application/x-www-form-urlencoded")), r && (t.once("snap.ajax." + s + ".0", r), t.once("snap.ajax." + s + ".200", r), t.once("snap.ajax." + s + ".304", r)), o.onreadystatechange = function () {
                4 == o.readyState && t("snap.ajax." + s + "." + o.status, a, o)
              }, 4 == o.readyState ? o : (o.send(n), o)
            }
          }, n.load = function (e, t, r) {
            n.ajax(e, function (e) {
              var i = n.parse(e.responseText);
              r ? t.call(r, i) : t(i)
            })
          };
          var tt = function (e) {
            var t = e.getBoundingClientRect(), n = e.ownerDocument, r = n.body, i = n.documentElement, a = i.clientTop || r.clientTop || 0, o = i.clientLeft || r.clientLeft || 0, s = t.top + (g.win.pageYOffset || i.scrollTop || r.scrollTop) - a, u = t.left + (g.win.pageXOffset || i.scrollLeft || r.scrollLeft) - o;
            return {y: s, x: u}
          };
          return n.getElementByPoint = function (e, t) {
            var n = this, r = (n.canvas, _.doc.elementFromPoint(e, t));
            if (_.win.opera && "svg" == r.tagName) {
              var i = tt(r), a = r.createSVGRect();
              a.x = e - i.x, a.y = t - i.y, a.width = a.height = 1;
              var o = r.getIntersectionList(a, null);
              o.length && (r = o[o.length - 1])
            }
            return r ? E(r) : null
          }, n.plugin = function (e) {
            e(n, y, x, _, b)
          }, _.win.Snap = n, n
        }(e || this);
        return r.plugin(function (r, i, a, o, s) {
          function u(e, t) {
            if (null == t) {
              var n = !0;
              if (t = e.node.getAttribute("linearGradient" == e.type || "radialGradient" == e.type ? "gradientTransform" : "pattern" == e.type ? "patternTransform" : "transform"), !t)return new r.Matrix;
              t = r._.svgTransform2string(t)
            } else t = r._.rgTransform.test(t) ? h(t).replace(/\.{3}|\u2026/g, e._.transform || E) : r._.svgTransform2string(t), f(t, "array") && (t = r.path ? r.path.toString.call(t) : h(t)), e._.transform = t;
            var i = r._.transform2matrix(t, e.getBBox(1));
            return n ? i : void(e.matrix = i)
          }

          function l(e) {
            function t(e, t) {
              var n = g(e.node, t);
              n = n && n.match(a), n = n && n[2], n && "#" == n.charAt() && (n = n.substring(1), n && (s[n] = (s[n] || []).concat(function (n) {
                var r = {};
                r[t] = URL(n), g(e.node, r)
              })))
            }

            function n(e) {
              var t = g(e.node, "xlink:href");
              t && "#" == t.charAt() && (t = t.substring(1), t && (s[t] = (s[t] || []).concat(function (t) {
                e.attr("xlink:href", "#" + t)
              })))
            }

            for (var r, i = e.selectAll("*"), a = /^\s*url\(("|'|)(.*)\1\)\s*$/, o = [], s = {}, u = 0, l = i.length; l > u; u++) {
              r = i[u], t(r, "fill"), t(r, "stroke"), t(r, "filter"), t(r, "mask"), t(r, "clip-path"), n(r);
              var c = g(r.node, "id");
              c && (g(r.node, {id: r.id}), o.push({old: c, id: r.id}))
            }
            for (u = 0, l = o.length; l > u; u++) {
              var p = s[o[u].old];
              if (p)for (var d = 0, f = p.length; f > d; d++)p[d](o[u].id)
            }
          }

          function c(e, t, n) {
            return function (r) {
              var i = r.slice(e, t);
              return 1 == i.length && (i = i[0]), n ? n(i) : i
            }
          }

          function p(e) {
            return function () {
              var t = e ? "<" + this.type : "", n = this.node.attributes, r = this.node.childNodes;
              if (e)for (var i = 0, a = n.length; a > i; i++)t += " " + n[i].name + '="' + n[i].value.replace(/"/g, '\\"') + '"';
              if (r.length) {
                for (e && (t += ">"), i = 0, a = r.length; a > i; i++)3 == r[i].nodeType ? t += r[i].nodeValue : 1 == r[i].nodeType && (t += w(r[i]).toString());
                e && (t += "</" + this.type + ">")
              } else e && (t += "/>");
              return t
            }
          }

          var d = i.prototype, f = r.is, h = String, m = r._unit2px, g = r._.$, v = r._.make, y = r._.getSomeDefs, b = "hasOwnProperty", w = r._.wrap;
          d.getBBox = function (e) {
            if (!r.Matrix || !r.path)return this.node.getBBox();
            var t = this, n = new r.Matrix;
            if (t.removed)return r._.box();
            for (; "use" == t.type;)if (e || (n = n.add(t.transform().localMatrix.translate(t.attr("x") || 0, t.attr("y") || 0))), t.original)t = t.original; else {
              var i = t.attr("xlink:href");
              t = t.original = t.node.ownerDocument.getElementById(i.substring(i.indexOf("#") + 1))
            }
            var a = t._, o = r.path.get[t.type] || r.path.get.deflt;
            try {
              return e ? (a.bboxwt = o ? r.path.getBBox(t.realPath = o(t)) : r._.box(t.node.getBBox()), r._.box(a.bboxwt)) : (t.realPath = o(t), t.matrix = t.transform().localMatrix, a.bbox = r.path.getBBox(r.path.map(t.realPath, n.add(t.matrix))), r._.box(a.bbox))
            } catch (s) {
              return r._.box()
            }
          };
          var x = function () {
            return this.string
          };
          d.transform = function (e) {
            var t = this._;
            if (null == e) {
              for (var n, i = this, a = new r.Matrix(this.node.getCTM()), o = u(this), s = [o], l = new r.Matrix, c = o.toTransformString(), p = h(o) == h(this.matrix) ? h(t.transform) : c; "svg" != i.type && (i = i.parent());)s.push(u(i));
              for (n = s.length; n--;)l.add(s[n]);
              return {
                string: p,
                globalMatrix: a,
                totalMatrix: l,
                localMatrix: o,
                diffMatrix: a.clone().add(o.invert()),
                global: a.toTransformString(),
                total: l.toTransformString(),
                local: c,
                toString: x
              }
            }
            return e instanceof r.Matrix ? (this.matrix = e, this._.transform = e.toTransformString()) : u(this, e), this.node && ("linearGradient" == this.type || "radialGradient" == this.type ? g(this.node, {gradientTransform: this.matrix}) : "pattern" == this.type ? g(this.node, {patternTransform: this.matrix}) : g(this.node, {transform: this.matrix})), this
          }, d.parent = function () {
            return w(this.node.parentNode)
          }, d.append = d.add = function (e) {
            if (e) {
              if ("set" == e.type) {
                var t = this;
                return e.forEach(function (e) {
                  t.add(e)
                }), this
              }
              e = w(e), this.node.appendChild(e.node), e.paper = this.paper
            }
            return this
          }, d.appendTo = function (e) {
            return e && (e = w(e), e.append(this)), this
          }, d.prepend = function (e) {
            if (e) {
              if ("set" == e.type) {
                var t, n = this;
                return e.forEach(function (e) {
                  t ? t.after(e) : n.prepend(e), t = e
                }), this
              }
              e = w(e);
              var r = e.parent();
              this.node.insertBefore(e.node, this.node.firstChild), this.add && this.add(), e.paper = this.paper, this.parent() && this.parent().add(), r && r.add()
            }
            return this
          }, d.prependTo = function (e) {
            return e = w(e), e.prepend(this), this
          }, d.before = function (e) {
            if ("set" == e.type) {
              var t = this;
              return e.forEach(function (e) {
                var n = e.parent();
                t.node.parentNode.insertBefore(e.node, t.node), n && n.add()
              }), this.parent().add(), this
            }
            e = w(e);
            var n = e.parent();
            return this.node.parentNode.insertBefore(e.node, this.node), this.parent() && this.parent().add(), n && n.add(), e.paper = this.paper, this
          }, d.after = function (e) {
            e = w(e);
            var t = e.parent();
            return this.node.nextSibling ? this.node.parentNode.insertBefore(e.node, this.node.nextSibling) : this.node.parentNode.appendChild(e.node), this.parent() && this.parent().add(), t && t.add(), e.paper = this.paper, this
          }, d.insertBefore = function (e) {
            e = w(e);
            var t = this.parent();
            return e.node.parentNode.insertBefore(this.node, e.node), this.paper = e.paper, t && t.add(), e.parent() && e.parent().add(), this
          }, d.insertAfter = function (e) {
            e = w(e);
            var t = this.parent();
            return e.node.parentNode.insertBefore(this.node, e.node.nextSibling), this.paper = e.paper, t && t.add(), e.parent() && e.parent().add(), this
          }, d.remove = function () {
            var e = this.parent();
            return this.node.parentNode && this.node.parentNode.removeChild(this.node), delete this.paper, this.removed = !0, e && e.add(), this
          }, d.select = function (e) {
            return e = h(e).replace(/([^\\]):/g, "$1\\:"), w(this.node.querySelector(e))
          }, d.selectAll = function (e) {
            for (var t = this.node.querySelectorAll(e), n = (r.set || Array)(), i = 0; i < t.length; i++)n.push(w(t[i]));
            return n
          }, d.asPX = function (e, t) {
            return null == t && (t = this.attr(e)), +m(this, e, t)
          }, d.use = function () {
            var e, t = this.node.id;
            return t || (t = this.id, g(this.node, {id: t})), e = "linearGradient" == this.type || "radialGradient" == this.type || "pattern" == this.type ? v(this.type, this.node.parentNode) : v("use", this.node.parentNode), g(e.node, {"xlink:href": "#" + t}), e.original = this, e
          }, d.clone = function () {
            var e = w(this.node.cloneNode(!0));
            return g(e.node, "id") && g(e.node, {id: e.id}), l(e), e.insertAfter(this), e
          }, d.toDefs = function () {
            var e = y(this);
            return e.appendChild(this.node), this
          }, d.pattern = d.toPattern = function (e, t, n, r) {
            var i = v("pattern", y(this));
            return null == e && (e = this.getBBox()), f(e, "object") && "x"in e && (t = e.y, n = e.width, r = e.height, e = e.x), g(i.node, {
              x: e,
              y: t,
              width: n,
              height: r,
              patternUnits: "userSpaceOnUse",
              id: i.id,
              viewBox: [e, t, n, r].join(" ")
            }), i.node.appendChild(this.node), i
          }, d.marker = function (e, t, n, r, i, a) {
            var o = v("marker", y(this));
            return null == e && (e = this.getBBox()), f(e, "object") && "x"in e && (t = e.y, n = e.width, r = e.height, i = e.refX || e.cx, a = e.refY || e.cy, e = e.x), g(o.node, {
              viewBox: [e, t, n, r].join(" "),
              markerWidth: n,
              markerHeight: r,
              orient: "auto",
              refX: i || 0,
              refY: a || 0,
              id: o.id
            }), o.node.appendChild(this.node), o
          };
          var _ = function (e, t, r, i) {
            "function" != typeof r || r.length || (i = r, r = n.linear), this.attr = e, this.dur = t, r && (this.easing = r), i && (this.callback = i)
          };
          r._.Animation = _, r.animation = function (e, t, n, r) {
            return new _(e, t, n, r)
          }, d.inAnim = function () {
            var e = this, t = [];
            for (var n in e.anims)e.anims[b](n) && !function (e) {
              t.push({
                anim: new _(e._attrs, e.dur, e.easing, e._callback),
                mina: e,
                curStatus: e.status(),
                status: function (t) {
                  return e.status(t)
                },
                stop: function () {
                  e.stop()
                }
              })
            }(e.anims[n]);
            return t
          }, r.animate = function (e, r, i, a, o, s) {
            "function" != typeof o || o.length || (s = o, o = n.linear);
            var u = n.time(), l = n(e, r, u, u + a, n.time, i, o);
            return s && t.once("mina.finish." + l.id, s), l
          }, d.stop = function () {
            for (var e = this.inAnim(), t = 0, n = e.length; n > t; t++)e[t].stop();
            return this
          }, d.animate = function (e, r, i, a) {
            "function" != typeof i || i.length || (a = i, i = n.linear), e instanceof _ && (a = e.callback, i = e.easing, r = i.dur, e = e.attr);
            var o, s, u, l, p = [], d = [], m = {}, g = this;
            for (var v in e)if (e[b](v)) {
              g.equal ? (l = g.equal(v, h(e[v])), o = l.from, s = l.to, u = l.f) : (o = +g.attr(v), s = +e[v]);
              var y = f(o, "array") ? o.length : 1;
              m[v] = c(p.length, p.length + y, u), p = p.concat(o), d = d.concat(s)
            }
            var w = n.time(), x = n(p, d, w, w + r, n.time, function (e) {
              var t = {};
              for (var n in m)m[b](n) && (t[n] = m[n](e));
              g.attr(t)
            }, i);
            return g.anims[x.id] = x, x._attrs = e, x._callback = a, t("snap.animcreated." + g.id, x), t.once("mina.finish." + x.id, function () {
              delete g.anims[x.id], a && a.call(g)
            }), t.once("mina.stop." + x.id, function () {
              delete g.anims[x.id]
            }), g
          };
          var A = {};
          d.data = function (e, n) {
            var i = A[this.id] = A[this.id] || {};
            if (0 == arguments.length)return t("snap.data.get." + this.id, this, i, null), i;
            if (1 == arguments.length) {
              if (r.is(e, "object")) {
                for (var a in e)e[b](a) && this.data(a, e[a]);
                return this
              }
              return t("snap.data.get." + this.id, this, i[e], e), i[e]
            }
            return i[e] = n, t("snap.data.set." + this.id, this, n, e), this
          }, d.removeData = function (e) {
            return null == e ? A[this.id] = {} : A[this.id] && delete A[this.id][e], this
          }, d.outerSVG = d.toString = p(1), d.innerSVG = p(), d.toDataURL = function () {
            if (e && e.btoa) {
              var t = this.getBBox(), n = r.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>', {
                x: +t.x.toFixed(3),
                y: +t.y.toFixed(3),
                width: +t.width.toFixed(3),
                height: +t.height.toFixed(3),
                contents: this.outerSVG()
              });
              return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(n)))
            }
          }, s.prototype.select = d.select, s.prototype.selectAll = d.selectAll
        }), r.plugin(function (e) {
          function t(e, t, r, i, a, o) {
            return null == t && "[object SVGMatrix]" == n.call(e) ? (this.a = e.a, this.b = e.b, this.c = e.c, this.d = e.d, this.e = e.e, void(this.f = e.f)) : void(null != e ? (this.a = +e, this.b = +t, this.c = +r, this.d = +i, this.e = +a, this.f = +o) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0))
          }

          var n = Object.prototype.toString, r = String, i = Math, a = "";
          !function (n) {
            function o(e) {
              return e[0] * e[0] + e[1] * e[1]
            }

            function s(e) {
              var t = i.sqrt(o(e));
              e[0] && (e[0] /= t), e[1] && (e[1] /= t)
            }

            n.add = function (e, n, r, i, a, o) {
              var s, u, l, c, p = [[], [], []], d = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]], f = [[e, r, a], [n, i, o], [0, 0, 1]];
              for (e && e instanceof t && (f = [[e.a, e.c, e.e], [e.b, e.d, e.f], [0, 0, 1]]), s = 0; 3 > s; s++)for (u = 0; 3 > u; u++) {
                for (c = 0, l = 0; 3 > l; l++)c += d[s][l] * f[l][u];
                p[s][u] = c
              }
              return this.a = p[0][0], this.b = p[1][0], this.c = p[0][1], this.d = p[1][1], this.e = p[0][2], this.f = p[1][2], this
            }, n.invert = function () {
              var e = this, n = e.a * e.d - e.b * e.c;
              return new t(e.d / n, -e.b / n, -e.c / n, e.a / n, (e.c * e.f - e.d * e.e) / n, (e.b * e.e - e.a * e.f) / n)
            }, n.clone = function () {
              return new t(this.a, this.b, this.c, this.d, this.e, this.f)
            }, n.translate = function (e, t) {
              return this.add(1, 0, 0, 1, e, t)
            }, n.scale = function (e, t, n, r) {
              return null == t && (t = e), (n || r) && this.add(1, 0, 0, 1, n, r), this.add(e, 0, 0, t, 0, 0), (n || r) && this.add(1, 0, 0, 1, -n, -r), this
            }, n.rotate = function (t, n, r) {
              t = e.rad(t), n = n || 0, r = r || 0;
              var a = +i.cos(t).toFixed(9), o = +i.sin(t).toFixed(9);
              return this.add(a, o, -o, a, n, r), this.add(1, 0, 0, 1, -n, -r)
            }, n.x = function (e, t) {
              return e * this.a + t * this.c + this.e
            }, n.y = function (e, t) {
              return e * this.b + t * this.d + this.f
            }, n.get = function (e) {
              return +this[r.fromCharCode(97 + e)].toFixed(4)
            }, n.toString = function () {
              return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")"
            }, n.offset = function () {
              return [this.e.toFixed(4), this.f.toFixed(4)]
            }, n.determinant = function () {
              return this.a * this.d - this.b * this.c
            }, n.split = function () {
              var t = {};
              t.dx = this.e, t.dy = this.f;
              var n = [[this.a, this.c], [this.b, this.d]];
              t.scalex = i.sqrt(o(n[0])), s(n[0]), t.shear = n[0][0] * n[1][0] + n[0][1] * n[1][1], n[1] = [n[1][0] - n[0][0] * t.shear, n[1][1] - n[0][1] * t.shear], t.scaley = i.sqrt(o(n[1])), s(n[1]), t.shear /= t.scaley, this.determinant() < 0 && (t.scalex = -t.scalex);
              var r = -n[0][1], a = n[1][1];
              return 0 > a ? (t.rotate = e.deg(i.acos(a)), 0 > r && (t.rotate = 360 - t.rotate)) : t.rotate = e.deg(i.asin(r)), t.isSimple = !(+t.shear.toFixed(9) || t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate), t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate, t.noRotation = !+t.shear.toFixed(9) && !t.rotate, t
            }, n.toTransformString = function (e) {
              var t = e || this.split();
              return +t.shear.toFixed(9) ? "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)] : (t.scalex = +t.scalex.toFixed(4), t.scaley = +t.scaley.toFixed(4), t.rotate = +t.rotate.toFixed(4), (t.dx || t.dy ? "t" + [+t.dx.toFixed(4), +t.dy.toFixed(4)] : a) + (1 != t.scalex || 1 != t.scaley ? "s" + [t.scalex, t.scaley, 0, 0] : a) + (t.rotate ? "r" + [+t.rotate.toFixed(4), 0, 0] : a))
            }
          }(t.prototype), e.Matrix = t, e.matrix = function (e, n, r, i, a, o) {
            return new t(e, n, r, i, a, o)
          }
        }), r.plugin(function (e, n, r, i, a) {
          function o(r) {
            return function (i) {
              if (t.stop(), i instanceof a && 1 == i.node.childNodes.length && ("radialGradient" == i.node.firstChild.tagName || "linearGradient" == i.node.firstChild.tagName || "pattern" == i.node.firstChild.tagName) && (i = i.node.firstChild, f(this).appendChild(i), i = p(i)), i instanceof n)if ("radialGradient" == i.type || "linearGradient" == i.type || "pattern" == i.type) {
                i.node.id || m(i.node, {id: i.id});
                var o = g(i.node.id)
              } else o = i.attr(r); else if (o = e.color(i), o.error) {
                var s = e(f(this).ownerSVGElement).gradient(i);
                s ? (s.node.id || m(s.node, {id: s.id}), o = g(s.node.id)) : o = i
              } else o = v(o);
              var u = {};
              u[r] = o, m(this.node, u), this.node.style[r] = b
            }
          }

          function s(e) {
            t.stop(), e == +e && (e += "px"), this.node.style.fontSize = e
          }

          function u(e) {
            for (var t = [], n = e.childNodes, r = 0, i = n.length; i > r; r++) {
              var a = n[r];
              3 == a.nodeType && t.push(a.nodeValue), "tspan" == a.tagName && t.push(1 == a.childNodes.length && 3 == a.firstChild.nodeType ? a.firstChild.nodeValue : u(a))
            }
            return t
          }

          function l() {
            return t.stop(), this.node.style.fontSize
          }

          var c = e._.make, p = e._.wrap, d = e.is, f = e._.getSomeDefs, h = /^url\(#?([^)]+)\)$/, m = e._.$, g = e.url, v = String, y = e._.separator, b = "";
          t.on("snap.util.attr.mask", function (e) {
            if (e instanceof n || e instanceof a) {
              if (t.stop(), e instanceof a && 1 == e.node.childNodes.length && (e = e.node.firstChild, f(this).appendChild(e), e = p(e)), "mask" == e.type)var r = e; else r = c("mask", f(this)), r.node.appendChild(e.node);
              !r.node.id && m(r.node, {id: r.id}), m(this.node, {mask: g(r.id)})
            }
          }), function (e) {
            t.on("snap.util.attr.clip", e), t.on("snap.util.attr.clip-path", e), t.on("snap.util.attr.clipPath", e)
          }(function (e) {
            if (e instanceof n || e instanceof a) {
              if (t.stop(), "clipPath" == e.type)var r = e; else r = c("clipPath", f(this)), r.node.appendChild(e.node), !r.node.id && m(r.node, {id: r.id});
              m(this.node, {"clip-path": g(r.node.id || r.id)})
            }
          }), t.on("snap.util.attr.fill", o("fill")), t.on("snap.util.attr.stroke", o("stroke"));
          var w = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
          t.on("snap.util.grad.parse", function (e) {
            e = v(e);
            var t = e.match(w);
            if (!t)return null;
            var n = t[1], r = t[2], i = t[3];
            return r = r.split(/\s*,\s*/).map(function (e) {
              return +e == e ? +e : e
            }), 1 == r.length && 0 == r[0] && (r = []), i = i.split("-"), i = i.map(function (e) {
              e = e.split(":");
              var t = {color: e[0]};
              return e[1] && (t.offset = parseFloat(e[1])), t
            }), {type: n, params: r, stops: i}
          }), t.on("snap.util.attr.d", function (n) {
            t.stop(), d(n, "array") && d(n[0], "array") && (n = e.path.toString.call(n)), n = v(n), n.match(/[ruo]/i) && (n = e.path.toAbsolute(n)), m(this.node, {d: n})
          })(-1), t.on("snap.util.attr.#text", function (e) {
            t.stop(), e = v(e);
            for (var n = i.doc.createTextNode(e); this.node.firstChild;)this.node.removeChild(this.node.firstChild);
            this.node.appendChild(n)
          })(-1), t.on("snap.util.attr.path", function (e) {
            t.stop(), this.attr({d: e})
          })(-1), t.on("snap.util.attr.class", function (e) {
            t.stop(), this.node.className.baseVal = e
          })(-1), t.on("snap.util.attr.viewBox", function (e) {
            var n;
            n = d(e, "object") && "x"in e ? [e.x, e.y, e.width, e.height].join(" ") : d(e, "array") ? e.join(" ") : e, m(this.node, {viewBox: n}), t.stop()
          })(-1), t.on("snap.util.attr.transform", function (e) {
            this.transform(e), t.stop()
          })(-1), t.on("snap.util.attr.r", function (e) {
            "rect" == this.type && (t.stop(), m(this.node, {rx: e, ry: e}))
          })(-1), t.on("snap.util.attr.textpath", function (e) {
            if (t.stop(), "text" == this.type) {
              var r, i, a;
              if (!e && this.textPath) {
                for (i = this.textPath; i.node.firstChild;)this.node.appendChild(i.node.firstChild);
                return i.remove(), void delete this.textPath
              }
              if (d(e, "string")) {
                var o = f(this), s = p(o.parentNode).path(e);
                o.appendChild(s.node), r = s.id, s.attr({id: r})
              } else e = p(e), e instanceof n && (r = e.attr("id"), r || (r = e.id, e.attr({id: r})));
              if (r)if (i = this.textPath, a = this.node, i)i.attr({"xlink:href": "#" + r}); else {
                for (i = m("textPath", {"xlink:href": "#" + r}); a.firstChild;)i.appendChild(a.firstChild);
                a.appendChild(i), this.textPath = p(i)
              }
            }
          })(-1), t.on("snap.util.attr.text", function (e) {
            if ("text" == this.type) {
              for (var n = this.node, r = function (e) {
                var t = m("tspan");
                if (d(e, "array"))for (var n = 0; n < e.length; n++)t.appendChild(r(e[n])); else t.appendChild(i.doc.createTextNode(e));
                return t.normalize && t.normalize(), t
              }; n.firstChild;)n.removeChild(n.firstChild);
              for (var a = r(e); a.firstChild;)n.appendChild(a.firstChild)
            }
            t.stop()
          })(-1), t.on("snap.util.attr.fontSize", s)(-1), t.on("snap.util.attr.font-size", s)(-1), t.on("snap.util.getattr.transform", function () {
            return t.stop(), this.transform()
          })(-1), t.on("snap.util.getattr.textpath", function () {
            return t.stop(), this.textPath
          })(-1), function () {
            function n(n) {
              return function () {
                t.stop();
                var r = i.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + n);
                return "none" == r ? r : e(i.doc.getElementById(r.match(h)[1]))
              }
            }

            function r(e) {
              return function (n) {
                t.stop();
                var r = "marker" + e.charAt(0).toUpperCase() + e.substring(1);
                if ("" == n || !n)return void(this.node.style[r] = "none");
                if ("marker" == n.type) {
                  var i = n.node.id;
                  return i || m(n.node, {id: n.id}), void(this.node.style[r] = g(i))
                }
              }
            }

            t.on("snap.util.getattr.marker-end", n("end"))(-1), t.on("snap.util.getattr.markerEnd", n("end"))(-1), t.on("snap.util.getattr.marker-start", n("start"))(-1), t.on("snap.util.getattr.markerStart", n("start"))(-1), t.on("snap.util.getattr.marker-mid", n("mid"))(-1), t.on("snap.util.getattr.markerMid", n("mid"))(-1), t.on("snap.util.attr.marker-end", r("end"))(-1), t.on("snap.util.attr.markerEnd", r("end"))(-1), t.on("snap.util.attr.marker-start", r("start"))(-1), t.on("snap.util.attr.markerStart", r("start"))(-1), t.on("snap.util.attr.marker-mid", r("mid"))(-1), t.on("snap.util.attr.markerMid", r("mid"))(-1)
          }(), t.on("snap.util.getattr.r", function () {
            return "rect" == this.type && m(this.node, "rx") == m(this.node, "ry") ? (t.stop(), m(this.node, "rx")) : void 0
          })(-1), t.on("snap.util.getattr.text", function () {
            if ("text" == this.type || "tspan" == this.type) {
              t.stop();
              var e = u(this.node);
              return 1 == e.length ? e[0] : e
            }
          })(-1), t.on("snap.util.getattr.#text", function () {
            return this.node.textContent
          })(-1), t.on("snap.util.getattr.viewBox", function () {
            t.stop();
            var n = m(this.node, "viewBox");
            return n ? (n = n.split(y), e._.box(+n[0], +n[1], +n[2], +n[3])) : void 0
          })(-1), t.on("snap.util.getattr.points", function () {
            var e = m(this.node, "points");
            return t.stop(), e ? e.split(y) : void 0
          })(-1), t.on("snap.util.getattr.path", function () {
            var e = m(this.node, "d");
            return t.stop(), e
          })(-1), t.on("snap.util.getattr.class", function () {
            return this.node.className.baseVal
          })(-1), t.on("snap.util.getattr.fontSize", l)(-1), t.on("snap.util.getattr.font-size", l)(-1)
        }), r.plugin(function (n, r, i, a) {
          var o = i.prototype, s = n.is;
          o.rect = function (e, t, n, r, i, a) {
            var o;
            return null == a && (a = i), s(e, "object") && "[object Object]" == e ? o = e : null != e && (o = {
              x: e,
              y: t,
              width: n,
              height: r
            }, null != i && (o.rx = i, o.ry = a)), this.el("rect", o)
          }, o.circle = function (e, t, n) {
            var r;
            return s(e, "object") && "[object Object]" == e ? r = e : null != e && (r = {
              cx: e,
              cy: t,
              r: n
            }), this.el("circle", r)
          };
          var u = function () {
            function e() {
              this.parentNode.removeChild(this)
            }

            return function (t, n) {
              var r = a.doc.createElement("img"), i = a.doc.body;
              r.style.cssText = "position:absolute;left:-9999em;top:-9999em", r.onload = function () {
                n.call(r), r.onload = r.onerror = null, i.removeChild(r)
              }, r.onerror = e, i.appendChild(r), r.src = t
            }
          }();
          o.image = function (e, t, r, i, a) {
            var o = this.el("image");
            if (s(e, "object") && "src"in e)o.attr(e); else if (null != e) {
              var l = {"xlink:href": e, preserveAspectRatio: "none"};
              null != t && null != r && (l.x = t, l.y = r), null != i && null != a ? (l.width = i, l.height = a) : u(e, function () {
                n._.$(o.node, {width: this.offsetWidth, height: this.offsetHeight})
              }), n._.$(o.node, l)
            }
            return o
          }, o.ellipse = function (e, t, n, r) {
            var i;
            return s(e, "object") && "[object Object]" == e ? i = e : null != e && (i = {
              cx: e,
              cy: t,
              rx: n,
              ry: r
            }), this.el("ellipse", i)
          }, o.path = function (e) {
            var t;
            return s(e, "object") && !s(e, "array") ? t = e : e && (t = {d: e}), this.el("path", t)
          }, o.group = o.g = function (e) {
            var t = this.el("g");
            return 1 == arguments.length && e && !e.type ? t.attr(e) : arguments.length && t.add(Array.prototype.slice.call(arguments, 0)), t
          }, o.svg = function (e, t, n, r, i, a, o, u) {
            var l = {};
            return s(e, "object") && null == t ? l = e : (null != e && (l.x = e), null != t && (l.y = t), null != n && (l.width = n), null != r && (l.height = r), null != i && null != a && null != o && null != u && (l.viewBox = [i, a, o, u])), this.el("svg", l)
          }, o.mask = function (e) {
            var t = this.el("mask");
            return 1 == arguments.length && e && !e.type ? t.attr(e) : arguments.length && t.add(Array.prototype.slice.call(arguments, 0)), t
          }, o.ptrn = function (e, t, n, r, i, a, o, u) {
            if (s(e, "object"))var l = e; else l = {patternUnits: "userSpaceOnUse"}, e && (l.x = e), t && (l.y = t), null != n && (l.width = n), null != r && (l.height = r), null != i && null != a && null != o && null != u && (l.viewBox = [i, a, o, u]);
            return this.el("pattern", l)
          }, o.use = function (e) {
            return null != e ? (e instanceof r && (e.attr("id") || e.attr({id: n._.id(e)}), e = e.attr("id")), "#" == String(e).charAt() && (e = e.substring(1)), this.el("use", {"xlink:href": "#" + e})) : r.prototype.use.call(this)
          }, o.symbol = function (e, t, n, r) {
            var i = {};
            return null != e && null != t && null != n && null != r && (i.viewBox = [e, t, n, r]), this.el("symbol", i)
          }, o.text = function (e, t, n) {
            var r = {};
            return s(e, "object") ? r = e : null != e && (r = {x: e, y: t, text: n || ""}), this.el("text", r)
          }, o.line = function (e, t, n, r) {
            var i = {};
            return s(e, "object") ? i = e : null != e && (i = {x1: e, x2: n, y1: t, y2: r}), this.el("line", i)
          }, o.polyline = function (e) {
            arguments.length > 1 && (e = Array.prototype.slice.call(arguments, 0));
            var t = {};
            return s(e, "object") && !s(e, "array") ? t = e : null != e && (t = {points: e}), this.el("polyline", t)
          }, o.polygon = function (e) {
            arguments.length > 1 && (e = Array.prototype.slice.call(arguments, 0));
            var t = {};
            return s(e, "object") && !s(e, "array") ? t = e : null != e && (t = {points: e}), this.el("polygon", t)
          }, function () {
            function r() {
              return this.selectAll("stop")
            }

            function i(e, t) {
              var r = c("stop"), i = {offset: +t + "%"};
              return e = n.color(e), i["stop-color"] = e.hex, e.opacity < 1 && (i["stop-opacity"] = e.opacity), c(r, i), this.node.appendChild(r), this
            }

            function a() {
              if ("linearGradient" == this.type) {
                var e = c(this.node, "x1") || 0, t = c(this.node, "x2") || 1, r = c(this.node, "y1") || 0, i = c(this.node, "y2") || 0;
                return n._.box(e, r, math.abs(t - e), math.abs(i - r))
              }
              var a = this.node.cx || .5, o = this.node.cy || .5, s = this.node.r || 0;
              return n._.box(a - s, o - s, 2 * s, 2 * s)
            }

            function s(e, n) {
              function r(e, t) {
                for (var n = (t - p) / (e - d), r = d; e > r; r++)o[r].offset = +(+p + n * (r - d)).toFixed(2);
                d = e, p = t
              }

              var i, a = t("snap.util.grad.parse", null, n).firstDefined();
              if (!a)return null;
              a.params.unshift(e), i = "l" == a.type.toLowerCase() ? u.apply(0, a.params) : l.apply(0, a.params), a.type != a.type.toLowerCase() && c(i.node, {gradientUnits: "userSpaceOnUse"});
              var o = a.stops, s = o.length, p = 0, d = 0;
              s--;
              for (var f = 0; s > f; f++)"offset"in o[f] && r(f, o[f].offset);
              for (o[s].offset = o[s].offset || 100, r(s, o[s].offset), f = 0; s >= f; f++) {
                var h = o[f];
                i.addStop(h.color, h.offset)
              }
              return i
            }

            function u(e, t, o, s, u) {
              var l = n._.make("linearGradient", e);
              return l.stops = r, l.addStop = i, l.getBBox = a, null != t && c(l.node, {x1: t, y1: o, x2: s, y2: u}), l
            }

            function l(e, t, o, s, u, l) {
              var p = n._.make("radialGradient", e);
              return p.stops = r, p.addStop = i, p.getBBox = a, null != t && c(p.node, {
                cx: t,
                cy: o,
                r: s
              }), null != u && null != l && c(p.node, {fx: u, fy: l}), p
            }

            var c = n._.$;
            o.gradient = function (e) {
              return s(this.defs, e)
            }, o.gradientLinear = function (e, t, n, r) {
              return u(this.defs, e, t, n, r)
            }, o.gradientRadial = function (e, t, n, r, i) {
              return l(this.defs, e, t, n, r, i)
            }, o.toString = function () {
              var e, t = this.node.ownerDocument, r = t.createDocumentFragment(), i = t.createElement("div"), a = this.node.cloneNode(!0);
              return r.appendChild(i), i.appendChild(a), n._.$(a, {xmlns: "http://www.w3.org/2000/svg"}), e = i.innerHTML, r.removeChild(r.firstChild), e
            }, o.toDataURL = function () {
              return e && e.btoa ? "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this))) : void 0
            }, o.clear = function () {
              for (var e, t = this.node.firstChild; t;)e = t.nextSibling, "defs" != t.tagName ? t.parentNode.removeChild(t) : o.clear.call({node: t}), t = e
            }
          }()
        }), r.plugin(function (e, t) {
          function n(e) {
            var t = n.ps = n.ps || {};
            return t[e] ? t[e].sleep = 100 : t[e] = {sleep: 100}, setTimeout(function () {
              for (var n in t)t[L](n) && n != e && (t[n].sleep--, !t[n].sleep && delete t[n])
            }), t[e]
          }

          function r(e, t, n, r) {
            return null == e && (e = t = n = r = 0), null == t && (t = e.y, n = e.width, r = e.height, e = e.x), {
              x: e,
              y: t,
              width: n,
              w: n,
              height: r,
              h: r,
              x2: e + n,
              y2: t + r,
              cx: e + n / 2,
              cy: t + r / 2,
              r1: B.min(n, r) / 2,
              r2: B.max(n, r) / 2,
              r0: B.sqrt(n * n + r * r) / 2,
              path: E(e, t, n, r),
              vb: [e, t, n, r].join(" ")
            }
          }

          function i() {
            return this.join(",").replace(F, "$1")
          }

          function a(e) {
            var t = O(e);
            return t.toString = i, t
          }

          function o(e, t, n, r, i, a, o, s, l) {
            return null == l ? f(e, t, n, r, i, a, o, s) : u(e, t, n, r, i, a, o, s, h(e, t, n, r, i, a, o, s, l))
          }

          function s(n, r) {
            function i(e) {
              return +(+e).toFixed(3)
            }

            return e._.cacher(function (e, a, s) {
              e instanceof t && (e = e.attr("d")), e = I(e);
              for (var l, c, p, d, f, h = "", m = {}, g = 0, v = 0, y = e.length; y > v; v++) {
                if (p = e[v], "M" == p[0])l = +p[1], c = +p[2]; else {
                  if (d = o(l, c, p[1], p[2], p[3], p[4], p[5], p[6]), g + d > a) {
                    if (r && !m.start) {
                      if (f = o(l, c, p[1], p[2], p[3], p[4], p[5], p[6], a - g), h += ["C" + i(f.start.x), i(f.start.y), i(f.m.x), i(f.m.y), i(f.x), i(f.y)], s)return h;
                      m.start = h, h = ["M" + i(f.x), i(f.y) + "C" + i(f.n.x), i(f.n.y), i(f.end.x), i(f.end.y), i(p[5]), i(p[6])].join(), g += d, l = +p[5], c = +p[6];
                      continue
                    }
                    if (!n && !r)return f = o(l, c, p[1], p[2], p[3], p[4], p[5], p[6], a - g)
                  }
                  g += d, l = +p[5], c = +p[6]
                }
                h += p.shift() + p
              }
              return m.end = h, f = n ? g : r ? m : u(l, c, p[0], p[1], p[2], p[3], p[4], p[5], 1)
            }, null, e._.clone)
          }

          function u(e, t, n, r, i, a, o, s, u) {
            var l = 1 - u, c = z(l, 3), p = z(l, 2), d = u * u, f = d * u, h = c * e + 3 * p * u * n + 3 * l * u * u * i + f * o, m = c * t + 3 * p * u * r + 3 * l * u * u * a + f * s, g = e + 2 * u * (n - e) + d * (i - 2 * n + e), v = t + 2 * u * (r - t) + d * (a - 2 * r + t), y = n + 2 * u * (i - n) + d * (o - 2 * i + n), b = r + 2 * u * (a - r) + d * (s - 2 * a + r), w = l * e + u * n, x = l * t + u * r, E = l * i + u * o, _ = l * a + u * s, A = 90 - 180 * B.atan2(g - y, v - b) / U;
            return {x: h, y: m, m: {x: g, y: v}, n: {x: y, y: b}, start: {x: w, y: x}, end: {x: E, y: _}, alpha: A}
          }

          function l(t, n, i, a, o, s, u, l) {
            e.is(t, "array") || (t = [t, n, i, a, o, s, u, l]);
            var c = k.apply(null, t);
            return r(c.min.x, c.min.y, c.max.x - c.min.x, c.max.y - c.min.y)
          }

          function c(e, t, n) {
            return t >= e.x && t <= e.x + e.width && n >= e.y && n <= e.y + e.height
          }

          function p(e, t) {
            return e = r(e), t = r(t), c(t, e.x, e.y) || c(t, e.x2, e.y) || c(t, e.x, e.y2) || c(t, e.x2, e.y2) || c(e, t.x, t.y) || c(e, t.x2, t.y) || c(e, t.x, t.y2) || c(e, t.x2, t.y2) || (e.x < t.x2 && e.x > t.x || t.x < e.x2 && t.x > e.x) && (e.y < t.y2 && e.y > t.y || t.y < e.y2 && t.y > e.y)
          }

          function d(e, t, n, r, i) {
            var a = -3 * t + 9 * n - 9 * r + 3 * i, o = e * a + 6 * t - 12 * n + 6 * r;
            return e * o - 3 * t + 3 * n
          }

          function f(e, t, n, r, i, a, o, s, u) {
            null == u && (u = 1), u = u > 1 ? 1 : 0 > u ? 0 : u;
            for (var l = u / 2, c = 12, p = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], f = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], h = 0, m = 0; c > m; m++) {
              var g = l * p[m] + l, v = d(g, e, n, i, o), y = d(g, t, r, a, s), b = v * v + y * y;
              h += f[m] * B.sqrt(b)
            }
            return l * h
          }

          function h(e, t, n, r, i, a, o, s, u) {
            if (!(0 > u || f(e, t, n, r, i, a, o, s) < u)) {
              var l, c = 1, p = c / 2, d = c - p, h = .01;
              for (l = f(e, t, n, r, i, a, o, s, d); G(l - u) > h;)p /= 2, d += (u > l ? 1 : -1) * p, l = f(e, t, n, r, i, a, o, s, d);
              return d
            }
          }

          function m(e, t, n, r, i, a, o, s) {
            if (!(j(e, n) < V(i, o) || V(e, n) > j(i, o) || j(t, r) < V(a, s) || V(t, r) > j(a, s))) {
              var u = (e * r - t * n) * (i - o) - (e - n) * (i * s - a * o), l = (e * r - t * n) * (a - s) - (t - r) * (i * s - a * o), c = (e - n) * (a - s) - (t - r) * (i - o);
              if (c) {
                var p = u / c, d = l / c, f = +p.toFixed(2), h = +d.toFixed(2);
                if (!(f < +V(e, n).toFixed(2) || f > +j(e, n).toFixed(2) || f < +V(i, o).toFixed(2) || f > +j(i, o).toFixed(2) || h < +V(t, r).toFixed(2) || h > +j(t, r).toFixed(2) || h < +V(a, s).toFixed(2) || h > +j(a, s).toFixed(2)))return {
                  x: p,
                  y: d
                }
              }
            }
          }

          function g(e, t, n) {
            var r = l(e), i = l(t);
            if (!p(r, i))return n ? 0 : [];
            for (var a = f.apply(0, e), o = f.apply(0, t), s = ~~(a / 8), c = ~~(o / 8), d = [], h = [], g = {}, v = n ? 0 : [], y = 0; s + 1 > y; y++) {
              var b = u.apply(0, e.concat(y / s));
              d.push({x: b.x, y: b.y, t: y / s})
            }
            for (y = 0; c + 1 > y; y++)b = u.apply(0, t.concat(y / c)), h.push({x: b.x, y: b.y, t: y / c});
            for (y = 0; s > y; y++)for (var w = 0; c > w; w++) {
              var x = d[y], E = d[y + 1], _ = h[w], A = h[w + 1], S = G(E.x - x.x) < .001 ? "y" : "x", C = G(A.x - _.x) < .001 ? "y" : "x", T = m(x.x, x.y, E.x, E.y, _.x, _.y, A.x, A.y);
              if (T) {
                if (g[T.x.toFixed(4)] == T.y.toFixed(4))continue;
                g[T.x.toFixed(4)] = T.y.toFixed(4);
                var D = x.t + G((T[S] - x[S]) / (E[S] - x[S])) * (E.t - x.t), k = _.t + G((T[C] - _[C]) / (A[C] - _[C])) * (A.t - _.t);
                D >= 0 && 1 >= D && k >= 0 && 1 >= k && (n ? v++ : v.push({x: T.x, y: T.y, t1: D, t2: k}))
              }
            }
            return v
          }

          function v(e, t) {
            return b(e, t)
          }

          function y(e, t) {
            return b(e, t, 1)
          }

          function b(e, t, n) {
            e = I(e), t = I(t);
            for (var r, i, a, o, s, u, l, c, p, d, f = n ? 0 : [], h = 0, m = e.length; m > h; h++) {
              var v = e[h];
              if ("M" == v[0])r = s = v[1], i = u = v[2]; else {
                "C" == v[0] ? (p = [r, i].concat(v.slice(1)), r = p[6], i = p[7]) : (p = [r, i, r, i, s, u, s, u], r = s, i = u);
                for (var y = 0, b = t.length; b > y; y++) {
                  var w = t[y];
                  if ("M" == w[0])a = l = w[1], o = c = w[2]; else {
                    "C" == w[0] ? (d = [a, o].concat(w.slice(1)), a = d[6], o = d[7]) : (d = [a, o, a, o, l, c, l, c], a = l, o = c);
                    var x = g(p, d, n);
                    if (n)f += x; else {
                      for (var E = 0, _ = x.length; _ > E; E++)x[E].segment1 = h, x[E].segment2 = y, x[E].bez1 = p, x[E].bez2 = d;
                      f = f.concat(x)
                    }
                  }
                }
              }
            }
            return f
          }

          function w(e, t, n) {
            var r = x(e);
            return c(r, t, n) && b(e, [["M", t, n], ["H", r.x2 + 10]], 1) % 2 == 1
          }

          function x(e) {
            var t = n(e);
            if (t.bbox)return O(t.bbox);
            if (!e)return r();
            e = I(e);
            for (var i, a = 0, o = 0, s = [], u = [], l = 0, c = e.length; c > l; l++)if (i = e[l], "M" == i[0])a = i[1], o = i[2], s.push(a), u.push(o); else {
              var p = k(a, o, i[1], i[2], i[3], i[4], i[5], i[6]);
              s = s.concat(p.min.x, p.max.x), u = u.concat(p.min.y, p.max.y), a = i[5], o = i[6]
            }
            var d = V.apply(0, s), f = V.apply(0, u), h = j.apply(0, s), m = j.apply(0, u), g = r(d, f, h - d, m - f);
            return t.bbox = O(g), g
          }

          function E(e, t, n, r, a) {
            if (a)return [["M", +e + +a, t], ["l", n - 2 * a, 0], ["a", a, a, 0, 0, 1, a, a], ["l", 0, r - 2 * a], ["a", a, a, 0, 0, 1, -a, a], ["l", 2 * a - n, 0], ["a", a, a, 0, 0, 1, -a, -a], ["l", 0, 2 * a - r], ["a", a, a, 0, 0, 1, a, -a], ["z"]];
            var o = [["M", e, t], ["l", n, 0], ["l", 0, r], ["l", -n, 0], ["z"]];
            return o.toString = i, o
          }

          function _(e, t, n, r, a) {
            if (null == a && null == r && (r = n), e = +e, t = +t, n = +n, r = +r, null != a)var o = Math.PI / 180, s = e + n * Math.cos(-r * o), u = e + n * Math.cos(-a * o), l = t + n * Math.sin(-r * o), c = t + n * Math.sin(-a * o), p = [["M", s, l], ["A", n, n, 0, +(a - r > 180), 0, u, c]]; else p = [["M", e, t], ["m", 0, -r], ["a", n, r, 0, 1, 1, 0, 2 * r], ["a", n, r, 0, 1, 1, 0, -2 * r], ["z"]];
            return p.toString = i, p
          }

          function A(t) {
            var r = n(t), o = String.prototype.toLowerCase;
            if (r.rel)return a(r.rel);
            e.is(t, "array") && e.is(t && t[0], "array") || (t = e.parsePathString(t));
            var s = [], u = 0, l = 0, c = 0, p = 0, d = 0;
            "M" == t[0][0] && (u = t[0][1], l = t[0][2], c = u, p = l, d++, s.push(["M", u, l]));
            for (var f = d, h = t.length; h > f; f++) {
              var m = s[f] = [], g = t[f];
              if (g[0] != o.call(g[0]))switch (m[0] = o.call(g[0]), m[0]) {
                case"a":
                  m[1] = g[1], m[2] = g[2], m[3] = g[3], m[4] = g[4], m[5] = g[5], m[6] = +(g[6] - u).toFixed(3), m[7] = +(g[7] - l).toFixed(3);
                  break;
                case"v":
                  m[1] = +(g[1] - l).toFixed(3);
                  break;
                case"m":
                  c = g[1], p = g[2];
                default:
                  for (var v = 1, y = g.length; y > v; v++)m[v] = +(g[v] - (v % 2 ? u : l)).toFixed(3)
              } else {
                m = s[f] = [], "m" == g[0] && (c = g[1] + u, p = g[2] + l);
                for (var b = 0, w = g.length; w > b; b++)s[f][b] = g[b]
              }
              var x = s[f].length;
              switch (s[f][0]) {
                case"z":
                  u = c, l = p;
                  break;
                case"h":
                  u += +s[f][x - 1];
                  break;
                case"v":
                  l += +s[f][x - 1];
                  break;
                default:
                  u += +s[f][x - 2], l += +s[f][x - 1]
              }
            }
            return s.toString = i, r.rel = a(s), s
          }

          function S(t) {
            var r = n(t);
            if (r.abs)return a(r.abs);
            if (N(t, "array") && N(t && t[0], "array") || (t = e.parsePathString(t)), !t || !t.length)return [["M", 0, 0]];
            var o, s = [], u = 0, l = 0, c = 0, p = 0, d = 0;
            "M" == t[0][0] && (u = +t[0][1], l = +t[0][2], c = u, p = l, d++, s[0] = ["M", u, l]);
            for (var f, h, m = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), g = d, v = t.length; v > g; g++) {
              if (s.push(f = []), h = t[g], o = h[0], o != o.toUpperCase())switch (f[0] = o.toUpperCase(), f[0]) {
                case"A":
                  f[1] = h[1], f[2] = h[2], f[3] = h[3], f[4] = h[4], f[5] = h[5], f[6] = +h[6] + u, f[7] = +h[7] + l;
                  break;
                case"V":
                  f[1] = +h[1] + l;
                  break;
                case"H":
                  f[1] = +h[1] + u;
                  break;
                case"R":
                  for (var y = [u, l].concat(h.slice(1)), b = 2, w = y.length; w > b; b++)y[b] = +y[b] + u, y[++b] = +y[b] + l;
                  s.pop(), s = s.concat(R(y, m));
                  break;
                case"O":
                  s.pop(), y = _(u, l, h[1], h[2]), y.push(y[0]), s = s.concat(y);
                  break;
                case"U":
                  s.pop(), s = s.concat(_(u, l, h[1], h[2], h[3])), f = ["U"].concat(s[s.length - 1].slice(-2));
                  break;
                case"M":
                  c = +h[1] + u, p = +h[2] + l;
                default:
                  for (b = 1, w = h.length; w > b; b++)f[b] = +h[b] + (b % 2 ? u : l)
              } else if ("R" == o)y = [u, l].concat(h.slice(1)), s.pop(), s = s.concat(R(y, m)), f = ["R"].concat(h.slice(-2)); else if ("O" == o)s.pop(), y = _(u, l, h[1], h[2]), y.push(y[0]), s = s.concat(y); else if ("U" == o)s.pop(), s = s.concat(_(u, l, h[1], h[2], h[3])), f = ["U"].concat(s[s.length - 1].slice(-2)); else for (var x = 0, E = h.length; E > x; x++)f[x] = h[x];
              if (o = o.toUpperCase(), "O" != o)switch (f[0]) {
                case"Z":
                  u = +c, l = +p;
                  break;
                case"H":
                  u = f[1];
                  break;
                case"V":
                  l = f[1];
                  break;
                case"M":
                  c = f[f.length - 2], p = f[f.length - 1];
                default:
                  u = f[f.length - 2], l = f[f.length - 1]
              }
            }
            return s.toString = i, r.abs = a(s), s
          }

          function C(e, t, n, r) {
            return [e, t, n, r, n, r]
          }

          function T(e, t, n, r, i, a) {
            var o = 1 / 3, s = 2 / 3;
            return [o * e + s * n, o * t + s * r, o * i + s * n, o * a + s * r, i, a]
          }

          function D(t, n, r, i, a, o, s, u, l, c) {
            var p, d = 120 * U / 180, f = U / 180 * (+a || 0), h = [], m = e._.cacher(function (e, t, n) {
              var r = e * B.cos(n) - t * B.sin(n), i = e * B.sin(n) + t * B.cos(n);
              return {x: r, y: i}
            });
            if (c)A = c[0], S = c[1], E = c[2], _ = c[3]; else {
              p = m(t, n, -f), t = p.x, n = p.y, p = m(u, l, -f), u = p.x, l = p.y;
              var g = (B.cos(U / 180 * a), B.sin(U / 180 * a), (t - u) / 2), v = (n - l) / 2, y = g * g / (r * r) + v * v / (i * i);
              y > 1 && (y = B.sqrt(y), r = y * r, i = y * i);
              var b = r * r, w = i * i, x = (o == s ? -1 : 1) * B.sqrt(G((b * w - b * v * v - w * g * g) / (b * v * v + w * g * g))), E = x * r * v / i + (t + u) / 2, _ = x * -i * g / r + (n + l) / 2, A = B.asin(((n - _) / i).toFixed(9)), S = B.asin(((l - _) / i).toFixed(9));
              A = E > t ? U - A : A, S = E > u ? U - S : S, 0 > A && (A = 2 * U + A), 0 > S && (S = 2 * U + S), s && A > S && (A -= 2 * U), !s && S > A && (S -= 2 * U)
            }
            var C = S - A;
            if (G(C) > d) {
              var T = S, k = u, I = l;
              S = A + d * (s && S > A ? 1 : -1), u = E + r * B.cos(S), l = _ + i * B.sin(S), h = D(u, l, r, i, a, 0, s, k, I, [S, T, E, _])
            }
            C = S - A;
            var M = B.cos(A), R = B.sin(A), P = B.cos(S), N = B.sin(S), O = B.tan(C / 4), L = 4 / 3 * r * O, F = 4 / 3 * i * O, $ = [t, n], V = [t + L * R, n - F * M], j = [u + L * N, l - F * P], z = [u, l];
            if (V[0] = 2 * $[0] - V[0], V[1] = 2 * $[1] - V[1], c)return [V, j, z].concat(h);
            h = [V, j, z].concat(h).join().split(",");
            for (var Y = [], q = 0, W = h.length; W > q; q++)Y[q] = q % 2 ? m(h[q - 1], h[q], f).y : m(h[q], h[q + 1], f).x;
            return Y
          }

          function k(e, t, n, r, i, a, o, s) {
            for (var u, l, c, p, d, f, h, m, g = [], v = [[], []], y = 0; 2 > y; ++y)if (0 == y ? (l = 6 * e - 12 * n + 6 * i, u = -3 * e + 9 * n - 9 * i + 3 * o, c = 3 * n - 3 * e) : (l = 6 * t - 12 * r + 6 * a, u = -3 * t + 9 * r - 9 * a + 3 * s, c = 3 * r - 3 * t), G(u) < 1e-12) {
              if (G(l) < 1e-12)continue;
              p = -c / l, p > 0 && 1 > p && g.push(p)
            } else h = l * l - 4 * c * u, m = B.sqrt(h), 0 > h || (d = (-l + m) / (2 * u), d > 0 && 1 > d && g.push(d), f = (-l - m) / (2 * u), f > 0 && 1 > f && g.push(f));
            for (var b, w = g.length, x = w; w--;)p = g[w], b = 1 - p, v[0][w] = b * b * b * e + 3 * b * b * p * n + 3 * b * p * p * i + p * p * p * o, v[1][w] = b * b * b * t + 3 * b * b * p * r + 3 * b * p * p * a + p * p * p * s;
            return v[0][x] = e, v[1][x] = t, v[0][x + 1] = o, v[1][x + 1] = s, v[0].length = v[1].length = x + 2, {
              min: {
                x: V.apply(0, v[0]),
                y: V.apply(0, v[1])
              }, max: {x: j.apply(0, v[0]), y: j.apply(0, v[1])}
            }
          }

          function I(e, t) {
            var r = !t && n(e);
            if (!t && r.curve)return a(r.curve);
            for (var i = S(e), o = t && S(t), s = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, u = {
              x: 0,
              y: 0,
              bx: 0,
              by: 0,
              X: 0,
              Y: 0,
              qx: null,
              qy: null
            }, l = (function (e, t, n) {
              var r, i;
              if (!e)return ["C", t.x, t.y, t.x, t.y, t.x, t.y];
              switch (!(e[0]in{T: 1, Q: 1}) && (t.qx = t.qy = null), e[0]) {
                case"M":
                  t.X = e[1], t.Y = e[2];
                  break;
                case"A":
                  e = ["C"].concat(D.apply(0, [t.x, t.y].concat(e.slice(1))));
                  break;
                case"S":
                  "C" == n || "S" == n ? (r = 2 * t.x - t.bx, i = 2 * t.y - t.by) : (r = t.x, i = t.y), e = ["C", r, i].concat(e.slice(1));
                  break;
                case"T":
                  "Q" == n || "T" == n ? (t.qx = 2 * t.x - t.qx, t.qy = 2 * t.y - t.qy) : (t.qx = t.x, t.qy = t.y), e = ["C"].concat(T(t.x, t.y, t.qx, t.qy, e[1], e[2]));
                  break;
                case"Q":
                  t.qx = e[1], t.qy = e[2], e = ["C"].concat(T(t.x, t.y, e[1], e[2], e[3], e[4]));
                  break;
                case"L":
                  e = ["C"].concat(C(t.x, t.y, e[1], e[2]));
                  break;
                case"H":
                  e = ["C"].concat(C(t.x, t.y, e[1], t.y));
                  break;
                case"V":
                  e = ["C"].concat(C(t.x, t.y, t.x, e[1]));
                  break;
                case"Z":
                  e = ["C"].concat(C(t.x, t.y, t.X, t.Y))
              }
              return e
            }), c = function (e, t) {
              if (e[t].length > 7) {
                e[t].shift();
                for (var n = e[t]; n.length;)d[t] = "A", o && (f[t] = "A"), e.splice(t++, 0, ["C"].concat(n.splice(0, 6)));
                e.splice(t, 1), v = j(i.length, o && o.length || 0)
              }
            }, p = function (e, t, n, r, a) {
              e && t && "M" == e[a][0] && "M" != t[a][0] && (t.splice(a, 0, ["M", r.x, r.y]), n.bx = 0, n.by = 0, n.x = e[a][1], n.y = e[a][2], v = j(i.length, o && o.length || 0))
            }, d = [], f = [], h = "", m = "", g = 0, v = j(i.length, o && o.length || 0); v > g; g++) {
              i[g] && (h = i[g][0]), "C" != h && (d[g] = h, g && (m = d[g - 1])), i[g] = l(i[g], s, m), "A" != d[g] && "C" == h && (d[g] = "C"), c(i, g), o && (o[g] && (h = o[g][0]), "C" != h && (f[g] = h, g && (m = f[g - 1])), o[g] = l(o[g], u, m), "A" != f[g] && "C" == h && (f[g] = "C"), c(o, g)), p(i, o, s, u, g), p(o, i, u, s, g);
              var y = i[g], b = o && o[g], w = y.length, x = o && b.length;
              s.x = y[w - 2], s.y = y[w - 1], s.bx = $(y[w - 4]) || s.x, s.by = $(y[w - 3]) || s.y, u.bx = o && ($(b[x - 4]) || u.x), u.by = o && ($(b[x - 3]) || u.y), u.x = o && b[x - 2], u.y = o && b[x - 1]
            }
            return o || (r.curve = a(i)), o ? [i, o] : i
          }

          function M(e, t) {
            if (!t)return e;
            var n, r, i, a, o, s, u;
            for (e = I(e), i = 0, o = e.length; o > i; i++)for (u = e[i], a = 1, s = u.length; s > a; a += 2)n = t.x(u[a], u[a + 1]), r = t.y(u[a], u[a + 1]), u[a] = n, u[a + 1] = r;
            return e
          }

          function R(e, t) {
            for (var n = [], r = 0, i = e.length; i - 2 * !t > r; r += 2) {
              var a = [{x: +e[r - 2], y: +e[r - 1]}, {x: +e[r], y: +e[r + 1]}, {
                x: +e[r + 2],
                y: +e[r + 3]
              }, {x: +e[r + 4], y: +e[r + 5]}];
              t ? r ? i - 4 == r ? a[3] = {x: +e[0], y: +e[1]} : i - 2 == r && (a[2] = {
                x: +e[0],
                y: +e[1]
              }, a[3] = {x: +e[2], y: +e[3]}) : a[0] = {
                x: +e[i - 2],
                y: +e[i - 1]
              } : i - 4 == r ? a[3] = a[2] : r || (a[0] = {
                x: +e[r],
                y: +e[r + 1]
              }), n.push(["C", (-a[0].x + 6 * a[1].x + a[2].x) / 6, (-a[0].y + 6 * a[1].y + a[2].y) / 6, (a[1].x + 6 * a[2].x - a[3].x) / 6, (a[1].y + 6 * a[2].y - a[3].y) / 6, a[2].x, a[2].y])
            }
            return n
          }

          var P = t.prototype, N = e.is, O = e._.clone, L = "hasOwnProperty", F = /,?([a-z]),?/gi, $ = parseFloat, B = Math, U = B.PI, V = B.min, j = B.max, z = B.pow, G = B.abs, Y = s(1), q = s(), W = s(0, 1), H = e._unit2px, K = {
            path: function (e) {
              return e.attr("path")
            }, circle: function (e) {
              var t = H(e);
              return _(t.cx, t.cy, t.r)
            }, ellipse: function (e) {
              var t = H(e);
              return _(t.cx || 0, t.cy || 0, t.rx, t.ry)
            }, rect: function (e) {
              var t = H(e);
              return E(t.x || 0, t.y || 0, t.width, t.height, t.rx, t.ry)
            }, image: function (e) {
              var t = H(e);
              return E(t.x || 0, t.y || 0, t.width, t.height)
            }, line: function (e) {
              return "M" + [e.attr("x1") || 0, e.attr("y1") || 0, e.attr("x2"), e.attr("y2")]
            }, polyline: function (e) {
              return "M" + e.attr("points")
            }, polygon: function (e) {
              return "M" + e.attr("points") + "z"
            }, deflt: function (e) {
              var t = e.node.getBBox();
              return E(t.x, t.y, t.width, t.height)
            }
          };
          e.path = n, e.path.getTotalLength = Y, e.path.getPointAtLength = q, e.path.getSubpath = function (e, t, n) {
            if (this.getTotalLength(e) - n < 1e-6)return W(e, t).end;
            var r = W(e, n, 1);
            return t ? W(r, t).end : r
          }, P.getTotalLength = function () {
            return this.node.getTotalLength ? this.node.getTotalLength() : void 0
          }, P.getPointAtLength = function (e) {
            return q(this.attr("d"), e)
          }, P.getSubpath = function (t, n) {
            return e.path.getSubpath(this.attr("d"), t, n)
          }, e._.box = r, e.path.findDotsAtSegment = u, e.path.bezierBBox = l, e.path.isPointInsideBBox = c, e.path.isBBoxIntersect = p, e.path.intersection = v, e.path.intersectionNumber = y, e.path.isPointInside = w, e.path.getBBox = x, e.path.get = K, e.path.toRelative = A, e.path.toAbsolute = S, e.path.toCubic = I, e.path.map = M, e.path.toString = i, e.path.clone = a
        }), r.plugin(function (e, n, r, i) {
          for (var a = n.prototype, o = "hasOwnProperty", s = ("createTouch"in i.doc), u = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"], l = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
          }, c = (function (e, t) {
            var n = "y" == e ? "scrollTop" : "scrollLeft", r = t && t.node ? t.node.ownerDocument : i.doc;
            return r[n in r.documentElement ? "documentElement" : "body"][n]
          }), p = function () {
            this.returnValue = !1
          }, d = function () {
            return this.originalEvent.preventDefault()
          }, f = function () {
            this.cancelBubble = !0
          }, h = function () {
            return this.originalEvent.stopPropagation()
          }, m = function () {
            return i.doc.addEventListener ? function (e, t, n, r) {
              var i = s && l[t] ? l[t] : t, a = function (i) {
                var a = c("y", r), u = c("x", r);
                if (s && l[o](t))for (var p = 0, f = i.targetTouches && i.targetTouches.length; f > p; p++)if (i.targetTouches[p].target == e || e.contains(i.targetTouches[p].target)) {
                  var m = i;
                  i = i.targetTouches[p], i.originalEvent = m, i.preventDefault = d, i.stopPropagation = h;
                  break
                }
                var g = i.clientX + u, v = i.clientY + a;
                return n.call(r, i, g, v)
              };
              return t !== i && e.addEventListener(t, a, !1), e.addEventListener(i, a, !1), function () {
                return t !== i && e.removeEventListener(t, a, !1), e.removeEventListener(i, a, !1), !0
              }
            } : i.doc.attachEvent ? function (e, t, n, r) {
              var i = function (e) {
                e = e || r.node.ownerDocument.window.event;
                var t = c("y", r), i = c("x", r), a = e.clientX + i, o = e.clientY + t;
                return e.preventDefault = e.preventDefault || p, e.stopPropagation = e.stopPropagation || f, n.call(r, e, a, o)
              };
              e.attachEvent("on" + t, i);
              var a = function () {
                return e.detachEvent("on" + t, i), !0
              };
              return a
            } : void 0
          }(), g = [], v = function (e) {
            for (var n, r = e.clientX, i = e.clientY, a = c("y"), o = c("x"), u = g.length; u--;) {
              if (n = g[u], s) {
                for (var l, p = e.touches && e.touches.length; p--;)if (l = e.touches[p], l.identifier == n.el._drag.id || n.el.node.contains(l.target)) {
                  r = l.clientX, i = l.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
                  break
                }
              } else e.preventDefault();
              {
                var d = n.el.node;
                d.nextSibling, d.parentNode, d.style.display
              }
              r += o, i += a, t("snap.drag.move." + n.el.id, n.move_scope || n.el, r - n.el._drag.x, i - n.el._drag.y, r, i, e)
            }
          }, y = function (n) {
            e.unmousemove(v).unmouseup(y);
            for (var r, i = g.length; i--;)r = g[i], r.el._drag = {}, t("snap.drag.end." + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, n);
            g = []
          }, b = u.length; b--;)!function (t) {
            e[t] = a[t] = function (n, r) {
              return e.is(n, "function") && (this.events = this.events || [], this.events.push({
                name: t,
                f: n,
                unbind: m(this.node || document, t, n, r || this)
              })), this
            }, e["un" + t] = a["un" + t] = function (e) {
              for (var n = this.events || [], r = n.length; r--;)if (n[r].name == t && (n[r].f == e || !e))return n[r].unbind(), n.splice(r, 1), !n.length && delete this.events, this;
              return this
            }
          }(u[b]);
          a.hover = function (e, t, n, r) {
            return this.mouseover(e, n).mouseout(t, r || n)
          }, a.unhover = function (e, t) {
            return this.unmouseover(e).unmouseout(t)
          };
          var w = [];
          a.drag = function (n, r, i, a, o, s) {
            function u(u, l, c) {
              (u.originalEvent || u).preventDefault(), this._drag.x = l, this._drag.y = c, this._drag.id = u.identifier, !g.length && e.mousemove(v).mouseup(y), g.push({
                el: this,
                move_scope: a,
                start_scope: o,
                end_scope: s
              }), r && t.on("snap.drag.start." + this.id, r), n && t.on("snap.drag.move." + this.id, n), i && t.on("snap.drag.end." + this.id, i), t("snap.drag.start." + this.id, o || a || this, l, c, u)
            }

            if (!arguments.length) {
              var l;
              return this.drag(function (e, t) {
                this.attr({transform: l + (l ? "T" : "t") + [e, t]})
              }, function () {
                l = this.transform().local
              })
            }
            return this._drag = {}, w.push({el: this, start: u}), this.mousedown(u), this
          }, a.undrag = function () {
            for (var n = w.length; n--;)w[n].el == this && (this.unmousedown(w[n].start), w.splice(n, 1), t.unbind("snap.drag.*." + this.id));
            return !w.length && e.unmousemove(v).unmouseup(y), this
          }
        }), r.plugin(function (e, n, r) {
          var i = (n.prototype, r.prototype), a = /^\s*url\((.+)\)/, o = String, s = e._.$;
          e.filter = {}, i.filter = function (t) {
            var r = this;
            "svg" != r.type && (r = r.paper);
            var i = e.parse(o(t)), a = e._.id(), u = (r.node.offsetWidth, r.node.offsetHeight, s("filter"));
            return s(u, {id: a, filterUnits: "userSpaceOnUse"}), u.appendChild(i.node), r.defs.appendChild(u), new n(u)
          }, t.on("snap.util.getattr.filter", function () {
            t.stop();
            var n = s(this.node, "filter");
            if (n) {
              var r = o(n).match(a);
              return r && e.select(r[1])
            }
          }), t.on("snap.util.attr.filter", function (r) {
            if (r instanceof n && "filter" == r.type) {
              t.stop();
              var i = r.node.id;
              i || (s(r.node, {id: r.id}), i = r.id), s(this.node, {filter: e.url(i)})
            }
            r && "none" != r || (t.stop(), this.node.removeAttribute("filter"))
          }), e.filter.blur = function (t, n) {
            null == t && (t = 2);
            var r = null == n ? t : [t, n];
            return e.format('<feGaussianBlur stdDeviation="{def}"/>', {def: r})
          }, e.filter.blur.toString = function () {
            return this()
          }, e.filter.shadow = function (t, n, r, i, a) {
            return "string" == typeof r && (i = r, a = i, r = 4), "string" != typeof i && (a = i, i = "#000"), i = i || "#000", null == r && (r = 4), null == a && (a = 1), null == t && (t = 0, n = 2), null == n && (n = t), i = e.color(i), e.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', {
              color: i,
              dx: t,
              dy: n,
              blur: r,
              opacity: a
            })
          }, e.filter.shadow.toString = function () {
            return this()
          }, e.filter.grayscale = function (t) {
            return null == t && (t = 1), e.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
              a: .2126 + .7874 * (1 - t),
              b: .7152 - .7152 * (1 - t),
              c: .0722 - .0722 * (1 - t),
              d: .2126 - .2126 * (1 - t),
              e: .7152 + .2848 * (1 - t),
              f: .0722 - .0722 * (1 - t),
              g: .2126 - .2126 * (1 - t),
              h: .0722 + .9278 * (1 - t)
            })
          }, e.filter.grayscale.toString = function () {
            return this()
          }, e.filter.sepia = function (t) {
            return null == t && (t = 1), e.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
              a: .393 + .607 * (1 - t),
              b: .769 - .769 * (1 - t),
              c: .189 - .189 * (1 - t),
              d: .349 - .349 * (1 - t),
              e: .686 + .314 * (1 - t),
              f: .168 - .168 * (1 - t),
              g: .272 - .272 * (1 - t),
              h: .534 - .534 * (1 - t),
              i: .131 + .869 * (1 - t)
            })
          }, e.filter.sepia.toString = function () {
            return this()
          }, e.filter.saturate = function (t) {
            return null == t && (t = 1), e.format('<feColorMatrix type="saturate" values="{amount}"/>', {amount: 1 - t})
          }, e.filter.saturate.toString = function () {
            return this()
          }, e.filter.hueRotate = function (t) {
            return t = t || 0, e.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {angle: t})
          }, e.filter.hueRotate.toString = function () {
            return this()
          }, e.filter.invert = function (t) {
            return null == t && (t = 1), e.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', {
              amount: t,
              amount2: 1 - t
            })
          }, e.filter.invert.toString = function () {
            return this()
          }, e.filter.brightness = function (t) {
            return null == t && (t = 1), e.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', {amount: t})
          }, e.filter.brightness.toString = function () {
            return this()
          }, e.filter.contrast = function (t) {
            return null == t && (t = 1), e.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', {
              amount: t,
              amount2: .5 - t / 2
            })
          }, e.filter.contrast.toString = function () {
            return this()
          }
        }), r
      })
    }, {69: 69}],
    71: [function (e, t) {
      var n = t.exports = e(70);
      n.plugin(function (e, t) {
        t.prototype.children = function () {
          for (var t = [], n = this.node.childNodes, r = 0, i = n.length; i > r; r++)t[r] = new e(n[r]);
          return t
        }
      }), n.plugin(function (e, t) {
        function n(e) {
          return e.split(/\s+/)
        }

        function r(e) {
          return e.join(" ")
        }

        function i(e) {
          return n(e.attr("class") || "")
        }

        function a(e, t) {
          e.attr("class", r(t))
        }

        t.prototype.addClass = function (e) {
          var t, r, o = i(this), s = n(e);
          for (t = 0, r; r = s[t]; t++)-1 === o.indexOf(r) && o.push(r);
          return a(this, o), this
        }, t.prototype.hasClass = function (e) {
          if (!e)throw new Error("[snapsvg] syntax: hasClass(clsStr)");
          return -1 !== i(this).indexOf(e)
        }, t.prototype.removeClass = function (e) {
          var t, r, o, s = i(this), u = n(e);
          for (t = 0, r; r = u[t]; t++)o = s.indexOf(r), -1 !== o && s.splice(o, 1);
          return a(this, s), this
        }
      }), n.plugin(function (e, t) {
        t.prototype.translate = function (t, n) {
          var r = new e.Matrix;
          return r.translate(t, n), this.transform(r)
        }
      }), n.plugin(function (e) {
        e.create = function (t, n) {
          return e._.wrap(e._.$(t, n))
        }
      }), n.plugin(function (e) {
        e.createSnapAt = function (t, n, r) {
          var i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          return i.setAttribute("width", t), i.setAttribute("height", n), r || (r = document.body), r.appendChild(i), new e(i)
        }
      })
    }, {70: 70}],
    72: [function (e, t, n) {
      var r = function (e) {
        return "[object Array]" === Object.prototype.toString.call(e)
      }, i = function () {
        var e = Array.prototype.slice.call(arguments);
        1 === e.length && r(e[0]) && (e = e[0]);
        var t = e.pop();
        return t.$inject = e, t
      }, a = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, o = /\/\*([^\*]*)\*\//m, s = function (e) {
        if ("function" != typeof e)throw new Error('Cannot annotate "' + e + '". Expected a function!');
        var t = e.toString().match(a);
        return t[1] && t[1].split(",").map(function (e) {
            return t = e.match(o), t ? t[1].trim() : e.trim()
          }) || []
      };
      n.annotate = i, n.parse = s, n.isArray = r
    }, {}],
    73: [function (e, t) {
      t.exports = {annotate: e(72).annotate, Module: e(75), Injector: e(74)}
    }, {72: 72, 74: 74, 75: 75}],
    74: [function (e, t) {
      var n = e(75), r = e(72).parse, i = e(72).annotate, a = e(72).isArray, o = function (e, t) {
        t = t || {
            get: function (e) {
              throw s.push(e), p('No provider for "' + e + '"!')
            }
          };
        var s = [], u = this._providers = Object.create(t._providers || null), l = this._instances = Object.create(null), c = l.injector = this, p = function (e) {
          var t = s.join(" -> ");
          return s.length = 0, new Error(t ? e + " (Resolving: " + t + ")" : e)
        }, d = function (e) {
          if (!u[e] && -1 !== e.indexOf(".")) {
            for (var n = e.split("."), r = d(n.shift()); n.length;)r = r[n.shift()];
            return r
          }
          if (Object.hasOwnProperty.call(l, e))return l[e];
          if (Object.hasOwnProperty.call(u, e)) {
            if (-1 !== s.indexOf(e))throw s.push(e), p("Cannot resolve circular dependency!");
            return s.push(e), l[e] = u[e][0](u[e][1]), s.pop(), l[e]
          }
          return t.get(e)
        }, f = function (e) {
          var t = Object.create(e.prototype), n = h(e, t);
          return "object" == typeof n ? n : t
        }, h = function (e, t) {
          if ("function" != typeof e) {
            if (!a(e))throw new Error('Cannot invoke "' + e + '". Expected a function!');
            e = i(e.slice())
          }
          var n = e.$inject && e.$inject || r(e), o = n.map(function (e) {
            return d(e)
          });
          return e.apply(t, o)
        }, m = function (e) {
          return i(function (t) {
            return e.get(t)
          })
        }, g = function (e, t) {
          if (t && t.length) {
            var n, r, i, a, s = Object.create(null), l = Object.create(null), p = [], d = [], f = [];
            for (var h in u)n = u[h], -1 !== t.indexOf(h) && ("private" === n[2] ? (r = p.indexOf(n[3]), -1 === r ? (i = n[3].createChild([], t), a = m(i), p.push(n[3]), d.push(i), f.push(a), s[h] = [a, h, "private", i]) : s[h] = [f[r], h, "private", d[r]]) : s[h] = [n[2], n[1]], l[h] = !0), "factory" !== n[2] && "type" !== n[2] || !n[1].$scope || t.forEach(function (e) {
              -1 !== n[1].$scope.indexOf(e) && (s[h] = [n[2], n[1]], l[e] = !0)
            });
            t.forEach(function (e) {
              if (!l[e])throw new Error('No provider for "' + e + '". Cannot use provider from the parent!')
            }), e.unshift(s)
          }
          return new o(e, c)
        }, v = {
          factory: h, type: f, value: function (e) {
            return e
          }
        };
        e.forEach(function (e) {
          function t(e, t) {
            return "value" !== e && a(t) && (t = i(t.slice())), t
          }

          if (e instanceof n)e.forEach(function (e) {
            var n = e[0], r = e[1], i = e[2];
            u[n] = [v[r], t(r, i), r]
          }); else if ("object" == typeof e)if (e.__exports__) {
            var r = Object.keys(e).reduce(function (t, n) {
              return "__" !== n.substring(0, 2) && (t[n] = e[n]), t
            }, Object.create(null)), s = new o((e.__modules__ || []).concat([r]), c), l = i(function (e) {
              return s.get(e)
            });
            e.__exports__.forEach(function (e) {
              u[e] = [l, e, "private", s]
            })
          } else Object.keys(e).forEach(function (n) {
            if ("private" === e[n][2])return void(u[n] = e[n]);
            var r = e[n][0], i = e[n][1];
            u[n] = [v[r], t(r, i), r]
          })
        }), this.get = d, this.invoke = h, this.instantiate = f, this.createChild = g
      };
      t.exports = o
    }, {72: 72, 75: 75}],
    75: [function (e, t) {
      var n = function () {
        var e = [];
        this.factory = function (t, n) {
          return e.push([t, "factory", n]), this
        }, this.value = function (t, n) {
          return e.push([t, "value", n]), this
        }, this.type = function (t, n) {
          return e.push([t, "type", n]), this
        }, this.forEach = function (t) {
          e.forEach(t)
        }
      };
      t.exports = n
    }, {}],
    76: [function (e, t) {
      function n(e, t, n) {
        var i = -1, a = e ? e.length : 0;
        for (t = r(t, n, 3); ++i < a;)if (t(e[i], i, e))return i;
        return -1
      }

      var r = e(98);
      t.exports = n
    }, {98: 98}],
    77: [function (e, t) {
      function n(e, t, n) {
        var s = o(e) ? r : a;
        return ("function" != typeof t || "undefined" != typeof n) && (t = i(t, n, 3)), s(e, t)
      }

      var r = e(92), i = e(98), a = e(103), o = e(150);
      t.exports = n
    }, {103: 103, 150: 150, 92: 92, 98: 98}],
    78: [function (e, t) {
      function n(e, t, n) {
        var s = o(e) ? r : a;
        return t = i(t, n, 3), s(e, t)
      }

      var r = e(93), i = e(98), a = e(104), o = e(150);
      t.exports = n
    }, {104: 104, 150: 150, 93: 93, 98: 98}],
    79: [function (e, t) {
      function n(e, t, n) {
        if (s(e)) {
          var u = o(e, t, n);
          return u > -1 ? e[u] : void 0
        }
        return t = r(t, n, 3), a(e, t, i)
      }

      var r = e(98), i = e(102), a = e(105), o = e(76), s = e(150);
      t.exports = n
    }, {102: 102, 105: 105, 150: 150, 76: 76, 98: 98}],
    80: [function (e, t) {
      function n(e, t, n) {
        return "function" == typeof t && "undefined" == typeof n && o(e) ? r(e, t) : i(e, a(t, n, 3))
      }

      var r = e(91), i = e(102), a = e(127), o = e(150);
      t.exports = n
    }, {102: 102, 127: 127, 150: 150, 91: 91}],
    81: [function (e, t) {
      var n = e(130), r = Object.prototype, i = r.hasOwnProperty, a = n(function (e, t, n) {
        i.call(e, n) ? e[n].push(t) : e[n] = [t]
      });
      t.exports = a
    }, {130: 130}],
    82: [function (e, t) {
      function n(e, t, n) {
        var l = e ? e.length : 0;
        return a(l) || (e = s(e), l = e.length), l ? (n = "number" == typeof n ? 0 > n ? u(l + n, 0) : n || 0 : 0, "string" == typeof e || !i(e) && o(e) ? l > n && e.indexOf(t, n) > -1 : r(e, t, n) > -1) : !1
      }

      var r = e(110), i = e(150), a = e(140), o = e(156), s = e(165), u = Math.max;
      t.exports = n
    }, {110: 110, 140: 140, 150: 150, 156: 156, 165: 165}],
    83: [function (e, t) {
      function n(e, t, n) {
        var s = o(e) ? r : a;
        return t = i(t, n, 3), s(e, t)
      }

      var r = e(94), i = e(98), a = e(115), o = e(150);
      t.exports = n
    }, {115: 115, 150: 150, 94: 94, 98: 98}],
    84: [function (e, t) {
      function n(e, t, n, u) {
        var l = s(e) ? r : o;
        return l(e, i(t, u, 4), n, arguments.length < 3, a)
      }

      var r = e(95), i = e(98), a = e(102), o = e(121), s = e(150);
      t.exports = n
    }, {102: 102, 121: 121, 150: 150, 95: 95, 98: 98}],
    85: [function (e, t) {
      function n(e, t, n) {
        var s = o(e) ? r : a;
        return ("function" != typeof t || "undefined" != typeof n) && (t = i(t, n, 3)), s(e, t)
      }

      var r = e(96), i = e(98), a = e(124), o = e(150);
      t.exports = n
    }, {124: 124, 150: 150, 96: 96, 98: 98}],
    86: [function (e, t) {
      var n = e(152), r = n(r = Date.now) && r, i = r || function () {
          return (new Date).getTime()
        };
      t.exports = i
    }, {152: 152}],
    87: [function (e, t) {
      function n(e, t, n) {
        function s() {
          g && clearTimeout(g), d && clearTimeout(d), d = g = v = void 0
        }

        function u() {
          var n = t - (i() - h);
          if (0 >= n || n > t) {
            d && clearTimeout(d);
            var r = v;
            d = g = v = void 0, r && (y = i(), f = e.apply(m, p), g || d || (p = m = null))
          } else g = setTimeout(u, n)
        }

        function l() {
          g && clearTimeout(g), d = g = v = void 0, (w || b !== t) && (y = i(), f = e.apply(m, p), g || d || (p = m = null))
        }

        function c() {
          if (p = arguments, h = i(), m = this, v = w && (g || !x), b === !1)var n = x && !g; else {
            d || x || (y = h);
            var r = b - (h - y), a = 0 >= r || r > b;
            a ? (d && (d = clearTimeout(d)), y = h, f = e.apply(m, p)) : d || (d = setTimeout(l, r))
          }
          return a && g ? g = clearTimeout(g) : g || t === b || (g = setTimeout(u, t)), n && (a = !0, f = e.apply(m, p)), !a || g || d || (p = m = null), f
        }

        var p, d, f, h, m, g, v, y = 0, b = !1, w = !0;
        if ("function" != typeof e)throw new TypeError(a);
        if (t = 0 > t ? 0 : +t || 0, n === !0) {
          var x = !0;
          w = !1
        } else r(n) && (x = n.leading, b = "maxWait"in n && o(+n.maxWait || 0, t), w = "trailing"in n ? n.trailing : w);
        return c.cancel = s, c
      }

      var r = e(154), i = e(86), a = "Expected a function", o = Math.max;
      t.exports = n
    }, {154: 154, 86: 86}],
    88: [function (e, t) {
      function n(e) {
        return r(e, 1, arguments, 1)
      }

      var r = e(100);
      t.exports = n
    }, {100: 100}],
    89: [function (e, t) {
      (function (n) {
        function r(e) {
          var t = e ? e.length : 0;
          for (this.data = {hash: s(null), set: new o}; t--;)this.push(e[t])
        }

        var i = e(129), a = e(152), o = a(o = n.Set) && o, s = a(s = Object.create) && s;
        r.prototype.push = i, t.exports = r
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {129: 129, 152: 152}],
    90: [function (e, t) {
      function n(e, t) {
        var n = -1, r = e.length;
        for (t || (t = Array(r)); ++n < r;)t[n] = e[n];
        return t
      }

      t.exports = n
    }, {}],
    91: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = e.length; ++n < r && t(e[n], n, e) !== !1;);
        return e
      }

      t.exports = n
    }, {}],
    92: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = e.length; ++n < r;)if (!t(e[n], n, e))return !1;
        return !0
      }

      t.exports = n
    }, {}],
    93: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = e.length, i = -1, a = []; ++n < r;) {
          var o = e[n];
          t(o, n, e) && (a[++i] = o)
        }
        return a
      }

      t.exports = n
    }, {}],
    94: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = e.length, i = Array(r); ++n < r;)i[n] = t(e[n], n, e);
        return i
      }

      t.exports = n
    }, {}],
    95: [function (e, t) {
      function n(e, t, n, r) {
        var i = -1, a = e.length;
        for (r && a && (n = e[++i]); ++i < a;)n = t(n, e[i], i, e);
        return n
      }

      t.exports = n
    }, {}],
    96: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = e.length; ++n < r;)if (t(e[n], n, e))return !0;
        return !1
      }

      t.exports = n
    }, {}],
    97: [function (e, t) {
      function n(e, t, n) {
        var a = i(t);
        if (!n)return r(t, e, a);
        for (var o = -1, s = a.length; ++o < s;) {
          var u = a[o], l = e[u], c = n(l, t[u], u, e, t);
          (c === c ? c === l : l !== l) && ("undefined" != typeof l || u in e) || (e[u] = c)
        }
        return e
      }

      var r = e(99), i = e(160);
      t.exports = n
    }, {160: 160, 99: 99}],
    98: [function (e, t) {
      function n(e, t, n) {
        var l = typeof e;
        return "function" == l ? "undefined" != typeof t && u(e) ? o(e, t, n) : e : null == e ? s : "object" == l ? r(e) : "undefined" == typeof t ? a(e + "") : i(e + "", t)
      }

      var r = e(116), i = e(117), a = e(120), o = e(127), s = e(169), u = e(137);
      t.exports = n
    }, {116: 116, 117: 117, 120: 120, 127: 127, 137: 137, 169: 169}],
    99: [function (e, t) {
      function n(e, t, n) {
        n || (n = t, t = {});
        for (var r = -1, i = n.length; ++r < i;) {
          var a = n[r];
          t[a] = e[a]
        }
        return t
      }

      t.exports = n
    }, {}],
    100: [function (e, t) {
      function n(e, t, n, a) {
        if ("function" != typeof e)throw new TypeError(i);
        return setTimeout(function () {
          e.apply(void 0, r(n, a))
        }, t)
      }

      var r = e(123), i = "Expected a function";
      t.exports = n
    }, {123: 123}],
    101: [function (e, t) {
      function n(e, t) {
        var n = e ? e.length : 0, o = [];
        if (!n)return o;
        var s = -1, u = r, l = !0, c = l && t.length >= 200 ? a(t) : null, p = t.length;
        c && (u = i, l = !1, t = c);
        e:for (; ++s < n;) {
          var d = e[s];
          if (l && d === d) {
            for (var f = p; f--;)if (t[f] === d)continue e;
            o.push(d)
          } else u(t, d, 0) < 0 && o.push(d)
        }
        return o
      }

      var r = e(110), i = e(128), a = e(132);
      t.exports = n
    }, {110: 110, 128: 128, 132: 132}],
    102: [function (e, t) {
      function n(e, t) {
        var n = e ? e.length : 0;
        if (!i(n))return r(e, t);
        for (var o = -1, s = a(e); ++o < n && t(s[o], o, s) !== !1;);
        return e
      }

      var r = e(109), i = e(140), a = e(148);
      t.exports = n
    }, {109: 109, 140: 140, 148: 148}],
    103: [function (e, t) {
      function n(e, t) {
        var n = !0;
        return r(e, function (e, r, i) {
          return n = !!t(e, r, i)
        }), n
      }

      var r = e(102);
      t.exports = n
    }, {102: 102}],
    104: [function (e, t) {
      function n(e, t) {
        var n = [];
        return r(e, function (e, r, i) {
          t(e, r, i) && n.push(e)
        }), n
      }

      var r = e(102);
      t.exports = n
    }, {102: 102}],
    105: [function (e, t) {
      function n(e, t, n, r) {
        var i;
        return n(e, function (e, n, a) {
          return t(e, n, a) ? (i = r ? n : e, !1) : void 0
        }), i
      }

      t.exports = n
    }, {}],
    106: [function (e, t) {
      function n(e, t, s, u) {
        for (var l = u - 1, c = e.length, p = -1, d = []; ++l < c;) {
          var f = e[l];
          if (o(f) && a(f.length) && (i(f) || r(f))) {
            t && (f = n(f, t, s, 0));
            var h = -1, m = f.length;
            for (d.length += m; ++h < m;)d[++p] = f[h]
          } else s || (d[++p] = f)
        }
        return d
      }

      var r = e(149), i = e(150), a = e(140), o = e(141);
      t.exports = n
    }, {140: 140, 141: 141, 149: 149, 150: 150}],
    107: [function (e, t) {
      function n(e, t, n) {
        for (var i = -1, a = r(e), o = n(e), s = o.length; ++i < s;) {
          var u = o[i];
          if (t(a[u], u, a) === !1)break
        }
        return e
      }

      var r = e(148);
      t.exports = n
    }, {148: 148}],
    108: [function (e, t) {
      function n(e, t) {
        return r(e, t, i)
      }

      var r = e(107), i = e(161);
      t.exports = n
    }, {107: 107, 161: 161}],
    109: [function (e, t) {
      function n(e, t) {
        return r(e, t, i)
      }

      var r = e(107), i = e(160);
      t.exports = n
    }, {107: 107, 160: 160}],
    110: [function (e, t) {
      function n(e, t, n) {
        if (t !== t)return r(e, n);
        for (var i = n - 1, a = e.length; ++i < a;)if (e[i] === t)return i;
        return -1
      }

      var r = e(136);
      t.exports = n
    }, {136: 136}],
    111: [function (e, t) {
      function n(e, t, i, a, o, s) {
        if (e === t)return 0 !== e || 1 / e == 1 / t;
        var u = typeof e, l = typeof t;
        return "function" != u && "object" != u && "function" != l && "object" != l || null == e || null == t ? e !== e && t !== t : r(e, t, n, i, a, o, s)
      }

      var r = e(112);
      t.exports = n
    }, {112: 112}],
    112: [function (e, t) {
      function n(e, t, n, p, h, m, g) {
        var v = o(e), y = o(t), b = l, w = l;
        v || (b = f.call(e), b == u ? b = c : b != c && (v = s(e))), y || (w = f.call(t), w == u ? w = c : w != c && (y = s(t)));
        var x = b == c, E = w == c, _ = b == w;
        if (_ && !v && !x)return i(e, t, b);
        var A = x && d.call(e, "__wrapped__"), S = E && d.call(t, "__wrapped__");
        if (A || S)return n(A ? e.value() : e, S ? t.value() : t, p, h, m, g);
        if (!_)return !1;
        m || (m = []), g || (g = []);
        for (var C = m.length; C--;)if (m[C] == e)return g[C] == t;
        m.push(e), g.push(t);
        var T = (v ? r : a)(e, t, n, p, h, m, g);
        return m.pop(), g.pop(), T
      }

      var r = e(133), i = e(134), a = e(135), o = e(150), s = e(157), u = "[object Arguments]", l = "[object Array]", c = "[object Object]", p = Object.prototype, d = p.hasOwnProperty, f = p.toString;
      t.exports = n
    }, {133: 133, 134: 134, 135: 135, 150: 150, 157: 157}],
    113: [function (e, t) {
      function n(e) {
        return "function" == typeof e || !1
      }

      t.exports = n
    }, {}],
    114: [function (e, t) {
      function n(e, t, n, i, o) {
        var s = t.length;
        if (null == e)return !s;
        for (var u = -1, l = !o; ++u < s;)if (l && i[u] ? n[u] !== e[t[u]] : !a.call(e, t[u]))return !1;
        for (u = -1; ++u < s;) {
          var c = t[u];
          if (l && i[u])var p = a.call(e, c); else {
            var d = e[c], f = n[u];
            p = o ? o(d, f, c) : void 0, "undefined" == typeof p && (p = r(f, d, o, !0))
          }
          if (!p)return !1
        }
        return !0
      }

      var r = e(111), i = Object.prototype, a = i.hasOwnProperty;
      t.exports = n
    }, {111: 111}],
    115: [function (e, t) {
      function n(e, t) {
        var n = [];
        return r(e, function (e, r, i) {
          n.push(t(e, r, i))
        }), n
      }

      var r = e(102);
      t.exports = n
    }, {102: 102}],
    116: [function (e, t) {
      function n(e) {
        var t = a(e), n = t.length;
        if (1 == n) {
          var o = t[0], u = e[o];
          if (i(u))return function (e) {
            return null != e && e[o] === u && s.call(e, o)
          }
        }
        for (var l = Array(n), c = Array(n); n--;)u = e[t[n]], l[n] = u, c[n] = i(u);
        return function (e) {
          return r(e, t, l, c)
        }
      }

      var r = e(114), i = e(142), a = e(160), o = Object.prototype, s = o.hasOwnProperty;
      t.exports = n
    }, {114: 114, 142: 142, 160: 160}],
    117: [function (e, t) {
      function n(e, t) {
        return i(t) ? function (n) {
          return null != n && n[e] === t
        } : function (n) {
          return null != n && r(t, n[e], null, !0)
        }
      }

      var r = e(111), i = e(142);
      t.exports = n
    }, {111: 111, 142: 142}],
    118: [function (e, t) {
      function n(e, t, p, d, f) {
        if (!u(e))return e;
        var h = s(t.length) && (o(t) || c(t));
        return (h ? r : i)(t, function (t, r, i) {
          if (l(t))return d || (d = []), f || (f = []), a(e, i, r, n, p, d, f);
          var o = e[r], s = p ? p(o, t, r, e, i) : void 0, u = "undefined" == typeof s;
          u && (s = t), !h && "undefined" == typeof s || !u && (s === s ? s === o : o !== o) || (e[r] = s)
        }), e
      }

      var r = e(91), i = e(109), a = e(119), o = e(150), s = e(140), u = e(154), l = e(141), c = e(157);
      t.exports = n
    }, {109: 109, 119: 119, 140: 140, 141: 141, 150: 150, 154: 154, 157: 157, 91: 91}],
    119: [function (e, t) {
      function n(e, t, n, c, p, d, f) {
        for (var h = d.length, m = t[n]; h--;)if (d[h] == m)return void(e[n] = f[h]);
        var g = e[n], v = p ? p(g, m, n, e, t) : void 0, y = "undefined" == typeof v;
        y && (v = m, o(m.length) && (a(m) || u(m)) ? v = a(g) ? g : g ? r(g) : [] : s(m) || i(m) ? v = i(g) ? l(g) : s(g) ? g : {} : y = !1), d.push(m), f.push(v), y ? e[n] = c(v, m, p, d, f) : (v === v ? v !== g : g === g) && (e[n] = v)
      }

      var r = e(90), i = e(149), a = e(150), o = e(140), s = e(155), u = e(157), l = e(158);
      t.exports = n
    }, {140: 140, 149: 149, 150: 150, 155: 155, 157: 157, 158: 158, 90: 90}],
    120: [function (e, t) {
      function n(e) {
        return function (t) {
          return null == t ? void 0 : t[e]
        }
      }

      t.exports = n
    }, {}],
    121: [function (e, t) {
      function n(e, t, n, r, i) {
        return i(e, function (e, i, a) {
          n = r ? (r = !1, e) : t(n, e, i, a)
        }), n
      }

      t.exports = n
    }, {}],
    122: [function (e, t) {
      var n = e(169), r = e(143), i = r ? function (e, t) {
        return r.set(e, t), e
      } : n;
      t.exports = i
    }, {143: 143, 169: 169}],
    123: [function (e, t) {
      function n(e, t, n) {
        var r = -1, i = e.length;
        t = null == t ? 0 : +t || 0, 0 > t && (t = -t > i ? 0 : i + t), n = "undefined" == typeof n || n > i ? i : +n || 0, 0 > n && (n += i), i = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var a = Array(i); ++r < i;)a[r] = e[r + t];
        return a
      }

      t.exports = n
    }, {}],
    124: [function (e, t) {
      function n(e, t) {
        var n;
        return r(e, function (e, r, i) {
          return n = t(e, r, i), !n
        }), !!n
      }

      var r = e(102);
      t.exports = n
    }, {102: 102}],
    125: [function (e, t) {
      function n(e) {
        return "string" == typeof e ? e : null == e ? "" : e + ""
      }

      t.exports = n
    }, {}],
    126: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = t.length, i = Array(r); ++n < r;)i[n] = e[t[n]];
        return i
      }

      t.exports = n
    }, {}],
    127: [function (e, t) {
      function n(e, t, n) {
        if ("function" != typeof e)return r;
        if ("undefined" == typeof t)return e;
        switch (n) {
          case 1:
            return function (n) {
              return e.call(t, n)
            };
          case 3:
            return function (n, r, i) {
              return e.call(t, n, r, i)
            };
          case 4:
            return function (n, r, i, a) {
              return e.call(t, n, r, i, a)
            };
          case 5:
            return function (n, r, i, a, o) {
              return e.call(t, n, r, i, a, o)
            }
        }
        return function () {
          return e.apply(t, arguments)
        }
      }

      var r = e(169);
      t.exports = n
    }, {169: 169}],
    128: [function (e, t) {
      function n(e, t) {
        var n = e.data, i = "string" == typeof t || r(t) ? n.set.has(t) : n.hash[t];
        return i ? 0 : -1
      }

      var r = e(154);
      t.exports = n
    }, {154: 154}],
    129: [function (e, t) {
      function n(e) {
        var t = this.data;
        "string" == typeof e || r(e) ? t.set.add(e) : t.hash[e] = !0
      }

      var r = e(154);
      t.exports = n
    }, {154: 154}],
    130: [function (e, t) {
      function n(e, t) {
        return function (n, o, s) {
          var u = t ? t() : {};
          if (o = r(o, s, 3), a(n))for (var l = -1, c = n.length; ++l < c;) {
            var p = n[l];
            e(u, p, o(p, l, n), n)
          } else i(n, function (t, n, r) {
            e(u, t, o(t, n, r), r)
          });
          return u
        }
      }

      var r = e(98), i = e(102), a = e(150);
      t.exports = n
    }, {102: 102, 150: 150, 98: 98}],
    131: [function (e, t) {
      function n(e) {
        return function () {
          var t = arguments, n = t.length, a = t[0];
          if (2 > n || null == a)return a;
          var o = t[n - 2], s = t[n - 1], u = t[3];
          n > 3 && "function" == typeof o ? (o = r(o, s, 5), n -= 2) : (o = n > 2 && "function" == typeof s ? s : null, n -= o ? 1 : 0), u && i(t[1], t[2], u) && (o = 3 == n ? null : o, n = 2);
          for (var l = 0; ++l < n;) {
            var c = t[l];
            c && e(a, c, o)
          }
          return a
        }
      }

      var r = e(127), i = e(139);
      t.exports = n
    }, {127: 127, 139: 139}],
    132: [function (e, t) {
      (function (n) {
        var r = e(89), i = e(168), a = e(152), o = a(o = n.Set) && o, s = a(s = Object.create) && s, u = s && o ? function (e) {
          return new r(e)
        } : i(null);
        t.exports = u
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {152: 152, 168: 168, 89: 89}],
    133: [function (e, t) {
      function n(e, t, n, r, i, a, o) {
        var s = -1, u = e.length, l = t.length, c = !0;
        if (u != l && !(i && l > u))return !1;
        for (; c && ++s < u;) {
          var p = e[s], d = t[s];
          if (c = void 0, r && (c = i ? r(d, p, s) : r(p, d, s)), "undefined" == typeof c)if (i)for (var f = l; f-- && (d = t[f], !(c = p && p === d || n(p, d, r, i, a, o)));); else c = p && p === d || n(p, d, r, i, a, o)
        }
        return !!c
      }

      t.exports = n
    }, {}],
    134: [function (e, t) {
      function n(e, t, n) {
        switch (n) {
          case r:
          case i:
            return +e == +t;
          case a:
            return e.name == t.name && e.message == t.message;
          case o:
            return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
          case s:
          case u:
            return e == t + ""
        }
        return !1
      }

      var r = "[object Boolean]", i = "[object Date]", a = "[object Error]", o = "[object Number]", s = "[object RegExp]", u = "[object String]";
      t.exports = n
    }, {}],
    135: [function (e, t) {
      function n(e, t, n, i, o, s, u) {
        var l = r(e), c = l.length, p = r(t), d = p.length;
        if (c != d && !o)return !1;
        for (var f, h = -1; ++h < c;) {
          var m = l[h], g = a.call(t, m);
          if (g) {
            var v = e[m], y = t[m];
            g = void 0, i && (g = o ? i(y, v, m) : i(v, y, m)), "undefined" == typeof g && (g = v && v === y || n(v, y, i, o, s, u))
          }
          if (!g)return !1;
          f || (f = "constructor" == m)
        }
        if (!f) {
          var b = e.constructor, w = t.constructor;
          if (b != w && "constructor"in e && "constructor"in t && !("function" == typeof b && b instanceof b && "function" == typeof w && w instanceof w))return !1
        }
        return !0
      }

      var r = e(160), i = Object.prototype, a = i.hasOwnProperty;
      t.exports = n
    }, {160: 160}],
    136: [function (e, t) {
      function n(e, t, n) {
        for (var r = e.length, i = t + (n ? 0 : -1); n ? i-- : ++i < r;) {
          var a = e[i];
          if (a !== a)return i
        }
        return -1
      }

      t.exports = n
    }, {}],
    137: [function (e, t) {
      function n(e) {
        var t = !(a.funcNames ? e.name : a.funcDecomp);
        if (!t) {
          var n = u.call(e);
          a.funcNames || (t = !o.test(n)), t || (t = s.test(n) || i(e), r(e, t))
        }
        return t
      }

      var r = e(122), i = e(152), a = e(167), o = /^\s*function[ \n\r\t]+\w/, s = /\bthis\b/, u = Function.prototype.toString;
      t.exports = n
    }, {122: 122, 152: 152, 167: 167}],
    138: [function (e, t) {
      function n(e, t) {
        return e = +e, t = null == t ? r : t, e > -1 && e % 1 == 0 && t > e
      }

      var r = Math.pow(2, 53) - 1;
      t.exports = n
    }, {}],
    139: [function (e, t) {
      function n(e, t, n) {
        if (!a(n))return !1;
        var o = typeof t;
        if ("number" == o)var s = n.length, u = i(s) && r(t, s); else u = "string" == o && t in n;
        if (u) {
          var l = n[t];
          return e === e ? e === l : l !== l
        }
        return !1
      }

      var r = e(138), i = e(140), a = e(154);
      t.exports = n
    }, {138: 138, 140: 140, 154: 154}],
    140: [function (e, t) {
      function n(e) {
        return "number" == typeof e && e > -1 && e % 1 == 0 && r >= e
      }

      var r = Math.pow(2, 53) - 1;
      t.exports = n
    }, {}],
    141: [function (e, t) {
      function n(e) {
        return e && "object" == typeof e || !1
      }

      t.exports = n
    }, {}],
    142: [function (e, t) {
      function n(e) {
        return e === e && (0 === e ? 1 / e > 0 : !r(e))
      }

      var r = e(154);
      t.exports = n
    }, {154: 154}],
    143: [function (e, t) {
      (function (n) {
        var r = e(152), i = r(i = n.WeakMap) && i, a = i && new i;
        t.exports = a
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {152: 152}],
    144: [function (e, t) {
      function n(e, t) {
        e = r(e);
        for (var n = -1, i = t.length, a = {}; ++n < i;) {
          var o = t[n];
          o in e && (a[o] = e[o])
        }
        return a
      }

      var r = e(148);
      t.exports = n
    }, {148: 148}],
    145: [function (e, t) {
      function n(e, t) {
        var n = {};
        return r(e, function (e, r, i) {
          t(e, r, i) && (n[r] = e)
        }), n
      }

      var r = e(108);
      t.exports = n
    }, {108: 108}],
    146: [function (e, t) {
      function n(e) {
        var t;
        if (!i(e) || u.call(e) != a || !s.call(e, "constructor") && (t = e.constructor, "function" == typeof t && !(t instanceof t)))return !1;
        var n;
        return r(e, function (e, t) {
          n = t
        }), "undefined" == typeof n || s.call(e, n)
      }

      var r = e(108), i = e(141), a = "[object Object]", o = Object.prototype, s = o.hasOwnProperty, u = o.toString;
      t.exports = n
    }, {108: 108, 141: 141}],
    147: [function (e, t) {
      function n(e) {
        for (var t = s(e), n = t.length, l = n && e.length, p = l && o(l) && (i(e) || u.nonEnumArgs && r(e)), d = -1, f = []; ++d < n;) {
          var h = t[d];
          (p && a(h, l) || c.call(e, h)) && f.push(h)
        }
        return f
      }

      var r = e(149), i = e(150), a = e(138), o = e(140), s = e(161), u = e(167), l = Object.prototype, c = l.hasOwnProperty;
      t.exports = n
    }, {138: 138, 140: 140, 149: 149, 150: 150, 161: 161, 167: 167}],
    148: [function (e, t) {
      function n(e) {
        return r(e) ? e : Object(e)
      }

      var r = e(154);
      t.exports = n
    }, {154: 154}],
    149: [function (e, t) {
      function n(e) {
        var t = i(e) ? e.length : void 0;
        return r(t) && s.call(e) == a || !1
      }

      var r = e(140), i = e(141), a = "[object Arguments]", o = Object.prototype, s = o.toString;
      t.exports = n
    }, {140: 140, 141: 141}],
    150: [function (e, t) {
      var n = e(140), r = e(152), i = e(141), a = "[object Array]", o = Object.prototype, s = o.toString, u = r(u = Array.isArray) && u, l = u || function (e) {
          return i(e) && n(e.length) && s.call(e) == a || !1
        };
      t.exports = l
    }, {140: 140, 141: 141, 152: 152}],
    151: [function (e, t) {
      (function (n) {
        var r = e(113), i = e(152), a = "[object Function]", o = Object.prototype, s = o.toString, u = i(u = n.Uint8Array) && u, l = r(/x/) || u && !r(u) ? function (e) {
          return s.call(e) == a
        } : r;
        t.exports = l
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {113: 113, 152: 152}],
    152: [function (e, t) {
      function n(e) {
        return null == e ? !1 : l.call(e) == a ? c.test(u.call(e)) : i(e) && o.test(e) || !1
      }

      var r = e(166), i = e(141), a = "[object Function]", o = /^\[object .+?Constructor\]$/, s = Object.prototype, u = Function.prototype.toString, l = s.toString, c = RegExp("^" + r(l).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      t.exports = n
    }, {141: 141, 166: 166}],
    153: [function (e, t) {
      function n(e) {
        return "number" == typeof e || r(e) && o.call(e) == i || !1
      }

      var r = e(141), i = "[object Number]", a = Object.prototype, o = a.toString;
      t.exports = n
    }, {141: 141}],
    154: [function (e, t) {
      function n(e) {
        var t = typeof e;
        return "function" == t || e && "object" == t || !1
      }

      t.exports = n
    }, {}],
    155: [function (e, t) {
      var n = e(152), r = e(146), i = "[object Object]", a = Object.prototype, o = a.toString, s = n(s = Object.getPrototypeOf) && s, u = s ? function (e) {
        if (!e || o.call(e) != i)return !1;
        var t = e.valueOf, a = n(t) && (a = s(t)) && s(a);
        return a ? e == a || s(e) == a : r(e)
      } : r;
      t.exports = u
    }, {146: 146, 152: 152}],
    156: [function (e, t) {
      function n(e) {
        return "string" == typeof e || r(e) && o.call(e) == i || !1
      }

      var r = e(141), i = "[object String]", a = Object.prototype, o = a.toString;
      t.exports = n
    }, {141: 141}],
    157: [function (e, t) {
      function n(e) {
        return i(e) && r(e.length) && D[I.call(e)] || !1
      }

      var r = e(140), i = e(141), a = "[object Arguments]", o = "[object Array]", s = "[object Boolean]", u = "[object Date]", l = "[object Error]", c = "[object Function]", p = "[object Map]", d = "[object Number]", f = "[object Object]", h = "[object RegExp]", m = "[object Set]", g = "[object String]", v = "[object WeakMap]", y = "[object ArrayBuffer]", b = "[object Float32Array]", w = "[object Float64Array]", x = "[object Int8Array]", E = "[object Int16Array]", _ = "[object Int32Array]", A = "[object Uint8Array]", S = "[object Uint8ClampedArray]", C = "[object Uint16Array]", T = "[object Uint32Array]", D = {};
      D[b] = D[w] = D[x] = D[E] = D[_] = D[A] = D[S] = D[C] = D[T] = !0, D[a] = D[o] = D[y] = D[s] = D[u] = D[l] = D[c] = D[p] = D[d] = D[f] = D[h] = D[m] = D[g] = D[v] = !1;
      var k = Object.prototype, I = k.toString;
      t.exports = n
    }, {140: 140, 141: 141}],
    158: [function (e, t) {
      function n(e) {
        return r(e, i(e))
      }

      var r = e(99), i = e(161);
      t.exports = n
    }, {161: 161, 99: 99}],
    159: [function (e, t) {
      var n = e(97), r = e(131), i = r(n);
      t.exports = i
    }, {131: 131, 97: 97}],
    160: [function (e, t) {
      var n = e(140), r = e(152), i = e(154), a = e(147), o = r(o = Object.keys) && o, s = o ? function (e) {
        if (e)var t = e.constructor, r = e.length;
        return "function" == typeof t && t.prototype === e || "function" != typeof e && r && n(r) ? a(e) : i(e) ? o(e) : []
      } : a;
      t.exports = s
    }, {140: 140, 147: 147, 152: 152, 154: 154}],
    161: [function (e, t) {
      function n(e) {
        if (null == e)return [];
        s(e) || (e = Object(e));
        var t = e.length;
        t = t && o(t) && (i(e) || u.nonEnumArgs && r(e)) && t || 0;
        for (var n = e.constructor, l = -1, p = "function" == typeof n && n.prototype === e, d = Array(t), f = t > 0; ++l < t;)d[l] = l + "";
        for (var h in e)f && a(h, t) || "constructor" == h && (p || !c.call(e, h)) || d.push(h);
        return d
      }

      var r = e(149), i = e(150), a = e(138), o = e(140), s = e(154), u = e(167), l = Object.prototype, c = l.hasOwnProperty;
      t.exports = n
    }, {138: 138, 140: 140, 149: 149, 150: 150, 154: 154, 167: 167}],
    162: [function (e, t) {
      var n = e(118), r = e(131), i = r(n);
      t.exports = i
    }, {118: 118, 131: 131}],
    163: [function (e, t) {
      function n(e, t, n) {
        if (null == e)return {};
        if ("function" != typeof t) {
          var c = r(a(arguments, !1, !1, 1), String);
          return u(e, i(s(e), c))
        }
        return t = o(t, n, 3), l(e, function (e, n, r) {
          return !t(e, n, r)
        })
      }

      var r = e(94), i = e(101), a = e(106), o = e(127), s = e(161), u = e(144), l = e(145);
      t.exports = n
    }, {101: 101, 106: 106, 127: 127, 144: 144, 145: 145, 161: 161, 94: 94}],
    164: [function (e, t) {
      function n(e, t, n) {
        return null == e ? {} : "function" == typeof t ? o(e, i(t, n, 3)) : a(e, r(arguments, !1, !1, 1))
      }

      var r = e(106), i = e(127), a = e(144), o = e(145);
      t.exports = n
    }, {106: 106, 127: 127, 144: 144, 145: 145}],
    165: [function (e, t) {
      function n(e) {
        return r(e, i(e))
      }

      var r = e(126), i = e(160);
      t.exports = n
    }, {126: 126, 160: 160}],
    166: [function (e, t) {
      function n(e) {
        return e = r(e), e && a.test(e) ? e.replace(i, "\\$&") : e
      }

      var r = e(125), i = /[.*+?^${}()|[\]\/\\]/g, a = RegExp(i.source);
      t.exports = n
    }, {125: 125}],
    167: [function (e, t) {
      (function (n) {
        var r = e(152), i = /\bthis\b/, a = Object.prototype, o = (o = n.window) && o.document, s = a.propertyIsEnumerable, u = {};
        !function () {
          u.funcDecomp = !r(n.WinRTError) && i.test(function () {
              return this
            }), u.funcNames = "string" == typeof Function.name;
          try {
            u.dom = 11 === o.createDocumentFragment().nodeType
          } catch (e) {
            u.dom = !1
          }
          try {
            u.nonEnumArgs = !s.call(arguments, 1)
          } catch (e) {
            u.nonEnumArgs = !0
          }
        }(0, 0), t.exports = u
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {152: 152}],
    168: [function (e, t) {
      function n(e) {
        return function () {
          return e
        }
      }

      t.exports = n
    }, {}],
    169: [function (e, t) {
      function n(e) {
        return e
      }

      t.exports = n
    }, {}],
    170: [function (e, t) {
      t.exports = e(177)
    }, {177: 177}],
    171: [function (e, t) {
      t.exports = function (e) {
        for (var t; e.childNodes.length;)t = e.childNodes[0], e.removeChild(t);
        return e
      }
    }, {}],
    172: [function (e, t) {
      t.exports = e(180)
    }, {180: 180}],
    173: [function (e, t) {
      t.exports = e(184)
    }, {184: 184}],
    174: [function (e, t) {
      t.exports = e(181)
    }, {181: 181}],
    175: [function (e, t) {
      t.exports = e(183)
    }, {183: 183}],
    176: [function (e, t) {
      t.exports = function (e) {
        e.parentNode && e.parentNode.removeChild(e)
      }
    }, {}],
    177: [function (e, t) {
      function n(e) {
        if (!e || !e.nodeType)throw new Error("A DOM element reference is required");
        this.el = e, this.list = e.classList
      }

      var r = e(178), i = /\s+/, a = Object.prototype.toString;
      t.exports = function (e) {
        return new n(e)
      }, n.prototype.add = function (e) {
        if (this.list)return this.list.add(e), this;
        var t = this.array(), n = r(t, e);
        return ~n || t.push(e), this.el.className = t.join(" "), this
      }, n.prototype.remove = function (e) {
        if ("[object RegExp]" == a.call(e))return this.removeMatching(e);
        if (this.list)return this.list.remove(e), this;
        var t = this.array(), n = r(t, e);
        return ~n && t.splice(n, 1), this.el.className = t.join(" "), this
      }, n.prototype.removeMatching = function (e) {
        for (var t = this.array(), n = 0; n < t.length; n++)e.test(t[n]) && this.remove(t[n]);
        return this
      }, n.prototype.toggle = function (e, t) {
        return this.list ? ("undefined" != typeof t ? t !== this.list.toggle(e, t) && this.list.toggle(e) : this.list.toggle(e), this) : ("undefined" != typeof t ? t ? this.add(e) : this.remove(e) : this.has(e) ? this.remove(e) : this.add(e), this)
      }, n.prototype.array = function () {
        var e = this.el.getAttribute("class") || "", t = e.replace(/^\s+|\s+$/g, ""), n = t.split(i);
        return "" === n[0] && n.shift(), n
      }, n.prototype.has = n.prototype.contains = function (e) {
        return this.list ? this.list.contains(e) : !!~r(this.array(), e)
      }
    }, {178: 178}],
    178: [function (e, t) {
      t.exports = function (e, t) {
        if (e.indexOf)return e.indexOf(t);
        for (var n = 0; n < e.length; ++n)if (e[n] === t)return n;
        return -1
      }
    }, {}],
    179: [function (e, t) {
      var n = e(182);
      t.exports = function (e, t, r, i) {
        for (e = r ? {parentNode: e} : e, i = i || document; (e = e.parentNode) && e !== document;) {
          if (n(e, t))return e;
          if (e === i)return
        }
      }
    }, {182: 182}],
    180: [function (e, t, n) {
      var r = e(179), i = e(181);
      n.bind = function (e, t, n, a, o) {
        return i.bind(e, n, function (n) {
          var i = n.target || n.srcElement;
          n.delegateTarget = r(i, t, !0, e), n.delegateTarget && a.call(e, n)
        }, o)
      }, n.unbind = function (e, t, n, r) {
        i.unbind(e, t, n, r)
      }
    }, {179: 179, 181: 181}],
    181: [function (e, t, n) {
      var r = window.addEventListener ? "addEventListener" : "attachEvent", i = window.removeEventListener ? "removeEventListener" : "detachEvent", a = "addEventListener" !== r ? "on" : "";
      n.bind = function (e, t, n, i) {
        return e[r](a + t, n, i || !1), n
      }, n.unbind = function (e, t, n, r) {
        return e[i](a + t, n, r || !1), n
      }
    }, {}],
    182: [function (e, t) {
      function n(e, t) {
        if (!e || 1 !== e.nodeType)return !1;
        if (a)return a.call(e, t);
        for (var n = r.all(t, e.parentNode), i = 0; i < n.length; ++i)if (n[i] == e)return !0;
        return !1
      }

      var r = e(183), i = Element.prototype, a = i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector;
      t.exports = n
    }, {183: 183}],
    183: [function (e, t, n) {
      function r(e, t) {
        return t.querySelector(e)
      }

      n = t.exports = function (e, t) {
        return t = t || document, r(e, t)
      }, n.all = function (e, t) {
        return t = t || document, t.querySelectorAll(e)
      }, n.engine = function (e) {
        if (!e.one)throw new Error(".one callback required");
        if (!e.all)throw new Error(".all callback required");
        return r = e.one, n.all = e.all, n
      }
    }, {}],
    184: [function (e, t) {
      function n(e, t) {
        if ("string" != typeof e)throw new TypeError("String expected");
        t || (t = document);
        var n = /<([\w:]+)/.exec(e);
        if (!n)return t.createTextNode(e);
        e = e.replace(/^\s+|\s+$/g, "");
        var r = n[1];
        if ("body" == r) {
          var i = t.createElement("html");
          return i.innerHTML = e, i.removeChild(i.lastChild)
        }
        var o = a[r] || a._default, s = o[0], u = o[1], l = o[2], i = t.createElement("div");
        for (i.innerHTML = u + e + l; s--;)i = i.lastChild;
        if (i.firstChild == i.lastChild)return i.removeChild(i.firstChild);
        for (var c = t.createDocumentFragment(); i.firstChild;)c.appendChild(i.removeChild(i.firstChild));
        return c
      }

      t.exports = n;
      var r = document.createElement("div");
      r.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
      var i = !r.getElementsByTagName("link").length;
      r = void 0;
      var a = {
        legend: [1, "<fieldset>", "</fieldset>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        _default: i ? [1, "X<div>", "</div>"] : [0, "", ""]
      };
      a.td = a.th = [3, "<table><tbody><tr>", "</tr></tbody></table>"], a.option = a.optgroup = [1, '<select multiple="multiple">', "</select>"], a.thead = a.tbody = a.colgroup = a.caption = a.tfoot = [1, "<table>", "</table>"], a.polyline = a.ellipse = a.polygon = a.circle = a.text = a.line = a.path = a.rect = a.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', "</svg>"]
    }, {}],
    185: [function (e, t) {
      t.exports = e(187), t.exports.Collection = e(186)
    }, {186: 186, 187: 187}],
    186: [function (e, t) {
      function n(e, t, n, r) {
        var i = n.inverse;
        return e.remove = function (e) {
          var n = this.indexOf(e);
          return -1 !== n && (this.splice(n, 1), t.unset(e, i, r)), e
        }, e.contains = function (e) {
          return -1 !== this.indexOf(e)
        }, e.add = function (e) {
          this.contains(e) || (this.push(e), t.set(e, i, r))
        }, e
      }

      t.exports.extend = n
    }, {}],
    187: [function (e, t) {
      function n(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t.name || t)
      }

      function r(e, t, n) {
        Object.defineProperty(n, t.name, {enumerable: t.enumerable, value: o.extend(n[t.name] || [], e, t, n)})
      }

      function i(e, t, n) {
        var r = t.inverse, i = n[t.name];
        Object.defineProperty(n, t.name, {
          enumerable: t.enumerable, get: function () {
            return i
          }, set: function (t) {
            if (t !== i) {
              var a = i;
              i = null, a && e.unset(a, r, n), i = t, e.set(i, r, n)
            }
          }
        })
      }

      function a(e, t) {
        return this instanceof a ? (e.inverse = t, t.inverse = e, this.props = {}, this.props[e.name] = e, void(this.props[t.name] = t)) : new a(e, t)
      }

      var o = e(186);
      a.prototype.bind = function (e, t) {
        if ("string" == typeof t) {
          if (!this.props[t])throw new Error("no property <" + t + "> in ref");
          t = this.props[t]
        }
        t.collection ? r(this, t, e) : i(this, t, e)
      }, a.prototype.ensureBound = function (e, t) {
        n(e, t) || this.bind(e, t)
      }, a.prototype.unset = function (e, t, n) {
        e && (this.ensureBound(e, t), t.collection ? e[t.name].remove(n) : e[t.name] = void 0)
      }, a.prototype.set = function (e, t, n) {
        e && (this.ensureBound(e, t), t.collection ? e[t.name].add(n) : e[t.name] = n)
      }, t.exports = a
    }, {186: 186}]
  }, {}, [1])(1)
}), define("text!camunda-commons-ui/widgets/bpmn-viewer/cam-widget-bpmn-viewer.html", [], function () {
  return '<div class="alert alert-danger"\n     ng-if="error">\n  <span>\n    <strong>Could not render diagram:</strong>\n  </span>\n  <span>\n   {{ error.message }}\n  </span>\n</div>\n\n<div ng-show="!error">\n\n  <div ng-if="!loaded" class="placeholder-container">\n    <div class="placeholder-content">\n      Loading diagram<br />\n      <span class="glyphicon glyphicon-refresh animate-spin"></span>\n    </div>\n  </div>\n\n  <div class="diagram-holder" ng-class=\'{"diagram-holder": true, "grab-cursor": !disableNavigation && !grabbing, "djs-cursor-move": !disableNavigation && grabbing}\'></div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation zoom">\n    <button class="btn btn-default in"\n            title="zoom in"\n            ng-click="zoomIn()">\n      <span class="glyphicon glyphicon-plus"></span>\n    </button>\n    <button class="btn btn-default out"\n            title="zoom out"\n            ng-click="zoomOut()">\n      <span class="glyphicon glyphicon-minus"></span>\n    </button>\n  </div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation reset">\n    <button class="btn btn-default"\n            title="reset zoom"\n            ng-click="resetZoom()">\n      <span class="glyphicon glyphicon-screenshot"></span>\n    </button>\n  </div>\n</div>\n'
}), define("camunda-commons-ui/widgets/bpmn-viewer/cam-widget-bpmn-viewer", ["angular", "bpmn-io", "text!./cam-widget-bpmn-viewer.html"], function (e, t, n) {
  "use strict";
  return ["$compile", function (e) {
    return {
      scope: {
        diagramData: "=",
        control: "=?",
        disableNavigation: "&",
        onLoad: "&",
        onClick: "&",
        onMouseEnter: "&",
        onMouseLeave: "&"
      }, template: n, link: function (n, r) {
        function i() {
          if (l) {
            n.loaded = !1;
            var e = "object" == typeof l, t = (e ? u.importDefinitions : u.importXML).bind(u);
            t(l, function (t, r) {
              var i = e ? function (e) {
                e()
              } : n.$apply.bind(n);
              i(function () {
                return t ? void(n.error = t) : (n.warn = r, c = u.get("canvas"), a(), o(), n.loaded = !0, void n.onLoad())
              })
            })
          }
        }

        function a() {
          c && c.zoom("fit-viewport", "auto")
        }

        function o() {
          var e = u.get("eventBus");
          e.on("element.click", function (e) {
            n.onClick({element: e.element, $event: e.originalEvent})
          }), e.on("element.hover", function (e) {
            n.onMouseEnter({element: e.element, $event: e.originalEvent})
          }), e.on("element.out", function (e) {
            n.onMouseLeave({element: e.element, $event: e.originalEvent})
          }), e.on("element.mousedown", function () {
            n.grabbing = !0, document.addEventListener("mouseup", p), n.$apply()
          })
        }

        n.grabbing = !1, n.disableNavigation = n.$eval(n.disableNavigation), n.control = n.control || {}, n.control.highlight = function (e) {
          c.addMarker(e, "highlight"), r.find('[data-element-id="' + e + '"]>.djs-outline').attr({
            rx: "14px",
            ry: "14px"
          })
        }, n.control.clearHighlight = function (e) {
          c.removeMarker(e, "highlight")
        }, n.control.isHighlighted = function (e) {
          return c.hasMarker(e, "highlight")
        }, n.control.createBadge = function (t, r) {
          var i, a = u.get("overlays");
          r.html ? i = r.html : (i = document.createElement("span"), r.color && (i.style["background-color"] = r.color), r.tooltip && (i.setAttribute("tooltip", r.tooltip), i.setAttribute("tooltip-placement", "top")), r.text && i.appendChild(document.createTextNode(r.text))), a.add(t, {
            position: r.position || {
              bottom: 0,
              right: 0
            }, show: {minZoom: -1 / 0, maxZoom: +1 / 0}, html: i
          }), e(i)(n)
        }, n.control.removeBadges = function (e) {
          u.get("overlays").remove({element: e})
        }, n.control.getViewer = function () {
          return u
        }, n.control.scrollToElement = function (e) {
          var t, n, r, i, a = u.get("elementRegistry").get(e), o = c.viewbox();
          t = Math.max(o.height, a.height), n = Math.max(o.width, a.width), r = Math.min(Math.max(o.x, a.x - o.width + a.width), a.x), i = Math.min(Math.max(o.y, a.y - o.height + a.height), a.y), c.viewbox({
            x: r,
            y: i,
            width: n,
            height: t
          })
        }, n.control.getElement = function (e) {
          return u.get("elementRegistry").get(e)
        }, n.loaded = !1, n.control.isLoaded = function () {
          return n.loaded
        };
        var s = t;
        n.disableNavigation && (s = Object.getPrototypeOf(t.prototype).constructor);
        var u = new s({
          container: r.find(".diagram-holder"),
          width: "100%",
          height: "100%",
          overlays: {deferUpdate: !1}
        }), l = null, c = null;
        n.$watch("diagramData", function (e) {
          e && (l = e, i())
        });
        var p = function () {
          n.grabbing = !1, document.removeEventListener("mouseup", p), n.$apply()
        };
        n.zoomIn = function () {
          u.diagram.get("zoomScroll").zoom(1, {x: r[0].offsetWidth / 2, y: r[0].offsetHeight / 2})
        }, n.zoomOut = function () {
          u.diagram.get("zoomScroll").zoom(-1, {x: r[0].offsetWidth / 2, y: r[0].offsetHeight / 2})
        }, n.resetZoom = function () {
          c.zoom("fit-viewport", "auto")
        }, n.control.resetZoom = n.resetZoom
      }
    }
  }]
}), function (e) {
  function t(e, t, n) {
    switch (arguments.length) {
      case 2:
        return null != e ? e : t;
      case 3:
        return null != e ? e : null != t ? t : n;
      default:
        throw new Error("Implement me")
    }
  }

  function n(e, t) {
    return Tt.call(e, t)
  }

  function r() {
    return {
      empty: !1,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: !1,
      invalidMonth: null,
      invalidFormat: !1,
      userInvalidated: !1,
      iso: !1
    }
  }

  function i(e) {
    xt.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
  }

  function a(e, t) {
    var n = !0;
    return h(function () {
      return n && (i(e), n = !1), t.apply(this, arguments)
    }, t)
  }

  function o(e, t) {
    bn[e] || (i(t), bn[e] = !0)
  }

  function s(e, t) {
    return function (n) {
      return v(e.call(this, n), t)
    }
  }

  function u(e, t) {
    return function (n) {
      return this.localeData().ordinal(e.call(this, n), t)
    }
  }

  function l(e, t) {
    var n, r, i = 12 * (t.year() - e.year()) + (t.month() - e.month()), a = e.clone().add(i, "months");
    return 0 > t - a ? (n = e.clone().add(i - 1, "months"), r = (t - a) / (a - n)) : (n = e.clone().add(i + 1, "months"), r = (t - a) / (n - a)), -(i + r)
  }

  function c(e, t, n) {
    var r;
    return null == n ? t : null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? (r = e.isPM(n), r && 12 > t && (t += 12), r || 12 !== t || (t = 0), t) : t
  }

  function p() {
  }

  function d(e, t) {
    t !== !1 && P(e), m(this, e), this._d = new Date(+e._d), xn === !1 && (xn = !0, xt.updateOffset(this), xn = !1)
  }

  function f(e) {
    var t = C(e), n = t.year || 0, r = t.quarter || 0, i = t.month || 0, a = t.week || 0, o = t.day || 0, s = t.hour || 0, u = t.minute || 0, l = t.second || 0, c = t.millisecond || 0;
    this._milliseconds = +c + 1e3 * l + 6e4 * u + 36e5 * s, this._days = +o + 7 * a, this._months = +i + 3 * r + 12 * n, this._data = {}, this._locale = xt.localeData(), this._bubble()
  }

  function h(e, t) {
    for (var r in t)n(t, r) && (e[r] = t[r]);
    return n(t, "toString") && (e.toString = t.toString), n(t, "valueOf") && (e.valueOf = t.valueOf), e
  }

  function m(e, t) {
    var n, r, i;
    if ("undefined" != typeof t._isAMomentObject && (e._isAMomentObject = t._isAMomentObject), "undefined" != typeof t._i && (e._i = t._i), "undefined" != typeof t._f && (e._f = t._f), "undefined" != typeof t._l && (e._l = t._l), "undefined" != typeof t._strict && (e._strict = t._strict), "undefined" != typeof t._tzm && (e._tzm = t._tzm), "undefined" != typeof t._isUTC && (e._isUTC = t._isUTC), "undefined" != typeof t._offset && (e._offset = t._offset), "undefined" != typeof t._pf && (e._pf = t._pf), "undefined" != typeof t._locale && (e._locale = t._locale), Lt.length > 0)for (n in Lt)r = Lt[n], i = t[r], "undefined" != typeof i && (e[r] = i);
    return e
  }

  function g(e) {
    return 0 > e ? Math.ceil(e) : Math.floor(e)
  }

  function v(e, t, n) {
    for (var r = "" + Math.abs(e), i = e >= 0; r.length < t;)r = "0" + r;
    return (i ? n ? "+" : "" : "-") + r
  }

  function y(e, t) {
    var n = {milliseconds: 0, months: 0};
    return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
  }

  function b(e, t) {
    var n;
    return t = $(t, e), e.isBefore(t) ? n = y(e, t) : (n = y(t, e), n.milliseconds = -n.milliseconds, n.months = -n.months), n
  }

  function w(e, t) {
    return function (n, r) {
      var i, a;
      return null === r || isNaN(+r) || (o(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period)."), a = n, n = r, r = a), n = "string" == typeof n ? +n : n, i = xt.duration(n, r), x(this, i, e), this
    }
  }

  function x(e, t, n, r) {
    var i = t._milliseconds, a = t._days, o = t._months;
    r = null == r ? !0 : r, i && e._d.setTime(+e._d + i * n), a && mt(e, "Date", ht(e, "Date") + a * n), o && ft(e, ht(e, "Month") + o * n), r && xt.updateOffset(e, a || o)
  }

  function E(e) {
    return "[object Array]" === Object.prototype.toString.call(e)
  }

  function _(e) {
    return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date
  }

  function A(e, t, n) {
    var r, i = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), o = 0;
    for (r = 0; i > r; r++)(n && e[r] !== t[r] || !n && D(e[r]) !== D(t[r])) && o++;
    return o + a
  }

  function S(e) {
    if (e) {
      var t = e.toLowerCase().replace(/(.)s$/, "$1");
      e = dn[e] || fn[t] || t
    }
    return e
  }

  function C(e) {
    var t, r, i = {};
    for (r in e)n(e, r) && (t = S(r), t && (i[t] = e[r]));
    return i
  }

  function T(t) {
    var n, r;
    if (0 === t.indexOf("week"))n = 7, r = "day"; else {
      if (0 !== t.indexOf("month"))return;
      n = 12, r = "month"
    }
    xt[t] = function (i, a) {
      var o, s, u = xt._locale[t], l = [];
      if ("number" == typeof i && (a = i, i = e), s = function (e) {
          var t = xt().utc().set(r, e);
          return u.call(xt._locale, t, i || "")
        }, null != a)return s(a);
      for (o = 0; n > o; o++)l.push(s(o));
      return l
    }
  }

  function D(e) {
    var t = +e, n = 0;
    return 0 !== t && isFinite(t) && (n = t >= 0 ? Math.floor(t) : Math.ceil(t)), n
  }

  function k(e, t) {
    return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
  }

  function I(e, t, n) {
    return lt(xt([e, 11, 31 + t - n]), t, n).week
  }

  function M(e) {
    return R(e) ? 366 : 365
  }

  function R(e) {
    return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
  }

  function P(e) {
    var t;
    e._a && -2 === e._pf.overflow && (t = e._a[kt] < 0 || e._a[kt] > 11 ? kt : e._a[It] < 1 || e._a[It] > k(e._a[Dt], e._a[kt]) ? It : e._a[Mt] < 0 || e._a[Mt] > 24 || 24 === e._a[Mt] && (0 !== e._a[Rt] || 0 !== e._a[Pt] || 0 !== e._a[Nt]) ? Mt : e._a[Rt] < 0 || e._a[Rt] > 59 ? Rt : e._a[Pt] < 0 || e._a[Pt] > 59 ? Pt : e._a[Nt] < 0 || e._a[Nt] > 999 ? Nt : -1, e._pf._overflowDayOfYear && (Dt > t || t > It) && (t = It), e._pf.overflow = t)
  }

  function N(t) {
    return null == t._isValid && (t._isValid = !isNaN(t._d.getTime()) && t._pf.overflow < 0 && !t._pf.empty && !t._pf.invalidMonth && !t._pf.nullInput && !t._pf.invalidFormat && !t._pf.userInvalidated, t._strict && (t._isValid = t._isValid && 0 === t._pf.charsLeftOver && 0 === t._pf.unusedTokens.length && t._pf.bigHour === e)), t._isValid
  }

  function O(e) {
    return e ? e.toLowerCase().replace("_", "-") : e
  }

  function L(e) {
    for (var t, n, r, i, a = 0; a < e.length;) {
      for (i = O(e[a]).split("-"), t = i.length, n = O(e[a + 1]), n = n ? n.split("-") : null; t > 0;) {
        if (r = F(i.slice(0, t).join("-")))return r;
        if (n && n.length >= t && A(i, n, !0) >= t - 1)break;
        t--
      }
      a++
    }
    return null
  }

  function F(e) {
    var t = null;
    if (!Ot[e] && Ft)try {
      t = xt.locale(), require("./locale/" + e), xt.locale(t)
    } catch (n) {
    }
    return Ot[e]
  }

  function $(e, t) {
    var n, r;
    return t._isUTC ? (n = t.clone(), r = (xt.isMoment(e) || _(e) ? +e : +xt(e)) - +n, n._d.setTime(+n._d + r), xt.updateOffset(n, !1), n) : xt(e).local()
  }

  function B(e) {
    return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
  }

  function U(e) {
    var t, n, r = e.match(Vt);
    for (t = 0, n = r.length; n > t; t++)r[t] = yn[r[t]] ? yn[r[t]] : B(r[t]);
    return function (i) {
      var a = "";
      for (t = 0; n > t; t++)a += r[t]instanceof Function ? r[t].call(i, e) : r[t];
      return a
    }
  }

  function V(e, t) {
    return e.isValid() ? (t = j(t, e.localeData()), hn[t] || (hn[t] = U(t)), hn[t](e)) : e.localeData().invalidDate()
  }

  function j(e, t) {
    function n(e) {
      return t.longDateFormat(e) || e
    }

    var r = 5;
    for (jt.lastIndex = 0; r >= 0 && jt.test(e);)e = e.replace(jt, n), jt.lastIndex = 0, r -= 1;
    return e
  }

  function z(e, t) {
    var n, r = t._strict;
    switch (e) {
      case"Q":
        return Jt;
      case"DDDD":
        return tn;
      case"YYYY":
      case"GGGG":
      case"gggg":
        return r ? nn : Yt;
      case"Y":
      case"G":
      case"g":
        return an;
      case"YYYYYY":
      case"YYYYY":
      case"GGGGG":
      case"ggggg":
        return r ? rn : qt;
      case"S":
        if (r)return Jt;
      case"SS":
        if (r)return en;
      case"SSS":
        if (r)return tn;
      case"DDD":
        return Gt;
      case"MMM":
      case"MMMM":
      case"dd":
      case"ddd":
      case"dddd":
        return Ht;
      case"a":
      case"A":
        return t._locale._meridiemParse;
      case"x":
        return Qt;
      case"X":
        return Zt;
      case"Z":
      case"ZZ":
        return Kt;
      case"T":
        return Xt;
      case"SSSS":
        return Wt;
      case"MM":
      case"DD":
      case"YY":
      case"GG":
      case"gg":
      case"HH":
      case"hh":
      case"mm":
      case"ss":
      case"ww":
      case"WW":
        return r ? en : zt;
      case"M":
      case"D":
      case"d":
      case"H":
      case"h":
      case"m":
      case"s":
      case"w":
      case"W":
      case"e":
      case"E":
        return zt;
      case"Do":
        return r ? t._locale._ordinalParse : t._locale._ordinalParseLenient;
      default:
        return n = new RegExp(Z(Q(e.replace("\\", "")), "i"))
    }
  }

  function G(e) {
    e = e || "";
    var t = e.match(Kt) || [], n = t[t.length - 1] || [], r = (n + "").match(cn) || ["-", 0, 0], i = +(60 * r[1]) + D(r[2]);
    return "+" === r[0] ? i : -i
  }

  function Y(e, t, n) {
    var r, i = n._a;
    switch (e) {
      case"Q":
        null != t && (i[kt] = 3 * (D(t) - 1));
        break;
      case"M":
      case"MM":
        null != t && (i[kt] = D(t) - 1);
        break;
      case"MMM":
      case"MMMM":
        r = n._locale.monthsParse(t, e, n._strict), null != r ? i[kt] = r : n._pf.invalidMonth = t;
        break;
      case"D":
      case"DD":
        null != t && (i[It] = D(t));
        break;
      case"Do":
        null != t && (i[It] = D(parseInt(t.match(/\d{1,2}/)[0], 10)));
        break;
      case"DDD":
      case"DDDD":
        null != t && (n._dayOfYear = D(t));
        break;
      case"YY":
        i[Dt] = xt.parseTwoDigitYear(t);
        break;
      case"YYYY":
      case"YYYYY":
      case"YYYYYY":
        i[Dt] = D(t);
        break;
      case"a":
      case"A":
        n._meridiem = t;
        break;
      case"h":
      case"hh":
        n._pf.bigHour = !0;
      case"H":
      case"HH":
        i[Mt] = D(t);
        break;
      case"m":
      case"mm":
        i[Rt] = D(t);
        break;
      case"s":
      case"ss":
        i[Pt] = D(t);
        break;
      case"S":
      case"SS":
      case"SSS":
      case"SSSS":
        i[Nt] = D(1e3 * ("0." + t));
        break;
      case"x":
        n._d = new Date(D(t));
        break;
      case"X":
        n._d = new Date(1e3 * parseFloat(t));
        break;
      case"Z":
      case"ZZ":
        n._useUTC = !0, n._tzm = G(t);
        break;
      case"dd":
      case"ddd":
      case"dddd":
        r = n._locale.weekdaysParse(t), null != r ? (n._w = n._w || {}, n._w.d = r) : n._pf.invalidWeekday = t;
        break;
      case"w":
      case"ww":
      case"W":
      case"WW":
      case"d":
      case"e":
      case"E":
        e = e.substr(0, 1);
      case"gggg":
      case"GGGG":
      case"GGGGG":
        e = e.substr(0, 2), t && (n._w = n._w || {}, n._w[e] = D(t));
        break;
      case"gg":
      case"GG":
        n._w = n._w || {}, n._w[e] = xt.parseTwoDigitYear(t)
    }
  }

  function q(e) {
    var n, r, i, a, o, s, u;
    n = e._w, null != n.GG || null != n.W || null != n.E ? (o = 1, s = 4, r = t(n.GG, e._a[Dt], lt(xt(), 1, 4).year), i = t(n.W, 1), a = t(n.E, 1)) : (o = e._locale._week.dow, s = e._locale._week.doy, r = t(n.gg, e._a[Dt], lt(xt(), o, s).year), i = t(n.w, 1), null != n.d ? (a = n.d, o > a && ++i) : a = null != n.e ? n.e + o : o), u = ct(r, i, a, s, o), e._a[Dt] = u.year, e._dayOfYear = u.dayOfYear
  }

  function W(e) {
    var n, r, i, a, o = [];
    if (!e._d) {
      for (i = K(e), e._w && null == e._a[It] && null == e._a[kt] && q(e), e._dayOfYear && (a = t(e._a[Dt], i[Dt]), e._dayOfYear > M(a) && (e._pf._overflowDayOfYear = !0), r = at(a, 0, e._dayOfYear), e._a[kt] = r.getUTCMonth(), e._a[It] = r.getUTCDate()), n = 0; 3 > n && null == e._a[n]; ++n)e._a[n] = o[n] = i[n];
      for (; 7 > n; n++)e._a[n] = o[n] = null == e._a[n] ? 2 === n ? 1 : 0 : e._a[n];
      24 === e._a[Mt] && 0 === e._a[Rt] && 0 === e._a[Pt] && 0 === e._a[Nt] && (e._nextDay = !0, e._a[Mt] = 0), e._d = (e._useUTC ? at : it).apply(null, o), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[Mt] = 24)
    }
  }

  function H(e) {
    var t;
    e._d || (t = C(e._i), e._a = [t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], W(e))
  }

  function K(e) {
    var t = new Date;
    return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
  }

  function X(t) {
    if (t._f === xt.ISO_8601)return void et(t);
    t._a = [], t._pf.empty = !0;
    var n, r, i, a, o, s = "" + t._i, u = s.length, l = 0;
    for (i = j(t._f, t._locale).match(Vt) || [], n = 0; n < i.length; n++)a = i[n], r = (s.match(z(a, t)) || [])[0], r && (o = s.substr(0, s.indexOf(r)), o.length > 0 && t._pf.unusedInput.push(o), s = s.slice(s.indexOf(r) + r.length), l += r.length), yn[a] ? (r ? t._pf.empty = !1 : t._pf.unusedTokens.push(a), Y(a, r, t)) : t._strict && !r && t._pf.unusedTokens.push(a);
    t._pf.charsLeftOver = u - l, s.length > 0 && t._pf.unusedInput.push(s), t._pf.bigHour === !0 && t._a[Mt] <= 12 && (t._pf.bigHour = e), t._a[Mt] = c(t._locale, t._a[Mt], t._meridiem), W(t), P(t)
  }

  function Q(e) {
    return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, n, r, i) {
      return t || n || r || i
    })
  }

  function Z(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  }

  function J(e) {
    var t, n, i, a, o;
    if (0 === e._f.length)return e._pf.invalidFormat = !0, void(e._d = new Date(0 / 0));
    for (a = 0; a < e._f.length; a++)o = 0, t = m({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._pf = r(), t._f = e._f[a], X(t), N(t) && (o += t._pf.charsLeftOver, o += 10 * t._pf.unusedTokens.length, t._pf.score = o, (null == i || i > o) && (i = o, n = t));
    h(e, n || t)
  }

  function et(e) {
    var t, n, r = e._i, i = on.exec(r);
    if (i) {
      for (e._pf.iso = !0, t = 0, n = un.length; n > t; t++)if (un[t][1].exec(r)) {
        e._f = un[t][0] + (i[6] || " ");
        break
      }
      for (t = 0, n = ln.length; n > t; t++)if (ln[t][1].exec(r)) {
        e._f += ln[t][0];
        break
      }
      r.match(Kt) && (e._f += "Z"), X(e)
    } else e._isValid = !1
  }

  function tt(e) {
    et(e), e._isValid === !1 && (delete e._isValid, xt.createFromInputFallback(e))
  }

  function nt(e, t) {
    var n, r = [];
    for (n = 0; n < e.length; ++n)r.push(t(e[n], n));
    return r
  }

  function rt(t) {
    var n, r = t._i;
    r === e ? t._d = new Date : _(r) ? t._d = new Date(+r) : null !== (n = $t.exec(r)) ? t._d = new Date(+n[1]) : "string" == typeof r ? tt(t) : E(r) ? (t._a = nt(r.slice(0), function (e) {
      return parseInt(e, 10)
    }), W(t)) : "object" == typeof r ? H(t) : "number" == typeof r ? t._d = new Date(r) : xt.createFromInputFallback(t)
  }

  function it(e, t, n, r, i, a, o) {
    var s = new Date(e, t, n, r, i, a, o);
    return 1970 > e && s.setFullYear(e), s
  }

  function at(e) {
    var t = new Date(Date.UTC.apply(null, arguments));
    return 1970 > e && t.setUTCFullYear(e), t
  }

  function ot(e, t) {
    if ("string" == typeof e)if (isNaN(e)) {
      if (e = t.weekdaysParse(e), "number" != typeof e)return null
    } else e = parseInt(e, 10);
    return e
  }

  function st(e, t, n, r, i) {
    return i.relativeTime(t || 1, !!n, e, r)
  }

  function ut(e, t, n) {
    var r = xt.duration(e).abs(), i = Ct(r.as("s")), a = Ct(r.as("m")), o = Ct(r.as("h")), s = Ct(r.as("d")), u = Ct(r.as("M")), l = Ct(r.as("y")), c = i < mn.s && ["s", i] || 1 === a && ["m"] || a < mn.m && ["mm", a] || 1 === o && ["h"] || o < mn.h && ["hh", o] || 1 === s && ["d"] || s < mn.d && ["dd", s] || 1 === u && ["M"] || u < mn.M && ["MM", u] || 1 === l && ["y"] || ["yy", l];
    return c[2] = t, c[3] = +e > 0, c[4] = n, st.apply({}, c)
  }

  function lt(e, t, n) {
    var r, i = n - t, a = n - e.day();
    return a > i && (a -= 7), i - 7 > a && (a += 7), r = xt(e).add(a, "d"), {
      week: Math.ceil(r.dayOfYear() / 7),
      year: r.year()
    }
  }

  function ct(e, t, n, r, i) {
    var a, o, s = at(e, 0, 1).getUTCDay();
    return s = 0 === s ? 7 : s, n = null != n ? n : i, a = i - s + (s > r ? 7 : 0) - (i > s ? 7 : 0), o = 7 * (t - 1) + (n - i) + a + 1, {
      year: o > 0 ? e : e - 1,
      dayOfYear: o > 0 ? o : M(e - 1) + o
    }
  }

  function pt(t) {
    var n, r = t._i, i = t._f;
    return t._locale = t._locale || xt.localeData(t._l), null === r || i === e && "" === r ? xt.invalid({nullInput: !0}) : ("string" == typeof r && (t._i = r = t._locale.preparse(r)), xt.isMoment(r) ? new d(r, !0) : (i ? E(i) ? J(t) : X(t) : rt(t), n = new d(t), n._nextDay && (n.add(1, "d"), n._nextDay = e), n))
  }

  function dt(e, t) {
    var n, r;
    if (1 === t.length && E(t[0]) && (t = t[0]), !t.length)return xt();
    for (n = t[0], r = 1; r < t.length; ++r)t[r][e](n) && (n = t[r]);
    return n
  }

  function ft(e, t) {
    var n;
    return "string" == typeof t && (t = e.localeData().monthsParse(t), "number" != typeof t) ? e : (n = Math.min(e.date(), k(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e)
  }

  function ht(e, t) {
    return e._d["get" + (e._isUTC ? "UTC" : "") + t]()
  }

  function mt(e, t, n) {
    return "Month" === t ? ft(e, n) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
  }

  function gt(e, t) {
    return function (n) {
      return null != n ? (mt(this, e, n), xt.updateOffset(this, t), this) : ht(this, e)
    }
  }

  function vt(e) {
    return 400 * e / 146097
  }

  function yt(e) {
    return 146097 * e / 400
  }

  function bt(e) {
    xt.duration.fn[e] = function () {
      return this._data[e]
    }
  }

  function wt(e) {
    "undefined" == typeof ender && (Et = St.moment, St.moment = e ? a("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", xt) : xt)
  }

  for (var xt, Et, _t, At = "2.9.0", St = "undefined" == typeof global || "undefined" != typeof window && window !== global.window ? this : global, Ct = Math.round, Tt = Object.prototype.hasOwnProperty, Dt = 0, kt = 1, It = 2, Mt = 3, Rt = 4, Pt = 5, Nt = 6, Ot = {}, Lt = [], Ft = "undefined" != typeof module && module && module.exports, $t = /^\/?Date\((\-?\d+)/i, Bt = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ut = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Vt = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, jt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, zt = /\d\d?/, Gt = /\d{1,3}/, Yt = /\d{1,4}/, qt = /[+\-]?\d{1,6}/, Wt = /\d+/, Ht = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Kt = /Z|[\+\-]\d\d:?\d\d/gi, Xt = /T/i, Qt = /[\+\-]?\d+/, Zt = /[\+\-]?\d+(\.\d{1,3})?/, Jt = /\d/, en = /\d\d/, tn = /\d{3}/, nn = /\d{4}/, rn = /[+-]?\d{6}/, an = /[+-]?\d+/, on = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, sn = "YYYY-MM-DDTHH:mm:ssZ", un = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]], ln = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], cn = /([\+\-]|\d\d)/gi, pn = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
    Milliseconds: 1,
    Seconds: 1e3,
    Minutes: 6e4,
    Hours: 36e5,
    Days: 864e5,
    Months: 2592e6,
    Years: 31536e6
  }), dn = {
    ms: "millisecond",
    s: "second",
    m: "minute",
    h: "hour",
    d: "day",
    D: "date",
    w: "week",
    W: "isoWeek",
    M: "month",
    Q: "quarter",
    y: "year",
    DDD: "dayOfYear",
    e: "weekday",
    E: "isoWeekday",
    gg: "weekYear",
    GG: "isoWeekYear"
  }, fn = {
    dayofyear: "dayOfYear",
    isoweekday: "isoWeekday",
    isoweek: "isoWeek",
    weekyear: "weekYear",
    isoweekyear: "isoWeekYear"
  }, hn = {}, mn = {
    s: 45,
    m: 45,
    h: 22,
    d: 26,
    M: 11
  }, gn = "DDD w W M D d".split(" "), vn = "M D H h m s w W".split(" "), yn = {
    M: function () {
      return this.month() + 1
    }, MMM: function (e) {
      return this.localeData().monthsShort(this, e)
    }, MMMM: function (e) {
      return this.localeData().months(this, e)
    }, D: function () {
      return this.date()
    }, DDD: function () {
      return this.dayOfYear()
    }, d: function () {
      return this.day()
    }, dd: function (e) {
      return this.localeData().weekdaysMin(this, e)
    }, ddd: function (e) {
      return this.localeData().weekdaysShort(this, e)
    }, dddd: function (e) {
      return this.localeData().weekdays(this, e)
    }, w: function () {
      return this.week()
    }, W: function () {
      return this.isoWeek()
    }, YY: function () {
      return v(this.year() % 100, 2)
    }, YYYY: function () {
      return v(this.year(), 4)
    }, YYYYY: function () {
      return v(this.year(), 5)
    }, YYYYYY: function () {
      var e = this.year(), t = e >= 0 ? "+" : "-";
      return t + v(Math.abs(e), 6)
    }, gg: function () {
      return v(this.weekYear() % 100, 2)
    }, gggg: function () {
      return v(this.weekYear(), 4)
    }, ggggg: function () {
      return v(this.weekYear(), 5)
    }, GG: function () {
      return v(this.isoWeekYear() % 100, 2)
    }, GGGG: function () {
      return v(this.isoWeekYear(), 4)
    }, GGGGG: function () {
      return v(this.isoWeekYear(), 5)
    }, e: function () {
      return this.weekday()
    }, E: function () {
      return this.isoWeekday()
    }, a: function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), !0)
    }, A: function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), !1)
    }, H: function () {
      return this.hours()
    }, h: function () {
      return this.hours() % 12 || 12
    }, m: function () {
      return this.minutes()
    }, s: function () {
      return this.seconds()
    }, S: function () {
      return D(this.milliseconds() / 100)
    }, SS: function () {
      return v(D(this.milliseconds() / 10), 2)
    }, SSS: function () {
      return v(this.milliseconds(), 3)
    }, SSSS: function () {
      return v(this.milliseconds(), 3)
    }, Z: function () {
      var e = this.utcOffset(), t = "+";
      return 0 > e && (e = -e, t = "-"), t + v(D(e / 60), 2) + ":" + v(D(e) % 60, 2)
    }, ZZ: function () {
      var e = this.utcOffset(), t = "+";
      return 0 > e && (e = -e, t = "-"), t + v(D(e / 60), 2) + v(D(e) % 60, 2)
    }, z: function () {
      return this.zoneAbbr()
    }, zz: function () {
      return this.zoneName()
    }, x: function () {
      return this.valueOf()
    }, X: function () {
      return this.unix()
    }, Q: function () {
      return this.quarter()
    }
  }, bn = {}, wn = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"], xn = !1; gn.length;)_t = gn.pop(), yn[_t + "o"] = u(yn[_t], _t);
  for (; vn.length;)_t = vn.pop(), yn[_t + _t] = s(yn[_t], 2);
  yn.DDDD = s(yn.DDD, 3), h(p.prototype, {
    set: function (e) {
      var t, n;
      for (n in e)t = e[n], "function" == typeof t ? this[n] = t : this["_" + n] = t;
      this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    },
    _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    months: function (e) {
      return this._months[e.month()]
    },
    _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    monthsShort: function (e) {
      return this._monthsShort[e.month()]
    },
    monthsParse: function (e, t, n) {
      var r, i, a;
      for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), r = 0; 12 > r; r++) {
        if (i = xt.utc([2e3, r]), n && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp("^" + this.months(i, "").replace(".", "") + "$", "i"), this._shortMonthsParse[r] = new RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$", "i")), n || this._monthsParse[r] || (a = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[r] = new RegExp(a.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[r].test(e))return r;
        if (n && "MMM" === t && this._shortMonthsParse[r].test(e))return r;
        if (!n && this._monthsParse[r].test(e))return r
      }
    },
    _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    weekdays: function (e) {
      return this._weekdays[e.day()]
    },
    _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysShort: function (e) {
      return this._weekdaysShort[e.day()]
    },
    _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    weekdaysMin: function (e) {
      return this._weekdaysMin[e.day()]
    },
    weekdaysParse: function (e) {
      var t, n, r;
      for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++)if (this._weekdaysParse[t] || (n = xt([2e3, 1]).day(t), r = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[t] = new RegExp(r.replace(".", ""), "i")), this._weekdaysParse[t].test(e))return t
    },
    _longDateFormat: {
      LTS: "h:mm:ss A",
      LT: "h:mm A",
      L: "MM/DD/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY LT",
      LLLL: "dddd, MMMM D, YYYY LT"
    },
    longDateFormat: function (e) {
      var t = this._longDateFormat[e];
      return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (e) {
        return e.slice(1)
      }), this._longDateFormat[e] = t), t
    },
    isPM: function (e) {
      return "p" === (e + "").toLowerCase().charAt(0)
    },
    _meridiemParse: /[ap]\.?m?\.?/i,
    meridiem: function (e, t, n) {
      return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    },
    _calendar: {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L"
    },
    calendar: function (e, t, n) {
      var r = this._calendar[e];
      return "function" == typeof r ? r.apply(t, [n]) : r
    },
    _relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    },
    relativeTime: function (e, t, n, r) {
      var i = this._relativeTime[n];
      return "function" == typeof i ? i(e, t, n, r) : i.replace(/%d/i, e)
    },
    pastFuture: function (e, t) {
      var n = this._relativeTime[e > 0 ? "future" : "past"];
      return "function" == typeof n ? n(t) : n.replace(/%s/i, t)
    },
    ordinal: function (e) {
      return this._ordinal.replace("%d", e)
    },
    _ordinal: "%d",
    _ordinalParse: /\d{1,2}/,
    preparse: function (e) {
      return e
    },
    postformat: function (e) {
      return e
    },
    week: function (e) {
      return lt(e, this._week.dow, this._week.doy).week
    },
    _week: {dow: 0, doy: 6},
    firstDayOfWeek: function () {
      return this._week.dow
    },
    firstDayOfYear: function () {
      return this._week.doy
    },
    _invalidDate: "Invalid date",
    invalidDate: function () {
      return this._invalidDate
    }
  }), xt = function (t, n, i, a) {
    var o;
    return "boolean" == typeof i && (a = i, i = e), o = {}, o._isAMomentObject = !0, o._i = t, o._f = n, o._l = i, o._strict = a, o._isUTC = !1, o._pf = r(), pt(o)
  }, xt.suppressDeprecationWarnings = !1, xt.createFromInputFallback = a("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (e) {
    e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
  }), xt.min = function () {
    var e = [].slice.call(arguments, 0);
    return dt("isBefore", e)
  }, xt.max = function () {
    var e = [].slice.call(arguments, 0);
    return dt("isAfter", e)
  }, xt.utc = function (t, n, i, a) {
    var o;
    return "boolean" == typeof i && (a = i, i = e), o = {}, o._isAMomentObject = !0, o._useUTC = !0, o._isUTC = !0, o._l = i, o._i = t, o._f = n, o._strict = a, o._pf = r(), pt(o).utc()
  }, xt.unix = function (e) {
    return xt(1e3 * e)
  }, xt.duration = function (e, t) {
    var r, i, a, o, s = e, u = null;
    return xt.isDuration(e) ? s = {
      ms: e._milliseconds,
      d: e._days,
      M: e._months
    } : "number" == typeof e ? (s = {}, t ? s[t] = e : s.milliseconds = e) : (u = Bt.exec(e)) ? (r = "-" === u[1] ? -1 : 1, s = {
      y: 0,
      d: D(u[It]) * r,
      h: D(u[Mt]) * r,
      m: D(u[Rt]) * r,
      s: D(u[Pt]) * r,
      ms: D(u[Nt]) * r
    }) : (u = Ut.exec(e)) ? (r = "-" === u[1] ? -1 : 1, a = function (e) {
      var t = e && parseFloat(e.replace(",", "."));
      return (isNaN(t) ? 0 : t) * r
    }, s = {
      y: a(u[2]),
      M: a(u[3]),
      d: a(u[4]),
      h: a(u[5]),
      m: a(u[6]),
      s: a(u[7]),
      w: a(u[8])
    }) : null == s ? s = {} : "object" == typeof s && ("from"in s || "to"in s) && (o = b(xt(s.from), xt(s.to)), s = {}, s.ms = o.milliseconds, s.M = o.months), i = new f(s), xt.isDuration(e) && n(e, "_locale") && (i._locale = e._locale), i
  }, xt.version = At, xt.defaultFormat = sn, xt.ISO_8601 = function () {
  }, xt.momentProperties = Lt, xt.updateOffset = function () {
  }, xt.relativeTimeThreshold = function (t, n) {
    return mn[t] === e ? !1 : n === e ? mn[t] : (mn[t] = n, !0)
  }, xt.lang = a("moment.lang is deprecated. Use moment.locale instead.", function (e, t) {
    return xt.locale(e, t)
  }), xt.locale = function (e, t) {
    var n;
    return e && (n = "undefined" != typeof t ? xt.defineLocale(e, t) : xt.localeData(e), n && (xt.duration._locale = xt._locale = n)), xt._locale._abbr
  }, xt.defineLocale = function (e, t) {
    return null !== t ? (t.abbr = e, Ot[e] || (Ot[e] = new p), Ot[e].set(t), xt.locale(e), Ot[e]) : (delete Ot[e], null)
  }, xt.langData = a("moment.langData is deprecated. Use moment.localeData instead.", function (e) {
    return xt.localeData(e)
  }), xt.localeData = function (e) {
    var t;
    if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)return xt._locale;
    if (!E(e)) {
      if (t = F(e))return t;
      e = [e]
    }
    return L(e)
  }, xt.isMoment = function (e) {
    return e instanceof d || null != e && n(e, "_isAMomentObject")
  }, xt.isDuration = function (e) {
    return e instanceof f
  };
  for (_t = wn.length - 1; _t >= 0; --_t)T(wn[_t]);
  xt.normalizeUnits = function (e) {
    return S(e)
  }, xt.invalid = function (e) {
    var t = xt.utc(0 / 0);
    return null != e ? h(t._pf, e) : t._pf.userInvalidated = !0, t
  }, xt.parseZone = function () {
    return xt.apply(null, arguments).parseZone()
  }, xt.parseTwoDigitYear = function (e) {
    return D(e) + (D(e) > 68 ? 1900 : 2e3)
  }, xt.isDate = _, h(xt.fn = d.prototype, {
    clone: function () {
      return xt(this)
    },
    valueOf: function () {
      return +this._d - 6e4 * (this._offset || 0)
    },
    unix: function () {
      return Math.floor(+this / 1e3)
    },
    toString: function () {
      return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    },
    toDate: function () {
      return this._offset ? new Date(+this) : this._d
    },
    toISOString: function () {
      var e = xt(this).utc();
      return 0 < e.year() && e.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : V(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : V(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    },
    toArray: function () {
      var e = this;
      return [e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
    },
    isValid: function () {
      return N(this)
    },
    isDSTShifted: function () {
      return this._a ? this.isValid() && A(this._a, (this._isUTC ? xt.utc(this._a) : xt(this._a)).toArray()) > 0 : !1
    },
    parsingFlags: function () {
      return h({}, this._pf)
    },
    invalidAt: function () {
      return this._pf.overflow
    },
    utc: function (e) {
      return this.utcOffset(0, e)
    },
    local: function (e) {
      return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(this._dateUtcOffset(), "m")), this
    },
    format: function (e) {
      var t = V(this, e || xt.defaultFormat);
      return this.localeData().postformat(t)
    },
    add: w(1, "add"),
    subtract: w(-1, "subtract"),
    diff: function (e, t, n) {
      var r, i, a = $(e, this), o = 6e4 * (a.utcOffset() - this.utcOffset());
      return t = S(t), "year" === t || "month" === t || "quarter" === t ? (i = l(this, a), "quarter" === t ? i /= 3 : "year" === t && (i /= 12)) : (r = this - a, i = "second" === t ? r / 1e3 : "minute" === t ? r / 6e4 : "hour" === t ? r / 36e5 : "day" === t ? (r - o) / 864e5 : "week" === t ? (r - o) / 6048e5 : r), n ? i : g(i)
    },
    from: function (e, t) {
      return xt.duration({to: this, from: e}).locale(this.locale()).humanize(!t)
    },
    fromNow: function (e) {
      return this.from(xt(), e)
    },
    calendar: function (e) {
      var t = e || xt(), n = $(t, this).startOf("day"), r = this.diff(n, "days", !0), i = -6 > r ? "sameElse" : -1 > r ? "lastWeek" : 0 > r ? "lastDay" : 1 > r ? "sameDay" : 2 > r ? "nextDay" : 7 > r ? "nextWeek" : "sameElse";
      return this.format(this.localeData().calendar(i, this, xt(t)))
    },
    isLeapYear: function () {
      return R(this.year())
    },
    isDST: function () {
      return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    },
    day: function (e) {
      var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      return null != e ? (e = ot(e, this.localeData()), this.add(e - t, "d")) : t
    },
    month: gt("Month", !0),
    startOf: function (e) {
      switch (e = S(e)) {
        case"year":
          this.month(0);
        case"quarter":
        case"month":
          this.date(1);
        case"week":
        case"isoWeek":
        case"day":
          this.hours(0);
        case"hour":
          this.minutes(0);
        case"minute":
          this.seconds(0);
        case"second":
          this.milliseconds(0)
      }
      return "week" === e ? this.weekday(0) : "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this
    },
    endOf: function (t) {
      return t = S(t), t === e || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms")
    },
    isAfter: function (e, t) {
      var n;
      return t = S("undefined" != typeof t ? t : "millisecond"), "millisecond" === t ? (e = xt.isMoment(e) ? e : xt(e), +this > +e) : (n = xt.isMoment(e) ? +e : +xt(e), n < +this.clone().startOf(t))
    },
    isBefore: function (e, t) {
      var n;
      return t = S("undefined" != typeof t ? t : "millisecond"), "millisecond" === t ? (e = xt.isMoment(e) ? e : xt(e), +e > +this) : (n = xt.isMoment(e) ? +e : +xt(e), +this.clone().endOf(t) < n)
    },
    isBetween: function (e, t, n) {
      return this.isAfter(e, n) && this.isBefore(t, n)
    },
    isSame: function (e, t) {
      var n;
      return t = S(t || "millisecond"), "millisecond" === t ? (e = xt.isMoment(e) ? e : xt(e), +this === +e) : (n = +xt(e), +this.clone().startOf(t) <= n && n <= +this.clone().endOf(t))
    },
    min: a("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function (e) {
      return e = xt.apply(null, arguments), this > e ? this : e
    }),
    max: a("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function (e) {
      return e = xt.apply(null, arguments), e > this ? this : e
    }),
    zone: a("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", function (e, t) {
      return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
    }),
    utcOffset: function (e, t) {
      var n, r = this._offset || 0;
      return null != e ? ("string" == typeof e && (e = G(e)), Math.abs(e) < 16 && (e = 60 * e), !this._isUTC && t && (n = this._dateUtcOffset()), this._offset = e, this._isUTC = !0, null != n && this.add(n, "m"), r !== e && (!t || this._changeInProgress ? x(this, xt.duration(e - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, xt.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? r : this._dateUtcOffset()
    },
    isLocal: function () {
      return !this._isUTC
    },
    isUtcOffset: function () {
      return this._isUTC
    },
    isUtc: function () {
      return this._isUTC && 0 === this._offset
    },
    zoneAbbr: function () {
      return this._isUTC ? "UTC" : ""
    },
    zoneName: function () {
      return this._isUTC ? "Coordinated Universal Time" : ""
    },
    parseZone: function () {
      return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(G(this._i)), this
    },
    hasAlignedHourOffset: function (e) {
      return e = e ? xt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0
    },
    daysInMonth: function () {
      return k(this.year(), this.month())
    },
    dayOfYear: function (e) {
      var t = Ct((xt(this).startOf("day") - xt(this).startOf("year")) / 864e5) + 1;
      return null == e ? t : this.add(e - t, "d")
    },
    quarter: function (e) {
      return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
    },
    weekYear: function (e) {
      var t = lt(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
      return null == e ? t : this.add(e - t, "y")
    },
    isoWeekYear: function (e) {
      var t = lt(this, 1, 4).year;
      return null == e ? t : this.add(e - t, "y")
    },
    week: function (e) {
      var t = this.localeData().week(this);
      return null == e ? t : this.add(7 * (e - t), "d")
    },
    isoWeek: function (e) {
      var t = lt(this, 1, 4).week;
      return null == e ? t : this.add(7 * (e - t), "d")
    },
    weekday: function (e) {
      var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return null == e ? t : this.add(e - t, "d")
    },
    isoWeekday: function (e) {
      return null == e ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7)
    },
    isoWeeksInYear: function () {
      return I(this.year(), 1, 4)
    },
    weeksInYear: function () {
      var e = this.localeData()._week;
      return I(this.year(), e.dow, e.doy)
    },
    get: function (e) {
      return e = S(e), this[e]()
    },
    set: function (e, t) {
      var n;
      if ("object" == typeof e)for (n in e)this.set(n, e[n]); else e = S(e), "function" == typeof this[e] && this[e](t);
      return this
    },
    locale: function (t) {
      var n;
      return t === e ? this._locale._abbr : (n = xt.localeData(t), null != n && (this._locale = n), this)
    },
    lang: a("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
      return t === e ? this.localeData() : this.locale(t)
    }),
    localeData: function () {
      return this._locale
    },
    _dateUtcOffset: function () {
      return 15 * -Math.round(this._d.getTimezoneOffset() / 15)
    }
  }), xt.fn.millisecond = xt.fn.milliseconds = gt("Milliseconds", !1), xt.fn.second = xt.fn.seconds = gt("Seconds", !1), xt.fn.minute = xt.fn.minutes = gt("Minutes", !1), xt.fn.hour = xt.fn.hours = gt("Hours", !0), xt.fn.date = gt("Date", !0), xt.fn.dates = a("dates accessor is deprecated. Use date instead.", gt("Date", !0)), xt.fn.year = gt("FullYear", !0), xt.fn.years = a("years accessor is deprecated. Use year instead.", gt("FullYear", !0)), xt.fn.days = xt.fn.day, xt.fn.months = xt.fn.month, xt.fn.weeks = xt.fn.week, xt.fn.isoWeeks = xt.fn.isoWeek, xt.fn.quarters = xt.fn.quarter, xt.fn.toJSON = xt.fn.toISOString, xt.fn.isUTC = xt.fn.isUtc, h(xt.duration.fn = f.prototype, {
    _bubble: function () {
      var e, t, n, r = this._milliseconds, i = this._days, a = this._months, o = this._data, s = 0;
      o.milliseconds = r % 1e3, e = g(r / 1e3), o.seconds = e % 60, t = g(e / 60), o.minutes = t % 60, n = g(t / 60), o.hours = n % 24, i += g(n / 24), s = g(vt(i)), i -= g(yt(s)), a += g(i / 30), i %= 30, s += g(a / 12), a %= 12, o.days = i, o.months = a, o.years = s
    },
    abs: function () {
      return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
    },
    weeks: function () {
      return g(this.days() / 7)
    },
    valueOf: function () {
      return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * D(this._months / 12)
    },
    humanize: function (e) {
      var t = ut(this, !e, this.localeData());
      return e && (t = this.localeData().pastFuture(+this, t)), this.localeData().postformat(t)
    },
    add: function (e, t) {
      var n = xt.duration(e, t);
      return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this._bubble(), this
    },
    subtract: function (e, t) {
      var n = xt.duration(e, t);
      return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this._bubble(), this
    },
    get: function (e) {
      return e = S(e), this[e.toLowerCase() + "s"]()
    },
    as: function (e) {
      var t, n;
      if (e = S(e), "month" === e || "year" === e)return t = this._days + this._milliseconds / 864e5, n = this._months + 12 * vt(t), "month" === e ? n : n / 12;
      switch (t = this._days + Math.round(yt(this._months / 12)), e) {
        case"week":
          return t / 7 + this._milliseconds / 6048e5;
        case"day":
          return t + this._milliseconds / 864e5;
        case"hour":
          return 24 * t + this._milliseconds / 36e5;
        case"minute":
          return 24 * t * 60 + this._milliseconds / 6e4;
        case"second":
          return 24 * t * 60 * 60 + this._milliseconds / 1e3;
        case"millisecond":
          return Math.floor(24 * t * 60 * 60 * 1e3) + this._milliseconds;
        default:
          throw new Error("Unknown unit " + e)
      }
    },
    lang: xt.fn.lang,
    locale: xt.fn.locale,
    toIsoString: a("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function () {
      return this.toISOString()
    }),
    toISOString: function () {
      var e = Math.abs(this.years()), t = Math.abs(this.months()), n = Math.abs(this.days()), r = Math.abs(this.hours()), i = Math.abs(this.minutes()), a = Math.abs(this.seconds() + this.milliseconds() / 1e3);
      return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (e ? e + "Y" : "") + (t ? t + "M" : "") + (n ? n + "D" : "") + (r || i || a ? "T" : "") + (r ? r + "H" : "") + (i ? i + "M" : "") + (a ? a + "S" : "") : "P0D"
    },
    localeData: function () {
      return this._locale
    },
    toJSON: function () {
      return this.toISOString()
    }
  }), xt.duration.fn.toString = xt.duration.fn.toISOString;
  for (_t in pn)n(pn, _t) && bt(_t.toLowerCase());
  xt.duration.fn.asMilliseconds = function () {
    return this.as("ms")
  }, xt.duration.fn.asSeconds = function () {
    return this.as("s")
  }, xt.duration.fn.asMinutes = function () {
    return this.as("m")
  }, xt.duration.fn.asHours = function () {
    return this.as("h")
  }, xt.duration.fn.asDays = function () {
    return this.as("d")
  }, xt.duration.fn.asWeeks = function () {
    return this.as("weeks")
  }, xt.duration.fn.asMonths = function () {
    return this.as("M")
  }, xt.duration.fn.asYears = function () {
    return this.as("y")
  }, xt.locale("en", {
    ordinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (e) {
      var t = e % 10, n = 1 === D(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
      return e + n
    }
  }), Ft ? module.exports = xt : "function" == typeof define && define.amd ? (define("moment", ["require", "exports", "module"], function (e, t, n) {
    return n.config && n.config() && n.config().noGlobal === !0 && (St.moment = Et), xt
  }), wt(!0)) : wt()
}.call(this), angular.module("pascalprecht.translate", ["ng"]).run(["$translate", function (e) {
  var t = e.storageKey(), n = e.storage();
  n ? n.get(t) ? e.use(n.get(t)) : angular.isString(e.preferredLanguage()) ? e.use(e.preferredLanguage()) : n.set(t, e.use()) : angular.isString(e.preferredLanguage()) && e.use(e.preferredLanguage())
}]), angular.module("pascalprecht.translate").provider("$translate", ["$STORAGE_KEY", function (e) {
  var t, n, r, i, a, o, s, u, l, c, p, d, f, h, m, g = {}, v = [], y = e, b = [], w = !1, x = "translate-cloak", E = !1, _ = ".", A = "2.4.2", S = function () {
    var e = window.navigator;
    return ((angular.isArray(e.languages) ? e.languages[0] : e.language || e.browserLanguage || e.systemLanguage || e.userLanguage) || "").split("-").join("_")
  }, C = function (e, t) {
    for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return n;
    return -1
  }, T = function () {
    return this.replace(/^\s+|\s+$/g, "")
  }, D = function (e) {
    for (var t = [], r = angular.lowercase(e), i = 0, a = v.length; a > i; i++)t.push(angular.lowercase(v[i]));
    if (C(t, r) > -1)return e;
    if (n) {
      var o;
      for (var s in n) {
        var u = !1, l = Object.prototype.hasOwnProperty.call(n, s) && angular.lowercase(s) === angular.lowercase(e);
        if ("*" === s.slice(-1) && (u = s.slice(0, -1) === e.slice(0, s.length - 1)), (l || u) && (o = n[s], C(t, angular.lowercase(o)) > -1))return o
      }
    }
    var c = e.split("_");
    return c.length > 1 && C(t, angular.lowercase(c[0])) > -1 ? c[0] : e
  }, k = function (e, t) {
    if (!e && !t)return g;
    if (e && !t) {
      if (angular.isString(e))return g[e]
    } else angular.isObject(g[e]) || (g[e] = {}), angular.extend(g[e], I(t));
    return this
  };
  this.translations = k, this.cloakClassName = function (e) {
    return e ? (x = e, this) : x
  };
  var I = function (e, t, n, r) {
    var i, a, o, s;
    t || (t = []), n || (n = {});
    for (i in e)Object.prototype.hasOwnProperty.call(e, i) && (s = e[i], angular.isObject(s) ? I(s, t.concat(i), n, i) : (a = t.length ? "" + t.join(_) + _ + i : i, t.length && i === r && (o = "" + t.join(_), n[o] = "@:" + a), n[a] = s));
    return n
  };
  this.addInterpolation = function (e) {
    return b.push(e), this
  }, this.useMessageFormatInterpolation = function () {
    return this.useInterpolation("$translateMessageFormatInterpolation")
  }, this.useInterpolation = function (e) {
    return c = e, this
  }, this.useSanitizeValueStrategy = function (e) {
    return w = e, this
  }, this.preferredLanguage = function (e) {
    return M(e), this
  };
  var M = function (e) {
    return e && (t = e), t
  };
  this.translationNotFoundIndicator = function (e) {
    return this.translationNotFoundIndicatorLeft(e), this.translationNotFoundIndicatorRight(e), this
  }, this.translationNotFoundIndicatorLeft = function (e) {
    return e ? (f = e, this) : f
  }, this.translationNotFoundIndicatorRight = function (e) {
    return e ? (h = e, this) : h
  }, this.fallbackLanguage = function (e) {
    return R(e), this
  };
  var R = function (e) {
    return e ? (angular.isString(e) ? (i = !0, r = [e]) : angular.isArray(e) && (i = !1, r = e), angular.isString(t) && C(r, t) < 0 && r.push(t), this) : i ? r[0] : r
  };
  this.use = function (e) {
    if (e) {
      if (!g[e] && !p)throw new Error("$translateProvider couldn't find translationTable for langKey: '" + e + "'");
      return a = e, this
    }
    return a
  };
  var P = function (e) {
    return e ? void(y = e) : u ? u + y : y
  };
  this.storageKey = P, this.useUrlLoader = function (e, t) {
    return this.useLoader("$translateUrlLoader", angular.extend({url: e}, t))
  }, this.useStaticFilesLoader = function (e) {
    return this.useLoader("$translateStaticFilesLoader", e)
  }, this.useLoader = function (e, t) {
    return p = e, d = t || {}, this
  }, this.useLocalStorage = function () {
    return this.useStorage("$translateLocalStorage")
  }, this.useCookieStorage = function () {
    return this.useStorage("$translateCookieStorage")
  }, this.useStorage = function (e) {
    return s = e, this
  }, this.storagePrefix = function (e) {
    return e ? (u = e, this) : e
  }, this.useMissingTranslationHandlerLog = function () {
    return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")
  }, this.useMissingTranslationHandler = function (e) {
    return l = e, this
  }, this.usePostCompiling = function (e) {
    return E = !!e, this
  }, this.determinePreferredLanguage = function (e) {
    var n = e && angular.isFunction(e) ? e() : S();
    return t = v.length ? D(n) : n, this
  }, this.registerAvailableLanguageKeys = function (e, t) {
    return e ? (v = e, t && (n = t), this) : v
  }, this.useLoaderCache = function (e) {
    return e === !1 ? m = void 0 : e === !0 ? m = !0 : "undefined" == typeof e ? m = "$translationCache" : e && (m = e), this
  }, this.$get = ["$log", "$injector", "$rootScope", "$q", function (e, n, u, v) {
    var _, S, N, O = n.get(c || "$translateDefaultInterpolation"), L = !1, F = {}, $ = {}, B = function (e, n, i) {
      if (angular.isArray(e)) {
        var o = function (e) {
          for (var t = {}, r = [], a = function (e) {
            var r = v.defer(), a = function (n) {
              t[e] = n, r.resolve([e, n])
            };
            return B(e, n, i).then(a, a), r.promise
          }, o = 0, s = e.length; s > o; o++)r.push(a(e[o]));
          return v.all(r).then(function () {
            return t
          })
        };
        return o(e)
      }
      var u = v.defer();
      e && (e = T.apply(e));
      var l = function () {
        var e = t ? $[t] : $[a];
        if (S = 0, s && !e) {
          var n = _.get(y);
          if (e = $[n], r && r.length) {
            var i = C(r, n);
            S = 0 === i ? 1 : 0, C(r, t) < 0 && r.push(t)
          }
        }
        return e
      }();
      return l ? l.then(function () {
        Q(e, n, i).then(u.resolve, u.reject)
      }, u.reject) : Q(e, n, i).then(u.resolve, u.reject), u.promise
    }, U = function (e) {
      return f && (e = [f, e].join(" ")), h && (e = [e, h].join(" ")), e
    }, V = function (e) {
      a = e, u.$emit("$translateChangeSuccess", {language: e}), s && _.set(B.storageKey(), a), O.setLocale(a), angular.forEach(F, function (e, t) {
        F[t].setLocale(a)
      }), u.$emit("$translateChangeEnd", {language: e})
    }, j = function (e) {
      if (!e)throw"No language key specified for loading.";
      var t = v.defer();
      u.$emit("$translateLoadingStart", {language: e}), L = !0;
      var r = m;
      "string" == typeof r && (r = n.get(r));
      var i = angular.extend({}, d, {key: e, $http: angular.extend({}, {cache: r}, d.$http)});
      return n.get(p)(i).then(function (n) {
        var r = {};
        u.$emit("$translateLoadingSuccess", {language: e}), angular.isArray(n) ? angular.forEach(n, function (e) {
          angular.extend(r, I(e))
        }) : angular.extend(r, I(n)), L = !1, t.resolve({
          key: e,
          table: r
        }), u.$emit("$translateLoadingEnd", {language: e})
      }, function (e) {
        u.$emit("$translateLoadingError", {language: e}), t.reject(e), u.$emit("$translateLoadingEnd", {language: e})
      }), t.promise
    };
    if (s && (_ = n.get(s), !_.get || !_.set))throw new Error("Couldn't use storage '" + s + "', missing get() or set() method!");
    angular.isFunction(O.useSanitizeValueStrategy) && O.useSanitizeValueStrategy(w), b.length && angular.forEach(b, function (e) {
      var r = n.get(e);
      r.setLocale(t || a), angular.isFunction(r.useSanitizeValueStrategy) && r.useSanitizeValueStrategy(w), F[r.getInterpolationIdentifier()] = r
    });
    var z = function (e) {
      var t = v.defer();
      return Object.prototype.hasOwnProperty.call(g, e) ? t.resolve(g[e]) : $[e] ? $[e].then(function (e) {
        k(e.key, e.table), t.resolve(e.table)
      }, t.reject) : t.reject(), t.promise
    }, G = function (e, t, n, r) {
      var i = v.defer();
      return z(e).then(function (o) {
        Object.prototype.hasOwnProperty.call(o, t) ? (r.setLocale(e), i.resolve(r.interpolate(o[t], n)), r.setLocale(a)) : i.reject()
      }, i.reject), i.promise
    }, Y = function (e, t, n, r) {
      var i, o = g[e];
      return Object.prototype.hasOwnProperty.call(o, t) && (r.setLocale(e), i = r.interpolate(o[t], n), r.setLocale(a)), i
    }, q = function (e) {
      if (l) {
        var t = n.get(l)(e, a);
        return void 0 !== t ? t : e
      }
      return e
    }, W = function (e, t, n, i) {
      var a = v.defer();
      if (e < r.length) {
        var o = r[e];
        G(o, t, n, i).then(a.resolve, function () {
          W(e + 1, t, n, i).then(a.resolve)
        })
      } else a.resolve(q(t));
      return a.promise
    }, H = function (e, t, n, i) {
      var a;
      if (e < r.length) {
        var o = r[e];
        a = Y(o, t, n, i), a || (a = H(e + 1, t, n, i))
      }
      return a
    }, K = function (e, t, n) {
      return W(N > 0 ? N : S, e, t, n)
    }, X = function (e, t, n) {
      return H(N > 0 ? N : S, e, t, n)
    }, Q = function (e, t, n) {
      var i = v.defer(), o = a ? g[a] : g, s = n ? F[n] : O;
      if (o && Object.prototype.hasOwnProperty.call(o, e)) {
        var u = o[e];
        "@:" === u.substr(0, 2) ? B(u.substr(2), t, n).then(i.resolve, i.reject) : i.resolve(s.interpolate(u, t))
      } else {
        var c;
        l && !L && (c = q(e)), a && r && r.length ? K(e, t, s).then(function (e) {
          i.resolve(e)
        }, function (e) {
          i.reject(U(e))
        }) : l && !L && c ? i.resolve(c) : i.reject(U(e))
      }
      return i.promise
    }, Z = function (e, t, n) {
      var i, o = a ? g[a] : g, s = n ? F[n] : O;
      if (o && Object.prototype.hasOwnProperty.call(o, e)) {
        var u = o[e];
        i = "@:" === u.substr(0, 2) ? Z(u.substr(2), t, n) : s.interpolate(u, t)
      } else {
        var c;
        l && !L && (c = q(e)), a && r && r.length ? (S = 0, i = X(e, t, s)) : i = l && !L && c ? c : U(e)
      }
      return i
    };
    if (B.preferredLanguage = function (e) {
        return e && M(e), t
      }, B.cloakClassName = function () {
        return x
      }, B.fallbackLanguage = function (e) {
        if (void 0 !== e && null !== e) {
          if (R(e), p && r && r.length)for (var t = 0, n = r.length; n > t; t++)$[r[t]] || ($[r[t]] = j(r[t]));
          B.use(B.use())
        }
        return i ? r[0] : r
      }, B.useFallbackLanguage = function (e) {
        if (void 0 !== e && null !== e)if (e) {
          var t = C(r, e);
          t > -1 && (N = t)
        } else N = 0
      }, B.proposedLanguage = function () {
        return o
      }, B.storage = function () {
        return _
      }, B.use = function (e) {
        if (!e)return a;
        var t = v.defer();
        u.$emit("$translateChangeStart", {language: e});
        var n = D(e);
        return n && (e = n), g[e] || !p || $[e] ? (t.resolve(e), V(e)) : (o = e, $[e] = j(e).then(function (n) {
          k(n.key, n.table), t.resolve(n.key), V(n.key), o === e && (o = void 0)
        }, function (e) {
          o === e && (o = void 0), u.$emit("$translateChangeError", {language: e}), t.reject(e), u.$emit("$translateChangeEnd", {language: e})
        })), t.promise
      }, B.storageKey = function () {
        return P()
      }, B.isPostCompilingEnabled = function () {
        return E
      }, B.refresh = function (e) {
        function t() {
          i.resolve(), u.$emit("$translateRefreshEnd", {language: e})
        }

        function n() {
          i.reject(), u.$emit("$translateRefreshEnd", {language: e})
        }

        if (!p)throw new Error("Couldn't refresh translation table, no loader registered!");
        var i = v.defer();
        if (u.$emit("$translateRefreshStart", {language: e}), e)g[e] ? j(e).then(function (n) {
          k(n.key, n.table), e === a && V(a), t()
        }, n) : n(); else {
          var o = [], s = {};
          if (r && r.length)for (var l = 0, c = r.length; c > l; l++)o.push(j(r[l])), s[r[l]] = !0;
          a && !s[a] && o.push(j(a)), v.all(o).then(function (e) {
            angular.forEach(e, function (e) {
              g[e.key] && delete g[e.key], k(e.key, e.table)
            }), a && V(a), t()
          })
        }
        return i.promise
      }, B.instant = function (e, n, i) {
        if (null === e || angular.isUndefined(e))return e;
        if (angular.isArray(e)) {
          for (var o = {}, s = 0, u = e.length; u > s; s++)o[e[s]] = B.instant(e[s], n, i);
          return o
        }
        if (angular.isString(e) && e.length < 1)return e;
        e && (e = T.apply(e));
        var c, p = [];
        t && p.push(t), a && p.push(a), r && r.length && (p = p.concat(r));
        for (var d = 0, f = p.length; f > d; d++) {
          var h = p[d];
          if (g[h] && "undefined" != typeof g[h][e] && (c = Z(e, n, i)), "undefined" != typeof c)break
        }
        return c || "" === c || (c = O.interpolate(e, n), l && !L && (c = q(e))), c
      }, B.versionInfo = function () {
        return A
      }, B.loaderCache = function () {
        return m
      }, p && (angular.equals(g, {}) && B.use(B.use()), r && r.length))for (var J = function (e) {
      k(e.key, e.table), u.$emit("$translateChangeEnd", {language: e.key})
    }, et = 0, tt = r.length; tt > et; et++)$[r[et]] = j(r[et]).then(J);
    return B
  }]
}]), angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", ["$interpolate", function (e) {
  var t, n = {}, r = "default", i = null, a = {
    escaped: function (e) {
      var t = {};
      for (var n in e)Object.prototype.hasOwnProperty.call(e, n) && (t[n] = angular.element("<div></div>").text(e[n]).html());
      return t
    }
  }, o = function (e) {
    var t;
    return t = angular.isFunction(a[i]) ? a[i](e) : e
  };
  return n.setLocale = function (e) {
    t = e
  }, n.getInterpolationIdentifier = function () {
    return r
  }, n.useSanitizeValueStrategy = function (e) {
    return i = e, this
  }, n.interpolate = function (t, n) {
    return i && (n = o(n)), e(t)(n || {})
  }, n
}]), angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"), angular.module("pascalprecht.translate").directive("translate", ["$translate", "$q", "$interpolate", "$compile", "$parse", "$rootScope", function (e, t, n, r, i, a) {
  return {
    restrict: "AE", scope: !0, compile: function (t, o) {
      var s = o.translateValues ? o.translateValues : void 0, u = o.translateInterpolation ? o.translateInterpolation : void 0, l = t[0].outerHTML.match(/translate-value-+/i), c = "^(.*)(" + n.startSymbol() + ".*" + n.endSymbol() + ")(.*)";
      return function (t, p, d) {
        if (t.interpolateParams = {}, t.preText = "", t.postText = "", d.$observe("translate", function (e) {
            if (angular.equals(e, "") || !angular.isDefined(e)) {
              var r = p.text().match(c);
              angular.isArray(r) ? (t.preText = r[1], t.postText = r[3], t.translationId = n(r[2])(t.$parent)) : t.translationId = p.text().replace(/^\s+|\s+$/g, "")
            } else t.translationId = e
          }), d.$observe("translateDefault", function (e) {
            t.defaultText = e
          }), s && d.$observe("translateValues", function (e) {
            e && t.$parent.$watch(function () {
              angular.extend(t.interpolateParams, i(e)(t.$parent))
            })
          }), l) {
          var f = function (e) {
            d.$observe(e, function (n) {
              t.interpolateParams[angular.lowercase(e.substr(14, 1)) + e.substr(15)] = n
            })
          };
          for (var h in d)Object.prototype.hasOwnProperty.call(d, h) && "translateValue" === h.substr(0, 14) && "translateValues" !== h && f(h)
        }
        var m = function (t, n, i) {
          i || "undefined" == typeof n.defaultText || (t = n.defaultText), p.html(n.preText + t + n.postText);
          var a = e.isPostCompilingEnabled(), s = "undefined" != typeof o.translateCompile, u = s && "false" !== o.translateCompile;
          (a && !s || u) && r(p.contents())(n)
        }, g = function () {
          return s || l ? function () {
            var n = function () {
              t.translationId && t.interpolateParams && e(t.translationId, t.interpolateParams, u).then(function (e) {
                m(e, t, !0)
              }, function (e) {
                m(e, t, !1)
              })
            };
            t.$watch("interpolateParams", n, !0), t.$watch("translationId", n)
          } : function () {
            var n = t.$watch("translationId", function (r) {
              t.translationId && r && e(r, {}, u).then(function (e) {
                m(e, t, !0), n()
              }, function (e) {
                m(e, t, !1), n()
              })
            }, !0)
          }
        }(), v = a.$on("$translateChangeSuccess", g);
        g(), t.$on("$destroy", v)
      }
    }
  }
}]), angular.module("pascalprecht.translate").directive("translateCloak", ["$rootScope", "$translate", function (e, t) {
  return {
    compile: function (n) {
      var r = function () {
        n.addClass(t.cloakClassName())
      }, i = function () {
        n.removeClass(t.cloakClassName())
      }, a = e.$on("$translateChangeEnd", function () {
        i(), a(), a = null
      });
      return r(), function (e, n, a) {
        a.translateCloak && a.translateCloak.length && a.$observe("translateCloak", function (e) {
          t(e).then(i, r)
        })
      }
    }
  }
}]), angular.module("pascalprecht.translate").filter("translate", ["$parse", "$translate", function (e, t) {
  var n = function (n, r, i) {
    return angular.isObject(r) || (r = e(r)(this)), t.instant(n, r, i)
  };
  return n.$stateful = !0, n
}]), define("angular-translate", function () {
}), define("camunda-commons-ui/filter/date/index", ["angular", "moment", "angular-translate"], function (e, t) {
  "use strict";
  var n = e.module("cam.commons.filter.date", ["pascalprecht.translate"]);
  return n.provider("camDateFormat", function () {
    var e = {normal: "LLL", "short": "LL", "long": "LLLL"};
    this.setDateFormat = function (t, n) {
      n = n || "normal", e[n] = t
    }, this.$get = function () {
      return function (t) {
        return t = t || "normal", e[t]
      }
    }
  }), n.config(["$filterProvider", function (e) {
    e.register("camDate", ["$translate", "camDateFormat", function (e, n) {
      return function (e, r) {
        return e ? t(e).format(n(r)) : ""
      }
    }])
  }]), n
}), define("camunda-commons-ui/widgets/variable/cam-variable-validator", ["camunda-bpm-sdk-js-type-utils"], function (e) {
  "use strict";
  return [function () {
    return {
      require: "ngModel", link: function (t, n, r, i) {
        var a = function (t) {
          var n = r.camVariableValidator;
          return -1 !== ["String", "Object", "Null"].indexOf(n) ? i.$setValidity("camVariableValidator", !0) : i.$setValidity("camVariableValidator", e.isType(t, n)), t
        };
        i.$parsers.unshift(a), i.$formatters.push(a), r.$observe("camVariableValidator", function () {
          return a(i.$viewValue)
        })
      }
    }
  }]
}), define("camunda-commons-ui/widgets/index", ["angular", "./inline-field/cam-widget-inline-field", "./search-pill/cam-widget-search-pill", "./search-pill/cam-query-component", "./header/cam-widget-header", "./footer/cam-widget-footer", "./loader/cam-widget-loader", "./debug/cam-widget-debug", "./variable/cam-widget-variable", "./search/cam-widget-search", "./bpmn-viewer/cam-widget-bpmn-viewer", "../filter/date/index", "../directives/index", "../search/index", "./variable/cam-variable-validator", "angular-bootstrap"], function (e, t, n, r, i, a, o, s, u, l, c, p, d, f, h) {
  "use strict";
  var m = e.module("camunda.common.widgets", [p.name, d.name, f.name, "ui.bootstrap"]);
  return m.directive("camWidgetInlineField", t), m.directive("camWidgetSearchPill", n), m.directive("camWidgetHeader", i), m.directive("camWidgetFooter", a), m.directive("camWidgetLoader", o), m.directive("camWidgetDebug", s), m.directive("camWidgetVariable", u), m.directive("camWidgetSearch", l), m.directive("camWidgetBpmnViewer", c), m.directive("camVariableValidator", h), m.filter("camQueryComponent", r), m
}), define("camunda-commons-ui/index", ["angular", "./auth/index", "./util/index", "./pages/index", "./plugin/index", "./directives/index", "./resources/index", "./search/index", "./services/index", "./widgets/index", "./filter/date/index", "angular-bootstrap", "angular-translate"], function (e, t, n, r, i, a, o, s, u, l, c) {
  "use strict";
  return e.module("cam.commons", [t.name, n.name, r.name, i.name, a.name, o.name, s.name, u.name, l.name, c.name, "ui.bootstrap", "pascalprecht.translate"])
}), define("camunda-commons-ui", ["camunda-commons-ui/index"], function (e) {
  return e
}), define("text!pages/authorizations.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/authorizations.html -->\n<div class="container-fluid"\n     ng-cloak>\n  <section class="authorizations row">\n    <div class="page-header">\n      <h1 ng-controller="AuthorizationCreateController">\n        Authorizations\n        <a ng-click="addNewAuthorization()"\n           tooltip-placement="right"\n           tooltip="Create a new authorization">\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </a>\n      </h1>\n    </div>\n\n    <div class="col-md-3">\n      <div class="well sidebar-nav">\n        <ul class="nav nav-list">\n          <li class="nav-header">Resources</li>\n          <li ng-class="activeClass(\'resource=\'+res.id)"\n              ng-repeat="res in resourceList | orderBy:\'name\':false">\n            <a href="#/authorization/?resource={{res.id}}">{{res.name}}</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <form class="col-md-9 form-horizontal"\n          name="createAuthForm"\n          ng-controller="AuthorizationCreateController">\n\n      <legend>{{title}} Authorizations</legend>\n\n      <table class="cam-table">\n        <thead>\n          <tr>\n            <th class="authorization-type">Type</th>\n            <th class="user group">User / Group</th>\n            <th class="permissions">Permissions</th>\n            <th class="resource-id">Resource Id</th>\n            <th class="action">Action</th>\n          </tr>\n        </thead>\n\n        <tbody>\n          <tr ng-if="loadingState === \'LOADED\'"\n              ng-repeat="authorization in authorizations | orderBy:getIdentityId:false">\n            <td class="authorization-type" ng-if="!authorization.inUpdate || !!authorization.id">\n              {{getType(authorization)}}\n            </td>\n            <td class="authorization-type" ng-if="!!authorization.inUpdate && !authorization.id">\n              <select ng-model="authorization.type"\n                      class="select-auth-type form-control"\n                      ng-change="ensureValidUser(authorization)">\n                <option value="0">GLOBAL</option>\n                <option value="1">ALLOW</option>\n                <option value="2">DENY</option>\n              </select>\n            </td>\n\n            <td class="user group" ng-if="!authorization.inUpdate">\n              <span ng-show="!!authorization.userId"\n                    tooltip="User">\n                <span class="glyphicon glyphicon-user"></span>\n                {{authorization.userId}}\n              </span>\n\n              <span ng-show="!!authorization.groupId"\n                    tooltip="Group">\n                <span class="glyphicon glyphicon-th"></span>\n                {{authorization.groupId}}\n              </span>\n            </td>\n            <td class="identity-id" ng-if="!!authorization.inUpdate">\n              <div class="input-group">\n                <a class="input-group-addon"\n                   ng-disabled="isIdentityIdDisabledFor(authorization)"\n                   ng-click="setIdentityTypeFor(getIdentityTypeFor(authorization) == \'Group\' ? \'User\' : \'Group\', authorization)"\n                   tooltip="{{getIdentityTypeFor(authorization)}}">\n                  <span class="glyphicon"\n                        ng-class="{\'glyphicon-th\': getIdentityTypeFor(authorization) == \'Group\', \'glyphicon-user\': getIdentityTypeFor(authorization) == \'User\'}"></span>\n                </a>\n\n                <input type="text"\n                       class="input-auth-name form-control"\n                       placeholder="User / Group Id"\n                       ng-disabled="isIdentityIdDisabledFor(authorization)"\n                       ng-class="{\'ng-invalid\': !authorization.identityId}"\n                       ng-model="authorization.identityId"/>\n              </div>\n            </td>\n\n            <td class="permissions" ng-if="!authorization.inUpdate">\n              {{formatPermissions(authorization.permissions)}}\n            </td>\n            <td class="permissions" ng-if="!!authorization.inUpdate">\n              <div class="input-group">\n\n                <div class="form-control-static"\n                     ng-click="addAllPermissionsTo(authorization)">\n                  {{ formatPermissions(authorization.permissions) }}\n                </div>\n\n                <!-- using "ng-if" rather than "ng-show" to prevent style glitches -->\n                <div ng-if="authorization.permissions != \'ALL\'"\n                     class="input-group-btn">\n                  <a ng-click="addAllPermissionsTo(authorization)"\n                     class="btn btn-default">\n                    <span class="glyphicon glyphicon-asterisk"></span>\n                  </a>\n                </div>\n\n                <div ng-if="availablePermissionsFor(authorization).length > 0"\n                     class="input-group-btn dropdown">\n                  <button type="button"\n                          class="btn btn-default dropdown-toggle"\n                          data-toggle="dropdown"\n                          aria-expanded="false">\n                    <span class="glyphicon glyphicon-pencil"></span>\n                    <span class="caret"></span>\n                  </button>\n\n                  <ul class="dropdown-menu dropdown-menu-right">\n                    <li ng-repeat="perm in availablePermissionsFor(authorization)">\n                      <a ng-click="addPermissionTo(perm, authorization)">{{perm}}</a>\n                    </li>\n                  </ul>\n                </div><!-- /input-btn-group -->\n              </div><!-- /input-group -->\n            </td>\n\n            <td class="resource-id" ng-if="!authorization.inUpdate">\n              {{authorization.resourceId}}\n            </td>\n            <td class="resource-id" ng-if="!!authorization.inUpdate">\n              <input type="text"\n                     id="inputResourceId"\n                     ng-model="authorization.resourceId"\n                     ng-class="{\'ng-invalid\': !authorization.resourceId}"\n                     class="in-place-edit form-control" />\n\n              <span ng-show="selectedResourceType==0"\n                    class="text-muted">(cockpit or tasklist or *)</span>\n            </td>\n\n            <td class="action" ng-if="!authorization.inUpdate">\n              <a ng-click="updateAuthorization(authorization)">\n                Edit\n              </a>\n              <a ng-click="deleteAuthorization(authorization)">\n                Delete\n              </a>\n            </td>\n            <td class="action" ng-if="!!authorization.inUpdate">\n              <div class="btn-group">\n                <button type="submit"\n                        class="btn btn-primary"\n                        ng-disabled="!isAuthorizationValid(authorization)"\n                        ng-click="confirmUpdateAuthorization(authorization)">\n                  <span class="glyphicon glyphicon-ok "></span>\n                </button>\n\n                <a class="btn btn-default"\n                   ng-click="cancelUpdateAuthorization(authorization)">\n                  <span class="glyphicon glyphicon-ban-circle"></span>\n                </a>\n              </div>\n            </td>\n          </tr>\n          <tr>\n            <td colspan="5">\n              <a ng-click="addNewAuthorization()">\n                Create New\n                <span class="glyphicon glyphicon-plus-sign"></span>\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n\n      <pagination ng-if="pages.total > pages.size"\n                  class="pagination-sm"\n\n                  page="pages.current"\n                  ng-model="pages.current"\n\n                  total-items="pages.total"\n                  items-per-page="pages.size"\n\n                  max-size="7"\n                  boundary-links="true"></pagination>\n\n    </form>\n  </section>\n</div>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/authorizations.html -->\n'
}), define("text!pages/confirm-delete-authorization.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/confirm-delete-authorization.html -->\n<div class="modal-header">\n  <h3>Confirm Delete</h3>\n</div>\n\n<div class="confirm-delete-authorization modal-body">\n  <div notifications-panel></div>\n\n  <div ng-hide="status === \'SUCCESS\' || status === \'FAILED\'">\n    <p>Are you sure you want to delete the following authorization?</p>\n\n    <dl class="dl-horizontal">\n      <dt>Type</dt>\n      <dd>{{getType(authorizationToDelete)}}</dd>\n      <dt>User</dt>\n      <dd>\n        {{authorizationToDelete.userId}} &nbsp;\n      </dd>\n      <dt>Group</dt>\n      <dd>\n        {{authorizationToDelete.groupId}} &nbsp;\n      </dd>\n      <dt>Permissions</dt>\n      <dd>{{formatPermissions(authorizationToDelete.permissions)}}</dd>\n      <dt>Resource</dt>\n      <dd>{{getResource(authorizationToDelete.resourceType)}}</dd>\n      <dt>Resource Id</dt>\n      <dd>{{authorizationToDelete.resourceId}}</dd>\n    </dl>\n  </div>\n\n  <div ng-show="status === \'SUCCESS\'">\n    <p>The authorization has been deleted successfully.</p>\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="close()"\n          ng-disabled="status === \'performCreate\'"\n          ng-hide="status === \'SUCCESS\' || status === \'FAILED\'">\n    Close\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close(status)"\n          ng-show="status === \'SUCCESS\' || status === \'FAILED\'">\n    OK\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="performDelete()"\n          ng-hide="status === \'SUCCESS\' || status === \'FAILED\'">\n    Delete\n  </button>\n</div>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/confirm-delete-authorization.html -->\n'
}), define("pages/authorizations", ["text!./authorizations.html", "text!./confirm-delete-authorization.html"], function (e, t) {
  "use strict";
  return ["$routeProvider", function (n) {
    n.when("/authorization", {
      template: e,
      controller: ["$scope", "$routeParams", "$modal", "AuthorizationResource", "Notifications", "$location", function (e, n, r, i, a, o) {
        function s() {
          e.resourceList = [];
          for (var t in e.resourceMap)e.resourceList.push({id: t, name: e.resourceMap[t]})
        }

        e.allPermissionsValue = 2147483647, e.resourceMap = {
          0: "Application",
          1: "User",
          2: "Group",
          3: "Group Membership",
          4: "Authorization",
          5: "Filter",
          6: "Process Definition",
          7: "Task",
          8: "Process Instance",
          9: "Deployment"
        }, e.permissionMap = {
          0: ["ACCESS"],
          1: ["READ", "UPDATE", "CREATE", "DELETE"],
          2: ["READ", "UPDATE", "CREATE", "DELETE"],
          3: ["CREATE", "DELETE"],
          4: ["READ", "UPDATE", "CREATE", "DELETE"],
          5: ["READ", "UPDATE", "DELETE"],
          6: ["READ", "CREATE_INSTANCE", "READ_INSTANCE", "UPDATE_INSTANCE", "DELETE_INSTANCE", "READ_TASK", "UPDATE_TASK", "READ_HISTORY", "DELETE_HISTORY"],
          7: ["CREATE", "READ", "UPDATE", "DELETE"],
          8: ["CREATE", "READ", "UPDATE", "DELETE"],
          9: ["CREATE", "READ", "DELETE"]
        }, e.typeMap = {0: "GLOBAL", 1: "ALLOW", 2: "DENY"}, e.getIdentityId = function (e) {
          return e.userId ? e.userId : e.groupId
        };
        var u = e.getType = function (t) {
          return e.typeMap[t.type]
        }, l = e.getResource = function (t) {
          return e.resourceMap[t]
        }, c = e.formatPermissions = function (e) {
          var t = e.indexOf("NONE");
          if (t > -1 && (e = e.splice(t, 1)), e.indexOf("ALL") > -1)return "ALL";
          for (var n = "", r = 0; r < e.length; r++)r > 0 && (n += ", "), n += e[r];
          return n
        };
        e.deleteAuthorization = function (e) {
          var n = r.open({
            controller: "ConfirmDeleteAuthorizationController",
            template: t,
            resolve: {
              authorizationToDelete: function () {
                return e
              }, formatPermissions: function () {
                return c
              }, getResource: function () {
                return l
              }, getType: function () {
                return u
              }
            }
          });
          n.result.then(function (e) {
            "SUCCESS" == e && p()
          }, function () {
            p()
          })
        }, e.pages = e.pages || {total: 0, size: 25, current: 1};
        var p = e.loadAuthorizations = function () {
          function t() {
            e.loadingState = "ERROR"
          }

          e.loadingState = "LOADING", i.count({resourceType: e.selectedResourceType}).$promise.then(function (t) {
            e.pages.total = t.count
          }, t), i.query({
            resourceType: e.selectedResourceType,
            firstResult: (e.pages.current - 1) * e.pages.size,
            maxResults: e.pages.size
          }).$promise.then(function (t) {
            e.authorizations = t, e.loadingState = t.length ? "LOADED" : "EMPTY"
          }, t)
        };
        e.$watch("pages.current", p), e.getPermissionsForResource = function () {
          return e.selectedResourceType ? e.permissionMap[e.selectedResourceType] : []
        }, e.show = function (e) {
          return e == o.search().tab
        }, e.activeClass = function (e) {
          var t = o.absUrl();
          return -1 != t.indexOf(e) ? "active" : ""
        }, s(), o.search().resource ? (e.title = e.getResource(n.resource), e.selectedResourceType = n.resource) : (o.search({resource: 0}), o.replace(), e.title = e.getResource(0), e.selectedResourceType = 0)
      }],
      authentication: "required",
      reloadOnSearch: !1
    })
  }]
}), !function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define("camunda-bpm-sdk-js", [], e); else {
    var t;
    "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.CamSDK = e()
  }
}(function () {
  var define, module, exports;
  return function e(t, n, r) {
    function i(o, s) {
      if (!n[o]) {
        if (!t[o]) {
          var u = "function" == typeof require && require;
          if (!s && u)return u(o, !0);
          if (a)return a(o, !0);
          throw new Error("Cannot find module '" + o + "'")
        }
        var l = n[o] = {exports: {}};
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return i(n ? n : e)
        }, l, l.exports, e, t, n, r)
      }
      return n[o].exports
    }

    for (var a = "function" == typeof require && require, o = 0; o < r.length; o++)i(r[o]);
    return i
  }({
    1: [function (_dereq_, module, exports) {
      "use strict";
      var CamundaForm = _dereq_("./../../forms/camunda-form"), angular = window.angular, $ = CamundaForm.$, constants = _dereq_("./../../forms/constants"), CamundaFormAngular = CamundaForm.extend({
        renderForm: function () {
          function e(e, t) {
            var n = $(t);
            if (!n.attr("ng-model")) {
              var r = n.attr(constants.DIRECTIVE_CAM_VARIABLE_NAME);
              r && n.attr("ng-model", r)
            }
          }

          var t = this;
          CamundaForm.prototype.renderForm.apply(this, arguments);
          for (var n = 0; n < this.formFieldHandlers.length; n++) {
            var r = this.formFieldHandlers[n], i = r.selector;
            $(i, t.formElement).each(e)
          }
          var a = t.formElement.injector();
          if (a) {
            var o = t.formElement.scope();
            a.invoke(["$compile", function (e) {
              e(t.formElement)(o)
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
          var e = this, t = arguments, n = this.formElement.scope(), r = function () {
            CamundaForm.prototype.fireEvent.apply(e, t)
          }, i = e.formElement.injector();
          i && i.invoke(["$rootScope", function (e) {
            var t = e.$$phase;
            "$apply" !== t && "$digest" !== t ? n.$apply(function () {
              r()
            }) : r()
          }])
        }
      });
      module.exports = CamundaFormAngular
    }, {"./../../forms/camunda-form": 25, "./../../forms/constants": 26}], 2: [function (e, t) {
      "use strict";
      var n = window.angular, r = e("./camunda-form-angular"), i = e("./../../forms/type-util").isType, a = n.module("cam.embedded.forms", []);
      a.directive("camVariableName", ["$rootScope", function (e) {
        return {
          require: "ngModel", link: function (t, n, r, i) {
            n.on("camFormVariableApplied", function (n, r) {
              var a = e.$$phase;
              "$apply" !== a && "$digest" !== a ? t.$apply(function () {
                i.$setViewValue(r)
              }) : i.$setViewValue(r)
            })
          }
        }
      }]), a.directive("camVariableType", [function () {
        return {
          require: "ngModel", link: function (e, t, n, r) {
            var a = function (e) {
              var a = n.camVariableType;
              return r.$setValidity("camVariableType", !0), (e || e === !1 || "Bytes" === a) && (r.$pristine && (r.$pristine = !1, r.$dirty = !0, t.addClass("ng-dirty"), t.removeClass("ng-pristine")), -1 !== ["Boolean", "String", "Bytes"].indexOf(a) || i(e, a) || r.$setValidity("camVariableType", !1), "file" === n.type && "Bytes" === a && t[0].files && t[0].files[0] && t[0].files[0].size > (n.camMaxFilesize || 5e6) && r.$setValidity("camVariableType", !1)), e
            };
            r.$parsers.unshift(a), r.$formatters.push(a), n.$observe("camVariableType", function () {
              return a(r.$viewValue)
            }), t.bind("change", function () {
              a(r.$viewValue), e.$apply()
            })
          }
        }
      }]), t.exports = r
    }, {"./../../forms/type-util": 31, "./camunda-form-angular": 1}], 3: [function (e, t) {
      t.exports = {Client: e("./../api-client"), Form: e("./forms"), utils: e("./../utils")}
    }, {"./../api-client": 6, "./../utils": 33, "./forms": 2}], 4: [function (e, t) {
      "use strict";
      function n() {
      }

      var r = e("./../events"), i = e("./../base-class"), a = i.extend({
        initialize: function () {
          this.http = this.constructor.http
        }
      }, {
        path: "", http: {}, create: function () {
        }, list: function (e, t) {
          "function" == typeof e && (t = e, e = {}), e = e || {}, t = t || n;
          var r = this, i = {count: 0, items: []};
          return this.http.get(this.path + "/count", {
            data: e, done: function (n, a) {
              return n ? (r.trigger("error", n), t(n)) : (i.count = a.count, void r.http.get(r.path, {
                data: e,
                done: function (n, a) {
                  return n ? (r.trigger("error", n), t(n)) : (i.items = a, i.firstResult = parseInt(e.firstResult || 0, 10), i.maxResults = i.firstResult + parseInt(e.maxResults || 10, 10), r.trigger("loaded", i), void t(n, i))
                }
              }))
            }
          })
        }, update: function () {
        }, "delete": function () {
        }
      });
      r.attach(a), t.exports = a
    }, {"./../base-class": 23, "./../events": 24}], 5: [function (e, t) {
      (function (n) {
        "use strict";
        function r(e, t) {
          return function (n, r) {
            return n || !r.ok && !r.noContent ? (n = n || r.error || new Error("The " + r.req.method + " request on " + r.req.url + " failed"), r.body && r.body.message && (n.message = r.body.message), e.trigger("error", n), t(n)) : ("application/hal+json" === r.type && (r.body && 0 !== Object.keys(r.body).length || (r.body = JSON.parse(r.text)), r.body = o.solveHALEmbedded(r.body)), void t(null, r.body ? r.body : r.text ? r.text : ""))
          }
        }

        var i = e("superagent"), a = e("./../events"), o = e("./../utils"), s = function () {
        }, u = function (e) {
          if (e = e || {}, !e.baseUrl)throw new Error("HttpClient needs a `baseUrl` configuration property.");
          a.attach(this), this.config = e
        };
        u.prototype.post = function (e, t) {
          t = t || {};
          var a = t.done || s, o = this, u = this.config.baseUrl + (e ? "/" + e : ""), l = i.post(u);
          if ("undefined" != typeof n)Object.keys(t.fields || {}).forEach(function (e) {
            l.field(e, t.fields[e])
          }), (t.attachments || []).forEach(function (e) {
            l.attach("data", new n(e.content), {filename: e.name})
          }); else if (t.fields || t.attachments)return a(new Error("Multipart request is only supported in node.js environement."));
          l.set("Accept", "application/hal+json, application/json; q=0.5").send(t.data || {}).query(t.query || {}), l.end(r(o, a))
        }, u.prototype.get = function (e, t) {
          var n = this.config.baseUrl + (e ? "/" + e : "");
          return this.load(n, t)
        }, u.prototype.load = function (e, t) {
          t = t || {};
          var n = t.done || s, a = this, o = t.accept || "application/hal+json, application/json; q=0.5", u = i.get(e).set("Accept", o).query(t.data || {});
          u.end(r(a, n))
        }, u.prototype.put = function (e, t) {
          t = t || {};
          var n = t.done || s, a = this, o = this.config.baseUrl + (e ? "/" + e : ""), u = i.put(o).set("Accept", "application/hal+json, application/json; q=0.5").send(t.data || {});
          u.end(r(a, n))
        }, u.prototype.del = function (e, t) {
          t = t || {};
          var n = t.done || s, a = this, o = this.config.baseUrl + (e ? "/" + e : ""), u = i.del(o).set("Accept", "application/hal+json, application/json; q=0.5").send(t.data || {});
          u.end(r(a, n))
        }, u.prototype.options = function (e, t) {
          t = t || {};
          var n = t.done || s, a = this, o = this.config.baseUrl + (e ? "/" + e : ""), u = i("OPTIONS", o).set("Accept", "application/hal+json, application/json; q=0.5");
          u.end(r(a, n))
        }, t.exports = u
      }).call(this, e("buffer").Buffer)
    }, {"./../events": 24, "./../utils": 33, buffer: 34, superagent: 38}], 6: [function (e, t) {
      "use strict";
      function n(e) {
        if (!e)throw new Error("Needs configuration");
        if (!e.apiUri)throw new Error("An apiUri is required");
        r.attach(this), e.engine = e.engine || "default", e.mock = "undefined" != typeof e.mock ? e.mock : !0, e.resources = e.resources || {}, this.HttpClient = e.HttpClient || n.HttpClient, this.baseUrl = e.apiUri, "/" !== this.baseUrl.slice(-1) && (this.baseUrl += "/"), this.baseUrl += "engine/" + e.engine, this.config = e, this.initialize()
      }

      var r = e("./../events");
      n.HttpClient = e("./http-client"), function (t) {
        t.config = {};
        var n = {};
        t.initialize = function () {
          function t(e) {
            r.trigger("error", e)
          }

          n.authorization = e("./resources/authorization"), n.deployment = e("./resources/deployment"), n.filter = e("./resources/filter"), n.history = e("./resources/history"), n["process-definition"] = e("./resources/process-definition"), n["process-instance"] = e("./resources/process-instance"), n.task = e("./resources/task"), n.variable = e("./resources/variable"), n["case-execution"] = e("./resources/case-execution"), n["case-instance"] = e("./resources/case-instance"), n["case-definition"] = e("./resources/case-definition"), n.user = e("./resources/user"), n.group = e("./resources/group"), n.incident = e("./resources/incident"), n.job = e("./resources/job"), n.metrics = e("./resources/metrics");
          var r = this;
          this.http = new this.HttpClient({baseUrl: this.baseUrl});
          var i, a, o, s;
          for (i in n) {
            a = {
              name: i,
              mock: this.config.mock,
              baseUrl: this.baseUrl,
              headers: {}
            }, o = this.config.resources[i] || {};
            for (s in o)a[s] = o[s];
            n[i].http = new this.HttpClient(a), n[i].http.on("error", t)
          }
        }, t.resource = function (e) {
          return n[e]
        }
      }(n.prototype), t.exports = n
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
    }], 7: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "authorization", r.list = function (e, t) {
        return this.http.get(this.path, {data: e, done: t})
      }, r.get = function (e, t) {
        return this.http.get(this.path + "/" + e, {done: t})
      }, r.create = function (e, t) {
        return this.http.post(this.path + "/create", {data: e, done: t})
      }, r.update = function (e, t) {
        return this.http.put(this.path + "/" + e.id, {data: e, done: t})
      }, r.save = function (e, t) {
        return r[e.id ? "update" : "create"](e, t)
      }, r["delete"] = function (e, t) {
        return this.http.del(this.path + "/" + e, {done: t})
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 8: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "case-definition", r.list = function (e, t) {
        return this.http.get(this.path, {data: e, done: t})
      }, r.create = function (e, t, n) {
        this.http.post(this.path + "/" + e + "/create", {data: t, done: n})
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 9: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "case-execution", r.list = function (e, t) {
        return this.http.get(this.path, {
          data: e, done: function (e, n) {
            return e ? t(e) : void t(null, n)
          }
        })
      }, r.disable = function (e, t, n) {
        this.http.post(this.path + "/" + e + "/disable", {data: t, done: n})
      }, r.reenable = function (e, t, n) {
        this.http.post(this.path + "/" + e + "/reenable", {data: t, done: n})
      }, r.manualStart = function (e, t, n) {
        this.http.post(this.path + "/" + e + "/manual-start", {data: t, done: n})
      }, r.complete = function (e, t, n) {
        this.http.post(this.path + "/" + e + "/complete", {data: t, done: n})
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 10: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "case-instance", r.list = function (e, t) {
        return this.http.get(this.path, {data: e, done: t})
      }, r.close = function (e, t, n) {
        this.http.post(this.path + "/" + e + "/close", {data: t, done: n})
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 11: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "deployment", r.create = function (e, t) {
        var n = {"deployment-name": e.deploymentName}, r = Array.isArray(e.files) ? e.files : [e.files];
        return e.enableDuplicateFiltering && (n["enable-duplicate-filtering"] = "true"), e.deployChangedOnly && (n["deploy-changed-only"] = "true"), this.http.post(this.path + "/create", {
          data: {},
          fields: n,
          attachments: r,
          done: t
        })
      }, r.list = function () {
        n.list.apply(this, arguments)
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 12: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "filter", r.get = function (e, t) {
        return this.http.get(this.path + "/" + e, {done: t})
      }, r.list = function (e, t) {
        return this.http.get(this.path, {data: e, done: t})
      }, r.getTasks = function (e, t) {
        var n = this.path + "/";
        return "string" == typeof e ? (n = n + e + "/list", e = {}) : (n = n + e.id + "/list", delete e.id), n += "?firstResult=" + (e.firstResult || 0), n += "&maxResults=" + (e.maxResults || 15), this.http.post(n, {
          data: e,
          done: t
        })
      }, r.create = function (e, t) {
        return this.http.post(this.path + "/create", {data: e, done: t})
      }, r.update = function (e, t) {
        return this.http.put(this.path + "/" + e.id, {data: e, done: t})
      }, r.save = function (e, t) {
        return r[e.id ? "update" : "create"](e, t)
      }, r["delete"] = function (e, t) {
        return this.http.del(this.path + "/" + e, {done: t})
      }, r.authorizations = function (e, t) {
        return 1 === arguments.length ? this.http.options(this.path, {done: e}) : this.http.options(this.path + "/" + e, {done: t})
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 13: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "group", r.create = function (e, t) {
        return this.http.post(this.path + "/create", {
          data: e, done: t || function () {
          }
        })
      }, r.count = function (e, t) {
        1 === arguments.length ? (t = e, e = {}) : e = e || {}, this.http.get(this.path + "/count", {
          data: e,
          done: t || function () {
          }
        })
      }, r.get = function (e, t) {
        var n = "string" == typeof e ? e : e.id;
        this.http.get(this.path + "/" + n, {
          data: e, done: t || function () {
          }
        })
      }, r.list = function (e, t) {
        this.http.get(this.path, {
          data: e, done: t || function () {
          }
        })
      }, r.createMember = function (e, t) {
        return this.http.put(this.path + "/" + e.id + "/members/" + e.userId, {
          data: e, done: t || function () {
          }
        })
      }, r.deleteMember = function (e, t) {
        return this.http.del(this.path + "/" + e.id + "/members/" + e.userId, {
          data: e, done: t || function () {
          }
        })
      }, r.update = function (e, t) {
        return this.http.put(this.path + "/" + e.id, {
          data: e, done: t || function () {
          }
        })
      }, r["delete"] = function (e, t) {
        return this.http.del(this.path + "/" + e.id, {
          data: e, done: t || function () {
          }
        })
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 14: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "history", r.userOperation = function (e, t) {
        return arguments.length < 2 && (t = arguments[0], e = {}), this.http.get(this.path + "/user-operation", {
          data: e,
          done: t
        })
      }, r.processInstance = function (e, t) {
        arguments.length < 2 && (t = arguments[0], e = {});
        var n = {}, r = {}, i = ["firstResult", "maxResults"];
        for (var a in e)i.indexOf(a) > -1 ? r[a] = e[a] : n[a] = e[a];
        return this.http.post(this.path + "/process-instance", {data: n, query: r, done: t})
      }, r.processInstanceCount = function (e, t) {
        return arguments.length < 2 && (t = arguments[0], e = {}), this.http.post(this.path + "/process-instance/count", {
          data: e,
          done: t
        })
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 15: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "incident", r.get = function (e, t) {
        this.http.get(this.path, {data: e, done: t})
      }, r.count = function (e, t) {
        this.http.get(this.path + "/count", {data: e, done: t})
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 16: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "job", r.list = function (e, t) {
        var n = this.path;
        return n += "?firstResult=" + (e.firstResult || 0), e.maxResults && (n += "&maxResults=" + e.maxResults), this.http.post(n, {
          data: e,
          done: t
        })
      }, r.setRetries = function (e, t) {
        return this.http.put(this.path + "/" + e.id + "/retries", {data: e, done: t})
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 17: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "metrics", r.sum = function (e, t) {
        var n = this.path + "/" + e.name + "/sum";
        return delete e.name, this.http.get(n, {data: e, done: t})
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 18: [function (e, t) {
      "use strict";
      function n() {
      }

      var r = e("./../abstract-client-resource"), i = r.extend({
        suspend: function (e, t) {
          return "function" == typeof e && (t = e, e = {}), e = e || {}, t = t || n, this.http.post(this.path, {done: t})
        }, stats: function (e) {
          return this.http.post(this.path, {done: e || n})
        }, start: function (e) {
          return this.http.post(this.path, {data: {}, done: e})
        }
      }, {
        path: "process-definition", get: function (e, t) {
          return this.http.get(this.path + "/" + e, {done: t})
        }, getByKey: function (e, t) {
          return this.http.get(this.path + "/key/" + e, {done: t})
        }, list: function () {
          r.list.apply(this, arguments)
        }, formVariables: function (e, t) {
          var n = "";
          if (e.key)n = "key/" + e.key; else {
            if (!e.id)return t(new Error("Process definition task variables needs either a key or an id."));
            n = e.id
          }
          var r = {deserializeValues: e.deserializeValues};
          return e.names && (r.variableNames = (e.names || []).join(",")), this.http.get(this.path + "/" + n + "/form-variables", {
            data: r,
            done: t || function () {
            }
          })
        }, submitForm: function (e, t) {
          var n = "";
          if (e.key)n = "key/" + e.key; else {
            if (!e.id)return t(new Error("Process definition task variables needs either a key or an id."));
            n = e.id
          }
          return this.http.post(this.path + "/" + n + "/submit-form", {
            data: {
              businessKey: e.businessKey,
              variables: e.variables
            }, done: t || function () {
            }
          })
        }, startForm: function (e, t) {
          var r = this.path + "/" + (e.key ? "key/" + e.key : e.id) + "/startForm";
          return this.http.get(r, {done: t || n})
        }, xml: function (e, t) {
          var r = this.path + "/" + (e.id ? e.id : "key/" + e.key) + "/xml";
          return this.http.get(r, {done: t || n})
        }, submit: function (e, t) {
          var n = this.path;
          return n += e.key ? "/key/" + e.key : "/" + e.id, n += "/submit-form", this.http.post(n, {data: e, done: t})
        }, suspend: function (e, t, r) {
          return "function" == typeof t && (r = t, t = {}), t = t || {}, r = r || n, e = Array.isArray(e) ? e : [e], this.http.post(this.path, {done: r})
        }, start: function (e, t) {
          return this.http.post(this.path + "/" + (e.id ? e.id : "key/" + e.key) + "/start", {data: e, done: t})
        }
      });
      t.exports = i
    }, {"./../abstract-client-resource": 4}], 19: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend({}, {
        path: "process-instance", create: function (e, t) {
          return this.http.post(e, t)
        }, list: function () {
          n.list.apply(this, arguments)
        }, modify: function (e, t) {
          this.http.post(this.path + "/" + e.id + "/modification", {
            data: {
              instructions: e.instructions,
              skipCustomListeners: e.skipCustomListeners,
              skipIoMappings: e.skipIoMappings
            }, done: t
          })
        }
      });
      t.exports = r
    }, {"./../abstract-client-resource": 4}], 20: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "task", r.list = function (e, t) {
        return this.http.get(this.path, {
          data: e, done: function (e, n) {
            if (e)return t(e);
            var r = n._embedded.task || n._embedded.tasks, i = n._embedded.processDefinition;
            for (var a in r) {
              var o = r[a];
              o._embedded = o._embedded || {};
              for (var s in i)if (i[s].id === o.processDefinitionId) {
                o._embedded.processDefinition = [i[s]];
                break
              }
            }
            t(null, n)
          }
        })
      }, r.get = function (e, t) {
        return this.http.get(this.path + "/" + e, {done: t})
      }, r.comments = function (e, t) {
        return this.http.get(this.path + "/" + e + "/comment", {done: t})
      }, r.identityLinks = function (e, t) {
        return this.http.get(this.path + "/" + e + "/identity-links", {done: t})
      }, r.identityLinksAdd = function (e, t, n) {
        return this.http.post(this.path + "/" + e + "/identity-links", {data: t, done: n})
      }, r.identityLinksDelete = function (e, t, n) {
        return this.http.post(this.path + "/" + e + "/identity-links/delete", {data: t, done: n})
      }, r.createComment = function (e, t, n) {
        return this.http.post(this.path + "/" + e + "/comment/create", {data: {message: t}, done: n})
      }, r.create = function (e, t) {
        return this.http.post(this.path + "/create", {data: e, done: t})
      }, r.update = function (e, t) {
        return this.http.put(this.path + "/" + e.id, {data: e, done: t})
      }, r.assignee = function (e, t, n) {
        var r = {userId: t};
        return 2 === arguments.length && (e = arguments[0].taskId, r.userId = arguments[0].userId, n = arguments[1]), this.http.post(this.path + "/" + e + "/assignee", {
          data: r,
          done: n
        })
      }, r.delegate = function (e, t, n) {
        var r = {userId: t};
        return 2 === arguments.length && (e = arguments[0].taskId, r.userId = arguments[0].userId, n = arguments[1]), this.http.post(this.path + "/" + e + "/delegate", {
          data: r,
          done: n
        })
      }, r.claim = function (e, t, n) {
        var r = {userId: t};
        return 2 === arguments.length && (e = arguments[0].taskId, r.userId = arguments[0].userId, n = arguments[1]), this.http.post(this.path + "/" + e + "/claim", {
          data: r,
          done: n
        })
      }, r.unclaim = function (e, t) {
        return "string" != typeof e && (e = e.taskId), this.http.post(this.path + "/" + e + "/unclaim", {done: t})
      }, r.submitForm = function (e, t) {
        return e.id ? this.http.post(this.path + "/" + e.id + "/submit-form", {
          data: {variables: e.variables},
          done: t || function () {
          }
        }) : t(new Error("Task submitForm needs a task id."))
      }, r.formVariables = function (e, t) {
        var n = "";
        if (e.key)n = "key/" + e.key; else {
          if (!e.id)return t(new Error("Task variables needs either a key or an id."));
          n = e.id
        }
        var r = {deserializeValues: e.deserializeValues};
        return e.names && (r.variableNames = e.names.join(",")), this.http.get(this.path + "/" + n + "/form-variables", {
          data: r,
          done: t || function () {
          }
        })
      }, r.form = function (e, t) {
        return this.http.get(this.path + "/" + e + "/form", {done: t})
      }, r.localVariable = function (e, t) {
        return this.http.put(this.path + "/" + e.id + "/localVariables/" + e.varId, {data: e, done: t})
      }, r.localVariables = function (e, t) {
        return this.http.get(this.path + "/" + e + "/localVariables", {done: t})
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 21: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "user", r.create = function (e, t) {
        e = e || {};
        var n = ["id", "firstName", "lastName", "password"];
        for (var r in n) {
          var i = n[r];
          if (!e[i])return t(new Error("Missing " + i + " option to create user"))
        }
        var a = {
          profile: {id: e.id, firstName: e.firstName, lastName: e.lastName},
          credentials: {password: e.password}
        };
        return e.email && (a.profile.email = e.email), this.http.post(this.path + "/create", {
          data: a,
          done: t || function () {
          }
        })
      }, r.list = function (e, t) {
        1 === arguments.length ? (t = e, e = {}) : e = e || {}, this.http.get(this.path, {
          data: e,
          done: t || function () {
          }
        })
      }, r.count = function (e, t) {
        1 === arguments.length ? (t = e, e = {}) : e = e || {}, this.http.get(this.path + "/count", {
          data: e,
          done: t || function () {
          }
        })
      }, r.profile = function (e, t) {
        var n = "string" == typeof e ? e : e.id;
        this.http.del(this.path + "/" + n + "/profile", {
          done: t || function () {
          }
        })
      }, r.updateProfile = function (e, t) {
        return e = e || {}, e.id ? void this.http.put(this.path + "/" + e.id + "/profile", {
          data: e,
          done: t || function () {
          }
        }) : t(new Error("Missing id option to update user profile"))
      }, r.updateCredentials = function (e, t) {
        if (e = e || {}, !e.id)return t(new Error("Missing id option to update user credentials"));
        if (!e.password)return t(new Error("Missing password option to update user credentials"));
        var n = {password: e.password};
        e.authenticatedUserPassword && (n.authenticatedUserPassword = e.authenticatedUserPassword), this.http.put(this.path + "/" + e.id + "/credentials", {
          data: n,
          done: t || function () {
          }
        })
      }, r["delete"] = function (e, t) {
        var n = "string" == typeof e ? e : e.id;
        this.http.del(this.path + "/" + n, {
          done: t || function () {
          }
        })
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 22: [function (e, t) {
      "use strict";
      var n = e("./../abstract-client-resource"), r = n.extend();
      r.path = "variable-instance", r.instances = function (e, t) {
        this.http.post(this.path, {data: e, done: t})
      }, t.exports = r
    }, {"./../abstract-client-resource": 4}], 23: [function (e, t) {
      "use strict";
      function n() {
      }

      function r() {
        this.initialize()
      }

      var i = e("./events");
      r.extend = function (e, t) {
        e = e || {}, t = t || {};
        var n, r, i, a, o = this;
        n = e && Object.hasOwnProperty.call(o, "constructor") ? e.constructor : function () {
          return o.apply(this, arguments)
        };
        for (i in o)n[i] = o[i];
        for (i in t)n[i] = t[i];
        r = function () {
          this.constructor = n
        }, r.prototype = o.prototype, n.prototype = new r;
        for (a in e)n.prototype[a] = e[a];
        return n
      }, r.prototype.initialize = n, i.attach(r), t.exports = r
    }, {"./events": 24}], 24: [function (e, t) {
      "use strict";
      function n(e) {
        var t, n = [];
        for (t in e)n.push(e[t]);
        return n
      }

      function r(e) {
        var t, n = !1;
        return function () {
          return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t)
        }
      }

      function i(e, t) {
        e._events = e._events || {}, e._events[t] = e._events[t] || []
      }

      var a = {};
      a.attach = function (e) {
        e.on = this.on, e.once = this.once, e.off = this.off, e.trigger = this.trigger, e._events = {}
      }, a.on = function (e, t) {
        return i(this, e), this._events[e].push(t), this
      }, a.once = function (e, t) {
        var n = this, i = r(function () {
          n.off(e, r), t.apply(this, arguments)
        });
        return i._callback = t, this.on(e, i)
      }, a.off = function (e, t) {
        if (i(this, e), !t)return delete this._events[e], this;
        var n, r = [];
        for (n in this._events[e])this._events[e][n] !== t && r.push(this._events[e][n]);
        return this._events[e] = r, this
      }, a.trigger = function () {
        var e = n(arguments), t = e.shift();
        i(this, t);
        var r;
        for (r in this._events[t])this._events[t][r](this, e);
        return this
      }, t.exports = a
    }, {}], 25: [function (_dereq_, module, exports) {
      "use strict";
      function CamundaForm(e) {
        if (!e)throw new Error("CamundaForm need to be initialized with options.");
        var t = e.done = e.done || function (e) {
            if (e)throw e
          };
        return this.client = e.client ? e.client : new CamSDK.Client(e.clientConfig || {}), e.taskId || e.processDefinitionId || e.processDefinitionKey ? (this.taskId = e.taskId, this.processDefinitionId = e.processDefinitionId, this.processDefinitionKey = e.processDefinitionKey, this.formElement = e.formElement, this.containerElement = e.containerElement, this.formUrl = e.formUrl, this.formElement || this.containerElement ? this.formElement || this.formUrl ? (this.variableManager = new VariableManager({client: this.client}), this.formFieldHandlers = e.formFieldHandlers || [InputFieldHandler, ChoicesFieldHandler], this.businessKey = null, this.fields = [], this.scripts = [], this.options = e, Events.attach(this), void this.initialize(t)) : t(new Error("Camunda form needs to be intialized with either 'formElement' or 'formUrl'")) : t(new Error("CamundaForm needs to be initilized with either 'formElement' or 'containerElement'"))) : t(new Error("Cannot initialize Taskform: either 'taskId' or 'processDefinitionId' or 'processDefinitionKey' must be provided"))
      }

      var $ = _dereq_("./dom-lib"), VariableManager = _dereq_("./variable-manager"), InputFieldHandler = _dereq_("./controls/input-field-handler"), ChoicesFieldHandler = _dereq_("./controls/choices-field-handler"), BaseClass = _dereq_("./../base-class"), constants = _dereq_("./constants"), Events = _dereq_("./../events");
      CamundaForm.prototype.initializeHandler = function (e) {
        var t = this, n = e.selector;
        $(n, t.formElement).each(function () {
          t.fields.push(new e(this, t.variableManager))
        })
      }, CamundaForm.prototype.initialize = function (e) {
        e = e || function (e) {
            if (e)throw e
          };
        var t = this;
        if (this.formUrl)this.client.http.load(this.formUrl, {
          accept: "*/*", done: function (n, r) {
            if (n)return e(n);
            try {
              t.renderForm(r), t.initializeForm(e)
            } catch (i) {
              e(i)
            }
          }, data: {noCache: Date.now()}
        }); else try {
          this.initializeForm(e)
        } catch (n) {
          e(n)
        }
      }, CamundaForm.prototype.renderForm = function (e) {
        $(this.containerElement).html("").append('<div class="injected-form-wrapper">' + e + "</div>");
        var t = this.formElement = $("form", this.containerElement);
        if (1 !== t.length)throw new Error("Form must provide exaclty one element <form ..>");
        t.attr("name") || t.attr("name", "$$camForm")
      }, CamundaForm.prototype.initializeForm = function (e) {
        var t = this;
        this.initializeFormScripts(), this.initializeFieldHandlers(), this.executeFormScripts(), this.fireEvent("form-loaded"), this.fetchVariables(function (n, r) {
          if (n)throw n;
          t.mergeVariables(r), t.storeOriginalValues(r), t.fireEvent("variables-fetched"), t.restore(), t.fireEvent("variables-restored"), t.applyVariables(), t.fireEvent("variables-applied"), e(null, t)
        })
      }, CamundaForm.prototype.initializeFieldHandlers = function () {
        for (var e in this.formFieldHandlers)this.initializeHandler(this.formFieldHandlers[e])
      }, CamundaForm.prototype.initializeFormScripts = function () {
        for (var e = $("script[" + constants.DIRECTIVE_CAM_SCRIPT + "]", this.formElement), t = 0; t < e.length; t++)this.scripts.push(e[t].text)
      }, CamundaForm.prototype.executeFormScripts = function () {
        for (var e = 0; e < this.scripts.length; e++)this.executeFormScript(this.scripts[e])
      }, CamundaForm.prototype.executeFormScript = function (script) {
        !function (camForm) {
          eval(script)
        }(this)
      }, CamundaForm.prototype.store = function (e) {
        var t = this.taskId || this.processDefinitionId || this.caseInstanceId;
        if (!t) {
          if ("function" == typeof e)return e(new Error("Cannot determine the storage ID"));
          throw new Error("Cannot determine the storage ID")
        }
        if (this.storePrevented = !1, this.fireEvent("store"), !this.storePrevented) {
          try {
            this.retrieveVariables();
            var n = {date: Date.now(), vars: {}};
            for (var r in this.variableManager.variables)"Bytes" !== this.variableManager.variables[r].type && (n.vars[r] = this.variableManager.variables[r].value);
            localStorage.setItem("camForm:" + t, JSON.stringify(n))
          } catch (i) {
            if ("function" == typeof e)return e(i);
            throw i
          }
          this.fireEvent("variables-stored"), "function" == typeof e && e()
        }
      }, CamundaForm.prototype.isRestorable = function () {
        var e = this.taskId || this.processDefinitionId || this.caseInstanceId;
        if (!e)throw new Error("Cannot determine the storage ID");
        if (!localStorage.getItem("camForm:" + e))return !1;
        var t = localStorage.getItem("camForm:" + e);
        try {
          t = JSON.parse(t)
        } catch (n) {
          return !1
        }
        return t && Object.keys(t).length ? !0 : !1
      }, CamundaForm.prototype.restore = function (e) {
        var t, n = this.variableManager.variables, r = this.taskId || this.processDefinitionId || this.caseDefinitionId;
        if (!r) {
          if ("function" == typeof e)return e(new Error("Cannot determine the storage ID"));
          throw new Error("Cannot determine the storage ID")
        }
        if (this.isRestorable()) {
          try {
            t = localStorage.getItem("camForm:" + r), t = JSON.parse(t).vars
          } catch (i) {
            if ("function" == typeof e)return e(i);
            throw i
          }
          for (var a in t)n[a] ? n[a].value = t[a] : n[a] = {name: a, value: t[a]};
          "function" == typeof e && e()
        } else if ("function" == typeof e)return e()
      }, CamundaForm.prototype.submit = function (e) {
        var t = this.taskId || this.processDefinitionId;
        if (this.submitPrevented = !1, this.fireEvent("submit"), !this.submitPrevented) {
          try {
            this.retrieveVariables()
          } catch (n) {
            return e(n)
          }
          var r = this;
          this.transformFiles(function () {
            localStorage.removeItem("camForm:" + t), r.submitVariables(function (t, n) {
              return t ? (r.fireEvent("submit-failed", t), e(t)) : (r.fireEvent("submit-success"), void e(null, n))
            })
          })
        }
      }, CamundaForm.prototype.transformFiles = function (e) {
        var t = this, n = 1, r = function () {
          0 === --n && e()
        }, i = function (e) {
          if (0 === e)return "0 Byte";
          var t = 1e3, n = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], r = Math.floor(Math.log(e) / Math.log(t));
          return (e / Math.pow(t, r)).toPrecision(3) + " " + n[r]
        };
        for (var a in this.fields) {
          var o = this.fields[a].element[0];
          if ("file" === o.getAttribute("type"))if ("function" == typeof FileReader && o.files.length > 0) {
            if (o.files[0].size > (parseInt(o.getAttribute("cam-max-filesize"), 10) || 5e6))throw new Error("Maximum file size of " + i(parseInt(o.getAttribute("cam-max-filesize"), 10) || 5e6) + " exceeded.");
            var s = new FileReader;
            s.onloadend = function (e) {
              return function (n) {
                for (var i = "", a = new Uint8Array(n.target.result), o = a.byteLength, s = 0; o > s; s++)i += String.fromCharCode(a[s]);
                t.variableManager.variables[t.fields[e].variableName].value = btoa(i), r()
              }
            }(a), s.readAsArrayBuffer(o.files[0]), n++
          } else t.variableManager.variables[t.fields[a].variableName].value = null
        }
        r()
      }, CamundaForm.prototype.fetchVariables = function (e) {
        e = e || function () {
          };
        var t = this.variableManager.variableNames();
        if (t.length) {
          var n = {names: t, deserializeValues: !1};
          this.taskId ? (n.id = this.taskId, this.client.resource("task").formVariables(n, e)) : (n.id = this.processDefinitionId, n.key = this.processDefinitionKey, this.client.resource("process-definition").formVariables(n, e))
        } else e()
      }, CamundaForm.prototype.submitVariables = function (e) {
        e = e || function () {
          };
        var t = this.variableManager, n = t.variables, r = {};
        for (var i in n)if (t.isDirty(i)) {
          var a = n[i].value;
          t.isJsonVariable(i) && (a = JSON.stringify(a)), r[i] = {value: a, type: n[i].type, valueInfo: n[i].valueInfo}
        }
        var o = {variables: r};
        if (this.taskId)o.id = this.taskId, this.client.resource("task").submitForm(o, e); else {
          var s = this.businessKey || this.formElement.find('input[type="text"][cam-business-key]').val();
          s && (o.businessKey = s), o.id = this.processDefinitionId, o.key = this.processDefinitionKey, this.client.resource("process-definition").submitForm(o, e)
        }
      }, CamundaForm.prototype.storeOriginalValues = function (e) {
        for (var t in e)this.variableManager.setOriginalValue(t, e[t].value)
      }, CamundaForm.prototype.mergeVariables = function (e) {
        var t = this.variableManager.variables;
        for (var n in e) {
          if (t[n])for (var r in e[n])t[n][r] = t[n][r] || e[n][r]; else t[n] = e[n];
          this.variableManager.isJsonVariable(n) && (t[n].value = JSON.parse(e[n].value)), this.variableManager.isVariablesFetched = !0
        }
      }, CamundaForm.prototype.applyVariables = function () {
        for (var e in this.fields)this.fields[e].applyValue()
      }, CamundaForm.prototype.retrieveVariables = function () {
        for (var e in this.fields)this.fields[e].getValue()
      }, CamundaForm.prototype.fireEvent = function (e, t) {
        this.trigger(e, t)
      }, CamundaForm.$ = $, CamundaForm.VariableManager = VariableManager, CamundaForm.fields = {}, CamundaForm.fields.InputFieldHandler = InputFieldHandler, CamundaForm.fields.ChoicesFieldHandler = ChoicesFieldHandler, CamundaForm.cleanLocalStorage = function (e) {
        for (var t = 0; t < localStorage.length; t++) {
          var n = localStorage.key(t);
          if (0 === n.indexOf("camForm:")) {
            var r = JSON.parse(localStorage.getItem(n));
            r.date < e && (localStorage.removeItem(n), t--)
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
    }], 26: [function (e, t) {
      "use strict";
      t.exports = {
        DIRECTIVE_CAM_FORM: "cam-form",
        DIRECTIVE_CAM_VARIABLE_NAME: "cam-variable-name",
        DIRECTIVE_CAM_VARIABLE_TYPE: "cam-variable-type",
        DIRECTIVE_CAM_CHOICES: "cam-choices",
        DIRECTIVE_CAM_SCRIPT: "cam-script"
      }
    }, {}], 27: [function (e, t) {
      "use strict";
      function n() {
      }

      function r(e, t) {
        this.element = a(e), this.variableManager = t, this.variableName = null, this.initialize()
      }

      var i = e("../../base-class"), a = e("./../dom-lib");
      r.selector = null, r.extend = i.extend, r.prototype.initialize = n, r.prototype.applyValue = n, r.prototype.getValue = n, t.exports = r
    }, {"../../base-class": 23, "./../dom-lib": 30}], 28: [function (e, t) {
      "use strict";
      var n = e("./../constants"), r = e("./abstract-form-field"), i = e("./../dom-lib"), a = r.extend({
        initialize: function () {
          var e = this.variableName = this.element.attr(n.DIRECTIVE_CAM_VARIABLE_NAME), t = this.variableType = this.element.attr(n.DIRECTIVE_CAM_VARIABLE_TYPE), r = this.choicesVariableName = this.element.attr(n.DIRECTIVE_CAM_CHOICES);
          this.variableManager.createVariable({
            name: e,
            type: t,
            value: this.element.val() || null
          }), r && this.variableManager.fetchVariable(r), this.originalValue = this.element.val() || null, this.previousValue = this.originalValue, this.variableName = e
        }, applyValue: function () {
          var e = this.element[0].selectedIndex;
          if (this.choicesVariableName) {
            var t = this.variableManager.variableValue(this.choicesVariableName);
            if (t)if (t instanceof Array)for (var n = 0; n < t.length; n++) {
              var r = t[n];
              this.element.find('option[text="' + r + '"]').length || this.element.append(i("<option>", {
                value: r,
                text: r
              }))
            } else for (var a in t)this.element.find('option[value="' + a + '"]').length || this.element.append(i("<option>", {
              value: a,
              text: t[a]
            }))
          }
          this.element[0].selectedIndex = e, this.previousValue = this.element.val() || "";
          var o = this.variableManager.variableValue(this.variableName);
          return o !== this.previousValue && (this.element.val(o), this.element.trigger("camFormVariableApplied", o)), this
        }, getValue: function () {
          var e, t = this.element.prop("multiple");
          return t ? (e = [], this.element.find("option:selected").each(function () {
            e.push(i(this).val())
          })) : e = this.element.find("option:selected").attr("value"), this.variableManager.variableValue(this.variableName, e), e
        }
      }, {selector: "select[" + n.DIRECTIVE_CAM_VARIABLE_NAME + "]"});
      t.exports = a
    }, {"./../constants": 26, "./../dom-lib": 30, "./abstract-form-field": 27}], 29: [function (e, t) {
      "use strict";
      var n = e("./../constants"), r = e("./abstract-form-field"), i = (e("./../dom-lib"), function (e) {
        return "checkbox" === e.attr("type") && "Boolean" === e.attr(n.DIRECTIVE_CAM_VARIABLE_TYPE)
      }), a = r.extend({
        initialize: function () {
          var e = this.element.attr(n.DIRECTIVE_CAM_VARIABLE_NAME), t = this.element.attr(n.DIRECTIVE_CAM_VARIABLE_TYPE);
          this.variableManager.createVariable({
            name: e,
            type: t
          }), this.originalValue = this.element.val(), this.previousValue = this.originalValue, this.variableName = e, this.getValue()
        }, applyValue: function () {
          this.previousValue = this.getValueFromHtmlControl() || "";
          var e = this.variableManager.variableValue(this.variableName);
          return e !== this.previousValue && (this.applyValueToHtmlControl(e), this.element.trigger("camFormVariableApplied", e)), this
        }, getValue: function () {
          var e = this.getValueFromHtmlControl();
          return this.variableManager.variableValue(this.variableName, e), e
        }, getValueFromHtmlControl: function () {
          return i(this.element) ? this.element.prop("checked") : this.element.val()
        }, applyValueToHtmlControl: function (e) {
          i(this.element) ? this.element.prop("checked", e) : "file" !== this.element[0].type && this.element.val(e)
        }
      }, {selector: "input[" + n.DIRECTIVE_CAM_VARIABLE_NAME + "],textarea[" + n.DIRECTIVE_CAM_VARIABLE_NAME + "]"});
      t.exports = a
    }, {"./../constants": 26, "./../dom-lib": 30, "./abstract-form-field": 27}], 30: [function (e, t) {
      (function (e) {
        "use strict";
        !function (t) {
          t("undefined" != typeof window ? window : e)
        }(function (e) {
          e = e || {}, t.exports = e.jQuery || (e.angular ? e.angular.element : !1) || e.Zepto
        })
      }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}], 31: [function (e, t) {
      "use strict";
      var n = /^-?[\d]+$/, r = /^(0|(-?(((0|[1-9]\d*)\.\d+)|([1-9]\d*))))([eE][-+]?[0-9]+)?$/, i = /^(true|false)$/, a = /^(\d{2}|\d{4})(?:\-)([0]{1}\d{1}|[1]{1}[0-2]{1})(?:\-)([0-2]{1}\d{1}|[3]{1}[0-1]{1})T(?:\s)?([0-1]{1}\d{1}|[2]{1}[0-3]{1}):([0-5]{1}\d{1}):([0-5]{1}\d{1})?$/, o = function (e, t) {
        switch (t) {
          case"Integer":
          case"Long":
          case"Short":
            return n.test(e);
          case"Float":
          case"Double":
            return r.test(e);
          case"Boolean":
            return i.test(e);
          case"Date":
            return a.test(e)
        }
      }, s = function (e, t) {
        if ("string" == typeof e && (e = e.trim()), "String" === t || "Bytes" === t)return e;
        if (!o(e, t))throw new Error("Value '" + e + "' is not of type " + t);
        switch (t) {
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
      t.exports = {convertToType: s, isType: o}
    }, {}], 32: [function (e, t) {
      "use strict";
      function n() {
        this.variables = {}, this.isVariablesFetched = !1
      }

      var r = e("./type-util").convertToType;
      n.prototype.fetchVariable = function (e) {
        if (this.isVariablesFetched)throw new Error("Illegal State: cannot call fetchVariable(), variables already fetched.");
        this.createVariable({name: e})
      }, n.prototype.createVariable = function (e) {
        if (this.variables[e.name])throw new Error("Cannot add variable with name " + e.name + ": already exists.");
        this.variables[e.name] = e
      }, n.prototype.destroyVariable = function (e) {
        if (!this.variables[e])throw new Error("Cannot remove variable with name " + e + ": variable does not exist.");
        delete this.variables[e]
      }, n.prototype.setOriginalValue = function (e, t) {
        if (!this.variables[e])throw new Error("Cannot set original value of variable with name " + e + ": variable does not exist.");
        this.variables[e].originalValue = t
      }, n.prototype.variable = function (e) {
        return this.variables[e]
      }, n.prototype.variableValue = function (e, t) {
        var n = this.variable(e);
        return "undefined" == typeof t || null === t ? t = null : "" === t && "String" !== n.type ? t = null : "string" == typeof t && "String" !== n.type && (t = r(t, n.type)), 2 === arguments.length && (n.value = t), n.value
      }, n.prototype.isDirty = function (e) {
        var t = this.variable(e);
        return this.isJsonVariable(e) ? t.originalValue !== JSON.stringify(t.value) : t.originalValue !== t.value || "Object" === t.type
      }, n.prototype.isJsonVariable = function (e) {
        var t = this.variable(e), n = t.type, r = ["Object", "json", "Json"], i = r.indexOf(n);
        return 0 === i ? -1 !== t.valueInfo.serializationDataFormat.indexOf("application/json") : -1 !== i
      }, n.prototype.variableNames = function () {
        return Object.keys(this.variables)
      }, t.exports = n
    }, {"./type-util": 31}], 33: [function (e, t) {
      "use strict";
      function n(e, t, n) {
        if (n = n || function () {
            }, !e.length)return n();
        var r = 0, i = function () {
          t(e[r], function (t) {
            t ? (n(t), n = function () {
            }) : (r += 1, r >= e.length ? n() : i())
          })
        };
        i()
      }

      var r = t.exports = {typeUtils: e("./forms/type-util")};
      r.solveHALEmbedded = function (e) {
        function t(t) {
          if ("Id" !== t.slice(-2))return !1;
          var n = t.slice(0, -2), r = e._embedded;
          return !(!r[n] || !r[n].length)
        }

        function n(e) {
          var n = Object.keys(e);
          for (var r in n)"_" !== n[r][0] && t(n[r]) || n.splice(r, 1);
          return n
        }

        var r = Object.keys(e._embedded || {});
        for (var i in r) {
          var a = r[i];
          for (var o in e._embedded[a]) {
            e._embedded[a][o]._embedded = e._embedded[a][o]._embedded || {};
            var s = n(e._embedded[a][o]);
            for (var u in s) {
              var l = s[u];
              if (e._embedded[a][o][l]) {
                var c = e._embedded[l.slice(0, -2)];
                for (var p in c)c[p].id === e._embedded[a][o][l] && (e._embedded[a][o]._embedded[l.slice(0, -2)] = [c[p]])
              }
            }
          }
        }
        return e
      }, r.series = function (e, t) {
        t = t || function () {
          };
        var r = {};
        n(Object.keys(e), function (t, n) {
          e[t](function (e) {
            var i = Array.prototype.slice.call(arguments, 1);
            i.length <= 1 && (i = i[0]), r[t] = i, n(e)
          })
        }, function (e) {
          t(e, r)
        })
      }
    }, {"./forms/type-util": 31}], 34: [function (e, t, n) {
      function r(e, t, n) {
        if (!(this instanceof r))return new r(e, t, n);
        var i, a = typeof e;
        if ("number" === a)i = e > 0 ? e >>> 0 : 0; else if ("string" === a)"base64" === t && (e = _(e)), i = r.byteLength(e, t); else {
          if ("object" !== a || null === e)throw new TypeError("must start with number, buffer, array or string");
          "Buffer" === e.type && O(e.data) && (e = e.data), i = +e.length > 0 ? Math.floor(+e.length) : 0
        }
        if (this.length > L)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + L.toString(16) + " bytes");
        var o;
        r.TYPED_ARRAY_SUPPORT ? o = r._augment(new Uint8Array(i)) : (o = this, o.length = i, o._isBuffer = !0);
        var s;
        if (r.TYPED_ARRAY_SUPPORT && "number" == typeof e.byteLength)o._set(e); else if (S(e))if (r.isBuffer(e))for (s = 0; i > s; s++)o[s] = e.readUInt8(s); else for (s = 0; i > s; s++)o[s] = (e[s] % 256 + 256) % 256; else if ("string" === a)o.write(e, 0, t); else if ("number" === a && !r.TYPED_ARRAY_SUPPORT && !n)for (s = 0; i > s; s++)o[s] = 0;
        return o
      }

      function i(e, t, n, r) {
        n = Number(n) || 0;
        var i = e.length - n;
        r ? (r = Number(r), r > i && (r = i)) : r = i;
        var a = t.length;
        if (a % 2 !== 0)throw new Error("Invalid hex string");
        r > a / 2 && (r = a / 2);
        for (var o = 0; r > o; o++) {
          var s = parseInt(t.substr(2 * o, 2), 16);
          if (isNaN(s))throw new Error("Invalid hex string");
          e[n + o] = s
        }
        return o
      }

      function a(e, t, n, r) {
        var i = M(T(t), e, n, r);
        return i
      }

      function o(e, t, n, r) {
        var i = M(D(t), e, n, r);
        return i
      }

      function s(e, t, n, r) {
        return o(e, t, n, r)
      }

      function u(e, t, n, r) {
        var i = M(I(t), e, n, r);
        return i
      }

      function l(e, t, n, r) {
        var i = M(k(t), e, n, r, 2);
        return i
      }

      function c(e, t, n) {
        return P.fromByteArray(0 === t && n === e.length ? e : e.slice(t, n))
      }

      function p(e, t, n) {
        var r = "", i = "";
        n = Math.min(e.length, n);
        for (var a = t; n > a; a++)e[a] <= 127 ? (r += R(i) + String.fromCharCode(e[a]), i = "") : i += "%" + e[a].toString(16);
        return r + R(i)
      }

      function d(e, t, n) {
        var r = "";
        n = Math.min(e.length, n);
        for (var i = t; n > i; i++)r += String.fromCharCode(e[i]);
        return r
      }

      function f(e, t, n) {
        return d(e, t, n)
      }

      function h(e, t, n) {
        var r = e.length;
        (!t || 0 > t) && (t = 0), (!n || 0 > n || n > r) && (n = r);
        for (var i = "", a = t; n > a; a++)i += C(e[a]);
        return i
      }

      function m(e, t, n) {
        for (var r = e.slice(t, n), i = "", a = 0; a < r.length; a += 2)i += String.fromCharCode(r[a] + 256 * r[a + 1]);
        return i
      }

      function g(e, t, n) {
        if (e % 1 !== 0 || 0 > e)throw new RangeError("offset is not uint");
        if (e + t > n)throw new RangeError("Trying to access beyond buffer length")
      }

      function v(e, t, n, i, a, o) {
        if (!r.isBuffer(e))throw new TypeError("buffer must be a Buffer instance");
        if (t > a || o > t)throw new TypeError("value is out of bounds");
        if (n + i > e.length)throw new TypeError("index out of range")
      }

      function y(e, t, n, r) {
        0 > t && (t = 65535 + t + 1);
        for (var i = 0, a = Math.min(e.length - n, 2); a > i; i++)e[n + i] = (t & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
      }

      function b(e, t, n, r) {
        0 > t && (t = 4294967295 + t + 1);
        for (var i = 0, a = Math.min(e.length - n, 4); a > i; i++)e[n + i] = t >>> 8 * (r ? i : 3 - i) & 255
      }

      function w(e, t, n, r, i, a) {
        if (t > i || a > t)throw new TypeError("value is out of bounds");
        if (n + r > e.length)throw new TypeError("index out of range")
      }

      function x(e, t, n, r, i) {
        return i || w(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), N.write(e, t, n, r, 23, 4), n + 4
      }

      function E(e, t, n, r, i) {
        return i || w(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), N.write(e, t, n, r, 52, 8), n + 8
      }

      function _(e) {
        for (e = A(e).replace($, ""); e.length % 4 !== 0;)e += "=";
        return e
      }

      function A(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
      }

      function S(e) {
        return O(e) || r.isBuffer(e) || e && "object" == typeof e && "number" == typeof e.length
      }

      function C(e) {
        return 16 > e ? "0" + e.toString(16) : e.toString(16)
      }

      function T(e) {
        for (var t = [], n = 0; n < e.length; n++) {
          var r = e.charCodeAt(n);
          if (127 >= r)t.push(r); else {
            var i = n;
            r >= 55296 && 57343 >= r && n++;
            for (var a = encodeURIComponent(e.slice(i, n + 1)).substr(1).split("%"), o = 0; o < a.length; o++)t.push(parseInt(a[o], 16))
          }
        }
        return t
      }

      function D(e) {
        for (var t = [], n = 0; n < e.length; n++)t.push(255 & e.charCodeAt(n));
        return t
      }

      function k(e) {
        for (var t, n, r, i = [], a = 0; a < e.length; a++)t = e.charCodeAt(a), n = t >> 8, r = t % 256, i.push(r), i.push(n);
        return i
      }

      function I(e) {
        return P.toByteArray(e)
      }

      function M(e, t, n, r, i) {
        i && (r -= r % i);
        for (var a = 0; r > a && !(a + n >= t.length || a >= e.length); a++)t[a + n] = e[a];
        return a
      }

      function R(e) {
        try {
          return decodeURIComponent(e)
        } catch (t) {
          return String.fromCharCode(65533)
        }
      }

      var P = e("base64-js"), N = e("ieee754"), O = e("is-array");
      n.Buffer = r, n.SlowBuffer = r, n.INSPECT_MAX_BYTES = 50, r.poolSize = 8192;
      var L = 1073741823;
      r.TYPED_ARRAY_SUPPORT = function () {
        try {
          var e = new ArrayBuffer(0), t = new Uint8Array(e);
          return t.foo = function () {
            return 42
          }, 42 === t.foo() && "function" == typeof t.subarray && 0 === new Uint8Array(1).subarray(1, 1).byteLength
        } catch (n) {
          return !1
        }
      }(), r.isBuffer = function (e) {
        return !(null == e || !e._isBuffer)
      }, r.compare = function (e, t) {
        if (!r.isBuffer(e) || !r.isBuffer(t))throw new TypeError("Arguments must be Buffers");
        for (var n = e.length, i = t.length, a = 0, o = Math.min(n, i); o > a && e[a] === t[a]; a++);
        return a !== o && (n = e[a], i = t[a]), i > n ? -1 : n > i ? 1 : 0
      }, r.isEncoding = function (e) {
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
      }, r.concat = function (e, t) {
        if (!O(e))throw new TypeError("Usage: Buffer.concat(list[, length])");
        if (0 === e.length)return new r(0);
        if (1 === e.length)return e[0];
        var n;
        if (void 0 === t)for (t = 0, n = 0; n < e.length; n++)t += e[n].length;
        var i = new r(t), a = 0;
        for (n = 0; n < e.length; n++) {
          var o = e[n];
          o.copy(i, a), a += o.length
        }
        return i
      }, r.byteLength = function (e, t) {
        var n;
        switch (e += "", t || "utf8") {
          case"ascii":
          case"binary":
          case"raw":
            n = e.length;
            break;
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
            n = 2 * e.length;
            break;
          case"hex":
            n = e.length >>> 1;
            break;
          case"utf8":
          case"utf-8":
            n = T(e).length;
            break;
          case"base64":
            n = I(e).length;
            break;
          default:
            n = e.length
        }
        return n
      }, r.prototype.length = void 0, r.prototype.parent = void 0, r.prototype.toString = function (e, t, n) {
        var r = !1;
        if (t >>>= 0, n = void 0 === n || 1 / 0 === n ? this.length : n >>> 0, e || (e = "utf8"), 0 > t && (t = 0), n > this.length && (n = this.length), t >= n)return "";
        for (; ;)switch (e) {
          case"hex":
            return h(this, t, n);
          case"utf8":
          case"utf-8":
            return p(this, t, n);
          case"ascii":
            return d(this, t, n);
          case"binary":
            return f(this, t, n);
          case"base64":
            return c(this, t, n);
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
            return m(this, t, n);
          default:
            if (r)throw new TypeError("Unknown encoding: " + e);
            e = (e + "").toLowerCase(), r = !0
        }
      }, r.prototype.equals = function (e) {
        if (!r.isBuffer(e))throw new TypeError("Argument must be a Buffer");
        return 0 === r.compare(this, e)
      }, r.prototype.inspect = function () {
        var e = "", t = n.INSPECT_MAX_BYTES;
        return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
      }, r.prototype.compare = function (e) {
        if (!r.isBuffer(e))throw new TypeError("Argument must be a Buffer");
        return r.compare(this, e)
      }, r.prototype.get = function (e) {
        return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e)
      }, r.prototype.set = function (e, t) {
        return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e, t)
      }, r.prototype.write = function (e, t, n, r) {
        if (isFinite(t))isFinite(n) || (r = n, n = void 0); else {
          var c = r;
          r = t, t = n, n = c
        }
        t = Number(t) || 0;
        var p = this.length - t;
        n ? (n = Number(n), n > p && (n = p)) : n = p, r = String(r || "utf8").toLowerCase();
        var d;
        switch (r) {
          case"hex":
            d = i(this, e, t, n);
            break;
          case"utf8":
          case"utf-8":
            d = a(this, e, t, n);
            break;
          case"ascii":
            d = o(this, e, t, n);
            break;
          case"binary":
            d = s(this, e, t, n);
            break;
          case"base64":
            d = u(this, e, t, n);
            break;
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
            d = l(this, e, t, n);
            break;
          default:
            throw new TypeError("Unknown encoding: " + r)
        }
        return d
      }, r.prototype.toJSON = function () {
        return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
      }, r.prototype.slice = function (e, t) {
        var n = this.length;
        if (e = ~~e, t = void 0 === t ? n : ~~t, 0 > e ? (e += n, 0 > e && (e = 0)) : e > n && (e = n), 0 > t ? (t += n, 0 > t && (t = 0)) : t > n && (t = n), e > t && (t = e), r.TYPED_ARRAY_SUPPORT)return r._augment(this.subarray(e, t));
        for (var i = t - e, a = new r(i, void 0, !0), o = 0; i > o; o++)a[o] = this[o + e];
        return a
      }, r.prototype.readUInt8 = function (e, t) {
        return t || g(e, 1, this.length), this[e]
      }, r.prototype.readUInt16LE = function (e, t) {
        return t || g(e, 2, this.length), this[e] | this[e + 1] << 8
      }, r.prototype.readUInt16BE = function (e, t) {
        return t || g(e, 2, this.length), this[e] << 8 | this[e + 1]
      }, r.prototype.readUInt32LE = function (e, t) {
        return t || g(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
      }, r.prototype.readUInt32BE = function (e, t) {
        return t || g(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
      }, r.prototype.readInt8 = function (e, t) {
        return t || g(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
      }, r.prototype.readInt16LE = function (e, t) {
        t || g(e, 2, this.length);
        var n = this[e] | this[e + 1] << 8;
        return 32768 & n ? 4294901760 | n : n
      }, r.prototype.readInt16BE = function (e, t) {
        t || g(e, 2, this.length);
        var n = this[e + 1] | this[e] << 8;
        return 32768 & n ? 4294901760 | n : n
      }, r.prototype.readInt32LE = function (e, t) {
        return t || g(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
      }, r.prototype.readInt32BE = function (e, t) {
        return t || g(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
      }, r.prototype.readFloatLE = function (e, t) {
        return t || g(e, 4, this.length), N.read(this, e, !0, 23, 4)
      }, r.prototype.readFloatBE = function (e, t) {
        return t || g(e, 4, this.length), N.read(this, e, !1, 23, 4)
      }, r.prototype.readDoubleLE = function (e, t) {
        return t || g(e, 8, this.length), N.read(this, e, !0, 52, 8)
      }, r.prototype.readDoubleBE = function (e, t) {
        return t || g(e, 8, this.length), N.read(this, e, !1, 52, 8)
      }, r.prototype.writeUInt8 = function (e, t, n) {
        return e = +e, t >>>= 0, n || v(this, e, t, 1, 255, 0), r.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = e, t + 1
      }, r.prototype.writeUInt16LE = function (e, t, n) {
        return e = +e, t >>>= 0, n || v(this, e, t, 2, 65535, 0), r.TYPED_ARRAY_SUPPORT ? (this[t] = e, this[t + 1] = e >>> 8) : y(this, e, t, !0), t + 2
      }, r.prototype.writeUInt16BE = function (e, t, n) {
        return e = +e, t >>>= 0, n || v(this, e, t, 2, 65535, 0), r.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = e) : y(this, e, t, !1), t + 2
      }, r.prototype.writeUInt32LE = function (e, t, n) {
        return e = +e, t >>>= 0, n || v(this, e, t, 4, 4294967295, 0), r.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e) : b(this, e, t, !0), t + 4
      }, r.prototype.writeUInt32BE = function (e, t, n) {
        return e = +e, t >>>= 0, n || v(this, e, t, 4, 4294967295, 0), r.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e) : b(this, e, t, !1), t + 4
      }, r.prototype.writeInt8 = function (e, t, n) {
        return e = +e, t >>>= 0, n || v(this, e, t, 1, 127, -128), r.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 0 > e && (e = 255 + e + 1), this[t] = e, t + 1
      }, r.prototype.writeInt16LE = function (e, t, n) {
        return e = +e, t >>>= 0, n || v(this, e, t, 2, 32767, -32768), r.TYPED_ARRAY_SUPPORT ? (this[t] = e, this[t + 1] = e >>> 8) : y(this, e, t, !0), t + 2
      }, r.prototype.writeInt16BE = function (e, t, n) {
        return e = +e, t >>>= 0, n || v(this, e, t, 2, 32767, -32768), r.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = e) : y(this, e, t, !1), t + 2
      }, r.prototype.writeInt32LE = function (e, t, n) {
        return e = +e, t >>>= 0, n || v(this, e, t, 4, 2147483647, -2147483648), r.TYPED_ARRAY_SUPPORT ? (this[t] = e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : b(this, e, t, !0), t + 4
      }, r.prototype.writeInt32BE = function (e, t, n) {
        return e = +e, t >>>= 0, n || v(this, e, t, 4, 2147483647, -2147483648), 0 > e && (e = 4294967295 + e + 1), r.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e) : b(this, e, t, !1), t + 4
      }, r.prototype.writeFloatLE = function (e, t, n) {
        return x(this, e, t, !0, n)
      }, r.prototype.writeFloatBE = function (e, t, n) {
        return x(this, e, t, !1, n)
      }, r.prototype.writeDoubleLE = function (e, t, n) {
        return E(this, e, t, !0, n)
      }, r.prototype.writeDoubleBE = function (e, t, n) {
        return E(this, e, t, !1, n)
      }, r.prototype.copy = function (e, t, n, i) {
        var a = this;
        if (n || (n = 0), i || 0 === i || (i = this.length), t || (t = 0), i !== n && 0 !== e.length && 0 !== a.length) {
          if (n > i)throw new TypeError("sourceEnd < sourceStart");
          if (0 > t || t >= e.length)throw new TypeError("targetStart out of bounds");
          if (0 > n || n >= a.length)throw new TypeError("sourceStart out of bounds");
          if (0 > i || i > a.length)throw new TypeError("sourceEnd out of bounds");
          i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
          var o = i - n;
          if (1e3 > o || !r.TYPED_ARRAY_SUPPORT)for (var s = 0; o > s; s++)e[s + t] = this[s + n]; else e._set(this.subarray(n, n + o), t)
        }
      }, r.prototype.fill = function (e, t, n) {
        if (e || (e = 0), t || (t = 0), n || (n = this.length), t > n)throw new TypeError("end < start");
        if (n !== t && 0 !== this.length) {
          if (0 > t || t >= this.length)throw new TypeError("start out of bounds");
          if (0 > n || n > this.length)throw new TypeError("end out of bounds");
          var r;
          if ("number" == typeof e)for (r = t; n > r; r++)this[r] = e; else {
            var i = T(e.toString()), a = i.length;
            for (r = t; n > r; r++)this[r] = i[r % a]
          }
          return this
        }
      }, r.prototype.toArrayBuffer = function () {
        if ("undefined" != typeof Uint8Array) {
          if (r.TYPED_ARRAY_SUPPORT)return new r(this).buffer;
          for (var e = new Uint8Array(this.length), t = 0, n = e.length; n > t; t += 1)e[t] = this[t];
          return e.buffer
        }
        throw new TypeError("Buffer.toArrayBuffer not supported in this browser")
      };
      var F = r.prototype;
      r._augment = function (e) {
        return e.constructor = r, e._isBuffer = !0, e._get = e.get, e._set = e.set, e.get = F.get, e.set = F.set, e.write = F.write, e.toString = F.toString, e.toLocaleString = F.toString, e.toJSON = F.toJSON, e.equals = F.equals, e.compare = F.compare, e.copy = F.copy, e.slice = F.slice, e.readUInt8 = F.readUInt8, e.readUInt16LE = F.readUInt16LE, e.readUInt16BE = F.readUInt16BE, e.readUInt32LE = F.readUInt32LE, e.readUInt32BE = F.readUInt32BE, e.readInt8 = F.readInt8, e.readInt16LE = F.readInt16LE, e.readInt16BE = F.readInt16BE, e.readInt32LE = F.readInt32LE, e.readInt32BE = F.readInt32BE, e.readFloatLE = F.readFloatLE, e.readFloatBE = F.readFloatBE, e.readDoubleLE = F.readDoubleLE, e.readDoubleBE = F.readDoubleBE, e.writeUInt8 = F.writeUInt8, e.writeUInt16LE = F.writeUInt16LE, e.writeUInt16BE = F.writeUInt16BE, e.writeUInt32LE = F.writeUInt32LE, e.writeUInt32BE = F.writeUInt32BE, e.writeInt8 = F.writeInt8, e.writeInt16LE = F.writeInt16LE, e.writeInt16BE = F.writeInt16BE, e.writeInt32LE = F.writeInt32LE, e.writeInt32BE = F.writeInt32BE, e.writeFloatLE = F.writeFloatLE, e.writeFloatBE = F.writeFloatBE, e.writeDoubleLE = F.writeDoubleLE, e.writeDoubleBE = F.writeDoubleBE, e.fill = F.fill, e.inspect = F.inspect, e.toArrayBuffer = F.toArrayBuffer, e
      };
      var $ = /[^+\/0-9A-z]/g
    }, {"base64-js": 35, ieee754: 36, "is-array": 37}], 35: [function (e, t, n) {
      var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      !function (e) {
        "use strict";
        function t(e) {
          var t = e.charCodeAt(0);
          return t === o ? 62 : t === s ? 63 : u > t ? -1 : u + 10 > t ? t - u + 26 + 26 : c + 26 > t ? t - c : l + 26 > t ? t - l + 26 : void 0
        }

        function n(e) {
          function n(e) {
            l[p++] = e
          }

          var r, i, o, s, u, l;
          if (e.length % 4 > 0)throw new Error("Invalid string. Length must be a multiple of 4");
          var c = e.length;
          u = "=" === e.charAt(c - 2) ? 2 : "=" === e.charAt(c - 1) ? 1 : 0, l = new a(3 * e.length / 4 - u), o = u > 0 ? e.length - 4 : e.length;
          var p = 0;
          for (r = 0, i = 0; o > r; r += 4, i += 3)s = t(e.charAt(r)) << 18 | t(e.charAt(r + 1)) << 12 | t(e.charAt(r + 2)) << 6 | t(e.charAt(r + 3)), n((16711680 & s) >> 16), n((65280 & s) >> 8), n(255 & s);
          return 2 === u ? (s = t(e.charAt(r)) << 2 | t(e.charAt(r + 1)) >> 4, n(255 & s)) : 1 === u && (s = t(e.charAt(r)) << 10 | t(e.charAt(r + 1)) << 4 | t(e.charAt(r + 2)) >> 2, n(s >> 8 & 255), n(255 & s)), l
        }

        function i(e) {
          function t(e) {
            return r.charAt(e)
          }

          function n(e) {
            return t(e >> 18 & 63) + t(e >> 12 & 63) + t(e >> 6 & 63) + t(63 & e)
          }

          var i, a, o, s = e.length % 3, u = "";
          for (i = 0, o = e.length - s; o > i; i += 3)a = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2], u += n(a);
          switch (s) {
            case 1:
              a = e[e.length - 1], u += t(a >> 2), u += t(a << 4 & 63), u += "==";
              break;
            case 2:
              a = (e[e.length - 2] << 8) + e[e.length - 1], u += t(a >> 10), u += t(a >> 4 & 63), u += t(a << 2 & 63), u += "="
          }
          return u
        }

        var a = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "+".charCodeAt(0), s = "/".charCodeAt(0), u = "0".charCodeAt(0), l = "a".charCodeAt(0), c = "A".charCodeAt(0);
        e.toByteArray = n, e.fromByteArray = i
      }("undefined" == typeof n ? this.base64js = {} : n)
    }, {}], 36: [function (e, t, n) {
      n.read = function (e, t, n, r, i) {
        var a, o, s = 8 * i - r - 1, u = (1 << s) - 1, l = u >> 1, c = -7, p = n ? i - 1 : 0, d = n ? -1 : 1, f = e[t + p];
        for (p += d, a = f & (1 << -c) - 1, f >>= -c, c += s; c > 0; a = 256 * a + e[t + p], p += d, c -= 8);
        for (o = a & (1 << -c) - 1, a >>= -c, c += r; c > 0; o = 256 * o + e[t + p], p += d, c -= 8);
        if (0 === a)a = 1 - l; else {
          if (a === u)return o ? 0 / 0 : 1 / 0 * (f ? -1 : 1);
          o += Math.pow(2, r), a -= l
        }
        return (f ? -1 : 1) * o * Math.pow(2, a - r)
      }, n.write = function (e, t, n, r, i, a) {
        var o, s, u, l = 8 * a - i - 1, c = (1 << l) - 1, p = c >> 1, d = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = r ? 0 : a - 1, h = r ? 1 : -1, m = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || 1 / 0 === t ? (s = isNaN(t) ? 1 : 0, o = c) : (o = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -o)) < 1 && (o--, u *= 2), t += o + p >= 1 ? d / u : d * Math.pow(2, 1 - p), t * u >= 2 && (o++, u /= 2), o + p >= c ? (s = 0, o = c) : o + p >= 1 ? (s = (t * u - 1) * Math.pow(2, i), o += p) : (s = t * Math.pow(2, p - 1) * Math.pow(2, i), o = 0)); i >= 8; e[n + f] = 255 & s, f += h, s /= 256, i -= 8);
        for (o = o << i | s, l += i; l > 0; e[n + f] = 255 & o, f += h, o /= 256, l -= 8);
        e[n + f - h] |= 128 * m
      }
    }, {}], 37: [function (e, t) {
      var n = Array.isArray, r = Object.prototype.toString;
      t.exports = n || function (e) {
          return !!e && "[object Array]" == r.call(e)
        }
    }, {}], 38: [function (e, t) {
      function n() {
      }

      function r(e) {
        var t = {}.toString.call(e);
        switch (t) {
          case"[object File]":
          case"[object Blob]":
          case"[object FormData]":
            return !0;
          default:
            return !1
        }
      }

      function i() {
        if (g.XMLHttpRequest && ("file:" != g.location.protocol || !g.ActiveXObject))return new XMLHttpRequest;
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

      function a(e) {
        return e === Object(e)
      }

      function o(e) {
        if (!a(e))return e;
        var t = [];
        for (var n in e)null != e[n] && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
        return t.join("&")
      }

      function s(e) {
        for (var t, n, r = {}, i = e.split("&"), a = 0, o = i.length; o > a; ++a)n = i[a], t = n.split("="), r[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
        return r
      }

      function u(e) {
        var t, n, r, i, a = e.split(/\r?\n/), o = {};
        a.pop();
        for (var s = 0, u = a.length; u > s; ++s)n = a[s], t = n.indexOf(":"), r = n.slice(0, t).toLowerCase(), i = v(n.slice(t + 1)), o[r] = i;
        return o
      }

      function l(e) {
        return e.split(/ *; */).shift()
      }

      function c(e) {
        return m(e.split(/ *; */), function (e, t) {
          var n = t.split(/ *= */), r = n.shift(), i = n.shift();
          return r && i && (e[r] = i), e
        }, {})
      }

      function p(e, t) {
        t = t || {}, this.req = e, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method ? this.xhr.responseText : null, this.setStatusProperties(this.xhr.status), this.header = this.headers = u(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this.setHeaderProperties(this.header), this.body = "HEAD" != this.req.method ? this.parseBody(this.text) : null
      }

      function d(e, t) {
        var n = this;
        h.call(this), this._query = this._query || [], this.method = e, this.url = t, this.header = {}, this._header = {}, this.on("end", function () {
          var e = null, t = null;
          try {
            t = new p(n)
          } catch (r) {
            e = new Error("Parser is unable to parse the response"), e.parse = !0, e.original = r
          }
          n.callback(e, t)
        })
      }

      function f(e, t) {
        return "function" == typeof t ? new d("GET", e).end(t) : 1 == arguments.length ? new d("GET", e) : new d(e, t)
      }

      var h = e("emitter"), m = e("reduce"), g = "undefined" == typeof window ? this : window, v = "".trim ? function (e) {
        return e.trim()
      } : function (e) {
        return e.replace(/(^\s*|\s*$)/g, "")
      };
      f.serializeObject = o, f.parseString = s, f.types = {
        html: "text/html",
        json: "application/json",
        xml: "application/xml",
        urlencoded: "application/x-www-form-urlencoded",
        form: "application/x-www-form-urlencoded",
        "form-data": "application/x-www-form-urlencoded"
      }, f.serialize = {
        "application/x-www-form-urlencoded": o,
        "application/json": JSON.stringify
      }, f.parse = {
        "application/x-www-form-urlencoded": s,
        "application/json": JSON.parse
      }, p.prototype.get = function (e) {
        return this.header[e.toLowerCase()]
      }, p.prototype.setHeaderProperties = function () {
        var e = this.header["content-type"] || "";
        this.type = l(e);
        var t = c(e);
        for (var n in t)this[n] = t[n]
      }, p.prototype.parseBody = function (e) {
        var t = f.parse[this.type];
        return t && e && e.length ? t(e) : null
      }, p.prototype.setStatusProperties = function (e) {
        var t = e / 100 | 0;
        this.status = e, this.statusType = t, this.info = 1 == t, this.ok = 2 == t, this.clientError = 4 == t, this.serverError = 5 == t, this.error = 4 == t || 5 == t ? this.toError() : !1, this.accepted = 202 == e, this.noContent = 204 == e || 1223 == e, this.badRequest = 400 == e, this.unauthorized = 401 == e, this.notAcceptable = 406 == e, this.notFound = 404 == e, this.forbidden = 403 == e
      }, p.prototype.toError = function () {
        var e = this.req, t = e.method, n = e.url, r = "cannot " + t + " " + n + " (" + this.status + ")", i = new Error(r);
        return i.status = this.status, i.method = t, i.url = n, i
      }, f.Response = p, h(d.prototype), d.prototype.use = function (e) {
        return e(this), this
      }, d.prototype.timeout = function (e) {
        return this._timeout = e, this
      }, d.prototype.clearTimeout = function () {
        return this._timeout = 0, clearTimeout(this._timer), this
      }, d.prototype.abort = function () {
        return this.aborted ? void 0 : (this.aborted = !0, this.xhr.abort(), this.clearTimeout(), this.emit("abort"), this)
      }, d.prototype.set = function (e, t) {
        if (a(e)) {
          for (var n in e)this.set(n, e[n]);
          return this
        }
        return this._header[e.toLowerCase()] = t, this.header[e] = t, this
      }, d.prototype.unset = function (e) {
        return delete this._header[e.toLowerCase()], delete this.header[e], this
      }, d.prototype.getHeader = function (e) {
        return this._header[e.toLowerCase()]
      }, d.prototype.type = function (e) {
        return this.set("Content-Type", f.types[e] || e), this
      }, d.prototype.accept = function (e) {
        return this.set("Accept", f.types[e] || e), this
      }, d.prototype.auth = function (e, t) {
        var n = btoa(e + ":" + t);
        return this.set("Authorization", "Basic " + n), this
      }, d.prototype.query = function (e) {
        return "string" != typeof e && (e = o(e)), e && this._query.push(e), this
      }, d.prototype.field = function (e, t) {
        return this._formData || (this._formData = new FormData), this._formData.append(e, t), this
      }, d.prototype.attach = function (e, t, n) {
        return this._formData || (this._formData = new FormData), this._formData.append(e, t, n), this
      }, d.prototype.send = function (e) {
        var t = a(e), n = this.getHeader("Content-Type");
        if (t && a(this._data))for (var r in e)this._data[r] = e[r];
        else"string" == typeof e ? (n || this.type("form"), n = this.getHeader("Content-Type"), this._data = "application/x-www-form-urlencoded" == n ? this._data ? this._data + "&" + e : e : (this._data || "") + e) : this._data = e;
        return t ? (n || this.type("json"), this) : this
      }, d.prototype.callback = function (e, t) {
        var n = this._callback;
        return this.clearTimeout(), 2 == n.length ? n(e, t) : e ? this.emit("error", e) : void n(t)
      }, d.prototype.crossDomainError = function () {
        var e = new Error("Origin is not allowed by Access-Control-Allow-Origin");
        e.crossDomain = !0, this.callback(e)
      }, d.prototype.timeoutError = function () {
        var e = this._timeout, t = new Error("timeout of " + e + "ms exceeded");
        t.timeout = e, this.callback(t)
      }, d.prototype.withCredentials = function () {
        return this._withCredentials = !0, this
      }, d.prototype.end = function (e) {
        var t = this, a = this.xhr = i(), o = this._query.join("&"), s = this._timeout, u = this._formData || this._data;
        if (this._callback = e || n, a.onreadystatechange = function () {
            return 4 == a.readyState ? 0 == a.status ? t.aborted ? t.timeoutError() : t.crossDomainError() : void t.emit("end") : void 0
          }, a.upload && (a.upload.onprogress = function (e) {
            e.percent = e.loaded / e.total * 100, t.emit("progress", e)
          }), s && !this._timer && (this._timer = setTimeout(function () {
            t.abort()
          }, s)), o && (o = f.serializeObject(o), this.url += ~this.url.indexOf("?") ? "&" + o : "?" + o), a.open(this.method, this.url, !0), this._withCredentials && (a.withCredentials = !0), "GET" != this.method && "HEAD" != this.method && "string" != typeof u && !r(u)) {
          var l = f.serialize[this.getHeader("Content-Type")];
          l && (u = l(u))
        }
        for (var c in this.header)null != this.header[c] && a.setRequestHeader(c, this.header[c]);
        return this.emit("request", this), a.send(u), this
      }, f.Request = d, f.get = function (e, t, n) {
        var r = f("GET", e);
        return "function" == typeof t && (n = t, t = null), t && r.query(t), n && r.end(n), r
      }, f.head = function (e, t, n) {
        var r = f("HEAD", e);
        return "function" == typeof t && (n = t, t = null), t && r.send(t), n && r.end(n), r
      }, f.del = function (e, t) {
        var n = f("DELETE", e);
        return t && n.end(t), n
      }, f.patch = function (e, t, n) {
        var r = f("PATCH", e);
        return "function" == typeof t && (n = t, t = null), t && r.send(t), n && r.end(n), r
      }, f.post = function (e, t, n) {
        var r = f("POST", e);
        return "function" == typeof t && (n = t, t = null), t && r.send(t), n && r.end(n), r
      }, f.put = function (e, t, n) {
        var r = f("PUT", e);
        return "function" == typeof t && (n = t, t = null), t && r.send(t), n && r.end(n), r
      }, t.exports = f
    }, {emitter: 39, reduce: 40}], 39: [function (e, t) {
      function n(e) {
        return e ? r(e) : void 0
      }

      function r(e) {
        for (var t in n.prototype)e[t] = n.prototype[t];
        return e
      }

      t.exports = n, n.prototype.on = n.prototype.addEventListener = function (e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(t), this
      }, n.prototype.once = function (e, t) {
        function n() {
          r.off(e, n), t.apply(this, arguments)
        }

        var r = this;
        return this._callbacks = this._callbacks || {}, n.fn = t, this.on(e, n), this
      }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length)return this._callbacks = {}, this;
        var n = this._callbacks[e];
        if (!n)return this;
        if (1 == arguments.length)return delete this._callbacks[e], this;
        for (var r, i = 0; i < n.length; i++)if (r = n[i], r === t || r.fn === t) {
          n.splice(i, 1);
          break
        }
        return this
      }, n.prototype.emit = function (e) {
        this._callbacks = this._callbacks || {};
        var t = [].slice.call(arguments, 1), n = this._callbacks[e];
        if (n) {
          n = n.slice(0);
          for (var r = 0, i = n.length; i > r; ++r)n[r].apply(this, t)
        }
        return this
      }, n.prototype.listeners = function (e) {
        return this._callbacks = this._callbacks || {}, this._callbacks[e] || []
      }, n.prototype.hasListeners = function (e) {
        return !!this.listeners(e).length
      }
    }, {}], 40: [function (e, t) {
      t.exports = function (e, t, n) {
        for (var r = 0, i = e.length, a = 3 == arguments.length ? n : e[r++]; i > r;)a = t.call(null, a, e[r], ++r, e);
        return a
      }
    }, {}]
  }, {}, [3])(3)
}), define("pages/authorizationCreate", ["camunda-bpm-sdk-js", "angular"], function (e, t) {
  "use strict";
  return ["$scope", "$q", "$location", "Uri", "Notifications", "AuthorizationResource", function (n, r, i, a, o) {
    var s = new e.Client({apiUri: a.appUri("engine://"), engine: a.appUri(":engine")}).resource("authorization");
    n.addNewAuthorization = function () {
      n.authorizations.push({
        inUpdate: !0,
        type: 1,
        resourceType: Number(n.selectedResourceType),
        resourceId: "*",
        permissions: ["ALL"],
        identityId: "",
        identityType: "User"
      })
    }, n.updateAuthorization = function (e) {
      e.original = t.copy(e), e.inUpdate = !0, e.identityId = n.getIdentityId(e), e.identityType = e.userId ? "User" : "Group"
    }, n.setIdentityTypeFor = function (e, t) {
      t.identityType = e
    }, n.getIdentityTypeFor = function (e) {
      return e.identityType
    }, n.addAllPermissionsTo = function (e) {
      e.permissions = ["ALL"]
    }, n.availablePermissionsFor = function (e) {
      for (var t = [], r = n.getPermissionsForResource(), i = 0; i < r.length; i++)e.permissions.indexOf(r[i]) < 0 && t.push(r[i]);
      return t
    }, n.addPermissionTo = function (e, t) {
      (-1 != t.permissions.indexOf("ALL") || -1 != t.permissions.indexOf("NONE")) && (t.permissions = []), t.permissions.push(e)
    }, n.confirmUpdateAuthorization = function (e) {
      delete e.inUpdate, delete e.groupId, delete e.userId, e["Group" === e.identityType ? "groupId" : "userId"] = e.identityId;
      var t = {permissions: e.permissions, resourceType: e.resourceType, resourceId: e.resourceId, type: e.type};
      t["Group" === e.identityType ? "groupId" : "userId"] = e.identityId, e.id && (t.id = e.id), delete e.identityId, delete e.identityType, s.save(t, function (r, i) {
        r && (o.addError({
          status: "Could not " + (t.id ? "update" : "create") + " authorization",
          message: r.toString()
        }), n.cancelUpdateAuthorization(e), n.$apply()), i && (e.id = i.id)
      })
    }, n.cancelUpdateAuthorization = function (e) {
      e.id ? (delete e.userId, delete e.groupId, t.forEach(e.original, function (t, n) {
        e[n] = t
      }), delete e.original, delete e.inUpdate) : n.authorizations.splice(n.authorizations.indexOf(e), 1)
    }, n.isAuthorizationValid = function (e) {
      return !!e.identityId && !!e.resourceId
    }, n.isIdentityIdDisabledFor = function (e) {
      return "0" === e.type
    }, n.ensureValidUser = function (e) {
      "0" === e.type && (e.identityId = "*", e.identityType = "User")
    }
  }]
}), define("pages/authorizationDeleteConfirm", [], function () {
  "use strict";
  return ["$scope", "$q", "$location", "Uri", "Notifications", "AuthorizationResource", "$modalInstance", "authorizationToDelete", "formatPermissions", "getResource", "getType", function (e, t, n, r, i, a, o, s, u, l, c) {
    var p = "SUCCESS";
    e.authorizationToDelete = s, e.formatPermissions = u, e.getResource = l, e.getType = c, e.$on("$routeChangeStart", function () {
      o.close(e.status)
    }), e.close = function (e) {
      o.close(e)
    }, e.performDelete = function () {
      a["delete"]({action: s.id}).$promise.then(function () {
        e.status = p
      })
    }
  }]
}), define("text!pages/users.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/users.html -->\n<div class="container-fluid" ng-cloak>\n  <div class="row">\n    <div class="page-header">\n      <h1>\n        Users\n        <a ng-show="availableOperations.create"\n           href="#/user-create"\n           tooltip-placement="right"\n           tooltip="Create a new user">\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </a>\n      </h1>\n    </div>\n  </div>\n\n  <div cam-widget-loader\n       loading-state="{{ loadingState }}">\n    <table class="cam-table">\n      <thead>\n        <tr>\n          <th class="name">Name</th>\n          <th class="username">Username</th>\n          <th class="action">Action</th>\n        </tr>\n      </thead>\n\n      <tbody>\n        <tr ng-repeat="user in userList">\n          <td class="name">\n            <a ng-href="#/users/{{user.id | escape}}">{{user.firstName}} {{user.lastName}}</a>\n          </td>\n\n          <td class="username">\n            {{user.id}}\n          </td>\n\n          <td class="action">\n            <a ng-href="#/users/{{user.id | escape}}">Edit</a>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/users.html -->\n'
}), define("pages/users", ["angular", "text!./users.html"], function (e, t) {
  "use strict";
  var n = ["$scope", "UserResource", function (t, n) {
    t.availableOperations = {}, t.loadingState = "LOADING", n.query().$promise.then(function (e) {
      t.userList = e, t.loadingState = e.length ? "LOADED" : "EMPTY"
    }), n.OPTIONS().$promise.then(function (n) {
      e.forEach(n.links, function (e) {
        t.availableOperations[e.rel] = !0
      })
    })
  }];
  return ["$routeProvider", function (e) {
    e.when("/users", {template: t, controller: n, authentication: "required"})
  }]
}), define("text!pages/userCreate.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/userCreate.html -->\n<div class="container-fluid">\n  <section class="row">\n    <div class="page-header">\n      <h1>\n        <!-- <span class="glyphicon glyphicon-user"></span> -->\n        Create New User\n      </h1>\n    </div>\n\n    <form class="form-horizontal"\n          name="createUserForm">\n      <div class="col-xs-12">\n        <legend>User Account</legend>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4"\n                 for="inputUserId">User id*</label>\n\n          <div class="col-sm-8">\n            <input id="inputUserId"\n                   name="userId"\n                   class="form-control"\n                   type="text"\n                   ng-model="profile.id"\n                   novalidate\n                   required />\n\n            <span class="help-inline"\n                  ng-show="createUserForm.userId.$error.required">\n              User id is required.\n            </span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4"\n                 for="inputPassword">Password*:</label>\n\n          <div class="col-sm-8">\n            <input id="inputPassword"\n                name="inputPassword"\n                class="form-control"\n                type="password"\n                ng-model="credentials.password"\n                data-password required />\n\n            <span class="help-inline"\n                  ng-show="createUserForm.inputPassword.$error.password">\n              Password must have at least 8 characters.\n            </span>\n\n            <span class="help-inline"\n                  ng-show="createUserForm.inputPassword.$error.required">\n              Password is required.\n            </span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4"\n                 for="inputPasswordRepeat">Password (repeat)*:</label>\n\n          <div class="col-sm-8">\n            <input id="inputPasswordRepeat"\n                   name="inputPasswordRepeat"\n                   class="form-control"\n                   type="password"\n                   ng-model="credentials.password2"\n                   data-password-repeat="credentials.password" />\n\n            <span class="help-inline"\n                  ng-show="createUserForm.inputPasswordRepeat.$error.passwordRepeat">\n              Passwords must match.\n            </span>\n          </div>\n        </div>\n\n        <legend>User Profile</legend>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4"\n                 for="inputFirstname">Firstname*</label>\n\n          <div class="col-sm-8">\n            <input id="inputFirstname"\n                   name="firstname"\n                   class="form-control"\n                   type="text"\n                   ng-model="profile.firstName"\n                   novalidate\n                   required />\n\n            <span class="help-inline"\n                  ng-show="createUserForm.firstname.$error.required">\n              Firstname is required.\n            </span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4"\n                 for="inputLastname">Lastname*</label>\n\n          <div class="col-sm-8">\n            <input id="inputLastname"\n                   class="form-control"\n                   type="text"\n                   ng-model="profile.lastName"\n                   novalidate\n                   required />\n\n            <span class="help-inline"\n                  ng-show="createUserForm.firstname.$error.required">\n              Lastname is required.\n            </span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4"\n              for="inputEmail">Email</label>\n\n          <div class="col-sm-8">\n            <input id="inputEmail"\n                   name="email"\n                   class="form-control"\n                   type="text"\n                   ng-model="profile.email"\n                   data-email />\n\n            <span class="help-inline"\n                  ng-show="createUserForm.email.$error.email">\n              Not a valid email address.\n            </span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <div class="col-sm-8 col-sm-offset-4">\n            <a class="btn btn-default"\n               href="#/users">Cancel</a>\n\n            <button type="submit"\n                    class="btn btn-primary"\n                    ng-disabled="!createUserForm.$valid"\n                    ng-click="createUser()">Create new User</button>\n          </div>\n        </div>\n\n      </div>\n    </form>\n  </section>\n</div>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/userCreate.html -->\n'
}), define("pages/userCreate", ["text!./userCreate.html"], function (e) {
  "use strict";
  var t = ["$scope", "UserResource", "Notifications", "$location", function (e, t, n, r) {
    e.profile = {id: "", firstName: "", lastName: "", email: ""}, e.credentials = {
      password: "",
      password2: ""
    }, e.createUser = function () {
      var i = {profile: e.profile, credentials: {password: e.credentials.password}};
      t.createUser(i).$promise.then(function () {
        n.addMessage({
          type: "success",
          status: "Success",
          message: "Created new user " + i.profile.id
        }), r.path("/users")
      }, function () {
        n.addError({status: "Failed", message: "Failed to create user. Check if it already exists."})
      })
    }
  }];
  return ["$routeProvider", function (n) {
    n.when("/user-create", {template: e, controller: t, authentication: "required"})
  }]
}), define("text!pages/userEdit.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/userEdit.html -->\n<div class="container-fluid">\n  <section class="row">\n    <div class="page-header">\n      <h1>\n        <!-- <span class="glyphicon glyphicon-user"></span> -->\n        {{user.firstName}} {{user.lastName}}\n      </h1>\n    </div>\n\n    <div class="col-md-3">\n      <div class="well sidebar-nav">\n        <ul class="nav nav-list">\n          <li ng-class="activeClass(\'profile\')">\n            <a href="#/users/{{user.id | escape}}?tab=profile">Profile</a>\n          </li>\n\n          <li ng-class="activeClass(\'account\')"\n              ng-show="availableOperations.update">\n            <a href="#/users/{{user.id | escape}}?tab=account">Account</a>\n          </li>\n\n          <li ng-class="activeClass(\'groups\')">\n            <a href="#/users/{{user.id | escape}}?tab=groups">Groups</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <div class="col-md-9">\n      <div ng-show="show(\'profile\')">\n        <div class="box">\n          <p ng-if="!profile">\n            <span class="glyphicon glyphicon-loading"></span>\n            loading profile...\n          </p>\n\n          <form class="form-horizontal"\n                name="editProfileForm"\n                ng-if="profile">\n\n            <legend>Profile</legend>\n\n            <div>\n\n              <div class="form-group">\n                <label class="control-label col-sm-4"\n                       for="inputFirstname">Firstname*</label>\n\n                <div class="col-sm-8">\n                  <input id="inputFirstname"\n                         name="firstname"\n                         class="form-control"\n                         type="text"\n                         ng-model="profile.firstName"\n                         ng-disabled="!availableOperations.update"\n                         novalidate\n                         required/>\n\n                  <p class="help-block"\n                     ng-show="editProfileForm.firstname.$error.required">\n                    Firstname is required.\n                  </p>\n                </div>\n              </div>\n\n              <div class="form-group">\n                <label class="control-label col-sm-4"\n                       for="inputLastname">Lastname*</label>\n\n                <div class="col-sm-8">\n                  <input id="inputLastname"\n                         type="text"\n                         class="form-control"\n                         ng-model="profile.lastName"\n                         ng-disabled="!availableOperations.update"\n                         novalidate\n                         required />\n\n                  <p class="help-block"\n                     ng-show="editProfileForm.firstname.$error.required">\n                    Lastname is required.\n                  </p>\n                </div>\n              </div>\n\n              <div class="form-group">\n                <label class="control-label col-sm-4"\n                       for="inputEmail">Email</label>\n\n                <div class="col-sm-8">\n                  <input id="inputEmail"\n                         name="email"\n                         class="form-control"\n                         type="text"\n                         ng-model="profile.email"\n                         ng-disabled="!availableOperations.update"\n                         data-email />\n\n                  <p class="help-block"\n                     ng-show="editProfileForm.email.$error.email">\n                    Not a valid email address.\n                  </p>\n                </div>\n              </div>\n\n              <div class="form-group"\n                   ng-show="availableOperations.update">\n                <div class="col-sm-8 col-sm-offset-4">\n                  <button type="submit"\n                          class="btn btn-default"\n                          ng-disabled="!canSubmit(editProfileForm, \'profile\')"\n                          ng-click="updateProfile()">\n                    Update Profile\n                  </button>\n                </div>\n              </div>\n\n            </div>\n\n          </form>\n        </div>\n      </div>\n\n      <div ng-show="show(\'account\')">\n        <div class="box"\n             ng-show="availableOperations.update">\n          <form class="form-horizontal"\n                name="updateCredentialsForm">\n\n            <legend>Change Password</legend>\n\n            <p>Type a new password to change the existing account password.</p>\n\n            <div class="form-group">\n              <label class="control-label col-sm-4"\n                     for="inputAuthenticationUserPassword"\n                     ng-if="userId === authenticatedUser">\n                Old Password*:\n              </label>\n\n              <label class="control-label col-sm-4"\n                     for="inputAuthenticationUserPassword"\n                     ng-if="userId !== authenticatedUser">\n                My Password*:\n              </label>\n\n              <div class="col-sm-8">\n                <input id="inputAuthenticationUserPassword"\n                       name="inputAuthenticationUserPassword"\n                       class="form-control"\n                       type="password"\n                       ng-model="credentials.authenticatedUserPassword"\n                       required />\n              </div>\n            </div>\n\n            <div class="form-group">\n              <label class="control-label col-sm-4"\n                     for="inputPassword">New Password*:</label>\n\n              <div class="col-sm-8">\n                <input id="inputPassword"\n                       name="inputPassword"\n                       class="form-control"\n                       type="password"\n                       ng-model="credentials.password"\n                       data-password\n                       required />\n\n                <p class="text-danger"\n                   ng-show="updateCredentialsForm.inputPassword.$error.password">\n                  Password must have at least 8 characters.\n                </p>\n              </div>\n            </div>\n\n            <div class="form-group">\n              <label class="control-label col-sm-4"\n                  for="inputPasswordRepeat">New Password (repeat)*:</label>\n\n              <div class="col-sm-8">\n                <input id="inputPasswordRepeat"\n                       name="inputPasswordRepeat"\n                       class="form-control"\n                       type="password"\n                       ng-model="credentials.password2"\n                       data-password-repeat="credentials.password" />\n\n                <p class="text-danger"\n                   ng-show="updateCredentialsForm.inputPasswordRepeat.$error.passwordRepeat">\n                  Passwords must match.\n                </p>\n              </div>\n            </div>\n\n            <div class="form-group">\n              <div class="col-sm-8 col-sm-offset-4">\n                <button type="submit"\n                        class="btn btn-default"\n                        ng-disabled="!canSubmit(updateCredentialsForm)"\n                        ng-click="updateCredentials()">Change Password</button>\n              </div>\n            </div>\n\n          </form>\n        </div>\n\n        <div class="box"\n             ng-show="availableOperations.delete">\n          <form class="form-horizontal">\n\n            <legend>Delete User</legend>\n\n            <div class="alert alert-danger">\n              <strong>Warning:</strong> deleting a user account cannot be undone.\n            </div>\n\n            <button type="submit"\n                    class="btn btn-danger"\n                    ng-click="deleteUser()">\n              Delete User\n            </button>\n          </form>\n        </div>\n      </div>\n\n      <div ng-show="show(\'groups\')">\n        <div class="box">\n\n          <form class="form-horizontal"\n                name="updateGroupMemberships">\n\n            <legend>{{user.firstName}} {{user.lastName}}&#39;s Groups</legend>\n\n            <div show-if-authorized\n                 auth-permission="CREATE"\n                 auth-resource-name="group membership">\n              <a class="btn btn-default pull-right"\n                 ng-click="openCreateGroupMembershipDialog()">\n                <span class="glyphicon glyphicon-plus"></span>\n                Add\n              </a>\n            </div>\n\n            <table class="cam-table"\n                   ng-hide="groupList.length == 0">\n              <thead>\n                <tr>\n                  <th class="group-id">Group Id</th>\n                  <th class="group-name">Group Name</th>\n                  <th class="group-type">Group Type</th>\n                  <th class="action"\n                      ng-show="availableOperations.removeGroup">\n                    Action\n                  </th>\n                </tr>\n              </thead>\n\n              <tbody>\n                <tr ng-repeat="group in groupList">\n                  <td class="group-id">\n                    <a href="#/groups/{{group.id | escape}}?tab=group">{{group.id}}</a>\n                  </td>\n\n                  <td class="group-name">\n                    {{group.name}}\n                  </td>\n\n                  <td class="group-type">\n                    {{group.type}}\n                  </td>\n\n                  <td class="action"\n                      ng-show="availableOperations.removeGroup">\n                    <a ng-click="removeGroup(group.id)">Remove</a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n\n            <p ng-show="groupList.length == 0">\n              User {{user.firstName}} {{user.lastName}} is currently not member of any groups\n            </p>\n\n          </form>\n        </div>\n      </div>\n    </div>\n  </section>\n</div>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/userEdit.html -->\n'
}), define("text!pages/create-group-membership.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/create-group-membership.html -->\n<div class="modal-header">\n  <h3>Select Groups</h3>\n</div>\n\n<div class="create-group-membership modal-body">\n  <div notifications-panel></div>\n\n  <table class="cam-table"\n         ng-hide="status !== \'beforeCreate\' || availableGroups.length == 0">\n    <thead>\n      <tr>\n        <th class="select"></th>\n        <th class="group-id">Group Id</th>\n        <th class="group-name">Group Name</th>\n        <th class="group-type">Group Type</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr ng-repeat="group in availableGroups">\n        <td class="row-select">\n          <input type="checkbox"\n                 ng-model="group.checked" />\n        </td>\n\n        <td class="group-id">\n          <a href="#/groups/{{group.id | escape}}">{{group.id}}</a>\n        </td>\n\n        <td class="group-name">\n          {{group.name}}\n        </td>\n\n        <td class="group-type">\n          {{group.type}}\n        </td>\n      </tr>\n    </tbody>\n  </table>\n\n  <p ng-show="availableGroups.length == 0">\n    There are no additional groups available to which the user can be added.\n    You can create a new group <a href="#/group-create" ng-click="close">here</a>.\n  </p>\n\n  <p ng-show="status === \'SUCCESS\'">\n    User was successfully added to selected groups.\n  </p>\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="close()"\n          ng-disabled="status === \'performCreate\'"\n          ng-hide="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\'">\n    Close\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close(status)"\n          ng-show="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\'">\n    OK\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="createGroupMemberships()"\n          ng-disabled="status !== \'beforeCreate\'"\n          ng-hide="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\' || availableGroups.length == 0">\n    Add Groups\n  </button>\n</div>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/create-group-membership.html -->\n'
}), define("pages/userEdit", ["angular", "text!./userEdit.html", "text!./create-group-membership.html"], function (e, t, n) {
  "use strict";
  return ["$routeProvider", function (r) {
    r.when("/users/:userId", {
      template: t,
      controller: ["$scope", "$window", "$routeParams", "UserResource", "GroupResource", "GroupMembershipResource", "Notifications", "$location", "$modal", "AuthorizationResource", "authentication", function (t, r, i, a, o, s, u, l, c, p, d) {
        function f() {
          p.check({
            permissionName: "DELETE",
            resourceName: "group membership",
            resourceType: 3
          }).$promise.then(function (e) {
            t.availableOperations.removeGroup = e.authorized
          })
        }

        t.encodedUserId = i.userId.replace(/\//g, "%2F").replace(/\\/g, "%5C"), t.decodedUserId = i.userId.replace(/%2F/g, "/").replace(/%5C/g, "\\"), t.authenticatedUser = d, t.profile = null, t.profile = null, t.profileCopy = null, t.credentials = {
          authenticatedUserPassword: "",
          password: "",
          password2: ""
        }, t.groupList = null, t.groupIdList = null, t.availableOperations = {}, t.canSubmit = function (n, r) {
          return n.$valid && !n.$pristine && (null == r || !e.equals(t[r], t[r + "Copy"]))
        }, a.OPTIONS({userId: t.encodedUserId}).$promise.then(function (n) {
          e.forEach(n.links, function (e) {
            t.availableOperations[e.rel] = !0
          })
        });
        var h = t.loadProfile = function () {
          a.profile({userId: t.encodedUserId}).$promise.then(function (n) {
            t.user = n, t.profile = e.copy(n), t.profileCopy = e.copy(n)
          })
        };
        t.updateProfile = function () {
          a.updateProfile({userId: t.encodedUserId}, t.profile).$promise.then(function () {
            u.addMessage({type: "success", status: "Success", message: "User profile successfully updated."}), h()
          }, function () {
            u.addError({status: "Failed", message: "Failed to update user profile"})
          })
        };
        var m = function () {
          t.credentials.authenticatedUserPassword = "", t.credentials.password = "", t.credentials.password2 = "", t.updateCredentialsForm.$setPristine()
        };
        t.updateCredentials = function () {
          var e = {userId: t.encodedUserId}, n = {
            authenticatedUserPassword: t.credentials.authenticatedUserPassword,
            password: t.credentials.password
          };
          a.updateCredentials(e, n).$promise.then(function () {
            u.addMessage({
              type: "success",
              status: "Password",
              message: "Changed the password.",
              duration: 5e3,
              exclusive: !0
            }), m()
          }, function (e) {
            u.addError(400 === e.status ? t.decodedUserId === t.authenticatedUser ? {
              status: "Password",
              message: "Old password is not valid.",
              exclusive: !0
            } : {status: "Password", message: "Your password is not valid.", exclusive: !0} : {
              status: "Password",
              message: "Could not change the password."
            })
          })
        }, t.deleteUser = function () {
          function e() {
            return r.confirm("Really delete user " + t.user.id + "?")
          }

          e() && a["delete"]({userId: t.encodedUserId}).$promise.then(function () {
            u.addMessage({
              type: "success",
              status: "Success",
              message: "User " + t.user.id + " successfully deleted."
            }), l.path("/users")
          })
        };
        var g = t.loadGroups = function () {
          o.query({member: t.decodedUserId}).$promise.then(function (n) {
            t.groupList = n, t.groupIdList = [], e.forEach(t.groupList, function (e) {
              t.groupIdList.push(e.id)
            })
          })
        };
        t.removeGroup = function (e) {
          var n = e.replace(/\//g, "%2F").replace(/\\/g, "%5C");
          s["delete"]({userId: t.encodedUserId, groupId: n}).$promise.then(function () {
            u.addMessage({
              type: "success",
              status: "Success",
              message: "User " + t.user.id + " removed from group."
            }), g()
          })
        }, t.openCreateGroupMembershipDialog = function () {
          var e = c.open({
            controller: "GroupMembershipDialogController", template: n, resolve: {
              user: function () {
                return t.user
              }, userId: function () {
                return t.encodedUserId
              }, groupIdList: function () {
                return t.groupIdList
              }
            }
          });
          e.result.then(function (e) {
            "SUCCESS" == e && t.loadGroups()
          })
        }, t.show = function (e) {
          return e == l.search().tab
        }, t.activeClass = function (e) {
          var t = l.absUrl();
          return -1 != t.indexOf(e) ? "active" : ""
        }, h(), g(), f(), l.search().tab || (l.search({tab: "profile"}), l.replace())
      }],
      authentication: "required",
      reloadOnSearch: !1
    })
  }]
}), define("text!pages/groups.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/groups.html -->\n<div class="container-fluid" ng-cloak>\n  <div class="row">\n    <div class="page-header">\n      <h1>\n        Groups\n        <a ng-show="availableOperations.create"\n           href="#/group-create"\n           tooltip-placement="right"\n           tooltip="Create a new group">\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </a>\n      </h1>\n    </div>\n  </div>\n\n  <div cam-widget-loader\n       loading-state="{{ loadingState }}">\n    <table class="cam-table">\n      <thead>\n        <tr>\n          <th class="group-id">Group Id</th>\n          <th class="group-name">Group Name</th>\n          <th class="group-type">Group Type</th>\n          <th class="action">Action</th>\n        </tr>\n      </thead>\n\n      <tbody>\n        <tr ng-repeat="group in groupList">\n          <td class="group-id">\n            <a href="#/groups/{{group.id | escape}}">{{group.id}}</a>\n          </td>\n\n          <td class="group-name">\n            {{group.name}}\n          </td>\n\n          <td class="group-type">\n            {{group.type}}\n          </td>\n\n          <td class="action">\n            <a href="#/groups/{{group.id | escape}}">Edit</a>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/groups.html -->\n'
}), define("pages/groups", ["angular", "text!./groups.html"], function (e, t) {
  "use strict";
  var n = ["$scope", "GroupResource", function (t, n) {
    t.availableOperations = {}, t.loadingState = "LOADING", n.query().$promise.then(function (e) {
      t.groupList = e, t.loadingState = e.length ? "LOADED" : "EMPTY"
    }), n.OPTIONS().$promise.then(function (n) {
      e.forEach(n.links, function (e) {
        t.availableOperations[e.rel] = !0
      })
    })
  }];
  return ["$routeProvider", function (e) {
    e.when("/groups", {template: t, controller: n, authentication: "required"})
  }]
}), define("text!pages/groupCreate.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/groupCreate.html -->\n<div class="container-fluid">\n  <section class="row">\n    <div class="page-header">\n      <h1>Create New Group</h1>\n    </div>\n\n    <form class="form-horizontal"\n          name="createGroupForm">\n      <div class="col-xs-12">\n        <div class="form-group">\n          <label class="control-label col-sm-4"\n                 for="inputGroupId">Group Id*</label>\n\n          <div class="col-sm-8">\n            <input id="inputGroupId"\n                   name="groupId"\n                   class="form-control"\n                   type="text"\n                   ng-model="group.id"\n                   novalidate required />\n            <span class="help-inline"\n                ng-show="createGroupForm.groupId.$error.required">Group Id is required.</span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4"\n                 for="inputName">Group Name*</label>\n\n          <div class="col-sm-8">\n            <input id="inputName"\n                   name="groupName"\n                   type="text"\n                   class="form-control"\n                   ng-model="group.name"\n                   novalidate required />\n            <span class="help-inline"\n                  ng-show="createGroupForm.groupName.$error.required">Name is required.</span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4"\n                 for="inputType">Group Type</label>\n          <div class="col-sm-8">\n            <input id="inputType"\n                   name="groupType"\n                   class="form-control"\n                   type="text"\n                   ng-model="group.type" />\n          </div>\n        </div>\n\n        <div class="form-group">\n          <div class="col-sm-8 col-sm-offset-4">\n            <a class="btn btn-default"\n               href="#/groups">\n              Cancel\n            </a>\n\n            <button type="submit"\n                    class="btn btn-primary"\n                    ng-disabled="!createGroupForm.$valid"\n                    ng-click="createGroup()">\n              Create new Group\n            </button>\n          </div>\n        </div>\n\n      </div>\n    </form>\n  </section>\n</div>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/groupCreate.html -->\n'
}), define("pages/groupCreate", ["text!./groupCreate.html"], function (e) {
  "use strict";
  var t = ["$scope", "GroupResource", "Notifications", "$location", function (e, t, n, r) {
    e.group = {id: "", name: "", type: ""}, e.createGroup = function () {
      var i = e.group;
      t.createGroup(i).$promise.then(function () {
        n.addMessage({
          type: "success",
          status: "Success",
          message: "Successfully created new group " + i.id
        }), r.path("/groups")
      }, function () {
        n.addError({status: "Failed", message: "Could not create group " + i.id + ". Check if it already exists."})
      })
    }
  }];
  return ["$routeProvider", function (n) {
    n.when("/group-create", {template: e, controller: t, authentication: "required"})
  }]
}), define("text!pages/groupEdit.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/groupEdit.html -->\n<div class="container-fluid">\n  <section class="row">\n    <div class="page-header">\n      <h1>{{groupName}}</h1>\n    </div>\n\n    <div class="col-md-3">\n      <div class="well sidebar-nav">\n        <ul class="nav nav-list">\n          <li ng-class="activeClass(\'tab=group\')">\n            <a href="#/groups/{{group.id | escape}}?tab=group">Group</a>\n          </li>\n          <li ng-class="activeClass(\'tab=users\')">\n            <a href="#/groups/{{group.id | escape}}?tab=users">Users</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <div class="col-md-9">\n      <form ng-show="show(\'group\')"\n            class="form-horizontal"\n            name="editGroupForm"\n            cam-widget-loader\n            loading-state="{{ groupLoadingState }}">\n        <legend>Group</legend>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4"\n                 for="inputName">Group Name*</label>\n\n          <div class="col-sm-8">\n            <input id="inputName"\n                   name="groupName"\n                   class="form-control"\n                   type="text"\n                   ng-model="group.name"\n                   novalidate\n                   required\n                   ng-disabled="!availableOperations.update" />\n\n            <p class="text-danger"\n               ng-show="createGroupForm.groupName.$error.required">\n              Name is required.\n            </p>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4"\n                 for="inputType">Group Type</label>\n\n          <div class="col-sm-8">\n            <input id="inputType"\n                   name="groupType"\n                   class="form-control"\n                   type="text"\n                   ng-model="group.type"\n                   ng-disabled="!availableOperations.update" />\n          </div>\n        </div>\n\n        <div class="form-group"\n             ng-show="availableOperations.update">\n          <div class="col-sm-8 col-sm-offset-4">\n            <button type="submit"\n                    class="btn btn-default"\n                    ng-disabled="!canSubmit(editGroupForm, \'group\')"\n                    ng-click="updateGroup()">Update Group</button>\n          </div>\n        </div>\n      </form>\n\n      <form class="form-horizontal"\n            ng-show="show(\'group\') && availableOperations.delete">\n        <legend>Delete Group</legend>\n\n        <div class="alert alert-danger">\n          <strong>Warning:</strong> deleting a group cannot be undone.\n        </div>\n\n        <button type="submit"\n                class="btn btn-danger"\n                ng-click="deleteGroup()">\n          Delete Group\n        </button>\n      </form>\n\n      <div ng-show="show(\'users\')">\n        <legend>Users {{ groupUserList.length ? (\'(\'+ groupUserList.length +\')\') : \'\' }}</legend>\n\n        <div cam-widget-loader\n             loading-state="{{ userLoadingState }}"\n             text-empty="Group {{group.name}} does not currently have any users.">\n          <table class="cam-table">\n            <thead>\n              <tr>\n                <th>Name</th>\n                <th>Username</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr ng-repeat="user in groupUserList">\n                <td>{{user.firstName}} {{user.lastName}}</td>\n                <td>{{user.id}}</td>\n              </tr>\n            </tbody>\n          </table>\n        </div><!-- /cam-widget-loader -->\n\n      </div>\n    </div>\n  </section>\n</div>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/groupEdit.html -->\n'
}), define("pages/groupEdit", ["angular", "text!./groupEdit.html"], function (e, t) {
  "use strict";
  var n = ["$scope", "$routeParams", "GroupResource", "UserResource", "AuthorizationResource", "Notifications", "$location", "$window", function (t, n, r, i, a, o, s, u) {
    t.group = null, t.groupName = null, t.encodedGroupId = n.groupId.replace(/\//g, "%2F").replace(/\\/g, "%5C"), t.availableOperations = {}, t.groupUserList = null, t.canSubmit = function (n, r) {
      return !(!n.$valid || n.$pristine || r && e.equals(t[r], t[r + "Copy"]))
    };
    var l = t.loadGroup = function () {
      t.groupLoadingState = "LOADING", r.get({groupId: t.encodedGroupId}).$promise.then(function (n) {
        t.groupLoadingState = "LOADED", t.group = n, t.groupName = n.name ? n.name : n.id, t.groupCopy = e.copy(n)
      }, function () {
        t.groupLoadingState = "ERROR"
      })
    }, c = t.loadGroupUsers = function () {
      t.userLoadingState = "LOADING", i.query({memberOfGroup: t.encodedGroupId}).$promise.then(function (e) {
        t.groupUserList = e, t.userLoadingState = e.length ? "LOADED" : "EMPTY"
      }, function () {
        t.userLoadingState = "ERROR"
      })
    };
    r.OPTIONS({groupId: t.encodedGroupId}).$promise.then(function (n) {
      e.forEach(n.links, function (e) {
        t.availableOperations[e.rel] = !0
      })
    }), t.updateGroup = function () {
      r.update({groupId: t.encodedGroupId}, t.group).$promise.then(function () {
        o.addMessage({type: "success", status: "Success", message: "Group successfully updated."}), l()
      }, function () {
        o.addError({status: "Failed", message: "Failed to update group"})
      })
    }, t.deleteGroup = function () {
      function e() {
        return u.confirm("Really delete group " + t.group.id + "?")
      }

      e() && r["delete"]({groupId: t.encodedGroupId}).$promise.then(function () {
        o.addMessage({
          type: "success",
          status: "Success",
          message: "Group " + t.group.id + " successfully deleted."
        }), s.path("/groups")
      })
    }, t.show = function (e) {
      return e == s.search().tab
    }, t.activeClass = function (e) {
      var t = s.absUrl();
      return -1 != t.indexOf(e) ? "active" : ""
    }, l(), c(), s.search().tab || (s.search({tab: "group"}), s.replace())
  }];
  return ["$routeProvider", function (e) {
    e.when("/groups/:groupId", {template: t, controller: n, authentication: "required", reloadOnSearch: !1})
  }]
}), define("pages/groupMembershipsCreate", ["angular"], function (e) {
  "use strict";
  return ["$scope", "$q", "$location", "Uri", "Notifications", "GroupMembershipResource", "GroupResource", "$modalInstance", "user", "userId", "groupIdList", function (t, n, r, i, a, o, s, u, l, c, p) {
    function d() {
      var e = n.defer();
      return s.query().$promise.then(function (t) {
        e.resolve(t)
      }, function (t) {
        e.reject(t.data)
      }), e.promise
    }

    var f = "beforeCreate", h = "performCancel", m = "SUCCESS", g = "FAILED", v = "loadingFailed";
    t.user = l, t.groupIdList = p, t.userId = c, t.$on("$routeChangeStart", function () {
      u.close(t.status)
    }), n.all([d()]).then(function (n) {
      var r = n[0];
      t.availableGroups = [], e.forEach(r, function (e) {
        -1 == t.groupIdList.indexOf(e.id) && t.availableGroups.push(e)
      }), t.status = f
    }, function (e) {
      t.status = v, a.addError({
        status: "Failed",
        message: "Loading of groups failed: " + e.message,
        exclusive: ["type"]
      })
    }), t.createGroupMemberships = function () {
      t.status = h;
      var r = [];
      e.forEach(t.availableGroups, function (e) {
        e.checked && r.push(e.id)
      });
      var i = 0, s = n.defer();
      e.forEach(r, function (e) {
        var n = e.replace(/\//g, "%2F").replace(/\\/g, "%5C");
        o.create({groupId: n, userId: t.userId}).$promise.then(function () {
          i++, i == r.length && s.resolve()
        }, function () {
          i++, i == r.length && s.reject()
        })
      }), s.promise.then(function () {
        t.status = m
      }, function (e) {
        t.status = g, a.addError({
          status: "Failed",
          message: "Creating group memberships failed: " + e.message,
          exclusive: ["type"]
        })
      })
    }, t.close = function (e) {
      u.close(e)
    }
  }]
}), define("text!pages/setup.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/setup.html -->\n<div class="container-fluid">\n  <section id="users"\n           ng-switch on="created">\n    <div class="row">\n      <div class="page-header">\n        <h1>\n          <!-- <span class="glyphicon glyphicon-user"></span> -->\n          Setup\n        </h1>\n      </div>\n    </div>\n\n    <div class="row"\n         ng-switch-when="true">\n      <div class="col-md-12">\n\n        <div class="alert alert-success">\n          <strong>User created</strong>\n          You have created an initial user.\n        </div>\n\n        Head over to the <a href="./#/login">signin page</a> to login using the newly created credentials.\n      </div>\n    </div>\n\n    <div class="row"\n         ng-switch-when="false">\n      <div class="col-md-8 box">\n\n        <div notifications-panel\n             class="notifications-panel"></div>\n\n        <form class="form-horizontal"\n              name="createUserForm">\n          <legend>User Account</legend>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                   for="inputUserId">User id*</label>\n\n            <div class="col-sm-8">\n              <input id="inputUserId"\n                     name="userId"\n                     class="form-control"\n                     type="text"\n                     ng-model="profile.id"\n                     novalidate required></input>\n\n              <span class="help-inline"\n                    ng-show="createUserForm.userId.$error.required">\n                User id is required.\n              </span>\n            </div>\n          </div>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                   for="inputPassword">Password*:</label>\n\n            <div class="col-sm-8">\n              <input id="inputPassword"\n                     name="inputPassword"\n                     class="form-control"\n                     type="password"\n                     ng-model="credentials.password"\n                     data-password\n                     required></input>\n\n              <span class="help-inline"\n                    ng-show="createUserForm.inputPassword.$error.password">\n                Password must have at least 8 characters.\n              </span>\n              <span class="help-inline"\n                    ng-show="createUserForm.inputPassword.$error.required">\n                Password is required.\n              </span>\n            </div>\n          </div>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                   for="inputPasswordRepeat">Password (repeat)*:</label>\n\n            <div class="col-sm-8">\n              <input id="inputPasswordRepeat"\n                  name="inputPasswordRepeat"\n                  class="form-control"\n                  type="password"\n                  ng-model="credentials.password2"\n                  data-password-repeat="credentials.password"></input>\n\n              <span class="help-inline"\n                    ng-show="createUserForm.inputPasswordRepeat.$error.passwordRepeat">\n                Passwords must match.\n              </span>\n            </div>\n          </div>\n\n          <legend>User Profile</legend>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                for="inputFirstname">Firstname*</label>\n\n            <div class="col-sm-8">\n              <input id="inputFirstname"\n                     name="firstname"\n                     type="text"\n                     class="form-control"\n                     ng-model="profile.firstName"\n                     novalidate\n                     required></input>\n\n              <span class="help-inline"="text-danger"\n                    ng-show="createUserForm.firstname.$error.required">\n                Firstname is required.\n              </span>\n            </div>\n          </div>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                for="inputLastname">Lastname*</label>\n\n            <div class="col-sm-8">\n              <input id="inputLastname"\n                  type="text"\n                  class="form-control"\n                  ng-model="profile.lastName"\n                  novalidate\n                  required></input>\n\n              <span class="help-inline"\n                    ng-show="createUserForm.firstname.$error.required">\n                Lastname is required.\n              </span>\n            </div>\n          </div>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                for="inputEmail">Email</label>\n\n            <div class="col-sm-8">\n              <input id="inputEmail"\n                  name="email"\n                  type="text"\n                  class="form-control"\n                  ng-model="profile.email"\n                  data-email></input>\n\n              <span class="help-inline"\n                    ng-show="createUserForm.email.$error.email">\n                Not a valid email address.\n              </span>\n            </div>\n          </div>\n\n          <div class="form-group">\n            <div class="col-sm-8 col-sm-offset-4">\n              <button type="submit"\n                      class="btn btn-primary"\n                      ng-disabled="!createUserForm.$valid"\n                      ng-click="createUser()">Create new User</button>\n            </div>\n          </div>\n\n        </form>\n      </div>\n\n      <div class="col-md-4 well">\n        <legend>Why is this page shown?</legend>\n        <p>You are trying to access the process engine &quot;<strong>{{ engineName }}</strong>&quot;.\n        This process engine is configured to use the built-in identity service (database) but has no administrative users configured.\n        This page allows you to create a user for accessing the process engine.</p>\n        <p>\n          <a href="http://docs.camunda.org/guides/installation-guide/"\n             class="btn btn-success">\n            » Setup LDAP instead\n          </a>\n        </p>\n      </div>\n    </div>\n  </section>\n</div>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/setup.html -->\n'
}), define("pages/setup", ["text!./setup.html"], function (e) {
  "use strict";
  var t = ["$scope", "InitialUserResource", "Notifications", "$location", "Uri", function (e, t, n, r, i) {
    return /.*\/app\/admin\/(\w+)\/setup\/.*/.test(r.absUrl()) ? (e.engineName = i.appUri(":engine"), e.profile = {
      id: "",
      firstName: "",
      lastName: "",
      email: ""
    }, e.created = !1, e.credentials = {password: "", password2: ""}, void(e.createUser = function () {
      var r = {profile: e.profile, credentials: {password: e.credentials.password}};
      t.create(r).$promise.then(function () {
        e.created = !0
      }, function () {
        n.addError({status: "Error", message: "Could not create initial user."})
      })
    })) : void r.path("/")
  }];
  return ["$routeProvider", function (n) {
    n.when("/setup", {template: e, controller: t})
  }]
}), define("text!pages/system.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/system.html -->\n<div class="container-fluid"\n     ng-cloak>\n  <section class="row">\n    <div class="page-header">\n      <h1>System Settings</h1>\n    </div>\n\n    <div class="col-md-3">\n      <div class="well sidebar-nav">\n        <ul class="nav nav-list">\n          <li class="nav-header">Categories</li>\n\n          <li ng-class="activeClass(\'section=\'+systemSettingsProvider.id)"\n              ng-repeat="systemSettingsProvider in systemSettingsProviders">\n            <a href="#/system/?section={{systemSettingsProvider.id}}">\n              {{systemSettingsProvider.label}}\n            </a>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <div class="col-md-9">\n      <view provider="activeSettingsProvier" />\n    </div>\n  </section>\n</div>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/system.html -->\n'
}), define("pages/system", ["text!./system.html"], function (e) {
  "use strict";
  var t = ["$scope", "$location", "$routeParams", "Views", function (e, t, n, r) {
    e.systemSettingsProviders = r.getProviders({component: "admin.system"});
    var i = n.section;
    i && (e.activeSettingsProvier = r.getProviders({
      component: "admin.system",
      id: n.section
    })[0]), e.activeClass = function (e) {
      var n = t.absUrl();
      return -1 != n.indexOf(e) ? "active" : ""
    }
  }];
  return ["$routeProvider", function (n) {
    n.when("/system", {template: e, controller: t, authentication: "required"})
  }]
}), define("text!pages/systemSettingsGeneral.html", [], function () {
  return '<!-- # CE - camunda-admin-ui/client/scripts/pages/systemSettingsGeneral.html -->\n<form>\n  <legend>General Settings</legend>\n\n  <div class="alert alert-success">\n    <span class="glyphicon glyphicon-thumbs-up"></span>\n    <strong>Process engine</strong> <code>{{processEngineName}}</code> is up and running.\n  </div>\n\n</form>\n<!-- / CE - camunda-admin-ui/client/scripts/pages/systemSettingsGeneral.html -->\n'
}),define("pages/systemSettingsGeneral", ["text!./systemSettingsGeneral.html"], function (e) {
  "use strict";
  var t = ["$scope", "Uri", function (e, t) {
    e.processEngineName = t.appUri(":engine")
  }];
  return ["ViewsProvider", function (n) {
    n.registerDefaultView("admin.system", {
      id: "system-settings-general",
      label: "General",
      template: e,
      controller: t,
      priority: 1e3
    })
  }]
}),define("text!pages/systemSettingsFlowNodeCount.html", [], function () {
  return '<form name="form">\n  <legend>Flow Node Count</legend>\n\n  <div\n    class="alert alert-info">\n    <p>\n      Displays an approximate number of flow nodes executed\n      by the process engine in the selected time range.\n    </p>\n  </div>\n\n  <div class="form-group">\n    <label\n      for="startDate">\n      Start Date\n    </label>\n    <input\n      type="text"\n      ng-model="startDate"\n      class="form-control"\n      id="startDate">\n  </div>\n\n  <div class="form-group">\n    <label\n      for="endDate">\n      End Date\n    </label>\n    <input\n      type="text"\n      ng-model="endDate"\n      class="form-control"\n      id="endDate">\n  </div>\n\n\n  <div class="form-group">\n    <label>\n      Result\n    </label>\n    <pre><strong>{{activityInstances}}</strong> Flow Node Instances.</pre>\n  </div>\n\n  <button\n    type="submit"\n    class="btn btn-default"\n    ng-click="load()">\n    Refresh\n  </button>\n\n</form>\n'
}),define("pages/systemSettingsFlowNodeCount", ["text!./systemSettingsFlowNodeCount.html", "camunda-bpm-sdk-js"], function (e, t) {
  "use strict";
  var n = ["$scope", "Uri", "$filter", function (e, n, r) {
    var i = new t.Client({
      apiUri: n.appUri("engine://"),
      engine: n.appUri(":engine")
    }).resource("metrics"), a = r("date"), o = new Date;
    e.startDate = a(o, "yyyy") + "-01-01T00:00:00", e.endDate = a(o, "yyyy") + "-12-31T23:59:59", e.load = function () {
      var t = {name: "activity-instance-start", startDate: e.startDate, endDate: e.endDate};
      i.sum(t, function (t, n) {
        e.activityInstances = n.result, e.$apply()
      })
    }, e.load()
  }];
  return ["ViewsProvider", function (t) {
    t.registerDefaultView("admin.system", {
      id: "system-settings-flow-node-count",
      label: "Flow Node Count",
      template: e,
      controller: n,
      priority: 900
    })
  }]
}),define("pages/main", ["angular", "angular-route", "camunda-commons-ui", "./authorizations", "./authorizationCreate", "./authorizationDeleteConfirm", "./users", "./userCreate", "./userEdit", "./groups", "./groupCreate", "./groupEdit", "./groupMembershipsCreate", "./setup", "./system", "./systemSettingsGeneral", "./systemSettingsFlowNodeCount"], function (e, t, n, r, i, a, o, s, u, l, c, p, d, f, h, m, g) {
  "use strict";
  var v = e.module("admin.pages", ["ngRoute", "cam.commons"]);
  return v.config(r), v.controller("AuthorizationCreateController", i), v.controller("ConfirmDeleteAuthorizationController", a), v.config(o), v.config(s), v.config(u), v.config(l), v.config(c), v.config(p), v.controller("GroupMembershipDialogController", d), v.config(f), v.config(h), v.config(m), v.config(g), v
}),define("pages", ["pages/main"], function (e) {
  return e
}),define("directives/main", ["angular"], function (e) {
  return e.module("admin.directives", [])
}),define("directives", ["directives/main"], function (e) {
  return e
}),define("filters/main", ["angular"], function (e) {
  return e.module("admin.filters", [])
}),define("filters", ["filters/main"], function (e) {
  return e
}),define("services/main", ["angular"], function (e) {
  return e.module("admin.services", [])
}),define("services", ["services/main"], function (e) {
  return e
}),define("resources/userResource", [], function () {
  return ["$resource", "Uri", function (e, t) {
    return e(t.appUri("engine://engine/:engine/user/:userId/:action"), {userId: "@id"}, {
      profile: {
        method: "GET",
        params: {action: "profile"}
      },
      updateProfile: {method: "PUT", params: {action: "profile"}},
      updateCredentials: {method: "PUT", params: {action: "credentials"}},
      createUser: {method: "POST", params: {userId: "create"}},
      OPTIONS: {method: "OPTIONS", params: {}}
    })
  }]
}),define("resources/groupResource", [], function () {
  return ["$resource", "Uri", function (e, t) {
    return e(t.appUri("engine://engine/:engine/group/:groupId/:action"), {groupId: "@id"}, {
      createGroup: {
        method: "POST",
        params: {groupId: "create"}
      }, update: {method: "PUT"}, OPTIONS: {method: "OPTIONS", params: {}}
    })
  }]
}),define("resources/groupMembershipResource", [], function () {
  return ["$resource", "Uri", function (e, t) {
    return e(t.appUri("engine://engine/:engine/group/:groupId/members/:userId"), {
      groupId: "@groupId",
      userId: "@userId"
    }, {create: {method: "PUT"}})
  }]
}),define("resources/initialUserResource", [], function () {
  return ["$resource", "Uri", function (e, t) {
    return e(t.appUri("admin://setup/:engine/user/:action"), {action: "@action"}, {
      create: {
        method: "POST",
        params: {action: "create"}
      }
    })
  }]
}),define("resources/metricsResource", [], function () {
  "use strict";
  return ["$resource", "Uri", function (e, t) {
    return e(t.appUri("engine://engine/:engine/metrics/:name/:action"), {
      name: "@name",
      action: "@action"
    }, {sum: {method: "GET", params: {action: "sum"}}})
  }]
}),define("resources/main", ["angular", "./userResource", "./groupResource", "./groupMembershipResource", "./initialUserResource", "./metricsResource"], function (e, t, n, r, i, a) {
  "use strict";
  var o = e.module("admin.resources", []);
  return o.factory("UserResource", t), o.factory("GroupResource", n), o.factory("GroupMembershipResource", r), o.factory("InitialUserResource", i), o.factory("MetricsResource", a), o
}),define("resources", ["resources/main"], function (e) {
  return e
}),define("camunda-admin-ui", ["./pages/main", "./directives/main", "./filters/main", "./services/main", "./resources/main", "camunda-commons-ui", "ngDefine"], function () {
  "use strict";
  var e = "cam.admin", t = window.PLUGIN_PACKAGES || [], n = window.PLUGIN_DEPENDENCIES || [];
  require.config({packages: t});
  var r = [].concat(n.map(function (e) {
    return e.requirePackageName
  }));
  require(r, function () {
    var t = ["ng", "ngResource", require("camunda-commons-ui").name, require("./directives/main").name, require("./filters/main").name, require("./pages/main").name, require("./resources/main").name, require("./services/main").name].concat(n.map(function (e) {
      return e.ngModuleName
    })), r = require("angular"), i = require("jquery"), a = r.module(e, t), o = ["$routeProvider", "UriProvider", function (e, t) {
      function n(e) {
        var t = i("base").attr(e);
        if (!e)throw new Error("Uri base for " + e + " could not be resolved");
        return t
      }

      e.otherwise({redirectTo: "/users"}), t.replace(":appName", "admin"), t.replace("app://", n("href")), t.replace("cockpitbase://", n("app-root") + "/app/cockpit/"), t.replace("admin://", n("admin-api")), t.replace("plugin://", n("admin-api") + "plugin/"), t.replace("engine://", n("engine-api")), t.replace(":engine", ["$window", function (e) {
        var t = e.location.href, n = t.match(/\/app\/admin\/(\w+)(|\/)/);
        if (n)return n[1];
        throw new Error("no process engine selected")
      }])
    }];
    a.config(o), require(["domReady!"], function () {
      r.bootstrap(document, [a.name]);
      var e = document.getElementsByTagName("html")[0];
      e.setAttribute("ng-app", a.name), e.dataset && (e.dataset.ngApp = a.name), top !== window && window.parent.postMessage({type: "loadamd"}, "*")
    })
  })
});
//# sourceMappingURL=camunda-admin-ui.js
//# sourceMappingURL=camunda-admin-ui.js.map
