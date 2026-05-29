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
exports.actions = void 0;
var kendo_data_query_1 = require("@progress/kendo-data-query");
var Enums = require("../../../utilities/Enums");
var InvoicesCommon = require("../../commons/InvoicesCommon");
var Functions_1 = require("../../../utilities/Functions");
var title = "Pending Invoices";
var selectedCustomers = function (invoices) {
    var listCustomerUid = [];
    invoices.filter(function (invoice) { return invoice.Selected; })
        .forEach(function (invoice) {
        if (listCustomerUid.indexOf(invoice.CustomerUid) === -1)
            listCustomerUid.push(invoice.CustomerUid);
    });
    return listCustomerUid;
};
var selectedInvoices = function (invoices) {
    return invoices.filter(function (invoice) { return invoice.Selected; })
        .map(function (invoice) { return invoice.Uid; });
};
var validateSelectedCustomers = function (listCustomerUid) {
    if (listCustomerUid.length > 1)
        Functions_1.Notify.warning("There are more than one investor selected!", title);
    return listCustomerUid.length <= 1;
};
var hasSelectedInvoices = function (invoices) {
    var listSelectedInvoices = invoices.filter(function (invoice) { return invoice.Selected; });
    if (listSelectedInvoices.length == 0)
        Functions_1.Notify.warning("No Invoices Selected!", title);
    return listSelectedInvoices.length > 0;
};
exports.actions = {
    fetchInvoices: function (dataState, getColumns, forced, lenderUid, onlyPositive) { return function (dispatch, getState) {
        var appState = getState();
        var gridProps = appState.pendingInvoices.gridProps;
        var fetched = appState.pendingInvoices.fetched;
        if (fetched && !forced && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
            dataState.sort == gridProps.sort && dataState.filter == gridProps.filter)
            return;
        dataState = __assign(__assign({}, gridProps), dataState);
        lenderUid = lenderUid === undefined ? appState.pendingInvoices.lenderUid : lenderUid;
        onlyPositive = onlyPositive === undefined ? appState.pendingInvoices.onlyPositive : onlyPositive;
        dispatch({ type: 'LOADING' });
        dispatch({ type: 'CLEARED_PENDING_INVOICES' });
        dispatch({ type: 'CHANGED_LENDERUID_PENDING_INVOICES', lenderUid: lenderUid });
        dispatch({ type: 'CHANGED_ONLY_POSITIVE_PENDING_INVOICES', onlyPositive: onlyPositive });
        fetch("/api/invoice/pending/" + getColumns + "/" + lenderUid + "/" + onlyPositive + "?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                var lenders = (data.ObjOptional.Lenders || data.ObjOptional.Lenders.length == 0) ? appState.pendingInvoices.lenders : data.ObjOptional.Lenders;
                var columns = Functions_1.Utils.getColumns(appState.pendingInvoices.columns, data.ObjOptional.Columns);
                dispatch({
                    type: 'FETCHED_PENDING_INVOICES',
                    invoices: data.ObjOptional.Result.Data,
                    dataState: __assign(__assign({}, dataState), { total: data.ObjOptional.Result.Total }),
                    lenders: lenders,
                    columns: columns,
                    forced: forced
                });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    fetchInvoicesAll: function () { return function (dispatch, getState) {
        var appState = getState();
        var dataState = __assign(__assign({}, appState.lenLoans.gridProps), { take: 0 });
        dispatch({ type: 'LOADING' });
        if (appState && appState.pendingInvoices && appState.pendingInvoices.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_PENDING_INVOICES', currentPage: false });
        }
        else {
            fetch("/api/invoice/pending/false/" + appState.pendingInvoices.onlyPositive + "?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                if (Functions_1.Utils.validateData(dispatch, data, title)) {
                    dispatch({ type: 'FETCHED_PENDING_INVOICES_ALL', invoicesAll: data.ObjOptional.Result.Data });
                    dispatch({ type: 'ENABLED_EXPORT_EXCEL_PENDING_INVOICES', currentPage: false });
                }
            }).catch(function (error) {
                Functions_1.Utils.showError(dispatch, error, title);
            });
        }
    }; },
    fetchInvoiceDetails: function (dataItem, invoices) { return function (dispatch) {
        var dataItemIndex = -1;
        invoices = invoices.map(function (item, index) {
            if (item.Uid == dataItem.Uid) {
                dataItemIndex = index;
                item = __assign(__assign({}, dataItem), { IsLoading: true });
            }
            return item;
        });
        dispatch({ type: 'FETCHED_PENDING_INVOICE_DETAILS', invoices: invoices });
        fetch("/api/invoice/details/" + dataItem.Uid + "/" + dataItem.CustomerUid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                var dependencies = data.ObjOptional;
                var details_1 = [];
                dependencies.map(function (dependencie) {
                    details_1.push({
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
                invoices[dataItemIndex] = __assign(__assign({}, dataItem), { IsLoading: false, Details: details_1, Columns: InvoicesCommon.initialInvoiceDetailColumns });
            }
            else {
                invoices[dataItemIndex] = __assign(__assign({}, dataItem), { IsLoading: false });
            }
            dispatch({ type: 'FETCHED_PENDING_INVOICE_DETAILS', invoices: invoices });
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
            invoices[dataItemIndex] = __assign(__assign({}, dataItem), { IsLoading: false });
            dispatch({ type: 'FETCHED_PENDING_INVOICE_DETAILS', invoices: invoices });
        });
    }; },
    fetchDetailsByInvoice: function () { return function (dispatch, getState) {
        var appState = getState();
        var invoiceUid = appState.pendingInvoices.invoiceUid;
        if (invoiceUid.trim() == '') {
            Functions_1.Notify.warning("No Invoice Selected!", title);
            return;
        }
        dispatch({ type: 'LOADING' });
        fetch("/api/invoice/" + invoiceUid + "/details", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                dispatch({ type: 'FETCHED_DETAILS_BY_PENDING_INVOICE', invoiceDetails: data.ObjOptional });
                dispatch({ type: 'ENABLED_EXPORT_EXCEL_DETAILS_PENDING_INVOICES', enable: true });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    disableForceUpdate: function () { return function (dispatch) {
        dispatch({ type: 'DISABLED_FORCE_UPDATE_PENDING_INVOICES' });
    }; },
    updateInvoices: function (invoices) { return function (dispatch) {
        var listCustomerUid = selectedCustomers(invoices);
        if (!validateSelectedCustomers(listCustomerUid))
            return;
        var customerUid = listCustomerUid.length == 1 ? listCustomerUid[0] : "";
        var listInvoiceUid = selectedInvoices(invoices);
        dispatch({ type: 'UPDATED_INVOICES_PENDING_INVOICES', invoices: invoices, customerUid: customerUid, listInvoiceUid: listInvoiceUid });
    }; },
    selectInvoice: function (invoiceUid) { return function (dispatch) {
        dispatch({ type: 'SELECTED_INVOICE_PENDING_INVOICES', invoiceUid: invoiceUid });
    }; },
    enableExportExcel: function (enable) { return function (dispatch) {
        if (enable)
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_PENDING_INVOICES', currentPage: true });
        else {
            dispatch({ type: 'LOADED' });
            dispatch({ type: 'DISABLED_EXPORT_EXCEL_PENDING_INVOICES' });
        }
    }; },
    enableExportExcelDetails: function (enable) { return function (dispatch) {
        if (!enable)
            dispatch({ type: 'LOADED' });
        dispatch({ type: 'ENABLED_EXPORT_EXCEL_DETAILS_PENDING_INVOICES', enable: enable });
    }; },
    changedColumns: function (columns) { return function (dispatch) {
        dispatch({ type: 'CHANGED_COLUMNS_PENDING_INVOICES', columns: columns });
    }; },
    applyChangedColumns: function () { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.pendingInvoices.columns;
        dispatch({ type: 'LOADING' });
        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.VWL_CREDITCARDINVOICES), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            },
            body: JSON.stringify(columns)
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                Functions_1.Notify.success(data.Message, title);
                dispatch({ type: 'APPLIED_COLUMNS_PENDING_INVOICES', columns: columns });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    toggleVCheckModal: function () { return function (dispatch) {
        dispatch({ type: 'TOGGLE_VCHECK_MODAL_PENDING_INVOICES' });
    }; },
    togglePayPalModal: function () { return function (dispatch) {
        dispatch({ type: 'TOGGLE_PAYPAL_MODAL_PENDING_INVOICES' });
    }; },
    toggleCreditCardModal: function () { return function (dispatch) {
        dispatch({ type: 'TOGGLE_CREDITCARD_MODAL_PENDING_INVOICES' });
    }; },
    fetchVCheckModel: function () { return function (dispatch, getState) {
        var appState = getState();
        var invoices = appState.pendingInvoices.invoices;
        if (!hasSelectedInvoices(invoices))
            return;
        var listCustomerUid = selectedCustomers(invoices);
        if (!validateSelectedCustomers(listCustomerUid))
            return;
        var customerUid = listCustomerUid.length == 1 ? listCustomerUid[0] : "";
        var listInvoiceUid = selectedInvoices(invoices);
        dispatch({ type: 'LOADING' });
        fetch("/api/invoice/vcheck/" + customerUid + "/" + JSON.stringify(listInvoiceUid), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                var vCheckModel = data.ObjOptional.paymentModel;
                vCheckModel = __assign(__assign({}, vCheckModel), { Notes: Functions_1.Utils.nullToEmptyString(vCheckModel.Notes), InvoiceNumber: Functions_1.Utils.nullToEmptyString(vCheckModel.InvoiceNumber), InvoiceUid: Functions_1.Utils.nullToEmptyString(vCheckModel.InvoiceUid), RoutingNumber: Functions_1.Utils.nullToEmptyString(vCheckModel.RoutingNumber), RoutingConfirm: Functions_1.Utils.nullToEmptyString(vCheckModel.RoutingConfirm), AccountNumber: Functions_1.Utils.nullToEmptyString(vCheckModel.AccountNumber), AccountConfirm: Functions_1.Utils.nullToEmptyString(vCheckModel.AccountConfirm), CheckNumber: Functions_1.Utils.nullToEmptyString(vCheckModel.CheckNumber), PayerName: "dsfdjsfnkjd", PayerAddress: "las capullanas", PayerCity: "trujillo", PayerState: "FL", PayerZip: "12345", Phone: "1234567", Email: "rogger.ortiz.br@gmail.com" });
                dispatch({
                    type: 'FETCHED_VCHECK_MODEL_PENDING_INVOICES',
                    vCheckModel: vCheckModel,
                    vCheckTerms: data.ObjOptional.paymentTerms,
                    states: data.ObjOptional.states
                });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    fetchPayPalModel: function () { return function (dispatch, getState) {
        var appState = getState();
        var invoices = appState.pendingInvoices.invoices;
        if (!hasSelectedInvoices(invoices))
            return;
        var listCustomerUid = selectedCustomers(invoices);
        if (!validateSelectedCustomers(listCustomerUid))
            return;
        var customerUid = listCustomerUid.length == 1 ? listCustomerUid[0] : "";
        var listInvoiceUid = selectedInvoices(invoices);
        dispatch({ type: 'LOADING' });
        fetch("/api/invoice/paypal/" + customerUid + "/" + JSON.stringify(listInvoiceUid), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                var payPalModel = data.ObjOptional.paymentModel;
                payPalModel = __assign(__assign({}, payPalModel), { Notes: Functions_1.Utils.nullToEmptyString(payPalModel.Notes), InvoiceNumber: Functions_1.Utils.nullToEmptyString(payPalModel.InvoiceNumber), InvoiceUid: Functions_1.Utils.nullToEmptyString(payPalModel.InvoiceUid), Email: Functions_1.Utils.nullToEmptyString(payPalModel.Email) });
                dispatch({
                    type: 'FETCHED_PAYPAL_MODEL_PENDING_INVOICES',
                    payPalModel: payPalModel,
                    payPalTerms: data.ObjOptional.paymentTerms
                });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    fetchCreditCardModel: function () { return function (dispatch, getState) {
        var appState = getState();
        var invoices = appState.pendingInvoices.invoices;
        if (!hasSelectedInvoices(invoices))
            return;
        var listCustomerUid = selectedCustomers(invoices);
        if (!validateSelectedCustomers(listCustomerUid))
            return;
        var customerUid = listCustomerUid.length == 1 ? listCustomerUid[0] : "";
        var listInvoiceUid = selectedInvoices(invoices);
        dispatch({ type: 'LOADING' });
        fetch("/api/invoice/creditcard/" + customerUid + "/" + JSON.stringify(listInvoiceUid), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                var creditCardModel = data.ObjOptional.paymentModel;
                creditCardModel = __assign(__assign({}, creditCardModel), { Type: -1, Notes: Functions_1.Utils.nullToEmptyString(creditCardModel.Notes), InvoiceNumber: Functions_1.Utils.nullToEmptyString(creditCardModel.InvoiceNumber), InvoiceUid: Functions_1.Utils.nullToEmptyString(creditCardModel.InvoiceUid), Email: Functions_1.Utils.nullToEmptyString(creditCardModel.Email), Number: Functions_1.Utils.nullToEmptyString(creditCardModel.Number), Cvv: Functions_1.Utils.nullToEmptyString(creditCardModel.Cvv), ExpirationMonth: Functions_1.Utils.nullToValidNumber(creditCardModel.ExpirationMonth), ExpirationYear: Functions_1.Utils.nullToValidNumber(creditCardModel.ExpirationYear), OnName: Functions_1.Utils.nullToEmptyString(creditCardModel.OnName), LastName: Functions_1.Utils.nullToEmptyString(creditCardModel.LastName), BillingAddress: Functions_1.Utils.nullToEmptyString(creditCardModel.BillingAddress), City: Functions_1.Utils.nullToEmptyString(creditCardModel.City), State: Functions_1.Utils.nullToEmptyString(creditCardModel.State), Zip: Functions_1.Utils.nullToEmptyString(creditCardModel.Zip), Description: Functions_1.Utils.nullToEmptyString(creditCardModel.Description) });
                creditCardModel.Expiration_String = (creditCardModel.ExpirationMonth || creditCardModel.ExpirationYear || creditCardModel.ExpirationMonth == 0 || creditCardModel.ExpirationMonth == 0) ? "" :
                    Functions_1.Utils.padLeft(creditCardModel.ExpirationMonth, 2) + "/" + Functions_1.Utils.padLeft(creditCardModel.ExpirationYear, 4);
                dispatch({
                    type: 'FETCHED_CREDITCARD_MODEL_PENDING_INVOICES',
                    creditCardModel: creditCardModel,
                    creditCardTerms: data.ObjOptional.paymentTerms,
                    states: data.ObjOptional.states
                });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    changeVCheckModel: function (name, value) { return function (dispatch, getState) {
        var _a;
        var appState = getState();
        if (name === 'RoutingNumber' && value.length > 9)
            return;
        if (name === 'RoutingConfirm' && value.length > 9)
            return;
        if (name === 'AccountNumber' && value.length > 17)
            return;
        if (name === 'AccountConfirm' && value.length > 17)
            return;
        if (name === 'PayerState' && value.length != 2)
            return;
        var vCheckModel = appState.pendingInvoices.vCheckModel;
        vCheckModel = __assign(__assign({}, vCheckModel), (_a = {}, _a[name] = value, _a));
        dispatch({ type: 'CHANGED_VCHECK_MODEL_PENDING_INVOICES', vCheckModel: vCheckModel });
    }; },
    changePayPalModel: function (name, value) { return function (dispatch, getState) {
        var _a;
        var appState = getState();
        var payPalModel = appState.pendingInvoices.payPalModel;
        payPalModel = __assign(__assign({}, payPalModel), (_a = {}, _a[name] = value, _a));
        dispatch({ type: 'CHANGED_PAYPAL_MODEL_PENDING_INVOICES', payPalModel: payPalModel });
    }; },
    changeCreditCardModel: function (name, value) { return function (dispatch, getState) {
        var _a;
        var appState = getState();
        var ccType = appState.pendingInvoices.creditCardModel.Type;
        if (name === 'Number' && ccType !== Enums.TypeCreditCardEnum.AMERICAN_EXPRESS && value.length > 19)
            return;
        if (name === 'Number' && ccType === Enums.TypeCreditCardEnum.AMERICAN_EXPRESS && value.length > 17)
            return;
        if (name === 'Expiration_String' && value.length > 7)
            return;
        if (name === 'Cvv' && value.length > 4)
            return;
        if (name === 'State' && value.length != 2)
            return;
        var creditCardModel = appState.pendingInvoices.creditCardModel;
        creditCardModel = __assign(__assign({}, creditCardModel), (_a = {}, _a[name] = value, _a));
        dispatch({ type: 'CHANGED_CREDITCARD_MODEL_PENDING_INVOICES', creditCardModel: creditCardModel });
    }; },
    applyPaymentByVCheck: function () { return function (dispatch, getState) {
        var appState = getState();
        var validForm = false;
        var titleVCheck = 'Pay By V-Check';
        var vCheckModel = appState.pendingInvoices.vCheckModel;
        if (vCheckModel.RoutingNumber.trim() == '')
            Functions_1.Notify.warning("'Routing Number' is required!", titleVCheck);
        else if (isNaN(Number(vCheckModel.RoutingNumber.trim())))
            Functions_1.Notify.warning("'Routing Number' must be digits!", titleVCheck);
        else if (vCheckModel.RoutingNumber.trim().length != 9)
            Functions_1.Notify.warning("'Routing Number' must be 9 digits!", titleVCheck);
        else if (vCheckModel.RoutingConfirm.trim() == '')
            Functions_1.Notify.warning("'Confirm Routing Number' is required!", titleVCheck);
        else if (isNaN(Number(vCheckModel.RoutingConfirm.trim())))
            Functions_1.Notify.warning("'Confirm Routing Number' must be digits!", titleVCheck);
        else if (vCheckModel.RoutingConfirm.trim().length != 9)
            Functions_1.Notify.warning("'Confirm Routing Number' must be 9 digits!", titleVCheck);
        else if (vCheckModel.RoutingNumber.trim() != vCheckModel.RoutingConfirm.trim())
            Functions_1.Notify.warning("'Routing Numbers' do not match!", titleVCheck);
        else if (vCheckModel.AccountNumber.trim() == '')
            Functions_1.Notify.warning("'Account Number' is required!", titleVCheck);
        else if (isNaN(Number(vCheckModel.AccountNumber.trim())))
            Functions_1.Notify.warning("'Account Number' must be digits!", titleVCheck);
        else if (vCheckModel.AccountNumber.trim().length < 4 || vCheckModel.AccountNumber.trim().length > 17)
            Functions_1.Notify.warning("'Account Number' must be 4 ~ 17 digits!", titleVCheck);
        else if (vCheckModel.AccountConfirm.trim() == '')
            Functions_1.Notify.warning("'Confirm Account Number' is required!", titleVCheck);
        else if (isNaN(Number(vCheckModel.AccountConfirm.trim())))
            Functions_1.Notify.warning("'Confirm Account Number' must be digits!", titleVCheck);
        else if (vCheckModel.AccountConfirm.trim().length < 4 || vCheckModel.AccountConfirm.trim().length > 17)
            Functions_1.Notify.warning("'Confirm Account Number' must be 4 ~ 17 digits!", titleVCheck);
        else if (vCheckModel.AccountNumber.trim() != vCheckModel.AccountConfirm.trim())
            Functions_1.Notify.warning("'Account Numbers' do not match!", titleVCheck);
        else if (vCheckModel.CheckNumber.trim() == '')
            Functions_1.Notify.warning("'Check Number' is required!", titleVCheck);
        else if (vCheckModel.PayerState.trim() == '')
            Functions_1.Notify.warning("'Payer Address' is required!", titleVCheck);
        else if (vCheckModel.PayerCity.trim() == '')
            Functions_1.Notify.warning("'Payer City' is required!", titleVCheck);
        else if (vCheckModel.PayerState.trim() == '')
            Functions_1.Notify.warning("'Payer State' is required!", titleVCheck);
        else if (vCheckModel.PayerState.trim().length != 2)
            Functions_1.Notify.warning("'Payer State' must be 2 characters!", titleVCheck);
        else if (vCheckModel.PayerZip.trim() == '')
            Functions_1.Notify.warning("'Payer Zip' is required!", titleVCheck);
        else if (vCheckModel.Phone.trim() == '')
            Functions_1.Notify.warning("'Payer Phone' is required!", titleVCheck);
        else if (vCheckModel.Email.trim() == '')
            Functions_1.Notify.warning("'Payer Email' is required!", titleVCheck);
        else if (!vCheckModel.AcceptTerms)
            Functions_1.Notify.warning("You must accept the terms and conditions", titleVCheck);
        else
            validForm = true;
        if (!validForm)
            return;
        dispatch({ type: 'LOADING' });
        vCheckModel.InvoiceNumber = "adas"; // temporal
        vCheckModel.InvoiceUid = "sjkfhkj"; // temporal
        fetch('/api/invoice/payment/vcheck', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            },
            body: JSON.stringify(vCheckModel)
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateErrorValue(dispatch, data, titleVCheck, true, false)) {
                dispatch({ type: 'APPLIED_PAYMENT_BY_VCHECK_PENDING_INVOICES' });
                Functions_1.Notify.success("The Pay by V-Check has been applied successfully", titleVCheck, false);
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, titleVCheck);
        });
    }; },
    applyPaymentByPayPal: function () { return function (dispatch, getState) {
        var appState = getState();
        var validForm = false;
        var titlePayPal = 'Pay By PayPal';
        var payPalModel = appState.pendingInvoices.payPalModel;
        if (payPalModel.Email.trim() == '')
            Functions_1.Notify.warning("'Payer Email' is required!", titlePayPal);
        else if (!payPalModel.AcceptTerms)
            Functions_1.Notify.warning("You must accept the terms and conditions", titlePayPal);
        else
            validForm = true;
        if (!validForm)
            return;
        payPalModel.InvoiceNumber = "adas"; // temporal
        payPalModel.InvoiceUid = "sjkfhkj"; // temporal
        dispatch({ type: 'LOADING' });
        fetch('/api/invoice/payment/paypal', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            },
            body: JSON.stringify(payPalModel)
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateErrorValue(dispatch, data, titlePayPal, true, false)) {
                dispatch({ type: 'APPLIED_PAYMENT_BY_PAYPAL_PENDING_INVOICES' });
                Functions_1.Notify.success("The Pay by PayPal has been applied successfully", titlePayPal, false);
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, titlePayPal);
        });
    }; },
    applyPaymentByCreditCard: function () { return function (dispatch, getState) {
        var appState = getState();
        var validForm = false;
        var tileCreditCard = 'Pay By Credit Card';
        var creditCardModel = appState.pendingInvoices.creditCardModel;
        if (creditCardModel.Type < 0)
            Functions_1.Notify.warning("'Credit Card Type' is required!", tileCreditCard);
        else if (creditCardModel.Number.trim() == '')
            Functions_1.Notify.warning("'Credit Card Number' is required!", tileCreditCard);
        else if (creditCardModel.Type !== Enums.TypeCreditCardEnum.AMERICAN_EXPRESS && creditCardModel.Number.trim().length != 19)
            Functions_1.Notify.warning("'Credit Card Number' must be 19 digits!", tileCreditCard);
        else if (creditCardModel.Type === Enums.TypeCreditCardEnum.AMERICAN_EXPRESS && creditCardModel.Number.trim().length != 17)
            Functions_1.Notify.warning("'Credit Card Number' must be 17 digits!", tileCreditCard);
        else if (creditCardModel.Expiration_String.trim() == '')
            Functions_1.Notify.warning("'Credit Card Expiration' is required!", tileCreditCard);
        else if (creditCardModel.Expiration_String.trim().length != 7)
            Functions_1.Notify.warning("'Credit Card Expiration' is not valid!", tileCreditCard);
        else if (creditCardModel.Cvv.trim() == '')
            Functions_1.Notify.warning("'Credit Card ID Number (CVV)' is required!", tileCreditCard);
        else if (creditCardModel.Cvv.trim().length > 4)
            Functions_1.Notify.warning("'Credit Card ID Number (CVV)' must be a maximun 4 digits!", tileCreditCard);
        else if (creditCardModel.OnName.trim() == '')
            Functions_1.Notify.warning("'Name on Credit Card' is required!", tileCreditCard);
        else if (creditCardModel.LastName.trim() == '')
            Functions_1.Notify.warning("'Last Name' is required!", tileCreditCard);
        else if (creditCardModel.BillingAddress.trim() == '')
            Functions_1.Notify.warning("'Billing Address' is required!", tileCreditCard);
        else if (creditCardModel.City.trim() == '')
            Functions_1.Notify.warning("'City' is required!", tileCreditCard);
        else if (creditCardModel.State.trim() == '')
            Functions_1.Notify.warning("'State' is required!", tileCreditCard);
        else if (creditCardModel.State.trim().length != 2)
            Functions_1.Notify.warning("'State' must be 2 characters!", tileCreditCard);
        else if (creditCardModel.Zip.trim() == '')
            Functions_1.Notify.warning("'Zip Code' is required!", tileCreditCard);
        else if (creditCardModel.Email.trim() == '')
            Functions_1.Notify.warning("'Email' is required!", tileCreditCard);
        else if (!creditCardModel.AcceptTerms)
            Functions_1.Notify.warning("You must accept the terms and conditions", tileCreditCard);
        else
            validForm = true;
        if (!validForm)
            return;
        creditCardModel.InvoiceNumber = "adas"; // temporal
        creditCardModel.InvoiceUid = "sjkfhkj"; // temporal
        dispatch({ type: 'LOADING' });
        fetch('/api/invoice/payment/creditcard', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            },
            body: JSON.stringify(creditCardModel)
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateErrorValue(dispatch, data, tileCreditCard, true, false)) {
                dispatch({ type: 'APPLIED_PAYMENT_BY_CREDITCARD_PENDING_INVOICES' });
                Functions_1.Notify.success("The Pay by Credit Card has been applied successfully", tileCreditCard, false);
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, tileCreditCard);
        });
    }; }
};
//# sourceMappingURL=PendingInvoicesAction.js.map