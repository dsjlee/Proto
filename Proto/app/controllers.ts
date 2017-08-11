namespace AppSpace {

    export class AppController implements ng.IController {

        readonly pageTitle = 'Broadcast Hub';
        hubProxy: HubProxy;        
        hubStatus: string;
        broadcastMessages: string[];
        notifyMessage: string;
        isConnecting: boolean;
        //$onInit: () => void;

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
            this.isConnecting = true;
            this.hubProxyService.start((data: any) => {
                this.isConnecting = false;
            });
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
                console.log(error);
                this.hubStatus = 'hub error occurred.';
            });
            this.hubProxyService.stateChanged((change: SignalR.StateChanged) => {
                switch (change.newState) {
                    case SignalR.ConnectionState.Connected:
                        this.hubStatus = 'Connected';
                        break;
                    case SignalR.ConnectionState.Connecting:
                        this.hubStatus = 'Connecting';
                        break;
                    case SignalR.ConnectionState.Disconnected:
                        this.hubStatus = 'Disconnected';
                        break;
                    case SignalR.ConnectionState.Reconnecting:
                        this.hubStatus = 'Reconnecting';
                        break;
                    default:
                        this.hubStatus = 'info unavailable';
                        break;
                }
            });
        }

        // get accessor
        get hubStatusColor(): string {
            let colorClass = 'text-';
            switch (this.hubProxyService.state) {
                case SignalR.ConnectionState.Connected:
                    colorClass += 'success';
                    break;
                case SignalR.ConnectionState.Connecting:
                    colorClass += 'info';
                    break;
                case SignalR.ConnectionState.Disconnected:
                    colorClass += 'danger';
                    break;
                case SignalR.ConnectionState.Reconnecting:
                    colorClass += 'warning';
                    break;
                default:
                    colorClass += 'primary';
                    break;
            }
            return colorClass;
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