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
                    <div class="col-lg-9 col-12 row">
                        <div class="d-flex-between col-12 row">
                            <h6 class="col-10">${localCart[i].name}</h6>
                            <div class="col-1">
                                <input type="number" class="inputAmount" value="${localCart[i].amount}" style="width:40px" disabled>
                            </div>
                            <h6>$${localCart[i].price}.00</h6>
                        </div>
                        <div class="col-12 row ">
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
            // Dạng delivery
            let inforCity = document.querySelector(".inforCity")
            let inforDistrict = document.querySelector(".inforDistrict")
            let inforAddress = document.querySelector(".inforAddress")
            // Dạng gap truc tiep
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
                        updateData()
                        inforOrder(listOrder)
                    }
                    else {
                        let listOrder = []
                        updateData()
                        inforOrder(listOrder)
                    }
                    // Function lay thong tin don hang
                    function inforOrder(listOrder) {
                        // Check dạng website để lấy thông tin cho đúng
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
                                product: localCart,
                                address: inforAddress.value,
                            }
                            listOrder.push(newOrder)
                            updateListOrder(listOrder)
                        }
                    }
                    function updateListOrder(listOrder) {
                        // Tạo lại tài khoản có thêm biến listOrder
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
                        // Reset lại giỏ hàng
                        localStorage.removeItem("cart")
                        // Trở về trang chủ
                        alert("Order successfully")
                        location.href = "detail.html"
                        return
                    }
                    // Cập nhật stock trong data
                    function updateData() {
                        let data = JSON.parse(localStorage.getItem("data"))
                        for (let i = 0; i < data.length; i++) {
                            for (let k = 0; k < localCart.length; k++) {
                                if (data[i].nameProduct == localCart[k].name) {
                                    data[i].stock -= localCart[k].amount
                                }
                            }
                        }
                        localStorage.setItem("data", JSON.stringify(data))
                    }
                }
            }
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
        // aboutUs.classList.remove("bg-dark")
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
        // aboutUs.classList.add("bg-dark")
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
}
else {
    location.href = "index.html"
}
// Giới hạn ngày chọn của input