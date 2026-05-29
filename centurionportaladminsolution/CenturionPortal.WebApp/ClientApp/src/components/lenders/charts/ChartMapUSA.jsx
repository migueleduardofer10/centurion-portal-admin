import * as React from 'react';
import $ from 'jquery';
import 'jquery-mapael';
import 'jquery-mapael/js/maps/usa_states.js';
import { Utils } from '../../../utilities/Functions';

const selectedColorMap = '#c2185b';
const slicesLoans = [
    { min: undefined, max: 0, fill: "#ccc", label: "None Loans" },
    { min: 0, max: 100, fill: "#81d4fa", label: "Less than 100 Loans" },
    { min: 100, max: 500, fill: "#4fc3f7", label: "Between 100 and 500 Loans" },
    { min: 500, max: 1500, fill: "#29b6f6", label: "Between 500 and 1500 Loans" },
    { min: 1500, max: 5000, fill: "#039be5", label: "Between 1500 and 5000 Loans" },
    { min: 5000, max: 10000, fill: "#0288d1", label: "Between 5000 and 10000 Loans" },
    { min: 10000, max: undefined, fill: "#0277bd", label: "More than 10000 loans" }
];

export default class CharMapUSA extends React.Component {
    state = {
        listLoanData: []
    };

    componentDidMount() {
        this.initChartMap(this);
    }

    componentDidUpdate() {
        if (!this.props.loading && this.props.update) {
            switch (this.props.action) {
                case 'update':
                    this.updateLoanByStateData();
                    break;
                case 'refresh':
                    this.changeColorAllStates(true);
                    this.updateLoanByStateData();
                    break;
                case 'selectAll':
                    this.changeColorAllStates(false);
                    break;
                case 'deselectAll':
                    this.changeColorAllStates(true);
                    break;
            }
        }
    }

    render() {
        return (
            <div>
                <div className="mapcontainer" ref={el => this.el = el}>
                    <div style={{ margin: "0px auto 20px", textAlign: "center" }}>
                        <div className="density">
                            <span>Pick your state or a time period to see the details</span>
                        </div>
                        <div style={{ clear: "both" }}></div>
                    </div>
                    <div className="map"></div>
                </div>
            </div>
        );
    }

    initChartMap = (component) => {
        $(component.el).mapael({
            map: {
                name: "usa_states",
                zoom: {
                    enabled: false
                },
                defaultArea: {
                    attrs: {
                        fill: "#5ba4ff",
                        stroke: "#013d6d",
                        cursor: "pointer"
                    },
                    attrsHover: {
                        animDuration: 0,
                        fill: "#f062a6"
                    },
                    text: {
                        attrs: {
                            cursor: "pointer",
                            "font-size": 10,
                            fill: "#000"
                        },
                        attrsHover: {
                            animDuration: 0
                        }
                    },
                    eventHandlers: {
                        click: function (e, id, mapElem, textElem) {
                            var newData = {
                                'areas': {}
                            };

                            if (mapElem.originalAttrs.fill == "#ccc") return;

                            if (mapElem.originalAttrs.fill == "#5ba4ff"
                                || mapElem.originalAttrs.fill == "#81d4fa"
                                || mapElem.originalAttrs.fill == "#4fc3f7"
                                || mapElem.originalAttrs.fill == "#29b6f6"
                                || mapElem.originalAttrs.fill == "#039be5"
                                || mapElem.originalAttrs.fill == "#0288d1"
                                || mapElem.originalAttrs.fill == "#0277bd"
                            ) {
                                newData.areas[id] = {
                                    attrs: {
                                        fill: selectedColorMap,
                                        stroke: "#881140"
                                    }
                                };
                            } else {
                                newData.areas[id] = {
                                    attrs: {
                                        fill: component.getColorByRangeLoans(component.state.listLoanData[id].TotalLoans),
                                        stroke: "#013d6d"
                                    }
                                };
                            }

                            $(component.el).trigger('update', [{ mapOptions: newData }]);
                            component.refreshSelectedStates();
                        }
                    }
                }
            }
        });
    }

