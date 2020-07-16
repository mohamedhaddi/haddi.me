let logoElement = document.querySelector("#logo");
let toggleElement = document.querySelector("#toggle");

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
    }, 700);
});

/* copying the intended text instead of the default
 * one (which is also haddi.me but since i devided it
 * into spans only parts of it gets copied)
 */
logoElement.addEventListener("copy", (event) => {
    event.preventDefault();
    event.clipboardData.setData("text", "haddi.me");
});

/* change colors when toggle dark/night modes */
function isChecked(toggleElement) {
    var a = document.getElementsByTagName("a");
    document.querySelector(".body-helper").style.opacity = toggleElement.checked
        ? "1"
        : "0";
    logoElement.style.color = toggleElement.checked ? "#202040" : "#c0cfff";
    document.querySelector(".container").style.color = toggleElement.checked
        ? "#202040"
        : "#c0cfff";
    for (var i = 0; i < a.length; i++) {
        a[i].style.color = toggleElement.checked ? "#202040" : "#c0cfff";
    }
}

