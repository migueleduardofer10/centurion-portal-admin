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
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            loading: false,
            backDrop: false
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'LOADING':
            return __assign(__assign({}, state), { loading: true });
        case 'LOADED':
            return __assign(__assign({}, state), { loading: false });
        case 'BACK_DROP':
            return __assign(__assign({}, state), { backDrop: action.active });
        default: return state;
    }
};
//# sourceMappingURL=AppStore.js.map