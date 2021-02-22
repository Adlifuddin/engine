"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContext = exports.themes = void 0;

var _react = require("react");

var themes = {
  dark: "",
  light: "white-content"
};
exports.themes = themes;
var ThemeContext = (0, _react.createContext)({
  theme: themes.dark,
  changeTheme: function changeTheme() {}
});
exports.ThemeContext = ThemeContext;