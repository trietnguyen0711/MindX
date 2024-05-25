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
    let m = 1
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
        m = 1
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
        m = 2
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
    order()
    function order() {
        let orderButton = document.querySelector(".orderButton")
        orderButton.addEventListener("click", function () {
            checkInput()
        })
        function checkInput() {
            // Hai trường hợp : đã tồn tại và chưa tồn tại
            let check = document.querySelectorAll(".check")
            // Kiểm tra đã chọn hình thức thanh toán chưa thông qua số lượng thẻ input tồn tại trên website tại thời điểm đó
            if (check.length < 2) {
                alert("please choose your receiving way")
                return
            }
            //check input rỗng
            for (let i = 0; i < check.length; i++) {
                if (check[i].value == "") {
                    alert("Please write your order information")
                    return
                }
            }
            // Cac input thong tin don hang
            let inforName = document.querySelector(".inforName")
            let inforPhone = document.querySelector(".inforPhone")
            let inforNote = document.querySelector(".inforNote")
            // Dang delivery
            let inforCity = document.querySelector(".inforCity")
            let inforDistrict = document.querySelector(".inforDistrict")
            let inforAddress = document.querySelector(".inforAddress")
            // Dang gap truc tiep
            let inforDate = document.querySelector(".inforDate")
            let inforStore = document.querySelector(".inforStore")
            // Đơn hàng thành công được push vào tài khoản đang đăng nhập
            // Xác định tài khoản hiện tại và push vào listAccount[i] đã được xác định
            let user = localStorage.getItem("user")
            let listAccount = JSON.parse(localStorage.getItem("listAccount"))
            for (let i = 0; i < listAccount.length; i++) {
                if (listAccount[i].email == user) {
                    // Kiểm tra tk này trước đây có đặt đơn hàng nào chưa ?
                    if (listAccount[i].listOrder) {
                        //những đơn hàng thành công được push vào chuỗi
                        let listOrder = listAccount[i].listOrder
                        // Lấy thông tin đơn hàng thông qua input và localCart
                        inforOrder(listOrder)
                    }
                    else {
                        let listOrder = []
                        inforOrder(listOrder)
                    }
                    // Function lay thong tin don hang
                    function inforOrder(listOrder) {
                        if (m == 1) {
                            let newOrder = {
                                nameOrder: inforName.value,
                                phone: inforPhone.value,
                                note: inforNote.value,
                                date: inforDate.value,
                                store: inforStore.value,
                                product: localCart,
                            }
                            listOrder.push(newOrder)
                            updateListOrder(listOrder)
                        }
                        else {
                            let newOrder = {
                                nameOrder: inforName.value,
                                phone: inforPhone.value,
                                note: inforNote.value,
                                city: inforCity.value,
                                district: inforDistrict.value,
                            }
                            listOrder.push(newOrder)
                            updateListOrder(listOrder)
                        }
                    }
                    function updateListOrder(listOrder) {
                        // Tạo lại tài khoản có thêm biến listOrder và totalPrict
                        let account = {
                            email: listAccount[i].email,
                            password: listAccount[i].password,
                            listOrder: listOrder,
                        }
                        // Set id của đơn hàng này lên localStorage để nhận diện
                        let idOrder = listOrder.length - 1
                        localStorage.setItem("idOrder", idOrder)
                        // Push vào listAccount[i] đã được xác định đồng thời xóa thằng cũ
                        listAccount.splice(i, 1)
                        listAccount.push(account)
                        localStorage.setItem("listAccount", JSON.stringify(listAccount))
                        // Reset lại giỏ hàng và set cart và listOrder lên localStorage
                        localCart = []
                        localStorage.setItem("cart", JSON.stringify(localCart))

                        // Trở về trang chủ
                        alert("Order successfully")
                        location.href = "detail.html"
                        return
                    }
                }
            }
        }
    }
}
else {
    location.href = "index.html"
}
