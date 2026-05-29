import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ButtonDropdown, DropdownToggle, DropdownMenu, Dropdown, DropdownItem } from 'reactstrap';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { Grid, GridColumn, GridDetailRow, GridToolbar, GridColumnMenuFilter, GridColumnMenuCheckboxFilter, GridNoRecords } from '@progress/kendo-react-grid'

import LenOptions from './LenOptions';
import { ApplicationState } from '../../store/index';
import { Auth, Utils } from '../../utilities/Functions';
import BreadCrumb from '../shared/BreadCrumb';
import * as LenChargesStore from '../../store/stores/lenders/LenChargesStore';

// At runtime, Redux will merge together...
type LenChargesProps =
    LenChargesStore.State // ... state we've requested from the Redux store
    & typeof LenChargesStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{ loanUid: string }>; // ... plus incoming routing parameters


class ChargesDetailsGrid extends GridDetailRow {
    render() {
        return (
            
            <Grid data={this.props.dataItem.ChargesDetails}>
                <GridNoRecords>
                    {this.props.dataItem.ChargesDetailsIsLoading
                        ? <div><i className="fa fa-spinner fa-spin fa-2x fa-fw text-muted"></i><span className="sr-only">Loading...</span></div>
                        : "No records available"
                    }
                </GridNoRecords>
                <GridColumn title="Date" key="Date" field="Date" className="text-center" width="40px" format="{0:d}"
                    footerCell={
                        props => (
                            <td colSpan={props.colSpan} style={props.style} className="text-center font-weight-bold">
                                ({this.props.dataItem.ChargesDetails != null ? this.props.dataItem.ChargesDetails.length : 0})
                            </td>
                        )
                    }/>
                <GridColumn title="Payer Name" key="VendorName" field="VendorName" className="text-center" width="100px" />
                <GridColumn title="Reference" key="Reference" field="Reference" className="text-center" width="80px" />
                <GridColumn title="Amount" key="Amount" field="Amount" className="text-right" width="50px" format="{0:c}" />
                <GridColumn title="Principal" key="PrinVendor" field="PrinVendor" className="text-right" width="50px" format="{0:c}"
                    footerCell={
                        props => (
                            <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                                {Utils.currencyFormat(Utils.sum(this.props.dataItem.ChargesDetails, "PrinVendor"))}
                            </td>
                        )
                    }/>
                <GridColumn title="Interest" key="IntVendor" field="IntVendor" className="text-right" width="50px" format="{0:c}"
                    footerCell={
                        props => (
                            <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                                {Utils.currencyFormat(Utils.sum(this.props.dataItem.ChargesDetails, "IntVendor"))}
                            </td>
                        )
                    }/>
                <GridColumn title="Principal" key="PrinBehalf" field="PrinBehalf" className="text-right" width="50px" format="{0:c}"
                    footerCell={
                        props => (
                            <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                                {Utils.currencyFormat(Utils.sum(this.props.dataItem.ChargesDetails, "PrinBehalf"))}
                            </td>
                        )
                    }/>
                <GridColumn title="Interest" key="IntBehalf" field="IntBehalf" className="text-right" width="50px" format="{0:c}"
                    footerCell={
                        props => (
                            <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                                {Utils.currencyFormat(Utils.sum(this.props.dataItem.ChargesDetails, "IntBehalf"))}
                            </td>
                        )
                    } />                   
            </Grid>
        );
    }
}


class LenCharges extends React.PureComponent<LenChargesProps>
{
    _exporter: any;
    state = {
        dropdownExcel: false
    };

    public componentDidMount() {
        this.fetchChargesPage(this.props.hidePaid, this.props.gridProps, true);
    }

    public componentDidUpdate() {
        if (this.props.exportExcel) {
            this.props.disableExport();
            this._exporter.save();
        }
        if (this.props.forceUpdate) {
            this.props.disableForceUpdate();
            this.forceUpdate();
        }
    }

    private expandChange = (event: any) => {
        event.dataItem.expanded = !event.dataItem.expanded;
        if (event.dataItem.ChargesDetails == null || event.dataItem.ChargesDetails.Length == 0) {
            this.props.fetchChargeDetails(event.dataItem, this.props.chargesPage);
        }
        //else {
            this.forceUpdate();
        //}
    }

