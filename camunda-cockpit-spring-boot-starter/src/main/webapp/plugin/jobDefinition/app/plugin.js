define("text!jobDefinition/app/views/processDefinition/job-definition-table.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/jobDefinition/app/views/processDefinition/job-definition-table.html -->\n<table class="job-definition cam-table">\n  <thead>\n    <tr>\n      <th class="state">State</th>\n      <th class="activity">Activity</th>\n      <th class="type">Type</th>\n      <th class="configuration">Configuration</th>\n      <th class="action">Action</th>\n    </tr>\n  </thead>\n\n  <tbody>\n    <tr ng-repeat="jobDefinition in jobDefinitions">\n      <td class="state">\n        <span ng-show="jobDefinition.suspended">\n          Suspended\n        </span>\n        <span ng-hide="jobDefinition.suspended">\n          Active\n        </span>\n      </td>\n      <td class="activity">\n        <a cam-select-activity="jobDefinition.activityId"\n           ng-href="#/process-definition/{{ processDefinition.id }}?activityIds={{ jobDefinition.activityId }}&amp;detailsTab=job-definition-table">\n          {{ jobDefinition.activityName }}\n        </a>\n      </td>\n      <td class="type">\n        {{ jobDefinition.jobType }}\n      </td>\n      <td class="configuration">\n        {{ jobDefinition.jobConfiguration }}\n      </td>\n      <td class="action">\n        <span ng-repeat="actionProvider in jobDefinitionActions">\n          <view provider="actionProvider" vars="jobDefinitionVars"/>\n        </span>\n      </td>\n    </tr>\n\n    <tr ng-if="!jobDefinitions">\n      <td colspan="5">\n        <span class="glyphicon glyphicon-loading"></span>\n        loading job definitions...\n      </td>\n    </tr>\n\n    <tr ng-if="jobDefinitions && !jobDefinitions.length">\n      <td colspan="5">\n        No job definitions matched by current filter.\n      </td>\n    </tr>\n\n  </tbody>\n</table>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/jobDefinition/app/views/processDefinition/job-definition-table.html -->\n'
}), define("jobDefinition/app/views/processDefinition/jobDefinitionTable", ["angular", "text!./job-definition-table.html"], function (n, e) {
  var i = ["$scope", "Views", function (e, i) {
    function t(i, t) {
      e.jobDefinitions = null;
      var o = i.activityIds;
      if (!o || !o.length)return void(e.jobDefinitions = t);
      var s = [];
      n.forEach(t, function (n) {
        var e = n.activityId;
        -1 != o.indexOf(e) && s.push(n)
      }), e.jobDefinitions = s
    }

    var o = e.processData.newChild(e);
    o.observe(["filter", "jobDefinitions", "bpmnElements"], function (n, e, i) {
      t(n, e, i)
    }), e.jobDefinitionVars = {read: ["jobDefinition", "processData", "filter"]}, e.jobDefinitionActions = i.getProviders({component: "cockpit.jobDefinition.action"})
  }], t = function (n) {
    n.registerDefaultView("cockpit.processDefinition.runtime.tab", {
      id: "job-definition-table",
      label: "Job Definitions",
      template: e,
      controller: i,
      priority: 2
    })
  };
  return t.$inject = ["ViewsProvider"], t
}), define("jobDefinition/app/views/processDefinition/jobDefinitionSuspensionState", ["angular"], function (n) {
  "use strict";
  return ["$scope", "$http", "$filter", "Uri", "Notifications", "$modalInstance", "jobDefinition", function (e, i, t, o, s, a, d) {
    var p = "BEFORE_UPDATE", c = "PERFORM_UDPATE", l = "SUCCESS", u = "FAIL", f = t("date"), r = "yyyy-MM-dd'T'HH:mm:ss";
    e.jobDefinition = d, e.status = p, e.data = {
      includeJobs: !0,
      executeImmediately: !0,
      executionDate: f(Date.now(), r)
    }, e.$on("$routeChangeStart", function () {
      a.close(e.status)
    }), e.updateSuspensionState = function () {
      e.status = c;
      var n = {};
      n.suspended = !d.suspended, n.includeJobs = e.data.includeJobs, n.executionDate = e.data.executeImmediately ? null : e.data.executionDate, i.put(o.appUri("engine://engine/:engine/job-definition/" + d.id + "/suspended/"), n).success(function () {
        e.status = l, s.addMessage(e.data.executeImmediately ? {
          status: "Finished",
          message: "Updated the suspension state of the job definition.",
          exclusive: !0
        } : {
          status: "Finished",
          message: "The update of the suspension state of the job definition has been scheduled.",
          exclusive: !0
        })
      }).error(function (n) {
        e.status = u, s.addError(e.data.executeImmediately ? {
          status: "Finished",
          message: "Could not update the suspension state of the job definition: " + n.message,
          exclusive: !0
        } : {
          status: "Finished",
          message: "The update of the suspension state of the job definition could not be scheduled: " + n.message,
          exclusive: !0
        })
      })
    }, e.isValid = function () {
      var e = n.element('[name="updateSuspensionStateForm"]').scope();
      return e && e.updateSuspensionStateForm ? e.updateSuspensionStateForm.$valid : !1
    }, e.close = function (n) {
      var i = {};
      i.status = n, i.suspended = !d.suspended, i.executeImmediately = e.data.executeImmediately, i.executionDate = e.data.executionDate, a.close(i)
    }
  }]
}), define("text!jobDefinition/app/views/processDefinition/job-definition-suspension-overlay.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/jobDefinition/app/views/processDefinition/job-definition-suspension-overlay.html -->\n<span class="badge badge-warning activity-top-right-position"\n      tooltip="Suspended Job Definition"\n      tooltip-placement="top"\n      ng-show="jobDefinition && jobDefinition.suspended">\n  <span class="glyphicon glyphicon-pause"></span>\n</span>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/jobDefinition/app/views/processDefinition/job-definition-suspension-overlay.html -->\n'
}), define("jobDefinition/app/views/processDefinition/jobDefinitionSuspensionOverlay", ["text!./job-definition-suspension-overlay.html"], function (n) {
  var e = ["$scope", function (n) {
    var e = n.bpmnElement, i = n.processData.newChild(n);
    i.provide("jobDefinition", ["jobDefinitions", function (n) {
      for (var i = 0; i < n.length; i++) {
        var t = n[i];
        if (t.activityId === e.id)return t
      }
      return null
    }]), n.jobDefinition = i.observe("jobDefinition", function (i) {
      i && (e.isSelectable = !0), n.jobDefinition = i
    })
  }], i = function (i) {
    i.registerDefaultView("cockpit.processDefinition.diagram.overlay", {
      id: "job-definition-diagram-overlay",
      template: n,
      controller: e,
      priority: 10
    })
  };
  return i.$inject = ["ViewsProvider"], i
}), define("text!jobDefinition/app/views/processDefinition/suspension-state-action.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/jobDefinition/app/views/processDefinition/suspension-state-action.html -->\n<a class="btn btn-default action-button"\n   ng-click="openSuspensionStateDialog(jobDefinition)"\n   ng-show="jobDefinition.suspended"\n   tooltip="Activate Job Definition"\n   tooltip-placement="left">\n  <span class="glyphicon glyphicon-play"></span>\n</a>\n<a class="btn btn-default action-button"\n   ng-click="openSuspensionStateDialog(jobDefinition)"\n   ng-hide="jobDefinition.suspended"\n   tooltip="Suspend Job Definition"\n   tooltip-placement="left">\n  <span class="glyphicon glyphicon-pause"></span>\n</a>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/jobDefinition/app/views/processDefinition/suspension-state-action.html -->\n'
}), define("text!jobDefinition/app/views/processDefinition/job-definition-suspension-state-dialog.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/jobDefinition/app/views/processDefinition/job-definition-suspension-state-dialog.html -->\n<div class="modal-header">\n  <h3>{{ (jobDefinition.suspended ? \'Activate\' : \'Suspend\') }} Job Definition</h3>\n</div>\n\n<div class="job-definition-suspension-state modal-body">\n  <div notifications-panel></div>\n\n  <div ng-hide="status === \'SUCCESS\' || status === \'FAIL\'">\n\n    <p ng-show="jobDefinition.suspended">\n      <!-- activation -->\n      This job definition will be activated, so that new jobs based on this job definition are initially active.\n    </p>\n\n    <p ng-hide="jobDefinition.suspended">\n      <!-- suspension -->\n      This job definition will be suspended, so that new jobs based on this job definition are initially suspended.\n    </p>\n\n    <form class="form-horizontal"\n          name="updateSuspensionStateForm"\n          novalidate\n          request-aware\n          ng-submit="updateSuspensionState()">\n\n      <fieldset>\n        <div class="form-group">\n          <label class="col-xs-4 control-label"\n                 for="includeJobsValue">\n            Include Existing Jobs\n            <!-- activation -->\n            <span class="glyphicon glyphicon-question-sign"\n                  tooltip="Including jobs means that all existing jobs of this job definition will be activated too, if the value is set to true."\n                  tooltip-placement="right"\n                  ng-show="jobDefinition.suspended">\n            </span>\n\n            <!-- suspension -->\n            <span class="glyphicon glyphicon-question-sign"\n                  tooltip="Including jobs means that all existing jobs of this job definition will be suspended too, if the value is set to true."\n                  tooltip-placement="right"\n                  ng-hide="jobDefinition.suspended">\n            </span>\n          </label>\n\n\n          <div class="col-xs-8 checkbox">\n            <label>\n              <input id="includeJobsValueId"\n                     name="includeJobsValue"\n                     type="checkbox"\n                     ng-model="data.includeJobs" />\n            </label>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="col-xs-4 control-label"\n                 for="executeImmediately">\n            Execute\n            <span class="glyphicon glyphicon-question-sign"\n                  tooltip="Decide whether the activation of this job definition should be executed immediately or delayed. If the activation should happen delayed then an execution date must be provided on which the activation will be scheduled."\n                  tooltip-placement="right"\n                  ng-show="jobDefinition.suspended">\n            </span>\n\n            <span class="glyphicon glyphicon-question-sign"\n                  tooltip="Decide whether the suspension of this job definition should be executed immediately or delayed. If the suspension should happen delayed then an execution date must be provided on which the suspension will be scheduled."\n                  tooltip-placement="right"\n                  ng-hide="jobDefinition.suspended">\n            </span>\n          </label>\n\n          <div class="col-xs-8">\n            <div class="radio">\n              <label>\n                <input ng-model="data.executeImmediately"\n                       ng-value="true"\n                       type="radio"\n                       name="execute" />\n                Immediately\n              </label>\n            </div>\n\n            <div class="radio">\n              <label>\n                <input ng-model="data.executeImmediately"\n                       ng-value="false"\n                       type="radio"\n                       name="execute" />\n                Delayed\n              </label>\n            </div>\n          </div>\n        </div>\n\n        <div class="form-group"\n             ng-show="!data.executeImmediately">\n          <label class="col-xs-4 control-label"\n                 for="executionDateValue">\n            Schedule at\n          </label>\n\n          <div class="col-xs-8">\n            <input name="executionDateValue"\n                   ng-model="data.executionDate"\n                   class="form-control"\n                   type="text"\n                   date\n                   required />\n\n            <p class="invalid"\n               ng-show="this.updateSuspensionStateForm.executionDateValue.$error.date">\n              Supported pattern \'yyyy-MM-ddTHH:mm:ss\'.\n            </p>\n          </div>\n        </div>\n\n      </fieldset>\n    </form>\n\n    <p>\n      Do you really want to {{ (jobDefinition.suspended ? \'activate\' : \'suspend\') }} this job definition?\n    </p>\n\n  </div>\n\n  <div ng-show="status === \'SUCCESS\'">\n    <p ng-show="jobDefinition.suspended && data.executeImmediately">\n      The suspension state of the Job Definition has been updated to "active" successfully.\n    </p>\n    <p ng-show="jobDefinition.suspended && !data.executeImmediately">\n      The activation of the Job Definition has been scheduled to {{ data.executionDate }} successfully.\n    </p>\n    <p ng-show="!jobDefinition.suspended && data.executeImmediately">\n      The suspension state of the Job Definition has been updated to "suspended" successfully.\n    </p>\n    <p ng-show="!jobDefinition.suspended && !data.executeImmediately">\n      The suspension of the Job Definition has been scheduled to {{ data.executionDate }} successfully.\n    </p>\n  </div>\n\n  <div ng-show="status === \'FAIL\'">\n    <p ng-show="jobDefinition.suspended && data.executeImmediately">\n      The suspension state of the Job Definition could not be updated to "active" successfully.\n    </p>\n    <p ng-show="jobDefinition.suspended && !data.executeImmediately">\n      The activation of the Job Definition could not be scheduled to {{ data.executionDate }} successfully.\n    </p>\n    <p ng-show="!jobDefinition.suspended && data.executeImmediately">\n      The suspension state of the Job Definition could not be updated to "suspended" successfully.\n    </p>\n    <p ng-show="!jobDefinition.suspended && !data.executeImmediately">\n      The suspension of the Job Definition could not be scheduled to {{ data.executionDate }} successfully.\n    </p>\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-link"\n          ng-click="close(status)"\n          ng-disabled="status === \'PERFORM_UDPATE\'"\n          ng-hide="status === \'SUCCESS\' || status === \'FAIL\'">\n    Close\n  </button>\n\n  <button type="submit"\n          class="btn btn-primary"\n          ng-click="updateSuspensionState()"\n          ng-hide="status === \'SUCCESS\' || status === \'FAIL\'"\n          ng-disabled="!isValid() || status === \'PERFORM_UDPATE\'">\n    {{ (jobDefinition.suspended ? \'Activate\' : \'Suspend\') }}\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close(status)"\n          ng-show="status === \'SUCCESS\' || status === \'FAIL\'">\n    OK\n  </button>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/jobDefinition/app/views/processDefinition/job-definition-suspension-state-dialog.html -->\n'
}), define("jobDefinition/app/views/processDefinition/suspensionStateAction", ["angular", "text!./suspension-state-action.html", "text!./job-definition-suspension-state-dialog.html"], function (n, e, i) {
  "use strict";
  var t = function (t) {
    t.registerDefaultView("cockpit.jobDefinition.action", {
      id: "update-suspension-state",
      template: e,
      controller: ["$scope", "$rootScope", "search", "$modal", function (e, t, o, s) {
        e.openSuspensionStateDialog = function (o) {
          var a = s.open({
            resolve: {
              jobDefinition: function () {
                return o
              }
            }, controller: "JobDefinitionSuspensionStateController", template: i
          });
          a.result.then(function (i) {
            "SUCCESS" === i.status && (i.executeImmediately && (o.suspended = i.suspended, t.$broadcast("$jobDefinition.suspensionState.changed", e.jobDefinition)), e.processData.set("filter", n.extend({}, e.filter)))
          })
        }
      }],
      priority: 50
    })
  };
  return t.$inject = ["ViewsProvider"], t
}), define("jobDefinition/app/views/main", ["angular", "./processDefinition/jobDefinitionTable", "./processDefinition/jobDefinitionSuspensionState", "./processDefinition/jobDefinitionSuspensionOverlay", "./processDefinition/suspensionStateAction"], function (n, e, i, t, o) {
  var s = n.module("cockpit.plugin.jobDefinition.views", []);
  return s.config(e), s.controller("JobDefinitionSuspensionStateController", i), s.config(t), s.config(o), s
}), define("jobDefinition/app/data/processDefinition/jobDefinitionData", ["angular"], function (n) {
  var e = ["$scope", "processData", "JobDefinitionResource", function (e, i, t) {
    e.$on("$processDefinition.suspensionState.changed", function () {
      i.changed("jobDefinitions")
    }), i.provide("jobDefinitions", ["processDefinition", function (n) {
      return t.query({processDefinitionId: n.id}).$promise
    }]), i.observe(["jobDefinitions", "bpmnElements"], function (e, i) {
      n.forEach(e, function (n) {
        var e = n.activityId, t = i[e];
        n.activityName = t && (t.name || t.id) || e
      })
    })
  }], i = function (n) {
    n.registerData("cockpit.processDefinition.data", {id: "job-definitions-data", controller: e})
  };
  return i.$inject = ["DataProvider"], i
}), define("jobDefinition/app/data/main", ["angular", "./processDefinition/jobDefinitionData"], function (n, e) {
  var i = n.module("cockpit.plugin.jobDefinition.data", []);
  return i.config(e), i
}), define("jobDefinition/app/plugin", ["angular", "./views/main", "./data/main"], function (n, e, i) {
  return n.module("cockpit.plugin.jobDefinition", [e.name, i.name])
}), require(["jobDefinition/app/plugin"]);
//# sourceMappingURL=plugin.js
//# sourceMappingURL=plugin.js.map
