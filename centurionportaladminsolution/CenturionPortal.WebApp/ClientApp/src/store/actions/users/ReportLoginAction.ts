import { AppThunkAction } from '../../index';
import * as AppAction from '../app/AppAction';
import * as UserCommon from '../../commons/UserCommon';
import { Auth, Utils } from '../../../utilities/Functions';

const title = "Users";

interface LoadingReportLoginAction {
    type: 'LOADING_REPORT_LOGIN';
}

interface FetchLoginDetailAction {
    type: 'FETCHED_LOGIN_USER';
    categoriesChartColumn: any[];
    seriesChartColumn: any[];
    seriesChartPie: any[];
    titleCharts: string;
    subTitleChartPie: string;
    titleValueAxis: string;
}

interface ChangeFiltersReportLoginAction {
    type: 'CHANGED_FILTERS_REPORT_LOGIN';
    filters: UserCommon.ReportLogin;
}

interface DisableUpdateChartColumnAction {
    type: 'DISABLED_UPDATE_CHART_COLUMN';
}

interface DisableUpdateChartPieAction {
    type: 'DISABLED_UPDATE_CHART_PIE';
}

export type KnownAction = AppAction.KnownAction | LoadingReportLoginAction | FetchLoginDetailAction |
    ChangeFiltersReportLoginAction | DisableUpdateChartColumnAction | DisableUpdateChartPieAction;

const colorSuccess = "#2F7ED8";
const colorFail = "#0D233A";

const getStrWeek = (chart: number, loginUser: UserCommon.AllLoginUser) : string => {
    if (chart == 0)
        return `${loginUser.DayName} ${loginUser.Day} ${loginUser.Hour}:00 - ${loginUser.Hour}:59`;
    else if (chart == 1)
        return `${loginUser.DayName} ${loginUser.Day}`;
    else if (chart == 2)
        return `${loginUser.Month}/${loginUser.Day}/${loginUser.Year}`;
    else
        return `${loginUser.Month} ${loginUser.Year}`;
}

const getTitleCharts = (chart: number) : string => {
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
}

export const actions = {
    fetchLoginUser: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        let filters: UserCommon.ReportLogin = appState.reportLogin.filters;
        filters = {
            ...filters,
            Status: filters.ChkStatus ? -1 : filters.Status,
            UserType: filters.ChkUserType ? -1 : filters.UserType
        }

        dispatch({ type: 'LOADING' });
        dispatch({ type: 'LOADING_REPORT_LOGIN' });

        fetch(`api/report/login/general`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            },
            body: JSON.stringify(filters)
        }).then(res => res.json())
            .then((data: any) => {
                if (Utils.validateData(dispatch, data, title)) {
                    let cantSuccess = 0;
                    let cantFail = 0;
                    let cantTotal = 0;
                    let strWeek: any[] = [];
                    let nroSuccess: any[] = [];
                    let nroFail: any[] = [];
                    
                    let loginUser: UserCommon.AllLoginUser[] = data.ObjOptional;
                    loginUser.map((item: UserCommon.AllLoginUser) => {
                        cantSuccess = cantSuccess + item.NroSuccess;
                        cantFail = cantFail + item.NroFail;
                        strWeek.push(getStrWeek(filters.Chart, item));
                        nroSuccess.push(item.NroSuccess);
                        nroFail.push(item.NroFail);
                    });
                    cantTotal = cantSuccess + cantFail;

                    let categoriesChartColumn: any[] = strWeek.reverse();
                    let seriesChartColumn: any[] = [
                        {
                            name: "Success",
                            data: nroSuccess.reverse(),
                            color: colorSuccess
                        },
                        {
                            name: "Fail",
                            data: nroFail.reverse(),
                            color: colorFail
                        }
                    ];
                    let seriesChartPie: any[] = [
                        {
                            category: "Success",
                            value: cantSuccess / cantTotal,
                            color: colorSuccess
                        },
                        {
                            category: "Fail",
                            value: cantFail / cantTotal,
                            color: colorFail
                        }
                    ];
                    let titleCharts = getTitleCharts(filters.Chart);
                    let subTitleChartPie = `Total Success: ${cantSuccess} - Total Fail: ${cantFail}`;
                    let titleValueAxis = "Total Logins";

                    dispatch({
                        type: 'FETCHED_LOGIN_USER',
                        categoriesChartColumn,
                        seriesChartColumn,
                        seriesChartPie,
                        titleCharts,
                        subTitleChartPie,
                        titleValueAxis
                    })
                }
            }, (failed: any) => {
                Utils.showError(dispatch, failed, title);
            }).catch(error => {
                Utils.showError(dispatch, error, title);
            });
    },

    changeFilters: (name: string, value: any): AppThunkAction<KnownAction> => (dispatch, getSate) => {
        const appState = getSate();

        let filters = appState.reportLogin.filters;
        filters = { ...filters, [name]: value };

        dispatch({ type: 'CHANGED_FILTERS_REPORT_LOGIN', filters });
    },

    disableUpdateChartColumn: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'DISABLED_UPDATE_CHART_COLUMN' });
    },

    disableUpdateChartPie: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'DISABLED_UPDATE_CHART_PIE' });
    }
}