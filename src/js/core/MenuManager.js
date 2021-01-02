/**
 * DeadPixelEditor
 * Copyright (c) Simon Raichl 2020 - 2021
 * MIT License
 */

export default class {
	exportImageButton = document.getElementById("exportImage");
	brushColorPicker = document.getElementById("brushColorPicker");
	newImageButton = document.getElementById("newImage");
	undoButton = document.getElementById("undoStep");

	onInit ({ brush, mainCanvas }) {
		this.brush = brush;
		this.mainCanvas = mainCanvas;
		this.createMenu();
		this.refreshImageExportButtonUrl();
	}

	createMenu () {
		const { mainCanvas } = this;

		this.brushColorPicker?.addEventListener("input", ({ target }) => {
			this.brush.color = target.value;
			const brushModeButton = this.getBrushModeButton();
			brushModeButton.checked = true;
			brushModeButton.dispatchEvent(new Event("input"));
		});

		this.undoButton.addEventListener("click", mainCanvas.undo);
		this.newImageButton.addEventListener("click", mainCanvas.newImage);
	}

	getBrushModeButton () {
		return document.querySelector(".drawMode[data-mode=source-over]");
	}

	refreshImageExportButtonUrl () {
		this.exportImageButton.href = this.mainCanvas.getImageUrl();
	}
}