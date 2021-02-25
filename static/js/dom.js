// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";
import {dragAndDrop} from "./drag_and_drop.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
            dom.loadStatuses(boards);
            dom.renameBoard();
            dom.createCard();
            dom.hideNshowBoard();
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `
                <section class="board" id="board${board.id}">
                <div class="board-header" id="header${board.id}"><span class="board-title" data-id="${board.id}">${board.title}</span></div>
                </section>
            `;
        }

        const outerHtml = `
            <div class="board-container">
                ${boardList}
            </div>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function(cards){
            dom.showCards(cards);
        });
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let outerHtml = '';

        for(let card of cards){
            outerHtml = `
                <div class="card" data-board="${card.board_id}" data-status="${card.status_id}" data-id="${card.id}">
                    <div class="card-title" data-id="${card.id}">${card.title}</div>
                </div>
            `;

            let cardContainer = document.getElementById(`board${card.board_id}`);
            let cardColumn = cardContainer.getElementsByClassName(`status${card.status_id}`)[0];
            cardColumn.insertAdjacentHTML('beforeend', outerHtml);
        }

    },
    loadStatuses: function (boards) {
        // retrieves cards and makes showCards called
        dataHandler.getStatuses( function(statuses){
            for (let board of boards){
                dom.showStatuses(statuses, board["id"]);
                dom.loadCards(board["id"]);
            }
            setTimeout(() => {dragAndDrop.initDragAndDrop()}, 300);
            dom.addStatus();
        });
    },
    showStatuses: function (statuses, board) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let statusList = '';

        for(let status of statuses){
            statusList += `
                <div class="board-column">
                    <div class="board-column-title"><span class="column-title" data-id="${status.id}">${status.title}</span></div>
                    <div class="board-column-content status${status.id}" data-board="${board}" data-status="${status.id}"></div>
                </div>
            `;
        }

        const outerHtml = `
            <div class="board-columns">
                ${statusList}
            </div>
        `;

        /*let statusesContainer = document.querySelectorAll('.board-header');
        statusesContainer.forEach(status => {
            status.insertAdjacentHTML("afterend", outerHtml);
        });*/
        let statusesContainer = document.getElementById(`header${board}`);
        statusesContainer.insertAdjacentHTML("afterend", outerHtml);

    },
    createNewBoardField: function () {
        document.getElementById("public-button").addEventListener("click", function () {
        if (document.getElementById("public-input")) {
            alert("Please fill in the form to create a new board")
        } else {
            let publicDiv = document.getElementById("public-div");
            let elementNames = ["newPublicInput", "newPublicSave"]
            let tags = ["input", "button"]
            let names = ["title", "button"]
            let ids = ["public-input","public-save"]
            let innerHTMLS = ["<input></input>","<button>SAVE BOARD</button>"]
            let createdElements = []
            for (let i = 0; i < elementNames.length; i++) {
                createdElements[elementNames[i]] = document.createElement(tags[i]);
                (createdElements[elementNames[i]]).innerHTML = innerHTMLS[i];
                (createdElements[elementNames[i]]).name = names[i];
                (createdElements[elementNames[i]]).id = ids[i];
                publicDiv.appendChild((createdElements[elementNames[i]]))
            }
                document.getElementById("public-save").addEventListener("click",
                    function () {
                        if (document.getElementById("public-input").value === "") {
                            alert("Please don't leave this field empty");
                        }else {
                            let title = {title: `${document.getElementById("public-input").value}`}
                            dataHandler._api_post('/', title)
                            document.location.reload();
                        }
                });
        }
    });
    },

    renameBoard: function () {
        let boardTitles = document.getElementsByClassName("board-title");
        for (let boardTitle of boardTitles){
            boardTitle.addEventListener("click", function(){
                if (document.getElementById("rename-input") === null) {
                    let oldValue = boardTitle.innerHTML;
                    boardTitle.style.visibility = "hidden";
                    const outerHtml = `<input class="input-field" type="text" id="rename-input" value="${oldValue}">
                                <button id ="rename-button">SAVE</button>`;
                    boardTitle.insertAdjacentHTML('beforebegin', outerHtml);
                    document.getElementById("rename-button").addEventListener("click", function () {
                        boardTitle.style.visibility = "visible";
                        boardTitle.innerHTML = document.getElementById("rename-input").value;
                        document.getElementById("rename-input").remove();
                        document.getElementById("rename-button").remove();
                        let boardId = boardTitle.dataset.id;
                        let data = {title: `${boardTitle.innerHTML}`, board_id: boardId};
                        dataHandler._api_post('/rename-board', data);
                    });
                }
            });
        }
    },


    createCard: function () {
        let boardTitles = document.getElementsByClassName("board-title");
        for (let boardTitle of boardTitles) {
            const outerHtml = `<button class="add-card-button" data-id="${boardTitle.dataset.id}">Create new card</button>`;
            boardTitle.insertAdjacentHTML('afterend', outerHtml);
        }
        let addCardButtons = document.getElementsByClassName("add-card-button");
        for (let addCardButton of addCardButtons) {
            addCardButton.addEventListener("click", function () {
                if (document.getElementById("card-input") === null) {
                    const outerHtml = `<input class="input-field" type="text" id="card-input"">`;
                    addCardButton.insertAdjacentHTML('beforebegin', outerHtml);
                } else if (addCardButton.previousSibling.id === "card-input") {
                    let cardId = document.getElementById("card-input").value;
                    let boardId = addCardButton.dataset.id;
                    document.getElementById("card-input").remove();
                    dataHandler.createNewCard(cardId, boardId, 0);
                }
            });
        }
    },
      
    addStatus: function () {
        const newStatusButton = document.getElementById("add-new-column");
        newStatusButton.addEventListener("click", function (event) {
            if (newStatusButton.classList.contains("clicked")) {
                event.preventDefault();
            } else {
                newStatusButton.classList.add("clicked");
                let inputContainer = document.getElementById("new-column-div");
                const outerHtml = `<input type="text" id="new-status-input"><button id="save-button">SAVE</button>`;
                inputContainer.insertAdjacentHTML("beforeend", outerHtml);
                document.getElementById("save-button").addEventListener("click", function () {
                    let newStatus = document.getElementById("new-status-input").value;
                    if (newStatus === "") alert("Please don't leave this field empty");
                    else {
                        newStatusButton.classList.remove("clicked");
                        document.getElementById("new-status-input").remove();
                        document.getElementById("save-button").remove();
                        dataHandler.createNewStatus(newStatus);
                    }
                });
            }
        });
    },
  
    hideNshowBoard: function () {
        const boardHeaders = document.getElementsByClassName("board-header");
        for (let boardHeader of boardHeaders){
            boardHeader.addEventListener("click", function (event) {
                if (boardHeader !== event.target) return;
                const boardColumns = this.parentNode.getElementsByClassName("board-column");
                for (let boardColumn of boardColumns){
                    if (boardColumn.style.display === ""){
                        boardColumn.style.display = "none"
                    } else {
                        boardColumn.style.display = ""
                    }
                }
            })
        }
    },
};

