import { toDataSourceRequestString } from '@progress/kendo-data-query';

import { AppThunkAction } from '../../index';
import * as AppAction from '../app/AppAction';
import * as Enums from '../../../utilities/Enums';
import * as AppCommon from '../../commons/AppCommon';
import * as InvoicesCommon from '../../commons/InvoicesCommon';
import { Auth, Notify, Utils } from '../../../utilities/Functions';
import { BackEndResult3 } from '../../commons/LenderCommon2';

const title = "Paid Invoices";

interface ClearInvoicesAction {
    type: 'CLEARED_PAID_INVOICES';
}

interface FetchInvoicesAction {
    type: 'FETCHED_PAID_INVOICES';
    lenders: AppCommon.ServiceMap[];
    invoices: InvoicesCommon.PaidInvoices[];
    dataState: any;
    columns: any[];
    forced: boolean;
}

interface FetchInvoicesAllAction {
    type: 'FETCHED_PAID_INVOICES_ALL';
    invoicesAll: InvoicesCommon.PaidInvoices[];
}

interface FetchInvoiceDetailsAction {
    type: 'FETCHED_PAID_INVOICE_DETAILS';
    invoices: InvoicesCommon.PaidInvoices[];
}

interface FetchDetailsByInvoiceAction {
    type: 'FETCHED_DETAILS_BY_PAID_INVOICE';
    invoiceDetails: InvoicesCommon.InvoiceDetails[];
}

interface DisableForceUpdateAction {
    type: 'DISABLED_FORCE_UPDATE_PAID_INVOICES';
}

interface ChangeLenderUidAction {
    type: 'CHANGED_LENDERUID_PAID_INVOICES';
    lenderUid: string;
}

interface SelectInvoiceAction {
    type: 'SELECTED_INVOICE_PAID_INVOICES';
    invoiceUid: string;
}

interface EnableExportExcelAction {
    type: 'ENABLED_EXPORT_EXCEL_PAID_INVOICES';
    currentPage: boolean;
}

interface DisableExportExcelAction {
    type: 'DISABLED_EXPORT_EXCEL_PAID_INVOICES';
}

interface EnableExportExcelDetailsAction {
    type: 'ENABLED_EXPORT_EXCEL_DETAILS_PAID_INVOICES';
    enable: boolean;
}

interface ChangeColumnsAction {
    type: 'CHANGED_COLUMNS_PAID_INVOICES';
    columns: any[];
}

interface ApplyColumnsAction {
    type: 'APPLIED_COLUMNS_PAID_INVOICES';
    columns: any[];
}

export type KnownAction = AppAction.KnownAction | ClearInvoicesAction | FetchInvoicesAction | FetchInvoicesAllAction | FetchInvoiceDetailsAction |
    DisableForceUpdateAction | EnableExportExcelAction | DisableExportExcelAction | ChangeColumnsAction | ApplyColumnsAction | FetchDetailsByInvoiceAction |
    EnableExportExcelDetailsAction | SelectInvoiceAction | ChangeLenderUidAction;

