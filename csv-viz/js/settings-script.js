const raw_input_div = document.querySelector('.raw-input')
const raw_input_label = raw_input_div.querySelector('label')
const raw_input = raw_input_div.querySelector('input')
const raw_input_file_reader = new FileReader()
const scored_outpout_file_reader = new FileReader()
const checkmark = document.createElement('img')
checkmark.src = "./media/checkmark.svg"
checkmark.style.width = "0.95em"
checkmark.style.marginRight = "0.4em"

let parsed_raw_input;
let parsed_scored_output;

// Alert FileReader upon uploading a new file into "raw input"

raw_input.onchange = (csv_path) => {
  const [file] = csv_path.target.files
  raw_input_file_reader.readAsBinaryString(file)
}

// Read uploaded "raw input" file

raw_input_file_reader.onload = (csv_string) => {

  if (csv_string.target.result.split(",")[0] != "Doc #") {

    alert("Please insert the raw input CSV file first.")
    raw_input.value = ""

  }

  else {

    raw_input.disabled = true;
    raw_input_label.innerHTML = checkmark.outerHTML + "Please choose the <span class='bold dotted-underline'>raw input</span> CSV file:"
    raw_input_label.style.color = "grey"

    parsed_raw_input = CSVJSON.csv2json(csv_string.target.result)

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
    raw_input_div.insertAdjacentHTML('afterEnd', scored_output_div.outerHTML)

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

    if (csv_string.target.result.split(",")[0] == "Doc #") {

      alert("Please insert the scored output CSV file.")
      scored_output.value = ""

    }

    else {

      scored_output.disabled = true;
      scored_output_label.innerHTML = checkmark.outerHTML + "Please choose the <span class='bold dotted-underline'>scored output</span> CSV file:"
      scored_output_label.style.color = "grey"
      raw_input_label.style.marginRight = "2em"

      parsed_scored_output = CSVJSON.csv2json(csv_string.target.result)

      // localStorage.setItem('parsed_raw_input', JSON.stringify(parsed_raw_input));
      // localStorage.setItem('parsed_scored_output', JSON.stringify(parsed_scored_output));

      window.location.href = "./results.html?parsed_raw_input=" + encodeURIComponent(JSON.stringify(parsed_raw_input)) + "&parsed_scored_output=" + encodeURIComponent(JSON.stringify(parsed_scored_output))
      // window.location.href = "https://haddi.me/viz/results.html"
      // window.location.replace("https://haddi.me/viz/results.html?parsed_raw_input=" + encodeURIComponent(JSON.stringify(parsed_raw_input)) + "&parsed_scored_output=" + encodeURIComponent(JSON.stringify(parsed_scored_output)))
      // window.location.href = "./results.html"

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
