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
            this.isConnecting = true;
            this.hubProxyService.start((data) => {
                this.isConnecting = false;
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
        setHubEvents() {
            this.hubProxy.on('notify', (message) => {
                this.broadcastMessages.unshift(message);
            });
        }
        setHubConnectionEvents() {
            this.hubProxyService.error((error) => {
                console.log(error);
                this.hubStatus = 'hub error occurred.';
            });
            this.hubProxyService.stateChanged((change) => {
                switch (change.newState) {
                    case 1 /* Connected */:
                        this.hubStatus = 'Connected';
                        break;
                    case 0 /* Connecting */:
                        this.hubStatus = 'Connecting';
                        break;
                    case 4 /* Disconnected */:
                        this.hubStatus = 'Disconnected';
                        break;
                    case 2 /* Reconnecting */:
                        this.hubStatus = 'Reconnecting';
                        break;
                    default:
                        this.hubStatus = 'info unavailable';
                        break;
                }
            });
        }
        // get accessor
        get hubStatusColor() {
            let colorClass = '';
            switch (this.hubProxyService.state) {
                case 1 /* Connected */:
                    colorClass = 'text-success';
                    break;
                case 0 /* Connecting */:
                    colorClass = 'text-info';
                    break;
                case 4 /* Disconnected */:
                    colorClass = 'text-danger';
                    break;
                case 2 /* Reconnecting */:
                    colorClass = 'text-warning';
                    break;
                default:
                    colorClass = 'text-primary';
                    break;
            }
            return colorClass;
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