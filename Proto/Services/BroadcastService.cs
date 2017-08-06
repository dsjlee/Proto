using Microsoft.AspNet.SignalR;
using Proto.Hubs;
using System;
using System.Threading.Tasks;

namespace Proto.Services
{
    public class BroadcastService
    {
        public int counter = 0;
        public static readonly int counterLimit = 20;
        private readonly static Lazy<BroadcastService> _instance = new Lazy<BroadcastService>(() => new BroadcastService());
        private readonly IHubContext _hubContext;

        public BroadcastService() => _hubContext = GlobalHost.ConnectionManager.GetHubContext<BroadcastHub>();       

        public static BroadcastService Instance => _instance.Value;

        public async Task NotifyCients()
        {
            if (counter == 0)
            {
                if (_hubContext != null)
                {
                    while (true)
                    {
                        await Task.Delay(1000);
                        counter++;
                        _hubContext.Clients.All.notify($"This is test message. {counter}");
                        if (counter == counterLimit) break;
                    }
                }
            }
        }
    }
}