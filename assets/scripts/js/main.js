let logoElement = document.querySelector("#logo");

/* delaying the logo's hyperlink target (homepage)
 * until after hover's transition effect, to fix the
 * problem of the hover effect taking place until
 * clicking in mobile devices, which results in the
 * page loading before the transition is finished
 */
logoElement.addEventListener("click", (event) => {
    event.preventDefault();
    setTimeout(function () {
        window.location.href = ".";
    }, 500);
});

/* copying the intended text instead of the default
 * one (which is also haddi.me but since i devided it
 * into spans only parts of it gets copied)
 */
logoElement.addEventListener("copy", (event) => {
    event.preventDefault();
    event.clipboardData.setData("text", "haddi.me");
});
