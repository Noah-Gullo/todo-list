import { state, projects, addProject, deleteTask, deleteProject, deleteAllProjects} from "./application.js"

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
    const oldTask = document.querySelector("#" + task.getId() + ".task");

    const taskDiv = setupTaskDiv(task);

    const taskInfoDiv = document.createElement("div"); 
    taskInfoDiv.setAttribute("class", "infoDiv");

    const taskInputDiv = document.createElement("div");
    taskInputDiv.setAttribute("class", "taskInput");

    // Render title, priority, brief regardless if the task is expanded or not
    const priorityDateDiv = document.createElement("div");
    priorityDateDiv.setAttribute("class", "dateFlexContainer");

    const title = renderTitle(task);
    const priority = renderPriority(task);
    const date = renderDate(task);
    const brief = renderBrief(task);

    priorityDateDiv.appendChild(priority);
    priorityDateDiv.appendChild(date);

    taskInfoDiv.appendChild(title);
    taskInfoDiv.appendChild(priorityDateDiv);
    taskInfoDiv.appendChild(brief);

    const deleteButton = renderDeleteTask(task);
    const complete = renderComplete(task);

    taskInputDiv.appendChild(deleteButton);
    taskInputDiv.appendChild(complete);

    // If the task is expanded render additional information.
    if(task.isExpanded()){
        const description = renderDescription(task);

        taskInfoDiv.appendChild(description);
    }

    taskDiv.appendChild(taskInfoDiv);
    taskDiv.appendChild(taskInputDiv);

    // If the task is in the DOM, remove it from the DOM, update the information, and add it back.
    if(oldTask != null){
        oldTask.replaceWith(taskDiv);
    }else{
        taskContainer.appendChild(taskDiv);
    }
}

// Returns a taskDiv to contain all elements of the task
function setupTaskDiv(task){
    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task " + task.isComplete());
    taskDiv.setAttribute("id", task.getId());
    taskDiv.addEventListener("click", () => {
        task.toggleExpand();
        renderTask(task);
    });
    
    return taskDiv;
}

// Return the title text element of a task
function renderTitle(task){
    const title = document.createElement("h2");
    title.setAttribute("class", "taskTitle");
    title.textContent = task.getTitle();
    return title;
}

// Return the priority button of a task
function renderPriority(task){
    const priority = document.createElement("button");
    priority.setAttribute("class", task.getPriority().toLowerCase());
    priority.textContent = task.getPriority();
    priority.addEventListener("click", () => {
        /*  Toggle expand to retain original expand status. Clicking on div changes it,
            but changing priority shouldn't change expand status. */
        task.toggleExpand();
        changePriority(task);
    });
    return priority;
}

// Return the due date text of a task
function renderDate(task){
    const date = document.createElement("p");
    date.setAttribute("class", "date");
    date.textContent = task.getDate();
    return date;
}

// Return the brief description text of a task
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

// Return the complete description text of a task
function renderDescription(task){
    const description = document.createElement("p");
    description.setAttribute("class", "description");
    description.textContent = task.getDescription();
    return description;
}

function renderDeleteTask(task){
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.setAttribute("class", "delete");
    deleteButton.addEventListener("click", () => {
        task.toggleExpand();
        document.getElementById(task.getId()).remove();

        deleteTask(task);
        task = null;
        renderAllTasks();
    });
    return deleteButton;
}

// Return checkbox for completion status;
function renderComplete(task){
    const complete = document.createElement("button");
    complete.setAttribute("class", "complete");
    if(task.isComplete()){
        complete.textContent = "X"
    }else{
        complete.textContent = " ";
    }
    complete.addEventListener("click", () =>{
        task.toggleExpand();
        task.toggleComplete();
    })
    return complete;
}

// Display all projects in a top-down list
export function renderProjects(){
    const projectContainer = document.getElementById("projectContainer");
    projectContainer.replaceChildren();
    for(let i = 0; i < projects.length; i++){
        const project = projects[i];
        const projectDiv = document.createElement("div");        

        if(project.getName() === "Home"){
            projectDiv.setAttribute("id", "Home");
        }

        projectDiv.setAttribute("class", "project");

        if(project.getName() === state.currProject){
            projectDiv.setAttribute("class", "project current");
        }

        const icon = document.createElement("img");
        icon.src = project.getIcon();
        const name = document.createElement("button");
        name.setAttribute("class", "name");
        name.textContent = project.getName();
        name.addEventListener("click", () => switchProjects(project.getName()));

        projectDiv.appendChild(icon);
        projectDiv.appendChild(name);
        if(project.getName() != "Home"){
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.setAttribute("class", "delete");
            deleteButton.addEventListener("click", () =>{
                deleteProject(project);
                renderProjects();
                switchProjects(state.currProject);
            });
            projectDiv.appendChild(deleteButton);
        }else{
            const deleteAllButton = document.createElement("button");
            deleteAllButton.setAttribute("id", "deleteAll");
            deleteAllButton.addEventListener("click", () => deleteAllProjects());
            deleteAllButton.textContent = "Remove Projects";
            projectDiv.appendChild(deleteAllButton);
        }

        projectContainer.appendChild(projectDiv);
    }
}

// When a project button is clicked, change the title and render all associated tasks
export function switchProjects(projectName){
    const title = document.getElementById("projectTitle");
    state.currProject = projectName;
    title.textContent = projectName;
    renderAllTasks();
    renderProjects();
}

function addNewProject(){
    const newProjectName = document.querySelector("#newNameField").value;
    let error = addProject(newProjectName);
    if(error === false){
        renderProjects();
        switchProjects(newProjectName);
    }
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

const addProjectButton = document.querySelector("#addProject > button");
addProjectButton.addEventListener("click", () => addNewProject());

