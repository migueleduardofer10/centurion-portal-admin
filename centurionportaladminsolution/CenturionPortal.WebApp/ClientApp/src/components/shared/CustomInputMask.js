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
var react_input_mask_1 = require("react-input-mask");
var CustomInputMask = /** @class */ (function (_super) {
    __extends(CustomInputMask, _super);
    function CustomInputMask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (event) {
            if (_this.props.onChange)
                _this.props.onChange(event);
        };
        return _this;
    }
    CustomInputMask.prototype.render = function () {
        return (React.createElement(react_input_mask_1.default, { type: "text", mask: this.props.mask, id: this.props.id, name: this.props.name, className: this.props.className, placeholder: this.props.placeholder, value: this.props.value, onChange: this.onChange }));
    };
    return CustomInputMask;
}(React.PureComponent));
exports.default = CustomInputMask;
//# sourceMappingURL=CustomInputMask.js.map