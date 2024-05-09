let amountProduct = document.querySelector(".amountBag")
updateAmount()
function updateAmount() {
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        let amountBag = 0
        for (let i = 0; i < cart.length; i++) {
            amountBag += JSON.parse(cart[i].amount)
            amountProduct.innerText = `Product : ${amountBag}`
        }
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}
let shoppingBag = document.querySelector(".shoppingBag")
let localCart = JSON.parse(localStorage.getItem("cart"))
let html = ""
let total = 0;
for (let i = 0; i < localCart.length; i++) {
    total += JSON.parse(localCart[i].price) * JSON.parse(localCart[i].amount)
    html += `
    <div class="row mt-5">
    <div class="col-12 bg-gray" style="height: 3px;"></div>
            <img class="col-lg-3 col-4"
            src="${localCart[i].img}">
            <div class="col-lg-9 col-12">
            <div class="d-flex-between w-100 h-50">
            <h4 class="w-50">${localCart[i].name}</h4>
            <input type="number" class="inputAmount" min="1" style="width:40px">
            <h4>$${localCart[i].price}.00</h4>
            </div>
            <div class="w-100 h-50 row ">
            <div class="col-6 h-50">Pay 0% APR for 12 months</div>
            <div class="col-6 h-50 d-flex pe-0" style="justify-content: end ;">$4.92/mo.</div>
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
let removeButton = document.querySelectorAll(".removeButton")
for (let i = 0; i < removeButton.length; i++) {
    removeButton[i].addEventListener("click", function () {
        removeButton[i].parentElement.parentElement.parentElement.remove()
    })
}
function updateTotalPrice() {
    total = 0
    for (let i = 0; i < localCart.length; i++) {
        total += JSON.parse(localCart[i].price) * JSON.parse(localCart[i].amount)
    }
    totalPrice.innerHTML = `Total : $${total}.00 `
}
let inputAmount = document.querySelectorAll(".inputAmount")
inputValue()
function inputValue() {
    for (let i = 0; i < localCart.length; i++) {
        inputAmount[i].value = localCart[i].amount
        inputAmount[i].addEventListener("input", function () {
            if (inputAmount[i].value <= JSON.parse(localCart[i].stock)) {
                localCart[i].amount = inputAmount[i].value
                localStorage.setItem("cart", JSON.stringify(localCart))
                updateTotalPrice()
                updateAmount()
            }
            else {
                alert("Out of stock")
                inputAmount[i].value = localCart[i].amount
                return
            }
        })
    }
}

function removeButtonCart(id) {
    for (let i = 0; i < localCart.length; i++) {
        if (id == localCart[i].id) {
            localCart.splice(i, 1)
        }
    }
    localStorage.setItem("cart", JSON.stringify(localCart))
    // updateAmount()
    // inputValue()           Tại sao reload lại thành công mà gọi lại mấy cái function không thành công ????
    // updateTotalPrice()
    location.reload();
}
let signUp = document.querySelector(".signUp")
if (localStorage.getItem("user")) {
    signUp.innerHTML = `<i class="fa-solid fa-user cur-pointer"></i> ${localStorage.getItem("user")}`
}
signUp.addEventListener("click", function () {
    location.href = "sign.html"
})