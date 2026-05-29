import { AppThunkAction } from '../../../index';
import * as AppAction from '../../app/AppAction';
import * as LenderCommon from '../../../commons/LenderCommon';
import { Auth, Notify, Utils } from '../../../../utilities/Functions';

const title = "Lender Dashboard";

interface LoadingPaymentBorrowerAction {
    type: 'LOADING_PAYMENT_BORROWER';
    loading: boolean;
}

interface FetchPaymentBorrowerAction {
    type: 'FETCHED_PAYMENT_BORROWER';
    paymentsBorrower: LenderCommon.VendorHistory[];
    categoriesBorrower: any[];
    seriesBorrower: any[];
}

interface UpdatedPaymentBorrowerdAction {
    type: 'UPDATED_PAYMENT_BORROWER';
}

interface CollapsePaymentBorrowerAction {
    type: 'COLLAPSE_PAYMENT_BORROWER';
    active: boolean;
}

interface FullScreenPaymentBorrowerAction {
    type: 'FULL_SCREEN_PAYMENT_BORROWER';
    active: boolean;
}

interface ChangeFromDatePaymentBorrowerAction {
    type: 'CHANGE_FROM_DATE_PAYMENT_BORROWER';
    fromDate?: Date;
}

interface ChangeToDatePaymentBorrowerAction {
    type: 'CHANGE_TO_DATE_PAYMENT_BORROWER';
    toDate?: Date;
}

export type KnownAction = AppAction.KnownAction | LoadingPaymentBorrowerAction | FetchPaymentBorrowerAction |
    UpdatedPaymentBorrowerdAction | CollapsePaymentBorrowerAction | FullScreenPaymentBorrowerAction |
    ChangeFromDatePaymentBorrowerAction | ChangeToDatePaymentBorrowerAction 

export const actions = {
    fetchPaymentBorrower: (fromDate?: Date, toDate?: Date, refresh: boolean = false): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const beforeFromDate = appState.lenDasPaymentBorrower.fromDate;
        const beforeToDate = appState.lenDasPaymentBorrower.toDate;

        fromDate = fromDate !== null ? fromDate : undefined;
        toDate = toDate !== null ? toDate : undefined;

        if (!refresh) {
            dispatch({ type: 'CHANGE_FROM_DATE_PAYMENT_BORROWER', fromDate: fromDate });
            dispatch({ type: 'CHANGE_TO_DATE_PAYMENT_BORROWER', toDate: toDate });
        }

        if (beforeFromDate === undefined && beforeToDate === undefined &&
            (fromDate !== undefined || toDate !== undefined)
        ) {
            return;
        }

        if (fromDate && toDate && fromDate > toDate) {
            Notify.warning("Invalid range of dates", "Borrower Dashboard");
            return;
        }

        let url = 'api/lender/dashboard/payments/lender';
        if (fromDate && toDate) {
            url = url + '/' + fromDate.toISOString().substring(0, 10) + '/' + toDate.toISOString().substring(0, 10);
        }

        if (fromDate || toDate || refresh) {
            dispatch({ type: 'LOADING_PAYMENT_BORROWER', loading: true });

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
                        let paymentsBorrower = data.ObjOptional;

                        let categoriesBorrower = paymentsBorrower.map((x: any) => x.Legend);
                        let seriesBorrower = [
                            { name: "Total Amount", data: paymentsBorrower.map((x: any) => x.TotalAmount) },
                            { name: "To Interest", data: paymentsBorrower.map((x: any) => x.ToInterest) },
                            { name: "To Principal", data: paymentsBorrower.map((x: any) => x.ToPrincipal) },
                            { name: "To Late Charge", data: paymentsBorrower.map((x: any) => x.ToLateCharge) },
                            { name: "Other", data: paymentsBorrower.map((x: any) => x.Other) },
                        ];

                        dispatch({ type: 'FETCHED_PAYMENT_BORROWER', paymentsBorrower, categoriesBorrower, seriesBorrower });
                    }
                }).catch(error => {
                    dispatch({ type: 'LOADING_PAYMENT_BORROWER', loading: false });
                    Utils.showError(dispatch, error, title);
                });
        }
    },

    updatedPaymentBorrower: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'UPDATED_PAYMENT_BORROWER' });
    },

    changeCollapse: (active: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'COLLAPSE_PAYMENT_BORROWER', active });
    },

    changeFullScreen: (active: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'BACK_DROP', active });
        dispatch({ type: 'FULL_SCREEN_PAYMENT_BORROWER', active });
    }
}