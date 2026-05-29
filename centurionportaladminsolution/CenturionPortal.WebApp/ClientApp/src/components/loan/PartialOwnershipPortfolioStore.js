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
exports.PartialOwnershipPortfolio_StateObject = exports.PartialOwnershipPortfolio_Reducer = void 0;
var PartialOwnershipPortfolioAction_1 = require("./PartialOwnershipPortfolioAction");
exports.PartialOwnershipPortfolio_Reducer = function (state, action) {
    if (state === void 0) { state = {
        Columns: [],
        Rows: [],
        GridState: PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Grid_DataSourceRequestState_InitialValue,
        ActiveColumn: '',
        TotalSum: {},
        AllRows: [],
        TotalRows: 0,
        ArrState: [],
        ArrStatus: [],
        ArrBalance: [],
        GridDetailDictionary: {}
    }; }
    switch (action.type) {
        case PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Type_SetDetailDictionary: {
            state = __assign(__assign({}, state), { GridDetailDictionary: action.GridDetailDictionary });
            return state;
        }
        case PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Type_SetRows:
            {
                var x = action;
                return __assign(__assign({}, state), { Rows: x.Rows, GridState: x.GridState, TotalSum: x.TotalSum, TotalRows: x.TotalRows, GridDetailDictionary: x.GridDetailDictionary });
            }
        case PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Type_SetArr: {
            var x = action;
            return __assign(__assign({}, state), { ArrStatus: x.ArrStatus, ArrState: x.ArrState, ArrBalance: x.ArrBalance });
        }
        case PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Type_SetColumns:
            return __assign(__assign({}, state), { Columns: action.Columns });
        case PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Type_SetActiveColumn:
            return __assign(__assign({}, state), { ActiveColumn: action.ActiveColumn });
        default:
            return state;
    }
};
exports.PartialOwnershipPortfolio_StateObject = function (state) {
    return state.partialOwnershipPortfolio;
};
exports.default = exports.PartialOwnershipPortfolio_Reducer;
//# sourceMappingURL=PartialOwnershipPortfolioStore.js.map