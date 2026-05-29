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
exports.reducer = exports.ddd = exports.actions = void 0;
var AppCommon = require("../../commons/AppCommon");
var LenderCommon = require("../../commons/LenderCommon");
var LenLoanAction = require("../../actions/lenders/LenLoanAction");
exports.actions = LenLoanAction.actions;
exports.ddd = function (state, incomingAction) {
    if (state === undefined) {
        return {
            fetched: false,
            fetchedAll: false,
            exportExcel: false,
            currentPage: true,
            loans: [],
            loansAll: [],
            activeColumn: '',
            gridProps: AppCommon.newGridProps,
            columns: LenderCommon.initialColumnsLoan,
            realColumns: LenderCommon.initialColumnsLoan
        };
    }
    return state;
};
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            fetched: false,
            fetchedAll: false,
            exportExcel: false,
            currentPage: true,
            loans: [],
            loansAll: [],
            activeColumn: '',
            gridProps: AppCommon.newGridProps,
            columns: LenderCommon.initialColumnsLoan,
            realColumns: LenderCommon.initialColumnsLoan
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'FETCHED_LOANS_VENDOR':
            return __assign(__assign({}, state), { fetched: true, fetchedAll: action.forced ? false : state.fetchedAll, loans: action.loans, gridProps: action.dataState, activeColumn: action.activeColumn, realColumns: JSON.parse(JSON.stringify(action.columns)), columns: action.columns });
        case 'FETCHED_LOANS_VENDOR_ALL':
            return __assign(__assign({}, state), { fetchedAll: true, loansAll: action.loansAll });
        case 'ENABLED_EXPORT_EXCEL_LOANS':
            return __assign(__assign({}, state), { exportExcel: true, currentPage: action.currentPage });
        case 'DISABLED_EXPORT_EXCEL_LOANS':
            return __assign(__assign({}, state), { exportExcel: false });
        case 'SET_ACTIVE_COLUMN_LOANS':
            return __assign(__assign({}, state), { activeColumn: action.activeColumn });
        case 'CHANGED_COLUMNS_LOANS':
            return __assign(__assign({}, state), { columns: action.columns });
        case 'APPLIED_COLUMNS_LOANS':
            return __assign(__assign({}, state), { realColumns: action.columns, columns: action.columns });
        default: return state;
    }
};
//# sourceMappingURL=LenLoanStore.js.map