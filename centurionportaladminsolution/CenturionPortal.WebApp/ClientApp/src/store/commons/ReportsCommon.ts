export interface ACHStatus {
    LoanUid: string;
    LoanAccount: string;
    ACH_Status: string;
    Borrower_Name: string;
    ACH_NextDebitDate?: Date;
    ACH_CustomPayment: string;
    ACH_PaymentAmount: number;

    ACH_NextDebitDate_String?: string;
}

export const initialACHStatusColumns: any[] = [
    { IsNumber: false, Checked: true, HasCustomValue: false, Position: 2, ClassName: "text-center", Align: "center", Filter: 'text', Width: 120, Title: 'Loan Number',     ColumnName: 'LoanAccount' },
    { IsNumber: false, Checked: true, HasCustomValue: false, Position: 3, ClassName: "text-center", Align: "center", Filter: 'text', Width: 100, Title: 'ACH Status',      ColumnName: 'ACH_Status' },
    { IsNumber: false, Checked: true, HasCustomValue: false, Position: 4, ClassName: "text-left",   Align: "left",   Filter: 'text', Width: 300, Title: 'Borrower Name',   ColumnName: 'Borrower_Name' },
    { IsNumber: false, Checked: true, HasCustomValue: true,  Position: 5, ClassName: "text-center", Align: "center", Filter: 'text', Width: 120, Title: 'Next Debit Date', ColumnName: 'ACH_NextDebitDate' },
    { IsNumber: false, Checked: true, HasCustomValue: false, Position: 6, ClassName: "text-center", Align: "center", Filter: 'text', Width: 120, Title: 'Custom Payment',  ColumnName: 'ACH_CustomPayment' },
    { IsNumber: true,  Checked: true, HasCustomValue: false, Position: 7, ClassName: "text-right",  Align: "right",  Filter: 'text', Width: 120, Title: 'Payment Amount',  ColumnName: 'ACH_PaymentAmount', Format: "{0:c}", FormatExcel: "$#,##0.00" },
];