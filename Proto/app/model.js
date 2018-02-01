"use strict";
var AppSpace;
(function (AppSpace) {
    let HubEvent;
    (function (HubEvent) {
        HubEvent["Trigger"] = "Trigger";
        HubEvent["Notify"] = "Notify";
    })(HubEvent = AppSpace.HubEvent || (AppSpace.HubEvent = {}));
    let Route;
    (function (Route) {
        Route["Base"] = "/";
        Route["Panels"] = "/Panels";
    })(Route = AppSpace.Route || (AppSpace.Route = {}));
    class HubProxy {
        constructor(hubConnection, hubName, rootScope) {
            this.hubConnection = hubConnection;
            this.rootScope = rootScope;
            this.hub = this.hubConnection.createHubProxy(hubName);
            this.delegateFns = {};
        }
        on(eventName, callback) {
            if (!this.delegateFns[eventName]) {
                var delegate = (message) => {
                    this.rootScope.$apply(callback(message));
                };
                this.delegateFns[eventName] = delegate;
                this.hub.on(eventName, delegate);
            }
        }
        off(eventName) {
            this.hub.off(eventName, this.delegateFns[eventName]);
            delete this.delegateFns[eventName];
        }
        invoke(eventName, message) {
            if (this.hubConnection.state === 1) {
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