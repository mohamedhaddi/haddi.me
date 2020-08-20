let logoElement = document.querySelector("#logo");
let toggleElement = document.querySelector("#toggle");
let paragraphsElements = document.querySelector("#container").children;
let languageElement = document.querySelector("#language");

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
        ? "0"
        : "1";
    logoElement.style.color = toggleElement.checked ? "#202040" : "#c0cfff";
    document.querySelector("#container").style.color = toggleElement.checked
        ? "#c0cfff"
        : "#202040";
    for (var i = 0; i < a.length; i++) {
        a[i].style.color = toggleElement.checked ? "#c0cfff" : "#202040";
    }
}

/* quick, temporary ugly code for changing the language */
languageElement.addEventListener("click", (event) => {
    if (languageElement.getAttribute("href") === "#en") {
        languageElement.href = "#ar";
        paragraphsElements.item(1).innerHTML =
            "\
مرحبًا،<br>\
    اسمي محمّد هدّي.<br>\
        أكتب أكواد برمجيّة، أصمّم، أصوّر وأنتج مرئيّات (وأحيانًا موسيقى).<br>\
    ";
        paragraphsElements.item(2).innerHTML =
            '\
        بينما أعمل على هذا الموقع، يمكنك زيارتي في إحدى المواقع أسفله أو \
        <a id="email" href="mailto:m.haddi.95@gmail.com?subject=haddi.me inquiry: ">مراسلتي</a>\
        عبر البريد الالكترونيّ.\
        ';
        paragraphsElements.item(1).setAttribute("dir", "rtl");
        paragraphsElements.item(2).setAttribute("dir", "rtl");
        document.querySelector("#email").style.color = toggleElement.checked
            ? "#202040"
            : "#c0cfff";
        document.querySelector("#container").style.fontWeight = "bold";
        paragraphsElements.item(3).style.flexDirection = "row-reverse";
        document
            .getElementsByClassName("icon")
            .item(0)
            .setAttribute("alt", "Translate to English");
        document
            .getElementsByClassName("icon")
            .item(0)
            .setAttribute("title", "translate to English");
        document
            .getElementsByClassName("icon")
            .item(1)
            .setAttribute("alt", "صفحتي في لينكد إن");
        document
            .getElementsByClassName("icon")
            .item(1)
            .setAttribute("title", "صفحتي في لينكد إن");
        document
            .getElementsByClassName("icon")
            .item(2)
            .setAttribute("alt", "مجلّد نماذج أعمالي على جوجل درايف");
        document
            .getElementsByClassName("icon")
            .item(2)
            .setAttribute("title", "مجلّد نماذج أعمالي على جوجل درايف");
        document
            .getElementsByClassName("icon")
            .item(3)
            .setAttribute("alt", "صوري الفوتوغرافيّة على فليكر");
        document
            .getElementsByClassName("icon")
            .item(3)
            .setAttribute("title", "صوري الفوتوغرافيّة على فليكر");
        document
            .getElementsByClassName("icon")
            .item(4)
            .setAttribute("alt", "صفحتي على ساوندكلاود");
        document
            .getElementsByClassName("icon")
            .item(4)
            .setAttribute("title", "صفحتي على ساوندكلاود");
        document
            .getElementsByClassName("icon")
            .item(5)
            .setAttribute("alt", "حادثني على واتساب");
        document
            .getElementsByClassName("icon")
            .item(5)
            .setAttribute("title", "حادثني على واتساب");
    } else if (languageElement.getAttribute("href") === "#ar") {
        languageElement.href = "#en";
        paragraphsElements.item(1).innerHTML =
            "\
            hi,<br>\
            my name is mohamed haddi.<br>\
            i code, design, take photos and make videos (and music sometimes).<br>\
        ";
        paragraphsElements.item(2).innerHTML =
            '\
        while i\'m working on this website, you can check me out \
        on one of the links below or \
        <a id="email" href="mailto:m.haddi.95@gmail.com?subject=haddi.me inquiry: " >email me</a >.\
        ';
        paragraphsElements.item(1).setAttribute("dir", "ltr");
        paragraphsElements.item(2).setAttribute("dir", "ltr");
        document.querySelector("#email").style.color = toggleElement.checked
            ? "#202040"
            : "#c0cfff";
        document.querySelector("#container").style.fontWeight = "initial";
        paragraphsElements.item(3).style.flexDirection = "row";
        document
            .getElementsByClassName("icon")
            .item(0)
            .setAttribute("alt", "ترجم إلى العربيّة");
        document
            .getElementsByClassName("icon")
            .item(0)
            .setAttribute("title", "ترجم إلى العربيّة");
        document
            .getElementsByClassName("icon")
            .item(1)
            .setAttribute("alt", "my LinkedIn profile");
        document
            .getElementsByClassName("icon")
            .item(1)
            .setAttribute("title", "my LinkedIn profile");
        document
            .getElementsByClassName("icon")
            .item(2)
            .setAttribute("alt", "my portfolio on Google Drive");
        document
            .getElementsByClassName("icon")
            .item(2)
            .setAttribute("title", "my portfolio on Google Drive");
        document
            .getElementsByClassName("icon")
            .item(3)
            .setAttribute("alt", "my Flickr gallery");
        document
            .getElementsByClassName("icon")
            .item(3)
            .setAttribute("title", "my Flickr gallery");
        document
            .getElementsByClassName("icon")
            .item(4)
            .setAttribute("alt", "my SoundCloud");
        document
            .getElementsByClassName("icon")
            .item(4)
            .setAttribute("title", "my SoundCloud");
        document
            .getElementsByClassName("icon")
            .item(5)
            .setAttribute("alt", "chat with me on WhatsApp");
        document
            .getElementsByClassName("icon")
            .item(5)
            .setAttribute("title", "chat with me on WhatsApp");
    }
});

