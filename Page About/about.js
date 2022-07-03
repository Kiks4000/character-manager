// -------------------- Variables --------------------

// const axios = require('axios').default;

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

let apiUrl = "https://character-database.becode.xyz/characters";

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

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        convertedImg = reader.result;
        return convertedImg;
    }
    reader.readAsDataURL(file);
}

// -------------------- Creating Add Form --------------------

function createForm() {
    let formContainer = document.querySelector(".cards");
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