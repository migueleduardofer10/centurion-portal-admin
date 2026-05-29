import { Action, Reducer } from 'redux';
import * as AppCommon from '../../commons/AppCommon'
import * as LenderCommon from '../../commons/LenderCommon';
import * as LenAttachmentAction from '../../actions/lenders/LenAttachmentAction';

export const actions = LenAttachmentAction.actions;

export interface State {
    attachmentAll: LenderCommon.AllAttachment[],
    attachmentPage: LenderCommon.AllAttachment[],
    columns: any[],
    currentLender?: LenderCommon.LNSVendor,
    exportCurrentPage: boolean,
    exportExcel: boolean,
    fetchAutomatic: boolean,
    fetchAll_IsActive: boolean,
    fetchPage_IsActive: boolean,
    fetchResumenInformation_IsActive: boolean,
    fetchServiceMaps_IsActive: boolean,
    filterDateEnabled: boolean,
    filterDateFrom: Date,
    filterDateTo: Date,
    filterRangeDate: any,
    forceUpdate: boolean,
    gridProps: AppCommon.GridProps,
    serviceMaps: AppCommon.ServiceMap[],    
    viewType: number,
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
    if (state === undefined) {
        return {
            attachmentAll: [],
            attachmentPage: [],
            columns: LenderCommon.initialColumnsAttachment,
            exportCurrentPage: false,
            exportExcel: false,
            fetchAutomatic: false,
            fetchAll_IsActive: false,
            fetchPage_IsActive: false,
            fetchResumenInformation_IsActive: false,
            fetchServiceMaps_IsActive: false,
            filterDateEnabled: false,
            filterDateFrom: new Date(),
            filterDateTo: new Date(),
            filterRangeDate: "TODAY",
            forceUpdate: false,
            gridProps: {
                ...AppCommon.newGridProps
            },
            serviceMaps: [],
            viewType: -1,
        };
    }

    const action = incomingAction as LenAttachmentAction.KnownAction;
    switch (action.type) {
        case 'CLEARED_ATTACHMENTS_ALL':
            return {
                ...state,
                attachmentAll: []
            };
        case 'CLEARED_ATTACHMENTS_PAGE':
            return {
                ...state,
                attachmentPage: [],
            };
        case 'CLEARED_RESUMEN_INFORMATION':
            return {
                ...state,
                currentLender: undefined, 
            };
        case 'CLEARED_SERVICE_MAPS':
            return {
                ...state,
                serviceMaps: [],
                currentLender: undefined,
            };
        case 'DISABLED_EXPORT_EXCEL':
            return {
                ...state,
                exportExcel: false
            };
        case 'DISABLED_FETCH_AUTOMATIC':
            return {
                ...state,
                fetchAutomatic: false
            }
        case 'DISABLED_FORCE_UPDATE':
            return {
                ...state,
                forceUpdate: false
            };
        case 'ENABLED_EXPORT_EXCEL':
            return {
                ...state,
                exportExcel: true,
                exportCurrentPage: action.exportCurrentPage
            };
        case 'ENABLED_FORCE_UPDATE':
            return {
                ...state,
                forceUpdate: true
            };
        case 'FETCH_BEGIN':
            return {
                ...state,
                [action.name]: true
            };
        case 'FETCH_END':
            return {
                ...state,
                [action.name]: false
            };
        case 'FETCHED_ATTACHMENTS_ALL':
            return {
                ...state,
                fetchAll_IsActive: false,
                attachmentAll: action.attachmentsAll,
            };
        case 'FETCHED_ATTACHMENTS_PAGE':
            return {
                ...state,
                fetchPage_IsActive: false,
                attachmentPage: action.attachmentsPage,
                columns: action.columns,
                gridProps: action.dataState,
            };
        case 'FETCHED_RESUMEN_INFORMATION':
            return {
                ...state,
                fetchResumenInformation_IsActive: false,
                currentLender: action.currentLender,
                forceUpdate: true
            };
        case 'FETCHED_SERVICE_MAPS':
            return {
                ...state,
                fetchServiceMaps_IsActive: false,
                serviceMaps: action.serviceMaps
            };
        case 'FILTER_CHANGED':
            return {
                ...state,
                fetchAutomatic: action.fetchAutomatic,
                filterDateFrom: action.filterDateFrom,
                filterDateTo: action.filterDateTo,
                filterRangeDate: action.filterRangeDate
            };
        case 'SET_VIEW_TYPE':
            return {
                ...state,
                viewType: action.viewType
            };
        default: return state;
    }
}