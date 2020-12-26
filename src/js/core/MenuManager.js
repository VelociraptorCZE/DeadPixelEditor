/**
 * DeadPixelEditor
 * Copyright (c) Simon Raichl 2020
 * MIT License
 */

export default class {
	onInit ({ brush, canvasManager }) {
		this.brush = brush;
		this.canvasManager = canvasManager;
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
		const { canvasManager, exportImageButton, brush } = this;

		const canvas = document.createElement("canvas");
		canvas.width = canvasManager.mainContext.canvas.width / brush.width;
		canvas.height = canvasManager.mainContext.canvas.height / brush.width;
		canvas.getContext("2d").drawImage(canvasManager.mainContext.canvas, 0, 0, canvas.width, canvas.height);

		exportImageButton.href = canvas.toDataURL();
	}
}