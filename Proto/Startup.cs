using Microsoft.Owin;
using Owin;
using Proto.Services;
using System.Threading.Tasks;

[assembly: OwinStartupAttribute(typeof(Proto.Startup))]
namespace Proto
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
            // running SignalR here since Owin Startup runs after Global.asax Application_Start
            // meaning Application_Start runs before SignalR is mapped
            Task.Run(async () => await BroadcastService.Instance.NotifyCients());
        }
    }
}
