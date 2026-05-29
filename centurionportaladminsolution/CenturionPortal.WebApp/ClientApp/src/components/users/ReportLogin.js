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
var React = require("react");
var react_redux_1 = require("react-redux");
require("hammerjs");
var BreadCrumb_1 = require("../shared/BreadCrumb");
var ReportLoginStore = require("../../store/stores/users/ReportLoginStore");
var ChartPie_1 = require("./charts/ChartPie");
var ChartColumn_1 = require("./charts/ChartColumn");
var Enums_1 = require("../../utilities/Enums");
var ReportLogin = /** @class */ (function (_super) {
    __extends(ReportLogin, _super);
    function ReportLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (event) {
            var value = Number(event.target.value);
            if (isNaN(value))
                return;
            if (event.target.name == 'Status' && _this.props.filters.ChkStatus)
                return;
            if (event.target.name == 'UserType' && _this.props.filters.ChkUserType)
                return;
            _this.props.changeFilters(event.target.name, value);
            _this.props.fetchLoginUser();
        };
        _this.onCheckChange = function (event) {
            _this.props.changeFilters(event.target.name, event.target.checked);
            _this.props.fetchLoginUser();
        };
        return _this;
    }
    ReportLogin.prototype.componentDidMount = function () {
        this.props.fetchLoginUser();
    };
    ReportLogin.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(BreadCrumb_1.default, { title: "Report Login" }),
            React.createElement("div", { className: "card card-dashboard card-states" },
                React.createElement("div", { className: "card-body p-3" },
                    React.createElement("div", { className: "d-sm-flex pb-2 mb-3 border-bottom" },
                        React.createElement("div", { className: "form-inline" },
                            React.createElement("div", { className: "form-group mr-sm-3 mb-0" },
                                React.createElement("select", { className: "form-control form-control-sm", id: "Chart", name: "Chart", value: this.props.filters.Chart, onChange: this.onChange },
                                    React.createElement("option", { value: "0" }, "Today"),
                                    React.createElement("option", { value: "1" }, "Last Seven Days"),
                                    React.createElement("option", { value: "2" }, "Last Month"),
                                    React.createElement("option", { value: "3" }, "Year to Date"),
                                    React.createElement("option", { value: "4" }, "Last Year"),
                                    React.createElement("option", { value: "5" }, "All Date"))),
                            React.createElement("div", { className: "form-group mr-sm-3 mb-0" },
                                React.createElement("label", { htmlFor: "Status", className: "text-bold m-0 mr-2" }, "User Status:"),
                                React.createElement("div", { className: "form-check mr-sm-3" },
                                    React.createElement("input", { className: "form-check-input", type: "checkbox", id: "ChkStatus", name: "ChkStatus", checked: this.props.filters.ChkStatus, onChange: this.onCheckChange }),
                                    React.createElement("label", { className: "form-check-label m-0 ml-1", htmlFor: "ChkStatus" }, "Combine")),
                                React.createElement("select", { className: "form-control form-control-sm", id: "Status", name: "Status", value: this.props.filters.Status, onChange: this.onChange, disabled: this.props.filters.ChkStatus }, Enums_1.EnumToArray(Enums_1.StatusEnum).map(function (option, index) { return (React.createElement("option", { key: index, value: option.value }, option.label)); }))),
                            React.createElement("div", { className: "form-group mb-0" },
                                React.createElement("label", { htmlFor: "UserType", className: "text-bold m-0 mr-2" }, "User Type:"),
                                React.createElement("div", { className: "form-check mr-sm-3" },
                                    React.createElement("input", { className: "form-check-input", type: "checkbox", id: "ChkUserType", name: "ChkUserType", checked: this.props.filters.ChkUserType, onChange: this.onCheckChange }),
                                    React.createElement("label", { className: "form-check-label m-0 ml-1", htmlFor: "ChkUserType" }, "Combine")),
                                React.createElement("select", { className: "form-control form-control-sm", id: "UserType", name: "UserType", value: this.props.filters.UserType, onChange: this.onChange, disabled: this.props.filters.ChkUserType }, Enums_1.EnumToArray(Enums_1.UserTypeEnum).map(function (option, index) { return (React.createElement("option", { key: index, value: option.value }, option.label)); }))))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-6" },
                            React.createElement("h4", { className: "title-charts text-center" }, this.props.titleCharts),
                            React.createElement("div", { style: { overflowX: "auto" } },
                                React.createElement(ChartColumn_1.default, { titleValueAxis: this.props.titleValueAxis, categories: this.props.categoriesChartColumn, series: this.props.seriesChartColumn, update: this.props.updateChartColumn, disableUpdate: this.props.disableUpdateChartColumn }))),
                        React.createElement("div", { className: "col-md-6" },
                            React.createElement("h4", { className: "title-charts text-center" }, this.props.titleCharts),
                            React.createElement("h5", { className: "subtitle-charts text-center" }, this.props.subTitleChartPie),
                            React.createElement("div", { style: { overflowX: "auto" } },
                                React.createElement(ChartPie_1.default, { series: this.props.seriesChartPie, update: this.props.updateChartPie, disableUpdate: this.props.disableUpdateChartPie }))))))));
    };
    return ReportLogin;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.reportLogin; }, ReportLoginStore.actions)(ReportLogin);
//# sourceMappingURL=ReportLogin.js.map