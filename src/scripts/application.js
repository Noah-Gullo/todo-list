import folder from "../images/folder.png"
export let projects = [];
export let tasks = [[]];

class Task{
    constructor(title, brief, dueDate, priority, description){
        if(!new.target){
            throw new TypeError("Called Task constructor without new");
        }

        this.title = title;
        this.brief = brief;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.expanded = false;
        this.complete = false;
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

export const state = {
    currProject: "Home",
};

function createTask(title, brief, dueDate, priority, description){
    if(title === undefined || brief === undefined || dueDate === undefined || priority === undefined || description === undefined){
            throw new Error("Missing task constructor field");
    }
    const newTask = new Task(title, brief, dueDate, priority, description);
    for(let i = 0; i < projects.length; i++){
        if(projects[i].getName() === state.currProject){
           tasks[i].push(newTask);
        }
    }

    return newTask;
}

function createProject(name, todoList){
    if(name === undefined || todoList === undefined){
        throw new Error("Missing project constructor field");
    }
    const newProject = new Project(name, todoList);

    projects.push(newProject);
    return newProject;
}

const homeProject = createProject("Home", tasks);
const testTask = createTask("Title", "Description", "5-1-23", "Low", "This is an example task.");
const workProject = createProject("Work", []);
const testTask2 = createTask("Another Title", "Another Description", "5-2-23", "High", "This is another example task.");

console.log("Tasks: ");
console.log(tasks);
console.log("Projects: ");
console.log(projects);