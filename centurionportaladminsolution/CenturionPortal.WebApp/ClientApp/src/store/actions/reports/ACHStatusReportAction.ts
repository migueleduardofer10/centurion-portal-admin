import { toDataSourceRequestString } from '@progress/kendo-data-query';

import { AppThunkAction } from '../../index';
import * as AppAction from '../app/AppAction';
import * as Enums from '../../../utilities/Enums';
import * as ReportsCommon from '../../commons/ReportsCommon';
import { Auth, Notify, Utils } from '../../../utilities/Functions';

const title = "Report ACH Status";

interface ClearACHStatusAction {
    type: 'CLEARED_ACHSTATUS_REPORT';
}

interface FetchACHStatusAction {
    type: 'FETCHED_ACHSTATUS_REPORT';
    achstatus: ReportsCommon.ACHStatus[];
    dataState: any;
    columns: any[];
    forced: boolean;
}

interface FetchACHStatusAllAction {
    type: 'FETCHED_ACHSTATUS_REPORT_ALL';
    achstatusAll: ReportsCommon.ACHStatus[];
}

interface EnableExportExcelAction {
    type: 'ENABLED_EXPORT_EXCEL_ACHSTATUS_REPORT';
    currentPage: boolean;
}

interface DisableExportExcelAction {
    type: 'DISABLED_EXPORT_EXCEL_ACHSTATUS_REPORT';
}

interface ChangeColumnsAction {
    type: 'CHANGED_COLUMNS_ACHSTATUS_REPORT';
    columns: any[];
}

interface ApplyColumnsAction {
    type: 'APPLIED_COLUMNS_ACHSTATUS_REPORT';
    columns: any[];
}

export type KnownAction = AppAction.KnownAction | ClearACHStatusAction | FetchACHStatusAction | FetchACHStatusAllAction |
    EnableExportExcelAction | DisableExportExcelAction | ChangeColumnsAction | ApplyColumnsAction;

export const actions = {
    fetchACHStatus: (dataState: any, getColumns: boolean, forced: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        console.log(appState);
        const gridProps = appState.achStatusReport.gridProps;
        const fetched = appState.achStatusReport.fetched;

        if (fetched && !forced && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
            dataState.sort == gridProps.sort && dataState.filter == gridProps.filter) return;

        dataState = { ...gridProps, ...dataState };

        dispatch({ type: 'LOADING' });
        dispatch({ type: 'CLEARED_ACHSTATUS_REPORT' });
        console.log(`/api/reports/achstatus?${toDataSourceRequestString(dataState)}`);
        fetch(`/api/reports/achstatus?${toDataSourceRequestString(dataState)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    dispatch({
                        type: 'FETCHED_ACHSTATUS_REPORT',
                        achstatus: data.ObjOptional.Result.Data,
                        dataState: { ...dataState, total: data.ObjOptional.Result.Total },
                        columns: Utils.getColumns(appState.achStatusReport.columns, data.ObjOptional.Columns),
                        forced
                    });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    fetchACHStatusAll: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let dataState = { ...appState.lenLoans.gridProps, take: 0 };

        dispatch({ type: 'LOADING' });

        if (appState && appState.achStatusReport && appState.achStatusReport.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_ACHSTATUS_REPORT', currentPage: false });
        } else {
            fetch(`/api/reports/achstatus?${toDataSourceRequestString(dataState)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: any) => {
                    if (Utils.validateData(dispatch, data, title)) {
                        dispatch({ type: 'FETCHED_ACHSTATUS_REPORT_ALL', achstatusAll: data.ObjOptional.Result.Data });
                        dispatch({ type: 'ENABLED_EXPORT_EXCEL_ACHSTATUS_REPORT', currentPage: false });
                    }
                }).catch(error => {
                    Utils.showError(dispatch, error, title);
                });
        }
    },

    enableExportExcel: (enable: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        if (enable)
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_ACHSTATUS_REPORT', currentPage: true });
        else {
            dispatch({ type: 'LOADED' });
            dispatch({ type: 'DISABLED_EXPORT_EXCEL_ACHSTATUS_REPORT' });
        }
    },

    changedColumns: (columns: any[]): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'CHANGED_COLUMNS_ACHSTATUS_REPORT', columns });
    },

    applyChangedColumns: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.achStatusReport.columns;

        dispatch({ type: 'LOADING' });

        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.VWL_CREDITCARDINVOICES), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            },
            body: JSON.stringify(columns)
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    Notify.success(data.Message, title);
                    dispatch({ type: 'APPLIED_COLUMNS_ACHSTATUS_REPORT', columns: columns });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    }
}