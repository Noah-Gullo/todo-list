import { state, projects} from "./application.js"

export function renderTasks() {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.replaceChildren();
    let projIdx = 0;

    // Loop through projects to find index of current project
    for(let i = 0; i < projects.length; i++){
        if(projects[i].getName() === state.currProject){
            projIdx = i;
            break;
        }
    }

    const tasks = projects[projIdx].getList();

    // If there are no tasks in the current project
    if(tasks.length == 0){
        const emptyMsg = document.createElement("h2");
        emptyMsg.setAttribute("id", "emptyMessage");
        emptyMsg.textContent = "Create a task!"
        taskContainer.append(emptyMsg);
        return;
    }

    // If there are tasks, render all relevant information.
    for(let i = 0; i < tasks.length; i++){
        const taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "task");
        const title = document.createElement("h2");
        title.setAttribute("class", "taskTitle");
        title.textContent = tasks[i].getTitle();
        const priority = document.createElement("button");
        priority.setAttribute("class", tasks[i].getPriority().toLowerCase());
        priority.textContent = tasks[i].getPriority();
        const brief = document.createElement("p");
        brief.setAttribute("class", "brief");
        brief.textContent = tasks[i].getBrief();

        taskDiv.appendChild(title);
        taskDiv.appendChild(priority);
        taskDiv.appendChild(brief);
        taskContainer.appendChild(taskDiv);
    }
}

// Display all projects in a top-down list
export function renderProjects(){
    const projectContainer = document.getElementById("projectContainer");
    projectContainer.replaceChildren();
    for(let i = 0; i < projects.length; i++){
        const projectDiv = document.createElement("div");
        projectDiv.setAttribute("class", "project");
        const icon = document.createElement("img");
        icon.src = projects[i].getIcon();
        const name = document.createElement("button");
        name.textContent = projects[i].getName();
        name.addEventListener("click", () => switchProjects(projects[i].getName()));

        projectDiv.appendChild(icon);
        projectDiv.appendChild(name);
        projectContainer.appendChild(projectDiv);
    }
}

// When a project button is clicked, change the title and render all associated tasks
function switchProjects(projectName){
    const title = document.getElementById("projectTitle");
    state.currProject = projectName;
    title.textContent = projectName;
    renderTasks();
}