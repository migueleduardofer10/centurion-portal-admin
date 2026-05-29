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
var title = "Paid Invoices";
exports.actions = {
    fetchInvoices: function (dataState, getColumns, forced, lenderUid) { return function (dispatch, getState) {
        var appState = getState();
        var gridProps = appState.paidInvoices.gridProps;
        var fetched = appState.paidInvoices.fetched;
        if (fetched && !forced && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
            dataState.sort == gridProps.sort && dataState.filter == gridProps.filter)
            return;
        dataState = __assign(__assign({}, gridProps), dataState);
        lenderUid = lenderUid === undefined ? appState.paidInvoices.lenderUid : lenderUid;
        dispatch({ type: 'LOADING' });
        dispatch({ type: 'CLEARED_PAID_INVOICES' });
        dispatch({ type: 'CHANGED_LENDERUID_PAID_INVOICES', lenderUid: lenderUid });
        fetch("/api/invoice/paid/" + getColumns + "/" + lenderUid + "?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                var lenders = (!data.ObjOptional.Lenders || data.ObjOptional.Lenders.length == 0) ? appState.paidInvoices.lenders : data.ObjOptional.Lenders;
                var columns = Functions_1.Utils.getColumns(appState.paidInvoices.columns, data.ObjOptional.Columns);
                dispatch({
                    type: 'FETCHED_PAID_INVOICES',
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
        if (appState && appState.paidInvoices && appState.paidInvoices.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAID_INVOICES', currentPage: false });
        }
        else {
            fetch("/api/invoice/paid/false?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                if (Functions_1.Utils.validateData(dispatch, data, title)) {
                    dispatch({ type: 'FETCHED_PAID_INVOICES_ALL', invoicesAll: data.ObjOptional.Result.Data });
                    dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAID_INVOICES', currentPage: false });
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
        dispatch({ type: 'FETCHED_PAID_INVOICE_DETAILS', invoices: invoices });
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
            dispatch({ type: 'FETCHED_PAID_INVOICE_DETAILS', invoices: invoices });
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
            invoices[dataItemIndex] = __assign(__assign({}, dataItem), { IsLoading: false });
            dispatch({ type: 'FETCHED_PAID_INVOICE_DETAILS', invoices: invoices });
        });
    }; },
    fetchDetailsByInvoice: function () { return function (dispatch, getState) {
        var appState = getState();
        var invoiceUid = appState.paidInvoices.invoiceUid;
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
                dispatch({ type: 'FETCHED_DETAILS_BY_PAID_INVOICE', invoiceDetails: data.ObjOptional });
                dispatch({ type: 'ENABLED_EXPORT_EXCEL_DETAILS_PAID_INVOICES', enable: true });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    disableForceUpdate: function () { return function (dispatch) {
        dispatch({ type: 'DISABLED_FORCE_UPDATE_PAID_INVOICES' });
    }; },
    selectInvoice: function (invoiceUid) { return function (dispatch) {
        dispatch({ type: 'SELECTED_INVOICE_PAID_INVOICES', invoiceUid: invoiceUid });
    }; },
    enableExportExcel: function (enable) { return function (dispatch) {
        if (enable)
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAID_INVOICES', currentPage: true });
        else {
            dispatch({ type: 'LOADED' });
            dispatch({ type: 'DISABLED_EXPORT_EXCEL_PAID_INVOICES' });
        }
    }; },
    enableExportExcelDetails: function (enable) { return function (dispatch) {
        if (!enable)
            dispatch({ type: 'LOADED' });
        dispatch({ type: 'ENABLED_EXPORT_EXCEL_DETAILS_PAID_INVOICES', enable: enable });
    }; },
    changedColumns: function (columns) { return function (dispatch) {
        dispatch({ type: 'CHANGED_COLUMNS_PAID_INVOICES', columns: columns });
    }; },
    applyChangedColumns: function () { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.paidInvoices.columns;
        dispatch({ type: 'LOADING' });
        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.VWL_PAIDINVOICES), {
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
                dispatch({ type: 'APPLIED_COLUMNS_PAID_INVOICES', columns: columns });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; }
};
//# sourceMappingURL=PaidInvoicesAction.js.map