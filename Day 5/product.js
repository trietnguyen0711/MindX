let changeableImg = document.querySelectorAll(".changeableImg")
let changeableContent = document.querySelector(".changeableContent")
let bagContent = document.querySelector(".bagContent")
let btn = document.querySelector(".btn")
let countBag = localStorage.getItem("amountBag")
countBag = parseInt(countBag)
bagContent.innerHTML = `${countBag}`
let inforProduct = {
    nameProduct: localStorage.getItem("typeProduct"),
    price: localStorage.getItem("price"),
    img: localStorage.getItem("img")
}
console.log(inforProduct)
btn.addEventListener("click", function () {
    countBag = countBag + 1
    bagContent.innerHTML = `${countBag}`
    localStorage.setItem("amountBag", countBag)
    if (localStorage.getItem("arrayProduct")) {
        let arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"))
        arrayProduct.push(inforProduct)
        localStorage.setItem("arrayProduct", JSON.stringify(arrayProduct))
    }
    else {
        let arrayProduct = []
        arrayProduct.push(inforProduct)
        localStorage.setItem("arrayProduct", JSON.stringify(arrayProduct))
    }
})
changeableContent.innerHTML = `
<h6 style="color:red">New</h6>
<h3 class="w-100">${localStorage.getItem("typeProduct")}</h3>
<h5>${localStorage.getItem("price")}</h5>`
for (let i = 0; i < changeableImg.length; i++) {
    changeableImg[i].innerHTML = `<img class="bor-rad-nor h-100"
    src="${localStorage.getItem("img")}"
    alt="">`
}
