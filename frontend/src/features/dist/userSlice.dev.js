"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.selectUser = exports.logout = exports.login = exports.userSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var userSlice = (0, _toolkit.createSlice)({
  name: "user",
  initialState: {
    user: null
  },
  reducers: {
    login: function login(state, action) {
      state.user = action.payload;
    },
    logout: function logout(state) {
      state.user = null;
    }
  }
});
exports.userSlice = userSlice;
var _userSlice$actions = userSlice.actions,
    login = _userSlice$actions.login,
    logout = _userSlice$actions.logout;
exports.logout = logout;
exports.login = login;

var selectUser = function selectUser(state) {
  return state.user.user;
};

exports.selectUser = selectUser;
var _default = userSlice.reducer;
exports["default"] = _default;