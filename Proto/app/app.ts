/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../scripts/typings/signalr/signalr.d.ts" />
/// <reference path="../scripts/typings/chart.js/index.d.ts" />

angular.module('app', ['chart.js', 'ngRoute']) // http://jtblin.github.io/angular-chart.js
    .controller('appController', AppSpace.AppController)
    .controller('panelController', AppSpace.PanelController)
    .service('hubProxyService', AppSpace.HubProxyService)
    .config(($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
        //$locationProvider.hashPrefix('');
        $routeProvider
            .when('/Home/NgRoute', {
                templateUrl: 'app/partial.html',
                controller: 'panelController',
                controllerAs: 'vm',
                resolve: { }
            });
            //.otherwise({ redirectTo: '/Home' });

        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);
    });