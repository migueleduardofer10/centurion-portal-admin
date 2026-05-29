import * as React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

import ChartDonut from '../charts/ChartDonut';
import CharMapUSA from '../charts/ChartMapUSA';
import CardLoading from '../../shared/CardLoading';
import { Utils } from '../../../utilities/Functions';
import { ApplicationState } from '../../../store/index';
import * as LenDasLoanStatesStore from '../../../store/stores/lenders/dashboard/LenDasLoanStatesStore';

// At runtime, Redux will merge together...
type LndLoanByStateProps =
    LenDasLoanStatesStore.State // ... state we've requested from the Redux store
    & typeof LenDasLoanStatesStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class LoanStates extends React.PureComponent<LndLoanByStateProps> {
    state = { sort: [] };

    public render() {
        return (   
            <div className={"card card-dashboard card-states" + (this.props.fullScreen ? " card-full-screen" : "")}>               
                <div className="card-header">
                    <h4 className="card-title m-0">Loan Report by <span className="text-bold">State</span></h4>
                    {this.renderOptions()}
                </div>
                <div className={"card-body" + (this.props.collapse ? " d-none" : "")}>
                    {this.props.loading ? <CardLoading /> : ""}
                    <div className="row">
                        <div className="col-md-6">
                            <CharMapUSA
                                loading={this.props.loading}
                                update={this.props.update}
                                action={this.props.action}
                                loansByState={this.props.loanStates}
                                onUpdate={this.props.updateLoansByState}
                                onClick={this.props.refreshLoanState}
                            />
                        </div>
                        <div className="col-md-6">
                            <h5 className="text-bold text-center">Percentage of Total</h5>
                            <hr className="separator" />
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="text-bold text-center m-0 block">Total Loans</p>
                                    <hr className="separator" />
                                    <ChartDonut
                                        displaySelected="Count"
                                        loading={this.props.loading}
                                        refresh={this.props.refresh}
                                        onRefresh={this.props.refreshedLoanState}
                                        selectedValue={this.props.selectedLoanData.length > 0 ? this.props.selectedLoan : 0}
                                        noSelectedValue={this.props.selectedLoanData.length > 0 ? (this.props.totalLoans - this.props.selectedLoan) : 100}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <p className="text-bold text-center m-0 block">UPB Loans</p>
                                    <hr className="separator" />
                                    <ChartDonut
                                        displaySelected="UPB"
                                        loading={this.props.loading}
                                        refresh={this.props.refresh}
                                        onRefresh={this.props.refreshedLoanState}
                                        selectedValue={this.props.selectedLoanData.length > 0 ? this.props.selectedUPB : 0}
                                        noSelectedValue={this.props.selectedLoanData.length > 0 ? (this.props.totalUPB - this.props.selectedUPB) : 100}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <p className="text-bold text-center m-0 block">Total Delinquency</p>
                                    <hr className="separator" />
                                    <ChartDonut
                                        displaySelected="Total Del."
                                        loading={this.props.loading}
                                        refresh={this.props.refresh}
                                        onRefresh={this.props.refreshedLoanState}
                                        selectedValue={this.props.selectedLoanData.length > 0 ? this.props.selectedLoanDelinquency : 0}
                                        noSelectedValue={this.props.selectedLoanData.length > 0 ? (this.props.totalLoansDelinquency - this.props.selectedLoanDelinquency) : 100}
                                    />
                                </div>
                            </div>
                            <h5 className="text-bold text-center mt-2">List of Selected States</h5>
                            {this.renderGridDetail()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private renderOptions() {
        return (
            <ul className="card-header-tabs border-light">
                <li>
                    <div className="float-right">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-states" className="btn btn-success">
                                Select / Deselect All
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className="dropdown-item" href="!#" onClick={this.selectAllStates}>
                                    Select All States
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" href="!#" onClick={this.deselectAllStates}>
                                    Deselect All States
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </li>
                <li className="card-actions">
                    {
                        this.props.fullScreen ? (
                            <button type="button" className="btn btn-action btn-light" style={{ marginTop: "6px" }} onClick={this.normalStates}>
                                <i className="fa fa-compress m-0"></i>
                            </button>
                        ) : (
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-states-options" className="btn btn-action btn-light">
                                        <i className="fa fa-cog m-0"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            this.props.collapse ? (
                                                <Dropdown.Item className="dropdown-item" href="!#" onClick={this.expandStates}>
                                                    <i className="ti-angle-down mr-2"></i> <span>Expand</span>
                                                </Dropdown.Item>
                                            ) : (
                                                    <Dropdown.Item className="dropdown-item" href="!#" onClick={this.collapseStates}>
                                                        <i className="ti-angle-up mr-2"></i> <span>Collapse</span>
                                                    </Dropdown.Item>
                                                )
                                        }
                                        <Dropdown.Item className="dropdown-item" href="!#" onClick={this.refreshLoanStates}>
                                            <i className="icon-refresh mr-2"></i> <span>Refresh</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="dropdown-item" href="!#" onClick={this.fullScreenStates}>
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
                data={this.props.selectedLoanData}
                sortable={{
                    allowUnsort: true,
                    mode: 'single'
                }}
                sort={this.state.sort}
                onSortChange={this.sortChange}
                resizable
                className="table-noscroll table-dashboard"
            >
                <GridColumn key="stateName" field="StateName" title="State" width="164px" footerCell={(props: any) => (
                    <td colSpan={props.colSpan} style={props.style} className="font-weight-bold">
                        Count: {this.props.selectedLoanData.length}
                    </td>
                )} />
                <GridColumn key="totalLoans" field="TotalLoans" title="#" format="{0:n0}" width="91px" className="text-right" headerClassName="text-right" footerCell={(props: any) => (
                    <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                        {Utils.decimalFormat(this.props.selectedLoanData.length > 0 ? this.props.selectedLoanData.map(x => x.TotalLoans).reduce((a: any, b: any) => a + b) : 0)}
                    </td>
                )} />
                <GridColumn key="upb" field="UPB" title="UPB" width="141px" format="{0:c}" className="text-right" headerClassName="text-right" footerCell={(props: any) => (
                    <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                        {Utils.currencyFormat(this.props.selectedLoanData.length > 0 ? this.props.selectedLoanData.map(x => x.UPB).reduce((a: any, b: any) => a + b) : 0)}
                    </td>
                )} />
                <GridColumn key="totalDelinquency" field="TotalDelinquency" title="# Delinquency" width="91px" format="{0:n0}" className="text-right" headerClassName="text-right" footerCell={(props: any) => (
                    <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                        {Utils.decimalFormat(this.props.selectedLoanData.length > 0 ? this.props.selectedLoanData.map(x => x.TotalDelinquency).reduce((a: any, b: any) => a + b) : 0)}
                    </td>
                )} />
            </Grid>
        );
    }

    private sortChange = (event: any) => {
        this.setState({ sort: event.sort });
    }

    private selectAllStates = (event: any) => {
        event.preventDefault();
        this.props.selectAllStates();
    }

    private deselectAllStates = (event: any) => {
        event.preventDefault();
        this.props.deselectAllStates();
    }

    private refreshLoanStates = (event: any) => {
        event.preventDefault();
        this.props.fetchLoanStates();
    }

    private expandStates = (event: any) => {
        event.preventDefault();
        this.props.changeCollapse(false);
    }

    private collapseStates = (event: any) => {
        event.preventDefault();
        this.props.changeCollapse(true);
    }

    private fullScreenStates = (event: any) => {
        event.preventDefault();
        this.props.changeFullScreen(true);
    }

    private normalStates = (event: any) => {
        event.preventDefault();
        this.props.changeFullScreen(false);
    }
}

export default connect(
    (state: ApplicationState) => state.lenDasLoanStates,
    LenDasLoanStatesStore.actions
)(LoanStates as any);
