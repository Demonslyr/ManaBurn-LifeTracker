using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace ManaBurnServer.Extensions
{
    public sealed class ManaburnSwaggerUIOptions : IConfigureOptions<SwaggerUIOptions>
    {
        private readonly IWebHostEnvironment _environment;

        public ManaburnSwaggerUIOptions(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _environment = environment;
        }
        public void Configure(SwaggerUIOptions options)
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", $"{_environment.ApplicationName} V1");
        }
    }
}
