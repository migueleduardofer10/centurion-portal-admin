using Centurion.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using static CenturionPortal.ApiController.Model.Utilities.ResponseTransactionBase;

namespace CenturionPortal.ApiController.Models.Utilities
{
    public class Enums : CENTEnums
    {
        #region enums

        public enum GridEntityTypeEnum
        {
            //de 0 a 499 para blis
            //de 500 a 999 para Lirs
            [Description("Loans Grid")]
            LNS_LOAN = 500,
            [Description("Loan Search Grid")]
            LEN_LOANS_SEARCH = 501,
            [Description("Loan History Grid")]
            VWL_LOAN_HISTORY = 502,
            [Description("Loan History Grid")]
            VWL_CHARGES_DETAILS = 503,
            [Description("Loan Notes Grid")]
            VWL_LOANNOTES = 504,
            [Description("Loan Funding Grid")]
            VWL_FUNDING = 505,
            [Description("Pending Invoices Grid")]
            VWL_CREDITCARDINVOICES = 506,
            [Description("Paid Invoices Grid")]
            VWL_PAIDINVOICES = 507,
            [Description("Vendor Portfolio")]
            VCW_VENDORPORTFOLIOSECONDARY=508,
            [Description("Users Grid")]
            ELS_USER = 1000
        }

        public enum LoanPrimaryPurposeEnum
        {
            [Description("Consumer")]
            CONSUMER = 0,
            [Description("Business")]
            BUSINESS = 1
        }

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

        public enum TypeCreditCardEnum
        {
            [Description("Visa")]
            VISA = 0,
            [Description("Master")]
            MASTER = 1,
            [Description("American Express")]
            AMERICAN_EXPRESS = 2
        }

        public enum StatusEnum
        {
            [Description("Active")]
            ACTIVE = 1,
            [Description("Inactive")]
            INACTIVE = 0
        }

        #endregion

        #region functions

        public static string GetObjectSerializeExportReactEnum(Type enumType, List<AddItemsForEnums> addBefore = null, List<AddItemsForEnums> addAfter = null)
        {
            // Can't use generic type constraints on value types,
            // so have to do check like this
            if (enumType.BaseType != typeof(Enum))
                return "{}";//throw new ArgumentException("T must be of type System.Enum");

            Array enumValArray = Enum.GetValues(enumType);
            List<string> listObj = new List<string>();

            if (addBefore != null && addBefore.Count > 0)
            {
                foreach (var item in addBefore)
                {
                    listObj.Add("\t" + item.Name + " = " + item.Value);
                }
            }

            foreach (Enum val in enumValArray)
            {
                listObj.Add("\t" + val.ToString() + " = " + Convert.ToInt32(val));
            }

            if (addAfter != null && addAfter.Count > 0)
            {
                foreach (var item in addAfter)
                {
                    listObj.Add("\t" + item.Name + " = " + item.Value);
                }
            }

            return "export enum " + enumType.Name + " {\n" + string.Join(",\n", listObj) + "\n}\n";
        }

        public static void RenderToJavascript()
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), @"ClientApp\src\utilities\Enums.ts");

            if (File.Exists(path)) File.Delete(path);

            using (StreamWriter sw = File.CreateText(path))
            {
                sw.WriteLine(GetObjectSerializeExportReactEnum(typeof(AttachmentViewEnum)));
                List<AddItemsForEnums> addBefore = new List<AddItemsForEnums>();
                addBefore.Add(new AddItemsForEnums("ASSIGNED", -1, "Assigned"));
                List<AddItemsForEnums> addAfter = new List<AddItemsForEnums>();
                addAfter.Add(new AddItemsForEnums("DELIQUENCY", 15, "Deliquency"));
                sw.WriteLine(GetObjectSerializeExportReactEnum(typeof(LoanStatusEnum), addBefore, addAfter));
                sw.WriteLine(GetObjectSerializeExportReactEnum(typeof(LoanPrimaryPurposeEnum)));
                sw.WriteLine(GetObjectSerializeExportReactEnum(typeof(GridEntityTypeEnum)));
                sw.WriteLine(GetObjectSerializeExportReactEnum(typeof(PaymentTypeEnum)));
                sw.WriteLine(GetObjectSerializeExportReactEnum(typeof(TypeCreditCardEnum)));
                sw.WriteLine(GetObjectSerializeExportReactEnum(typeof(EnumTypeMessage)));
                sw.WriteLine(GetObjectSerializeExportReactEnum(typeof(UserTypeEnum)));
                sw.WriteLine(GetObjectSerializeExportReactEnum(typeof(StatusEnum)));
                sw.WriteLine("export function EnumToArray(typeEnum: any, replaceGuionForSpace: boolean = true): any[] {");
                sw.WriteLine("\tlet values: any[] = [];");
                sw.WriteLine("\tfor (var key in typeEnum) {");
                sw.WriteLine("\t\tif (typeof typeEnum[key] === 'string')");
                sw.WriteLine("\t\t\tvalues.push({ value: Number(key), label: (replaceGuionForSpace ? GetEnumDescription(typeEnum[key]) : typeEnum[key]) });");
                sw.WriteLine("\t}");
                sw.WriteLine("\treturn values;");
                sw.WriteLine("}\n");
                sw.WriteLine("function GetEnumDescription(label: string): string {");
                sw.WriteLine("\treturn label.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');");
                sw.WriteLine("}");
            }
        }

        #endregion
    }
}


