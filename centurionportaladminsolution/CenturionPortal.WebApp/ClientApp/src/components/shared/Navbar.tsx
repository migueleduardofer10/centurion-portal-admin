import * as React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { Trans } from 'react-i18next';
import { Auth } from '../../utilities/Functions';
import { ApplicationState } from '../../store/index';
import * as AuthStore from '../../store/stores/auth/AuthStore';

// At runtime, Redux will merge together...
type AuthListProps =
    AuthStore.State // ... state we've requested from the Redux store
    & typeof AuthStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters assets/images/users/2.jpg

class Navbar extends React.PureComponent<AuthListProps> {
    public componentDidMount() {
        this.props.intervalSession(() => {
            this.props.refreshToken();
        });
    }

    private toggleOffcanvas2 = () => {

        let sidebar = document.getElementById('sidebar') as HTMLDivElement
        let navbar = document.getElementById('navbarPrincipal1') as HTMLDivElement
        let menu = document.getElementById('navbarMenuWrapper1') as HTMLDivElement
        let mainPanel = document.querySelector('.main-panel') as HTMLDivElement

        let sidebar_importantWidth0 = sidebar.classList.contains('important-width-0')

        let importantWidth100Percent = 'important-width-100-percent'
        let importantLeft0 = 'important-left-0'


        if (sidebar_importantWidth0) {
            mainPanel.classList.remove(importantWidth100Percent)
            navbar.classList.remove(importantLeft0)
            menu.classList.remove(importantWidth100Percent)
        }
        else {
            mainPanel.classList.add(importantWidth100Percent)
            navbar.classList.add(importantLeft0)
            menu.classList.add(importantWidth100Percent)
        }

        sidebar.classList.toggle('important-width-0')


    }
    public render() {
        return !this.props.isLoggedin ? <Redirect to="/login" /> : (
            <nav id='navbarPrincipal1' className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
                <div id='navbarMenuWrapper1' className="navbar-menu-wrapper d-flex align-items-center justify-content-between">

                    {/*
                    <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="!#" onClick={(event: any) => event.preventDefault()}><img src="/images/logo-mini.svg" alt="logo" /></a>
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button">
                        <i className="mdi mdi-menu"></i>
                    </button>

*/}

                    <button id='bnNavBarToggler1'
                        className="navbar-toggler align-self-center important-display-block"
                        type="button"
                        onClick={this.toggleOffcanvas2}
                    >
                        <i className="mdi mdi-menu"></i>
                    </button>



                    { /*  
                    <ul className="navbar-nav navbar-nav-left header-links">
                        <li className="nav-item d-none d-md-flex">
                            <a href="!#" onClick={(event: any) => event.preventDefault()} className="nav-link"><Trans>Schedule</Trans> <span className="badge badge-primary"><Trans>New</Trans></span>
                            </a>
                        </li>
                        <li className="nav-item active d-none d-xl-flex">
                            <a href="!#" onClick={(event: any) => event.preventDefault()} className="nav-link">
                                <i className="mdi mdi-elevation-rise"></i><Trans>Reports</Trans></a>
                        </li>
                        <li className="nav-item d-none d-lg-flex">
                            <a href="!#" onClick={(event: any) => event.preventDefault()} className="nav-link">
                                <i className="mdi mdi-bookmark-plus-outline"></i><Trans>Score</Trans></a>
                        </li>
                    </ul>
                    */}
                    <ul className="navbar-nav navbar-nav-right">

                        { /*
                        <li className="nav-item  nav-profile border-0">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-mails" className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                                    <i className="mdi mdi-file-outline"></i>
                                    <span className="count">7</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="navbar-dropdown preview-list">
                                    <Dropdown.Item className="dropdown-item  d-flex align-items-center" href="!#" onClick={(event: any) => event.preventDefault()}>
                                        <p className="mb-0 font-weight-medium float-left"><Trans>You have</Trans> 7 <Trans>unread mails</Trans> </p>
                                        <span className="badge badge-pill badge-primary">View all</span>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={(event: any) => event.preventDefault()}>
                                        <div className="preview-thumbnail">
                                            <img src="/images/faces/face10.jpg" alt="profile" className="img-sm profile-pic" /> </div>
                                        <div className="preview-item-content flex-grow py-2">
                                            <p className="preview-subject ellipsis font-weight-medium text-dark"><Trans>Marian Garner</Trans> </p>
                                            <p className="font-weight-light small-text"> <Trans>The meeting is cancelled</Trans> </p>
                                        </div>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={(event: any) => event.preventDefault()}>
                                        <div className="preview-thumbnail">
                                            <img src="/images/faces/face12.jpg" alt="profile" className="img-sm profile-pic" /> </div>
                                        <div className="preview-item-content flex-grow py-2">
                                            <p className="preview-subject ellipsis font-weight-medium text-dark"><Trans>David Grey</Trans> </p>
                                            <p className="font-weight-light small-text"> <Trans>The meeting is cancelled</Trans></p>
                                        </div>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={(event: any) => event.preventDefault()}>
                                        <div className="preview-thumbnail">
                                            <img src="/images/faces/face1.jpg" alt="profile" className="img-sm profile-pic" /> </div>
                                        <div className="preview-item-content flex-grow py-2">
                                            <p className="preview-subject ellipsis font-weight-medium text-dark"><Trans>Travis Jenkins</Trans> </p>
                                            <p className="font-weight-light small-text"> <Trans>The meeting is cancelled</Trans> </p>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li className="nav-item  nav-profile border-0">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-notification" className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                                    <i className="mdi mdi-bell-outline"></i>
                                    <span className="count bg-success">4</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="navbar-dropdown preview-list">
                                    <Dropdown.Item className="dropdown-item py-3 d-flex align-items-center" href="!#" onClick={(event: any) => event.preventDefault()}>
                                        <p className="mb-0 font-weight-medium float-left"><Trans>You have</Trans> 4 <Trans>new notifications</Trans> </p>
                                        <span className="badge badge-pill badge-primary float-right">View all</span>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={(event: any) => event.preventDefault()}>
                                        <div className="preview-thumbnail">
                                            <i className="mdi mdi-alert m-auto text-primary"></i>
                                        </div>
                                        <div className="preview-item-content py-2">
                                            <h6 className="preview-subject font-weight-normal text-dark mb-1"><Trans>Application Error</Trans></h6>
                                            <p className="font-weight-light small-text mb-0"> <Trans>Just now</Trans> </p>
                                        </div>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={(event: any) => event.preventDefault()}>
                                        <div className="preview-thumbnail">
                                            <i className="mdi mdi-settings m-auto text-primary"></i>
                                        </div>
                                        <div className="preview-item-content py-2">
                                            <h6 className="preview-subject font-weight-normal text-dark mb-1"><Trans>Settings</Trans></h6>
                                            <p className="font-weight-light small-text mb-0"> <Trans>Private message</Trans> </p>
                                        </div>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={(event: any) => event.preventDefault()}>
                                        <div className="preview-thumbnail">
                                            <i className="mdi mdi-airballoon m-auto text-primary"></i>
                                        </div>
                                        <div className="preview-item-content py-2">
                                            <h6 className="preview-subject font-weight-normal text-dark mb-1"><Trans>New user registration</Trans></h6>
                                            <p className="font-weight-light small-text mb-0"> 2 <Trans>days ago</Trans> </p>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        */}

                        <li className="nav-item  nav-profile border-0">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-profile" className="nav-link count-indicator bg-transparent">
                                    <span className="profile-text">{Auth.getELSUser().FullName}</span>
                                    {/*
                                    <img className="img-xs rounded-circle" src="/images/faces/face8.jpg" alt="Profile" />
                                    */}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                                    {/*<Dropdown.Item className="dropdown-item p-0 preview-item d-flex align-items-center border-bottom" href="!#" onClick={(event: any) => event.preventDefault()}>
                                        <div className="d-flex">
                                            <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                                                <i className="mdi mdi-bookmark-plus-outline mr-0"></i>
                                            </div>
                                            <div className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                                                <i className="mdi mdi-account-outline mr-0"></i>
                                            </div>
                                            <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                                                <i className="mdi mdi-alarm-check mr-0"></i>
                                            </div>
                                        </div>
                                    </Dropdown.Item>*/}
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={(event: any) => event.preventDefault()}>
                                        <Trans>Manage Accounts</Trans>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={(event: any) => event.preventDefault()}>
                                        <Trans>Change Password</Trans>
                                    </Dropdown.Item>
                                    {/*<Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={(event: any) => event.preventDefault()}>
                                        <Trans>Check Inbox</Trans>
                                    </Dropdown.Item>*/}
                                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={this.signOut}>
                                        <Trans>Sign Out</Trans>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                    {/*
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
                        <span className="mdi mdi-menu"></span>
                    </button>
                    */}
                </div>
            </nav>
        );
    }

    private toggleOffcanvas = () => {
        let sidebar = document.querySelector('.sidebar-offcanvas');
        if (sidebar != null) sidebar.classList.toggle('active');
    }

    public signOut = (event: any) => {
        event.preventDefault();
        this.props.signOut();
    }
}

export default connect(
    (state: ApplicationState) => state.auth,
    AuthStore.actions
)(Navbar as any);
