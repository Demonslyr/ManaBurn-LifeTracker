using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ManaBurnServer.Hubs
{
    public class GameHub : Hub
    {
        public async Task SendMessage(string user,string session, string action)
        {
            // Send message to clients in the session, do some checks to make sure the client belongs to the session they passed before sending
            await Clients.Group(session).SendAsync("ReceiveMessage", user, action);
        }
    }
}
