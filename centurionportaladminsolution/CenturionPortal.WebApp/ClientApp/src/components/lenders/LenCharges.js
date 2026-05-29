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
var LenChargesStore = require("../../store/stores/lenders/LenChargesStore");
var ChargesDetailsGrid = /** @class */ (function (_super) {
    __extends(ChargesDetailsGrid, _super);
    function ChargesDetailsGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChargesDetailsGrid.prototype.render = function () {
        var _this = this;
        return (React.createElement(kendo_react_grid_1.Grid, { data: this.props.dataItem.ChargesDetails },
            React.createElement(kendo_react_grid_1.GridNoRecords, null, this.props.dataItem.ChargesDetailsIsLoading
                ? React.createElement("div", null,
                    React.createElement("i", { className: "fa fa-spinner fa-spin fa-2x fa-fw text-muted" }),
                    React.createElement("span", { className: "sr-only" }, "Loading..."))
                : "No records available"),
            React.createElement(kendo_react_grid_1.GridColumn, { title: "Date", key: "Date", field: "Date", className: "text-center", width: "40px", format: "{0:d}", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-center font-weight-bold" },
                    "(",
                    _this.props.dataItem.ChargesDetails != null ? _this.props.dataItem.ChargesDetails.length : 0,
                    ")")); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { title: "Payer Name", key: "VendorName", field: "VendorName", className: "text-center", width: "100px" }),
            React.createElement(kendo_react_grid_1.GridColumn, { title: "Reference", key: "Reference", field: "Reference", className: "text-center", width: "80px" }),
            React.createElement(kendo_react_grid_1.GridColumn, { title: "Amount", key: "Amount", field: "Amount", className: "text-right", width: "50px", format: "{0:c}" }),
            React.createElement(kendo_react_grid_1.GridColumn, { title: "Principal", key: "PrinVendor", field: "PrinVendor", className: "text-right", width: "50px", format: "{0:c}", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.currencyFormat(Functions_1.Utils.sum(_this.props.dataItem.ChargesDetails, "PrinVendor")))); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { title: "Interest", key: "IntVendor", field: "IntVendor", className: "text-right", width: "50px", format: "{0:c}", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.currencyFormat(Functions_1.Utils.sum(_this.props.dataItem.ChargesDetails, "IntVendor")))); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { title: "Principal", key: "PrinBehalf", field: "PrinBehalf", className: "text-right", width: "50px", format: "{0:c}", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.currencyFormat(Functions_1.Utils.sum(_this.props.dataItem.ChargesDetails, "PrinBehalf")))); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { title: "Interest", key: "IntBehalf", field: "IntBehalf", className: "text-right", width: "50px", format: "{0:c}", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.currencyFormat(Functions_1.Utils.sum(_this.props.dataItem.ChargesDetails, "IntBehalf")))); } })));
    };
    return ChargesDetailsGrid;
}(kendo_react_grid_1.GridDetailRow));
var LenCharges = /** @class */ (function (_super) {
    __extends(LenCharges, _super);
    function LenCharges() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dropdownExcel: false
        };
        _this.expandChange = function (event) {
            event.dataItem.expanded = !event.dataItem.expanded;
            if (event.dataItem.ChargesDetails == null || event.dataItem.ChargesDetails.Length == 0) {
                _this.props.fetchChargeDetails(event.dataItem, _this.props.chargesPage);
            }
            //else {
            _this.forceUpdate();
            //}
        };
        _this.fetchChargesPage = function (hidePaid, dataState, getColumns, forced) {
            if (hidePaid === void 0) { hidePaid = false; }
            if (getColumns === void 0) { getColumns = false; }
            if (forced === void 0) { forced = false; }
            _this.props.fetchChargesPage(_this.props.match.params.loanUid, hidePaid, dataState, getColumns, forced);
        };
        _this.hidePaid = function (event) {
            _this.fetchChargesPage(event.target.checked, _this.props.gridProps, false, true);
        };
        _this.dataStateChange = function (event) {
            _this.fetchChargesPage(_this.props.hidePaid, event.data);
        };
        _this.exportExcel = function (event, currentPage) {
            if (currentPage === void 0) { currentPage = false; }
            event.preventDefault();
            if (currentPage)
                _this.props.enableExport();
            else
                _this.props.fetchChargesAll();
        };
        _this.toggleExcel = function () {
            _this.setState({ dropdownExcel: !_this.state.dropdownExcel });
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
            _this.props.applyChangedColumns();
        };
        return _this;
    }
    LenCharges.prototype.componentDidMount = function () {
        this.fetchChargesPage(this.props.hidePaid, this.props.gridProps, true);
    };
    LenCharges.prototype.componentDidUpdate = function () {
        if (this.props.exportExcel) {
            this.props.disableExport();
            this._exporter.save();
        }
        if (this.props.forceUpdate) {
            this.props.disableForceUpdate();
            this.forceUpdate();
        }
    };
    LenCharges.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(BreadCrumb_1.default, { title: "Borrower Charges" }),
            React.createElement("div", { className: "card-group" },
                React.createElement("div", { className: "card" },
                    React.createElement("div", { className: "card-header p-0" },
                        React.createElement(LenOptions_1.default, { option: 5, loanUid: this.props.loanUid })),
                    React.createElement("div", { className: "card-body" }, this.renderChargeGrid())))));
    };
    LenCharges.prototype.renderChargeGrid = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(kendo_react_excel_export_1.ExcelExport, { ref: function (exporter) { return _this._exporter = exporter; }, data: this.props.currentPage ? this.props.chargesPage : this.props.chargesAll, fileName: "Lender_Loan_Charges.xlsx" }, this.props.columns.map(function (column) { return (React.createElement(kendo_react_excel_export_1.ExcelExportColumn, { key: column.columnName, field: column.columnName, title: column.title, width: Number(column.width), headerCellOptions: { textAlign: 'center' }, cellOptions: { textAlign: column.alignExcel, format: column.formatExcel } })); })),
            React.createElement("div", { className: "form-check mb-2" },
                React.createElement("input", { className: "form-check-input", type: "checkbox", checked: this.props.hidePaid, onChange: function (event) { return _this.hidePaid(event); } }),
                React.createElement("label", { className: "form-check-label" }, "Hide Paid")),
            React.createElement(kendo_react_grid_1.Grid, __assign({ data: this.props.columns.filter(function (column) { return column.checked; }).length > 0 ? this.props.chargesPage : [] }, this.props.gridProps, { sortable: { allowUnsort: true, mode: 'single' }, pageable: { buttonCount: 4, pageSizes: true }, onDataStateChange: this.dataStateChange, detail: ChargesDetailsGrid, expandField: "expanded", onExpandChange: this.expandChange, resizable: true }),
                React.createElement(kendo_react_grid_1.GridToolbar, null,
                    React.createElement("ul", { className: "list-inline mb-0" },
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement("button", { className: "btn btn-success", onClick: function () { return _this.fetchChargesPage(_this.props.hidePaid, _this.props.gridProps, true, true); } },
                                React.createElement("i", { className: "ti-reload" }),
                                React.createElement("span", { className: "d-none d-md-inline" }, " Refresh"))),
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement(reactstrap_1.Dropdown, { isOpen: this.state.dropdownExcel, toggle: this.toggleExcel },
                                React.createElement(reactstrap_1.DropdownToggle, { caret: true, className: "btn btn-success" },
                                    React.createElement("i", { className: "ti ti-share" }),
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
                    }, footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, !column.total ? (index == 0 ? ("Total (" + _this.props.gridProps.total + " rc)") : "") :
                        Functions_1.Utils.currencyFormat(_this.props.summary[column.columnName]))); } }))); }))));
    };
    LenCharges.prototype.renderCustomColumns = function () {
        var _this = this;
        return (React.createElement(reactstrap_1.ButtonDropdown, { isOpen: this.props.showDropdown, toggle: this.toggleDropdown },
            React.createElement(reactstrap_1.DropdownToggle, { className: "btn btn-success dropdown-toggle waves-effect waves-dark" },
                React.createElement("i", { className: "fa fa-columns" }),
                React.createElement("span", { className: "d-none d-md-inline" }, " Colums")),
            React.createElement("form", { name: "customizeColumns", onSubmit: this.applyChangedColumns },
                React.createElement(reactstrap_1.DropdownMenu, { className: "dropdown-menu animated bounceInDown" },
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
                                        React.createElement("i", { className: "fa fa-save" }),
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
                                        React.createElement("i", { className: "far fa-check-square" }),
                                        " Check All")),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block btn-sm mt-1", onClick: this.uncheckAllColumn },
                                        React.createElement("i", { className: "far fa-square" }),
                                        " Uncheck All")))))))));
    };
    return LenCharges;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.lenCharges; }, LenChargesStore.actions)(LenCharges);
//# sourceMappingURL=LenCharges.js.map