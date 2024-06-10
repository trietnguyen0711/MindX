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
let e = 0
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
    if (e == 0) {
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
                        // Nhiều tài khoản nên phải sử dụng if để bt khi nào là lần cuối
                        if (i == listAccount.length - 1) {
                            if (inputEmail.value == listAccount[i].email && inputPassword.value == listAccount[i].password) {
                                errorEmail.innerText = ""
                                errorPassword.innerText = ""
                                location.href = "index.html"
                                localStorage.setItem("user", listAccount[i].email)
                                localStorage.setItem("password", listAccount[i].password)
                                return
                            }
                            else if (inputEmail.value == listAccount[i].email && inputPassword.value != listAccount[i].password) {
                                errorEmail.innerText = ""
                                errorPassword.innerText = ""
                                errorPassword.innerText = "Incorrect password"
                                return
                            }
                            else if (inputEmail.value != listAccount[i].email && inputPassword.value == listAccount[i].password) {
                                errorEmail.innerText = ""
                                errorPassword.innerText = ""
                                errorEmail.innerText = "Incorrect email"
                                return
                            }
                            errorEmail.innerText = ""
                            errorPassword.innerText = ""
                            errorEmail.innerText = "Incorrect email and password"
                            errorPassword.innerText = "Incorrect email and password"
                        }
                        else {
                            if (inputEmail.value == listAccount[i].email && inputPassword.value == listAccount[i].password) {
                                errorEmail.innerText = ""
                                errorPassword.innerText = ""
                                location.href = "index.html"
                                localStorage.setItem("user", listAccount[i].email)
                                localStorage.setItem("password", listAccount[i].password)
                            }
                            else if (inputEmail.value == listAccount[i].email && inputPassword.value != listAccount[i].password) {
                                errorEmail.innerText = ""
                                errorPassword.innerText = ""
                                errorPassword.innerText = "Incorrect password"
                                // Đúng email mà sai password thì ko cần KT đến thằng cuối nên return
                                return
                            }
                            // Vì nhiều email có cùng 1 password nên ko cần điều kiện này (chỉ kiểm tra sai email đối với thằng cuối cùng)
                            // else if (inputEmail.value != listAccount[i].email && inputPassword.value == listAccount[i].password) {
                            //     errorEmail.innerText = ""
                            //     errorPassword.innerText = ""
                            //     errorEmail.innerText = "Incorrect email"
                            // }
                        }
                    }
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
                        // errorPassword.innerText = "This password has already been used"
                        return
                    }
                    else if (inputEmail.value == listAccount[i].email) {
                        errorEmail.innerText = ""
                        errorPassword.innerText = ""
                        errorEmail.innerText = "This email has already been used"
                        return
                    }
                    // else if (inputPassword.value == listAccount[i].password) {
                    //     errorEmail.innerText = ""
                    //     errorPassword.innerText = ""
                    //     errorPassword.innerText = "This password has already been used"
                    //     return
                    // }
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
    }
    else {
        // Kiểm tra rỗng và độ chính xác input
        let passwordConfirm = localStorage.getItem("passwordConfirm")
        if (inputPassword.value == "") {
            errorPassword.innerText = "Please enter your password"
        }
        else {
            // Vẫn chả hiểu sao mà phải chuyển "inputPassword.value" và sử dụng dấu "==" để vừa so sánh định dạng và nội dung
            // Khi ghi "inputPassword.value = passwordConfirm" thì website mặc định cho đúng không chịu vào else dù gõ sai nội dung
            if (JSON.stringify(inputPassword.value) == passwordConfirm) {
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
            else {
                errorPassword.innerText = "Wrong password. Please try again"
            }
        }
    }

})
let emailNone = document.querySelector(".emailNone")
let pass = document.querySelector(".pass")
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
        // lưu lên local biến passwordConfirm với mục đích chuyển giao cho thằng passwordConfirm ở dòng 149
        localStorage.setItem("passwordConfirm", JSON.stringify(inputPassword.value))
        // Xóa input Email đồng thời thay đổi nội dung Pass thành confirm password
        errorEmail.innerText = ""
        errorPassword.innerText = ""
        inputEmail.classList.add("d-none")
        emailNone.classList.add("d-none")
        pass.innerHTML = "Confirm your password"
        btn.innerHTML = "Confirm"
        inputPassword.value = ""
        // Biến e giúp xác định trạng thái của website khi e=0 là trạng thái bình thường (sign in hoặc sign up => phương pháp giống biến m ở trên) 
        // Khi e = 1 đồng nghĩa website đang ở trạng thái confirm
        e = 1
    }
}
