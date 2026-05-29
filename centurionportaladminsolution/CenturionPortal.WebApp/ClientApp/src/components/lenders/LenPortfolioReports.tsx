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
import RangeDate from '../shared/RangeDate';
import { UserSetting_Card } from '../users/UserSetting';
import { Switch } from '@progress/kendo-react-inputs';
import { initialLenderDisbursement } from '../../store/commons/LenderCommon';

type LenPortfolioReportsProps =
    //LenAttachmentStore.State
    //& typeof LenAttachmentStore.actions
    /*&*/ RouteComponentProps<{ reportType: string }>;

class LenPortfolioReports extends React.PureComponent<LenPortfolioReportsProps>
{
    _exporter: any;
    state = {
        dropDownExport: false,
        IncludePrint: true,
        LenderDisbursementColumns: initialLenderDisbursement
    }

    public componentDidMount() {
        //this.setViewType(Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.reportType, false) as number);
    }

    public componentDidUpdate() {
        //if (this.props.viewType !== Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.reportType, false)) {
        //    this.setViewType(Utils.getKeyEnum(Enums.AttachmentViewEnum, this.props.match.params.reportType, false) as number);
        //}

        //if (this.props.exportExcel) {
        //    this.props.disableExport();
        //    this._exporter.save();
        //}

        //if (this.props.forceUpdate) {
        //    this.props.disabledForceUpdate();
        //    this.forceUpdate();
        //}

        //if (this.props.fetchAutomatic) {
        //    this.props.disabledFetchAutomatic();
        //    this.fetchAttachment(this.props.gridProps, false, true);
        //}
    }

    public render() {
        return (
            <React.Fragment>
                <UserSetting_Card title='Lender Disbursement' cardBodyClassName='p-1 '>
                    <div className="row">
                        <div className="col-6">
                            <UserSetting_Card title='General Information ' cardBodyClassName='p-1'>
                                <div className="form-row p-1 mr-1 d-inline-flex">
                                    <div className="col-12">
                                    </div>
                                </div>
                            </UserSetting_Card>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-12">
                                    <UserSetting_Card title='Lender Disbursement Information ' cardBodyClassName='p-1'>
                                        <div className={'form-row p-1 mr-1 d-inline-flex'} >
                                            <div className="d-inline-block">
                                                <small>Include Print:</small>
                                            </div>
                                            <div className="d-inline-block" >
                                                <Switch checked={this.state.IncludePrint} onChange={this.SwitchOnChange} />
                                            </div>
                                        </div>
                                    </UserSetting_Card>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <RangeDate filterButton={false} >
                                    </RangeDate>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Grid
                                className="table-scroll"
                                scrollable="scrollable"
                                resizable
                            >

                                <GridToolbar>
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item ml-0">
                                            <button className="btn btn-block btn-primary">
                                                <i className="ti-reload"></i>
                                                <span className="d-none d-md-inline"> Refresh</span>
                                            </button>
                                        </li>
                                        <li className="list-inline-item ml-0">
                                            <Dropdown isOpen={this.state.dropDownExport} toggle={this.toggleExport}>
                                                <DropdownToggle className="btn btn-block btn-primary dropdown-toggle"  >
                                                    <i className="ti ti-share"></i>
                                                    <span className="d-none d-md-inline"> Export</span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem className="dropdown-item btn-fcicolor btn-sm p-2 pl-3">
                                                        <i className="ti ti-layout-width-full mr-2"></i> Excel
                                            </DropdownItem>
                                                    <DropdownItem className="dropdown-item btn-fcicolor btn-sm p-2 pl-3">
                                                        <i className="ti ti-layers-alt mr-2"></i> PDF
                                            </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </li>
                                    </ul>
                                </GridToolbar>
                                {
                                    this.state.LenderDisbursementColumns.filter(column => column.checked).map(column => (
                                        <GridColumn
                                            title={column.title}
                                            key={column.columnName}
                                            field={column.columnName}
                                            className={column.className}
                                            width={column.width + "px"}
                                            format={column.format}
                                           
                                        />
                                    ))
                                }
                            </Grid>
                        </div>
                    </div>
                </UserSetting_Card>
            </React.Fragment>
        );
    }

    private SwitchOnChange = () => {
        this.setState({ IncludePrint: !this.state.IncludePrint });
    }

    private toggleExport = () => {
        this.setState({ dropDownExport: !this.state.dropDownExport });
    }
}

export const LenPortfolioReports_Url = '/PortfolioReports/:reportType';
export const LenPortfolioReports_ACHStatus_Url = '/reports/achstatus';
//export const LenPortfolioReports_ACHStatus_Url = '/PortfolioReports/ACHStatus';
export const LenPortfolioReports_FCTimesLines_Url = '/PortfolioReports/FCTimesLines';
export const LenPortfolioReports_InvestorEarnings_Url = '/PortfolioReports/InvestorEarnings';
export const LenPortfolioReports_LenderDisbursement_Url = '/PortfolioReports/LenderDisbursement';
export const LenPortfolioReports_LoanCashFlow_Url = '/PortfolioReports/LoanCashFlow';

//export const LenReport_LenderDisbursement_Url = '/report/' + Utils.getValueEnum(Enums.AttachmentViewEnum, Enums.AttachmentViewEnum.LENDER_STATEMENTS, false).toLowerCase();

export default connect(
    /*(state: ApplicationState) => state.lenAttachment, LenAttachmentStore.actions*/
)(LenPortfolioReports as any);