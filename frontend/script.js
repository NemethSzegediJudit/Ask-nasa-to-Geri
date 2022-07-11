async function getApod(date) {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=EP7MPNzY0Z4DtVbgrw1VWBXcyeg3UKzwSWPxpg6j&date=${date}`);
        const responseJson = await response.json();
        return responseJson;
}

function currentDate() {
        const today = new Date();
        const date = today.toISOString();
        return date.slice(0, 10);
}

const updateData = async function (date) {
        const todayElement = document.getElementById("today");
        const imageElement = document.getElementById("image");
        const responseJson = await getApod(date);

        imageElement.innerHTML = "";
        todayElement.innerHTML = "";

        if (responseJson.media_type === "video") {
                imageElement.insertAdjacentHTML("beforeend", `<iframe src="${responseJson.url}">`)
        } else {
                imageElement.insertAdjacentHTML("beforeend", `<img src="${responseJson.url}">`)
        }

        todayElement.insertAdjacentHTML("beforeend", `<p class="date">${responseJson.date}</h2>`)

        todayElement.insertAdjacentHTML("beforeend", `<h2>${responseJson.title}</h2>`)

        if (responseJson.copyright !== undefined) {
                todayElement.insertAdjacentHTML("beforeend", `<p class="author">${responseJson.copyright}</p>`)
        }

        todayElement.insertAdjacentHTML("beforeend", `<p class="explanation">${responseJson.explanation}</p>`)
}

function getSelectedDate() {
        const input = document.getElementById('date')
        return input.value
}

function onButtonClicked() {
        const selectedDate = getSelectedDate();
        updateData(selectedDate);
}

const loadEvent = async function () {
        const dateSelector = document.getElementById('date');
        dateSelector.setAttribute('max', currentDate());
        const button = document.querySelector(".showButton");
        updateData(currentDate());
        button.addEventListener("click", onButtonClicked);
}

window.addEventListener("load", loadEvent)