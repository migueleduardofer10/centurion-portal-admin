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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LenPortfolioReports_LoanCashFlow_Url = exports.LenPortfolioReports_LenderDisbursement_Url = exports.LenPortfolioReports_InvestorEarnings_Url = exports.LenPortfolioReports_FCTimesLines_Url = exports.LenPortfolioReports_ACHStatus_Url = exports.LenPortfolioReports_Url = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var reactstrap_1 = require("reactstrap");
var RangeDate_1 = require("../shared/RangeDate");
var UserSetting_1 = require("../users/UserSetting");
var kendo_react_inputs_1 = require("@progress/kendo-react-inputs");
var LenderCommon_1 = require("../../store/commons/LenderCommon");
var LenPortfolioReports = /** @class */ (function (_super) {
    __extends(LenPortfolioReports, _super);
    function LenPortfolioReports() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dropDownExport: false,
            IncludePrint: true,
            LenderDisbursementColumns: LenderCommon_1.initialLenderDisbursement
        };
        _this.SwitchOnChange = function () {
            _this.setState({ IncludePrint: !_this.state.IncludePrint });
        };
        _this.toggleExport = function () {
            _this.setState({ dropDownExport: !_this.state.dropDownExport });
        };
        return _this;
    }
    LenPortfolioReports.prototype.componentDidMount = function () {
        //this.setViewType(Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.reportType, false) as number);
    };
    LenPortfolioReports.prototype.componentDidUpdate = function () {
        //if (this.props.viewType !== Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.reportType, false)) {
        //    this.setViewType(Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.reportType, false) as number);
        //}
        //if (this.props.exportExcel) {
        //    this.props.disableExport();
        //    this._exporter.save();
        //}
        //if (this.props.forceUpdate) {
        //    this.props.disabledForceUpdate();
        //    this.forceUpdate();
        //}
        //if (this.props.fetchAutomatic) {
        //    this.props.disabledFetchAutomatic();
        //    this.fetchAttachment(this.props.gridProps, false, true);
        //}
    };
    LenPortfolioReports.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(UserSetting_1.UserSetting_Card, { title: 'Lender Disbursement', cardBodyClassName: 'p-1 ' },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-6" },
                        React.createElement(UserSetting_1.UserSetting_Card, { title: 'General Information ', cardBodyClassName: 'p-1' },
                            React.createElement("div", { className: "form-row p-1 mr-1 d-inline-flex" },
                                React.createElement("div", { className: "col-12" })))),
                    React.createElement("div", { className: "col-6" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-12" },
                                React.createElement(UserSetting_1.UserSetting_Card, { title: 'Lender Disbursement Information ', cardBodyClassName: 'p-1' },
                                    React.createElement("div", { className: 'form-row p-1 mr-1 d-inline-flex' },
                                        React.createElement("div", { className: "d-inline-block" },
                                            React.createElement("small", null, "Include Print:")),
                                        React.createElement("div", { className: "d-inline-block" },
                                            React.createElement(kendo_react_inputs_1.Switch, { checked: this.state.IncludePrint, onChange: this.SwitchOnChange })))))),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-12" },
                                React.createElement(RangeDate_1.default, { filterButton: false }))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-12" },
                        React.createElement(kendo_react_grid_1.Grid, { className: "table-scroll", scrollable: "scrollable", resizable: true },
                            React.createElement(kendo_react_grid_1.GridToolbar, null,
                                React.createElement("ul", { className: "list-inline mb-0" },
                                    React.createElement("li", { className: "list-inline-item ml-0" },
                                        React.createElement("button", { className: "btn btn-block btn-primary" },
                                            React.createElement("i", { className: "ti-reload" }),
                                            React.createElement("span", { className: "d-none d-md-inline" }, " Refresh"))),
                                    React.createElement("li", { className: "list-inline-item ml-0" },
                                        React.createElement(reactstrap_1.Dropdown, { isOpen: this.state.dropDownExport, toggle: this.toggleExport },
                                            React.createElement(reactstrap_1.DropdownToggle, { className: "btn btn-block btn-primary dropdown-toggle" },
                                                React.createElement("i", { className: "ti ti-share" }),
                                                React.createElement("span", { className: "d-none d-md-inline" }, " Export")),
                                            React.createElement(reactstrap_1.DropdownMenu, null,
                                                React.createElement(reactstrap_1.DropdownItem, { className: "dropdown-item btn-fcicolor btn-sm p-2 pl-3" },
                                                    React.createElement("i", { className: "ti ti-layout-width-full mr-2" }),
                                                    " Excel"),
                                                React.createElement(reactstrap_1.DropdownItem, { className: "dropdown-item btn-fcicolor btn-sm p-2 pl-3" },
                                                    React.createElement("i", { className: "ti ti-layers-alt mr-2" }),
                                                    " PDF")))))),
                            this.state.LenderDisbursementColumns.filter(function (column) { return column.checked; }).map(function (column) { return (React.createElement(kendo_react_grid_1.GridColumn, { title: column.title, key: column.columnName, field: column.columnName, className: column.className, width: column.width + "px", format: column.format })); })))))));
    };
    return LenPortfolioReports;
}(React.PureComponent));
exports.LenPortfolioReports_Url = '/PortfolioReports/:reportType';
exports.LenPortfolioReports_ACHStatus_Url = '/reports/achstatus';
//export const LenPortfolioReports_ACHStatus_Url = '/PortfolioReports/ACHStatus';
exports.LenPortfolioReports_FCTimesLines_Url = '/PortfolioReports/FCTimesLines';
exports.LenPortfolioReports_InvestorEarnings_Url = '/PortfolioReports/InvestorEarnings';
exports.LenPortfolioReports_LenderDisbursement_Url = '/PortfolioReports/LenderDisbursement';
exports.LenPortfolioReports_LoanCashFlow_Url = '/PortfolioReports/LoanCashFlow';
//export const LenReport_LenderDisbursement_Url = '/report/' + Utils.getValueEnum(Enums.AttachmentViewEnum, Enums.AttachmentViewEnum.LENDER_STATEMENTS, false).toLowerCase();
exports.default = react_redux_1.connect(
/*(state: ApplicationState) => state.lenAttachment, LenAttachmentStore.actions*/
)(LenPortfolioReports);
//# sourceMappingURL=LenPortfolioReports.js.map