using Microsoft.AspNet.SignalR;
using Proto.Hubs;
using System.Threading.Tasks;

namespace Proto.Services
{
    public class BroadcastService
    {
        public static int counter = 0;

        public static async Task NotifyCients()
        {
            if (counter == 0)
            {
                var hubContext = GlobalHost.ConnectionManager.GetHubContext<BroadcastHub>();
                if (hubContext != null)
                {
                    while (true)
                    {
                        await Task.Delay(1000);
                        counter++;
                        hubContext.Clients.All.notify($"This is test message. {counter}");
                        if (counter == 60) break;
                    }
                }
            }
        }
    }
}