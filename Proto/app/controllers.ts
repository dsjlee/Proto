namespace AppSpace {

    export class AppController implements ng.IController {

        readonly ctrlName: string;
        hubProxy: HubProxy;        
        hubStatus: string;
        broadcastMessage: string;
        notifyMessage: string;
        //$onInit: () => void;

        static $inject: Array<string> = ['$rootScope', 'hubProxyService'];

        constructor(private $rootScope: ng.IRootScopeService, private hubProxyService: HubProxyService) {
            this.ctrlName = 'AppController';

            this.hubProxy = this.hubProxyService.createHubProxy("BroadcastHub");

            this.hubProxy.on('notify', (message: string) => {
                this.broadcastMessage = message;
            });
        }

        $onInit() {
            this.hubProxyService.start((data: any) => {
                this.hubStatus = 'hub started.';
            });
        }

        trigger() {
            this.hubProxy.invoke("Trigger");
        }

        notify() {
            this.hubProxy.invoke("Notify", this.notifyMessage);
        }
    }

    export class PanelController implements ng.IController {

        readonly ctrlName: string = 'PanelController';
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