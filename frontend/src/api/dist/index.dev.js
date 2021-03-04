"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.updateDrive = exports.uploadDrive = void 0;

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
};

exports.updateDrive = updateDrive;
var apis = {
  uploadDrive: uploadDrive,
  updateDrive: updateDrive
};
var _default = apis;
exports["default"] = _default;