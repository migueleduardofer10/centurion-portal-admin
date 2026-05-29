import { toDataSourceRequestString } from '@progress/kendo-data-query';

import { AppThunkAction } from '../../index';
import * as AppAction from '../app/AppAction';
import * as Enums from '../../../utilities/Enums';
import * as AppCommon from '../../commons/AppCommon';
import * as InvoicesCommon from '../../commons/InvoicesCommon';
import { Auth, Notify, Utils } from '../../../utilities/Functions';
import { BackEndResult3 } from '../../commons/LenderCommon2';

const title = "Pending Invoices";

interface ClearInvoicesAction {
    type: 'CLEARED_PENDING_INVOICES';
}

interface FetchInvoicesAction {
    type: 'FETCHED_PENDING_INVOICES';
    lenders: AppCommon.ServiceMap[];
    invoices: InvoicesCommon.PendingInvoices[];
    dataState: any;
    columns: any[];
    forced: boolean;
}

interface FetchInvoicesAllAction {
    type: 'FETCHED_PENDING_INVOICES_ALL';
    invoicesAll: InvoicesCommon.PendingInvoices[];
}

interface FetchInvoiceDetailsAction {
    type: 'FETCHED_PENDING_INVOICE_DETAILS';
    invoices: InvoicesCommon.PendingInvoices[];
}

interface FetchDetailsByInvoiceAction {
    type: 'FETCHED_DETAILS_BY_PENDING_INVOICE';
    invoiceDetails: InvoicesCommon.InvoiceDetails[];
}

interface DisableForceUpdateAction {
    type: 'DISABLED_FORCE_UPDATE_PENDING_INVOICES';
}

interface ChangeLenderUidAction {
    type: 'CHANGED_LENDERUID_PENDING_INVOICES';
    lenderUid: string;
}

interface ChangeOnlyPositiveAction {
    type: 'CHANGED_ONLY_POSITIVE_PENDING_INVOICES';
    onlyPositive: boolean;
}

interface UpdateInvoicesAction {
    type: 'UPDATED_INVOICES_PENDING_INVOICES';
    invoices: InvoicesCommon.PendingInvoices[];
    customerUid?: string;
    listInvoiceUid: string[];
}

interface SelectInvoiceAction {
    type: 'SELECTED_INVOICE_PENDING_INVOICES';
    invoiceUid: string;
}

interface EnableExportExcelAction {
    type: 'ENABLED_EXPORT_EXCEL_PENDING_INVOICES';
    currentPage: boolean;
}

interface DisableExportExcelAction {
    type: 'DISABLED_EXPORT_EXCEL_PENDING_INVOICES';
}

interface EnableExportExcelDetailsAction {
    type: 'ENABLED_EXPORT_EXCEL_DETAILS_PENDING_INVOICES';
    enable: boolean;
}

interface ChangeColumnsAction {
    type: 'CHANGED_COLUMNS_PENDING_INVOICES';
    columns: any[];
}

interface ApplyColumnsAction {
    type: 'APPLIED_COLUMNS_PENDING_INVOICES';
    columns: any[];
}

interface ToggleVCheckModalModelAction {
    type: 'TOGGLE_VCHECK_MODAL_PENDING_INVOICES';
}

interface TogglePayPalModalModelAction {
    type: 'TOGGLE_PAYPAL_MODAL_PENDING_INVOICES';
}

interface ToggleCreditCardModalModelAction {
    type: 'TOGGLE_CREDITCARD_MODAL_PENDING_INVOICES';
}

interface FetchPayPalModelAction {
    type: 'FETCHED_PAYPAL_MODEL_PENDING_INVOICES';
    payPalModel: InvoicesCommon.PayPalModel;
    payPalTerms: string;
}

interface FetchCreditCardModelAction {
    type: 'FETCHED_CREDITCARD_MODEL_PENDING_INVOICES';
    creditCardModel: InvoicesCommon.CreditCardModel;
    creditCardTerms: string;
    states: InvoicesCommon.INFState[];
}

