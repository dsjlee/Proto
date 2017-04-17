namespace AppSpace {

    export class AppController {

        static $inject = [];
        
        readonly ctrlName: string = 'AppController';
        numList: number[] = [1, 2, 3, 4, 5];
        panels: Panel[] = [];

        constructor() {
            let panel = new Panel('some title', 'some content');
            this.panels.push(panel);
        }

        copyPanel() {
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

        alertNumbers = () => {
            this.numList.forEach((value, index) => {
                console.log(value);             
            });
        }
    }

    export class Panel {

        added: Date;

        constructor(public title: string, public content?: string)
        {
            this.added = new Date();
        }

        addedString = () => {
            return this.added.toLocaleString();
        }
    }
}