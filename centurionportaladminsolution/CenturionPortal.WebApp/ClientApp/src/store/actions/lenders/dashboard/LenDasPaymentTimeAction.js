"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
exports.actions = {
    refreshedPaymentOnTime: function () { return function (dispatch) {
        dispatch({ type: 'REFRESHED_PAYMENT_TIME' });
    }; },
    changeCollapse: function (active) { return function (dispatch) {
        dispatch({ type: 'COLLAPSE_PAYMENT_TIME', active: active });
    }; },
    changeFullScreen: function (active) { return function (dispatch) {
        dispatch({ type: 'BACK_DROP', active: active });
        dispatch({ type: 'FULL_SCREEN_PAYMENT_TIME', active: active });
    }; },
};
//# sourceMappingURL=LenDasPaymentTimeAction.js.map