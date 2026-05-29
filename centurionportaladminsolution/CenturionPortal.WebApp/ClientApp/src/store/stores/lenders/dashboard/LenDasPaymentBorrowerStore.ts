import { Action, Reducer } from 'redux';
import * as LenderCommon from '../../../commons/LenderCommon';
import * as PaymentBorrowerAction from '../../../actions/lenders/dashboard/LenDasPaymentBorrowerAction';

export const actions = PaymentBorrowerAction.actions;

export interface State {
    loading: boolean;
    update: boolean;
    collapse: boolean;
    fullScreen: boolean;
    paymentsBorrower: LenderCommon.VendorHistory[];
    categoriesBorrower: any[];
    seriesBorrower: any[];
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
            paymentsBorrower: [],
            categoriesBorrower: [],
            seriesBorrower: []
        };
    }

    const action = incomingAction as PaymentBorrowerAction.KnownAction;
    switch (action.type) {
        case 'LOADING_PAYMENT_BORROWER':
            return {
                ...state,
                loading: action.loading
            };
        case 'FETCHED_PAYMENT_BORROWER':
            return {
                ...state,
                loading: false,
                update: true,
                paymentsBorrower: action.paymentsBorrower,
                categoriesBorrower: action.categoriesBorrower,
                seriesBorrower: action.seriesBorrower
            };
        case 'UPDATED_PAYMENT_BORROWER':
            return {
                ...state,
                update: false,
            };
        case 'COLLAPSE_PAYMENT_BORROWER':
            return {
                ...state,
                collapse: action.active
            };
        case 'FULL_SCREEN_PAYMENT_BORROWER':
            return {
                ...state,
                fullScreen: action.active
            };
        case 'CHANGE_FROM_DATE_PAYMENT_BORROWER':
            return {
                ...state,
                fromDate: action.fromDate
            };
        case 'CHANGE_TO_DATE_PAYMENT_BORROWER':
            return {
                ...state,
                toDate: action.toDate
            };
        default: return state;
    }
};
