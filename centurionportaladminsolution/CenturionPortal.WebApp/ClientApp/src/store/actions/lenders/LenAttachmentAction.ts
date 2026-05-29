import { toDataSourceRequestString } from '@progress/kendo-data-query';
import { saveAs } from '@progress/kendo-file-saver';
import * as Enums from '../../../utilities/Enums';
import { Auth, Notify, Utils } from '../../../utilities/Functions';
import * as AppCommon from '../../commons/AppCommon';
import * as LenderCommon from '../../commons/LenderCommon';
import { AppThunkAction, ApplicationState } from '../../index';
import * as AppAction from '../app/AppAction';
import * as LoginStore from '../auth/AuthAction';

const getTitle = (viewType: number) => {
    return Utils.getValueEnum(Enums.AttachmentViewEnum, viewType, true);
};

const processAttachment = (attachments: LenderCommon.AllAttachment[]) => {
    return attachments.map((item: LenderCommon.AllAttachment) => {
        item.AppCreationDate = item.AppCreationDate != null ?
            new Date(Date.parse(item.AppCreationDate.toString())) : undefined;
        return item;
    });
}

const LoadedEnd = (lenAttachmentStore: any) => {
    if (!lenAttachmentStore.fetchAll_IsActive && !lenAttachmentStore.fetchPage_IsActive &&
        !lenAttachmentStore.fetchResumenInformation_IsActive && !lenAttachmentStore.fetchServiceMaps_IsActive) {
        return true;
    }
    else {
        return false;
    }
}

interface ClearedAttachmentsAllAction {
    type: 'CLEARED_ATTACHMENTS_ALL';
}

interface ClearedAttachmentsPageAction {
    type: 'CLEARED_ATTACHMENTS_PAGE';
}

interface ClearedResumenInformationAction {
    type: 'CLEARED_RESUMEN_INFORMATION'
}

interface ClearedServiceMapAction {
    type: 'CLEARED_SERVICE_MAPS';
}

interface DisabledExportExcelAction {
    type: 'DISABLED_EXPORT_EXCEL';
}

interface DisabledFetchAutomatic {
    type: 'DISABLED_FETCH_AUTOMATIC';
}

interface DisabledForceUpdateAction {
    type: 'DISABLED_FORCE_UPDATE';
}

interface EnabledExportExcelAction {
    type: 'ENABLED_EXPORT_EXCEL';
    exportCurrentPage: boolean;
}

interface EnabledForceUpdateAction {
    type: 'ENABLED_FORCE_UPDATE';
}

interface FetchBeginAction {
    type: 'FETCH_BEGIN';
    name: string;
}

interface FetchEndAction {
    type: 'FETCH_END';
    name: string;
}

interface FetchedAttachmentsAllAction {
    type: 'FETCHED_ATTACHMENTS_ALL';
    attachmentsAll: LenderCommon.AllAttachment[];
}

interface FetchedAttachmentsPageAction {
    type: 'FETCHED_ATTACHMENTS_PAGE';
    attachmentsPage: LenderCommon.AllAttachment[];
    dataState: any;
    columns: any[];
}

interface FetchedResumenInformationAction {
    type: 'FETCHED_RESUMEN_INFORMATION';
    currentLender: LenderCommon.LNSVendor;
}

interface FetchedServiceMapsAction {
    type: 'FETCHED_SERVICE_MAPS';
    serviceMaps: AppCommon.ServiceMap[];
}

interface FilterChangedAction {
    type: 'FILTER_CHANGED';
    fetchAutomatic: boolean;
    //filterDateEnabled: boolean;
    filterDateFrom: Date;
    filterDateTo: Date;
    filterRangeDate: any;
}

interface SetViewTypeAction {
    type: 'SET_VIEW_TYPE';
    viewType: number;
}

export type KnownAction = AppAction.KnownAction | ClearedAttachmentsAllAction | ClearedAttachmentsPageAction | ClearedResumenInformationAction | ClearedServiceMapAction |
    DisabledExportExcelAction | DisabledFetchAutomatic | DisabledForceUpdateAction | EnabledExportExcelAction | EnabledForceUpdateAction | FetchBeginAction | FetchEndAction |
    FetchedAttachmentsAllAction | FetchedAttachmentsPageAction | FetchedResumenInformationAction | FetchedServiceMapsAction | FilterChangedAction | SetViewTypeAction |
    LoginStore.KnownAction;

