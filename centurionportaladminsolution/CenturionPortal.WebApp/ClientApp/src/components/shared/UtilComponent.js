"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelExport_001 = exports.ExcelexExport_Button_001 = exports.GridColumn_001 = void 0;
var React = require("react");
var kendo_react_excel_export_1 = require("@progress/kendo-react-excel-export");
var Functions_1 = require("../../utilities/Functions");
var react_bootstrap_1 = require("react-bootstrap");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
//****************************************************************************************************************************************************************************************************************************************************************************************
exports.GridColumn_001 = function (arrColumns, totalSum) {
    return (arrColumns.map(function (column) { return (React.createElement(kendo_react_grid_1.GridColumn, { title: column.Title, key: column.ColumnName, field: column.ColumnName, filter: column.GridColumnFilter, width: '150px', format: column.GridColumnFormat, className: column.IsNumber ? 'text-right' : '', columnMenu: function (props) {
            return React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
        }, footerCell: totalSum
            ?
                function (sender) {
                    return (React.createElement("td", { style: sender.style, colSpan: sender.colSpan, className: "text-right font-weight-bold" }, column.IsAgregateSum ? Functions_1.Utils.currencyFormat(totalSum[sender === null || sender === void 0 ? void 0 : sender.field]) : ''));
                }
            :
                undefined })); }));
};
//****************************************************************************************************************************************************************************************************************************************************************************************
exports.ExcelexExport_Button_001 = function (props) {
    return (React.createElement(react_bootstrap_1.Dropdown, { className: props.className },
        React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdownMenuExport", className: 'btn btn-primary p-2' },
            React.createElement("i", { className: "mdi mdi-file-excel-box" }),
            React.createElement("span", { className: "d-none d-md-inline" }, " Export")),
        React.createElement(react_bootstrap_1.Dropdown.Menu, null,
            React.createElement(react_bootstrap_1.Dropdown.Item, { onClick: function () { return props.exportThisPage(); } },
                React.createElement("i", { className: "ti ti-layout-width-full mr-2" }),
                " This page"),
            React.createElement(react_bootstrap_1.Dropdown.Item, { onClick: function () { return props.exportAllPages(); } },
                React.createElement("i", { className: "ti ti-layers-alt mr-2" }),
                " All pages"))));
};
//****************************************************************************************************************************************************************************************************************************************************************************************
exports.ExcelExport_001 = function (props) {
    return (React.createElement(kendo_react_excel_export_1.ExcelExport, { fileName: props.fileName, ref: props.objExcelExport }, props.arrColumn.map(function (obj) {
        return (React.createElement(kendo_react_excel_export_1.ExcelExportColumn, { key: obj.ColumnName, field: obj.ColumnName, title: obj.ColumnName, width: obj.Width, headerCellOptions: { textAlign: 'center' }, footer: props.totalSum && obj.IsNumber
                ?
                    function () { return Functions_1.Utils.currencyFormat(props.totalSum[obj.ColumnName]); }
                :
                    undefined }));
    })));
};
//# sourceMappingURL=UtilComponent.js.map