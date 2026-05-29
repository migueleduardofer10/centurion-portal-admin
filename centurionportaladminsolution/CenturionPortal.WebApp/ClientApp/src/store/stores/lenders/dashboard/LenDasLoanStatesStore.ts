import { Action, Reducer } from 'redux';
import * as LenderCommon from '../../../commons/LenderCommon';
import * as LoanStatesAction from '../../../actions/lenders/dashboard/LenDasLoanStatesAction';

export const actions = LoanStatesAction.actions;

export interface State {
    action: string;
    loading: boolean;
    update: boolean;
    refresh: boolean;
    collapse: boolean;
    fullScreen: boolean;
    loanStates: LenderCommon.LoanState[];
    loansData: any;
    stateHistorial: any[];
    selectedLoanData: any[];
    totalUPB: number;
    totalLoans: number;
    totalUPBDelinquency: number;
    totalLoansDelinquency: number;
    selectedUPB: number;
    selectedLoan: number;
    selectedUPBDelinquency: number;
    selectedLoanDelinquency: number;
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
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

    const action = incomingAction as LoanStatesAction.KnownAction;
    switch (action.type) {
        case 'LOADING_LOAN_STATES':
            return {
                ...state,
                loading: true
            };
        case 'FETCHED_LOAN_STATES':
            return {
                ...state,
                update: true,
                loading: false,
                action: action.action,
                loanStates: action.loanStates
            };
        case 'UPDATED_LOAN_STATES':
            return {
                ...state,
                update: false,
                loansData: action.loansData,
                totalUPB: action.totalUPB,
                totalLoans: action.totalLoans,
                totalUPBDelinquency: action.totalUPBDelinquency,
                totalLoansDelinquency: action.totalLoansDelinquency,
            };
        case 'REFRESH_LOAN_STATES':
            return {
                ...state,
                update: false,
                refresh: true,
                selectedUPB: action.selectedUPB,
                selectedLoan: action.selectedLoan,
                selectedUPBDelinquency: action.selectedUPBDelinquency,
                selectedLoanDelinquency: action.selectedLoanDelinquency,
                stateHistorial: action.stateHistorial,
                selectedLoanData: action.selectedLoanData
            };
        case 'REFRESHED_LOAN_STATES':
            return {
                ...state,
                refresh: false
            };
        case 'SELECT_ALL_STATES':
            return {
                ...state,
                update: true,
                action: 'selectAll'
            };
        case 'DESELECT_ALL_STATES':
            return {
                ...state,
                update: true,
                action: 'deselectAll'
            };
        case 'COLLAPSE_LOAN_STATES':
            return {
                ...state,
                collapse: action.active
            };
        case 'FULL_SCREEN_LOAN_STATES':
            return {
                ...state,
                fullScreen: action.active
            };
        default: return state;
    }
};
