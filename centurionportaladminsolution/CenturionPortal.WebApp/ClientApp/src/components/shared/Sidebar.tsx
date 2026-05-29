import * as React from 'react';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import * as Enums from '../../utilities/Enums';
import { Auth } from '../../utilities/Functions';
import { LenAttachment_LenderStatements_Url, LenAttachment_NotificationOfDeposit_Url, LenAttachment_TaxForms_Url } from '../lenders/LenAttachment';
import { LenLoansSearch_Url } from '../lenders/LenLoansSearch';
import { LenPortfolioReports_ACHStatus_Url, LenPortfolioReports_FCTimesLines_Url, LenPortfolioReports_InvestorEarnings_Url, LenPortfolioReports_LenderDisbursement_Url, LenPortfolioReports_LoanCashFlow_Url } from '../lenders/LenPortfolioReports';
import { PaymentToLender_Url } from '../lenders/paymentsToLender/PaymentToLender';
import { PartialOwnershipPortfolio_Url } from '../loan/PartialOwnershipPortfolio';
import { LoanPortfolio_Url } from '../portfolioReport/LoanPortfolio';
import { LoanStatusBreakdown_Url } from '../portfolioReport/LoanStatusBreakdown';
import { UserSetting_ChangePassword_Url } from '../users/UserSetting_ChangePassword';
//import { UserSetting_Url } from '../users/UserSetting';
import { UserSetting_General_Url } from '../users/UserSetting_General';
import { UserSetting_LirsOption_Url } from '../users/UserSetting_LirsOption';
import { UserSetting_PasswordDefault_Url } from '../users/UserSetting_PasswordDefault';
import { UserSetting_PersonalInformation_Url } from '../users/UserSetting_PersonalInformation';
import { UserSetting_VerifyLoan_Url } from '../users/UserSetting_VerifyLoan';



class Sidebar extends React.PureComponent<RouteComponentProps<{}>> {
    state = {
        loanMenuOpen: false,
        attachmentMenuOpen: false,
        reportMenuOpen: false,
        boardMenuOpen: false,
        lender: false,
    };

