import * as React from 'react';
import {
    Chart,
    ChartLegend,
    ChartArea,
    ChartTooltip,
    ChartSeries,
    ChartSeriesItem
} from '@progress/kendo-react-charts';

export default class ChartPie extends React.Component {
    state = {
        data: [],
    };

    componentDidMount() {
        this.setState({ data: this.getData() });
    }

    componentDidUpdate() {
        if (this.props.update) {
            this.setState({ data: this.getData() });
            this.props.disableUpdate();
        }
    }

    render() {
        return (
            <Chart style={{ minWidth: 400, height: 400 }} >
                <ChartTooltip render={this.tooltipRender} />
                <ChartLegend visible={false} />
                <ChartArea background="none" />
                <ChartSeries>
                    <ChartSeriesItem
                        type="pie"
                        startAngle={135}
                        data={this.state.data}
                        categoryField="category"
                        colorField="color"
                        field="value"
                        labels={{ visible: true, background: "transparent", content: this.labelContent }}
                    />
                </ChartSeries>
            </Chart>
        );
    }

    getData = () => {
        return this.props.series;
    }

    tooltipRender = ({ point }) => {
        if (!point) return "";

        return (
            <span>{point.category}: <b>{Number(point.value).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 })}</b></span>
        );
    }

    labelContent = (props) => {
        let formatedNumber = Number(props.dataItem.value).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });
        return `${props.dataItem.category}:\n${formatedNumber}`;
    }
}