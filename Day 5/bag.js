let amountProduct = document.querySelector(".amountBag")
if (localStorage.getItem("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart"))
    amountProduct.innerText = `Product : ${cart.length}`
}
else {
    amountProduct.innerText = `Products : 0`
}
let shoppingBag = document.querySelector(".shoppingBag")
let localCart = JSON.parse(localStorage.getItem("cart"))
let html = ""
let total = 0;
for (let i = 0; i < localCart.length; i++) {
    total += JSON.parse(localCart[i].price)
    html += `
    <div class="row mt-5">
    <div class="col-12 bg-gray" style="height: 3px;"></div>
            <img class="col-lg-3 col-4"
            src="${localCart[i].img}">
            <div class="col-lg-9 col-12">
            <div class="d-flex-between w-100 h-50">
            <h4 class="w-50">${localCart[i].name}</h4>
            <h4>1</h4>
            <h4>$${localCart[i].price}.00</h4>
            </div>
            <div class="w-100 h-50 row ">
            <div class="col-6 h-50">Pay 0% APR for 12 months</div>
            <div class="col-6 h-50 d-flex" style="justify-content: end ;">$4.92/mo.</div>
            <div class="col-6 h-50"></div>
            <a href="#" class="col-6 h-50 headList-a-nor d-flex cur-pointer removeButton" onclick="removeButtonCart(${localCart[i].id})"
            style="justify-content: end ; color: blue">Remove</a>
            </div>
            <div class="col-12 bg-gray" style="height: 3px;"></div>
            </div>
            </div>

    `
}
let totalPrice = document.querySelector(".totalPrice")
totalPrice.innerHTML = `Total : $${total}.00 `
shoppingBag.innerHTML = html
function removeButtonCart(id) {
    for (let i = 0; i < localCart.length; i++) {
        if (id == localCart[i].id) {
            localCart.splice(i, 1)
            updateTotalPrice()
            amountProduct.innerText = `Product : ${localCart.length}`
            localStorage.setItem("cart", JSON.stringify(localCart))
            return
        }
    }
}
let removeButton = document.querySelectorAll(".removeButton")
for (let i = 0; i < removeButton.length; i++) {
    removeButton[i].addEventListener("click", function () {
        removeButton[i].parentElement.parentElement.parentElement.remove()
    })
}
function updateTotalPrice() {
    total = 0
    for (let i = 0; i < localCart.length; i++) {
        total += JSON.parse(localCart[i].price)
    }
    totalPrice.innerHTML = `Total : $${total}.00 `
}