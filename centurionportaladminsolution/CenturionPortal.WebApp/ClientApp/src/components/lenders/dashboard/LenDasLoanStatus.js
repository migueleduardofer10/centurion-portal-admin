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
var ChartBar_1 = require("../charts/ChartBar");
var CardLoading_1 = require("../../shared/CardLoading");
var LenDasLoanStatusStore = require("../../../store/stores/lenders/dashboard/LenDasLoanStatusStore");
require("react-confirm-alert/src/react-confirm-alert.css");
var LoanStatus = /** @class */ (function (_super) {
    __extends(LoanStatus, _super);
    function LoanStatus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { sort: [] };
        _this.expandStatus = function (event) {
            event.preventDefault();
            _this.props.changeCollapse(false);
        };
        _this.collapseStatus = function (event) {
            event.preventDefault();
            _this.props.changeCollapse(true);
        };
        _this.fullScreenStatus = function (event) {
            event.preventDefault();
            _this.props.changeFullScreen(true);
        };
        _this.normalStatus = function (event) {
            event.preventDefault();
            _this.props.changeFullScreen(false);
        };
        _this.refreshLoanStatus = function (event) {
            event.preventDefault();
            _this.props.fetchLoanStatus();
        };
        return _this;
    }
    LoanStatus.prototype.render = function () {
        return (React.createElement("div", { className: "card card-dashboard card-states" + (this.props.fullScreen ? " card-full-screen" : "") },
            React.createElement("div", { className: "card-header" },
                React.createElement("h4", { className: "card-title m-0" }, "Loan By Status"),
                this.renderOptions()),
            React.createElement("div", { className: "card-body" + (this.props.collapse ? " d-none" : "") },
                this.props.loading ? React.createElement(CardLoading_1.default, null) : "",
                React.createElement(ChartBar_1.default, { loading: this.props.loading, update: this.props.update, onUpdate: this.props.updatedPaymentLender, 
                    //onRefresh={this.props.refreshedGraph}
                    categories: this.props.categoriesStatus, series: this.props.seriesStatus }))));
    };
    LoanStatus.prototype.renderOptions = function () {
        return (React.createElement("ul", { className: "card-header-tabs border-light" },
            React.createElement("li", { className: "card-actions" }, this.props.fullScreen ? (React.createElement("button", { type: "button", className: "btn btn-action btn-light", style: { marginTop: "6px" }, onClick: this.normalStatus },
                React.createElement("i", { className: "fa fa-compress m-0" }))) : (React.createElement(react_bootstrap_1.Dropdown, null,
                React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdown-status-options", className: "btn btn-action btn-light" },
                    React.createElement("i", { className: "fa fa-cog m-0" })),
                React.createElement(react_bootstrap_1.Dropdown.Menu, null,
                    this.props.collapse ? (React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.expandStatus },
                        React.createElement("i", { className: "ti-angle-down mr-2" }),
                        " ",
                        React.createElement("span", null, "Expand"))) : (React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.collapseStatus },
                        React.createElement("i", { className: "ti-angle-up mr-2" }),
                        " ",
                        React.createElement("span", null, "Collapse"))),
                    React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.refreshLoanStatus },
                        React.createElement("i", { className: "icon-refresh mr-2" }),
                        " ",
                        React.createElement("span", null, "Refresh")),
                    React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.fullScreenStatus },
                        React.createElement("i", { className: "fa fa-expand mr-2" }),
                        " ",
                        React.createElement("span", null, "Fullscreen"))))))));
    };
    return LoanStatus;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.lenDasLoanStatus; }, LenDasLoanStatusStore.actions)(LoanStatus);
//# sourceMappingURL=LenDasLoanStatus.js.map