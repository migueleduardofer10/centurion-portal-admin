"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
var Functions_1 = require("../../../../utilities/Functions");
var title = "Lender Dashboard";
exports.actions = {
    fetchPaymentLender: function (fromDate, toDate, refresh) {
        if (refresh === void 0) { refresh = false; }
        return function (dispatch, getState) {
            var appState = getState();
            var beforeFromDate = appState.lenDasPaymentLender.fromDate;
            var beforeToDate = appState.lenDasPaymentLender.toDate;
            fromDate = fromDate !== null ? fromDate : undefined;
            toDate = toDate !== null ? toDate : undefined;
            if (!refresh) {
                dispatch({ type: 'CHANGE_FROM_DATE_PAYMENT_LENDER', fromDate: fromDate });
                dispatch({ type: 'CHANGE_TO_DATE_PAYMENT_LENDER', toDate: toDate });
            }
            if (beforeFromDate === undefined && beforeToDate === undefined &&
                (fromDate !== undefined || toDate !== undefined)) {
                return;
            }
            if (fromDate && toDate && fromDate > toDate) {
                Functions_1.Notify.warning("Invalid range of dates", "Lender Dashboard");
                return;
            }
            var url = 'api/lender/dashboard/payments/lender';
            if (fromDate && toDate) {
                url = url + '/' + fromDate.toISOString().substring(0, 10) + '/' + toDate.toISOString().substring(0, 10);
            }
            if (fromDate || toDate || refresh) {
                dispatch({ type: 'LOADING_PAYMENT_LENDER', loading: true });
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
                        var paymentsLender = data.ObjOptional;
                        var categoriesLender = paymentsLender.map(function (x) { return x.Legend; });
                        var seriesLender = [
                            { name: "Total Amount", data: paymentsLender.map(function (x) { return x.TotalAmount; }) },
                            { name: "To Interest", data: paymentsLender.map(function (x) { return x.ToInterest; }) },
                            { name: "To Principal", data: paymentsLender.map(function (x) { return x.ToPrincipal; }) },
                            { name: "To Late Charge", data: paymentsLender.map(function (x) { return x.ToLateCharge; }) },
                            { name: "Other", data: paymentsLender.map(function (x) { return x.Other; }) },
                        ];
                        dispatch({ type: 'FETCHED_PAYMENT_LENDER', paymentsLender: paymentsLender, categoriesLender: categoriesLender, seriesLender: seriesLender });
                    }
                }).catch(function (error) {
                    dispatch({ type: 'LOADING_PAYMENT_LENDER', loading: false });
                    Functions_1.Utils.validateData(dispatch, error, title);
                });
            }
        };
    },
    updatedPaymentLender: function () { return function (dispatch) {
        dispatch({ type: 'UPDATED_PAYMENT_LENDER' });
    }; },
    changeCollapse: function (active) { return function (dispatch) {
        dispatch({ type: 'COLLAPSE_PAYMENT_LENDER', active: active });
    }; },
    changeFullScreen: function (active) { return function (dispatch) {
        dispatch({ type: 'BACK_DROP', active: active });
        dispatch({ type: 'FULL_SCREEN_PAYMENT_LENDER', active: active });
    }; }
};
//# sourceMappingURL=LenDasPaymentLenderAction.js.map