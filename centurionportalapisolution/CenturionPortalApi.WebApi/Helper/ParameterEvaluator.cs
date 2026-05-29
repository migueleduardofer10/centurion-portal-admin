using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Helper
{

    public class ParameterEvaluator
    {
        /// <summary>
        /// se utiliza para evaluar que los parametros opcionales que se ingresan existan
        /// </summary>
        /// <param name="context"></param>
        /// <param name="arrParameters"></param>
        public ParameterEvaluator(Microsoft.AspNetCore.Http.HttpContext context, params string[] arrParameters)
        {

            var arr = new List<OptionalParameterInvalid>();
            var arrKeys = context.Request.Query.Keys;
            foreach (var k in arrKeys)
            {
                if (arrParameters.ToList().Exists(p => string.Equals(k, p, StringComparison.OrdinalIgnoreCase)) == false)
                {
                    arr.Add(new OptionalParameterInvalid(k, "The " + k + " field is invalid."));
                }
            }

            if (arr.Count > 0)
            {
                var ex = new Exception();
                ex.Data.Add(nameof(OptionalParameterInvalid), arr);
                throw ex;
            }

        }

    }

}