export const actions = {

    disabledFetchAutomatic: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({type: 'DISABLED_FETCH_AUTOMATIC'});
    },

    disabledForceUpdate: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'DISABLED_FORCE_UPDATE' });
    },

    disableExport: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'DISABLED_EXPORT_EXCEL' });
    },

    downloadAttchment: (attachmentUid: string, attachmentDescription: string, viewType: number): AppThunkAction<KnownAction> => (dispatch) => {
        const title = getTitle(viewType);

        dispatch({ type: 'LOADING' });

        fetch(`/api/lender/attachment/download/${attachmentUid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    saveAs(data.ObjOptional.Uri, attachmentDescription);
                }
            }, failed => {
                Utils.showError(dispatch, failed, title);
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    enableExport: (exportCurrentPage: boolean): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'ENABLED_EXPORT_EXCEL', exportCurrentPage });
    },

    fetchAttachmentsAll: (lenderUid: any, viewType: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let appState = getState();
        const title = getTitle(viewType);
        let dataState = { ...appState.lenAttachment.gridProps, take: 0 };

        dispatch({ type: 'LOADING' });
        dispatch({ type: 'FETCH_BEGIN', name: 'fetchAll_IsActive' });
        lenderUid = lenderUid === undefined ? '' : lenderUid;
        let url: string = "";
        if (lenderUid === '') {
            url = `/api/lender/attachment/${viewType}/false/?${toDataSourceRequestString(dataState)}`;
        }
        else {
            url = `/api/lender/attachment/${lenderUid}/${viewType}/false/?${toDataSourceRequestString(dataState)}`;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                dispatch({ type: 'FETCH_END', name: 'fetchAll_IsActive' });
                if (Utils.validateData(dispatch, data, title)) {
                    dispatch({ type: 'FETCHED_ATTACHMENTS_ALL', attachmentsAll: processAttachment(data.ObjOptional.Result.Data) });
                    dispatch({ type: 'ENABLED_EXPORT_EXCEL', exportCurrentPage: false });
                }
            }, failed => {
                dispatch({ type: 'FETCH_END', name: 'fetchAll_IsActive' });
                Utils.showError(dispatch, failed, title);
            }).catch(error => {
                dispatch({ type: 'FETCH_END', name: 'fetchAll_IsActive' });
                Utils.showError(dispatch, error, title);
            });
    },

    fetchAttachmentsPage: (lenderUid: any, viewType: number, filterDateFrom: Date, filterDateTo: Date, dataState: any, getColumns: boolean, rebootPage: boolean = false, force: boolean = false): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let appState = getState();
        let gridProps = appState.lenAttachment.gridProps;
        const fetched = appState.lenAttachment.fetchPage_IsActive;
        const title = getTitle(viewType);

        if (!force && fetched && lenderUid === appState.lenAttachment.currentLender?.Uid && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
            dataState.sort == gridProps.sort && dataState.filter == gridProps.filter) return;

        if (rebootPage) {
            gridProps.skip = 0;
            dataState.skip = 0;
        }

        dataState = { ...gridProps, ...dataState };
        dispatch({ type: 'LOADING' });
        dispatch({ type: 'FETCH_BEGIN', name: 'fetchPage_IsActive'});
        dispatch({ type: 'CLEARED_ATTACHMENTS_PAGE' });
        lenderUid = lenderUid === undefined ? '' : lenderUid;
        let url: string = "";
        if (lenderUid === '') {
            url = `/api/lender/attachment/${viewType}/${filterDateFrom.toDateString()}/${filterDateTo.toDateString()}/${getColumns}/?${toDataSourceRequestString(dataState)}`;
        }
        else {
            url = `/api/lender/attachment/${lenderUid}/${viewType}/${filterDateFrom.toDateString()}/${filterDateTo.toDateString()}/${getColumns}/?${toDataSourceRequestString(dataState)}`;
        }
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                dispatch({ type: 'FETCH_END', name: 'fetchPage_IsActive' });
                appState = getState();
                if (Utils.validateData(dispatch, data, title, LoadedEnd(appState.lenAttachment))) {
                    let columns = Utils.getColumns(appState.lenAttachment.columns, data.ObjOptional.Columns);                    
                    dispatch({
                        type: 'FETCHED_ATTACHMENTS_PAGE',
                        attachmentsPage: processAttachment(data.ObjOptional.Result.Data),
                        dataState: { ...dataState, total: data.ObjOptional.Result.Total },
                        columns,
                    });
                }
            }, failed => {
                dispatch({ type: 'FETCH_END', name: 'fetchPage_IsActive' });
                appState = getState();
                Utils.showError(dispatch, failed, title, !LoadedEnd(appState.lenAttachment));
            }).catch(error => {
                dispatch({ type: 'FETCH_END', name: 'fetchPage_IsActive' });            
                appState = getState();
                Utils.showError(dispatch, error, title, !LoadedEnd(appState.lenAttachment));
            });
    },

    fetchResumenInformation: (lenderUid: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let appState = getState();
        const title = getTitle(appState.lenAttachment.viewType);
        const fetched = appState.lenAttachment.fetchResumenInformation_IsActive;

        if (fetched || lenderUid === null || lenderUid === undefined || lenderUid === '') {
            dispatch({ type: 'CLEARED_RESUMEN_INFORMATION' });
            dispatch({ type: 'ENABLED_FORCE_UPDATE' });
            return;
        }

        dispatch({ type: 'LOADING' });
        dispatch({ type: 'FETCH_BEGIN', name: 'fetchResumenInformation_IsActive' });
        dispatch({ type: 'CLEARED_RESUMEN_INFORMATION' });

        fetch(`/api/lender/resumenInformation/${lenderUid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                dispatch({ type: 'FETCH_END', name: 'fetchResumenInformation_IsActive' });
                appState = getState();
                if (Utils.validateData(dispatch, data, title, LoadedEnd(appState.lenAttachment))) {
                    dispatch({
                        type: 'FETCHED_RESUMEN_INFORMATION',
                        currentLender: data.ObjOptional
                    });
                }
            }, failed => {
                dispatch({ type: 'FETCH_END', name: 'fetchResumenInformation_IsActive' }); 
                appState = getState();
                Utils.showError(dispatch, failed, title, !LoadedEnd(appState.lenAttachment));
            }).catch(error => {
                dispatch({ type: 'FETCH_END', name: 'fetchResumenInformation_IsActive' });  
                appState = getState();
                Utils.showError(dispatch, error, title, !LoadedEnd(appState.lenAttachment));
            });
    },

    fetchServiceMaps: (viewType: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let appState = getState();
        const fetched = appState.lenAttachment.fetchServiceMaps_IsActive;
        const title = getTitle(viewType);

        if (fetched || viewType < 0) return;

        dispatch({ type: 'LOADING' });
        dispatch({ type: 'FETCH_BEGIN', name: 'fetchServiceMaps_IsActive' });
        dispatch({ type: 'CLEARED_SERVICE_MAPS' });
        dispatch({ type: 'CLEARED_ATTACHMENTS_PAGE' });

        fetch(`/api/lender/validLender/${viewType}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                dispatch({ type: 'FETCH_END', name: 'fetchServiceMaps_IsActive' });
                appState = getState();
                if (Utils.validateData(dispatch, data, title, LoadedEnd(appState.lenAttachment))) {
                    dispatch({ type: 'FETCHED_SERVICE_MAPS', serviceMaps: data.ObjOptional });
                }
            }, failed => {
                dispatch({ type: 'FETCH_END', name: 'fetchServiceMaps_IsActive' });
                appState = getState();
                Utils.showError(dispatch, failed, title, !LoadedEnd(appState.lenAttachment));
            }).catch(error => {
                dispatch({ type: 'FETCH_END', name: 'fetchServiceMaps_IsActive' });
                appState = getState();
                Utils.showError(dispatch, error, title, !LoadedEnd(appState.lenAttachment));
            });
    },

    filterChange: (value: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let appState = getState();

        let fetchAutomatic: boolean = appState.lenAttachment.fetchAutomatic;
        let filterRangeDate: any = appState.lenAttachment.filterRangeDate;
        let filterDateFrom: Date = appState.lenAttachment.filterDateFrom!;
        let filterDateTo: Date = appState.lenAttachment.filterDateTo!;

        filterRangeDate = value.valueRangeType;
        filterDateFrom = value.valueDateFrom;
        filterDateTo = value.valueDateTo;
        fetchAutomatic = (filterRangeDate === 'CUSTOM RANGE' ? false : true);

        dispatch({ type: 'FILTER_CHANGED', fetchAutomatic, filterDateFrom, filterDateTo, filterRangeDate });
    },

    setViewType: (viewType: number): AppThunkAction<KnownAction> => (dispatch) =>{
        dispatch({ type: 'SET_VIEW_TYPE', viewType });
    }
}