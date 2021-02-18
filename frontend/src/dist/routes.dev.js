"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _GoogleApi = _interopRequireDefault(require("./views/Integration/GoogleApi"));

var _HomePage = _interopRequireDefault(require("./components/Home/HomePage"));

var _Integration = _interopRequireDefault(require("./views/Integration/Integration"));

var _Members = _interopRequireDefault(require("./components/Audit/People/Members"));

var _Database = _interopRequireDefault(require("./views/database/Database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = [{
  pathname: "/",
  name: "Home",
  components: _HomePage["default"]
}, {
  pathname: "/integration",
  name: "Integration",
  components: _Integration["default"]
}, {
  pathname: "/google-drive",
  name: "Google Drive",
  components: _GoogleApi["default"],
  isVisible: true
}, {
  pathname: "/audit",
  name: "Audit",
  components: _Members["default"]
}, {
  pathname: "/database",
  name: "Database",
  components: _Database["default"]
}];
var _default = routes;
exports["default"] = _default;