export const actions = {
    fetchInvoices: (
        dataState: any, getColumns: boolean, forced: boolean, lenderUid?: string
    ): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const appState = getState();
        const gridProps = appState.paidInvoices.gridProps;
        const fetched = appState.paidInvoices.fetched;

        if (fetched && !forced && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
            dataState.sort == gridProps.sort && dataState.filter == gridProps.filter) return;

        dataState = { ...gridProps, ...dataState };
        lenderUid = lenderUid === undefined ? appState.paidInvoices.lenderUid : lenderUid;

        dispatch({ type: 'LOADING' });
        dispatch({ type: 'CLEARED_PAID_INVOICES' });
        dispatch({ type: 'CHANGED_LENDERUID_PAID_INVOICES', lenderUid });

        fetch(`/api/invoice/paid/${getColumns}/${lenderUid}?${toDataSourceRequestString(dataState)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: BackEndResult3<any>) => {
                if (Utils.validateData(dispatch, data, title)) {
                    let lenders = (!data.ObjOptional.Lenders || data.ObjOptional.Lenders.length == 0) ? appState.paidInvoices.lenders : data.ObjOptional.Lenders;
                    let columns = Utils.getColumns(appState.paidInvoices.columns, data.ObjOptional.Columns);
                    dispatch({
                        type: 'FETCHED_PAID_INVOICES',
                        invoices: data.ObjOptional.Result.Data,
                        dataState: { ...dataState, total: data.ObjOptional.Result.Total },
                        lenders,
                        columns,
                        forced
                    });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    fetchInvoicesAll: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let dataState = { ...appState.lenLoans.gridProps, take: 0 };

        dispatch({ type: 'LOADING' });

        if (appState && appState.paidInvoices && appState.paidInvoices.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAID_INVOICES', currentPage: false });
        } else {
            fetch(`/api/invoice/paid/false?${toDataSourceRequestString(dataState)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: any) => {
                    if (Utils.validateData(dispatch, data, title)) {
                        dispatch({ type: 'FETCHED_PAID_INVOICES_ALL', invoicesAll: data.ObjOptional.Result.Data });
                        dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAID_INVOICES', currentPage: false });
                    }
                }).catch(error => {
                    Utils.showError(dispatch, error, title);
                });
        }
    },

    fetchInvoiceDetails: (
        dataItem: InvoicesCommon.PaidInvoices, invoices: InvoicesCommon.PaidInvoices[]
    ): AppThunkAction<KnownAction> => (dispatch) => {

        let dataItemIndex: number = -1;

        invoices = invoices.map((item: InvoicesCommon.PaidInvoices, index: number) => {
            if (item.Uid == dataItem.Uid) {
                dataItemIndex = index;
                item = { ...dataItem, IsLoading: true };
            }

            return item;
        });

        dispatch({ type: 'FETCHED_PAID_INVOICE_DETAILS', invoices });

        fetch(`/api/invoice/details/${dataItem.Uid}/${dataItem.CustomerUid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: BackEndResult3<any>) => {
                if (Utils.validateData(dispatch, data, title)) {
                    let dependencies = data.ObjOptional;
                    let details: InvoicesCommon.InvoiceDetail[] = [];

                    dependencies.map((dependencie: any) => {
                        details.push({
                            AppCreationDate: dependencie.Payment.AppCreationDate,
                            DateReceived: dependencie.Payment.DateReceived,
                            Reference: dependencie.Payment.Reference,
                            Memo: dependencie.Payment.Memo,
                            ReferenceLog: dependencie.PaymentLog.Reference,
                            Amount: dependencie.Payment.Amount,
                            AppCreationDate_String: dependencie.Payment.AppCreationDate_String,
                            DateReceived_String: dependencie.Payment.DateReceived_String,
                        });
                    });

                    invoices[dataItemIndex] = {
                        ...dataItem,
                        IsLoading: false, Details: details,
                        Columns: InvoicesCommon.initialInvoiceDetailColumns
                    }
                } else {
                    invoices[dataItemIndex] = {
                        ...dataItem, IsLoading: false
                    }
                }

                dispatch({ type: 'FETCHED_PAID_INVOICE_DETAILS', invoices });

            }).catch(error => {
                Utils.showError(dispatch, error, title);

                invoices[dataItemIndex] = {
                    ...dataItem,
                    IsLoading: false
                }

                dispatch({ type: 'FETCHED_PAID_INVOICE_DETAILS', invoices });
            });
    },

    fetchDetailsByInvoice: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let invoiceUid = appState.paidInvoices.invoiceUid;

        if (invoiceUid.trim() == '') {
            Notify.warning("No Invoice Selected!", title);
            return;
        }

        dispatch({ type: 'LOADING' });

        fetch(`/api/invoice/${invoiceUid}/details`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: BackEndResult3<any>) => {
                if (Utils.validateData(dispatch, data, title)) {
                    dispatch({ type: 'FETCHED_DETAILS_BY_PAID_INVOICE', invoiceDetails: data.ObjOptional });
                    dispatch({ type: 'ENABLED_EXPORT_EXCEL_DETAILS_PAID_INVOICES', enable: true });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    disableForceUpdate: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'DISABLED_FORCE_UPDATE_PAID_INVOICES' });
    },

    selectInvoice: (invoiceUid: string): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'SELECTED_INVOICE_PAID_INVOICES', invoiceUid });
    },

    enableExportExcel: (enable: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        if (enable)
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAID_INVOICES', currentPage: true });
        else {
            dispatch({ type: 'LOADED' });
            dispatch({ type: 'DISABLED_EXPORT_EXCEL_PAID_INVOICES' });
        }
    },

    enableExportExcelDetails: (enable: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        if (!enable) dispatch({ type: 'LOADED' });
        dispatch({ type: 'ENABLED_EXPORT_EXCEL_DETAILS_PAID_INVOICES', enable });
    },

    changedColumns: (columns: any[]): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'CHANGED_COLUMNS_PAID_INVOICES', columns });
    },

    applyChangedColumns: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.paidInvoices.columns;

        dispatch({ type: 'LOADING' });

        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.VWL_PAIDINVOICES), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            },
            body: JSON.stringify(columns)
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    Notify.success(data.Message, title);
                    dispatch({ type: 'APPLIED_COLUMNS_PAID_INVOICES', columns: columns });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    }
}