using CenturionPortal.ApiController.Model.Utilities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CenturionPortal.WebApp.Controllers
{
    public class CASController : ControllerBase
    {
        protected OkObjectResult Success(object data = null, string message = "")
        {
            //Response.StatusCode = (int)HttpStatusCode.OK;
            return Ok(new ResponseTransactionBase()
            {
                Message = message, // CustomMessage.SuccessSavedMessage(propertyEnum);
                ObjOptional = data,
                IsSuccess = true,
                TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.SUCCESS
            });
        }

        protected OkObjectResult Validation(string message, List<ResponseObservation> observations = null)
        {
            //Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Ok(new ResponseTransactionBase()
            {
                Message = message,
                IsSuccess = false,
                Observations = observations,
                TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING
            });
        }

        protected OkObjectResult Error(string message)
        {
            return Ok(new ResponseTransactionBase()
            {
                Message = message,
                IsSuccess = false,
                TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.ERROR
            });
        }
    }
}