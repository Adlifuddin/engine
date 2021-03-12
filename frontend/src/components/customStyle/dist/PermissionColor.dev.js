"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableRow = exports.table1Row = exports.table2Header = exports.tableHeader = void 0;
var tableHeader = {
  borderTop: 'transparent',
  borderBottom: 'transparent',
  fontWeight: 700,
  fontSize: "0.875em",
  color: "rgb(76, 87, 115)"
};
exports.tableHeader = tableHeader;
var table2Header = {
  border: '1px solid rgb(184, 187, 195)',
  borderRight: '1px solid rgb(184, 187, 195)',
  textAlign: 'center',
  letterSpacing: "0.06em",
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  color: "rgb(148, 154, 171)",
  fontSize: "0.83em"
};
exports.table2Header = table2Header;
var table1Row = {
  borderTop: 'transparent',
  borderBottom: 'transparent',
  fontSize: "0.875em",
  color: 'rgb(76, 87, 115)',
  borderRight: "1px solid rgb(184, 187, 195)"
};
exports.table1Row = table1Row;
var tableRow = {
  borderBottom: "1px solid rgb(184, 187, 195)",
  textAlign: 'center',
  height: "99px",
  justifyContent: 'center',
  alignItems: 'center'
};
exports.tableRow = tableRow;