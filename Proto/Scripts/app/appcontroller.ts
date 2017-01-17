(function (angular) {
    'use strict';

    interface IAppController {
        foo: string;
        alertFoo: () => void;
    }

    angular.module('app').controller('AppController', AppController);

    AppController.$inject = [];

    function AppController() {
        var vm: IAppController = this;
        vm.foo = "foo";
        vm.alertFoo = () => {
            alert('foo');
        }
    }
})(angular);