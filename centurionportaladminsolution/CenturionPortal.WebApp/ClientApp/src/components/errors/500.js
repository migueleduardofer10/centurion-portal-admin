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
var Functions_1 = require("../../utilities/Functions");
var Error500 = /** @class */ (function (_super) {
    __extends(Error500, _super);
    function Error500() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error500.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "d-flex align-items-center text-center error-page bg-primary pt-5 pb-4 h-100" },
                React.createElement("div", { className: "row flex-grow" },
                    React.createElement("div", { className: "col-lg-7 mx-auto text-white" },
                        React.createElement("div", { className: "row align-items-center d-flex flex-row" },
                            React.createElement("div", { className: "col-lg-6 text-lg-right pr-lg-4" },
                                React.createElement("h1", { className: "display-1 mb-0" }, "500")),
                            React.createElement("div", { className: "col-lg-6 error-page-divider text-lg-left pl-lg-4" },
                                React.createElement("h2", null, "SORRY!"),
                                React.createElement("h3", { className: "font-weight-light" }, "Internal server error!"))),
                        React.createElement("div", { className: "row mt-5" },
                            React.createElement("div", { className: "col-12 text-center mt-xl-2" },
                                React.createElement(react_router_dom_1.Link, { className: "text-white font-weight-medium", to: Functions_1.Utils.homeUrl() }, "Back to home"))))))));
    };
    return Error500;
}(React.PureComponent));
exports.default = Error500;
//# sourceMappingURL=500.js.map