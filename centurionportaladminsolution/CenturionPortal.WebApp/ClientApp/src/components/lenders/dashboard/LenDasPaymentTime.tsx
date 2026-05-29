import * as React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

import ChartPie from '../charts/ChartPie';
import CardLoading from '../../shared/CardLoading';
import { Utils } from '../../../utilities/Functions';
import { ApplicationState } from '../../../store/index';
import * as LenDasPaymentTimeStore from '../../../store/stores/lenders/dashboard/LenDasPaymentTimeStore';

import 'react-confirm-alert/src/react-confirm-alert.css';

// At runtime, Redux will merge together...
type LndPaymentOnTimeProps =
    LenDasPaymentTimeStore.State // ... state we've requested from the Redux store
    & typeof LenDasPaymentTimeStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class PaymentOnTime extends React.PureComponent<LndPaymentOnTimeProps> {
    state = { sort: [] };

    public render() {
        return (
            <div className={"card card-dashboard card-payments" + (this.props.fullScreen ? " card-full-screen" : "")}>
                <div className="card-header">
                    <h4 className="card-title m-0">Loan Payment  <span className="text-bold">On Time</span> </h4>
                    <span>(Only loans which have payment history)</span>
                    {this.renderOptions()}
                </div>
                <div className={"card-body" + (this.props.collapse ? " d-none" : "")}>
                    {this.props.loading ? <CardLoading /> : ""}
                    <div className="row">
                        <div className="col-sm-6">
                            <p className="text-bold text-center m-0 block">Loan Payment On Time</p>
                            <hr className="separator" />
                            {
                                this.props.selectedPaymentData.length > 0 ? (
                                    <ChartPie
                                        loading={this.props.loading}
                                        refresh={this.props.refresh}
                                        sumPaymentsA={this.props.sumPaymentsA}
                                        sumPaymentsB={this.props.sumPaymentsB}
                                        sumPaymentsC={this.props.sumPaymentsC}
                                        sumPaymentsD={this.props.sumPaymentsD}
                                        sumPaymentsE={this.props.sumPaymentsE}
                                        onRefresh={this.props.refreshedPaymentOnTime}
                                    />
                                ) : (
                                        <div className="text-center mt-3">
                                            <span>No data available</span>
                                        </div>
                                    )
                            }
                        </div>
                        <div className="col-sm-6">
                            <h4 className="text-bold text-center">Number of Loans</h4>
                            <h5 className="text-bold text-center"> which % of their total payments were paid on time</h5>
                            {this.renderGridDetail()}
                            {
                                this.props.selectedPaymentData.length > 0 ? (
                                    <h6 className="text-justify mt-3">
                                        {`For Example. In the state of ${this.props.selectedPaymentData[0].stateName} we have ${this.props.selectedPaymentData[0].e} loans which the 100% of their payments were paid on time.`}<br />
                                        {`Another example. In the state of ${this.props.selectedPaymentData[0].stateName} we have ${this.props.selectedPaymentData[0].a} loans which the 0% - 40% of their total payments were paid on time.`}
                                    </h6>
                                ) : ""
                            }
                        </div>
                    </div>
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
                            <button type="button" className="btn btn-action btn-light" style={{ marginTop: "17px" }} onClick={this.normalPayments}>
                                <i className="fa fa-compress m-0"></i>
                            </button>
                        ) : (
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-payments-options" className="btn btn-action btn-light">
                                        <i className="fa fa-cog m-0"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            this.props.collapse ? (
                                                <Dropdown.Item className="dropdown-item" href="!#" onClick={this.expandPayments}>
                                                    <i className="ti-angle-down mr-2"></i> <span>Expand</span>
                                                </Dropdown.Item>
                                            ) : (
                                                    <Dropdown.Item className="dropdown-item" href="!#" onClick={this.collapsePayments}>
                                                        <i className="ti-angle-up mr-2"></i> <span>Collapse</span>
                                                    </Dropdown.Item>
                                                )
                                        }
                                        <Dropdown.Item className="dropdown-item" href="!#" onClick={this.fullScreenPayments}>
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
                data={this.props.selectedPaymentData}
                sortable={{
                    allowUnsort: true,
                    mode: 'single'
                }}
                sort={this.state.sort}
                onSortChange={this.sortChange}
                resizable
                className="table-noscroll table-dashboard"
            >
                <GridColumn key="stateName" field="StateName" title="State" width="87px" footerCell={(props: any) => (
                    <td colSpan={props.colSpan} style={props.style} className="font-weight-bold">
                        Count: {this.props.selectedPaymentData.length}
                    </td>
                )} />
                <GridColumn key="a" field="A" title="[0 - 40]" format="{0:n0}" width="80px" className="text-right" headerClassName="text-right" footerCell={(props: any) => (
                    <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                        {Utils.decimalFormat(this.props.selectedPaymentData.length > 0 ? this.props.selectedPaymentData.map(x => x.A).reduce((a: any, b: any) => a + b) : 0)}
                    </td>
                )} />
                <GridColumn key="b" field="B" title="[41 - 60]" format="{0:n0}" width="80px" className="text-right" headerClassName="text-right" footerCell={(props: any) => (
                    <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                        {Utils.decimalFormat(this.props.selectedPaymentData.length > 0 ? this.props.selectedPaymentData.map(x => x.B).reduce((a: any, b: any) => a + b) : 0)}
                    </td>
                )} />
                <GridColumn key="c" field="C" title="[61 - 80]" format="{0:n0}" width="80px" className="text-right" headerClassName="text-right" footerCell={(props: any) => (
                    <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                        {Utils.decimalFormat(this.props.selectedPaymentData.length > 0 ? this.props.selectedPaymentData.map(x => x.C).reduce((a: any, b: any) => a + b) : 0)}
                    </td>
                )} />
                <GridColumn key="d" field="D" title="[81 - 99]" format="{0:n0}" width="80px" className="text-right" headerClassName="text-right" footerCell={(props: any) => (
                    <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                        {Utils.decimalFormat(this.props.selectedPaymentData.length > 0 ? this.props.selectedPaymentData.map(x => x.D).reduce((a: any, b: any) => a + b) : 0)}
                    </td>
                )} />
                <GridColumn key="e" field="E" title="[100]" format="{0:n0}" width="80px" className="text-right" headerClassName="text-right" footerCell={(props: any) => (
                    <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                        {Utils.decimalFormat(this.props.selectedPaymentData.length > 0 ? this.props.selectedPaymentData.map(x => x.E).reduce((a: any, b: any) => a + b) : 0)}
                    </td>
                )} />
            </Grid>
        );
    }

    private sortChange = (event: any) => {
        this.setState({ sort: event.sort });
    }

    private expandPayments = (event: any) => {
        event.preventDefault();
        this.props.changeCollapse(false);
    }

    private collapsePayments = (event: any) => {
        event.preventDefault();
        this.props.changeCollapse(true);
    }

    private fullScreenPayments = (event: any) => {
        event.preventDefault();
        this.props.changeFullScreen(true);
    }

    private normalPayments = (event: any) => {
        event.preventDefault();
        this.props.changeFullScreen(false);
    }
}

export default connect(
    (state: ApplicationState) => state.lenDasPaymentTime,
    LenDasPaymentTimeStore.actions
)(PaymentOnTime as any);
