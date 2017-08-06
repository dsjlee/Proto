namespace AppSpace {

    export class HubProxy {

        hub: SignalR.Hub.Proxy;

        constructor(private hubConnection: SignalR.Hub.Connection, hubName: string, private rootScope: ng.IRootScopeService) {
            this.hub = this.hubConnection.createHubProxy(hubName);
        }

        on(eventName: string, callback: Function) {
            this.hub.on(eventName, (message) => {
                this.rootScope.$apply(callback(message));
            });
        }

        invoke(eventName: string, message?: string) {
            if (message) {
                this.hub.invoke(eventName, message);
            } else {
                this.hub.invoke(eventName);
            }
            
        }
    }

    export class Panel {

        added: Date = new Date();
        isEditMode: boolean = false;

        constructor(public title?: string, public content?: string) { }

        addedString = () => {
            return this.added.toLocaleString();
        }

        toggleEdit() {
            this.isEditMode = this.isEditMode ? false : true;
        }

        save() {
            this.isEditMode = false;
        }
    }

}