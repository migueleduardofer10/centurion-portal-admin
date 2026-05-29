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
var react_google_recaptcha_1 = require("react-google-recaptcha");
var LirsCaptcha = /** @class */ (function (_super) {
    __extends(LirsCaptcha, _super);
    function LirsCaptcha(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { valueCaptcha: '' };
        _this.onCaptchaChange = function (value) {
            _this.setState({
                valueCaptcha: value
            });
            _this.props.validate(value, !!(value));
        };
        _this.state = {
            valueCaptcha: ''
        };
        return _this;
    }
    LirsCaptcha.prototype.componentDidUpdate = function () {
        if (this.props.reset) {
            this.captcha.reset();
            this.props.reseted();
        }
    };
    LirsCaptcha.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "content-captcha-center" },
            React.createElement(react_google_recaptcha_1.default, { ref: function (event) { return (_this.captcha = event); }, sitekey: this.props.siteKey, onChange: this.onCaptchaChange })));
    };
    return LirsCaptcha;
}(React.Component));
exports.default = LirsCaptcha;
//# sourceMappingURL=Recaptcha.js.map