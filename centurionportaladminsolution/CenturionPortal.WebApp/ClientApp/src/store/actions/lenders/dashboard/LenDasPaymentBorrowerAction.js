"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
var Functions_1 = require("../../../../utilities/Functions");
var title = "Lender Dashboard";
exports.actions = {
    fetchPaymentBorrower: function (fromDate, toDate, refresh) {
        if (refresh === void 0) { refresh = false; }
        return function (dispatch, getState) {
            var appState = getState();
            var beforeFromDate = appState.lenDasPaymentBorrower.fromDate;
            var beforeToDate = appState.lenDasPaymentBorrower.toDate;
            fromDate = fromDate !== null ? fromDate : undefined;
            toDate = toDate !== null ? toDate : undefined;
            if (!refresh) {
                dispatch({ type: 'CHANGE_FROM_DATE_PAYMENT_BORROWER', fromDate: fromDate });
                dispatch({ type: 'CHANGE_TO_DATE_PAYMENT_BORROWER', toDate: toDate });
            }
            if (beforeFromDate === undefined && beforeToDate === undefined &&
                (fromDate !== undefined || toDate !== undefined)) {
                return;
            }
            if (fromDate && toDate && fromDate > toDate) {
                Functions_1.Notify.warning("Invalid range of dates", "Borrower Dashboard");
                return;
            }
            var url = 'api/lender/dashboard/payments/lender';
            if (fromDate && toDate) {
                url = url + '/' + fromDate.toISOString().substring(0, 10) + '/' + toDate.toISOString().substring(0, 10);
            }
            if (fromDate || toDate || refresh) {
                dispatch({ type: 'LOADING_PAYMENT_BORROWER', loading: true });
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                    }
                }).then(function (res) { return res.json(); })
                    .then(function (data) {
                    if (Functions_1.Utils.validateData(dispatch, data, title)) {
                        var paymentsBorrower = data.ObjOptional;
                        var categoriesBorrower = paymentsBorrower.map(function (x) { return x.Legend; });
                        var seriesBorrower = [
                            { name: "Total Amount", data: paymentsBorrower.map(function (x) { return x.TotalAmount; }) },
                            { name: "To Interest", data: paymentsBorrower.map(function (x) { return x.ToInterest; }) },
                            { name: "To Principal", data: paymentsBorrower.map(function (x) { return x.ToPrincipal; }) },
                            { name: "To Late Charge", data: paymentsBorrower.map(function (x) { return x.ToLateCharge; }) },
                            { name: "Other", data: paymentsBorrower.map(function (x) { return x.Other; }) },
                        ];
                        dispatch({ type: 'FETCHED_PAYMENT_BORROWER', paymentsBorrower: paymentsBorrower, categoriesBorrower: categoriesBorrower, seriesBorrower: seriesBorrower });
                    }
                }).catch(function (error) {
                    dispatch({ type: 'LOADING_PAYMENT_BORROWER', loading: false });
                    Functions_1.Utils.showError(dispatch, error, title);
                });
            }
        };
    },
    updatedPaymentBorrower: function () { return function (dispatch) {
        dispatch({ type: 'UPDATED_PAYMENT_BORROWER' });
    }; },
    changeCollapse: function (active) { return function (dispatch) {
        dispatch({ type: 'COLLAPSE_PAYMENT_BORROWER', active: active });
    }; },
    changeFullScreen: function (active) { return function (dispatch) {
        dispatch({ type: 'BACK_DROP', active: active });
        dispatch({ type: 'FULL_SCREEN_PAYMENT_BORROWER', active: active });
    }; }
};
//# sourceMappingURL=LenDasPaymentBorrowerAction.js.map