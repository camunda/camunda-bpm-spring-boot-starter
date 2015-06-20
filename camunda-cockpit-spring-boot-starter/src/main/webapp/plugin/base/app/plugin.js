define("text!base/app/views/dashboard/process-definitions.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/dashboard/process-definitions.html -->\n<div class="deployed-processes">\n  <h3 ng-if="statistics && statistics.length">\n    {{ statistics.length }} {{ (statistics.length > 1 ? \'processes\' : \'process\') }} deployed\n  </h3>\n\n  <tabset ng-if="statistics && statistics.length">\n    <tab heading="List"\n         select="selectTab(\'list\')">\n      <table class="process-definitions-list cam-table">\n        <thead>\n          <tr>\n            <th class="state">State</th>\n            <th class="instances">Running Instances</th>\n            <th class="name">Name</th>\n          </tr>\n        </thead>\n\n        <tbody>\n          <tr ng-repeat="statistic in statistics | orderBy:orderByPredicate:orderByReverse">\n            <td class="state">\n              <div state-circle\n                   incidents="statistic.incidents"></div>\n            </td>\n\n            <td class="instances">\n              {{ statistic.instances }}\n            </td>\n\n            <td class="name">\n              <a href="#/process-definition/{{ statistic.definition.id }}">\n                {{ statistic.definition.name }}\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </tab><!-- / list tab -->\n\n    <tab heading="Previews"\n         select="selectTab(\'previews\')">\n      <div class="tile-grid">\n        <div ng-repeat="statistic in statistics | orderBy:orderByPredicate:orderByReverse"\n             class="tile">\n          <a href="#/process-definition/{{ statistic.definition.id }}">\n            <h4 class="tile-header">\n              {{ statistic.definition.name }}\n            </h4>\n\n            <span class="tile-body">\n              <span ng-if="selected === \'previews\'"\n                    process-diagram-preview\n                    process-definition-id="statistic.definition.id"></span>\n            </span>\n\n            <span class="tile-footer">\n              <span class="instances">\n                {{ (statistic.instances < 1 ? \'No\' : statistic.instances) }}\n                running\n                {{ ((statistic.instances === 1 || statistic.instances === \'1\') ? \'instance\' : \'instances\') }}\n              </span>\n\n              <span state-circle\n                    incidents="statistic.incidents"\n                    class="circle-tiles"></span>\n            </span>\n          </a>\n        </div>\n      </div>\n    </tab><!-- grid tab -->\n  </tabset>\n\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/dashboard/process-definitions.html -->\n'
}), define("base/app/views/dashboard/process-definitions", ["text!./process-definitions.html"], function (e) {
  "use strict";
  return ["ViewsProvider", function (n) {
    n.registerDefaultView("cockpit.dashboard", {
      id: "process-definition",
      label: "Deployed Processes",
      template: e,
      controller: ["$scope", function (e) {
        var n = e.processData.newChild(e);
        e.orderByPredicate = "definition.name", e.orderByReverse = !1, n.observe("processDefinitionStatistics", function (n) {
          e.statistics = n
        }), e.selected = "list", e.selectTab = function (n) {
          e.selected = n
        }
      }],
      priority: 0
    })
  }]
}), define("text!base/app/views/processDefinition/process-instance-table.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processDefinition/process-instance-table.html -->\n<div cam-widget-loader\n     loading-state="{{ loadingState }}"\n     text-empty="No process instances matched by current filter.">\n  <table class="process-instances cam-table">\n    <thead>\n      <tr>\n        <th class="state">State</th>\n        <th class="instance-id uuid">ID</th>\n        <th class="start-time">Start Time</th>\n        <th class="business-key">Business Key</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr ng-repeat="processInstance in processInstances">\n        <td class="state">\n          <a state-circle\n             incidents="processInstance.incidents"\n             ng-href="#/process-instance/{{ processInstance.id }}?detailsTab=incidents-tab"></a>\n          <span class="badge badge-warning badge-suspended"\n                ng-show="processInstance.suspended"\n                tooltip="Currently suspended"\n                tooltip-placement="left">\n            <span class="glyphicon glyphicon-pause white"></span>\n          </span>\n        </td>\n\n        <td class="instance-id uuid">\n          <a href="#/process-instance/{{ processInstance.id }}" title="{{ processInstance.id }}">\n            {{ processInstance.id }}\n          </a>\n        </td>\n\n        <td class="start-time">\n          {{ processInstance.startTime | camDate }}\n        </td>\n\n        <td class="business-key">\n          {{ processInstance.businessKey }}\n        </td>\n      </tr>\n    </tbody>\n  </table>\n\n  <pagination ng-if="pages.total > pages.size"\n              class="pagination-sm"\n\n              page="pages.current"\n              ng-model="pages.current"\n\n              total-items="pages.total"\n              items-per-page="pages.size"\n\n              max-size="7"\n              boundary-links="true"></pagination>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processDefinition/process-instance-table.html -->\n'
}), define("base/app/views/processDefinition/processInstanceTable", ["angular", "text!./process-instance-table.html"], function (e, n) {
  "use strict";
  return ["ViewsProvider", function (t) {
    t.registerDefaultView("cockpit.processDefinition.runtime.tab", {
      id: "process-instances-table",
      label: "Process Instances",
      template: n,
      controller: ["$scope", "search", "PluginProcessInstanceResource", function (n, t, s) {
        function a(t) {
          l = e.copy(t), delete l.page, delete l.scrollToBpmnElement;
          var a = r.current, i = r.size, o = (a - 1) * i, d = {processDefinitionId: c.id}, p = {
            firstResult: o,
            maxResults: i,
            sortBy: "startTime",
            sortOrder: "desc"
          }, u = e.extend({}, l, d);
          u.activityIdIn = u.activityIds, delete u.activityIds, e.forEach(u.start, function (e) {
            e.value && ("after" === e.type ? u.startedAfter = e.value : "before" === e.type && (u.startedBefore = e.value))
          }), delete u.start;
          var b = e.extend({}, u, p);
          n.processInstances = null, n.loadingState = "LOADING", s.query(p, b).$promise.then(function (e) {
            n.processInstances = e, n.loadingState = e.length ? "LOADED" : "EMPTY"
          }), s.count(u).$promise.then(function (e) {
            r.total = e.count
          })
        }

        var i = n.processData.newChild(n), c = n.processDefinition, o = {
          size: 50,
          total: 0,
          current: 1
        }, r = n.pages = e.copy(o), l = null;
        n.$watch("pages.current", function (e, n) {
          e != n && t("page", e && 1 != e ? e : null)
        }), i.observe("filter", function (e) {
          r.current = e.page || 1, a(e)
        })
      }],
      priority: 10
    })
  }]
}), define("text!base/app/views/processDefinition/called-process-definition-table.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processDefinition/called-process-definition-table.html -->\n<div cam-widget-loader\n     loading-state="{{ loadingState }}"\n     text-empty="No called process definitions">\n  <table class="called-process-definition cam-table">\n    <thead>\n      <tr>\n        <th class="process-definition">Called Process Definition</th>\n        <th class="activity">Activity</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr ng-repeat="calledProcessDefinition in calledProcessDefinitions">\n        <td class="process-definition">\n          <a ng-href="#/process-definition/{{ calledProcessDefinition.id }}?parentProcessDefinitionId={{ processDefinition.id }}">\n            {{ calledProcessDefinition.name }}\n          </a>\n        </td>\n\n        <td class="activity">\n          <a ng-show="calledProcessDefinition.calledFromActivities.length === 1"\n             cam-select-activity="calledProcessDefinition.calledFromActivities[0].id"\n             ng-href="#/process-definition/{{ processDefinition.id }}?activityIds={{ calledProcessDefinition.calledFromActivities[0].id }}&amp;detailsTab=call-process-definitions-table">\n            {{ calledProcessDefinition.calledFromActivities[0].name }}\n          </a>\n\n          <ul ng-show="calledProcessDefinition.calledFromActivities.length > 1">\n            <li ng-repeat="activity in calledProcessDefinition.calledFromActivities">\n              <a cam-select-activity="activity.id"\n                 ng-href="#/process-definition/{{ processDefinition.id }}?activityIds={{ activity.id }}&amp;detailsTab=call-process-definitions-table">\n                {{ activity.name }}\n              </a>\n            </li>\n          <ul>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processDefinition/called-process-definition-table.html -->\n'
}), define("base/app/views/processDefinition/calledProcessDefinitionTable", ["angular", "text!./called-process-definition-table.html"], function (e, n) {
  "use strict";
  return ["ViewsProvider", function (t) {
    t.registerDefaultView("cockpit.processDefinition.runtime.tab", {
      id: "call-process-definitions-table",
      label: "Called Process Definitions",
      template: n,
      controller: ["$scope", "$location", "$q", "PluginProcessDefinitionResource", function (n, t, s, a) {
        function i(n, t) {
          var s = [];
          return e.forEach(n, function (n) {
            var a = n.calledFromActivityIds, i = [];
            e.forEach(a, function (e) {
              var n = t[e], s = {id: e, name: n && n.name || e};
              i.push(s)
            }), s.push(e.extend({}, n, {calledFromActivities: i}))
          }), s
        }

        var c, o = n.processData.newChild(n);
        o.provide("calledProcessDefinitions", ["processDefinition", "filter", function (t, s) {
          return c = e.copy(s), delete c.page, delete c.scrollToBpmnElement, c.superProcessDefinitionId = c.parentProcessDefinitionId, c.parentProcessDefinitionId = n.processDefinition.id, c.activityIdIn = c.activityIds, delete c.activityIds, n.loadingState = "LOADING", a.getCalledProcessDefinitions({id: t.id}, c).$promise
        }]), o.observe(["calledProcessDefinitions", "bpmnElements"], function (e, t) {
          n.calledProcessDefinitions = i(e, t), n.loadingState = n.calledProcessDefinitions.length ? "LOADED" : "EMPTY"
        })
      }],
      priority: 5
    })
  }]
}), define("text!base/app/views/processDefinition/update-suspension-state-action.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processDefinition/update-suspension-state-action.html -->\n<a class="btn btn-default btn-toolbar btn-suspend-action"\n   href\n   ng-click="openDialog()"\n   tooltip="Suspend Process Definition"\n   tooltip-placement="left"\n   ng-show="!processDefinition.suspended">\n  <span class="glyphicon glyphicon-pause"></span>\n</a>\n\n<a class="btn btn-default btn-toolbar"\n   href\n   ng-click="openDialog()"\n   tooltip="Activate Process Definition"\n   tooltip-placement="left"\n   ng-hide="!processDefinition.suspended">\n  <span class="glyphicon glyphicon-play"></span>\n</a>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processDefinition/update-suspension-state-action.html -->\n'
}), define("text!base/app/views/processDefinition/update-suspension-state-dialog.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processDefinition/update-suspension-state-dialog.html -->\n<div class="modal-header">\n  <h3>{{ (processDefinition.suspended ? \'Activate\' : \'Suspend\') }} Process Definition</h3>\n</div>\n\n<div class="process-definition update-suspension-state modal-body">\n  <div notifications-panel></div>\n\n  <div ng-hide="status === \'SUCCESS\' || status === \'FAIL\'">\n\n    <p ng-show="processDefinition.suspended">\n      <!-- activation -->\n      This process definition will be activated, so that it will be possible to start new process instances based on this process definition.\n    </p>\n\n    <p ng-hide="processDefinition.suspended">\n      <!-- suspension -->\n      This process definition will be suspended, so that it will not be possible to start new process instances based on this process definition.\n    </p>\n\n    <form class="form-horizontal"\n          name="updateSuspensionStateForm"\n          novalidate\n          request-aware\n          ng-submit="updateSuspensionState()">\n      <fieldset>\n        <div class="form-group">\n          <label class="control-label col-xs-4"\n                 for="includeInstancesValue">Include Instances\n            <!-- activation -->\n            <span tooltip="Including the process instances means that all existing process instances of this process definition will be activated too, if the value is set to true."\n                  tooltip-placement="right"\n                  ng-show="processDefinition.suspended">\n              <span class="glyphicon glyphicon-question-sign"></span>\n            </span>\n\n            <!-- suspension -->\n            <span tooltip="Including the process instances means that all existing process instances of this process definition will be suspended too, if the value is set to true."\n                  tooltip-placement="right"\n                  ng-hide="processDefinition.suspended">\n              <span class="glyphicon glyphicon-question-sign"></span>\n            </span>\n          </label>\n\n          <div class="col-xs-8">\n            <label class="checkbox">\n              <input id="includeInstancesValueId"\n                     name="includeInstancesValue"\n                     type="checkbox"\n                     ng-model="data.includeInstances">\n            </label>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-xs-4" for="executeImmediately">Execute\n            <span tooltip="Decide whether the activation of this process definition should be executed immediately or delayed. If the activation should happen delayed then an execution date must be provided on which the activation will be scheduled."\n                  tooltip-placement="right"\n                  ng-show="processDefinition.suspended">\n              <span class="glyphicon glyphicon-question-sign"></span>\n            </span>\n            <span tooltip="Decide whether the suspension of this process definition should be executed immediately or delayed. If the suspension should happen delayed then an execution date must be provided on which the suspension will be scheduled."\n                  tooltip-placement="right"\n                  ng-hide="processDefinition.suspended">\n              <span class="glyphicon glyphicon-question-sign"></span>\n            </span>\n          </label>\n\n          <div class="col-xs-8">\n            <label class="radio">\n              <input ng-model="data.executeImmediately"\n                     ng-value="true"\n                     type="radio"\n                     name="execute">\n              Immediately\n            </label>\n\n            <label class="radio">\n              <input ng-model="data.executeImmediately"\n                     ng-value="false"\n                     type="radio"\n                     name="execute">\n              Delayed\n            </label>\n          </div>\n\n          <label class="control-label col-xs-4"\n                 for="executionDateValue"\n                 ng-show="!data.executeImmediately">\n            Schedule at\n          </label>\n\n          <div class="col-xs-8"\n               ng-show="!data.executeImmediately">\n            <input date\n                   name="executionDateValue"\n                   ng-model="data.executionDate"\n                   type="text"\n                   required />\n\n            <p class="invalid"\n               ng-show="this.updateSuspensionStateForm.executionDateValue.$error.date">\n              Supported pattern \'yyyy-MM-ddTHH:mm:ss\'.\n            </p>\n          </div>\n\n        </div><!-- /.form-group -->\n\n      </fieldset>\n    </form>\n\n    <p>\n      Do you really want to {{ (processDefinition.suspended ? \'activate\' : \'suspend\') }} this process definition?\n    </p>\n\n  </div>\n\n  <div ng-show="status === \'SUCCESS\'">\n    <p ng-show="processDefinition.suspended && data.executeImmediately">\n      The suspension state of the process definition has been updated to "active" successfully.\n    </p>\n    <p ng-show="processDefinition.suspended && !data.executeImmediately">\n      The activation of the process definition has been scheduled to {{ data.executionDate | camDate  }} successfully.\n    </p>\n    <p ng-show="!processDefinition.suspended && data.executeImmediately">\n      The suspension state of the process definition has been updated to "suspended" successfully.\n    </p>\n    <p ng-show="!processDefinition.suspended && !data.executeImmediately">\n      The suspension of the process definition has been scheduled to {{ data.executionDate | camDate  }} successfully.\n    </p>\n  </div>\n\n  <div ng-show="status === \'FAIL\'">\n    <p ng-show="processDefinition.suspended && data.executeImmediately">\n      The suspension state of the process definition could not be updated to "active" successfully.\n    </p>\n    <p ng-show="processDefinition.suspended && !data.executeImmediately">\n      The activation of the process definition could not be scheduled to {{ data.executionDate | camDate  }} successfully.\n    </p>\n    <p ng-show="!processDefinition.suspended && data.executeImmediately">\n      The suspension state of the process definition could not be updated to "suspended" successfully.\n    </p>\n    <p ng-show="!processDefinition.suspended && !data.executeImmediately">\n      The suspension of the process definition could not be scheduled to {{ data.executionDate | camDate  }} successfully.\n    </p>\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="close(status)"\n          ng-disabled="status === \'PERFORM_UDPATE\'"\n          ng-hide="status === \'SUCCESS\' || status === \'FAIL\'">\n    Close\n  </button>\n\n  <button type="submit"\n          class="btn btn-primary"\n          ng-click="updateSuspensionState()"\n          ng-hide="status === \'SUCCESS\' || status === \'FAIL\'"\n          ng-disabled="!isValid() || status === \'PERFORM_UDPATE\'">\n    {{ (processDefinition.suspended ? \'Activate\' : \'Suspend\') }}\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close(status)"\n          ng-show="status === \'SUCCESS\' || status === \'FAIL\'">\n    OK\n  </button>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processDefinition/update-suspension-state-dialog.html -->\n'
}), define("base/app/views/processDefinition/updateSuspensionStateAction", ["angular", "text!./update-suspension-state-action.html", "text!./update-suspension-state-dialog.html"], function (e, n, t) {
  "use strict";
  return ["ViewsProvider", function (s) {
    s.registerDefaultView("cockpit.processDefinition.runtime.action", {
      id: "update-suspension-state-action",
      label: "Update Suspension State",
      template: n,
      controller: ["$scope", "$rootScope", "$modal", function (n, s, a) {
        n.openDialog = function () {
          var i = a.open({
            resolve: {
              processData: function () {
                return n.processData
              }, processDefinition: function () {
                return n.processDefinition
              }
            }, controller: "UpdateProcessDefinitionSuspensionStateController", template: t
          });
          i.result.then(function (t) {
            "SUCCESS" === t.status && (t.executeImmediately && (n.processDefinition.suspended = t.suspended, s.$broadcast("$processDefinition.suspensionState.changed", n.processDefinition)), n.processData.set("filter", e.extend({}, n.filter)))
          })
        }
      }],
      priority: 50
    })
  }]
}), define("base/app/views/processDefinition/updateSuspensionStateDialog", ["angular"], function (e) {
  "use strict";
  return ["$scope", "$http", "$filter", "Uri", "Notifications", "$modalInstance", "processDefinition", function (n, t, s, a, i, c, o) {
    var r = "BEFORE_UPDATE", l = "PERFORM_UDPATE", d = "SUCCESS", p = "FAIL", u = s("date"), b = "yyyy-MM-dd'T'HH:mm:ss";
    n.processDefinition = o, n.status = r, n.data = {
      includeInstances: !0,
      executeImmediately: !0,
      executionDate: u(Date.now(), b)
    }, n.$on("$routeChangeStart", function () {
      c.close(n.status)
    }), n.updateSuspensionState = function () {
      n.status = l;
      var e = {};
      e.suspended = !o.suspended, e.includeProcessInstances = n.data.includeInstances, e.executionDate = n.data.executeImmediately ? null : n.data.executionDate, t.put(a.appUri("engine://engine/:engine/process-definition/" + o.id + "/suspended/"), e).success(function () {
        n.status = d, i.addMessage(n.data.executeImmediately ? {
          status: "Finished",
          message: "Updated the suspension state of the process definition.",
          exclusive: !0
        } : {
          status: "Finished",
          message: "The update of the suspension state of the process definition has been scheduled.",
          exclusive: !0
        })
      }).error(function (e) {
        n.status = p, n.data.executeImmediately ? i.addError({
          status: "Finished",
          message: "Could not update the suspension state of the process definition: " + e.message,
          exclusive: !0
        }) : i.addMessage({
          status: "Finished",
          message: "The update of the suspension state of the process definition could not be scheduled: " + e.message,
          exclusive: !0
        })
      })
    }, n.isValid = function () {
      var n = e.element('[name="updateSuspensionStateForm"]').scope();
      return n && n.updateSuspensionStateForm ? n.updateSuspensionStateForm.$valid : !1
    }, n.close = function (e) {
      var t = {};
      t.status = e, t.suspended = !o.suspended, t.executeImmediately = n.data.executeImmediately, t.executionDate = n.data.executionDate, c.close(t)
    }
  }]
}), define("text!base/app/views/processDefinition/activity-instance-statistics-overlay.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processDefinition/activity-instance-statistics-overlay.html -->\n<span class="activity-bottom-left-position"\n      ng-show="activityInstance"\n      ng-click="selectRunningInstances($event)">\n  <span class="badge"\n        tooltip="Running Activity Instances"\n        tooltip-placement="top"\n        tooltip-animation="false"\n        ng-show="activityInstance.instances">\n    {{ activityInstance.instances | abbreviateNumber }}\n  </span>\n\n  <span class="badge badge-important"\n        tooltip="Open Incidents"\n        tooltip-placement="top"\n        tooltip-animation="false"\n        ng-show="activityInstance.incidents">!</span>\n</span>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processDefinition/activity-instance-statistics-overlay.html -->\n'
}), define("base/app/views/processDefinition/activityInstanceStatisticsOverlay", ["angular", "text!./activity-instance-statistics-overlay.html"], function (e, n) {
  "use strict";
  return ["ViewsProvider", function (t) {
    t.registerDefaultView("cockpit.processDefinition.diagram.overlay", {
      id: "activity-instance-statistics-overlay",
      template: n,
      controller: ["$scope", function (n) {
        var t = n.bpmnElement, s = n.processData.newChild(n);
        s.provide("activityInstance", ["activityInstanceStatistics", function (e) {
          for (var n = 0; n < e.length; n++) {
            var s = e[n];
            if (s.id === t.id)return s
          }
          return null
        }]), n.activityInstance = s.observe("activityInstance", function (e) {
          e && (t.isSelectable = !0), n.activityInstance = e
        });
        var a = s.observe("filter", function (e) {
          a = e
        });
        n.selectRunningInstances = function (n) {
          var i = e.copy(a), c = n.ctrlKey, o = t.id, r = e.copy(i.activityIds) || [], l = r.indexOf(o), d = -1 !== l;
          o ? c ? d ? r.splice(l, 1) : r.push(o) : r = [o] : r = null, i.activityIds = r, s.set("filter", i)
        }
      }],
      priority: 20
    })
  }]
}), define("text!base/app/views/processInstance/variable-instance-upload-dialog.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/variable-instance-upload-dialog.html -->\n<div class="modal-header">\n  <h3>Upload binary variable</h3>\n</div>\n\n<!--[if lt IE 10]>\n\nThis feature is unsupported in your Browser.\n\n<![endif]-->\n\n<![if gt IE 9]>\n\n<div class="variable-instance-upload modal-body">\n  <div notifications-panel></div>\n\n  <div ng-show="status === \'beforeUpload\'">\n\n    <p>Select a file containing the binary content for  the variable:</p>\n\n    <p>\n      <input name="data"\n             type="file"\n             size="50"\n             maxlength="100000"\n             accept="*/*"\n             onchange="angular.element(this).scope().setFile(this)" />\n    </p>\n\n  </div>\n\n  <div ng-show="status === \'performUpload\'">\n    Upload progress: {{progress}}%\n  </div>\n\n  <div ng-show="status === \'uploadSuccess\'">\n    <p>\n      Variable <code>{{variableInstance.name}}</code> of execution <code>{{variableInstance.executionId}}</code>\n      was successfully replaced with the content of the uploaded file.\n    </p>\n  </div>\n\n  <div ng-show="status === \'uploadFailed\'">\n      Could not update variable <code>{{variableInstance.name}}</code> of execution <code>{{variableInstance.executionId}}</code>.\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="close(status)"\n          ng-hide="status === \'uploadSuccess\' || status === \'uploadFailed\'">\n    Close\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close(status)"\n          ng-show="status === \'uploadSuccess\' || status === \'uploadFailed\'">\n    OK\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="upload()"\n          ng-disabled="status !== \'beforeUpload\'"\n          ng-hide="status === \'uploadSuccess\' || status === \'uploadFailed\'">\n    Upload\n  </button>\n</div>\n\n<![endif]>\n\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/variable-instance-upload-dialog.html -->\n'
}), define("text!base/app/views/processInstance/variable-instance-inspect-dialog.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/variable-instance-inspect-dialog.html -->\n<div class="modal-header">\n  <h3>Inspect Object Variable</h3>\n</div>\n\n<div class="variable-instance-inspect modal-body">\n  <div notifications-panel></div>\n\n  <form name="serializableVariable"\n        ng-show="status === \'beforeChange\' || status === \'confirmChange\'">\n\n    <p>\n      <strong>Value Info:</strong>\n    </p>\n\n    <p>\n     Object type name: <code>{{objectType}}</code>\n    </p>\n    <p>\n     Serialization Data Format: <code>{{dataFormat}}</code>\n    </p>\n\n    <p>\n      <strong>Value:</strong>\n    </p>\n\n    <ul class="nav nav-tabs">\n      <li ng-class="{ active: selectedTab === \'serialized\' }">\n        <a href\n           ng-click="selectTab(\'serialized\')">Serialized</a>\n      </li>\n      <li ng-class="{ active: selectedTab === \'deserialized\' }">\n        <a href\n           ng-click="selectTab(\'deserialized\')">Deserialized</a>\n      </li>\n    </ul>\n    <div>\n      <div ng-if="selectedTab === \'serialized\'">\n        <textarea name="currentValue"\n                  ng-model="currentValue"\n                  ng-keyup="typeIn(this, \'serialized\')"\n                  rows="10"\n                  class="form-control">\n        </textarea>\n      </div>\n\n      <div ng-if="selectedTab === \'deserialized\'">\n        <div class="alert alert-danger"\n             ng-show="deserializationError">\n          <strong>Deserialization Error</strong>:\n          {{deserializationError}}\n        </div>\n\n        <div ng-show="!deserializationError">\n          <textarea name="currentValueDeserialized"\n                    ng-model="currentValueDeserialized"\n                    ng-keyup="typeIn(this, \'deserialized\')"\n                    rows="10"\n                    class="form-control">\n          </textarea>\n        </div>\n      </div>\n    </div>\n  </form>\n\n  <div class="alert alert-block"\n       ng-show="status === \'confirmChange\'">\n    <span class="glyphicon glyphicon-warning-sign"></span>\n    <strong>Warning:</strong>\n    Are you sure you want to change the value of this Object? Changing the variable in an incompatible way may lead to severe runtime problems.\n  </div>\n\n  <div ng-show="status === \'changeSuccess\'">\n    <p>\n      Variable <code>{{variableInstance.name}}</code> of execution <code>{{variableInstance.executionId}}</code>\n      was successfully updated.\n    </p>\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="$dismiss()"\n          ng-hide="status === \'changeSuccess\'">\n    Close\n  </button>\n\n  <![if gt IE 9]>\n    <button class="btn btn-primary"\n            ng-click="$close()"\n            ng-show="status === \'changeSuccess\'">\n      OK\n    </button>\n\n    <button class="btn btn-primary"\n            ng-click="change()"\n            ng-disabled="status !== \'beforeChange\' || !hasChanged()"\n            ng-hide="status != \'beforeChange\'">\n      Change\n    </button>\n\n    <button class="btn btn-warning"\n            ng-click="change()"\n            ng-hide="status != \'confirmChange\'">\n      Confirm Change\n    </button>\n  <![endif]>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/variable-instance-inspect-dialog.html -->\n'
}), define("text!base/app/views/processInstance/variable-instances-tab.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/variable-instances-tab.html -->\n<div cam-widget-loader\n     loading-state="{{ loadingState }}"\n     text-empty="No process variables">\n  <table class="variable-instances-tab cam-table">\n    <thead>\n      <tr>\n        <th class="variable-name">Name</th>\n        <th class="variable-value">Value</th>\n        <th class="variable-type">Type</th>\n        <th class="variable-scope">Scope</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr ng-repeat="variable in variables"\n          data-variable-name="{{ variable.name }}"\n          data-variable-type="{{ variable.value.type }}"\n          ng-class="\'variable-type-\' + variable.value.type + (variable.inEditMode ? \' editing\' : \'\')">\n        <td class="variable-name">\n          {{ variable.name }}\n        </td>\n\n        <td class="variable-value">\n          <div ng-if="isPrimitive(variable) && !variable.inEditMode && !variable.errorMessage">\n            {{ variable.value }}\n            <span ng-if="isEditable(variable)"\n                  class="edit-toggle"\n                  ng-click="editVariable(variable)">\n              <span class="glyphicon glyphicon-pencil"></span>\n            </span>\n          </div>\n\n          <div ng-if="!!variable.errorMessage" class="text-muted">\n            <span\n              tooltip="Object which cannot be de-serialized"\n              tooltip-placement="right">\n                Serialized Java Object\n            </span>\n          </div>\n\n          <!-- binary variables -->\n          <div ng-if="isBinary(variable)">\n            <a class="text-muted"\n               href="{{getBinaryVariableDownloadLink(variable)}}"\n               target="_blank"\n               tooltip="Click to Download"\n               tooltip-placement="right">\n              Binary Content\n            </a>\n            <a class="edit-toggle"\n               href\n               ng-click="openUploadDialog(variable)"\n               tooltip="Upload"\n               tooltip-placement="right">\n              <span class="glyphicon glyphicon-upload"></span>\n            </a>\n          </div>\n\n          <!-- object variable -->\n          <div ng-if="isObject(variable) && !variable.errorMessage">\n            <a class="text-muted"\n               ng-click="openInspectDialog(variable)"\n               href\n               tooltip="Click to Inspect"\n               tooltip-placement="right">\n              {{ variable.valueInfo.objectTypeName }}\n            </a>\n          </div>\n\n          <form class="inline-edit"\n                name="editVariableForm"\n                ng-if="variable.inEditMode"\n                ng-submit="submit(variable, this.editVariableForm)"\n                novalidate\n                request-aware>\n\n            <fieldset>\n              <div variable="getCopy(variable.id)"\n                   inline-edit\n                   autofocus></div>\n            </fieldset>\n\n            <div class="inline-edit-footer">\n\n              <p class="invalid"\n                 ng-show="this.editVariableForm.editDateValue.$error.date">\n                Invalid date: The date should have the pattern \'yyyy-MM-ddTHH:mm:ss\'.\n              </p>\n\n              <p class="invalid"\n                 ng-show="this.editVariableForm.editIntegerValue.$error.numeric || this.editVariableForm.editFloatValue.$error.numeric">\n                Invalid value: Only a {{ getCopy(variable.id).type }} value is allowed.\n              </p>\n\n              <p class="invalid"\n                 ng-show="getExceptionForVariableId(variable.id)">\n                The passed value could not be stored, see error message: {{ getExceptionForVariableId(variable.id).message }}.\n              </p>\n\n              <div class="btn-group">\n                <button type="submit"\n                        class="btn btn-sm btn-primary"\n                        ng-disabled="!isValid(this.editVariableForm)">\n                  <span class="glyphicon glyphicon-ok"></span>\n                </button>\n                <button type="button"\n                        class="btn btn-sm btn-default"\n                        ng-click="closeInPlaceEditing(variable)">\n                  <span class="glyphicon glyphicon-ban-circle"></span>\n                </button>\n              </div>\n            </div>\n\n          </form>\n        </td>\n\n        <td class="variable-type">\n          <select ng-show="variable.inEditMode"\n                  name="variableType"\n                  ng-options="variableType for variableType in variableTypes"\n                  ng-model="getCopy(variable.id).type"\n                  class="form-control select-variable-type">\n          </select>\n          <span ng-hide="variable.inEditMode">{{ variable.type }}</span>\n        </td>\n\n        <td class="variable-scope">\n          <a cam-select-activity-instance="variable.instance.id"\n             ng-href="#/process-instance/{{ processInstance.id }}?detailsTab=variables-tab&amp;activityInstanceIds={{ variable.instance.id }}"\n             title="{{ variable.instance.id }}">\n            {{ variable.instance.name }}\n          </a>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n\n  <pagination ng-if="pages.total > pages.size"\n              class="pagination-sm"\n\n              page="pages.current"\n              ng-model="pages.current"\n\n              total-items="pages.total"\n              items-per-page="pages.size"\n\n              max-size="7"\n              boundary-links="true"></pagination>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/variable-instances-tab.html -->\n'
}), define("base/app/views/processInstance/variableInstancesTab", ["angular", "text!./variable-instance-upload-dialog.html", "text!./variable-instance-inspect-dialog.html", "text!./variable-instances-tab.html"], function (e, n, t, s) {
  "use strict";
  return function (a) {
    a.controller("VariableInstancesController", ["$scope", "$http", "search", "Uri", "LocalExecutionVariableResource", "Notifications", "$modal", function (s, a, i, c, o, r, l) {
      function d(n, t) {
        h = s.filter = e.copy(n), delete h.page, delete h.activityIds, delete h.scrollToBpmnElement;
        var i = m.current, o = m.size, r = (i - 1) * o, l = {processInstanceIdIn: [g.id]}, d = {
          firstResult: r,
          maxResults: o,
          deserializeValues: !1
        }, b = e.extend({}, h, l);
        b.activityInstanceIdIn = b.activityInstanceIds, delete b.activityInstanceIds, s.variables = null, s.loadingState = "LOADING", a.post(c.appUri("engine://engine/:engine/variable-instance/count"), b).success(function (e) {
          m.total = e.count
        }), p = {}, u = {}, a.post(c.appUri("engine://engine/:engine/variable-instance/"), b, {params: d}).success(function (n) {
          e.forEach(n, function (n) {
            var s = t[n.activityInstanceId];
            n.instance = s, u[n.id] = e.copy(n)
          }), s.variables = n, s.loadingState = n.length ? "LOADED" : "EMPTY"
        })
      }

      var p, u, b = s.processData.newChild(s), g = s.processInstance;
      s.variableTypes = ["String", "Boolean", "Short", "Integer", "Long", "Double", "Date"];
      var f = {size: 50, total: 0, current: 1}, m = s.pages = e.copy(f), h = null;
      s.$watch("pages.current", function (e, n) {
        e != n && i("page", e && 1 != e ? e : null)
      }), b.observe(["filter", "instanceIdToInstanceMap"], function (e, n) {
        m.current = e.page || 1, d(e, n)
      }), s.editVariable = function (e) {
        e.inEditMode = !0
      }, s.closeInPlaceEditing = function (e) {
        delete e.inEditMode, p[e.id] = null;
        var n = s.getCopy(e.id);
        n.value = e.value, n.type = e.type
      };
      var v = s.isValid = function (e) {
        return !e.$invalid
      };
      s.submit = function (n, t) {
        if (v(t)) {
          var a = s.getCopy(n.id).value, i = s.getCopy(n.id).type;
          if (a === n.value && i === n.type)return void s.closeInPlaceEditing(n);
          var c = {}, l = {value: a, type: i};
          c[n.name] = l, o.updateVariables({executionId: n.executionId}, {modifications: c}).$promise.then(function () {
            r.addMessage({
              status: "Variable",
              message: "The variable '" + n.name + "' has been changed successfully.",
              duration: 5e3
            }), e.extend(n, l), s.closeInPlaceEditing(n)
          }, function (e) {
            r.addError({
              status: "Variable",
              message: "The variable '" + n.name + "' could not be changed successfully.",
              exclusive: !0,
              duration: 5e3
            }), p[n.id] = e.data
          })
        }
      }, s.getExceptionForVariableId = function (e) {
        return p[e]
      }, s.getCopy = function (e) {
        var n = u[e];
        return T(n) && (n.type = "String"), n
      };
      {
        var y = s.isBoolean = function (e) {
          return "boolean" === e.type || "Boolean" === e.type
        }, I = s.isInteger = function (e) {
          return "integer" === e.type || "Integer" === e.type
        }, w = s.isShort = function (e) {
          return "short" === e.type || "Short" === e.type
        }, D = s.isLong = function (e) {
          return "long" === e.type || "Long" === e.type
        }, S = s.isDouble = function (e) {
          return "double" === e.type || "Double" === e.type
        }, C = s.isFloat = function (e) {
          return "float" === e.type || "Float" === e.type
        }, x = s.isString = function (e) {
          return "string" === e.type || "String" === e.type
        }, P = s.isDate = function (e) {
          return "date" === e.type || "Date" === e.type
        }, T = s.isNull = function (e) {
          return "null" === e.type || "Null" === e.type
        }, E = s.isBinary = function (e) {
          return "bytes" === e.type || "Bytes" === e.type
        }, k = s.isObject = function (e) {
          return "object" === e.type || "Object" === e.type
        };
        s.isPrimitive = function (e) {
          return I(e) || w(e) || D(e) || S(e) || C(e) || x(e) || P(e) || y(e) || T(e)
        }
      }
      s.isEditable = function (e) {
        return !k(e) && !E(e)
      }, s.isDateValueValid = function () {
      }, s.getBinaryVariableDownloadLink = function (e) {
        return c.appUri("engine://engine/:engine/variable-instance/" + e.id + "/data")
      }, s.openUploadDialog = function (e) {
        l.open({
          resolve: {
            variableInstance: function () {
              return e
            }
          }, controller: "VariableInstanceUploadController", template: n
        })
      }, s.openInspectDialog = function (n) {
        l.open({
          resolve: {
            variableInstance: function () {
              return n
            }
          }, controller: "VariableInstanceInspectController", template: t
        }).result.then(function () {
          b.set("filter", e.copy(s.filter))
        })
      }
    }]);
    var i = function (e) {
      e.registerDefaultView("cockpit.processInstance.runtime.tab", {
        id: "variables-tab",
        label: "Variables",
        template: s,
        controller: "VariableInstancesController",
        priority: 20
      })
    };
    i.$inject = ["ViewsProvider"], a.config(i)
  }
}), define("base/app/views/processInstance/variableInstanceUploadDialog", [], function () {
  "use strict";
  return ["$scope", "$location", "Notifications", "$modalInstance", "Uri", "variableInstance", function (e, n, t, s, a, i) {
    var c = "beforeUpload", o = "performUpload", r = "uploadSuccess", l = "uploadFailed";
    e.variableInstance = i, e.status = c, e.upload = function () {
      function n(n) {
        e.$apply(function () {
          e.status = o, n.lengthComputable && (e.progress = Math.round(100 * n.loaded / n.total))
        })
      }

      function s() {
        e.$apply(function () {
          e.status = r, t.addMessage({status: "Success", message: "File upload successfull."})
        })
      }

      function a() {
        e.$apply(function () {
          e.status = l, t.addError({status: "Failed", message: "File upload failed.", exclusive: ["type"]})
        })
      }

      var i = new FormData;
      i.append("data", e.file);
      var c = new XMLHttpRequest;
      c.upload.addEventListener("progress", n, !1), c.addEventListener("load", s, !1), c.addEventListener("error", a, !1), c.addEventListener("abort", a, !1), c.open("POST", e.getVariableUploadUrl()), c.send(i)
    }, e.setFile = function (n) {
      e.file = n.files[0]
    }, e.getVariableUploadUrl = function () {
      return a.appUri("engine://engine/:engine/execution/" + i.executionId + "/localVariables/" + i.name + "/data")
    }, e.$on("$routeChangeStart", function () {
      s.close(e.status)
    }), e.close = function (e) {
      s.close(e)
    }
  }]
}), define("base/app/views/processInstance/variableInstanceInspectDialog", ["angular"], function (e) {
  "use strict";
  return ["$scope", "$location", "$http", "Notifications", "$modalInstance", "Uri", "variableInstance", function (n, t, s, a, i, c, o) {
    function r() {
      var e = n.xhr;
      n.$apply(function () {
        204 == e.status ? (n.status = p, a.addMessage({
          status: "Success",
          message: "Successfully updated the variable."
        })) : (n.status = l, a.addError({
          status: "Failed",
          message: "Could not update variable: " + e.responseText,
          exclusive: ["type"]
        })), delete n.xhr
      })
    }

    var l = "beforeChange", d = "confirmChange", p = "changeSuccess";
    n.selectedTab = "serialized", n.variableInstance = o, n.status = l, n.initialValue = o.value, n.objectType = o.valueInfo.objectTypeName, n.dataFormat = o.valueInfo.serializationDataFormat, n.initialValueDeserialized = null, n.deserializationError = null, n.currentValue = e.copy(n.initialValue), n.currentValueDeserialized = null, n.confirmed = !1, n.typeIn = function (e, t) {
      "serialized" === t ? n.currentValue = e.currentValue : n.currentValueDeserialized = e.currentValueDeserialized, n.status = n.hasChanged(t) ? d : l
    }, n.hasChanged = function (e) {
      return "serialized" === e ? n.initialValue != n.currentValue : n.initialValueDeserialized != n.currentValueDeserialized
    }, n.change = function () {
      if (n.status == l)n.status = d; else {
        var e, t = !1;
        if ("serialized" === n.selectedTab ? e = n.currentValue : (e = n.currentValueDeserialized, t = !0), "application/json" === n.dataFormat || t)try {
          JSON.parse(e)
        } catch (i) {
          return n.status = l, void a.addError({
            status: "Variable",
            message: "Could not parse JSON input: " + i,
            exclusive: !0
          })
        }
        if (t) {
          var c = new FormData;
          c.append("data", new Blob([n.currentValueDeserialized], {type: "application/json"})), c.append("type", o.valueInfo.objectTypeName);
          var u = n.xhr = new XMLHttpRequest;
          u.addEventListener("load", function () {
            r(e)
          }, !1), u.open("POST", n.getSerializableVariableUploadUrl()), u.send(c)
        } else {
          var b = {type: o.type, value: e, valueInfo: o.valueInfo};
          s({method: "PUT", url: n.getObjectVariablePutUrl(), data: b}).success(function () {
            n.status = p, a.addMessage({status: "Success", message: "Successfully updated the variable."})
          }).error(function (e) {
            n.status = l, a.addError({
              status: "Failed",
              message: "Could not update variable: " + e,
              exclusive: ["type"]
            })
          })
        }
      }
    }, s({method: "GET", url: c.appUri("engine://engine/:engine/variable-instance/" + o.id)}).success(function (t) {
      t.errorMessage ? n.deserializationError = t.errorMessage : (n.initialValueDeserialized = JSON.stringify(t.value), n.currentValueDeserialized = e.copy(n.initialValueDeserialized))
    }).error(function (e) {
      $scpe.deserializedValue = e
    }), n.selectTab = function (t) {
      n.selectedTab = t, n.currentValue = e.copy(n.initialValue), n.currentValueDeserialized = e.copy(n.initialValueDeserialized), n.status = l
    }, n.getSerializableVariableUploadUrl = function () {
      return c.appUri("engine://engine/:engine/execution/" + o.executionId + "/localVariables/" + o.name + "/data")
    }, n.getObjectVariablePutUrl = function () {
      return c.appUri("engine://engine/:engine/execution/" + o.executionId + "/localVariables/" + o.name)
    }, n.$on("$routeChangeStart", function () {
      i.dismiss()
    })
  }]
}), define("text!base/app/views/processInstance/incidents-tab.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/incidents-tab.html -->\n<div cam-widget-loader\n     loading-state="{{ loadingState }}"\n     text-empty="No incidents">\n  <table class="incidents-tab cam-table">\n    <thead>\n      <tr>\n        <th class="message">Message</th>\n        <th class="timestamp">Timestamp</th>\n        <th class="activity">Activity</th>\n        <th class="cause instance-id uuid">Cause Process Instance Id</th>\n        <th class="cause-root instance-id uuid">Root Cause Process Instance Id</th>\n        <th class="type">Type</th>\n        <th class="action">Action</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr ng-repeat="incident in incidents">\n        <td class="message">\n          <span ng-show="incident.incidentType === \'failedJob\'">\n            <a href="{{ getJobStacktraceUrl(incident) }}"\n               target="_blank"\n               ng-show="incident.rootCauseIncidentMessage"\n               tooltip="Open stacktrace in new window"\n               tooltip-placement="top">\n              {{ incident.rootCauseIncidentMessage }}\n            </a>\n            <a href="{{ getJobStacktraceUrl(incident) }}"\n               target="_blank"\n               ng-hide="incident.rootCauseIncidentMessage"\n               tooltip="Open stacktrace in new window"\n               tooltip-placement="top">\n              <i>Message is null.</i>\n            </a>\n          </span>\n\n          <span ng-hide="incident.incidentType === \'failedJob\'">\n            <span ng-show="incident.rootCauseIncidentMessage">{{ incident.rootCauseIncidentMessage }}</span>\n            <span ng-hide="incident.rootCauseIncidentMessage"><i>Message is null.</i></span>\n          </span>\n        </td>\n\n        <td class="timestamp">\n          {{ incident.incidentTimestamp }}\n        </td>\n\n        <td class="activity">\n          <span ng-show="incident.linkable">\n            <a cam-select-activity="incident.activityId"\n               ng-href="#/process-instance/{{ processInstance.id }}?activityIds={{ incident.activityId }}&amp;detailsTab=incidents-tab">\n              {{ incident.activityName }}\n            </a>\n          </span>\n          <span ng-hide="incident.linkable">\n            {{ incident.activityName }}\n          </span>\n        </td>\n\n        <td class="cause instance-id uuid">\n          <span ng-show="incident.causeIncidentProcessInstanceId !== incident.processInstanceId" >\n            <a href="#/process-instance/{{incident.causeIncidentProcessInstanceId}}?activityIds={{ incident.causeIncidentActivityId }}&amp;detailsTab=incidents-tab">\n              {{ incident.causeIncidentProcessInstanceId }}\n            </a>\n          </span>\n        </td>\n\n        <td class="cause-root instance-id uuid">\n          <span ng-show="incident.rootCauseIncidentProcessInstanceId !== incident.processInstanceId" >\n            <a href="#/process-instance/{{incident.rootCauseIncidentProcessInstanceId}}?activityIds={{ incident.rootCauseIncidentActivityId }}&amp;detailsTab=incidents-tab">\n              {{ incident.rootCauseIncidentProcessInstanceId }}\n            </a>\n          </span>\n        </td>\n\n        <td class="type">\n          {{ getIncidentType(incident) }}\n        </td>\n\n        <td class="action">\n          <a class="btn btn-default action-button"\n             ng-click="openJobRetryDialog(incident)"\n             ng-show="incident.incidentType === \'failedJob\' && incident.configuration"\n             tooltip="Increment Number of Retries of Failed Job"\n             tooltip-placement="left">\n            <span class="glyphicon glyphicon-repeat"></span>\n          </a>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n\n\n  <pagination ng-if="pages.total > pages.size"\n              class="pagination-sm"\n\n              page="pages.current"\n              ng-model="pages.current"\n\n              total-items="pages.total"\n              items-per-page="pages.size"\n\n              max-size="7"\n              boundary-links="true"></pagination>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/incidents-tab.html -->\n'
}), define("text!base/app/views/processInstance/job-retry-dialog.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/job-retry-dialog.html -->\n<div class="modal-header">\n  <h3>Increment Number of Retries</h3>\n</div>\n\n<div class="job-retry modal-body">\n  <div notifications-panel></div>\n\n  <div ng-hide="status === \'finished\' || status === \'failed\'">\n    <p>The number of retries of the corresponding failed job of the selected incident will be incremented.</p>\n    <p>Are you sure to increment the number of retries?</p>\n  </div>\n\n  <div ng-show="status === \'finished\'">\n    The number of retries of the corresponding failed job of the selected incident has been incremented successfully.\n  </div>\n\n  <div ng-show="status === \'failed\'">\n    The number of retries of the corresponding failed job of the selected incident could not be incremented successfully.\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="close(status)"\n          ng-disabled="status === \'performing\'"\n          ng-hide="status === \'finished\' || status === \'failed\'">\n    Close\n  </button>\n\n  <button type="submit"\n          class="btn btn-primary"\n          ng-click="incrementRetry()"\n          ng-hide="status === \'finished\' || status === \'failed\'"\n          ng-disabled="status === \'performing\'">\n    Retry\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close(status)"\n          ng-show="status === \'finished\' || status === \'failed\'">\n    OK\n  </button>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/job-retry-dialog.html -->\n'
}), define("base/app/views/processInstance/incidentsTab", ["angular", "text!./incidents-tab.html", "text!./job-retry-dialog.html"], function (e, n, t) {
  "use strict";
  var s = function (s) {
    s.registerDefaultView("cockpit.processInstance.runtime.tab", {
      id: "incidents-tab",
      label: "Incidents",
      template: n,
      controller: ["$scope", "$http", "$modal", "search", "Uri", function (n, s, a, i, c) {
        function o(t, a, i) {
          u = e.copy(t), delete u.page, delete u.activityInstanceIds, delete u.scrollToBpmnElement;
          var o = p.current, r = p.size, d = (o - 1) * r, b = {processInstanceIdIn: [l.id]}, g = {
            firstResult: d,
            maxResults: r
          }, f = e.extend({}, u, b);
          f.activityIdIn = f.activityIds, delete f.activityIds, n.incidents = null, s.post(c.appUri("plugin://base/:engine/incident/count"), f).success(function (e) {
            p.total = e.count
          }), n.loadingState = "LOADING", s.post(c.appUri("plugin://base/:engine/incident"), f, {params: g}).success(function (t) {
            e.forEach(t, function (e) {
              var n = e.activityId, t = a[n];
              e.activityName = t && (t.name || t.id) || n, e.linkable = a[n] && i[n] && i[n].length > 0
            }), n.incidents = t, n.loadingState = t.length ? "LOADED" : "EMPTY"
          })
        }

        var r = n.processData.newChild(n), l = n.processInstance, d = {
          size: 50,
          total: 0,
          current: 1
        }, p = n.pages = e.copy(d), u = null;
        n.$watch("pages.current", function (e, n) {
          e != n && i("page", e && 1 != e ? e : null)
        }), r.observe(["filter", "bpmnElements", "activityIdToInstancesMap"], function (e, n, t) {
          p.current = e.page || 1, o(e, n, t)
        }), n.getIncidentType = function (e) {
          return "failedJob" === e.incidentType ? "Failed Job" : e.incidentType
        }, n.getJobStacktraceUrl = function (e) {
          return c.appUri("engine://engine/:engine/job/" + e.rootCauseIncidentConfiguration + "/stacktrace")
        }, n.openJobRetryDialog = function (s) {
          var i = a.open({
            resolve: {
              incident: function () {
                return s
              }
            }, controller: "JobRetryController", template: t
          });
          i.result.then(function (t) {
            "finished" === t && n.processData.set("filter", e.extend({}, n.filter))
          })
        }
      }],
      priority: 15
    })
  };
  return s.$inject = ["ViewsProvider"], s
}), define("text!base/app/views/processInstance/called-process-instance-table.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/called-process-instance-table.html -->\n<div cam-widget-loader\n     loading-state="{{ loadingState }}"\n     text-empty="No called process instances">\n  <table class="called-process-instance cam-table">\n    <thead>\n      <tr>\n        <th class="called-process-instance uuid">Called Process Instance</th>\n        <th class="process-definition">Process Definition</th>\n        <th class="activity">Activity</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr ng-repeat="calledProcessInstance in calledProcessInstances">\n        <td class="called-process-instance uuid">\n          <a href="#/process-instance/{{ calledProcessInstance.id }}">\n            {{ calledProcessInstance.id }}\n          </a>\n        </td>\n\n        <td class="process-definition">\n          <a href="#/process-definition/{{ calledProcessInstance.processDefinitionId }}?parentProcessDefinitionId={{ processInstance.definitionId }}">\n            {{ calledProcessInstance.processDefinitionName }}\n          </a>\n        </td>\n\n        <td class="activity">\n          <a cam-select-activity-instance="calledProcessInstance.instance.id"\n             ng-href="#/process-instance/{{ processInstance.id }}?detailsTab=called-process-instances-tab&activityInstanceIds={{ calledProcessInstance.instance.id }}">\n            {{ calledProcessInstance.instance.name }}\n          <a>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/called-process-instance-table.html -->\n'
}), define("base/app/views/processInstance/calledProcessInstanceTable", ["angular", "text!./called-process-instance-table.html"], function (e, n) {
  "use strict";
  return function (t) {
    t.controller("CalledProcessInstanceController", ["$scope", "PluginProcessInstanceResource", function (n, t) {
      function s(s, a) {
        i = e.copy(s), delete i.page, delete i.activityIds, delete i.scrollToBpmnElement, i.activityInstanceIdIn = i.activityInstanceIds, delete i.activityInstanceIds, n.calledProcessInstances = null, n.loadingState = "LOADING", t.processInstances({id: n.processInstance.id}, i).$promise.then(function (t) {
          e.forEach(t, function (e) {
            var n = a[e.callActivityInstanceId];
            e.instance = n
          }), n.loadingState = t.length ? "LOADED" : "EMPTY", n.calledProcessInstances = t
        })
      }

      var a = n.processData.newChild(n), i = null;
      a.observe(["filter", "instanceIdToInstanceMap"], function (e, n) {
        s(e, n)
      })
    }]);
    var s = function (e) {
      e.registerDefaultView("cockpit.processInstance.runtime.tab", {
        id: "called-process-instances-tab",
        label: "Called Process Instances",
        template: n,
        controller: "CalledProcessInstanceController",
        priority: 10
      })
    };
    s.$inject = ["ViewsProvider"], t.config(s)
  }
}), define("text!base/app/views/processInstance/identity-links-modal.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/identity-links-modal.html -->\n<div class="modal-header">\n  <h3>{{ title }}</h3>\n</div>\n\n<div class="identity-links modal-body">\n  <div notifications-panel></div>\n\n  <form name="editForm"\n        ng-submit="addFormItem()">\n    <fieldset ng-show="groups.length">\n      <legend>Current group(s)</legend>\n\n      <table class="table cam-table">\n        <thead>\n          <tr>\n            <th class="group-id">Group ID</th>\n            <th class="action text-right">Action</th>\n          </tr>\n        </thead>\n\n        <tbody>\n          <tr ng-repeat="(delta, group) in groups">\n            <td class="group-id">{{ group.groupId }}</td>\n            <td class="action text-right">\n              <span class="btn btn-default action-button"\n                    ng-click="removeItem()">\n                <span class="glyphicon glyphicon-ban-circle"></span>\n              </span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </fieldset>\n\n    <fieldset>\n      <legend>Add a group</legend>\n\n      <div class="input-group">\n        <input class="form-control"\n               type="text"\n               ng-model="newItem"\n               name="newItem"\n               required />\n        <span class="btn btn-primary input-group-addon"\n              ng-click="addItem()"\n              ng-disabled="invalid()">\n          <span class="glyphicon glyphicon-plus"></span>\n        </span>\n      </div>\n    </fieldset>\n  </form>\n</div>\n\n<div class="modal-footer">\n  <button ng-repeat="btn in buttons"\n          ng-click="close(btn.result)"\n          class="btn btn-default"\n          ng-class="btn.cssClass">\n    {{ btn.label }}\n  </button>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/identity-links-modal.html -->\n'
}), define("text!base/app/views/processInstance/user-tasks-table.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/user-tasks-table.html -->\n<div cam-widget-loader\n     loading-state="{{ loadingState }}"\n     text-empty="No user tasks">\n  <table class="process-instance user-tasks cam-table">\n    <thead>\n      <tr>\n        <th class="activity uuid">Activity</th>\n        <th class="assignee">Assignee</th>\n        <th class="owner">Owner</th>\n        <th class="created">Creation Date</th>\n        <th class="due">Due Date</th>\n        <th class="follow-up">Follow Up Date</th>\n        <th class="priority">Priority</th>\n        <th class="delegation-state">Delegation State</th>\n        <th class="task-id uuid">Task ID</th>\n        <th class="action">Action</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr ng-repeat="userTask in userTasks">\n        <td class="activity">\n          <a cam-select-activity-instance="userTask.instance.id"\n             ng-href="{{ getHref(userTask) }}">{{ userTask.instance.name || userTask.instance.id }}</a>\n        </td>\n\n        <td class="assignee">\n          <cam-in-place-text-field\n            submit="submitAssigneeChange"\n            context="userTask"\n            property="assignee" />\n        </td>\n\n        <td class="owner">\n          {{ userTask.owner }}\n        </td>\n\n        <td class="created">\n          {{ userTask.created }}\n        </td>\n        <td class="due">\n          {{ userTask.due }}\n        </td>\n        <td class="follow-up">\n          {{ userTask.followUp }}\n        </td>\n        <td class="priority">\n          {{ userTask.priority }}\n        </td>\n        <td class="delegation-state">\n          {{ userTask.delegationState }}\n        </td>\n        <td class="task-id uuid">\n          {{ userTask.id }}\n        </td>\n\n        <td class="action">\n          <a ng-click="changeGroups()"\n             ng-model="userTask"\n             class="btn btn-default action-button"\n             tooltip-placement="left"\n             tooltip="Manage group(s) for \'{{ userTask.name || userTask.id }}\'">\n            <span class="glyphicon glyphicon-user"></span>\n          </a>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n\n\n  <pagination ng-if="pages.total > pages.size"\n              class="pagination-sm"\n\n              page="pages.current"\n              ng-model="pages.current"\n\n              total-items="pages.total"\n              items-per-page="pages.size"\n\n              max-size="7"\n              boundary-links="true"></pagination>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/user-tasks-table.html -->\n'
}), define("base/app/views/processInstance/userTasksTable", ["angular", "text!./identity-links-modal.html", "text!./user-tasks-table.html"], function (e, n, t) {
  "use strict";
  return function (s) {
    function a(n, t) {
      var s = [];
      return e.forEach(n, function (e, n) {
        s[n] = t(e, n)
      }), s
    }

    function i(n) {
      var t = [];
      return e.forEach(n, function (e) {
        e && t.push(e)
      }), t
    }

    function c(n) {
      return e.isFunction(n) ? n : e.noop
    }

    s.controller("UserTaskController", ["$scope", "search", "TaskResource", "Notifications", "$modal", function (t, s, o, r, l) {
      function d(n, s) {
        h = e.copy(n), delete h.page, delete h.activityIds, delete h.scrollToBpmnElement;
        var a = m.current, i = m.size, c = (a - 1) * i, r = {
          processInstanceId: g.id,
          processDefinitionId: g.definitionId
        }, l = {firstResult: c, maxResults: i}, d = e.extend({}, h, r);
        d.activityInstanceIdIn = d.activityInstanceIds, delete d.activityInstanceIds, t.userTasks = null, t.loadingState = "LOADING", p = {}, u = {}, o.count(d).$promise.then(function (e) {
          m.total = e.count
        }), o.query(l, d).$promise.then(function (n) {
          for (var a, i = 0; a = n[i]; i++)a.instance = s[a.executionId], u[a.id] = e.copy(a);
          t.userTasks = n, t.loadingState = n.length ? "LOADED" : "EMPTY"
        })
      }

      var p, u, b = t.processData.newChild(t), g = t.processInstance, f = {
        size: 50,
        total: 0,
        current: 1
      }, m = t.pages = e.copy(f), h = null;
      t.$watch("pages.current", function (e, n) {
        e != n && s("page", e && 1 != e ? e : null)
      }), b.observe(["filter", "executionIdToInstanceMap"], function (e, n) {
        m.current = e.page || 1, d(e, n)
      }), t.getHref = function (e) {
        return "#/process-instance/" + g.id + "?detailsTab=user-tasks-tab&activityInstanceIds=" + e.instance.id
      }, t.submitAssigneeChange = function (e, n) {
        n = c(n);
        var t = e.context, s = u[t.id], a = {id: t.id}, i = {userId: e.value};
        o.setAssignee(a, i).$promise.then(function (e) {
          s.assignee = t.assignee = e.userId, r.addMessage({
            status: "Assignee",
            message: "The assignee of the user task '" + t.instance.name + "' has been set to '" + s.assignee + "' successfully.",
            duration: 5e3
          }), n()
        }, function (e) {
          var a = {
            status: "Assignee",
            message: "The assignee of the user task '" + t.instance.name + "' could not be set to '" + t.assignee + "'. " + e.data.message,
            exclusive: !0
          };
          t.assignee = s.assignee, r.addError(a), p[t.id] = e.data, n(a)
        })
      }, t.openDialog = function (e, t) {
        l.open({
          resolve: {
            userTask: function () {
              return e
            }, groups: function () {
              return t
            }
          }, controller: "UserTaskGroupController", template: n
        })
      }, t.changeGroups = function () {
        var e = this.userTask;
        o.getIdentityLinks({id: e.id}, {}).$promise.then(function (n) {
          var s = i(a(n, function (e) {
            var n = e.groupId && "assignee" !== e.type && "owner" !== e.type;
            return n ? e : null
          }));
          t.openDialog(e, s)
        })
      }, t.getExceptionForUserTask = function (e) {
        return p[e.id]
      }
    }]), s.controller("UserTaskGroupController", ["$modalInstance", "TaskResource", "$scope", "Notifications", "userTask", "groups", function (n, t, s, c, o, r) {
      s.groups = r, s.title = "Manage groups", s.labelKey = "groupId", s.buttons = [{
        cssClass: "btn",
        label: "Close"
      }], s.removeItem = function () {
        var n = this.delta;
        t.deleteIdentityLink({id: o.id}, e.toJson(this.group)).$promise.then(function () {
          s.groups = i(a(s.groups, function (e, t) {
            return n !== t ? e : !1
          }))
        }, function (e) {
          c.addError({status: "Could not remove group", message: e.data.message, exclusive: !0})
        })
      }, s.invalid = function () {
        var n = this.editForm;
        if (n.$invalid)return !0;
        var t, a = n.newItem.$modelValue;
        return e.forEach(s.groups, function (e) {
          t = t || e.groupId === a
        }), t
      }, s.addItem = function () {
        var e = this, n = {type: "candidate", groupId: e.newItem};
        t.addIdentityLink({id: o.id}, n).$promise.then(function () {
          s.groups.push(n), e.newItem = ""
        }, function (e) {
          c.addError({status: "Could not add group", message: e.data.message, exclusive: !0})
        })
      }, s.close = n.close
    }]);
    var o = function (e) {
      e.registerDefaultView("cockpit.processInstance.runtime.tab", {
        id: "user-tasks-tab",
        label: "User Tasks",
        template: t,
        controller: "UserTaskController",
        priority: 5
      })
    };
    o.$inject = ["ViewsProvider"], s.config(o)
  }
}), define("text!base/app/views/processInstance/job-retry-bulk-dialog.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/job-retry-bulk-dialog.html -->\n<div class="modal-header">\n  <h3>Increment Number of Retries</h3>\n</div>\n\n<div class="job-retry-bulk modal-body">\n  <div notifications-panel></div>\n\n  <form name="selectFailedJobsForm"\n        ng-hide="status === \'finished\' || status === \'performing\'">\n    <fieldset>\n      <p>Select one of the following failed jobs to increment their number of retries:</p>\n      <div cam-widget-loader\n           loading-state="{{ loadingState }}"\n           text-empty="There are no failed jobs available to increment their retries.">\n        <table class="cam-table">\n          <thead>\n            <tr>\n              <th class="row-select">\n                <input type="checkbox"\n                       title="Select all"\n                       ng-model="allJobsSelected"\n                       ng-change="selectAllJobs(allJobsSelected)">\n              </th>\n              <th class="job-id uuid">ID</th>\n              <th class="scope">Scope</th>\n              <th class="exception">Exception</th>\n            </tr>\n          </thead>\n\n          <tbody>\n            <tr ng-repeat="job in failedJobs">\n              <td class="row-select">\n                <input type="checkbox"\n                       ng-model="job.selected"\n                       ng-change="selectFailedJob(job)">\n              </td>\n\n              <td class="job-id uuid">{{ job.id }}</td>\n\n              <td class="scope">{{ job.instance.name }}</td>\n\n              <td class="exception">{{ job.exceptionMessage }}</td>\n            </tr>\n          </tbody>\n        </table>\n\n\n        <pagination ng-if="jobPages.total > jobPages.size"\n                    class="pagination-sm"\n\n                    page="jobPages.current"\n                    ng-model="jobPages.current"\n\n                    total-items="jobPages.total"\n                    items-per-page="jobPages.size"\n\n                    max-size="7"\n                    boundary-links="true"></pagination>\n      </div>\n    </fieldset>\n  </form>\n\n  <div ng-show="status === \'finished\' || status === \'performing\'">\n\n    <table class="cam-table">\n      <thead>\n        <tr>\n          <th class="job-id uuid">ID</th>\n          <th class="scope">Scope</th>\n          <th class="status">Status</th>\n        </tr>\n      </thead>\n\n      <tbody>\n        <tr ng-repeat="job in showJobsRetried">\n          <td class="job-id uuid">{{ job.id }}</td>\n\n          <td class="scope">{{ job.instance.name }}</td>\n\n          <td class="status">\n            <span ng-show="job.status && job.status === \'performing\'">\n              <span class="glyphicon glyphicon-loading"></span>\n            </span>\n            <span ng-show="job.status && job.status === \'successful\'">\n              <span class="glyphicon glyphicon-ok"></span>&nbsp;Successful\n            </span>\n            <span ng-show="job.status && job.status === \'failed\'">\n              <span class="glyphicon glyphicon-remove"></span>&nbsp;Failed\n            </span>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n\n\n    <pagination ng-if="summarizePages.total > summarizePages.size"\n                class="pagination-sm"\n\n                page="summarizePages.current"\n                ng-model="summarizePages.current"\n\n                total-items="summarizePages.total"\n                items-per-page="summarizePages.size"\n\n                max-size="7"\n                boundary-links="true"></pagination>\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="close()"\n          ng-hide="status === \'finished\' || status === \'performing\'">\n    Close\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="retryFailedJobs(selectedFailedJobIds)"\n          ng-disabled="!failedJobs || !failedJobs.length || !selectedFailedJobIds.length"\n          ng-hide="status === \'finished\' || status === \'performing\'">\n    Retry\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close()"\n          ng-disabled="status === \'performing\'"\n          ng-show="status === \'performing\' || status === \'finished\'">\n    OK\n  </button>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/job-retry-bulk-dialog.html -->\n'
}), define("text!base/app/views/processInstance/job-retry-bulk-action.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/job-retry-bulk-action.html -->\n<a class="btn btn-default btn-toolbar"\n   href\n   ng-click="openDialog()"\n   tooltip="Increment Number of Retries of Failed Jobs"\n   tooltip-placement="left">\n  <span class="glyphicon glyphicon-repeat"></span>\n</a>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/job-retry-bulk-action.html -->\n'
}), define("base/app/views/processInstance/jobRetryBulkAction", ["text!./job-retry-bulk-dialog.html", "text!./job-retry-bulk-action.html"], function (e, n) {
  "use strict";
  return function (t) {
    t.controller("JobRetryActionController", ["$scope", "$modal", function (n, t) {
      n.openDialog = function () {
        t.open({
          resolve: {
            processData: function () {
              return n.processData
            }, processInstance: function () {
              return n.processInstance
            }
          }, controller: "JobRetriesController", template: e
        })
      }
    }]);
    var s = function (e) {
      e.registerDefaultView("cockpit.processInstance.runtime.action", {
        id: "job-retry-action",
        label: "Job Retry Action",
        template: n,
        controller: "JobRetryActionController",
        priority: 15
      })
    };
    s.$inject = ["ViewsProvider"], t.config(s)
  }
}), define("base/app/views/processInstance/jobRetryBulkDialog", ["angular"], function (e) {
  "use strict";
  return ["$scope", "$q", "Notifications", "JobResource", "$modalInstance", "processData", "processInstance", function (n, t, s, a, i, c, o) {
    function r(e) {
      n.failedJobs = null, n.allJobsSelected = !1, n.loadingState = "LOADING";
      var t = u.size, s = (e - 1) * t;
      a.query({firstResult: s, maxResults: t}, {
        processInstanceId: o.id,
        withException: !0,
        noRetriesLeft: !0
      }).$promise.then(function (e) {
        for (var t, s = 0; t = e[s]; s++) {
          g[t.id] = t;
          var a = D[t.executionId];
          t.instance = a;
          var i = f.indexOf(t.id);
          t.selected = -1 !== i
        }
        n.failedJobs = e, n.loadingState = e.length ? "LOADED" : "EMPTY"
      }), a.count({processInstanceId: o.id, withException: !0}).$promise.then(function (e) {
        u.total = e.count
      })
    }

    function l(e) {
      for (var t = b.size, s = (e - 1) * t, a = n.showJobsRetried = [], i = 0; t > i; i++) {
        var c = f[i + s], o = g[c];
        o && a.push(o)
      }
    }

    function d(e) {
      function n(e) {
        e.status = y, a.setRetries({id: e.id}, {retries: 1}, function () {
          e.status = I, c -= 1, 0 === c && i.resolve()
        }, function (n) {
          m = !0, e.status = w, e.retryError = n, h = !0, c -= 1, 0 === c && i.resolve()
        })
      }

      for (var s, i = t.defer(), c = e.length, o = 0; s = e[o]; o++) {
        var r = g[s];
        n(r)
      }
      return i.promise
    }

    var p = c.newChild(n), u = n.jobPages = {size: 5, total: 0}, b = n.summarizePages = {
      size: 5,
      total: 0
    }, g = {}, f = n.selectedFailedJobIds = [], m = !1, h = !1;
    n.allJobsSelected = !1;
    var v = "finished", y = "performing", I = "successful", w = "failed", D = p.observe("executionIdToInstanceMap", function (e) {
      D = e
    });
    n.$on("$routeChangeStart", function () {
      i.close(n.status)
    }), n.$watch("jobPages.current", function (e, n) {
      return e ? void(e !== n && (u.current = e, r(e))) : void(u.current = 1)
    }), n.$watch("summarizePages.current", function (e) {
      e && l(e)
    }), n.selectAllJobs = function (t) {
      e.forEach(n.failedJobs, function (e) {
        e.selected = t, S(e)
      })
    };
    var S = n.selectFailedJob = function (e) {
      var t = f.indexOf(e.id);
      return e.selected === !0 ? void(-1 === t && f.push(e.id)) : e.selected === !1 ? (f.splice(t, 1), void(n.allJobsSelected === !0 && (n.allJobsSelected = !1))) : void 0
    };
    n.retryFailedJobs = function (e) {
      n.status = y, b.total = e.length, b.current = 1, d(e).then(function () {
        m ? s.addError({
          status: "Finished",
          message: "Incrementing the number of retries finished with failures.",
          exclusive: !0
        }) : s.addMessage({
          status: "Finished",
          message: "Incrementing the number of retries finished.",
          exclusive: !0
        }), n.status = v
      })
    }, n.close = function (e) {
      i.close(e)
    }
  }]
}), define("base/app/views/processInstance/jobRetryDialog", [], function () {
  "use strict";
  return ["$scope", "$location", "Notifications", "JobResource", "$modalInstance", "incident", function (e, n, t, s, a, i) {
    var c = "finished", o = "performing", r = "failed";
    e.$on("$routeChangeStart", function () {
      a.close(e.status)
    }), e.incrementRetry = function () {
      e.status = o, s.setRetries({id: i.configuration}, {retries: 1}, function () {
        e.status = c, t.addMessage({
          status: "Finished",
          message: "Incrementing the number of retries finished successfully.",
          exclusive: !0
        })
      }, function (n) {
        e.status = r, t.addError({
          status: "Finished",
          message: "Incrementing the number of retries was not successful: " + n.data.message,
          exclusive: !0
        })
      })
    }, e.close = function (e) {
      a.close(e)
    }
  }]
}), define("text!base/app/views/processInstance/cancel-process-instance-dialog.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/cancel-process-instance-dialog.html -->\n<div class="modal-header">\n  <h3>Cancel Process Instance</h3>\n</div>\n\n<div class="cancel-process-instance modal-body">\n  <div notifications-panel></div>\n\n  <div ng-hide="status === \'cancellationSuccess\' || status === \'cancellationFailed\' || status === \'beforeCancellation\' || status === \'loadingFailed\'">\n    <span class="glyphicon glyphicon-loading"></span>\n    loading process instance information...\n  </div>\n\n  <p ng-show="status === \'loadingFailed\'">\n    It was not possible to get further process instance informations to be able to cancel this process instance. Refresh the current page by pressing F5 and try once again to cancel this process instance.\n  </p>\n\n  <div ng-show="status === \'beforeCancellation\'">\n    <div ng-show="subProcessInstances.length > 0">\n      <p>\n        If you cancel this process instance the following sub process instances will also be canceled:\n      </p>\n\n      <table class="table cam-table">\n        <thead>\n          <tr>\n            <th class="instance-id uuid">ID</th>\n          </tr>\n        </thead>\n\n        <tbody>\n          <tr ng-repeat="subProcessInstance in subProcessInstances">\n            <td class="instance-id uuid">\n              <a target="_blank"\n                 ng-href="#/process-instance/{{ subProcessInstance.id }}">\n                {{ subProcessInstance.id }}\n              </a>\n            </td>\n          </tr>\n\n          <tr>\n            <td ng-hide="subProcessInstances.length === subProcessInstancesCount">\n              and {{ subProcessInstancesCount - subProcessInstances.length }} other process instances.\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Do you really want to cancel this process instance?</p>\n  </div>\n\n  <div ng-show="status === \'cancellationSuccess\'">\n    <p>The process instance was canceled successfully.</p>\n    <p>After closing this dialog you will be redirected to the corresponding process definition overview.</p>\n  </div>\n\n  <div ng-show="status === \'cancellationFailed\'">\n    <p>The process instance could not be canceled successfully.</p>\n    <p>Maybe the process instance has already been cancelled or finished. Try to press F5 to refresh the page.</p>\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="close(status)"\n          ng-disabled="status === \'performCancellation\'"\n          ng-hide="status === \'cancellationSuccess\' || status === \'cancellationFailed\' || status === \'loadingFailed\'">\n    Close\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close(status)"\n          ng-show="status === \'cancellationSuccess\' || status === \'cancellationFailed\' || status === \'loadingFailed\'">\n    OK\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="cancelProcessInstance()"\n          ng-disabled="status !== \'beforeCancellation\'"\n          ng-hide="status === \'cancellationSuccess\' || status === \'cancellationFailed\' || status === \'loadingFailed\'">\n    Cancel Process Instance\n  </button>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/cancel-process-instance-dialog.html -->\n'
}), define("text!base/app/views/processInstance/cancel-process-instance-action.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/cancel-process-instance-action.html -->\n<a class="btn btn-default btn-toolbar"\n   href\n   ng-click="openDialog()"\n   tooltip="Cancel running process instance"\n   tooltip-placement="left">\n  <span class="glyphicon glyphicon-remove-circle"></span>\n</a>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/cancel-process-instance-action.html -->\n'
}), define("base/app/views/processInstance/cancelProcessInstanceAction", ["text!./cancel-process-instance-dialog.html", "text!./cancel-process-instance-action.html"], function (e, n) {
  "use strict";
  return function (t) {
    t.controller("CancelProcessInstanceActionController", ["$scope", "$http", "search", "Uri", "$modal", function (n, t, s, a, i) {
      n.openDialog = function () {
        i.open({
          resolve: {
            processData: function () {
              return n.processData
            }, processInstance: function () {
              return n.processInstance
            }
          }, controller: "CancelProcessInstanceController", template: e
        })
      }
    }]);
    var s = function (e) {
      e.registerDefaultView("cockpit.processInstance.runtime.action", {
        id: "cancel-process-instance-action",
        label: "Cancel Process Instance Action",
        template: n,
        controller: "CancelProcessInstanceActionController",
        priority: 20
      })
    };
    s.$inject = ["ViewsProvider"], t.config(s)
  }
}), define("base/app/views/processInstance/cancelProcessInstanceDialog", [], function () {
  "use strict";
  return ["$scope", "$location", "Notifications", "ProcessInstanceResource", "$modalInstance", "processInstance", "processData", function (e, n, t, s, a, i, c) {
    var o = "beforeCancellation", r = "performCancellation", l = "cancellationSuccess", d = "cancellationFailed";
    e.processInstance = i;
    var p = c.newChild(e);
    e.$on("$routeChangeStart", function () {
      a.close(e.status)
    }), p.provide("subProcessInstances", function () {
      return s.query({firstResult: 0, maxResults: 5}, {superProcessInstance: i.id}).$promise
    }), p.provide("subProcessInstancesCount", function () {
      return s.count({superProcessInstance: i.id}).$promise
    }), p.observe(["subProcessInstancesCount", "subProcessInstances"], function (n, t) {
      e.subProcessInstancesCount = n.count, e.subProcessInstances = t, e.status = o
    }), e.cancelProcessInstance = function () {
      e.status = r, e.processInstance.$delete(function () {
        e.status = l, t.addMessage({
          status: "Canceled",
          message: "The cancellation of the process instance was successful."
        })
      }, function (n) {
        e.status = d, t.addError({
          status: "Failed",
          message: "The cancellation of the process instance failed. " + n.data.message,
          exclusive: ["type"]
        })
      })
    }, e.close = function (e) {
      a.close(e), e === l && (n.url("/process-definition/" + i.definitionId), n.replace())
    }
  }]
}), define("text!base/app/views/processInstance/add-variable-action.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/add-variable-action.html -->\n<a class="btn btn-default btn-toolbar"\n   href\n   ng-click="openDialog()"\n   tooltip="Add a new variable to Process Instance"\n   tooltip-placement="left">\n  <span class="glyphicon glyphicon-plus"></span>\n</a>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/add-variable-action.html -->\n'
}), define("text!base/app/views/processInstance/add-variable-dialog.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/add-variable-dialog.html -->\n<div class="modal-header">\n  <h3>Add Variable to Process Instance</h3>\n</div>\n\n<div class="modal-body add-variable-dialog">\n  <div notifications-panel></div>\n\n  <form class="form-horizontal"\n        name="addVariableForm"\n        novalidate\n        ng-submit="save()"\n        ng-hide="status === \'SUCCESS\' || status === \'FAIL\'"\n        request-aware>\n    <fieldset>\n\n      <div class="form-group variable-name">\n        <label class="control-label col-xs-4"\n               for="variableName">Variable Name*</label>\n        <div class="col-xs-8">\n          <input id="variableNameId"\n                 name="variableName"\n                 class="form-control"\n                 type="text"\n                 ng-model="newVariable.name"\n                 autofocus\n                 required />\n        </div>\n      </div>\n\n      <div class="form-group variable-type">\n        <label class="control-label col-xs-4"\n               for="variableType">Variable Type*</label>\n        <div class="col-xs-8">\n          <select id="variableTypeId"\n                  name="variableType"\n                  class="form-control"\n                  ng-options="variableType for variableType in variableTypes"\n                  ng-model="newVariable.type"\n                  ng-change="changeVariableType(variableType)">\n          </select>\n        </div>\n      </div>\n\n      <div class="form-group variable-value">\n        <label class="control-label col-xs-4"\n               for="variableValue">Variable Value*</label>\n        <div class="col-xs-8">\n          <div variable="newVariable"></div>\n\n          <p class="invalid"\n             ng-show="this.addVariableForm.editDateValue.$error.date">\n            Supported pattern \'yyyy-MM-ddTHH:mm:ss\'.\n          </p>\n\n          <p class="invalid"\n             ng-show="this.addVariableForm.editIntegerValue.$error.numeric || this.addVariableForm.editFloatValue.$error.numeric">\n            Only a {{ newVariable.type }} value is allowed.\n          </p>\n        </div>\n      </div>\n\n    </fieldset>\n  </form>\n\n  <div ng-show="status === \'SUCCESS\'">\n    The variable "{{ newVariable.name }}" has been added to the process instance successfully.\n  </div>\n\n  <div ng-show="status === \'FAIL\'">\n    The variable "{{ newVariable.name }}" could not be added to the process instance.\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-link"\n          ng-click="close()"\n          ng-disabled="status === \'PERFORM_SAVE\'"\n          ng-hide="status === \'SUCCESS\' || status === \'FAIL\'">Close</button>\n\n  <button type="submit"\n          class="btn btn-primary"\n          ng-click="save()"\n          ng-hide="status === \'SUCCESS\' || status === \'FAIL\'"\n          ng-disabled="!isValid()">Add</button>\n\n  <button class="btn btn-primary"\n          ng-click="close()"\n          ng-show="status === \'SUCCESS\' || status === \'FAIL\'">OK</button>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/add-variable-dialog.html -->\n'
}), define("base/app/views/processInstance/addVariableAction", ["angular", "text!./add-variable-action.html", "text!./add-variable-dialog.html"], function (e, n, t) {
  "use strict";
  var s = function (s) {
    s.registerDefaultView("cockpit.processInstance.runtime.action", {
      id: "add-variable-action",
      label: "Add Variable Action",
      template: n,
      controller: ["$scope", "$modal", function (n, s) {
        n.openDialog = function () {
          var a = s.open({
            scope: n, resolve: {
              processData: function () {
                return n.processData
              }, processInstance: function () {
                return n.processInstance
              }
            }, controller: "AddVariableController", template: t
          });
          a.result.then(function (t) {
            "SUCCESS" === t && n.processData.set("filter", e.extend({}, n.filter))
          })
        }
      }],
      priority: 10
    })
  };
  return s.$inject = ["ViewsProvider"], s
}), define("base/app/views/processInstance/addVariableDialog", ["angular"], function (e) {
  "use strict";
  return ["$scope", "$http", "Uri", "Notifications", "$modalInstance", "processInstance", function (n, t, s, a, i, c) {
    n.variableTypes = ["String", "Boolean", "Short", "Integer", "Long", "Double", "Date", "Null", "Object"];
    var o = n.newVariable = {name: null, type: "String", value: null}, r = "PERFORM_SAVE", l = "SUCCESS", d = "FAIL";
    n.$on("$routeChangeStart", function () {
      i.close(n.status)
    }), n.close = function () {
      i.close(n.status)
    };
    var p = n.isValid = function () {
      var n = e.element('[name="addVariableForm"]').scope();
      return n && n.addVariableForm ? n.addVariableForm.$valid : !1
    };
    n.save = function () {
      if (p()) {
        n.status = r;
        var i = e.extend({}, o), u = i.name;
        delete i.name, t.put(s.appUri("engine://engine/:engine/process-instance/" + c.id + "/variables/" + u), i).success(function () {
          n.status = l, a.addMessage({status: "Finished", message: "Added the variable", exclusive: !0})
        }).error(function (e) {
          n.status = d, a.addError({
            status: "Finished",
            message: "Could not add the new variable: " + e.message,
            exclusive: !0
          })
        })
      }
    }
  }]
}), define("text!base/app/views/processInstance/update-suspension-state-action.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/update-suspension-state-action.html -->\n<a class="btn btn-default btn-toolbar btn-suspend-action"\n   href\n   ng-click="openDialog()"\n   tooltip="Suspend Process Instance"\n   tooltip-placement="left"\n   ng-show="!processInstance.suspended">\n  <span class="glyphicon glyphicon-pause"></span>\n</a>\n<a class="btn btn-default btn-toolbar"\n   href\n   ng-click="openDialog()"\n   tooltip="Activate Process Instance"\n   tooltip-placement="left"\n   ng-hide="!processInstance.suspended">\n  <span class="glyphicon glyphicon-play"></span>\n</a>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/update-suspension-state-action.html -->\n'
}), define("text!base/app/views/processInstance/update-suspension-state-dialog.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/update-suspension-state-dialog.html -->\n<div class="modal-header">\n  <h3>{{ (processInstance.suspended ? \'Activate\' : \'Suspend\') }} Process Instance</h3>\n</div>\n\n<div class="process-instance update-suspension-state modal-body">\n  <div notifications-panel></div>\n\n  <div ng-hide="status === \'SUCCESS\' || status === \'FAIL\'">\n\n    <div ng-show="processInstance.suspended">\n      <!-- activation -->\n      <p>\n        Activating a process instance means that the execution is running, so the <i>token state</i> will change.\n      </p>\n\n      <p>\n        Tasks belonging to this process instance will also be activated.\n      </p>\n\n      <p>\n        If a process instance is in the state active, the engine will also execute jobs associated with this process instance.\n      </p>\n\n      <p>\n        If this process instance have a process instance hierarchy, activating this process instance from the hierarchy will not activate other process instances from that hierarchy.\n      </p>\n\n      <p>Do you really want to activate this process instance?</p>\n    </div>\n\n    <div ng-hide="processInstance.suspended">\n      <!-- suspension -->\n      <p>\n        Suspending a process instance means that the execution is stopped, so the <i>token state</i> will not change. However, actions that do not change token state, like setting or removing variables, etc. will still succeed.\n      </p>\n\n      <p>\n        Tasks belonging to this process instance will also be suspended. This means that any actions influencing the tasks\' lifecycles will fail, such as\n        <ul>\n          <li>claiming</li>\n          <li>completing</li>\n          <li>delegation</li>\n          <li>changes in task assignees, owners, etc.</li>\n        </ul>\n        Actions that only change task properties will still succeed, such as changing variables.\n      </p>\n\n      <p>\n        If a process instance is in the state suspended, the engine will also not execute jobs associated with this process instance.\n      </p>\n\n      <p>\n        If this process instance have a process instance hierarchy, suspending this process instance from the hierarchy will not suspend other process instances from that hierarchy.\n      </p>\n\n      <p>Do you really want to suspend this process instance?</p>\n    </div>\n\n  </div>\n\n  <div ng-show="status === \'SUCCESS\'">\n    <p ng-show="processInstance.suspended">\n      The suspension state of the process instance has been updated to "active" successfully.\n    </p>\n    <p ng-hide="processInstance.suspended">\n      The suspension state of the process instance has been updated to "suspended" successfully.\n    </p>\n  </div>\n\n  <div ng-show="status === \'FAIL\'">\n    <p ng-show="processInstance.suspended">\n      The suspension state of the process instance could not be updated to "active" successfully.\n    </p>\n    <p ng-hide="processInstance.suspended">\n      The suspension state of the process instance could not be updated to "suspended" successfully.\n    </p>\n  </div>\n\n</div>\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="close(status)"\n          ng-disabled="status === \'PERFORM_UDPATE\'"\n          ng-hide="status === \'SUCCESS\' || status === \'FAIL\'">Close</button>\n\n  <button type="submit"\n          class="btn btn-primary"\n          ng-click="updateSuspensionState()"\n          ng-hide="status === \'SUCCESS\' || status === \'FAIL\'"\n          ng-disabled="status === \'PERFORM_UDPATE\'">\n    {{ (processInstance.suspended ? \'Activate\' : \'Suspend\') }}\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close(status)"\n          ng-show="status === \'SUCCESS\' || status === \'FAIL\'">OK</button>\n</div>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/update-suspension-state-dialog.html -->\n'
}), define("base/app/views/processInstance/updateSuspensionStateAction", ["angular", "text!./update-suspension-state-action.html", "text!./update-suspension-state-dialog.html"], function (e, n, t) {
  "use strict";
  var s = function (s) {
    s.registerDefaultView("cockpit.processInstance.runtime.action", {
      id: "update-suspension-state-action",
      label: "Update Suspension State",
      template: n,
      controller: ["$scope", "$rootScope", "$modal", function (n, s, a) {
        n.openDialog = function () {
          var i = a.open({
            resolve: {
              processData: function () {
                return n.processData
              }, processInstance: function () {
                return n.processInstance
              }
            }, controller: "UpdateProcessInstanceSuspensionStateController", template: t
          });
          i.result.then(function (t) {
            "SUCCESS" === t.status && (n.processInstance.suspended = t.suspended, s.$broadcast("$processInstance.suspensionState.changed", n.processInstance), n.processData.set("filter", e.extend({}, n.filter)))
          })
        }
      }],
      priority: 5
    })
  };
  return s.$inject = ["ViewsProvider"], s
}), define("base/app/views/processInstance/updateSuspensionStateDialog", [], function () {
  "use strict";
  return ["$scope", "$http", "$filter", "Uri", "Notifications", "$modalInstance", "processInstance", function (e, n, t, s, a, i, c) {
    var o = "BEFORE_UPDATE", r = "PERFORM_UDPATE", l = "SUCCESS", d = "FAIL";
    e.processInstance = c, e.status = o, e.$on("$routeChangeStart", function () {
      i.close(e.status)
    }), e.updateSuspensionState = function () {
      e.status = r;
      var t = {};
      t.suspended = !c.suspended, n.put(s.appUri("engine://engine/:engine/process-instance/" + c.id + "/suspended/"), t).success(function () {
        e.status = l, a.addMessage({
          status: "Finished",
          message: "Updated the suspension state of the process instance.",
          exclusive: !0
        })
      }).error(function (n) {
        e.status = d, a.addError({
          status: "Finished",
          message: "Could not update the suspension state of the process instance: " + n.message,
          exclusive: !0
        })
      })
    }, e.close = function (e) {
      var n = {};
      n.status = e, n.suspended = !c.suspended, i.close(n)
    }
  }]
}), define("text!base/app/views/processInstance/activity-instance-statistics-overlay.html", [], function () {
  return '<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/activity-instance-statistics-overlay.html -->\n<span class="activity-bottom-left-position"\n      ng-show="activityInstanceStatistics"\n      ng-click="selectRunningInstances($event)">\n  <span class="badge"\n        tooltip="Running Activity Instances"\n        tooltip-placement="top"\n        tooltip-animation="false"\n        ng-show="activityInstanceStatistics.instances && activityInstanceStatistics.instances.length">\n    {{ activityInstanceStatistics.instances.length | abbreviateNumber }}\n  </span>\n\n  <span class="badge badge-important"\n        tooltip="Open Incidents"\n        tooltip-placement="top"\n        tooltip-animation="false"\n        ng-show="activityInstanceStatistics.incidents && activityInstanceStatistics.incidents.length">!</span>\n</span>\n<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/activity-instance-statistics-overlay.html -->\n'
}), define("base/app/views/processInstance/activityInstanceStatisticsOverlay", ["angular", "text!./activity-instance-statistics-overlay.html"], function (e, n) {
  "use strict";
  var t = function (t) {
    t.registerDefaultView("cockpit.processInstance.diagram.overlay", {
      id: "activity-instance-statistics-overlay",
      template: n,
      controller: ["$scope", function (n) {
        var t = n.bpmnElement, s = n.processData.newChild(n);
        n.activityInstanceStatistics = s.observe(["activityIdToInstancesMap", "activityIdToIncidentsMap"], function (e, s) {
          var a = t.id, i = e[a] || [], c = s[a] || [];
          (i.length || c.length) && (t.isSelectable = !0), n.activityInstanceStatistics = {instances: i, incidents: c}
        });
        var a = s.observe("filter", function (e) {
          a = e
        });
        n.selectRunningInstances = function (n) {
          var i = e.copy(a), c = n.ctrlKey, o = t.id, r = e.copy(i.activityIds) || [], l = r.indexOf(o), d = -1 !== l;
          o ? c ? d ? r.splice(l, 1) : r.push(o) : r = [o] : r = null, i.activityIds = r, s.set("filter", i)
        }
      }],
      priority: 20
    })
  };
  return t.$inject = ["ViewsProvider"], t
}), define("base/app/views/main", ["angular", "./dashboard/process-definitions", "./processDefinition/processInstanceTable", "./processDefinition/calledProcessDefinitionTable", "./processDefinition/updateSuspensionStateAction", "./processDefinition/updateSuspensionStateDialog", "./processDefinition/activityInstanceStatisticsOverlay", "./processInstance/variableInstancesTab", "./processInstance/variableInstanceUploadDialog", "./processInstance/variableInstanceInspectDialog", "./processInstance/incidentsTab", "./processInstance/calledProcessInstanceTable", "./processInstance/userTasksTable", "./processInstance/jobRetryBulkAction", "./processInstance/jobRetryBulkDialog", "./processInstance/jobRetryDialog", "./processInstance/cancelProcessInstanceAction", "./processInstance/cancelProcessInstanceDialog", "./processInstance/addVariableAction", "./processInstance/addVariableDialog", "./processInstance/updateSuspensionStateAction", "./processInstance/updateSuspensionStateDialog", "./processInstance/activityInstanceStatisticsOverlay"], function (e, n, t, s, a, i, c, o, r, l, d, p, u, b, g, f, m, h, v, y, I, w, D) {
  "use strict";
  var S = e.module("cockpit.plugin.base.views", []);
  return S.config(n), S.config(t), S.config(s), S.config(a), S.controller("UpdateProcessDefinitionSuspensionStateController", i), S.config(c), o(S), S.controller("VariableInstanceUploadController", r), S.controller("VariableInstanceInspectController", l), S.config(d), p(S), u(S), b(S), S.controller("JobRetriesController", g), S.controller("JobRetryController", f), m(S), S.controller("CancelProcessInstanceController", h), S.config(v), S.controller("AddVariableController", y), S.config(I), S.controller("UpdateProcessInstanceSuspensionStateController", w), S.config(D), S
}), define("base/app/resources/processDefinition", [], function () {
  return ["$resource", "Uri", function (e, n) {
    return e(n.appUri("plugin://base/:engine/process-definition/:id/:action"), {id: "@id"}, {
      getCalledProcessDefinitions: {
        method: "POST",
        isArray: !0,
        params: {action: "called-process-definitions"}
      }
    })
  }]
}), define("base/app/resources/processInstance", [], function () {
  "use strict";
  return ["$resource", "Uri", function (e, n) {
    return e(n.appUri("plugin://base/:engine/process-instance/:id/:action"), {id: "@id"}, {
      query: {
        method: "POST",
        isArray: !0
      },
      "delete": {url: n.appUri("engine://engine/:engine/process-instance/:id"), method: "DELETE"},
      count: {method: "POST", isArray: !1, params: {id: "count"}},
      processInstances: {method: "POST", isArray: !0, params: {action: "called-process-instances"}},
      getCalledProcessInstances: {method: "POST", isArray: !0, params: {action: "called-process-instances"}}
    })
  }]
}), define("base/app/resources/main", ["angular", "./processDefinition", "./processInstance"], function (e, n, t) {
  var s = e.module("cockpit.plugin.base.resources", []);
  return s.factory("PluginProcessDefinitionResource", n), s.factory("PluginProcessInstanceResource", t), s
}), define("base/app/data/dashboard/processDefinitionStatisticsData", ["angular"], function (e) {
  var n = ["$scope", "processData", "ProcessDefinitionResource", function (n, t, s) {
    t.provide("processDefinitions", function () {
      return s.queryStatistics({incidents: !0}).$promise
    }), t.provide("processDefinitionStatistics", ["processDefinitions", function (e) {
      return a(e)
    }]);
    var a = function (n) {
      var t = [], s = [];
      return e.forEach(n, function (a) {
        var i = t[a.definition.key];
        if (i) {
          var c = i.instances, o = n.failedJobs, r = e.copy(i.incidents);
          a.definition.version > i.definition.version && (e.copy(a, i), i.definition.name || (i.definition.name = i.definition.key)), i.instances = c + a.instances, i.failedJobs = o + a.failedJobs, e.forEach(r, function (e) {
            for (var n = e.incidentType, t = e.incidentCount, s = !0, a = 0; a < i.incidents.length; a++) {
              var c = i.incidents[a];
              c.incidentType == n && (c.incidentCount = t + c.incidentCount, s = !1)
            }
            s && i.incidents.push(e)
          })
        } else i = e.copy(a), i.definition.name || (i.definition.name = i.definition.key), t[i.definition.key] = i, s.push(i)
      }), s
    }
  }], t = function (e) {
    e.registerData("cockpit.dashboard.data", {id: "process-definition-statistics-data", controller: n})
  };
  return t.$inject = ["DataProvider"], t
}), define("base/app/data/processDefinition/activityInstanceStatisticsData", [], function () {
  var e = ["$scope", "processData", "ProcessDefinitionResource", function (e, n, t) {
    n.provide("activityInstanceStatistics", ["processDefinition", function (e) {
      return t.queryActivityStatistics({id: e.id, incidents: !0}).$promise
    }])
  }], n = function (n) {
    n.registerData("cockpit.processDefinition.data", {id: "activity-instance-statistics-data", controller: e})
  };
  return n.$inject = ["DataProvider"], n
}), define("base/app/data/main", ["angular", "./dashboard/processDefinitionStatisticsData", "./processDefinition/activityInstanceStatisticsData"], function (e, n, t) {
  var s = e.module("cockpit.plugin.base.data", []);
  return s.config(n), s.config(t), s
}), define("base/app/plugin", ["angular", "./views/main", "./resources/main", "./data/main"], function (e, n, t, s) {
  return e.module("cockpit.plugin.base", [n.name, t.name, s.name])
}), require(["base/app/plugin"]);
//# sourceMappingURL=plugin.js
//# sourceMappingURL=plugin.js.map
