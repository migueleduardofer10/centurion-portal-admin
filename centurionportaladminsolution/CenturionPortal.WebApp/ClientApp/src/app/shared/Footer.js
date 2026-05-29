import React, { Component } from 'react';
import { Trans } from 'react-i18next';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                        <div>
                            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block"><Trans>Copyright © 2020 FCI Lender Services, Inc. All Rights Reserved.</Trans></span>
                            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block"><Trans>All Rights Reserved. (Build v 2.20.8.6:2)</Trans></span>

                        </div>
                        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block"><Trans>Nationwide Mortgage Licensing System # 4920 | CA DRE # 01022780</Trans></span>
                        <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"><Trans>Terms Of Use</Trans> | <Trans>  Privacy Statement  </Trans></span>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;