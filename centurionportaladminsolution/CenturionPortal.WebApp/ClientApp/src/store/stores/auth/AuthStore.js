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
exports.reducer = exports.actions = void 0;
var Functions_1 = require("../../../utilities/Functions");
var AuthCommon = require("./../../commons/AuthCommon");
var AuthAction = require("../../actions/auth/AuthAction");
exports.actions = AuthAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            body: AuthCommon.newAuthBody,
            isLoggedin: Functions_1.Auth.getELSUser() !== null,
            isResetCaptcha: false,
            isValidCaptcha: false,
            recaptchaSiteKey: '',
            responseCaptcha: ''
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'INITIALIZE_LOGIN':
            return {
                body: AuthCommon.newAuthBody,
                isLoggedin: Functions_1.Auth.getELSUser() !== null,
                isResetCaptcha: false,
                isValidCaptcha: false,
                responseCaptcha: '',
                recaptchaSiteKey: '',
                interval: undefined
            };
        case 'SET_RECAPTCHA_SITEKEY_LOGIN':
            return __assign(__assign({}, state), { recaptchaSiteKey: action.recaptchaSiteKey });
        case 'CHANGED_DATA':
            return __assign(__assign({}, state), { body: action.data });
        case 'RESET_CAPTCHA_LOGIN':
            return __assign(__assign({}, state), { isResetCaptcha: action.isReset });
        case 'VALIDATE_CAPTCHA_LOGIN':
            return __assign(__assign({}, state), { responseCaptcha: action.response, isValidCaptcha: action.isValid });
        case 'LOGGED_IN':
            return __assign(__assign({}, state), { isLoggedin: true, body: AuthCommon.newAuthBody });
        case 'LOGGED_OUT':
            return __assign(__assign({}, state), { isLoggedin: false, body: AuthCommon.newAuthBody });
        case 'CLEAR_INTERVAL':
            return __assign(__assign({}, state), { interval: undefined });
        case 'INTERVAL_SESSION':
            return __assign(__assign({}, state), { interval: action.interval });
        default: return state;
    }
};
//# sourceMappingURL=AuthStore.js.map