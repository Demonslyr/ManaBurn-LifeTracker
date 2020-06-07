using ManaBurnServer.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using Serilog.Formatting.Elasticsearch;
using Serilog.Sinks.Elasticsearch;
using StackExchange.Redis;
using System;
using System.Linq;
using System.Net;
using System.Text.Json;
using Elastic.Apm.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.HttpOverrides;

namespace ManaBurnServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("/app/config/appsettings.json", optional: false, reloadOnChange: true)
                //.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables(prefix: "Manaburn_");

            Configuration = builder.Build();

            var appEnvAndName = $"{env.EnvironmentName}-{env.ApplicationName}".ToLower();

            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .MinimumLevel.Information()
                .WriteTo.Console()
                .WriteTo.Elasticsearch(
                    new ElasticsearchSinkOptions(new Uri(Configuration.GetSection("Atriarch_ElasticSearch").Value))
                    {
                        AutoRegisterTemplate = true,
                        RegisterTemplateFailure = RegisterTemplateRecovery.IndexAnyway,
                        DeadLetterIndexName = "deadletter-" + appEnvAndName,
                        EmitEventFailure = EmitEventFailureHandling.ThrowException,
                        MinimumLogEventLevel = LogEventLevel.Information,
                        IndexFormat = appEnvAndName + "-{0:yyy.MM.dd}",
                        OverwriteTemplate = true,
                        TemplateName = appEnvAndName + "-template",
                        AutoRegisterTemplateVersion = AutoRegisterTemplateVersion.ESv6,
                        CustomFormatter = new ExceptionAsObjectJsonFormatter(renderMessage: true),
                        NumberOfReplicas = 0,
                        NumberOfShards = 2
                    })
                .CreateLogger();

            Log.Information($"Starting up {env.EnvironmentName}-{env.ApplicationName}!");
            Environment = env;
        }

        private IWebHostEnvironment Environment { get; }
        private IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            if (Environment.EnvironmentName == "Local")
            {
                services.AddSignalR();
            }
            else
            {
                Log.Information(Configuration.GetSection("Atriarch_Redis_Host").Value);
                services.AddSignalR().AddStackExchangeRedis(o =>
                {

                    o.ConnectionFactory = async writer =>
                    {
                        var config = new ConfigurationOptions
                        {
                            AbortOnConnectFail = false,
                            ChannelPrefix = "ManaBurnSession",
                            Password = Configuration.GetSection("Atriarch_Redis_Pass").Value,
                            Ssl = true,
                            ClientName = $"{Environment.EnvironmentName}-{Environment.ApplicationName}",
                            ConnectRetry = 5
                        };
                        config.EndPoints.Add(
                            Configuration.GetSection("Atriarch_Redis_Host").Value, 
                            Configuration.GetSection("Atriarch_Redis_Port").Get<int>()
                            );
                        var connection = await ConnectionMultiplexer.ConnectAsync(config, writer);
                        connection.ConnectionFailed += (_, e) =>
                        {
                            Log.Error(e.Exception,"Connection to Redis failed.");
                        };

                        if (!connection.IsConnected)
                        {
                            Log.Information("Did not connect to Redis.");
                        }

                        return connection;
                    };
                });
            }

            services.AddHealthChecks();
            services.AddAuthentication("Bearer")
                .AddIdentityServerAuthentication("Manaburn", options =>
                {
                    options.Authority = Configuration.GetSection("Atriarch_AuthUrl").Value;
                    options.ApiName = Configuration.GetSection("Atriarch_Scope").Value;
                    options.ApiSecret = Configuration.GetSection("Atriarch_ScopeSecret").Value;
                    options.EnableCaching = true;
                    options.CacheDuration = TimeSpan.FromMinutes(10);
                });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ManaburnPolicy", policy =>
                {
                    policy.AuthenticationSchemes.Add("Manaburn");
                    policy.RequireAuthenticatedUser();
                    policy.RequireScope(Configuration.GetSection("Atriarch_Scope").Value);
                });
            });
            services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
            {
                builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowAnyOrigin();
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            app.UseElasticApm(Configuration);
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardLimit = 2,
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            if (Environment.IsDevelopment() || Environment.EnvironmentName == "Local")
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseRouting();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<GameHub>("/ManaBurn");
                endpoints.MapHealthChecks("/health");
                endpoints.MapHealthChecks("/health/dependency", new HealthCheckOptions
                {
                    Predicate = (check) => check.Tags.Contains("dependency"),
                    ResponseWriter = async (context, report) =>
                    {
                        context.Response.ContentType = "application/json";

                        var result = JsonSerializer.Serialize(new
                            {
                                status = report.Status.ToString(),
                                health = report.Entries.Select(e => new { key = e.Key, value = e.Value.Status.ToString() })
                            },
                            new JsonSerializerOptions { WriteIndented = true });
                        await context.Response.WriteAsync(result);
                    }
                });
                endpoints.MapHealthChecks("/health/live", new HealthCheckOptions
                {
                    Predicate = (_) => false
                });
            });
        }
    }
}
