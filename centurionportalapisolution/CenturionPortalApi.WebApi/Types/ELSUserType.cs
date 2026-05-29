using GraphQL.Types;
using CenturionPortalApi.DataBase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types
{
    public class ELSUserType : ObjectGraphType<ELSUser>
    {
        public ELSUserType()
        {
            Name = nameof(ELSUserType);


            Field(x => x.Uid, nullable: true);
            
            Field(x => x.UserType_ToSring, nullable: true);
            Field(x => x.Email, nullable: true);
            Field(x => x.Username, nullable: true);
            Field(x => x.FirstName, nullable: true);
            Field(x => x.MiddleName, nullable: true);
            Field(x => x.LastName, nullable: true);
            Field(x => x.FullName, nullable: true);
            Field(x => x.Title, nullable: true);
            Field(x => x.Address1, nullable: true);
            Field(x => x.Address2, nullable: true);
            Field(x => x.HomePhone, nullable: true);
            Field(x => x.MobilePhone, nullable: true);
            Field(x => x.Ext, nullable: true);
            Field(x => x.Photo, nullable: true);
            Field(x => x.LastLogin, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.LastLogout, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.LoggedIn, nullable: true);
            Field(x => x.LoggedIP, nullable: true);
            Field(x => x.IsActive, nullable: true);
            Field(x => x.EnableReason, nullable: true);
            Field(x => x.EnableBy, nullable: true);
            Field(x => x.Password, nullable: true);
            Field(x => x.PassExpiration, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.Permissions, nullable: true);
            Field(x => x.UserType, nullable: true);
            Field(x => x.LogErrors, nullable: true);
            Field(x => x.Question1, nullable: true);
            Field(x => x.Question1String, nullable: true);
            Field(x => x.Answer1, nullable: true);
            Field(x => x.Question2, nullable: true);
            Field(x => x.Question2String, nullable: true);
            Field(x => x.Answer2, nullable: true);
            Field(x => x.Question3, nullable: true);
            Field(x => x.Question3String, nullable: true);
            Field(x => x.Answer3, nullable: true);
            Field(x => x.ConfirmCode, nullable: true);
            Field(x => x.ConfirmDate, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.ResetPassDate, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.ResetPassCode, nullable: true);
            Field(x => x.AttemptLoginCount, nullable: true);
            Field(x => x.LastBlockedDate, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.LastBlockedIP, nullable: true);
            Field(x => x.LastAliveCheck, type: (typeof(DateTimeGraphType)), nullable: true);
            //Field(x => x.DepartmentUid, nullable: true);
            //Field(x => x.DepartmentLogo, nullable: true);
            //Field(x => x.DepartmentBanner, nullable: true);
            //Field(x => x.DepartmentAdminUserUid, nullable: true);
            //Field(x => x.DepartmentBrokerUid, nullable: true);
            //Field(x => x.IsOwner, nullable: true);
            Field(x => x.AppTimeStamp, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.AppCreatedBy, nullable: true);
            Field(x => x.AppCreationDate, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.AppLastUpdatedBy, nullable: true);
            //[NotMapped]
            //public byte[] SysTimeStamp , nullable: true );
            Field(x => x.IncludeOriginalVendor, nullable: true);
            Field(x => x.ShowFundingInformation, nullable: true);
            Field(x => x.ShowLenderStatement, nullable: true);

            // [NotMapped]
            //Field(x => x. RePassword , nullable: true );
            // [NotMapped]
            //Field(x => x. Token , nullable: true );


        }
    }
}
