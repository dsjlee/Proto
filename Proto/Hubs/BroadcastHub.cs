using Microsoft.AspNet.SignalR;
using Proto.Services;
using System.Threading.Tasks;

namespace Proto.Hubs
{
    public class BroadcastHub : Hub
    {
        private readonly BroadcastService _broadcastService;

        public BroadcastHub() : this(BroadcastService.Instance) { }

        public BroadcastHub(BroadcastService broadcastService)
        {
            _broadcastService = broadcastService;
        }

        public async Task Trigger()
        {
            if (BroadcastService.counter == BroadcastService.counterLimit)
            {
                BroadcastService.counter = 0;
                await _broadcastService.NotifyCients();
            }            
        }

        public void Notify(string message) => Clients.All.notify(message);
        
    }
}