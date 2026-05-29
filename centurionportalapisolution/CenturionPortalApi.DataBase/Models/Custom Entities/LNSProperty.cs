using CenturionPortalApi.DataBase.Models.Utilities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CenturionPortalApi.DataBase.Models.Custom_Entities
{
    public class LNSProperty
    {
        public delegate void PropertyModified(string propertyName);

        //[MetadataType(typeof(LNSProperty.MetaData))]
        public static List<int> ResidentialTypesForCallCenter = new List<int>()
        {
            (int)Enums.PropertyTypeEnum.SINGLE_FAMILY_RES,
            (int)Enums.PropertyTypeEnum.TWO_FAMILY_RES,
            (int)Enums.PropertyTypeEnum.FOUR_FAMILY_RES,
            (int)Enums.PropertyTypeEnum.TWO_TO_FOUR_FAMILY,

            //(int)Enums.PropertyTypeEnum.CONDOMINIUM,
            (int)Enums.PropertyTypeEnum.RESIDENTIAL_CONDO,
            (int)Enums.PropertyTypeEnum.RESIDENTIAL_INCOME_1_4,

            //(int)Enums.PropertyTypeEnum.APARTMENT_COMPLEX,
            (int)Enums.PropertyTypeEnum.PUD,
            (int)Enums.PropertyTypeEnum.FARM,
            (int)Enums.PropertyTypeEnum.RANCH,

            (int)Enums.PropertyTypeEnum.MIX_USE,

            (int)Enums.PropertyTypeEnum.MOBILE_HOME,
            (int)Enums.PropertyTypeEnum.OTHER
        };

        public static List<int> ResidentialTypesPyramiding = new List<int>()
        {
            (int)Enums.PropertyTypeEnum.SINGLE_FAMILY_RES,
            (int)Enums.PropertyTypeEnum.TWO_FAMILY_RES,
            (int)Enums.PropertyTypeEnum.FOUR_FAMILY_RES,
            (int)Enums.PropertyTypeEnum.TWO_TO_FOUR_FAMILY,

            //(int)Model.Enums.PropertyTypeEnum.CONDOMINIUM,
            (int)Enums.PropertyTypeEnum.RESIDENTIAL_CONDO,
            (int)Enums.PropertyTypeEnum.RESIDENTIAL_INCOME_1_4,

            //(int)Model.Enums.PropertyTypeEnum.APARTMENT_COMPLEX,
            (int)Enums.PropertyTypeEnum.PUD,
            //(int)Model.Enums.PropertyTypeEnum.FARM,
            //(int)Model.Enums.PropertyTypeEnum.RANCH,

            //(int)Model.Enums.PropertyTypeEnum.MIX_USE,

            (int)Enums.PropertyTypeEnum.MOBILE_HOME,
            (int)Enums.PropertyTypeEnum.OTHER
        };


        private sealed class MetaData
        {
            [EnumDataType(typeof(Enums.PropertyTypeEnum))]
            public int Type { get; set; }
        }

        public event PropertyModified AfterPropertyModified;

        //public override string this[string columnName]
        //{
        //    get
        //    {
        //        PropertyInfo property = this.GetType().GetProperty(columnName);
        //        var obj = property.GetValue(this, null);
        //        if (obj != null && obj.GetType() == typeof(string))
        //        {
        //            if (Validator.GetMaxLength(this, columnName) < ((string)obj).Length)
        //            {
        //                AddError(columnName);
        //                return "This field is too long.";
        //            }
        //            else
        //            {
        //                RemoveError(columnName);
        //            }
        //        }

        //        if (columnName.CompareTo("Street") == 0)
        //        {
        //            if (string.IsNullOrEmpty(Street))
        //            {
        //                AddError(columnName);
        //                return "Street is required";
        //            }
        //            else
        //            {
        //                RemoveError(columnName);
        //            }
        //        }

        //        if (columnName.CompareTo("ZipCode") == 0)
        //        {
        //            if (string.IsNullOrEmpty(ZipCode))
        //            {
        //                AddError(columnName);
        //                return "ZipCode is required";
        //            }
        //            else
        //            {
        //                RemoveError(columnName);
        //            }
        //        }

        //        if (columnName.CompareTo("City") == 0)
        //        {
        //            if (string.IsNullOrEmpty(City))
        //            {
        //                AddError(columnName);
        //                return "City is required";
        //            }
        //            else
        //            {
        //                RemoveError(columnName);
        //            }
        //        }

        //        if (columnName.CompareTo("County") == 0)
        //        {
        //            if (string.IsNullOrEmpty(County))
        //            {
        //                AddError(columnName);
        //                return "County is required";
        //            }
        //            else
        //            {
        //                RemoveError(columnName);
        //            }
        //        }

        //        if (columnName.CompareTo("State") == 0)
        //        {
        //            if (string.IsNullOrEmpty(State))
        //            {
        //                AddError(columnName);
        //                return "State is required";
        //            }
        //            else
        //            {
        //                RemoveError(columnName);
        //            }
        //        }

        //        //if (columnName.CompareTo("Street") == 0) 
        //        //{
        //        //    if (string.IsNullOrEmpty(Street))
        //        //    {
        //        //        AddError(columnName);
        //        //        return "Street is required";
        //        //    }
        //        //    else 
        //        //    {
        //        //        RemoveError(columnName);
        //        //    }
        //        //}
        //        //if (columnName.CompareTo("PartnerUid") == 0 && (this.TransactionType == 4 || this.TransactionType == 5))
        //        //{
        //        //    if (this.PartnerUid == null)
        //        //    {
        //        //        AddError(columnName);
        //        //        return "Please Choose a Partner.";
        //        //    }
        //        //    else
        //        //    {
        //        //        RemoveError(columnName);
        //        //    }
        //        //}


        //        return null;
        //    }
        //}

        //public LNSProperty()
        //{
        //    this.Street = string.Empty;
        //    this.ChangeTracker.ChangeTrackingEnabled = true;
        //    this._propertyChanged += new System.ComponentModel.PropertyChangedEventHandler(LNSProperty__propertyChanged);
        //}

        void LNSProperty__propertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs e)
        {
            if (this.AfterPropertyModified != null)
            {
                this.AfterPropertyModified(e.PropertyName);
            }
        }
    }
}
