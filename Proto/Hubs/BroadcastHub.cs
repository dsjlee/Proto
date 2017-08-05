using Microsoft.AspNet.SignalR;

namespace Proto.Hubs
{
    public class BroadcastHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }
    }
}