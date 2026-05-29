import * as React from 'react';
import { connect } from 'react-redux';

import { ApplicationState } from '../../store/index';
import { Auth, Utils } from '../../utilities/Functions';
import * as Enums from '../../utilities/Enums';
import * as LenAttachmentStore from '../../store/stores/lenders/LenAttachmentStore';
import { RouteComponentProps } from 'react-router';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { Grid, GridToolbar, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { ButtonDropdown, DropdownToggle, DropdownMenu, Dropdown, DropdownItem } from 'reactstrap';
import RangeDate from '../shared/RangeDate'

type LenAttachmentProps =
    LenAttachmentStore.State
    & typeof LenAttachmentStore.actions
    & RouteComponentProps<{ viewType: string }>;

class LenAttachment extends React.PureComponent<LenAttachmentProps>
{
    _exporter: any;
    state = {
        dropDownExcel: false,
        dropDownColumn: false,
    }

    public componentDidMount() {
        this.setViewType(Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.viewType, false) as number);
    }

    public componentDidUpdate() {
        if (this.props.viewType !== Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.viewType, false)) {
            this.setViewType(Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.viewType, false) as number);
        }

        if (this.props.exportExcel) {
            this.props.disableExport();
            this._exporter.save();
        }

        if (this.props.forceUpdate) {
            this.props.disabledForceUpdate();
            this.forceUpdate();
        }

        if (this.props.fetchAutomatic) {
            this.props.disabledFetchAutomatic();
            this.fetchAttachment(this.props.gridProps, false, true);
        }
    }

    public render() {
        return (
            <React.Fragment>
                <div className="card-group">
                    <div className="card">
                        <div className="card-header p-2 text-center">
                            {Utils.getValueEnum(Enums.AttachmentViewEnum, this.props.viewType)}
                        </div>
                        <div className="card-body p-1">
                            <div className="row">
                                <div className="col-md-4">
                                    {this.renderLoanInformation()}
                                </div>
                                <div className="col-md-8">
                                    {
                                        this.props.viewType !== Enums.AttachmentViewEnum.TAX_FORMS
                                        ?
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <RangeDate
                                                        filterButton={true}
                                                        onChange={this.filterChange}
                                                        onClick={() => this.fetchAttachment(this.props.gridProps, false, true)}
                                                        nameDateFrom="filterDateFrom"
                                                        nameDateTo="filterDateTo"
                                                        nameRangeType="filterRangeDate"
                                                        valueDateFrom={this.props.filterDateFrom}
                                                        valueDateTo={this.props.filterDateTo}
                                                        valueRangeType={this.props.filterRangeDate}
                                                         />
                                                </div>
                                            </div>
                                        : ""
                                    }
                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.renderGrilla()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private renderLoanInformation() {
        return (
            <React.Fragment>
                <div className="card-group">
                    <div className="card mb-1">
                        <div className="card-header p-1 pl-2">
                            Account
                        </div>
                        <div className="card-body p-1 pt-2 m-0">
                            <div className="form-group col-12 pl-1 pr-1">
                                <span className="align-middle">
                                    <select className="form-control form-control-sm text-dark p-0" name="Account" onChange={this.fetchResumenInformation} >
                                        <option value="">ALL</option>
                                        {
                                            this.props.serviceMaps.map(s => {
                                                return <option key={s.ParentUid} value={s.ParentUid}>{s.Account + " - " + s.FullName}</option>
                                            })
                                        }
                                    </select>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-group">
                    <div className="card">
                        <div className="card-header p-1 text-center">
                            Lender Information
                        </div>
                        <div className="card-body p-2 pt-1 pb-1">
                            <div className="row">
                                <div className="col-6 data-label">FCI Service Program</div>
                                <div className="col-6 data-display text-right">
                                    {this.props.currentLender !== undefined ? (this.props.currentLender.DepartmentUid == 1 ? "Specialty" : "Standard") : ''}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 data-label">Street</div>
                                <div className="col-6 data-display text-right">
                                    {this.props.currentLender !== undefined ? this.props.currentLender.Street : ''}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 data-label">City</div>
                                <div className="col-6 data-display text-right">
                                    {this.props.currentLender !== undefined ? this.props.currentLender.City : ''}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 data-label">State</div>
                                <div className="col-6 data-display text-right">
                                    {this.props.currentLender !== undefined ? this.props.currentLender.State : ''}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 data-label">Zip Code</div>
                                <div className="col-6 data-display text-right">
                                    {this.props.currentLender !== undefined ? this.props.currentLender.ZipCode : ''}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 data-label">Home Phone</div>
                                <div className="col-6 data-display text-right">
                                    {this.props.currentLender !== undefined ? this.props.currentLender.HomePhone : ''}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 data-label">Work Phone</div>
                                <div className="col-6 data-display text-right">
                                    {this.props.currentLender !== undefined ? this.props.currentLender.WorkPhone : ''}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 data-label">Mobile Phone</div>
                                <div className="col-6 data-display text-right">
                                    {this.props.currentLender !== undefined ? this.props.currentLender.MobilePhone : ''}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 data-label">Fax</div>
                                <div className="col-6 data-display text-right">
                                    {this.props.currentLender !== undefined ? this.props.currentLender.Fax : ''}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 data-label">Email</div>
                                <div className="col-6 data-display text-right">
                                    {this.props.currentLender !== undefined ? this.props.currentLender.Email : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private renderGrilla() {
        return (
            <React.Fragment>
                <ExcelExport
                    ref={(exporter: any) => this._exporter = exporter}
                    data={this.props.exportCurrentPage ? this.props.attachmentPage : this.props.attachmentAll}
                    fileName={this.props.match.params.viewType + "-" +
                        (this.props.currentLender != undefined ? this.props.currentLender.Account : "all_account") + "-" +
                        (this.props.exportCurrentPage ? "page" + ((this.props.gridProps.skip / this.props.gridProps.take) + 1) : "all_pages") +
                        ".xlsx"}
                >
                    {
                        this.props.columns.map(column => (
                            (this.props.currentLender === undefined || this.props.currentLender.Uid === undefined || (this.props.currentLender.Uid !== "" && column.columnName !== "ParentAccount"))
                                ? <ExcelExportColumn
                                    key={column.columnName}
                                    field={column.columnName}
                                    title={column.title}
                                    width={Number(column.width)}
                                    headerCellOptions={{ textAlign: 'center' }}
                                    cellOptions={{ textAlign: column.alignExcel }} />
                                : ""
                        ))
                    }
                </ExcelExport>

                <Grid
                    data={this.props.columns.filter(column => column.checked).length > 0 ? this.props.attachmentPage : []}
                    {...this.props.gridProps}
                    sortable={{ allowUnsort: true, mode: 'single' }}
                    pageable={{ buttonCount: 4, pageSizes: true }}
                    onDataStateChange={this.dataStateChange}
                    className="table-noscroll"
                    resizable
                >
                    <GridToolbar>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item ml-0">
                                <button className="btn btn-block btn-primary" onClick={() => this.fetchAttachment(this.props.gridProps, false, true)}>
                                    <i className="ti-reload"></i>
                                    <span className="d-none d-md-inline"> Refresh</span>
                                </button>
                            </li>
                            <li className="list-inline-item ml-0">
                                <Dropdown isOpen={this.state.dropDownExcel} toggle={this.toggleExcel}>
                                    <DropdownToggle className="btn btn-block btn-primary dropdown-toggle"  >
                                        <i className="ti ti-share"></i>
                                        <span className="d-none d-md-inline"> Export</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem className="dropdown-item btn-fcicolor btn-sm p-2 pl-3" onClick={(event: any) => this.exportExcel(event, true)}>
                                            <i className="ti ti-layout-width-full mr-2"></i> This page
                                        </DropdownItem>
                                        <DropdownItem className="dropdown-item btn-fcicolor btn-sm p-2 pl-3" onClick={(event: any) => this.exportExcel(event, false)}>
                                            <i className="ti ti-layers-alt mr-2"></i> All pages
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                        </ul>
                    </GridToolbar>

                    {
                        this.props.columns.filter(column => column.checked).length > 0 ? (
                            <GridColumn title="" width="30px"
                                cell={(props: any) => (
                                    <td>
                                        <button className="badge mr-2" title="download" onClick={() => this.downloadAttachment(props.dataItem)}>
                                            <i className="fa fa-download"></i>
                                        </button>
                                    </td>
                                )}
                            />
                        ) : ""
                    }
                    {
                        this.props.columns.filter(column => column.checked).map(column => (
                            (this.props.currentLender === undefined || this.props.currentLender.Uid === undefined || (this.props.currentLender.Uid !== "" && column.columnName !== "ParentAccount"))
                                ? <GridColumn
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
                                : ""
                        ))
                    }
                </Grid>
            </React.Fragment>
        );
    }

    private filterChange = (event: any) => {
        this.props.filterChange(event.value);
    }

    private dataStateChange = (event: any) => {
        this.props.fetchAttachmentsPage(this.props.currentLender?.Uid, this.props.viewType, this.props.filterDateFrom, this.props.filterDateTo, event.data, false, false);
    }

    private downloadAttachment = (dataItem: any) => {
        this.props.downloadAttchment(dataItem.Uid, dataItem.Description, this.props.viewType);
    }

    private exportExcel = (event: any, currentPage: boolean = false) => {
        event.preventDefault();
        if (currentPage)
            this.props.enableExport(true);
        else
            this.props.fetchAttachmentsAll(this.props.currentLender?.Uid, this.props.viewType);
    }

    private fetchAttachment = (dataState: any, getColumns: boolean = false, force: boolean = false) => {
        this.props.fetchAttachmentsPage(this.props.currentLender?.Uid, this.props.viewType, this.props.filterDateFrom, this.props.filterDateTo, dataState, getColumns, false, force);
    }

    private fetchResumenInformation = (event: any) => {
        this.props.fetchResumenInformation(event.target.value);
        this.props.fetchAttachmentsPage(event.target.value, this.props.viewType, this.props.filterDateFrom, this.props.filterDateTo, this.props.gridProps, false, true);
    }

    private setViewType = (viewType: number) => {
        this.props.setViewType(viewType);
        this.props.fetchServiceMaps(viewType);
        this.props.fetchAttachmentsPage('', viewType, this.props.filterDateFrom, this.props.filterDateTo, this.props.gridProps, false);
    }

    private toggleExcel = () => {
        this.setState({ dropDownExcel: !this.state.dropDownExcel });
    }
}

export const LenAttachment_Url = '/attachment/:viewType';
export const LenAttachment_LenderStatements_Url = '/attachment/' + Utils.getValueEnum(Enums.AttachmentViewEnum, Enums.AttachmentViewEnum.LENDER_STATEMENTS, false).toLowerCase();
export const LenAttachment_NotificationOfDeposit_Url = '/attachment/' + Utils.getValueEnum(Enums.AttachmentViewEnum, Enums.AttachmentViewEnum.NOTIFICATION_OF_DEPOSIT, false).toLowerCase();
export const LenAttachment_TaxForms_Url = '/attachment/' + Utils.getValueEnum(Enums.AttachmentViewEnum, Enums.AttachmentViewEnum.TAX_FORMS, false).toLowerCase();

export default connect(
    (state: ApplicationState) => state.lenAttachment, LenAttachmentStore.actions
)(LenAttachment as any);