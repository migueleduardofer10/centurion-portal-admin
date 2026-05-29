"use strict";
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
exports.actions = void 0;
var Enums = require("../../../utilities/Enums");
var UserCommon = require("../../commons/UserCommon");
var Functions_1 = require("../../../utilities/Functions");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var title = "Users";
var processUsers = function (users) {
    return users.map(function (user) {
        user.UserTypeDesc = Enums.UserTypeEnum[user.UserType];
        user.IsActiveStr = user.IsActive ? 'Yes' : 'No';
        user.LastAliveCheck = user.LastAliveCheck != null ?
            new Date(Date.parse(user.LastAliveCheck.toString())) : undefined;
        return user;
    });
};
var customColumns = [
    { renderLabel: "UserTypeDesc", label: "UserType", type: Enums.UserTypeEnum }
];
var extraFilters = function (dataState, userName, lastName, firstName, status, userType) {
    var arr = [];
    if (firstName.trim() != "") {
        arr.push({ field: 'FirstName', operator: 'contains', value: firstName });
    }
    if (lastName.trim() != "") {
        arr.push({ field: 'LastName', operator: 'contains', value: lastName });
    }
    if (userName.trim() != "") {
        arr.push({ field: 'UserName', operator: 'contains', value: userName });
    }
    if (status.trim() != '' && status.trim() != "ALL") {
        arr.push({ field: 'IsActive', operator: 'eq', value: status });
    }
    if (userType.trim() != '' && userType.trim() != "ALL") {
        arr.push({ field: 'UserType', operator: 'eq', value: userType });
    }
    if (arr.length != 0) {
        dataState = __assign(__assign({}, dataState), { filter: { logic: 'and', filters: arr } });
    }
    return dataState;
};
exports.actions = {
    fetchUsersPage: function (dataState, getColumns, forced, userName, lastName, firstName, status, userType) {
        if (forced === void 0) { forced = false; }
        if (userName === void 0) { userName = ''; }
        if (lastName === void 0) { lastName = ''; }
        if (firstName === void 0) { firstName = ''; }
        if (status === void 0) { status = ''; }
        if (userType === void 0) { userType = ''; }
        return function (dispatch, getState) {
            //------------------------------------------------------------------------------------------------------------------------
            dataState = extraFilters(dataState, userName, lastName, firstName, status, userType);
            //------------------------------------------------------------------------------------------------------------------------
            var appState = getState();
            var gridProps = appState.users.gridProps;
            var fetched = appState.users.fetched;
            if (fetched && !forced && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
                dataState.sort == gridProps.sort && dataState.filter == gridProps.filter)
                return;
            dataState = __assign(__assign({}, gridProps), Functions_1.Utils.getCustomData(dataState, customColumns));
            dispatch({ type: 'LOADING' });
            fetch("api/security/user/list/" + getColumns + "/?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                dataState = Functions_1.Utils.getCustomData(dataState, customColumns, true);
                if (Functions_1.Utils.validateData(dispatch, data, title)) {
                    var columns = Functions_1.Utils.getColumns(appState.users.columns, data.ObjOptional.Columns);
                    dispatch({
                        type: 'FETCHED_USERS_PAGE',
                        usersPage: processUsers(data.ObjOptional.Result.Data),
                        dataState: __assign(__assign({}, dataState), { total: data.ObjOptional.Result.Total }),
                        columns: columns,
                    });
                }
            }, function (failed) {
                Functions_1.Utils.showError(dispatch, failed, title);
            }).catch(function (error) {
                Functions_1.Utils.showError(dispatch, error, title);
            });
        };
    },
    fetchUsersAll: function (exportExcel, userName, lastName, firstName, status, userType) {
        if (exportExcel === void 0) { exportExcel = true; }
        if (userName === void 0) { userName = ''; }
        if (lastName === void 0) { lastName = ''; }
        if (firstName === void 0) { firstName = ''; }
        if (status === void 0) { status = ''; }
        if (userType === void 0) { userType = ''; }
        return function (dispatch, getState) {
            var appState = getState();
            var dataState = __assign(__assign({}, appState.users.gridProps), { take: 0 });
            console.log('dataState 1', dataState);
            //------------------------------------------------------------------------------------------------------------------------
            dataState = extraFilters(dataState, userName, lastName, firstName, status, userType);
            //------------------------------------------------------------------------------------------------------------------------
            console.log('dataState 2', dataState);
            dispatch({ type: 'LOADING' });
            if (appState && appState.users && appState.users.fetchedAll) {
                if (exportExcel)
                    dispatch({ type: 'ENABLED_EXPORT_USERS', exportAll: true });
            }
            else {
                //fetch('/api/security/user/list/All', {
                fetch("api/security/user/list/false?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                    }
                }).then(function (res) { return res.json(); })
                    .then(function (data) {
                    if (Functions_1.Utils.validateData(dispatch, data, title)) {
                        dispatch({ type: 'FETCHED_USERS_ALL', usersAll: processUsers(data.ObjOptional.Result.Data) });
                        dispatch({ type: 'ENABLED_EXPORT_USERS', exportAll: true });
                    }
                }, function (failed) {
                    Functions_1.Utils.showError(dispatch, failed, title);
                }).catch(function (error) {
                    Functions_1.Utils.showError(dispatch, error, title);
                });
            }
        };
    },
    enabledExport: function (paramExportAll) {
        if (paramExportAll === void 0) { paramExportAll = false; }
        return function (dispatch) {
            dispatch({ type: 'ENABLED_EXPORT_USERS', exportAll: paramExportAll });
        };
    },
    disabledExport: function () { return function (dispatch) {
        dispatch({ type: 'DISABLED_EXPORT_USERS' });
    }; },
    sortColumn: function (field, move) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.users.columns;
        if (field !== '' && (move === 1 || move === -1)) {
            var oldPosition_1 = columns.filter(function (column) { return column.columnName === field; })[0].position;
            var newPosition_1 = oldPosition_1 + move;
            if (newPosition_1 >= 1 && newPosition_1 <= columns.length) {
                var otherField_1 = columns.filter(function (column) { return column.position === newPosition_1; })[0].columnName;
                var newColumns = columns.map(function (column) {
                    if (column.columnName === field)
                        column.position = newPosition_1;
                    if (column.columnName === otherField_1)
                        column.position = oldPosition_1;
                    return column;
                }).sort(Functions_1.Utils.compareColumn);
                dispatch({ type: 'CHANGED_COLUMNS', columns: newColumns });
            }
        }
    }; },
    toggleColumn: function (field, checked) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.users.columns;
        var newColumns = columns.map(function (column) {
            if (column.columnName === field)
                column.checked = checked;
            return column;
        }).sort(Functions_1.Utils.compareColumn);
        dispatch({ type: 'CHANGED_COLUMNS', columns: newColumns });
    }; },
    toggleAllColumns: function (checked) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.users.columns;
        var newColumns = columns.map(function (column) {
            column.checked = checked;
            return column;
        }).sort(Functions_1.Utils.compareColumn);
        dispatch({ type: 'CHANGED_COLUMNS', columns: newColumns });
    }; },
    revertColumns: function () { return function (dispatch, getState) {
        var appState = getState();
        var realColumns = appState.users.realColumns;
        dispatch({ type: 'CHANGED_COLUMNS', columns: JSON.parse(JSON.stringify(realColumns)) });
    }; },
    applyChangedColumns: function () { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.users.columns;
        dispatch({ type: 'LOADING' });
        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.ELS_USER), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            },
            body: JSON.stringify(columns)
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                Functions_1.Notify.success(data.message, "Users");
                dispatch({ type: 'APPLIED_COLUMNS', columns: columns });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    fetchUser: function (uid) { return function (dispatch) {
        dispatch({ type: 'CLEAN_USER' });
        dispatch({ type: 'LOADING' });
        fetch("/api/security/user/edit/" + (uid ? uid : ""), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                var userTypes = Enums.EnumToArray(Enums.UserTypeEnum);
                var loans = data.ObjOptional.User.AccountAssigneds != null ? data.ObjOptional.User.AccountAssigneds : [];
                var permissions = Functions_1.TreeViewUtils.updateCheckedItems(Functions_1.TreeViewUtils.createFromArray(data.ObjOptional.User.PermissionsWeb));
                var user = __assign(__assign(__assign({}, UserCommon.newUserBody), data.ObjOptional.User), { Password: '', RePassword: '' });
                dispatch({
                    type: 'FETCHED_USER',
                    userTypes: userTypes,
                    user: user,
                    loans: loans,
                    permissions: permissions
                });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    changePermission: function (uid, checked) { return function (dispatch, getState) {
        var appState = getState();
        var permissions = appState.users.permissions;
        var permission = Functions_1.TreeViewUtils.getItemByUid(uid, appState.users.permissions);
        if (permission) {
            permission.checked = checked;
            permission.items = Functions_1.TreeViewUtils.checkChildrenItems(permission.items, checked);
            permissions = permissions.map(function (item) { return (item.uid == uid) ? permission : item; });
            permissions = Functions_1.TreeViewUtils.updateCheckedItems(permissions);
            dispatch({ type: 'CHANGED_PERMISSION', permissions: permissions });
        }
    }; },
    changeUser: function (name, value) { return function (dispatch, getSate) {
        var _a;
        var appState = getSate();
        var user = appState.users.user;
        user = __assign(__assign({}, user), (_a = {}, _a[name] = value, _a));
        dispatch({ type: 'CHANGED_USER', user: user });
    }; },
    changePhoto: function (url, file, token) { return function (dispatch, getSate) {
        dispatch({ type: 'CHANGED_PHOTO', fileUrl: url, file: file });
        var appState = getSate();
        var user = appState.users.user;
        var titleForm = user.Uid !== '' ? 'Edit User' : 'Create User';
        var data = new FormData();
        data.append('file', file);
        fetch('/api/upload/images/' + appState.users.idImage, {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': token,
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            },
            body: data
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, titleForm)) {
                Functions_1.Notify.success(data.message, titleForm);
                dispatch({ type: 'UPLOADED_PHOTO', idImage: data.ObjOptional });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, titleForm);
        });
    }; },
    fetchLoans: function (filter, type) { return function (dispatch, getState) {
        dispatch({ type: 'CHANGED_FILTER', filter: filter });
        var titleLoan = "Filter Accounts";
        if (filter.length > 2) {
            dispatch({ type: 'LOADING_FILTER_BEGIN' });
            var appState = getState();
            var loansUidExclude = appState.users.assignedLoans
                .map(function (loan) { return loan.ParentUid; }).join('|');
            fetch('/api/security/user/accounts/' + filter + '/' + type + '/' + loansUidExclude, {
                headers: {
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                if (Functions_1.Utils.validateData(dispatch, data, titleLoan)) {
                    dispatch({ type: 'FETCHED_LOANS', filteredLoans: data.ObjOptional });
                }
            }).catch(function (error) {
                dispatch({ type: 'LOADING_FILTER_END' });
                Functions_1.Utils.validateData(dispatch, error, titleLoan);
            });
        }
        else {
            dispatch({ type: 'CLEANED_LOANS' });
        }
    }; },
    cleanLoansAssigned: function () { return function (dispatch) {
        dispatch({ type: 'CLEANED_LOANS_ASSIGNED' });
    }; },
    loansChargeddedEnd: function () { return function (dispatch) {
        dispatch({ type: 'LOANS_CHARGEDDED_END' });
    }; },
    addLoan: function (filter) { return function (dispatch, getState) {
        var appState = getState();
        var loan = appState.users.filteredLoans.filter(function (loan) { return loan.ParentUid === filter; })[0];
        dispatch({ type: 'ADD_LOAN', loan: loan });
        //dispatch({ type: 'CLEANED_LOANS' });
    }; },
    removeLoan: function (uid) { return function (dispatch) {
        dispatch({ type: 'REMOVE_LOAN', uid: uid });
    }; },
    saveUser: function () { return function (dispatch, getState) {
        var appState = getState();
        var user = appState.users.user;
        user.UserType = Number(user.UserType);
        user.Photo = appState.users.idImage;
        var isValid = false;
        var titleSave = user.Uid !== '' ? 'Edit User' : 'Create User';
        if (user.Username.trim() == '')
            Functions_1.Notify.warning("Username is required", titleSave);
        else if (user.Email.trim() == '')
            Functions_1.Notify.warning("Email is required", titleSave);
        else if (user.FirstName.trim() == '')
            Functions_1.Notify.warning("FirstName is required", titleSave);
        else if (user.LastName.trim() == '')
            Functions_1.Notify.warning("LastName is required", titleSave);
        else if (user.UserType == -1)
            Functions_1.Notify.warning("UserType is required", titleSave);
        else if (user.Uid === '' && (!user.Password || user.Password.trim() == ''))
            Functions_1.Notify.warning("Password is required", titleSave);
        else if (user.Uid === '' && (!user.RePassword || user.RePassword.trim() == ''))
            Functions_1.Notify.warning("Re-Password is required", titleSave);
        else if (user.Password != '' && (!user.RePassword || user.RePassword.trim() == ''))
            Functions_1.Notify.warning("Re-Password is required", titleSave);
        else if (user.RePassword != '' && (!user.Password || user.Password.trim() == ''))
            Functions_1.Notify.warning("Password is required", titleSave);
        else
            isValid = true;
        if (!isValid)
            return;
        dispatch({ type: 'LOADING' });
        var mapUids = appState.users.assignedLoans
            .map(function (loan) { return loan.ParentUid; }).join('|');
        if (user.UserType == Enums.UserTypeEnum.ADMIN)
            user.StrPermissions = Functions_1.TreeViewUtils.getCheckedBits(appState.users.permissions).join(",");
        fetch('/api/security/user/save/' + mapUids, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            },
            body: JSON.stringify(user)
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, titleSave)) {
                Functions_1.Notify.success(data.Message, titleSave);
                user.UserTypeDesc = Enums.UserTypeEnum[user.UserType];
                user.IsActiveStr = user.IsActive ? 'Yes' : 'No';
                user.LastAliveCheck = user.LastAliveCheck != null ?
                    new Date(Date.parse(user.LastAliveCheck.toString())) : undefined;
                dispatch({
                    type: user.Uid !== '' ? 'UPDATED_USER' : 'CREATED_USER',
                    user: __assign(__assign({}, user), { UserTypeDesc: Enums.UserTypeEnum[user.UserType] })
                });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, titleSave);
        });
    }; },
    redirectedUsers: function () { return function (dispatch) {
        dispatch({ type: 'REDIRECTED_TO_USERS' });
    }; },
    deleteUser: function (uid) { return function (dispatch) {
        dispatch({ type: 'LOADING' });
        var titleDelete = "Delete User";
        fetch('/api/security/user/delete/' + uid, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, titleDelete)) {
                Functions_1.Notify.success(data.message, titleDelete);
                dispatch({ type: 'DELETED_USER' });
            }
        }).catch(function (error) {
            Functions_1.Utils.validateData(dispatch, error, titleDelete);
        });
    }; },
    loginAs: function (username, usertype) { return function (dispatch) {
        dispatch({ type: 'LOADING' });
        var titleLoginAs = "Login as User";
        var data = {
            AdminUsername: Functions_1.Auth.getELSUser().Username,
            Username: username,
            UserType: usertype
        };
        fetch("/api/security/user/loginAs", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            },
            body: JSON.stringify(data)
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, titleLoginAs)) {
                dispatch({
                    type: 'LOGGED_IN_AS_USER',
                    isLoginAs: true,
                    token: data.ObjOptional.token,
                    redirectUrl: data.ObjOptional.redirectUrl
                });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, titleLoginAs);
        });
    }; },
    redirectedLoginAs: function () { return function (dispatch) {
        dispatch({
            type: 'LOGGED_IN_AS_USER',
            isLoginAs: false,
            token: "",
            redirectUrl: ""
        });
    }; }
};
//# sourceMappingURL=UserAction.js.map