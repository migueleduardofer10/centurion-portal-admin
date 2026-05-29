import { Action, Reducer } from 'redux';
import * as AppCommon from '../../commons/AppCommon';
import * as LenderCommon from '../../commons/LenderCommon';
import * as LenLoanAction from '../../actions/lenders/LenLoanAction';

export const actions = LenLoanAction.actions;

export interface State {
    fetched: boolean;
    fetchedAll: boolean;
    exportExcel: boolean;
    currentPage: boolean;
    gridProps: AppCommon.GridProps;
    loans: LenderCommon.LNSVendor[];
    loansAll: LenderCommon.LNSVendor[];
    activeColumn: string;
    realColumns: any[];
    columns: any[];
}


export const ddd: Reducer<State> =
    (state: State | undefined, incomingAction: Action): State => {

        if (state === undefined) {
            return {
                fetched: false,
                fetchedAll: false,
                exportExcel: false,
                currentPage: true,
                loans: [],
                loansAll: [],
                activeColumn: '',
                gridProps: AppCommon.newGridProps,
                columns: LenderCommon.initialColumnsLoan,
                realColumns: LenderCommon.initialColumnsLoan
            };
        }
        return state;
        
    };


export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
    if (state === undefined) {
        return {
            fetched: false,
            fetchedAll: false,
            exportExcel: false,
            currentPage: true,
            loans: [],
            loansAll: [],
            activeColumn: '',
            gridProps: AppCommon.newGridProps,
            columns: LenderCommon.initialColumnsLoan,
            realColumns: LenderCommon.initialColumnsLoan
        };
    }

    const action = incomingAction as LenLoanAction.KnownAction;
    switch (action.type) {
        case 'FETCHED_LOANS_VENDOR':            
            return {
                ...state,
                fetched: true,
                fetchedAll: action.forced ? false : state.fetchedAll,
                loans: action.loans,
                gridProps: action.dataState,
                activeColumn: action.activeColumn,
                realColumns: JSON.parse(JSON.stringify(action.columns)),
                columns: action.columns
            };
        case 'FETCHED_LOANS_VENDOR_ALL':
            return {
                ...state,
                fetchedAll: true,
                loansAll: action.loansAll,
            };
        case 'ENABLED_EXPORT_EXCEL_LOANS':
            return {
                ...state,
                exportExcel: true,
                currentPage: action.currentPage
            };
        case 'DISABLED_EXPORT_EXCEL_LOANS':
            return {
                ...state,
                exportExcel: false,
            };
        case 'SET_ACTIVE_COLUMN_LOANS':
            return {
                ...state,
                activeColumn: action.activeColumn,
            };
        case 'CHANGED_COLUMNS_LOANS':
            return {
                ...state,
                columns: action.columns,
            };
        case 'APPLIED_COLUMNS_LOANS':
            return {
                ...state,
                realColumns: action.columns,
                columns: action.columns
            };
        default: return state;
    }
};
