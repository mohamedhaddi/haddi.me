// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOtooETbm5g0rgNWTfEmZHITWmcsGZUio",
  authDomain: "veritasnlp.firebaseapp.com",
  databaseURL: "https://veritasnlp-default-rtdb.firebaseio.com",
  projectId: "veritasnlp",
  storageBucket: "veritasnlp.appspot.com",
  messagingSenderId: "597324363268",
  appId: "1:597324363268:web:990dda134043b2d6566751",
  measurementId: "G-4LYN2E6C23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const sign_in_btn = document.querySelector('.sign-in-btn');
const sign_out_btn = document.querySelector('.sign-out-btn');

sign_in_btn.onclick = () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  signInWithEmailAndPassword(auth, email, password)
    .then((user_credential) => {
      // Signed in 
      const user = user_credential.user;
    })
    .catch((error) => {
      // const error_code = error.code;
      // const error_message = error.message;
      alert(`Error: ${error.code}`);
    });
}

sign_out_btn.onclick = () => {
  signOut(auth).then(() => {
    console.log("Signed out.")
  }).catch((error) => {
    // const error_code = error.code;
    // const error_message = error.message;
    alert(`Error: ${error.code}`);
  });
}

const signed_in = document.getElementById('signed-in');
const signed_out = document.getElementById('signed-out');

