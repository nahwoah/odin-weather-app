import { Project } from "./project.js";
import { ToDo } from "./toDo.js";


const projectList = []

function addToProjects(title) {
  const project = new Project(title)
  projectList.push(project)
}

const defaultProject = "Default Project";
addToProjects(defaultProject)

let activeProject = projectList[0];
let selectedTodoId = null;


function pushToDo(title, description, duedate, notes) {

  const todo = new ToDo(title, description, duedate, notes)  // (add_title.value, add_description.value, add_duedate.value, add_notes.value)
  activeProject.addTodo(todo)

}

function setActiveProject(project) {
  activeProject = project
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function saveList() {
  localStorage.setItem("list", JSON.stringify(projectList))
}

function loadList() {
  if (localStorage.getItem("list") !== null) {
    let list = JSON.parse(localStorage.getItem("list"))
    projectList.splice(0, projectList.length, ...list)
    projectList.forEach(item => (
      item.addTodo = function (todo) {
        this.toDoList.push(todo);
      }
    ))
    for (let projects of projectList) {
      for (let todo of projects.toDoList) {
        todo.changeCompleted = function () {
          if (!this.completed) {
            this.completed = true;
          } else {
            this.completed = false;
          }
        }
      }
    }

  }
  // Project.prototype.addTodo = function(todo){
  //   this.toDoList.push(todo);
  // }
}

export { projectList, addToProjects, activeProject, pushToDo, setActiveProject, storageAvailable, loadList, saveList }