using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ManaBurnServer.Hubs
{
    public class GameHub : Hub
    {
        public async Task SendMessage(string user,string gameSession, string action)
        {
            // Send message to clients in the session, do some checks to make sure the client belongs to the session they passed before sending
            await Clients.OthersInGroup(gameSession).SendAsync("ReceiveMessage", user, $"{user} performed {action}!");
        }
        public async Task AddToGroup(string gameSession)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gameSession);

            await Clients.OthersInGroup(gameSession).SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined the group {gameSession}.");
            await Clients.Caller.SendAsync("ReceiveMessage", $"You have joined the group {gameSession}.");

        }

        public async Task RemoveFromGroup(string gameSession)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameSession);
            await Clients.OthersInGroup(gameSession).SendAsync("ReceiveMessage", $"{Context.ConnectionId} has left the group {gameSession}.");
            await Clients.Caller.SendAsync("ReceiveMessage", $"You have left the group {gameSession}.");
        }
    }
}
