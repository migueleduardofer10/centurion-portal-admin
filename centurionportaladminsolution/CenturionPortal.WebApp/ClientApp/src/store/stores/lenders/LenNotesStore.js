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
exports.LenNotes_StateObject = exports.LenNotes_Reducer = void 0;
var LenNotesAction_1 = require("../../actions/lenders/LenNotesAction");
var LenderCommon2_1 = require("../../commons/LenderCommon2");
exports.LenNotes_Reducer = function (state, action) {
    if (state === void 0) { state = {
        Rows: [], Columns: [], ActiveColumn: '', TotalRows: 0,
        AllRows: [], GridState: LenderCommon2_1.StateInitialValue
    }; }
    switch (action.type) {
        case LenNotesAction_1.Type_SetNotesArray:
            {
                var obj = action;
                return __assign(__assign({}, state), { Rows: obj.Notes, TotalRows: obj.TotalRows, AllRows: [], GridState: obj.GridState });
            }
        case LenNotesAction_1.Type_SetAllRows:
            {
                var obj = action;
                return __assign(__assign({}, state), { AllRows: obj.AllRows });
            }
        case LenNotesAction_1.Type_SetColumnsArray:
            {
                var obj = action;
                return __assign(__assign({}, state), { Columns: obj.Columns });
            }
        case LenNotesAction_1.Type_SetActiveColumn:
            {
                var obj = action;
                return __assign(__assign({}, state), { ActiveColumn: obj.columnName });
            }
        default:
            return state;
    }
};
exports.LenNotes_StateObject = function (state) { return state.lenNotes; };
exports.default = exports.LenNotes_Reducer;
//# sourceMappingURL=LenNotesStore.js.map