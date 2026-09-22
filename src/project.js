class Project {
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.toDoList = []
    }

    addTodo(todo) {
        this.toDoList.push(todo);
    }
}



export { Project }