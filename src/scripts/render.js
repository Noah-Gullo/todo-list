import { projects, tasks } from "./application.js"

export function renderTasks() {
    const taskContainer = document.getElementById("taskContainer");
    for(let i = 0; i < tasks.length; i++){
        const taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "task");
        const title = document.createElement("p");
        title.textContent = tasks[i].getTitle();
        
        taskDiv.appendChild(title);
        taskContainer.appendChild(taskDiv);
    }
}

export function renderProjects(){
    const projectContainer = document.getElementById("projectContainer");
    for(let i = 0; i < projects.length; i++){
        const projectDiv = document.createElement("div");
        projectDiv.setAttribute("class", "project");
        const name = document.createElement("p");
        name.textContent = projects[i].getName();
        
        projectDiv.appendChild(name);
        projectContainer.appendChild(projectDiv);
    }
}