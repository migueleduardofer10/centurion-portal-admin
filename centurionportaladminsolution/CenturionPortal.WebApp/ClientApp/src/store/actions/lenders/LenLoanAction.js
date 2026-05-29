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
var Enums = require("../../../utilities/Enums");
var Functions_1 = require("../../../utilities/Functions");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var title = "Primary Loans";
var processLoans = function (loans) {
    return loans.map(function (item) {
        item.MaturityDate = item.MaturityDate != null ?
            new Date(Date.parse(item.MaturityDate.toString())) : undefined;
        item.NextDueDate = item.NextDueDate != null ?
            new Date(Date.parse(item.NextDueDate.toString())) : undefined;
        item.StatusDesc = Functions_1.Utils.getValueEnum(Enums.LoanStatusEnum, item.Status);
        item.PrimaryPurposeDesc = Functions_1.Utils.getValueEnum(Enums.LoanPrimaryPurposeEnum, item.PrimaryPurpose);
        item.NoteRateDesc = item.NoteRate.toFixed(2) + "%";
        return item;
    });
};
exports.actions = {
    fetchLoans: function (dataState, getColumns, forced) {
        if (getColumns === void 0) { getColumns = false; }
        if (forced === void 0) { forced = false; }
        return function (dispatch, getState) {
            var appState = getState();
            var gridProps = appState.lenLoans.gridProps;
            var fetched = appState.lenLoans.fetched;
            var customColumns = [
                { renderLabel: "StatusDesc", label: "Status", type: Enums.LoanStatusEnum },
                { renderLabel: "PrimaryPurposeDesc", label: "PrimaryPurpose", type: Enums.LoanPrimaryPurposeEnum },
                { renderLabel: "NoteRateDesc", label: "NoteRate" }
            ];
            dataState = Functions_1.Utils.getCustomData(customColumns, dataState);
            if (fetched && !forced && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
                dataState.sort == gridProps.sort && dataState.filter == gridProps.filter)
                return;
            dataState = __assign(__assign({}, gridProps), dataState);
            dispatch({ type: 'LOADING' });
            fetch("/api/lender/loans/" + getColumns + "/?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                dataState = Functions_1.Utils.getCustomData(customColumns, dataState, true);
                if (Functions_1.Utils.validateData(dispatch, data, title)) {
                    var result = data.ObjOptional.Result;
                    var columns = Functions_1.Utils.getColumns(appState.lenLoans.columns, data.ObjOptional.Columns);
                    dispatch({
                        type: 'FETCHED_LOANS_VENDOR',
                        loans: processLoans(result.Data),
                        dataState: __assign(__assign({}, dataState), { total: result.Total }),
                        activeColumn: Functions_1.Utils.getActiveColumn(columns),
                        columns: columns,
                        forced: forced
                    });
                }
            }).catch(function (error) {
                Functions_1.Utils.showError(dispatch, error, title);
            });
        };
    },
    fetchLoansAll: function () { return function (dispatch, getState) {
        var appState = getState();
        var dataState = __assign(__assign({}, appState.lenLoans.gridProps), { take: 0 });
        dispatch({ type: 'LOADING' });
        if (appState && appState.lenLoans && appState.lenLoans.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_LOANS', currentPage: false });
        }
        else {
            fetch("/api/lender/loans/false/?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                if (Functions_1.Utils.validateData(dispatch, data, title)) {
                    var result = data.ObjOptional.Result;
                    dispatch({ type: 'FETCHED_LOANS_VENDOR_ALL', loansAll: processLoans(result.Data) });
                    dispatch({ type: 'ENABLED_EXPORT_EXCEL_LOANS', currentPage: false });
                }
            }).catch(function (error) {
                Functions_1.Utils.showError(dispatch, error, title);
            });
        }
    }; },
    enableExport: function () { return function (dispatch) {
        dispatch({ type: 'ENABLED_EXPORT_EXCEL_LOANS', currentPage: true });
    }; },
    disableExport: function () { return function (dispatch) {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'DISABLED_EXPORT_EXCEL_LOANS' });
    }; },
    setActiveColumn: function (activeColumn) { return function (dispatch) {
        dispatch({ type: 'SET_ACTIVE_COLUMN_LOANS', activeColumn: activeColumn });
    }; },
    sortColumn: function (field, move) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenLoans.columns;
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
                dispatch({ type: 'CHANGED_COLUMNS_LOANS', columns: newColumns });
            }
        }
    }; },
    checkColumn: function (checked, field) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenLoans.columns;
        var newColumns = columns.map(function (column) {
            if (column.columnName === field)
                column.checked = checked;
            return column;
        }).sort(Functions_1.Utils.compareColumn);
        dispatch({ type: 'CHANGED_COLUMNS_LOANS', columns: newColumns });
    }; },
    toggleAllColumns: function (checked) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenLoans.columns;
        var newColumns = columns.map(function (column) {
            column.checked = checked;
            return column;
        }).sort(Functions_1.Utils.compareColumn);
        dispatch({ type: 'CHANGED_COLUMNS_LOANS', columns: newColumns });
    }; },
    revertColumns: function () { return function (dispatch, getState) {
        var appState = getState();
        var realColumns = appState.lenLoans.realColumns;
        dispatch({ type: 'CHANGED_COLUMNS_LOANS', columns: JSON.parse(JSON.stringify(realColumns)) });
    }; },
    applyChangedColumns: function () { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenLoans.columns;
        dispatch({ type: 'LOADING' });
        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.LNS_LOAN), {
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
                dispatch({ type: 'APPLIED_COLUMNS_LOANS', columns: columns });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; }
};
//# sourceMappingURL=LenLoanAction.js.map