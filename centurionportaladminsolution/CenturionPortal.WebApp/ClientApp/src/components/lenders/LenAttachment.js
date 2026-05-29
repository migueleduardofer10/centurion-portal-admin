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
exports.LenAttachment_TaxForms_Url = exports.LenAttachment_NotificationOfDeposit_Url = exports.LenAttachment_LenderStatements_Url = exports.LenAttachment_Url = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var Functions_1 = require("../../utilities/Functions");
var Enums = require("../../utilities/Enums");
var LenAttachmentStore = require("../../store/stores/lenders/LenAttachmentStore");
var kendo_react_excel_export_1 = require("@progress/kendo-react-excel-export");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var reactstrap_1 = require("reactstrap");
var RangeDate_1 = require("../shared/RangeDate");
var LenAttachment = /** @class */ (function (_super) {
    __extends(LenAttachment, _super);
    function LenAttachment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dropDownExcel: false,
            dropDownColumn: false,
        };
        _this.filterChange = function (event) {
            _this.props.filterChange(event.value);
        };
        _this.dataStateChange = function (event) {
            var _a;
            _this.props.fetchAttachmentsPage((_a = _this.props.currentLender) === null || _a === void 0 ? void 0 : _a.Uid, _this.props.viewType, _this.props.filterDateFrom, _this.props.filterDateTo, event.data, false, false);
        };
        _this.downloadAttachment = function (dataItem) {
            _this.props.downloadAttchment(dataItem.Uid, dataItem.Description, _this.props.viewType);
        };
        _this.exportExcel = function (event, currentPage) {
            var _a;
            if (currentPage === void 0) { currentPage = false; }
            event.preventDefault();
            if (currentPage)
                _this.props.enableExport(true);
            else
                _this.props.fetchAttachmentsAll((_a = _this.props.currentLender) === null || _a === void 0 ? void 0 : _a.Uid, _this.props.viewType);
        };
        _this.fetchAttachment = function (dataState, getColumns, force) {
            var _a;
            if (getColumns === void 0) { getColumns = false; }
            if (force === void 0) { force = false; }
            _this.props.fetchAttachmentsPage((_a = _this.props.currentLender) === null || _a === void 0 ? void 0 : _a.Uid, _this.props.viewType, _this.props.filterDateFrom, _this.props.filterDateTo, dataState, getColumns, false, force);
        };
        _this.fetchResumenInformation = function (event) {
            _this.props.fetchResumenInformation(event.target.value);
            _this.props.fetchAttachmentsPage(event.target.value, _this.props.viewType, _this.props.filterDateFrom, _this.props.filterDateTo, _this.props.gridProps, false, true);
        };
        _this.setViewType = function (viewType) {
            _this.props.setViewType(viewType);
            _this.props.fetchServiceMaps(viewType);
            _this.props.fetchAttachmentsPage('', viewType, _this.props.filterDateFrom, _this.props.filterDateTo, _this.props.gridProps, false);
        };
        _this.toggleExcel = function () {
            _this.setState({ dropDownExcel: !_this.state.dropDownExcel });
        };
        return _this;
    }
    LenAttachment.prototype.componentDidMount = function () {
        this.setViewType(Functions_1.Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.viewType, false));
    };
    LenAttachment.prototype.componentDidUpdate = function () {
        if (this.props.viewType !== Functions_1.Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.viewType, false)) {
            this.setViewType(Functions_1.Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.viewType, false));
        }
        if (this.props.exportExcel) {
            this.props.disableExport();
            this._exporter.save();
        }
        if (this.props.forceUpdate) {
            this.props.disabledForceUpdate();
            this.forceUpdate();
        }
        if (this.props.fetchAutomatic) {
            this.props.disabledFetchAutomatic();
            this.fetchAttachment(this.props.gridProps, false, true);
        }
    };
    LenAttachment.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "card-group" },
                React.createElement("div", { className: "card" },
                    React.createElement("div", { className: "card-header p-2 text-center" }, Functions_1.Utils.getValueEnum(Enums.AttachmentViewEnum, this.props.viewType)),
                    React.createElement("div", { className: "card-body p-1" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-md-4" }, this.renderLoanInformation()),
                            React.createElement("div", { className: "col-md-8" },
                                this.props.viewType !== Enums.AttachmentViewEnum.TAX_FORMS
                                    ?
                                        React.createElement("div", { className: "row" },
                                            React.createElement("div", { className: "col-md-12" },
                                                React.createElement(RangeDate_1.default, { filterButton: true, onChange: this.filterChange, onClick: function () { return _this.fetchAttachment(_this.props.gridProps, false, true); }, nameDateFrom: "filterDateFrom", nameDateTo: "filterDateTo", nameRangeType: "filterRangeDate", valueDateFrom: this.props.filterDateFrom, valueDateTo: this.props.filterDateTo, valueRangeType: this.props.filterRangeDate })))
                                    : "",
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "col-md-12" }, this.renderGrilla())))))))));
    };
    LenAttachment.prototype.renderLoanInformation = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "card-group" },
                React.createElement("div", { className: "card mb-1" },
                    React.createElement("div", { className: "card-header p-1 pl-2" }, "Account"),
                    React.createElement("div", { className: "card-body p-1 pt-2 m-0" },
                        React.createElement("div", { className: "form-group col-12 pl-1 pr-1" },
                            React.createElement("span", { className: "align-middle" },
                                React.createElement("select", { className: "form-control form-control-sm text-dark p-0", name: "Account", onChange: this.fetchResumenInformation },
                                    React.createElement("option", { value: "" }, "ALL"),
                                    this.props.serviceMaps.map(function (s) {
                                        return React.createElement("option", { key: s.ParentUid, value: s.ParentUid }, s.Account + " - " + s.FullName);
                                    }))))))),
            React.createElement("div", { className: "card-group" },
                React.createElement("div", { className: "card" },
                    React.createElement("div", { className: "card-header p-1 text-center" }, "Lender Information"),
                    React.createElement("div", { className: "card-body p-2 pt-1 pb-1" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-6 data-label" }, "FCI Service Program"),
                            React.createElement("div", { className: "col-6 data-display text-right" }, this.props.currentLender !== undefined ? (this.props.currentLender.DepartmentUid == 1 ? "Specialty" : "Standard") : '')),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-6 data-label" }, "Street"),
                            React.createElement("div", { className: "col-6 data-display text-right" }, this.props.currentLender !== undefined ? this.props.currentLender.Street : '')),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-6 data-label" }, "City"),
                            React.createElement("div", { className: "col-6 data-display text-right" }, this.props.currentLender !== undefined ? this.props.currentLender.City : '')),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-6 data-label" }, "State"),
                            React.createElement("div", { className: "col-6 data-display text-right" }, this.props.currentLender !== undefined ? this.props.currentLender.State : '')),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-6 data-label" }, "Zip Code"),
                            React.createElement("div", { className: "col-6 data-display text-right" }, this.props.currentLender !== undefined ? this.props.currentLender.ZipCode : '')),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-6 data-label" }, "Home Phone"),
                            React.createElement("div", { className: "col-6 data-display text-right" }, this.props.currentLender !== undefined ? this.props.currentLender.HomePhone : '')),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-6 data-label" }, "Work Phone"),
                            React.createElement("div", { className: "col-6 data-display text-right" }, this.props.currentLender !== undefined ? this.props.currentLender.WorkPhone : '')),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-6 data-label" }, "Mobile Phone"),
                            React.createElement("div", { className: "col-6 data-display text-right" }, this.props.currentLender !== undefined ? this.props.currentLender.MobilePhone : '')),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-6 data-label" }, "Fax"),
                            React.createElement("div", { className: "col-6 data-display text-right" }, this.props.currentLender !== undefined ? this.props.currentLender.Fax : '')),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-6 data-label" }, "Email"),
                            React.createElement("div", { className: "col-6 data-display text-right" }, this.props.currentLender !== undefined ? this.props.currentLender.Email : '')))))));
    };
    LenAttachment.prototype.renderGrilla = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(kendo_react_excel_export_1.ExcelExport, { ref: function (exporter) { return _this._exporter = exporter; }, data: this.props.exportCurrentPage ? this.props.attachmentPage : this.props.attachmentAll, fileName: this.props.match.params.viewType + "-" +
                    (this.props.currentLender != undefined ? this.props.currentLender.Account : "all_account") + "-" +
                    (this.props.exportCurrentPage ? "page" + ((this.props.gridProps.skip / this.props.gridProps.take) + 1) : "all_pages") +
                    ".xlsx" }, this.props.columns.map(function (column) { return ((_this.props.currentLender === undefined || _this.props.currentLender.Uid === undefined || (_this.props.currentLender.Uid !== "" && column.columnName !== "ParentAccount"))
                ? React.createElement(kendo_react_excel_export_1.ExcelExportColumn, { key: column.columnName, field: column.columnName, title: column.title, width: Number(column.width), headerCellOptions: { textAlign: 'center' }, cellOptions: { textAlign: column.alignExcel } })
                : ""); })),
            React.createElement(kendo_react_grid_1.Grid, __assign({ data: this.props.columns.filter(function (column) { return column.checked; }).length > 0 ? this.props.attachmentPage : [] }, this.props.gridProps, { sortable: { allowUnsort: true, mode: 'single' }, pageable: { buttonCount: 4, pageSizes: true }, onDataStateChange: this.dataStateChange, className: "table-noscroll", resizable: true }),
                React.createElement(kendo_react_grid_1.GridToolbar, null,
                    React.createElement("ul", { className: "list-inline mb-0" },
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement("button", { className: "btn btn-block btn-primary", onClick: function () { return _this.fetchAttachment(_this.props.gridProps, false, true); } },
                                React.createElement("i", { className: "ti-reload" }),
                                React.createElement("span", { className: "d-none d-md-inline" }, " Refresh"))),
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement(reactstrap_1.Dropdown, { isOpen: this.state.dropDownExcel, toggle: this.toggleExcel },
                                React.createElement(reactstrap_1.DropdownToggle, { className: "btn btn-block btn-primary dropdown-toggle" },
                                    React.createElement("i", { className: "ti ti-share" }),
                                    React.createElement("span", { className: "d-none d-md-inline" }, " Export")),
                                React.createElement(reactstrap_1.DropdownMenu, null,
                                    React.createElement(reactstrap_1.DropdownItem, { className: "dropdown-item btn-fcicolor btn-sm p-2 pl-3", onClick: function (event) { return _this.exportExcel(event, true); } },
                                        React.createElement("i", { className: "ti ti-layout-width-full mr-2" }),
                                        " This page"),
                                    React.createElement(reactstrap_1.DropdownItem, { className: "dropdown-item btn-fcicolor btn-sm p-2 pl-3", onClick: function (event) { return _this.exportExcel(event, false); } },
                                        React.createElement("i", { className: "ti ti-layers-alt mr-2" }),
                                        " All pages")))))),
                this.props.columns.filter(function (column) { return column.checked; }).length > 0 ? (React.createElement(kendo_react_grid_1.GridColumn, { title: "", width: "30px", cell: function (props) { return (React.createElement("td", null,
                        React.createElement("button", { className: "badge mr-2", title: "download", onClick: function () { return _this.downloadAttachment(props.dataItem); } },
                            React.createElement("i", { className: "fa fa-download" })))); } })) : "",
                this.props.columns.filter(function (column) { return column.checked; }).map(function (column) { return ((_this.props.currentLender === undefined || _this.props.currentLender.Uid === undefined || (_this.props.currentLender.Uid !== "" && column.columnName !== "ParentAccount"))
                    ? React.createElement(kendo_react_grid_1.GridColumn, { title: column.title, key: column.columnName, field: column.columnName, className: column.className, width: column.width + "px", format: column.format, filter: column.filter, columnMenu: function (props) {
                            return React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
                        } })
                    : ""); }))));
    };
    return LenAttachment;
}(React.PureComponent));
exports.LenAttachment_Url = '/attachment/:viewType';
exports.LenAttachment_LenderStatements_Url = '/attachment/' + Functions_1.Utils.getValueEnum(Enums.AttachmentViewEnum, Enums.AttachmentViewEnum.LENDER_STATEMENTS, false).toLowerCase();
exports.LenAttachment_NotificationOfDeposit_Url = '/attachment/' + Functions_1.Utils.getValueEnum(Enums.AttachmentViewEnum, Enums.AttachmentViewEnum.NOTIFICATION_OF_DEPOSIT, false).toLowerCase();
exports.LenAttachment_TaxForms_Url = '/attachment/' + Functions_1.Utils.getValueEnum(Enums.AttachmentViewEnum, Enums.AttachmentViewEnum.TAX_FORMS, false).toLowerCase();
exports.default = react_redux_1.connect(function (state) { return state.lenAttachment; }, LenAttachmentStore.actions)(LenAttachment);
//# sourceMappingURL=LenAttachment.js.map