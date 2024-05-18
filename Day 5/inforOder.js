if (localStorage.getItem("cart")) {
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
    let receive = document.querySelector(".receive")
    let delivery = document.querySelector(".delivery")
    let exchange = document.querySelector(".exchange")
    receive.addEventListener("click", function () {
        exchange.innerHTML = `
        <div class="border border-2 py-3 px-2 w-100 border-top-0">
                            <div class="d-flex-between w-100">
                                <p class="ms-2 fs-6 mb-3">The nearest store:</p>
                                <input type="text" class="px-2 w-50 inforStore bor-rad-nor check">
                            </div>
                            <p class="p-alert fillAlert"></p>
                            <div class="d-flex-between w-100">
                                <p class="ms-2 fs-6 mb-3">Your shopping date:</p>
                                <input type="date" class="px-2 w-50 inforDate bor-rad-nor check">
                            </div>
                            <p class="p-alert fillAlert"></p>
                        </div>
        `
        delivery.classList.remove("bg-aqua")
        receive.classList.add("bg-aqua")
        order()
    })
    delivery.addEventListener("click", function () {
        exchange.innerHTML = `
        <div class="border border-2 py-3 px-2 w-100 border-top-0">
                        <div class="d-flex-between w-100">
                                <p class="ms-2 fs-6 mb-3">Province/City:</p>
                                <input type="text" class="px-2 inforCity bor-rad-nor check">
                            </div>
                            <div class="d-flex-between w-100">
                                <p class="ms-2 fs-6 mb-3">District:</p>
                                <input type="text" class="px-2 inforDistrict bor-rad-nor check">
                            </div>
                            <div class="d-flex-between w-100">
                                <p class="ms-2 fs-6 mb-3">Your address:</p>
                                <input type="text" class="px-2 inforAddress bor-rad-nor check">
                            </div>
                        </div>
        `
        receive.classList.remove("bg-aqua")
        delivery.classList.add("bg-aqua")
        order()
    })
    let listProduct = document.querySelector(".listProduct")
    let totalPrice = document.querySelector(".totalPrice")
    let localCart = JSON.parse(localStorage.getItem("cart"))
    let html = ``
    let total = 0
    for (let i = 0; i < localCart.length; i++) {
        html += `
    <div class="row mt-3">
                    <div class="col-12 bg-gray" style="height: 3px;"></div>
                    <img class="col-lg-3 col-4"
                        src=${localCart[i].img}>
                    <div class="col-lg-9 col-12">
                        <div class="d-flex-between w-100 h-50">
                            <h6 class="w-50">${localCart[i].name}</h6>
                            <input type="number" class="inputAmount" value="${localCart[i].amount}" style="width:40px" disabled>
                            <h6>$${localCart[i].price}.00</h6>
                        </div>
                        <div class="w-100 h-50 row ">
                            <h6 class="col-6 h-50">Total Price : </h6>
                            <h6 class="col-6 h-50 d-flex pe-0" style="justify-content: end ;">$${localCart[i].price * localCart[i].amount}.00</h6>
                            <div class="col-6 h-50"></div>
                        </div>
                        <div class="col-12 bg-gray" style="height: 3px;"></div>
                    </div>
                </div>
    `
        total += JSON.parse(localCart[i].price) * JSON.parse(localCart[i].amount)
    }
    totalPrice.innerHTML = `$${total}.00`
    listProduct.innerHTML = html
    // function checkInput() {
    //     let check = document.querySelectorAll(".check")
    //     let fillAlert = document.querySelectorAll(".fillAlert")
    //     for (let i = 0; i < check.length; i++) {
    //         if (check[i].value == "") {
    //             fillAlert[i].innerHTML = `
    //             Please fill in
    //             `
    //         }
    //     }
    // }
    order()
    function order() {
        //những đơn hàng thành công được push vào chuỗi
        // Hai trường hợp : đã tồn tại và chưa tồn tại
        let orderButton = document.querySelector(".orderButton")
        orderButton.addEventListener("click", function () {
            checkInput()
        })
        function checkInput() {
            //check input rỗng
            if (localStorage.getItem("listOrder")) {
                listOrder = JSON.parse(localStorage.getItem("listOrder"))
            }
            else {
                listOrder = []
            }
            let check = document.querySelectorAll(".check")
            console.log(check)
            for (let i = 0; i < check.length; i++) {
                if (check[i].value == "") {
                    alert("Please write your order information")
                    return
                }
            }
            listOrder.push(localCart)
            localCart = []
            localStorage.setItem("cart", localCart)
            localStorage.setItem("listOrder", JSON.stringify(listOrder))
            // location.href = "index.html"
            alert("Order successfully")
        }
    }
}
else {
    location.href = "index.html"
}
