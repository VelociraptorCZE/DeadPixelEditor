/**
 * DeadPixelEditor
 * Copyright (c) Simon Raichl 2020
 * MIT License
 */

export default class {
	onInit ({ brush, canvasManager }) {
		this.brush = brush;
		this.canvasManager = canvasManager;
		this.createCanvas();
	}

	createCanvas () {
		const { canvas } = this.canvasManager.mainContext;

		canvas.addEventListener("mousedown", () => this.isDrawing = true);
		canvas.addEventListener("mouseup", () => this.isDrawing = false);
		canvas.addEventListener("mousemove", this.#drawCallback);
		canvas.addEventListener("mousedown", this.#drawCallback);
	}

	#drawCallback = ({ layerX, layerY }) => {
		if (!this.isDrawing) {
			return;
		}

		const { canvasManager, brush } = this;

		canvasManager.mainContext.fillStyle = brush.color;
		canvasManager.mainContext.fillRect(
			canvasManager.getClosestCoordinate(layerX),
			canvasManager.getClosestCoordinate(layerY),
			brush.width,
			brush.width
		);
	};
}