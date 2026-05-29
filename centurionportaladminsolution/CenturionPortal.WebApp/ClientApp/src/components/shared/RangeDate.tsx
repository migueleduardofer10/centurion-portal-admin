import * as React from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { ComboBox } from '@progress/kendo-react-dropdowns';

interface IRangeDateProps {
    filterButton?: boolean;
    nameDateFrom?: string;
    nameDateTo?: string;
    nameRangeType?: string;
    onChange?: Function;
    onClick?: Function;
    title?: string;
    valueDateFrom?: Date;
    valueDateTo?: Date;
    valueRangeType?: 'TODAY' | 'LAST WEEK' | 'THIS MONTH' | 'LAST MONTH' | 'THIS YEAR' | 'LAST YEAR' | 'CUSTOM RANGE';
}

const CalculateDateFrom = (rangeType: string, date: Date) => {
    let dateFrom: Date = new Date();
    let dateTemp: Date = new Date();
    if (rangeType === 'TODAY') { /*today*/
        dateFrom = dateTemp;
    } else if (rangeType === 'LAST WEEK') { /*last week*/
        dateFrom.setDate(dateTemp.getDate() - 7);
    } else if (rangeType === 'THIS MONTH') { /*this month*/
        dateFrom = new Date(dateTemp.getFullYear(), dateTemp.getMonth(), 1);
    } else if (rangeType === 'LAST MONTH') { /*last month*/
        dateFrom = new Date(dateTemp.getFullYear(), dateTemp.getMonth() - 1, 1);
    } else if (rangeType === 'THIS YEAR') { /*this year*/
        dateFrom = new Date((new Date().getFullYear()), 0, 1);
    } else if (rangeType === 'LAST YEAR') { /*last year*/
        dateFrom = new Date((new Date().getFullYear() - 1), 0, 1);
    } else if (rangeType === 'CUSTOM RANGE') { /*custom range*/
        dateFrom = date;
    }

    return dateFrom;
}

const CalculateDateTo = (rangeType: string, date: Date) => {
    let dateTo: Date = new Date();
    let dateTemp: Date = new Date();
    if (rangeType === 'TODAY') { /*today*/
        dateTo = dateTemp;
    } else if (rangeType === 'LAST WEEK') { /*last week*/
        dateTo = dateTemp;
    } else if (rangeType === 'THIS MONTH') { /*this month*/
        dateTo = dateTemp;
    } else if (rangeType === 'LAST MONTH') { /*last month*/
        dateTemp.setDate(new Date(dateTemp.getFullYear(), dateTemp.getMonth(), 1).getDate() - 1);
        dateTo = dateTemp;
    } else if (rangeType === 'THIS YEAR') { /*this year*/
        dateTo = new Date();
    } else if (rangeType === 'LAST YEAR') { /*last year*/
        dateTo = new Date((new Date().getFullYear() - 1), 11, 31);
    } else if (rangeType === 'CUSTOM RANGE') { /*custom range*/
        dateTo = date;
    }

    return dateTo;
}

class RangeDate extends React.PureComponent<IRangeDateProps> {
    
    state = {
        filterButtonEnabled: false,
        nameDateFrom: this.props.nameDateFrom ? this.props.nameDateFrom : "dateFrom",
        nameDateTo: this.props.nameDateTo ? this.props.nameDateTo : "dateTo",
        nameRangeType: this.props.nameRangeType ? this.props.nameRangeType : "rangeType",
        rangeEnabled: false,        
        rangeTypes: [
            "TODAY",
            "LAST WEEK",
            "THIS MONTH",
            "LAST MONTH",
            "THIS YEAR",
            "LAST YEAR",
            "CUSTOM RANGE"
        ],
        valueDateFrom: this.props.valueRangeType ? CalculateDateFrom(this.props.valueRangeType, (this.props.valueDateFrom ? this.props.valueDateFrom : new Date())) : new Date(),
        valueDateTo: this.props.valueRangeType ? CalculateDateTo(this.props.valueRangeType, (this.props.valueDateTo ? this.props.valueDateTo : new Date())) : new Date(),
        valueRangeType: this.props.valueRangeType ? this.props.valueRangeType : "TODAY",
    }

