import { Action, Reducer } from 'redux';
import * as AppCommon from '../../commons/AppCommon';
import * as LenderCommon from '../../commons/LenderCommon';
import * as LenChargesAction from '../../actions/lenders/LenChargesAction';

export const actions = LenChargesAction.actions;

export interface State {
    loanUid: string;
    fetchedPage: boolean;
    fetchedAll: boolean;
    exportExcel: boolean;
    currentPage: boolean;
    hidePaid: boolean;
    gridProps: AppCommon.GridProps;
    chargesPage: LenderCommon.LoanCharge[];
    chargesAll: LenderCommon.LoanCharge[];
    showDropdown?: boolean;
    activeColumn: string;
    realColumns: any[];
    columns: any[];
    summary: any;
    forceUpdate: boolean;
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
    if (state === undefined) {
        return {
            loanUid: '',
            fetchedPage: false,
            fetchedAll: false,
            exportExcel: false,
            currentPage: true,
            hidePaid: false,
            gridProps: {
                ...AppCommon.newGridProps,
                aggregates: [
                    { field: "OriginalAmount", aggregate: "sum" },
                    { field: "Balance", aggregate: "sum" },
                    { field: "AccruedInterest", aggregate: "sum" },
                    { field: "TotalDue", aggregate: "sum" }
                ]
            },
            chargesPage: [],
            chargesAll: [],
            activeColumn: '',
            realColumns: LenderCommon.initialColumnsCharge,
            columns: LenderCommon.initialColumnsCharge,
            summary: {},
            forceUpdate: false
        };
    }

    const action = incomingAction as LenChargesAction.KnownAction;
    switch (action.type) {
        case 'SET_LOAN_UID':
            return {
                ...state,
                loanUid: action.loanUid,
                fetchedPage: (state.loanUid == action.loanUid)
            };
        case 'CLEARED_CHARGES':
            return {
                ...state,
                fetchedPage: false,
                fetchedAll: false,
                chargesPage: [],
                chargesAll: []
            };
        case 'FETCHED_CHARGES_PAGE':
            return {
                ...state,
                fetchedPage: true,
                fetchedAll: action.forced ? false : state.fetchedAll,
                hidePaid: action.hidePaid,
                chargesPage: action.chargesPage,
                gridProps: action.dataState,
                activeColumn: action.activeColumn,
                realColumns: JSON.parse(JSON.stringify(action.columns)),
                columns: action.columns,
                summary: action.summary
            };
        case 'FETCHED_CHARGES_ALL':
            return {
                ...state,
                fetchedAll: true,
                chargesAll: action.chargesAll
            };
        case 'FETCHED_CHARGE_DETAILS':
            return {
                ...state,
                chargesPage: action.chargesPage,
                forceUpdate: true
            };
        case 'FETCHED_CHARGE_DETAILS_BEGIN':
            return {
                ...state,
                chargesPage: action.chargesPage,
                forceUpdate: true
            };
        case 'DISABLED_FORCE_UPDATE':
            return {
                ...state,
                forceUpdate: false
            };
        case 'ENABLED_EXPORT_EXCEL_CHARGES':
            return {
                ...state,
                exportExcel: true,
                currentPage: action.currentPage
            };
        case 'DISABLED_EXPORT_EXCEL_CHARGES':
            return {
                ...state,
                exportExcel: false,
            };
        case 'TOGGLE_DROPDOWN_COLUMNS_CHARGES':
            return {
                ...state,
                showDropdown: action.show
            };
        case 'SET_ACTIVE_COLUMN_CHARGES':
            return {
                ...state,
                activeColumn: action.activeColumn,
            };
        case 'CHANGED_COLUMNS_CHARGES':
            return {
                ...state,
                columns: action.columns,
            };
        case 'APPLIED_COLUMNS_CHARGES':
            return {
                ...state,
                realColumns: action.columns,
                columns: action.columns
            };
        default: return state;
    }
};
