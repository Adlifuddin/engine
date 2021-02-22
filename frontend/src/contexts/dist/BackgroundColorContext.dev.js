"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundColorContext = exports.backgroundColors = void 0;

var _react = require("react");

var backgroundColors = {
  primary: "primary",
  blue: "blue",
  green: "green"
};
exports.backgroundColors = backgroundColors;
var BackgroundColorContext = (0, _react.createContext)({
  color: backgroundColors.blue,
  changeColor: function changeColor(color) {}
});
exports.BackgroundColorContext = BackgroundColorContext;