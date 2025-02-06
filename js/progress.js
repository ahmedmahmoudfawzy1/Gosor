"https://api.gosorsolutions.com/api/tasks";

import { getTokenFromCookies } from "./cookies.js";

const token = getTokenFromCookies();
const getProgressTasks = async () => {
  const res = await fetch("https://api.gosorsolutions.com/api/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  renderProgressTasks(data.data);
};

getProgressTasks();
const loader = document.querySelector(".loader");
const containerTasks = document.querySelector(".container-tasks");
function renderProgressTasks(progressTasks) {
  console.log(progressTasks);
  progressTasks.forEach((task) => {
    const filterTasks = [];
    if (task.status === "in_progress") {
      filterTasks.push(task);
    }
    if (filterTasks && filterTasks.length > 0) {
      loader.classList.add("d-none");
      filterTasks.forEach((task) => {
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
      loader.classList.add("d-block");
      if (filterTasks.length > 0) {
        console.log("No Tasks Found");
      } else {
        loader.classList.add("d-none");
      }
    }
  });
}
