namespace AppSpace {

    export class AppController {

        static $inject = [];
        
        ctrlName: string;
        numList: number[] = [1, 2, 3, 4, 5];

        constructor() {
            this.ctrlName = 'AppController';
        }
        
        alertCtrlName = () => {
            alert(this.ctrlName);
        }

        alertNumbers = () => {
            this.numList.forEach((value, index) => {
                console.log(Number.isNaN(value));                
            });
        }
    }
}