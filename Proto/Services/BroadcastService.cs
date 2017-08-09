using Microsoft.AspNet.SignalR;
using Proto.Hubs;
using System;
using System.Threading.Tasks;

namespace Proto.Services
{
    public class BroadcastService
    {
        // create BroadcastService as singleton

        // initializes the static _instance field that backs public Instance property with an instance of class
        // use Lazy initialization to defer its creation in order to ensure instance creation is threadsafe
        // and hub is created before BroadcastService
        private readonly static Lazy<BroadcastService> _instance = new Lazy<BroadcastService>(() => new BroadcastService());

        // getting hub context is expensive operation
        // getting it just once ensures that the intended order of messages sent to clients is preserved
        private readonly IHubContext _hubContext;
       
        // constructor is marked private to ensure that only instance of class that can be created is _instance
        private BroadcastService() => _hubContext = GlobalHost.ConnectionManager.GetHubContext<BroadcastHub>();

        public static BroadcastService Instance => _instance.Value;

        public int counter = 0;
        public static readonly int counterLimit = 20;

        public async Task NotifyCients()
        {
            if (_hubContext != null && counter == 0)
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