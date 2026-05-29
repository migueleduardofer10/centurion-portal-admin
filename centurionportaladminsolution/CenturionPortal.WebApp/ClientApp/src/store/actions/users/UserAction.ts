import { AppThunkAction } from '../../index';
import * as AppAction from '../app/AppAction';
import * as Enums from '../../../utilities/Enums';
import * as UserCommon from '../../commons/UserCommon';
import { Auth, Utils, Notify, TreeViewUtils } from '../../../utilities/Functions';
import App from '../../../App';
import UserList from '../../../components/users/UserList';
import { filterBy, toDataSourceRequestString, FilterDescriptor, DataSourceRequestState } from '@progress/kendo-data-query';

const title = "Users";

interface FetchUsersPageAction {
    type: 'FETCHED_USERS_PAGE';
    usersPage: UserCommon.User[];
    dataState: any;
    columns: any[];
}

interface FetchUsersAllAction {
    type: 'FETCHED_USERS_ALL';
    usersAll: UserCommon.User[];
}

interface EnabledExportUsersAction {
    type: 'ENABLED_EXPORT_USERS';
    exportAll: boolean;
}

interface DisabledExportUserAction {
    type: 'DISABLED_EXPORT_USERS';
}

interface ChangeColumnsAction {
    type: 'CHANGED_COLUMNS';
    columns: any[];
}

interface ApplyChangedColumnsAction {
    type: 'APPLIED_COLUMNS';
    columns: any[];
}

interface CleanUserAction {
    type: 'CLEAN_USER';
}

interface FetchUserAction {
    type: 'FETCHED_USER';
    userTypes: any[];
    user: UserCommon.UserBody;
    loans: any[];
    permissions: UserCommon.Permission[];
}

interface ChangePermissionAction {
    type: 'CHANGED_PERMISSION';
    permissions: UserCommon.Permission[];
}

interface ChangeUserAction {
    type: 'CHANGED_USER';
    user: UserCommon.UserBody;
}

interface ChangePhotoAction {
    type: 'CHANGED_PHOTO';
    fileUrl: string;
    file: any;
}

interface ChangeFilterAction {
    type: 'CHANGED_FILTER';
    filter: string;
}

interface FetchLoansAction {
    type: 'FETCHED_LOANS';
    filteredLoans: any[];
}
interface LoansChargeddedEndAction {
    type: 'LOANS_CHARGEDDED_END';
}

interface CleanLoansAction {
    type: 'CLEANED_LOANS';
}

interface CleanLoansAssignedAction {
    type: 'CLEANED_LOANS_ASSIGNED';
}

interface LoadingFilterBeginAction {
    type: 'LOADING_FILTER_BEGIN';
}

interface LoadingFilterEndAction {
    type: 'LOADING_FILTER_END';
}

interface AddLoanAction {
    type: 'ADD_LOAN';
    loan: string;
}

interface RemoveLoanAction {
    type: 'REMOVE_LOAN';
    uid: string;
}

interface UploadPhotoAction {
    type: 'UPLOADED_PHOTO';
    idImage: string;
}

interface CreateUserAction {
    type: 'CREATED_USER';
    user: UserCommon.UserBody;
}

interface UpdateUserAction {
    type: 'UPDATED_USER';
    user: UserCommon.UserBody;
}

interface RedirectToUsersAction {
    type: 'REDIRECTED_TO_USERS';
}

interface DeleteUserAction {
    type: 'DELETED_USER';
}

interface LoginAsUserAction {
    type: 'LOGGED_IN_AS_USER';
    redirectUrl: string;
    isLoginAs: boolean;
    token: string;
}

export type KnownAction = AppAction.KnownAction | FetchUsersPageAction | FetchUsersAllAction | EnabledExportUsersAction | DisabledExportUserAction | ChangeColumnsAction |
    ApplyChangedColumnsAction | CleanUserAction | FetchUserAction | ChangeUserAction | ChangePhotoAction | UploadPhotoAction | LoadingFilterBeginAction | LoadingFilterEndAction |
    FetchLoansAction | LoansChargeddedEndAction | CleanLoansAction | CleanLoansAssignedAction | AddLoanAction | RemoveLoanAction | ChangeFilterAction |
    CreateUserAction | UpdateUserAction | RedirectToUsersAction | DeleteUserAction | LoginAsUserAction | ChangePermissionAction;

const processUsers = (users: UserCommon.User[]) => {
    return users.map((user: UserCommon.User) => {
        user.UserTypeDesc = Enums.UserTypeEnum[user.UserType];
        user.IsActiveStr = user.IsActive ? 'Yes' : 'No';
        user.LastAliveCheck = user.LastAliveCheck != null ?
            new Date(Date.parse(user.LastAliveCheck.toString())) : undefined;
        return user;
    });
};

