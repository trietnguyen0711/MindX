let html = ""
for (let i = 0; i < data.length; i++) {
    let img = data[i].img;
    let nameProduct = data[i].nameProduct;
    let price = data[i].price;
    console.log(img)
    html += `
    <div class="size-products bor-rad-nor p-3 color-black me-5 bg-white">
    <img class="h-75 w-100 bor-rad-nor changeImg"
    src="${img}"
    alt="">
    <h6 style="color:red">New</h6>
    <h3 class="identityProduct">${nameProduct}</h3>
    <div class="d-flex-between w-100">
    <h5 class="price">$${price}.00 </h5>
    <button type="button" class="btn btn-primary"><a class="headList-a-nor"
    style="color: black;">Buy now</a></button>
    </div>
    </div>
    `
}
let listProduct = document.querySelector(".listProduct").innerHTML = html
let identityProduct = document.querySelectorAll(".identityProduct")
let changeImg = document.querySelectorAll(".changeImg")
let price = document.querySelectorAll(".price")
let bagContent = document.querySelector(".bagContent")
let button = document.querySelectorAll(".btn")
if (localStorage.getItem("amountBag")) {
    count = localStorage.getItem("amountBag")
}
else {
    count = parseInt(bagContent.textContent)
    localStorage.setItem("amountBag", count)
}
bagContent.innerHTML = `${count}`
for (let i = 0; i < button.length; i++) {
    let k = button[i];
    k.addEventListener("click", function () {
        location.href = "product.html"
        localStorage.setItem("typeProduct", data[i].nameProduct)
        localStorage.setItem("img", data[i].img)
        localStorage.setItem("price", data[i].price)
    })
}
