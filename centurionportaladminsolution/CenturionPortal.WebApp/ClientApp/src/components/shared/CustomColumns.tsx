import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Utils } from '../../utilities/Functions';

interface ICustomColumnsProps {
    columns: any[];
    realColumns: any[];
    changed: Function;
    applyChanged: Function;
}

class CustomColumns extends React.PureComponent<ICustomColumnsProps> {
    state = {
        activeColumn: '',
        dropdownColumns: false
    };

    public componentDidUpdate() {
        if (this.state.activeColumn == '')
            this.setState({ activeColumn: Utils.getActiveColumn(this.props.columns) });
    }

    public render() {
        return (
            <Dropdown isOpen={this.state.dropdownColumns} toggle={this.toggleColumns}>
                <DropdownToggle caret className="btn btn-primary waves-effect waves-dark">
                    <i className="fa fa-columns"></i>
                    <span className="d-none d-md-inline"> Colums</span>
                </DropdownToggle>
                <DropdownMenu>
                    <div className="mega-dropdown-menu row">
                        <div className="col-md-7">
                            <ul className="list-group">
                                {
                                    this.props.columns.map(column => (
                                        <li key={column.ColumnName}
                                            className={"list-group-item" + (this.state.activeColumn === column.ColumnName ? " active" : "")}
                                            onClick={() => this.setActiveColumn(column.ColumnName)}
                                        >
                                            <div className="form-check m-0">
                                                <input className="form-check-input" type="checkbox" checked={column.Checked} onChange={(event: any) => this.checkColumn(event, column.ColumnName)} />
                                                <label className="form-check-label">{column.Title}</label>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-5 mt-2">
                            <div className="row">
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-light btn-block" onClick={this.applyChangeColumns}>
                                        <i className="ti ti-save"></i> Apply
                                        </button>
                                </div>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-secondary btn-block mt-1" onClick={this.revertColumns}>
                                        <i className="fa fa-undo"></i> Cancel
                                        </button>
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-info btn-block mt-1" onClick={() => this.moveColumn(-1)}>
                                        <i className="fa fa-arrow-up m-0"></i>
                                    </button>
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-info btn-block mt-1" onClick={() => this.moveColumn(1)}>
                                        <i className="fa fa-arrow-down m-0"></i>
                                    </button>
                                </div>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-secondary btn-block mt-1" onClick={() => this.toggleAllColumns(true)}>
                                        <i className="ti ti-check-box"></i> Check All
                                        </button>
                                </div>
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-secondary btn-block mt-1" onClick={() => this.toggleAllColumns(false)}>
                                        <i className="ti ti-control-stop"></i> Uncheck All
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DropdownMenu>
            </Dropdown>
        );
    }

    private toggleColumns = () => {
        this.setState({ dropdownColumns: !this.state.dropdownColumns });
    }

    private setActiveColumn = (activeColumn: string) => {
        this.setState({ activeColumn });
    }

    private checkColumn = (event: any, nameColumn: string) => {
        let checked = event.target.checked;
        let stateColumns = this.props.columns;
        let columns = stateColumns.map((column: any) => {
            if (column.ColumnName === nameColumn)
                column.Checked = checked;
            return column;
        }).sort(Utils.compareColumn);

        this.props.changed(columns);
    }

    private toggleAllColumns = (checked: boolean) => {
        let stateColumns = this.props.columns;
        let columns = stateColumns.map((column: any) => {
            column.Checked = checked;
            return column;
        }).sort(Utils.compareColumn);

        this.props.changed(columns);
    }

    private moveColumn = (move: number) => {
        let activeColumn = this.state.activeColumn;
        let stateColumns: any[] = this.props.columns;

        if (activeColumn === '' || (move !== 1 && move !== -1)) return;

        let oldPosition = stateColumns.filter((column: any) => column.ColumnName === activeColumn)[0].Position;
        let newPosition = oldPosition + move;

        if (newPosition < 1 || newPosition > stateColumns.length) return;

        let otherColumn = stateColumns.filter((column: any) => column.Position === newPosition)[0].ColumnName;

        let columns = stateColumns.map(column => {
            if (column.ColumnName === activeColumn) column.Position = newPosition;
            if (column.ColumnName === otherColumn) column.Position = oldPosition;
            return column;
        }).sort(Utils.compareColumn);

        this.props.changed(columns);
    }

    private revertColumns = () => {
        this.toggleColumns();
        this.props.changed(JSON.parse(JSON.stringify(this.props.realColumns)));
    }

    private applyChangeColumns = () => {
        this.props.applyChanged();
    }
}

export default CustomColumns;
