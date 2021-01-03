/**
 * DeadPixelEditor
 * Copyright (c) Simon Raichl 2020 - 2021
 * MIT License
 */

export default class {
	savedImages = [];
	step = 0;

	onInit ({ brush, canvasManager, menuManager, colorPaletteMenuManager }) {
		this.brush = brush;
		this.canvasManager = canvasManager;
		this.menuManager = menuManager;
		this.colorPaletteMenuManager = colorPaletteMenuManager;
		this.createCanvas();
	}

	createCanvas () {
		const { canvas } = this.canvasManager.previewContext;

		canvas.addEventListener("mousedown", () => this.isDrawing = true);
		canvas.addEventListener("mouseup", () => {
			const { colorPaletteMenuManager, brush } = this;

			this.isDrawing = false;
			this.saveImageSnapshot();

			colorPaletteMenuManager.usedColors.add(brush.color);
			colorPaletteMenuManager.renderMenu();
		});
		canvas.addEventListener("mousemove", this.#drawCallback);
		canvas.addEventListener("mousedown", this.#drawCallback);
	}

	saveImageSnapshot () {
		const { savedImages } = this;
		const image = this.getCurrentImage();

		if (savedImages[savedImages.length - 1]?.src === image.src) {
			return;
		}

		savedImages.push(image);

		if (savedImages.length === 100) {
			savedImages.shift();
		}

		this.step = savedImages.length - 1;
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

	clearCanvas () {
		const { mainContext } = this.canvasManager;

		mainContext.clearRect(0, 0, mainContext.canvas.width, mainContext.canvas.height);
	}

	getCurrentImage () {
		const { width, height } = this.canvasManager.mainContext.canvas;
		const image = new Image;
		image.src = this.getImageUrl(width, height);

		return image;
	}

	undo = () => {
		const { canvasManager: { mainContext } } = this;

		--this.step;
		const image = this.savedImages[this.step];

		if (image) {
			this.clearCanvas();
			mainContext.drawImage(image, 0, 0);
		}

		this.menuManager.refreshImageExportButtonUrl();
	}

	newImage = () => {
		if (!confirm("Do you want to start over?")) {
			return;
		}

		this.step = 0;
		this.savedImages = [];
		this.clearCanvas();
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