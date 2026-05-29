import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import BreadCrumb from '../shared/BreadCrumb';
import CustomGrid from '../shared/CustomGrid';
import { ApplicationState } from '../../store/index';
import * as ACHStatusReportStore from '../../store/stores/reports/ACHStatusReportStore';
import { Utils } from '../../utilities/Functions';

// At runtime, Redux will merge together...
type ACHStatusReportProps =
    ACHStatusReportStore.State // ... state we've requested from the Redux store
    & typeof ACHStatusReportStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class ACHStatusReport extends React.PureComponent<ACHStatusReportProps> {
    public componentDidMount() {
        this.props.fetchACHStatus(this.props.gridProps, true, false);
    }

    public render() {
        return (
            <React.Fragment>
                <BreadCrumb title="ACH Status Report" />
                <div className="report">
                    <div className="report-header clearfix">
                        <h1 className="report-title">ACH Status Report</h1>
                    </div>
                    <div className="report-body">
                        <CustomGrid
                            data={this.props.achstatus}
                            dataAll={this.props.achstatusAll}
                            columns={this.props.columns}
                            realColumns={this.props.realColumns}
                            dataState={this.props.gridProps}
                            fileName="Report_ACHStatus"
                            exportExcel={this.props.exportExcel}
                            currentPage={this.props.currentPage}
                            fetchData={this.props.fetchACHStatus}
                            fetchDataAll={this.props.fetchACHStatusAll}
                            enableExportExcel={this.props.enableExportExcel}
                            changedColumns={this.props.changedColumns}
                            applyChangedColumns={this.props.applyChangedColumns}
                        />
                    </div>
                    <div className="report-footer">
                        <div className="row">
                            <div className="col-4">
                                Powered by Centurion
                                </div>
                            <div className="col-4 text-center">
                                Page {Utils.getCurrentPage(this.props.gridProps)} of {Utils.getTotalPages(this.props.gridProps)}
                            </div>
                            <div className="col-4 text-right">
                                {Utils.getCurrentDate()}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default connect(
    (state: ApplicationState) => state.achStatusReport,
    ACHStatusReportStore.actions
)(ACHStatusReport as any);
