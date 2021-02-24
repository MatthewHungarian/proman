export let dragAndDrop = {
    initDragAndDrop: function() {
        let draggables = document.querySelectorAll(".card");
        let dropZones = document.querySelectorAll(".board-column-content");
        this.initDraggables(draggables);
        this.initDropZones(dropZones);
    },

    initDraggables: function(draggables) {
        for (const draggable of draggables) {
            this.initDraggable(draggable);
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
        dragAndDrop.setDropZonesHighlight();
    },

    dragEndHandler: function() {
        dragAndDrop.setDropZonesHighlight(false);
        this.classList.remove('dragged');
    },

    dropZoneEnterHandler: function(e) {
        this.classList.add("over-zone");
        e.preventDefault();
    },

    dropZoneOverHandler: function(e) {
            e.preventDefault();
    },

    dropZoneLeaveHandler: function(e) {
        if (e.dataTransfer.types.includes(`type/dragged-card`) &&
            e.relatedTarget !== null &&
            e.currentTarget !== e.relatedTarget.closest('.board-column-content')) {
            this.classList.remove("over-zone");
            this.classList.add("active-zone");
        }
    },

    dropZoneDropHandler: function(e) {
        let draggedElement = document.querySelector('.dragged');
        e.currentTarget.appendChild(draggedElement);
        e.preventDefault();
    },

    setDropZonesHighlight: function(highlight = true) {
        const dropZones = document.querySelectorAll(".board-column-content");
        for (const dropZone of dropZones) {
            if (highlight) {
                dropZone.classList.add("active-zone");
            } else {
                dropZone.classList.remove("active-zone");
                dropZone.classList.remove("over-zone");
            }
        }
    },

    canDropHere: function(e) {
        return (
            e.currentTarget.classList.contains('mixed-cards') &&
            e.dataTransfer.types.includes(`type/dragged-card`)
        ) || (
            e.currentTarget.childNodes.length === 0 &&
            e.dataTransfer.types.includes(`type/dragged-${e.currentTarget.parentElement.dataset.acceptedCards}`)
        );
    },
}