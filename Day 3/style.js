let button = document.querySelectorAll("button");
let list = document.querySelector(".list");
let h1 = document.querySelector("h1")
button[0].addEventListener("click", function () {
    list.innerHTML = `
    <button type="button" onclick="functionPrimary()" class="primary btn btn-primary">Primary</button>
    <button type="button" onclick="functionSecondary()" class="secondary btn btn-secondary">Secondary</button>
    <button type="button" onclick="functionSuccess()" class="success btn btn-success">Success</button>
    <button type="button" onclick="functionDanger()" class="danger btn btn-danger">Danger</button>`
})
// let primary = document.querySelector("primary")
// primary.addEventListener("click", function () {
//     h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
//     h1.classList.add("text-primary")
// })
function functionPrimary() {
    h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
    h1.classList.add("text-primary")
}
function functionSecondary() {
    h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
    h1.classList.add("text-secondary")
}
function functionSuccess() {
    h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
    h1.classList.add("text-success")
}
function functionDanger() {
    h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
    h1.classList.add("text-danger")
}
