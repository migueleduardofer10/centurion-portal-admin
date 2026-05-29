"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LenLoansSearch_Action_CallJsonFillPropertyState = exports.LenLoansSearch_Action_ExportThisPage = exports.LenLoansSearch_Action_CallJson = exports.LenLoansSearch_Action_applyChangedColumns = exports.LenLoansSearch_Action_SetArr = exports.LenLoansSearch_Action_SetArrINFState = exports.LenLoansSearch_Action_SetActiveColumn = exports.LenLoansSearch_Action_SetColumnsArray = exports.LenLoansSearch_Action_SetAllRows = exports.Type_SetAllRows = exports.Type_SetActiveColumn = exports.Type_SetColumnsArray = exports.Type_SetArr = exports.Type_SetArrINFState = void 0;
var Functions_1 = require("../../../utilities/Functions");
var LenderCommon2_1 = require("../../commons/LenderCommon2");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var Enums_1 = require("../../../utilities/Enums");
var Type = 'LenLoansSearch_Action/';
exports.Type_SetArrINFState = Type + 'SetArrINFState';
exports.Type_SetArr = Type + 'SetArr';
exports.Type_SetColumnsArray = Type + 'SetColumnsArray';
exports.Type_SetActiveColumn = Type + 'SetActiveColumn';
exports.Type_SetAllRows = Type + 'SetAllRows';
var Title = 'Len Loans Search';
exports.LenLoansSearch_Action_SetAllRows = function (allRows) { return ({
    type: exports.Type_SetAllRows,
    AllRows: allRows
}); };
exports.LenLoansSearch_Action_SetColumnsArray = function (columns) { return ({
    type: exports.Type_SetColumnsArray,
    Columns: columns
}); };
exports.LenLoansSearch_Action_SetActiveColumn = function (columnName) { return ({
    type: exports.Type_SetActiveColumn,
    columnName: columnName
}); };
exports.LenLoansSearch_Action_SetArrINFState = function (ArrInfState) { return ({
    type: exports.Type_SetArrINFState,
    ArrInfState: ArrInfState
}); };
exports.LenLoansSearch_Action_SetArr = function (arrRows, totalRows, gridState) { return ({
    type: exports.Type_SetArr,
    Rows: arrRows,
    TotalRows: totalRows,
    GridState: gridState
}); };
exports.LenLoansSearch_Action_applyChangedColumns = function (columns) { return function (dispatch, getState) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch('/api/grid/' + Number(Enums_1.GridEntityTypeEnum.LEN_LOANS_SEARCH), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        },
        body: JSON.stringify(columns)
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        dispatch(exports.LenLoansSearch_Action_SetColumnsArray(columns));
        dispatch(Functions_1.GlobalAnimation_Loaded());
        Functions_1.Notify.success(data.message, Title);
    }).catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
exports.LenLoansSearch_Action_CallJson = function (lastName, firstName, address, city, state, gridState, revertColumns, getColumns, objExcelExport) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    if (lastName === '')
        lastName = ' ';
    if (firstName === '')
        firstName = ' ';
    if (address === '')
        address = ' ';
    if (city === '')
        city = ' ';
    fetch("/api/Lender/loans/loansSearch_by/" + lastName + "/" + firstName + "/" + address + "/" + city + "/" + state + "/" + getColumns + "/?" + kendo_data_query_1.toDataSourceRequestString(gridState), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        var _a;
        var rows = data.ObjOptional.Result.Data;
        rows.forEach(function (obj) {
            obj.MaturityDate = LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(obj.MaturityDate);
            obj.NextDueDate = LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(obj.NextDueDate);
        });
        if (!objExcelExport) {
            dispatch(exports.LenLoansSearch_Action_SetArr(rows, data.ObjOptional.Result.Total, gridState));
        }
        if (revertColumns) {
            fetch('/api/grid/' + Number(Enums_1.GridEntityTypeEnum.LEN_LOANS_SEARCH), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                },
                body: JSON.stringify(LenderCommon2_1.LenLoanSearch_ColumnConfiguration)
            })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                dispatch(exports.LenLoansSearch_Action_SetColumnsArray(LenderCommon2_1.LenLoanSearch_ColumnConfiguration()));
                dispatch(Functions_1.GlobalAnimation_Loaded());
            })
                .catch(function (error) {
                Functions_1.Utils.validateData(dispatch, error, Title);
            });
        }
        else if (getColumns) {
            var columns = Functions_1.Utils.getColumns(LenderCommon2_1.LenLoanSearch_ColumnConfiguration(), data.ObjOptional.Columns);
            columns.sort(function (a, b) { return a.position - b.position; });
            dispatch(exports.LenLoansSearch_Action_SetColumnsArray(columns));
            dispatch(Functions_1.GlobalAnimation_Loaded());
        }
        else if (objExcelExport) {
            (_a = objExcelExport.current) === null || _a === void 0 ? void 0 : _a.save(rows);
            dispatch(Functions_1.GlobalAnimation_Loaded());
            Functions_1.Notify.success("", "Export Complete");
        }
        else {
            dispatch(Functions_1.GlobalAnimation_Loaded());
        }
    }).catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
exports.LenLoansSearch_Action_ExportThisPage = function (objExcelExport, data) { return function (dispatch) {
    var _a;
    dispatch(Functions_1.GlobalAnimation_Loading());
    (_a = objExcelExport.current) === null || _a === void 0 ? void 0 : _a.save(data);
    dispatch(Functions_1.GlobalAnimation_Loaded());
    Functions_1.Notify.success("", "Export Complete");
}; };
exports.LenLoansSearch_Action_CallJsonFillPropertyState = function (getColumns) { return function (dispatch, getState) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch("/api/Lender/loans/loansSearch_getInfState/" + getColumns, {
        method: 'POST',
        headers: LenderCommon2_1.FetchHeaders(),
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        var columns = Functions_1.Utils.getColumns2(LenderCommon2_1.LenLoanSearch_ColumnConfiguration(), data.ObjOptional.Columns);
        dispatch(exports.LenLoansSearch_Action_SetArrINFState(data.ObjOptional.Result));
        dispatch(exports.LenLoansSearch_Action_SetColumnsArray(columns));
        dispatch(Functions_1.GlobalAnimation_Loaded());
    }).catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//# sourceMappingURL=LenLoansSearchAction.js.map