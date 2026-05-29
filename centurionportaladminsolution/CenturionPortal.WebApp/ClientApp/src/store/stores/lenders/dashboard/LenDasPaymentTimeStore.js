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
var PaymentTimeAction = require("../../../actions/lenders/dashboard/LenDasPaymentTimeAction");
exports.actions = PaymentTimeAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            loading: false,
            refresh: false,
            collapse: false,
            fullScreen: false,
            paymentsTime: [],
            selectedPaymentData: [],
            sumPaymentsA: 0,
            sumPaymentsB: 0,
            sumPaymentsC: 0,
            sumPaymentsD: 0,
            sumPaymentsE: 0
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'LOADING_PAYMENT_TIME':
            return __assign(__assign({}, state), { loading: true });
        case 'FETCHED_PAYMENT_TIME':
            return __assign(__assign({}, state), { loading: false, paymentsTime: action.paymentsTime });
        case 'REFRESH_PAYMENT_TIME':
            return __assign(__assign({}, state), { refresh: true, sumPaymentsA: action.sumPaymentsA, sumPaymentsB: action.sumPaymentsB, sumPaymentsC: action.sumPaymentsC, sumPaymentsD: action.sumPaymentsD, sumPaymentsE: action.sumPaymentsE, selectedPaymentData: action.selectedPaymentData });
        case 'REFRESHED_PAYMENT_TIME':
            return __assign(__assign({}, state), { loading: false, refresh: false });
        case 'COLLAPSE_PAYMENT_TIME':
            return __assign(__assign({}, state), { collapse: action.active });
        case 'FULL_SCREEN_PAYMENT_TIME':
            return __assign(__assign({}, state), { fullScreen: action.active });
        default: return state;
    }
};
//# sourceMappingURL=LenDasPaymentTimeStore.js.map