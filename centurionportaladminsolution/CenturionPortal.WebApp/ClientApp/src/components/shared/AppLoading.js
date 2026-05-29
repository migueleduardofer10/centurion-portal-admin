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
var react_loading_1 = require("react-loading");
var AppLoading = /** @class */ (function (_super) {
    __extends(AppLoading, _super);
    function AppLoading() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppLoading.prototype.render = function () {
        return this.props.loading ? (React.createElement("div", { className: "app-loading" },
            React.createElement(react_loading_1.default, { type: "spinningBubbles", color: "#fff" }),
            React.createElement("h4", null, "Loading ..."))) : "";
    };
    return AppLoading;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.app; }, {})(AppLoading);
//# sourceMappingURL=AppLoading.js.map