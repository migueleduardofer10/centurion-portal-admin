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
var PaymentBorrowerAction = require("../../../actions/lenders/dashboard/LenDasPaymentBorrowerAction");
exports.actions = PaymentBorrowerAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            loading: false,
            update: false,
            collapse: false,
            fullScreen: false,
            paymentsBorrower: [],
            categoriesBorrower: [],
            seriesBorrower: []
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'LOADING_PAYMENT_BORROWER':
            return __assign(__assign({}, state), { loading: action.loading });
        case 'FETCHED_PAYMENT_BORROWER':
            return __assign(__assign({}, state), { loading: false, update: true, paymentsBorrower: action.paymentsBorrower, categoriesBorrower: action.categoriesBorrower, seriesBorrower: action.seriesBorrower });
        case 'UPDATED_PAYMENT_BORROWER':
            return __assign(__assign({}, state), { update: false });
        case 'COLLAPSE_PAYMENT_BORROWER':
            return __assign(__assign({}, state), { collapse: action.active });
        case 'FULL_SCREEN_PAYMENT_BORROWER':
            return __assign(__assign({}, state), { fullScreen: action.active });
        case 'CHANGE_FROM_DATE_PAYMENT_BORROWER':
            return __assign(__assign({}, state), { fromDate: action.fromDate });
        case 'CHANGE_TO_DATE_PAYMENT_BORROWER':
            return __assign(__assign({}, state), { toDate: action.toDate });
        default: return state;
    }
};
//# sourceMappingURL=LenDasPaymentBorrowerStore.js.map