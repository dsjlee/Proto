using FluentScheduler;
using System.Diagnostics;
using System.Web.Hosting;

namespace Proto.ScheduledTask
{
    public class SampleJob : IJob, IRegisteredObject
    {
        private readonly object _lock = new object();

        private bool _shuttingDown;

        public SampleJob()
        {
            // Register this job with the hosting environment.
            // Allows for a more graceful stop of the job, in the case of IIS shutting down.
            HostingEnvironment.RegisterObject(this);
        }

        public void Execute()
        {
            lock (_lock)
            {
                if (_shuttingDown) return;

                Debug.WriteLine("Running scheduled task.");
            }
        }

        public void Stop(bool immediate)
        {
            // Locking here will wait for the lock in Execute to be released until this code can continue.
            lock (_lock)
            {
                _shuttingDown = true;
            }

            HostingEnvironment.UnregisterObject(this);
        }
    }
}