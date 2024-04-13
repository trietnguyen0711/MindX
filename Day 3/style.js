let button = document.querySelector("button");
let list = document.querySelector(".list");
let h1 = document.querySelector("h1")
button.addEventListener("click", function () {
    list.innerHTML = `
    <button type="button" class="primary btn btn-primary">Blue</button>
    <button type="button" class="secondary btn btn-secondary">Grey</button>
    <button type="button" class="success btn btn-success">Green</button>
    <button type="button" class="danger btn btn-danger">Red</button>`
    alert("Please choose color you want to change")
    let primary = document.querySelector(".primary")
    primary.addEventListener("click", function () {
        h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
        h1.classList.add("text-primary")
    })
    let secondary = document.querySelector(".secondary")
    secondary.addEventListener("click", function () {
        h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
        h1.classList.add("text-secondary")
    })
    let success = document.querySelector(".success")
    success.addEventListener("click", function () {
        h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
        h1.classList.add("text-success")
    })
    let danger = document.querySelector(".danger")
    danger.addEventListener("click", function () {
        h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
        h1.classList.add("text-danger")
    })
})
// function functionPrimary() {
//     h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
//     h1.classList.add("text-primary")
// }
// function functionSecondary() {
//     h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
//     h1.classList.add("text-secondary")
// }
// function functionSuccess() {
//     h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
//     h1.classList.add("text-success")
// }
// function functionDanger() {
//     h1.classList.remove("text-primary", "text-secondary", "text-success", "text-danger");
//     h1.classList.add("text-danger")
// }
