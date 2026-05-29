import { AppThunkAction } from '../../index';
import * as AppAction from '../app/AppAction';
import * as Enums from '../../../utilities/Enums';
import * as LenderCommon from '../../commons/LenderCommon';
import { BackEndResult1 } from '../../commons/LenderCommon2';
import { Auth, Notify, Utils } from '../../../utilities/Functions';
import { toDataSourceRequestString } from '@progress/kendo-data-query';

const title = "Primary Loans";

interface FetchLoansAction {
    type: 'FETCHED_LOANS_VENDOR';
    loans: LenderCommon.LNSVendor[];
    dataState: any;
    activeColumn: string;
    columns: any[];
    forced: boolean;
}

interface FetchLoansAllAction {
    type: 'FETCHED_LOANS_VENDOR_ALL';
    loansAll: LenderCommon.LNSVendor[];
}

interface EnableExportExcelAction {
    type: 'ENABLED_EXPORT_EXCEL_LOANS';
    currentPage: boolean;
}

interface DisableExportExcelAction {
    type: 'DISABLED_EXPORT_EXCEL_LOANS';
}

interface SetActiveColumnAction {
    type: 'SET_ACTIVE_COLUMN_LOANS';
    activeColumn: string;
}

interface ChangeColumnsAction {
    type: 'CHANGED_COLUMNS_LOANS';
    columns: any[];
}

interface ApplyColumnsAction {
    type: 'APPLIED_COLUMNS_LOANS';
    columns: any[];
}

export type KnownAction = AppAction.KnownAction | FetchLoansAction | FetchLoansAllAction | EnableExportExcelAction |
    DisableExportExcelAction | SetActiveColumnAction | ChangeColumnsAction | ApplyColumnsAction;

const processLoans = (loans: LenderCommon.LNSVendor[]) => {
    return loans.map((item: LenderCommon.LNSVendor) => {
        item.MaturityDate = item.MaturityDate != null ?
            new Date(Date.parse(item.MaturityDate.toString())) : undefined;
        item.NextDueDate = item.NextDueDate != null ?
            new Date(Date.parse(item.NextDueDate.toString())) : undefined;
        item.StatusDesc = Utils.getValueEnum(Enums.LoanStatusEnum, item.Status);
        item.PrimaryPurposeDesc = Utils.getValueEnum(Enums.LoanPrimaryPurposeEnum, item.PrimaryPurpose);
        item.NoteRateDesc = item.NoteRate.toFixed(2) + "%";
        return item;
    });
};

export const actions = {
    fetchLoans: (dataState: any, getColumns: boolean = false, forced: boolean = false): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const gridProps = appState.lenLoans.gridProps;
        const fetched = appState.lenLoans.fetched;

        let customColumns = [
            { renderLabel: "StatusDesc", label: "Status", type: Enums.LoanStatusEnum },
            { renderLabel: "PrimaryPurposeDesc", label: "PrimaryPurpose", type: Enums.LoanPrimaryPurposeEnum },
            { renderLabel: "NoteRateDesc", label: "NoteRate" }
        ];

        dataState = Utils.getCustomData(customColumns, dataState);

        if (fetched && !forced && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
            dataState.sort == gridProps.sort && dataState.filter == gridProps.filter) return;

        dataState = { ...gridProps, ...dataState };

        dispatch({ type: 'LOADING' });

        fetch(`/api/lender/loans/${getColumns}/?${toDataSourceRequestString(dataState)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: BackEndResult1<any>) => {

                dataState = Utils.getCustomData(customColumns, dataState, true);
                
                if (Utils.validateData(dispatch, data, title)) {

                    let result = data.ObjOptional.Result;
                    let columns = Utils.getColumns(appState.lenLoans.columns, data.ObjOptional.Columns);

                    dispatch({
                        type: 'FETCHED_LOANS_VENDOR',
                        loans: processLoans(result.Data),
                        dataState: { ...dataState, total: result.Total },
                        activeColumn: Utils.getActiveColumn(columns),
                        columns,
                        forced
                    });
                }

            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    fetchLoansAll: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let dataState = { ...appState.lenLoans.gridProps, take: 0 };

        dispatch({ type: 'LOADING' });

        if (appState && appState.lenLoans && appState.lenLoans.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_LOANS', currentPage: false });
        } else {
            fetch(`/api/lender/loans/false/?${toDataSourceRequestString(dataState)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: any) => {

                    if (Utils.validateData(dispatch, data, title)) {

                        let result = data.ObjOptional.Result;

                        dispatch({ type: 'FETCHED_LOANS_VENDOR_ALL', loansAll: processLoans(result.Data) });
                        dispatch({ type: 'ENABLED_EXPORT_EXCEL_LOANS', currentPage: false });

                    }
                }).catch(error => {
                    Utils.showError(dispatch, error, title);
                });
        }
    },

    enableExport: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'ENABLED_EXPORT_EXCEL_LOANS', currentPage: true });
    },

    disableExport: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'DISABLED_EXPORT_EXCEL_LOANS' });
    },

    setActiveColumn: (activeColumn: string): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'SET_ACTIVE_COLUMN_LOANS', activeColumn });
    },

    sortColumn: (field: string, move: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenLoans.columns;

        if (field !== '' && (move === 1 || move === -1)) {
            let oldPosition = columns.filter((column: any) => column.columnName === field)[0].position;
            let newPosition = oldPosition + move;

            if (newPosition >= 1 && newPosition <= columns.length) {
                let otherField = columns.filter((column: any) => column.position === newPosition)[0].columnName;

                let newColumns = columns.map(column => {
                    if (column.columnName === field) column.position = newPosition;
                    if (column.columnName === otherField) column.position = oldPosition;
                    return column;
                }).sort(Utils.compareColumn);

                dispatch({ type: 'CHANGED_COLUMNS_LOANS', columns: newColumns });
            }
        }
    },

    checkColumn: (checked: boolean, field: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenLoans.columns;

        let newColumns = columns.map(column => {
            if (column.columnName === field) column.checked = checked;
            return column;
        }).sort(Utils.compareColumn);

        dispatch({ type: 'CHANGED_COLUMNS_LOANS', columns: newColumns });
    },

    toggleAllColumns: (checked: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenLoans.columns;

        let newColumns = columns.map(column => {
            column.checked = checked;
            return column;
        }).sort(Utils.compareColumn);

        dispatch({ type: 'CHANGED_COLUMNS_LOANS', columns: newColumns });
    },

    revertColumns: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const realColumns = appState.lenLoans.realColumns;
        dispatch({ type: 'CHANGED_COLUMNS_LOANS', columns: JSON.parse(JSON.stringify(realColumns)) });
    },

    applyChangedColumns: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenLoans.columns;

        dispatch({ type: 'LOADING' });

        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.LNS_LOAN), {
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
                    Notify.success(data.message, title);
                    dispatch({ type: 'APPLIED_COLUMNS_LOANS', columns: columns });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    }
}