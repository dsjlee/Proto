/// <reference path="../scripts/typings/signalr/signalr.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular.d.ts" />

angular.module('app', [])
    .controller('appController', AppSpace.AppController as ng.Injectable<ng.IControllerConstructor>);