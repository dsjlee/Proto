"use strict";
var AppSpace;
(function (AppSpace) {
    function HubProxyFactory(rootScope) {
        var hubConnection = $.hubConnection();
        return function (hubName) {
            return new AppSpace.HubProxyService(rootScope, hubConnection, hubName);
        };
    }
    AppSpace.HubProxyFactory = HubProxyFactory;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=factories.js.map