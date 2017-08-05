using Microsoft.AspNet.SignalR;
using Proto.Hubs;
using System.Threading.Tasks;

namespace Proto.Services
{
    public class BroadcastService
    {
        public async Task NotifyCients(string message)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<BroadcastHub>();
            int interval = 0;
            if (hubContext != null)
            {                
                while(true)
                {                    
                    await Task.Delay(1000);
                    interval++;
                    hubContext.Clients.All.onBroadcast($"{message} {interval}");
                    if (interval == 60) break;
                }                
            }
        }
    }
}