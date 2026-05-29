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
exports.reducer = exports.actions = void 0;
var UserCommon = require("../../commons/UserCommon");
var ReportLoginAction = require("../../actions/users/ReportLoginAction");
exports.actions = ReportLoginAction.actions;
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            filters: UserCommon.newReportLogin,
            chkUserType: false,
            chkStatus: false,
            titleCharts: '',
            subTitleChartPie: '',
            titleValueAxis: '',
            categoriesChartColumn: [],
            seriesChartColumn: [],
            seriesChartPie: [],
            updateChartColumn: false,
            updateChartPie: false
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'LOADING_REPORT_LOGIN':
            return __assign(__assign({}, state), { titleCharts: '', subTitleChartPie: '', titleValueAxis: '', categoriesChartColumn: [], seriesChartColumn: [], seriesChartPie: [], updateChartColumn: true, updateChartPie: true });
        case 'FETCHED_LOGIN_USER':
            return __assign(__assign({}, state), { titleCharts: action.titleCharts, subTitleChartPie: action.subTitleChartPie, titleValueAxis: action.titleValueAxis, categoriesChartColumn: action.categoriesChartColumn, seriesChartColumn: action.seriesChartColumn, seriesChartPie: action.seriesChartPie, updateChartColumn: true, updateChartPie: true });
        case 'CHANGED_FILTERS_REPORT_LOGIN':
            return __assign(__assign({}, state), { filters: JSON.parse(JSON.stringify(action.filters)) });
        case 'DISABLED_UPDATE_CHART_COLUMN':
            return __assign(__assign({}, state), { updateChartColumn: false });
        case 'DISABLED_UPDATE_CHART_PIE':
            return __assign(__assign({}, state), { updateChartPie: false });
        default: return state;
    }
};
//# sourceMappingURL=ReportLoginStore.js.map