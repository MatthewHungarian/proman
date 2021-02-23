// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
            dom.loadStatuses();
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `
                <section class="board" id="board${board.id}">
                <div class="board-header"><span class="board-title">${board.title}</span></div>
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
                <div class="card">
                    <div class="card-title">${card.title}</div>
                </div>
            `;

            let cardContainer = document.getElementById(`board${card.board_id}`);
            let cardColumn = cardContainer.getElementsByClassName(`status${card.status_id}`)[0];
            cardColumn.insertAdjacentHTML('beforeend', outerHtml);
        }

    },
    loadStatuses: function () {
        // retrieves cards and makes showCards called
        dataHandler.getStatuses( function(statuses){
            dom.showStatuses(statuses);
            for (let i = 1; i <= 2; i++){
                dom.loadCards(i);
            }
        });
    },
    showStatuses: function (statuses) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let statusList = '';

        for(let status of statuses){
            statusList += `
                <div class="board-column">
                    <div class="board-column-title">${status.title}</div>
                    <div class="board-column-content status${status.id}"></div>
                </div>
            `;
        }

        const outerHtml = `
            <div class="board-columns">
                ${statusList}
            </div>
        `;

        let statusesContainer = document.querySelectorAll('.board-header');
        statusesContainer.forEach(status => {
            status.insertAdjacentHTML("afterend", outerHtml);
        });

    },
    // here comes `more features
};
