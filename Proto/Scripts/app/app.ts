/// <reference path="../typings/angularjs/angular.d.ts" />

angular.module('app', [])
    .controller('appController', AppSpace.AppController as ng.Injectable<ng.IControllerConstructor>);