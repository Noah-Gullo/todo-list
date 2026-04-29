import folder from "../images/folder.png"
import { renderAllTasks, renderProjects, switchProjects } from "./render.js"
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
        this.delete = false;
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
        saveData();
    }

    toggleExpand(){
        this.expanded = !this.expanded;
        saveData();
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

    removeFromList(id){
        for(let i = 0; i < this.todoList.length; i++){
            if(this.todoList[i].getId() == id){
                this.todoList.splice(i, 1);
            }
        }
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

    saveData();
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

    saveData();
}

export function addTask(){
    const title = document.getElementById("titleField").value.trimStart();
    const brief = document.getElementById("briefField").value.trimStart();
    const date = document.getElementById("dateField").value.trimStart();
    const priority = document.getElementById("priorityDropdown").value;
    const description = document.getElementById("descriptionField").value.trimStart();

    if(date != "" && brief != "" && description != "" && title != ""){
        createTask(title, brief, format(date, "MM/dd/yyyy"), priority, description);
    }
    renderAllTasks();

    saveData();
}

// Adds project given the new project's name, provided it is not a repeat of another project and meets min/max length.
export function addProject(projectName){
    if(projectName.length < 1 || projectName.length > 10 && projectName.charAt(0) != " "){
        return;
    }

    let exists = false;
    for(let i = 0; i < projects.length; i++){
        if(projects[i].getName() === projectName){
            exists = true;
        }
    }

    if(!exists){
        createProject(projectName);
        return false;
    }else{
        return true;
    }

    saveData();
}

// Removes a task from a given project
export function deleteTask(task){
    for(let i = 0; i < projects.length; i++){
        for(let j = 0; j < projects[i].getList().length; j++){ 
            if(projects[i].getList()[j].getId() === task.getId()){
                projects[i].removeFromList(task.getId());
            }
        }
    }

    saveData();
}

// Removes the project. If it is the current project transfers to the project above it.
export function deleteProject(project){
    for(let i = 0; i < projects.length; i++){
        if(project.getName() === state.currProject){
            state.currProject = projects[projects.indexOf(project) - 1].getName();
        }

        if(projects[i].getId() === project.getId()){
            projects.splice(i, 1);
        }
    }

    saveData();
}

// Removes all projects except for the default "Home" project
export function deleteAllProjects(){
    for(let i = projects.length - 1; i > 0; i--){
        deleteProject(projects[i]);
    }

    state.currProject = "Home";
    renderProjects();
    switchProjects(state.currProject);
    
    saveData();
}

export function saveData(){
    //localStorage.clear();
    localStorage.setItem("Projects", JSON.stringify(projects));
    localStorage.setItem("Current Project", state.currProject);
}

export function loadData(){
    try{
        let projectData = JSON.parse(localStorage.getItem("Projects"));
        let tempCurrProject = localStorage.getItem("Current Project");
        for(let i = 0; i < projectData.length; i++){
            createProject(projectData[i].name);
            state.currProject = projectData[i].name;
            for(let j = 0; j < projectData[i].todoList.length; j++){
                const task = projectData[i].todoList[j];
                createTask(task.title, task.brief, task.dueDate, task.priority, task.description);
            }
        }

        state.currProject = tempCurrProject;
    }catch(e){
        projects = [];
        createProject("Home");
        createProject("Work");

        state.currProject = "Home";
        createTask("Example Title", "Example description. Click on a task to expand it.",  format(new Date(2096, 7, 24), "MM/dd/yyyy"), "Low", "This is an example task. Longer descriptions can go here instead of the brief one (in gray) above.");
        createTask("Urgent Task", "Witty description here. Please be amazed.", format(new Date(2096, 3, 9), "MM/dd/yyyy"), "High", "This is an urgent task. Better complete it soon.");
        state.currProject = "Work";
        createTask("Work Task", "Another Description", format(new Date(2096, 5, 15), "MM/dd/yyyy"), "Low", "This is an example work task.");
    }

    renderProjects();
    renderAllTasks();
    switchProjects(state.currProject);
}