    public render() {
        return (
            <div className="card-group">
                <div className="card mb-1">
                    <div className="card-header p-1 pl-2">
                        {this.props.title === undefined ? "Select Range " : this.props.title}
                    </div>
                    <div className="card-body p-1 pl-2">
                        <div className="form-row pl-1">
                            <div className={'form-row p-1 mr-1 d-inline-flex'} >
                                <div className="  d-inline-block" style={{ width: "70px" }}>
                                    <small>Range Date</small>
                                </div>
                                <div className="  d-inline-block text-right pr-2" >
                                    <ComboBox data={this.state.rangeTypes}
                                        name={this.state.nameRangeType}
                                        value={this.state.valueRangeType}
                                        onChange={this.onChange}
                                        clearButton={false} />
                                </div>
                            </div>
                        </div>
                        <div className="form-row pl-1">
                            <div className={'form-row p-1 mr-1 d-inline-flex'} >
                                <div className="  d-inline-block text-right pr-2" style={{ width: "70px" }}>
                                    <small>From</small>
                                </div>
                                <div className="  d-inline-block" style={{ width: "140px" }} >
                                    <DatePicker width="140px"
                                        className=""
                                        format="MM/dd/yyyy"
                                        id="dateFrom"
                                        name={this.state.nameDateFrom}
                                        value={this.state.valueDateFrom}
                                        onChange={this.onChange}
                                        disabled={!this.state.rangeEnabled} />
                                </div>
                            </div>

                            <div className={'form-row p-1 mr-1 d-inline-flex'} >
                                <div className="  d-inline-block text-right pr-2" style={{ width: "70px" }}>
                                    <small>To</small>
                                </div>
                                <div className="  d-inline-block" style={{ width: "140px" }} >
                                    <DatePicker width="140px"
                                        className=""
                                        format="MM/dd/yyyy"
                                        id="dateTo"
                                        name={this.state.nameDateTo}
                                        value={this.state.valueDateTo}
                                        onChange={this.onChange} disabled={!this.state.rangeEnabled} />
                                </div>
                            </div>
                            {
                                this.props.filterButton
                                ?   <div className={'form-row p-1 mr-1 d-inline-flex'} >
                                        <div className="d-inline-block">
                                            <button className="btn btn-primary btn-sm btn-block" onClick={this.onClick} style={{ width: "70px", height: "37px" }} disabled={!this.state.filterButtonEnabled}>
                                                <span className="d-none d-md-inline">Filter</span>
                                            </button>
                                        </div>
                                    </div>
                                : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onClick = (event: any) => {

        if (this.props.onClick)
            this.props.onClick(event);
    }

    private onChange = (event: any) => {
        let name: string = event.target.name;
        let value: any = event.target.value;

        let filterButtonEnabled: boolean = this.state.filterButtonEnabled;
        let rangeEnabled: boolean = this.state.rangeEnabled;
        let valueDateFrom: Date = this.state.valueDateFrom;
        let valueDateTo: Date = this.state.valueDateTo;
        let valueRangeType: any = this.state.valueRangeType;

        if (name === this.state.nameRangeType) {
            valueRangeType = value;
            filterButtonEnabled = (valueRangeType === 'CUSTOM RANGE' ? true : false);
            rangeEnabled = (valueRangeType === 'CUSTOM RANGE' ? true : false);
            valueDateFrom = CalculateDateFrom(valueRangeType, valueDateFrom);
            valueDateTo = CalculateDateTo(valueRangeType, valueDateTo);
        }
        else if (name === this.state.nameDateFrom) {
            valueDateFrom = new Date(Date.parse(value));
        }
        else if (name === this.state.nameDateTo) {
            valueDateTo = new Date(Date.parse(value));
        }

        this.setState({ valueRangeType, valueDateFrom, valueDateTo, rangeEnabled, filterButtonEnabled });
        event.value = { valueRangeType: valueRangeType, valueDateFrom: valueDateFrom, valueDateTo: valueDateTo };        

        if (this.props.onChange)
            this.props.onChange(event);
    }
}

export default RangeDate;
