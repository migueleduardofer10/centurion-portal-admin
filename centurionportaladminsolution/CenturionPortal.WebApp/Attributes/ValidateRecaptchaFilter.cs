using Microsoft.AspNetCore.Mvc.Filters;
using reCAPTCHA.AspNetCore;
using System.Threading.Tasks;

namespace CenturionPortal.WebApp.Attributes
{
    public class ValidateRecaptchaFilter : IAsyncActionFilter
    {
        private readonly IRecaptchaService _recaptcha;
        private readonly double _minimumScore;
        private readonly string _errorMessage;

        public ValidateRecaptchaFilter(IRecaptchaService recaptcha, double minimumScore, string errorMessage)
        {
            _recaptcha = recaptcha;
            _minimumScore = minimumScore;
            _errorMessage = errorMessage;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!context.HttpContext.Request.Headers.ContainsKey("G-Recaptcha-Response"))
                context.ModelState.AddModelError("Recaptcha", "Google recaptcha response not found.");
            else
            {
                var recaptcha = await _recaptcha.Validate(context.HttpContext.Request.Headers["G-Recaptcha-Response"]);
                if (!recaptcha.success || recaptcha.score != 0 && recaptcha.score < _minimumScore)
                    context.ModelState.AddModelError("Recaptcha", _errorMessage);
            }

            await next();
        }
    }
}
