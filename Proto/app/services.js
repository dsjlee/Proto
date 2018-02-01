"use strict";
var AppSpace;
(function (AppSpace) {
    class HubProxyService {
        constructor($rootScope) {
            this.$rootScope = $rootScope;
            this.hubConnection = $.hubConnection();
        }
        get state() {
            return this.hubConnection.state;
        }
        createHubProxy(hubName) {
            return new AppSpace.HubProxy(this.hubConnection, hubName, this.$rootScope);
        }
        start(callback) {
            this.hubConnection.start().done((data) => {
                if (callback) {
                    this.$rootScope.$applyAsync(callback(data));
                }
            });
        }
        stop(async, notifyServer) {
            this.hubConnection.stop(async, notifyServer);
        }
        error(callback) {
            this.hubConnection.error((error) => {
                this.$rootScope.$apply(callback(error));
            });
        }
        stateChanged(callback) {
            this.hubConnection.stateChanged((change) => {
                this.$rootScope.$evalAsync(callback(change));
            });
        }
        received(callback) {
            this.hubConnection.received((data) => {
                this.$rootScope.$evalAsync(callback(data));
            });
        }
    }
    HubProxyService.$inject = ['$rootScope'];
    AppSpace.HubProxyService = HubProxyService;
    class RoutingDataService {
        constructor() {
            this.title = 'hello';
        }
    }
    AppSpace.RoutingDataService = RoutingDataService;
    ;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=services.js.map