// Thay đổi giao diện header
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
// innerList là div được chỉnh sửa cac san pham
let innerList = document.querySelector(".innerList")
// DetailPrice la div duoc chinh sua gia tien
let detailPrice = document.querySelector(".detailPrice")
let listAccount = JSON.parse(localStorage.getItem("listAccount"))
for (let i = 0; i < listAccount.length; i++) {
    // Tìm và xác nhận tài khoản
    if (localStorage.getItem("user") == listAccount[i].email) {
        // Chui vào danh sách đơn hàng
        let listOrder = listAccount[i].listOrder
        for (let i = 0; i < listOrder.length; i++) {
            // Tìm và xác nhận đơn hàng muốn xem
            if (i == localStorage.getItem("idOrder")) {
                // InnerHTML thong tin san pham
                let idCurrent = document.querySelector(".idCurrent").innerText = `SPXVN0` + i
                let note = document.querySelector(".note").innerHTML = `Your note : ${listOrder[i].note}`
                let nameOrder = document.querySelector(".nameOrder").innerHTML = `${listOrder[i].nameOrder}`
                let phoneOrder = document.querySelector(".phoneOrder").innerHTML = `${listOrder[i].phone}`
                // Ham TG
                const today = new Date();
                const day = today.getDate();
                const month = today.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
                const year = today.getFullYear();
                let type1 = document.querySelector(".type1")
                let type2 = document.querySelector(".type2")
                // Kiem tra tinh ton tai cua nhung gtr nay
                if (listOrder[i].address) {
                    type1.innerHTML = `
                    <h6 class="mx-3 d-flex-center">Estimated delivery date:</h6>
                    <p class="d-flex-center mb-2">${day + 5}-${month}-${year}</p>
                    `
                    let addressOrder = document.querySelector(".addressOrder").innerHTML = `${listOrder[i].address}`
                    let cityDisOrder = document.querySelector(".cityDisOrder").innerHTML = `${listOrder[i].district}, ${listOrder[i].city}`
                }
                else if (listOrder[i].date) {
                    let addressOrder = document.querySelector(".addressOrder").innerHTML = `Appointment Day : ${listOrder[i].date}`
                    let cityDisOrder = document.querySelector(".cityDisOrder").innerHTML = `Store : ${listOrder[i].store}`
                }
                type2.innerHTML = `
                    <h6 class="mx-3 d-flex-center">Order date:</h6>
                    <p class="d-flex-center mb-2">${day}-${month}-${year}</p>
                    `
                let listProduct = listOrder[i].product
                let html1 = ""
                let html2 = ""
                let totalPrice = 0
                for (let i = 0; i < listProduct.length; i++) {
                    // Render san pham
                    let product = listProduct[i]
                    html1 += `
                <div class="d-flex-between row mt-3 " style="border: 1px solid rgba(0, 0, 0, .09)">
                <img src= ${product.img}
                    alt="" class="col-4">
                <div class="col-8 py-lg-0 py-4">
                    <h4>${product.name}</h4>
                    <p>Classification of goods : red </p>
                    <p>Price : $${product.price}.00</p>
                    <p>x${product.amount}</p>
                    <h5>Total Price : $${JSON.parse(product.amount) * JSON.parse(product.price)}.00</h5>
                </div>
            </div>
                `
                    totalPrice += JSON.parse(product.amount) * JSON.parse(product.price)
                }
                // Render tong gia
                html2 += `
                <h4>Detail price</h4>
                <p>Total price of all product : $${totalPrice}.00</p>
                <p>Delivery price : $5.00</p>
                <h5>Total price: $${totalPrice + 5}.00</h5>
                `
                detailPrice.innerHTML = html2
                innerList.innerHTML = html1
            }
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
// Dự đoán được ngày giao hàng
// Lấy được giá trị ngày hôm nay