/**
 * DeadPixelEditor
 * Copyright (c) Simon Raichl 2020
 * MIT License
 */

export default class {
	onInit ({ brush, mainCanvas }) {
		this.brush = brush;
		this.mainCanvas = mainCanvas;
		this.exportImageButton = document.getElementById("exportImage");
		this.createMenu();
		this.refreshImageExportButtonUrl();
	}

	createMenu () {
		document.getElementById("brushColor")?.addEventListener(
			"input", ({ target }) => this.brush.color = target.value
		);
	}

	refreshImageExportButtonUrl () {
		exportImageButton.href = this.mainCanvas.getImageUrl();
	}
}