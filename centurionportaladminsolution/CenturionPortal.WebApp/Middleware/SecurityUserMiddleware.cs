using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortal.WebApp.Middleware
{
    //Middleware propio de LIRS que nos permitirá validar y restringir los accesos
    public class SecurityUserMiddleware
    {
        private readonly RequestDelegate _next;

        public SecurityUserMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            //Aqui debe ir código de lo que se necesite realizar (validaciones), antes que la petición http llegue al controller

            await _next(httpContext);

            List<int> statusCodes = new List<int> { 401, 403, 404, 405 };

            //Aqui debe ir código de lo que se necesite realizar, antes que la respuesta llegue al cliente
            if (httpContext.Response != null && statusCodes.Contains(httpContext.Response.StatusCode))
            {
                var response = new
                {
                    statusCode = httpContext.Response.StatusCode,
                    isSuccess = false
                };

                await httpContext.Response.WriteAsync(JsonConvert.SerializeObject(response)).ConfigureAwait(false);
            }
        }
    }
}
