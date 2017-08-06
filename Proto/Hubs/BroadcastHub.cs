using Microsoft.AspNet.SignalR;
using Proto.Services;
using System.Threading.Tasks;

namespace Proto.Hubs
{
    public class BroadcastHub : Hub
    {
        public async Task Trigger()
        {
            if (BroadcastService.counter == BroadcastService.counterLimit)
            {
                BroadcastService.counter = 0;
                await BroadcastService.NotifyCients();
            }            
        }
    }
}