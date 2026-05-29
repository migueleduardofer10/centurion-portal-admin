import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as AppStore from '../../store/stores/app/AppStore';

// At runtime, Redux will merge together...
type AppListProps = AppStore.State // ... state we've requested from the Redux store

class AppBackDrop extends React.PureComponent<AppListProps> {
    public render() {
        return this.props.backDrop ? (<div className="app-loading"></div>) : "";
    }
}

export default connect(
    (state: ApplicationState) => state.app, {}
)(AppBackDrop as any);