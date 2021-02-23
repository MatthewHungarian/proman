import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
    for (let i = 1; i <= 2; i++){
        dom.loadCards(i);
    }

}

init();
