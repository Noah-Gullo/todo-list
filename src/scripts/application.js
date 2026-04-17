import folder from "../images/folder.png"
export let projects = [];
export let tasks = [];

class Task{
    #title;
    #brief;
    #duedate;
    #priority;
    #expanded = false;
    #complete = false;

    constructor(title, brief, dueDate, priority, description){
        if(!new.target){
            throw new TypeError("Called Task constructor without new");
        }
        this.title = title;
        this.brief = brief;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
    }

    getTitle(){
        return this.title;
    }

    getPriority(){
        return this.priority;
    }

    getBrief(){
        return this.brief;
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
    
    constructor(name, todoList){
        if(!new.target){
            throw new TypeError("Called Project constructor without new");
        }
        this.name = name;
        this.icon = folder;
        this.todoList = todoList;
    }

    getName(){
        return this.name;
    }

    getIcon(){
        return this.icon;
    }
}
const testTask = new Task("Title", "Description", "5-1-23", "Low", "This is an example task.");
const testTask2 = new Task("Another Title", "Basic Description", "2-3-24", "High", "This is another example task.");

const homeProject = new Project("Home", "ICON HERE", tasks);
const workProject = new Project("Work", "ICON HERE", tasks);

tasks[0] = testTask;
tasks[1] = testTask2;

projects[0] = homeProject;
projects[1] = workProject;