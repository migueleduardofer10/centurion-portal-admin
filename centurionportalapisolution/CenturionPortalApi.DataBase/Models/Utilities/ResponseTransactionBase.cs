using System.Collections.Generic;

namespace CenturionPortalApi.DataBase.Models.Utilities
{
    public class ResponseTransactionBase
    {
        public ResponseTransactionBase(string message = null)
        {
            IsSuccess = false;
            Observations = new List<ResponseObservation>();
            Message = message ?? "There was some error, Contact Customer Service.";
            TypeMessage = (int)EnumTypeMessage.NOTHING;
        }

        public object ObjOptional { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public string Uid { get; set; }
        //0=nothing,1=Information, 2 = Warnning, 3=Error
        public int TypeMessage { get; set; }
        public List<ResponseObservation> Observations { get; set; }

        public enum EnumTypeMessage
        {
            NOTHING = 0,
            INFORMATION = 1,
            WARNING = 2,
            ERROR = 3,
            SUCCESS = 4,
        }

    }

    public class ResponseObservation
    {
        public string Field { get; set; }
        public string Message { get; set; }
        //0=nothing,1=Information, 2 = Warnning, 3=Error
        public int TypeMessage { get; set; }
    }
}
