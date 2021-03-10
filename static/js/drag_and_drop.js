import { dataHandler } from "./data_handler.js";

export let dragAndDrop = {
    initDragAndDrop: function() {
        let draggables = document.querySelectorAll(".card");
        let dropZones = document.querySelectorAll(".board-column-content");
        this.initDropZones(dropZones);
        this.initDraggables(draggables);
    },

    initDraggables: function(draggables) {
        for (const draggable of draggables) {
            this.initDraggable(draggable);
            this.initDropZone(draggable);
        }

    },

    initDropZones: function(dropZones) {
        for (let dropZone of dropZones) {
            this.initDropZone(dropZone);
        }
    },

    initDraggable: function(draggable) {
        draggable.addEventListener("dragstart", this.dragStartHandler);
        draggable.addEventListener("dragend", this.dragEndHandler);
        draggable.setAttribute("draggable", "true");
    },

    initDropZone: function(dropZone) {
        dropZone.addEventListener("dragenter", this.dropZoneEnterHandler);
        dropZone.addEventListener("dragover", this.dropZoneOverHandler);
        dropZone.addEventListener("dragleave", this.dropZoneLeaveHandler);
        dropZone.addEventListener("drop", this.dropZoneDropHandler);
    },

    dragStartHandler: function(e) {
        this.classList.add('dragged', 'drag-feedback');
        e.dataTransfer.setData("type/dragged-box", 'dragged');
        dragAndDrop.setDropZonesHighlight(true, this.dataset.board);
    },

    dragEndHandler: function() {
        dragAndDrop.setDropZonesHighlight(false);
        this.classList.remove('dragged');
    },

    dropZoneEnterHandler: function(e) {
        let draggedElement = document.querySelector('.dragged');
        this.classList.add("over-zone");
        if (e.currentTarget.classList.contains('card') && draggedElement.dataset.board === this.dataset.board) {
            dragAndDrop.dropCard(e);
        }
        e.preventDefault();
    },

    dropZoneOverHandler: function(e) {
        let draggedElement = document.querySelector('.dragged');
        if (draggedElement.dataset.board === this.dataset.board) {
            e.preventDefault();
        }
    },

    dropZoneLeaveHandler: function(e) {
        this.classList.remove("over-zone");
        this.classList.add("active-zone");
    },

    dropZoneDropHandler: function(e) {
        let draggedElement = document.querySelector('.dragged');
        if (e.currentTarget.classList.contains('board-column-content') && e.currentTarget.childElementCount === 0){
            e.currentTarget.appendChild(draggedElement);
            draggedElement.dataset.status = e.currentTarget.dataset.status;
            dataHandler.updateCardStatus(draggedElement.dataset.id, draggedElement.dataset.status);
            dataHandler.updateCardOrder(document.querySelectorAll(".card"));
        }
        e.preventDefault();
    },

    setDropZonesHighlight: function(highlight = true, target) {
        const dropZones = document.querySelectorAll(".board-column-content");
        for (const dropZone of dropZones) {
            if (highlight && dropZone.dataset.board === target) {
                dropZone.classList.add("active-zone");
            } else {
                dropZone.classList.remove("active-zone");
                dropZone.classList.remove("over-zone");
            }
        }
    },

    dropCard: function(e) {
        let draggedElement = document.querySelector('.dragged');
        if (e.currentTarget.nextElementSibling) {
            e.currentTarget.insertAdjacentElement('beforebegin', draggedElement);
        } else {
            e.currentTarget.insertAdjacentElement('afterend', draggedElement);
        }
        draggedElement.dataset.status = e.currentTarget.dataset.status;
        dataHandler.updateCardStatus(draggedElement.dataset.id, draggedElement.dataset.status);
        dataHandler.updateCardOrder(document.querySelectorAll(".card"));
    },

}