var AppSpace;
(function (AppSpace) {
    class AppController {
        constructor() {
            this.$onInit = () => { }; // needed to bypass weak type check
            this.ctrlName = 'AppController';
            this.panels = [];
            this.newPanel = new Panel();
            this.alertCtrlName = () => {
                alert(this.ctrlName);
            };
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
            this.added = new Date();
            this.isEditMode = false;
            this.addedString = () => {
                return this.added.toLocaleString();
            };
        }
        toggleEdit() {
            this.isEditMode = this.isEditMode ? false : true;
        }
        save() {
            this.isEditMode = false;
        }
    }
    AppSpace.Panel = Panel;
})(AppSpace || (AppSpace = {}));
//# sourceMappingURL=appcontroller.js.map