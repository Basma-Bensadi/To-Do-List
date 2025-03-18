const inputBox = document.getElementById("input-box");
const containerList = document.getElementById("list-container");
const addbtn = document.getElementById("add-btn");

addbtn.addEventListener("click", add);
inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        add();
    }
});

function add() {
    if (inputBox.value === "") {
        alert("Write something");
    } else {
        let li = document.createElement("li");
        li.innerText = inputBox.value;
        containerList.appendChild(li);
        inputBox.value = "";

        let span = document.createElement("span");
        span.innerHTML = "x";
        li.appendChild(span);

        SaveElement();
    }
}

// Click event for marking tasks & deleting
containerList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    SaveElement();
}, false);

function SaveElement() {
    localStorage.setItem("data", containerList.innerHTML);
}

function getelement() {
    containerList.innerHTML = localStorage.getItem("data");
    
    // Re-add event listeners to all list items and spans
    document.querySelectorAll("#list-container li").forEach(li => {
        li.addEventListener("click", function () {
            li.classList.toggle("checked");
            SaveElement();
        });

        let span = li.querySelector("span");
        if (span) {
            span.addEventListener("click", function () {
                li.remove();
                SaveElement();
            });
        }
    });
}

// Dark mode toggle
let darkMode = document.getElementById("icon");
darkMode.addEventListener("click", dark);

function dark() {
    document.body.classList.toggle("darkMode");
    localStorage.setItem("mode", document.body.classList.contains("darkMode") ? "dark" : "light");
}

function savemode() {
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("darkMode");
    } else {
        document.body.classList.remove("darkMode");
    }
}

// Load saved data on page load
getelement();
savemode();
