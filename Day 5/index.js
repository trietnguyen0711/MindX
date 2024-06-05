if (localStorage.getItem("data")) {
    let data = JSON.parse(localStorage.getItem("data"))
    localStorage.setItem("data", JSON.stringify(data))
}
else {
    let data = [
        {
            img: "img/sp1.jpg",
            nameProduct: "iPhone 15 Silicone Case with MagSafe - Light Blue",
            price: 49.00,
            id: 0,
            stock: 7
        },
        {
            img: "img/sp2.jpg",
            nameProduct: "iPhone FineWoven Wallet with MagSafe - Pacific Blue",
            price: 49.00,
            id: 1,
            stock: 9
        },
        {
            img: "img/sp3.jpg",
            nameProduct: "45mm Soft Mint Sport Loop very great",
            price: 29.00,
            id: 2,
            stock: 5
        },
        {
            img: "img/sp4.jpg",
            nameProduct: "45mm Sunshine Sport Band - M/L",
            price: 49.00,
            id: 3,
            stock: 8
        },
        {
            img: "img/sp5.jpg",
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
let signUp = document.querySelectorAll(".signUp")
for (let i = 0; i < signUp.length; i++) {
    if (localStorage.getItem("user")) {
        signUp[i].innerHTML = `<i class="fa-solid fa-user cur-pointer"></i> ${localStorage.getItem("user")}`
        signUp[i].addEventListener("click", function () {
            location.href = "account.html"
        })
    }
    else {
        signUp[i].addEventListener("click", function () {
            location.href = "sign.html"
        })
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
    aboutUs.classList.remove("bg-dark")
    main.classList.remove("bg-dark")
    main.classList.add("bg-light")
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
    aboutUs.classList.add("bg-dark")
    main.classList.remove("bg-light")
    main.classList.add("bg-dark")
    for (let i = 0; i < whiteMode.length; i++) {
        whiteMode[i].classList.add("color-white")
    }
    for (let i = 0; i < grayMode.length; i++) {
        grayMode[i].classList.add("color-gray")
    }
    localStorage.setItem("mode", "dark")
}
// Hien ds header
let listChoose = document.querySelector(".listChoose")
let ds = document.querySelector(".ds")
listChoose.addEventListener("click", () => {
    ds.classList.remove("d-none")
})
// Các chức năng cần bổ sung vào trang web
// - Confirm mật khẩu đăng kí (COMPLETED)
// - Trừ số lượng hàng sau khi đặt hàng thành công
// - Chỉ có thể đặt những ngày trong tương lai
// - Cap nhat lai ma don hang
// - padStart string in js