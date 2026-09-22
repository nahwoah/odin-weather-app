
export class ToDo {
    constructor(title, description, duedate, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.notes = notes;
        this.completed = false;
    }

    changeCompleted() {
        if (!this.completed) {
            this.completed = true;
        } else {
            this.completed = false;
        }
    }
}