import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router';

import LirsCaptcha from '../auth/Recaptcha';
import { Auth, Utils } from '../../utilities/Functions';
import { ApplicationState } from '../../store/index';
import * as AuthStore from '../../store/stores/auth/AuthStore';

import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';

// At runtime, Redux will merge together...
type AuthListProps =
    AuthStore.State // ... state we've requested from the Redux store
    & typeof AuthStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Login extends React.PureComponent<AuthListProps> {
    public componentDidMount() {
        document.getElementsByTagName("title")[0].innerText = 'Login - FCI Lender Servicing';
        this.props.initializeLogin();
    }

    public componentDidUpdate() {
        this.props.clearInterval();
    }

    public render() {
        return this.props.isLoggedin ? <Redirect to={Utils.homeUrl()} /> : (
            <div>
                <div className="d-flex align-items-stretch auth auth-img-bg h-100">
                    <div className="row flex-grow">
                        <div className="col-lg-6 d-flex align-items-center justify-content-center">
                            <div className="auth-form-transparent text-left p-3">
                                <div className="brand-logo">
                                    <img src="/images/admin_portal.png" alt="FCI Admin Portal" />
                                </div>
                                <h4>Welcome back!</h4>
                                <h6 className="font-weight-light">Happy to see you again!</h6>
                                <form className="pt-3" onSubmit={this.login}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend bg-transparent">
                                                <span className="input-group-text bg-transparent border-right-0">
                                                    <i className="mdi mdi-account-outline text-primary"></i>
                                                </span>
                                            </div>
                                            <input type="text" className="form-control form-control-lg border-left-0" name="Username" placeholder="Username" value={this.props.body.Username} onChange={this.changeData} required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend bg-transparent">
                                                <span className="input-group-text bg-transparent border-right-0">
                                                    <i className="mdi mdi-lock-outline text-primary"></i>
                                                </span>
                                            </div>
                                            <input type="password" className="form-control form-control-lg border-left-0" name="Password" placeholder="Password" value={this.props.body.Password} onChange={this.changeData} required />
                                        </div>
                                    </div>
                                    {
                                        this.props.recaptchaSiteKey === '' ? "" :
                                            <div className="form-group">
                                                <LirsCaptcha siteKey={this.props.recaptchaSiteKey} validate={this.validateCaptcha} reset={this.props.isResetCaptcha} reseted={this.props.resetedCaptcha} />
                                            </div>
                                    }
                                    <div className="my-2 d-flex justify-content-between align-items-center">
                                        <div className="form-check">
                                            <label className="form-check-label text-muted">
                                                <input type="checkbox" className="form-check-input" />
                                                <i className="input-helper"></i> Keep me signed in
                                            </label>
                                        </div>
                                        <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
                                    </div>
                                    <div className="my-3">
                                        <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" disabled={!this.props.isValidCaptcha}
                                        >LOGIN</button>
                                    </div>                                    
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 login-half-bg d-flex flex-row">
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    public changeData = (event: any) => {    
        this.props.changeData(event.target.name, event.target.value);
    }

    private validateCaptcha = (response: string, isValid: boolean) => {       
        this.props.validateCaptcha(response, isValid);
    };

    public login = (event: any) => {
        event.preventDefault();
        this.props.login(this.props.responseCaptcha);
    }
}

export default connect(
    (state: ApplicationState) => state.auth,
    AuthStore.actions
)(Login as any);
