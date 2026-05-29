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
exports.reducer = exports.actions = void 0;
var AppCommon = require("../../commons/AppCommon");
var LenderCommon = require("../../commons/LenderCommon");
var LenChargesAction = require("../../actions/lenders/LenChargesAction");
exports.actions = LenChargesAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            loanUid: '',
            fetchedPage: false,
            fetchedAll: false,
            exportExcel: false,
            currentPage: true,
            hidePaid: false,
            gridProps: __assign(__assign({}, AppCommon.newGridProps), { aggregates: [
                    { field: "OriginalAmount", aggregate: "sum" },
                    { field: "Balance", aggregate: "sum" },
                    { field: "AccruedInterest", aggregate: "sum" },
                    { field: "TotalDue", aggregate: "sum" }
                ] }),
            chargesPage: [],
            chargesAll: [],
            activeColumn: '',
            realColumns: LenderCommon.initialColumnsCharge,
            columns: LenderCommon.initialColumnsCharge,
            summary: {},
            forceUpdate: false
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'SET_LOAN_UID':
            return __assign(__assign({}, state), { loanUid: action.loanUid, fetchedPage: (state.loanUid == action.loanUid) });
        case 'CLEARED_CHARGES':
            return __assign(__assign({}, state), { fetchedPage: false, fetchedAll: false, chargesPage: [], chargesAll: [] });
        case 'FETCHED_CHARGES_PAGE':
            return __assign(__assign({}, state), { fetchedPage: true, fetchedAll: action.forced ? false : state.fetchedAll, hidePaid: action.hidePaid, chargesPage: action.chargesPage, gridProps: action.dataState, activeColumn: action.activeColumn, realColumns: JSON.parse(JSON.stringify(action.columns)), columns: action.columns, summary: action.summary });
        case 'FETCHED_CHARGES_ALL':
            return __assign(__assign({}, state), { fetchedAll: true, chargesAll: action.chargesAll });
        case 'FETCHED_CHARGE_DETAILS':
            return __assign(__assign({}, state), { chargesPage: action.chargesPage, forceUpdate: true });
        case 'FETCHED_CHARGE_DETAILS_BEGIN':
            return __assign(__assign({}, state), { chargesPage: action.chargesPage, forceUpdate: true });
        case 'DISABLED_FORCE_UPDATE':
            return __assign(__assign({}, state), { forceUpdate: false });
        case 'ENABLED_EXPORT_EXCEL_CHARGES':
            return __assign(__assign({}, state), { exportExcel: true, currentPage: action.currentPage });
        case 'DISABLED_EXPORT_EXCEL_CHARGES':
            return __assign(__assign({}, state), { exportExcel: false });
        case 'TOGGLE_DROPDOWN_COLUMNS_CHARGES':
            return __assign(__assign({}, state), { showDropdown: action.show });
        case 'SET_ACTIVE_COLUMN_CHARGES':
            return __assign(__assign({}, state), { activeColumn: action.activeColumn });
        case 'CHANGED_COLUMNS_CHARGES':
            return __assign(__assign({}, state), { columns: action.columns });
        case 'APPLIED_COLUMNS_CHARGES':
            return __assign(__assign({}, state), { realColumns: action.columns, columns: action.columns });
        default: return state;
    }
};
//# sourceMappingURL=LenChargesStore.js.map