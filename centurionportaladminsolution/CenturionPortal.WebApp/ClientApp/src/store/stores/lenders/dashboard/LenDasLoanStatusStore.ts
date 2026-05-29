import { Action, Reducer } from 'redux';
import * as LenderCommon from '../../../commons/LenderCommon';
import * as LoanStatusAction from '../../../actions/lenders/dashboard/LenDasLoanStatusAction';

export const actions = LoanStatusAction.actions;

export interface State {
    loading: boolean;
    update: boolean;
    collapse: boolean;
    fullScreen: boolean;
    loanStatus: LenderCommon.LoanStatus[];
    categoriesStatus: any[];
    seriesStatus: any[];
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
    if (state === undefined) {
        return {
            loading: false,
            update: false,
            collapse: false,
            fullScreen: false,
            loanStatus: [],
            categoriesStatus: [],
            seriesStatus: []
        };
    }

    const action = incomingAction as LoanStatusAction.KnownAction;
    switch (action.type) {
        case 'LOADING_LOAN_STATUS':
            return {
                ...state,
                loading: action.loading
            };
        case 'FETCHED_LOAN_STATUS':
            return {
                ...state,
                loading: false,
                update: true,
                loanStatus: action.loanStatus,
                categoriesStatus: action.categoriesStatus,
                seriesStatus: action.seriesStatus
            };
        case 'UPDATED_LOAN_STATUS':
            return {
                ...state,
                update: false,
            };
        case 'COLLAPSE_LOAN_STATUS':
            return {
                ...state,
                collapse: action.active
            };
        case 'FULL_SCREEN_LOAN_STATUS':
            return {
                ...state,
                fullScreen: action.active
            };
        default: return state;
    }
};
