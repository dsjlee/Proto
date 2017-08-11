namespace AppSpace {

    export class AppController implements ng.IController {

        readonly pageTitle = 'Broadcast Hub';
        hubProxy: HubProxy;  
        broadcastMessages: string[];
        hubStatus: string;      
        notifyMessage: string;
        hubStatusColor: string; // twitter bootstrap contextual class for text
        isConnecting: boolean;

        static $inject: Array<string> = ['$rootScope', 'hubProxyService'];

        constructor(private $rootScope: ng.IRootScopeService, private hubProxyService: HubProxyService) {           
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
            this.hubProxy.invoke(HubEvent.Trigger);
        }

        notify() {         
            this.hubProxy.invoke(HubEvent.Notify, this.notifyMessage);
        }

        resetMessages() {
            this.broadcastMessages = [];
        }

        setHubEvents() {
            this.hubProxy.on('notify', (message: string) => {
                this.broadcastMessages.unshift(message);
                let itemCount = this.broadcastMessages.length;
                let numberToKeep = 50;
                if (itemCount > numberToKeep) {                    
                    this.broadcastMessages.splice(numberToKeep, itemCount - numberToKeep);
                }                
            });
        }

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
        }

    }

    export class PanelController implements ng.IController {

        readonly ctrlName = 'PanelController';
        panels: Panel[] = [];
        newPanel: Panel = new Panel();
        $onInit: () => void;

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