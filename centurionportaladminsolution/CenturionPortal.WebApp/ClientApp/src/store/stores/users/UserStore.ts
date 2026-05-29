import { Action, Reducer } from 'redux';
import * as AppCommon from '../../commons/AppCommon';
import * as UserCommon from '../../commons/UserCommon';
import * as UserAction from '../../actions/users/UserAction';

export const actions = UserAction.actions;

export interface State {
    redirect: boolean;
    fetched: boolean;
    fetchedAll: boolean;
    userTypes: any[];
    usersPage: UserCommon.User[];
    usersAll: UserCommon.User[];
    gridProps: AppCommon.GridProps;
    exportAll: boolean;
    export: boolean;
    user: UserCommon.UserBody;
    realColumns: any[];
    columns: any[];
    idImage: string;
    fileUrl: string;
    file: any;
    filter: string;
    uidsLoans: any[],
    LoansChargedded: boolean;
    filteredLoans: any[];
    assignedLoans: any[];
    loadingFilter: boolean;
    isLoginAs: boolean;
    token: string;
    redirectUrl: string;
    permissions: UserCommon.Permission[]
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
    if (state === undefined) {
        return {
            redirect: false,
            fetched: false,
            fetchedAll: false,
            userTypes: [],
            usersPage: [],
            usersAll: [],
            exportAll: false,
            export: false,
            user: UserCommon.newUserBody,
            realColumns: UserCommon.initialColumns,
            columns: UserCommon.initialColumns,
            gridProps: AppCommon.newGridProps,
            idImage: '',
            fileUrl: '',
            file: null,
            filter: '',
            uidsLoans: [],
            LoansChargedded: false,
            filteredLoans: [],
            assignedLoans: [],
            loadingFilter: false,
            isLoginAs: false,
            token: '',
            redirectUrl: '',
            permissions: []
        };
    }

    const action = incomingAction as UserAction.KnownAction;
    switch (action.type) {
        case 'FETCHED_USERS_PAGE':
            return {
                ...state,
                fetched: false,
                fetchedAll: false,
                redirect: false,
                userTypes: [],
                usersPage: action.usersPage,
                gridProps: action.dataState,
                realColumns: JSON.parse(JSON.stringify(action.columns)),
                columns: action.columns,
            };
        case 'FETCHED_USERS_ALL':
            return {
                ...state,
                fetchedAll: true,
                usersAll: action.usersAll
            };
        case 'ENABLED_EXPORT_USERS':
            return {
                ...state,
                exportAll: action.exportAll,
                export: true
            };
        case 'DISABLED_EXPORT_USERS':
            return {
                ...state,
                export: false,
            };
        case 'CHANGED_COLUMNS':
            return {
                ...state,
                columns: action.columns,
            };
        case 'APPLIED_COLUMNS':
            return {
                ...state,
                realColumns: action.columns,
                columns: action.columns
            };
        case 'CLEAN_USER':
            return {
                ...state,
                user: UserCommon.newUserBody,
                uidsLoans: [],
                assignedLoans: [],
            };
        case 'FETCHED_USER':
            return {
                ...state,
                userTypes: action.userTypes,
                user: action.user,
                uidsLoans: action.loans.map((loan: any) => loan.ParentUid),
                assignedLoans: action.loans,
                permissions: action.permissions
            };
        case 'CHANGED_PERMISSION':
            return {
                ...state,
                permissions: action.permissions
            };
        case 'CHANGED_USER':
            return {
                ...state,
                user: JSON.parse(JSON.stringify(action.user))
            };
        case 'CHANGED_PHOTO':
            return {
                ...state,
                fileUrl: action.fileUrl,
                file: action.file
            };
        case 'UPLOADED_PHOTO':
            return {
                ...state,
                idImage: action.idImage,
                user: { ...state.user, Photo: action.idImage },
            };
        case 'CHANGED_FILTER':
            return {
                ...state,
                filter: action.filter
            };
        case 'LOADING_FILTER_BEGIN':
            return {
                ...state,
                loadingFilter: true
            };
        case 'LOADING_FILTER_END':
            return {
                ...state,
                loadingFilter: false
            }
        case 'FETCHED_LOANS':
            return {
                ...state,
                uidsLoans: action.filteredLoans.map((loan: any) => loan.ParentUid),
                filteredLoans: action.filteredLoans,
                loadingFilter: false,
                LoansChargedded: true
            };
        case 'LOANS_CHARGEDDED_END':
            return {
                ...state,
                LoansChargedded: false
            }
        case 'CLEANED_LOANS':
            return {
                ...state,
                uidsLoans: [],
                loadingFilter: false,
                LoansChargedded: true
            };
        case 'CLEANED_LOANS_ASSIGNED':
            return {
                ...state,
                assignedLoans: [],
            };
        case 'ADD_LOAN':
            return {
                ...state,
                filter: "",
                //filteredLoans: [],
                assignedLoans: [...state.assignedLoans, action.loan]
            };
        case 'REMOVE_LOAN':
            return {
                ...state,
                assignedLoans: state.assignedLoans.filter(loan => loan.ParentUid !== action.uid)
            };
        case 'CREATED_USER':
            return {
                ...state,
                redirect: true,
                userTypes: [],
                user: UserCommon.newUserBody,
                fileUrl: '',
                file: null
            };
        case 'UPDATED_USER':
            return {
                ...state,
                redirect: true,
                userTypes: [],
                usersPage: state.usersPage.map(item => {
                    return ((item.Uid === action.user.Uid) ? { ...item, ...action.user } : item);
                }),
                user: UserCommon.newUserBody,
                fileUrl: '',
                file: null
            };
        case 'REDIRECTED_TO_USERS':
            return {
                ...state,
                redirect: false,
            };
        case 'DELETED_USER':
            return {
                ...state,
                redirect: true
            };
        case 'LOGGED_IN_AS_USER':
            return {
                ...state,
                redirectUrl: action.redirectUrl,
                isLoginAs: action.isLoginAs,
                token: action.token
            };
        default: return state;
    }
};
