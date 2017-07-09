/// <reference path="../typings/angularjs/angular.d.ts" />

(function (angular) {

    angular.module('app', [])
        .controller('AppController', AppSpace.AppController as ng.Injectable<ng.IControllerConstructor>);

})(angular);