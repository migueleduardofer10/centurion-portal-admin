import { toDataSourceRequestString } from '@progress/kendo-data-query';
import * as Enums from '../../../utilities/Enums';
import { Auth, Notify, Utils } from '../../../utilities/Functions';
import * as LenderCommon from '../../commons/LenderCommon';
import { AppThunkAction } from '../../index';
import * as AppAction from '../app/AppAction';
import * as LoginStore from '../auth/AuthAction';
import { BackEndResult1 } from '../../commons/LenderCommon2';

const title = "Loan Charges";

interface SetLoanUidAction {
    type: 'SET_LOAN_UID';
    loanUid: string;
}

interface ClearChargesAction {
    type: 'CLEARED_CHARGES';
}

interface FetchChargesPageAction {
    type: 'FETCHED_CHARGES_PAGE';
    chargesPage: LenderCommon.LoanCharge[];
    summary: any;
    dataState: any;
    activeColumn: string;
    columns: any[];
    forced: boolean;
    hidePaid: boolean;
}

interface FetchChargesAllAction {
    type: 'FETCHED_CHARGES_ALL';
    chargesAll: LenderCommon.LoanCharge[];
}

interface FetchChargeDetailsAction {
    type: 'FETCHED_CHARGE_DETAILS';
    chargesPage: LenderCommon.LoanCharge[];
}

interface FetchChargeDetailsIsLoadingAction {
    type: 'FETCHED_CHARGE_DETAILS_BEGIN';
    chargesPage: LenderCommon.LoanCharge[];
}

interface DisableForceUpdateAction {
    type: 'DISABLED_FORCE_UPDATE';
}

interface EnableExportExcelAction {
    type: 'ENABLED_EXPORT_EXCEL_CHARGES';
    currentPage: boolean;
}

interface DisableExportExcelAction {
    type: 'DISABLED_EXPORT_EXCEL_CHARGES';
}

interface ToggleDropdownColumnsAction {
    type: 'TOGGLE_DROPDOWN_COLUMNS_CHARGES';
    show: boolean;
}

interface SetActiveColumnAction {
    type: 'SET_ACTIVE_COLUMN_CHARGES';
    activeColumn: string;
}

interface ChangeColumnsAction {
    type: 'CHANGED_COLUMNS_CHARGES';
    columns: any[];
}

interface ApplyColumnsAction {
    type: 'APPLIED_COLUMNS_CHARGES';
    columns: any[];
}

export type KnownAction = AppAction.KnownAction | SetLoanUidAction | ClearChargesAction | FetchChargesPageAction | FetchChargesAllAction | FetchChargeDetailsAction |
    FetchChargeDetailsIsLoadingAction | DisableForceUpdateAction | EnableExportExcelAction | DisableExportExcelAction | ToggleDropdownColumnsAction | SetActiveColumnAction |
    ChangeColumnsAction | ApplyColumnsAction | LoginStore.KnownAction;

const processCharges = (charges: LenderCommon.LoanCharge[]) => {
    return charges.map((item: LenderCommon.LoanCharge) => {
        item.DeferredValue = item.Deferred;
        item.Deferred = item.Deferred ? 'Yes' : 'No';
        item.Date = item.Date != null ?
            new Date(Date.parse(item.Date.toString())) : undefined;
        item.InterestFrom = item.InterestFrom != null ?
            new Date(Date.parse(item.InterestFrom.toString())) : undefined;
        //item.ChargesDetails = processChargesDetails(item.ChargesDetails);
        item.ChargesDetailsIsLoading = (item.ChargesDetailsIsLoading === undefined ? false : item.ChargesDetailsIsLoading)
        return item;
    });
};

const processChargesDetails = (chargesDetails: LenderCommon.ChargesDetails[]) => {
    return chargesDetails.map((item: LenderCommon.ChargesDetails) => {
        item.Date = item.Date != null ?
            new Date(Date.parse(item.Date.toString())) : undefined;
        item.Amount = item.Amount != null ? item.Amount * -1 : undefined;
        item.PrinVendor = (item.PrinVendor != 0 ? item.PrinVendor * -1 : 0);
        item.IntVendor = (item.IntVendor != 0 ? item.IntVendor * -1 : 0);
        item.PrinBehalf = (item.PrinBehalf != 0 ? item.PrinBehalf * -1 : 0);
        item.IntBehalf = (item.IntBehalf != 0 ? item.IntBehalf * -1 : 0);
        return item;
    });
}

