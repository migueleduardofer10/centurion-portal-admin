"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetting_Account_Url = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var UserSettingAction_1 = require("../../store/actions/users/UserSettingAction");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var UserSettingStore_1 = require("../../store/stores/users/UserSettingStore");
var UserSetting_1 = require("./UserSetting");
var UserSetting_Account = function () {
    var state = react_redux_1.useSelector(UserSettingStore_1.UserSetting_StateObject);
    var dispatch = react_redux_1.useDispatch();
    React.useEffect(function () {
        dispatch(UserSettingAction_1.UserSetting_Action_Tab_Account(function (data) {
            List_SetData(data);
        }));
    }, []);
    var _a = React.useState([]), List_Data = _a[0], List_SetData = _a[1];
    return (React.createElement(UserSetting_1.UserSetting_Tab, { TabUrl: exports.UserSetting_Account_Url },
        React.createElement("ul", { className: "from-control w-100 p-2 list-unstyled" }, List_Data.map(function (x) {
            return React.createElement("li", { value: x.Key, key: x.Value },
                "     ",
                React.createElement("i", { className: "mdi mdi-menu-right " }),
                "  ",
                x.Value);
        }))));
};
exports.UserSetting_Account_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath("UserSetting_Account");
exports.default = UserSetting_Account;
//# sourceMappingURL=UserSetting_Account.js.map