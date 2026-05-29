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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actions = void 0;
var AppCommon = require("../../commons/AppCommon");
var UserCommon = require("../../commons/UserCommon");
var UserAction = require("../../actions/users/UserAction");
exports.actions = UserAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            redirect: false,
            fetched: false,
            fetchedAll: false,
            userTypes: [],
            usersPage: [],
            usersAll: [],
            exportAll: false,
            export: false,
            user: UserCommon.newUserBody,
            realColumns: UserCommon.initialColumns,
            columns: UserCommon.initialColumns,
            gridProps: AppCommon.newGridProps,
            idImage: '',
            fileUrl: '',
            file: null,
            filter: '',
            uidsLoans: [],
            LoansChargedded: false,
            filteredLoans: [],
            assignedLoans: [],
            loadingFilter: false,
            isLoginAs: false,
            token: '',
            redirectUrl: '',
            permissions: []
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'FETCHED_USERS_PAGE':
            return __assign(__assign({}, state), { fetched: false, fetchedAll: false, redirect: false, userTypes: [], usersPage: action.usersPage, gridProps: action.dataState, realColumns: JSON.parse(JSON.stringify(action.columns)), columns: action.columns });
        case 'FETCHED_USERS_ALL':
            return __assign(__assign({}, state), { fetchedAll: true, usersAll: action.usersAll });
        case 'ENABLED_EXPORT_USERS':
            return __assign(__assign({}, state), { exportAll: action.exportAll, export: true });
        case 'DISABLED_EXPORT_USERS':
            return __assign(__assign({}, state), { export: false });
        case 'CHANGED_COLUMNS':
            return __assign(__assign({}, state), { columns: action.columns });
        case 'APPLIED_COLUMNS':
            return __assign(__assign({}, state), { realColumns: action.columns, columns: action.columns });
        case 'CLEAN_USER':
            return __assign(__assign({}, state), { user: UserCommon.newUserBody, uidsLoans: [], assignedLoans: [] });
        case 'FETCHED_USER':
            return __assign(__assign({}, state), { userTypes: action.userTypes, user: action.user, uidsLoans: action.loans.map(function (loan) { return loan.ParentUid; }), assignedLoans: action.loans, permissions: action.permissions });
        case 'CHANGED_PERMISSION':
            return __assign(__assign({}, state), { permissions: action.permissions });
        case 'CHANGED_USER':
            return __assign(__assign({}, state), { user: JSON.parse(JSON.stringify(action.user)) });
        case 'CHANGED_PHOTO':
            return __assign(__assign({}, state), { fileUrl: action.fileUrl, file: action.file });
        case 'UPLOADED_PHOTO':
            return __assign(__assign({}, state), { idImage: action.idImage, user: __assign(__assign({}, state.user), { Photo: action.idImage }) });
        case 'CHANGED_FILTER':
            return __assign(__assign({}, state), { filter: action.filter });
        case 'LOADING_FILTER_BEGIN':
            return __assign(__assign({}, state), { loadingFilter: true });
        case 'LOADING_FILTER_END':
            return __assign(__assign({}, state), { loadingFilter: false });
        case 'FETCHED_LOANS':
            return __assign(__assign({}, state), { uidsLoans: action.filteredLoans.map(function (loan) { return loan.ParentUid; }), filteredLoans: action.filteredLoans, loadingFilter: false, LoansChargedded: true });
        case 'LOANS_CHARGEDDED_END':
            return __assign(__assign({}, state), { LoansChargedded: false });
        case 'CLEANED_LOANS':
            return __assign(__assign({}, state), { uidsLoans: [], loadingFilter: false, LoansChargedded: true });
        case 'CLEANED_LOANS_ASSIGNED':
            return __assign(__assign({}, state), { assignedLoans: [] });
        case 'ADD_LOAN':
            return __assign(__assign({}, state), { filter: "", 
                //filteredLoans: [],
                assignedLoans: __spreadArrays(state.assignedLoans, [action.loan]) });
        case 'REMOVE_LOAN':
            return __assign(__assign({}, state), { assignedLoans: state.assignedLoans.filter(function (loan) { return loan.ParentUid !== action.uid; }) });
        case 'CREATED_USER':
            return __assign(__assign({}, state), { redirect: true, userTypes: [], user: UserCommon.newUserBody, fileUrl: '', file: null });
        case 'UPDATED_USER':
            return __assign(__assign({}, state), { redirect: true, userTypes: [], usersPage: state.usersPage.map(function (item) {
                    return ((item.Uid === action.user.Uid) ? __assign(__assign({}, item), action.user) : item);
                }), user: UserCommon.newUserBody, fileUrl: '', file: null });
        case 'REDIRECTED_TO_USERS':
            return __assign(__assign({}, state), { redirect: false });
        case 'DELETED_USER':
            return __assign(__assign({}, state), { redirect: true });
        case 'LOGGED_IN_AS_USER':
            return __assign(__assign({}, state), { redirectUrl: action.redirectUrl, isLoginAs: action.isLoginAs, token: action.token });
        default: return state;
    }
};
//# sourceMappingURL=UserStore.js.map