"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
var Enums = require("../../../../utilities/Enums");
var Functions_1 = require("../../../../utilities/Functions");
var title = "Lender Dashboard";
exports.actions = {
    fetchLoanStatus: function () { return function (dispatch) {
        dispatch({ type: 'LOADING_LOAN_STATUS', loading: true });
        ;
        fetch('api/lender/dashboard/loans/status', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            }
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                var loanStatus = data.ObjOptional;
                var enumStatus_1 = Enums.EnumToArray(Enums.LoanStatusEnum);
                var categoriesStatus = loanStatus.map(function (item) { return enumStatus_1.filter(function (status) { return status.value === item.Status; })[0].label; });
                ;
                var seriesStatus = loanStatus.map(function (item) { return item.Count; });
                dispatch({ type: 'FETCHED_LOAN_STATUS', loanStatus: loanStatus, categoriesStatus: categoriesStatus, seriesStatus: seriesStatus });
            }
        }).catch(function (error) {
            dispatch({ type: 'LOADING_LOAN_STATUS', loading: false });
            ;
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    updatedPaymentLender: function () { return function (dispatch) {
        dispatch({ type: 'UPDATED_LOAN_STATUS' });
    }; },
    changeCollapse: function (active) { return function (dispatch) {
        dispatch({ type: 'COLLAPSE_LOAN_STATUS', active: active });
    }; },
    changeFullScreen: function (active) { return function (dispatch) {
        dispatch({ type: 'BACK_DROP', active: active });
        dispatch({ type: 'FULL_SCREEN_LOAN_STATUS', active: active });
    }; }
};
//# sourceMappingURL=LenDasLoanStatusAction.js.map