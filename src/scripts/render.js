import { state, projects} from "./application.js"

export function renderAllTasks() {
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

    // Get the list of tasks in the current project as an array
    const tasks = projects[projIdx].getList();

    // If there are no tasks in the current project
    if(tasks.length == 0){
        const emptyMsg = document.createElement("h2");
        emptyMsg.setAttribute("id", "emptyMessage");
        emptyMsg.textContent = "Create a task!"
        taskContainer.append(emptyMsg);
        return;
    }

    // If there are tasks, render each task.
    for(let i = 0; i < tasks.length; i++){
        renderTask(tasks[i]);
    }
}

// Add all necessary elements, and their events, of a task to the DOM.
function renderTask(task){
    const taskContainer = document.getElementById("taskContainer");
    const oldTask = document.querySelector(".task." + task.getId());

    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task " + task.getId());

    // Render title, priority, brief regardless if the task is expanded or not
    const title = renderTitle(task);
    const priority = renderPriority(task);
    const brief = renderBrief(task);

    // If the task is expanded render additional information.
    if(task.isExpanded()){
        
    }

    taskDiv.appendChild(title);
    taskDiv.appendChild(priority);
    taskDiv.appendChild(brief);

    
    // If the task is in the DOM, remove it from the DOM, update the information, and add it back.
    if(oldTask != null){
        oldTask.replaceWith(taskDiv);
    }else{
        taskContainer.appendChild(taskDiv);
    }
}

function renderTitle(task){
    const title = document.createElement("h2");
    title.setAttribute("class", "taskTitle");
    title.textContent = task.getTitle();
    title.addEventListener("click", () => {
        task.toggleExpand();
        renderTask(task);
    });
    return title;
}

function renderPriority(task){
    const priority = document.createElement("button");
    priority.setAttribute("class", task.getPriority().toLowerCase());
    priority.textContent = task.getPriority();
    priority.addEventListener("click", () => {
        changePriority(task)
    });
    return priority;
}

function renderBrief(task){
    const brief = document.createElement("p");
    brief.setAttribute("class", "brief");
    brief.textContent = task.getBrief();
    brief.addEventListener("click", () => {
        task.toggleExpand();
        renderTask(task);
    });
    return brief;
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
    renderAllTasks();
}

// Change priority of a given task to loop through low to medium to high
function changePriority(task){
    if(task.getPriority() == "Low"){
        task.setPriority("Medium");
    }else if(task.getPriority() == "Medium"){
        task.setPriority("High");
    }else if(task.getPriority() == "High"){
        task.setPriority("Low");
    }

    renderTask(task);
}