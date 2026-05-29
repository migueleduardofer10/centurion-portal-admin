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
var react_router_1 = require("react-router");
var Recaptcha_1 = require("../auth/Recaptcha");
var Functions_1 = require("../../utilities/Functions");
var AuthStore = require("../../store/stores/auth/AuthStore");
require("react-confirm-alert/src/react-confirm-alert.css");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.changeData = function (event) {
            _this.props.changeData(event.target.name, event.target.value);
        };
        _this.validateCaptcha = function (response, isValid) {
            _this.props.validateCaptcha(response, isValid);
        };
        _this.login = function (event) {
            event.preventDefault();
            _this.props.login(_this.props.responseCaptcha);
        };
        return _this;
    }
    Login.prototype.componentDidMount = function () {
        document.getElementsByTagName("title")[0].innerText = 'Login - FCI Lender Servicing';
        this.props.initializeLogin();
    };
    Login.prototype.componentDidUpdate = function () {
        this.props.clearInterval();
    };
    Login.prototype.render = function () {
        return this.props.isLoggedin ? React.createElement(react_router_1.Redirect, { to: Functions_1.Utils.homeUrl() }) : (React.createElement("div", null,
            React.createElement("div", { className: "d-flex align-items-stretch auth auth-img-bg h-100" },
                React.createElement("div", { className: "row flex-grow" },
                    React.createElement("div", { className: "col-lg-6 d-flex align-items-center justify-content-center" },
                        React.createElement("div", { className: "auth-form-transparent text-left p-3" },
                            React.createElement("div", { className: "brand-logo" },
                                React.createElement("img", { src: "/images/admin_portal.png", alt: "FCI Admin Portal" })),
                            React.createElement("h4", null, "Welcome back!"),
                            React.createElement("h6", { className: "font-weight-light" }, "Happy to see you again!"),
                            React.createElement("form", { className: "pt-3", onSubmit: this.login },
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", null, "Username"),
                                    React.createElement("div", { className: "input-group" },
                                        React.createElement("div", { className: "input-group-prepend bg-transparent" },
                                            React.createElement("span", { className: "input-group-text bg-transparent border-right-0" },
                                                React.createElement("i", { className: "mdi mdi-account-outline text-primary" }))),
                                        React.createElement("input", { type: "text", className: "form-control form-control-lg border-left-0", name: "Username", placeholder: "Username", value: this.props.body.Username, onChange: this.changeData, required: true }))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", null, "Password"),
                                    React.createElement("div", { className: "input-group" },
                                        React.createElement("div", { className: "input-group-prepend bg-transparent" },
                                            React.createElement("span", { className: "input-group-text bg-transparent border-right-0" },
                                                React.createElement("i", { className: "mdi mdi-lock-outline text-primary" }))),
                                        React.createElement("input", { type: "password", className: "form-control form-control-lg border-left-0", name: "Password", placeholder: "Password", value: this.props.body.Password, onChange: this.changeData, required: true }))),
                                this.props.recaptchaSiteKey === '' ? "" :
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement(Recaptcha_1.default, { siteKey: this.props.recaptchaSiteKey, validate: this.validateCaptcha, reset: this.props.isResetCaptcha, reseted: this.props.resetedCaptcha })),
                                React.createElement("div", { className: "my-2 d-flex justify-content-between align-items-center" },
                                    React.createElement("div", { className: "form-check" },
                                        React.createElement("label", { className: "form-check-label text-muted" },
                                            React.createElement("input", { type: "checkbox", className: "form-check-input" }),
                                            React.createElement("i", { className: "input-helper" }),
                                            " Keep me signed in")),
                                    React.createElement("a", { href: "!#", onClick: function (event) { return event.preventDefault(); }, className: "auth-link text-black" }, "Forgot password?")),
                                React.createElement("div", { className: "my-3" },
                                    React.createElement("button", { type: "submit", className: "btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn", disabled: !this.props.isValidCaptcha }, "LOGIN"))))),
                    React.createElement("div", { className: "col-lg-6 login-half-bg d-flex flex-row" })))));
    };
    return Login;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.auth; }, AuthStore.actions)(Login);
//# sourceMappingURL=Login.js.map