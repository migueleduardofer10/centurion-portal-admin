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
var PendingInvoicesAction = require("../../actions/invoices/PendingInvoicesAction");
exports.actions = PendingInvoicesAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            fetched: false,
            fetchedAll: false,
            exportExcel: false,
            exportExcelDetails: false,
            currentPage: true,
            onlyPositive: true,
            forceUpdate: false,
            appliedPayment: false,
            lenderUid: 'all',
            gridProps: AppCommon.newGridProps,
            invoices: [],
            invoicesAll: [],
            invoiceDetails: [],
            lenders: [],
            realColumns: InvoicesCommon.initialPendingInvoicesColumns,
            columns: InvoicesCommon.initialPendingInvoicesColumns,
            columnsDetails: InvoicesCommon.initialInvoiceDetailsColumns,
            invoiceUid: '',
            customerUid: '',
            listInvoiceUid: [],
            openVCheck: false,
            openPayPal: false,
            openCreditCard: false,
            states: [],
            vCheckModel: InvoicesCommon.newVCheckModel,
            payPalModel: InvoicesCommon.newPayPalModel,
            creditCardModel: InvoicesCommon.newCreditCardModel,
            paymentTerms: ''
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'CLEARED_PENDING_INVOICES':
            return __assign(__assign({}, state), { fetched: false, fetchedAll: false, appliedPayment: false, lenders: [], invoices: [], invoicesAll: [], invoiceDetails: [] });
        case 'FETCHED_PENDING_INVOICES':
            return __assign(__assign({}, state), { fetched: true, fetchedAll: action.forced ? false : state.fetchedAll, lenders: action.lenders, invoices: action.invoices, gridProps: action.dataState, realColumns: JSON.parse(JSON.stringify(action.columns)), columns: action.columns });
        case 'FETCHED_PENDING_INVOICES_ALL':
            return __assign(__assign({}, state), { fetchedAll: true, invoicesAll: action.invoicesAll });
        case 'FETCHED_PENDING_INVOICE_DETAILS':
            return __assign(__assign({}, state), { invoices: action.invoices, forceUpdate: true });
        case 'FETCHED_DETAILS_BY_PENDING_INVOICE':
            return __assign(__assign({}, state), { invoiceDetails: action.invoiceDetails });
        case 'DISABLED_FORCE_UPDATE_PENDING_INVOICES':
            return __assign(__assign({}, state), { forceUpdate: false });
        case 'CHANGED_LENDERUID_PENDING_INVOICES':
            return __assign(__assign({}, state), { lenderUid: action.lenderUid });
        case 'CHANGED_ONLY_POSITIVE_PENDING_INVOICES':
            return __assign(__assign({}, state), { onlyPositive: action.onlyPositive });
        case 'UPDATED_INVOICES_PENDING_INVOICES':
            return __assign(__assign({}, state), { invoices: action.invoices, customerUid: action.customerUid, listInvoiceUid: action.listInvoiceUid });
        case 'SELECTED_INVOICE_PENDING_INVOICES':
            return __assign(__assign({}, state), { invoiceUid: action.invoiceUid });
        case 'ENABLED_EXPORT_EXCEL_PENDING_INVOICES':
            return __assign(__assign({}, state), { exportExcel: true, currentPage: action.currentPage });
        case 'DISABLED_EXPORT_EXCEL_PENDING_INVOICES':
            return __assign(__assign({}, state), { exportExcel: false });
        case 'ENABLED_EXPORT_EXCEL_DETAILS_PENDING_INVOICES':
            return __assign(__assign({}, state), { exportExcelDetails: action.enable });
        case 'CHANGED_COLUMNS_PENDING_INVOICES':
            return __assign(__assign({}, state), { columns: action.columns });
        case 'APPLIED_COLUMNS_PENDING_INVOICES':
            return __assign(__assign({}, state), { realColumns: action.columns, columns: action.columns });
        case 'TOGGLE_VCHECK_MODAL_PENDING_INVOICES':
            return __assign(__assign({}, state), { openVCheck: !state.openVCheck });
        case 'TOGGLE_PAYPAL_MODAL_PENDING_INVOICES':
            return __assign(__assign({}, state), { openPayPal: !state.openPayPal });
        case 'TOGGLE_CREDITCARD_MODAL_PENDING_INVOICES':
            return __assign(__assign({}, state), { openCreditCard: !state.openCreditCard });
        case 'FETCHED_VCHECK_MODEL_PENDING_INVOICES':
            return __assign(__assign({}, state), { openVCheck: true, vCheckModel: action.vCheckModel, paymentTerms: action.vCheckTerms, states: action.states });
        case 'FETCHED_PAYPAL_MODEL_PENDING_INVOICES':
            return __assign(__assign({}, state), { openPayPal: true, payPalModel: action.payPalModel, paymentTerms: action.payPalTerms });
        case 'FETCHED_CREDITCARD_MODEL_PENDING_INVOICES':
            return __assign(__assign({}, state), { openCreditCard: true, creditCardModel: action.creditCardModel, paymentTerms: action.creditCardTerms, states: action.states });
        case 'CHANGED_VCHECK_MODEL_PENDING_INVOICES':
            return __assign(__assign({}, state), { vCheckModel: action.vCheckModel });
        case 'CHANGED_PAYPAL_MODEL_PENDING_INVOICES':
            return __assign(__assign({}, state), { payPalModel: action.payPalModel });
        case 'CHANGED_CREDITCARD_MODEL_PENDING_INVOICES':
            return __assign(__assign({}, state), { creditCardModel: action.creditCardModel });
        case 'APPLIED_PAYMENT_BY_VCHECK_PENDING_INVOICES':
            return __assign(__assign({}, state), { vCheckModel: InvoicesCommon.newVCheckModel, appliedPayment: true, openVCheck: false });
        case 'APPLIED_PAYMENT_BY_PAYPAL_PENDING_INVOICES':
            return __assign(__assign({}, state), { payPalModel: InvoicesCommon.newPayPalModel, appliedPayment: true, openPayPal: false });
        case 'APPLIED_PAYMENT_BY_CREDITCARD_PENDING_INVOICES':
            return __assign(__assign({}, state), { creditCardModel: InvoicesCommon.newCreditCardModel, appliedPayment: true, openCreditCard: false });
        default: return state;
    }
};
//# sourceMappingURL=PendingInvoicesStore.js.map