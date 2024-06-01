
let amountProduct = document.querySelector(".amountProduct")
let nameProduct = document.querySelector(".nameProduct").innerHTML = `
<h6 style="color:red">New</h6>
<h3 class="w-100">${localStorage.getItem("nameProduct")}</h3>
<h5>$${localStorage.getItem("price")}.00</h5>
<h5>Inventory : ${localStorage.getItem("stock")}</h5>
`
let imgProduct = document.querySelectorAll(".imgProduct")
for (let i = 0; i < imgProduct.length; i++) {
    imgProduct[i].innerHTML = `
    <img class="bor-rad-nor h-100"
        src="${localStorage.getItem("img")}"
        alt="">
    `
}
let inforProduct = {
    price: localStorage.getItem("price"),
    img: localStorage.getItem("img"),
    name: localStorage.getItem("nameProduct"),
    id: localStorage.getItem("id"),
    amount: JSON.parse(localStorage.getItem("amountEveryProduct")),
}
let btn = document.querySelector(".btn")
btn.addEventListener("click", function () {
    // Kiểm tra giỏ hàng có tồn tại không ?
    if (localStorage.getItem("cart")) {
        let localCart = JSON.parse(localStorage.getItem("cart"))
        let stock = localStorage.getItem("stock")
        // Kiểm tra loại hàng này có tồn tại trong giỏ hàng trước đây không ?
        for (let i = 0; i < localCart.length; i++) {
            if (inforProduct.id == localCart[i].id) {
                // Kiểm tra đơn hàng còn tồn kho không
                if (stock == 0) {
                    alert("Out of stock")
                    return
                }
                // Kiểm tra số lượng amount với stock
                let data = JSON.parse(localStorage.getItem("data"))
                for (let k = 0; k < data.length; k++) {
                    if (data[k].id == inforProduct.id) {
                        if (localCart[i].amount >= data[k].stock) {
                            alert("Out of stock")
                            return
                        }
                    }
                }
                localCart[i].amount += 1
                localStorage.setItem("cart", JSON.stringify(localCart))
                return
            }
        }
        // Không tồn tại trong giỏ hàng
        // Kiểm tra đơn hàng còn tồn kho không
        if (stock == 0) {
            alert("Out of stock")
            return
        }
        // Lý do không cần dòng dưới là do TH này chỉ xảy ra khi không tồn tại có loại hàng này trước đây
        // Nên chắc chắn số lượng là 0 => không cần phải so sáng với stock
        // Đồng thời sau khi nhấn lần 2 thì chắc chắn nó sẽ lọt vào một trong các ĐK của vòng for ở trên
        // else if (localCart[i].amount >= localCart[i].stock) {
        //     alert("Out of stock")
        //     return
        // }
        localCart.push(inforProduct)
        localStorage.setItem("cart", JSON.stringify(localCart))
        return
    }
    else {
        let cart = []
        let stock = localStorage.getItem("stock")
        if (stock == 0) {
            alert("Out of stock")
            return
        }
        // Lý do không cần dòng dưới là do TH này chỉ xảy ra khi không tồn tại có loại hàng này trước đây
        // Nên chắc chắn số lượng là 0 => không cần phải so sáng với stock
        // else if (localCart[i].amount >= localCart[i].stock) {
        //     alert("Out of stock")
        //     return
        // }
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