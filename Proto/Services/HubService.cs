using Microsoft.AspNet.SignalR;
using Proto.Hubs;
using System;
using System.Threading.Tasks;

namespace Proto.Services
{
    public class HubService
    {
        // create HubService as singleton

        // initializes the static _instance field that backs public Instance property with an instance of class
        // use Lazy initialization to defer its creation in order to ensure instance creation is threadsafe
        // and hub is created before HubService
        private readonly static Lazy<HubService> _instance = new Lazy<HubService>(() => new HubService());

        // getting hub context is expensive operation
        // getting it just once ensures that the intended order of messages sent to clients is preserved
        private readonly IHubContext _hubContext;
       
        // constructor is marked private to ensure that only instance of class that can be created is _instance
        private HubService() => _hubContext = GlobalHost.ConnectionManager.GetHubContext<BroadcastHub>();

        public static HubService Instance => _instance.Value;

        private Random random => new Random();

        public int counter = 0;
        public static readonly int counterLimit = 10;

        public async Task ChartData()
        {
            if (_hubContext != null && counter == 0)
            {
                while (true)
                {
                    counter++;
                    var randomNum = random.Next(1, 11); // generate random number between 1 and 10 (11 not included)
                    _hubContext.Clients.All.notify($"Broadcasting chart data {counter} of {counterLimit}: y value => {randomNum}");
                    _hubContext.Clients.All.chartData(randomNum);
                    if (counter == counterLimit) break;
                    await Task.Delay(1000);                 
                }
            }           
        }
    }
}