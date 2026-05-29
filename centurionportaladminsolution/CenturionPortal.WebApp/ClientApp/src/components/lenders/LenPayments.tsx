import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { Grid, GridColumn, GridToolbar, GridColumnMenuFilter, GridColumnMenuCheckboxFilter } from '@progress/kendo-react-grid';

import LenOptions from './LenOptions';
import { ApplicationState } from '../../store/index';
import { Auth, Utils } from '../../utilities/Functions';
import BreadCrumb from '../shared/BreadCrumb';
import * as LenPaymentStore from '../../store/stores/lenders/LenPaymentStore';
import { AggregateResult_Interface } from '../../store/commons/LenderCommon2';

// At runtime, Redux will merge together...
type LenPaymentProps =
    LenPaymentStore.State // ... state we've requested from the Redux store
    & typeof LenPaymentStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{ loanUid: string, skip: string, take: string }>; // ... plus incoming routing parameters


class LenPayments extends React.PureComponent<LenPaymentProps> {
    state = { dropdownExcel: false, dropdownColumns: false }
    _exporter: any;

    public componentDidMount() {


        // this.props.match.params.loanUid

        this.fetchPayments(this.props.excludeFunding, this.props.gridProps, true);
    }

    public componentDidUpdate() {
        if (this.props.exportExcel) {
            this.props.disableExport();
            this._exporter.save();
        }
    }

