import * as React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

interface ILirsCaptchaProps {
    validate: Function;
    reseted: Function;
    siteKey: string;
    reset: boolean;
}


class LirsCaptcha extends React.Component<ILirsCaptchaProps> {    
    state = { valueCaptcha: '' };
    captcha: any;
    
    constructor(props: ILirsCaptchaProps) {
        super(props);
        this.state = {
            valueCaptcha: ''
        };
    }

    componentDidUpdate() {
        if (this.props.reset) {
            this.captcha.reset();
            this.props.reseted();
        }
    }

    onCaptchaChange = (value: any) => {
        this.setState({
            valueCaptcha: value
        });
        this.props.validate(value, !!(value));
    }


    render() {
        return (
            <div className="content-captcha-center">
                <ReCAPTCHA
                    ref={(event: any) => (this.captcha = event)}
                    sitekey={this.props.siteKey}
                    onChange={this.onCaptchaChange} />
            </div>
        );
    }
}

export default LirsCaptcha;