namespace AppSpace {

    export class HubProxyService {

        hubConnection: SignalR.Hub.Connection;

        static $inject: Array<string> = ['$rootScope'];

        constructor(private $rootScope: ng.IRootScopeService) {
            this.hubConnection = $.hubConnection();
        }

        createHubProxy(hubName: string) {
            return new HubProxy(this.hubConnection, hubName, this.$rootScope);
        }

        start(callback: Function) {
            this.hubConnection.start().done((data) => {
                this.$rootScope.$apply(callback(data));
            });
        }
    }
}