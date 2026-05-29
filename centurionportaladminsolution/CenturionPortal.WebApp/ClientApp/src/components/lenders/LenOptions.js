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
var react_router_dom_1 = require("react-router-dom");
var LenFunding_1 = require("./LenFunding");
var LenNotes_1 = require("./LenNotes");
var LenOptions = /** @class */ (function (_super) {
    __extends(LenOptions, _super);
    function LenOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeClass = function (option) { return (_this.props.option === option ? " active" : ""); };
        _this.toggleModal = function (event) { return event.preventDefault(); };
        return _this;
    }
    LenOptions.prototype.render = function () {
        return (React.createElement("ul", { className: "nav nav-tabs mb-0" },
            React.createElement("li", { className: "nav-item" },
                React.createElement(react_router_dom_1.Link, { className: "nav-link" + this.activeClass(0), to: "/lender/loans" },
                    React.createElement("i", { className: "ti-arrow-left" }),
                    " Back to Loans")),
            React.createElement("li", { className: "nav-item" },
                React.createElement(react_router_dom_1.Link, { className: "nav-link" + this.activeClass(1), to: {
                        pathname: LenFunding_1.LenFunding_Url,
                        state: { LoanUid: this.props.loanUid }
                    } }, "Funding")),
            React.createElement("li", { className: "nav-item" },
                React.createElement(react_router_dom_1.Link, { className: "nav-link" + this.activeClass(2), to: "/lender/loan/" + this.props.loanUid + "/payments" }, "Payments")),
            React.createElement("li", { className: "nav-item" },
                React.createElement(react_router_dom_1.Link, { className: "nav-link" + this.activeClass(3), to: {
                        pathname: LenNotes_1.LenNotes_Url,
                        state: { LoanUid: this.props.loanUid }
                    } }, "Notes")),
            React.createElement("li", { className: "nav-item" },
                React.createElement(react_router_dom_1.Link, { className: "nav-link" + this.activeClass(4), to: "/lender/loan/" + this.props.loanUid + "/attachments" }, "Attachments")),
            React.createElement("li", { className: "nav-item" },
                React.createElement(react_router_dom_1.Link, { className: "nav-link" + this.activeClass(5), to: "/lender/loan/" + this.props.loanUid + "/charges" }, "Charges")),
            React.createElement("li", { className: "nav-item" },
                React.createElement("a", { href: "#", className: "nav-link" + this.activeClass(6), onClick: this.toggleModal }, "Reports")),
            React.createElement("li", { className: "nav-item" },
                React.createElement("a", { href: "#", className: "nav-link" + this.activeClass(7), onClick: this.toggleModal }, "Contact FCI"))));
    };
    return LenOptions;
}(React.PureComponent));
exports.default = LenOptions;
//# sourceMappingURL=LenOptions.js.map