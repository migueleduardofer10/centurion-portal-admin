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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetting_StateObject = exports.UserSetting_Reducer = void 0;
var UserSettingAction_1 = require("../../actions/users/UserSettingAction");
exports.UserSetting_Reducer = function (state, action) {
    if (state === void 0) { state = {
        ObjELSUser: {},
        ComboBox_Question1: [],
        ComboBox_Question2: [],
        ComboBox_Question3: []
    }; }
    switch (action.type) {
        case UserSettingAction_1.UserSetting_Type_SetObjELSUser:
            {
                var x = action;
                return __assign(__assign({}, state), { ObjELSUser: x.ObjELSUser });
            }
        case UserSettingAction_1.UserSetting_Type_SetEmail:
            {
                var x = action;
                return __assign(__assign({}, state), { ObjELSUser: __assign(__assign({}, state.ObjELSUser), { Email: x.Email }) });
            }
        case UserSettingAction_1.UserSetting_Type_SetComboQuestions:
            {
                var x = action;
                return __assign(__assign({}, state), { ComboBox_Question1: x.Combo1, ComboBox_Question2: x.Combo2, ComboBox_Question3: x.Combo3 });
            }
        default: return state;
    }
};
exports.UserSetting_StateObject = function (state) { return state.userSetting; };
exports.default = exports.UserSetting_Reducer;
//# sourceMappingURL=UserSettingStore.js.map