import * as React from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AppLoading from './AppLoading';
import AppBackDrop from './AppBackDrop';

export default (props: { children?: React.ReactNode, isFullPage?: boolean }) => (
    <React.Fragment>
        <div className="container-scroller">
            {!props.isFullPage ? <Navbar /> : ''}
            <div className={"container-fluid page-body-wrapper" + (props.isFullPage ? " full-page-wrapper" : "")}>
                {!props.isFullPage ? <Sidebar /> : ''}
                <div className="main-panel">
                    <div className="content-wrapper">
                        {props.children}
                    </div>
                    {!props.isFullPage ? <Footer /> : ''}
                </div>
            </div>
            <AppLoading />
            <AppBackDrop />
        </div>
    </React.Fragment>
);
