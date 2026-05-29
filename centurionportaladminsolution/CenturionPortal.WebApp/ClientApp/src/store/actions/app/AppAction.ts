  interface AppLoadingAction {
    type: 'LOADING';
}

  interface AppLoadedAction {
    type: 'LOADED';
}

interface BackDropAction {
    type: 'BACK_DROP';
    active: boolean;
}

export type KnownAction = AppLoadingAction | AppLoadedAction | BackDropAction;