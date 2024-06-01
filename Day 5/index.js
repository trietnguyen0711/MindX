if (localStorage.getItem("data")) {
    let data = JSON.parse(localStorage.getItem("data"))
    localStorage.setItem("data", JSON.stringify(data))
}
else {
    let data = [
        {
            img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWND3?wid=400&hei=400&fmt=jpeg&qlt=95&.v=1708125477348",
            nameProduct: "iPhone 15 Silicone Case with MagSafe - Light Blue",
            price: 49.00,
            id: 0,
            stock: 7
        },
        {
            img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT263?wid=400&hei=400&fmt=jpeg&qlt=95&.v=1699475074951",
            nameProduct: "iPhone FineWoven Wallet with MagSafe - Pacific Blue",
            price: 49.00,
            id: 1,
            stock: 9
        },
        {
            img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MW4Q3?wid=400&hei=400&fmt=jpeg&qlt=95&.v=1707853692193",
            nameProduct: "45mm Soft Mint Sport Loop very great",
            price: 29.00,
            id: 2,
            stock: 5
        },
        {
            img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWMW3ref?wid=400&hei=400&fmt=jpeg&qlt=95&.v=1707791910829",
            nameProduct: "45mm Sunshine Sport Band - M/L",
            price: 49.00,
            id: 3,
            stock: 8
        },
        {
            img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT4U3?wid=400&hei=400&fmt=jpeg&qlt=95&.v=1693594248668",
            nameProduct: "iPhone 15 Pro FineWoven Case - Evergreen",
            price: 59.00,
            id: 4,
            stock: 1
        },
    ]
    localStorage.setItem("data", JSON.stringify(data))
}
let data = JSON.parse(localStorage.getItem("data"))
let html = ""
for (let i = 0; i < data.length; i++) {
    if (data[i].stock != 0) {
        let inforProduct = {
            img: data[i].img,
            nameProduct: data[i].nameProduct,
            price: data[i].price,
            id: data[i].id,
            stock: data[i].stock
        }
        html += `<div class="size-products bor-rad-nor p-3 color-black me-5 bg-white">
        <img class="h-75 w-100 bor-rad-nor changeImg"
        src="${inforProduct.img}"
        alt="">
        <h6 style="color:red">New</h6>
        <h3 class="identityProduct">${inforProduct.nameProduct}</h3>
        <div class="d-flex-between w-100">
        <h5 class="price">$${inforProduct.price}.00 </h5>
        <button type="button" class="btn btn-primary" onclick="buttonInfor(${inforProduct.id})"><a class="headList-a-nor"
        style="color: black;">See infor</a></button>
        </div>
        </div>
    `
    }
}
let listProduct = document.querySelector(".listProduct").innerHTML = html
function buttonInfor(id) {
    function findProduct() {
        for (let i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                return data[i];
            }
        }
    }
    function updateAmount() {
        if (localStorage.getItem("cart")) {
            let cart = JSON.parse(localStorage.getItem("cart"))
            let amountBag = 0
            for (let i = 0; i < cart.length; i++) {
                amountBag += cart[i].amount
                amountProduct.innerText = amountBag
            }
            localStorage.setItem("cart", JSON.stringify(cart))
        }

    }
    let product = findProduct(id)
    localStorage.setItem("img", product.img)
    localStorage.setItem("nameProduct", product.nameProduct)
    localStorage.setItem("price", product.price)
    localStorage.setItem("id", product.id)
    localStorage.setItem("stock", product.stock)
    location.href = "product.html"
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == product.id) {
                localStorage.setItem("amountEveryProduct", cart[i].amount)
                return
            }
            else {
                localStorage.setItem("amountEveryProduct", 1)
            }
        }
    }
    else {
        localStorage.setItem("amountEveryProduct", 1)
    }
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
// Các chức năng cần bổ sung vào trang web
// - Confirm mật khẩu đăng kí (COMPLETED)
// - Trừ số lượng hàng sau khi đặt hàng thành công
// - Chỉ có thể đặt những ngày trong tương lai
// - Cap nhat lai ma don hang
// - padStart string in js