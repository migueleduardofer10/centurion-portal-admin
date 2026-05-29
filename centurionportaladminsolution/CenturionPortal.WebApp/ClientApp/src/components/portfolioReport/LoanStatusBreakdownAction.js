"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanStatusBreakdown_Action_Load = void 0;
var Functions_1 = require("../../utilities/Functions");
var Title = 'Loan Status Breakdown';
//const Type = 'LoanStatusBreakdown/'
//***************************************************************************************************************************************************************************
exports.LoanStatusBreakdown_Action_Load = function (afterActions) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    var url = "/api/Lender/reportLoanStatusBreakdown";
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        afterActions(data.ObjOptional.ArrSummPort, data.ObjOptional.ArrSumary, data.ObjOptional.ArrOtherStatistics1, data.ObjOptional.ArrOtherStatistics2, data.ObjOptional.UserInfo);
        dispatch(Functions_1.GlobalAnimation_Loaded());
    }).catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//# sourceMappingURL=LoanStatusBreakdownAction.js.map