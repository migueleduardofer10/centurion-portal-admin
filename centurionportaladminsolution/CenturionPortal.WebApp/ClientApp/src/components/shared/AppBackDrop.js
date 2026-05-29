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
var AppBackDrop = /** @class */ (function (_super) {
    __extends(AppBackDrop, _super);
    function AppBackDrop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppBackDrop.prototype.render = function () {
        return this.props.backDrop ? (React.createElement("div", { className: "app-loading" })) : "";
    };
    return AppBackDrop;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.app; }, {})(AppBackDrop);
//# sourceMappingURL=AppBackDrop.js.map