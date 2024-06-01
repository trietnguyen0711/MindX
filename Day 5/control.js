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
    <div class="ms-10 size-products bor-rad-nor p-3 color-black me-5 bg-white col-1">
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
for (let i = 0; i < input.length; i++) {
    input[i].value = data[i].stock
}
// function cập nhật stock theo yêu cầu
function buttonInfor(value, id) {
    for (let i = 0; i < data.length; i++) {
        if (id == data[i].id) {
            // Kinh nghiệm quý báu làm đợt sau 
            // Nhớ biến tất cả số thành số đừng để dạng string ko là bay màu nếu đi so sánh
            data[i].stock = parseInt(value)
            localStorage.setItem("data", JSON.stringify(data))
            return
        }
    }
}