onAuthStateChanged(auth, (user) => {

  if (user) {

    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    signed_in.hidden = false;
    signed_out.hidden = true;
    const uid = user.uid;

    const wrapper = signed_in.querySelector(".wrapper")
    const raw_input_div = document.querySelector('.raw-input')
    const raw_input_label = raw_input_div.querySelector('label')
    const raw_input = raw_input_div.querySelector('input')
    const raw_input_file_reader = new FileReader()
    const scored_outpout_file_reader = new FileReader()
    const image_file_reader = new FileReader
    const checkmark = document.createElement('img')
    checkmark.src = "./media/checkmark.svg"
    checkmark.style.width = "0.95em"
    checkmark.style.marginRight = "0.4em"

    let raw_input_csv_string;
    let scored_output_csv_string;

    // Alert FileReader upon uploading a new file into "raw input"

    raw_input.onchange = (csv_path) => {
      const [file] = csv_path.target.files
      raw_input_file_reader.readAsBinaryString(file)
    }

    // Read uploaded "raw input" file

    raw_input_file_reader.onload = (csv_string) => {

      if (!csv_string.target.result.split(",")[0].includes("Doc #")) {

        alert("Please insert the raw input CSV file first.")
        raw_input.value = ""

      }

      else {

        raw_input.disabled = true;
        raw_input_label.innerHTML = checkmark.outerHTML + "Please choose the <span class='bold dotted-underline'>raw input</span> CSV file:"
        raw_input_label.style.color = "grey"

        raw_input_csv_string = csv_string.target.result

        sign_out_btn.style.marginTop = "1em"

        const scored_output_div = document.createElement('div')
        scored_output_div.className = "scored-output"

        const scored_output_label = document.createElement('label')
        scored_output_label.for = "scored-output"
        scored_output_label.innerHTML = "Please choose the <span class='bold dotted-underline'>scored output</span> CSV file:"

        const scored_output = document.createElement('input')
        scored_output.type = "file"
        scored_output.id = "scored-output"
        scored_output.name = "scored-output"
        scored_output.accept = ".csv"

        scored_output_div.appendChild(scored_output_label)
        scored_output_div.appendChild(scored_output)
        raw_input_div.insertAdjacentElement('afterEnd', scored_output_div)

      }

    }

    waitForElm('.scored-output').then(() => {

      const scored_output_div = document.querySelector('.scored-output')
      const scored_output_label = scored_output_div.querySelector('label')
      const scored_output = scored_output_div.querySelector('input')

      // Alert FileReader upon uploading a new file into "scored output"

      scored_output.onchange = (csv_path) => {
        const [file] = csv_path.target.files
        scored_outpout_file_reader.readAsBinaryString(file)
      }

      // Read uploaded "scored output" file

      scored_outpout_file_reader.onload = (csv_string) => {

        if (csv_string.target.result.split(",")[0].includes("Doc #")) {

          alert("Please insert the scored output CSV file.")
          scored_output.value = ""

        }

        else {

          scored_output.disabled = true;
          scored_output_label.innerHTML = checkmark.outerHTML + "Please choose the <span class='bold dotted-underline'>scored output</span> CSV file:"
          scored_output_label.style.color = "grey"
          raw_input_label.style.marginRight = "2em"

          scored_output_csv_string = csv_string.target.result

          sign_out_btn.style.width = `${raw_input_div.offsetWidth}px`

          const title_label = document.createElement("label")
          title_label.htmlFor = "title"
          title_label.innerHTML = "Title:"
          const title_input = document.createElement("input")
          title_input.type = "text"
          title_input.name = "title"

          const title_div = document.createElement("div")
          title_div.className = "title"
          title_div.style.width = `${raw_input_div.offsetWidth}px`

          title_div.appendChild(title_label)
          title_div.appendChild(title_input)

          const description_label = document.createElement("label")
          description_label.htmlFor = "description"
          description_label.innerHTML = "Description:"
          const description_input = document.createElement("input")
          description_input.type = "text"
          description_input.name = "description"

          const description_div = document.createElement("div")
          description_div.className = "description"
          description_div.style.width = `${raw_input_div.offsetWidth}px`

          description_div.appendChild(description_label)
          description_div.appendChild(description_input)

          const image_label = document.createElement("label")
          image_label.htmlFor = "image"
          image_label.innerHTML = "Image:"
          const image_input = document.createElement("input")
          image_input.type = "file"
          image_input.name = "image"
          image_input.accept = "image/*"

          const image_div = document.createElement("div")
          image_div.className = "image"
          image_div.style.width = `${raw_input_div.offsetWidth}px`

          image_div.appendChild(image_label)
          image_div.appendChild(image_input)

          const auto_delete_label = document.createElement("label")
          auto_delete_label.htmlFor = "auto-delete"
          auto_delete_label.innerHTML = "Auto-delete after:"
          const auto_delete_input = document.createElement("input")
          auto_delete_input.type = "number"
          auto_delete_input.name = "auto-delete"
          auto_delete_input.value = 30;
          auto_delete_input.min = 0;
          const auto_delete_suffix = document.createElement("span")
          auto_delete_suffix.innerHTML = "days."
          auto_delete_suffix.style.marginLeft = "0.2em"

          const auto_delete_div = document.createElement("div")
          auto_delete_div.className = "auto-delete"
          auto_delete_div.style.width = `${raw_input_div.offsetWidth}px`

          auto_delete_div.appendChild(auto_delete_label)
          auto_delete_div.appendChild(auto_delete_input)
          auto_delete_div.appendChild(auto_delete_suffix)

          const submit_button = document.createElement("input")
          submit_button.classList.add("submit")
          submit_button.classList.add("bold")
          submit_button.style.width = `${raw_input_div.offsetWidth}px`
          submit_button.type = "submit"
          submit_button.value = "Submit"

          scored_output_div.insertAdjacentElement("afterEnd", title_div)
          title_div.insertAdjacentElement("afterEnd", description_div)
          description_div.insertAdjacentElement("afterEnd", image_div)
          image_div.insertAdjacentElement("afterEnd", auto_delete_div)
          auto_delete_div.insertAdjacentElement("afterEnd", submit_button)

          submit_button.addEventListener("click", () => {

            const submitted_title = document.querySelector(".title input").value
            const submitted_description = document.querySelector(".description input").value
            const submitted_days = document.querySelector(".auto-delete input").value

            if (!submitted_title)
              alert("Please enter a title.")
            else if (!submitted_description)
              alert("Please enter a description.")
            else if (!image_input.value)
              alert("Please upload your desired image.")
            else if (!submitted_days || submitted_days < 0)
              alert("Please enter a positive value for auto-delete.")
            else {

              const image_input = document.querySelector(".image input")
              const image_input_file = image_input.files[0]

              image_file_reader.readAsDataURL(image_input_file)
              image_file_reader.onload = async () => {

                const submitted_image = image_file_reader.result

                const data = {
                  title: submitted_title,
                  description: submitted_description,
                  image_base64: submitted_image,
                  raw_input: JSON.stringify(CSVJSON.csv2json(raw_input_csv_string)),
                  scored_output: JSON.stringify(CSVJSON.csv2json(scored_output_csv_string)),
                  auto_delete_day: Date.now() + (submitted_days * 24 * 60 * 60 * 1000)
                }

                const options = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data)
                }

                user.getIdToken(true).then(async id_token => {

                  const response = await fetch(
                    `https://veritasnlp-default-rtdb.firebaseio.com/results.json?auth=${id_token}`,
                    options
                  );
                  const response_data = await response.json();

                  if (response_data.error) {
                    alert("Error: " + response_data.error);
                    return;
                  }
                  else {
                    window.location.href = `../?id=${response_data.name}`
                  }

                }).catch(error => {
                  alert(error);
                });

              }

            }

          })

        }

      }

    });

    function waitForElm(selector) {
      return new Promise(resolve => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
            resolve(document.querySelector(selector));
            observer.disconnect();
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      });
    }

    sign_out_btn.style.width = `${raw_input_div.offsetWidth}px`

  } else {

    signed_in.hidden = true;
    signed_out.hidden = false;

    sign_in_btn.style.width = `${document.querySelector('.email').offsetWidth}px`

  }
});

