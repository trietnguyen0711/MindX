function decoration() {
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
decoration()