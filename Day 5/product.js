let changeableImg = document.querySelectorAll(".changeableImg")
let changeableContent = document.querySelector(".changeableContent")
changeableContent.innerHTML = `
<h6 style="color:red">New</h6>
<h3 class="w-100">${localStorage.getItem("typeProduct")}</h3>
<h5>${localStorage.getItem("price")}</h5>`
for (let i = 0; i < changeableImg.length; i++) {
    changeableImg[i].innerHTML = `<img class="bor-rad-nor h-100"
    src="${localStorage.getItem("img")}"
    alt="">`
}
