"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallData = CallData;
exports["default"] = void 0;

var _metabaseApi = _interopRequireDefault(require("../../../api/metabaseApi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CallData(setPermissionGraph, setLoad) {
  return regeneratorRuntime.async(function CallData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_metabaseApi["default"].databaseTables().then(function (res) {
            _metabaseApi["default"].getPermissionGroup().then(function (response) {
              var data = response.data;
              var filters = data.filter(function (x) {
                return x.id !== 1 && x.id !== 2;
              });

              _metabaseApi["default"].getPermissionGraph().then(function (responses) {
                var datas = responses.data.groups;
                var file = {};
                var analyst = {};
                Object.keys(datas[2]).forEach(function (e) {
                  analyst[e] = {
                    "native": "none",
                    schemas: "none"
                  };
                });
                filters.forEach(function (x) {
                  if (x.name === 'Analyst') {
                    file["Analyst"] = datas[x.id];
                  } else if (x.name === 'Architect') {
                    file["Architect"] = datas[x.id];
                  }
                });
                file.Analyst = analyst;
                var files = {};
                res.data.forEach(function (x) {
                  files[x.name] = _objectSpread({
                    Analyst: _objectSpread({}, file.Analyst[x.id]),
                    Architect: _objectSpread({}, file.Architect[x.id])
                  }, x);
                });
                setPermissionGraph(files);
                setLoad(false);
              })["catch"](function (error) {
                console.log(error);
              });
            })["catch"](function (error) {
              console.log(error);
            });
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

var apis = {
  CallData: CallData
};
var _default = apis;
exports["default"] = _default;