    public render() {
        return (
            <React.Fragment>
                <BreadCrumb title="Borrower Payment History" />
                <div className="card-group">
                    <div className="card">
                        <div className="card-header p-0">
                            <LenOptions option={2} loanUid={this.props.loanUid} />
                        </div>
                        <div className="card-body">
                            {this.renderHistoryGrid()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private renderHistoryGrid() {
         
        return (
            <React.Fragment>
             
                <ExcelExport
                    ref={(exporter: any) => this._exporter = exporter}
                    data={this.props.currentPage ? this.props.payments : this.props.paymentsAll}
                    fileName="Borrower_Loan_History.xlsx"
                >
                    {
                        this.props.columns.map(column => (
                            <ExcelExportColumn
                                key={column.columnName}
                                field={column.columnName}
                                title={column.title}
                                width={Number(column.width)}
                                headerCellOptions={{ textAlign: 'center' }}
                                cellOptions={{ textAlign: column.alignExcel, format: column.formatExcel }} />
                        ))
                    }
                </ExcelExport>

                <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" checked={this.props.excludeFunding} onChange={(event) => this.excludeFunding(event)} />
                    <label className="form-check-label">
                        Exclude Funding
                    </label>
                </div>

                <Grid
                    data={this.props.columns.filter(column => column.checked).length > 0 ? this.props.payments : []}
                    {...this.props.gridProps}
                    sortable={{ allowUnsort: true, mode: 'single' }}
                    pageable={{ buttonCount: 4, pageSizes: true }}
                    onDataStateChange={this.dataStateChange}
                    resizable={true}
                >
                    <GridToolbar>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item ml-0">
                                <button className="btn btn-primary" onClick={() => this.fetchPayments(this.props.excludeFunding, true)}>
                                    <i className="ti ti-reload"></i>
                                    <span className="d-none d-md-inline"> Refresh</span>
                                </button>
                            </li>
                            <li className="list-inline-item ml-0">
                                <Dropdown isOpen={this.state.dropdownExcel} toggle={this.toggleExcel}>
                                    <DropdownToggle caret className="btn btn-primary">
                                        <i className="fa fa-file-excel"></i>
                                        <span className="d-none d-md-inline"> Export</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={(event: any) => this.exportExcel(event, true)}>
                                            <i className="ti ti-layout-width-full mr-2"></i> This page
                                        </DropdownItem>
                                        <DropdownItem onClick={(event: any) => this.exportExcel(event, false)}>
                                            <i className="ti ti-layers-alt mr-2"></i> All pages
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                            <li className="list-inline-item dropdown mega-dropdown customize-column ml-0">
                                {this.renderCustomColumns()}
                            </li>
                        </ul>
                    </GridToolbar>
                    {
                        this.props.columns.filter(column => column.checked).map((column: any, index: number) => (
                            column.enum ? (
                                <GridColumn
                                    title={column.title}
                                    key={column.columnName}
                                    field={column.columnName}
                                    className={column.className}
                                    width={column.width + "px"}
                                    format={column.format}
                                    columnMenu={
                                        props =>
                                            <GridColumnMenuCheckboxFilter
                                                {...props}
                                                expanded={true}
                                                data={column.enum}
                                            />
                                    }
                                    footerCell={
                                        props => (
                                            <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                                                {!column.total ? (index == 0 ? (`Total (${this.props.gridProps.total} rc)`) : "") :

                                                    Utils.currencyFormat(this.props.summary[column.columnName])
                                                }

                                            </td>
                                        )
                                    }
                                />
                            ) : (
                                    <GridColumn
                                        title={column.title}
                                        key={column.columnName}
                                        field={column.columnName}
                                        className={column.className}
                                        width={column.width + "px"}
                                        format={column.format}
                                        filter={column.filter}
                                        columnMenu={
                                            props =>
                                                <GridColumnMenuFilter
                                                    {...props}
                                                    expanded={true}
                                                />
                                        }
                                        footerCell={
                                            props =>                                                    
                                                  (
                                                    <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                                                        {
                                                            Utils.currencyFormat(this.props.summary[props?.field!])                                                             
                                                        }
                                                    </td>
                                                )
                                            

                                        }
                                    />
                                )
                        ))
                    }
                </Grid>
            </React.Fragment>
        );
    }

    private renderCustomColumns() {
        return (
            <Dropdown isOpen={this.state.dropdownColumns} toggle={this.toggleColumns}>
                <DropdownToggle caret className="btn btn-primary waves-effect waves-dark">
                    <i className="fa fa-columns"></i>
                    <span className="d-none d-md-inline"> Colums</span>
                </DropdownToggle>
                <DropdownMenu className="animated bounceInDown">
                    <form name="customizeColumns" onSubmit={(event) => this.applyChangedColumns(event)}>
                        <div className="mega-dropdown-menu row">
                            <div className="col-md-7">
                                <ul className="list-group">
                                    {
                                        this.props.columns.map(column => (
                                            <li key={column.columnName}
                                                className={"list-group-item" + (this.props.activeColumn === column.columnName ? " active" : "")}
                                                onClick={() => this.activateColumn(column.columnName)}
                                            >
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" checked={column.checked} onChange={(event: any) => this.checkColumn(event, column.columnName)} />
                                                    <label className="form-check-label">
                                                        {column.title}
                                                    </label>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="col-md-5 mt-2">
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-fcicolor btn-block btn-sm">
                                            <i className="ti ti-save"></i> Apply
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block btn-sm mt-1" onClick={this.revertColumns}>
                                            <i className="fa fa-undo"></i> Cancel
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-info btn-block mt-1" onClick={this.moveColumnUp}>
                                            <i className="fa fa-arrow-up"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-info btn-block mt-1" onClick={this.movColumnDown}>
                                            <i className="fa fa-arrow-down"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block btn-sm mt-1" onClick={this.checkAllColumn}>
                                            <i className="ti ti-check-box"></i> Check All
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block btn-sm mt-1" onClick={this.uncheckAllColumn}>
                                            <i className="ti ti-control-stop"></i> Uncheck All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </DropdownMenu>
            </Dropdown>
        );
    }

    private fetchPayments = (excludeFunding: boolean = true, dataState: any, getColumns: boolean = false, forced: boolean = false) => {
        this.props.fetchPayments(this.props.match.params.loanUid, excludeFunding, dataState, getColumns, forced);
    }

    private excludeFunding = (event: any) => {
        this.fetchPayments(event.target.checked, this.props.gridProps, false, true);
    }

    private dataStateChange = (event: any) => {
        this.fetchPayments(this.props.excludeFunding, event.data);
    }

    private exportExcel = (event: any, currentPage: boolean = false) => {
        event.preventDefault();
        if (currentPage)
            this.props.enableExport();
        else
            this.props.fetchPaymentsAll();
    }

    private toggleExcel = () => {
        this.setState({ dropdownExcel: !this.state.dropdownExcel });
    }

    private toggleColumns = () => {
        this.setState({ dropdownColumns: !this.state.dropdownColumns });
    }

    private activateColumn = (field: string) => {
        this.props.setActiveColumn(field);
    }

    private checkColumn = (event: any, field: string) => {
        this.props.checkColumn(event.target.checked, field);
    }

    private checkAllColumn = (event: any) => {
        event.preventDefault();
        this.props.toggleAllColumns(true);
    }

    private uncheckAllColumn = (event: any) => {
        event.preventDefault();
        this.props.toggleAllColumns(false);
    }

    private moveColumnUp = (event: any) => {
        event.preventDefault();
        this.props.sortColumn(this.props.activeColumn, -1);
    }

    private movColumnDown = (event: any) => {
        event.preventDefault();
        this.props.sortColumn(this.props.activeColumn, 1);
    }

    private revertColumns = (event: any) => {
        event.preventDefault();
        this.toggleColumns();
        this.props.revertColumns();
    }

    private applyChangedColumns = (event: any) => {
        event.preventDefault();
        this.props.applyChangedColumns();
    }
}

export default connect(
    (state: ApplicationState) => state.lenPayments,
    LenPaymentStore.actions
)(LenPayments as any);
