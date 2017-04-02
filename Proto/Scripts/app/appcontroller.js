var AppSpace;
(function (AppSpace) {
    class AppController {
        constructor() {
            this.numList = [1, 2, 3, 4, 5];
            this.alertCtrlName = () => {
                alert(this.ctrlName);
            };
            this.alertNumbers = () => {
                this.numList.forEach((value, index) => {
                    console.log(value);
                });
            };
            this.ctrlName = 'AppController';
        }
    }
    AppController.$inject = [];
    AppSpace.AppController = AppController;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=appcontroller.js.map