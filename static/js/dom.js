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
            for (let i = 1; i <= 2; i++){
                dom.loadCards(i);
            }
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `
                <section class="board">
                <div class="board-header" id="board${board.id}"><span class="board-title">${board.title}</span></div>
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
            dom.showCards(cards, boardId);
        });
    },
    showCards: function (cards, boardId) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let cardList = '';

        for(let card of cards){
            cardList += `
                <div class="card-title">${card.title}</div>
            `;
        }

        const outerHtml = `
            <div class="card">
                ${cardList}
            </div>
        `;


        let cardContainer = document.getElementById(`board${boardId}`);
        cardContainer.insertAdjacentHTML('afterend', outerHtml);

    },
    // here comes `more features
};
