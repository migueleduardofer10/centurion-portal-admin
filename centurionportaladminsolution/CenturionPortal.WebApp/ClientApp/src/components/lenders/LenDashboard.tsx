import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { ApplicationState } from '../../store/index';
import * as LenDashboardStore from '../../store/stores/lenders/dashboard/LenDashboardStore';

import 'hammerjs';
import BreadCrumb from '../shared/BreadCrumb';
import LoanStates from './dashboard/LenDasLoanStates';
import LoanStatus from './dashboard/LenDasLoanStatus';
import PaymentOnTime from './dashboard/LenDasPaymentTime';
import PaymentToLender from './dashboard/LenDasPaymentLender';
import PaymentBorrower from './dashboard/LenDasPaymentBorrower';

// At runtime, Redux will merge together...
type LenDashboardProps =
    LenDashboardStore.State // ... state we've requested from the Redux store
    & typeof LenDashboardStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class LenDashboard extends React.PureComponent<LenDashboardProps> {
    public componentDidMount() {
        this.fetchData();
    }

    public render() {
        return (
            <React.Fragment>
                <BreadCrumb title="Lender Dashboard" />
                <LoanStates />
                <PaymentOnTime />
                <PaymentToLender />
                <PaymentBorrower />
                <LoanStatus />
            </React.Fragment >
        );
    }

    private fetchData = () => {
        this.props.fetchData();
    }
}

export default connect(
    (state: ApplicationState) => state.lenDashboard,
    LenDashboardStore.actions
)(LenDashboard as any);
