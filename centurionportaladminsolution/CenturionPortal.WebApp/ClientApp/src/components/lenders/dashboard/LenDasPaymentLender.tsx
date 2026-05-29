import * as React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DatePicker } from '@progress/kendo-react-dateinputs';

import ChartColumn from '../charts/ChartColumn';
import CardLoading from '../../shared/CardLoading';
import { ApplicationState } from '../../../store/index';
import * as LenDasPaymentLenderStore from '../../../store/stores/lenders/dashboard/LenDasPaymentLenderStore';

import 'react-confirm-alert/src/react-confirm-alert.css';

// At runtime, Redux will merge together...
type PaymentToLenderProps =
    LenDasPaymentLenderStore.State // ... state we've requested from the Redux store
    & typeof LenDasPaymentLenderStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class PaymentToLender extends React.PureComponent<PaymentToLenderProps> {
    state = { sort: [] };

    public render() {
        return (
            <div className={"card card-dashboard card-states" + (this.props.fullScreen ? " card-full-screen" : "")}>
                <div className="card-header">
                    <h4 className="card-title m-0">Summary - Payment To Lender(s)</h4>
                    {this.renderOptions()}
                </div>
                <div className={"card-body" + (this.props.collapse ? " d-none" : "")}>
                    {this.props.loading ? <CardLoading /> : ""}
                    <ChartColumn
                        loading={this.props.loading}
                        update={this.props.update}
                        onUpdate={this.props.updatedPaymentLender}
                        //onRefresh={this.props.refreshedGraph}
                        categories={this.props.categoriesLender}
                        series={this.props.seriesLender}
                    />
                    <div className="mt-3">
                        {this.renderGridDetail()}
                    </div>
                </div>
            </div>
        );
    }

    private renderOptions() {
        return (
            <ul className="card-header-tabs border-light">
                <li>
                    <div style={{ marginTop: "5px" }}>
                        <DatePicker max={new Date()} onChange={this.changeFromDate} />
                    </div>
                </li>
                <li>
                    <div style={{ marginTop: "5px" }}>
                        <DatePicker max={new Date()} onChange={this.changeToDate} />
                    </div>
                </li>
                <li className="card-actions">
                    {
                        this.props.fullScreen ? (
                            <button type="button" className="btn btn-action btn-light" style={{ marginTop: "6px" }} onClick={this.normalLender}>
                                <i className="fa fa-compress m-0"></i>
                            </button>
                        ) : (
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-lender-options" className="btn btn-action btn-light">
                                        <i className="fa fa-cog m-0"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            this.props.collapse ? (
                                                <Dropdown.Item className="dropdown-item" href="!#" onClick={this.expandLender}>
                                                    <i className="ti-angle-down mr-2"></i> <span>Expand</span>
                                                </Dropdown.Item>
                                            ) : (
                                                    <Dropdown.Item className="dropdown-item" href="!#" onClick={this.collapseLender}>
                                                        <i className="ti-angle-up mr-2"></i> <span>Collapse</span>
                                                    </Dropdown.Item>
                                                )
                                        }
                                        <Dropdown.Item className="dropdown-item" href="!#" onClick={this.refreshPaymentsLender}>
                                            <i className="icon-refresh mr-2"></i> <span>Refresh</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="dropdown-item" href="!#" onClick={this.fullScreenLender}>
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

    private renderGridDetail() {
        return (
            <Grid
                data={this.props.paymentsLender}
                sortable={{
                    allowUnsort: true,
                    mode: 'single'
                }}
                sort={this.state.sort}
                onSortChange={this.sortChange}
                resizable
                className="table-noscroll table-vendor"
            >
                <GridColumn key="legend" field="Legend" title=" " width="169px" />
                <GridColumn key="totalAmount" field="TotalAmount" title="Total Amount" format="{0:c}" width="172px" className="text-right" headerClassName="text-right" />
                <GridColumn key="toInterest" field="ToInterest" title="To Interest" format="{0:c}" width="172px" className="text-right" headerClassName="text-right" />
                <GridColumn key="toPrincipal" field="ToPrincipal" title="To Principal" format="{0:c}" width="172px" className="text-right" headerClassName="text-right" />
                <GridColumn key="toLateCharge" field="ToLateCharge" title="To Late Charge" format="{0:c}" width="172px" className="text-right" headerClassName="text-right" />
                <GridColumn key="other" field="Other" title="Other" format="{0:c}" width="172px" className="text-right" headerClassName="text-right" />
            </Grid>
        );
    }

    private sortChange = (event: any) => {
        this.setState({ sort: event.sort });
    }

    private expandLender = (event: any) => {
        event.preventDefault();
        this.props.changeCollapse(false);
    }

    private collapseLender = (event: any) => {
        event.preventDefault();
        this.props.changeCollapse(true);
    }

    private fullScreenLender = (event: any) => {
        event.preventDefault();
        this.props.changeFullScreen(true);
    }

    private normalLender = (event: any) => {
        event.preventDefault();
        this.props.changeFullScreen(false);
    }

    private changeFromDate = (event: any) => {
        this.fetchPaymentsLender(event.target.value, this.props.toDate);
    }

    private changeToDate = (event: any) => {
        this.fetchPaymentsLender(this.props.fromDate, event.target.value);
    }

    private fetchPaymentsLender = (fromDate?: Date, toDate?: Date) => {
        this.props.fetchPaymentLender(fromDate, toDate)
    }

    private refreshPaymentsLender = (event: any) => {
        event.preventDefault();
        if(this.props.fromDate && this.props.toDate)
            this.props.fetchPaymentLender(this.props.fromDate, this.props.toDate, true);
        else
            this.props.fetchPaymentLender(undefined, undefined, true);
    }
}

export default connect(
    (state: ApplicationState) => state.lenDasPaymentLender,
    LenDasPaymentLenderStore.actions
)(PaymentToLender as any);
