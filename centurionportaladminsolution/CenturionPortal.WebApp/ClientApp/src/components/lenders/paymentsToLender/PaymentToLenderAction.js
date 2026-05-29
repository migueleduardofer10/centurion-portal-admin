"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentToLender_Action_Search = exports.PaymentToLender_Action_ExportThisPage = exports.PaymentToLender_Action_Load = exports.PaymentToLender_Action_SetTotalSum = exports.PaymentToLender_Type_SetTotalSum = exports.PaymentToLender_Action_SetResult = exports.PaymentToLender_Type_SetResult = exports.PaymentToLender_Action_SetArrIELSServiceMap = exports.PaymentToLender_Type_SetArrIELSServiceMap = exports.PaymentToLender_Grid_DataSourceRequestState_InitialValue = void 0;
var kendo_data_query_1 = require("@progress/kendo-data-query");
var LenderCommon2_1 = require("../../../store/commons/LenderCommon2");
var Functions_1 = require("../../../utilities/Functions");
var Title = 'Payment to Lender';
var Type = 'PaymentToLender/';
exports.PaymentToLender_Grid_DataSourceRequestState_InitialValue = { skip: 0, take: 30 };
//*************************************************************************************************************************************************************************************************************************
exports.PaymentToLender_Type_SetArrIELSServiceMap = Type + 'SetArrIELSServiceMap';
exports.PaymentToLender_Action_SetArrIELSServiceMap = function (ArrIELSServiceMap) { return ({ type: exports.PaymentToLender_Type_SetArrIELSServiceMap, ArrIELSServiceMap: ArrIELSServiceMap }); };
//*************************************************************************************************************************************************************************************************************************
exports.PaymentToLender_Type_SetResult = Type + 'SetResult';
exports.PaymentToLender_Action_SetResult = function (Rows, TotalRows, TotalSum) { return ({ type: exports.PaymentToLender_Type_SetResult, Rows: Rows, TotalRows: TotalRows, TotalSum: TotalSum }); };
//*************************************************************************************************************************************************************************************************************************
exports.PaymentToLender_Type_SetTotalSum = Type + 'SetTotalSum';
exports.PaymentToLender_Action_SetTotalSum = function (TotalSum) { return ({ type: exports.PaymentToLender_Type_SetTotalSum, TotalSum: TotalSum }); };
//*************************************************************************************************************************************************************************************************************************
exports.PaymentToLender_Action_Load = function () { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch("api/ELSUser/getAccount_AccountFullName/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        dispatch(Functions_1.GlobalAnimation_Loaded());
        var arrAccount = [{ Key: '0', Value: 'All' }];
        arrAccount.push.apply(arrAccount, data.ObjOptional.map(function (x) { return ({ Key: x.Account, Value: x.FullName + ' - ' + x.Account }); }));
        dispatch(exports.PaymentToLender_Action_SetArrIELSServiceMap(arrAccount));
        dispatch(Functions_1.GlobalAnimation_Loaded());
    })
        .catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//*************************************************************************************************************************************************************************************************************************
exports.PaymentToLender_Action_ExportThisPage = function (objExcelExport, data) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    objExcelExport === null || objExcelExport === void 0 ? void 0 : objExcelExport.current.save(data);
    dispatch(Functions_1.GlobalAnimation_Loaded());
    Functions_1.Notify.success("", "Export Complete");
}; };
//*************************************************************************************************************************************************************************************************************************
exports.PaymentToLender_Action_Search = function (gridState, account, onlyPending, objExcelExport) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    var arrAggregateSum = [];
    LenderCommon2_1.PaymentToLender_ColumnConfiguration().filter(function (x) { return x.IsAgregateSum; }).forEach(function (x) { return arrAggregateSum.push({ field: x.ColumnName, aggregate: "sum" }); });
    if (!objExcelExport) {
        gridState.aggregates = arrAggregateSum;
    }
    else {
        gridState = { skip: 0, aggregates: arrAggregateSum };
    }
    fetch("api/Lender/paymentToLender/" + account + "/" + onlyPending + "/?" + kendo_data_query_1.toDataSourceRequestString(gridState), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        var _a;
        dispatch(Functions_1.GlobalAnimation_Loaded());
        console.log(data);
        if (data.ObjOptional != null && data.ObjOptional.Total != 0) {
            var totalSum_1 = {};
            data.ObjOptional.AggregateResults.forEach(function (x) { return totalSum_1[x.Member] = x.Value; });
            var rows = data.ObjOptional.Data;
            rows.forEach(function (obj) { return obj.CheckDate = new Date(obj.CheckDate); });
            var totalRows = data.ObjOptional.Total;
            if (!objExcelExport) {
                dispatch(exports.PaymentToLender_Action_SetResult(rows, totalRows, totalSum_1));
            }
            else {
                dispatch(exports.PaymentToLender_Action_SetTotalSum(totalSum_1));
                (_a = objExcelExport.current) === null || _a === void 0 ? void 0 : _a.save(rows);
                Functions_1.Notify.success("", "Export Complete");
            }
        }
        dispatch(Functions_1.GlobalAnimation_Loaded());
    })
        .catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//# sourceMappingURL=PaymentToLenderAction.js.map