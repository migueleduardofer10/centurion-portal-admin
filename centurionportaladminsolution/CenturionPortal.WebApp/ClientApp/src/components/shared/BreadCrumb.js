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
var BreadCrumb = /** @class */ (function (_super) {
    __extends(BreadCrumb, _super);
    function BreadCrumb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BreadCrumb.prototype.componentDidMount = function () {
        var title = (this.props.title ? this.props.title : 'Home') + ' - Loan Information & Reporting Servicing';
        document.getElementsByTagName("title")[0].innerText = title;
    };
    BreadCrumb.prototype.render = function () {
        return (React.createElement("div", { className: "page-header" },
            React.createElement("h3", { className: "page-title" }, this.props.title),
            React.createElement("nav", { "aria-label": "breadcrumb" },
                React.createElement("ol", { className: "breadcrumb" },
                    React.createElement("li", { className: "breadcrumb-item" },
                        React.createElement(react_router_dom_1.Link, { to: "/dashboard" }, "Dashboard")),
                    this.props.title ? React.createElement("li", { className: "breadcrumb-item active", "aria-current": "page" }, this.props.title) : ""))));
    };
    return BreadCrumb;
}(React.PureComponent));
exports.default = BreadCrumb;
//# sourceMappingURL=BreadCrumb.js.map