


const body = document.querySelector("body")

const pageTitle = document.querySelector("#page-title")
const container = document.querySelector("#container");
const newProjectDialog = document.querySelector("#new-project")
const addProjectSubmit = newProjectDialog.querySelector("#add-project-submit");
const projectTitle = newProjectDialog.querySelector("#project-title");

const homeBtn = document.querySelector("#home")
const delProjectBtn = document.createElement("button")
delProjectBtn.textContent = "❌"
delProjectBtn.id = "delProjectBtn"

const sidepanel = document.createElement("div")
sidepanel.id = "sidepanel"

const newitem = document.getElementById('new-item');
const submit = newitem.querySelector('#submitBtn');
const add_title = newitem.querySelector('#add-title');
const add_description = newitem.querySelector('#add-description');
const add_duedate = newitem.querySelector("#add-due-date")
const add_notes = newitem.querySelector('#add-notes');
const add_completed = newitem.querySelector('#add-completed');

function clearContainer() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


function drawProjects(projectList, setActiveProject) {
    clearContainer()
    body.style.gridTemplateColumns = "4fr 0fr";
    container.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 0.8fr))";
    container.style.gridTemplateRows = "repeat(auto-fit, minmax(150px, 0.22fr))";
    projectList.forEach(item => {

        const btn = document.createElement("button")
        btn.textContent = item.title;
        btn.addEventListener("click", function () {

            // activeProject = projectList[projectList.indexOf(item)]
            setActiveProject(projectList[projectList.indexOf(item)])

            container.style.gridTemplateColumns = "1fr";
            // container.style.gridTemplateRows = "repeat(auto-fill, 100px)";
            container.style.gridTemplateRows = "80px";
            container.style.gridAutoRows = "80px";

            pageTitle.textContent = item.title;
            clearContainer();

            // container.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 0.8fr)) 1fr";

            drawToDos(item)
            drawPlusToDo()

        })


        container.append(btn);
    })


    const newProjectBtn = document.createElement("button");
    newProjectBtn.textContent = "+";
    newProjectBtn.classList.add("new-project-button");
    newProjectBtn.setAttribute("command", "show-modal")
    newProjectBtn.setAttribute("commandfor", "new-project")

    container.append(newProjectBtn)
}


function drawPlusToDo() {
    const newTodoBtn = document.createElement("button");
    newTodoBtn.textContent = "+";
    newTodoBtn.classList.add("new-item");
    newTodoBtn.setAttribute("command", "show-modal")
    newTodoBtn.setAttribute("commandfor", "new-item")
    container.append(newTodoBtn)
}



function drawToDos(activeProject) {

    homeBtn.after(delProjectBtn)


    activeProject.toDoList.forEach(todo => {

        const todoBtn = document.createElement("div");
        todoBtn.textContent = todo.title;


        const icon = document.createElement("button")
        icon.id = 'icon'

        if (todo.completed) {
            icon.style.color = "aquamarine"
            icon.style.background = "purple"
            icon.style.border = 'purple'
            icon.textContent = '✓'
            todoBtn.style.textDecoration = "line-through";
            todoBtn.style.color = "grey"
        }

        icon.addEventListener('mouseover', e => {
            if (!todo.completed) {
                icon.textContent = '✓' //  fallback   ✓ ✔️
                icon.style.color = 'aquamarine'
            }
        })
        icon.addEventListener('mouseleave', e => {
            if (!todo.completed) {
                icon.textContent = ''
            }

        })
        icon.addEventListener("click", (event) => {
            event.stopPropagation();
            todo.changeCompleted();
            if (todo.completed) {
                icon.style.color = "aquamarine"
                icon.style.background = "purple"
                icon.style.border = 'purple'
                icon.textContent = '✓'
                todoBtn.style.textDecoration = "line-through";
                todoBtn.style.color = "grey"
            } else {
                icon.style.color = "aquamarine"
                icon.style.background = "transparent"
                icon.style.border = '2px solid aquamarine'
                icon.textContent = ''
                todoBtn.style.textDecoration = "none";
                todoBtn.style.color = "black";
            }
        })
        todoBtn.prepend(icon)
        todoBtn.addEventListener("click", function (event) {
            sidepanel.replaceChildren();

            body.style.gridTemplateColumns = "4fr 1fr"
            // console.log(todo, todo.id)
            // selectedTodoId = todo.id

            const titleSidepanel = document.createElement("textarea")
            const descSidepanel = document.createElement("textarea")
            const dueDateSidepanel = document.createElement("input")
            dueDateSidepanel.setAttribute("type", "date");
            dueDateSidepanel.id = "spduedate";
            const notesSidepanel = document.createElement("textarea")
            const titlePara = document.createElement("div");
            titlePara.textContent = "Title";
            const descPara = document.createElement("div");
            descPara.textContent = "Description";
            const dueDatePara = document.createElement("div");
            dueDatePara.textContent = "Due Date";
            const notesPara = document.createElement("div");
            notesPara.textContent = "Notes";
            const del = document.createElement("button");


            titleSidepanel.textContent = todo.title
            descSidepanel.textContent = todo.description
            dueDateSidepanel.value = todo.duedate
            notesSidepanel.textContent = todo.notes

            del.textContent = "Delete"

            titleSidepanel.addEventListener("change", (event) => {

                todo.title = event.target.value
                titleSidepanel.textContent = todo.title
                todoBtn.innerText = todo.title;
                todoBtn.prepend(icon)
            })

            descSidepanel.addEventListener("change", (event) => {
                descSidepanel.textContent = event.target.value
                todo.description = event.target.value
            })

            dueDateSidepanel.addEventListener("change", (event) => {
                dueDateSidepanel.value = event.target.value
                todo.duedate = event.target.value
            })

            notesSidepanel.addEventListener("change", (event) => {
                notesSidepanel.textContent = event.target.value
                todo.notes = event.target.value
            })

            del.addEventListener("click", function () {
                let index = activeProject.toDoList.indexOf(todo)
                if (index > -1) { // only splice array when item is found
                    activeProject.toDoList.splice(index, 1); // 2nd parameter means remove one item only
                }
                clearContainer()
                titleSidepanel.textContent = ""
                descSidepanel.textContent = ""
                dueDateSidepanel.value = ""
                notesSidepanel.textContent = ""
                drawToDos(activeProject)
                drawPlusToDo()
            })

            sidepanel.append(titlePara, titleSidepanel, descPara, descSidepanel, dueDatePara, dueDateSidepanel, notesPara, notesSidepanel, del)
            body.appendChild(sidepanel)

        })

        container.append(todoBtn)

    })
}

export { clearContainer, drawProjects, drawToDos, drawPlusToDo, homeBtn, sidepanel, delProjectBtn }