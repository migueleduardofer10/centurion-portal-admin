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
var LoanStatesAction = require("../../../actions/lenders/dashboard/LenDasLoanStatesAction");
exports.actions = LoanStatesAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            action: '',
            loading: false,
            update: false,
            refresh: false,
            collapse: false,
            fullScreen: false,
            loanStates: [],
            loansData: [],
            stateHistorial: [],
            selectedLoanData: [],
            totalUPB: 0,
            totalLoans: 0,
            totalUPBDelinquency: 0,
            totalLoansDelinquency: 0,
            selectedUPB: 0,
            selectedLoan: 0,
            selectedUPBDelinquency: 0,
            selectedLoanDelinquency: 0
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'LOADING_LOAN_STATES':
            return __assign(__assign({}, state), { loading: true });
        case 'FETCHED_LOAN_STATES':
            return __assign(__assign({}, state), { update: true, loading: false, action: action.action, loanStates: action.loanStates });
        case 'UPDATED_LOAN_STATES':
            return __assign(__assign({}, state), { update: false, loansData: action.loansData, totalUPB: action.totalUPB, totalLoans: action.totalLoans, totalUPBDelinquency: action.totalUPBDelinquency, totalLoansDelinquency: action.totalLoansDelinquency });
        case 'REFRESH_LOAN_STATES':
            return __assign(__assign({}, state), { update: false, refresh: true, selectedUPB: action.selectedUPB, selectedLoan: action.selectedLoan, selectedUPBDelinquency: action.selectedUPBDelinquency, selectedLoanDelinquency: action.selectedLoanDelinquency, stateHistorial: action.stateHistorial, selectedLoanData: action.selectedLoanData });
        case 'REFRESHED_LOAN_STATES':
            return __assign(__assign({}, state), { refresh: false });
        case 'SELECT_ALL_STATES':
            return __assign(__assign({}, state), { update: true, action: 'selectAll' });
        case 'DESELECT_ALL_STATES':
            return __assign(__assign({}, state), { update: true, action: 'deselectAll' });
        case 'COLLAPSE_LOAN_STATES':
            return __assign(__assign({}, state), { collapse: action.active });
        case 'FULL_SCREEN_LOAN_STATES':
            return __assign(__assign({}, state), { fullScreen: action.active });
        default: return state;
    }
};
//# sourceMappingURL=LenDasLoanStatesStore.js.map