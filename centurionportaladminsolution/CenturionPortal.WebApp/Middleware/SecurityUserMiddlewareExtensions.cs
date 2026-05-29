using Microsoft.AspNetCore.Builder;

namespace CenturionPortal.WebApp.Middleware
{

    //Método de extensión utilizado para agregar el middleware a la canalización de solicitudes HTTP.
    public static class SecurityUserMiddlewareExtensions
    {
        public static IApplicationBuilder UseSecurityUserMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SecurityUserMiddleware>();
        }
    }
}
