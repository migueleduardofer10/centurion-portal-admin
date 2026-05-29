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
var react_bootstrap_1 = require("react-bootstrap");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var ChartPie_1 = require("../charts/ChartPie");
var CardLoading_1 = require("../../shared/CardLoading");
var Functions_1 = require("../../../utilities/Functions");
var LenDasPaymentTimeStore = require("../../../store/stores/lenders/dashboard/LenDasPaymentTimeStore");
require("react-confirm-alert/src/react-confirm-alert.css");
var PaymentOnTime = /** @class */ (function (_super) {
    __extends(PaymentOnTime, _super);
    function PaymentOnTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { sort: [] };
        _this.sortChange = function (event) {
            _this.setState({ sort: event.sort });
        };
        _this.expandPayments = function (event) {
            event.preventDefault();
            _this.props.changeCollapse(false);
        };
        _this.collapsePayments = function (event) {
            event.preventDefault();
            _this.props.changeCollapse(true);
        };
        _this.fullScreenPayments = function (event) {
            event.preventDefault();
            _this.props.changeFullScreen(true);
        };
        _this.normalPayments = function (event) {
            event.preventDefault();
            _this.props.changeFullScreen(false);
        };
        return _this;
    }
    PaymentOnTime.prototype.render = function () {
        return (React.createElement("div", { className: "card card-dashboard card-payments" + (this.props.fullScreen ? " card-full-screen" : "") },
            React.createElement("div", { className: "card-header" },
                React.createElement("h4", { className: "card-title m-0" },
                    "Loan Payment  ",
                    React.createElement("span", { className: "text-bold" }, "On Time"),
                    " "),
                React.createElement("span", null, "(Only loans which have payment history)"),
                this.renderOptions()),
            React.createElement("div", { className: "card-body" + (this.props.collapse ? " d-none" : "") },
                this.props.loading ? React.createElement(CardLoading_1.default, null) : "",
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-sm-6" },
                        React.createElement("p", { className: "text-bold text-center m-0 block" }, "Loan Payment On Time"),
                        React.createElement("hr", { className: "separator" }),
                        this.props.selectedPaymentData.length > 0 ? (React.createElement(ChartPie_1.default, { loading: this.props.loading, refresh: this.props.refresh, sumPaymentsA: this.props.sumPaymentsA, sumPaymentsB: this.props.sumPaymentsB, sumPaymentsC: this.props.sumPaymentsC, sumPaymentsD: this.props.sumPaymentsD, sumPaymentsE: this.props.sumPaymentsE, onRefresh: this.props.refreshedPaymentOnTime })) : (React.createElement("div", { className: "text-center mt-3" },
                            React.createElement("span", null, "No data available")))),
                    React.createElement("div", { className: "col-sm-6" },
                        React.createElement("h4", { className: "text-bold text-center" }, "Number of Loans"),
                        React.createElement("h5", { className: "text-bold text-center" }, " which % of their total payments were paid on time"),
                        this.renderGridDetail(),
                        this.props.selectedPaymentData.length > 0 ? (React.createElement("h6", { className: "text-justify mt-3" }, "For Example. In the state of " + this.props.selectedPaymentData[0].stateName + " we have " + this.props.selectedPaymentData[0].e + " loans which the 100% of their payments were paid on time.",
                            React.createElement("br", null), "Another example. In the state of " + this.props.selectedPaymentData[0].stateName + " we have " + this.props.selectedPaymentData[0].a + " loans which the 0% - 40% of their total payments were paid on time.")) : "")))));
    };
    PaymentOnTime.prototype.renderOptions = function () {
        return (React.createElement("ul", { className: "card-header-tabs border-light" },
            React.createElement("li", { className: "card-actions" }, this.props.fullScreen ? (React.createElement("button", { type: "button", className: "btn btn-action btn-light", style: { marginTop: "17px" }, onClick: this.normalPayments },
                React.createElement("i", { className: "fa fa-compress m-0" }))) : (React.createElement(react_bootstrap_1.Dropdown, null,
                React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdown-payments-options", className: "btn btn-action btn-light" },
                    React.createElement("i", { className: "fa fa-cog m-0" })),
                React.createElement(react_bootstrap_1.Dropdown.Menu, null,
                    this.props.collapse ? (React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.expandPayments },
                        React.createElement("i", { className: "ti-angle-down mr-2" }),
                        " ",
                        React.createElement("span", null, "Expand"))) : (React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.collapsePayments },
                        React.createElement("i", { className: "ti-angle-up mr-2" }),
                        " ",
                        React.createElement("span", null, "Collapse"))),
                    React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.fullScreenPayments },
                        React.createElement("i", { className: "fa fa-expand mr-2" }),
                        " ",
                        React.createElement("span", null, "Fullscreen"))))))));
    };
    PaymentOnTime.prototype.renderGridDetail = function () {
        var _this = this;
        return (React.createElement(kendo_react_grid_1.Grid, { data: this.props.selectedPaymentData, sortable: {
                allowUnsort: true,
                mode: 'single'
            }, sort: this.state.sort, onSortChange: this.sortChange, resizable: true, className: "table-noscroll table-dashboard" },
            React.createElement(kendo_react_grid_1.GridColumn, { key: "stateName", field: "StateName", title: "State", width: "87px", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "font-weight-bold" },
                    "Count: ",
                    _this.props.selectedPaymentData.length)); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "a", field: "A", title: "[0 - 40]", format: "{0:n0}", width: "80px", className: "text-right", headerClassName: "text-right", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.decimalFormat(_this.props.selectedPaymentData.length > 0 ? _this.props.selectedPaymentData.map(function (x) { return x.A; }).reduce(function (a, b) { return a + b; }) : 0))); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "b", field: "B", title: "[41 - 60]", format: "{0:n0}", width: "80px", className: "text-right", headerClassName: "text-right", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.decimalFormat(_this.props.selectedPaymentData.length > 0 ? _this.props.selectedPaymentData.map(function (x) { return x.B; }).reduce(function (a, b) { return a + b; }) : 0))); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "c", field: "C", title: "[61 - 80]", format: "{0:n0}", width: "80px", className: "text-right", headerClassName: "text-right", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.decimalFormat(_this.props.selectedPaymentData.length > 0 ? _this.props.selectedPaymentData.map(function (x) { return x.C; }).reduce(function (a, b) { return a + b; }) : 0))); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "d", field: "D", title: "[81 - 99]", format: "{0:n0}", width: "80px", className: "text-right", headerClassName: "text-right", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.decimalFormat(_this.props.selectedPaymentData.length > 0 ? _this.props.selectedPaymentData.map(function (x) { return x.D; }).reduce(function (a, b) { return a + b; }) : 0))); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "e", field: "E", title: "[100]", format: "{0:n0}", width: "80px", className: "text-right", headerClassName: "text-right", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.decimalFormat(_this.props.selectedPaymentData.length > 0 ? _this.props.selectedPaymentData.map(function (x) { return x.E; }).reduce(function (a, b) { return a + b; }) : 0))); } })));
    };
    return PaymentOnTime;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.lenDasPaymentTime; }, LenDasPaymentTimeStore.actions)(PaymentOnTime);
//# sourceMappingURL=LenDasPaymentTime.js.map