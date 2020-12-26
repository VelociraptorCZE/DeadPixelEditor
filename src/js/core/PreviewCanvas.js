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
		const { brush, canvasManager } = this;
		const { previewContext, mainContext } = canvasManager;

		mainContext.canvas.addEventListener("mousemove", ({ layerX, layerY }) => {
			previewContext.clearRect(0, 0, previewContext.canvas.width, previewContext.canvas.height);
			previewContext.fillStyle = brush.color;
			previewContext.fillRect(
				canvasManager.getClosestCoordinate(layerX),
				canvasManager.getClosestCoordinate(layerY),
				brush.width,
				brush.width
			);
		});
	}
}