import { state, projects, tasks } from "./application.js"

export function renderTasks() {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.replaceChildren();
    let projIdx = 0;

    for(let i = 0; i < projects.length; j++){
        if(projects[i].getName() === state.currProject){
            projIdx = i;
            break;
        }
    }

    // If there are no tasks in the current project
    if(tasks[projIdx].length == 0){
        const emptyMsg = document.createElement("h2");
        emptyMsg.setAttribute("id", "emptyMessage");
        emptyMsg.textContent = "Create a task!"
        taskContainer.append(emptyMsg);
        return;
    }

    for(let i = 0; i < tasks[projIdx].length; i++){
        const taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "task");
        const title = document.createElement("h2");
        title.textContent = tasks[projIdx][i].getTitle();
        const priority = document.createElement("p");
        priority.setAttribute("class", tasks[projIdx][i].getPriority().toLowerCase());
        priority.textContent = tasks[projIdx][i].getPriority();
        const brief = document.createElement("p");
        brief.textContent = tasks[projIdx][i].getBrief();

        taskDiv.appendChild(title);
        taskDiv.appendChild(priority);
        taskDiv.appendChild(brief);
        taskContainer.appendChild(taskDiv);
    }
}

export function renderProjects(){
    const projectContainer = document.getElementById("projectContainer");
    projectContainer.replaceChildren();
    for(let i = 0; i < projects.length; i++){
        const projectDiv = document.createElement("div");
        projectDiv.setAttribute("class", "project");
        const icon = document.createElement("img");
        icon.src = projects[i].getIcon();
        const name = document.createElement("p");
        name.textContent = projects[i].getName();
        
        projectDiv.appendChild(icon);
        projectDiv.appendChild(name);
        projectContainer.appendChild(projectDiv);
    }
}