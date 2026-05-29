using Centurion.Utilities;
using System.ComponentModel;

namespace CenturionPortalApi.DataBase.Models.Utilities
{
    public class Enums : CENTEnums
    {
        #region enums

        public enum TransTypeEnum
        {
            [Description("Regular")]
            REGULAR = 0,
            [Description("Escrow")]
            IMPOUND = 1,
            [Description("Suspense")]
            RESERVE = 2,
            [Description("Restricted Funds")]
            RESTRICTED_FUNDS = 3,

            [Description("Security Deposit")]
            SECURITY_DEPOSIT = 4,
            [Description("Advance Rent Reserve")]
            ADVANCED_RENT = 5,
            [Description("Property Management Fees")]
            PROPERTY_MANAGEMENT = 6,
            [Description("Expense Reserve")]
            EXPENSE_RESERVE = 7,

            [Description("Tax Reserve")]
            TAX_RESERVE = 8,
            [Description("Insurance Reserve")]
            INSURANCE_RESERVE = 9,


            [Description("Capital Expenditures")]
            CAPITAL = 10,
            [Description("Repair and Maintenance")]
            REPAIR = 11,
            [Description("Miscellaneous")]
            MISCELLANEOUS = 12,

            [Description("Tax Advance Reserve")]
            TAX_ADVANCE_RESERVE = 13,
            [Description("Insurance Advance Reserve")]
            INSURANCE_ADVANCE_RESERVE = 14,
        };

        public enum AttachmentViewEnum : int
        {
            PENDING_DISBURSEMENT_TO_LENDER,
            BORROWER_NOTICES,
            NOTIFICATION_OF_DEPOSIT,
            ALL_ATTACHMENT,
            LENDER_STATEMENTS,
            TAX_FORMS,
        }

        public enum PaymentTypeEnum : int
        {
            VCHECK,
            PAYPAL,
            CREDIT_CARD
        }

        #endregion
    }
}
