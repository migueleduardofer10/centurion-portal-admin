import * as React from 'react';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

interface ICustomPDFExportProps {
    columns: any[];
    data: any[];
    fileName: string;
}

class CustomPDFExport extends React.PureComponent<ICustomPDFExportProps> {
    gridPDFExport: any;

    public render() {
        return (
            <GridPDFExport fileName={`${this.props.fileName}.pdf`} ref={(element: any) => { this.gridPDFExport = element; }} >
                {
                    this.props.children
                }
            </GridPDFExport>
        );
    }

    exportPDF = () => {
        this.gridPDFExport.save(this.props.data, this.exportPDFDone);
        this.setState({ exporting: true });
    }

    exportPDFDone = () => {
        this.setState({ exporting: false });
    }
}

export default CustomPDFExport;