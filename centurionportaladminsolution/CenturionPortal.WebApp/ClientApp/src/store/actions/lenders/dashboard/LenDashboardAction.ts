import { AppThunkAction } from '../../../index';
import * as AppAction from '../../app/AppAction';
import * as Enums from '../../../../utilities/Enums';
import { Auth, Utils } from '../../../../utilities/Functions';
import * as LenDasLoanStatesAction from './LenDasLoanStatesAction';
import * as LenDasLoanStatusAction from './LenDasLoanStatusAction';
import * as LenDasPaymentTimeAction from './LenDasPaymentTimeAction';
import * as LenDasPaymentLenderAction from './LenDasPaymentLenderAction';
import * as LenDasPaymentBorrowerAction from './LenDasPaymentBorrowerAction';

const title = "Lender Dashboard";

export type KnownAction = AppAction.KnownAction | LenDasLoanStatesAction.KnownAction | LenDasPaymentTimeAction.KnownAction |
    LenDasPaymentLenderAction.KnownAction | LenDasPaymentBorrowerAction.KnownAction | LenDasLoanStatusAction.KnownAction;

export const actions = {
    fetchData: (refresh: boolean = false): AppThunkAction<KnownAction> => (dispatch) => {

        dispatch({ type: 'LOADING' });

        
        fetch('api/lender/dashboard/data', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {

                if (Utils.validateData(dispatch, data, title)) {

                    let action = refresh ? 'refresh' : 'update';
                    let loanStates = data.ObjOptional.loansByState;
                    let paymentsTime = data.ObjOptional.paymentsOnTime;
                    let paymentsLender = data.ObjOptional.paymentsLender;
                    let paymentsBorrower = data.ObjOptional.paymentsBorrower;
                    let loanStatus = data.ObjOptional.loansByStatus;

                    let categoriesLender = paymentsLender.map((x: any) => x.Legend);
                    let seriesLender = [
                        { name: "Total Amount", data: paymentsLender.map((x: any) => x.TotalAmount) },
                        { name: "To Interest", data: paymentsLender.map((x: any) => x.ToInterest) },
                        { name: "To Principal", data: paymentsLender.map((x: any) => x.ToPrincipal) },
                        { name: "To Late Charge", data: paymentsLender.map((x: any) => x.ToLateCharge) },
                        { name: "Other", data: paymentsLender.map((x: any) => x.Other) },
                    ];

                    let categoriesBorrower = paymentsBorrower.map((x: any) => x.Legend);
                    let seriesBorrower = [
                        { name: "Total Amount", data: paymentsBorrower.map((x: any) => x.TotalAmount) },
                        { name: "To Interest", data: paymentsBorrower.map((x: any) => x.ToInterest) },
                        { name: "To Principal", data: paymentsBorrower.map((x: any) => x.ToPrincipal) },
                        { name: "To Late Charge", data: paymentsBorrower.map((x: any) => x.ToLateCharge) },
                        { name: "Other", data: paymentsBorrower.map((x: any) => x.Other) },
                    ];

                    let enumStatus = Enums.EnumToArray(Enums.LoanStatusEnum);
                    let categoriesStatus = loanStatus.map((item: any) => enumStatus.filter(status => status.value === item.Status)[0].label);;
                    let seriesStatus = loanStatus.map((item: any) => item.Count);

                    dispatch({ type: 'FETCHED_LOAN_STATES', loanStates, action });
                    dispatch({ type: 'FETCHED_PAYMENT_TIME', paymentsTime });
                    dispatch({ type: 'FETCHED_PAYMENT_LENDER', paymentsLender, categoriesLender, seriesLender });
                    dispatch({ type: 'FETCHED_PAYMENT_BORROWER', paymentsBorrower, categoriesBorrower, seriesBorrower });
                    dispatch({ type: 'FETCHED_LOAN_STATUS', loanStatus, categoriesStatus, seriesStatus });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    }
}