window.onload = function (){
    let columnTitles = document.getElementsByClassName("column-title");
    let cardTitles = document.getElementsByClassName("card-title");
    for (let columnTitle of columnTitles){
        columnTitle.addEventListener("click", function(){
            if (document.getElementById("rename-column-input") === null) {
            let oldValue = columnTitle.innerHTML;
            columnTitle.style.display = "none";
            const outerHtml = `<input type="text" id="rename-column-input" class="column-rename" value="${oldValue}">`;
            columnTitle.insertAdjacentHTML('beforebegin', outerHtml);
            document.getElementById("rename-column-input").addEventListener("keyup", function (e) {
            if(e.keyCode === 13 || e.keyCode === 27)
                columnTitle.style.display = "inline";
                if (e.keyCode === 13) {
                    columnTitle.innerHTML = document.getElementById("rename-column-input").value;
                    document.getElementById("rename-column-input").remove();
                    let columnId = columnTitle.dataset.id;
                    let data = {title: `${columnTitle.innerHTML}`, id: columnId};
                    dataHandler._api_post('/rename-column', data);
                    //document.location.reload();
                } else if (e.keyCode === 27) {
                    document.getElementById("rename-column-input").remove();
                    columnTitle.innerHTML = oldValue;
                }
            });
            }
        })
    }
    for (let cardTitle of cardTitles){
    cardTitle.addEventListener("click", function(){
        if (document.getElementById("rename-card-input") === null) {
        let oldValue = cardTitle.innerHTML;
        cardTitle.style.display = "none";
        const outerHtml = `<input type="text" id="rename-card-input" class="card-rename" value="${oldValue}">`;
        cardTitle.insertAdjacentHTML('beforebegin', outerHtml);
        document.getElementById("rename-card-input").addEventListener("keyup", function (e) {
        if(e.keyCode === 13 || e.keyCode === 27)
            cardTitle.style.display = "inline";
            if (e.keyCode === 13) {
                cardTitle.innerHTML = document.getElementById("rename-card-input").value;
                document.getElementById("rename-card-input").remove();
                let columnId = cardTitle.dataset.id;
                let data = {title: `${cardTitle.innerHTML}`, id: columnId};
                dataHandler._api_post('/rename-card', data);
                //document.location.reload();
            } else if (e.keyCode === 27) {
                document.getElementById("rename-card-input").remove();
                cardTitle.innerHTML = oldValue;
            }

        });
        }
    })
}
};