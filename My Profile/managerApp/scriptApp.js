let maps = JSON.parse(localStorage.getItem("maps")) || { "Lưu ý": [] };
let currentMap = localStorage.getItem("currentMap") || "Lưu ý";
const taskSpacing = 120;

document.body.style.color = "white";
document.body.style.fontFamily = "Arial, sans-serif";
// Option xóa bỏ của chuột phảiphải
document.addEventListener("DOMContentLoaded", () => {
    const contextMenu = document.createElement("ul");
    contextMenu.id = "contextMenu";
    contextMenu.style.position = "absolute";
    contextMenu.style.display = "none";
    contextMenu.style.background = "#2b2b2b";
    contextMenu.style.color = "white";
    contextMenu.style.padding = "3px 0";
    contextMenu.style.borderRadius = "5px";
    contextMenu.style.zIndex = "99999";
    contextMenu.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
    contextMenu.style.listStyle = "none";
    document.body.appendChild(contextMenu);

    let targetElement = null;

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        targetElement = event.target;

        if (targetElement.classList.contains("task") || targetElement.classList.contains("map-button")) {
            contextMenu.innerHTML = `
                <li id="editOption" class="context-item">✏️ Chỉnh sửa</li>
                <li id="deleteOption" class="context-item">❌ Xóa bỏ</li>
            `;
            contextMenu.style.left = `${event.pageX}px`;
            contextMenu.style.top = `${event.pageY}px`;
            contextMenu.style.display = "block";
        }
    });

    document.addEventListener("click", () => {
        contextMenu.style.display = "none";
    });

    contextMenu.addEventListener("click", (event) => {
        if (event.target.id === "deleteOption" && targetElement) {
            if (targetElement.classList.contains("task")) {
                const taskIndex = maps[currentMap].findIndex(task => task.title === targetElement.innerText);
                if (taskIndex !== -1) {
                    maps[currentMap].splice(taskIndex, 1);
                    saveMaps();
                    renderTasks();
                }
            } else if (targetElement.classList.contains("map-button")) {
                const mapName = targetElement.innerText;
                delete maps[mapName];
                const mapKeys = Object.keys(maps);
                currentMap = mapKeys.length > 0 ? mapKeys[0] : "Lưu ý";
                saveMaps();
                renderMapButtons();
                renderTasks();
            }
            contextMenu.style.display = "none";
        }

        if (event.target.id === "editOption" && targetElement) {
            if (targetElement.classList.contains("task")) {
                const taskIndex = maps[currentMap].findIndex(task => task.title === targetElement.innerText);
                if (taskIndex !== -1) {
                    const newTitle = prompt("Nhập tiêu đề mới:", maps[currentMap][taskIndex].title);
                    const newDetail = prompt("Nhập chi tiết mới:", maps[currentMap][taskIndex].detail);
                    const newReward = prompt("Nhập phần thời gian tối thiểu:", maps[currentMap][taskIndex].reward);

                    if (newTitle) maps[currentMap][taskIndex].title = newTitle;
                    if (newDetail) maps[currentMap][taskIndex].detail = newDetail;
                    if (newReward) maps[currentMap][taskIndex].reward = newReward;

                    saveMaps();
                    renderTasks();
                }
            } else if (targetElement.classList.contains("map-button")) {
                const oldMapName = targetElement.innerText;
                const newMapName = prompt("Nhập tên mới cho worksheet:", oldMapName);
                if (newMapName && newMapName !== oldMapName) {
                    maps[newMapName] = maps[oldMapName];
                    delete maps[oldMapName];
                    currentMap = newMapName;
                    saveMaps();
                    renderMapButtons();
                    renderTasks();
                }
            }
            contextMenu.style.display = "none";
        }
    });

    const style = document.createElement("style");
    style.innerHTML = `
        .context-item {
            padding: 5px 15px;
            cursor: pointer;
            font-size: 12px;
            white-space: nowrap;
        }
        .context-item:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
    // Cập nhật số lượng ruby
    document.getElementById("usedGreen").value = localStorage.getItem("usedGreen") || 0;
    document.getElementById("usedWhite").value = localStorage.getItem("usedWhite") || 0;

    document.getElementById("usedGreen").addEventListener("input", saveUsedRuby);
    document.getElementById("usedWhite").addEventListener("input", saveUsedRuby);

    updateRubyDisplay();
});

// 
document.head.insertAdjacentHTML("beforeend", `
<style>
    #popup {
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 1.2em;
        text-align: center;
        width: 300px;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99999;
    }
    .task {
        position: absolute;
        color: white;
        border: 2px solid white;    
        padding: 15px 20px;
        border-radius: 10px;
        font-size: 1.1em;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s, background 0.3s ease, box-shadow 0.3s ease;
        z-index: 10;
    }
    .task:hover {
        transform: scale(1.1);
    }
    .task.completed {
        background-color: limegreen !important;
        color: white !important;
        box-shadow: 0 0 20px limegreen !important;
        border-color: limegreen !important;
    }
    .connector {
        position: absolute;
        height: 5px;
        background: white;
        border-radius: 5px;
    }
    #mapContainer {
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.8);
        padding: 10px;
        border-radius: 5px;
    }
    .map-button {
        background: gray;
        color: white;
        padding: 5px 10px;
        margin: 2px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }
    .map-button.active {
        background: limegreen;
    }