interface FetchVCheckModelAction {
    type: 'FETCHED_VCHECK_MODEL_PENDING_INVOICES';
    vCheckModel: InvoicesCommon.VCheckModel;
    vCheckTerms: string;
    states: InvoicesCommon.INFState[];
}

interface FetchPayPalModelAction {
    type: 'FETCHED_PAYPAL_MODEL_PENDING_INVOICES';
    payPalModel: InvoicesCommon.PayPalModel;
    payPalTerms: string;
}

interface FetchCreditCardModelAction {
    type: 'FETCHED_CREDITCARD_MODEL_PENDING_INVOICES';
    creditCardModel: InvoicesCommon.CreditCardModel;
    creditCardTerms: string;
    states: InvoicesCommon.INFState[];
}

interface ChangeVCheckModelAction {
    type: 'CHANGED_VCHECK_MODEL_PENDING_INVOICES';
    vCheckModel: InvoicesCommon.VCheckModel;
}

interface ChangePayPalModelAction {
    type: 'CHANGED_PAYPAL_MODEL_PENDING_INVOICES';
    payPalModel: InvoicesCommon.PayPalModel;
}

interface ChangeCreditCardModelAction {
    type: 'CHANGED_CREDITCARD_MODEL_PENDING_INVOICES';
    creditCardModel: InvoicesCommon.CreditCardModel;
}

interface ApplyPaymentByVCheckAction {
    type: 'APPLIED_PAYMENT_BY_VCHECK_PENDING_INVOICES';
}

interface ApplyPaymentByPayPalAction {
    type: 'APPLIED_PAYMENT_BY_PAYPAL_PENDING_INVOICES';
}

interface ApplyPaymentByCreditCardAction {
    type: 'APPLIED_PAYMENT_BY_CREDITCARD_PENDING_INVOICES';
}

export type KnownAction = AppAction.KnownAction | ClearInvoicesAction | FetchInvoicesAction | FetchInvoicesAllAction | ChangeOnlyPositiveAction | ChangeLenderUidAction |
    UpdateInvoicesAction | SelectInvoiceAction | EnableExportExcelAction | DisableExportExcelAction | ChangeColumnsAction | ApplyColumnsAction |
    ToggleVCheckModalModelAction | TogglePayPalModalModelAction | ToggleCreditCardModalModelAction | FetchVCheckModelAction | FetchPayPalModelAction |
    FetchCreditCardModelAction | FetchInvoiceDetailsAction | DisableForceUpdateAction | ChangeVCheckModelAction | ChangePayPalModelAction | ChangeCreditCardModelAction |
    ApplyPaymentByVCheckAction | ApplyPaymentByPayPalAction | ApplyPaymentByCreditCardAction | FetchDetailsByInvoiceAction | EnableExportExcelDetailsAction;

const selectedCustomers = (invoices: InvoicesCommon.PendingInvoices[]) => {
    let listCustomerUid: string[] = [];

    invoices.filter((invoice: InvoicesCommon.PendingInvoices) => invoice.Selected)
        .forEach((invoice: InvoicesCommon.PendingInvoices) => {
            if (listCustomerUid.indexOf(invoice.CustomerUid) === -1)
                listCustomerUid.push(invoice.CustomerUid);
        });

    return listCustomerUid;
}

const selectedInvoices = (invoices: InvoicesCommon.PendingInvoices[]) => {
    return invoices.filter((invoice: InvoicesCommon.PendingInvoices) => invoice.Selected)
        .map((invoice: InvoicesCommon.PendingInvoices) => invoice.Uid);
}

const validateSelectedCustomers = (listCustomerUid: string[]) => {
    if (listCustomerUid.length > 1)
        Notify.warning("There are more than one investor selected!", title);

    return listCustomerUid.length <= 1;
}

