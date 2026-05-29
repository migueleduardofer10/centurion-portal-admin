"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppVersion_Action_Load = void 0;
var Functions_1 = require("../../utilities/Functions");
exports.AppVersion_Action_Load = function (afterActions) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    var url = "api/auth/appVersion_Full";
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        afterActions(data.ObjOptional);
        dispatch(Functions_1.GlobalAnimation_Loaded());
    }).catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, 'App Version');
    });
}; };
//# sourceMappingURL=Action.js.map