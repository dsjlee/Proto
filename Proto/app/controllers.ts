namespace AppSpace {

    export class AppController implements ng.IController {

        hubConnection: SignalR.Hub.Connection;
        hub: SignalR.Hub.Proxy;
        ctrlName: string;
        hubStatus: string;
        broadcastMessage: string;
        //$onInit: () => void;

        static $inject: Array<string> = [];

        constructor() {
            this.ctrlName = 'AppController';
            //this.hubConnection = $.hubConnection();
            //this.hub = this.hubConnection.createHubProxy("BroadcastHub");
            //this.hub.on('notify', (message) => {
            //    this.broadcastMessage = message;
            //});
        }

        $onInit() {
            //this.hubConnection.start().done((data) => {
            //    console.log(data);
            //    this.hubStatus = 'hub started.';
            //});
        }

        trigger() {
            this.hub.invoke("Trigger");
        }
    }

    export class PanelController implements ng.IController {

        readonly ctrlName: string = 'AppController';
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