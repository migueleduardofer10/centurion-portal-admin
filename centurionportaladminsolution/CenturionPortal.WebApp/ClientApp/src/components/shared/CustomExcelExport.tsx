import * as React from 'react';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';

interface ICustomExcelExportProps {
    data: any[];
    columns: any[];
    fileName: string;
    exportExcel: boolean;
    enableExportExcel: Function;
}

class CustomExcelExport extends React.PureComponent<ICustomExcelExportProps> {
    _exporter: any;

    public componentDidUpdate() {
        if (this.props.exportExcel) {
            this.props.enableExportExcel(false);
            this._exporter.save();
        }
    }

    public render() {
        return (
                <ExcelExport
                    ref={(exporter: any) => this._exporter = exporter}
                    data={this.props.data}
                    fileName={`${this.props.fileName}.xlsx`}
                >
                    {
                        this.props.columns.map(column => (
                            <ExcelExportColumn
                                key={column.ColumnName}
                                title={column.Title}
                                field={column.HasCustomValue ? `${column.ColumnName}_String` : column.ColumnName}
                                width={Number(column.Width)}
                                headerCellOptions={{ textAlign: 'center' }}
                                cellOptions={{ textAlign: column.Align, format: column.FormatExcel }} />
                        ))
                    }
                </ExcelExport>
        );
    }
}

export default CustomExcelExport;
