let amountBag = document.querySelector(".amountBag")
let amount = parseInt(localStorage.getItem("amountBag"))
amountBag.innerHTML = `Products : ${amount}`
let shoppingBag = document.querySelector(".shoppingBag")
let arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"))
let addProduct = ""
for (let i = 0; i < arrayProduct.length; i++) {
    addProduct += `
            <div class="row mt-5">
            <div class="col-12 bg-gray" style="height: 3px;"></div>
            <img class="col-lg-3 col-4"
            src="${arrayProduct[i].img}">
            <div class="col-lg-9 col-12">
            <div class="d-flex-between w-100 h-50">
            <h4 class="w-50">${arrayProduct[i].nameProduct}</h4>
            <h4>1</h4>
            <h4>${arrayProduct[i].price}</h4>
            </div>
            <div class="w-100 h-50 row ">
            <div class="col-6 h-50">Pay 0% APR for 12 months</div>
            <div class="col-6 h-50 d-flex" style="justify-content: end ;">$4.92/mo.</div>
            <div class="col-6 h-50"></div>
            <a href="#" class="col-6 h-50 headList-a-nor d-flex cur-pointer removeButton"
            style="justify-content: end ; color: blue">Remove</a>
            </div>
            <div class="col-12 bg-gray" style="height: 3px;"></div>
            </div>
            </div>
            `
}
shoppingBag.innerHTML = addProduct
let removeButton = document.querySelectorAll(".removeButton")
for (let i = 0; i < removeButton.length; i++) {
    removeButton[i].addEventListener("click", function () {
        removeButton[i].parentElement.parentElement.parentElement.remove()
        arrayProduct.pop([i]);
        console.log(arrayProduct)
        amount = amount - 1
        amountBag.innerHTML = `Products : ${amount}`
        localStorage.setItem("amountBag", amount)
        localStorage.setItem("arrayProduct", JSON.stringify(arrayProduct))
    })
}