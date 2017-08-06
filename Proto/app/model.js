"use strict";
var AppSpace;
(function (AppSpace) {
    class HubProxy {
        constructor(hubConnection, hubName, rootScope) {
            this.hubConnection = hubConnection;
            this.rootScope = rootScope;
            this.hub = this.hubConnection.createHubProxy(hubName);
        }
        on(eventName, callback) {
            this.hub.on(eventName, (message) => {
                this.rootScope.$apply(callback(message));
            });
        }
        invoke(eventName) {
            this.hub.invoke(eventName);
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