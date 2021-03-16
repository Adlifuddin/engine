"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _GoogleApi = _interopRequireDefault(require("./views/Integration/GoogleApi"));

var _HomePage = _interopRequireDefault(require("./components/Home/HomePage"));

var _Integration = _interopRequireDefault(require("./views/Integration/Integration"));

var _Members = _interopRequireDefault(require("./components/Audit/TeamMember/Members"));

var _DatabaseView = _interopRequireDefault(require("./views/database/DatabaseView"));

var _DatabaseUpdate = _interopRequireDefault(require("./views/database/DatabaseUpdate"));

var _DatabaseList = _interopRequireDefault(require("./views/database/DatabaseList"));

var _Table = _interopRequireDefault(require("./components/Audit/Table/Table"));

var _schema = _interopRequireDefault(require("./components/Audit/Schema/schema"));

var _Database = _interopRequireDefault(require("./components/Audit/Database/Database"));

var _question = _interopRequireDefault(require("./components/Audit/Questions/question"));

var _dashboard = _interopRequireDefault(require("./components/Audit/Dashboards/dashboard"));

var _MemberOverview = _interopRequireDefault(require("./components/Audit/TeamMember/MemberOverview"));

var _AuditLog = _interopRequireDefault(require("./components/Audit/TeamMember/AuditLog"));

var _download = _interopRequireDefault(require("./components/Audit/Downloads/download"));

var _TableOverview = _interopRequireDefault(require("./components/Audit/Table/TableOverview"));

var _SchemaOverview = _interopRequireDefault(require("./components/Audit/Schema/SchemaOverview"));

var _DatabaseOverview = _interopRequireDefault(require("./components/Audit/Database/DatabaseOverview"));

var _QuestionOverview = _interopRequireDefault(require("./components/Audit/Questions/QuestionOverview"));

var _DashboardOverview = _interopRequireDefault(require("./components/Audit/Dashboards/DashboardOverview"));

var _DownloadOverview = _interopRequireDefault(require("./components/Audit/Downloads/DownloadOverview"));

var _People = _interopRequireDefault(require("./components/People/People"));

var _permission = _interopRequireDefault(require("./components/Permission/permission"));

var _Groups = _interopRequireDefault(require("./components/People/Groups"));

var _PermissionID = _interopRequireDefault(require("./components/Permission/PermissionID"));

var _DataModel = _interopRequireDefault(require("./views/DataModel/DataModel"));

var _UpdateTab = _interopRequireDefault(require("./views/DataModel/UpdateTab"));

var _Collection = _interopRequireDefault(require("./views/Collection/Collection"));

var _PermissionTableList = _interopRequireDefault(require("./components/Permission/PermissionTableList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = [{
  path: "home",
  name: "Home",
  component: _HomePage["default"],
  layout: "/"
}, {
  path: "dataModel/:id/:index",
  name: "update",
  component: _UpdateTab["default"],
  layout: "/",
  invisible: true
}, {
  path: "integration",
  name: "Integration",
  component: _Integration["default"],
  layout: "/"
}, {
  path: "google-drive",
  name: "Google Drive",
  component: _GoogleApi["default"],
  invisible: true,
  layout: "/"
}, {
  path: "people",
  name: "People",
  component: _People["default"],
  layout: "/",
  exact: true
}, {
  path: "audit",
  name: "Audit",
  component: _Members["default"],
  layout: "/",
  exact: true
}, {
  path: "permission",
  name: "Permission",
  component: _permission["default"],
  layout: "/",
  exact: true
}, {
  path: "database",
  name: "Database",
  component: _DatabaseList["default"],
  layout: "/",
  exact: true
}, {
  path: "database/add",
  name: "AddDatabase",
  component: _DatabaseView["default"],
  layout: "/",
  invisible: true
}, {
  path: "database/:id",
  name: "updateDatabase",
  component: _DatabaseUpdate["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/members/all",
  name: "Audit-AllMember",
  component: _Members["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/members/overview",
  name: "Audit-MemberOverview",
  component: _MemberOverview["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/members/log",
  name: "Audit-MemberLog",
  component: _AuditLog["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/databases/overview",
  name: "Audit-DatabaseOverview",
  component: _DatabaseOverview["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/databases/all",
  name: "Audit-AllDatabase",
  component: _Database["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/tables/overview",
  name: "Audit-TableOverview",
  component: _TableOverview["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/tables/all",
  name: "Audit-AllTable",
  component: _Table["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/schemas/all",
  name: "Audit-AllSChema",
  component: _schema["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/schemas/overview",
  name: "Audit-SchemaOverview",
  component: _SchemaOverview["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/questions/all",
  name: "Audit-AllQuestion",
  component: _question["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/questions/overview",
  name: "Audit-QuestionOverview",
  component: _QuestionOverview["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/dashboards/all",
  name: "Audit-AllDasboard",
  component: _dashboard["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/dashboards/overview",
  name: "Audit-DashboardOverview",
  component: _DashboardOverview["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/downloads/all",
  name: "Audit-AllDownload",
  component: _download["default"],
  layout: "/",
  invisible: true
}, {
  path: "audit/downloads/overview",
  name: "Audit-DownloadOverview",
  component: _DownloadOverview["default"],
  layout: "/",
  invisible: true
}, {
  path: "people/people",
  name: "people-Allpeople",
  component: _People["default"],
  layout: "/",
  invisible: true
}, {
  path: "people/groups",
  name: "people-Allgroups",
  component: _Groups["default"],
  layout: "/",
  invisible: true
}, {
  path: "people/groups",
  name: "people-Allgroups",
  component: _Groups["default"],
  layout: "/",
  invisible: true
}, {
  path: "permission/:id",
  name: "permission-id",
  component: _PermissionID["default"],
  layout: "/",
  invisible: true,
  exact: true
}, {
  path: "data-model",
  name: "Data Model",
  component: _DataModel["default"],
  layout: "/"
}, {
  path: "collection",
  name: "Collection",
  component: _Collection["default"],
  layout: "/"
}, {
  path: "permission/:id/schemas/:index/tables",
  name: "permission-list",
  component: _PermissionTableList["default"],
  layout: "/",
  invisible: true
}];
var _default = routes;
exports["default"] = _default;