import { Action, Reducer } from 'redux';
import * as AppCommon from '../../commons/AppCommon';
import * as ReportsCommon from '../../commons/ReportsCommon';
import * as ACHStatusReportAction from '../../actions/reports/ACHStatusReportAction';

export const actions = ACHStatusReportAction.actions;

export interface State {
    fetched: boolean;
    fetchedAll: boolean;
    exportExcel: boolean;
    currentPage: boolean;
    gridProps: AppCommon.GridProps;
    achstatus: ReportsCommon.ACHStatus[];
    achstatusAll: ReportsCommon.ACHStatus[];
    realColumns: any[];
    columns: any[];
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
    if (state === undefined) {
        return {
            fetched: false,
            fetchedAll: false,
            exportExcel: false,
            currentPage: true,
            gridProps: AppCommon.newGridProps,
            achstatus: [],
            achstatusAll: [],
            realColumns: ReportsCommon.initialACHStatusColumns,
            columns: ReportsCommon.initialACHStatusColumns,
        };
    }

    const action = incomingAction as ACHStatusReportAction.KnownAction;
    switch (action.type) {
        case 'CLEARED_ACHSTATUS_REPORT':
            return {
                ...state,
                fetched: false,
                fetchedAll: false,
                achstatus: [],
                achstatusAll: []
            };
        case 'FETCHED_ACHSTATUS_REPORT':
            return {
                ...state,
                fetched: true,
                fetchedAll: action.forced ? false : state.fetchedAll,
                achstatus: action.achstatus,
                gridProps: action.dataState,
                realColumns: JSON.parse(JSON.stringify(action.columns)),
                columns: action.columns
            };
        case 'FETCHED_ACHSTATUS_REPORT_ALL':
            return {
                ...state,
                fetchedAll: true,
                achstatusAll: action.achstatusAll
            };
        case 'ENABLED_EXPORT_EXCEL_ACHSTATUS_REPORT':
            return {
                ...state,
                exportExcel: true,
                currentPage: action.currentPage
            };
        case 'DISABLED_EXPORT_EXCEL_ACHSTATUS_REPORT':
            return {
                ...state,
                exportExcel: false,
            };
        case 'CHANGED_COLUMNS_ACHSTATUS_REPORT':
            return {
                ...state,
                columns: action.columns,
            };
        case 'APPLIED_COLUMNS_ACHSTATUS_REPORT':
            return {
                ...state,
                realColumns: action.columns,
                columns: action.columns
            };
        default: return state;
    }
};
