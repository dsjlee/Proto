using Microsoft.AspNet.SignalR;
using Proto.Services;
using System.Threading.Tasks;

namespace Proto.Hubs
{
    public class BroadcastHub : Hub
    {
        private readonly HubService _hubService;

        // SingalR.Hub is transitory (created every time it is needed)
        public BroadcastHub() : this(HubService.Instance) { }

        // inject HubService singleton
        public BroadcastHub(HubService hubService) => _hubService = hubService;

        public async Task Trigger()
        {
            if (_hubService.counter == HubService.counterLimit)
            {
                _hubService.counter = 0;
                await _hubService.ChartData();
            }
        }

        public void Notify(string message)
        {
            var formattedMessage = Context.Request.Environment
                .TryGetValue("server.RemoteIpAddress", out object remoteIp) ? $"{remoteIp}: {message}" : message; 
            Clients.All.notify(formattedMessage);
        }   
    }
}