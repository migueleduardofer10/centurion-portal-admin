import * as toastr from 'toastr';
import * as Enums from './Enums';
import { ColumnConfiguration_Interface } from '../store/commons/LenderCommon2';


export const Fetch_POST = () => (
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Auth.getJWT()}`
        }
    }
)

export const Fetch_GET = () => (
    {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Auth.getJWT()}`
        }
    }
)


export const GlobalAnimation_Loading = () => ({ type: 'LOADING' })

export const GlobalAnimation_Loaded = () => ({ type: 'LOADED' })

const createCookie = (name: string, value: string, seconds: number) => {
    var expires;
    var date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
};

const readCookie = (name: string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};

export const Auth = {
    setELSUser: (data: any) => {
        let userLogin = JSON.parse(data.User);

        let fullName = (userLogin.FirstName + ' ' + userLogin.LastName).trim();
        fullName = fullName === '' ? userLogin.Username : fullName;

        let firstName = userLogin.FirstName.trim();
        firstName = firstName === '' ? userLogin.Username : firstName;

        userLogin = {
            ...userLogin,
            FirstNamePage: firstName,
            FullName: fullName,
            Version: data.Version,
            Token: data.Token,
            ExpiresIn: data.ExpiresIn
        };

        createCookie("ELSAdmUserLogin", JSON.stringify(userLogin), data.ExpiresIn);
    },

    getELSUser: () => {
        let stringUserLogin = readCookie("ELSAdmUserLogin");
        if (stringUserLogin == null) return null;
        return JSON.parse(stringUserLogin);
    },

    destroyELSUser: () => {
        createCookie("ELSAdmUserLogin", "", -1);
    },

    destroyOldCookies: () => {
        createCookie("ELSLenTokenLogin", "", -1);
        createCookie("AssemblyVersion", "", -1);
        createCookie("XSRF_TOKEN", "", -1);
    },

    getJWT: () => {
        let userLogin = Auth.getELSUser();

        if (userLogin === null)
            window.parent.location.reload();

        return userLogin === null ? null : userLogin.Token;
    }
};


const timeToDismiss = 5000;
toastr.options.escapeHtml = true;
toastr.options.closeButton = true;
toastr.options.newestOnTop = false;
toastr.options.positionClass = "toast-bottom-right";

export const Notify = {
    setOptions: (dismiss: boolean) => {
        toastr.options.timeOut = dismiss ? timeToDismiss : 0;
        toastr.options.extendedTimeOut = dismiss ? timeToDismiss : 0;
    },
    success: (message: string, title?: string, dismiss: boolean = true) => {
        Notify.setOptions(dismiss);
        toastr.success(message, title)
    },
    warning: (message: string, title?: string, dismiss: boolean = true) => {
        Notify.setOptions(dismiss);
        toastr.warning(message, title)
    },
    error: (message: string, title?: string, dismiss: boolean = true) => {
        Notify.setOptions(dismiss);
        toastr.error(message, title)
    },
    info: (message: string, title?: string, dismiss: boolean = true) => {
        Notify.setOptions(dismiss);
        toastr.info(message, title)
    }
};