    updateLoanByStateData = () => {
        let listLoanData = [];
        let states = Object.keys($.mapael.maps.usa_states.elems);
        let loansByState = this.props.loansByState;

        if (loansByState === undefined || loansByState.length <= 0) return;

        for (var i = 0; i < states.length; i++) {
            var itemLoan = {};
            itemLoan.StateUid = states[i];
            itemLoan.StateName = states[i];
            itemLoan.TotalLoans = 0;
            itemLoan.TotalDelinquency = 0;
            itemLoan.UPB = 0;
            itemLoan.UPBDelinquency = 0;

            for (var j = 0; j < loansByState.length; j++) {
                var loanByState = loansByState[j];
                if (states[i] == loanByState.StateUid) {
                    itemLoan.StateName = loanByState.StateName;
                    itemLoan.TotalLoans = loanByState.TotalLoans;
                    itemLoan.TotalDelinquency = loanByState.TotalDelinquency;
                    itemLoan.UPB = loanByState.UPB;
                    itemLoan.UPBDelinquency = loanByState.UPBDelinquency;
                    break;
                }
            }
            listLoanData[states[i]] = itemLoan;
        }

        let totalUPB = 0;
        let totalLoans = 0;
        let totalUPBDelinquency = 0;
        let totalLoansDelinquency = 0;

        if (Object.keys(listLoanData).length <= 0) return;

        let customAreas = {};
        for (var key in listLoanData) {
            totalUPB += loanByState.UPB;
            totalLoans += loanByState.TotalLoans;
            totalUPBDelinquency += loanByState.UPBDelinquency;
            totalLoansDelinquency += loanByState.TotalDelinquency;

            var loanByState = listLoanData[key];
            var tmpArea =
            {
                value: loanByState.TotalLoans,
                tooltip: loanByState.TotalLoans > 0 ? {
                    content: "<span style=\"font-weight:bold;\">" + loanByState.StateName + "</span>" +
                        "<br />Total Loans: " + Number(loanByState.TotalLoans) +
                        "<br />Total Delinquency: " + Utils.currencyFormat(Number(loanByState.TotalDelinquency)) +
                        "<br />UPB: " + Utils.currencyFormat(Number(loanByState.UPB))
                } : undefined,
                attrs: {
                    fill: this.getColorByRangeLoans(loanByState.TotalLoans)
                },
                attrsHover: {
                    animDuration: 0,
                    fill: loanByState.TotalLoans > 0 ? "#f062a6" : "#ccc"
                }
            }
            customAreas[loanByState.StateUid] = tmpArea;
        }

        $(this.el).trigger('update', [{ mapOptions: { areas: customAreas } }]);

        this.setState({ listLoanData });
        this.props.onUpdate(listLoanData, totalUPB, totalLoans, totalUPBDelinquency, totalLoansDelinquency);
    }

    refreshSelectedStates = () => {
        let mapael = $(this.el).data('mapael');
        this.props.onClick(mapael.areas, selectedColorMap);
    }

    changeColorAllStates = (inverse) => {
        let newData = { 'areas': {} };
        let mapael = $(this.el).data('mapael');
        let states = Object.keys(mapael.areas);
        states.map((key) => {
            if (mapael.areas[key].options.attrs.fill == "#ccc")
                newData.areas[key] = {
                    attrs: {
                        fill: mapael.areas[key].options.attrs.fill,
                        stroke: mapael.areas[key].options.attrs.stroke
                    }
                };
            else
                newData = this.paintSelectedState(key, newData, inverse);
        });
        $(this.el).trigger('update', [{ mapOptions: newData }]);
        this.refreshSelectedStates();
    }

    getColorByRangeLoans = (totalLoans) => {
        for (var i = 0; i < slicesLoans.length; i++) {
            var item = slicesLoans[i];
            if ((item.min == undefined || item.min < totalLoans) && (item.max == undefined || totalLoans <= item.max)) {
                return item.fill;
            }
        }
    }

    paintSelectedState = (id, newData, inverse) => {
        if (inverse === true) {
            newData.areas[id] = {
                attrs: {
                    fill: this.getColorByRangeLoans(this.state.listLoanData[id].TotalLoans),
                    stroke: "#013d6d"
                }
            };
        } else {
            newData.areas[id] = {
                attrs: {
                    fill: selectedColorMap,
                    stroke: "#881140"
                }
            };
        }

        return newData;
    }
}