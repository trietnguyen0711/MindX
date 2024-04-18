if (localStorage.getItem("user")) {
    let inform = document.querySelector(".inform").innerHTML = `
    <i class="fa-solid fa-user"></i>
    <h2>${localStorage.getItem("user")}</h2>
    `
}
else {
    let inform = document.querySelector(".inform").innerHTML = `
    <h2>SIGN IN</h2>
    `
}