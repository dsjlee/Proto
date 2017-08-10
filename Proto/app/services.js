"use strict";
var AppSpace;
(function (AppSpace) {
    // class to be injected as service but serves purpose of factory through createHubProxy method
    // implemented as service instead of factory to write as class instead of function
    // wrapper for SignalR.Hub.Connection and its methods
    class HubProxyService {
        constructor($rootScope) {
            this.$rootScope = $rootScope;
            this.hubConnection = $.hubConnection();
        }
        createHubProxy(hubName) {
            return new AppSpace.HubProxy(this.hubConnection, hubName, this.$rootScope);
        }
        // SignalR callback does not trigger angular digest cycle. Need to apply manually
        start(callback) {
            this.hubConnection.start().done((data) => {
                if (callback) {
                    // start method maybe called again to reconnect if connection lost
                    // cannot call $apply again if digest cycle already in progress
                    // using $applyAsync start new digest cycle 
                    // but share the digest cycles among several async callbacks
                    this.$rootScope.$applyAsync(callback(data));
                }
            });
        }
        error(callback) {
            this.hubConnection.error((data) => {
                this.$rootScope.$apply(callback(data));
            });
        }
    }
    HubProxyService.$inject = ['$rootScope'];
    AppSpace.HubProxyService = HubProxyService;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=services.js.map