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

const state = {
    currProject: "Home",
};

function createTask(title, brief, dueDate, priority, description){
    if(title === undefined || brief === undefined || dueDate === undefined || priority === undefined || description === undefined){
            throw new Error("Missing task constructor field");
    }
    const newTask = new Task(title, brief, dueDate, priority, description);
    for(let i = 0; i < projects.length; i++){
        if(projects[i] === state.currProject){
            tasks[i][0] = newTask;
        }
    }

    return newTask;
}

function createProject(name, todoList){
    if(name === undefined || todoList === undefined){
        throw new Error("Missing project constructor field");
    }
    const newProject = new Project(name, todoList);

    projects[projects.length] = newProject;
    return newProject;
}

const homeProject = createProject("Home", tasks);
const testTask = createTask("Title", "Description", "5-1-23", "Low", "This is an example task.");

tasks[0] = testTask;
projects[0] = homeProject;
