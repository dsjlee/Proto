var AppSpace;
(function (AppSpace) {
    var AppController = (function () {
        function AppController() {
            var _this = this;
            this.numList = [1, 2, 3, 4, 5];
            this.alertCtrlName = function () {
                alert(_this.ctrlName);
            };
            this.alertNumbers = function () {
                _this.numList.forEach(function (value, index) {
                    console.log(value);
                });
            };
            this.ctrlName = 'AppController';
        }
        return AppController;
    }());
    AppController.$inject = [];
    AppSpace.AppController = AppController;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=appController.js.map