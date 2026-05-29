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
var TabsInvoices = /** @class */ (function (_super) {
    __extends(TabsInvoices, _super);
    function TabsInvoices() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeClass = function (option) { return (_this.props.option === option ? " active" : ""); };
        return _this;
    }
    TabsInvoices.prototype.render = function () {
        return (React.createElement("ul", { className: "nav nav-tabs mb-0" },
            React.createElement("li", { className: "nav-item" },
                React.createElement(react_router_dom_1.Link, { className: "nav-link" + this.activeClass(1), to: "/invoice/pending" }, "Pending Invoices")),
            React.createElement("li", { className: "nav-item" },
                React.createElement(react_router_dom_1.Link, { className: "nav-link" + this.activeClass(2), to: "/invoice/paid" }, "Paid Invoices"))));
    };
    return TabsInvoices;
}(React.PureComponent));
exports.default = TabsInvoices;
//# sourceMappingURL=TabsInvoices.js.map