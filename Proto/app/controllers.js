"use strict";
var AppSpace;
(function (AppSpace) {
    class AppController {
        constructor($scope, $rootScope) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.ctrlName = 'AppController';
            this.hubConnection = $.hubConnection();
            this.hub = this.hubConnection.createHubProxy("BroadcastHub");
            this.hub.on('notify', (message) => {
                $rootScope.$apply(() => {
                    this.broadcastMessage = message;
                });
            });
        }
        $onInit() {
            this.hubConnection.start().done((data) => {
                this.$rootScope.$apply(() => {
                    this.hubStatus = 'hub started.';
                });
            });
        }
        trigger() {
            this.hub.invoke("Trigger");
        }
    }
    //$onInit: () => void;
    AppController.$inject = ['$scope', '$rootScope'];
    AppSpace.AppController = AppController;
    class PanelController {
        constructor() {
            this.ctrlName = 'PanelController';
            this.panels = [];
            this.newPanel = new AppSpace.Panel();
            this.alertCtrlName = () => {
                alert(this.ctrlName);
            };
            let panel = new AppSpace.Panel('some title', 'some content');
            this.panels.push(panel);
        }
        addPanel() {
            this.newPanel.added = new Date();
            this.panels.push(this.newPanel);
            this.newPanel = new AppSpace.Panel();
        }
        clonePanel() {
            let panel = new AppSpace.Panel('some title', 'some content');
            this.panels.push(panel);
        }
        resetPanel() {
            this.panels.length = 0;
        }
        removePanel(index) {
            this.panels.splice(index, 1);
        }
    }
    PanelController.$inject = [];
    AppSpace.PanelController = PanelController;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=controllers.js.map