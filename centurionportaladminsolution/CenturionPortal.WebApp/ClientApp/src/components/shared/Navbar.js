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
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var Functions_1 = require("../../utilities/Functions");
var AuthStore = require("../../store/stores/auth/AuthStore");
var Navbar = /** @class */ (function (_super) {
    __extends(Navbar, _super);
    function Navbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggleOffcanvas2 = function () {
            var sidebar = document.getElementById('sidebar');
            var navbar = document.getElementById('navbarPrincipal1');
            var menu = document.getElementById('navbarMenuWrapper1');
            var mainPanel = document.querySelector('.main-panel');
            var sidebar_importantWidth0 = sidebar.classList.contains('important-width-0');
            var importantWidth100Percent = 'important-width-100-percent';
            var importantLeft0 = 'important-left-0';
            if (sidebar_importantWidth0) {
                mainPanel.classList.remove(importantWidth100Percent);
                navbar.classList.remove(importantLeft0);
                menu.classList.remove(importantWidth100Percent);
            }
            else {
                mainPanel.classList.add(importantWidth100Percent);
                navbar.classList.add(importantLeft0);
                menu.classList.add(importantWidth100Percent);
            }
            sidebar.classList.toggle('important-width-0');
        };
        _this.toggleOffcanvas = function () {
            var sidebar = document.querySelector('.sidebar-offcanvas');
            if (sidebar != null)
                sidebar.classList.toggle('active');
        };
        _this.signOut = function (event) {
            event.preventDefault();
            _this.props.signOut();
        };
        return _this;
    }
    Navbar.prototype.componentDidMount = function () {
        var _this = this;
        this.props.intervalSession(function () {
            _this.props.refreshToken();
        });
    };
    Navbar.prototype.render = function () {
        return !this.props.isLoggedin ? React.createElement(react_router_dom_1.Redirect, { to: "/login" }) : (React.createElement("nav", { id: 'navbarPrincipal1', className: "navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row" },
            React.createElement("div", { id: 'navbarMenuWrapper1', className: "navbar-menu-wrapper d-flex align-items-center justify-content-between" },
                React.createElement("button", { id: 'bnNavBarToggler1', className: "navbar-toggler align-self-center important-display-block", type: "button", onClick: this.toggleOffcanvas2 },
                    React.createElement("i", { className: "mdi mdi-menu" })),
                React.createElement("ul", { className: "navbar-nav navbar-nav-right" },
                    React.createElement("li", { className: "nav-item  nav-profile border-0" },
                        React.createElement(react_bootstrap_1.Dropdown, null,
                            React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdown-profile", className: "nav-link count-indicator bg-transparent" },
                                React.createElement("span", { className: "profile-text" }, Functions_1.Auth.getELSUser().FullName)),
                            React.createElement(react_bootstrap_1.Dropdown.Menu, { className: "preview-list navbar-dropdown pb-3" },
                                React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item preview-item d-flex align-items-center border-0 mt-2", onClick: function (event) { return event.preventDefault(); } },
                                    React.createElement(react_i18next_1.Trans, null, "Manage Accounts")),
                                React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item preview-item d-flex align-items-center border-0", onClick: function (event) { return event.preventDefault(); } },
                                    React.createElement(react_i18next_1.Trans, null, "Change Password")),
                                React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item preview-item d-flex align-items-center border-0", onClick: this.signOut },
                                    React.createElement(react_i18next_1.Trans, null, "Sign Out")))))))));
    };
    return Navbar;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.auth; }, AuthStore.actions)(Navbar);
//# sourceMappingURL=Navbar.js.map