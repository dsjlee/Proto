namespace AppSpace {

    // class to be injected as service but serves purpose of factory through createHubProxy method
    // implemented as service instead of factory to write as class instead of function
    // wrapper for SignalR.Hub.Connection and its methods
    export class HubProxyService {

        hubConnection: SignalR.Hub.Connection;

        // get accessor
        get state(): SignalR.ConnectionState {
            return this.hubConnection.state;
        }

        static $inject: Array<string> = ['$rootScope'];

        constructor(private $rootScope: ng.IRootScopeService) {
            this.hubConnection = $.hubConnection();
        }

        createHubProxy(hubName: string) {
            return new HubProxy(this.hubConnection, hubName, this.$rootScope);
        }

        // SignalR callback does not trigger angular digest cycle. Need to apply manually
        //https://stackoverflow.com/questions/21471355/angular-why-isnt-evalasync-called-applyasync

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

        stop(async?: boolean, notifyServer?: boolean) {
            this.hubConnection.stop(async, notifyServer);
        }

        error(callback: Function) {
            this.hubConnection.error((error: SignalR.ConnectionError) => {
                this.$rootScope.$apply(callback(error));
            });
        }

        stateChanged(callback: Function) {
            this.hubConnection.stateChanged((change: SignalR.StateChanged) => {
                // callback runs whenever state changes.
                // cannot call $apply again if digest cycle already in progress
                // use $evalAsync to defers to next loop iteration of current digest cycle
                this.$rootScope.$evalAsync(callback(change));
            });
        }

        received(callback: Function) {
            this.hubConnection.received((data: any) => {
                this.$rootScope.$evalAsync(callback(data));
            });
        }

    }

}