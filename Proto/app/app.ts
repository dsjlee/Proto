/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/signalr/signalr.d.ts" />
/// <reference path="../scripts/typings/chart.js/index.d.ts" />

angular.module('app', ['chart.js'])
    .controller('appController', AppSpace.AppController)
    .controller('panelController', AppSpace.PanelController)
    .service('hubProxyService', AppSpace.HubProxyService);