"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanPortfolio_Action_Search = exports.LoanPortfolio_Action_Load = void 0;
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var Functions_1 = require("../../utilities/Functions");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var Title = 'Loan Portfolio';
//**********************************************************************************************************************************************************************
exports.LoanPortfolio_Action_Load = function (afterActions) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch("api/Lender/reportLoanPortfolioLoad/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        dispatch(Functions_1.GlobalAnimation_Loaded());
        var arrCbLoansFilter = [{ Key: '0', Value: 'All' }];
        arrCbLoansFilter.push.apply(arrCbLoansFilter, data.ObjOptional.ArrCbLoansFilter.map(function (obj) { return ({ Key: obj.ParentUid, Value: obj.Account }); }));
        var cont = 0;
        var arrAccount = [];
        arrAccount.push.apply(arrAccount, data.ObjOptional.ArrAccount.map(function (obj) { return ({ Key: String(cont++), Value: obj.Account }); }));
        afterActions(arrCbLoansFilter, arrAccount);
        dispatch(Functions_1.GlobalAnimation_Loaded());
    })
        .catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//**********************************************************************************************************************************************************************
exports.LoanPortfolio_Action_Search = function (objExcelExport, lenderUid, useRange, from, to, includeInactives, gridState, afterActions) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch("api/Lender/reportLoanPortfolioDocument/" + LenderCommon2_1.Utilities_DefaultOneSpace(lenderUid) + "/" + useRange + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(from) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(to) + "/" + includeInactives + "/?" + kendo_data_query_1.toDataSourceRequestString(objExcelExport ? { skip: 0 } : gridState), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        dispatch(Functions_1.GlobalAnimation_Loaded());
        afterActions(data.ObjOptional.Result.Data, data.ObjOptional.Result.Total);
        dispatch(Functions_1.GlobalAnimation_Loaded());
    })
        .catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//**********************************************************************************************************************************************************************
//# sourceMappingURL=LoanPortfolioAction.js.map