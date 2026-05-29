import { toDataSourceRequestString } from '@progress/kendo-data-query';
import * as Enums from '../../../utilities/Enums';
import { Auth, Notify, Utils } from '../../../utilities/Functions';
import * as LenderCommon from '../../commons/LenderCommon';
import { AppThunkAction } from '../../index';
import * as AppAction from '../app/AppAction';
import { BackEndResult1 } from '../../commons/LenderCommon2';

const title = "Loan Payment Payments";

interface SetLoanUidAction {
    type: 'SET_LOAN_UID';
    loanUid: string;
}

interface ClearPaymentsAction {
    type: 'CLEARED_PAYMENTS';
}

interface FetchPaymentsAction {
    type: 'FETCHED_PAYMENTS';
    excludeFunding: boolean;
    payments: LenderCommon.LoanPayments[];
    summary: any;
    dataState: any;
    columns: any[];
    activeColumn: string;
    forced: boolean;
}

interface FetchPaymentsAllAction {
    type: 'FETCHED_PAYMENTS_ALL';
    paymentsAll: LenderCommon.LoanPayments[];
}

interface EnableExportExcelAction {
    type: 'ENABLED_EXPORT_EXCEL_PAYMENTS';
    currentPage: boolean;
}

interface DisableExportExcelAction {
    type: 'DISABLED_EXPORT_EXCEL_PAYMENTS';
}

interface SetActiveColumnAction {
    type: 'SET_ACTIVE_COLUMN_PAYMENTS';
    activeColumn: string;
}

interface ChangeColumnsAction {
    type: 'CHANGED_COLUMNS_PAYMENTS';
    columns: any[];
}

interface ApplyColumnsAction {
    type: 'APPLIED_COLUMNS_PAYMENTS';
    columns: any[];
}

export type KnownAction = AppAction.KnownAction | SetLoanUidAction | FetchPaymentsAction | FetchPaymentsAllAction | ClearPaymentsAction |
    EnableExportExcelAction | DisableExportExcelAction | SetActiveColumnAction | ChangeColumnsAction | ApplyColumnsAction;

const processPayments = (payments: LenderCommon.LoanPayments[]) => {
    return payments.map((item: LenderCommon.LoanPayments) => {
        item.IsACHValue = item.IsACH;
        item.IsACH = item.IsACH ? 'Yes' : 'No';
        item.DateReceived = item.DateReceived != null ?
            new Date(Date.parse(item.DateReceived.toString())) : undefined;
        item.DateDue = item.DateDue != null ?
            new Date(Date.parse(item.DateDue.toString())) : undefined;
        return item;
    });
}

export const actions = {
    fetchPayments: (loanUid: string, excludeFunding: boolean,
        dataState: any, getColumns: boolean = false,
        forced: boolean = false): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const gridProps = appState.lenPayments.gridProps;
        const fetched = appState.lenPayments.fetched;
        
        if (fetched && !forced && loanUid == appState.lenPayments.loanUid && dataState.skip == gridProps.skip &&
            dataState.take == gridProps.take && dataState.sort == gridProps.sort && dataState.filter == gridProps.filter) return;

        dataState = { ...gridProps, ...dataState };

        if (loanUid) dispatch({ type: 'SET_LOAN_UID', loanUid });

          

        dispatch({ type: 'LOADING' });
        dispatch({ type: 'CLEARED_PAYMENTS' });

          
        fetch(`/api/lender/loan/${loanUid}/payments/${excludeFunding}/${getColumns}?${toDataSourceRequestString(dataState)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: BackEndResult1<any>) => {

              
              
                if (Utils.validateData(dispatch, data, title)) {

                    let columns = Utils.getColumns(appState.lenPayments.columns, data.ObjOptional.Columns);
  
                    var sumary: { [k: string]: number } = {}

                    data.ObjOptional.Result.AggregateResults.map(obj => sumary[obj.Member] = obj.Value)
                 
                    dispatch({
                        type: 'FETCHED_PAYMENTS',
                        excludeFunding,
                        payments: processPayments(data.ObjOptional.Result.Data),
                        dataState: { ...dataState, total: data.ObjOptional.Result.Total },
                        summary: sumary,
                        activeColumn: Utils.getActiveColumn(columns),
                        columns,
                        forced
                    });
                   

                    /*
                    dispatch({
                        type: 'FETCHED_PAYMENTS',
                        excludeFunding,
                        payments: processPayments(result.Data),
                        dataState: { ...dataState, total: result.Total },
                        summary: Utils.getSummary(result.AggregateResults),
                        activeColumn: Utils.getActiveColumn(columns),
                        columns,
                        forced
                    });ç*/
                }
            }, failed => {
                Utils.showError(dispatch, failed, title);
            }).catch(error => {
                Utils.validateData(dispatch, error, title);
            });
    },

    fetchPaymentsAll: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let dataState = { ...appState.lenLoans.gridProps, take: 0 };

        dispatch({ type: 'LOADING' });

        if (appState && appState.lenPayments && appState.lenPayments.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAYMENTS', currentPage: false });
        } else {
            fetch(`/api/lender/loan/${appState.lenPayments.loanUid}/payments/${appState.lenPayments.excludeFunding}/false?${toDataSourceRequestString(dataState)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: any) => {
                    if (Utils.validateData(dispatch, data, title)) {
                        dispatch({ type: 'FETCHED_PAYMENTS_ALL', paymentsAll: processPayments(data.ObjOptional.Result.Data) });
                        dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAYMENTS', currentPage: false });
                    }
                }).catch(error => {
                    Utils.showError(dispatch, error, title);
                });
        }
    },

    enableExport: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAYMENTS', currentPage: true });
    },

    disableExport: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'DISABLED_EXPORT_EXCEL_PAYMENTS' });
    },

    setActiveColumn: (activeColumn: string): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'SET_ACTIVE_COLUMN_PAYMENTS', activeColumn });
    },

    sortColumn: (field: string, move: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenPayments.columns;

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

                dispatch({ type: 'CHANGED_COLUMNS_PAYMENTS', columns: newColumns });
            }
        }
    },

    checkColumn: (checked: boolean, field: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenPayments.columns;

        let newColumns = columns.map(column => {
            if (column.columnName === field) column.checked = checked;
            return column;
        }).sort(Utils.compareColumn);

        dispatch({ type: 'CHANGED_COLUMNS_PAYMENTS', columns: newColumns });
    },

    toggleAllColumns: (checked: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenPayments.columns;

        let newColumns = columns.map(column => {
            column.checked = checked;
            return column;
        }).sort(Utils.compareColumn);

        dispatch({ type: 'CHANGED_COLUMNS_PAYMENTS', columns: newColumns });
    },

    revertColumns: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const realColumns = appState.lenPayments.realColumns;
        dispatch({ type: 'CHANGED_COLUMNS_PAYMENTS', columns: JSON.parse(JSON.stringify(realColumns)) });
    },

    applyChangedColumns: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenPayments.columns;

        dispatch({ type: 'LOADING' });

        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.VWL_LOAN_HISTORY), {
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
                    dispatch({ type: 'APPLIED_COLUMNS_PAYMENTS', columns: columns });
                }
            }).catch(error => {
                Utils.validateData(dispatch, error, title);
            });
    }
}