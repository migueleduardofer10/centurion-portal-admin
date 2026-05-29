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
exports.LenFunding_Action_CallJson = exports.LenFunding_Action_applyChangedColumns = exports.LenFunding_Action_SetColumnsArray = exports.LenFunding_Action_SetActiveColumn = exports.LenFunding_Action_SetFundingsArray = exports.LenFunding_Action_SetAllRows = exports.LenFunding_Action_SetTotalSum = exports.LenFunding_Type_SetTotalSum = exports.LenFunding_Type_SetAllRows = exports.LenFunding_Type_SetActiveColumn = exports.LenFunding_Type_SetColumnsArray = exports.LenFunding_Type_SetFundingArray = void 0;
var kendo_data_query_1 = require("@progress/kendo-data-query");
var Enums_1 = require("../../../utilities/Enums");
var Functions_1 = require("../../../utilities/Functions");
var LenderCommon2_1 = require("../../commons/LenderCommon2");
var Type = 'Funding_Type/';
exports.LenFunding_Type_SetFundingArray = Type + 'SetFundingArray';
exports.LenFunding_Type_SetColumnsArray = Type + 'SetColumnsArray';
exports.LenFunding_Type_SetActiveColumn = Type + 'SetActiveColumn';
exports.LenFunding_Type_SetAllRows = Type + 'SetAllRows';
exports.LenFunding_Type_SetTotalSum = Type + 'SetTotalSum';
exports.LenFunding_Action_SetTotalSum = function (totalSum) { return ({
    type: exports.LenFunding_Type_SetTotalSum,
    TotalSum: totalSum
}); };
exports.LenFunding_Action_SetAllRows = function (allRows) { return ({
    type: exports.LenFunding_Type_SetAllRows,
    AllRows: allRows
}); };
exports.LenFunding_Action_SetFundingsArray = function (fundings, totalSum, totalRows, gridState) { return ({
    type: exports.LenFunding_Type_SetFundingArray,
    Fundings: fundings,
    TotalSum: totalSum,
    TotalRows: totalRows,
    GridState: gridState
}); };
exports.LenFunding_Action_SetActiveColumn = function (columnName) { return ({
    type: exports.LenFunding_Type_SetActiveColumn,
    columnName: columnName
}); };
exports.LenFunding_Action_SetColumnsArray = function (columns) { return ({
    type: exports.LenFunding_Type_SetColumnsArray,
    Columns: columns
}); };
var Title = "Funding";
exports.LenFunding_Action_applyChangedColumns = function (columns) { return function (dispatch, getState) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch('/api/grid/' + Number(Enums_1.GridEntityTypeEnum.VWL_FUNDING), {
        method: 'POST',
        headers: LenderCommon2_1.FetchHeaders(),
        body: JSON.stringify(columns)
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        dispatch(exports.LenFunding_Action_SetColumnsArray(columns));
        dispatch(Functions_1.GlobalAnimation_Loaded());
        Functions_1.Notify.success(data.message, Title);
    }).catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
exports.LenFunding_Action_CallJson = function (loanUid, getColumns, gridState, revertColumns, excelExporter_allRows) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    var arrAggregates = [
        { field: "LenderCurrentBalance", aggregate: "sum" },
        { field: "LenderAmountFunded", aggregate: "sum" },
        { field: "InvestorRate", aggregate: "sum" },
        { field: "PercentageOwned", aggregate: "sum" },
        { field: "PaymentInformation", aggregate: "sum" }
    ];
    var url = '';
    if (!excelExporter_allRows) {
        gridState = __assign(__assign({}, gridState), { aggregates: arrAggregates });
        url = "/api/Lender/loans/funding/" + loanUid + "/" + getColumns + "/?" + kendo_data_query_1.toDataSourceRequestString(gridState);
    }
    else {
        var dsrs = {
            aggregates: arrAggregates
        };
        url = "/api/Lender/loans/funding/" + loanUid + "/" + getColumns + "/?" + kendo_data_query_1.toDataSourceRequestString(dsrs);
    }
    fetch(url, {
        method: 'POST',
        headers: LenderCommon2_1.FetchHeaders()
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        var arrFundings = data.ObjOptional.Result.Data;
        var totalFundings = data.ObjOptional.Result.Total;
        var totalSum = {};
        data.ObjOptional.Result.AggregateResults.map(function (obj) { return totalSum[obj.Member] = obj.Value; });
        if (!excelExporter_allRows) {
            dispatch(exports.LenFunding_Action_SetFundingsArray(arrFundings, totalSum, totalFundings, gridState));
        }
        if (revertColumns) {
            fetch('/api/grid/' + Number(Enums_1.GridEntityTypeEnum.VWL_FUNDING), {
                method: 'POST',
                headers: LenderCommon2_1.FetchHeaders(),
                body: JSON.stringify(LenderCommon2_1.LeFunding_ColumnConfiguration())
            })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                dispatch(exports.LenFunding_Action_SetColumnsArray(LenderCommon2_1.LeFunding_ColumnConfiguration()));
                dispatch(Functions_1.GlobalAnimation_Loaded());
            })
                .catch(function (error) {
                Functions_1.Utils.validateData(dispatch, error, Title);
            });
        }
        else if (getColumns) {
            var columns = data.ObjOptional.Columns;
            columns = Functions_1.Utils.getColumns2(LenderCommon2_1.LeFunding_ColumnConfiguration(), columns);
            dispatch(exports.LenFunding_Action_SetColumnsArray(columns));
            dispatch(Functions_1.GlobalAnimation_Loaded());
        }
        else if (excelExporter_allRows) {
            dispatch(exports.LenFunding_Action_SetAllRows(arrFundings));
            dispatch(exports.LenFunding_Action_SetTotalSum(totalSum));
            excelExporter_allRows.save();
            dispatch(exports.LenFunding_Action_SetAllRows([]));
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
//# sourceMappingURL=LenFundingAction.js.map