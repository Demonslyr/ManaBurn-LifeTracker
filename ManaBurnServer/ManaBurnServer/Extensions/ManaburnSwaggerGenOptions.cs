using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace ManaBurnServer.Extensions
{
    public sealed class ManaburnSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        public ManaburnSwaggerGenOptions(IConfiguration configuraiton, IWebHostEnvironment environment)
        {

        }
        public void Configure(Swashbuckle.AspNetCore.SwaggerGen.SwaggerGenOptions options)
        {
            
        }
    }
}
