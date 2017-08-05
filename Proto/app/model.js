"use strict";
var AppSpace;
(function (AppSpace) {
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
//# sourceMappingURL=model.js.map