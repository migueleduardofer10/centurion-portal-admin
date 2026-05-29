import * as React from 'react';
import { Link } from 'react-router-dom';
import LenFunding, { LenFunding_Url, LenFunding_IParameters } from './LenFunding';
import LenNotes, { LenNotes_Url, LenNotes_IParameters } from './LenNotes';

export default class LenOptions extends React.PureComponent<{ option: number, loanUid: string }> {
    public render() {
        return (
            <ul className="nav nav-tabs mb-0">
                <li className="nav-item">
                    <Link className={`nav-link${this.activeClass(0)}`} to="/lender/loans"><i className="ti-arrow-left"></i> Back to Loans</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link${this.activeClass(1)}`}
                        to={
                            {
                                 pathname: LenFunding_Url,
                                state: { LoanUid: this.props.loanUid } as LenFunding_IParameters
                            }
                        }
                    >Funding</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link${this.activeClass(2)}`} to={`/lender/loan/${this.props.loanUid}/payments`}>Payments</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link${this.activeClass(3)}`}
                        to={{
                            pathname: LenNotes_Url,
                            state: { LoanUid: this.props.loanUid } as LenNotes_IParameters
                        }}
                    >Notes</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link${this.activeClass(4)}`} to={`/lender/loan/${this.props.loanUid}/attachments`}>Attachments</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link${this.activeClass(5)}`} to={`/lender/loan/${this.props.loanUid}/charges`}>Charges</Link>
                </li>
                <li className="nav-item">
                    <a href="#" className={`nav-link${this.activeClass(6)}`} onClick={this.toggleModal}>Reports</a>
                </li>
                <li className="nav-item">
                    <a href="#" className={`nav-link${this.activeClass(7)}`} onClick={this.toggleModal}>Contact FCI</a>
                </li>
            </ul>
        );
    }

    public activeClass = (option: number) => (this.props.option === option ? " active" : "");

    public toggleModal = (event: any) => event.preventDefault();
}
