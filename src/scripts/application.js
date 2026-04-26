import folder from "../images/folder.png"
import { renderProjects, switchProjects } from "./render.js"
import {format} from "date-fns";
export let projects = [];

class Task{
    constructor(title, brief, dueDate, priority, description, randomId){
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
        this.id = randomId;
    }

    getTitle(){
        return this.title;
    }

    getPriority(){
        return this.priority;
    }
    
    getDate(){
        return this.dueDate;
    }

    setPriority(newPriority){
        this.priority = newPriority;
    }

    getBrief(){
        return this.brief;
    }

    getDescription(){
        return this.description;
    }

    isExpanded(){
        return this.expanded;
    }

    getId(){
        return this.id;
    }

    isComplete(){
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
    todoList = [];
    constructor(name, randomId){
        if(!new.target){
            throw new TypeError("Called Project constructor without new");
        }
        
        this.name = name;
        this.icon = folder;
        this.todoList = [];
        this.id = randomId;
    }

    getName(){
        return this.name;
    }

    getIcon(){
        return this.icon;
    }

    getList(){
        return this.todoList;
    }

    getId(){
        return this.id;
    }

    addToList(task){
        this.todoList.push(task);
    }
}

export const state = {
    currProject: "Home",
};

function createTask(title, brief, dueDate, priority, description){
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    if(title === undefined || brief === undefined || dueDate === undefined || priority === undefined
       || description === undefined){
            throw new Error("Missing task constructor field");
    }
    const newTask = new Task(title, brief, dueDate, priority, description, alphabet[Math.floor(Math.random() * alphabet.length)] + crypto.randomUUID());
    for(let i = 0; i < projects.length; i++){
        if(projects[i].getName() === state.currProject){
           projects[i].addToList(newTask);
        }
    }

    return newTask;
}

function createProject(name){
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    if(name === undefined){
        throw new Error("Missing project constructor field");
    }
    const newProject = new Project(name, alphabet[Math.floor(Math.random() * alphabet.length)] + crypto.randomUUID());

    projects.push(newProject);
    return newProject;
}

export function deleteProject(project){
    for(let i = 0; i < projects.length; i++){
        if(project.getName() === state.currProject){
            state.currProject = projects[projects.indexOf(project) - 1].getName();
        }

        if(projects[i].getId() === project.getId()){
            projects.splice(i, 1);
        }
    }
    renderProjects();
    switchProjects(state.currProject);
}

const homeProject = createProject("Home");
const workProject = createProject("Work");

const testTask = createTask("Example Title", "Example description. Click to expand.",  format(new Date(2096, 5, 24), "MM/dd/yyyy"), "Low", "This is an example task.");
const testTask2 = createTask("Urgent Task", "Witty description here", format(new Date(2096, 5, 9), "MM/dd/yyyy"), "High", "This is an urgent task. Better complete it soon.");
state.currProject = "Work";
const testTask3 = createTask("Work Task", "Another Description", format(new Date(2096, 5, 15), "MM/dd/yyyy"), "Low", "This is an example work task.");
state.currProject = "Home";