    public render() {
        return (
            <React.Fragment>
                <BreadCrumb title="Borrower Charges" />
                <div className="card-group">
                    <div className="card">
                        <div className="card-header p-0">
                            <LenOptions option={5} loanUid={this.props.loanUid} />
                        </div>
                        <div className="card-body">
                            {this.renderChargeGrid()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }



    private renderChargeGrid() {
        return (
            <React.Fragment>
                <ExcelExport
                    ref={(exporter: any) => this._exporter = exporter}
                    data={this.props.currentPage ? this.props.chargesPage : this.props.chargesAll}
                    fileName="Lender_Loan_Charges.xlsx"
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
                    <input className="form-check-input" type="checkbox" checked={this.props.hidePaid} onChange={(event) => this.hidePaid(event)} />
                    <label className="form-check-label">
                        Hide Paid
                    </label>
                </div>

                <Grid
                    data={this.props.columns.filter(column => column.checked).length > 0 ? this.props.chargesPage : []}
                    {...this.props.gridProps}
                    sortable={{ allowUnsort: true, mode: 'single' }}
                    pageable={{ buttonCount: 4, pageSizes: true }}
                    onDataStateChange={this.dataStateChange}
                    detail={ChargesDetailsGrid}
                    expandField="expanded"
                    onExpandChange={this.expandChange}
                    resizable={true}
                >
                    <GridToolbar>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item ml-0">
                                <button className="btn btn-success" onClick={() => this.fetchChargesPage(this.props.hidePaid, this.props.gridProps, true, true)}>
                                    <i className="ti-reload"></i>
                                    <span className="d-none d-md-inline"> Refresh</span>
                                </button>
                            </li>
                            <li className="list-inline-item ml-0">
                                <Dropdown isOpen={this.state.dropdownExcel} toggle={this.toggleExcel}>
                                    <DropdownToggle caret className="btn btn-success">
                                        <i className="ti ti-share"></i>
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
                                            //onFilterChange={this.filterChange}
                                            />
                                    }
                                    footerCell={
                                        props => (
                                            <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                                                {!column.total ? (index == 0 ? (`Total (${this.props.gridProps.total} rc)`) : "") :
                                                    Utils.currencyFormat(this.props.summary[column.columnName])}
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
                                                //onFilterChange={this.filterChange}
                                                />
                                        }
                                        footerCell={
                                            props => (
                                                <td colSpan={props.colSpan} style={props.style} className="text-right font-weight-bold">
                                                    {!column.total ? (index == 0 ? (`Total (${this.props.gridProps.total} rc)`) : "") :
                                                        Utils.currencyFormat(this.props.summary[column.columnName])}
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
            <ButtonDropdown isOpen={this.props.showDropdown} toggle={this.toggleDropdown}>
                <DropdownToggle className="btn btn-success dropdown-toggle waves-effect waves-dark">
                    <i className="fa fa-columns"></i>
                    <span className="d-none d-md-inline"> Colums</span>
                </DropdownToggle>
                <form name="customizeColumns" onSubmit={this.applyChangedColumns}>
                    <DropdownMenu className="dropdown-menu animated bounceInDown">
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
                                            <i className="fa fa-save"></i> Apply
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
                                            <i className="far fa-check-square"></i> Check All
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block btn-sm mt-1" onClick={this.uncheckAllColumn}>
                                            <i className="far fa-square"></i> Uncheck All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DropdownMenu>
                </form>
            </ButtonDropdown>
        );
    }

    private fetchChargesPage = (hidePaid: boolean = false, dataState: any, getColumns: boolean = false, forced: boolean = false) => {
        this.props.fetchChargesPage(this.props.match.params.loanUid, hidePaid, dataState, getColumns, forced);
    }

    private hidePaid = (event: any) => {
        this.fetchChargesPage(event.target.checked, this.props.gridProps, false, true);
    }

    private dataStateChange = (event: any) => {
        this.fetchChargesPage(this.props.hidePaid, event.data);
    }

    private exportExcel = (event: any, currentPage: boolean = false) => {
        event.preventDefault();
        if (currentPage)
            this.props.enableExport();
        else
            this.props.fetchChargesAll();
    }

    private toggleExcel = () => {
        this.setState({ dropdownExcel: !this.state.dropdownExcel });
    }

    private toggleDropdown = () => {
        this.props.toggleDropdown(!this.props.showDropdown);
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
        this.toggleDropdown();
        this.props.revertColumns();
    }

    private applyChangedColumns = (event: any) => {
        event.preventDefault();
        this.props.applyChangedColumns();
    }
}

export default connect(
    (state: ApplicationState) => state.lenCharges,
    LenChargesStore.actions
) (LenCharges as any);