const hasSelectedInvoices = (invoices: InvoicesCommon.PendingInvoices[]) => {
    let listSelectedInvoices = invoices.filter((invoice: any) => invoice.Selected);

    if (listSelectedInvoices.length == 0)
        Notify.warning("No Invoices Selected!", title);

    return listSelectedInvoices.length > 0;
}

export const actions = {
    fetchInvoices: (
        dataState: any, getColumns: boolean, forced: boolean, lenderUid?: string, onlyPositive?: boolean
    ): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const appState = getState();
        const gridProps = appState.pendingInvoices.gridProps;
        const fetched = appState.pendingInvoices.fetched;

        if (fetched && !forced && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
            dataState.sort == gridProps.sort && dataState.filter == gridProps.filter) return;

        dataState = { ...gridProps, ...dataState };
        lenderUid = lenderUid === undefined ? appState.pendingInvoices.lenderUid : lenderUid;
        onlyPositive = onlyPositive === undefined ? appState.pendingInvoices.onlyPositive : onlyPositive;

        dispatch({ type: 'LOADING' });
        dispatch({ type: 'CLEARED_PENDING_INVOICES' });
        dispatch({ type: 'CHANGED_LENDERUID_PENDING_INVOICES', lenderUid });
        dispatch({ type: 'CHANGED_ONLY_POSITIVE_PENDING_INVOICES', onlyPositive });

        fetch(`/api/invoice/pending/${getColumns}/${lenderUid}/${onlyPositive}?${toDataSourceRequestString(dataState)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: BackEndResult3<any>) => {
                if (Utils.validateData(dispatch, data, title)) {
                    let lenders = (data.ObjOptional.Lenders || data.ObjOptional.Lenders.length == 0) ? appState.pendingInvoices.lenders : data.ObjOptional.Lenders;
                    let columns = Utils.getColumns(appState.pendingInvoices.columns, data.ObjOptional.Columns);
                    dispatch({
                        type: 'FETCHED_PENDING_INVOICES',
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

        if (appState && appState.pendingInvoices && appState.pendingInvoices.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_PENDING_INVOICES', currentPage: false });
        } else {
            fetch(`/api/invoice/pending/false/${appState.pendingInvoices.onlyPositive}?${toDataSourceRequestString(dataState)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: any) => {
                    if (Utils.validateData(dispatch, data, title)) {
                        dispatch({ type: 'FETCHED_PENDING_INVOICES_ALL', invoicesAll: data.ObjOptional.Result.Data });
                        dispatch({ type: 'ENABLED_EXPORT_EXCEL_PENDING_INVOICES', currentPage: false });
                    }
                }).catch(error => {
                    Utils.showError(dispatch, error, title);
                });
        }
    },

    fetchInvoiceDetails: (
        dataItem: InvoicesCommon.PendingInvoices, invoices: InvoicesCommon.PendingInvoices[]
    ): AppThunkAction<KnownAction> => (dispatch) => {

        let dataItemIndex: number = -1;

        invoices = invoices.map((item: InvoicesCommon.PendingInvoices, index: number) => {
            if (item.Uid == dataItem.Uid) {
                dataItemIndex = index;
                item = { ...dataItem, IsLoading: true };
            }

            return item;
        });

        dispatch({ type: 'FETCHED_PENDING_INVOICE_DETAILS', invoices });

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

                dispatch({ type: 'FETCHED_PENDING_INVOICE_DETAILS', invoices });

            }).catch(error => {
                Utils.showError(dispatch, error, title);

                invoices[dataItemIndex] = {
                    ...dataItem,
                    IsLoading: false
                }

                dispatch({ type: 'FETCHED_PENDING_INVOICE_DETAILS', invoices });
            });
    },

    fetchDetailsByInvoice: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let invoiceUid = appState.pendingInvoices.invoiceUid;

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
                    dispatch({ type: 'FETCHED_DETAILS_BY_PENDING_INVOICE', invoiceDetails: data.ObjOptional });
                    dispatch({ type: 'ENABLED_EXPORT_EXCEL_DETAILS_PENDING_INVOICES', enable: true });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    disableForceUpdate: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'DISABLED_FORCE_UPDATE_PENDING_INVOICES' });
    },

    updateInvoices: (invoices: InvoicesCommon.PendingInvoices[]): AppThunkAction<KnownAction> => (dispatch) => {
        let listCustomerUid = selectedCustomers(invoices);
        if (!validateSelectedCustomers(listCustomerUid)) return;

        let customerUid = listCustomerUid.length == 1 ? listCustomerUid[0] : "";
        let listInvoiceUid = selectedInvoices(invoices);

        dispatch({ type: 'UPDATED_INVOICES_PENDING_INVOICES', invoices, customerUid, listInvoiceUid });
    },

    selectInvoice: (invoiceUid: string): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'SELECTED_INVOICE_PENDING_INVOICES', invoiceUid });
    },

    enableExportExcel: (enable: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        if (enable)
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_PENDING_INVOICES', currentPage: true });
        else {
            dispatch({ type: 'LOADED' });
            dispatch({ type: 'DISABLED_EXPORT_EXCEL_PENDING_INVOICES' });
        }
    },

    enableExportExcelDetails: (enable: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        if (!enable) dispatch({ type: 'LOADED' });
        dispatch({ type: 'ENABLED_EXPORT_EXCEL_DETAILS_PENDING_INVOICES', enable });
    },

    changedColumns: (columns: any[]): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'CHANGED_COLUMNS_PENDING_INVOICES', columns });
    },

    applyChangedColumns: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.pendingInvoices.columns;

        dispatch({ type: 'LOADING' });

        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.VWL_CREDITCARDINVOICES), {
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
                    dispatch({ type: 'APPLIED_COLUMNS_PENDING_INVOICES', columns: columns });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    toggleVCheckModal: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'TOGGLE_VCHECK_MODAL_PENDING_INVOICES' });
    },

    togglePayPalModal: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'TOGGLE_PAYPAL_MODAL_PENDING_INVOICES' });
    },

    toggleCreditCardModal: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'TOGGLE_CREDITCARD_MODAL_PENDING_INVOICES' });
    },

    fetchVCheckModel: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let invoices = appState.pendingInvoices.invoices;

        if (!hasSelectedInvoices(invoices)) return;

        let listCustomerUid = selectedCustomers(invoices);
        if (!validateSelectedCustomers(listCustomerUid)) return;

        let customerUid = listCustomerUid.length == 1 ? listCustomerUid[0] : "";
        let listInvoiceUid = selectedInvoices(invoices);

        dispatch({ type: 'LOADING' });

        fetch(`/api/invoice/vcheck/${customerUid}/${JSON.stringify(listInvoiceUid)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    let vCheckModel: InvoicesCommon.VCheckModel = data.ObjOptional.paymentModel;
                    vCheckModel = {
                        ...vCheckModel,
                        Notes: Utils.nullToEmptyString(vCheckModel.Notes),
                        InvoiceNumber: Utils.nullToEmptyString(vCheckModel.InvoiceNumber),
                        InvoiceUid: Utils.nullToEmptyString(vCheckModel.InvoiceUid),
                        RoutingNumber: Utils.nullToEmptyString(vCheckModel.RoutingNumber),
                        RoutingConfirm: Utils.nullToEmptyString(vCheckModel.RoutingConfirm),
                        AccountNumber: Utils.nullToEmptyString(vCheckModel.AccountNumber),
                        AccountConfirm: Utils.nullToEmptyString(vCheckModel.AccountConfirm),
                        CheckNumber: Utils.nullToEmptyString(vCheckModel.CheckNumber),
                        PayerName: "dsfdjsfnkjd", //Utils.nullToEmptyString(vCheckModel.PayerName), => temporal
                        PayerAddress: "las capullanas", //Utils.nullToEmptyString(vCheckModel.PayerAddress), => temporal
                        PayerCity: "trujillo", //Utils.nullToEmptyString(vCheckModel.PayerCity), => temporal
                        PayerState: "FL", // Utils.nullToEmptyString(vCheckModel.PayerState), => temporal
                        PayerZip: "12345", //Utils.nullToEmptyString(vCheckModel.PayerZip), => temporal
                        Phone: "1234567", //Utils.nullToEmptyString(vCheckModel.Phone), => temporal
                        Email: "rogger.ortiz.br@gmail.com", //Utils.nullToEmptyString(vCheckModel.Email) => temporal
                    };

                    dispatch({
                        type: 'FETCHED_VCHECK_MODEL_PENDING_INVOICES',
                        vCheckModel, vCheckTerms: data.ObjOptional.paymentTerms,
                        states: data.ObjOptional.states
                    });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    fetchPayPalModel: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let invoices = appState.pendingInvoices.invoices;

        if (!hasSelectedInvoices(invoices)) return;

        let listCustomerUid = selectedCustomers(invoices);
        if (!validateSelectedCustomers(listCustomerUid)) return;

        let customerUid = listCustomerUid.length == 1 ? listCustomerUid[0] : "";
        let listInvoiceUid = selectedInvoices(invoices);

        dispatch({ type: 'LOADING' });

        fetch(`/api/invoice/paypal/${customerUid}/${JSON.stringify(listInvoiceUid)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    let payPalModel: InvoicesCommon.PayPalModel = data.ObjOptional.paymentModel;
                    payPalModel = {
                        ...payPalModel,
                        Notes: Utils.nullToEmptyString(payPalModel.Notes),
                        InvoiceNumber: Utils.nullToEmptyString(payPalModel.InvoiceNumber),
                        InvoiceUid: Utils.nullToEmptyString(payPalModel.InvoiceUid),
                        Email: Utils.nullToEmptyString(payPalModel.Email)
                    };

                    dispatch({
                        type: 'FETCHED_PAYPAL_MODEL_PENDING_INVOICES',
                        payPalModel, payPalTerms: data.ObjOptional.paymentTerms
                    });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    fetchCreditCardModel: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let invoices = appState.pendingInvoices.invoices;

        if (!hasSelectedInvoices(invoices)) return;

        let listCustomerUid = selectedCustomers(invoices);
        if (!validateSelectedCustomers(listCustomerUid)) return;

        let customerUid = listCustomerUid.length == 1 ? listCustomerUid[0] : "";
        let listInvoiceUid = selectedInvoices(invoices);

        dispatch({ type: 'LOADING' });

        fetch(`/api/invoice/creditcard/${customerUid}/${JSON.stringify(listInvoiceUid)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    let creditCardModel: InvoicesCommon.CreditCardModel = data.ObjOptional.paymentModel;
                    creditCardModel = {
                        ...creditCardModel,
                        Type: -1,
                        Notes: Utils.nullToEmptyString(creditCardModel.Notes),
                        InvoiceNumber: Utils.nullToEmptyString(creditCardModel.InvoiceNumber),
                        InvoiceUid: Utils.nullToEmptyString(creditCardModel.InvoiceUid),
                        Email: Utils.nullToEmptyString(creditCardModel.Email),
                        Number: Utils.nullToEmptyString(creditCardModel.Number),
                        Cvv: Utils.nullToEmptyString(creditCardModel.Cvv),
                        ExpirationMonth: Utils.nullToValidNumber(creditCardModel.ExpirationMonth),
                        ExpirationYear: Utils.nullToValidNumber(creditCardModel.ExpirationYear),
                        OnName: Utils.nullToEmptyString(creditCardModel.OnName),
                        LastName: Utils.nullToEmptyString(creditCardModel.LastName),
                        BillingAddress: Utils.nullToEmptyString(creditCardModel.BillingAddress),
                        City: Utils.nullToEmptyString(creditCardModel.City),
                        State: Utils.nullToEmptyString(creditCardModel.State),
                        Zip: Utils.nullToEmptyString(creditCardModel.Zip),
                        Description: Utils.nullToEmptyString(creditCardModel.Description)
                    };

                    creditCardModel.Expiration_String = (creditCardModel.ExpirationMonth || creditCardModel.ExpirationYear || creditCardModel.ExpirationMonth == 0 || creditCardModel.ExpirationMonth == 0) ? "" :
                        `${Utils.padLeft(creditCardModel.ExpirationMonth, 2)}/${Utils.padLeft(creditCardModel.ExpirationYear, 4)}`;

                    dispatch({
                        type: 'FETCHED_CREDITCARD_MODEL_PENDING_INVOICES',
                        creditCardModel, creditCardTerms: data.ObjOptional.paymentTerms,
                        states: data.ObjOptional.states
                    });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    changeVCheckModel: (name: string, value: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        if (name === 'RoutingNumber' && value.length > 9) return;
        if (name === 'RoutingConfirm' && value.length > 9) return;
        if (name === 'AccountNumber' && value.length > 17) return;
        if (name === 'AccountConfirm' && value.length > 17) return;
        if (name === 'PayerState' && value.length != 2) return;

        let vCheckModel: InvoicesCommon.VCheckModel = appState.pendingInvoices.vCheckModel;
        vCheckModel = { ...vCheckModel, [name]: value };

        dispatch({ type: 'CHANGED_VCHECK_MODEL_PENDING_INVOICES', vCheckModel });
    },

    changePayPalModel: (name: string, value: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        let payPalModel: InvoicesCommon.PayPalModel = appState.pendingInvoices.payPalModel;
        payPalModel = { ...payPalModel, [name]: value };

        dispatch({ type: 'CHANGED_PAYPAL_MODEL_PENDING_INVOICES', payPalModel });
    },

    changeCreditCardModel: (name: string, value: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let ccType = appState.pendingInvoices.creditCardModel.Type;

        if (name === 'Number' && ccType !== Enums.TypeCreditCardEnum.AMERICAN_EXPRESS && value.length > 19) return;
        if (name === 'Number' && ccType === Enums.TypeCreditCardEnum.AMERICAN_EXPRESS && value.length > 17) return;
        if (name === 'Expiration_String' && value.length > 7) return;
        if (name === 'Cvv' && value.length > 4) return;
        if (name === 'State' && value.length != 2) return;

        let creditCardModel: InvoicesCommon.CreditCardModel = appState.pendingInvoices.creditCardModel;
        creditCardModel = { ...creditCardModel, [name]: value };

        dispatch({ type: 'CHANGED_CREDITCARD_MODEL_PENDING_INVOICES', creditCardModel });
    },

    applyPaymentByVCheck: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        let validForm = false;
        let titleVCheck = 'Pay By V-Check'
        let vCheckModel: InvoicesCommon.VCheckModel = appState.pendingInvoices.vCheckModel;

        if (vCheckModel.RoutingNumber.trim() == '')
            Notify.warning("'Routing Number' is required!", titleVCheck);
        else if (isNaN(Number(vCheckModel.RoutingNumber.trim())))
            Notify.warning("'Routing Number' must be digits!", titleVCheck);
        else if (vCheckModel.RoutingNumber.trim().length != 9)
            Notify.warning("'Routing Number' must be 9 digits!", titleVCheck);
        else if (vCheckModel.RoutingConfirm.trim() == '')
            Notify.warning("'Confirm Routing Number' is required!", titleVCheck);
        else if (isNaN(Number(vCheckModel.RoutingConfirm.trim())))
            Notify.warning("'Confirm Routing Number' must be digits!", titleVCheck);
        else if (vCheckModel.RoutingConfirm.trim().length != 9)
            Notify.warning("'Confirm Routing Number' must be 9 digits!", titleVCheck);
        else if (vCheckModel.RoutingNumber.trim() != vCheckModel.RoutingConfirm.trim())
            Notify.warning("'Routing Numbers' do not match!", titleVCheck);
        else if (vCheckModel.AccountNumber.trim() == '')
            Notify.warning("'Account Number' is required!", titleVCheck);
        else if (isNaN(Number(vCheckModel.AccountNumber.trim())))
            Notify.warning("'Account Number' must be digits!", titleVCheck);
        else if (vCheckModel.AccountNumber.trim().length < 4 || vCheckModel.AccountNumber.trim().length > 17)
            Notify.warning("'Account Number' must be 4 ~ 17 digits!", titleVCheck);
        else if (vCheckModel.AccountConfirm.trim() == '')
            Notify.warning("'Confirm Account Number' is required!", titleVCheck);
        else if (isNaN(Number(vCheckModel.AccountConfirm.trim())))
            Notify.warning("'Confirm Account Number' must be digits!", titleVCheck);
        else if (vCheckModel.AccountConfirm.trim().length < 4 || vCheckModel.AccountConfirm.trim().length > 17)
            Notify.warning("'Confirm Account Number' must be 4 ~ 17 digits!", titleVCheck);
        else if (vCheckModel.AccountNumber.trim() != vCheckModel.AccountConfirm.trim())
            Notify.warning("'Account Numbers' do not match!", titleVCheck);
        else if (vCheckModel.CheckNumber.trim() == '')
            Notify.warning("'Check Number' is required!", titleVCheck);
        else if (vCheckModel.PayerState.trim() == '')
            Notify.warning("'Payer Address' is required!", titleVCheck);
        else if (vCheckModel.PayerCity.trim() == '')
            Notify.warning("'Payer City' is required!", titleVCheck);
        else if (vCheckModel.PayerState.trim() == '')
            Notify.warning("'Payer State' is required!", titleVCheck);
        else if (vCheckModel.PayerState.trim().length != 2)
            Notify.warning("'Payer State' must be 2 characters!", titleVCheck);
        else if (vCheckModel.PayerZip.trim() == '')
            Notify.warning("'Payer Zip' is required!", titleVCheck);
        else if (vCheckModel.Phone.trim() == '')
            Notify.warning("'Payer Phone' is required!", titleVCheck);
        else if (vCheckModel.Email.trim() == '')
            Notify.warning("'Payer Email' is required!", titleVCheck);
        else if (!vCheckModel.AcceptTerms)
            Notify.warning("You must accept the terms and conditions", titleVCheck);
        else
            validForm = true;

        if (!validForm) return;

        dispatch({ type: 'LOADING' });

        vCheckModel.InvoiceNumber = "adas"; // temporal
        vCheckModel.InvoiceUid = "sjkfhkj"; // temporal

        fetch('/api/invoice/payment/vcheck', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            },
            body: JSON.stringify(vCheckModel)
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateErrorValue(dispatch, data, titleVCheck, true, false)) {
                    dispatch({ type: 'APPLIED_PAYMENT_BY_VCHECK_PENDING_INVOICES' });
                    Notify.success("The Pay by V-Check has been applied successfully", titleVCheck, false);
                }
            }).catch(error => {
                Utils.showError(dispatch, error, titleVCheck);
            });
    },

    applyPaymentByPayPal: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        let validForm = false;
        let titlePayPal = 'Pay By PayPal';
        let payPalModel: InvoicesCommon.PayPalModel = appState.pendingInvoices.payPalModel;

        if (payPalModel.Email.trim() == '')
            Notify.warning("'Payer Email' is required!", titlePayPal);
        else if (!payPalModel.AcceptTerms)
            Notify.warning("You must accept the terms and conditions", titlePayPal);
        else
            validForm = true;

        if (!validForm) return;

        payPalModel.InvoiceNumber = "adas"; // temporal
        payPalModel.InvoiceUid = "sjkfhkj"; // temporal

        dispatch({ type: 'LOADING' });

        fetch('/api/invoice/payment/paypal', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            },
            body: JSON.stringify(payPalModel)
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateErrorValue(dispatch, data, titlePayPal, true, false)) {
                    dispatch({ type: 'APPLIED_PAYMENT_BY_PAYPAL_PENDING_INVOICES' });
                    Notify.success("The Pay by PayPal has been applied successfully", titlePayPal, false);
                }
            }).catch(error => {
                Utils.showError(dispatch, error, titlePayPal);
            });
    },

    applyPaymentByCreditCard: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        let validForm = false;
        let tileCreditCard = 'Pay By Credit Card';
        let creditCardModel: InvoicesCommon.CreditCardModel = appState.pendingInvoices.creditCardModel;

        if (creditCardModel.Type < 0)
            Notify.warning("'Credit Card Type' is required!", tileCreditCard);
        else if (creditCardModel.Number.trim() == '')
            Notify.warning("'Credit Card Number' is required!", tileCreditCard);
        else if (creditCardModel.Type !== Enums.TypeCreditCardEnum.AMERICAN_EXPRESS && creditCardModel.Number.trim().length != 19)
            Notify.warning("'Credit Card Number' must be 19 digits!", tileCreditCard);
        else if (creditCardModel.Type === Enums.TypeCreditCardEnum.AMERICAN_EXPRESS && creditCardModel.Number.trim().length != 17)
            Notify.warning("'Credit Card Number' must be 17 digits!", tileCreditCard);
        else if (creditCardModel.Expiration_String.trim() == '')
            Notify.warning("'Credit Card Expiration' is required!", tileCreditCard);
        else if (creditCardModel.Expiration_String.trim().length != 7)
            Notify.warning("'Credit Card Expiration' is not valid!", tileCreditCard);
        else if (creditCardModel.Cvv.trim() == '')
            Notify.warning("'Credit Card ID Number (CVV)' is required!", tileCreditCard);
        else if (creditCardModel.Cvv.trim().length > 4)
            Notify.warning("'Credit Card ID Number (CVV)' must be a maximun 4 digits!", tileCreditCard);
        else if (creditCardModel.OnName.trim() == '')
            Notify.warning("'Name on Credit Card' is required!", tileCreditCard);
        else if (creditCardModel.LastName.trim() == '')
            Notify.warning("'Last Name' is required!", tileCreditCard);
        else if (creditCardModel.BillingAddress.trim() == '')
            Notify.warning("'Billing Address' is required!", tileCreditCard);
        else if (creditCardModel.City.trim() == '')
            Notify.warning("'City' is required!", tileCreditCard);
        else if (creditCardModel.State.trim() == '')
            Notify.warning("'State' is required!", tileCreditCard);
        else if (creditCardModel.State.trim().length != 2)
            Notify.warning("'State' must be 2 characters!", tileCreditCard);
        else if (creditCardModel.Zip.trim() == '')
            Notify.warning("'Zip Code' is required!", tileCreditCard);
        else if (creditCardModel.Email.trim() == '')
            Notify.warning("'Email' is required!", tileCreditCard);
        else if (!creditCardModel.AcceptTerms)
            Notify.warning("You must accept the terms and conditions", tileCreditCard);
        else
            validForm = true;

        if (!validForm) return;

        creditCardModel.InvoiceNumber = "adas"; // temporal
        creditCardModel.InvoiceUid = "sjkfhkj"; // temporal

        dispatch({ type: 'LOADING' });

        fetch('/api/invoice/payment/creditcard', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            },
            body: JSON.stringify(creditCardModel)
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateErrorValue(dispatch, data, tileCreditCard, true, false)) {
                    dispatch({ type: 'APPLIED_PAYMENT_BY_CREDITCARD_PENDING_INVOICES' });
                    Notify.success("The Pay by Credit Card has been applied successfully", tileCreditCard, false);
                }
            }).catch(error => {
                Utils.showError(dispatch, error, tileCreditCard);
            });
    }
}