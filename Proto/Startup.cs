using FluentScheduler;
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
            Task.Run(async () => await HubService.Instance.ChartData());

            // add task to JobManager after it's initialized in Global.asax Application_Start
            // to ensure SignalR is mapped before running the task
            // doesn't work to keep app pool alive. need to be http request from client?
            //JobManager.AddJob(() => HubService.Instance.KeepAlive(), (s) => s.ToRunEvery(15).Minutes());
        }
    }
}
