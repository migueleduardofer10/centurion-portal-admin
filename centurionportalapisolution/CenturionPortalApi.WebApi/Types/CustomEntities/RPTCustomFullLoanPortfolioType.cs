using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.CustomEntities
{
    public class RPTCustomFullLoanPortfolioType : ObjectGraphType<RPTCustomFullLoanPortfolio>
    {
        public RPTCustomFullLoanPortfolioType()
        {
            Name = nameof(RPTCustomFullLoanPortfolioType);

            //Field(x => x.Title, type: typeof(StringGraphType), nullable: true);
            //Field(x => x.TotalAmount, type: typeof(DecimalGraphType), nullable: true);
            //Field(x => x.TotalInterest, type: typeof(DecimalGraphType), nullable: true);
            //Field(x => x.Count, type: typeof(IntGraphType), nullable: true);


            Field(x => x.Account, type: typeof(StringGraphType), nullable: true);

            Field(x => x.DepartmentName, type: typeof(StringGraphType), nullable: true);

            Field(x => x.PrevAccount, type: typeof(StringGraphType), nullable: true);

            Field(x => x.OrigLender, type: typeof(StringGraphType), nullable: true);

            Field(x => x.LenderAccount, type: typeof(StringGraphType), nullable: true);

            Field(x => x.LenderName, type: typeof(StringGraphType), nullable: true);

            Field(x => x.LenderOwnerPct, type: typeof(StringGraphType), nullable: true);

            Field(x => x.LenderFundDate, type: typeof(StringGraphType), nullable: true);

            Field(x => x.Name, type: typeof(StringGraphType), nullable: true);

            Field(x => x.BorrowerAddress, type: typeof(StringGraphType), nullable: true);

            Field(x => x.BorrowerCity, type: typeof(StringGraphType), nullable: true);

            Field(x => x.BorrowerState, type: typeof(StringGraphType), nullable: true);

            Field(x => x.BorrowerZip, type: typeof(StringGraphType), nullable: true);

            Field(x => x.HomePhone, type: typeof(StringGraphType), nullable: true);

            Field(x => x.WorkPhone, type: typeof(StringGraphType), nullable: true);

            Field(x => x.MobilePhone, type: typeof(StringGraphType), nullable: true);

            Field(x => x.BorrowerFax, type: typeof(StringGraphType), nullable: true);

            Field(x => x.TotalOriginalBalance, type: typeof(StringGraphType), nullable: true);

            Field(x => x.OriginalBalance, type: typeof(StringGraphType), nullable: true);

            Field(x => x.CurrentBalance, type: typeof(StringGraphType), nullable: true);

            Field(x => x.NoteRate, type: typeof(StringGraphType), nullable: true);

            Field(x => x.SoldRate, type: typeof(StringGraphType), nullable: true);

            Field(x => x.Position, type: typeof(StringGraphType), nullable: true);

            Field(x => x.PaymmentImpound, type: typeof(StringGraphType), nullable: true);

            Field(x => x.PaymmentReserve, type: typeof(StringGraphType), nullable: true);

            Field(x => x.UnpaidCharges, type: typeof(StringGraphType), nullable: true);

            Field(x => x.UnpaidLateCharges, type: typeof(StringGraphType), nullable: true);

            Field(x => x.UnpaidInterest, type: typeof(StringGraphType), nullable: true);

            Field(x => x.SrLoanAmount, type: typeof(StringGraphType), nullable: true);

            Field(x => x.UnearnedDisc, type: typeof(StringGraphType), nullable: true);

            Field(x => x.TotalPayment, type: typeof(StringGraphType), nullable: true);

            Field(x => x.Status, type: typeof(StringGraphType), nullable: true);

            Field(x => x.LateChargeDays, type: typeof(StringGraphType), nullable: true);

            Field(x => x.LateChargeMin, type: typeof(StringGraphType), nullable: true);

            Field(x => x.LateChargePct, type: typeof(StringGraphType), nullable: true);

            Field(x => x.PaidToDate, type: typeof(StringGraphType), nullable: true);

            Field(x => x.BoardingDate, type: typeof(StringGraphType), nullable: true);

            Field(x => x.NextDueDate, type: typeof(StringGraphType), nullable: true);

            Field(x => x.MaturityDate, type: typeof(StringGraphType), nullable: true);

            Field(x => x.PaidOffDate, type: typeof(StringGraphType), nullable: true);

            Field(x => x.PurchaseDate, type: typeof(StringGraphType), nullable: true);

            Field(x => x.OriginationDate, type: typeof(StringGraphType), nullable: true);

            Field(x => x.Address, type: typeof(StringGraphType), nullable: true);

            Field(x => x.City, type: typeof(StringGraphType), nullable: true);

            Field(x => x.State, type: typeof(StringGraphType), nullable: true);

            Field(x => x.Zip, type: typeof(StringGraphType), nullable: true);

            Field(x => x.ApprValue, type: typeof(StringGraphType), nullable: true);

            Field(x => x.ApprSource, type: typeof(StringGraphType), nullable: true);

            Field(x => x.ApprDate, type: typeof(StringGraphType), nullable: true);

            Field(x => x.LTV, type: typeof(StringGraphType), nullable: true);

            Field(x => x.Occupancy, type: typeof(StringGraphType), nullable: true);

            Field(x => x.PropertyType, type: typeof(StringGraphType), nullable: true);

            Field(x => x.ACHStatus, type: typeof(StringGraphType), nullable: true);

            Field(x => x.Tags, type: typeof(StringGraphType), nullable: true);

            Field(x => x.RateType, type: typeof(StringGraphType), nullable: true);

            Field(x => x.PrimaryPurpose, type: typeof(StringGraphType), nullable: true);

            Field(x => x.InvestAssetNumber, type: typeof(StringGraphType), nullable: true);














            Field(x => x.DeferredPrinBal, type: typeof(StringGraphType), nullable: true);

            Field(x => x.DeferredUnpaidInterest, type: typeof(StringGraphType), nullable: true);


            Field(x => x.DeferredUnpaidLateCharges, type: typeof(StringGraphType), nullable: true);


            Field(x => x.DeferredUnpaidLoanCharges, type: typeof(StringGraphType), nullable: true);





        }
    }
}
