document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskTitle = document.getElementById("task-title");
    const taskDescription = document.getElementById("task-description");
    const taskPriority = document.getElementById("task-priority");
    const taskDueDate = document.getElementById("task-due-date");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";

            const taskInfo = document.createElement("div");
            taskInfo.innerHTML = `
                <strong>${task.title}</strong><br>
                <small>${task.description}</small><br>
                <small>Priority: ${task.priority}</small><br>
                <small>Due: ${task.dueDate}</small>
            `;
            li.appendChild(taskInfo);

            const actions = document.createElement("div");
            actions.className = "actions";

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => editTask(index));
            actions.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteTask(index));
            actions.appendChild(deleteButton);

            const toggleButton = document.createElement("button");
            toggleButton.textContent = task.completed ? "Undo" : "Complete";
            toggleButton.addEventListener("click", () => toggleTask(index));
            actions.appendChild(toggleButton);

            li.appendChild(actions);
            taskList.appendChild(li);
        });
    };

    const addTask = (title, description, priority, dueDate) => {
        tasks.push({ title, description, priority, dueDate, completed: false });
        saveTasks();
        renderTasks();
    };

    const editTask = (index) => {
        const task = tasks[index];
        const newTitle = prompt("Edit task title:", task.title);
        const newDescription = prompt("Edit task description:", task.description);
        const newPriority = prompt("Edit task priority (Low, Medium, High):", task.priority);
        const newDueDate = prompt("Edit task due date (YYYY-MM-DD):", task.dueDate);
        if (newTitle !== null && newTitle.trim() !== "") {
            tasks[index].title = newTitle;
            tasks[index].description = newDescription;
            tasks[index].priority = newPriority;
            tasks[index].dueDate = newDueDate;
            saveTasks();
            renderTasks();
        }
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = taskTitle.value.trim();
        const description = taskDescription.value.trim();
        const priority = taskPriority.value;
        const dueDate = taskDueDate.value;
        if (title) {
            addTask(title, description, priority, dueDate);
            taskTitle.value = "";
            taskDescription.value = "";
            taskPriority.value = "Low";
            taskDueDate.value = "";
        }
    });

    renderTasks();
});
