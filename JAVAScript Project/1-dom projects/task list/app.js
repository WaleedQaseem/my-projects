const filterInput = document.querySelector("#filter");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const clearTask = document.querySelector(".clear-tasks");
const collection = document.querySelector(".collection");

taskForm.addEventListener("submit", taskFormFunction);
filterInput.addEventListener("keyup", filterHandler);
clearTask.addEventListener("click", clearTaskHandler);
document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);

function taskFormFunction(event) {
    event.preventDefault();
    if(taskInput.value == "") {
      alert("task input field is requried");
      return;
    }

    collection.innerHTML += `<li class="collection-item">${taskInput.value}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a></li>`;
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";
    bindAllDeleteBtns();


}
function clearTaskHandler(event) {
    event.preventDefault();
    if(confirm("are you sure")) {
        collection.innerHTML = "";
        localStorage.removeItem("tasks");
    }
}
function filterHandler(event) {
    event.preventDefault();
    const currentElement = event.target;
    const filterValue = currentElement.value.toLowerCase();
    const collectionItems = document.querySelectorAll(".collection-item");
    if (collectionItems.length > 0) {
        collectionItems.forEach(function (singleItem, index) {
        const taskValue = singleItem.innerText.toLowerCase();
        if (taskValue.indexOf(filterValue) == -1) {
            singleItem.style.display = "none";
        } else {
            singleItem.style.display = "block";
        }
        });
    }
}
 function storeTaskInLocalStorage(taskInputValue) {
     let tasks = [];
     if (localStorage.getItem("tasks") != null) {
         tasks = JSON.parse(localStorage.getItem("tasks"));
        }

         console.log("update array of tasks", [...tasks]);
         tasks.push(taskInputValue);
         
       localStorage.setItem("tasks", JSON.stringify(tasks));
     
 }

   function getTasksFromLocalStorage() {
     let tasks = [];
     if (localStorage.getItem("tasks") != null) {
         tasks = JSON.parse(localStorage.getItem("tasks"));
     }

     if(tasks.length > 0) {
         tasks.forEach(function (singleItem, index) {
             collection.innerHTML += `<li class="collection-item">${singleItem}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a></li>`;
         });
     }
     bindAllDeleteBtns();
 } 

  function bindAllDeleteBtns(){
     const allLinks = document.querySelectorAll(".delete-item");
     if(allLinks.length > 0) {
    allLinks.forEach(function (singleItem, index) {
      singleItem.addEventListener("click", function (event) {
        event.preventDefault();
        const currentElement = event.target;
        if (confirm("Are You Sure?")) {
        const liElement = currentElement.parentElement.parentElement;
        removeTaskFromLocalStorage(liElement.innerText);
        liElement.remove();

        }
      });
    });

    }
 }
function removeTaskFromLocalStorage(findTaskValue) {
    let tasks = [];
    if (localStorage.getItem("tasks") != null) {
     tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    if (tasks.length > 0) {
        tasks.forEach(function (singleItem, index) {
       if (singleItem == findTaskValue) {
           tasks.splice(index, 1);
       }
     });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}