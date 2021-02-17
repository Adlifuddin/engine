"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.uploadDrive = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _axios["default"].create({
  baseURL: 'http://127.0.0.1:5000/api/add'
});

var uploadDrive = function uploadDrive(payload) {
  return api.post("", payload);
};

exports.uploadDrive = uploadDrive;
var apis = {
  uploadDrive: uploadDrive
};
var _default = apis;
exports["default"] = _default;