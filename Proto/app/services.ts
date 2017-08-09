namespace AppSpace {

    // class to be injected as service but serves purpose of factory through createHubProxy method
    // implemented as service instead of factory to write as class instead of function
    export class HubProxyService {

        hubConnection: SignalR.Hub.Connection;

        static $inject: Array<string> = ['$rootScope'];

        constructor(private $rootScope: ng.IRootScopeService) {
            this.hubConnection = $.hubConnection();
        }

        createHubProxy(hubName: string) {
            return new HubProxy(this.hubConnection, hubName, this.$rootScope);
        }

        // SignalR callback does not trigger angular digest cycle
        // need to apply manually
        start(callback: Function) {
            this.hubConnection.start().done((data) => {
                this.$rootScope.$apply(callback(data));
            });
        }
    }
}