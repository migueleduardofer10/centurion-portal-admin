import { Action, Reducer } from 'redux';
import * as AppAction from '../../actions/app/AppAction';

export interface State {
    loading: boolean;
    backDrop: boolean;
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
    if (state === undefined) {
        return {
            loading: false,
            backDrop: false
        };
    }

    const action = incomingAction as AppAction.KnownAction;
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: true
            };
        case 'LOADED':
            return {
                ...state,
                loading: false
            };
        case 'BACK_DROP':
            return {
                ...state,
                backDrop: action.active
            };
        default: return state;
    }
};
