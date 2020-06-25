let logoElement = document.querySelector("#logo");
logoElement.addEventListener("click", function (e) {
    e.preventDefault();
    setTimeout(function () {
        window.location.href = ".";
    }, 500);
});
