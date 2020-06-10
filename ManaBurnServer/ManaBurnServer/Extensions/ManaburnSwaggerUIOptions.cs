using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace ManaBurnServer.Extensions
{
    public sealed class ManaburnSwaggerUIOptions : IConfigureOptions<SwaggerUIOptions>
    {
        public ManaburnSwaggerUIOptions(IConfiguration configuration, IWebHostEnvironment environment)
        {

        }
        public void Configure(SwaggerUIOptions options)
        {

        }
    }
}
