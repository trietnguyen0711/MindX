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
    translatePage.innerHTML = `
    <h4 class="mt-4">Your Information</h4>
        <div class="d-flex">
            <i class="fa-regular fa-user me-3 d-flex-center"></i>
            <h5 class="email">Your Email</h5>
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
            <input type="password" class="rounded-pill px-3 password" disabled>
        </div>
    `
}
function translatePage2() {
    translateInfor.innerHTML = `
        <div class="row">
                <div class="col-12 bg-gray" style="height: 3px;"></div>
                <img class="col-lg-3 col-4">
                <div class="col-lg-9 col-12">
                    <div class="d-flex-between w-100 h-50">
                        <h4 class="w-50">Nice Products</h4>
                        <h4>Successful</h4>
                    </div>
                    <div class="w-100 h-50 row ">
                        <div class="col-6 h-50">10/05/2024</div>
                        <div class="col-6 h-50 d-flex pe-0" style="justify-content: end ;">Total:$0.00</div>
                        <div class="col-6 h-50"></div>
                        <a href="#" class="col-6 h-50 headList-a-nor d-flex cur-pointer"
                            style="justify-content: end ; color: blue">Details</a>
                    </div>
                    <div class="col-12 bg-gray" style="height: 3px;"></div>
                </div>
            </div>
        `
}
translatePage[0].addEventListener("click", function () {
    location.reload()
    // translatePage1()
})
translatePage[1].addEventListener("click", function () {
    translatePage2()
})

