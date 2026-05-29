import * as React from 'react';
import { Trans } from 'react-i18next';
import { Utils } from '../../utilities/Functions';

class Footer extends React.PureComponent {
 
    public render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between align-items-center">
                        <div className='d-flex flex-column justify-content-start'>
                            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block"><Trans>Copyright © 2020 FCI Lender Services, Inc.</Trans></span>
                            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block"><Trans>All Rights Reserved. (Build {Utils.getVersion()})</Trans></span>
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