let returnButton = document.querySelector(".return").addEventListener("click", function () {
    location.href = "index.html"
})

let reviewButton = document.querySelector(".review").addEventListener("click", function () {
    location.href = "bag.html"
})
let email = document.querySelector(".email")
let password = document.querySelector(".password")
let btnLog = document.querySelector(".btn-info")
if (localStorage.getItem("user")) {
    email.innerHTML = `${localStorage.getItem("user")}`
    password.value = `${localStorage.getItem("password")}`
    btnLog.innerHTML = `Log out`
    btnLog.addEventListener("click", function () {
        localStorage.removeItem("user")
        location.reload();
    })
}
else {
    btnLog.addEventListener("click", function () {
        location.href = "sign.html"
    })
}
let translatePage = document.querySelectorAll(".translatePage")
let underlineDiv = document.querySelectorAll(".underlineDiv")
let translateInfor = document.querySelector(".translateInfor")
function translatePage1() {
    translateInfor.innerHTML = `
    <h4 class="mt-4">Your Information</h4>
        <div class="d-flex">
            <i class="fa-regular fa-user me-3 d-flex-center"></i>
            <h5 class="email">${localStorage.getItem("user")}</h5>
        </div>
        <div class="d-flex">
            <i class="fa-solid fa-location-dot me-3 d-flex-center"></i>
            <h5>Viet Nam</h5>
        </div>
        <div class="d-flex">
            <i class="fa-solid fa-language me-3 d-flex-center"></i>
            <h5>English</h5>
        </div>
        <div class="d-flex">
            <h5 class="me-3">Password</h5>
            <input type="password" class="rounded-pill px-3 password" value="${localStorage.getItem("password")} " disabled>
        </div>
    `
}
function translatePage2() {
    // Xác định user hiện tại
    let listAccount = JSON.parse(localStorage.getItem("listAccount"))
    let user = localStorage.getItem("user")
    for (let i = 0; i < listAccount.length; i++) {
        if (listAccount[i].email == user) {
            // Kiem tra listOrder da ton tai hay chua 
            if (listAccount[i].listOrder) {
                // Lấy listOrder và render giao diện với sản phẩm đầu tiên là đại diện
                let html = ""
                let k = listAccount[i].listOrder.length  // Vẫn chả hiểu lý do tại sao nhét nguyên cái "listAccount[i].listOrder.length" vào for thì nó báo lỗi phải thông qua biến k
                // Cái chuỗi dài quá nên muốn chui vào các giá trị bên trong thì phải khai báo 1 hàm mới là localListOrder
                // Khai bao de chui vao listOrder
                let localListOrder = listAccount[i].listOrder
                let = listAccount[i].listOrder[i]
                for (let i = 0; i < k; i++) {
                    // Chui vao danh sach cac san pham trong tung don hang
                    let listProduct = localListOrder[i]
                    html += `
                    <div class="row mt-5">
                        <div class="col-12 bg-gray" style="height: 3px;"></div>
                        <img class="col-lg-3 col-4" src=${listProduct[0].img}>
                        <div class="col-lg-9 col-12">
                            <div class="d-flex-between w-100 h-50">
                                <h4 class="w-50">${listProduct[0].name} (more)</h4>
                                <h4>Successful</h4>
                            </div>
                            <div class="w-100 h-50 row ">
                                <div class="col-6 h-50 mt-md-0 mt-3">Products: ${totalAmount()}</div>
                                <div class="col-6 h-50 d-flex pe-0" style="justify-content: end ;">Price :$${totalPrict()}.00</div>
                                <div class="col-6 h-50"></div>
                                <a class="col-6 h-50 headList-a-nor d-flex cur-pointer"
                                    style="justify-content: end ; color: blue" onclick="updateOrderId(${i})">More</a>
                            </div>
                            <div class="col-12 bg-gray" style="height: 3px;"></div>
                        </div>
                    </div>
                    `
                    // Function tinh toan tong tien
                    function totalPrict() {
                        let total = 0
                        for (let i = 0; i < listProduct.length; i++) {
                            total += JSON.parse(listProduct[i].price) * JSON.parse(listProduct[i].amount)
                        }
                        return total
                    }
                    // Function tinh toan tong so luong Products trong gio
                    function totalAmount() {
                        let amount = 0
                        for (let i = 0; i < listProduct.length; i++) {
                            amount += JSON.parse(listProduct[i].amount)
                        }
                        return amount
                    }
                }
                translateInfor.innerHTML = html
            }
            else {
                translateInfor.innerHTML = `
                <h3 class="mt-5">You don't have any orders right now!</h3>
                <h3 class="mt-5">Let's order this time!</h3>
                `
            }
        }
    }
}
// Function cập nhật idOrder lên localStorage và chuyển qua website detail
function updateOrderId(i) {
    localStorage.setItem("idOrder", i);
    location.href = "detail.html"
}
translatePage[0].addEventListener("click", function () {
    underlineDiv[0].classList.remove("d-none")
    underlineDiv[1].classList.add("d-none")
    translatePage1()
})
translatePage[1].addEventListener("click", function () {
    underlineDiv[1].classList.remove("d-none")
    underlineDiv[0].classList.add("d-none")
    translatePage2()
})

