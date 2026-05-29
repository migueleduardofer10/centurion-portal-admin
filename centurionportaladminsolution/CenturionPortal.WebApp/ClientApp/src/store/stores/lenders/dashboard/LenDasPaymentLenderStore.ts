import { Action, Reducer } from 'redux';
import * as LenderCommon from '../../../commons/LenderCommon';
import * as PaymentLenderAction from '../../../actions/lenders/dashboard/LenDasPaymentLenderAction';

export const actions = PaymentLenderAction.actions;

export interface State {
    loading: boolean;
    update: boolean;
    collapse: boolean;
    fullScreen: boolean;
    paymentsLender: LenderCommon.VendorHistory[];
    categoriesLender: any[];
    seriesLender: any[];
    fromDate?: Date;
    toDate?: Date;
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
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

    const action = incomingAction as PaymentLenderAction.KnownAction;
    switch (action.type) {
        case 'LOADING_PAYMENT_LENDER':
            return {
                ...state,
                loading: action.loading
            };
        case 'FETCHED_PAYMENT_LENDER':
            return {
                ...state,
                loading: false,
                update: true,
                paymentsLender: action.paymentsLender,
                categoriesLender: action.categoriesLender,
                seriesLender: action.seriesLender
            };
        case 'UPDATED_PAYMENT_LENDER':
            return {
                ...state,
                update: false,
            };
        case 'COLLAPSE_PAYMENT_LENDER':
            return {
                ...state,
                collapse: action.active
            };
        case 'FULL_SCREEN_PAYMENT_LENDER':
            return {
                ...state,
                fullScreen: action.active
            };
        case 'CHANGE_FROM_DATE_PAYMENT_LENDER':
            return {
                ...state,
                fromDate: action.fromDate
            };
        case 'CHANGE_TO_DATE_PAYMENT_LENDER':
            return {
                ...state,
                toDate: action.toDate
            };
        default: return state;
    }
};