const customColumns = [
    { renderLabel: "UserTypeDesc", label: "UserType", type: Enums.UserTypeEnum }
];


const extraFilters = (dataState: DataSourceRequestState,
    userName: string , lastName: string , firstName: string , status: string, userType: string
) => {
    let arr: FilterDescriptor[] = [];

    if (firstName.trim() != "") {
        arr.push({ field: 'FirstName', operator: 'contains', value: firstName })
    }
    if (lastName.trim() != "") {
        arr.push({ field: 'LastName', operator: 'contains', value: lastName })
    }
    if (userName.trim() != "") {
        arr.push({ field: 'UserName', operator: 'contains', value: userName })
    }
    if (status.trim() != '' && status.trim() != "ALL") {
        arr.push({ field: 'IsActive', operator: 'eq', value: status })
    }
    if (userType.trim() != '' && userType.trim() != "ALL") {
        arr.push({ field: 'UserType', operator: 'eq', value: userType })
    }
    if (arr.length != 0) {

        dataState = {
            ...dataState, filter: { logic: 'and', filters: arr }
        }
    }

    return dataState

}

export const actions = {
    fetchUsersPage: (dataState: any, getColumns: boolean, forced: boolean = false,
        userName: string = '', lastName: string = '', firstName: string = '', status: string = '', userType: string = ''
    ): AppThunkAction<KnownAction> => (dispatch, getState) => {

        //------------------------------------------------------------------------------------------------------------------------
        dataState = extraFilters(dataState, userName,lastName,firstName,status,userType)
        //------------------------------------------------------------------------------------------------------------------------
         
        const appState = getState();
        const gridProps = appState.users.gridProps;
        const fetched = appState.users.fetched;

        if (fetched && !forced && dataState.skip == gridProps.skip && dataState.take == gridProps.take &&
            dataState.sort == gridProps.sort && dataState.filter == gridProps.filter) return;

        dataState = { ...gridProps, ...Utils.getCustomData(dataState, customColumns) };

         


        dispatch({ type: 'LOADING' });

        fetch(`api/security/user/list/${getColumns}/?${toDataSourceRequestString(dataState)}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                dataState = Utils.getCustomData(dataState, customColumns, true);

                if (Utils.validateData(dispatch, data, title)) {
                    let columns = Utils.getColumns(appState.users.columns, data.ObjOptional.Columns);
                    dispatch({
                        type: 'FETCHED_USERS_PAGE',
                        usersPage: processUsers(data.ObjOptional.Result.Data),
                        dataState: { ...dataState, total: data.ObjOptional.Result.Total },
                        columns,
                    })
                }
            }, failed => {
                Utils.showError(dispatch, failed, title);
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    fetchUsersAll: (exportExcel: boolean = true,
        userName: string = '', lastName: string = '', firstName: string = '', status: string = '', userType: string = ''
   ): AppThunkAction<KnownAction> => (dispatch, getState) => {
 
        const appState = getState();
    
        let dataState = { ...appState.users.gridProps, take: 0 };

       console.log('dataState 1', dataState)

        //------------------------------------------------------------------------------------------------------------------------
        dataState = extraFilters(dataState, userName, lastName, firstName, status, userType) as any;
        //------------------------------------------------------------------------------------------------------------------------
       console.log('dataState 2', dataState)



        dispatch({ type: 'LOADING' });

        if (appState && appState.users && appState.users.fetchedAll) {
            if (exportExcel) dispatch({ type: 'ENABLED_EXPORT_USERS', exportAll: true })
        }
        else {
            //fetch('/api/security/user/list/All', {
            fetch(`api/security/user/list/false?${toDataSourceRequestString(dataState)}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: any) => {
                    if (Utils.validateData(dispatch, data, title)) {
                        dispatch({ type: 'FETCHED_USERS_ALL', usersAll: processUsers(data.ObjOptional.Result.Data) });
                        dispatch({ type: 'ENABLED_EXPORT_USERS', exportAll: true });
                    }
                }, failed => {
                    Utils.showError(dispatch, failed, title);
                }).catch(error => {
                    Utils.showError(dispatch, error, title);
                });
        }
    },

    enabledExport: (paramExportAll: boolean = false): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'ENABLED_EXPORT_USERS', exportAll: paramExportAll });
    },

    disabledExport: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'DISABLED_EXPORT_USERS' })
    },

    sortColumn: (field: string, move: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.users.columns;

        if (field !== '' && (move === 1 || move === -1)) {
            let oldPosition = columns.filter((column: any) => column.columnName === field)[0].position;
            let newPosition = oldPosition + move;

            if (newPosition >= 1 && newPosition <= columns.length) {
                let otherField = columns.filter((column: any) => column.position === newPosition)[0].columnName;

                let newColumns = columns.map(column => {
                    if (column.columnName === field) column.position = newPosition;
                    if (column.columnName === otherField) column.position = oldPosition;
                    return column;
                }).sort(Utils.compareColumn);

                dispatch({ type: 'CHANGED_COLUMNS', columns: newColumns });
            }
        }
    },

    toggleColumn: (field: string, checked: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.users.columns;

        let newColumns = columns.map(column => {
            if (column.columnName === field) column.checked = checked;
            return column;
        }).sort(Utils.compareColumn);

        dispatch({ type: 'CHANGED_COLUMNS', columns: newColumns });
    },

    toggleAllColumns: (checked: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.users.columns;

        let newColumns = columns.map(column => {
            column.checked = checked;
            return column;
        }).sort(Utils.compareColumn);

        dispatch({ type: 'CHANGED_COLUMNS', columns: newColumns });
    },

    revertColumns: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const realColumns = appState.users.realColumns;
        dispatch({ type: 'CHANGED_COLUMNS', columns: JSON.parse(JSON.stringify(realColumns)) });
    },

    applyChangedColumns: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const columns = appState.users.columns;

        dispatch({ type: 'LOADING' });

        fetch('/api/grid/' + Number(Enums.GridEntityTypeEnum.ELS_USER), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            },
            body: JSON.stringify(columns)
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    Notify.success(data.message, "Users");
                    dispatch({ type: 'APPLIED_COLUMNS', columns: columns });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    fetchUser: (uid: string): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'CLEAN_USER' });
        dispatch({ type: 'LOADING' });

        fetch(`/api/security/user/edit/${uid ? uid : ""}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    let userTypes = Enums.EnumToArray(Enums.UserTypeEnum);
                    let loans = data.ObjOptional.User.AccountAssigneds != null ? data.ObjOptional.User.AccountAssigneds : [];
                    let permissions = TreeViewUtils.updateCheckedItems(TreeViewUtils.createFromArray(data.ObjOptional.User.PermissionsWeb));
                    let user = { ...UserCommon.newUserBody, ...data.ObjOptional.User, Password: '', RePassword: '' };

                    dispatch({
                        type: 'FETCHED_USER',
                        userTypes,
                        user,
                        loans,
                        permissions
                    });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    changePermission: (uid: string, checked: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let permissions = appState.users.permissions;
        let permission = TreeViewUtils.getItemByUid(uid, appState.users.permissions);

        if (permission) {
            permission.checked = checked;
            permission.items = TreeViewUtils.checkChildrenItems(permission.items, checked);

            permissions = permissions.map((item: any) => (item.uid == uid) ? permission : item);
            permissions = TreeViewUtils.updateCheckedItems(permissions);

            dispatch({ type: 'CHANGED_PERMISSION', permissions });
        }
    },

    changeUser: (name: string, value: any): AppThunkAction<KnownAction> => (dispatch, getSate) => {
        const appState = getSate();

        let user = appState.users.user;
        user = { ...user, [name]: value };

        dispatch({ type: 'CHANGED_USER', user })
    },

    changePhoto: (url: string, file: any, token: string): AppThunkAction<KnownAction> => (dispatch, getSate) => {
        dispatch({ type: 'CHANGED_PHOTO', fileUrl: url, file: file });

        const appState = getSate();

        let user = appState.users.user;
        let titleForm = user.Uid !== '' ? 'Edit User' : 'Create User';
        let data = new FormData();
        data.append('file', file);

        fetch('/api/upload/images/' + appState.users.idImage, {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': token,
                'Authorization': `Bearer ${Auth.getJWT()}`
            },
            body: data
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, titleForm)) {
                    Notify.success(data.message, titleForm);
                    dispatch({ type: 'UPLOADED_PHOTO', idImage: data.ObjOptional })
                }
            }).catch(error => {
                Utils.showError(dispatch, error, titleForm);
            });
    },

    fetchLoans: (filter: string, type: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'CHANGED_FILTER', filter });
        let titleLoan = "Filter Accounts";

        if (filter.length > 2) {
            dispatch({ type: 'LOADING_FILTER_BEGIN' });

            const appState = getState();
            let loansUidExclude = appState.users.assignedLoans
                .map(loan => loan.ParentUid).join('|');

            fetch('/api/security/user/accounts/' + filter + '/' + type + '/' + loansUidExclude, {
                headers: {
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: any) => {
                   
                    if (Utils.validateData(dispatch, data, titleLoan)) {
                        dispatch({ type: 'FETCHED_LOANS', filteredLoans: data.ObjOptional });
                    }
                }).catch(error => {
                    dispatch({ type: 'LOADING_FILTER_END' });
                    Utils.validateData(dispatch, error, titleLoan);
                });
        } else {
            dispatch({ type: 'CLEANED_LOANS' });
        }
    },

    cleanLoansAssigned: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'CLEANED_LOANS_ASSIGNED' });
    },

    loansChargeddedEnd: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'LOANS_CHARGEDDED_END' });
    },

    addLoan: (filter: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let loan = appState.users.filteredLoans.filter(loan => loan.ParentUid === filter)[0];
        dispatch({ type: 'ADD_LOAN', loan });
        //dispatch({ type: 'CLEANED_LOANS' });
    },

    removeLoan: (uid: string): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'REMOVE_LOAN', uid });
    },

    saveUser: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        let user = appState.users.user;
        user.UserType = Number(user.UserType);
        user.Photo = appState.users.idImage;

        let isValid = false;
        let titleSave = user.Uid !== '' ? 'Edit User' : 'Create User';

        if (user.Username.trim() == '')
            Notify.warning("Username is required", titleSave);
        else if (user.Email.trim() == '')
            Notify.warning("Email is required", titleSave);
        else if (user.FirstName.trim() == '')
            Notify.warning("FirstName is required", titleSave);
        else if (user.LastName.trim() == '')
            Notify.warning("LastName is required", titleSave);
        else if (user.UserType == -1)
            Notify.warning("UserType is required", titleSave);
        else if (user.Uid === '' && (!user.Password || user.Password.trim() == ''))
            Notify.warning("Password is required", titleSave);
        else if (user.Uid === '' && (!user.RePassword || user.RePassword.trim() == ''))
            Notify.warning("Re-Password is required", titleSave);
        else if (user.Password != '' && (!user.RePassword || user.RePassword.trim() == ''))
            Notify.warning("Re-Password is required", titleSave);
        else if (user.RePassword != '' && (!user.Password || user.Password.trim() == ''))
            Notify.warning("Password is required", titleSave);
        else
            isValid = true;

        if (!isValid) return;

        dispatch({ type: 'LOADING' });

        let mapUids = appState.users.assignedLoans
            .map(loan => loan.ParentUid).join('|');

        if (user.UserType == Enums.UserTypeEnum.ADMIN)
            user.StrPermissions = TreeViewUtils.getCheckedBits(appState.users.permissions).join(",");

        fetch('/api/security/user/save/' + mapUids, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, titleSave)) {
                    Notify.success(data.Message, titleSave);

                    user.UserTypeDesc = Enums.UserTypeEnum[user.UserType];
                    user.IsActiveStr = user.IsActive ? 'Yes' : 'No';
                    user.LastAliveCheck = user.LastAliveCheck != null ?
                        new Date(Date.parse(user.LastAliveCheck.toString())) : undefined;

                    dispatch({
                        type: user.Uid !== '' ? 'UPDATED_USER' : 'CREATED_USER',
                        user: { ...user, UserTypeDesc: Enums.UserTypeEnum[user.UserType] }
                    });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, titleSave);
            });
    },

    redirectedUsers: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'REDIRECTED_TO_USERS' });
    },

    deleteUser: (uid: string): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'LOADING' });

        let titleDelete = "Delete User";

        fetch('/api/security/user/delete/' + uid, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, titleDelete)) {
                    Notify.success(data.message, titleDelete);
                    dispatch({ type: 'DELETED_USER' })
                }
            }).catch(error => {
                Utils.validateData(dispatch, error, titleDelete);
            });
    },

    loginAs: (username: string, usertype: number): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'LOADING' });

        let titleLoginAs = "Login as User";
        let data = {
            AdminUsername: Auth.getELSUser().Username,
            Username: username,
            UserType: usertype
        }

        fetch(`/api/security/user/loginAs`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, titleLoginAs)) {
                    dispatch({
                        type: 'LOGGED_IN_AS_USER',
                        isLoginAs: true,
                        token: data.ObjOptional.token,
                        redirectUrl: data.ObjOptional.redirectUrl
                    });
                }
            }).catch(error => {
                Utils.showError(dispatch, error, titleLoginAs);
            });
    },

    redirectedLoginAs: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({
            type: 'LOGGED_IN_AS_USER',
            isLoginAs: false,
            token: "",
            redirectUrl: ""
        });
    }
}