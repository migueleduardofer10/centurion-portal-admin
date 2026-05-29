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
var InvoicesCommon = require("../../commons/InvoicesCommon");
var PaidInvoicesAction = require("../../actions/invoices/PaidInvoicesAction");
exports.actions = PaidInvoicesAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            fetched: false,
            fetchedAll: false,
            exportExcel: false,
            exportExcelDetails: false,
            currentPage: true,
            forceUpdate: false,
            lenderUid: 'all',
            lenders: [],
            gridProps: AppCommon.newGridProps,
            invoices: [],
            invoicesAll: [],
            invoiceDetails: [],
            realColumns: InvoicesCommon.initialPaidInvoicesColumns,
            columns: InvoicesCommon.initialPaidInvoicesColumns,
            columnsDetails: InvoicesCommon.initialInvoiceDetailsColumns,
            invoiceUid: ''
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'CLEARED_PAID_INVOICES':
            return __assign(__assign({}, state), { fetched: false, fetchedAll: false, lenders: [], invoices: [], invoicesAll: [], invoiceDetails: [] });
        case 'FETCHED_PAID_INVOICES':
            return __assign(__assign({}, state), { fetched: true, fetchedAll: action.forced ? false : state.fetchedAll, lenders: action.lenders, invoices: action.invoices, gridProps: action.dataState, realColumns: JSON.parse(JSON.stringify(action.columns)), columns: action.columns });
        case 'FETCHED_PAID_INVOICES_ALL':
            return __assign(__assign({}, state), { fetchedAll: true, invoicesAll: action.invoicesAll });
        case 'FETCHED_PAID_INVOICE_DETAILS':
            return __assign(__assign({}, state), { invoices: action.invoices, forceUpdate: true });
        case 'FETCHED_DETAILS_BY_PAID_INVOICE':
            return __assign(__assign({}, state), { invoiceDetails: action.invoiceDetails });
        case 'DISABLED_FORCE_UPDATE_PAID_INVOICES':
            return __assign(__assign({}, state), { forceUpdate: false });
        case 'CHANGED_LENDERUID_PAID_INVOICES':
            return __assign(__assign({}, state), { lenderUid: action.lenderUid });
        case 'SELECTED_INVOICE_PAID_INVOICES':
            return __assign(__assign({}, state), { invoiceUid: action.invoiceUid });
        case 'ENABLED_EXPORT_EXCEL_PAID_INVOICES':
            return __assign(__assign({}, state), { exportExcel: true, currentPage: action.currentPage });
        case 'DISABLED_EXPORT_EXCEL_PAID_INVOICES':
            return __assign(__assign({}, state), { exportExcel: false });
        case 'ENABLED_EXPORT_EXCEL_DETAILS_PAID_INVOICES':
            return __assign(__assign({}, state), { exportExcelDetails: action.enable });
        case 'CHANGED_COLUMNS_PAID_INVOICES':
            return __assign(__assign({}, state), { columns: action.columns });
        case 'APPLIED_COLUMNS_PAID_INVOICES':
            return __assign(__assign({}, state), { realColumns: action.columns, columns: action.columns });
        default: return state;
    }
};
//# sourceMappingURL=PaidInvoicesStore.js.map