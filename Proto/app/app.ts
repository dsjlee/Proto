/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../scripts/typings/signalr/signalr.d.ts" />
/// <reference path="../scripts/typings/chart.js/index.d.ts" />

angular.module('app', ['chart.js', 'ngRoute']) // http://jtblin.github.io/angular-chart.js
    .controller('appController', AppSpace.AppController)
    .controller('panelController', AppSpace.PanelController)
    .service('hubProxyService', AppSpace.HubProxyService)
    .service('routingDataService', AppSpace.RoutingDataService)
    .config(($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
        //$locationProvider.hashPrefix(''); default is bang !
        //$locationProvider.html5Mode(true); no hashtag
        $routeProvider
            .when('/Panels', {
                templateUrl: '../app/partial.html',
                controller: 'panelController',
                controllerAs: 'vm',
                resolve: { }
            })
            .otherwise({ redirectTo: '/' });        
    })
    .run(($rootScope: ng.IRootScopeService) => {
        $rootScope.$on('$locationChangeStart', (event, next, current) => {

            //console.log(event);
            //console.log(next);
            //console.log(current);
        });
        $rootScope.$on('$routeChangeStart', (event, next, current) => {
            //console.log(event);
            //console.log(next);
            //console.log(current);
        });
    });