export const actions = {
    fetchChargesPage: (loanUid: string, hidePaid: boolean = false, dataState: any, getColumns: boolean = false, forced: boolean = false): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const gridProps = appState.lenCharges.gridProps;
        const fetched = appState.lenCharges.fetchedPage;
        
        if (fetched && !forced && loanUid == appState.lenCharges.loanUid && hidePaid == appState.lenCharges.hidePaid && dataState.skip == gridProps.skip &&
            dataState.take == gridProps.take && dataState.sort == gridProps.sort && dataState.filter == gridProps.filter) return;

        dataState = { ...gridProps, ...dataState };

        if (loanUid) {
            dispatch({ type: 'SET_LOAN_UID', loanUid });
        }

        dispatch({ type: 'LOADING' });
        dispatch({ type: 'CLEARED_CHARGES' });

        fetch(`/api/lender/loan/${loanUid}/charges/${hidePaid}/${getColumns}/?${toDataSourceRequestString(dataState)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: BackEndResult1<any>) => {
                if (Utils.validateData(dispatch, data, title)) {
                    let columns = Utils.getColumns(appState.lenCharges.columns, data.ObjOptional.Columns); // appState.lenCharges.columns                 
                    
                    dispatch({
                        type: 'FETCHED_CHARGES_PAGE',
                        chargesPage: processCharges(data.ObjOptional.Result.Data),
                        dataState: { ...dataState, total: data.ObjOptional.Result.Total },
                        summary: Utils.getSummary(data.ObjOptional.Result.AggregateResults),
                        activeColumn: Utils.getActiveColumn(columns),
                        columns,
                        forced,
                        hidePaid
                    });
                }
            }, failed => {
                Utils.showError(dispatch, failed, title);
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    fetchChargesAll: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let dataState = { ...appState.lenCharges.gridProps, take: 0 };

        dispatch({ type: 'LOADING' });

        if (appState && appState.lenCharges && appState.lenCharges.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_CHARGES', currentPage: false });
        } else {
            fetch(`/api/lender/loan/${appState.lenCharges.loanUid}/charges/${appState.lenCharges.hidePaid}/false?${toDataSourceRequestString(dataState)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: BackEndResult1<any>) => {
                    if (Utils.validateData(dispatch, data, title)) {
                        dispatch({ type: 'FETCHED_CHARGES_ALL', chargesAll: processCharges(data.ObjOptional.Result.Data   ) });
                        dispatch({ type: 'ENABLED_EXPORT_EXCEL_CHARGES', currentPage: false });
                    }
                }, failed => {
                    Utils.showError(dispatch, failed, title);
                }).catch(error => {
                    Utils.showError(dispatch, error, title);
                });
        }
    },

    fetchChargeDetails: (dataItem: any, dataSource: any[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let i: number = -1;
        dataItem.ChargesDetailsIsLoading = true;
        dataSource.map((item: any, index: number) => {
            if (item.Uid == dataItem.Uid) {
                i = index;
                item = dataItem;
            }
            return item;
        });
        dispatch({ type: 'FETCHED_CHARGE_DETAILS_BEGIN', chargesPage: dataSource });

        fetch(`/api/lender/loan/chargeDetails/${dataItem.Uid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
               
                if (Utils.validateData(dispatch, data, title)) {
                    dataItem.ChargesDetails = processChargesDetails(data.ObjOptional.Result)

                    dataItem.ChargesDetailsIsLoading = false;
                    dataSource[i] = dataItem;

                    dispatch({ type: 'FETCHED_CHARGE_DETAILS', chargesPage: dataSource });
                }
            }, failed => {
                Utils.showError(dispatch, failed, title);
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    disableForceUpdate: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'DISABLED_FORCE_UPDATE' });
    },

    enableExport: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'ENABLED_EXPORT_EXCEL_CHARGES', currentPage: true });
    },

    disableExport: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'DISABLED_EXPORT_EXCEL_CHARGES' });
    },

    toggleDropdown: (show: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'TOGGLE_DROPDOWN_COLUMNS_CHARGES', show });
    },

    setActiveColumn: (activeColumn: string): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'SET_ACTIVE_COLUMN_CHARGES', activeColumn });
    },

    sortColumn: (field: string, move: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenCharges.columns;

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

                dispatch({ type: 'CHANGED_COLUMNS_CHARGES', columns: newColumns });
            }
        }
    },

    checkColumn: (checked: boolean, field: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenCharges.columns;

        let newColumns = columns.map(column => {
            if (column.columnName === field) column.checked = checked;
            return column;
        }).sort(Utils.compareColumn);

        dispatch({ type: 'CHANGED_COLUMNS_CHARGES', columns: newColumns });
    },

    toggleAllColumns: (checked: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenCharges.columns;

        let newColumns = columns.map(column => {
            column.checked = checked;
            return column;
        }).sort(Utils.compareColumn);

        dispatch({ type: 'CHANGED_COLUMNS_CHARGES', columns: newColumns });
    },

    revertColumns: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const realColumns = appState.lenCharges.realColumns;
        dispatch({ type: 'CHANGED_COLUMNS_CHARGES', columns: JSON.parse(JSON.stringify(realColumns)) });
    },

    applyChangedColumns: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.lenCharges.columns;

        dispatch({ type: 'LOADING' });

        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.VWL_CHARGES_DETAILS), {
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
                    dispatch({ type: 'APPLIED_COLUMNS_CHARGES', columns: columns });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    }
}