let button = document.querySelectorAll(".btn")
let identityProduct = document.querySelectorAll(".identityProduct")
let changeImg = document.querySelectorAll(".changeImg")
let price = document.querySelectorAll(".price")
for (let i = 0; i < button.length; i++) {
    let k = button[i];
    k.addEventListener("click", function () {
        location.href = "product.html"
        localStorage.setItem("typeProduct", identityProduct[i].textContent)
        localStorage.setItem("img", changeImg[i].src)
        localStorage.setItem("price", price[i].textContent)
    })
}
