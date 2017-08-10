namespace AppSpace {

    // class to be injected as service but serves purpose of factory through createHubProxy method
    // implemented as service instead of factory to write as class instead of function
    // wrapper for SignalR.Hub.Connection and its methods
    export class HubProxyService {

        hubConnection: SignalR.Hub.Connection;

        static $inject: Array<string> = ['$rootScope'];

        constructor(private $rootScope: ng.IRootScopeService) {
            this.hubConnection = $.hubConnection();
        }

        createHubProxy(hubName: string) {
            return new HubProxy(this.hubConnection, hubName, this.$rootScope);
        }

        // SignalR callback does not trigger angular digest cycle. Need to apply manually
        start(callback?: Function) {
            this.hubConnection.start().done((data) => {
                if (callback) {
                    // start method maybe called again to reconnect if connection lost
                    // cannot call $apply again if digest cycle already in progress
                    // use $applyAsync to defer to next digest cycle
                    this.$rootScope.$applyAsync(callback(data));
                }             
            });
        }

        error(callback: Function) {
            this.hubConnection.error((data) => {
                this.$rootScope.$apply(callback(data));
            });
        }
    }
}