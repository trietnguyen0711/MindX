function scrolling() {
    // Scrolling
    let lastScrollTop = 0
    let header = document.querySelector(".header")
    console.log(header)
    window.addEventListener("scroll", () => {
        let currentScroll = window.scrollY
        if (currentScroll > lastScrollTop) {
            header.classList.add("-translate-y-full")
        }
        else {
            header.classList.remove("-translate-y-full")
        }
        lastScrollTop = currentScroll
    })
}
function opacityAnimation() {
    let opacityAnimation = document.querySelectorAll(".opacityAnimation");
    let leftAnimation = document.querySelectorAll(".leftAnimation")
    let rightAnimation = document.querySelectorAll(".rightAnimation")
    console.log(leftAnimation)
    window.addEventListener("scroll", () => {
        for (let i = 0; i < opacityAnimation.length; i++) {
            setTimeout(() => {
                let elementRect = opacityAnimation[i].getBoundingClientRect();
                if (!(elementRect.top < 0 || elementRect.top > window.innerHeight)) {
                    opacityAnimation[i].classList.add("opacity-Animation");
                }
            }, i * 200)
        }
        for (let i = 0; i < leftAnimation.length; i++) {
            setTimeout(() => {
                let elementRect1 = leftAnimation[i].getBoundingClientRect()
                if (!(elementRect1.top < 0 || elementRect1.top > window.innerHeight)) {
                    leftAnimation[i].classList.add("left-Animation");
                }
            }, i * 200)
        }
        for (let i = 0; i < rightAnimation.length; i++) {
            setTimeout(() => {
                let elementRect2 = rightAnimation[i].getBoundingClientRect()
                if (!(elementRect2.top < 0 || elementRect2.top > window.innerHeight)) {
                    rightAnimation[i].classList.add("right-Animation");
                }
            }, i * 200);
        }
    })
}
scrolling()
opacityAnimation()
