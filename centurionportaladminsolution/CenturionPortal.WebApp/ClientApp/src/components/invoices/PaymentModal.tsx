import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { INFState } from '../../store/commons/InvoicesCommon';
import CustomInputMask from '../shared/CustomInputMask';
import { Utils } from '../../utilities/Functions';
import * as Enums from '../../utilities/Enums';

interface IPaymentModalProps {
    states?: INFState[],
    model: any;
    terms: string;
    open: boolean;
    payBy: Enums.PaymentTypeEnum;
    fetch: Function;
    toggle: Function;
    change: Function;
    apply: Function;
}

class PaymentModal extends React.PureComponent<IPaymentModalProps> {
    state = {
        tmpCCNumber: 'xxxx-xxxx-xxxx-xxxx',
        maskCCNumber: '9999-9999-9999-9999',
        placeholderCCNumber: '____-____-____-____',
        isInfoModalOpen: false,
        isTermsModalOpen: false
    };

    public componentDidUpdate() {
        this.setState({ isInfoModalOpen: this.props.open });
    }

    public render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary" onClick={() => this.props.fetch()}>
                    <span className="d-none d-md-inline">{this.renderLabelButton()}</span>
                </button>

                <Modal isOpen={this.state.isInfoModalOpen} toggle={this.toggleInfoModal} style={{ fontSize: "0.8rem" }} size="lg" backdrop="static">
                    <ModalHeader className="p-2 pl-3 pr-3" toggle={this.toggleInfoModal}>{this.renderLabelButton()}</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-md-6">
                                {this.renderPaymentInfo()}
                            </div>
                            <div className="col-md-6">
                                {this.renderPaymentForm()}
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            {this.renderPaymentTerms()}
                        </div>
                    </ModalBody>
                    <ModalFooter className="p-1 pl-2 pr-2">
                        <button type="button" className="btn btn-info" onClick={this.toggleInfoModal}>
                            <i className="fa fa-undo mr-1"></i> Cancel
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => this.props.apply()}>
                            <i className="fa fa-money mr-1"></i> {this.renderLabelButton()}
                        </button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }

    private renderLabelButton() {
        if (this.props.payBy == Enums.PaymentTypeEnum.VCHECK)
            return "Pay By V-Check";
        else if (this.props.payBy == Enums.PaymentTypeEnum.PAYPAL)
            return "Pay By PayPal";
        else if (this.props.payBy == Enums.PaymentTypeEnum.CREDIT_CARD)
            return "Pay By Credit Card";
    }

    private renderPaymentInfo() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <strong>Payment Detail</strong>
                    </div>
                </div>
                <hr className="clearfix mt-1 mb-2" />
                <div className="well">
                    <div className="row">
                        <div className="col-md-9 col-8">Invoice #: {this.props.model.InvoiceNumber}</div>
                        <div className="col-md-3 col-4 text-right">{Utils.currencyFormat(this.props.model.Amount)}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-9 col-8">Late Charges:</div>
                        <div className="col-md-3 col-4 text-right">{Utils.currencyFormat(this.props.model.AddlCharges)}</div>
                    </div>
                    {
                        this.props.model.FCIServiceFee > 0 ? (
                            <div className="row">
                                <div className="col-md-9 col-8">Fee (3%)</div>
                                <div className="col-md-3 col-4 text-right">{Utils.currencyFormat(this.props.model.ServiceFee)}</div>
                            </div>
                        ) : ""
                    }

                    <hr className="clearfix mt-1 mb-2" />
                    <div className="row justify-content-end">
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-6"><strong>Total Amount</strong></div>
                                <div className="col-md-6 text-right">
                                    <strong>{Utils.currencyFormat(this.props.model.Amount + this.props.model.AddlCharges + this.props.model.ServiceFee)}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="hidden" name="Uid" value={this.props.model.Uid} onChange={(event: any) => this.changeModel(event)} />
                    </div>
                    {
                        this.props.payBy == Enums.PaymentTypeEnum.PAYPAL ? "" : (
                            <div className="form-group mb-4">
                                <label htmlFor="Notes" className="form-label-sm">Payment Notes</label>
                                <textarea className="form-control form-control-sm" id="Notes" name="Notes" value={this.props.model.Notes} onChange={(event: any) => this.changeModel(event)} />
                            </div>
                        )
                    }
                    {
                        this.props.payBy != Enums.PaymentTypeEnum.VCHECK ? "" : (
                            <div className="form-group mb-4">
                                <p className="text-justify" style={{ fontSize: "inherit" }} >
                                    Payments may not show up in your account until the next business day, but will be
                                    applied and credited back to the day received based on Pacific Standard Time.
                                </p>
                            </div>
                        )
                    }
                </div>
            </React.Fragment>
        );
    }

    private renderPaymentForm() {
        if (this.props.payBy == Enums.PaymentTypeEnum.VCHECK)
            return this.renderVCheckForm();
        else if (this.props.payBy == Enums.PaymentTypeEnum.PAYPAL)
            return this.renderPayPalForm();
        else if (this.props.payBy == Enums.PaymentTypeEnum.CREDIT_CARD)
            return this.renderCreditCardForm();
    }

    private renderVCheckForm() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <strong>Bank Account & Contact Information</strong>
                    </div>
                </div>
                <hr className="clearfix mt-1 mb-2" />
                <div className="well">
                    <div className="form-group row mb-0">
                        <label htmlFor="PayerName" className="col-md-6 form-label-sm px-3 py-2">Account Holder</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="PayerName" name="PayerName" value={this.props.model.PayerName} onChange={(event: any) => this.changeModel(event)} />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="RoutingNumber" className="col-md-6 form-label-sm px-3 py-2">Routing Number (*)</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="RoutingNumber" name="RoutingNumber" maxLength={9} value={this.props.model.RoutingNumber} onChange={(event: any) => this.changeModel(event)} required />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="RoutingConfirm" className="col-md-6 form-label-sm px-3 py-2">Confirm Routing Number (*)</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="RoutingConfirm" name="RoutingConfirm" maxLength={9} value={this.props.model.RoutingConfirm} onChange={(event: any) => this.changeModel(event)} required />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="AccountNumber" className="col-md-6 form-label-sm px-3 py-2">Account Number (*)</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="AccountNumber" name="AccountNumber" maxLength={17} value={this.props.model.AccountNumber} onChange={(event: any) => this.changeModel(event)} required />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="AccountConfirm" className="col-md-6 form-label-sm px-3 py-2">Confirm Account Number (*)</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="AccountConfirm" name="AccountConfirm" maxLength={17} value={this.props.model.AccountConfirm} onChange={(event: any) => this.changeModel(event)} required />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="CheckNumber" className="col-md-6 form-label-sm px-3 py-2">Check Number (*)</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="CheckNumber" name="CheckNumber" value={this.props.model.CheckNumber} onChange={(event: any) => this.changeModel(event)} required />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="PayerAddress" className="col-md-6 form-label-sm px-3 py-2">Payer Address (*)</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="PayerAddress" name="PayerAddress" value={this.props.model.PayerAddress} onChange={(event: any) => this.changeModel(event)} required />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="PayerCity" className="col-md-6 form-label-sm px-3 py-2">Payer City (*)</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="PayerCity" name="PayerCity" value={this.props.model.PayerCity} onChange={(event: any) => this.changeModel(event)} required />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="PayerState" className="col-md-6 form-label-sm px-3 py-2">Payer State (*)</label>
                        <div className="col-md-6">
                            <select className="form-control form-control-sm" id="PayerState" name="PayerState" value={this.props.model.PayerState} onChange={(event: any) => this.changeModel(event)} >
                                <option value="">- Select State -</option>
                                {
                                    this.props.states ? this.props.states.map(
                                        (state: INFState) => <option key={state.Abbreviation} value={state.Abbreviation}>{state.Name}</option>
                                    ) : ""
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="PayerZip" className="col-md-6 form-label-sm px-3 py-2">Payer Zip (*)</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="PayerZip" name="PayerZip" value={this.props.model.PayerZip} onChange={(event: any) => this.changeModel(event)} required />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="Phone" className="col-md-6 form-label-sm px-3 py-2">Payer Phone (*)</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="Phone" name="Phone" value={this.props.model.Phone} onChange={(event: any) => this.changeModel(event)} required />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="Email" className="col-md-6 form-label-sm px-3 py-2">Payer Email (*)</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="Email" name="Email" value={this.props.model.Email} onChange={(event: any) => this.changeModel(event)} required />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    private renderPayPalForm() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <strong>Pay Pal Information</strong>
                    </div>
                </div>
                <hr className="clearfix mt-1 mb-2" />
                <div className="well">
                    <div className="form-group row mb-0">
                        <label htmlFor="Email" className="col-md-4 form-label-sm px-3 py-2">Email</label>
                        <div className="col-md-8">
                            <input type="text" className="form-control form-control-sm" id="Email" name="Email" value={this.props.model.Email} onChange={(event: any) => this.changeModel(event)} />
                        </div>
                    </div>
                    {
                        this.props.payBy != Enums.PaymentTypeEnum.PAYPAL ? "" : (
                            <div className="form-group row mb-0">
                                <label htmlFor="Notes" className="col-md-4 form-label-sm px-3 py-2">Payment Notes</label>
                                <div className="col-md-8">
                                    <textarea className="form-control form-control-sm" id="Notes" name="Notes" value={this.props.model.Notes} onChange={(event: any) => this.changeModel(event)} />
                                </div>
                            </div>
                        )
                    }
                </div>
            </React.Fragment>
        )
    }

    private renderCreditCardForm() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <strong>Credit Card Information</strong>
                    </div>
                </div>
                <hr className="clearfix mt-1 mb-2" />
                <div className="well">
                    <div className="form-group row mb-0">
                        <label htmlFor="Type" className="col-md-6 form-label-sm px-3 py-2">Credit Card Type</label>
                        <div className="col-md-6">
                            <select className="form-control form-control-sm" id="Type" name="Type" value={this.props.model.Type} onChange={(event: any) => this.changeModel(event)} >
                                <option value="-1">- Select Credit Card Type -</option>
                                {
                                    Enums.EnumToArray(Enums.TypeCreditCardEnum).map(
                                        (item: any) => <option key={item.value} value={item.value}>{item.label}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="Number" className="col-md-6 form-label-sm px-3 py-2">Credit Card Number</label>
                        <div className="col-md-6">
                            <CustomInputMask className="form-control form-control-sm" id="Number" name="Number" mask={this.state.maskCCNumber} placeholder={this.state.placeholderCCNumber} value={this.props.model.Number} onChange={(event: any) => this.changeModel(event)} />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <div className="col-md-12 text-center mb-2" style={{ fontStyle: 'oblique' }}>
                            * Complete all digits of your credit card (<span>{this.state.tmpCCNumber}</span>)
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="Expiration_String" className="col-md-6 form-label-sm px-3 py-2">Credit Card Expiration</label>
                        <div className="col-md-4">
                            <CustomInputMask className="form-control form-control-sm" id="Expiration_String" name="Expiration_String" mask="99/9999" placeholder="MM/YYYY" value={this.props.model.Expiration_String} onChange={(event: any) => this.changeModel(event)} />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="Cvv" className="col-md-6 form-label-sm pl-3 pr-0 py-2">
                            Credit Card ID Number (CVV)
                            <span id="CCVExample" className="fa fa-question-circle text-info text-bold ml-1 m-0" style={{ fontSize: "0.95rem" }}></span>
                        </label>
                        <div className="col-md-3">
                            <input type="text" className="form-control form-control-sm" id="Cvv" name="Cvv" maxLength={4} value={this.props.model.Cvv} onChange={(event: any) => this.changeModel(event)} />
                        </div>
                        <UncontrolledPopover trigger="legacy" placement="bottom" target="CCVExample" className="popover-modal">
                            <PopoverBody>
                                <img src="/images/cvv_credit_card.gif" alt="Example CVV" />
                            </PopoverBody>
                        </UncontrolledPopover>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="OnName" className="col-md-6 form-label-sm px-3 py-2">Name on Credit Card</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="OnName" name="OnName" value={this.props.model.OnName} onChange={(event: any) => this.changeModel(event)} />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="LastName" className="col-md-6 form-label-sm px-3 py-2">Last Name</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="LastName" name="LastName" value={this.props.model.LastName} onChange={(event: any) => this.changeModel(event)} />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="BillingAddress" className="col-md-6 form-label-sm px-3 py-2">Billing Address</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="BillingAddress" name="BillingAddress" value={this.props.model.BillingAddress} onChange={(event: any) => this.changeModel(event)} />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="City" className="col-md-6 form-label-sm px-3 py-2">City</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="City" name="City" value={this.props.model.City} onChange={(event: any) => this.changeModel(event)} />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="State" className="col-md-6 form-label-sm px-3 py-2">State</label>
                        <div className="col-md-6">
                            <select className="form-control form-control-sm" id="State" name="State" value={this.props.model.State} onChange={(event: any) => this.changeModel(event)} >
                                <option value="">- Select State -</option>
                                {
                                    this.props.states ? this.props.states.map(
                                        (state: INFState) => <option key={state.Abbreviation} value={state.Abbreviation}>{state.Name}</option>
                                    ) : ""
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="Zip" className="col-md-6 form-label-sm px-3 py-2">Zip Code</label>
                        <div className="col-md-3">
                            <input type="text" className="form-control form-control-sm" id="Zip" name="Zip" value={this.props.model.Zip} onChange={(event: any) => this.changeModel(event)} />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <label htmlFor="Email" className="col-md-6 form-label-sm px-3 py-2">Email</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-sm" id="Email" name="Email" value={this.props.model.Email} onChange={(event: any) => this.changeModel(event)} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    private renderPaymentTerms() {
        return (
            <React.Fragment>
                <div className="form-group m-0">
                    <div className="form-check m-0">
                        <input className="form-check-input" type="checkbox" id="AcceptTerms" name="AcceptTerms" checked={this.props.model.AcceptTerms} onChange={(event: any) => this.changeModel(event)} />
                        <label className="form-check-label text-justify ml-4 my-0" htmlFor="AcceptTerms">
                            By checking this box, you are indicating that you have read and agree to the <a href="#" className="link-blue" onClick={this.toggleTermsModal}>Terms and Conditions</a>.
                        </label>
                    </div>
                </div>

                <Modal isOpen={this.state.isTermsModalOpen} toggle={this.toggleTermsModal} centered={true} style={{ fontSize: "0.8rem" }} backdrop="static">
                    <ModalHeader className="p-2 pl-3 pr-3" toggle={this.toggleTermsModal}>Payment Terms</ModalHeader>
                    <ModalBody>
                        <div className="alert alert-info text-justify p-2 m-0"
                            dangerouslySetInnerHTML={{ __html: this.props.terms }}>
                        </div>
                    </ModalBody>
                    <ModalFooter className="p-1 pl-2 pr-2">
                        <button type="button" className="btn btn-info" onClick={this.toggleTermsModal}>
                            <i className="fa fa-undo mr-1"></i>Close
                        </button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }

    private toggleInfoModal = () => {
        this.props.toggle();
        this.setState({ isInfoModalOpen: !this.state.isInfoModalOpen });
    }

    private toggleTermsModal = (event: any) => {
        event.preventDefault();
        this.setState({ isTermsModalOpen: !this.state.isTermsModalOpen });
    }

    private changeModel = (event: any) => {
        let name: string = event.target.name;
        let value: any = name === 'AcceptTerms' ? event.target.checked : event.target.value;

        if (name !== 'AcceptTerms') event.preventDefault();

        if (this.props.payBy == Enums.PaymentTypeEnum.VCHECK)
            this.changeVCheckModel(name, value);
        else if (this.props.payBy == Enums.PaymentTypeEnum.PAYPAL)
            this.props.change(name, value);
        else if (this.props.payBy == Enums.PaymentTypeEnum.CREDIT_CARD)
            this.changeCreditCardModel(name, value);
    }

    private changeVCheckModel = (name: string, value: any) => {
        let props = ['RoutingNumber', 'RoutingConfirm', 'AccountNumber', 'AccountConfirm', 'CheckNumber'];

        if (name === 'AcceptTerms')
            this.props.change(name, value);
        else if (props.indexOf(name) >= 0)
            this.props.change(name, Utils.validateNumber(value));
    }

    private changeCreditCardModel = (name: string, value: any) => {
        if (name === 'Type') {
            value = Number(value);

            if (value === Enums.TypeCreditCardEnum.VISA || value === Enums.TypeCreditCardEnum.MASTER)
                this.setState({ tmpCCNumber: 'xxxx-xxxx-xxxx-xxxx', maskCCNumber: '9999-9999-9999-9999', placeholderCCNumber: '____-____-____-____' });
            else if (value === Enums.TypeCreditCardEnum.AMERICAN_EXPRESS)
                this.setState({ tmpCCNumber: 'xxxx-xxxxxx-xxxxx', maskCCNumber: '9999-999999-99999', placeholderCCNumber: '____-______-_____' });
        }

        if (name === 'Expiration_String') {
            let ccExpiration = value.replace(/_/g, ' ').split('/');
            let ccExpirationMonth = ccExpiration.length >= 1 ? Number(ccExpiration[0].trim()) : 0;
            let ccExpirationYear = ccExpiration.length === 2 ? Number(ccExpiration[1].trim()) : 0;

            if (isNaN(ccExpirationMonth)) ccExpirationMonth = 0;
            if (isNaN(ccExpirationYear)) ccExpirationYear = 0;

            this.props.change('ExpirationMonth', ccExpirationMonth);
            this.props.change('ExpirationYear', ccExpirationYear);
        }

        if (name === 'Type')
            value = Number(value);
        else if (name === 'Number')
            value = value.replace(/_/g, ' ').trim();

        this.props.change(name, value);
    }
}

export default PaymentModal;
