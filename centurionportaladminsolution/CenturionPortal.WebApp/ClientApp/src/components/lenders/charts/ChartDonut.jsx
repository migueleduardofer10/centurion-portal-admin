import * as React from 'react';
import { Circle as CircleGeometry } from '@progress/kendo-drawing/geometry';
import { Layout, Text } from '@progress/kendo-drawing';
import {
    Chart,
    ChartLegend,
    ChartArea,
    ChartTooltip,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels
} from '@progress/kendo-react-charts';
import { Utils } from '../../../utilities/Functions';

export default class ChartDonut extends React.Component {
    center;
    radius;
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
            <Chart onRender={this.onRender} style={{ minWidth: 140, height: 140 }} >
                <ChartTooltip visible="true" format="{0:n0}" />
                <ChartLegend visible={false} />
                <ChartArea background="none" />
                <ChartSeries>
                    <ChartSeriesItem
                        type="donut"
                        startAngle={90}
                        holeSize={60}
                        data={this.state.data}
                        categoryField="category"
                        colorField="color"
                        field="value"
                        visual={this.visualHandler}
                    >
                        <ChartSeriesLabels color="#fff" background="none" content={() => ""} />
                    </ChartSeriesItem>
                </ChartSeries>
            </Chart>
        );
    }

    getData = () => {
        return [
            {
                "category": this.props.displaySelected,
                "value": Number(this.props.selectedValue),
                "color": "#a2ccef"
            }, {
                "category": "Total",
                "value": Number(this.props.noSelectedValue),
                "color": "#eeeeef"
            }
        ];
    }

    onRender = (e) => {
        // The center and radius are populated by now.
        // We can ask a circle geometry to calculate the bounding rectangle for us.
        //
        // http://www.telerik.com/kendo-react-ui/components/drawing/api/geometry/Circle/
        const circleGeometry = new CircleGeometry(this.center, this.radius);
        const bbox = circleGeometry.bbox();

        // Render the text
        //
        // http://www.telerik.com/kendo-react-ui/components/drawing/api/Text/
        const totalLoans = this.state.data[0].value + this.state.data[1].value;
        const pctLoans = this.state.data[0].value / totalLoans;
        const heading = new Text(Utils.decimalFormat(pctLoans), [0, 0], {
            font: '16px Verdana,Arial,sans-serif'
        });

        // Reflow the text in the bounding box
        //
        // http://www.telerik.com/kendo-react-ui/components/drawing/api/Layout
        // http://www.telerik.com/kendo-react-ui/components/drawing/api/LayoutOptions
        const layout = new Layout(bbox, {
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            spacing: 5
        });

        layout.append(heading);
        layout.reflow();

        // Draw it on the Chart drawing surface
        //
        // http://www.telerik.com/kendo-react-ui/components/charts/api/Chart/#toc-surface
        if (e.target.surface !== null) e.target.surface.draw(layout);
    };

    visualHandler = (e) => {
        // Obtain parameters for the segments
        this.center = e.center;
        this.radius = e.innerRadius;

        // Create default visual
        return e.createVisual();
    };
}