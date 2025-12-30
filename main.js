const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");

const taskList = document.getElementById("task-list");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task === "") return;

  createTaskItem(taskList, task, "Send to Pending", (li) => {
    moveTask(li, pendingList, "Send to Complete", (li2) => {
      moveTask(li2, completedList, null, null);
    });
  });
  taskInput.value = "";
});
function createTaskItem(list, text, btnText, nextAction) {
  const li = document.createElement("li");
  li.dataset.task = text;
  const span = document.createElement("span");
  span.textContent = text;
  li.appendChild(span);

  if (btnText) {
    const btn = document.createElement("button");
    btn.textContent = btnText;
    btn.className = "action-btn";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      nextAction(li);
    });
    li.appendChild(btn);
  }

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn action-btn";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
  });
  li.appendChild(delBtn);

  list.appendChild(li);
}
function moveTask(li, list, btnText, nextAction) {
  const taskText = li.dataset.task;
  li.remove();
  createTaskItem(list, taskText, btnText, nextAction);
}