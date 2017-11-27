using FluentScheduler;
using LazyCache;
using Proto.Controllers;
using Proto.ScheduledTask;
using System.Web.Mvc;
using Unity;
using Unity.Injection;
using Unity.Lifetime;
using Unity.Mvc5;

namespace Proto
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            // inject CachingService as singleton and specify default constructor (no parameter)
            container.RegisterType<IAppCache, CachingService>(new ContainerControlledLifetimeManager(), new InjectionConstructor());
            container.RegisterType<AccountController>(new InjectionConstructor());
            container.RegisterType<ManageController>(new InjectionConstructor());
            container.RegisterType<SampleJob>(new ContainerControlledLifetimeManager());

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));

            JobManager.JobFactory = new UnityJobFactory(container);
        }
    }
}