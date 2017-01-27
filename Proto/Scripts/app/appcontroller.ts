namespace AppSpace {

    export class AppController {

        static $inject = [];
        
        ctrlName: string;

        constructor() {
            this.ctrlName = 'AppController';
        }
        
        alertCtrlName = () => {
            alert(this.ctrlName);
        }
    }
}