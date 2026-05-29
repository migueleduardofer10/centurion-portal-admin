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
exports.actions = void 0;
var Functions_1 = require("../../../utilities/Functions");
var titleSignin = "Sign in";
var titleSignout = "Sign out";
exports.actions = {
    initializeLogin: function () { return function (dispatch, getState) {
        var appState = getState();
        clearInterval(appState.auth.interval);
        dispatch({ type: 'INITIALIZE_LOGIN' });
        fetch('/api/auth/recaptcha', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, "Recaptcha Site Key"))
                dispatch({ type: 'SET_RECAPTCHA_SITEKEY_LOGIN', recaptchaSiteKey: data.ObjOptional });
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, "Recaptcha Site Key");
        });
    }; },
    changeData: function (name, value) { return function (dispatch, getSate) {
        var _a;
        var appState = getSate();
        var data = appState.auth.body;
        data = __assign(__assign({}, data), (_a = {}, _a[name] = value, _a));
        dispatch({ type: 'CHANGED_DATA', data: data });
    }; },
    resetedCaptcha: function () { return function (dispatch) {
        dispatch({ type: 'RESET_CAPTCHA_LOGIN', isReset: false });
    }; },
    validateCaptcha: function (response, isValid) { return function (dispatch) {
        dispatch({ type: 'VALIDATE_CAPTCHA_LOGIN', response: response, isValid: isValid });
    }; },
    login: function (responseCaptcha) { return function (dispatch, getState) {
        var appState = getState();
        var data = appState.auth.body;
        var isValid = false;
        if (data.Username.trim() == '')
            Functions_1.Notify.warning("Username is required", titleSignin);
        else if (data.Password.trim() == '')
            Functions_1.Notify.warning("Password is required", titleSignin);
        else if (!appState.auth.isValidCaptcha)
            Functions_1.Notify.warning("Captcha is invalid", titleSignin);
        else
            isValid = true;
        if (!isValid)
            return;
        dispatch({ type: 'LOADING' });
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'G-Recaptcha-Response': responseCaptcha
            },
            body: JSON.stringify(data)
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, titleSignin, false)) {
                Functions_1.Auth.setELSUser(data.ObjOptional);
                dispatch({ type: 'LOGGED_IN' });
            }
            else {
                dispatch({ type: 'VALIDATE_CAPTCHA_LOGIN', response: '', isValid: false });
                dispatch({ type: 'RESET_CAPTCHA_LOGIN', isReset: true });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, titleSignin);
            dispatch({ type: 'VALIDATE_CAPTCHA_LOGIN', response: '', isValid: false });
            dispatch({ type: 'RESET_CAPTCHA_LOGIN', isReset: true });
        });
    }; },
    signOut: function () { return function (dispatch, getState) {
        var appState = getState();
        dispatch({ type: 'LOADING' });
        fetch('/api/auth/logout').then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, titleSignout)) {
                Functions_1.Auth.destroyELSUser();
                clearInterval(appState.auth.interval);
                dispatch({ type: 'LOGGED_OUT' });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, titleSignout);
        });
    }; },
    refreshToken: function () { return function (dispatch, getState) {
        var appState = getState();
        fetch('/api/auth/refresh/token')
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (!data.ObjOptional) {
                Functions_1.Auth.destroyELSUser();
                clearInterval(appState.auth.interval);
                Functions_1.Notify.warning(data.Message, titleSignout);
                dispatch({ type: 'LOGGED_OUT' });
            }
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, titleSignout);
        });
    }; },
    clearInterval: function () { return function (dispatch, getState) {
        var appState = getState();
        clearInterval(appState.auth.interval);
        dispatch({ type: 'CLEAR_INTERVAL' });
    }; },
    intervalSession: function (action) { return function (dispatch) {
        var timeSession = Functions_1.Utils.getExpiresIn() * 1000;
        dispatch({ type: 'INTERVAL_SESSION', interval: setInterval(action, timeSession) });
    }; },
};
//# sourceMappingURL=AuthAction.js.map