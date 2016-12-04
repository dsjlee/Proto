using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Proto.Startup))]
namespace Proto
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
