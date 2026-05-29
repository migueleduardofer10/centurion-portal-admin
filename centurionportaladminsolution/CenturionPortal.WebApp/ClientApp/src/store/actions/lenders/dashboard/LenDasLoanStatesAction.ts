import { AppThunkAction } from '../../../index';
import * as AppAction from '../../app/AppAction';
import * as LenderCommon from '../../../commons/LenderCommon';
import { Auth, Utils } from '../../../../utilities/Functions';
import * as LenDasPaymentTimeAction from './LenDasPaymentTimeAction';

const title = "Lender Dashboard";

interface LoadingLoanStatesAction {
    type: 'LOADING_LOAN_STATES';
    loading: boolean;
}

interface FetchLoanStatesAction {
    type: 'FETCHED_LOAN_STATES';
    loanStates: LenderCommon.LoanState[];
    action: string;
}

interface UpdatedLoanStatesAction {
    type: 'UPDATED_LOAN_STATES';
    loansData: any;
    totalUPB: number;
    totalLoans: number;
    totalUPBDelinquency: number;
    totalLoansDelinquency: number;
}

interface RefreshLoanStateAction {
    type: 'REFRESH_LOAN_STATES';
    selectedUPB: number;
    selectedLoan: number;
    selectedUPBDelinquency: number;
    selectedLoanDelinquency: number;
    selectedLoanData: any[];
    stateHistorial: any[];
}

interface RefreshedLoanStateAction {
    type: 'REFRESHED_LOAN_STATES';
}

interface CollapseLoanStatesAction {
    type: 'COLLAPSE_LOAN_STATES';
    active: boolean;
}

interface FullScreenLoanStatesAction {
    type: 'FULL_SCREEN_LOAN_STATES';
    active: boolean;
}

interface SelectAllStatesAction {
    type: 'SELECT_ALL_STATES';
}

interface UnselectAllStatesAction {
    type: 'DESELECT_ALL_STATES';
}

export type KnownAction = AppAction.KnownAction | LenDasPaymentTimeAction.KnownAction | LoadingLoanStatesAction |
    FetchLoanStatesAction | UpdatedLoanStatesAction | RefreshLoanStateAction | RefreshedLoanStateAction |
    SelectAllStatesAction | UnselectAllStatesAction | CollapseLoanStatesAction | FullScreenLoanStatesAction;

export const actions = {
    fetchLoanStates: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'LOADING_LOAN_STATES', loading: true });
        dispatch({ type: 'LOADING_PAYMENT_TIME', loading: true });

        

        fetch('api/lender/dashboard/loans/state', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    let action = 'refresh';
                    let loanStates = data.ObjOptional;
                    dispatch({ type: 'FETCHED_LOAN_STATES', loanStates, action });
                }
            }).catch(error => {
                dispatch({ type: 'LOADING_LOAN_STATES', loading: false });
                dispatch({ type: 'LOADING_PAYMENT_TIME', loading: false });
                Utils.showError(dispatch, error, title);
            });
    },

    updateLoansByState: (data: any, totalUPB: number, totalLoans: number, totalUPBDelinquency: number, totalLoansDelinquency: number): AppThunkAction<KnownAction> => (dispatch) => {
        let loansData: any = {};
        let states = Object.keys(data);
        states.map((state: any) => {
            loansData = { ...loansData, [state]: data[state] }
            loansData[state] = data[state];
        });
        dispatch({ type: 'UPDATED_LOAN_STATES', loansData, totalUPB, totalLoans, totalUPBDelinquency, totalLoansDelinquency });
    },

    refreshLoanState: (areas: any, selectedColorMap: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        let selectedUPB: number = 0;
        let selectedLoan: number = 0;
        let selectedUPBDelinquency: number = 0;
        let selectedLoanDelinquency: number = 0;
        let stateHistorial: any[] = [];
        let selectedLoanData: any[] = [];
        let loansData = appState.lenDasLoanStates.loansData;

        if (Object.keys(loansData).length <= 0)
            return;

        let states = Object.keys(areas);
        states.map((key: any) => {
            let tmpState = loansData[key];
            if (areas[key].options.attrs.fill === selectedColorMap) {
                selectedUPB += tmpState.UPB;
                selectedLoan += tmpState.TotalLoans;
                selectedUPBDelinquency += tmpState.UPBDelinquency;
                selectedLoanDelinquency += tmpState.TotalDelinquency;
                selectedLoanData.push(tmpState);
                stateHistorial.push(key);
            }
        });

        let selectedPaymentData: any[] = [];
        appState.lenDasPaymentTime.paymentsTime.map(payment => {
            if (stateHistorial.indexOf(payment.State) >= 0) {
                payment.StateName = loansData[payment.State].StateName;
                selectedPaymentData.push(payment);
            }
        });

        let sumPaymentsA = selectedPaymentData.length === 0 ? 0 :
            selectedPaymentData.map(x => x.A).reduce((a: any, b: any) => (a + b));
        let sumPaymentsB = selectedPaymentData.length === 0 ? 0 :
            selectedPaymentData.map(x => x.B).reduce((a: any, b: any) => (a + b));
        let sumPaymentsC = selectedPaymentData.length === 0 ? 0 :
            selectedPaymentData.map(x => x.C).reduce((a: any, b: any) => (a + b));
        let sumPaymentsD = selectedPaymentData.length === 0 ? 0 :
            selectedPaymentData.map(x => x.D).reduce((a: any, b: any) => (a + b));
        let sumPaymentsE = selectedPaymentData.length === 0 ? 0 :
            selectedPaymentData.map(x => x.E).reduce((a: any, b: any) => (a + b));

        dispatch({
            type: 'REFRESH_LOAN_STATES', selectedUPB, selectedLoan, selectedUPBDelinquency, selectedLoanDelinquency, selectedLoanData, stateHistorial
        });

        dispatch({
            type: 'REFRESH_PAYMENT_TIME', sumPaymentsA, sumPaymentsB, sumPaymentsC, sumPaymentsD, sumPaymentsE, selectedPaymentData
        });
    },

    refreshedLoanState: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'REFRESHED_LOAN_STATES' });
        dispatch({ type: 'REFRESHED_PAYMENT_TIME' });
    },

    selectAllStates: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'SELECT_ALL_STATES' });
    },

    deselectAllStates: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'DESELECT_ALL_STATES' });
    },

    changeCollapse: (active: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'COLLAPSE_LOAN_STATES', active });
    },

    changeFullScreen: (active: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'BACK_DROP', active });
        dispatch({ type: 'FULL_SCREEN_LOAN_STATES', active });
    }
}