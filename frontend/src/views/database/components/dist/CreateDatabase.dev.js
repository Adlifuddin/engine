"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createDatabases = void 0;

var _metabaseApi = _interopRequireDefault(require("../../../api/metabaseApi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createDatabases = function createDatabases(data) {
  _metabaseApi["default"].createDatabase(data).then(function (response) {
    var id = response.data.id;

    _metabaseApi["default"].getPermissionGraph().then(function (response) {
      var datas = response.data;
      var groups = response.data.groups;

      var payload = _objectSpread({}, datas, {
        groups: _objectSpread({}, groups, {
          "1": _defineProperty({}, id, {
            "native": "none",
            schemas: "none"
          }),
          "5": _defineProperty({}, id, {
            "native": "write",
            schemas: "all"
          })
        })
      });

      _metabaseApi["default"].putPermissionGraph(payload).then(function (response) {
        console.log(response);
        window.location.href = '/database';
      })["catch"](function (error) {
        console.log(error);
      });
    })["catch"](function (error) {
      console.log(error);
    });
  })["catch"](function (error) {
    console.log(error);
  });
};

exports.createDatabases = createDatabases;
var create = {
  createDatabases: createDatabases
};
var _default = create;
exports["default"] = _default;