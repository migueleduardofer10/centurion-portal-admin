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
var title = "Loan Charges";
var processCharges = function (charges) {
    return charges.map(function (item) {
        item.DeferredValue = item.Deferred;
        item.Deferred = item.Deferred ? 'Yes' : 'No';
        item.Date = item.Date != null ?
            new Date(Date.parse(item.Date.toString())) : undefined;
        item.InterestFrom = item.InterestFrom != null ?
            new Date(Date.parse(item.InterestFrom.toString())) : undefined;
        //item.ChargesDetails = processChargesDetails(item.ChargesDetails);
        item.ChargesDetailsIsLoading = (item.ChargesDetailsIsLoading === undefined ? false : item.ChargesDetailsIsLoading);
        return item;
    });
};
var processChargesDetails = function (chargesDetails) {
    return chargesDetails.map(function (item) {
        item.Date = item.Date != null ?
            new Date(Date.parse(item.Date.toString())) : undefined;
        item.Amount = item.Amount != null ? item.Amount * -1 : undefined;
        item.PrinVendor = (item.PrinVendor != 0 ? item.PrinVendor * -1 : 0);
        item.IntVendor = (item.IntVendor != 0 ? item.IntVendor * -1 : 0);
        item.PrinBehalf = (item.PrinBehalf != 0 ? item.PrinBehalf * -1 : 0);
        item.IntBehalf = (item.IntBehalf != 0 ? item.IntBehalf * -1 : 0);
        return item;
    });
};
exports.actions = {
    fetchChargesPage: function (loanUid, hidePaid, dataState, getColumns, forced) {
        if (hidePaid === void 0) { hidePaid = false; }
        if (getColumns === void 0) { getColumns = false; }
        if (forced === void 0) { forced = false; }
        return function (dispatch, getState) {
            var appState = getState();
            var gridProps = appState.lenCharges.gridProps;
            var fetched = appState.lenCharges.fetchedPage;
            if (fetched && !forced && loanUid == appState.lenCharges.loanUid && hidePaid == appState.lenCharges.hidePaid && dataState.skip == gridProps.skip &&
                dataState.take == gridProps.take && dataState.sort == gridProps.sort && dataState.filter == gridProps.filter)
                return;
            dataState = __assign(__assign({}, gridProps), dataState);
            if (loanUid) {
                dispatch({ type: 'SET_LOAN_UID', loanUid: loanUid });
            }
            dispatch({ type: 'LOADING' });
            dispatch({ type: 'CLEARED_CHARGES' });
            fetch("/api/lender/loan/" + loanUid + "/charges/" + hidePaid + "/" + getColumns + "/?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                if (Functions_1.Utils.validateData(dispatch, data, title)) {
                    var columns = Functions_1.Utils.getColumns(appState.lenCharges.columns, data.ObjOptional.Columns); // appState.lenCharges.columns                 
                    dispatch({
                        type: 'FETCHED_CHARGES_PAGE',
                        chargesPage: processCharges(data.ObjOptional.Result.Data),
                        dataState: __assign(__assign({}, dataState), { total: data.ObjOptional.Result.Total }),
                        summary: Functions_1.Utils.getSummary(data.ObjOptional.Result.AggregateResults),
                        activeColumn: Functions_1.Utils.getActiveColumn(columns),
                        columns: columns,
                        forced: forced,
                        hidePaid: hidePaid
                    });
                }
            }, function (failed) {
                Functions_1.Utils.showError(dispatch, failed, title);
            }).catch(function (error) {
                Functions_1.Utils.showError(dispatch, error, title);
            });
        };
    },
    fetchChargesAll: function () { return function (dispatch, getState) {
        var appState = getState();
        var dataState = __assign(__assign({}, appState.lenCharges.gridProps), { take: 0 });
        dispatch({ type: 'LOADING' });
        if (appState && appState.lenCharges && appState.lenCharges.fetchedAll) {
            dispatch({ type: 'ENABLED_EXPORT_EXCEL_CHARGES', currentPage: false });
        }
        else {
            fetch("/api/lender/loan/" + appState.lenCharges.loanUid + "/charges/" + appState.lenCharges.hidePaid + "/false?" + kendo_data_query_1.toDataSourceRequestString(dataState), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                if (Functions_1.Utils.validateData(dispatch, data, title)) {
                    dispatch({ type: 'FETCHED_CHARGES_ALL', chargesAll: processCharges(data.ObjOptional.Result.Data) });
                    dispatch({ type: 'ENABLED_EXPORT_EXCEL_CHARGES', currentPage: false });
                }
            }, function (failed) {
                Functions_1.Utils.showError(dispatch, failed, title);
            }).catch(function (error) {
                Functions_1.Utils.showError(dispatch, error, title);
            });
        }
    }; },
    fetchChargeDetails: function (dataItem, dataSource) { return function (dispatch, getState) {
        var i = -1;
        dataItem.ChargesDetailsIsLoading = true;
        dataSource.map(function (item, index) {
            if (item.Uid == dataItem.Uid) {
                i = index;
                item = dataItem;
            }
            return item;
        });
        dispatch({ type: 'FETCHED_CHARGE_DETAILS_BEGIN', chargesPage: dataSource });
        fetch("/api/lender/loan/chargeDetails/" + dataItem.Uid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                dataItem.ChargesDetails = processChargesDetails(data.ObjOptional.Result);
                dataItem.ChargesDetailsIsLoading = false;
                dataSource[i] = dataItem;
                dispatch({ type: 'FETCHED_CHARGE_DETAILS', chargesPage: dataSource });
            }
        }, function (failed) {
            Functions_1.Utils.showError(dispatch, failed, title);
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    disableForceUpdate: function () { return function (dispatch) {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'DISABLED_FORCE_UPDATE' });
    }; },
    enableExport: function () { return function (dispatch) {
        dispatch({ type: 'ENABLED_EXPORT_EXCEL_CHARGES', currentPage: true });
    }; },
    disableExport: function () { return function (dispatch) {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'DISABLED_EXPORT_EXCEL_CHARGES' });
    }; },
    toggleDropdown: function (show) { return function (dispatch) {
        dispatch({ type: 'TOGGLE_DROPDOWN_COLUMNS_CHARGES', show: show });
    }; },
    setActiveColumn: function (activeColumn) { return function (dispatch) {
        dispatch({ type: 'SET_ACTIVE_COLUMN_CHARGES', activeColumn: activeColumn });
    }; },
    sortColumn: function (field, move) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenCharges.columns;
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
                dispatch({ type: 'CHANGED_COLUMNS_CHARGES', columns: newColumns });
            }
        }
    }; },
    checkColumn: function (checked, field) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenCharges.columns;
        var newColumns = columns.map(function (column) {
            if (column.columnName === field)
                column.checked = checked;
            return column;
        }).sort(Functions_1.Utils.compareColumn);
        dispatch({ type: 'CHANGED_COLUMNS_CHARGES', columns: newColumns });
    }; },
    toggleAllColumns: function (checked) { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenCharges.columns;
        var newColumns = columns.map(function (column) {
            column.checked = checked;
            return column;
        }).sort(Functions_1.Utils.compareColumn);
        dispatch({ type: 'CHANGED_COLUMNS_CHARGES', columns: newColumns });
    }; },
    revertColumns: function () { return function (dispatch, getState) {
        var appState = getState();
        var realColumns = appState.lenCharges.realColumns;
        dispatch({ type: 'CHANGED_COLUMNS_CHARGES', columns: JSON.parse(JSON.stringify(realColumns)) });
    }; },
    applyChangedColumns: function () { return function (dispatch, getState) {
        var appState = getState();
        var columns = appState.lenCharges.columns;
        dispatch({ type: 'LOADING' });
        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.VWL_CHARGES_DETAILS), {
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
                dispatch({ type: 'APPLIED_COLUMNS_CHARGES', columns: columns });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; }
};
//# sourceMappingURL=LenChargesAction.js.map