"use strict";
var AppSpace;
(function (AppSpace) {
    class AppController {
        constructor($rootScope, hubProxyService) {
            this.$rootScope = $rootScope;
            this.hubProxyService = hubProxyService;
            this.pageTitle = 'Broadcast Hub';
            this.hubProxy = this.hubProxyService.createHubProxy("BroadcastHub");
            this.hubProxy.on('notify', (message) => {
                this.broadcastMessages.unshift(message);
            });
        }
        $onInit() {
            this.resetMessages();
            this.hubProxyService.start((data) => {
                this.hubStatus = 'hub started.';
            });
        }
        trigger() {
            this.resetMessages();
            this.hubProxy.invoke(AppSpace.HubEvent.Trigger);
        }
        notify() {
            this.hubProxy.invoke(AppSpace.HubEvent.Notify, this.notifyMessage);
        }
        resetMessages() {
            this.broadcastMessages = [];
        }
    }
    //$onInit: () => void;
    AppController.$inject = ['$rootScope', 'hubProxyService'];
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