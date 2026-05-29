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
var react_i18next_1 = require("react-i18next");
var Functions_1 = require("../../utilities/Functions");
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        return (React.createElement("footer", { className: "footer" },
            React.createElement("div", { className: "container-fluid" },
                React.createElement("div", { className: "d-sm-flex justify-content-center justify-content-sm-between align-items-center" },
                    React.createElement("div", { className: 'd-flex flex-column justify-content-start' },
                        React.createElement("span", { className: "text-muted text-center text-sm-left d-block d-sm-inline-block" },
                            React.createElement(react_i18next_1.Trans, null, "Copyright \u00A9 2020 FCI Lender Services, Inc.")),
                        React.createElement("span", { className: "text-muted text-center text-sm-left d-block d-sm-inline-block" },
                            React.createElement(react_i18next_1.Trans, null,
                                "All Rights Reserved. (Build ",
                                Functions_1.Utils.getVersion(),
                                ")"))),
                    React.createElement("span", { className: "text-muted text-center text-sm-left d-block d-sm-inline-block" },
                        React.createElement(react_i18next_1.Trans, null, "Nationwide Mortgage Licensing System # 4920 | CA DRE # 01022780")),
                    React.createElement("span", { className: "float-none float-sm-right d-block mt-1 mt-sm-0 text-center" },
                        React.createElement(react_i18next_1.Trans, null, "Terms Of Use"),
                        " | ",
                        React.createElement(react_i18next_1.Trans, null, "  Privacy Statement  "))))));
    };
    return Footer;
}(React.PureComponent));
exports.default = Footer;
//# sourceMappingURL=Footer.js.map