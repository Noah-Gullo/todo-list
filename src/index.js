import "./styles.css"

class Task{
    #title;
    #description;
    #duedate;
    #priority;
    #expanded = false;
    #complete = false;
    #notes;

    constructor(title, description, dueDate, priority, notes){
        if(!new.target){
            throw new TypeError("Called Task constructor without new");
        }
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    getCompletionStatus(){
        return this.complete;
    }

    toggleComplete(){
        this.complete = !this.complete;
    }

    toggleExpand(){
        this.expanded = !this.expanded;
    }
}

class Project{
    #name;
    #icon;
    #todolist
    
    constructor(name, icon, todoList){
        if(!new.target){
            throw new TypeError("Called Project constructor without new");
        }
        this.name = name;
        if(icon){
            this.icon = icon;
        }
        this.todoList = todoList;
    }
}

const a = new Task("a", "b", "c", "d", "e");
a.title;