"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = void 0;

var _styledComponents = require("styled-components");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n  flex-direction: row;\n  .custom-row {\n    height: 100vh;\n    align-items: center;\n    justify-content: center;\n    background-color: #dfdfdf;\n  }\n  .source-container {\n    background-color: #fff;\n    display: flex;\n    flex: 1,\n    padding: 20px;\n    margin-bottom: 20px;\n    display: flex;\n    min-height: 200px;\n    box-shadow: 0 1px 1px 0 rgba(10,22,70,.1), 0 0 1px 0 rgba(10,22,70,.06);\n    border-radius: 4px;\n    cursor: pointer;\n    .content-container {\n      flex: 2;\n      flex-direction: column;\n      display: flex;\n      justify-content: center;\n      .title {\n        font-size: 18px;\n        font-weight: 600;\n      }\n      .content {\n        font-size: 16px;\n      }\n    }\n  \n    .icon-container {\n      flex: 1;\n      flex-direction: row;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var style = function style() {
  return (0, _styledComponents.css)(_templateObject());
};

exports.style = style;