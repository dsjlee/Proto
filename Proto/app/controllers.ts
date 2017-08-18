namespace AppSpace {

    export class AppController implements ng.IController {

        // signalr properties
        hubProxy: HubProxy;  
        broadcastMessages: string[];
        hubStatus: string;      
        notifyMessage: string;
        hubStatusColor: string;                 // contextual css class for text
        isConnecting: boolean;
        isNotifyOn: boolean;

        // chart.js properties
        chartLabels: string[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']; // x-axis
        chartSeries: string[] = ['Series A'];   // for each line in graph
        dataSeriesA: number[] = [];             // to be pushed into chartData for each series
        chartData: number[][] = [];             // array of number array
        readonly xAxisPointCount: number = 10;
        readonly yAxisIDseriesA: string = 'y-axis-1';
        datasetOverride: ChartDataSets[] = [{ yAxisID: this.yAxisIDseriesA }];
        chartOptions: ChartOptions;    

        static $inject: Array<string> = ['$rootScope', 'hubProxyService', '$route', '$routeParams', '$location'];

        constructor(private $rootScope: ng.IRootScopeService, private hubProxyService: HubProxyService) {           
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
            this.hubProxy.invoke(HubEvent.Trigger);
        }

        // send message to hub to be broadcasted
        notify() { 
            if (this.notifyMessage) {
                // even if isNotifyOn is false, invoke anyway to test if callback is indeed deregistered from event
                let isConnected = this.hubProxy.invoke(HubEvent.Notify, this.notifyMessage);
                if (isConnected) {
                    // don't clear input if not actually sent (i.e. notify is off or hub disconnected)
                    this.isNotifyOn ? this.notifyMessage = '' : alert('Notify is turned off.');
                }                               
            }  
        }

        resetMessages() {
            this.broadcastMessages = [];
        }

        // use arrow function to preserve meaning of "this" to mean this class
        notifyCallback = (message: string) => {
            this.broadcastMessages.unshift(message);
            let itemCount = this.broadcastMessages.length;
            let numberToKeep = 50;
            if (itemCount > numberToKeep) {
                this.broadcastMessages.splice(numberToKeep, itemCount - numberToKeep);
            }
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
            this.hubProxy.on('chartData', (data: number) => {
                this.dataSeriesA.push(data);
                if (this.dataSeriesA.length > this.xAxisPointCount) {
                    this.dataSeriesA.shift();
                }
            });
        }

        // set event handler for hub connection
        setHubConnectionEvents() {

            this.hubProxyService.error((error: SignalR.ConnectionError) => {
                this.hubStatus = error.message;
                this.hubStatusColor = 'text-danger';
            });

            this.hubProxyService.stateChanged((change: SignalR.StateChanged) => {
                switch (change.newState) {
                    case SignalR.ConnectionState.Connected:
                        this.hubStatus = 'Connected';
                        this.isConnecting = false;
                        this.hubStatusColor = 'text-success';
                        break;
                    case SignalR.ConnectionState.Connecting:
                        this.hubStatus = 'Connecting';
                        this.isConnecting = true;
                        this.hubStatusColor = 'text-info';
                        break;
                    case SignalR.ConnectionState.Disconnected:
                        this.hubStatus = 'Disconnected';
                        this.isConnecting = false;
                        this.hubStatusColor = 'text-danger';
                        break;
                    case SignalR.ConnectionState.Reconnecting:
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
            }
        }

        onChartClick(points: any, evt: any) {
            console.log(points, evt);
        }

    } // end of AppController class definition

    export class PanelController implements ng.IController {

        readonly ctrlName = 'PanelController';
        panels: Panel[] = [];
        newPanel: Panel = new Panel();
        $onInit: () => void; // not used but needed to bypass weak type checking for angular controller
                             // instead of using type assertion

        static $inject: Array<string> = [];       

        constructor() {
            let panel = new Panel('some title', 'some content');
            this.panels.push(panel);
        }

        addPanel() {
            this.newPanel.added = new Date();
            this.panels.push(this.newPanel);
            this.newPanel = new Panel();
        }

        clonePanel() {
            let panel = new Panel('some title', 'some content');
            this.panels.push(panel);
        }

        resetPanel() {
            this.panels.length = 0;
        }

        removePanel(index: number) {
            this.panels.splice(index, 1);
        }

        alertCtrlName = () => {
            alert(this.ctrlName);
        }

    }

}