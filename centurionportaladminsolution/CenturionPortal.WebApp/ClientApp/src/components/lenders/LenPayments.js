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
var reactstrap_1 = require("reactstrap");
var kendo_react_excel_export_1 = require("@progress/kendo-react-excel-export");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var LenOptions_1 = require("./LenOptions");
var Functions_1 = require("../../utilities/Functions");
var BreadCrumb_1 = require("../shared/BreadCrumb");
var LenPaymentStore = require("../../store/stores/lenders/LenPaymentStore");
var LenPayments = /** @class */ (function (_super) {
    __extends(LenPayments, _super);
    function LenPayments() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { dropdownExcel: false, dropdownColumns: false };
        _this.fetchPayments = function (excludeFunding, dataState, getColumns, forced) {
            if (excludeFunding === void 0) { excludeFunding = true; }
            if (getColumns === void 0) { getColumns = false; }
            if (forced === void 0) { forced = false; }
            _this.props.fetchPayments(_this.props.match.params.loanUid, excludeFunding, dataState, getColumns, forced);
        };
        _this.excludeFunding = function (event) {
            _this.fetchPayments(event.target.checked, _this.props.gridProps, false, true);
        };
        _this.dataStateChange = function (event) {
            _this.fetchPayments(_this.props.excludeFunding, event.data);
        };
        _this.exportExcel = function (event, currentPage) {
            if (currentPage === void 0) { currentPage = false; }
            event.preventDefault();
            if (currentPage)
                _this.props.enableExport();
            else
                _this.props.fetchPaymentsAll();
        };
        _this.toggleExcel = function () {
            _this.setState({ dropdownExcel: !_this.state.dropdownExcel });
        };
        _this.toggleColumns = function () {
            _this.setState({ dropdownColumns: !_this.state.dropdownColumns });
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
            _this.toggleColumns();
            _this.props.revertColumns();
        };
        _this.applyChangedColumns = function (event) {
            event.preventDefault();
            _this.props.applyChangedColumns();
        };
        return _this;
    }
    LenPayments.prototype.componentDidMount = function () {
        // this.props.match.params.loanUid
        this.fetchPayments(this.props.excludeFunding, this.props.gridProps, true);
    };
    LenPayments.prototype.componentDidUpdate = function () {
        if (this.props.exportExcel) {
            this.props.disableExport();
            this._exporter.save();
        }
    };
    LenPayments.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(BreadCrumb_1.default, { title: "Borrower Payment History" }),
            React.createElement("div", { className: "card-group" },
                React.createElement("div", { className: "card" },
                    React.createElement("div", { className: "card-header p-0" },
                        React.createElement(LenOptions_1.default, { option: 2, loanUid: this.props.loanUid })),
                    React.createElement("div", { className: "card-body" }, this.renderHistoryGrid())))));
    };
    LenPayments.prototype.renderHistoryGrid = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(kendo_react_excel_export_1.ExcelExport, { ref: function (exporter) { return _this._exporter = exporter; }, data: this.props.currentPage ? this.props.payments : this.props.paymentsAll, fileName: "Borrower_Loan_History.xlsx" }, this.props.columns.map(function (column) { return (React.createElement(kendo_react_excel_export_1.ExcelExportColumn, { key: column.columnName, field: column.columnName, title: column.title, width: Number(column.width), headerCellOptions: { textAlign: 'center' }, cellOptions: { textAlign: column.alignExcel, format: column.formatExcel } })); })),
            React.createElement("div", { className: "form-check mb-2" },
                React.createElement("input", { className: "form-check-input", type: "checkbox", checked: this.props.excludeFunding, onChange: function (event) { return _this.excludeFunding(event); } }),
                React.createElement("label", { className: "form-check-label" }, "Exclude Funding")),
            React.createElement(kendo_react_grid_1.Grid, __assign({ data: this.props.columns.filter(function (column) { return column.checked; }).length > 0 ? this.props.payments : [] }, this.props.gridProps, { sortable: { allowUnsort: true, mode: 'single' }, pageable: { buttonCount: 4, pageSizes: true }, onDataStateChange: this.dataStateChange, resizable: true }),
                React.createElement(kendo_react_grid_1.GridToolbar, null,
                    React.createElement("ul", { className: "list-inline mb-0" },
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement("button", { className: "btn btn-primary", onClick: function () { return _this.fetchPayments(_this.props.excludeFunding, true); } },
                                React.createElement("i", { className: "ti ti-reload" }),
                                React.createElement("span", { className: "d-none d-md-inline" }, " Refresh"))),
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement(reactstrap_1.Dropdown, { isOpen: this.state.dropdownExcel, toggle: this.toggleExcel },
                                React.createElement(reactstrap_1.DropdownToggle, { caret: true, className: "btn btn-primary" },
                                    React.createElement("i", { className: "fa fa-file-excel" }),
                                    React.createElement("span", { className: "d-none d-md-inline" }, " Export")),
                                React.createElement(reactstrap_1.DropdownMenu, null,
                                    React.createElement(reactstrap_1.DropdownItem, { onClick: function (event) { return _this.exportExcel(event, true); } },
                                        React.createElement("i", { className: "ti ti-layout-width-full mr-2" }),
                                        " This page"),
                                    React.createElement(reactstrap_1.DropdownItem, { onClick: function (event) { return _this.exportExcel(event, false); } },
                                        React.createElement("i", { className: "ti ti-layers-alt mr-2" }),
                                        " All pages")))),
                        React.createElement("li", { className: "list-inline-item dropdown mega-dropdown customize-column ml-0" }, this.renderCustomColumns()))),
                this.props.columns.filter(function (column) { return column.checked; }).map(function (column, index) { return (column.enum ? (React.createElement(kendo_react_grid_1.GridColumn, { title: column.title, key: column.columnName, field: column.columnName, className: column.className, width: column.width + "px", format: column.format, columnMenu: function (props) {
                        return React.createElement(kendo_react_grid_1.GridColumnMenuCheckboxFilter, __assign({}, props, { expanded: true, data: column.enum }));
                    }, footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, !column.total ? (index == 0 ? ("Total (" + _this.props.gridProps.total + " rc)") : "") :
                        Functions_1.Utils.currencyFormat(_this.props.summary[column.columnName]))); } })) : (React.createElement(kendo_react_grid_1.GridColumn, { title: column.title, key: column.columnName, field: column.columnName, className: column.className, width: column.width + "px", format: column.format, filter: column.filter, columnMenu: function (props) {
                        return React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
                    }, footerCell: function (props) {
                        return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.currencyFormat(_this.props.summary[props === null || props === void 0 ? void 0 : props.field])));
                    } }))); }))));
    };
    LenPayments.prototype.renderCustomColumns = function () {
        var _this = this;
        return (React.createElement(reactstrap_1.Dropdown, { isOpen: this.state.dropdownColumns, toggle: this.toggleColumns },
            React.createElement(reactstrap_1.DropdownToggle, { caret: true, className: "btn btn-primary waves-effect waves-dark" },
                React.createElement("i", { className: "fa fa-columns" }),
                React.createElement("span", { className: "d-none d-md-inline" }, " Colums")),
            React.createElement(reactstrap_1.DropdownMenu, { className: "animated bounceInDown" },
                React.createElement("form", { name: "customizeColumns", onSubmit: function (event) { return _this.applyChangedColumns(event); } },
                    React.createElement("div", { className: "mega-dropdown-menu row" },
                        React.createElement("div", { className: "col-md-7" },
                            React.createElement("ul", { className: "list-group" }, this.props.columns.map(function (column) { return (React.createElement("li", { key: column.columnName, className: "list-group-item" + (_this.props.activeColumn === column.columnName ? " active" : ""), onClick: function () { return _this.activateColumn(column.columnName); } },
                                React.createElement("div", { className: "form-check" },
                                    React.createElement("input", { className: "form-check-input", type: "checkbox", checked: column.checked, onChange: function (event) { return _this.checkColumn(event, column.columnName); } }),
                                    React.createElement("label", { className: "form-check-label" }, column.title)))); }))),
                        React.createElement("div", { className: "col-md-5 mt-2" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { type: "submit", className: "btn btn-fcicolor btn-block btn-sm" },
                                        React.createElement("i", { className: "ti ti-save" }),
                                        " Apply")),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block btn-sm mt-1", onClick: this.revertColumns },
                                        React.createElement("i", { className: "fa fa-undo" }),
                                        " Cancel")),
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement("button", { className: "btn btn-info btn-block mt-1", onClick: this.moveColumnUp },
                                        React.createElement("i", { className: "fa fa-arrow-up" }))),
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement("button", { className: "btn btn-info btn-block mt-1", onClick: this.movColumnDown },
                                        React.createElement("i", { className: "fa fa-arrow-down" }))),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block btn-sm mt-1", onClick: this.checkAllColumn },
                                        React.createElement("i", { className: "ti ti-check-box" }),
                                        " Check All")),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block btn-sm mt-1", onClick: this.uncheckAllColumn },
                                        React.createElement("i", { className: "ti ti-control-stop" }),
                                        " Uncheck All")))))))));
    };
    return LenPayments;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.lenPayments; }, LenPaymentStore.actions)(LenPayments);
//# sourceMappingURL=LenPayments.js.map