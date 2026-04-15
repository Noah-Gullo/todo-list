import { tasks } from "./application.js"

export function renderTasks() {
    const taskContainer = document.getElementById("taskContainer");
    for(let i = 0; i < tasks.length; i++){
        const title = document.createElement("p");
        title.textContent = tasks[i].getTitle();
        
        taskContainer.appendChild(title);
        console.log(title);
    }
}