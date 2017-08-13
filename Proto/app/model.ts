namespace AppSpace {

    export enum HubEvent {
        Trigger = 'Trigger',
        Notify = 'Notify'
    }

    // wrapper to encapsulate SignalR.Hub.Proxy and its methods
    export class HubProxy {

        hub: SignalR.Hub.Proxy;

        // collection of key value pair to store what callback is registered to hub event
        // used to ensure same callback in memory is deregistered from hub event
        private delegateFns: { [key: string]: (...msg: any[]) => void }; 

        constructor(private hubConnection: SignalR.Hub.Connection, hubName: string, private rootScope: ng.IRootScopeService) {
            this.hub = this.hubConnection.createHubProxy(hubName);
            this.delegateFns = {};
        }
     
        // wire up a callback to be invoked when a invocation request is received from the server hub
        on(eventName: string, callback: Function) {
            // check if callback is not already registered for same event
            if (!this.delegateFns[eventName]) { 
                var delegate = (message: string) => {
                    // SignalR callback does not trigger angular digest cycle. Need to apply manually
                    this.rootScope.$apply(callback(message));
                }
                this.delegateFns[eventName] = delegate; // add into collection
                this.hub.on(eventName, delegate);
            }
        }

        // remove the callback invocation request from the server hub for the given event name
        off(eventName: string) {
            this.hub.off(eventName, this.delegateFns[eventName]);
            delete this.delegateFns[eventName]; // remove callback from collection
        }

        // invoke a server hub method with the given arguments
        // return false to indicate hub is disconnected
        invoke(eventName: HubEvent, message?: string): boolean {
            if (this.hubConnection.state === SignalR.ConnectionState.Connected) {
                if (message) {
                    this.hub.invoke(eventName, message);
                } else {
                    this.hub.invoke(eventName);
                } 
                return true;
            } else {
                alert('Hub is disconnected.');
                return false;
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