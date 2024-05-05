
let html = ""
for (let i = 0; i < data.length; i++) {
    let inforProduct = {
        img: data[i].img,
        nameProduct: data[i].nameProduct,
        price: data[i].price,
        id: data[i].id
    }
    html += `<div class="size-products bor-rad-nor p-3 color-black me-5 bg-white">
    <img class="h-75 w-100 bor-rad-nor changeImg"
    src="${inforProduct.img}"
    alt="">
    <h6 style="color:red">New</h6>
    <h3 class="identityProduct">${inforProduct.nameProduct}</h3>
    <div class="d-flex-between w-100">
    <h5 class="price">$${inforProduct.price}.00 </h5>
    <button type="button" class="btn btn-primary" onclick="buttonInfor(${inforProduct.id})"><a class="headList-a-nor"
    style="color: black;">Buy now</a></button>
    </div>
    </div>
`
}
let listProduct = document.querySelector(".listProduct").innerHTML = html
function buttonInfor(id) {
    function findProduct() {
        for (let i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                return data[i];
            }
        }
    }
    let product = findProduct(id)
    localStorage.setItem("img", product.img)
    localStorage.setItem("nameProduct", product.nameProduct)
    localStorage.setItem("price", product.price)
    localStorage.setItem("id", product.id)
    location.href = "product.html"
}
let amountProduct = document.querySelector(".amountProduct")
if (localStorage.getItem("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart"))
    amountProduct.innerText = cart.length
}
else {
    amountProduct.innerText = 0
}