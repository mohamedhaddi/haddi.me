/* delaying the logo's hyperlink target (homepage)
 * until after hover's transition effect, to fix the
 * problem of the hover effect taking place until
 * clicking in mobile devices, which results in the
 * page loading before the transition is finished
 */
logo = document.getElementById("logo");
logo.addEventListener("click", (event) => {
	event.preventDefault();
	setTimeout(function () {
		window.location.href = "../index.html";
	}, 700);
});

/* get current year to put in the footer */
year = document.getElementById("year");
year.innerHTML = new Date().getFullYear();

/* change language */
lang = document.getElementById("lang");
enMain = document.getElementById("en");
arMain = document.getElementById("ar");
lang.addEventListener("click", () => {
	if (lang.innerText === "English") {
		displayEnglish();
	} else {
		displayArabic();
	}
});
if (window.location.href.includes("#ar"))
	displayArabic();

function displayEnglish() {
	enMain.style.display = "block";
	arMain.style.display = "none";
	lang.innerHTML = "عربية";
	lang.href = "#en";
	lang.style.marginTop = "0.7em";
	enMain.querySelectorAll(".contact-link").forEach((a) => {
		a.style.marginLeft = "0.3em";
	});
}

function displayArabic() {
	arMain.style.display = "block";
	enMain.style.display = "none";
	lang.innerHTML = "English";
	lang.href = "#ar";
	lang.style.marginTop = "0.8em";
	arMain.querySelectorAll(".contact-link").forEach((a) => {
		a.style.marginRight = "0.3em";
	});
}
