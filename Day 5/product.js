
let amountProduct = document.querySelector(".amountProduct")
let nameProduct = document.querySelector(".nameProduct").innerHTML = `
<h6 style="color:red">New</h6>
<h3 class="w-100">${localStorage.getItem("nameProduct")}</h3>
<h5>$${localStorage.getItem("price")}.00</h5>
<h5>Inventory : ${localStorage.getItem("stock")}</h5>
`
let imgProduct = document.querySelector(".imgProduct").innerHTML = `
<img class="bor-rad-nor h-100"
    src="${localStorage.getItem("img")}"
    alt="">
`
let inforProduct = {
    price: localStorage.getItem("price"),
    img: localStorage.getItem("img"),
    name: localStorage.getItem("nameProduct"),
    id: localStorage.getItem("id"),
    amount: JSON.parse(localStorage.getItem("amountEveryProduct")),
    stock: localStorage.getItem("stock")
}
let btn = document.querySelector(".btn")
btn.addEventListener("click", function () {
    if (localStorage.getItem("cart")) {
        let localCart = JSON.parse(localStorage.getItem("cart"))
        for (let i = 0; i < localCart.length; i++) {
            if (inforProduct.id == localCart[i].id) {
                if (inforProduct.amount == inforProduct.stock) {
                    alert("Out of stock")
                    return
                }
                localCart.splice(i, 1);
                inforProduct.amount += 1
                localCart.push(inforProduct)
                localStorage.setItem("cart", JSON.stringify(localCart))
                return
            }
        }
        localCart.push(inforProduct)
        localStorage.setItem("cart", JSON.stringify(localCart))
    }
    else {
        let cart = []
        cart.push(inforProduct)
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    updateAmount()
})
btn.addEventListener("click", function () {
    updateAmount()
})
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