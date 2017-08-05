namespace AppSpace {

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