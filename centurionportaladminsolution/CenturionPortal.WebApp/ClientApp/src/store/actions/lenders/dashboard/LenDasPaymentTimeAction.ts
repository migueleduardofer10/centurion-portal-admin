import { AppThunkAction } from '../../../index';
import * as AppAction from '../../app/AppAction';
import * as LenderCommon from '../../../commons/LenderCommon';

interface LoadingPaymentTimeAction {
    type: 'LOADING_PAYMENT_TIME';
    loading: boolean;
}

interface FetchPaymentTimeAction {
    type: 'FETCHED_PAYMENT_TIME';
    paymentsTime: LenderCommon.PaymentTime[];
}

interface RefreshPaymentTimeAction {
    type: 'REFRESH_PAYMENT_TIME';
    selectedPaymentData: any[];
    sumPaymentsA: number;
    sumPaymentsB: number;
    sumPaymentsC: number;
    sumPaymentsD: number;
    sumPaymentsE: number;
}

interface RefreshedPaymentTimeAction {
    type: 'REFRESHED_PAYMENT_TIME';
}

interface CollapsePaymentTimeAction {
    type: 'COLLAPSE_PAYMENT_TIME';
    active: boolean;
}

interface FullScreenPaymentTimeAction {
    type: 'FULL_SCREEN_PAYMENT_TIME';
    active: boolean;
}

export type KnownAction = AppAction.KnownAction | LoadingPaymentTimeAction | FetchPaymentTimeAction |
    RefreshPaymentTimeAction | RefreshedPaymentTimeAction | CollapsePaymentTimeAction | FullScreenPaymentTimeAction;

export const actions = {
    refreshedPaymentOnTime: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'REFRESHED_PAYMENT_TIME' });
    },

    changeCollapse: (active: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'COLLAPSE_PAYMENT_TIME', active });
    },

    changeFullScreen: (active: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'BACK_DROP', active });
        dispatch({ type: 'FULL_SCREEN_PAYMENT_TIME', active });
    },
}