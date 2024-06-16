// Các chức năng của header
let signUp = document.querySelector(".signUp")
if (localStorage.getItem("user")) {
    signUp.innerHTML = `<i class="fa-solid fa-user cur-pointer"></i> ${localStorage.getItem("user")}`
    signUp.addEventListener("click", function () {
        location.href = "account.html"
    })
}
else {
    signUp.addEventListener("click", function () {
        location.href = "sign.html"
    })
}
let amountProduct = document.querySelector(".amountProduct")
updateAmount()
function updateAmount() {
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        let amountBag = 0
        for (let i = 0; i < cart.length; i++) {
            amountBag += JSON.parse(cart[i].amount)
            amountProduct.innerText = amountBag
        }
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}
// Render các sản phẩm hiện tại có
let data = JSON.parse(localStorage.getItem("data"))
let inner = document.querySelector(".inner")
let html = ""
for (let i = 0; i < data.length; i++) {
    html += `
    <div class="bor-rad-nor p-3 color-black bg-white col-lg-5 col-12 mt-5">
        <img class="h-75 w-100 bor-rad-nor changeImg"
        src="${data[i].img}"
        alt="">
        <h6 style="color:red">New</h6>
        <h3 class="identityProduct">${data[i].nameProduct}</h3>
        <div class="d-flex-between w-100">
        <h5 class="price">$${data[i].price}.00 </h5>
        <input type="number" class="col-2 input" min=1 oninput="buttonInfor(this.value,${data[i].id})"></input>
        </div>
        </div>
        `
}
inner.innerHTML = html
// Lấy các giá trị của stock của tất cả các product hiện tại
let input = document.querySelectorAll(".input")
let btn = document.querySelector(".btn")
for (let i = 0; i < input.length; i++) {
    input[i].value = data[i].stock
}
// function cập nhật stock theo yêu cầu
function buttonInfor(value, id) {
    let flag = true
    for (let i = 0; i < data.length; i++) {
        if (id == data[i].id) {
            // Kinh nghiệm quý báu làm đợt sau 
            // Nhớ biến tất cả số thành số đừng để dạng string ko là bay màu nếu đi so sánh
            data[i].stock = parseInt(value)
            btn.addEventListener("click", () => {
                if (flag == true) {
                    alert("Successful!")
                    flag = false
                }
                localStorage.setItem("data", JSON.stringify(data))
                return
            })
            return
        }
    }
}
// Chỉnh light và dark mode
let header = document.querySelector(".header")
let aboutUs = document.querySelector(".aboutUs")
let light = document.querySelectorAll(".light")
let dark = document.querySelectorAll(".dark")
let main = document.querySelector(".main")
let whiteMode = document.querySelectorAll(".whiteMode")
let grayMode = document.querySelectorAll(".grayMode")
for (let i = 0; i < light.length; i++) {
    if (localStorage.getItem("mode")) {
        let mode = localStorage.getItem("mode")
        if (mode == "dark") {
            darkMode()
        }
        else {
            lightMode()
        }
    }
    light[i].addEventListener("click", () => {
        lightMode()
    })
}
for (let i = 0; i < dark.length; i++) {
    dark[i].addEventListener("click", () => {
        darkMode()
    })
}
function lightMode() {
    header.classList.remove("bg-light")
    header.classList.add("bg-white")
    main.classList.remove("bg-dark")
    main.classList.add("bg-white")
    for (let i = 0; i < whiteMode.length; i++) {
        whiteMode[i].classList.remove("color-white")
    }
    for (let i = 0; i < grayMode.length; i++) {
        grayMode[i].classList.remove("color-gray")
    }
    localStorage.setItem("mode", "light")
}
function darkMode() {
    header.classList.add("bg-light")
    header.classList.remove("bg-white")
    main.classList.remove("bg-white")
    main.classList.add("bg-dark")
    for (let i = 0; i < whiteMode.length; i++) {
        whiteMode[i].classList.add("color-white")
    }
    for (let i = 0; i < grayMode.length; i++) {
        grayMode[i].classList.add("color-gray")
    }
    localStorage.setItem("mode", "dark")
}
