import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

}

document.getElementById("public-button").onclick = function () {
    if (document.getElementById("public-input")) {
        alert("Please fill in the form to create a new board")
    } else {
        let publicDiv = document.getElementById("public-div");
        let elementNames = ["newPublicForm", "newPublicInput", "newPublicSave"]
        let tags = ["form", "input", "button"]
        let innerHTMLS = ["<form id='public-form' action='/' method='POST'></form>",
            "<input id='public-input' name='title'></input>",
            "<button id='public-save'>SAVE BOARD</button>"]
        let createdElements = []
        for (let i = 0; i < elementNames.length; i++) {
            createdElements[elementNames[i]] = document.createElement(tags[i]);
            (createdElements[elementNames[i]]).innerHTML = innerHTMLS[i];
            i !== 0 ? (createdElements[elementNames[0]]).appendChild((createdElements[elementNames[i]])) :
                publicDiv.appendChild((createdElements[elementNames[0]]))

        }
    }
}

init();
