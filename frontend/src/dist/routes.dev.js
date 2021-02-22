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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = [{
  path: "home",
  name: "Home",
  component: _HomePage["default"],
  layout: "/"
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
  path: "audit",
  name: "Audit",
  component: _Members["default"],
  layout: "/"
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
}];
var _default = routes;
exports["default"] = _default;