let amountProduct = document.querySelector(".amountProduct")
let nameProduct = document.querySelector(".nameProduct").innerHTML = `
<h6 style="color:red">New</h6>
<h3 class="w-100">${localStorage.getItem("nameProduct")}</h3>
<h5>$${localStorage.getItem("price")}.00</h5>
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
    id: localStorage.getItem("id")
}
let btn = document.querySelector(".btn")
btn.addEventListener("click", function () {
    if (localStorage.getItem("cart")) {
        let localCart = JSON.parse(localStorage.getItem("cart"))
        for (let i = 0; i < localCart.length; i++) {
            if (inforProduct.id == localCart[i].id) {
                alert("You have already chosen this one")
                return;
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
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        amountProduct.innerText = cart.length
    }
    else {
        amountProduct.innerText = 0
    }
})
if (localStorage.getItem("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart"))
    amountProduct.innerText = cart.length
}
else {
    amountProduct.innerText = 0
}