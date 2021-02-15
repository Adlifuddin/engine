"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _GoogleApi = _interopRequireDefault(require("./views/Integration/GoogleApi"));

var _HomePage = _interopRequireDefault(require("./components/Home/HomePage"));

var _Integration = _interopRequireDefault(require("./views/Integration/Integration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = [{
  pathname: "/",
  name: "Home",
  components: _HomePage["default"]
}, {
  pathname: "/integration",
  name: "Integration",
  component: _Integration["default"]
}, {
  pathname: "/google-drive",
  name: "Google Drive",
  component: _GoogleApi["default"]
}];
exports.routes = routes;