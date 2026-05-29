import * as React from 'react';
import { Link } from 'react-router-dom';

export default class TabsInvoices extends React.PureComponent<{ option: number }> {
    public render() {
        return (
            <ul className="nav nav-tabs mb-0">
                <li className="nav-item">
                    <Link className={`nav-link${this.activeClass(1)}`} to="/invoice/pending">Pending Invoices</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link${this.activeClass(2)}`} to="/invoice/paid">Paid Invoices</Link>
                </li>
            </ul>
        );
    }

    public activeClass = (option: number) => (this.props.option === option ? " active" : "");
}
