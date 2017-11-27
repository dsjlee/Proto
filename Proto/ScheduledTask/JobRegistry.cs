using FluentScheduler;
using Unity;

namespace Proto.ScheduledTask
{
    public class JobRegistry : Registry
    {
        public JobRegistry()
        {
            Schedule<SampleJob>().ToRunNow();
        }
    }

    public class UnityJobFactory : IJobFactory
    {
        readonly UnityContainer container;

        public UnityJobFactory(UnityContainer unityContainer)
        {
            container = unityContainer;
        }

        public IJob GetJobInstance<T>() where T : IJob
        {
            return container.Resolve<T>();
        }
    }
}