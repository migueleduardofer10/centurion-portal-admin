import { AppThunkAction } from '../../index';
import * as AppAction from '../app/AppAction';
import * as AuthCommon from '../../commons/AuthCommon';
import { Auth, Utils, Notify } from '../../../utilities/Functions';

const titleSignin = "Sign in";
const titleSignout = "Sign out";

interface InitializeLoginAction {
    type: 'INITIALIZE_LOGIN';
}

interface SetRecaptchaSiteKeyAction {
    type: 'SET_RECAPTCHA_SITEKEY_LOGIN';
    recaptchaSiteKey: string;
}

interface ChangeDataAction {
    type: 'CHANGED_DATA';
    data: AuthCommon.AuthBody;
}

interface ResetCaptchaAction {
    type: 'RESET_CAPTCHA_LOGIN';
    isReset: boolean;
}

interface ValidateCaptchaAction {
    type: 'VALIDATE_CAPTCHA_LOGIN';
    response: string;
    isValid: boolean;
}

interface LoginAction {
    type: 'LOGGED_IN';
}

interface LogoutAction {
    type: 'LOGGED_OUT';
}

interface ClearIntervalAction {
    type: 'CLEAR_INTERVAL';
}

interface IntervalSessionAction {
    type: 'INTERVAL_SESSION';
    interval: any;
}

export type KnownAction = AppAction.KnownAction | InitializeLoginAction | ChangeDataAction | ResetCaptchaAction | ValidateCaptchaAction |
    LoginAction | LogoutAction | ClearIntervalAction | IntervalSessionAction | SetRecaptchaSiteKeyAction;

export const actions = {
    initializeLogin: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        clearInterval(appState.auth.interval);
        dispatch({ type: 'INITIALIZE_LOGIN' });

        fetch('/api/auth/recaptcha', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, "Recaptcha Site Key"))
                    dispatch({ type: 'SET_RECAPTCHA_SITEKEY_LOGIN', recaptchaSiteKey: data.ObjOptional });
            }).catch(error => {
                Utils.showError(dispatch, error, "Recaptcha Site Key");
            });
    },

    changeData: (name: string, value: any): AppThunkAction<KnownAction> => (dispatch, getSate) => {
        const appState = getSate();

        let data = appState.auth.body;
        data = { ...data, [name]: value };

        dispatch({ type: 'CHANGED_DATA', data })
    },

    resetedCaptcha: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'RESET_CAPTCHA_LOGIN', isReset: false });
    },

    validateCaptcha: (response: string, isValid: boolean): AppThunkAction<KnownAction> => (dispatch) => {       
        dispatch({ type: 'VALIDATE_CAPTCHA_LOGIN', response, isValid });
    },

    login: (responseCaptcha: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let data = appState.auth.body;
        let isValid = false;       
       
        if (data.Username.trim() == '')
            Notify.warning("Username is required", titleSignin);
        else if (data.Password.trim() == '')
            Notify.warning("Password is required", titleSignin);
        else if (!appState.auth.isValidCaptcha)
            Notify.warning("Captcha is invalid", titleSignin);
        else
            isValid = true;

       
        if (!isValid) return;

        dispatch({ type: 'LOADING' });

        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                ,
                'G-Recaptcha-Response': responseCaptcha
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((data: any) => {

              
                if (Utils.validateData(dispatch, data, titleSignin, false)) {
                    Auth.setELSUser(data.ObjOptional);
                    dispatch({ type: 'LOGGED_IN' });
                } else {
                    dispatch({ type: 'VALIDATE_CAPTCHA_LOGIN', response: '', isValid: false });
                    dispatch({ type: 'RESET_CAPTCHA_LOGIN', isReset: true });
                }

               

            }).catch(error => {
                Utils.showError(dispatch, error, titleSignin);
                dispatch({ type: 'VALIDATE_CAPTCHA_LOGIN', response: '', isValid: false });
                dispatch({ type: 'RESET_CAPTCHA_LOGIN', isReset: true });
            });
    },

    signOut: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        dispatch({ type: 'LOADING' });

        fetch('/api/auth/logout').then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, titleSignout)) {
                    Auth.destroyELSUser();
                    clearInterval(appState.auth.interval);
                    dispatch({ type: 'LOGGED_OUT' });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, titleSignout);
            });
    },

    refreshToken: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        fetch('/api/auth/refresh/token')
            .then(res => res.json())
            .then((data: any) => {
                if (!data.ObjOptional) {
                    Auth.destroyELSUser();
                    clearInterval(appState.auth.interval);
                    Notify.warning(data.Message, titleSignout);
                    dispatch({ type: 'LOGGED_OUT' });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, titleSignout);
            });
    },

    clearInterval: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        clearInterval(appState.auth.interval);
        dispatch({ type: 'CLEAR_INTERVAL' });
    },

    intervalSession: (action: Function): AppThunkAction<KnownAction> => (dispatch) => {
        let timeSession = Utils.getExpiresIn() * 1000;
        dispatch({ type: 'INTERVAL_SESSION', interval: setInterval(action, timeSession) });
    },
};