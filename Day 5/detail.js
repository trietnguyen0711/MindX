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
                let idCurrent = document.querySelector(".idCurrent")
                idCurrent.innerText = `SPXVN0` + i
                let listProduct = listOrder[i]
                let html1 = ""
                let html2 = ""
                let totalPrice = 0
                for (let i = 0; i < listProduct.length; i++) {
                    // Render san pham
                    let product = listProduct[i]
                    html1 += `
                <div class="d-flex-between row mt-3" style="border: 1px solid rgba(0, 0, 0, .09)">
                <img src= ${product.img}
                    alt="" class="col-2">
                <div class="col-8">
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
