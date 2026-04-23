import { state, projects, tasks } from "./application.js"

export function renderTasks(projectName) {
    const taskContainer = document.getElementById("taskContainer");
    let projIdx = 0;

    for(let i = 0; i < projects.length; j++){
        if(projects[i].getName() === state.currProject){
            projIdx = i;
            break;
        }
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