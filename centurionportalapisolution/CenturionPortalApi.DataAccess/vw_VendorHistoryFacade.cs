using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
    public static class vw_VendorHistoryFacade
    {

        public static IQueryable<vw_VendorHistory> Get(string userUid, string account,bool onlyPending)
        {
            try
            {


                var context = new LirsDbContext();

                //value Model.vw_VendorHistory(

                string queryString = @"
                Select  
                a.CheckDate, 
                a.CheckNo, 
                a.CheckMemo,
                a.PaymentCode, 
                a.ToInterest, 
                a.ToPrincipal, 
                a.ToServiceFee, 
                a.ToLateCharge, 
                a.ToChargesPrincipal, 
                a.ToChargesInterest, 
                a.ToPrepay, 
                a.ToOtherTaxable, 
                a.ToTrust, 
                a.ToOtherPayments, 
                a.ToOtherTaxFree, 
                a.ToEscrowInt, 
                a.ToUnpaidFees,
                a.CheckAmount, 
                a.PaymentDate, 
                a.PaymentDue, 
                a.AppCreatedBy, 
                a.AppCreationDate,                
                a.AppTimeStamp, 
                a.Uid, 
                a.VendorUid, 
                a.Balance, 
                a.ToGSTax,
                l.Account, 
                l.BorrowerName, 
                l.BorrowerFullName,             
                t.AccountName,
                l.BrokerRepresentative,
                a.Notes
                from 
                (
                    SELECT
                    b.CheckDate,
                    CASE WHEN v.IsFrozenChecks = 1 AND (b.CheckNo = 'Print' OR b.CheckNo = 'Immediate' OR b.CheckNo = 'Hold') THEN 'Frozen' ELSE b.CheckNo END AS CheckNo,
                    b.CheckMemo,
                    b.PaymentCode, 
                    b.ToInterest, 
                    b.ToPrincipal, 
                    b.ToServiceFee, 
                    b.ToLateCharge, 
                    b.ToChargesPrincipal, 
                    b.ToChargesInterest, 
                    b.ToPrepay, 
                    b.ToOtherTaxable, 
                    b.ToTrust, 
                    b.ToOtherPayments, 
                    b.ToOtherTaxFree, 
                    b.ToEscrowInt, 
                    b.ToUnpaidFees,
                    (
	                    b.ToInterest + 
	                    b.ToPrincipal + 
	                    b.ToServiceFee + 
	                    b.ToLateCharge + 
	                    b.ToChargesPrincipal + 
	                    b.ToChargesInterest + 
	                    b.ToPrepay + 
	                    b.ToOtherTaxable + 
	                    b.ToTrust + 
	                    b.ToOtherPayments + 
	                    b.ToOtherTaxFree + 
	                    b.ToEscrowInt +
                        b.ToUnpaidFees
                    ) AS CheckAmount, 
                    b.PaymentDate, 
                    b.PaymentDue, 
                    b.AppCreatedBy,
                    b.AppCreationDate,
                    b.AppTimeStamp, 
                    b.Uid, 
                    b.VendorUid, 
                    b.Balance, 
                    b.ToGSTax,
                    b.TrustAccountUid,
                    b.LoanUid,
                    b.Notes
                    FROM Centurion..LNSLenderActivity as b 
                    INNER JOIN Centurion..LNSVendor AS v ON b.VendorUid = v.Uid 
                    where   
	                exists  
					(
						select v.uid from vw_LNSVendor v where
						exists 
						(
							select m.Account from ELSServiceMap m
							where m.UserUid={0}" +
                           (string.IsNullOrEmpty(account) == false && account.Trim() != "0" ? " and m.account={1} " : "") +
                          @" and v.Account=m.Account
						) and
						b.VendorUid = v.Uid
					)
                )  a 
                LEFT OUTER JOIN Centurion..ALLTrustAccount AS t ON t.Uid = a.TrustAccountUid 
                LEFT OUTER JOIN Centurion..LNSLoan AS l ON a.LoanUid = l.Uid "+
                (onlyPending? " where a.CheckNo in ('Print', 'Immediate' , 'Hold') ":"");

                var query =   context.vw_VendorHistory.FromSqlRaw(queryString, userUid, account);
                    
                

                return query;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
