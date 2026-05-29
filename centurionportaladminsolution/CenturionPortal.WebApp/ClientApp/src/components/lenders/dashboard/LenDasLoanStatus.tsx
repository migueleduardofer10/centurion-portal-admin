import * as React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';

import ChartBar from '../charts/ChartBar';
import CardLoading from '../../shared/CardLoading';
import { ApplicationState } from '../../../store/index';
import * as LenDasLoanStatusStore from '../../../store/stores/lenders/dashboard/LenDasLoanStatusStore';

import 'react-confirm-alert/src/react-confirm-alert.css';

// At runtime, Redux will merge together...
type LoanStatusProps =
    LenDasLoanStatusStore.State // ... state we've requested from the Redux store
    & typeof LenDasLoanStatusStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class LoanStatus extends React.PureComponent<LoanStatusProps> {
    state = { sort: [] };

    public render() {
        return (
            <div className={"card card-dashboard card-states" + (this.props.fullScreen ? " card-full-screen" : "")}>
                <div className="card-header">
                    <h4 className="card-title m-0">Loan By Status</h4>
                    {this.renderOptions()}
                </div>
                <div className={"card-body" + (this.props.collapse ? " d-none" : "")}>
                    {this.props.loading ? <CardLoading /> : ""}
                    <ChartBar
                        loading={this.props.loading}
                        update={this.props.update}
                        onUpdate={this.props.updatedPaymentLender}
                        //onRefresh={this.props.refreshedGraph}
                        categories={this.props.categoriesStatus}
                        series={this.props.seriesStatus}
                    />
                </div>
            </div>
        );
    }

    private renderOptions() {
        return (
            <ul className="card-header-tabs border-light">
                <li className="card-actions">
                    {
                        this.props.fullScreen ? (
                            <button type="button" className="btn btn-action btn-light" style={{ marginTop: "6px" }} onClick={this.normalStatus}>
                                <i className="fa fa-compress m-0"></i>
                            </button>
                        ) : (
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-status-options" className="btn btn-action btn-light">
                                        <i className="fa fa-cog m-0"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            this.props.collapse ? (
                                                <Dropdown.Item className="dropdown-item" href="!#" onClick={this.expandStatus}>
                                                    <i className="ti-angle-down mr-2"></i> <span>Expand</span>
                                                </Dropdown.Item>
                                            ) : (
                                                    <Dropdown.Item className="dropdown-item" href="!#" onClick={this.collapseStatus}>
                                                        <i className="ti-angle-up mr-2"></i> <span>Collapse</span>
                                                    </Dropdown.Item>
                                                )
                                        }
                                        <Dropdown.Item className="dropdown-item" href="!#" onClick={this.refreshLoanStatus}>
                                            <i className="icon-refresh mr-2"></i> <span>Refresh</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="dropdown-item" href="!#" onClick={this.fullScreenStatus}>
                                            <i className="fa fa-expand mr-2"></i> <span>Fullscreen</span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )
                    }
                </li>
            </ul>
        );
    }

    private expandStatus = (event: any) => {
        event.preventDefault();
        this.props.changeCollapse(false);
    }

    private collapseStatus = (event: any) => {
        event.preventDefault();
        this.props.changeCollapse(true);
    }

    private fullScreenStatus = (event: any) => {
        event.preventDefault();
        this.props.changeFullScreen(true);
    }

    private normalStatus = (event: any) => {
        event.preventDefault();
        this.props.changeFullScreen(false);
    }

    private refreshLoanStatus = (event: any) => {
        event.preventDefault();
        this.props.fetchLoanStatus();
    }
}

export default connect(
    (state: ApplicationState) => state.lenDasLoanStatus,
    LenDasLoanStatusStore.actions
)(LoanStatus as any);
