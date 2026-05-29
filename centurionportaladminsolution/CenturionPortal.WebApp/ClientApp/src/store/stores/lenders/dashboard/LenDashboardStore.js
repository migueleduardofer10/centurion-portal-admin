"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actions = void 0;
var LenDashboardAction = require("../../../actions/lenders/dashboard/LenDashboardAction");
exports.actions = LenDashboardAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            loading: false
        };
    }
    var action = incomingAction;
    switch (action.type) {
        default: return state;
    }
};
//# sourceMappingURL=LenDashboardStore.js.map