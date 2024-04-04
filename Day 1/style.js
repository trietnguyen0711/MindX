let name1 = prompt("Nhập tên của bạn:")
let age = prompt("Nhập tuổi của bạn:")
let isMale = prompt("Giới tính của bạn:")
let k = document.getElementById(`top1`)
let f = document.getElementById(`top2`)
let g = document.getElementById(`top3`)
let a = `Tôi tên là ${name1}, ${age} tuổi, giới tính là ${isMale} `
let b = `Đây là những sở thích của tôi`
let c = []
let firstHabit = prompt(`Sở thích đầu tiên của bạn:`)
c.push(firstHabit)
let secondHabit = prompt(`Sở thích thứ hai của bạn:`)
c.push(secondHabit)
let thirdHabit = prompt(`Sở thích thứ ba của bạn:`)
c.push(thirdHabit)
let m = `Chào mứng đến với app`
let n = ``
console.log(a)
console.log(b)
console.log(c)
function changing() {
    k.innerText = a;
    f.innerText = b;
    g.innerText = c;
}
function reset() {
    k.innerText = m;
    f.innerText = n;
    g.innerText = n;
}

