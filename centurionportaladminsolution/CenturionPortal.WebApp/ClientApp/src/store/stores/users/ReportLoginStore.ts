import { Action, Reducer } from 'redux';
import * as UserCommon from '../../commons/UserCommon';
import * as ReportLoginAction from '../../actions/users/ReportLoginAction';

export const actions = ReportLoginAction.actions;

export interface State {
    filters: UserCommon.ReportLogin;
    chkUserType: boolean;
    chkStatus: boolean;
    titleCharts: string;
    subTitleChartPie: string;
    titleValueAxis: string;
    categoriesChartColumn: any[];
    seriesChartColumn: any[];
    seriesChartPie: any[];
    updateChartColumn: boolean;
    updateChartPie: boolean;
}

export const reducer: Reducer<State> = (state: State | undefined, incomingAction: Action): State => {
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

    const action = incomingAction as ReportLoginAction.KnownAction;
    switch (action.type) {
        case 'LOADING_REPORT_LOGIN':
            return {
                ...state,
                titleCharts: '',
                subTitleChartPie: '',
                titleValueAxis: '',
                categoriesChartColumn: [],
                seriesChartColumn: [],
                seriesChartPie: [],
                updateChartColumn: true,
                updateChartPie: true
            };
        case 'FETCHED_LOGIN_USER':
            return {
                ...state,
                titleCharts: action.titleCharts,
                subTitleChartPie: action.subTitleChartPie,
                titleValueAxis: action.titleValueAxis,
                categoriesChartColumn: action.categoriesChartColumn,
                seriesChartColumn: action.seriesChartColumn,
                seriesChartPie: action.seriesChartPie,
                updateChartColumn: true,
                updateChartPie: true,
            };
        case 'CHANGED_FILTERS_REPORT_LOGIN':
            return {
                ...state,
                filters: JSON.parse(JSON.stringify(action.filters))
            };
        case 'DISABLED_UPDATE_CHART_COLUMN':
            return {
                ...state,
                updateChartColumn: false
            };
        case 'DISABLED_UPDATE_CHART_PIE':
            return {
                ...state,
                updateChartPie: false
            };
        default: return state;
    }
};
