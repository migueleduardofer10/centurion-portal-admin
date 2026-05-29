import { Action, Reducer } from 'redux';
import * as LenderCommon from '../../../commons/LenderCommon';
import * as PaymentTimeAction from '../../../actions/lenders/dashboard/LenDasPaymentTimeAction';

export const actions = PaymentTimeAction.actions;

export interface State {
    loading: boolean;
    refresh: boolean;
    collapse: boolean;
    fullScreen: boolean;
    paymentsTime: LenderCommon.PaymentTime[];
    selectedPaymentData: any[];
    sumPaymentsA: number;
    sumPaymentsB: number;
    sumPaymentsC: number;
    sumPaymentsD: number;
    sumPaymentsE: number;
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
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

    const action = incomingAction as PaymentTimeAction.KnownAction;
    switch (action.type) {
        case 'LOADING_PAYMENT_TIME':
            return {
                ...state,
                loading: true
            };
        case 'FETCHED_PAYMENT_TIME':
            return {
                ...state,
                loading: false,
                paymentsTime: action.paymentsTime
            };
        case 'REFRESH_PAYMENT_TIME':
            return {
                ...state,
                refresh: true,
                sumPaymentsA: action.sumPaymentsA,
                sumPaymentsB: action.sumPaymentsB,
                sumPaymentsC: action.sumPaymentsC,
                sumPaymentsD: action.sumPaymentsD,
                sumPaymentsE: action.sumPaymentsE,
                selectedPaymentData: action.selectedPaymentData
            };
        case 'REFRESHED_PAYMENT_TIME':
            return {
                ...state,
                loading: false,
                refresh: false
            };
        case 'COLLAPSE_PAYMENT_TIME':
            return {
                ...state,
                collapse: action.active
            };
        case 'FULL_SCREEN_PAYMENT_TIME':
            return {
                ...state,
                fullScreen: action.active
            };
        default: return state;
    }
};
