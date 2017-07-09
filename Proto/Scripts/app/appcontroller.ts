namespace AppSpace {

    export class AppController {
        $onInit = () => { }; // needed to bypass weak type check
        static $inject = [];
        
        readonly ctrlName: string = 'AppController';
        panels: Panel[] = [];
        newPanel: Panel = new Panel();

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

    export class Panel {

        added: Date = new Date();
        isEditMode: boolean = false;

        constructor(public title?: string, public content?: string) { }

        addedString = () => {
            return this.added.toLocaleString();
        }

        toggleEdit() {
            this.isEditMode = this.isEditMode ? false : true;
        }

        save() {
            this.isEditMode = false;
        }
    }
}