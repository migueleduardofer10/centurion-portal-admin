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
var kendo_react_excel_export_1 = require("@progress/kendo-react-excel-export");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var React = require("react");
var react_confirm_alert_1 = require("react-confirm-alert");
require("react-confirm-alert/src/react-confirm-alert.css");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var UserStore = require("../../store/stores/users/UserStore");
var BreadCrumb_1 = require("../shared/BreadCrumb");
var UtilControls_1 = require("../shared/UtilControls");
var Enums = require("../../utilities/Enums");
var UserList = /** @class */ (function (_super) {
    __extends(UserList, _super);
    function UserList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            sort: [],
            activeColumn: '',
            dataState: {},
            dropdownExcel: false,
            dropdownColumns: false,
            userName: '',
            firstName: '',
            lastName: '',
            status: 'ALL',
            userType: 'ALL'
        };
        _this.controlClassName = 'd-inline-flex ml-1 ';
        _this.labelWidth = '100px';
        _this.controlWidth = '200px';
        _this.fetchUsersPage = function (dataState, getColumns, forced, userName, lastName, firstName, status, userType) {
            if (getColumns === void 0) { getColumns = false; }
            if (forced === void 0) { forced = false; }
            if (userName === void 0) { userName = ''; }
            if (lastName === void 0) { lastName = ''; }
            if (firstName === void 0) { firstName = ''; }
            if (status === void 0) { status = ''; }
            if (userType === void 0) { userType = ''; }
            _this.props.fetchUsersPage(dataState, getColumns, forced, userName, lastName, firstName, status, userType);
        };
        _this.exportExcel = function (event, allPages, userName, lastName, firstName, status, userType) {
            if (allPages === void 0) { allPages = false; }
            if (userName === void 0) { userName = ''; }
            if (lastName === void 0) { lastName = ''; }
            if (firstName === void 0) { firstName = ''; }
            if (status === void 0) { status = ''; }
            if (userType === void 0) { userType = ''; }
            event.preventDefault();
            //Evaluamos si se exportará todas las paginas o sólo una 
            if (allPages) {
                //Llamamos al metodo fetchUsersAll que nos retornará todos los registros de usuarios
                _this.props.fetchUsersAll(true, userName, lastName, firstName, status, userType);
            }
            else { //Sino asignamos los registros que se muestran en la grilla a la lista de exportación 
                _this.props.enabledExport(false);
            }
            //Una vez finalizada este metodo actualizará las propiedades usersExport y export
        };
        _this.toggleExcel = function () {
            _this.setState({ dropdownExcel: !_this.state.dropdownExcel });
        };
        _this.toggleColumns = function () {
            _this.setState({ dropdownColumns: !_this.state.dropdownColumns });
        };
        _this.dataStateChange = function (event) {
            _this.fetchUsersPage(event.data);
        };
        return _this;
    }
    UserList.prototype.componentDidMount = function () {
        var isRedirect = this.props.redirect;
        this.props.redirectedUsers();
        this.fetchUsersPage(this.props.gridProps, true, isRedirect);
    };
    UserList.prototype.componentDidUpdate = function () {
        if (this.props.redirect)
            this.fetchUsersPage(this.props.gridProps, false);
        //Evaluamos si la propiedad export es true para exportar los datos a un archivo excel
        if (this.props.export) {
            this._export.save(); //exportamos
            this.props.disabledExport(); //retornamos la propiedad export a false
        }
        if (this.props.isLoginAs && this.props.redirectUrl !== '' && this.props.token !== '') {
            this.props.redirectedLoginAs();
            var url = this.props.redirectUrl + "/loginAs/" + this.props.token;
            if (!window.open(url, "_blank"))
                window.parent.location.href = url;
        }
    };
    UserList.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(BreadCrumb_1.default, { title: "Users" }),
            React.createElement("div", { className: "card-group" },
                React.createElement("div", { className: "card" },
                    React.createElement("div", { className: "card-header" },
                        React.createElement("h4", { id: "tabelLabel" }, "Users")),
                    React.createElement("div", { className: "card-body p-0" },
                        React.createElement("div", { className: 'mb-1' },
                            React.createElement(UtilControls_1.UtilControl_Text, { label: 'User Name', value: this.state.userName, className: this.controlClassName, maxLength: 20, labelWidth: this.labelWidth, textWidth: this.controlWidth, onChange: function (event) {
                                    _this.setState(__assign(__assign({}, _this.setState), { userName: event.currentTarget.value }));
                                } }),
                            React.createElement(UtilControls_1.UtilControl_Text, { label: 'Last Name', value: this.state.lastName, className: this.controlClassName, maxLength: 20, labelWidth: this.labelWidth, textWidth: this.controlWidth, onChange: function (event) {
                                    _this.setState(__assign(__assign({}, _this.setState), { lastName: event.currentTarget.value }));
                                } }),
                            React.createElement(UtilControls_1.UtilControl_Text, { label: 'First Name', value: this.state.firstName, className: this.controlClassName, maxLength: 20, labelWidth: this.labelWidth, textWidth: this.controlWidth, onChange: function (event) {
                                    _this.setState(__assign(__assign({}, _this.setState), { firstName: event.currentTarget.value }));
                                } }),
                            React.createElement("button", { className: "btn btn-primary " + this.controlClassName, onClick: function () {
                                    return _this.fetchUsersPage({ skip: 0, take: 10 }, false, false, _this.state.userName, _this.state.lastName, _this.state.firstName, _this.state.status, _this.state.userType);
                                } },
                                React.createElement("i", { className: "ti-reload" }),
                                React.createElement("span", { className: "d-none d-md-inline" }, " Search"))),
                        this.renderUsersGrid())))));
    };
    UserList.prototype.renderUsersGrid = function () {
        var _this = this;
        var arrStatus = [
            { Key: 'ALL', Value: 'ALL' },
            { Key: 'true', Value: 'ACTIVE' },
            { Key: 'false', Value: 'INACTIVE' }
        ];
        var arrUserType = [
            { Key: 'ALL', Value: 'ALL' },
            { Key: String(Enums.UserTypeEnum.ADMIN), Value: Enums.UserTypeEnum[Enums.UserTypeEnum.ADMIN] },
            { Key: String(Enums.UserTypeEnum.BORROWER), Value: Enums.UserTypeEnum[Enums.UserTypeEnum.BORROWER] },
            { Key: String(Enums.UserTypeEnum.BROKER), Value: Enums.UserTypeEnum[Enums.UserTypeEnum.BROKER] },
            { Key: String(Enums.UserTypeEnum.LENDER), Value: Enums.UserTypeEnum[Enums.UserTypeEnum.LENDER] }
        ];
        return (React.createElement(React.Fragment, null,
            React.createElement(kendo_react_excel_export_1.ExcelExport, { data: this.props.exportAll ? this.props.usersAll : this.props.usersPage, fileName: "Users.xlsx", ref: function (exporter) { return _this._export = exporter; } }, this.props.columns.map(function (column) { return (React.createElement(kendo_react_excel_export_1.ExcelExportColumn, { key: column.enum ? column.columnDisplay : column.columnName, field: column.enum ? column.columnDisplay : column.columnName, title: column.title, headerCellOptions: { textAlign: 'center' }, cellOptions: { textAlign: column.alignExcel }, width: Number(column.width) })); })),
            React.createElement(kendo_react_grid_1.Grid, __assign({ data: this.props.usersPage }, this.props.gridProps, { sortable: { allowUnsort: true, mode: 'single' }, pageable: { buttonCount: 4, pageSizes: true }, onDataStateChange: this.dataStateChange, resizable: true }),
                React.createElement(kendo_react_grid_1.GridToolbar, null,
                    React.createElement("div", { className: 'mb-2' },
                        React.createElement(UtilControls_1.UtilControl_ComboBox, { label: 'Status', className: this.controlClassName, dataSource: arrStatus, labelWidth: this.labelWidth, textWidth: this.controlWidth, value: this.state.status, onChange: function (event) {
                                _this.setState(__assign(__assign({}, _this.setState), { status: event.currentTarget.value }));
                                _this.fetchUsersPage({ skip: 0, take: 10 }, false, false, _this.state.userName, _this.state.lastName, _this.state.firstName, event.currentTarget.value, _this.state.userType);
                            } }),
                        React.createElement(UtilControls_1.UtilControl_ComboBox, { label: 'User Type', className: this.controlClassName, dataSource: arrUserType, labelWidth: this.labelWidth, textWidth: this.controlWidth, value: this.state.userType, onChange: function (event) {
                                _this.setState(__assign(__assign({}, _this.setState), { userType: event.currentTarget.value }));
                                _this.fetchUsersPage({ skip: 0, take: 10 }, false, false, _this.state.userName, _this.state.lastName, _this.state.firstName, _this.state.status, event.currentTarget.value);
                            } })),
                    React.createElement("ul", { className: "list-inline mb-0" },
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement("button", { className: "btn btn-primary", onClick: function () { return _this.fetchUsersPage({ skip: 0, take: 10 }, false, false, _this.state.userName, _this.state.lastName, _this.state.firstName, _this.state.status, _this.state.userType); } },
                                React.createElement("i", { className: "ti-reload" }),
                                React.createElement("span", { className: "d-none d-md-inline" }, " Refresh"))),
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement("button", { className: "btn btn-primary", onClick: function () {
                                    _this.setState(__assign(__assign({}, _this.state), { userName: '', lastName: '', firstName: '', status: 'ALL', userType: 'ALL' }));
                                    _this.fetchUsersPage({ skip: 0, take: 10 });
                                } },
                                React.createElement("i", { className: "mdi mdi-filter-remove" }),
                                React.createElement("span", { className: "d-none d-md-inline" }, " Clear Filters"))),
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement(react_router_dom_1.Link, { className: "btn btn-primary", to: "/user/add" },
                                React.createElement("i", { className: "fa fa-plus-circle" }),
                                React.createElement("span", { className: "d-none d-md-inline" }, " New"))),
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement(reactstrap_1.Dropdown, { isOpen: this.state.dropdownExcel, toggle: this.toggleExcel },
                                React.createElement(reactstrap_1.DropdownToggle, { caret: true, className: "btn btn-secondary" },
                                    React.createElement("i", { className: "ti ti-share" }),
                                    React.createElement("span", { className: "d-none d-md-inline" }, " Export")),
                                React.createElement(reactstrap_1.DropdownMenu, null,
                                    React.createElement(reactstrap_1.DropdownItem, { onClick: function (event) { return _this.exportExcel(event, false); } },
                                        React.createElement("i", { className: "ti ti-layout-width-full mr-2" }),
                                        " This page"),
                                    React.createElement(reactstrap_1.DropdownItem, { onClick: function (event) {
                                            _this.exportExcel(event, true, _this.state.userName, _this.state.lastName, _this.state.firstName, _this.state.status, _this.state.userType);
                                        } },
                                        React.createElement("i", { className: "ti ti-layers-alt mr-2" }),
                                        " All pages")))),
                        React.createElement("li", { className: "list-inline-item dropdown mega-dropdown customize-column ml-0" }, this.renderCustomColumns()))),
                React.createElement(kendo_react_grid_1.GridColumn, { title: "", width: "100px", cell: function (props) { return (React.createElement("td", { className: "text-center" },
                        React.createElement("a", { href: "# ", className: "text-info", onClick: function (event) { event.preventDefault(); _this.loginAs(props.dataItem["Username"], props.dataItem['UserType']); } },
                            React.createElement("i", { className: "fa fa-sign-in", title: "Sign-in like " + props.dataItem["Username"] })),
                        "\u00A0\u00A0\u00A0\u00A0",
                        React.createElement(react_router_dom_1.Link, { className: "text-warning", to: "/user/edit/" + props.dataItem["Uid"] },
                            React.createElement("i", { className: "fa fa-edit", title: "Edit User" })),
                        "\u00A0\u00A0\u00A0\u00A0",
                        React.createElement("a", { href: "# ", className: "text-danger", onClick: function (e) { e.preventDefault(); _this.deleteUser(props.dataItem["Uid"]); } },
                            React.createElement("i", { className: "fa fa-trash", title: "Delete User" })))); } }),
                this.props.columns.filter(function (column) { return column.checked; }).map(function (column) { return (column.columnName === 'Username' ? (React.createElement(kendo_react_grid_1.GridColumn, { key: column.columnName, field: column.columnName, title: column.title, width: column.width + "px", filter: column.filter, columnMenu: function (props) {
                        return React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
                    }, cell: function (props) { return (React.createElement("td", { className: column.className },
                        React.createElement("a", { href: "#", onClick: function (event) { event.preventDefault(); _this.loginAs(props.dataItem[props.field], props.dataItem['UserType']); } }, props.dataItem[props.field]))); } })) : (column.columnName === "IsActiveStr" ? (React.createElement(kendo_react_grid_1.GridColumn, { key: "IsActive", field: "IsActive", title: column.title, width: column.width + "px", filter: column.filter, columnMenu: function (props) {
                        return React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
                    }, cell: function (props) { return (React.createElement("td", { className: column.className },
                        React.createElement("input", { type: "checkbox", checked: props.dataItem[props.field], disabled: true }))); } })) : (column.enum ? (React.createElement(kendo_react_grid_1.GridColumn, { key: column.columnName, field: column.columnName, format: column.format, title: column.title, className: column.className, width: column.width + "px", filter: column.filter, columnMenu: function (props) {
                        return React.createElement(kendo_react_grid_1.GridColumnMenuCheckboxFilter, __assign({}, props, { data: column.enum, expanded: true }));
                    } })) : (React.createElement(kendo_react_grid_1.GridColumn, { key: column.columnName, field: column.columnName, format: column.format, title: column.title, className: column.className, width: column.width + "px", filter: column.filter, columnMenu: function (props) {
                        return React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
                    } }))))); }))));
    };
    UserList.prototype.renderCustomColumns = function () {
        var _this = this;
        return (React.createElement(reactstrap_1.ButtonDropdown, { isOpen: this.state.dropdownColumns, toggle: this.toggleColumns },
            React.createElement(reactstrap_1.DropdownToggle, { className: "btn btn-secondary dropdown-toggle waves-effect waves-dark" },
                React.createElement("i", { className: "fa fa-columns" }),
                React.createElement("span", { className: "d-none d-md-inline" }, " Colums")),
            React.createElement("form", { name: "customizeColumns", onSubmit: function (event) { return _this.applyChangedColumns(event); } },
                React.createElement(reactstrap_1.DropdownMenu, { className: "dropdown-menu animated bounceInDown" },
                    React.createElement("div", { className: "mega-dropdown-menu row" },
                        React.createElement("div", { className: "col-md-7" },
                            React.createElement("ul", { className: "list-group" }, this.props.columns.map(function (column) { return (React.createElement("li", { key: column.columnName, className: "list-group-item" + (_this.state.activeColumn === column.columnName ? " active" : ""), onClick: function () { return _this.activateColumn(column.columnName); } },
                                React.createElement("div", { className: "form-check" },
                                    React.createElement("input", { className: "form-check-input", type: "checkbox", checked: column.checked, onChange: function (e) { return _this.toggleColumn(e, column.columnName); } }),
                                    React.createElement("label", { className: "form-check-label" }, column.title)))); }))),
                        React.createElement("div", { className: "col-md-5 mt-2" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { type: "submit", className: "btn btn-fcicolor btn-block btn-sm" },
                                        React.createElement("i", { className: "ti ti-save" }),
                                        " Apply")),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block btn-sm mt-1", onClick: function (event) { return _this.revertColumns(event); } },
                                        React.createElement("i", { className: "fa fa-undo" }),
                                        " Cancel")),
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement("button", { className: "btn btn-info btn-block mt-1", onClick: function (event) { return _this.sortColumn(event, _this.state.activeColumn, -1); } },
                                        React.createElement("i", { className: "fa fa-arrow-up" }))),
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement("button", { className: "btn btn-info btn-block mt-1", onClick: function (event) { return _this.sortColumn(event, _this.state.activeColumn, 1); } },
                                        React.createElement("i", { className: "fa fa-arrow-down" }))),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block btn-sm mt-1", onClick: function (event) { return _this.toggleAllColumn(event, true); } },
                                        React.createElement("i", { className: "ti ti-check-box" }),
                                        " Check All")),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block btn-sm mt-1", onClick: function (event) { return _this.toggleAllColumn(event, false); } },
                                        React.createElement("i", { className: "ti ti-control-stop" }),
                                        " Uncheck All")))))))));
    };
    UserList.prototype.activateColumn = function (field) {
        this.setState({ activeColumn: field });
    };
    UserList.prototype.toggleColumn = function (event, field) {
        this.props.toggleColumn(field, event.target.checked);
    };
    UserList.prototype.toggleAllColumn = function (event, checked) {
        event.preventDefault();
        this.props.toggleAllColumns(checked);
    };
    UserList.prototype.sortColumn = function (event, field, move) {
        event.preventDefault();
        this.props.sortColumn(field, move);
    };
    UserList.prototype.revertColumns = function (event) {
        event.preventDefault();
        this.props.revertColumns();
    };
    UserList.prototype.applyChangedColumns = function (event) {
        event.preventDefault();
        this.props.applyChangedColumns();
    };
    UserList.prototype.deleteUser = function (uid) {
        var _this = this;
        react_confirm_alert_1.confirmAlert({
            customUI: function (_a) {
                var onClose = _a.onClose;
                return (React.createElement("form", { name: "deleteUser", onSubmit: function (event) { _this.confirmDeleteUser(event, uid); onClose(); } },
                    React.createElement("div", { className: "card" },
                        React.createElement("div", { className: "card-header" }, "Confirm Delete"),
                        React.createElement("div", { className: "card-body" }, "Are you sure to want to delete this user?"),
                        React.createElement("div", { className: "card-footer text-right" },
                            React.createElement("button", { className: "btn btn-danger btn-sm", onClick: onClose }, "No"),
                            React.createElement("button", { type: "submit", className: "btn btn-success btn-sm" }, "Yes")))));
            }
        });
    };
    UserList.prototype.confirmDeleteUser = function (event, uid) {
        event.preventDefault();
        this.props.deleteUser(uid);
    };
    UserList.prototype.loginAs = function (username, usertype) {
        var _this = this;
        react_confirm_alert_1.confirmAlert({
            customUI: function (_a) {
                var onClose = _a.onClose;
                return (React.createElement("form", { name: "loginAs", onSubmit: function (event) { _this.confirmLoginAs(event, username, usertype); onClose(); } },
                    React.createElement("div", { className: "card" },
                        React.createElement("div", { className: "card-header" }, "Confirm Login As"),
                        React.createElement("div", { className: "card-body" },
                            "Are you sure to want to login as '",
                            username,
                            "'?"),
                        React.createElement("div", { className: "card-footer text-right" },
                            React.createElement("button", { className: "btn btn-secondary", onClick: onClose }, "No"),
                            React.createElement("button", { type: "submit", className: "btn btn-primary" }, "Yes")))));
            }
        });
    };
    UserList.prototype.confirmLoginAs = function (event, username, usertype) {
        event.preventDefault();
        this.props.loginAs(username, usertype);
    };
    return UserList;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.users; }, UserStore.actions)(UserList);
//# sourceMappingURL=UserList.js.map