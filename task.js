let count = 1;
let completedTasks = 0;

const taskArray = [];

const checkCompletedTasks = () => {
  return new Promise((resolve, reject) => {
    if (completedTasks >= 5) {
      const para = document.getElementById("congragulation-para");
      para.classList.remove("d-none");
      para.textContent = `Congragulations, you have completed ${completedTasks} tasks...`;
      resolve();
    }
  });
};

const handleCheckboxClick = (checkBox, index) => {
  checkBox.disabled = true;
  taskArray[index].completed = true;
  renderTask();
};

const capitalizeTask = (task) => {
  return task[0].toUpperCase() + task.slice(1);
};

const renderTask = () => {
  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = "";
  taskArray.forEach((task, index) => {
    const tr = document.createElement("tr");

    const tdUserId = document.createElement("td");
    tdUserId.textContent = index + 1;

    const tdTitle = document.createElement("td");

    tdTitle.textContent = capitalizeTask(task.title);
    tdTitle.classList.add("fw-bold");
    tdTitle.style.display = "flex";
    tdTitle.style.gap = "10px";

    const tdStatus = document.createElement("td");
    tdStatus.classList.add("fw-bold");
    if (task.completed) {
      tdStatus.textContent = "Completed";
      tdStatus.classList.add("text-success");
    } else {
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.id = `checkbox-${index}`;
      checkBox.className = "form-check-input";
      checkBox.addEventListener("click", () =>
        handleCheckboxClick(checkBox, index)
      );
      tdTitle.appendChild(checkBox);
      tdStatus.textContent = "Not Completed";
      tdStatus.classList.add("text-danger");
    }

    tr.appendChild(tdUserId);
    tr.appendChild(tdTitle);
    tr.appendChild(tdStatus);
    taskList.appendChild(tr);
    completedTasks = taskArray.filter((el) => el.completed === true).length;
    checkCompletedTasks();
  });
};

async function getTask() {
  const url = `https://jsonplaceholder.typicode.com/todos/${count}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Response Status: ${res.status}`);
  }

  const json = await res.json();
  taskArray.push(json);
  console.log(json);
  count++;
  renderTask();
}

document.querySelector("#addTaskBtn").addEventListener("click", getTask);
