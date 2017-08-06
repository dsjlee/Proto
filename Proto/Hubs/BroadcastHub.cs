using Microsoft.AspNet.SignalR;
using Proto.Services;
using System.Threading.Tasks;

namespace Proto.Hubs
{
    public class BroadcastHub : Hub
    {
        private readonly BroadcastService _broadcastService;

        public BroadcastHub() : this(BroadcastService.Instance) { }

        public BroadcastHub(BroadcastService broadcastService) => _broadcastService = broadcastService;
        
        public async Task Trigger()
        {
            if (_broadcastService.counter == BroadcastService.counterLimit)
            {
                _broadcastService.counter = 0;
                await _broadcastService.NotifyCients();
            }            
        }

        public void Notify(string message) => Clients.All.notify(message);
        
    }
}