export const Utils = {
    getVersion: () => {
        let userLogin = Auth.getELSUser();
        if (userLogin != null)

            if (userLogin === null)
                window.parent.location.reload();

        return userLogin === null ? null : userLogin.Version;
    },

    getExpiresIn: () => {
        let userLogin = Auth.getELSUser();

        if (userLogin === null)
            window.parent.location.reload();

        return userLogin === null ? 1800 : userLogin.ExpiresIn;
    },

    homeUrl: () => {
        let userLogin = Auth.getELSUser();
        if (userLogin == null) return '/login';
        return userLogin.UserType === Enums.UserTypeEnum.LENDER ? "/dashboard" : "/users";
    },

    validateDataNotDismiss: (dispatch: any, data: any, title: string, loaded: boolean = true) => {
        return Utils.validateData(dispatch, data, title, loaded, false);
    },

    validateData: (dispatch: any, data: any, title: string, loaded: boolean = true, dismiss: boolean = true) => {
        if (loaded === true || !data.IsSuccess)
            dispatch({ type: 'LOADED' });

        if (data.IsSuccess) return true;

        if (data.TypeMessage == Enums.EnumTypeMessage.WARNING)
            Notify.warning(data.Message, title, dismiss);
        else
            Notify.error(data.Message, title, dismiss);

        return false;
    },

    validateErrorValue: (dispatch: any, data: any, title: string, loaded: boolean = true, dismiss: boolean = true) => {
        if (loaded === true || !data.IsSuccess)
            dispatch({ type: 'LOADED' });

        if (data.IsSuccess || data.errors === null || data.errors === undefined || data.errors.length === 0) return true;

        if (data.errors != null) {
            let message: string = '';
            Object.getOwnPropertyNames(data.errors).map((error: any) => {
                message += (message !== '' ? ', ' : '') + data.errors[error][0];
            });

            Notify.warning(message, title, dismiss);
        } else if (data.TypeMessage && data.Message && data.TypeMessage == Enums.EnumTypeMessage.WARNING)
            Notify.warning(data.Message, title, dismiss);
        else
            Notify.error(data.Message, title, dismiss);

        return false;
    },

    showError: (dispatch: any, error: any, title: string, ignoreLoaded: boolean = false) => {
        console.log(title + ' - error', error);
        if (!ignoreLoaded) dispatch({ type: 'LOADED' });
        Notify.error("An error has ocurred", title);
    },

    getSummary: (aggregates: any[]) => {
        let summary = {};

        if (aggregates != null) {
            aggregates.map((aggregate: any) => {
                summary = { ...summary, [aggregate.Member]: aggregate.Value };
            });
        }

        return summary;
    },

    sum: (array: any[], key: string) => {
        if (array != null && array.length > 0) {
            return array.reduce((a, b) => a + (b[key] || 0), 0);
        }
        else return 0
    },

    compareColumn: (a: any, b: any) => {
        const bandA = a.Position;
        const bandB = b.Position;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }

        return comparison;
    },

    getComparion: (key: string, order: string = 'asc') => {
        return (a: any, b: any) => {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
                return 0;

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }

            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        }
    },

    getColumns: (oldColumns: any[], newColumns: any[]) => {
        if (!newColumns || newColumns.length === 0) return oldColumns;

        return oldColumns.map(oldColumn => {
            let newColumn = newColumns.filter((column: any) => column.ColumnName === oldColumn.ColumnName)[0];
            return newColumn ? { ...oldColumn, Position: newColumn.Position, Checked: newColumn.Checked } : oldColumn;
        }).sort(Utils.compareColumn);
    },

    getColumns2: (oldColumns: ColumnConfiguration_Interface[], newColumns: ColumnConfiguration_Interface[]) => {
        try {


            if (!newColumns || newColumns.length === 0) {

                return oldColumns;
            }

            oldColumns.forEach(x => {
                let obj = newColumns.filter(y => y.ColumnName == x.ColumnName)[0]
                if (obj) {
                    x.Checked = obj.Checked
                    x.Position = obj.Position
                }
            })

            return oldColumns.sort(Utils.compareColumn)
            //return oldColumns.map(oldColumn => {
            //    let newColumn = newColumns.filter((column) => column.ColumnName === oldColumn.ColumnName)[0];
            //    return newColumn ? { ...oldColumn, position: newColumn.Position, checked: newColumn.Checked } : oldColumn;
            //}).sort(Utils.compareColumn);
        } catch (e) {
            console.log("error", e)
        }
    },

    getActiveColumn: (columns: any[]) => {
        let firstColumn = columns.filter(column => column.Position == 1)[0];
        return firstColumn ? firstColumn.ColumnName : "";
    },

    validateNumber: (value: any) => {
        if (!isNaN(Number(value)))
            return value;

        return value.slice(0, value.length - 1);
    },

    validateDecimal: (value: any) => {
        if (value == '.' || !isNaN(Number(value)))
            return value;

        return value.slice(0, value.length - 1);
    },

    numberFormat: (value: any, format: string) => {
        if (format == '{0:c}')
            return Utils.currencyFormat(value);
        else if (format == '{0:d}')
            return Utils.decimalFormat(value);
        else if (format == '{0:p2}')
            return Utils.percentFormat(value);
        else
            return '';
    },

    percentFormat: (value: any) => {
        let props: object = {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };

        return isNaN(Number(value)) ? '' :
            (new Intl.NumberFormat('en-US', props)).format(Number(value));
    },

    decimalFormat: (value: any) => {
        let props: object = {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };

        return isNaN(Number(value)) ? '' :
            (new Intl.NumberFormat('en-US', props)).format(Number(value));
    },

    currencyFormat: (value: any) => {
        let props: object = {
            style: 'currency',
            currency: 'USD'
        };

        return isNaN(Number(value)) ? '' :
            (new Intl.NumberFormat('en-US', props)).format(Number(value));
    },

    getValueEnum: (type: any, value: number, replaceGuionForSpace: boolean = true) => {
        var item = Enums.EnumToArray(type, replaceGuionForSpace).filter((item: any) => item.value == value)[0];
        return item ? item.label : "";
    },

    getKeyEnum: (type: any, label: string, replaceGuionForSpace: boolean = true) => {
        var key: any = undefined;
        Enums.EnumToArray(type, replaceGuionForSpace).map((item: any) => {
            if (item.label.toLowerCase() === label.toLowerCase()) {
                key = item.value;
            }
        });
        return key !== undefined ? key : -1;
    },

    getEnumByLabel: (type: any, label: string) => {
        if (!type || !label) return "";

        let item = Enums.EnumToArray(type).filter(
            (item: any) => item.label && item.label.toString().toLowerCase() == label.toString().toLowerCase()
        )[0];

        return item ? (item.value != null && item.value != undefined ? item.value : "") : "";
    },

    getCustomData: (data: any, columns: any[], revert: boolean = false) => {
        if (!data || !columns || columns.length == 0)
            return data;

        let newData = JSON.parse(JSON.stringify(data));
        let newFilters = (newData.filter) ? Utils.getCustomFilters(newData.filter.filters, columns, revert) : [];
        let newSort = Utils.getCustomSort(newData.sort, columns, revert);

        if (newFilters.length == 0)
            newData.filter = undefined;
        else
            newData.filter.filters = newFilters;

        newData.sort = newSort;

        return newData;
    },

    getCustomFilters: (filters: any[], columns: any[], revert: boolean = false) => {
        if (!filters || filters.length == 0 || !columns || columns.length == 0)
            return [];

        let newFilters = JSON.parse(JSON.stringify(filters));

        return newFilters.map((item: any) => {
            if (item.field !== undefined) {
                let column = columns.filter((column: any) =>
                    revert ? (item.field == column.label) : (item.field == column.renderLabel)
                )[0];

                if (column !== undefined) {
                    item.field = revert ? column.renderLabel : column.label;
                    item.value = (column.type === undefined) ? item.value : (
                        revert ? Utils.getValueEnum(column.type, item.value) :
                            Utils.getEnumByLabel(column.type, item.value)
                    );
                }
            } else if (item.filters !== undefined) {
                item.filters = Utils.getCustomFilters(item.filters, columns, revert);
            }

            return item;
        });
    },

    getCustomSort: (sort: any[], columns: any[], revert: boolean = false) => {
        if (!sort || sort.length == 0 || !columns || columns.length == 0)
            return [];

        let newSort = JSON.parse(JSON.stringify(sort));

        return newSort.map((item: any) => {
            let column = columns.filter((column: any) =>
                revert ? (item.field == column.label) : (item.field == column.renderLabel)
            )[0];

            if (column !== undefined)
                item.field = revert ? column.renderLabel : column.label;

            return item;
        });
    },

    nullToEmptyString: (value?: string) => {
        return value && value !== null ? value : "";
    },

    nullToValidNumber: (value?: number) => {
        return value && value !== null ? value : 0;
    },

    padLeft: (num?: number, padlen?: number, padchar?: string) => {
        if (!num) return "";
        var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
        var pad = new Array(1 + padlen!).join(pad_char!);
        return (pad + num).slice(-pad.length);
    },

    padRight: (num?: number, padlen?: number, padchar?: string) => {
        if (!num) return "";
        var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
        var pad = new Array(1 + padlen!).join(pad_char!);
        return (num + pad).substring(0, pad.length);
    },

    getCurrentPage: (props: any) => {
        if (props.skip === undefined) return 0;
        if (props.take === undefined) return 0;
        if (props.take == 0) return 0;

        return ((props.skip / props.take) + 1);
    },

    getTotalPages: (props: any) => {
        if (props.total === undefined) return 0;
        if (props.take === undefined) return 0;
        if (props.take == 0) return 0;

        return Math.floor(props.total / props.take);
    },

    getCurrentDate: () => {
        return new Intl.DateTimeFormat("en-US", {
            year: 'numeric', month: '2-digit', day: '2-digit'
        }).format(new Date());
    }
}

