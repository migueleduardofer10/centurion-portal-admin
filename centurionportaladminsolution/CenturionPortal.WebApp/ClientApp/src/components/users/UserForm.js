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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var kendo_react_treeview_1 = require("@progress/kendo-react-treeview");
var react_router_1 = require("react-router");
var reactstrap_1 = require("reactstrap");
var kendo_react_dropdowns_1 = require("@progress/kendo-react-dropdowns");
var UsersStore = require("../../store/stores/users/UserStore");
var Enums_1 = require("../../utilities/Enums");
var BreadCrumb_1 = require("../shared/BreadCrumb");
var pageSize = 10;
var UserForm = /** @class */ (function (_super) {
    __extends(UserForm, _super);
    function UserForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filteredData = _this.props.uidsLoans.slice();
        _this.state = {
            subsetData: _this.filteredData.slice(0, pageSize),
            skip: 0,
            total: _this.filteredData.length,
            activeTab: 1
        };
        _this.setActiveTab = function (activeTab) {
            return (_this.state.activeTab === activeTab ? " active" : "");
        };
        _this.changeTab = function (activeTab) {
            _this.setState({ activeTab: activeTab });
        };
        _this.changeBooleanForm = function (event) {
            _this.props.changeUser(event.target.name, event.target.checked);
        };
        _this.changeStringForm = function (event) {
            if (_this.props.match.params.uid && event.target.name == 'Username')
                return;
            _this.props.changeUser(event.target.name, event.target.value);
        };
        _this.changeNumberForm = function (event) {
            var value = Number(event.target.value);
            if (isNaN(value))
                return;
            if (!_this.props.user.PassExpirEnable && event.target.name == 'PassExpirationTime')
                return;
            if (!_this.props.user.PassExpirEnable && event.target.name == 'PassExpirationUnit')
                return;
            if (!_this.props.user.PassPreviousEnable && event.target.name == 'PassPreviousPsw')
                return;
            if (!_this.props.user.PassLockoutEnable && event.target.name == 'PassLockoutAttempts')
                return;
            if (!_this.props.user.PassLockoutEnable && event.target.name == 'PassLockoutMinutes')
                return;
            if (!_this.props.user.PassComLenEnable && event.target.name == 'PassComLenFrom')
                return;
            if (!_this.props.user.PassComLenEnable && event.target.name == 'PassComLenTo')
                return;
            _this.props.changeUser(event.target.name, value);
        };
        _this.onChange = function (event) {
            if (event.value.length > 0) {
                _this.props.addLoan(event.value[event.value.length - 1]);
            }
        };
        _this.onFilterChange = function (event) {
            if (_this.props.uidsLoans.indexOf(event.filter.value) === -1) {
                _this.props.fetchLoans(event.filter.value, _this.props.user.UserType);
            }
        };
        _this.pageChange = function (event) {
            var skip = event.page.skip;
            var take = event.page.take;
            var newSubsetData = _this.filteredData.slice(skip, skip + take);
            _this.setState({
                subsetData: newSubsetData,
                skip: skip
            });
        };
        _this.saveUser = function (event) {
            event.preventDefault();
            _this.props.saveUser();
        };
        _this.onExpandChange = function (event) {
            event.item.expanded = !event.item.expanded;
            _this.forceUpdate();
        };
        _this.onCheckChange = function (event) {
            event.item.checked = !event.item.checked;
            _this.props.changePermission(event.item.uid, event.item.checked);
            _this.forceUpdate();
        };
        _this.onItemClick = function (event) {
            event.item.checked = !event.item.checked;
            _this.props.changePermission(event.item.uid, event.item.checked);
            _this.forceUpdate();
        };
        return _this;
    }
    UserForm.prototype.componentDidMount = function () {
        this.props.fetchUser(this.props.match.params.uid);
    };
    UserForm.prototype.componentDidUpdate = function () {
        if (this.props.LoansChargedded) {
            this.filteredData = this.props.uidsLoans.slice();
            this.setState({
                subsetData: this.filteredData.slice(0, pageSize),
                skip: 0,
                total: this.filteredData.length
            });
            this.props.loansChargeddedEnd();
        }
    };
    UserForm.prototype.render = function () {
        var _this = this;
        return this.props.redirect ?
            React.createElement(react_router_1.Redirect, { to: "/users" }) :
            (React.createElement(React.Fragment, null,
                React.createElement(BreadCrumb_1.default, { title: this.props.match.params.uid ? "Edit User" : "Create User" }),
                React.createElement("form", { name: "saveUser", onSubmit: this.saveUser, encType: "multipart/form-data" },
                    React.createElement("input", { type: "hidden", name: "Uid", value: this.props.user.Uid }),
                    React.createElement("div", { className: "card" },
                        React.createElement("div", { className: "card-header p-0" },
                            React.createElement(reactstrap_1.Nav, { tabs: true, className: "border-0" },
                                React.createElement(reactstrap_1.NavItem, null,
                                    React.createElement(reactstrap_1.NavLink, { className: this.setActiveTab(1).trim(), onClick: function () { return _this.changeTab(1); } }, "General")),
                                React.createElement(reactstrap_1.NavItem, null,
                                    React.createElement(reactstrap_1.NavLink, { className: this.setActiveTab(2).trim(), onClick: function () { return _this.changeTab(2); } }, "Security")),
                                React.createElement(reactstrap_1.NavItem, null,
                                    React.createElement(reactstrap_1.NavLink, { className: this.setActiveTab(3).trim(), onClick: function () { return _this.changeTab(3); } }, "Password Options")))),
                        React.createElement("div", { className: "card-body p-0" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-12" },
                                    React.createElement(reactstrap_1.TabContent, { activeTab: this.state.activeTab.toString(), className: "border-0" },
                                        React.createElement(reactstrap_1.TabPane, { tabId: "1" }, this.renderGeneralTab()),
                                        React.createElement(reactstrap_1.TabPane, { tabId: "2" }, this.renderSecurityTab()),
                                        React.createElement(reactstrap_1.TabPane, { tabId: "3" }, this.renderPasswordOptionsTab()))))),
                        React.createElement("div", { className: "card-footer text-right px-2" },
                            React.createElement(react_router_dom_1.Link, { className: "btn btn-primary", to: "/users" }, "Cancel"),
                            React.createElement("button", { type: "submit", className: "btn btn-success" }, "Save"))))));
    };
    UserForm.prototype.renderGeneralTab = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-3" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: " control-label", htmlFor: "username" }, "Username (*)"),
                        React.createElement("input", { className: "form-control form-control-sm", disabled: this.props.match.params.uid ? true : false, type: "text", name: "Username", value: this.props.user.Username, onChange: this.changeStringForm }))),
                React.createElement("div", { className: "col-md-3" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: " control-label", htmlFor: "firstName" }, "First Name (*)"),
                        React.createElement("input", { className: "form-control form-control-sm", type: "text", name: "FirstName", value: this.props.user.FirstName, onChange: this.changeStringForm }))),
                React.createElement("div", { className: "col-md-3" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "control-label", htmlFor: "middleName" }, "Middle Name"),
                        React.createElement("input", { className: "form-control form-control-sm", type: "text", name: "MiddleName", value: this.props.user.MiddleName, onChange: this.changeStringForm }))),
                React.createElement("div", { className: "col-md-3" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "control-label", htmlFor: "lastName" }, "Last Name (*)"),
                        React.createElement("input", { className: "form-control form-control-sm", type: "text", name: "LastName", value: this.props.user.LastName, onChange: this.changeStringForm }))),
                React.createElement("div", { className: "col-md-6" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "control-label", htmlFor: "address1" }, "Address"),
                        React.createElement("input", { className: "form-control form-control-sm", type: "text", name: "Address1", value: this.props.user.Address1, onChange: this.changeStringForm }))),
                React.createElement("div", { className: "col-md-3" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "control-label", htmlFor: "homePhone" }, "Home Phone"),
                        React.createElement("input", { className: "form-control form-control-sm", type: "text", name: "HomePhone", value: this.props.user.HomePhone, onChange: this.changeNumberForm }))),
                React.createElement("div", { className: "col-md-3" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "control-label", htmlFor: "mobilePhone" }, "Mobile Phone"),
                        React.createElement("input", { className: "form-control form-control-sm", type: "text", name: "MobilePhone", value: this.props.user.MobilePhone, onChange: this.changeNumberForm }))),
                React.createElement("div", { className: "col-md-3" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "control-label", htmlFor: "email" }, "Email (*)"),
                        React.createElement("input", { className: "form-control form-control-sm", type: "text", name: "Email", value: this.props.user.Email, onChange: this.changeStringForm }))),
                React.createElement("div", { className: "col-md-3" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "form-check mt-md-4" },
                            React.createElement("input", { className: "form-check-input", type: "checkbox", name: "IsActive", checked: this.props.user.IsActive, onChange: this.changeBooleanForm }),
                            React.createElement("label", { className: "form-check-label", htmlFor: "isActive" }, "Is Active")))))));
    };
    UserForm.prototype.renderSecurityTab = function () {
        return (React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-md-3" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "control-label", htmlFor: "password" },
                        "Password",
                        this.props.match.params.uid ? "" : " (*)"),
                    React.createElement("input", { className: "form-control form-control-sm", type: "password", name: "Password", placeholder: "******", onChange: this.changeStringForm })),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "control-label", htmlFor: "rePassword" },
                        "Confirm Password",
                        this.props.match.params.uid ? "" : " (*)"),
                    React.createElement("input", { className: "form-control form-control-sm", type: "password", name: "RePassword", placeholder: "******", onChange: this.changeStringForm })),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "control-label", htmlFor: "userType" }, "User Type (*)"),
                    React.createElement("select", { className: "form-control form-control-sm", name: "UserType", value: this.props.user.UserType.toString(), onChange: this.changeNumberForm },
                        React.createElement("option", { value: "-1" }, "- Select User Type -"),
                        this.props.userTypes.map(function (type) { return React.createElement("option", { key: type.value, value: type.value }, type.label); })))),
            this.renderAssignLoansGroup(),
            this.renderPermissionsGroup()));
    };
    UserForm.prototype.renderAssignLoansGroup = function () {
        var _this = this;
        if (this.props.user.UserType != Enums_1.UserTypeEnum.BROKER &&
            this.props.user.UserType != Enums_1.UserTypeEnum.LENDER &&
            this.props.user.UserType != Enums_1.UserTypeEnum.BORROWER)
            return "";
        return (React.createElement("div", { className: "col-md-3" },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { className: "control-label", htmlFor: "userType" }, this.props.user.UserType == Enums_1.UserTypeEnum.BROKER ? "Service Accounts" :
                    (this.props.user.UserType == Enums_1.UserTypeEnum.LENDER ? "Lender Accounts" : "Loan Accounts")),
                React.createElement(kendo_react_dropdowns_1.MultiSelect, { data: this.state.subsetData, value: [], placeholder: "Type to search...", loading: this.props.loadingFilter, className: "form-control form-control-sm", style: { height: '30px', width: '100%', fontSize: '0.8em' }, virtual: {
                        total: this.state.total,
                        pageSize: pageSize,
                        skip: this.state.skip
                    }, onPageChange: this.pageChange, filterable: true, onFilterChange: this.onFilterChange, onChange: this.onChange, itemRender: function (li) { return _this.itemRenderFilter(li); }, listNoDataRender: function (element) { return _this.listNoDataRender(element); } })),
            React.createElement("div", { className: "form-group" }, this.props.assignedLoans.map(function (loan) {
                return React.createElement("div", { key: "loan" + loan.ParentUid, className: "alert alert-success mb-2" },
                    React.createElement("button", { type: "button", className: "close", "data-dismiss": "alert", "aria-label": "Close", onClick: function () { return _this.props.removeLoan(loan.ParentUid); } },
                        React.createElement("span", { "aria-hidden": "true" }, "\u00D7")),
                    _this.itemChildrenFilter(loan));
            }))));
    };
    UserForm.prototype.renderPermissionsGroup = function () {
        if (this.props.user.UserType != Enums_1.UserTypeEnum.ADMIN)
            return "";
        return (React.createElement("div", { className: "col-md-6" },
            React.createElement("div", { className: "form-group" },
                React.createElement(kendo_react_treeview_1.TreeView, { data: this.props.permissions, expandIcons: true, checkboxes: true, checkIndeterminateField: "indeterminate", onExpandChange: this.onExpandChange, onCheckChange: this.onCheckChange, onItemClick: this.onItemClick, "aria-multiselectable": true }))));
    };
    UserForm.prototype.renderPasswordOptionsTab = function () {
        return (React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-md-7" },
                React.createElement("div", { className: "form-group mb-0" },
                    React.createElement("label", { className: "text-bold" }, "Password Option"),
                    React.createElement("div", { className: "px-2" },
                        React.createElement("div", { className: "form-inline mb-2" },
                            React.createElement("div", { className: "form-check my-0 mr-3" },
                                React.createElement("input", { className: "form-check-input", type: "checkbox", id: "PassExpirEnable", name: "PassExpirEnable", disabled: !this.props.user.PassOverride, checked: this.props.user.PassExpirEnable, onChange: this.changeBooleanForm }),
                                React.createElement("label", { className: "form-check-label ml-1 mt-2", htmlFor: "PassExpirEnable" }, "Expiration After")),
                            React.createElement("input", { type: "text", className: "form-control form-control-sm input-password mr-3", name: "PassExpirationTime", disabled: !this.props.user.PassOverride || !this.props.user.PassExpirEnable, value: this.props.user.PassExpirationTime, onChange: this.changeNumberForm }),
                            React.createElement("select", { className: "form-control form-control-sm", name: "PassExpirationUnit", disabled: !this.props.user.PassOverride || !this.props.user.PassExpirEnable, value: this.props.user.PassExpirationUnit, onChange: this.changeNumberForm },
                                React.createElement("option", { value: "0" }, "Day(s)"),
                                React.createElement("option", { value: "1" }, "Week(s)"),
                                React.createElement("option", { value: "2" }, "Month(s)"))),
                        React.createElement("div", { className: "form-inline mb-2" },
                            React.createElement("div", { className: "form-check my-0 mr-3" },
                                React.createElement("input", { className: "form-check-input", type: "checkbox", id: "PassPreviousEnable", name: "PassPreviousEnable", disabled: !this.props.user.PassOverride, checked: this.props.user.PassPreviousEnable, onChange: this.changeBooleanForm }),
                                React.createElement("label", { className: "form-check-label ml-1 mt-2", htmlFor: "PassPreviousEnable" }, "User cannot use their previous")),
                            React.createElement("input", { type: "text", className: "form-control form-control-sm input-password mr-3", name: "PassPreviousPsw", disabled: !this.props.user.PassOverride || !this.props.user.PassPreviousEnable, value: this.props.user.PassPreviousPsw, onChange: this.changeNumberForm }),
                            React.createElement("label", { className: "form-check-label mt-2" }, "Password")))),
                React.createElement("hr", { className: "m-0 my-2" }),
                React.createElement("div", { className: "form-group mb-0" },
                    React.createElement("label", { className: "text-bold" }, "Lock out Option"),
                    React.createElement("div", { className: "px-2" },
                        React.createElement("div", { className: "form-inline mb-2" },
                            React.createElement("div", { className: "form-check my-0 mr-3" },
                                React.createElement("input", { className: "form-check-input", type: "checkbox", id: "PassLockoutEnable", name: "PassLockoutEnable", disabled: !this.props.user.PassOverride, checked: this.props.user.PassLockoutEnable, onChange: this.changeBooleanForm }),
                                React.createElement("label", { className: "form-check-label ml-1 mt-2", htmlFor: "PassLockoutEnable" }, "Lock out users after")),
                            React.createElement("input", { type: "text", className: "form-control form-control-sm input-password mr-3", name: "PassLockoutAttempts", disabled: !this.props.user.PassOverride || !this.props.user.PassLockoutEnable, value: this.props.user.PassLockoutAttempts, onChange: this.changeNumberForm }),
                            React.createElement("label", { className: "form-check-label mr-3 mt-2" }, "unsuccessful attempts for"),
                            React.createElement("input", { type: "text", className: "form-control form-control-sm input-password mr-3", name: "PassLockoutMinutes", disabled: !this.props.user.PassOverride || !this.props.user.PassLockoutEnable, value: this.props.user.PassLockoutMinutes, onChange: this.changeNumberForm }),
                            React.createElement("label", { className: "form-check-label mt-2" }, "minutes")))),
                React.createElement("hr", { className: "m-0 my-2" })),
            React.createElement("div", { className: "col-md-5" },
                React.createElement("div", { className: "form-group mb-0" },
                    React.createElement("label", { className: "text-bold" }, "Password Complexity"),
                    React.createElement("div", { className: "px-2" },
                        React.createElement("div", { className: "form-inline mb-2" },
                            React.createElement("div", { className: "form-check my-0 mr-3" },
                                React.createElement("input", { className: "form-check-input", type: "checkbox", id: "PassComLenEnable", name: "PassComLenEnable", disabled: !this.props.user.PassOverride, checked: this.props.user.PassComLenEnable, onChange: this.changeBooleanForm }),
                                React.createElement("label", { className: "form-check-label ml-1 mt-2", htmlFor: "PassComLenEnable" }, "Password Length")),
                            React.createElement("input", { type: "text", className: "form-control form-control-sm input-password mr-3", name: "PassComLenFrom", disabled: !this.props.user.PassOverride || !this.props.user.PassComLenEnable, value: this.props.user.PassComLenFrom, onChange: this.changeNumberForm }),
                            React.createElement("label", { className: "form-check-label mr-3 mt-2" }, "To"),
                            React.createElement("input", { type: "text", className: "form-control form-control-sm input-password", name: "PassComLenTo", disabled: !this.props.user.PassOverride || !this.props.user.PassComLenEnable, value: this.props.user.PassComLenTo, onChange: this.changeNumberForm })),
                        React.createElement("div", { className: "form-inline mb-2" },
                            React.createElement("div", { className: "form-check my-0" },
                                React.createElement("input", { className: "form-check-input", type: "checkbox", id: "PassComLowerEnable", name: "PassComLowerEnable", disabled: !this.props.user.PassOverride, checked: this.props.user.PassComLowerEnable, onChange: this.changeBooleanForm }),
                                React.createElement("label", { className: "form-check-label ml-1 mt-2", htmlFor: "PassComLowerEnable" }, "Minimun one lower case and one uppper case"))),
                        React.createElement("div", { className: "form-inline mb-2" },
                            React.createElement("div", { className: "form-check my-0" },
                                React.createElement("input", { className: "form-check-input", type: "checkbox", id: "PassComDigitEnable", name: "PassComDigitEnable", disabled: !this.props.user.PassOverride, checked: this.props.user.PassComDigitEnable, onChange: this.changeBooleanForm }),
                                React.createElement("label", { className: "form-check-label ml-1 mt-2", htmlFor: "PassComDigitEnable" }, "Minimun one digit"))),
                        React.createElement("div", { className: "form-inline" },
                            React.createElement("div", { className: "form-check my-0" },
                                React.createElement("input", { className: "form-check-input", type: "checkbox", id: "PassComSpecialEnable", name: "PassComSpecialEnable", disabled: !this.props.user.PassOverride, checked: this.props.user.PassComSpecialEnable, onChange: this.changeBooleanForm }),
                                React.createElement("label", { className: "form-check-label ml-1 mt-2", htmlFor: "PassComSpecialEnable" }, "Minimun one special character"))))),
                React.createElement("hr", { className: "m-0 my-2" })),
            React.createElement("div", { className: "col-md-12" },
                React.createElement("div", { className: "form-group mb-0" },
                    React.createElement("div", { className: "form-inline" },
                        React.createElement("div", { className: "form-check my-0" },
                            React.createElement("input", { className: "form-check-input", type: "checkbox", id: "PassOverride", name: "PassOverride", checked: this.props.user.PassOverride, onChange: this.changeBooleanForm }),
                            React.createElement("label", { className: "form-check-label ml-1 mt-2", htmlFor: "PassOverride" }, "Override Default Settings")))))));
    };
    UserForm.prototype.listNoDataRender = function (element) {
        var noData = (React.createElement("h4", { style: { fontSize: '0.8em' } },
            React.createElement("span", { className: "k-icon k-i-warning", style: { fontSize: '2.0em' } }),
            React.createElement("br", null),
            React.createElement("br", null),
            "no data here"));
        return React.cloneElement(element, __assign({}, element.props), noData);
    };
    UserForm.prototype.itemRenderFilter = function (li) {
        var loan = this.props.filteredLoans.filter(function (loan) { return loan.ParentUid === li.props.children; })[0];
        return loan ? React.cloneElement(li, li.props, this.itemChildrenFilter(loan)) : "";
    };
    UserForm.prototype.itemChildrenFilter = function (loan) {
        return loan.Account === undefined ? React.createElement("span", { className: "text-sm" }, loan.FullName) :
            React.createElement("span", { className: "text-sm" },
                React.createElement("b", null, loan.Account + ": "),
                loan.FullName);
    };
    return UserForm;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.users; }, UsersStore.actions)(UserForm);
//# sourceMappingURL=UserForm.js.map