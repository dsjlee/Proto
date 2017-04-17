var AppSpace;
(function (AppSpace) {
    class AppController {
        constructor() {
            this.ctrlName = 'AppController';
            this.numList = [1, 2, 3, 4, 5];
            this.panels = [];
            this.alertCtrlName = () => {
                alert(this.ctrlName);
            };
            this.alertNumbers = () => {
                this.numList.forEach((value, index) => {
                    console.log(value);
                });
            };
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
        removePanel(index) {
            this.panels.splice(index, 1);
        }
    }
    AppController.$inject = [];
    AppSpace.AppController = AppController;
    class Panel {
        constructor(title, content) {
            this.title = title;
            this.content = content;
            this.addedString = () => {
                return this.added.toLocaleString();
            };
            this.added = new Date();
        }
    }
    AppSpace.Panel = Panel;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=appController.js.map