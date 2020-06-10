using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace ManaBurnServer.Extensions
{
    public sealed class JsonSerializationOptions : IConfigureOptions<JsonOptions>
    {
        public void Configure(JsonOptions options)
        {
            options.JsonSerializerOptions.IgnoreNullValues = true;
        }
    }
}
