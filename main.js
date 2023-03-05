var goal = document.querySelector("#goal");

var add = document.querySelector("#add");

var clear = document.querySelector("#clear");

var content = document.querySelector(".toDo-content");

var todos = [];

function addItem() {
  if (goal.value == "") {
    warning("empty");
  } else {
    //adding item to content on UI
    let item = document.createElement("div");

    item.classList.add("toDo-content-item");

    item.innerHTML = `<h3>${goal.value}</h3>
      <input placeholder='Edit Your Goal' type="text">
      <div class="toDo-content-item-buttons">
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-trash"></i>
      </div>`;
    content.appendChild(item);
    warning("add");

    //adding item to Local Storage
    todos.push(goal.value);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
    
  goal.value = "";
}

document.addEventListener('DOMContentLoaded',function(){
  if (JSON.parse(localStorage.getItem("todos")) == null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  todos.forEach(element => {
    let item = document.createElement("div");

    item.classList.add("toDo-content-item");

    item.innerHTML = `<h3>${element}</h3>
      <input placeholder='Edit Your Goal' type="text">
      <div class="toDo-content-item-buttons">
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-trash"></i>
      </div>`;
    content.appendChild(item);
  });
})

function clearAll() {
  if (document.querySelectorAll(".toDo-content-item").length < 1) {
    warning("noItem");
  } else if (confirm("All entries will be deleted, do you confirm?") == true) {
    document.querySelectorAll(".toDo-content-item").forEach((item) => {
      item.remove();
      warning("clean");
    });

    localStorage.clear();

  }
}

function itemButtons(e) {
  if (e.target.classList.contains("fa-pen-to-square")) {
    let fixText = e.target.parentElement.previousElementSibling;

    let itemText =
      document.querySelector('h3');

    fixText.classList.toggle("active");
    itemText.innerHTML = fixText.value;
    fixText.value = "";
  } else if (e.target.classList.contains("fa-trash")) {
    if (confirm("The goal will be deleted, do you confirm?") == true) {
      
      e.target.parentElement.parentElement.remove();
      warning("delete");

      todos.forEach((todo,index)=>{
        if(todo == e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML){
          localStorage.clear("todos")
          todos.splice(index,1);
          localStorage.setItem("todos",JSON.stringify(todos));
         }
      })


    }
  }
}

function warning(process) {
  let notice = document.querySelector(".notice");

  notice.classList.add("active");

  if (process == "add") {
    notice.value;
  } else if (process == "delete") {
    notice.value = "The goal has been deleted succesfully!";
    notice.style.backgroundColor = "lightcoral";
  } else if (process == "clean") {
    notice.value = "All goals have deleted successfully!";
    notice.style.backgroundColor = "tomato";
  } else if (process == "empty") {
    notice.value = "Please type to add!";
    notice.style.backgroundColor = "blanchedalmond";
  } else if (process == "noItem") {
    notice.value = "There is no item to clean up!";
    notice.style.backgroundColor = "blanchedalmond";
  }

  setTimeout(() => {
    notice.classList.remove("active");
  }, 1500);
}

add.addEventListener("click", addItem);

clear.addEventListener("click", clearAll);

content.addEventListener("click", itemButtons);
