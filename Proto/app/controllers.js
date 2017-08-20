"use strict";
var AppSpace;
(function (AppSpace) {
    class AppController {
        constructor($rootScope, hubProxyService) {
            this.$rootScope = $rootScope;
            this.hubProxyService = hubProxyService;
            // chart.js properties
            this.chartLabels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']; // x-axis
            this.chartSeries = ['Series A']; // for each line in graph
            this.dataSeriesA = []; // to be pushed into chartData for each series
            this.chartData = []; // array of number array
            this.xAxisPointCount = 10;
            this.yAxisIDseriesA = 'y-axis-1';
            this.datasetOverride = [{ yAxisID: this.yAxisIDseriesA }];
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
                // even if isNotifyOn is false, invoke anyway to test if callback is indeed deregistered from event
                let isConnected = this.hubProxy.invoke(AppSpace.HubEvent.Notify, this.notifyMessage);
                if (isConnected) {
                    // don't clear input if not actually sent (i.e. notify is off or hub disconnected)
                    this.isNotifyOn ? this.notifyMessage = '' : alert('Notify is turned off.');
                }
            }
        }
        resetMessages() {
            this.broadcastMessages = [];
        }
        // register callback to the hub event
        notifyOn() {
            this.hubProxy.on('notify', this.notifyCallback);
            this.isNotifyOn = true;
        }
        // deregister callback from the hub event
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
            //this.hubProxyService.received((data: any) => {
            //    console.log(data);
            //});
        } // end of setHubConnectionEvents()
        setupChart() {
            for (let i = 0; i < this.xAxisPointCount; i++) {
                // initialize y-axis values for each x-axis point by setting it to zero
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
    AppController.$inject = ['$rootScope', 'hubProxyService', '$route', '$routeParams', '$location'];
    AppSpace.AppController = AppController;
    class PanelController {
        constructor($rootScope, routingData) {
            this.$rootScope = $rootScope;
            this.routingData = routingData;
            this.ctrlName = 'PanelController';
            this.panels = [];
            this.newPanel = new AppSpace.Panel();
            this.alertCtrlName = () => {
                alert(this.ctrlName);
            };
            let panel = new AppSpace.Panel('some title', 'some content');
            this.panels.push(panel);
            this.$rootScope.$on('$locationChangeStart', (event, next, current) => {
                console.log(this.routingData.title);
                //console.log(event);
                //console.log(next);
                //console.log(current);
            });
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
    PanelController.$inject = ['$rootScope', 'routingDataService'];
    AppSpace.PanelController = PanelController;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=controllers.js.map