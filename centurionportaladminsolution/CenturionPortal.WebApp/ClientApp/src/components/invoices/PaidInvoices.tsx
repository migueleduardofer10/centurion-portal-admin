import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import TabsInvoices from './TabsInvoices';
import BreadCrumb from '../shared/BreadCrumb';
import CustomGrid from '../shared/CustomGrid';
import { ApplicationState } from '../../store/index';
import * as AppCommon from '../../store/commons/AppCommon';
import CustomExcelExport from '../shared/CustomExcelExport';
import * as PaidInvoicesStore from '../../store/stores/invoices/PaidInvoicesStore';

// At runtime, Redux will merge together...
type PaidInvoicesProps =
    PaidInvoicesStore.State // ... state we've requested from the Redux store
    & typeof PaidInvoicesStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class PaidInvoices extends React.PureComponent<PaidInvoicesProps> {
    public componentDidMount() {
        this.props.fetchInvoices(this.props.gridProps, true, false);
    }

    public render() {
        return (
            <React.Fragment>
                <BreadCrumb title="Invoices" />
                <div className="card-group">
                    <div className="card">
                        <div className="card-header p-0">
                            <TabsInvoices option={2} />
                        </div>
                        <div className="card-body">
                            <ul className="list-inline ml-2 mb-2">
                                <li className="list-inline-item ml-0 mr-3">
                                    <select
                                        className="form-control form-control-sm"
                                        value={this.props.lenderUid}
                                        onChange={(event: any) => this.props.fetchInvoices(this.props.gridProps, false, true, event.target.value)}
                                    >
                                        <option value="all">-All Lenders-</option>
                                        {
                                            this.props.lenders.map((lender: AppCommon.ServiceMap, index: number) =>
                                                <option key={index} value={lender.ParentUid}>{`${lender.Account}: ${lender.FullName}`}</option>
                                            )
                                        }
                                    </select>
                                </li>
                            </ul>

                            <span className="grid-info">* right click on Invoice and select an option.</span>

                            <CustomExcelExport
                                fileName="Invoice_Details"
                                data={this.props.invoiceDetails}
                                columns={this.props.columnsDetails}
                                exportExcel={this.props.exportExcelDetails}
                                enableExportExcel={this.props.enableExportExcelDetails}
                            />

                            <CustomGrid
                                data={this.props.invoices}
                                dataAll={this.props.invoicesAll}
                                columns={this.props.columns}
                                realColumns={this.props.realColumns}
                                dataState={this.props.gridProps}
                                fileName="Pending_Invoices"
                                exportExcel={this.props.exportExcel}
                                currentPage={this.props.currentPage}
                                withDetails={true}
                                withContextMenu={true}
                                menuOptions={["Export Details"]}
                                forceUpdate={this.props.forceUpdate}
                                fetchData={this.props.fetchInvoices}
                                fetchDataAll={this.props.fetchInvoicesAll}
                                fetchDataDetails={this.props.fetchInvoiceDetails}
                                disableForceUpdate={this.props.disableForceUpdate}
                                enableExportExcel={this.props.enableExportExcel}
                                changedColumns={this.props.changedColumns}
                                applyChangedColumns={this.props.applyChangedColumns}
                                selectItem={this.props.selectInvoice}
                                selectOption={this.selectOption}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private selectOption = (option: string) => {
        switch (option) {
            case "Export Details":
                this.props.fetchDetailsByInvoice();
                break;
            default:
        }
    }
}

export default connect(
    (state: ApplicationState) => state.paidInvoices,
    PaidInvoicesStore.actions
)(PaidInvoices as any);
