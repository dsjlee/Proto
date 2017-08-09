using Microsoft.AspNet.SignalR;
using Proto.Services;
using System.Threading.Tasks;

namespace Proto.Hubs
{
    public class BroadcastHub : Hub
    {
        private readonly BroadcastService _broadcastService;

        // hub is transitory (created every time it is needed)
        public BroadcastHub() : this(BroadcastService.Instance) { }

        // inject BroadcastService singleton
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