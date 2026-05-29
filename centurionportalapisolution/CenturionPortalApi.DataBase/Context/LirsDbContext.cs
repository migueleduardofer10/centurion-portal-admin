using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace CenturionPortalApi.DataBase.Context
{
    public partial class LirsDbContext : DbContext
    {
        public LirsDbContext()
        {
        }

        public LirsDbContext(DbContextOptions<LirsDbContext> options)
            : base(options)
        {
        }
        public virtual DbSet<RPTCustomFullLoanPortfolio> RPTCustomFullLoanPortfolio { get; set; }

        public virtual DbSet<VCW_VendorPortfolioFullData> VCW_VendorPortfolioFullData { get; set; }
        public virtual DbSet<v_IRSServiceMap> v_IRSServiceMap { get; set; }
        public virtual DbSet<VCW_LenderDisbursement> VCW_LenderDisbursement { get; set; }
        public virtual DbSet<OtherStatistics> OtherStatistics { get; set; }

        public virtual DbSet<SummaryPortfolioStatistics> SummaryPortfolioStatistics { get; set; }
        public virtual DbSet<vw_VendorHistory> vw_VendorHistory { get; set; }
        public virtual DbSet<vcw_VendorPortfolioResume> vcw_VendorPortfolioResume { get; set; }
        public virtual DbSet<v_LNSSecLending> v_LNSSecLending { get; set; }
        public virtual DbSet<vcw_GetPartialVsFullSecondary> vcw_GetPartialVsFullSecondary { get; set; }
        public virtual DbSet<v_LNSBorrower> v_LNSBorrower { get; set; }
        public virtual DbSet<v_LNSProperty> v_LNSProperty { get; set; }
        public virtual DbSet<vcw_VendorPortfolioSecondary> vcw_VendorPortfolioSecondary { get; set; }
        public virtual DbSet<ELSColumn> ELSColumn { get; set; }
        public virtual DbSet<ELSGrid> ELSGrid { get; set; }
        public virtual DbSet<ELSServiceMap> ELSServiceMap { get; set; }
        public virtual DbSet<ELSUser> ELSUser { get; set; }
        public virtual DbSet<LoanStateStatistic> LoanStateStatistic { get; set; }
        public virtual DbSet<LoanStatusStatistic> LoanStatusStatistic { get; set; }
        public virtual DbSet<VendorHistoryStatistics> VendorHistoryStatistics { get; set; }
        public virtual DbSet<vw_ALLDepartment> vw_ALLDepartment { get; set; }
        public virtual DbSet<vw_INFState> vw_INFState { get; set; }
        public virtual DbSet<vwa_ELSUser_Grid> vwa_ELSUser_Grid { get; set; }
        public virtual DbSet<vwl_ALLAttachment> vwl_ALLAttachment { get; set; }
        public virtual DbSet<vwl_ChargesDetails> vwl_ChargesDetails { get; set; }
        public virtual DbSet<vwl_CreditCardInvoices> vwl_CreditCardInvoices { get; set; }
        public virtual DbSet<vwl_Funding> vwl_Funding { get; set; }
        public virtual DbSet<vwl_GraphLoanResumen> vwl_GraphLoanResumen { get; set; }
        public virtual DbSet<vwl_LBMInvoice> vwl_LBMInvoice { get; set; }
        public virtual DbSet<vwl_LBMInvoiceDetail> vwl_LBMInvoiceDetail { get; set; }
        public virtual DbSet<vwl_LBMInvoiceDetails> vwl_LBMInvoiceDetails { get; set; }
        public virtual DbSet<vwl_LBMPaymentLog> vwl_LBMPaymentLog { get; set; }
        public virtual DbSet<vwl_LenderDisbursement> vwl_LenderDisbursements { get; set; }
        public virtual DbSet<vwl_LNSLending> vwl_LNSLending { get; set; }
        public virtual DbSet<vwl_LNSLoan> vwl_LNSLoan { get; set; }
        public virtual DbSet<vwl_LNSOfficers> vwl_LNSOfficers { get; set; }
        public virtual DbSet<vwl_LNSPayment> vwl_LNSPayment { get; set; }
        public virtual DbSet<vwl_LNSPaymentSplit> vwl_LNSPaymentSplit { get; set; }
        public virtual DbSet<vwl_LNSVendor> vwl_LNSVendor { get; set; }

        public virtual DbSet<vwl_LoanCharges> vwl_LoanCharges { get; set; }
        public virtual DbSet<vwl_LoanHistory> vwl_LoanHistory { get; set; }
        public virtual DbSet<vwl_LoanNotes> vwl_LoanNotes { get; set; }
        public virtual DbSet<vwl_LoanPaymentOnTime> vwl_LoanPaymentOnTime { get; set; }
        public virtual DbSet<vwl_PaidInvoices> vwl_PaidInvoices { get; set; }
        public virtual DbSet<vwl_VendorPortfolio> vwl_VendorPortfolio { get; set; }
        public virtual DbSet<vwl_VendorPortfolioResume> vwl_VendorPortfolioResume { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationBuilder configurationBuilder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json");

                IConfigurationRoot configurationRoot = configurationBuilder.Build();

                optionsBuilder.UseSqlServer(configurationRoot.GetConnectionString("LirsDb"),
                    sqlServerOptions => sqlServerOptions.CommandTimeout(Convert.ToInt32(configurationRoot.GetSection("TimeOutDB").Value)));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            


            modelBuilder.Entity<RPTCustomFullLoanPortfolio>(x => {
                x.HasNoKey();
            });

            modelBuilder.Entity<VCW_VendorPortfolioFullData>(x => {
                x.HasNoKey();
                x.ToView("VCW_VendorPortfolioFullData");
            });

            modelBuilder.Entity<v_IRSServiceMap>(x => {
                x.HasNoKey();
                x.ToView("v_IRSServiceMap");
            });

            modelBuilder.Entity<VCW_LenderDisbursement>(x => {
                x.HasNoKey();
                x.ToView("VCW_LenderDisbursement");
            });

            modelBuilder.Entity<OtherStatistics>(x => {
                x.HasNoKey();
            });

            modelBuilder.Entity<SummaryPortfolioStatistics>(x =>
            {
                x.HasNoKey();
            });

            modelBuilder.Entity<vw_VendorHistory>(x =>
                  {
                      x.HasNoKey();
                      x.ToView("vw_VendorHistory");
                  });
            modelBuilder.Entity<vcw_VendorPortfolioResume>(x =>
            {
                x.HasNoKey();
                x.ToView("vcw_VendorPortfolioResume");
            });

            modelBuilder.Entity<v_LNSSecLending>(x =>
            {
                x.HasNoKey();
                x.ToView("v_LNSSecLending");
            });

            modelBuilder.Entity<vcw_GetPartialVsFullSecondary>(x =>
            {
                x.HasNoKey();
                x.ToView("vcw_GetPartialVsFullSecondary");
            });
            modelBuilder.Entity<v_LNSProperty>(x =>
            {
                x.HasNoKey();
                x.ToView("v_LNSProperty");
            });
            modelBuilder.Entity<v_LNSBorrower>(x =>
            {
                x.HasNoKey();
                x.ToView("v_LNSBorrower");
            });
            modelBuilder.Entity<vcw_VendorPortfolioSecondary>(x =>
            {
                x.HasNoKey();
                x.ToView("vcw_VendorPortfolioSecondary");
            });

            modelBuilder.Entity<vw_ALLDepartment>(x =>
            {
                x.HasNoKey();
                x.ToView("vw_ALLDepartment");
            });

            modelBuilder.Entity<vw_INFState>(x =>
            {
                x.HasNoKey();
                x.ToView("vw_INFState");
            });

            modelBuilder.Entity<vwl_LoanNotes>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("vwl_LoanNotes");

            });

            modelBuilder.Entity<vwl_Funding>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("vwl_Funding");

            });
            modelBuilder.Entity<ELSColumn>(entity =>
            {
                entity.HasKey(e => e.Uid);
            });

            modelBuilder.Entity<ELSGrid>(entity =>
            {
                entity.HasKey(e => e.Uid);
            });

            modelBuilder.Entity<ELSServiceMap>(entity =>
            {
                entity.HasKey(e => new { e.UserUid, e.ParentUid });
            });

            modelBuilder.Entity<ELSUser>(entity =>
            {
                entity.HasKey(e => e.Uid);
            });

            modelBuilder.Entity<LoanStateStatistic>(entity =>
            {
                entity.HasNoKey();
            });

            modelBuilder.Entity<LoanStatusStatistic>(entity =>
            {
                entity.HasNoKey();
            });

            modelBuilder.Entity<VendorHistoryStatistics>(entity =>
            {
                entity.HasNoKey();
            });

            modelBuilder.Entity<vwa_ELSUser_Grid>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwa_ELSUSer_Grid");
            });
            modelBuilder.Entity<vwl_ALLAttachment>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_ALLAttachment");
            });

            modelBuilder.Entity<vwl_ChargesDetails>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_ChargesDetails");
            });

            modelBuilder.Entity<vwl_CreditCardInvoices>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_CreditCardInvoices");
            });

            modelBuilder.Entity<vwl_GraphLoanResumen>(entity =>
            {
                entity.HasKey(e => e.StateUid);
                entity.ToView("vwl_GraphLoanResumen");
            });

            modelBuilder.Entity<vwl_LBMInvoice>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LBMInvoice");
            });

            modelBuilder.Entity<vwl_LBMInvoiceDetail>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LBMInvoiceDetail");
            });

            modelBuilder.Entity<vwl_LBMInvoiceDetails>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LBMInvoiceDetails");
            });

            modelBuilder.Entity<vwl_LBMPaymentLog>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LBMPaymentLog");
            });

            modelBuilder.Entity<vwl_LenderDisbursement>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LenderDisbursement");
            });

            modelBuilder.Entity<vwl_LNSLending>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LNSLending");
            });

            modelBuilder.Entity<vwl_LNSLoan>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LNSLoan");
            });

            modelBuilder.Entity<vwl_LNSOfficers>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LNSOfficers");
            });

            modelBuilder.Entity<vwl_LNSPayment>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LNSPayment");
            });

            modelBuilder.Entity<vwl_LNSPaymentSplit>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LNSPaymentSplit");
            });

            modelBuilder.Entity<vwl_LNSVendor>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LNSVendor");
            });

            modelBuilder.Entity<vwl_LoanCharges>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_LoanCharges");
            });

            modelBuilder.Entity<vwl_LoanHistory>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("vwl_LoanHistory");
            });

            modelBuilder.Entity<vwl_LoanPaymentOnTime>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("vwl_LoanPaymentOnTime");
            });

            modelBuilder.Entity<vwl_PaidInvoices>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.ToView("vwl_PaidInvoices");
            });

            modelBuilder.Entity<vwl_VendorPortfolio>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("vwl_VendorPortfolio");
            });

            modelBuilder.Entity<vwl_VendorPortfolioResume>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("vwl_VendorPortfolioResume");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
