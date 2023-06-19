const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const response = document.getElementById("response");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

const inpWordInput = document.getElementById("input-word");

inpWordInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    btn.click();
  }
});

btn.addEventListener("click", () => {
    let inpWord = inpWordInput.value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            response.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
        })
        .catch(() => {
            response.innerHTML = `<h3 class="error">Word Not Found</h3>`;
        });
});
function playSound() {
    sound.play();
}