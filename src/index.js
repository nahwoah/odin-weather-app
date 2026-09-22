"use strict";
import "./style.css";
import { drawProjects, clearContainer, drawToDos, drawPlusToDo, homeBtn, sidepanel, delProjectBtn } from "./dom.js";

import { pushToDo, addToProjects, projectList, activeProject, setActiveProject, storageAvailable, loadList, saveList } from "./application.js";


const pageTitle = document.querySelector("#page-title")
const newProjectDialog = document.querySelector("#new-project")
const addProjectSubmit = newProjectDialog.querySelector("#add-project-submit");
const projectTitle = newProjectDialog.querySelector("#project-title");



const newitem = document.getElementById('new-item');
const submit = newitem.querySelector('#submitBtn');
const add_title = newitem.querySelector('#add-title');
const add_description = newitem.querySelector('#add-description');
const add_duedate = newitem.querySelector("#add-due-date")
const add_notes = newitem.querySelector('#add-notes');
const add_completed = newitem.querySelector('#add-completed');

// localStorage.clear();
// console.log(localStorage.getItem("list"))
loadList()


if (storageAvailable("localStorage")) {
  saveList()
}

sidepanel.onchange = saveList;

drawProjects(projectList, setActiveProject)


homeBtn.addEventListener("click", function () {

  sidepanel.remove();
  drawProjects(projectList, setActiveProject)
  delProjectBtn.remove()
  pageTitle.textContent = "All Projects"

})

delProjectBtn.addEventListener("click", function () {
  let index = projectList.indexOf(activeProject)
  if (index > -1) { // only splice array when item is found
    projectList.splice(index, 1); // 2nd parameter means remove one item only
  }
  if (storageAvailable("localStorage")) {
    saveList()
  }
  clearContainer()
  sidepanel.remove();
  drawProjects(projectList, setActiveProject, activeProject)
  delProjectBtn.remove()
  pageTitle.textContent = "All Projects"
})


addProjectSubmit.addEventListener("click", function (e) {

  e.preventDefault()


  addToProjects(projectTitle.value)
  drawProjects(projectList, setActiveProject, activeProject)

  newProjectDialog.close();
  if (storageAvailable("localStorage")) {
    saveList()
  }
  projectTitle.value = '';

  console.log(projectList)
})

submit.addEventListener("click", function (e) {

  e.preventDefault()

  clearContainer()
  pushToDo(add_title.value, add_description.value, add_duedate.value, add_notes.value)
  drawToDos(activeProject)
  drawPlusToDo()
  if (storageAvailable("localStorage")) {
    saveList()
  }

  newitem.close();
  add_title.value = '';
  add_description.value = '';
  add_duedate.value = '';
  add_notes.value = '';
  add_completed.checked = false;

})
