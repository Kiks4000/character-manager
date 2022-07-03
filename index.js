// -------------------- Variables --------------------

// const axios = require('axios').default;

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

let apiUrl = "https://character-database.becode.xyz/characters";

let highlightImage = document.querySelector(".highlightImage");
let highlightShortDescription = document.querySelector(".highlightShortDescription");
let highlightDescription = document.querySelector(".highlightDescription");

let randomCharacter = getRandomCharacter();

let addBtn = document.querySelector(".addBtn");

var convertedImg = "";

// -------------------- Hamburger Menu --------------------

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// -------------------- Define Character Class --------------------

class character {
    constructor(name, shortDescription, description, image) {
        this.name = name;
        this.shortDescription = shortDescription;
        this.description = description;
        this.image = image;
    }
}

// -------------------- Functions --------------------

async function GetAllExistingCharacters() {
    try {
        return await axios.get(apiUrl);
    }
    catch (error) {
        console.log(error);
    }
}

async function GetCharacterById(characterID) {
    try {
        return await axios.get(apiUrl + "/" + characterID);
    }
    catch (error) {
        console.log(error);
    }
}

function postOneCharacter(newCharacter) {
    axios.post(apiUrl, {
        name: newCharacter.name,
        shortDescription: newCharacter.shortDescription,
        description: newCharacter.description,
        image: newCharacter.image
    })
        .then(function (response) {
            console.log(response);
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function getRandomCharacter() {
    try {
        const allCharacters = await GetAllExistingCharacters();
        const randomCharacter = allCharacters.data[Math.floor(Math.random() * allCharacters.data.length)];
        return randomCharacter;
    }
    catch (error) {
        console.log(error);
    }
}

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        // console.log('RESULT', reader.result);
        convertedImg = reader.result;
        return convertedImg;
    }
    reader.readAsDataURL(file);
}

// -------------------- Creating a Random Character Card --------------------

function createCard(randomCharacter) {
    let highlightContainer = document.querySelector(".highlightContainer");
    highlightContainer.innerHTML = `<div class="highlightCharacter">
    <h1 class="highlightTitle">HIGHTLIGHT CHARACTER</h1>
    <div class="highlightCard">
        <div class="underContainer">
            <h2 class="highlightName">${randomCharacter.name}</h2>
            <img class="highlightImage" src="data:image/jpeg;base64,${randomCharacter.image}">
            <p class="highlightShortDescription">${randomCharacter.shortDescription}</p>
        </div>
        <p class="highlightDescription">${randomCharacter.description}</p>
    </div>
</div>`;
}

getRandomCharacter().then(randomCharacter => {
    createCard(randomCharacter);
}
).catch(error => {
    console.log(error);
}
);

// -------------------- Creating the POST Form --------------------

function createForm() {
    let formContainer = document.querySelector(".highlightContainer");
    formContainer.innerHTML = "";
    formContainer.innerHTML = `
    <div class="rendered-form">
    <div class="field-formName">
        <label for="formName" class="formName">Name<span>*</span></label>
        <input type="text" placeholder="Name" class="formName" id="formName">
    </div>
    <div class="field-formShortDescription">
        <label for="formShortDescription" class="formShortDescription">Short Description<span>*</span></label>
        <input type="text" placeholder="Short Description" class="form-control" name="formShortDescription" id="formShortDescription">
    </div>
    <div class="field-formDescription">
        <label for="formDescription" class="formDescription">Complete Description<span>*</span></label>
        <textarea type="textarea" placeholder="Complete Description" class="form-control" name="formDescription" id="formDescription"></textarea>
    </div>
    <div class="field-formPicture">
        <label for="formPicture" class="formPicture">Character's Picture<span class="formbuilder-required">*</span></label>
        <input type="file" class="form-control" onchange="encodeImageFileAsURL(this)" name="formPicture" multiple="false" id="formPicture">
    </div>
    <div class="field-formBtn">
        <button type="submit" class="btn-default formBtn" name="formBtn" id="formBtn">Submit</button>
    </div>
</div>`;

    formBtn.addEventListener("click", function() {

        let formBtn = document.getElementById("formBtn");
        let formName = document.getElementById("formName");
        let formShortDescription = document.getElementById("formShortDescription");
        let formDescription = document.getElementById("formDescription");
        let formPicture = document.getElementById("formPicture").value;

        let base64Img = convertedImg.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '').replace('data:image/webp;base64,', '');

        let newCharacter = new character(formName.value, formShortDescription.value, formDescription.value, base64Img);

        console.log(newCharacter);
        postOneCharacter(newCharacter);

    });
}

addBtn.addEventListener("click", function () {
    createForm();
});

//