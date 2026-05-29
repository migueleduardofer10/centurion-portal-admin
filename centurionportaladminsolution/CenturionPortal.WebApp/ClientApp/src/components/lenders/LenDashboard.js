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
var LenDashboardStore = require("../../store/stores/lenders/dashboard/LenDashboardStore");
require("hammerjs");
var BreadCrumb_1 = require("../shared/BreadCrumb");
var LenDasLoanStates_1 = require("./dashboard/LenDasLoanStates");
var LenDasLoanStatus_1 = require("./dashboard/LenDasLoanStatus");
var LenDasPaymentTime_1 = require("./dashboard/LenDasPaymentTime");
var LenDasPaymentLender_1 = require("./dashboard/LenDasPaymentLender");
var LenDasPaymentBorrower_1 = require("./dashboard/LenDasPaymentBorrower");
var LenDashboard = /** @class */ (function (_super) {
    __extends(LenDashboard, _super);
    function LenDashboard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fetchData = function () {
            _this.props.fetchData();
        };
        return _this;
    }
    LenDashboard.prototype.componentDidMount = function () {
        this.fetchData();
    };
    LenDashboard.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(BreadCrumb_1.default, { title: "Lender Dashboard" }),
            React.createElement(LenDasLoanStates_1.default, null),
            React.createElement(LenDasPaymentTime_1.default, null),
            React.createElement(LenDasPaymentLender_1.default, null),
            React.createElement(LenDasPaymentBorrower_1.default, null),
            React.createElement(LenDasLoanStatus_1.default, null)));
    };
    return LenDashboard;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.lenDashboard; }, LenDashboardStore.actions)(LenDashboard);
//# sourceMappingURL=LenDashboard.js.map