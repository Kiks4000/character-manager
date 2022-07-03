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

function updateOneCharacter(charID, character) {
    axios.put(apiUrl + "/" + charID, character)
        .then(function (response) {
            console.log(response);
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function deleteCharacter(character) {
    const response = await fetch(apiUrl + "/" + character.id, {
        method: "DELETE"
    });
    const data = await response.json();
    return data;
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

function createCard(character) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <h3 class="name">${character.name}</h3>
    <img class="imgBase64" src="data:image/jpeg;base64,${character.image}">
    <p class="shortDescription">${character.shortDescription}</p>
    <p class="longDescription">${character.description}</p>
    <div class="btns">
        <button class="modify">Modify</button>
        <button class="delete">Delete</button>
    </div>
    `;

    let deleteBtn = card.querySelector(".delete");
    let modifyBtn = card.querySelector(".modify");

    deleteBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this character?")) {
            deleteCharacter(character);
            card.remove();
        } else {
            alert("Character not deleted");
        }
    }
    );

    modifyBtn.addEventListener("click", () => {
        createEditForm(character);
    });

    return card;
}

GetAllExistingCharacters().then(response => {
    response.data.forEach(character => {
        const card = createCard(character);
        document.querySelector(".cards").appendChild(card);
    });
}
).catch(error => {
    console.log(error);
}
);

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

// -------------------- Creating Modify Form --------------------

function createEditForm(character) {
    let formContainer = document.querySelector(".cards");
    
    let charName = character.name;
    let charShortDescription = character.shortDescription;
    let charDescription = character.description;
    let charID = character.id;
    let charImage = character.image;

    formContainer.innerHTML = "";
    formContainer.innerHTML = `
    <div class="rendered-form">
    <div class="field-formName">
        <label for="formName" class="formName">Name<span>*</span></label>
        <input type="text" placeholder="NAME" class="formName" id="formName" value="${charName}">
    </div>
    <div class="field-formShortDescription">
        <label for="formShortDescription" class="formShortDescription">Short Description<span>*</span></label>
        <input type="text" placeholder="Short Description" class="form-control" name="formShortDescription" id="formShortDescription" value="${charShortDescription}">
    </div>
    <div class="field-formDescription">
        <label for="formDescription" class="formDescription">Complete Description<span>*</span></label>
        <textarea type="textarea" placeholder="Complete Description" class="form-control" name="formDescription" id="formDescription">${charDescription}</textarea>
    </div>
    <div class="field-formPicture">
        <label for="formPicture" class="formPicture">Character's Picture</label>
        <input type="file" class="form-control" onchange="encodeImageFileAsURL(this)" src="${charImage}" name="formPicture" multiple="false" id="formPicture">
    </div>
    <div class="field-formBtn">
        <button type="submit" class="btn-default formBtn" name="formBtn" id="formBtn">Submit</button>
        <p class="charId" style=display:none >${charID}</p>
    </div>
</div>`;

    formBtn.addEventListener("click", function() {
            
            let formBtn = document.getElementById("formBtn");
            let formName = document.getElementById("formName");
            let formShortDescription = document.getElementById("formShortDescription");
            let formDescription = document.getElementById("formDescription");
            let charId = document.querySelector(".charId").innerHTML;
            let formPicture = document.getElementById("formPicture").src;


            let base64Img = convertedImg.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '');
            let base64Edit = formPicture.replace('http://127.0.0.1:5501', '');

            function editOrNot() {
                if (base64Img === "") {
                    return base64Edit;
                } else {
                    return base64Img;
                }
            }

            var character = {
                description: formDescription.value,
                name: formName.value,
                image: editOrNot(),
                shortDescription: formShortDescription.value
            };
    
            console.log(formPicture);
            updateOneCharacter(charID, character);
    
        }
    );
}