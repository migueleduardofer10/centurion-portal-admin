import * as React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DatePicker } from '@progress/kendo-react-dateinputs';

import ChartColumn from '../charts/ChartColumn';
import CardLoading from '../../shared/CardLoading';
import { ApplicationState } from '../../../store/index';
import * as LenDasPaymentBorrowerStore from '../../../store/stores/lenders/dashboard/LenDasPaymentBorrowerStore';

import 'react-confirm-alert/src/react-confirm-alert.css';

// At runtime, Redux will merge together...
type LndPaymentBorrowerProps =
    LenDasPaymentBorrowerStore.State // ... state we've requested from the Redux store
    & typeof LenDasPaymentBorrowerStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class PaymentBorrower extends React.PureComponent<LndPaymentBorrowerProps> {
    state = { sort: [] };

    public render() {
        return (
            <div className={"card card-dashboard card-states" + (this.props.fullScreen ? " card-full-screen" : "")}>
                <div className="card-header">
                    <h4 className="card-title m-0">Summary - Payment From Borrower(s)</h4>
                    {this.renderOptions()}
                </div>
                <div className={"card-body" + (this.props.collapse ? " d-none" : "")}>
                    {this.props.loading ? <CardLoading /> : ""}
                    <ChartColumn
                        loading={this.props.loading}
                        update={this.props.update}
                        onUpdate={this.props.updatedPaymentBorrower}
                        //onRefresh={this.props.refreshedGraph}
                        categories={this.props.categoriesBorrower}
                        series={this.props.seriesBorrower}
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
                            <button type="button" className="btn btn-action btn-light" style={{ marginTop: "6px" }} onClick={this.normalBorrower}>
                                <i className="fa fa-compress m-0"></i>
                            </button>
                        ) : (
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-borrower-options" className="btn btn-action btn-light">
                                        <i className="fa fa-cog m-0"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            this.props.collapse ? (
                                                <Dropdown.Item className="dropdown-item" href="!#" onClick={this.expandBorrower}>
                                                    <i className="ti-angle-down mr-2"></i> <span>Expand</span>
                                                </Dropdown.Item>
                                            ) : (
                                                    <Dropdown.Item className="dropdown-item" href="!#" onClick={this.collapseBorrower}>
                                                        <i className="ti-angle-up mr-2"></i> <span>Collapse</span>
                                                    </Dropdown.Item>
                                                )
                                        }
                                        <Dropdown.Item className="dropdown-item" href="!#" onClick={this.refreshPaymentsBorrower}>
                                            <i className="icon-refresh mr-2"></i> <span>Refresh</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="dropdown-item" href="!#" onClick={this.fullScreenBorrower}>
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
                data={this.props.paymentsBorrower}
                sortable={{
                    allowUnsort: true,
                    mode: 'single'
                }}
                sort={this.state.sort}
                onSortChange={this.sortChange}
                resizable
                className="table-noscroll table-vendor"
            >
                <GridColumn key="egend" field="Legend" title=" " width="169px" />
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

    private expandBorrower = (event: any) => {
        event.preventDefault();
        this.props.changeCollapse(false);
    }

    private collapseBorrower = (event: any) => {
        event.preventDefault();
        this.props.changeCollapse(true);
    }

    private fullScreenBorrower = (event: any) => {
        event.preventDefault();
        this.props.changeFullScreen(true);
    }

    private normalBorrower = (event: any) => {
        event.preventDefault();
        this.props.changeFullScreen(false);
    }

    private changeFromDate = (event: any) => {
        this.fetchPaymentsBorrower(event.target.value, this.props.toDate);
    }

    private changeToDate = (event: any) => {
        this.fetchPaymentsBorrower(this.props.fromDate, event.target.value);
    }

    private fetchPaymentsBorrower = (from?: Date, to?: Date) => {
        this.props.fetchPaymentBorrower(from, to)
    }

    private refreshPaymentsBorrower = (event: any) => {
        event.preventDefault();
        if (this.props.fromDate && this.props.toDate)
            this.props.fetchPaymentBorrower(this.props.fromDate, this.props.toDate, true);
        else
            this.props.fetchPaymentBorrower(undefined, undefined, true);
    }
}

export default connect(
    (state: ApplicationState) => state.lenDasPaymentBorrower,
    LenDasPaymentBorrowerStore.actions
)(PaymentBorrower as any);