    public componentDidMount() {
        this.onRouteChanged();
        // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
        const body = document.querySelector('body');
        document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
            el.addEventListener('mouseover', function () {
                if (body != null && body.classList.contains('sidebar-icon-only')) {
                    el.classList.add('hover-open');
                }
            });
            el.addEventListener('mouseout', function () {
                if (body != null && body.classList.contains('sidebar-icon-only')) {
                    el.classList.remove('hover-open');
                }
            });
        });
    }

    public componentDidUpdate(prevProps: any) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    public render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
                    <a className="sidebar-brand brand-logo" href="index.html"><img src="/images/logo-redplus.png" alt="logo" /></a>
                    <a className="sidebar-brand brand-logo-mini pt-3" href="index.html"><img src="/images/logo-redplus-mini.png" alt="logo" /></a>
                </div>
                <ul className="nav">
                    <li className="nav-item nav-profile not-navigation-link">
                        <div className="nav-link">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-user" className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                                    <div className="d-flex justify-content-between align-items-start">
                                        {/*
                                        <div className="profile-image">
                                            <img src="/images/faces/face8.jpg" alt="profile" />
                                        </div>
                                        */}
                                        <div className="text-left">
                                            <p className="profile-name">{`${Auth.getELSUser().FullName}`}</p>
                                            <small className="designation text-muted text-small"><Trans>Manager</Trans></small>
                                            <span className="status-indicator online"></span>
                                        </div>
                                    </div>
                                </Dropdown.Toggle>
                            </Dropdown>
                            {/*
                            <Link className="nav-link" to="/apps/kanban-board3">
                                <button className="btn btn-success btn-block"><Trans>New Pipeline</Trans><i className="mdi mdi-plus"></i>
                                </button>
                            </Link>
                            */}
                        </div>
                    </li>

                    {
                        Auth.getELSUser().UserType == Enums.UserTypeEnum.ADMIN ? (
                            <React.Fragment>
                                <li className={this.isPathActive('/users') ? 'nav-item active' : 'nav-item'}>
                                    <Link className="nav-link" to="/users">
                                        <i className="ti ti-user menu-icon"></i>
                                        <span className="menu-title"><Trans>Users</Trans></span>
                                    </Link>
                                </li>
                                <li className={this.isPathActive('/report/login') ? 'nav-item active' : 'nav-item'}>
                                    <Link className="nav-link" to="/report/login">
                                        <i className="ti ti-pie-chart menu-icon"></i>
                                        <span className="menu-title"><Trans>Report Login</Trans></span>
                                    </Link>
                                </li>
                            </React.Fragment>
                        ) : (
                                <React.Fragment>
                                    <li className={this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
                                        <Link className="nav-link" to="/dashboard">
                                            <i className="mdi mdi-television menu-icon"></i>
                                            <span className="menu-title"><Trans>Dashboard</Trans></span>
                                        </Link>
                                    </li>
                                    <li className={this.isPathActive(LenLoansSearch_Url) ? 'nav-item active' : 'nav-item'}>
                                        <Link className="nav-link" to={LenLoansSearch_Url}>
                                            <i className="mdi mdi-briefcase-search menu-icon"></i>
                                            <span className="menu-title"><Trans>Loan Search</Trans></span>
                                        </Link>
                                    </li>
                                    <li className={this.isPathActive(UserSetting_General_Url) || this.isPathActive(UserSetting_ChangePassword_Url) || this.isPathActive(UserSetting_LirsOption_Url) ||
                                        this.isPathActive(UserSetting_PasswordDefault_Url) || this.isPathActive(UserSetting_PersonalInformation_Url) ||
                                        this.isPathActive(UserSetting_VerifyLoan_Url) ? 'nav-item active' : 'nav-item'}>
                                        <Link className="nav-link" to={UserSetting_General_Url}>
                                            <i className="mdi mdi-shape-plus menu-icon"></i>
                                            <span className="menu-title"><Trans>User Settings</Trans></span>
                                        </Link>
                                    </li>
                                    <li className={
                                        (
                                            this.isPathActive('/lender/loans') ||
                                            this.isPathActive('/lender/secondaryloans') ||
                                            this.isPathActive(PartialOwnershipPortfolio_Url)
                                        )
                                            ? 'nav-item active' : 'nav-item'}>
                                        <div className={this.state.loanMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState(this, 'loanMenuOpen')} data-toggle="collapse">
                                            <i className="mdi mdi-briefcase-account menu-icon"></i>
                                            <span className="menu-title"><Trans>Loan Portfolio</Trans></span>
                                            <i className="menu-arrow"></i>
                                        </div>
                                        <Collapse in={this.state.loanMenuOpen}>
                                            <ul className="nav flex-column sub-menu">
                                                <li className="nav-item"> <Link className={this.isPathActive('/lender/loans') ? 'nav-link active' : 'nav-link'} to="/lender/loans"><Trans>Primary Loans</Trans></Link></li>
                                                <li className="nav-item"> <Link className={this.isPathActive('/lender/secondaryloans') ? 'nav-link active' : 'nav-link'} to="/lender/secondaryloans"><Trans>Secondary Loans</Trans></Link></li>

                                                <li className="nav-item"> <Link className={this.isPathActive(PartialOwnershipPortfolio_Url) ? 'nav-link active' : 'nav-link'} to={PartialOwnershipPortfolio_Url}><Trans>Partial Ownership Portfolio</Trans></Link></li>

                                            </ul>
                                        </Collapse>
                                    </li>




                                    <li className={
                                        (
                                            this.isPathActive(LenAttachment_LenderStatements_Url) ||
                                            this.isPathActive(LenAttachment_NotificationOfDeposit_Url) ||
                                            this.isPathActive(LenAttachment_TaxForms_Url)
                                        )
                                            ? 'nav-item active' : 'nav-item'}>
                                        <div className={this.state.attachmentMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState(this, 'attachmentMenuOpen')} data-toggle="collapse">
                                            <i className="mdi mdi-file-multiple menu-icon"></i>
                                            <span className="menu-title"><Trans>Attachments</Trans></span>
                                            <i className="menu-arrow"></i>
                                        </div>
                                        <Collapse in={this.state.attachmentMenuOpen}>
                                            <ul className="nav flex-column sub-menu">
                                                <li className="nav-item"> <Link className={this.isPathActive(LenAttachment_LenderStatements_Url) ? 'nav-link active' : 'nav-link'} to={LenAttachment_LenderStatements_Url}><Trans>Lender Statement</Trans></Link></li>
                                                <li className="nav-item"> <Link className={this.isPathActive(LenAttachment_NotificationOfDeposit_Url) ? 'nav-link active' : 'nav-link'} to={LenAttachment_NotificationOfDeposit_Url}><Trans>Notification of Deposit</Trans></Link></li>
                                                <li className="nav-item"> <Link className={this.isPathActive(LenAttachment_TaxForms_Url) ? 'nav-link active' : 'nav-link'} to={LenAttachment_TaxForms_Url}><Trans>Tax Form</Trans></Link></li>
                                            </ul>
                                        </Collapse>
                                    </li>
                                    <li className={
                                        (
                                            this.isPathActive(LenPortfolioReports_ACHStatus_Url) ||
                                            this.isPathActive(LenPortfolioReports_FCTimesLines_Url) ||
                                            this.isPathActive(LenPortfolioReports_InvestorEarnings_Url) ||
                                            this.isPathActive(LenPortfolioReports_LenderDisbursement_Url) ||
                                            this.isPathActive(LenPortfolioReports_LoanCashFlow_Url) ||
                                            this.isPathActive(LoanStatusBreakdown_Url) ||
                                            this.isPathActive(LoanPortfolio_Url)
                                        )
                                            ? 'nav-item active' : 'nav-item'}>
                                        <div className={this.state.reportMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState(this, 'reportMenuOpen')} data-toggle="collapse">
                                            <i className="mdi mdi-newspaper menu-icon"></i>
                                            <span className="menu-title"><Trans>Portfolio Reports</Trans></span>
                                            <i className="menu-arrow"></i>
                                        </div>
                                        <Collapse in={this.state.reportMenuOpen}>
                                            <ul className="nav flex-column sub-menu">
                                                <li className="nav-item"> <Link className={this.isPathActive(LenPortfolioReports_ACHStatus_Url) ? 'nav-link active' : 'nav-link'} to={LenPortfolioReports_ACHStatus_Url}><Trans>ACH Status</Trans></Link></li>
                                                <li className="nav-item"> <Link className={this.isPathActive(LenPortfolioReports_FCTimesLines_Url) ? 'nav-link active' : 'nav-link'} to={LenPortfolioReports_FCTimesLines_Url}><Trans>FC Times Lines</Trans></Link></li>
                                                <li className="nav-item"> <Link className={this.isPathActive(LenPortfolioReports_InvestorEarnings_Url) ? 'nav-link active' : 'nav-link'} to={LenPortfolioReports_InvestorEarnings_Url}><Trans>Investor Earnings</Trans></Link></li>
                                                <li className="nav-item"> <Link className={this.isPathActive(LenPortfolioReports_LenderDisbursement_Url) ? 'nav-link active' : 'nav-link'} to={LenPortfolioReports_LenderDisbursement_Url}><Trans>Lender Disbursement</Trans></Link></li>
                                                <li className="nav-item"> <Link className={this.isPathActive(LenPortfolioReports_LoanCashFlow_Url) ? 'nav-link active' : 'nav-link'} to={LenPortfolioReports_LoanCashFlow_Url}><Trans>Loan Cash Flow</Trans></Link></li>

                                                <li className="nav-item">
                                                    <Link className={this.isPathActive(LoanStatusBreakdown_Url) ? 'nav-link active' : 'nav-link'} to={LoanStatusBreakdown_Url}>
                                                        <span className="menu-title"><Trans>Loan Status Breakdown</Trans></span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={this.isPathActive(LoanPortfolio_Url) ? 'nav-link active' : 'nav-link'} to={LoanPortfolio_Url}>
                                                        <span className="menu-title"><Trans>Loan Portfolio</Trans></span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </Collapse>
                                    </li>
                                    <li className={this.isPathActive("/invoice") ? 'nav-item active' : 'nav-item'}>
                                        <Link className="nav-link" to="/invoice/pending">
                                            <i className="mdi mdi-briefcase-search menu-icon"></i>
                                            <span className="menu-title"><Trans>Invoices</Trans></span>
                                        </Link>
                                    </li>




                                    <li className={this.isPathActive(PaymentToLender_Url) ? 'nav-item active' : 'nav-item'}>   
                                        <div className={this.state.lender ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState(this, 'lender')} data-toggle="collapse">
                                            <i className="mdi mdi-account menu-icon"></i>
                                            <span className="menu-title"><Trans>Lenders</Trans></span>
                                            <i className="menu-arrow"></i>
                                        </div>
                                        <Collapse in={this.state.lender}>
                                            <ul className="nav flex-column sub-menu">
                                                <li className="nav-item">
                                                    <Link className={this.isPathActive(PaymentToLender_Url) ? 'nav-link active' : 'nav-link'} to={PaymentToLender_Url}>
                                                        <i className="mdi mdi-cash-multiple menu-icon"></i>
                                                        <span className="menu-title"><Trans>Payments to Lender</Trans></span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </Collapse>
                                    </li>

                                   

                                </React.Fragment>
                            )
                    }
                </ul>
            </nav>
        );
    }

    private toggleMenuState(comp: any, menuState: any) {
        if (comp.state[menuState]) {
            comp.setState({ [menuState]: false });
        } else if (Object.keys(comp.state).length === 0) {
            comp.setState({ [menuState]: true });
        } else {
            Object.keys(comp.state).forEach(i => {
                comp.setState({ [i]: false });
            });
            comp.setState({ [menuState]: true });
        }
    }

    private onRouteChanged = () => {
        let sidebar = document.querySelector('#sidebar');
        if (sidebar != null) sidebar.classList.remove('active');

        Object.keys(this.state).forEach(i => {
            this.setState({ [i]: false });
        });

        const dropdownPaths = [
            { path: '/lender/loans', state: 'loanMenuOpen' },
            { path: '/attachment', state: 'attachmentMenuOpen' },
            { path: '/report', state: 'reportMenuOpen' },
        ];

        dropdownPaths.forEach((obj => {
            if (this.isPathActive(obj.path)) {
                this.setState({ [obj.state]: true })
            }
        }));

    }

    private isPathActive(path: string) {
        return (this.props.location.pathname == path && path == '/') || (this.props.location.pathname.indexOf(path) == 0 && path != '/');
    }

    

}

export default withRouter(Sidebar);