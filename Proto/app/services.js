"use strict";
var AppSpace;
(function (AppSpace) {
    class HubProxyService {
        constructor($rootScope) {
            this.$rootScope = $rootScope;
            this.hubConnection = $.hubConnection();
        }
        createHubProxy(hubName) {
            return new AppSpace.HubProxy(this.hubConnection, hubName, this.$rootScope);
        }
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