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
exports.LenFunding_StateObject = exports.LenFunding_Reducer = void 0;
var LenFundingAction_1 = require("../../actions/lenders/LenFundingAction");
var LenderCommon2_1 = require("../../commons/LenderCommon2");
exports.LenFunding_Reducer = function (state, action) {
    if (state === void 0) { state = {
        Rows: [], Columns: [], ActiveColumn: '', TotalSum: {}, TotalRows: 0,
        AllRows: [], GridState: LenderCommon2_1.StateInitialValue
    }; }
    switch (action.type) {
        case LenFundingAction_1.LenFunding_Type_SetFundingArray:
            {
                var obj = action;
                return __assign(__assign({}, state), { TotalSum: obj.TotalSum, Rows: obj.Fundings, TotalRows: obj.TotalRows, AllRows: [], GridState: obj.GridState });
            }
        case LenFundingAction_1.LenFunding_Type_SetAllRows:
            {
                var obj = action;
                return __assign(__assign({}, state), { AllRows: obj.AllRows });
            }
        case LenFundingAction_1.LenFunding_Type_SetTotalSum:
            {
                var obj = action;
                return __assign(__assign({}, state), { TotalSum: obj.TotalSum });
            }
        case LenFundingAction_1.LenFunding_Type_SetColumnsArray:
            {
                var obj = action;
                return __assign(__assign({}, state), { Columns: obj.Columns });
            }
        case LenFundingAction_1.LenFunding_Type_SetActiveColumn:
            {
                var obj = action;
                return __assign(__assign({}, state), { ActiveColumn: obj.columnName });
            }
        default:
            return state;
    }
};
exports.LenFunding_StateObject = function (state) { return state.lenFunding; };
exports.default = exports.LenFunding_Reducer;
//# sourceMappingURL=LenFundingStore.js.map