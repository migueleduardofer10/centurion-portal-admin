import { AppThunkAction } from '../../../index';
import * as AppAction from '../../app/AppAction';
import * as Enums from '../../../../utilities/Enums';
import * as LenderCommon from '../../../commons/LenderCommon';
import { Auth, Utils } from '../../../../utilities/Functions';

const title = "Lender Dashboard";

interface LoadingLoanStatusAction {
    type: 'LOADING_LOAN_STATUS';
    loading: boolean;
}

interface FetchLoanStatusAction {
    type: 'FETCHED_LOAN_STATUS';
    loanStatus: LenderCommon.LoanStatus[];
    categoriesStatus: any[];
    seriesStatus: any[];
}

interface UpdatedLoanStatusdAction {
    type: 'UPDATED_LOAN_STATUS';
}

interface CollapseLoanStatusAction {
    type: 'COLLAPSE_LOAN_STATUS';
    active: boolean;
}

interface FullScreenLoanStatusAction {
    type: 'FULL_SCREEN_LOAN_STATUS';
    active: boolean;
}

export type KnownAction = AppAction.KnownAction | LoadingLoanStatusAction | FetchLoanStatusAction |
    UpdatedLoanStatusdAction | CollapseLoanStatusAction | FullScreenLoanStatusAction;

export const actions = {
    fetchLoanStatus: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'LOADING_LOAN_STATUS', loading: true });;

        fetch('api/lender/dashboard/loans/status', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    let loanStatus = data.ObjOptional;
                    let enumStatus = Enums.EnumToArray(Enums.LoanStatusEnum);
                    let categoriesStatus = loanStatus.map((item: any) => enumStatus.filter(status => status.value === item.Status)[0].label);;
                    let seriesStatus = loanStatus.map((item: any) => item.Count);

                    dispatch({ type: 'FETCHED_LOAN_STATUS', loanStatus, categoriesStatus, seriesStatus });
                }
            }).catch(error => {
                dispatch({ type: 'LOADING_LOAN_STATUS', loading: false });;
                Utils.showError(dispatch, error, title);
            });
    },

    updatedPaymentLender: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'UPDATED_LOAN_STATUS' });
    },

    changeCollapse: (active: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'COLLAPSE_LOAN_STATUS', active });
    },

    changeFullScreen: (active: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'BACK_DROP', active });
        dispatch({ type: 'FULL_SCREEN_LOAN_STATUS', active });
    }
}