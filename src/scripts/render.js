import { projects, tasks } from "./application.js"

export function renderTasks() {
    const taskContainer = document.getElementById("taskContainer");
    for(let i = 0; i < tasks.length; i++){
        const title = document.createElement("p");
        title.textContent = tasks[i].getTitle();
        
        taskContainer.appendChild(title);
    }
}

export function renderProjects(){
    const projectContainer = document.getElementById("projectContainer");
    for(let i = 0; i < projects.length; i++){
        const name = document.createElement("p");
        name.textContent = projects[i].getName();
        
        projectContainer.appendChild(name);
    }
}