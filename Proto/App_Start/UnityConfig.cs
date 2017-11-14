using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Unity.Mvc5;
using LazyCache;
using Proto.Controllers;

namespace Proto
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // inject CachingService as singleton and specify default constructor (no parameter)
            container.RegisterType<IAppCache, CachingService>(new ContainerControlledLifetimeManager(), new InjectionConstructor());
            container.RegisterType<AccountController>(new InjectionConstructor());
            container.RegisterType<ManageController>(new InjectionConstructor());

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}