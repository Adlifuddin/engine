"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.session = exports.putPermissionGraph = exports.getPermissionGraph = exports.getPermissionGroup = exports.updateDatabase = exports.validateDatabase = exports.deleteDatabase = exports.discardValue = exports.reScanValue = exports.syncSchema = exports.createDatabase = exports.databaseListID = exports.databaseList = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _axios["default"].create({
  baseURL: 'https://dashboard-demo.nexent.co/api/'
});

var sessions = localStorage.getItem('sessions');
var config = {
  headers: {
    "X-Metabase-Session": sessions
  }
}; // Database Settings
//List Database

var databaseList = function databaseList() {
  return api.get("database/", config);
}; //List Database by Id


exports.databaseList = databaseList;

var databaseListID = function databaseListID(id) {
  return api.get("database/".concat(id), config);
}; //add Database


exports.databaseListID = databaseListID;

var createDatabase = function createDatabase(payload) {
  return api.post("database/", payload, config);
};

exports.createDatabase = createDatabase;

var syncSchema = function syncSchema(payload, id) {
  return api.post("database/".concat(id, "/sync_schema"), payload, config);
};

exports.syncSchema = syncSchema;

var reScanValue = function reScanValue(payload, id) {
  return api.post("database/".concat(id, "/rescan_values"), payload, config);
};

exports.reScanValue = reScanValue;

var discardValue = function discardValue(payload, id) {
  return api.post("database/".concat(id, "/discard_values"), payload, config);
};

exports.discardValue = discardValue;

var deleteDatabase = function deleteDatabase(id) {
  return api["delete"]("database/".concat(id), config);
};

exports.deleteDatabase = deleteDatabase;

var validateDatabase = function validateDatabase(payload) {
  return api.post("database/validate", payload, config);
};

exports.validateDatabase = validateDatabase;

var updateDatabase = function updateDatabase(payload, id) {
  return api.put("database/".concat(id), payload, config);
}; //group


exports.updateDatabase = updateDatabase;

var getPermissionGroup = function getPermissionGroup() {
  return api.get("permissions/group", config);
};

exports.getPermissionGroup = getPermissionGroup;

var getPermissionGraph = function getPermissionGraph() {
  return api.get("permissions/graph", config);
};

exports.getPermissionGraph = getPermissionGraph;

var putPermissionGraph = function putPermissionGraph(payload) {
  return api.put("permissions/graph", payload, config);
}; // Create Sessions


exports.putPermissionGraph = putPermissionGraph;

var session = function session(payload) {
  return api.post("session/", payload);
};

exports.session = session;
var apis = {
  databaseList: databaseList,
  session: session,
  createDatabase: createDatabase,
  databaseListID: databaseListID,
  syncSchema: syncSchema,
  reScanValue: reScanValue,
  discardValue: discardValue,
  deleteDatabase: deleteDatabase,
  validateDatabase: validateDatabase,
  updateDatabase: updateDatabase,
  getPermissionGraph: getPermissionGraph,
  getPermissionGroup: getPermissionGroup,
  putPermissionGraph: putPermissionGraph
};
var _default = apis;
exports["default"] = _default;