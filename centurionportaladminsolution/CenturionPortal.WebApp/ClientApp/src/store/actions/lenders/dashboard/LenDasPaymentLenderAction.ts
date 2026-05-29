import { AppThunkAction } from '../../../index';
import * as AppAction from '../../app/AppAction';
import * as LenderCommon from '../../../commons/LenderCommon';
import { Auth, Notify, Utils } from '../../../../utilities/Functions';

const title = "Lender Dashboard";

interface LoadingPaymentLenderAction {
    type: 'LOADING_PAYMENT_LENDER';
    loading: boolean;
}

interface FetchPaymentLenderAction {
    type: 'FETCHED_PAYMENT_LENDER';
    paymentsLender: LenderCommon.VendorHistory[];
    categoriesLender: any[];
    seriesLender: any[];
}

interface UpdatedPaymentLenderdAction {
    type: 'UPDATED_PAYMENT_LENDER';
}

interface CollapsePaymentLenderAction {
    type: 'COLLAPSE_PAYMENT_LENDER';
    active: boolean;
}

interface FullScreenPaymentLenderAction {
    type: 'FULL_SCREEN_PAYMENT_LENDER';
    active: boolean;
}

interface ChangeFromDatePaymentLenderAction {
    type: 'CHANGE_FROM_DATE_PAYMENT_LENDER';
    fromDate?: Date;
}

interface ChangeToDatePaymentLenderAction {
    type: 'CHANGE_TO_DATE_PAYMENT_LENDER';
    toDate?: Date;
}

export type KnownAction = AppAction.KnownAction | LoadingPaymentLenderAction | FetchPaymentLenderAction |
    UpdatedPaymentLenderdAction | CollapsePaymentLenderAction | FullScreenPaymentLenderAction |
    ChangeFromDatePaymentLenderAction | ChangeToDatePaymentLenderAction

export const actions = {
    fetchPaymentLender: (fromDate?: Date, toDate?: Date, refresh: boolean = false): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const beforeFromDate = appState.lenDasPaymentLender.fromDate;
        const beforeToDate = appState.lenDasPaymentLender.toDate;

        fromDate = fromDate !== null ? fromDate : undefined;
        toDate = toDate !== null ? toDate : undefined;

        if (!refresh) {
            dispatch({ type: 'CHANGE_FROM_DATE_PAYMENT_LENDER', fromDate: fromDate });
            dispatch({ type: 'CHANGE_TO_DATE_PAYMENT_LENDER', toDate: toDate });
        }
        
        if (beforeFromDate === undefined && beforeToDate === undefined &&
            (fromDate !== undefined || toDate !== undefined)
        ) {
            return;
        }

        if (fromDate && toDate && fromDate > toDate) {
            Notify.warning("Invalid range of dates", "Lender Dashboard");
            return;
        }

        let url = 'api/lender/dashboard/payments/lender';
        if (fromDate && toDate) {
            url = url + '/' + fromDate.toISOString().substring(0, 10) + '/' + toDate.toISOString().substring(0, 10);
        }

        if (fromDate || toDate || refresh) {
            dispatch({ type: 'LOADING_PAYMENT_LENDER', loading: true });

            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: any) => {
                    if (Utils.validateData(dispatch, data, title)) {
                        let paymentsLender = data.ObjOptional;

                        let categoriesLender = paymentsLender.map((x: any) => x.Legend);
                        let seriesLender = [
                            { name: "Total Amount", data: paymentsLender.map((x: any) => x.TotalAmount) },
                            { name: "To Interest", data: paymentsLender.map((x: any) => x.ToInterest) },
                            { name: "To Principal", data: paymentsLender.map((x: any) => x.ToPrincipal) },
                            { name: "To Late Charge", data: paymentsLender.map((x: any) => x.ToLateCharge) },
                            { name: "Other", data: paymentsLender.map((x: any) => x.Other) },
                        ];

                        dispatch({ type: 'FETCHED_PAYMENT_LENDER', paymentsLender, categoriesLender, seriesLender });
                    }
                }).catch(error => {
                    dispatch({ type: 'LOADING_PAYMENT_LENDER', loading: false });
                    Utils.validateData(dispatch, error, title);
                });
        }
    },

    updatedPaymentLender: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'UPDATED_PAYMENT_LENDER' });
    },

    changeCollapse: (active: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'COLLAPSE_PAYMENT_LENDER', active });
    },

    changeFullScreen: (active: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'BACK_DROP', active });
        dispatch({ type: 'FULL_SCREEN_PAYMENT_LENDER', active });
    }
}