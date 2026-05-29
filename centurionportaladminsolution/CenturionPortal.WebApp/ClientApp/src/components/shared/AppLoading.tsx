import * as React from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { ApplicationState } from '../../store/index';
import * as AppStore from '../../store/stores/app/AppStore';

// At runtime, Redux will merge together...
type AppListProps = AppStore.State // ... state we've requested from the Redux store

class AppLoading extends React.PureComponent<AppListProps> {
    public render() {
        return this.props.loading ? (
            <div className="app-loading">
                <ReactLoading type="spinningBubbles" color="#fff" />
                <h4>Loading ...</h4>
            </div>
        ) : "";
    }
}

export default connect(
    (state: ApplicationState) => state.app, {}
)(AppLoading as any);