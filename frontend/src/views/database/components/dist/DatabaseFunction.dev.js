"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.syncSchemas = exports.reScanValues = exports.discardValues = exports.deleteDatabases = exports.updateDatabases = exports.validateDatabases = exports.createDatabases = void 0;

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

var validateDatabases = function validateDatabases(validate, setPage, errorInput) {
  _metabaseApi["default"].validateDatabase(validate).then(function (response) {
    if (response.data.valid) {
      setPage(true);
    } else {
      setPage(false);
      errorInput("Couldn't connect to the database. Please check the connection details.");
    }
  })["catch"](function (error) {
    console.log(error);
  });
};

exports.validateDatabases = validateDatabases;

var updateDatabases = function updateDatabases(datas, status, updateLoading) {
  _metabaseApi["default"].updateDatabase(datas, status).then(function (response) {
    updateLoading('done');
    console.log(response);
    window.location.reload();
  })["catch"](function (error) {
    console.log(error);
  });
};

exports.updateDatabases = updateDatabases;

var deleteDatabases = function deleteDatabases(id) {
  _metabaseApi["default"].deleteDatabase(id).then(function (response) {
    window.location.href = "/database";
  })["catch"](function (error) {
    console.log(error);
  });
};

exports.deleteDatabases = deleteDatabases;

var discardValues = function discardValues(status, setModal) {
  _metabaseApi["default"].discardValue({}, status).then(function (response) {
    var data = response.data;

    if (data) {
      if (data.status === 'ok') {
        setModal(false);
      }
    }
  })["catch"](function (error) {
    console.log(error);
  });
};

exports.discardValues = discardValues;

var reScanValues = function reScanValues(status, setReScanLoading) {
  _metabaseApi["default"].reScanValue({}, status).then(function (response) {
    var data = response.data;
    setReScanLoading("loaded");
    window.setTimeout(function () {
      setReScanLoading("nothing");
    }, 3000);
  })["catch"](function (error) {
    console.log(error);
    setReScanLoading("nothing");
  });
};

exports.reScanValues = reScanValues;

var syncSchemas = function syncSchemas(status, setLoading) {
  _metabaseApi["default"].syncSchema({}, status).then(function (response) {
    var data = response.data;
    setLoading("loaded");
    window.setTimeout(function () {
      setLoading("nothing");
    }, 3000);
  })["catch"](function (error) {
    console.log(error);
    setLoading("nothing");
  });
};

exports.syncSchemas = syncSchemas;
var create = {
  createDatabases: createDatabases,
  validateDatabases: validateDatabases,
  updateDatabases: updateDatabases,
  deleteDatabases: deleteDatabases,
  discardValues: discardValues,
  reScanValues: reScanValues,
  syncSchemas: syncSchemas
};
var _default = create;
exports["default"] = _default;