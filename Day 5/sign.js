let btn = document.querySelector(".btn")
let errorEmail = document.querySelector(".errorEmail")
let errorPassword = document.querySelector(".errorPassword")
let input = document.querySelectorAll("input")
let inputEmail = input[0]
let inputPassword = input[1]
const account = {
    email: "Kaka",
    password: "ITCT2",
}
btn.addEventListener("click", function () {
    if (inputEmail.value == account.email && inputPassword.value == account.password) {
        errorEmail.innerText = ""
        errorPassword.innerText = ""
        location.href = "index.html"
        localStorage.setItem("user", account.email)
    }
    else if (inputEmail.value == "" && inputPassword.value == "") {
        errorEmail.innerText = ""
        errorPassword.innerText = ""
        errorEmail.innerText = "Please write your email"
        errorPassword.innerText = "Please write your password"
    }
    else if (inputEmail.value == "" && inputPassword.value != "") {
        errorEmail.innerText = ""
        errorPassword.innerText = ""
        errorEmail.innerText = "Please write your email"
    }
    else if (inputEmail.value != "" && inputPassword.value == "") {
        errorEmail.innerText = ""
        errorPassword.innerText = ""
        errorPassword.innerText = "Please write your password"
    }
    else {
        errorEmail.innerText = "Incorrect email or password"
        errorPassword.innerText = "Incorrect email or password"
    }
})