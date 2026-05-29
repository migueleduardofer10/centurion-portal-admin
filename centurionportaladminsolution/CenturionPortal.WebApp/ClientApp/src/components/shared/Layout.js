"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Navbar_1 = require("./Navbar");
var Sidebar_1 = require("./Sidebar");
var Footer_1 = require("./Footer");
var AppLoading_1 = require("./AppLoading");
var AppBackDrop_1 = require("./AppBackDrop");
exports.default = (function (props) { return (React.createElement(React.Fragment, null,
    React.createElement("div", { className: "container-scroller" },
        !props.isFullPage ? React.createElement(Navbar_1.default, null) : '',
        React.createElement("div", { className: "container-fluid page-body-wrapper" + (props.isFullPage ? " full-page-wrapper" : "") },
            !props.isFullPage ? React.createElement(Sidebar_1.default, null) : '',
            React.createElement("div", { className: "main-panel" },
                React.createElement("div", { className: "content-wrapper" }, props.children),
                !props.isFullPage ? React.createElement(Footer_1.default, null) : '')),
        React.createElement(AppLoading_1.default, null),
        React.createElement(AppBackDrop_1.default, null)))); });
//# sourceMappingURL=Layout.js.map