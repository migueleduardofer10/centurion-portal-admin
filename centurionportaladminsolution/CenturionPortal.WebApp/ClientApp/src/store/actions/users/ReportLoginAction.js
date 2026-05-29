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
exports.actions = void 0;
var Functions_1 = require("../../../utilities/Functions");
var title = "Users";
var colorSuccess = "#2F7ED8";
var colorFail = "#0D233A";
var getStrWeek = function (chart, loginUser) {
    if (chart == 0)
        return loginUser.DayName + " " + loginUser.Day + " " + loginUser.Hour + ":00 - " + loginUser.Hour + ":59";
    else if (chart == 1)
        return loginUser.DayName + " " + loginUser.Day;
    else if (chart == 2)
        return loginUser.Month + "/" + loginUser.Day + "/" + loginUser.Year;
    else
        return loginUser.Month + " " + loginUser.Year;
};
var getTitleCharts = function (chart) {
    if (chart == 0)
        return 'Total Login Day';
    else if (chart == 1)
        return 'Total Login Last Seven Days';
    else if (chart == 2)
        return 'Total Login Last Month';
    else if (chart == 3)
        return 'Total Login Year To Date';
    else if (chart == 4)
        return 'Total Login Last Year';
    else
        return 'Total All Login';
};
exports.actions = {
    fetchLoginUser: function () { return function (dispatch, getState) {
        var appState = getState();
        var filters = appState.reportLogin.filters;
        filters = __assign(__assign({}, filters), { Status: filters.ChkStatus ? -1 : filters.Status, UserType: filters.ChkUserType ? -1 : filters.UserType });
        dispatch({ type: 'LOADING' });
        dispatch({ type: 'LOADING_REPORT_LOGIN' });
        fetch("api/report/login/general", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Functions_1.Auth.getJWT()
            },
            body: JSON.stringify(filters)
        }).then(function (res) { return res.json(); })
            .then(function (data) {
            if (Functions_1.Utils.validateData(dispatch, data, title)) {
                var cantSuccess_1 = 0;
                var cantFail_1 = 0;
                var cantTotal = 0;
                var strWeek_1 = [];
                var nroSuccess_1 = [];
                var nroFail_1 = [];
                var loginUser = data.ObjOptional;
                loginUser.map(function (item) {
                    cantSuccess_1 = cantSuccess_1 + item.NroSuccess;
                    cantFail_1 = cantFail_1 + item.NroFail;
                    strWeek_1.push(getStrWeek(filters.Chart, item));
                    nroSuccess_1.push(item.NroSuccess);
                    nroFail_1.push(item.NroFail);
                });
                cantTotal = cantSuccess_1 + cantFail_1;
                var categoriesChartColumn = strWeek_1.reverse();
                var seriesChartColumn = [
                    {
                        name: "Success",
                        data: nroSuccess_1.reverse(),
                        color: colorSuccess
                    },
                    {
                        name: "Fail",
                        data: nroFail_1.reverse(),
                        color: colorFail
                    }
                ];
                var seriesChartPie = [
                    {
                        category: "Success",
                        value: cantSuccess_1 / cantTotal,
                        color: colorSuccess
                    },
                    {
                        category: "Fail",
                        value: cantFail_1 / cantTotal,
                        color: colorFail
                    }
                ];
                var titleCharts = getTitleCharts(filters.Chart);
                var subTitleChartPie = "Total Success: " + cantSuccess_1 + " - Total Fail: " + cantFail_1;
                var titleValueAxis = "Total Logins";
                dispatch({
                    type: 'FETCHED_LOGIN_USER',
                    categoriesChartColumn: categoriesChartColumn,
                    seriesChartColumn: seriesChartColumn,
                    seriesChartPie: seriesChartPie,
                    titleCharts: titleCharts,
                    subTitleChartPie: subTitleChartPie,
                    titleValueAxis: titleValueAxis
                });
            }
        }, function (failed) {
            Functions_1.Utils.showError(dispatch, failed, title);
        }).catch(function (error) {
            Functions_1.Utils.showError(dispatch, error, title);
        });
    }; },
    changeFilters: function (name, value) { return function (dispatch, getSate) {
        var _a;
        var appState = getSate();
        var filters = appState.reportLogin.filters;
        filters = __assign(__assign({}, filters), (_a = {}, _a[name] = value, _a));
        dispatch({ type: 'CHANGED_FILTERS_REPORT_LOGIN', filters: filters });
    }; },
    disableUpdateChartColumn: function () { return function (dispatch) {
        dispatch({ type: 'DISABLED_UPDATE_CHART_COLUMN' });
    }; },
    disableUpdateChartPie: function () { return function (dispatch) {
        dispatch({ type: 'DISABLED_UPDATE_CHART_PIE' });
    }; }
};
//# sourceMappingURL=ReportLoginAction.js.map