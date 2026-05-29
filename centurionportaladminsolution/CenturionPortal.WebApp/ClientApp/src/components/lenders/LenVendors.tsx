import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { Grid, GridColumn, GridToolbar, GridColumnMenuFilter, GridColumnMenuCheckboxFilter } from '@progress/kendo-react-grid';

import BreadCrumb from '../shared/BreadCrumb';
import { Auth } from '../../utilities/Functions';
import { ApplicationState } from '../../store/index';
import * as LenLoanStore from '../../store/stores/lenders/LenLoanStore';

// At runtime, Redux will merge together...
type LenLoanProps =
    LenLoanStore.State // ... state we've requested from the Redux store
    & typeof LenLoanStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters


class LenVendor extends React.PureComponent<LenLoanProps> {
    state = { dropdownExcel: false, dropdownColumns: false }
    _exporter: any;

    public componentDidMount() {
        this.fetchLoans(this.props.gridProps, true);
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
                <BreadCrumb title="Primary Loans" />
                <div className="card-group">
                    <div className="card">
                        <div className="card-header">
                            <h4 id="tabelLabel">Primary Loans</h4>
                        </div>
                        <div className="card-body">
                            {this.renderLoanGrid()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private renderLoanGrid() {
        return (
            <React.Fragment>
            
                <ExcelExport
                    ref={(exporter: any) => this._exporter = exporter}
                    data={this.props.currentPage ? this.props.loans : this.props.loansAll}
                    fileName="Lender_Loans.xlsx"
                >
                    {
                        this.props.columns.map(column => (
                            column.isNumber ? (
                                <ExcelExportColumn key={column.columnName} field={column.columnName} title={column.title} width={Number(column.width)}
                                    headerCellOptions={{ textAlign: 'center' }} cellOptions={{ textAlign: column.align, format: column.formatExcel }} />
                            ) : (
                                    <ExcelExportColumn key={column.columnName} field={column.columnName} title={column.title} width={Number(column.width)}
                                        headerCellOptions={{ textAlign: 'center' }} cellOptions={{ textAlign: column.align }} />
                                )
                        ))
                    }
                </ExcelExport>

                <Grid
                    data={this.props.columns.filter(column => column.checked).length > 0 ? this.props.loans : []}
                    {...this.props.gridProps}
                    sortable={{ allowUnsort: true, mode: 'single' }}
                    pageable={{ buttonCount: 4, pageSizes: true }}
                    onDataStateChange={this.dataStateChange}
                    resizable={true}
                >
                    <GridToolbar>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item ml-0">
                                <button className="btn btn-primary" onClick={() => this.fetchLoans(true)}>
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

                    <GridColumn title="" width="120px"
                        cell={(props: any) => (
                            <td className="text-center">
                                <Link className="badge badge-warning" title="Payment History" to={"/lender/loan/" + props.dataItem["LoanUid"] + "/payments"}>
                                    <i className="fa fa-history"></i> Pay. Hist.
                                </Link>
                            </td>
                        )}
                    />

                    {
                        this.props.columns.filter(column => column.checked).map((column: any) => (
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
                                                <div className="form-check m-0">
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
                                        <button type="submit" className="btn btn-light btn-block">
                                            <i className="ti ti-save"></i> Apply
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block mt-1" onClick={this.revertColumns}>
                                            <i className="fa fa-undo"></i> Cancel
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-info btn-block mt-1" onClick={this.moveColumnUp}>
                                            <i className="fa fa-arrow-up m-0"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-info btn-block mt-1" onClick={this.movColumnDown}>
                                            <i className="fa fa-arrow-down m-0"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block mt-1" onClick={this.checkAllColumn}>
                                            <i className="ti ti-check-box"></i> Check All
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block mt-1" onClick={this.uncheckAllColumn}>
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

    private fetchLoans = (dataState: any, getColumns: boolean = false, forced: boolean = false) => {
        this.props.fetchLoans(dataState, getColumns, forced);
    }

    private dataStateChange = (event: any) => {
        this.fetchLoans(event.data);
    }

    private exportExcel = (event: any, currentPage: boolean) => {
        event.preventDefault();
        if (currentPage)
            this.props.enableExport();
        else
            this.props.fetchLoansAll();
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
    (state: ApplicationState) => state.lenLoans,
    LenLoanStore.actions
)(LenVendor as any);
