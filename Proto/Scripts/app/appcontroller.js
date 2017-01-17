(function (angular) {
    'use strict';
    angular.module('app').controller('AppController', AppController);
    AppController.$inject = [];
    function AppController() {
        var vm = this;
        vm.foo = "foo";
        vm.alertFoo = function () {
            alert('foo');
        };
    }
})(angular);
//# sourceMappingURL=appController.js.map