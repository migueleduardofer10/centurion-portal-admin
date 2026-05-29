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
var title = "Loan Payment Payments";
var processPayments = function (payments) {
    return payments.map(function (item) {
        item.IsACHValue = item.IsACH;
        item.IsACH = item.IsACH ? 'Yes' : 'No';
        item.DateReceived = item.DateReceived != null ?
            new Date(Date.parse(item.DateReceived.toString())) : undefined;
        item.DateDue = item.DateDue != null ?
            new Date(Date.parse(item.DateDue.toString())) : undefined;
        return item;
    });
};
exports.actions = {
    fetchPayments: function (loanUid, excludeFunding, dataState, getColumns, forced) {
        if (getColumns === void 0) { getColumns = false; }
        if (forced === void 0) { forced = false; }
        return function (dispatch, getState) {
            var appState = getState();
            var gridProps = appState.lenPayments.gridProps;
            var fetched = appState.lenPayments.fetched;
            if (fetched && !forced && loanUid == appState.lenPayments.loanUid && dataState.skip == gridProps.skip &&
                dataState.take == gridProps.take && dataState.sort == gridProps.sort && dataState.filter == gridProps.filter)
                return;
            dataState = __assign(__assign({}, gridProps), dataState);
            if (loanUid)
                dispatch({ type: 'SET_LOAN_UID', loanUid: loanUid });
            dispatch({ type: 'LOADING' });
            dispatch({ type: 'CLEARED_PAYMENTS' });
            fetch("/api/lender/loan/" + loanUid + "/payments/" + excludeFunding + "/" + getColumns + "?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                if (Functions_1.Utils.validateData(dispatch, data, title)) {
                    var columns = Functions_1.Utils.getColumns(appState.lenPayments.columns, data.ObjOptional.Columns);
                    var sumary = {};
                    data.ObjOptional.Result.AggregateResults.map(function (obj) { return sumary[obj.Member] = obj.Value; });
                    dispatch({
                        type: 'FETCHED_PAYMENTS',
                        excludeFunding: excludeFunding,
                        payments: processPayments(data.ObjOptional.Result.Data),
                        dataState: __assign(__assign({}, dataState), { total: data.ObjOptional.Result.Total }),
                        summary: sumary,
                        activeColumn: Functions_1.Utils.getActiveColumn(columns),
                        columns: columns,
                        forced: forced
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
                    });�*/
                }
            }, function (failed) {
                Functions_1.Utils.showError(dispatch, failed, title);
            }).catch(function (error) {
                Functions_1.Utils.validateData(dispatch, error, title);
            });
        };
    },
    fetchPaymentsAll: function () { return function (dispatch, getState) {
        var appState = getState();
        var dataState = __assign(__assign({}, appState.lenLoans.gridProps), { take: 0 });
        dispatch({ type: 'LOADING' });
        if (appState && appState.lenPayments && appState.lenPayments.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAYMENTS', currentPage: false });
        }
        else {
            fetch("/api/lender/loan/" + appState.lenPayments.loanUid + "/payments/" + appState.lenPayments.excludeFunding + "/false?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                if (Functions_1.Utils.validateData(dispatch, data, title)) {
                    dispatch({ type: 'FETCHED_PAYMENTS_ALL', paymentsAll: processPayments(data.ObjOptional.Result.Data) });
                    dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAYMENTS', currentPage: false });
                }
            }).catch(function (error) {
                Functions_1.Utils.showError(dispatch, error, title);
            });
        }
    }; },
    enableExport: function () { return function (dispatch) {
        dispatch({ type: 'ENABLED_EXPORT_EXCEL_PAYMENTS', currentPage: true });
    }; },
    disableExport: function () { return function (dispatch) {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'DISABLED_EXPORT_EXCEL_PAYMENTS' });
    }; },
    setActiveColumn: function (activeColumn) { return function (dispatch) {
        dispatch({ type: 'SET_ACTIVE_COLUMN_PAYMENTS', activeColumn: activeColumn });
    }; },
    sortColumn: function (field, move) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenPayments.columns;
        if (field !== '' && (move === 1 || move === -1)) {
            var oldPosition_1 = columns.filter(function (column) { return column.columnName === field; })[0].position;
            var newPosition_1 = oldPosition_1 + move;
            if (newPosition_1 >= 1 && newPosition_1 <= columns.length) {
                var otherField_1 = columns.filter(function (column) { return column.position === newPosition_1; })[0].columnName;
                var newColumns = columns.map(function (column) {
                    if (column.columnName === field)
                        column.position = newPosition_1;
                    if (column.columnName === otherField_1)
                        column.position = oldPosition_1;
                    return column;
                }).sort(Functions_1.Utils.compareColumn);
                dispatch({ type: 'CHANGED_COLUMNS_PAYMENTS', columns: newColumns });
            }
        }
    }; },
    checkColumn: function (checked, field) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenPayments.columns;
        var newColumns = columns.map(function (column) {
            if (column.columnName === field)
                column.checked = checked;
            return column;
        }).sort(Functions_1.Utils.compareColumn);
        dispatch({ type: 'CHANGED_COLUMNS_PAYMENTS', columns: newColumns });
    }; },
    toggleAllColumns: function (checked) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenPayments.columns;
        var newColumns = columns.map(function (column) {
            column.checked = checked;
            return column;
        }).sort(Functions_1.Utils.compareColumn);
        dispatch({ type: 'CHANGED_COLUMNS_PAYMENTS', columns: newColumns });
    }; },
    revertColumns: function () { return function (dispatch, getState) {
        var appState = getState();
        var realColumns = appState.lenPayments.realColumns;
        dispatch({ type: 'CHANGED_COLUMNS_PAYMENTS', columns: JSON.parse(JSON.stringify(realColumns)) });
    }; },
    applyChangedColumns: function () { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenPayments.columns;
        dispatch({ type: 'LOADING' });
        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.VWL_LOAN_HISTORY), {
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
                Functions_1.Notify.success(data.message, title);
                dispatch({ type: 'APPLIED_COLUMNS_PAYMENTS', columns: columns });
            }
        }).catch(function (error) {
            Functions_1.Utils.validateData(dispatch, error, title);
        });
    }; }
};
//# sourceMappingURL=LenPaymentAction.js.map