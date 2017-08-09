"use strict";
var AppSpace;
(function (AppSpace) {
    // class to be injected as service but serves purpose of factory through createHubProxy method
    // implemented as service instead of factory to write as class instead of function
    class HubProxyService {
        constructor($rootScope) {
            this.$rootScope = $rootScope;
            this.hubConnection = $.hubConnection();
        }
        createHubProxy(hubName) {
            return new AppSpace.HubProxy(this.hubConnection, hubName, this.$rootScope);
        }
        // SignalR callback does not trigger angular digest cycle
        // need to apply manually
        start(callback) {
            this.hubConnection.start().done((data) => {
                this.$rootScope.$apply(callback(data));
            });
        }
    }
    HubProxyService.$inject = ['$rootScope'];
    AppSpace.HubProxyService = HubProxyService;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=services.js.map