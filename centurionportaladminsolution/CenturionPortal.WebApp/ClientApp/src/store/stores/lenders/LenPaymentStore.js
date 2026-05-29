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
var LenPaymentAction = require("../../actions/lenders/LenPaymentAction");
exports.actions = LenPaymentAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            loanUid: '',
            fetched: false,
            fetchedAll: false,
            exportExcel: false,
            currentPage: true,
            excludeFunding: true,
            gridProps: __assign(__assign({}, AppCommon.newGridProps), { aggregates: [
                    { field: "TotalAmount", aggregate: "sum" },
                    { field: "ToInterest", aggregate: "sum" },
                    { field: "ToPrincipal", aggregate: "sum" },
                    { field: "LateCharge", aggregate: "sum" },
                    { field: "ToLateCharge", aggregate: "sum" },
                    { field: "ToReserve", aggregate: "sum" },
                    { field: "ToImpound", aggregate: "sum" },
                    { field: "ToPrepay", aggregate: "sum" },
                    { field: "ToChargesPrincipal", aggregate: "sum" },
                    { field: "ToChargesInterest", aggregate: "sum" },
                    { field: "ToBrokerFee", aggregate: "sum" },
                    { field: "ToLenderFee", aggregate: "sum" },
                    { field: "ToOtherTaxable", aggregate: "sum" },
                    { field: "ToOtherTaxFree", aggregate: "sum" },
                    { field: "ToOtherPayments", aggregate: "sum" },
                    { field: "ToUnpaidInterest", aggregate: "sum" },
                ] }),
            payments: [],
            paymentsAll: [],
            activeColumn: '',
            realColumns: LenderCommon.initialColumnsPayments,
            columns: LenderCommon.initialColumnsPayments,
            summary: {}
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'SET_LOAN_UID':
            return __assign(__assign({}, state), { loanUid: action.loanUid, fetched: (state.loanUid == action.loanUid) });
        case 'CLEARED_PAYMENTS':
            return __assign(__assign({}, state), { fetched: false, fetchedAll: false, payments: [], paymentsAll: [] });
        case 'FETCHED_PAYMENTS':
            return __assign(__assign({}, state), { fetched: true, fetchedAll: action.forced ? false : state.fetchedAll, excludeFunding: action.excludeFunding, payments: action.payments, gridProps: action.dataState, activeColumn: action.activeColumn, realColumns: JSON.parse(JSON.stringify(action.columns)), summary: action.summary, columns: action.columns });
        case 'FETCHED_PAYMENTS_ALL':
            return __assign(__assign({}, state), { fetchedAll: true, paymentsAll: action.paymentsAll });
        case 'ENABLED_EXPORT_EXCEL_PAYMENTS':
            return __assign(__assign({}, state), { exportExcel: true, currentPage: action.currentPage });
        case 'DISABLED_EXPORT_EXCEL_PAYMENTS':
            return __assign(__assign({}, state), { exportExcel: false });
        case 'SET_ACTIVE_COLUMN_PAYMENTS':
            return __assign(__assign({}, state), { activeColumn: action.activeColumn });
        case 'CHANGED_COLUMNS_PAYMENTS':
            return __assign(__assign({}, state), { columns: action.columns });
        case 'APPLIED_COLUMNS_PAYMENTS':
            return __assign(__assign({}, state), { realColumns: action.columns, columns: action.columns });
        default: return state;
    }
};
//# sourceMappingURL=LenPaymentStore.js.map