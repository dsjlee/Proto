﻿namespace AppSpace {

    export enum HubEvent {
        Trigger = 'Trigger',
        Notify = 'Notify'
    }

    // wrapper to encapsulate SignalR.Hub.Proxy and its methods
    export class HubProxy {

        hub: SignalR.Hub.Proxy;

        constructor(private hubConnection: SignalR.Hub.Connection, hubName: string, private rootScope: ng.IRootScopeService) {
            this.hub = this.hubConnection.createHubProxy(hubName);
        }

        // SignalR callback does not trigger angular digest cycle. Need to apply manually

        on(eventName: string, callback: Function) {
            this.hub.on(eventName, (message) => {
                this.rootScope.$apply(callback(message));
            });
        }

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