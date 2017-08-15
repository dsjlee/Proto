"use strict";
var AppSpace;
(function (AppSpace) {
    let HubEvent;
    (function (HubEvent) {
        HubEvent["Trigger"] = "Trigger";
        HubEvent["Notify"] = "Notify";
    })(HubEvent = AppSpace.HubEvent || (AppSpace.HubEvent = {}));
    // wrapper to encapsulate SignalR.Hub.Proxy and its methods
    class HubProxy {
        constructor(hubConnection, hubName, rootScope) {
            this.hubConnection = hubConnection;
            this.rootScope = rootScope;
            this.hub = this.hubConnection.createHubProxy(hubName);
            this.delegateFns = {};
        }
        // wire up a callback to be invoked when a invocation request is received from the server hub
        on(eventName, callback) {
            // check if callback is not already registered for same event
            if (!this.delegateFns[eventName]) {
                var delegate = (message) => {
                    // SignalR callback does not trigger angular digest cycle. Need to apply manually
                    this.rootScope.$apply(callback(message));
                };
                this.delegateFns[eventName] = delegate; // add into collection
                this.hub.on(eventName, delegate);
            }
        }
        // remove the callback invocation request from the server hub for the given event name
        off(eventName) {
            this.hub.off(eventName, this.delegateFns[eventName]);
            delete this.delegateFns[eventName]; // remove callback from collection
        }
        // invoke a server hub method with the given arguments
        // return false to indicate hub is disconnected
        invoke(eventName, message) {
            if (this.hubConnection.state === 1 /* Connected */) {
                if (message) {
                    this.hub.invoke(eventName, message);
                }
                else {
                    this.hub.invoke(eventName);
                }
                return true;
            }
            else {
                alert('Hub is disconnected.');
                return false;
            }
        }
    }
    AppSpace.HubProxy = HubProxy;
    class Panel {
        constructor(title, content) {
            this.title = title;
            this.content = content;
            this.added = new Date();
            this.isEditMode = false;
            this.addedString = () => {
                return this.added.toLocaleString();
            };
        }
        toggleEdit() {
            this.isEditMode = this.isEditMode ? false : true;
        }
        save() {
            this.isEditMode = false;
        }
    }
    AppSpace.Panel = Panel;
    class BroadcastMessage {
    }
    AppSpace.BroadcastMessage = BroadcastMessage;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=model.js.map