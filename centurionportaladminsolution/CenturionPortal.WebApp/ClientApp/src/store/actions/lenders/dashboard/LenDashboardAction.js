"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
var Enums = require("../../../../utilities/Enums");
var Functions_1 = require("../../../../utilities/Functions");
var title = "Lender Dashboard";
exports.actions = {
    fetchData: function (refresh) {
        if (refresh === void 0) { refresh = false; }
        return function (dispatch) {
            dispatch({ type: 'LOADING' });
            fetch('api/lender/dashboard/data', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Functions_1.Auth.getJWT()
                }
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                if (Functions_1.Utils.validateData(dispatch, data, title)) {
                    var action = refresh ? 'refresh' : 'update';
                    var loanStates = data.ObjOptional.loansByState;
                    var paymentsTime = data.ObjOptional.paymentsOnTime;
                    var paymentsLender = data.ObjOptional.paymentsLender;
                    var paymentsBorrower = data.ObjOptional.paymentsBorrower;
                    var loanStatus = data.ObjOptional.loansByStatus;
                    var categoriesLender = paymentsLender.map(function (x) { return x.Legend; });
                    var seriesLender = [
                        { name: "Total Amount", data: paymentsLender.map(function (x) { return x.TotalAmount; }) },
                        { name: "To Interest", data: paymentsLender.map(function (x) { return x.ToInterest; }) },
                        { name: "To Principal", data: paymentsLender.map(function (x) { return x.ToPrincipal; }) },
                        { name: "To Late Charge", data: paymentsLender.map(function (x) { return x.ToLateCharge; }) },
                        { name: "Other", data: paymentsLender.map(function (x) { return x.Other; }) },
                    ];
                    var categoriesBorrower = paymentsBorrower.map(function (x) { return x.Legend; });
                    var seriesBorrower = [
                        { name: "Total Amount", data: paymentsBorrower.map(function (x) { return x.TotalAmount; }) },
                        { name: "To Interest", data: paymentsBorrower.map(function (x) { return x.ToInterest; }) },
                        { name: "To Principal", data: paymentsBorrower.map(function (x) { return x.ToPrincipal; }) },
                        { name: "To Late Charge", data: paymentsBorrower.map(function (x) { return x.ToLateCharge; }) },
                        { name: "Other", data: paymentsBorrower.map(function (x) { return x.Other; }) },
                    ];
                    var enumStatus_1 = Enums.EnumToArray(Enums.LoanStatusEnum);
                    var categoriesStatus = loanStatus.map(function (item) { return enumStatus_1.filter(function (status) { return status.value === item.Status; })[0].label; });
                    ;
                    var seriesStatus = loanStatus.map(function (item) { return item.Count; });
                    dispatch({ type: 'FETCHED_LOAN_STATES', loanStates: loanStates, action: action });
                    dispatch({ type: 'FETCHED_PAYMENT_TIME', paymentsTime: paymentsTime });
                    dispatch({ type: 'FETCHED_PAYMENT_LENDER', paymentsLender: paymentsLender, categoriesLender: categoriesLender, seriesLender: seriesLender });
                    dispatch({ type: 'FETCHED_PAYMENT_BORROWER', paymentsBorrower: paymentsBorrower, categoriesBorrower: categoriesBorrower, seriesBorrower: seriesBorrower });
                    dispatch({ type: 'FETCHED_LOAN_STATUS', loanStatus: loanStatus, categoriesStatus: categoriesStatus, seriesStatus: seriesStatus });
                }
            }).catch(function (error) {
                Functions_1.Utils.showError(dispatch, error, title);
            });
        };
    }
};
//# sourceMappingURL=LenDashboardAction.js.map