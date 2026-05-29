"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
var kendo_data_query_1 = require("@progress/kendo-data-query");
var kendo_file_saver_1 = require("@progress/kendo-file-saver");
var Enums = require("../../../utilities/Enums");
var Functions_1 = require("../../../utilities/Functions");
var getTitle = function (viewType) {
    return Functions_1.Utils.getValueEnum(Enums.AttachmentViewEnum, viewType, true);
};
var processAttachment = function (attachments) {
    return attachments.map(function (item) {
        item.AppCreationDate = item.AppCreationDate != null ?
            new Date(Date.parse(item.AppCreationDate.toString())) : undefined;
        return item;
    });
};
var LoadedEnd = function (lenAttachmentStore) {
    if (!lenAttachmentStore.fetchAll_IsActive && !lenAttachmentStore.fetchPage_IsActive &&
        !lenAttachmentStore.fetchResumenInformation_IsActive && !lenAttachmentStore.fetchServiceMaps_IsActive) {
        return true;
    }
    else {
        return false;
    }
};
exports.actions = {
    disabledFetchAutomatic: function () { return function (dispatch) {
        dispatch({ type: 'DISABLED_FETCH_AUTOMATIC' });
    }; },
    disabledForceUpdate: function () { return function (dispatch) {
        dispatch({ type: 'DISABLED_FORCE_UPDATE' });
    }; },
    disableExport: function () { return function (dispatch) {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'DISABLED_EXPORT_EXCEL' });
    }; },
    downloadAttchment: function (attachmentUid, attachmentDescription, viewType) { return function (dispatch) {
        var title = getTitle(viewType);
        dispatch({ type: 'LOADING' });
        fetch("/api/lender/attachment/download/" + attachmentUid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                kendo_file_saver_1.saveAs(data.ObjOptional.Uri, attachmentDescription);
            }
        }, function (failed) {
            Functions_1.Utils.showError(dispatch, failed, title);
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    enableExport: function (exportCurrentPage) { return function (dispatch) {
        dispatch({ type: 'ENABLED_EXPORT_EXCEL', exportCurrentPage: exportCurrentPage });
    }; },
    fetchAttachmentsAll: function (lenderUid, viewType) { return function (dispatch, getState) {
        var appState = getState();
        var title = getTitle(viewType);
        var dataState = __assign(__assign({}, appState.lenAttachment.gridProps), { take: 0 });
        dispatch({ type: 'LOADING' });
        dispatch({ type: 'FETCH_BEGIN', name: 'fetchAll_IsActive' });
        lenderUid = lenderUid === undefined ? '' : lenderUid;
        var url = "";
        if (lenderUid === '') {
            url = "/api/lender/attachment/" + viewType + "/false/?" + kendo_data_query_1.toDataSourceRequestString(dataState);
        }
        else {
            url = "/api/lender/attachment/" + lenderUid + "/" + viewType + "/false/?" + kendo_data_query_1.toDataSourceRequestString(dataState);
        }
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            dispatch({ type: 'FETCH_END', name: 'fetchAll_IsActive' });
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                dispatch({ type: 'FETCHED_ATTACHMENTS_ALL', attachmentsAll: processAttachment(data.ObjOptional.Result.Data) });
                dispatch({ type: 'ENABLED_EXPORT_EXCEL', exportCurrentPage: false });
            }
        }, function (failed) {
            dispatch({ type: 'FETCH_END', name: 'fetchAll_IsActive' });
            Functions_1.Utils.showError(dispatch, failed, title);
        }).catch(function (error) {
            dispatch({ type: 'FETCH_END', name: 'fetchAll_IsActive' });
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    fetchAttachmentsPage: function (lenderUid, viewType, filterDateFrom, filterDateTo, dataState, getColumns, rebootPage, force) {
        if (rebootPage === void 0) { rebootPage = false; }
        if (force === void 0) { force = false; }
        return function (dispatch, getState) {
            var _a;
            var appState = getState();
            var gridProps = appState.lenAttachment.gridProps;
            var fetched = appState.lenAttachment.fetchPage_IsActive;
            var title = getTitle(viewType);
            if (!force && fetched && lenderUid === ((_a = appState.lenAttachment.currentLender) === null || _a === void 0 ? void 0 : _a.Uid) && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
                dataState.sort == gridProps.sort && dataState.filter == gridProps.filter)
                return;
            if (rebootPage) {
                gridProps.skip = 0;
                dataState.skip = 0;
            }
            dataState = __assign(__assign({}, gridProps), dataState);
            dispatch({ type: 'LOADING' });
            dispatch({ type: 'FETCH_BEGIN', name: 'fetchPage_IsActive' });
            dispatch({ type: 'CLEARED_ATTACHMENTS_PAGE' });
            lenderUid = lenderUid === undefined ? '' : lenderUid;
            var url = "";
            if (lenderUid === '') {
                url = "/api/lender/attachment/" + viewType + "/" + filterDateFrom.toDateString() + "/" + filterDateTo.toDateString() + "/" + getColumns + "/?" + kendo_data_query_1.toDataSourceRequestString(dataState);
            }
            else {
                url = "/api/lender/attachment/" + lenderUid + "/" + viewType + "/" + filterDateFrom.toDateString() + "/" + filterDateTo.toDateString() + "/" + getColumns + "/?" + kendo_data_query_1.toDataSourceRequestString(dataState);
            }
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                dispatch({ type: 'FETCH_END', name: 'fetchPage_IsActive' });
                appState = getState();
                if (Functions_1.Utils.validateData(dispatch, data, title, LoadedEnd(appState.lenAttachment))) {
                    var columns = Functions_1.Utils.getColumns(appState.lenAttachment.columns, data.ObjOptional.Columns);
                    dispatch({
                        type: 'FETCHED_ATTACHMENTS_PAGE',
                        attachmentsPage: processAttachment(data.ObjOptional.Result.Data),
                        dataState: __assign(__assign({}, dataState), { total: data.ObjOptional.Result.Total }),
                        columns: columns,
                    });
                }
            }, function (failed) {
                dispatch({ type: 'FETCH_END', name: 'fetchPage_IsActive' });
                appState = getState();
                Functions_1.Utils.showError(dispatch, failed, title, !LoadedEnd(appState.lenAttachment));
            }).catch(function (error) {
                dispatch({ type: 'FETCH_END', name: 'fetchPage_IsActive' });
                appState = getState();
                Functions_1.Utils.showError(dispatch, error, title, !LoadedEnd(appState.lenAttachment));
            });
        };
    },
    fetchResumenInformation: function (lenderUid) { return function (dispatch, getState) {
        var appState = getState();
        var title = getTitle(appState.lenAttachment.viewType);
        var fetched = appState.lenAttachment.fetchResumenInformation_IsActive;
        if (fetched || lenderUid === null || lenderUid === undefined || lenderUid === '') {
            dispatch({ type: 'CLEARED_RESUMEN_INFORMATION' });
            dispatch({ type: 'ENABLED_FORCE_UPDATE' });
            return;
        }
        dispatch({ type: 'LOADING' });
        dispatch({ type: 'FETCH_BEGIN', name: 'fetchResumenInformation_IsActive' });
        dispatch({ type: 'CLEARED_RESUMEN_INFORMATION' });
        fetch("/api/lender/resumenInformation/" + lenderUid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            dispatch({ type: 'FETCH_END', name: 'fetchResumenInformation_IsActive' });
            appState = getState();
            if (Functions_1.Utils.validateData(dispatch, data, title, LoadedEnd(appState.lenAttachment))) {
                dispatch({
                    type: 'FETCHED_RESUMEN_INFORMATION',
                    currentLender: data.ObjOptional
                });
            }
        }, function (failed) {
            dispatch({ type: 'FETCH_END', name: 'fetchResumenInformation_IsActive' });
            appState = getState();
            Functions_1.Utils.showError(dispatch, failed, title, !LoadedEnd(appState.lenAttachment));
        }).catch(function (error) {
            dispatch({ type: 'FETCH_END', name: 'fetchResumenInformation_IsActive' });
            appState = getState();
            Functions_1.Utils.showError(dispatch, error, title, !LoadedEnd(appState.lenAttachment));
        });
    }; },
    fetchServiceMaps: function (viewType) { return function (dispatch, getState) {
        var appState = getState();
        var fetched = appState.lenAttachment.fetchServiceMaps_IsActive;
        var title = getTitle(viewType);
        if (fetched || viewType < 0)
            return;
        dispatch({ type: 'LOADING' });
        dispatch({ type: 'FETCH_BEGIN', name: 'fetchServiceMaps_IsActive' });
        dispatch({ type: 'CLEARED_SERVICE_MAPS' });
        dispatch({ type: 'CLEARED_ATTACHMENTS_PAGE' });
        fetch("/api/lender/validLender/" + viewType, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            dispatch({ type: 'FETCH_END', name: 'fetchServiceMaps_IsActive' });
            appState = getState();
            if (Functions_1.Utils.validateData(dispatch, data, title, LoadedEnd(appState.lenAttachment))) {
                dispatch({ type: 'FETCHED_SERVICE_MAPS', serviceMaps: data.ObjOptional });
            }
        }, function (failed) {
            dispatch({ type: 'FETCH_END', name: 'fetchServiceMaps_IsActive' });
            appState = getState();
            Functions_1.Utils.showError(dispatch, failed, title, !LoadedEnd(appState.lenAttachment));
        }).catch(function (error) {
            dispatch({ type: 'FETCH_END', name: 'fetchServiceMaps_IsActive' });
            appState = getState();
            Functions_1.Utils.showError(dispatch, error, title, !LoadedEnd(appState.lenAttachment));
        });
    }; },
    filterChange: function (value) { return function (dispatch, getState) {
        var appState = getState();
        var fetchAutomatic = appState.lenAttachment.fetchAutomatic;
        var filterRangeDate = appState.lenAttachment.filterRangeDate;
        var filterDateFrom = appState.lenAttachment.filterDateFrom;
        var filterDateTo = appState.lenAttachment.filterDateTo;
        filterRangeDate = value.valueRangeType;
        filterDateFrom = value.valueDateFrom;
        filterDateTo = value.valueDateTo;
        fetchAutomatic = (filterRangeDate === 'CUSTOM RANGE' ? false : true);
        dispatch({ type: 'FILTER_CHANGED', fetchAutomatic: fetchAutomatic, filterDateFrom: filterDateFrom, filterDateTo: filterDateTo, filterRangeDate: filterRangeDate });
    }; },
    setViewType: function (viewType) { return function (dispatch) {
        dispatch({ type: 'SET_VIEW_TYPE', viewType: viewType });
    }; }
};
//# sourceMappingURL=LenAttachmentAction.js.map