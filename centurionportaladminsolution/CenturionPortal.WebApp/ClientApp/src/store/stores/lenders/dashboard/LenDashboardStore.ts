import { Action, Reducer } from 'redux';
import * as LenDashboardAction from '../../../actions/lenders/dashboard/LenDashboardAction';

export const actions = LenDashboardAction.actions;

export interface State {
    loading: boolean;
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
    if (state === undefined) {
        return {
            loading: false
        };
    }

    const action = incomingAction as LenDashboardAction.KnownAction;
    switch (action.type) {
        default: return state;
    }
};