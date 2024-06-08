let amountProduct = document.querySelector(".amountBag")
updateAmount()
function updateAmount() {
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        let amountBag = 0
        // Dòng inner gtr 0 với mục đích là sửa lỗi trường hợp xóa thằng cuối cùng trong giỏ hàng
        amountProduct.innerText = `Product : ${amountBag}`
        for (let i = 0; i < cart.length; i++) {
            amountBag += JSON.parse(cart[i].amount)
            amountProduct.innerText = `Product : ${amountBag}`
        }
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}
let shoppingBag = document.querySelector(".shoppingBag")
if (localStorage.getItem("cart")) {
    let localCart = JSON.parse(localStorage.getItem("cart"))
    let html = ""
    let total = 0;
    for (let i = 0; i < localCart.length; i++) {
        total += JSON.parse(localCart[i].price) * JSON.parse(localCart[i].amount)
        html += `
        <div class="row mt-5">
        <div class="col-12 bg-gray" style="height: 3px;"></div>
        <img class="col-lg-3 col-4" src="${localCart[i].img}">
        <div class="col-lg-9 col-12 row">
            <div class="d-flex-between col-12 row">
                <h4 class="col-11">${localCart[i].name}</h4>
                <div class="col-1">
                    <input type="number" class="inputAmount" oninput="updateInput(this.value, ${localCart[i].id})" min="1" style="width:40px">
                </div>
                <h4 class="my-lg-0 my-3">$${localCart[i].price}.00</h4>
            </div>
            <div class="col-12 row ">
                <div class="col-6 h-50">Pay 0% APR for 12 months</div>
                <div class="col-6 h-50 d-flex pe-0" style="justify-content: end ;">$4.92/mo.</div>
                <div class="d-flex-between">
                    <div class="col-6 h-50"></div>
                    <a href="#" class="col-6 h-50 headList-a-nor d-flex cur-pointer removeButton"
                        onclick="removeButtonCart(${localCart[i].id})"
                        style="justify-content: end ; color: blue">Remove</a>
                </div>
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
            removeButton[i].parentElement.parentElement.parentElement.parentElement.remove()
        })
    }
    function updateTotalPrice() {
        let localCart = JSON.parse(localStorage.getItem("cart"))
        total = 0
        for (let i = 0; i < localCart.length; i++) {
            total += JSON.parse(localCart[i].price) * JSON.parse(localCart[i].amount)
        }
        totalPrice.innerHTML = `Total : $${total}.00 `
    }
    let inputAmount = document.querySelectorAll(".inputAmount")
    // In amount vào thẻ input
    for (let i = 0; i < localCart.length; i++) {
        inputAmount[i].value = localCart[i].amount
    }
    // Function tăng giảm số lượng inputAmount 
    function updateInput(value, id) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        let data = JSON.parse(localStorage.getItem("data"))
        // Xác định thằng product đc nhấn tăng giảm trong cart
        for (let i = 0; i < cart.length; i++) {
            if (id == cart[i].id) {
                // Xác định thằng product đc nhấn tăng giảm trong data
                for (let k = 0; k < data.length; k++) {
                    if (id == data[k].id) {
                        // Lấy giá trị input sau khi tăng gán vào amount của product để kiểm tra stock
                        cart[i].amount = value

                        if (data[k].stock < cart[i].amount) {
                            alert("Out of stock!")
                            // Reset lại các giá trị của thẻ input theo localCart
                            let localCart = JSON.parse(localStorage.getItem("cart"))
                            for (let i = 0; i < localCart.length; i++) {
                                inputAmount[i].value = localCart[i].amount
                            }
                            return
                        }
                        else {
                            // Thay đổi thằng amount của product đó và gán lên localStorage
                            cart[i].amount = value
                            localStorage.setItem("cart", JSON.stringify(cart))
                            updateTotalPrice()
                            updateAmount()
                        }
                    }
                }
            }
        }
    }
    function removeButtonCart(id) {
        let localCart = JSON.parse(localStorage.getItem("cart"))
        for (let i = 0; i < localCart.length; i++) {
            if (id == localCart[i].id) {
                localCart.splice(i, 1)
            }
            localStorage.setItem("cart", JSON.stringify(localCart))
            updateInput(id)
            updateAmount()
            updateTotalPrice()
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
    let orderProduct = document.querySelector(".orderProduct").addEventListener("click", function () {
        localCart = JSON.parse(localStorage.getItem("cart"))
        if (localCart == 0) {
            alert("Please choose your favorite products before ordering")
        }
        else {
            if (localStorage.getItem("user")) {
                location.href = "inforOder.html"
            }
            else {
                alert("Please sign in")
                location.href = "sign.html"
            }
        }
    })
}
else {
    alert("Your cart is empty! Please choose your favorite products first!")
    location.href = "index.html"
}