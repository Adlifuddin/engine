"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.session = exports.createDatabase = exports.databaseListID = exports.databaseList = void 0;

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
}; // Create Sessions


exports.createDatabase = createDatabase;

var session = function session(payload) {
  return api.post("session/", payload);
};

exports.session = session;
var apis = {
  databaseList: databaseList,
  session: session,
  createDatabase: createDatabase,
  databaseListID: databaseListID
};
var _default = apis;
exports["default"] = _default;