export const TreeViewUtils = {
    createFromArray: (data: any[], parent?: any): any[] => {
        let tree: any[] = [];
        let items: any[] = (
            !parent ? data.filter((item: any) => item.ParentUid == '' || item.ParentUid == null) :
                data.filter((item: any) => item.ParentUid != '' && item.ParentUid != null && item.ParentUid == parent.Uid)
        ).sort(Utils.getComparion("Bit"));

        items.map((permission: any, index: number) => {
            tree.push({
                bit: permission.Bit,
                uid: permission.Uid,
                text: permission.Description,
                items: permission.HasChildren ? TreeViewUtils.createFromArray(data, permission) : [],
                expanded: !parent && index == 0,
                checked: permission.IsGranted
            });
        });

        return tree;
    },

    updateCheckedItems: (data: any[]): any[] => {
        return data.map((permission: any) => {
            if (permission.items.length == 0)
                return permission;

            let allItems = TreeViewUtils.updateCheckedItems(permission.items);
            let checkedItems = permission.items.filter((item: any) => item.checked);

            permission.items = allItems;
            permission.checked = (checkedItems.length == allItems.length);

            return permission;
        });
    },

    checkChildrenItems: (data: any[], checked: boolean): any[] => {
        return data.map((permission: any) => {
            permission.checked = checked;
            permission.indeterminate = false;
            permission.items = TreeViewUtils.checkChildrenItems(permission.items, checked);
            return permission;
        });
    },

    getItemByUid: (uid: string, data: any[]): any => {
        let permission = data.filter((item: any) => item.uid == uid)[0];
        if (permission) return permission;

        let itemsWithChildren = data.filter((item: any) => item.items.length > 0);
        if (itemsWithChildren.length == 0) return undefined;

        return data.map((permission: any) => {
            return TreeViewUtils.getItemByUid(uid, permission.items);
        }).filter((item: any) => item !== undefined)[0];
    },

    getCheckedBits: (data: any[]): number[] => {
        let checkedBits = data.filter((item: any) => item.checked).map((item: any) => item.bit);

        data.map((item: any) => {
            checkedBits = [...checkedBits, ...TreeViewUtils.getCheckedBits(item.items)]
        });

        return checkedBits;
    }
}