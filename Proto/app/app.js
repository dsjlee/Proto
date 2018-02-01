"use strict";
angular.module('app', ['chart.js', 'ngRoute'])
    .controller('appController', AppSpace.AppController)
    .controller('panelController', AppSpace.PanelController)
    .service('hubProxyService', AppSpace.HubProxyService)
    .service('routingDataService', AppSpace.RoutingDataService)
    .config(($routeProvider, $locationProvider) => {
    $routeProvider
        .when(AppSpace.Route.Panels, {
        templateUrl: '../app/partial.html',
        controller: 'panelController',
        controllerAs: 'vm',
        resolve: {}
    })
        .otherwise({ redirectTo: AppSpace.Route.Base });
});
//# sourceMappingURL=app.js.map