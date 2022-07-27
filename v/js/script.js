getData();

const toggleBold = selector => selector.classList.toggle('bold');
const addHoverListeners = (trigger, target) => {
  trigger.addEventListener('mouseover', () => toggleBold(target));
  trigger.addEventListener('mouseout', () => toggleBold(target));
};

async function getData() {

  let data;

  try {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const response = await fetch(`https://veritasnlp-default-rtdb.firebaseio.com/results/${id}.json`);
    data = await response.json();
  } catch (error) {
    console.log("Error: " + error)
    return;
  }

  if (!data) {
    return;
  }

  const title = data["title"]
  const description = data["description"]
  const image = data["image_base64"]
  const parsed_raw_input = JSON.parse(data["raw_input"])
  const parsed_scored_output = JSON.parse(data["scored_output"])

  const header = document.querySelector(".header")

  const title_div = header.querySelector('.title');
  title_div.innerText = title;

  const description_div = header.querySelector('.description')
  description_div.innerText = description;

  const image_container = header.querySelector('.image');
  image_container.style.height = `${header.offsetHeight}px`;

  const image_element = document.createElement("img");
  image_element.src = image;
  image_element.style.height = "100%";
  image_container.appendChild(image_element);

  const visualizer = document.querySelector('.visualizer')

  visualizer.innerHTML = ""
  visualizer.style.backgroundColor = "initial"
  visualizer.style.border = "none"
  visualizer.style.padding = "0"
  visualizer.style.textAlign = "initial"

  parsed_raw_input.forEach(input => {

    const id_div = document.createElement('div')
    id_div.id = input[Object.keys(parsed_raw_input[0])[0]]
    id_div.style.position = "relative"

    const doc_div = document.createElement('div')
    doc_div.className = "document"
    doc_div.innerText = input["Document"]

    const doc_id_span = document.createElement('span')
    doc_id_span.style.position = "absolute";
    doc_id_span.innerHTML = input[Object.keys(parsed_raw_input[0])[0]]
    doc_id_span.style.top = "0"
    doc_id_span.style.left = "-1.5em"
    doc_id_span.style.color = "#ccc"
    doc_id_span.style.fontSize = "0.8em"

    id_div.appendChild(doc_id_span)
    id_div.appendChild(doc_div)
    visualizer.appendChild(id_div)

  })

  const id_divs = visualizer.children

  // for each document, get all phrases with each one's useful information, and get all topics of the document
  const documents_information = {}

  for (let i = 0; i < id_divs.length; i++) {

    // get all phrases of document number `id_divs[i].id`
    const all_current_doc_phrases = parsed_scored_output.filter(object => object[Object.keys(parsed_scored_output[0])[0]] === id_divs[i].id)

    // filter only relevant information for each phrase of the document
    let current_doc_filtered_phrases = []

    // get common industry/global topics of the current document with their number of occurence
    const all_current_doc_industry_topics = {}
    const all_current_doc_global_topics = {}

    all_current_doc_phrases.forEach(phrase_object => {

      // get all industry topics of current phrase
      const phrase_industry_topics = Object.entries(phrase_object).reduce((accum, pair) => {
        const [key, value] = pair;
        if (key.startsWith("Industry") && parseInt(value) > 0) {
          return [...accum, [key.split(' - ')[1], parseInt(value)]]
        }
        return [...accum]
      }, [])

      // get all global topics of current phrase
      const phrase_global_topics = Object.entries(phrase_object).reduce((accum, pair) => {
        const [key, value] = pair;
        if (key.startsWith("Global") && parseInt(value) > 0) {
          return [...accum, [key.split(' - ')[1], parseInt(value)]]
        }
        return [...accum]
      }, [])

      // filter only relevant information for each phrase of the document
      current_doc_filtered_phrases.push({
        "Phrase": phrase_object["Phrase"],
        "Sentiment": phrase_object["Sentiment"],
        "Industry Topics": phrase_industry_topics,
        "Global Topics": phrase_global_topics
      })

      // add current phrase industry/global topics to current-doc topics (all_current_doc_topics)

      phrase_industry_topics.forEach(pair => {
        const [key, value] = pair
        all_current_doc_industry_topics[key] = all_current_doc_industry_topics[key] + value || value
      })

      phrase_global_topics.forEach(pair => {
        const [key, value] = pair
        all_current_doc_global_topics[key] = all_current_doc_global_topics[key] + value || value
      })

    })

    // add all previous information to current document
    documents_information[id_divs[i].id] = {
      "Phrases": current_doc_filtered_phrases,
      "All Industry Topics": all_current_doc_industry_topics,
      "All Global Topics": all_current_doc_global_topics
    }

  }

  // for each document, add the topics list, highlight phrases according to their sentiments
  // and bold the related phrases/topics on hover

  [...id_divs].forEach(id_div => {

    // add the topics div 

    const topics_div = document.createElement('div')
    topics_div.className = "topics"

    // add the Global Topics list

    const global_topics_title = document.createElement('p')
    global_topics_title.innerText = "Global Topics:"
    global_topics_title.classList = "bold dotted-underline"
    global_topics_title.style.marginBottom = "1em"

    const global_topics_list = document.createElement('ul')

    const global_topics = Object
      .entries(documents_information[id_div.id]["All Global Topics"])
      .sort((a, b) => a[1] !== b[1] ? b[1] - a[1] : b[0] < a[0] ? 1 : -1)

    global_topics.forEach(pair => {
      const topic = pair[0]
      const frequency = pair[1]
      const topic_item = document.createElement('li')
      topic_item.innerHTML = `${topic}: <span class="bold">${frequency}</span>`
      topic_item.dataset.topic = topic.replaceAll(' ', '-')
      global_topics_list.appendChild(topic_item)
    })

    topics_div.appendChild(global_topics_title)

    if (global_topics_list.hasChildNodes())
      topics_div.appendChild(global_topics_list)
    else
      topics_div.innerHTML += "<p style='color: #666666'>None</p>"

    topics_div.appendChild(document.createElement('br'))

    // add the Industry Topics list

    const industry_topics_title = document.createElement('p')
    industry_topics_title.innerText = "Industry Topics:"
    industry_topics_title.classList = "bold dotted-underline"
    industry_topics_title.style.marginBottom = "1em"

    const industry_topics_list = document.createElement('ul')

    const industry_topics = Object
      .entries(documents_information[id_div.id]["All Industry Topics"])
      .sort((a, b) => a[1] !== b[1] ? b[1] - a[1] : b[0] < a[0] ? 1 : -1)

    industry_topics.forEach(pair => {
      const topic = pair[0]
      const frequency = pair[1]
      const topic_item = document.createElement('li')
      topic_item.innerHTML = `${topic}: <span class="bold">${frequency}</span>`
      topic_item.dataset.topic = topic.replaceAll(' ', '-')
      industry_topics_list.appendChild(topic_item)
    })

    topics_div.appendChild(industry_topics_title)

    if (industry_topics_list.hasChildNodes())
      topics_div.appendChild(industry_topics_list)
    else
      topics_div.innerHTML += "<p style='color: #666666'>None</p>"

    id_div.appendChild(topics_div)

    // for each phrase of the current document, add the highlighting functionality

    const document_div = id_div.querySelector(".document")

    documents_information[id_div.id]["Phrases"].forEach(phrase_info => {

      // create a span element for current phrase with a class of .Pos/.Neu/.Neg
      const phrase_span = document.createElement("span")
      const phrase = phrase_info["Phrase"]
      const sentiment = phrase_info["Sentiment"]
      phrase_span.innerText = phrase
      phrase_span.className = sentiment

      // add topics dataset to the span element
      const topics = phrase_info["Industry Topics"].concat(phrase_info["Global Topics"]).map(topic => topic[0].replaceAll(' ', '-'))
      phrase_span.dataset.topics = topics.join(' ')

      // surround phrase with span element of class .Pos/.Neu/.Neg
      document_div.innerHTML = document_div.innerHTML.replace(phrase, phrase_span.outerHTML)

    })

    // for each phrase of the current document, addHoverListeners() for it and for its topics

    document_div.querySelectorAll("span").forEach(phrase_span => {
      const topics = phrase_span.dataset.topics.split(' ').filter(topic => topic !== '')
      const topics_elements = topics.map(topic => {
        return id_div.querySelector(".topics").querySelector(`[data-topic="${topic}"]`)
      })
      topics_elements.forEach(topic_element => {
        addHoverListeners(phrase_span, topic_element)
        addHoverListeners(topic_element, phrase_span)
      })

    })

  });

}

