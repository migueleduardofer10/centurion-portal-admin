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
        if (!this.props.loading && this.props.refresh) {
            this.setState({ data: this.getData() });
            this.props.onRefresh();
        }
    }

    render() {
        return (
            <Chart style={{ minWidth: 400, height: 400 }} >
                <ChartTooltip visible="true" format="{0:n0}" />
                <ChartLegend visible={false} />
                <ChartArea background="none" />
                <ChartSeries>
                    <ChartSeriesItem
                        type="pie"
                        startAngle={150}
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
        return [{
            category: "[0 - 40%]",
            value: this.props.sumPaymentsA,
            color: "#009bd7"
        }, {
            category: "[41 - 60%]",
            value: this.props.sumPaymentsB,
            color: "#26aadd"
        }, {
            category: "[61 - 80%]",
            value: this.props.sumPaymentsC,
            color: "#4db9e3"
        }, {
            category: "[81 - 99%]",
            value: this.props.sumPaymentsD,
            color: "#73c8e9"
        }, {
            category: "[100%]",
            value: this.props.sumPaymentsE,
            color: "#99d7ef"
        }];
    }

    labelContent = (props) => {
        let formatedNumber = Number(props.dataItem.value).toLocaleString(undefined, { style: 'decimal', minimumFractionDigits: 0 });
        return `${props.dataItem.category}:\n${formatedNumber}`;
    }
}