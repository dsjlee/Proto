namespace AppSpace {

    export enum HubEvent {
        Trigger = 'Trigger',
        Notify = 'Notify'
    }

    // wrapper to encapsulate SignalR.Hub.Proxy and its methods
    export class HubProxy {

        hub: SignalR.Hub.Proxy;
        private wrapperFns: { [key: string]: (...msg: any[]) => void };

        constructor(private hubConnection: SignalR.Hub.Connection, hubName: string, private rootScope: ng.IRootScopeService) {
            this.hub = this.hubConnection.createHubProxy(hubName);
            this.wrapperFns = {};
        }

        // SignalR callback does not trigger angular digest cycle. Need to apply manually

        // wire up a callback to be invoked when a invocation request is received from the server hub
        on(eventName: string, callback: Function) {
            if (!this.wrapperFns[eventName]) {
                var wrapperFn = (message: string) => {
                    this.rootScope.$apply(callback(message));
                }
                this.wrapperFns[eventName] = wrapperFn;
                this.hub.on(eventName, wrapperFn);
            }
        }

        // remove the callback invocation request from the server hub for the given event name
        off(eventName: string) {
            this.hub.off(eventName, this.wrapperFns[eventName]);
            delete this.wrapperFns[eventName];
        }

        // invoke a server hub method with the given arguments
        invoke(eventName: HubEvent, message?: string) {
            if (this.hubConnection.state === SignalR.ConnectionState.Connected) {
                if (message) {
                    this.hub.invoke(eventName, message);
                } else {
                    this.hub.invoke(eventName);
                } 
            } else {
                alert('Hub is disconnected.');
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