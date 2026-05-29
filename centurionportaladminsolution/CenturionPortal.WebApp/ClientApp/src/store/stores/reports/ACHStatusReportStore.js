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
var ReportsCommon = require("../../commons/ReportsCommon");
var ACHStatusReportAction = require("../../actions/reports/ACHStatusReportAction");
exports.actions = ACHStatusReportAction.actions;
exports.reducer = function (state, incomingAction) {
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
    var action = incomingAction;
    switch (action.type) {
        case 'CLEARED_ACHSTATUS_REPORT':
            return __assign(__assign({}, state), { fetched: false, fetchedAll: false, achstatus: [], achstatusAll: [] });
        case 'FETCHED_ACHSTATUS_REPORT':
            return __assign(__assign({}, state), { fetched: true, fetchedAll: action.forced ? false : state.fetchedAll, achstatus: action.achstatus, gridProps: action.dataState, realColumns: JSON.parse(JSON.stringify(action.columns)), columns: action.columns });
        case 'FETCHED_ACHSTATUS_REPORT_ALL':
            return __assign(__assign({}, state), { fetchedAll: true, achstatusAll: action.achstatusAll });
        case 'ENABLED_EXPORT_EXCEL_ACHSTATUS_REPORT':
            return __assign(__assign({}, state), { exportExcel: true, currentPage: action.currentPage });
        case 'DISABLED_EXPORT_EXCEL_ACHSTATUS_REPORT':
            return __assign(__assign({}, state), { exportExcel: false });
        case 'CHANGED_COLUMNS_ACHSTATUS_REPORT':
            return __assign(__assign({}, state), { columns: action.columns });
        case 'APPLIED_COLUMNS_ACHSTATUS_REPORT':
            return __assign(__assign({}, state), { realColumns: action.columns, columns: action.columns });
        default: return state;
    }
};
//# sourceMappingURL=ACHStatusReportStore.js.map