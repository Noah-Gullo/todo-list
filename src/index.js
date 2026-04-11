import "./styles.css"

class Task{
    constructor(title, description, dueDate, priority, notes){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        this.notes = notes;
    }

    getCompletionStatus(){
        return this.complete;
    }

    toggleComplete(){
        this.complete = !this.complete;
    }
}

class Project{
    constructor(name, icon, todoList){
        this.name = name;
        if(icon){
            this.icon = icon;
        }
        this.todoList = todoList;
    }
}