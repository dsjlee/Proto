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
        }
        // SignalR callback does not trigger angular digest cycle. Need to apply manually
        on(eventName, callback) {
            this.hub.on(eventName, (message) => {
                this.rootScope.$apply(callback(message));
            });
        }
        invoke(eventName, message) {
            if (message) {
                this.hub.invoke(eventName, message);
            }
            else {
                this.hub.invoke(eventName);
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
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=model.js.map