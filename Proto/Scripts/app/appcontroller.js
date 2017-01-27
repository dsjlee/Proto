var AppSpace;
(function (AppSpace) {
    var AppController = (function () {
        function AppController() {
            var _this = this;
            this.alertCtrlName = function () {
                alert(_this.ctrlName);
            };
            this.ctrlName = 'AppController';
        }
        return AppController;
    }());
    AppController.$inject = [];
    AppSpace.AppController = AppController;
})(AppSpace || (AppSpace = {}));
