import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import PaymentModal from './PaymentModal';
import TabsInvoices from './TabsInvoices';
import BreadCrumb from '../shared/BreadCrumb';
import CustomGrid from '../shared/CustomGrid';
import CustomExcelExport from '../shared/CustomExcelExport';
import { ApplicationState } from '../../store/index';
import { PaymentTypeEnum } from '../../utilities/Enums';
import * as AppCommon from '../../store/commons/AppCommon';
import * as PendingInvoicesStore from '../../store/stores/invoices/PendingInvoicesStore';

// At runtime, Redux will merge together...
type PendingInvoicesProps =
    PendingInvoicesStore.State // ... state we've requested from the Redux store
    & typeof PendingInvoicesStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class PendingInvoices extends React.PureComponent<PendingInvoicesProps> {
    public componentDidMount() {
        this.props.fetchInvoices(this.props.gridProps, true, false);
    }

    public componentDidUpdate() {
        if (this.props.appliedPayment === true)
            this.props.fetchInvoices(this.props.gridProps, false, true);
    }

    public render() {
        return (
            <React.Fragment>
                <BreadCrumb title="Invoices" />
                <div className="card-group">
                    <div className="card">
                        <div className="card-header p-0">
                            <TabsInvoices option={1} />
                        </div>
                        <div className="card-body">
                            <ul className="list-inline ml-2 mb-2">
                                <li className="list-inline-item ml-0 mr-3">
                                    <select
                                        className="form-control form-control-sm"
                                        value={this.props.lenderUid}
                                        onChange={(event: any) => this.props.fetchInvoices(this.props.gridProps, false, true, event.target.value, this.props.onlyPositive)}
                                    >
                                        <option value="all">-All Lenders-</option>
                                        {
                                            this.props.lenders.map((lender: AppCommon.ServiceMap, index: number) =>
                                                <option key={index} value={lender.ParentUid}>{`${lender.Account}: ${lender.FullName}`}</option>
                                            )
                                        }
                                    </select>
                                </li>
                                <li className="list-inline-item ml-0 mr-3">
                                    <div className="form-check">
                                        <input type="checkbox"
                                            id="checkboxOnlyPositive"
                                            className="form-check-input"
                                            checked={this.props.onlyPositive}
                                            onChange={(event: any) => this.props.fetchInvoices(this.props.gridProps, false, true, this.props.lenderUid, event.target.checked)}
                                        />
                                        <label className="form-check-label ml-3" htmlFor="checkboxOnlyPositive">Only Positive</label>
                                    </div>
                                </li>
                                <li className="list-inline-item ml-0">
                                    <PaymentModal
                                        states={this.props.states}
                                        model={this.props.vCheckModel}
                                        terms={this.props.paymentTerms}
                                        open={this.props.openVCheck}
                                        payBy={PaymentTypeEnum.VCHECK}
                                        fetch={this.props.fetchVCheckModel}
                                        toggle={this.props.toggleVCheckModal}
                                        change={this.props.changeVCheckModel}
                                        apply={this.props.applyPaymentByVCheck}
                                    />
                                </li>
                                <li className="list-inline-item ml-0">
                                    <PaymentModal
                                        model={this.props.payPalModel}
                                        terms={this.props.paymentTerms}
                                        open={this.props.openPayPal}
                                        payBy={PaymentTypeEnum.PAYPAL}
                                        fetch={this.props.fetchPayPalModel}
                                        toggle={this.props.togglePayPalModal}
                                        change={this.props.changePayPalModel}
                                        apply={this.props.applyPaymentByPayPal}
                                    />
                                </li>
                                <li className="list-inline-item ml-0">
                                    <PaymentModal
                                        states={this.props.states}
                                        model={this.props.creditCardModel}
                                        terms={this.props.paymentTerms}
                                        open={this.props.openCreditCard}
                                        payBy={PaymentTypeEnum.CREDIT_CARD}
                                        fetch={this.props.fetchCreditCardModel}
                                        toggle={this.props.toggleCreditCardModal}
                                        change={this.props.changeCreditCardModel}
                                        apply={this.props.applyPaymentByCreditCard}
                                    />
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
                                selectedRow={AppCommon.SelectRowTypeEnum.MULTIPLE}
                                fetchData={this.props.fetchInvoices}
                                fetchDataAll={this.props.fetchInvoicesAll}
                                fetchDataDetails={this.props.fetchInvoiceDetails}
                                disableForceUpdate={this.props.disableForceUpdate}
                                enableExportExcel={this.props.enableExportExcel}
                                changedColumns={this.props.changedColumns}
                                applyChangedColumns={this.props.applyChangedColumns}
                                updateData={this.props.updateInvoices}
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
    (state: ApplicationState) => state.pendingInvoices,
    PendingInvoicesStore.actions
)(PendingInvoices as any);
