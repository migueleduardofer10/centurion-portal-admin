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
var Enums = require("../../../utilities/Enums");
var Functions_1 = require("../../../utilities/Functions");
var title = "Report ACH Status";
exports.actions = {
    fetchACHStatus: function (dataState, getColumns, forced) { return function (dispatch, getState) {
        var appState = getState();
        console.log(appState);
        var gridProps = appState.achStatusReport.gridProps;
        var fetched = appState.achStatusReport.fetched;
        if (fetched && !forced && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
            dataState.sort == gridProps.sort && dataState.filter == gridProps.filter)
            return;
        dataState = __assign(__assign({}, gridProps), dataState);
        dispatch({ type: 'LOADING' });
        dispatch({ type: 'CLEARED_ACHSTATUS_REPORT' });
        console.log("/api/reports/achstatus?" + kendo_data_query_1.toDataSourceRequestString(dataState));
        fetch("/api/reports/achstatus?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                dispatch({
                    type: 'FETCHED_ACHSTATUS_REPORT',
                    achstatus: data.ObjOptional.Result.Data,
                    dataState: __assign(__assign({}, dataState), { total: data.ObjOptional.Result.Total }),
                    columns: Functions_1.Utils.getColumns(appState.achStatusReport.columns, data.ObjOptional.Columns),
                    forced: forced
                });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    fetchACHStatusAll: function () { return function (dispatch, getState) {
        var appState = getState();
        var dataState = __assign(__assign({}, appState.lenLoans.gridProps), { take: 0 });
        dispatch({ type: 'LOADING' });
        if (appState && appState.achStatusReport && appState.achStatusReport.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_ACHSTATUS_REPORT', currentPage: false });
        }
        else {
            fetch("/api/reports/achstatus?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                if (Functions_1.Utils.validateData(dispatch, data, title)) {
                    dispatch({ type: 'FETCHED_ACHSTATUS_REPORT_ALL', achstatusAll: data.ObjOptional.Result.Data });
                    dispatch({ type: 'ENABLED_EXPORT_EXCEL_ACHSTATUS_REPORT', currentPage: false });
                }
            }).catch(function (error) {
                Functions_1.Utils.showError(dispatch, error, title);
            });
        }
    }; },
    enableExportExcel: function (enable) { return function (dispatch) {
        if (enable)
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_ACHSTATUS_REPORT', currentPage: true });
        else {
            dispatch({ type: 'LOADED' });
            dispatch({ type: 'DISABLED_EXPORT_EXCEL_ACHSTATUS_REPORT' });
        }
    }; },
    changedColumns: function (columns) { return function (dispatch) {
        dispatch({ type: 'CHANGED_COLUMNS_ACHSTATUS_REPORT', columns: columns });
    }; },
    applyChangedColumns: function () { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.achStatusReport.columns;
        dispatch({ type: 'LOADING' });
        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.VWL_CREDITCARDINVOICES), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            },
            body: JSON.stringify(columns)
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                Functions_1.Notify.success(data.Message, title);
                dispatch({ type: 'APPLIED_COLUMNS_ACHSTATUS_REPORT', columns: columns });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; }
};
//# sourceMappingURL=ACHStatusReportAction.js.map