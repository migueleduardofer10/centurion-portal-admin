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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeViewUtils = exports.Utils = exports.Notify = exports.Auth = exports.GlobalAnimation_Loaded = exports.GlobalAnimation_Loading = exports.Fetch_GET = exports.Fetch_POST = void 0;
var toastr = require("toastr");
var Enums = require("./Enums");
exports.Fetch_POST = function () { return ({
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + exports.Auth.getJWT()
    }
}); };
exports.Fetch_GET = function () { return ({
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + exports.Auth.getJWT()
    }
}); };
exports.GlobalAnimation_Loading = function () { return ({ type: 'LOADING' }); };
exports.GlobalAnimation_Loaded = function () { return ({ type: 'LOADED' }); };
var createCookie = function (name, value, seconds) {
    var expires;
    var date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
};
var readCookie = function (name) {
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
exports.Auth = {
    setELSUser: function (data) {
        var userLogin = JSON.parse(data.User);
        var fullName = (userLogin.FirstName + ' ' + userLogin.LastName).trim();
        fullName = fullName === '' ? userLogin.Username : fullName;
        var firstName = userLogin.FirstName.trim();
        firstName = firstName === '' ? userLogin.Username : firstName;
        userLogin = __assign(__assign({}, userLogin), { FirstNamePage: firstName, FullName: fullName, Version: data.Version, Token: data.Token, ExpiresIn: data.ExpiresIn });
        createCookie("ELSAdmUserLogin", JSON.stringify(userLogin), data.ExpiresIn);
    },
    getELSUser: function () {
        var stringUserLogin = readCookie("ELSAdmUserLogin");
        if (stringUserLogin == null)
            return null;
        return JSON.parse(stringUserLogin);
    },
    destroyELSUser: function () {
        createCookie("ELSAdmUserLogin", "", -1);
    },
    destroyOldCookies: function () {
        createCookie("ELSLenTokenLogin", "", -1);
        createCookie("AssemblyVersion", "", -1);
        createCookie("XSRF_TOKEN", "", -1);
    },
    getJWT: function () {
        var userLogin = exports.Auth.getELSUser();
        if (userLogin === null)
            window.parent.location.reload();
        return userLogin === null ? null : userLogin.Token;
    }
};
var timeToDismiss = 5000;
toastr.options.escapeHtml = true;
toastr.options.closeButton = true;
toastr.options.newestOnTop = false;
toastr.options.positionClass = "toast-bottom-right";
exports.Notify = {
    setOptions: function (dismiss) {
        toastr.options.timeOut = dismiss ? timeToDismiss : 0;
        toastr.options.extendedTimeOut = dismiss ? timeToDismiss : 0;
    },
    success: function (message, title, dismiss) {
        if (dismiss === void 0) { dismiss = true; }
        exports.Notify.setOptions(dismiss);
        toastr.success(message, title);
    },
    warning: function (message, title, dismiss) {
        if (dismiss === void 0) { dismiss = true; }
        exports.Notify.setOptions(dismiss);
        toastr.warning(message, title);
    },
    error: function (message, title, dismiss) {
        if (dismiss === void 0) { dismiss = true; }
        exports.Notify.setOptions(dismiss);
        toastr.error(message, title);
    },
    info: function (message, title, dismiss) {
        if (dismiss === void 0) { dismiss = true; }
        exports.Notify.setOptions(dismiss);
        toastr.info(message, title);
    }
};
exports.Utils = {
    getVersion: function () {
        var userLogin = exports.Auth.getELSUser();
        if (userLogin != null)
            if (userLogin === null)
                window.parent.location.reload();
        return userLogin === null ? null : userLogin.Version;
    },
    getExpiresIn: function () {
        var userLogin = exports.Auth.getELSUser();
        if (userLogin === null)
            window.parent.location.reload();
        return userLogin === null ? 1800 : userLogin.ExpiresIn;
    },
    homeUrl: function () {
        var userLogin = exports.Auth.getELSUser();
        if (userLogin == null)
            return '/login';
        return userLogin.UserType === Enums.UserTypeEnum.LENDER ? "/dashboard" : "/users";
    },
    validateDataNotDismiss: function (dispatch, data, title, loaded) {
        if (loaded === void 0) { loaded = true; }
        return exports.Utils.validateData(dispatch, data, title, loaded, false);
    },
    validateData: function (dispatch, data, title, loaded, dismiss) {
        if (loaded === void 0) { loaded = true; }
        if (dismiss === void 0) { dismiss = true; }
        if (loaded === true || !data.IsSuccess)
            dispatch({ type: 'LOADED' });
        if (data.IsSuccess)
            return true;
        if (data.TypeMessage == Enums.EnumTypeMessage.WARNING)
            exports.Notify.warning(data.Message, title, dismiss);
        else
            exports.Notify.error(data.Message, title, dismiss);
        return false;
    },
    validateErrorValue: function (dispatch, data, title, loaded, dismiss) {
        if (loaded === void 0) { loaded = true; }
        if (dismiss === void 0) { dismiss = true; }
        if (loaded === true || !data.IsSuccess)
            dispatch({ type: 'LOADED' });
        if (data.IsSuccess || data.errors === null || data.errors === undefined || data.errors.length === 0)
            return true;
        if (data.errors != null) {
            var message_1 = '';
            Object.getOwnPropertyNames(data.errors).map(function (error) {
                message_1 += (message_1 !== '' ? ', ' : '') + data.errors[error][0];
            });
            exports.Notify.warning(message_1, title, dismiss);
        }
        else if (data.TypeMessage && data.Message && data.TypeMessage == Enums.EnumTypeMessage.WARNING)
            exports.Notify.warning(data.Message, title, dismiss);
        else
            exports.Notify.error(data.Message, title, dismiss);
        return false;
    },
    showError: function (dispatch, error, title, ignoreLoaded) {
        if (ignoreLoaded === void 0) { ignoreLoaded = false; }
        console.log(title + ' - error', error);
        if (!ignoreLoaded)
            dispatch({ type: 'LOADED' });
        exports.Notify.error("An error has ocurred", title);
    },
    getSummary: function (aggregates) {
        var summary = {};
        if (aggregates != null) {
            aggregates.map(function (aggregate) {
                var _a;
                summary = __assign(__assign({}, summary), (_a = {}, _a[aggregate.Member] = aggregate.Value, _a));
            });
        }
        return summary;
    },
    sum: function (array, key) {
        if (array != null && array.length > 0) {
            return array.reduce(function (a, b) { return a + (b[key] || 0); }, 0);
        }
        else
            return 0;
    },
    compareColumn: function (a, b) {
        var bandA = a.Position;
        var bandB = b.Position;
        var comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        }
        else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    },
    getComparion: function (key, order) {
        if (order === void 0) { order = 'asc'; }
        return function (a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
                return 0;
            var varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            var varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];
            var comparison = 0;
            if (varA > varB) {
                comparison = 1;
            }
            else if (varA < varB) {
                comparison = -1;
            }
            return ((order === 'desc') ? (comparison * -1) : comparison);
        };
    },
    getColumns: function (oldColumns, newColumns) {
        if (!newColumns || newColumns.length === 0)
            return oldColumns;
        return oldColumns.map(function (oldColumn) {
            var newColumn = newColumns.filter(function (column) { return column.ColumnName === oldColumn.ColumnName; })[0];
            return newColumn ? __assign(__assign({}, oldColumn), { Position: newColumn.Position, Checked: newColumn.Checked }) : oldColumn;
        }).sort(exports.Utils.compareColumn);
    },
    getColumns2: function (oldColumns, newColumns) {
        try {
            if (!newColumns || newColumns.length === 0) {
                return oldColumns;
            }
            oldColumns.forEach(function (x) {
                var obj = newColumns.filter(function (y) { return y.ColumnName == x.ColumnName; })[0];
                if (obj) {
                    x.Checked = obj.Checked;
                    x.Position = obj.Position;
                }
            });
            return oldColumns.sort(exports.Utils.compareColumn);
            //return oldColumns.map(oldColumn => {
            //    let newColumn = newColumns.filter((column) => column.ColumnName === oldColumn.ColumnName)[0];
            //    return newColumn ? { ...oldColumn, position: newColumn.Position, checked: newColumn.Checked } : oldColumn;
            //}).sort(Utils.compareColumn);
        }
        catch (e) {
            console.log("error", e);
        }
    },
    getActiveColumn: function (columns) {
        var firstColumn = columns.filter(function (column) { return column.Position == 1; })[0];
        return firstColumn ? firstColumn.ColumnName : "";
    },
    validateNumber: function (value) {
        if (!isNaN(Number(value)))
            return value;
        return value.slice(0, value.length - 1);
    },
    validateDecimal: function (value) {
        if (value == '.' || !isNaN(Number(value)))
            return value;
        return value.slice(0, value.length - 1);
    },
    numberFormat: function (value, format) {
        if (format == '{0:c}')
            return exports.Utils.currencyFormat(value);
        else if (format == '{0:d}')
            return exports.Utils.decimalFormat(value);
        else if (format == '{0:p2}')
            return exports.Utils.percentFormat(value);
        else
            return '';
    },
    percentFormat: function (value) {
        var props = {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
        return isNaN(Number(value)) ? '' :
            (new Intl.NumberFormat('en-US', props)).format(Number(value));
    },
    decimalFormat: function (value) {
        var props = {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
        return isNaN(Number(value)) ? '' :
            (new Intl.NumberFormat('en-US', props)).format(Number(value));
    },
    currencyFormat: function (value) {
        var props = {
            style: 'currency',
            currency: 'USD'
        };
        return isNaN(Number(value)) ? '' :
            (new Intl.NumberFormat('en-US', props)).format(Number(value));
    },
    getValueEnum: function (type, value, replaceGuionForSpace) {
        if (replaceGuionForSpace === void 0) { replaceGuionForSpace = true; }
        var item = Enums.EnumToArray(type, replaceGuionForSpace).filter(function (item) { return item.value == value; })[0];
        return item ? item.label : "";
    },
    getKeyEnum: function (type, label, replaceGuionForSpace) {
        if (replaceGuionForSpace === void 0) { replaceGuionForSpace = true; }
        var key = undefined;
        Enums.EnumToArray(type, replaceGuionForSpace).map(function (item) {
            if (item.label.toLowerCase() === label.toLowerCase()) {
                key = item.value;
            }
        });
        return key !== undefined ? key : -1;
    },
    getEnumByLabel: function (type, label) {
        if (!type || !label)
            return "";
        var item = Enums.EnumToArray(type).filter(function (item) { return item.label && item.label.toString().toLowerCase() == label.toString().toLowerCase(); })[0];
        return item ? (item.value != null && item.value != undefined ? item.value : "") : "";
    },
    getCustomData: function (data, columns, revert) {
        if (revert === void 0) { revert = false; }
        if (!data || !columns || columns.length == 0)
            return data;
        var newData = JSON.parse(JSON.stringify(data));
        var newFilters = (newData.filter) ? exports.Utils.getCustomFilters(newData.filter.filters, columns, revert) : [];
        var newSort = exports.Utils.getCustomSort(newData.sort, columns, revert);
        if (newFilters.length == 0)
            newData.filter = undefined;
        else
            newData.filter.filters = newFilters;
        newData.sort = newSort;
        return newData;
    },
    getCustomFilters: function (filters, columns, revert) {
        if (revert === void 0) { revert = false; }
        if (!filters || filters.length == 0 || !columns || columns.length == 0)
            return [];
        var newFilters = JSON.parse(JSON.stringify(filters));
        return newFilters.map(function (item) {
            if (item.field !== undefined) {
                var column = columns.filter(function (column) {
                    return revert ? (item.field == column.label) : (item.field == column.renderLabel);
                })[0];
                if (column !== undefined) {
                    item.field = revert ? column.renderLabel : column.label;
                    item.value = (column.type === undefined) ? item.value : (revert ? exports.Utils.getValueEnum(column.type, item.value) :
                        exports.Utils.getEnumByLabel(column.type, item.value));
                }
            }
            else if (item.filters !== undefined) {
                item.filters = exports.Utils.getCustomFilters(item.filters, columns, revert);
            }
            return item;
        });
    },
    getCustomSort: function (sort, columns, revert) {
        if (revert === void 0) { revert = false; }
        if (!sort || sort.length == 0 || !columns || columns.length == 0)
            return [];
        var newSort = JSON.parse(JSON.stringify(sort));
        return newSort.map(function (item) {
            var column = columns.filter(function (column) {
                return revert ? (item.field == column.label) : (item.field == column.renderLabel);
            })[0];
            if (column !== undefined)
                item.field = revert ? column.renderLabel : column.label;
            return item;
        });
    },
    nullToEmptyString: function (value) {
        return value && value !== null ? value : "";
    },
    nullToValidNumber: function (value) {
        return value && value !== null ? value : 0;
    },
    padLeft: function (num, padlen, padchar) {
        if (!num)
            return "";
        var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
        var pad = new Array(1 + padlen).join(pad_char);
        return (pad + num).slice(-pad.length);
    },
    padRight: function (num, padlen, padchar) {
        if (!num)
            return "";
        var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
        var pad = new Array(1 + padlen).join(pad_char);
        return (num + pad).substring(0, pad.length);
    },
    getCurrentPage: function (props) {
        if (props.skip === undefined)
            return 0;
        if (props.take === undefined)
            return 0;
        if (props.take == 0)
            return 0;
        return ((props.skip / props.take) + 1);
    },
    getTotalPages: function (props) {
        if (props.total === undefined)
            return 0;
        if (props.take === undefined)
            return 0;
        if (props.take == 0)
            return 0;
        return Math.floor(props.total / props.take);
    },
    getCurrentDate: function () {
        return new Intl.DateTimeFormat("en-US", {
            year: 'numeric', month: '2-digit', day: '2-digit'
        }).format(new Date());
    }
};
exports.TreeViewUtils = {
    createFromArray: function (data, parent) {
        var tree = [];
        var items = (!parent ? data.filter(function (item) { return item.ParentUid == '' || item.ParentUid == null; }) :
            data.filter(function (item) { return item.ParentUid != '' && item.ParentUid != null && item.ParentUid == parent.Uid; })).sort(exports.Utils.getComparion("Bit"));
        items.map(function (permission, index) {
            tree.push({
                bit: permission.Bit,
                uid: permission.Uid,
                text: permission.Description,
                items: permission.HasChildren ? exports.TreeViewUtils.createFromArray(data, permission) : [],
                expanded: !parent && index == 0,
                checked: permission.IsGranted
            });
        });
        return tree;
    },
    updateCheckedItems: function (data) {
        return data.map(function (permission) {
            if (permission.items.length == 0)
                return permission;
            var allItems = exports.TreeViewUtils.updateCheckedItems(permission.items);
            var checkedItems = permission.items.filter(function (item) { return item.checked; });
            permission.items = allItems;
            permission.checked = (checkedItems.length == allItems.length);
            return permission;
        });
    },
    checkChildrenItems: function (data, checked) {
        return data.map(function (permission) {
            permission.checked = checked;
            permission.indeterminate = false;
            permission.items = exports.TreeViewUtils.checkChildrenItems(permission.items, checked);
            return permission;
        });
    },
    getItemByUid: function (uid, data) {
        var permission = data.filter(function (item) { return item.uid == uid; })[0];
        if (permission)
            return permission;
        var itemsWithChildren = data.filter(function (item) { return item.items.length > 0; });
        if (itemsWithChildren.length == 0)
            return undefined;
        return data.map(function (permission) {
            return exports.TreeViewUtils.getItemByUid(uid, permission.items);
        }).filter(function (item) { return item !== undefined; })[0];
    },
    getCheckedBits: function (data) {
        var checkedBits = data.filter(function (item) { return item.checked; }).map(function (item) { return item.bit; });
        data.map(function (item) {
            checkedBits = __spreadArrays(checkedBits, exports.TreeViewUtils.getCheckedBits(item.items));
        });
        return checkedBits;
    }
};
//# sourceMappingURL=Functions.js.map