import { Action, Reducer } from 'redux';
import * as AppCommon from '../../commons/AppCommon';
import * as InvoicesCommon from '../../commons/InvoicesCommon';
import * as PendingInvoicesAction from '../../actions/invoices/PendingInvoicesAction';

export const actions = PendingInvoicesAction.actions;

export interface State {
    fetched: boolean;
    fetchedAll: boolean;
    exportExcel: boolean;
    exportExcelDetails: boolean;
    currentPage: boolean;
    forceUpdate: boolean;
    onlyPositive: boolean;
    appliedPayment: boolean;
    lenderUid: string;
    gridProps: AppCommon.GridProps;
    lenders: AppCommon.ServiceMap[];
    invoices: InvoicesCommon.PendingInvoices[];
    invoicesAll: InvoicesCommon.PendingInvoices[];
    invoiceDetails: InvoicesCommon.InvoiceDetails[];
    realColumns: any[];
    columns: any[];
    columnsDetails: any[];
    invoiceUid: string;
    customerUid: string;
    listInvoiceUid: string[];
    openVCheck: boolean;
    openPayPal: boolean;
    openCreditCard: boolean;
    states: InvoicesCommon.INFState[];
    vCheckModel: InvoicesCommon.VCheckModel;
    payPalModel: InvoicesCommon.PayPalModel;
    creditCardModel: InvoicesCommon.CreditCardModel;
    paymentTerms: string;
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
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

    const action = incomingAction as PendingInvoicesAction.KnownAction;
    switch (action.type) {
        case 'CLEARED_PENDING_INVOICES':
            return {
                ...state,
                fetched: false,
                fetchedAll: false,
                appliedPayment: false,
                lenders: [],
                invoices: [],
                invoicesAll: [],
                invoiceDetails: []
            };
        case 'FETCHED_PENDING_INVOICES':
            return {
                ...state,
                fetched: true,
                fetchedAll: action.forced ? false : state.fetchedAll,
                lenders: action.lenders,
                invoices: action.invoices,
                gridProps: action.dataState,
                realColumns: JSON.parse(JSON.stringify(action.columns)),
                columns: action.columns
            };
        case 'FETCHED_PENDING_INVOICES_ALL':
            return {
                ...state,
                fetchedAll: true,
                invoicesAll: action.invoicesAll
            };
        case 'FETCHED_PENDING_INVOICE_DETAILS':
            return {
                ...state,
                invoices: action.invoices,
                forceUpdate: true
            };
        case 'FETCHED_DETAILS_BY_PENDING_INVOICE':
            return {
                ...state,
                invoiceDetails: action.invoiceDetails
            };
        case 'DISABLED_FORCE_UPDATE_PENDING_INVOICES':
            return {
                ...state,
                forceUpdate: false
            };
        case 'CHANGED_LENDERUID_PENDING_INVOICES':
            return {
                ...state,
                lenderUid: action.lenderUid
            };
        case 'CHANGED_ONLY_POSITIVE_PENDING_INVOICES':
            return {
                ...state,
                onlyPositive: action.onlyPositive
            };
        case 'UPDATED_INVOICES_PENDING_INVOICES':
            return {
                ...state,
                invoices: action.invoices,
                customerUid: action.customerUid!,
                listInvoiceUid: action.listInvoiceUid
            };
        case 'SELECTED_INVOICE_PENDING_INVOICES':
            return {
                ...state,
                invoiceUid: action.invoiceUid,
            };
        case 'ENABLED_EXPORT_EXCEL_PENDING_INVOICES':
            return {
                ...state,
                exportExcel: true,
                currentPage: action.currentPage
            };
        case 'DISABLED_EXPORT_EXCEL_PENDING_INVOICES':
            return {
                ...state,
                exportExcel: false,
            };
        case 'ENABLED_EXPORT_EXCEL_DETAILS_PENDING_INVOICES':
            return {
                ...state,
                exportExcelDetails: action.enable,
            };
        case 'CHANGED_COLUMNS_PENDING_INVOICES':
            return {
                ...state,
                columns: action.columns,
            };
        case 'APPLIED_COLUMNS_PENDING_INVOICES':
            return {
                ...state,
                realColumns: action.columns,
                columns: action.columns
            };
        case 'TOGGLE_VCHECK_MODAL_PENDING_INVOICES':
            return {
                ...state,
                openVCheck: !state.openVCheck,
            };
        case 'TOGGLE_PAYPAL_MODAL_PENDING_INVOICES':
            return {
                ...state,
                openPayPal: !state.openPayPal,
            };
        case 'TOGGLE_CREDITCARD_MODAL_PENDING_INVOICES':
            return {
                ...state,
                openCreditCard: !state.openCreditCard,
            };
        case 'FETCHED_VCHECK_MODEL_PENDING_INVOICES':
            return {
                ...state,
                openVCheck: true,
                vCheckModel: action.vCheckModel,
                paymentTerms: action.vCheckTerms,
                states: action.states
            };
        case 'FETCHED_PAYPAL_MODEL_PENDING_INVOICES':
            return {
                ...state,
                openPayPal: true,
                payPalModel: action.payPalModel,
                paymentTerms: action.payPalTerms
            };
        case 'FETCHED_CREDITCARD_MODEL_PENDING_INVOICES':
            return {
                ...state,
                openCreditCard: true,
                creditCardModel: action.creditCardModel,
                paymentTerms: action.creditCardTerms,
                states: action.states
            };
        case 'CHANGED_VCHECK_MODEL_PENDING_INVOICES':
            return {
                ...state,
                vCheckModel: action.vCheckModel
            };
        case 'CHANGED_PAYPAL_MODEL_PENDING_INVOICES':
            return {
                ...state,
                payPalModel: action.payPalModel
            };
        case 'CHANGED_CREDITCARD_MODEL_PENDING_INVOICES':
            return {
                ...state,
                creditCardModel: action.creditCardModel
            };
        case 'APPLIED_PAYMENT_BY_VCHECK_PENDING_INVOICES':
            return {
                ...state,
                vCheckModel: InvoicesCommon.newVCheckModel,
                appliedPayment: true,
                openVCheck: false
            };
        case 'APPLIED_PAYMENT_BY_PAYPAL_PENDING_INVOICES':
            return {
                ...state,
                payPalModel: InvoicesCommon.newPayPalModel,
                appliedPayment: true,
                openPayPal: false
            };
        case 'APPLIED_PAYMENT_BY_CREDITCARD_PENDING_INVOICES':
            return {
                ...state,
                creditCardModel: InvoicesCommon.newCreditCardModel,
                appliedPayment: true,
                openCreditCard: false
            };
        default: return state;
    }
};
