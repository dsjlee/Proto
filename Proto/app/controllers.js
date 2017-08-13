"use strict";
var AppSpace;
(function (AppSpace) {
    class AppController {
        constructor($rootScope, hubProxyService) {
            this.$rootScope = $rootScope;
            this.hubProxyService = hubProxyService;
            // chart.js properties
            this.chartLabels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']; // x-axis
            this.chartSeries = ['Series A'];
            this.dataSeriesA = [];
            this.chartData = []; // array of number array
            this.yAxisIDseriesA = 'y-axis-1';
            this.datasetOverride = [{ yAxisID: this.yAxisIDseriesA }];
            this.xAxisIntervalCount = 10;
            // use arrow function to preserve meaning of "this" to mean this class
            this.notifyCallback = (message) => {
                this.broadcastMessages.unshift(message);
                let itemCount = this.broadcastMessages.length;
                let numberToKeep = 50;
                if (itemCount > numberToKeep) {
                    this.broadcastMessages.splice(numberToKeep, itemCount - numberToKeep);
                }
            };
            this.hubProxy = this.hubProxyService.createHubProxy("BroadcastHub");
            this.setHubEvents(); // setup hub event handlers before hub connection start
            this.resetMessages();
        }
        // runs after constructor
        $onInit() {
            this.setupChart();
            this.setHubConnectionEvents(); // setup hub connection event handlers before hub connection start
            this.startHub();
        }
        // start hub connection
        startHub() {
            this.hubProxyService.start();
        }
        // stop hub connection
        stopHub() {
            this.hubProxyService.stop(true, true);
        }
        // trigger hub to broadcast messages in fixed number of loops
        trigger() {
            this.hubProxy.invoke(AppSpace.HubEvent.Trigger);
        }
        // send message to hub to be broadcasted
        notify() {
            if (this.notifyMessage) {
                this.hubProxy.invoke(AppSpace.HubEvent.Notify, this.notifyMessage);
            }
        }
        resetMessages() {
            this.broadcastMessages = [];
        }
        // register callback to the hub event
        notifyOn() {
            this.hubProxy.on('notify', this.notifyCallback);
        }
        // deregister callback from the hub event
        notifyOff() {
            this.hubProxy.off('notify');
        }
        setHubEvents() {
            this.notifyOn();
            this.hubProxy.on('chartData', (data) => {
                this.dataSeriesA.push(data);
                if (this.dataSeriesA.length > this.xAxisIntervalCount) {
                    this.chartData[0].shift();
                }
            });
        }
        // set event handler for hub connection
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
        } // end of setHubConnectionEvents()
        setupChart() {
            for (let i = 0; i < this.xAxisIntervalCount; i++) {
                // initialize y-axis values for each x-axis interval by setting it to zero
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
    } // end of AppController class definition
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
    // instead of using type assertion
    PanelController.$inject = [];
    AppSpace.PanelController = PanelController;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=controllers.js.map