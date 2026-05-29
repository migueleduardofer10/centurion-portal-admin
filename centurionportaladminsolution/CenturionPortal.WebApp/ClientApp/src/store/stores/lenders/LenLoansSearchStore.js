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
exports.LenLoansSearch_StateObject = exports.LenLoansSearch_Reducer = void 0;
var LenLoansSearchAction_1 = require("../../actions/lenders/LenLoansSearchAction");
exports.LenLoansSearch_Reducer = function (state, action) {
    if (state === void 0) { state = {
        ArrInfState: [],
        Rows: [],
        AllRows: [],
        TotalRows: 0,
        GridState: { skip: 0, take: 10 },
        Columns: [],
        ActiveColumn: ''
    }; }
    switch (action.type) {
        case LenLoansSearchAction_1.Type_SetArrINFState:
            {
                var obj = action;
                return __assign(__assign({}, state), { ArrInfState: obj.ArrInfState });
            }
        case LenLoansSearchAction_1.Type_SetActiveColumn:
            {
                var obj = action;
                return __assign(__assign({}, state), { ActiveColumn: obj.columnName });
            }
        case LenLoansSearchAction_1.Type_SetAllRows:
            {
                var obj = action;
                return __assign(__assign({}, state), { AllRows: obj.AllRows });
            }
        case LenLoansSearchAction_1.Type_SetColumnsArray:
            {
                var obj = action;
                return __assign(__assign({}, state), { Columns: obj.Columns });
            }
        case LenLoansSearchAction_1.Type_SetArr:
            {
                var obj = action;
                return __assign(__assign({}, state), { Rows: obj.Rows, TotalRows: obj.TotalRows, GridState: obj.GridState });
            }
        default:
            return state;
    }
};
exports.LenLoansSearch_StateObject = function (state) {
    return state.lenLoansSearch;
};
exports.default = exports.LenLoansSearch_Reducer;
//# sourceMappingURL=LenLoansSearchStore.js.map