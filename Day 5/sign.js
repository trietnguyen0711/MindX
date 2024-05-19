let btn = document.querySelector(".btn")
let errorEmail = document.querySelector(".errorEmail")
let errorPassword = document.querySelector(".errorPassword")
let input = document.querySelectorAll("input")
let inputEmail = input[0]
let inputPassword = input[1]
let signUpForm = document.querySelector(".signUpForm")
let welcome = document.querySelector(".welcome")
let sign = document.querySelector(".sign")
let remember = document.querySelector(".remember")
let m = 1
signUpForm.addEventListener("click", function () {
    m = 2
    // Thay đổi thành đăng ký
    errorEmail.innerText = ""
    errorPassword.innerText = ""
    signUpForm.classList.add("d-none")
    welcome.innerHTML = "Sign up now"
    sign.innerHTML = "Create your account"
    remember.innerHTML = "Please enter your email address and password"
    remember.classList.remove("cur-pointer")
    btn.innerHTML = "Continue"
})
btn.addEventListener("click", function () {
    // Tạo biến m để nhận dạng trạng thái trình duyệt đang là "Sign in(m=1)" hay "Sign up(m=2)"
    if (m == 1) {
        // Kiểm tra sự tồn tại của listAccount
        if (localStorage.getItem("listAccount")) {
            // Kiểm tra input có rỗng hay không ?
            if (inputEmail.value == "" && inputPassword.value == "") {
                errorEmail.innerText = ""
                errorPassword.innerText = ""
                errorEmail.innerText = "Please write your email"
                errorPassword.innerText = "Please write your password"
            }
            else if (inputEmail.value == "" && inputPassword.value != "") {
                errorEmail.innerText = ""
                errorPassword.innerText = ""
                errorEmail.innerText = "Please write your email"
            }
            else if (inputEmail.value != "" && inputPassword.value == "") {
                errorEmail.innerText = ""
                errorPassword.innerText = ""
                errorPassword.innerText = "Please write your password"
            }
            // Khi rơi vào else chắc chẵn đã điền đủ thông tin không chừa trông
            else {
                // Kiểm tra tính đúng sai của email và pass
                let listAccount = JSON.parse(localStorage.getItem("listAccount"))
                for (let i = 0; i < listAccount.length; i++) {
                    if (inputEmail.value == listAccount[i].email && inputPassword.value == listAccount[i].password) {
                        errorEmail.innerText = ""
                        errorPassword.innerText = ""
                        location.href = "index.html"
                        localStorage.setItem("user", listAccount[i].email)
                        localStorage.setItem("password", listAccount[i].password)
                        return
                    }
                    else if (inputEmail.value == listAccount[i].email && inputPassword.value != "") {
                        errorEmail.innerText = ""
                        errorPassword.innerText = ""
                        errorPassword.innerText = "Incorrect password"
                        return
                    }
                    else if (inputEmail.value != "" && inputPassword.value == listAccount[i].password) {
                        errorEmail.innerText = ""
                        errorPassword.innerText = ""
                        errorEmail.innerText = "Incorrect email"
                        return
                    }
                }
                errorEmail.innerText = ""
                errorPassword.innerText = ""
                errorEmail.innerText = "Incorrect email and password"
                errorPassword.innerText = "Incorrect email and password"
            }
        }
        else {
            alert("Don't have any accounts available")
        }
    }
    else if (m == 2) {
        // Kiểm tra đã có bất kì tài khoản nào hay chưa ?
        // listAccount là danh sách những tài khoản đã đăng kí
        if (localStorage.getItem("listAccount")) {
            listAccount = JSON.parse(localStorage.getItem("listAccount"))
            console.log(listAccount)
            // Kiểm tra có bị trùng email đã đăng kí hay không ?
            for (let i = 0; i < listAccount.length; i++) {
                if (inputEmail.value == listAccount[i].email && inputPassword.value == listAccount[i].password) {
                    errorEmail.innerText = ""
                    errorPassword.innerText = ""
                    errorEmail.innerText = "This email has already been used"
                    errorPassword.innerText = "This password has already been used"
                    return
                }
                else if (inputEmail.value == listAccount[i].email) {
                    errorEmail.innerText = ""
                    errorPassword.innerText = ""
                    errorEmail.innerText = "This email has already been used"
                    return
                }
                else if (inputPassword.value == listAccount[i].password) {
                    errorEmail.innerText = ""
                    errorPassword.innerText = ""
                    errorPassword.innerText = "This password has already been used"
                    return
                }
            }
            // function giúp thêm tạo và thêm account vào listAccount
            createAcount()
        }
        else {
            let listAccount = []
            // function giúp thêm tạo và thêm account vào listAccount
            createAcount()
        }
    }

})
function createAcount() {
    //Kiểm tra coi đã nhập đầy đủ thông tin email và password đăng kí
    if (inputEmail.value == "" && inputPassword.value != "") {
        errorEmail.innerText = ""
        errorPassword.innerText = ""
        errorEmail.innerText = "Please write your email"
    }
    else if (inputEmail.value != "" && inputPassword.value == "") {
        errorEmail.innerText = ""
        errorPassword.innerText = ""
        errorPassword.innerText = "Please write your password"
    }
    else if (inputEmail.value == "" && inputPassword.value == "") {
        errorEmail.innerText = ""
        errorPassword.innerText = ""
        errorEmail.innerText = "Please write your email"
        errorPassword.innerText = "Please write your password"
    }
    else {
        // Check xem đã tồn tại listAccount chưa ?
        // Lý do phải xác định thêm lần nữa dù đã xác định ở dòng 71 là :
        // Function() không quan tâm những giá trị được gọi ở ngoài, chỉ quan tâm những giá trị được gọi ở trong
        if (localStorage.getItem("listAccount")) {
            listAccount = JSON.parse(localStorage.getItem("listAccount"))
            let account = {
                email: inputEmail.value,
                password: inputPassword.value,
            }
            listAccount.push(account)
            localStorage.setItem("listAccount", JSON.stringify(listAccount))
        }
        else {
            let listAccount = []
            let account = {
                email: inputEmail.value,
                password: inputPassword.value,
            }
            listAccount.push(account)
            localStorage.setItem("listAccount", JSON.stringify(listAccount))
        }
        location.reload()
    }
}
