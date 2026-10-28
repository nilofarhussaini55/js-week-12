
const taskList = document.getElementById("taskList");

// ساخت دکمه Edit برای هر تسک موجود
const tasks = taskList.querySelectorAll("li");

tasks.forEach(function (task, index) {
    task.dataset.taskId = task.dataset.taskId || index + 1;

    if (!task.querySelector(".edit-btn")) {
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.classList.add("edit-btn");
        editButton.dataset.action = "edit";

        task.append(editButton);
    }
});

// Event Delegation برای کلیک روی دکمه‌ها
taskList.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button || !taskList.contains(button)) {
        return;
    }

    if (button.dataset.action !== "edit") {
        return;
    }

    const task = button.closest("li");
    const taskText = task.querySelector(".task-text");

    // جلوگیری از ساختن چند input برای یک تسک
    if (!taskText || task.querySelector("input")) {
        return;
    }

    // ساخت input با متن فعلی تسک
    const input = document.createElement("input");

    input.type = "text";
    input.value = taskText.textContent;
    input.dataset.action = "edit-input";
    input.dataset.taskId = task.dataset.taskId;

    // حذف متن قبلی و اضافه کردن input
    taskText.remove();
    task.append(input);

    input.focus();
    input.select();
});

// Event Delegation برای ذخیره با کلید Enter
taskList.addEventListener("keydown", function (event) {
    if (
        event.target.tagName !== "INPUT" ||
        event.target.dataset.action !== "edit-input" ||
        event.key !== "Enter"
    ) {
        return;
    }

    const input = event.target;
    const task = input.closest("li");
    const editButton = task.querySelector(".edit-btn");

    // ساخت عنصر جدید برای نمایش متن تسک
    const newTaskText = document.createElement("span");

    newTaskText.classList.add("task-text");
    newTaskText.textContent = input.value.trim() || input.value;

    // حذف input و برگرداندن متن تسک
    input.remove();
    task.insertBefore(newTaskText, editButton);
});
