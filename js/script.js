import { getTokenFromCookies } from "./cookies.js";

const token = getTokenFromCookies();
if (token === undefined) {
  window.location.href = "/register.html";
}

const userInfo = JSON.parse(localStorage.getItem("userName"));
const userName = document.querySelector(".task_header");
if (!userInfo) {
  userName.textContent = `Good Morning, "User Name" 👋 `;
} else {
  const accountCreated = document.querySelector(".date");
  accountCreated.textContent = `${userInfo.created_at.slice(0, 10)}`;
  userName.textContent = `Good Morning, ${userInfo.name || "User Name"} 👋 `;
}

// datepicker
flatpickr("#datepicker", {
  inline: true,
  enableTime: true,
  defaultDate: "today",
  format: "YYYY-MM-DD",
  time: false,
});

const datePickerInput = document.querySelector("#datepicker");

datePickerInput.addEventListener("change", () => {
  console.log(datePickerInput.value.split(" ")[0]);
});

// create New Task
const createTaskBtn = document.querySelector(".create-task-btn");
createTaskBtn.addEventListener("click", () => {
  const taskName = document.querySelector("#taskName");
  const taskDescription = document.querySelector("#note");
  const taskData = document.querySelector(".flatpickr-input");
  const taskDateFormat = new Date(taskData.value).toISOString().split("T")[0];

  console.log(`${taskData.value}`);
  fetch("https://api.gosorsolutions.com/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: taskName.value,
      description: taskDescription.value,
      delivery_date: taskDateFormat,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      Swal.fire({
        title: "Task Created Successfully",
        icon: "success",
        confirmButtonText: "Done",
        customClass: {
          confirmButton: "main-btn",
        },
      });
      getAllTasks();
    });
});

// Render All Tasks

function renderTasks(tasks) {
  if (tasks) {
    document.querySelector(".loader").style.display = "none";
  } else {
    document.querySelector(".loader").style.display = "block";
  }
  const containerTasks = document.querySelector(".container-tasks");
  if (tasks && tasks.length > 0) {
    tasks.forEach((task) => {
      console.log(task);
      containerTasks.innerHTML += ` 
 <div class="col-12 col-lg-4">
  <div class="task">
    <div class="task-header">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
    </div>
  <div class="d-flex align-items-center justify-content-between">
    <div class="task-date">
      <p class="m-0 task-day">${task.createdAt}</p>
      <p class="m-0 task-date">${task.deliveryDate}</p>
    </div>
    <div class="task-status">
      <p class="m-0 task-status">${task.status}</p>
      <p
        type="button"
        class="update-task-status m-0"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Change Status
      </p>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdrop"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdrop">
                Change Task Status
              </h5>
              <button
                type="button"
                class="btn-close-custom"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div class="container">
              <div class="row g-3 py-3">
                <div class="col-6">
                  <div class="new_task p-3 mt-3">
                    <div class="d-flex gap-3 border-bottom">
                      <div class="image">
                        <img
                          src="/images/new-task icon.png"
                          alt=""
                        />
                      </div>
                      <div>
                        <h6 class="task-title">New Tasks</h6>
                        <p class="task-description">12 Task</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div
                          class="d-flex align-items-center gap-2 py-2"
                        >
                          <span class="dote"></span>
                          <h4 class="m-0 task-title">
                            Last Task
                          </h4>
                        </div>
                        <p class="task-description">
                          Today 12:30 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="in_progress p-3 mt-3">
                    <div class="d-flex gap-3 border-bottom">
                      <div class="image">
                        <img
                          src="/images/profile icon.png"
                          alt=""
                        />
                      </div>
                      <div>
                        <h6 class="task-title">In Progress</h6>
                        <p class="task-description">12 Task</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div
                          class="d-flex align-items-center gap-2 py-2"
                        >
                          <span class="dote"></span>
                          <h4 class="m-0 task-title">
                            Last Task
                          </h4>
                        </div>
                        <p class="task-description">
                          Today 12:30 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="completed p-3 mt-3">
                    <div class="d-flex gap-3 border-bottom">
                      <div class="image">
                        <img
                          src="/images/completed icon.png"
                          alt=""
                        />
                      </div>
                      <div>
                        <h6 class="task-title">Completed</h6>
                        <p class="task-description">12 Task</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div
                          class="d-flex align-items-center gap-2 py-2"
                        >
                          <span class="dote"></span>
                          <h4 class="m-0 task-title">
                            Last Task
                          </h4>
                        </div>
                        <p class="task-description">
                          Today 12:30 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="out-dated p-3 mt-3">
                    <div class="d-flex gap-3 border-bottom">
                      <div class="image">
                        <img src="/images/outDated.png" alt="" />
                      </div>
                      <div>
                        <h6 class="task-title">Out Dated</h6>
                        <p class="task-description">12 Task</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div
                          class="d-flex align-items-center gap-2 py-2"
                        >
                          <span class="dote"></span>
                          <h4 class="m-0 task-title">
                            Last Task
                          </h4>
                        </div>
                        <p class="task-description">
                          Today 12:30 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </div>
</div>
      
      `;
    });
  } else {
    document.querySelector(".no-tasks").style.display = "flex";
  }
}

const getAllTasks = async () => {
  const res = await fetch("https://api.gosorsolutions.com/api/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  renderTasks(data.data);
};

getAllTasks();
