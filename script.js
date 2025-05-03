"use strict";
//variable
const inputButton = document.getElementById("taskInput"); //inputfield
const taskList = document.getElementById("taskList"); //ul task contianer

let data = [];
let counter = 0;

// Function to add a new task
const addTask = () => {
  const task = inputButton.value;
  if (task.trim() !== "") {
    // Check if the input is not empty or just spaces
    data[counter] = {
      id: counter,
      name: task,
      done: false,
    };
    counter++;
    inputButton.value = "";
    handelItem(); // Update the task list in the UI
  }
};
//detect when the Enter key is pressed
inputButton.addEventListener("keydown", (e) => {
  e.key === "Enter" && addTask();
});

// Function to create a task list item
// take 3 parameters state to check elemnt is toggle or not, index to detecet position of elemnt updated
// ريأكت ف القلب❤️
const createItemList = (task, state, index) => {
  const itemList = document.createElement("li");
  itemList.innerHTML = `
    <div
          class="d-flex justify-content-between align-items-center border-bottom py-3 px-4"
        >
          <span id="itemText" class="fs-5 w-25 ${
            state && "toggle"
          }">${task}</span>
          <div class="d-flex gap-3">
            <button class="btn btn-success text-white shadow" onclick="toggleItem(${index})">Toggle</button>
            <button class="btn btn-danger text-white shadow" onclick="deleteItem(${index})">Delete</button>
          </div>
    </div>
  `;
  return itemList; // Return the created list item
};

// Function to update[add | delete | toggle] the task list in the UI
const handelItem = () => {
  taskList.innerHTML = "";
  data.map(({ name, done }, index) => {
    taskList.appendChild(createItemList(name, done, index));
  });
};

// Function to toggle the completion state of a task
const toggleItem = (index) => {
  const itemText = document.getElementById("itemText");
  data[index].done === false
    ? (data[index].done = true)
    : (data[index].done = false);

  handelItem();
};

const deleteItem = (index) => {
  data = data.filter(({ id }) => id !== index);
  handelItem();
};

// Extra confusing logic
const timeId = setInterval(() => {
  let allDone =
    data.length > 0 && data.every((dataItem) => dataItem.done === true); // Check if all tasks are marked as done
  allDone && console.log("All tasks done!");
}, 10000);
