import * as React from 'react';
import {
    Chart,
    ChartLegend,
    ChartArea,
    ChartTooltip,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartValueAxisLabels
} from '@progress/kendo-react-charts';

export default class CharColumn extends React.Component {
    state = {
        categories: [],
        series: []
    };

    componentDidMount() {
        this.setState(this.getData());
    }

    componentDidUpdate() {
        if (this.props.update) {
            this.setState(this.getData());
            this.props.disableUpdate();
        }
    }

    render() {
        return (
            <Chart style={{ minWidth: 400, height: 400 }}>
                <ChartTooltip shared={true} render={this.tooltipRender} />
                <ChartLegend visible={true} position="bottom" />
                <ChartArea background="none" />
                <ChartValueAxis>
                    <ChartValueAxisItem title={{ text: this.props.titleValueAxis }}>
                        <ChartValueAxisLabels />
                    </ChartValueAxisItem>
                </ChartValueAxis>
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem
                        majorGridLines={{ visible: false }}
                        categories={this.state.categories}
                        labels={{ rotation: -70 }}
                    />
                </ChartCategoryAxis>
                <ChartSeries>
                    {
                        this.state.series.map((item, idx) => (
                            <ChartSeriesItem
                                key={idx}
                                type="column"
                                data={item.data}
                                name={item.name}
                                color={item.color}
                            />
                        ))
                    }
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

    tooltipRender = (props) => {
        const { category, points } = props;

        return (
            <div>
                <div>{category}</div>
                {points.map((point, index) => (<div key={index}>{point.series.name} : {point.value}</div>))}
            </div>
        );
    }
}