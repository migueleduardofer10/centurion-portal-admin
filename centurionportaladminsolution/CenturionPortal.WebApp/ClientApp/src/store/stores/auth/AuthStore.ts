import { Action, Reducer } from 'redux';
import { Auth } from '../../../utilities/Functions'
import * as AuthCommon from './../../commons/AuthCommon';
import * as AuthAction from '../../actions/auth/AuthAction';

export const actions = AuthAction.actions;

export interface State {
    body: AuthCommon.AuthBody;
    isLoggedin: boolean;
    isResetCaptcha: boolean;
    isValidCaptcha: boolean;
    responseCaptcha: string;
    recaptchaSiteKey: string;
    interval?: any;
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
    if (state === undefined) {
        return {
            body: AuthCommon.newAuthBody,
            isLoggedin: Auth.getELSUser() !== null,
            isResetCaptcha: false,
            isValidCaptcha: false,
            recaptchaSiteKey: '',
            responseCaptcha: ''
        };
    }

    const action = incomingAction as AuthAction.KnownAction;
    switch (action.type) {
        case 'INITIALIZE_LOGIN':
            return {
                body: AuthCommon.newAuthBody,
                isLoggedin: Auth.getELSUser() !== null,
                isResetCaptcha: false,
                isValidCaptcha: false,
                responseCaptcha: '',
                recaptchaSiteKey: '',
                interval: undefined
            };
        case 'SET_RECAPTCHA_SITEKEY_LOGIN':
            return {
                ...state,
                recaptchaSiteKey: action.recaptchaSiteKey
            };
        case 'CHANGED_DATA':
            return {
                ...state,
                body: action.data
            };
        case 'RESET_CAPTCHA_LOGIN':
            return {
                ...state,
                isResetCaptcha: action.isReset
            };
        case 'VALIDATE_CAPTCHA_LOGIN':
            return {
                ...state,
                responseCaptcha: action.response,
                isValidCaptcha: action.isValid
            };
        case 'LOGGED_IN':
            return {
                ...state,
                isLoggedin: true,
                body: AuthCommon.newAuthBody
            };
        case 'LOGGED_OUT':
            return {
                ...state,
                isLoggedin: false,
                body: AuthCommon.newAuthBody
            };
        case 'CLEAR_INTERVAL':
            return {
                ...state,
                interval: undefined
            };
        case 'INTERVAL_SESSION':
            return {
                ...state,
                interval: action.interval
            };
        default: return state;
    }
};
