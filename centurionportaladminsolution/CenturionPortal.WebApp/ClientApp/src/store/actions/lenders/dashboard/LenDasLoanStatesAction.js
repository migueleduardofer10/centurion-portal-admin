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
var Functions_1 = require("../../../../utilities/Functions");
var title = "Lender Dashboard";
exports.actions = {
    fetchLoanStates: function () { return function (dispatch) {
        dispatch({ type: 'LOADING_LOAN_STATES', loading: true });
        dispatch({ type: 'LOADING_PAYMENT_TIME', loading: true });
        fetch('api/lender/dashboard/loans/state', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                var action = 'refresh';
                var loanStates = data.ObjOptional;
                dispatch({ type: 'FETCHED_LOAN_STATES', loanStates: loanStates, action: action });
            }
        }).catch(function (error) {
            dispatch({ type: 'LOADING_LOAN_STATES', loading: false });
            dispatch({ type: 'LOADING_PAYMENT_TIME', loading: false });
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    updateLoansByState: function (data, totalUPB, totalLoans, totalUPBDelinquency, totalLoansDelinquency) { return function (dispatch) {
        var loansData = {};
        var states = Object.keys(data);
        states.map(function (state) {
            var _a;
            loansData = __assign(__assign({}, loansData), (_a = {}, _a[state] = data[state], _a));
            loansData[state] = data[state];
        });
        dispatch({ type: 'UPDATED_LOAN_STATES', loansData: loansData, totalUPB: totalUPB, totalLoans: totalLoans, totalUPBDelinquency: totalUPBDelinquency, totalLoansDelinquency: totalLoansDelinquency });
    }; },
    refreshLoanState: function (areas, selectedColorMap) { return function (dispatch, getState) {
        var appState = getState();
        var selectedUPB = 0;
        var selectedLoan = 0;
        var selectedUPBDelinquency = 0;
        var selectedLoanDelinquency = 0;
        var stateHistorial = [];
        var selectedLoanData = [];
        var loansData = appState.lenDasLoanStates.loansData;
        if (Object.keys(loansData).length <= 0)
            return;
        var states = Object.keys(areas);
        states.map(function (key) {
            var tmpState = loansData[key];
            if (areas[key].options.attrs.fill === selectedColorMap) {
                selectedUPB += tmpState.UPB;
                selectedLoan += tmpState.TotalLoans;
                selectedUPBDelinquency += tmpState.UPBDelinquency;
                selectedLoanDelinquency += tmpState.TotalDelinquency;
                selectedLoanData.push(tmpState);
                stateHistorial.push(key);
            }
        });
        var selectedPaymentData = [];
        appState.lenDasPaymentTime.paymentsTime.map(function (payment) {
            if (stateHistorial.indexOf(payment.State) >= 0) {
                payment.StateName = loansData[payment.State].StateName;
                selectedPaymentData.push(payment);
            }
        });
        var sumPaymentsA = selectedPaymentData.length === 0 ? 0 :
            selectedPaymentData.map(function (x) { return x.A; }).reduce(function (a, b) { return (a + b); });
        var sumPaymentsB = selectedPaymentData.length === 0 ? 0 :
            selectedPaymentData.map(function (x) { return x.B; }).reduce(function (a, b) { return (a + b); });
        var sumPaymentsC = selectedPaymentData.length === 0 ? 0 :
            selectedPaymentData.map(function (x) { return x.C; }).reduce(function (a, b) { return (a + b); });
        var sumPaymentsD = selectedPaymentData.length === 0 ? 0 :
            selectedPaymentData.map(function (x) { return x.D; }).reduce(function (a, b) { return (a + b); });
        var sumPaymentsE = selectedPaymentData.length === 0 ? 0 :
            selectedPaymentData.map(function (x) { return x.E; }).reduce(function (a, b) { return (a + b); });
        dispatch({
            type: 'REFRESH_LOAN_STATES',
            selectedUPB: selectedUPB, selectedLoan: selectedLoan, selectedUPBDelinquency: selectedUPBDelinquency, selectedLoanDelinquency: selectedLoanDelinquency, selectedLoanData: selectedLoanData, stateHistorial: stateHistorial
        });
        dispatch({
            type: 'REFRESH_PAYMENT_TIME',
            sumPaymentsA: sumPaymentsA, sumPaymentsB: sumPaymentsB, sumPaymentsC: sumPaymentsC, sumPaymentsD: sumPaymentsD, sumPaymentsE: sumPaymentsE, selectedPaymentData: selectedPaymentData
        });
    }; },
    refreshedLoanState: function () { return function (dispatch) {
        dispatch({ type: 'REFRESHED_LOAN_STATES' });
        dispatch({ type: 'REFRESHED_PAYMENT_TIME' });
    }; },
    selectAllStates: function () { return function (dispatch) {
        dispatch({ type: 'SELECT_ALL_STATES' });
    }; },
    deselectAllStates: function () { return function (dispatch) {
        dispatch({ type: 'DESELECT_ALL_STATES' });
    }; },
    changeCollapse: function (active) { return function (dispatch) {
        dispatch({ type: 'COLLAPSE_LOAN_STATES', active: active });
    }; },
    changeFullScreen: function (active) { return function (dispatch) {
        dispatch({ type: 'BACK_DROP', active: active });
        dispatch({ type: 'FULL_SCREEN_LOAN_STATES', active: active });
    }; }
};
//# sourceMappingURL=LenDasLoanStatesAction.js.map