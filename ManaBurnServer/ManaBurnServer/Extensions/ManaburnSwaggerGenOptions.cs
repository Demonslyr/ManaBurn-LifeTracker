using ManaBurnServer.Swagger.DocumentFilters;
using ManaBurnServer.Swagger.OperationFilters;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.IO;
using System.Reflection;

namespace ManaBurnServer.Extensions
{
    public sealed class ManaburnSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        private readonly IWebHostEnvironment _environment;
        public ManaburnSwaggerGenOptions(IConfiguration configuraiton, IWebHostEnvironment environment)
        {
            _environment = environment;
        }
        public void Configure(SwaggerGenOptions options)
        {
            // Set the comments path for the Swagger JSON and UI.
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            options.IncludeXmlComments(xmlPath);

            options.SwaggerDoc("v1", new OpenApiInfo { Title = $"{_environment.EnvironmentName}-{_environment.ApplicationName}, Location: ${Environment.MachineName}", Version = "v1", Description = $"Ingest API for DrinkPoint data sources.", Contact = new OpenApiContact { Name = "Atriarch Systems" } });
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter JWT with Bearer into field",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
            });
            options.DocumentFilter<HealthCheckFilter>();
            options.OperationFilter<SecurityRequirementsOperationFilter>();

        }
    }
}
