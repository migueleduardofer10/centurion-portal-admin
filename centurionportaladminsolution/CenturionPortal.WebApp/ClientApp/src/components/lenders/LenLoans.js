"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var react_bootstrap_1 = require("react-bootstrap");
var kendo_react_excel_export_1 = require("@progress/kendo-react-excel-export");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var BreadCrumb_1 = require("../shared/BreadCrumb");
var Functions_1 = require("../../utilities/Functions");
var LenLoanStore = require("../../store/stores/lenders/LenLoanStore");
var LenLoan = /** @class */ (function (_super) {
    __extends(LenLoan, _super);
    function LenLoan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fetchLoans = function (dataState, getColumns, forced) {
            if (getColumns === void 0) { getColumns = false; }
            if (forced === void 0) { forced = false; }
            _this.props.fetchLoans(dataState, getColumns, forced);
        };
        _this.dataStateChange = function (event) {
            _this.fetchLoans(event.data);
        };
        _this.exportExcel = function (event, currentPage) {
            event.preventDefault();
            if (currentPage)
                _this.props.enableExport();
            else
                _this.props.fetchLoansAll();
        };
        _this.toggleDropdown = function () {
            _this.props.toggleDropdown(!_this.props.showDropdown);
        };
        _this.activateColumn = function (field) {
            _this.props.setActiveColumn(field);
        };
        _this.checkColumn = function (event, field) {
            _this.props.checkColumn(event.target.checked, field);
        };
        _this.checkAllColumn = function (event) {
            event.preventDefault();
            _this.props.toggleAllColumns(true);
        };
        _this.uncheckAllColumn = function (event) {
            event.preventDefault();
            _this.props.toggleAllColumns(false);
        };
        _this.moveColumnUp = function (event) {
            event.preventDefault();
            _this.props.sortColumn(_this.props.activeColumn, -1);
        };
        _this.movColumnDown = function (event) {
            event.preventDefault();
            _this.props.sortColumn(_this.props.activeColumn, 1);
        };
        _this.revertColumns = function (event) {
            event.preventDefault();
            _this.toggleDropdown();
            _this.props.revertColumns();
        };
        _this.applyChangedColumns = function (event) {
            event.preventDefault();
            var token = Functions_1.Auth.inputCSRF(document.forms.namedItem("customizeColumns"));
            _this.props.applyChangedColumns(token);
        };
        return _this;
    }
    LenLoan.prototype.componentDidMount = function () {
        Functions_1.Auth.setCSRF();
        this.fetchLoans(this.props.gridProps, true);
    };
    LenLoan.prototype.componentDidUpdate = function () {
        if (this.props.exportExcel) {
            this.props.disableExport();
            this._exporter.save();
        }
    };
    LenLoan.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(BreadCrumb_1.default, { title: "Primary Loans" }),
            React.createElement("div", { className: "card-group" },
                React.createElement("div", { className: "card" },
                    React.createElement("div", { className: "card-header" },
                        React.createElement("h4", { id: "tabelLabel" }, "Primary Loans")),
                    React.createElement("div", { className: "card-body" }, this.renderLoanGrid())))));
    };
    LenLoan.prototype.renderLoanGrid = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(kendo_react_excel_export_1.ExcelExport, { ref: function (exporter) { return _this._exporter = exporter; }, data: this.props.currentPage ? this.props.loans : this.props.loansAll, fileName: "Lender_Loans.xlsx" }, this.props.columns.map(function (column) { return (column.isNumber ? (React.createElement(kendo_react_excel_export_1.ExcelExportColumn, { key: column.columnName, field: column.columnName, title: column.title, width: Number(column.width), headerCellOptions: { textAlign: 'center' }, cellOptions: { textAlign: column.align, format: column.formatExcel } })) : (React.createElement(kendo_react_excel_export_1.ExcelExportColumn, { key: column.columnName, field: column.columnName, title: column.title, width: Number(column.width), headerCellOptions: { textAlign: 'center' }, cellOptions: { textAlign: column.align } }))); })),
            React.createElement(kendo_react_grid_1.Grid, __assign({ data: this.props.columns.filter(function (column) { return column.checked; }).length > 0 ? this.props.loans : [] }, this.props.gridProps, { sortable: { allowUnsort: true, mode: 'single' }, pageable: { buttonCount: 4, pageSizes: true }, onDataStateChange: this.dataStateChange, resizable: true }),
                React.createElement(kendo_react_grid_1.GridToolbar, null,
                    React.createElement("ul", { className: "list-inline mb-0" },
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement("button", { className: "btn btn-primary", onClick: function () { return _this.fetchLoans(true); } },
                                React.createElement("i", { className: "ti ti-reload" }),
                                React.createElement("span", { className: "d-none d-md-inline" }, " Refresh"))),
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement(react_bootstrap_1.Dropdown, null,
                                React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdownMenuExport" },
                                    React.createElement("i", { className: "fa fa-file-excel" }),
                                    React.createElement("span", { className: "d-none d-md-inline" }, " Export")),
                                React.createElement(react_bootstrap_1.Dropdown.Menu, null,
                                    React.createElement(react_bootstrap_1.Dropdown.Item, { href: "!#", onClick: function (event) { return _this.exportExcel(event, true); } },
                                        React.createElement("i", { className: "ti ti-layout-width-full mr-2" }),
                                        " This page"),
                                    React.createElement(react_bootstrap_1.Dropdown.Item, { href: "!#", onClick: function (event) { return _this.exportExcel(event, false); } },
                                        React.createElement("i", { className: "ti ti-layers-alt mr-2" }),
                                        " All pages")))),
                        React.createElement("li", { className: "list-inline-item dropdown mega-dropdown customize-column ml-0" }, this.renderCustomColumns()))),
                React.createElement(kendo_react_grid_1.GridColumn, { title: "", width: "80px", cell: function (props) { return (React.createElement("td", { className: "text-center" },
                        React.createElement(react_router_dom_1.Link, { className: "badge badge-warning mr-2", title: "Payment History", to: "/lender/loan/" + props.dataItem["LoanUid"] + "/payments" },
                            React.createElement("i", { className: "fa fa-history" }),
                            " Pay. Hist."))); } }),
                this.props.columns.filter(function (column) { return column.checked; }).map(function (column) { return (column.enum ? (React.createElement(kendo_react_grid_1.GridColumn, { title: column.title, key: column.columnName, field: column.columnName, className: column.className, width: column.width + "px", format: column.format, columnMenu: function (props) {
                        return React.createElement(kendo_react_grid_1.GridColumnMenuCheckboxFilter, __assign({}, props, { expanded: true, data: column.enum }));
                    } })) : (React.createElement(kendo_react_grid_1.GridColumn, { title: column.title, key: column.columnName, field: column.columnName, className: column.className, width: column.width + "px", format: column.format, filter: column.filter, columnMenu: function (props) {
                        return React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
                    } }))); }))));
    };
    LenLoan.prototype.renderCustomColumns = function () {
        var _this = this;
        return (React.createElement(react_bootstrap_1.Dropdown, null,
            React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdownCustomColumns", className: "waves-effect waves-dark" },
                React.createElement("i", { className: "fa fa-columns" }),
                React.createElement("span", { className: "d-none d-md-inline" }, " Colums")),
            React.createElement(react_bootstrap_1.Dropdown.Menu, { className: "animated bounceInDown" },
                React.createElement("form", { name: "customizeColumns", onSubmit: function (event) { return _this.applyChangedColumns(event); } },
                    React.createElement("input", { type: "hidden", name: "__RequestVerificationToken", value: Functions_1.Auth.getCSRF() }),
                    React.createElement("div", { className: "mega-dropdown-menu row" },
                        React.createElement("div", { className: "col-md-7" },
                            React.createElement("ul", { className: "list-group" }, this.props.columns.map(function (column) { return (React.createElement("li", { key: column.columnName, className: "list-group-item" + (_this.props.activeColumn === column.columnName ? " active" : ""), onClick: function () { return _this.activateColumn(column.columnName); } },
                                React.createElement("div", { className: "form-check m-0" },
                                    React.createElement("input", { className: "form-check-input", type: "checkbox", checked: column.checked, onChange: function (event) { return _this.checkColumn(event, column.columnName); } }),
                                    React.createElement("label", { className: "form-check-label" }, column.title)))); }))),
                        React.createElement("div", { className: "col-md-5 mt-2" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { type: "submit", className: "btn btn-light btn-block" },
                                        React.createElement("i", { className: "ti ti-save" }),
                                        " Apply")),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block mt-1", onClick: this.revertColumns },
                                        React.createElement("i", { className: "fa fa-undo" }),
                                        " Cancel")),
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement("button", { className: "btn btn-info btn-block mt-1", onClick: this.moveColumnUp },
                                        React.createElement("i", { className: "fa fa-arrow-up m-0" }))),
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement("button", { className: "btn btn-info btn-block mt-1", onClick: this.movColumnDown },
                                        React.createElement("i", { className: "fa fa-arrow-down m-0" }))),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block mt-1", onClick: this.checkAllColumn },
                                        React.createElement("i", { className: "ti ti-check-box" }),
                                        " Check All")),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block mt-1", onClick: this.uncheckAllColumn },
                                        React.createElement("i", { className: "ti ti-control-stop" }),
                                        " Uncheck All")))))))));
    };
    return LenLoan;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.lenLoans; }, LenLoanStore.actions)(LenLoan);
//# sourceMappingURL=LenLoans.js.map