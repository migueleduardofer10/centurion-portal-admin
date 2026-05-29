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
exports.PaymentToLender_StateObject = exports.PaymentToLender_Reducer = void 0;
var PaymentToLenderAction_1 = require("./PaymentToLenderAction");
exports.PaymentToLender_Reducer = function (state, action) {
    if (state === void 0) { state = {
        ArrIELSServiceMap: [],
        Rows: [],
        TotalRows: 0,
        GridState: PaymentToLenderAction_1.PaymentToLender_Grid_DataSourceRequestState_InitialValue,
        TotalSum: {}
    }; }
    switch (action.type) {
        case PaymentToLenderAction_1.PaymentToLender_Type_SetArrIELSServiceMap: {
            var x = action;
            return __assign(__assign({}, state), { ArrIELSServiceMap: x.ArrIELSServiceMap });
        }
        case PaymentToLenderAction_1.PaymentToLender_Type_SetResult: {
            var x = action;
            return __assign(__assign({}, state), { Rows: x.Rows, TotalRows: x.TotalRows, TotalSum: x.TotalSum });
        }
        default:
            return state;
    }
};
exports.PaymentToLender_StateObject = function (state) {
    return state.paymentToLender;
};
exports.default = exports.PaymentToLender_Reducer;
//# sourceMappingURL=PaymentToLenderStore.js.map