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
exports.reducer = exports.actions = void 0;
var AppCommon = require("../../commons/AppCommon");
var LenderCommon = require("../../commons/LenderCommon");
var LenAttachmentAction = require("../../actions/lenders/LenAttachmentAction");
exports.actions = LenAttachmentAction.actions;
exports.reducer = function (state, incomingAction) {
    var _a, _b;
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
            gridProps: __assign({}, AppCommon.newGridProps),
            serviceMaps: [],
            viewType: -1,
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'CLEARED_ATTACHMENTS_ALL':
            return __assign(__assign({}, state), { attachmentAll: [] });
        case 'CLEARED_ATTACHMENTS_PAGE':
            return __assign(__assign({}, state), { attachmentPage: [] });
        case 'CLEARED_RESUMEN_INFORMATION':
            return __assign(__assign({}, state), { currentLender: undefined });
        case 'CLEARED_SERVICE_MAPS':
            return __assign(__assign({}, state), { serviceMaps: [], currentLender: undefined });
        case 'DISABLED_EXPORT_EXCEL':
            return __assign(__assign({}, state), { exportExcel: false });
        case 'DISABLED_FETCH_AUTOMATIC':
            return __assign(__assign({}, state), { fetchAutomatic: false });
        case 'DISABLED_FORCE_UPDATE':
            return __assign(__assign({}, state), { forceUpdate: false });
        case 'ENABLED_EXPORT_EXCEL':
            return __assign(__assign({}, state), { exportExcel: true, exportCurrentPage: action.exportCurrentPage });
        case 'ENABLED_FORCE_UPDATE':
            return __assign(__assign({}, state), { forceUpdate: true });
        case 'FETCH_BEGIN':
            return __assign(__assign({}, state), (_a = {}, _a[action.name] = true, _a));
        case 'FETCH_END':
            return __assign(__assign({}, state), (_b = {}, _b[action.name] = false, _b));
        case 'FETCHED_ATTACHMENTS_ALL':
            return __assign(__assign({}, state), { fetchAll_IsActive: false, attachmentAll: action.attachmentsAll });
        case 'FETCHED_ATTACHMENTS_PAGE':
            return __assign(__assign({}, state), { fetchPage_IsActive: false, attachmentPage: action.attachmentsPage, columns: action.columns, gridProps: action.dataState });
        case 'FETCHED_RESUMEN_INFORMATION':
            return __assign(__assign({}, state), { fetchResumenInformation_IsActive: false, currentLender: action.currentLender, forceUpdate: true });
        case 'FETCHED_SERVICE_MAPS':
            return __assign(__assign({}, state), { fetchServiceMaps_IsActive: false, serviceMaps: action.serviceMaps });
        case 'FILTER_CHANGED':
            return __assign(__assign({}, state), { fetchAutomatic: action.fetchAutomatic, filterDateFrom: action.filterDateFrom, filterDateTo: action.filterDateTo, filterRangeDate: action.filterRangeDate });
        case 'SET_VIEW_TYPE':
            return __assign(__assign({}, state), { viewType: action.viewType });
        default: return state;
    }
};
//# sourceMappingURL=LenAttachmentStore.js.map