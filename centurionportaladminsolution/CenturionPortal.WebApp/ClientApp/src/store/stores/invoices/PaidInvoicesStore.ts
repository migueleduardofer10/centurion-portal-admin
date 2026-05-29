import { Action, Reducer } from 'redux';
import * as AppCommon from '../../commons/AppCommon';
import * as InvoicesCommon from '../../commons/InvoicesCommon';
import * as PaidInvoicesAction from '../../actions/invoices/PaidInvoicesAction';

export const actions = PaidInvoicesAction.actions;

export interface State {
    fetched: boolean;
    fetchedAll: boolean;
    exportExcel: boolean;
    exportExcelDetails: boolean;
    currentPage: boolean;
    forceUpdate: boolean;
    lenderUid: string;
    gridProps: AppCommon.GridProps;
    lenders: AppCommon.ServiceMap[];
    invoices: InvoicesCommon.PaidInvoices[];
    invoicesAll: InvoicesCommon.PaidInvoices[];
    invoiceDetails: InvoicesCommon.InvoiceDetails[];
    realColumns: any[];
    columns: any[];
    columnsDetails: any[];
    invoiceUid: string;
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
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

    const action = incomingAction as PaidInvoicesAction.KnownAction;
    switch (action.type) {
        case 'CLEARED_PAID_INVOICES':
            return {
                ...state,
                fetched: false,
                fetchedAll: false,
                lenders: [],
                invoices: [],
                invoicesAll: [],
                invoiceDetails: []
            };
        case 'FETCHED_PAID_INVOICES':
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
        case 'FETCHED_PAID_INVOICES_ALL':
            return {
                ...state,
                fetchedAll: true,
                invoicesAll: action.invoicesAll
            };
        case 'FETCHED_PAID_INVOICE_DETAILS':
            return {
                ...state,
                invoices: action.invoices,
                forceUpdate: true
            };
        case 'FETCHED_DETAILS_BY_PAID_INVOICE':
            return {
                ...state,
                invoiceDetails: action.invoiceDetails
            };
        case 'DISABLED_FORCE_UPDATE_PAID_INVOICES':
            return {
                ...state,
                forceUpdate: false
            };
        case 'CHANGED_LENDERUID_PAID_INVOICES':
            return {
                ...state,
                lenderUid: action.lenderUid
            };
        case 'SELECTED_INVOICE_PAID_INVOICES':
            return {
                ...state,
                invoiceUid: action.invoiceUid
            };
        case 'ENABLED_EXPORT_EXCEL_PAID_INVOICES':
            return {
                ...state,
                exportExcel: true,
                currentPage: action.currentPage
            };
        case 'DISABLED_EXPORT_EXCEL_PAID_INVOICES':
            return {
                ...state,
                exportExcel: false,
            };
        case 'ENABLED_EXPORT_EXCEL_DETAILS_PAID_INVOICES':
            return {
                ...state,
                exportExcelDetails: action.enable,
            };
        case 'CHANGED_COLUMNS_PAID_INVOICES':
            return {
                ...state,
                columns: action.columns,
            };
        case 'APPLIED_COLUMNS_PAID_INVOICES':
            return {
                ...state,
                realColumns: action.columns,
                columns: action.columns
            };
        default: return state;
    }
};
