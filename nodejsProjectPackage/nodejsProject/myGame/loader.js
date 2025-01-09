window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");

    loader.addEventListener9("transitionend", () => {
        document.body.removeChild("loader");
    })
})