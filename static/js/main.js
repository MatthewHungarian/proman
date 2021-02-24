import { dom } from "./dom.js";
import {dataHandler} from "./data_handler.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    dom.loadBoards();
    dom.createNewBoardField ();
}

// window.onload = function (){
//     let columnTitles = document.getElementsByClassName("column-title");
//     for (let columnTitle of columnTitles){
//         columnTitle.addEventListener("click", function(){
//             if (document.getElementById("rename-column-input") === null) {
//             let oldValue = columnTitle.innerHTML;
//             columnTitle.style.display = "none";
//             const outerHtml = `<input type="text" id="rename-column-input" class="column-rename" value="${oldValue}">`;
//             columnTitle.insertAdjacentHTML('beforebegin', outerHtml);
//             document.getElementById("rename-column-input").addEventListener("keyup", function (e) {
//             if(e.keyCode === 13 || e.keyCode === 27)
//                 columnTitle.style.display = "inline";
//                 if (e.keyCode === 13) {
//                     columnTitle.innerHTML = document.getElementById("rename-column-input").value;
//                     document.getElementById("rename-column-input").remove();
//                     let columnId = columnTitle.dataset.id;
//                     let data = {title: `${columnTitle.innerHTML}`, id: columnId};
//                     dataHandler._api_post('/rename-column', data);
//                     document.location.reload();
//                 } else if (e.keyCode === 27) {
//                     document.getElementById("rename-column-input").remove();
//                     columnTitle.innerHTML = oldValue;
//                 }
//
//             });
//             }
//         })
//     }
// }

init();