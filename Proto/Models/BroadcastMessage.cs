using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proto.Models
{
    [T4TS.TypeScriptInterface]
    public class BroadcastMessage
    {
        public string ConnectionId { get; set; }
        public string Message { get; set; }
        public DateTime Added { get; set; }
    }
}