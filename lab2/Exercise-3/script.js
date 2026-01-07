let taskId = 0;

function addTask() {
    const taskName = document.getElementById("taskInput").value.trim();
    if (taskName === "") return;

    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    task.id = "task" + taskId++;

    const date = new Date().toLocaleDateString();
    task.innerHTML = taskName + "<small>Created on: " + date + "</small>";

    task.addEventListener("dragstart", drag);

    document.getElementById("todo").appendChild(task);
    document.getElementById("taskInput").value = "";
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const task = document.getElementById(taskId);

    const column = event.target.closest(".column");
    column.appendChild(task);

    if (column.id === "done") {
        task.classList.add("completed");
        document.getElementById("successMsg").style.display = "block";
    } else {
        task.classList.remove("completed");
        document.getElementById("successMsg").style.display = "none";
    }
}
