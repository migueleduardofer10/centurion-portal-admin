import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {
    state = {};

    toggleMenuState(menuState) {
        if (this.state[menuState]) {
            this.setState({ [menuState]: false });
        } else if (Object.keys(this.state).length === 0) {
            this.setState({ [menuState]: true });
        } else {
            Object.keys(this.state).forEach(i => {
                this.setState({ [i]: false });
            });
            this.setState({ [menuState]: true });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        document.querySelector('#sidebar').classList.remove('active');
        Object.keys(this.state).forEach(i => {
            this.setState({ [i]: false });
        });

        const dropdownPaths = [
            { path: '/apps', state: 'appsMenuOpen' },
            { path: '/basic-ui', state: 'basicUiMenuOpen' },
            { path: '/advanced-ui', state: 'advancedUiMenuOpen' },
            { path: '/form-elements', state: 'formElementsMenuOpen' },
            { path: '/tables', state: 'tablesMenuOpen' },
            { path: '/maps', state: 'mapsMenuOpen' },
            { path: '/icons', state: 'iconsMenuOpen' },
            { path: '/charts', state: 'chartsMenuOpen' },
            { path: '/user-pages', state: 'userPagesMenuOpen' },
            { path: '/error-pages', state: 'errorPagesMenuOpen' },
            { path: '/general-pages', state: 'generalPagesMenuOpen' },
            { path: '/ecommerce', state: 'ecommercePagesMenuOpen' },
        ];

        dropdownPaths.forEach((obj => {
            if (this.isPathActive(obj.path)) {
                this.setState({ [obj.state]: true })
            }
        }));

    }
    render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
                    <a className="sidebar-brand brand-logo" href="index.html"><img src={require("../../assets/images/logo-redplus.png")} alt="logo" /></a>
                    <a className="sidebar-brand brand-logo-mini pt-3" href="index.html"><img src={require("../../assets/images/logo-redplus-mini.png")} alt="logo" /></a>
                </div>
                <ul className="nav">
                    <li className="nav-item nav-profile not-navigation-link">
                        <div className="nav-link">
                            <Dropdown>
                                <Dropdown.Toggle className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className="profile-image">
                                            <img src={require("../../assets/images/faces/face8.jpg")} alt="profile" />
                                        </div>
                                        <div className="text-left">
                                            <p className="profile-name"><Trans>Tim Griffith</Trans></p>
                                            <small className="designation text-muted text-small"><Trans>Manager</Trans></small>
                                            <span className="status-indicator online"></span>
                                        </div>
                                    </div>
                                </Dropdown.Toggle>
                            </Dropdown>
                            <Link className="nav-link" to="/apps/kanban-board3">
                                <button className="btn btn-success btn-block"><Trans>New Pipeline</Trans><i className="mdi mdi-plus"></i>
                                </button>
                            </Link>
                        </div>
                    </li>

                    <li className={this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
                        <Link className="nav-link" to="/dashboard">
                            <i className="mdi mdi-television menu-icon"></i>
                            <span className="menu-title"><Trans>Dashboard</Trans></span>
                        </Link>
                    </li>
                    <li className={this.isPathActive('/apps') ? 'nav-item active' : 'nav-item'}>
                        <div className={this.state.appsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('appsMenuOpen')} data-toggle="collapse">
                            <i className="mdi mdi-newspaper menu-icon"></i>
                            <span className="menu-title"><Trans>Loan Reports</Trans></span>
                            <i className="menu-arrow"></i>
                        </div>
                        <Collapse in={this.state.appsMenuOpen}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link className={this.isPathActive('/apps/kanban-board1') ? 'nav-link active' : 'nav-link'} to="/lender/loans"><Trans>Prmary Loans</Trans></Link></li>
                                <li className="nav-item"> <Link className={this.isPathActive('/apps/kanban-board1') ? 'nav-link active' : 'nav-link'} to="/portfolio/loans"><Trans>Loan Information</Trans></Link></li>
                                <li className="nav-item"> <Link className={this.isPathActive('/apps/kanban-board2') ? 'nav-link active' : 'nav-link'} to="/portfolio/loans"><Trans>Loan Activities</Trans></Link></li>
                                <li className="nav-item"> <Link className={this.isPathActive('/apps/kanban-board') ? 'nav-link active' : 'nav-link'} to="/portfolio/loans"><Trans>Broker Disbursment</Trans></Link></li>
                                <li className="nav-item"> <Link className={this.isPathActive('/apps/kanban-board2') ? 'nav-link active' : 'nav-link'} to="/portfolio/loans"><Trans>Lender PaymentHistory</Trans></Link></li>
                                <li className="nav-item"> <Link className={this.isPathActive('/apps/kanban-board') ? 'nav-link active' : 'nav-link'} to="/portfolio/loans"><Trans>Interest Accrual</Trans></Link></li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className={this.isPathActive('/apps') ? 'nav-item active' : 'nav-item'}>
                        <div className={this.state.appsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('appsMenuOpen')} data-toggle="collapse">
                            <i className="mdi mdi-cards-variant menu-icon"></i>
                            <span className="menu-title"><Trans>Boards</Trans></span>
                            <i className="menu-arrow"></i>
                        </div>
                        <Collapse in={this.state.appsMenuOpen}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link className={this.isPathActive('/apps/kanban-board1') ? 'nav-link active' : 'nav-link'} to="/apps/kanban-board1"><Trans>Loan Servicing Pipeline</Trans></Link></li>
                                <li className="nav-item"> <Link className={this.isPathActive('/apps/kanban-board2') ? 'nav-link active' : 'nav-link'} to="/apps/kanban-board2"><Trans>Boarding Pipeline</Trans></Link></li>
                                <li className="nav-item"> <Link className={this.isPathActive('/apps/kanban-board') ? 'nav-link active' : 'nav-link'} to="/apps/kanban-board3"><Trans>New Pipeline</Trans></Link></li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className={this.isPathActive('/apps/todo-list') ? 'nav-item active' : 'nav-item'}>
                        <Link className="nav-link" to="/apps/todo-list">
                            <i className="mdi mdi-format-list-bulleted menu-icon"></i>
                            <span className="menu-title"><Trans>To Do List</Trans></span>
                        </Link>
                    </li>
                    <li className={this.isPathActive('/apps/calendar') ? 'nav-item active' : 'nav-item'}>
                        <Link className="nav-link" to="/apps/calendar">
                            <i className="mdi mdi-table-large menu-icon"></i>
                            <span className="menu-title"><Trans>Calendar</Trans></span>
                        </Link>
                    </li>
                    <li className={this.isPathActive('/form-elements/wizard') ? 'nav-item active' : 'nav-item'}>
                        <Link className="nav-link" to="/form-elements/wizard">
                            <i className="mdi mdi-bell-outline menu-icon"></i>
                            <span className="menu-title"><Trans>Wizard</Trans></span>
                        </Link>
                    </li>
                    <li className={this.isPathActive('/notifications') ? 'nav-item active' : 'nav-item'}>
                        <Link className="nav-link" to="/notifications">
                            <i className="mdi mdi-bell-outline menu-icon"></i>
                            <span className="menu-title"><Trans>Notifications</Trans></span>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }

    componentDidMount() {
        this.onRouteChanged();
        // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
        const body = document.querySelector('body');
        document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

            el.addEventListener('mouseover', function () {
                if (body.classList.contains('sidebar-icon-only')) {
                    el.classList.add('hover-open');
                }
            });
            el.addEventListener('mouseout', function () {
                if (body.classList.contains('sidebar-icon-only')) {
                    el.classList.remove('hover-open');
                }
            });
        });
    }

}

export default withRouter(Sidebar);