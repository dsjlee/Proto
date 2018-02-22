"use strict";
var AppSpace;
(function (AppSpace) {
    class AppController {
        constructor($rootScope, hubProxyService) {
            this.$rootScope = $rootScope;
            this.hubProxyService = hubProxyService;
            this.broadcastMessages = [];
            this.hubStatus = '';
            this.notifyMessage = '';
            this.hubStatusColor = '';
            this.isConnecting = false;
            this.isNotifyOn = false;
            this.chartLabels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
            this.chartSeries = ['Series A'];
            this.dataSeriesA = [];
            this.chartData = [];
            this.xAxisPointCount = 10;
            this.yAxisIDseriesA = 'y-axis-1';
            this.datasetOverride = [{ yAxisID: this.yAxisIDseriesA }];
            this.chartOptions = {};
            this.notifyCallback = (message) => {
                this.broadcastMessages.unshift(message);
                let itemCount = this.broadcastMessages.length;
                let numberToKeep = 50;
                if (itemCount > numberToKeep) {
                    this.broadcastMessages.splice(numberToKeep, itemCount - numberToKeep);
                }
            };
            this.hubProxy = this.hubProxyService.createHubProxy("BroadcastHub");
            this.setHubEvents();
            this.resetMessages();
        }
        $onInit() {
            this.setupChart();
            this.setHubConnectionEvents();
            this.startHub();
        }
        startHub() {
            this.hubProxyService.start();
        }
        stopHub() {
            this.hubProxyService.stop(true, true);
        }
        trigger() {
            this.hubProxy.invoke(AppSpace.HubEvent.Trigger);
        }
        notify() {
            if (this.notifyMessage) {
                let isConnected = this.hubProxy.invoke(AppSpace.HubEvent.Notify, this.notifyMessage);
                if (isConnected) {
                    this.isNotifyOn ? this.notifyMessage = '' : alert('Notify is turned off.');
                }
            }
        }
        resetMessages() {
            this.broadcastMessages = [];
        }
        notifyOn() {
            this.hubProxy.on('notify', this.notifyCallback);
            this.isNotifyOn = true;
        }
        notifyOff() {
            this.hubProxy.off('notify');
            this.isNotifyOn = false;
        }
        setHubEvents() {
            this.notifyOn();
            this.hubProxy.on('chartData', (data) => {
                this.dataSeriesA.push(data);
                if (this.dataSeriesA.length > this.xAxisPointCount) {
                    this.dataSeriesA.shift();
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
                    case 1:
                        this.hubStatus = 'Connected';
                        this.isConnecting = false;
                        this.hubStatusColor = 'text-success';
                        break;
                    case 0:
                        this.hubStatus = 'Connecting';
                        this.isConnecting = true;
                        this.hubStatusColor = 'text-info';
                        break;
                    case 4:
                        this.hubStatus = 'Disconnected';
                        this.isConnecting = false;
                        this.hubStatusColor = 'text-danger';
                        break;
                    case 2:
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
        setupChart() {
            for (let i = 0; i < this.xAxisPointCount; i++) {
                this.dataSeriesA.push(0);
            }
            this.chartData.push(this.dataSeriesA);
            this.chartOptions = {
                scales: {
                    yAxes: [
                        {
                            id: this.yAxisIDseriesA,
                            type: 'linear',
                            display: true,
                            position: 'left'
                        }
                    ]
                }
            };
        }
        onChartClick(points, evt) {
            console.log(points, evt);
        }
    }
    AppController.$inject = ['$rootScope', 'hubProxyService', '$route', '$routeParams', '$location'];
    AppSpace.AppController = AppController;
    class PanelController {
        constructor($rootScope, routingData, $location) {
            this.$rootScope = $rootScope;
            this.routingData = routingData;
            this.$location = $location;
            this.ctrlName = 'PanelController';
            this.panels = [];
            this.newPanel = new AppSpace.Panel();
            this.alertCtrlName = () => {
                alert(this.ctrlName);
            };
            let panel = new AppSpace.Panel('some title', 'some content');
            this.panels.push(panel);
        }
        $onInit() {
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
    PanelController.$inject = ['$rootScope', 'routingDataService', '$location'];
    AppSpace.PanelController = PanelController;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=controllers.js.map