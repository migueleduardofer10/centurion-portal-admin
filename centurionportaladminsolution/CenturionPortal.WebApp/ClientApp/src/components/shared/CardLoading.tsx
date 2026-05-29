import * as React from 'react';
import ReactLoading from 'react-loading';

export default class CardLoading extends React.PureComponent<{}> {
    public render() {
        return (
            <div className="card-loading">
                <ReactLoading type="spinningBubbles" color="#fff" />
                <h4>Loading ...</h4>
            </div>
        );
    }
}