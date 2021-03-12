"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.dashboardsSaved = exports.dashboardsCommon = exports.dashboardsMostPopular = exports.dashboards = exports.databasesQueries = exports.databasesAvgExec = exports.databases = exports.downloadSize = exports.downloadsUser = exports.downloadsOverview = exports.downloads = exports.questionSlowestQueries = exports.questionsPopularQueries = exports.questions = exports.schemasSlowestQueried = exports.schemasMostQueried = exports.schemas = exports.tableLeastQueried = exports.tablesMostQueried = exports.tables = exports.memberLogs = exports.members = exports.memberActiveNNew = exports.memberMostCreated = exports.memberOverview = exports.updateDrive = exports.uploadDrive = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _axios["default"].create({
  baseURL: 'http://127.0.0.1:5000/api/'
});

var uploadDrive = function uploadDrive(payload) {
  return api.post("add", payload);
};

exports.uploadDrive = uploadDrive;

var updateDrive = function updateDrive(payload) {
  return api.put("update", payload);
}; //Audit
//Team Members


exports.updateDrive = updateDrive;

var memberOverview = function memberOverview() {
  return api.get("audit/members/overview");
};

exports.memberOverview = memberOverview;

var memberMostCreated = function memberMostCreated() {
  return api.get("audit/members/mostCreated");
};

exports.memberMostCreated = memberMostCreated;

var memberActiveNNew = function memberActiveNNew() {
  return api.get("audit/members/activennew");
};

exports.memberActiveNNew = memberActiveNNew;

var members = function members() {
  return api.get("audit/members");
};

exports.members = members;

var memberLogs = function memberLogs() {
  return api.get("audit/members/log");
}; //Table


exports.memberLogs = memberLogs;

var tables = function tables() {
  return api.get("audit/tables");
};

exports.tables = tables;

var tablesMostQueried = function tablesMostQueried() {
  return api.get("audit/tables/mostqueried");
};

exports.tablesMostQueried = tablesMostQueried;

var tableLeastQueried = function tableLeastQueried() {
  return api.get("audit/tables/leastqueried");
}; //Schemas


exports.tableLeastQueried = tableLeastQueried;

var schemas = function schemas() {
  return api.get("audit/schemas");
};

exports.schemas = schemas;

var schemasMostQueried = function schemasMostQueried() {
  return api.get("audit/schemas/mostqueried");
};

exports.schemasMostQueried = schemasMostQueried;

var schemasSlowestQueried = function schemasSlowestQueried() {
  return api.get("audit/schemas/slowestschema");
}; //Questions


exports.schemasSlowestQueried = schemasSlowestQueried;

var questions = function questions() {
  return api.get("audit/questions");
};

exports.questions = questions;

var questionsPopularQueries = function questionsPopularQueries() {
  return api.get("audit/questions/popularqueries");
};

exports.questionsPopularQueries = questionsPopularQueries;

var questionSlowestQueries = function questionSlowestQueries() {
  return api.get("audit/questions/slowestqueries");
}; //Downloads


exports.questionSlowestQueries = questionSlowestQueries;

var downloads = function downloads() {
  return api.get("audit/downloads");
};

exports.downloads = downloads;

var downloadsOverview = function downloadsOverview() {
  return api.get("audit/downloads/overview");
};

exports.downloadsOverview = downloadsOverview;

var downloadsUser = function downloadsUser() {
  return api.get("audit/downloads/downloadperuser");
};

exports.downloadsUser = downloadsUser;

var downloadSize = function downloadSize() {
  return api.get("audit/downloads/downloadpersize");
}; //Databases


exports.downloadSize = downloadSize;

var databases = function databases() {
  return api.get("audit/databases");
};

exports.databases = databases;

var databasesAvgExec = function databasesAvgExec() {
  return api.get("audit/databases/queriesnavgexec");
};

exports.databasesAvgExec = databasesAvgExec;

var databasesQueries = function databasesQueries() {
  return api.get("audit/databases/queries");
}; //Dashboards


exports.databasesQueries = databasesQueries;

var dashboards = function dashboards() {
  return api.get("audit/dashboards");
};

exports.dashboards = dashboards;

var dashboardsMostPopular = function dashboardsMostPopular() {
  return api.get("audit/dashboards/mostpopular");
};

exports.dashboardsMostPopular = dashboardsMostPopular;

var dashboardsCommon = function dashboardsCommon() {
  return api.get("audit/dashboards/commonquestion");
};

exports.dashboardsCommon = dashboardsCommon;

var dashboardsSaved = function dashboardsSaved() {
  return api.get("audit/dashboards/viewsnsaved");
};

exports.dashboardsSaved = dashboardsSaved;

var peopleActive = function peopleActive(){
  return api.get("people/activepeople")
};

exports.peopleActive = peopleActive;

var peopleGroupList = function peopleGroupList(){
  return api.get("people/listgroups")
};

exports.peopleGroupList = peopleGroupList;

var peopleDeactivate = function peopleDeactivate(){
  return api.get("people/deactivepeople")
};

exports.peopleDeactivate = peopleDeactivate;

var peopleAllGroup = function peopleAllGroup(){
  return api.get("people/groups")
};

exports.peopleAllGroup = peopleAllGroup;

var apis = {
  uploadDrive: uploadDrive,
  updateDrive: updateDrive,
  memberOverview: memberOverview,
  memberMostCreated: memberMostCreated,
  memberActiveNNew: memberActiveNNew,
  members: members,
  memberLogs: memberLogs,
  tables: tables,
  tablesMostQueried: tablesMostQueried,
  tableLeastQueried: tableLeastQueried,
  schemas: schemas,
  schemasMostQueried: schemasMostQueried,
  schemasSlowestQueried: schemasSlowestQueried,
  questions: questions,
  questionsPopularQueries: questionsPopularQueries,
  questionSlowestQueries: questionSlowestQueries,
  downloads: downloads,
  downloadsOverview: downloadsOverview,
  downloadsUser: downloadsUser,
  downloadSize: downloadSize,
  databases: databases,
  databasesAvgExec: databasesAvgExec,
  databasesQueries: databasesQueries,
  dashboards: dashboards,
  dashboardsMostPopular: dashboardsMostPopular,
  dashboardsCommon: dashboardsCommon,
  dashboardsSaved: dashboardsSaved,
  peopleActive: peopleActive,
  peopleDeactivate: peopleDeactivate,
  peopleGroupList: peopleGroupList,
  peopleAllGroup: peopleAllGroup
};
var _default = apis;
exports["default"] = _default;