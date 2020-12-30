/**
 * DeadPixelEditor
 * Copyright (c) Simon Raichl 2020
 * MIT License
 */

export default class {
	onInit ({ brush, canvasManager, menuManager }) {
		this.brush = brush;
		this.canvasManager = canvasManager;
		this.menuManager = menuManager;
		this.createCanvas();
	}

	createCanvas () {
		const { canvas } = this.canvasManager.previewContext;

		canvas.addEventListener("mousedown", () => this.isDrawing = true);
		canvas.addEventListener("mouseup", () => this.isDrawing = false);
		canvas.addEventListener("mousemove", this.#drawCallback);
		canvas.addEventListener("mousedown", this.#drawCallback);
	}

	getImageUrl (width = 16, height = 16) {
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		canvas
			.getContext("2d")
			.drawImage(this.canvasManager.mainContext.canvas, 0, 0, width, height);

		return canvas.toDataURL();
	}

	clearCanvas = () => {
		const { mainContext } = this.canvasManager;

		mainContext.clearRect(0, 0, mainContext.canvas.width, mainContext.canvas.height);
	}

	#drawCallback = ({ layerX, layerY }) => {
		if (!this.isDrawing) {
			return;
		}

		const { canvasManager, brush } = this;

		canvasManager.mainContext.globalCompositeOperation = canvasManager.drawMode;
		canvasManager.mainContext.fillStyle = brush.color;
		canvasManager.mainContext.fillRect(
			canvasManager.getClosestCoordinate(layerX),
			canvasManager.getClosestCoordinate(layerY),
			brush.width,
			brush.width
		);

		this.menuManager.refreshImageExportButtonUrl();
	};
}