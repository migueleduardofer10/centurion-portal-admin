import * as React from 'react';
import { Link } from 'react-router-dom';

class BreadCrumb extends React.PureComponent<{ title?: string }> {
    public componentDidMount() {
        let title = (this.props.title ? this.props.title : 'Home') + ' - Loan Information & Reporting Servicing';
        document.getElementsByTagName("title")[0].innerText = title;
    }

    public render() {
        return (
            <div className="page-header">
                <h3 className="page-title">{this.props.title}</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        {this.props.title ? <li className="breadcrumb-item active" aria-current="page">{this.props.title}</li> : ""}
                    </ol>
                </nav>
            </div>
        );
    }
}

export default BreadCrumb;