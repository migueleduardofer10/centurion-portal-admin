import * as React from 'react';
import {
    Chart,
    ChartLegend,
    ChartArea,
    ChartTooltip,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartSeries,
    ChartSeriesItem
} from '@progress/kendo-react-charts';
import { Utils } from '../../../utilities/Functions';

export default class ChartBar extends React.Component {
    state = {
        categories: [],
        series: []
    };

    componentDidMount() {
        this.setState(this.getData());
    }

    componentDidUpdate() {
        if (!this.props.loading && this.props.update) {
            this.setState(this.getData());
            this.props.onUpdate();
        }
    }

    render() {
        return (
            <Chart style={{ minWidth: 400, height: 400 }}>
                <ChartTooltip render={this.tooltipRender} />
                <ChartLegend visible={false} />
                <ChartArea background="none" />
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem
                        majorGridLines={{ visible: false }}
                        categories={this.state.categories}
                    />
                </ChartCategoryAxis>
                <ChartSeries>
                    <ChartSeriesItem
                        type="bar"
                        data={this.state.series}
                        name="Count"
                    />
                </ChartSeries>
            </Chart>
        );
    }

    getData = () => {
        return {
            categories: this.props.categories,
            series: this.props.series
        };
    }

    tooltipRender = ({ point }) => {
        return (
            <span><b>{point.category}: {Utils.decimalFormat(point.value)}</b></span>
        );
    }
}