</style>
`);

document.body.insertAdjacentHTML("beforeend", '<div id="mapContainer"></div>');

function getRandomX() {
    return Math.random() * (window.innerWidth - 200);
}
function addTask() {
    const taskTitle = prompt("Nhập tiêu đề nhiệm vụ:");
    if (!taskTitle) return;

    const taskDetail = prompt("Nhập chi tiết nhiệm vụ:");
    const taskReward = prompt("Nhập thời gian tối thiểu:");

    let y = maps[currentMap].length > 0
        ? Math.max(...maps[currentMap].map(task => task.y)) + taskSpacing
        : 40;

    const x = getRandomX();
    const taskData = { title: taskTitle, detail: taskDetail, reward: taskReward, x, y, completed: false };

    maps[currentMap].push(taskData);
    saveMaps();
    renderTasks();
}


function drawConnector(task1, task2) {
    const x1 = task1.offsetLeft + task1.offsetWidth / 2;
    const y1 = task1.offsetTop + task1.offsetHeight / 2;
    const x2 = task2.offsetLeft + task2.offsetWidth / 2;
    const y2 = task2.offsetTop + task2.offsetHeight / 2;

    const connector = document.createElement("div");
    connector.classList.add("connector");
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    connector.style.width = `${length}px`;
    connector.style.transform = `rotate(${angle}deg)`;
    connector.style.transformOrigin = "0 0";
    connector.style.left = `${x1}px`;
    connector.style.top = `${y1}px`;

    document.getElementById("taskContainer").appendChild(connector);
}
// Quản lý về việc in rara bảng chi tiết từng tạc vụ 
// Và hành động khi nhấn nút yes nono
function showPopup(index) {
    const task = maps[currentMap][index];
    document.getElementById("popupText").innerHTML = `
        <strong style="color:aqua">Nhiệm vụ:</strong> ${task.title}<br>
        <strong style="color:aqua">Chi tiết:</strong> ${task.detail}<br>
        <strong style="color:aqua">Thời gian tối thiểu : </strong> ${task.reward}<br>
        <strong style="color:aqua">Số sao:</strong> ${"⭐".repeat(task.stars || 0)}
    `;
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup").dataset.taskId = index;
}

function confirmTask(isConfirmed) {
    const popup = document.getElementById("popup");
    const taskIndex = popup.dataset.taskId;
    if (isConfirmed) {
        let stars = parseInt(prompt("Đánh giá nhiệm vụ (0-3 sao):"), 10);
        stars = Math.min(Math.max(stars, 0), 3); // Giới hạn trong khoảng 0-3 sao
        maps[currentMap][taskIndex].completed = true;
        maps[currentMap][taskIndex].stars = stars;
        saveMaps();
        renderTasks();
    }
    else {
        maps[currentMap][taskIndex].completed = false;
        saveMaps();
        renderTasks();
    }
    popup.style.display = "none";
}
// ****************

function saveMaps() {
    localStorage.setItem("maps", JSON.stringify(maps));
    localStorage.setItem("currentMap", currentMap);
    updateRubyDisplay();
}

function renderTasks() {
    const container = document.getElementById("taskContainer");
    container.innerHTML = "";
    let prevTask = null;
    let lastTask = null;

    (maps[currentMap] || []).forEach((task, index) => {
        // Tạo nút task
        const newTask = document.createElement("button");
        newTask.classList.add("task");
        newTask.style.position = "absolute";
        newTask.style.left = `${task.x}px`;
        newTask.style.top = `${task.y}px`;
        newTask.innerText = task.title;
        newTask.onclick = () => showPopup(index);
        if (task.completed) newTask.classList.add("completed");

        // Thêm nút vào container
        container.appendChild(newTask);

        // Kiểm tra số lượng ngôi sao
        let starCount = task.stars || 0;
        if (task.completed) {
            // Tạo một div chứa ngôi sao
            const starContainer = document.createElement("div");
            starContainer.classList.add("task-star-container");
            starContainer.style.position = "absolute";
            starContainer.style.left = `${task.x + newTask.offsetWidth + 5}px`; // Đặt bên phải nút task
            starContainer.style.top = `${task.y + 14}px`;

            // Thêm số lượng ngôi sao phù hợp
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement("span");
                star.innerText = "⭐";
                starContainer.appendChild(star);
            }

            // Thêm starContainer vào DOM
            container.appendChild(starContainer);
        }

        // Vẽ đường nối
        if (prevTask) drawConnector(prevTask, newTask);
        prevTask = newTask;
        lastTask = newTask;
    });

    // Nếu có ít nhất một nhiệm vụ, cuộn xuống phần tử cuối cùng
    if (lastTask) {
        lastTask.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function renderMapButtons() {
    const mapContainer = document.getElementById("mapContainer");
    mapContainer.innerHTML = "";
    Object.keys(maps).forEach(mapName => {
        const button = document.createElement("button");
        button.classList.add("map-button");
        if (mapName === currentMap) button.classList.add("active");
        button.innerText = mapName;
        button.onclick = () => {
            currentMap = mapName;
            saveMaps();
            renderTasks();
            renderMapButtons();
        };
        mapContainer.appendChild(button);
    });
    const addButton = document.createElement("button");
    addButton.innerText = "+";
    addButton.onclick = () => {
        const newMapName = prompt("Tên bản đồ mới:");
        if (!newMapName || maps[newMapName]) return;
        maps[newMapName] = [];
        currentMap = newMapName;
        saveMaps();
        renderTasks();
        renderMapButtons();
    };
    mapContainer.appendChild(addButton);
}

function getTotalStars(maps) {
    let totalStars = 0;
    for (const category in maps) {
        if (Array.isArray(maps[category])) {
            maps[category].forEach(task => {
                if (task.completed && task.stars) {
                    totalStars += task.stars;
                }
            });
        }
    }
    return totalStars;
}

function updateRubyDisplay() {
    let maps = JSON.parse(localStorage.getItem("maps")) || {};
    let usedGreen = parseInt(localStorage.getItem("usedGreen")) || 0;
    let usedWhite = parseInt(localStorage.getItem("usedWhite")) || 0;

    let totalStars = getTotalStars(maps);
    let rubyGreen = Math.max(totalStars - usedGreen, 0);
    let rubyWhite = Math.max(Math.round((totalStars * 5 / 3) - usedWhite), 0);

    document.getElementById("rubyGreen").textContent = rubyGreen;
    document.getElementById("rubyWhite").textContent = rubyWhite;
}

function saveUsedRuby() {
    let usedGreen = parseInt(document.getElementById("usedGreen").value) || 0;
    let usedWhite = parseInt(document.getElementById("usedWhite").value) || 0;

    localStorage.setItem("usedGreen", usedGreen);
    localStorage.setItem("usedWhite", usedWhite);

    updateRubyDisplay();
}
renderMapButtons();
renderTasks();
