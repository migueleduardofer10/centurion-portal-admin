import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import 'hammerjs';
import BreadCrumb from '../shared/BreadCrumb';
import { ApplicationState } from '../../store/index';
import * as ReportLoginStore from '../../store/stores/users/ReportLoginStore';

import ChartPie from './charts/ChartPie';
import ChartColumn from './charts/ChartColumn';
import { StatusEnum, UserTypeEnum, EnumToArray } from '../../utilities/Enums';

// At runtime, Redux will merge together...
type IReportLoginProps =
    ReportLoginStore.State // ... state we've requested from the Redux store
    & typeof ReportLoginStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class ReportLogin extends React.PureComponent<IReportLoginProps> {
    public componentDidMount() {
        this.props.fetchLoginUser();
    }

    public render() {
        return (
            <React.Fragment>
                <BreadCrumb title="Report Login" />
                <div className="card card-dashboard card-states">
                    <div className="card-body p-3">
                        <div className="d-sm-flex pb-2 mb-3 border-bottom">
                            <div className="form-inline">
                                <div className="form-group mr-sm-3 mb-0">
                                    <select className="form-control form-control-sm" id="Chart" name="Chart" value={this.props.filters.Chart} onChange={this.onChange}>
                                        <option value="0">Today</option>
                                        <option value="1">Last Seven Days</option>
                                        <option value="2">Last Month</option>
                                        <option value="3">Year to Date</option>
                                        <option value="4">Last Year</option>
                                        <option value="5">All Date</option>
                                    </select>
                                </div>
                                <div className="form-group mr-sm-3 mb-0">
                                    <label htmlFor="Status" className="text-bold m-0 mr-2">User Status:</label>
                                    <div className="form-check mr-sm-3">
                                        <input className="form-check-input" type="checkbox" id="ChkStatus" name="ChkStatus" checked={this.props.filters.ChkStatus} onChange={this.onCheckChange} />
                                        <label className="form-check-label m-0 ml-1" htmlFor="ChkStatus">
                                            Combine
                                        </label>
                                    </div>
                                    <select className="form-control form-control-sm" id="Status" name="Status" value={this.props.filters.Status} onChange={this.onChange} disabled={this.props.filters.ChkStatus}>
                                        {
                                            EnumToArray(StatusEnum).map((option: any, index: number) => (
                                                <option key={index} value={option.value}>{option.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group mb-0">
                                    <label htmlFor="UserType" className="text-bold m-0 mr-2">User Type:</label>
                                    <div className="form-check mr-sm-3">
                                        <input className="form-check-input" type="checkbox" id="ChkUserType" name="ChkUserType" checked={this.props.filters.ChkUserType} onChange={this.onCheckChange} />
                                        <label className="form-check-label m-0 ml-1" htmlFor="ChkUserType">
                                            Combine
                                        </label>
                                    </div>
                                    <select className="form-control form-control-sm" id="UserType" name="UserType" value={this.props.filters.UserType} onChange={this.onChange} disabled={this.props.filters.ChkUserType}>
                                        {
                                            EnumToArray(UserTypeEnum).map((option: any, index: number) => (
                                                <option key={index} value={option.value}>{option.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <h4 className="title-charts text-center">{this.props.titleCharts}</h4>
                                <div style={{ overflowX: "auto" }}>
                                    <ChartColumn
                                        titleValueAxis={this.props.titleValueAxis}
                                        categories={this.props.categoriesChartColumn}
                                        series={this.props.seriesChartColumn}
                                        update={this.props.updateChartColumn}
                                        disableUpdate={this.props.disableUpdateChartColumn}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h4 className="title-charts text-center">{this.props.titleCharts}</h4>
                                <h5 className="subtitle-charts text-center">{this.props.subTitleChartPie}</h5>
                                <div style={{ overflowX: "auto" }}>
                                    <ChartPie
                                        series={this.props.seriesChartPie}
                                        update={this.props.updateChartPie}
                                        disableUpdate={this.props.disableUpdateChartPie}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }

    private onChange = (event: any) => {
        let value = Number(event.target.value);

        if (isNaN(value)) return;
        if (event.target.name == 'Status' && this.props.filters.ChkStatus) return;
        if (event.target.name == 'UserType' && this.props.filters.ChkUserType) return;

        this.props.changeFilters(event.target.name, value);
        this.props.fetchLoginUser();
    }

    private onCheckChange = (event: any) => {
        this.props.changeFilters(event.target.name, event.target.checked);
        this.props.fetchLoginUser();
    }
}

export default connect(
    (state: ApplicationState) => state.reportLogin,
    ReportLoginStore.actions
)(ReportLogin as any);
