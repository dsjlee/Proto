"use strict";
var AppSpace;
(function (AppSpace) {
    class AppController {
        constructor($rootScope, hubProxyService) {
            this.$rootScope = $rootScope;
            this.hubProxyService = hubProxyService;
            this.pageTitle = 'Broadcast Hub';
            this.hubProxy = this.hubProxyService.createHubProxy("BroadcastHub");
            this.setHubEvents(); // define hub client event handlers before hub connection start in $onInit
            this.resetMessages();
        }
        $onInit() {
            this.setHubConnectionEvents(); // set hub connection event handlers before starting hub connection
            this.startHub();
        }
        startHub() {
            this.hubProxyService.start();
        }
        stopHub() {
            this.hubProxyService.stop(true, true);
        }
        trigger() {
            this.resetMessages();
            this.hubProxy.invoke(AppSpace.HubEvent.Trigger);
        }
        notify() {
            if (this.notifyMessage) {
                this.hubProxy.invoke(AppSpace.HubEvent.Notify, this.notifyMessage);
            }
        }
        resetMessages() {
            this.broadcastMessages = [];
        }
        setHubEvents() {
            this.hubProxy.on('notify', (message) => {
                this.broadcastMessages.unshift(message);
                let itemCount = this.broadcastMessages.length;
                let numberToKeep = 50;
                if (itemCount > numberToKeep) {
                    this.broadcastMessages.splice(numberToKeep, itemCount - numberToKeep);
                }
            });
        }
        setHubConnectionEvents() {
            this.hubProxyService.error((error) => {
                this.hubStatus = error.message;
                this.hubStatusColor = 'text-danger';
            });
            this.hubProxyService.stateChanged((change) => {
                switch (change.newState) {
                    case 1 /* Connected */:
                        this.hubStatus = 'Connected';
                        this.isConnecting = false;
                        this.hubStatusColor = 'text-success';
                        break;
                    case 0 /* Connecting */:
                        this.hubStatus = 'Connecting';
                        this.isConnecting = true;
                        this.hubStatusColor = 'text-info';
                        break;
                    case 4 /* Disconnected */:
                        this.hubStatus = 'Disconnected';
                        this.isConnecting = false;
                        this.hubStatusColor = 'text-danger';
                        break;
                    case 2 /* Reconnecting */:
                        this.hubStatus = 'Reconnecting';
                        this.isConnecting = true;
                        this.hubStatusColor = 'text-warning';
                        break;
                    default:
                        this.hubStatus = 'info unavailable';
                        this.hubStatusColor = 'text-primary';
                        break;
                }
            });
        }
    }
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