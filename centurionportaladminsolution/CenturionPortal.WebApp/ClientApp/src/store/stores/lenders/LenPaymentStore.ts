import { Action, Reducer } from 'redux';
import * as AppCommon from '../../commons/AppCommon';
import * as LenderCommon from '../../commons/LenderCommon';
import * as LenPaymentAction from '../../actions/lenders/LenPaymentAction';

export const actions = LenPaymentAction.actions;

export interface State {
    loanUid: string;
    fetched: boolean;
    fetchedAll: boolean;
    exportExcel: boolean;
    currentPage: boolean;
    excludeFunding: boolean;
    gridProps: AppCommon.GridProps;
    payments: LenderCommon.LoanPayments[];
    paymentsAll: LenderCommon.LoanPayments[];
    activeColumn: string;
    realColumns: any[];
    columns: any[];
    summary: any;
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
    if (state === undefined) {
        return {
            loanUid: '',
            fetched: false,
            fetchedAll: false,
            exportExcel: false,
            currentPage: true,
            excludeFunding: true,
            gridProps: {
                ...AppCommon.newGridProps,
                aggregates: [
                    { field: "TotalAmount", aggregate: "sum" },
                    { field: "ToInterest", aggregate: "sum" },
                    { field: "ToPrincipal", aggregate: "sum" },
                    { field: "LateCharge", aggregate: "sum" },
                    { field: "ToLateCharge", aggregate: "sum" },
                    { field: "ToReserve", aggregate: "sum" },
                    { field: "ToImpound", aggregate: "sum" },
                    { field: "ToPrepay", aggregate: "sum" },
                    { field: "ToChargesPrincipal", aggregate: "sum" },
                    { field: "ToChargesInterest", aggregate: "sum" },
                    { field: "ToBrokerFee", aggregate: "sum" },
                    { field: "ToLenderFee", aggregate: "sum" },
                    { field: "ToOtherTaxable", aggregate: "sum" },
                    { field: "ToOtherTaxFree", aggregate: "sum" },
                    { field: "ToOtherPayments", aggregate: "sum" },
                    { field: "ToUnpaidInterest", aggregate: "sum" },
                ]
            },
            payments: [],
            paymentsAll: [],
            activeColumn: '',
            realColumns: LenderCommon.initialColumnsPayments,
            columns: LenderCommon.initialColumnsPayments,
            summary: {}
        };
    }

    const action = incomingAction as LenPaymentAction.KnownAction;
    switch (action.type) {
        case 'SET_LOAN_UID':
            return {
                ...state,
                loanUid: action.loanUid,
                fetched: (state.loanUid == action.loanUid)
            };
        case 'CLEARED_PAYMENTS':
            return {
                ...state,
                fetched: false,
                fetchedAll: false,
                payments: [],
                paymentsAll: []
            };
        case 'FETCHED_PAYMENTS':
            return {
                ...state,
                fetched: true,
                fetchedAll: action.forced ? false : state.fetchedAll,
                excludeFunding: action.excludeFunding,
                payments: action.payments,
                gridProps: action.dataState,
                activeColumn: action.activeColumn,
                realColumns: JSON.parse(JSON.stringify(action.columns)),
                summary: action.summary,
                columns: action.columns
            };
        case 'FETCHED_PAYMENTS_ALL':
            return {
                ...state,
                fetchedAll: true,
                paymentsAll: action.paymentsAll
            };
        case 'ENABLED_EXPORT_EXCEL_PAYMENTS':
            return {
                ...state,
                exportExcel: true,
                currentPage: action.currentPage
            };
        case 'DISABLED_EXPORT_EXCEL_PAYMENTS':
            return {
                ...state,
                exportExcel: false,
            };
        case 'SET_ACTIVE_COLUMN_PAYMENTS':
            return {
                ...state,
                activeColumn: action.activeColumn,
            };
        case 'CHANGED_COLUMNS_PAYMENTS':
            return {
                ...state,
                columns: action.columns,
            };
        case 'APPLIED_COLUMNS_PAYMENTS':
            return {
                ...state,
                realColumns: action.columns,
                columns: action.columns
            };
        default: return state;
    }
};
