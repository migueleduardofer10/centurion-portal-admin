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
var PaymentLenderAction = require("../../../actions/lenders/dashboard/LenDasPaymentLenderAction");
exports.actions = PaymentLenderAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            loading: false,
            update: false,
            collapse: false,
            fullScreen: false,
            paymentsLender: [],
            categoriesLender: [],
            seriesLender: []
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'LOADING_PAYMENT_LENDER':
            return __assign(__assign({}, state), { loading: action.loading });
        case 'FETCHED_PAYMENT_LENDER':
            return __assign(__assign({}, state), { loading: false, update: true, paymentsLender: action.paymentsLender, categoriesLender: action.categoriesLender, seriesLender: action.seriesLender });
        case 'UPDATED_PAYMENT_LENDER':
            return __assign(__assign({}, state), { update: false });
        case 'COLLAPSE_PAYMENT_LENDER':
            return __assign(__assign({}, state), { collapse: action.active });
        case 'FULL_SCREEN_PAYMENT_LENDER':
            return __assign(__assign({}, state), { fullScreen: action.active });
        case 'CHANGE_FROM_DATE_PAYMENT_LENDER':
            return __assign(__assign({}, state), { fromDate: action.fromDate });
        case 'CHANGE_TO_DATE_PAYMENT_LENDER':
            return __assign(__assign({}, state), { toDate: action.toDate });
        default: return state;
    }
};
//# sourceMappingURL=LenDasPaymentLenderStore.js.map