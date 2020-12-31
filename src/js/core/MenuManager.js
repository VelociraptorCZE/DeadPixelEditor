/**
 * DeadPixelEditor
 * Copyright (c) Simon Raichl 2020
 * MIT License
 */

export default class {
	exportImageButton = document.getElementById("exportImage");
	brushColorPicker = document.getElementById("brushColorPicker");
	newImageButton = document.getElementById("newImage");

	onInit ({ brush, mainCanvas }) {
		this.brush = brush;
		this.mainCanvas = mainCanvas;
		this.createMenu();
		this.refreshImageExportButtonUrl();
	}

	createMenu () {
		this.brushColorPicker?.addEventListener("input", ({ target }) => {
			this.brush.color = target.value;
			const brushModeButton = this.getBrushModeButton();
			brushModeButton.checked = true;
			brushModeButton.dispatchEvent(new Event("input"));
		});

		this.newImageButton.addEventListener("click", this.mainCanvas.clearCanvas);
	}

	getBrushModeButton () {
		return document.querySelector(".drawMode[data-mode=source-over]");
	}

	refreshImageExportButtonUrl () {
		this.exportImageButton.href = this.mainCanvas.getImageUrl();
	}
}