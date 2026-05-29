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
var kendo_react_dateinputs_1 = require("@progress/kendo-react-dateinputs");
var ChartColumn_1 = require("../charts/ChartColumn");
var CardLoading_1 = require("../../shared/CardLoading");
var LenDasPaymentLenderStore = require("../../../store/stores/lenders/dashboard/LenDasPaymentLenderStore");
require("react-confirm-alert/src/react-confirm-alert.css");
var PaymentToLender = /** @class */ (function (_super) {
    __extends(PaymentToLender, _super);
    function PaymentToLender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { sort: [] };
        _this.sortChange = function (event) {
            _this.setState({ sort: event.sort });
        };
        _this.expandLender = function (event) {
            event.preventDefault();
            _this.props.changeCollapse(false);
        };
        _this.collapseLender = function (event) {
            event.preventDefault();
            _this.props.changeCollapse(true);
        };
        _this.fullScreenLender = function (event) {
            event.preventDefault();
            _this.props.changeFullScreen(true);
        };
        _this.normalLender = function (event) {
            event.preventDefault();
            _this.props.changeFullScreen(false);
        };
        _this.changeFromDate = function (event) {
            _this.fetchPaymentsLender(event.target.value, _this.props.toDate);
        };
        _this.changeToDate = function (event) {
            _this.fetchPaymentsLender(_this.props.fromDate, event.target.value);
        };
        _this.fetchPaymentsLender = function (fromDate, toDate) {
            _this.props.fetchPaymentLender(fromDate, toDate);
        };
        _this.refreshPaymentsLender = function (event) {
            event.preventDefault();
            if (_this.props.fromDate && _this.props.toDate)
                _this.props.fetchPaymentLender(_this.props.fromDate, _this.props.toDate, true);
            else
                _this.props.fetchPaymentLender(undefined, undefined, true);
        };
        return _this;
    }
    PaymentToLender.prototype.render = function () {
        return (React.createElement("div", { className: "card card-dashboard card-states" + (this.props.fullScreen ? " card-full-screen" : "") },
            React.createElement("div", { className: "card-header" },
                React.createElement("h4", { className: "card-title m-0" }, "Summary - Payment To Lender(s)"),
                this.renderOptions()),
            React.createElement("div", { className: "card-body" + (this.props.collapse ? " d-none" : "") },
                this.props.loading ? React.createElement(CardLoading_1.default, null) : "",
                React.createElement(ChartColumn_1.default, { loading: this.props.loading, update: this.props.update, onUpdate: this.props.updatedPaymentLender, 
                    //onRefresh={this.props.refreshedGraph}
                    categories: this.props.categoriesLender, series: this.props.seriesLender }),
                React.createElement("div", { className: "mt-3" }, this.renderGridDetail()))));
    };
    PaymentToLender.prototype.renderOptions = function () {
        return (React.createElement("ul", { className: "card-header-tabs border-light" },
            React.createElement("li", null,
                React.createElement("div", { style: { marginTop: "5px" } },
                    React.createElement(kendo_react_dateinputs_1.DatePicker, { max: new Date(), onChange: this.changeFromDate }))),
            React.createElement("li", null,
                React.createElement("div", { style: { marginTop: "5px" } },
                    React.createElement(kendo_react_dateinputs_1.DatePicker, { max: new Date(), onChange: this.changeToDate }))),
            React.createElement("li", { className: "card-actions" }, this.props.fullScreen ? (React.createElement("button", { type: "button", className: "btn btn-action btn-light", style: { marginTop: "6px" }, onClick: this.normalLender },
                React.createElement("i", { className: "fa fa-compress m-0" }))) : (React.createElement(react_bootstrap_1.Dropdown, null,
                React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdown-lender-options", className: "btn btn-action btn-light" },
                    React.createElement("i", { className: "fa fa-cog m-0" })),
                React.createElement(react_bootstrap_1.Dropdown.Menu, null,
                    this.props.collapse ? (React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.expandLender },
                        React.createElement("i", { className: "ti-angle-down mr-2" }),
                        " ",
                        React.createElement("span", null, "Expand"))) : (React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.collapseLender },
                        React.createElement("i", { className: "ti-angle-up mr-2" }),
                        " ",
                        React.createElement("span", null, "Collapse"))),
                    React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.refreshPaymentsLender },
                        React.createElement("i", { className: "icon-refresh mr-2" }),
                        " ",
                        React.createElement("span", null, "Refresh")),
                    React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.fullScreenLender },
                        React.createElement("i", { className: "fa fa-expand mr-2" }),
                        " ",
                        React.createElement("span", null, "Fullscreen"))))))));
    };
    PaymentToLender.prototype.renderGridDetail = function () {
        return (React.createElement(kendo_react_grid_1.Grid, { data: this.props.paymentsLender, sortable: {
                allowUnsort: true,
                mode: 'single'
            }, sort: this.state.sort, onSortChange: this.sortChange, resizable: true, className: "table-noscroll table-vendor" },
            React.createElement(kendo_react_grid_1.GridColumn, { key: "legend", field: "Legend", title: " ", width: "169px" }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "totalAmount", field: "TotalAmount", title: "Total Amount", format: "{0:c}", width: "172px", className: "text-right", headerClassName: "text-right" }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "toInterest", field: "ToInterest", title: "To Interest", format: "{0:c}", width: "172px", className: "text-right", headerClassName: "text-right" }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "toPrincipal", field: "ToPrincipal", title: "To Principal", format: "{0:c}", width: "172px", className: "text-right", headerClassName: "text-right" }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "toLateCharge", field: "ToLateCharge", title: "To Late Charge", format: "{0:c}", width: "172px", className: "text-right", headerClassName: "text-right" }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "other", field: "Other", title: "Other", format: "{0:c}", width: "172px", className: "text-right", headerClassName: "text-right" })));
    };
    return PaymentToLender;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.lenDasPaymentLender; }, LenDasPaymentLenderStore.actions)(PaymentToLender);
//# sourceMappingURL=LenDasPaymentLender.js.map