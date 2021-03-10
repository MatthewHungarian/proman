// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";
import {dragAndDrop} from "./drag_and_drop.js";

export let dom = {
    init: function () {
        dom.loadBoards();
    },
    loadBoards: function () {
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
            dom.createNewBoardField ();
            dom.renameBoard();
            dom.hideNshowBoard();
            dom.loadStatuses(boards);
        });
    },
    showBoards: function (boards) {

        let boardList = '';

        for(let board of boards){
            let user = 0;
            if(document.getElementById('private-button')){
                user = Number(document.getElementById('private-button').dataset.user);
            }
            if (board.user_id === user || board.user_id === 0) {
                boardList += `
                    <section class="board" id="board${board.id}">
                    <div class="board-header" id="header${board.id}"><span class="board-title" data-id="${board.id}">${board.title}</span></div>
                    </section>
                `;
            }
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
        dataHandler.getCardsByBoardId(boardId, function(cards){
            dom.showCards(cards);
            dom.renameCard();
            dragAndDrop.initDragAndDrop();
            dom.deleteCard();
        });
    },
    showCards: function (cards) {
        let outerHtml = '';

        for(let card of cards){
            outerHtml = `
                <div class="card" data-board="${card.board_id}" data-status="${card.status_id}" data-id="${card.id}">
                    <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                    <div class="card-title" data-id="${card.id}">${card.title}</div>
                </div>
            `;

            let cardContainer = document.getElementById(`board${card.board_id}`);
            let cardColumn = cardContainer.getElementsByClassName(`status${card.status_id}`)[0];
            cardColumn.insertAdjacentHTML('beforeend', outerHtml);
        }

    },
    loadStatuses: function (boards) {
        dataHandler.getStatuses( function(statuses){
            for (let board of boards) {
                let user = 0;
                if (document.getElementById('private-button')) {
                    user = Number(document.getElementById('private-button').dataset.user);
                }
                if (board.user_id === user || board.user_id === 0) {
                    dom.showStatuses(statuses, board["id"]);
                    dom.loadCards(board["id"]);
                }
            }
            dom.addStatus();
            dom.renameStatus();
            dom.createCard();
            dom.deleteStatus();
        });
    },
    showStatuses: function (statuses, board) {

        let statusList = '';

        for(let status of statuses){
            statusList += `
                <div class="board-column" data-id="${status.id}">
                    <div class="container">
                        <div class="board-column-title"><span class="column-title" data-id="${status.id}">${status.title}</span></div>
                        <div class="column-remove"><i class="fas fa-trash-alt"></i></div>
                    </div>
                    <div class="board-column-content status${status.id}" data-board="${board}" data-status="${status.id}"></div>
                </div>
            `;
        }

        const outerHtml = `
            <div class="board-columns">
                ${statusList}
            </div>
        `;

        let statusesContainer = document.getElementById(`header${board}`);
        statusesContainer.insertAdjacentHTML("afterend", outerHtml);

    },
    createNewBoardField: function () {
        let newBoardFields = document.getElementsByClassName("create-board");
        for(let field of newBoardFields) {
            field.addEventListener("click", function () {
                if (document.getElementById("board-input")) {
                    alert("Please fill in the form to create a new board")
                } else {
                    let parentDiv = field.parentNode;
                    let elementNames = ["newBoardInput", "newBoardSave"]
                    let tags = ["input", "button"]
                    let names = ["title", "button"]
                    let ids = ["board-input", "board-save"]
                    let innerHTMLS = ["<input></input>", "<button>SAVE BOARD</button>"]
                    let createdElements = []
                    for (let i = 0; i < elementNames.length; i++) {
                        createdElements[elementNames[i]] = document.createElement(tags[i]);
                        (createdElements[elementNames[i]]).innerHTML = innerHTMLS[i];
                        (createdElements[elementNames[i]]).name = names[i];
                        (createdElements[elementNames[i]]).id = ids[i];
                        parentDiv.appendChild((createdElements[elementNames[i]]))
                    }
                    document.getElementById("board-save").addEventListener("click", function () {
                        if (document.getElementById("board-input").value === "") {
                            alert("Please don't leave this field empty");
                        } else {
                            let data = {title: `${document.getElementById("board-input").value}`, user_id: `${field.dataset.user}`}
                            dataHandler._api_post('/create-board', data)
                            document.getElementById("board-save").remove();
                            document.getElementById("board-input").remove();
                            dom.reloadEverything();
                        }
                    });
                }
            });
        }
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
                    dom.reloadEverything();
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
                        dom.reloadEverything();
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
    renameStatus: function (){
        let columnTitles = document.getElementsByClassName("column-title");
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
                        } else if (e.keyCode === 27) {
                            document.getElementById("rename-column-input").remove();
                            columnTitle.innerHTML = oldValue;
                        }
                    });
                }
            })
        }
    },
    renameCard: function (){
        let cardTitles = document.getElementsByClassName("card-title");
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
                        } else if (e.keyCode === 27) {
                            document.getElementById("rename-card-input").remove();
                            cardTitle.innerHTML = oldValue;
                        }

                    });
                }
            })
        }
    },
    reloadEverything: function (){
        dom.removeElements();
        dom.init();
    },
    removeElements: function (){
        let boardDiv = document.getElementById('boards');
        boardDiv.innerHTML = '';
    },
    deleteCard: function (){
        let deleteCardIcons = document.getElementsByClassName("card-remove");
        for (let deleteCardIcon of deleteCardIcons) {
            deleteCardIcon.addEventListener('click', function(event) {
                let card = event.target.closest('.card');
                let cardId = parseInt(card.dataset.id);
                dataHandler._api_delete(`/delete-card/${cardId}`);
                card.remove();
            })
        }
    },
    deleteStatus: function (){
        let deleteStatusIcons = document.getElementsByClassName("column-remove");
        for (let deleteStatusIcon of deleteStatusIcons) {
            deleteStatusIcon.addEventListener('click', function(event) {
                let status = event.target.closest('.board-column');
                let statusId = parseInt(status.dataset.id);
                dataHandler._api_delete(`/delete-column/${statusId}`);
                dom.reloadEverything();
            })
        }
    }
};

