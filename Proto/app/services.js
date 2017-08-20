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
        // get accessor
        get state() {
            return this.hubConnection.state;
        }
        createHubProxy(hubName) {
            return new AppSpace.HubProxy(this.hubConnection, hubName, this.$rootScope);
        }
        // SignalR callback does not trigger angular digest cycle. Need to apply manually
        //https://stackoverflow.com/questions/21471355/angular-why-isnt-evalasync-called-applyasync
        start(callback) {
            this.hubConnection.start().done((data) => {
                if (callback) {
                    // start method maybe called again to reconnect if connection lost
                    // cannot call $apply again if digest cycle already in progress
                    // use $applyAsync to defer to next digest cycle
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
                // callback runs whenever state changes.
                // cannot call $apply again if digest cycle already in progress
                // use $evalAsync to defers to next loop iteration of current digest cycle
                this.$rootScope.$evalAsync(callback(change));
            });
        }
        received(callback) {
            this.hubConnection.received((data) => {
                this.$rootScope.$evalAsync(callback(data));
            });
        }
    } // end of HubProxyService class
    HubProxyService.$inject = ['$rootScope'];
    AppSpace.HubProxyService = HubProxyService;
    function RoutingDataService() {
        let routingDto = {
            title: 'Hello'
        };
        return {
            set: (dto) => routingDto = dto,
            get: () => routingDto
        };
    }
    AppSpace.RoutingDataService = RoutingDataService;
    ;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=services.js.map