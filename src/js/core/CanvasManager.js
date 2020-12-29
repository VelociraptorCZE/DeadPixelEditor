/**
 * DeadPixelEditor
 * Copyright (c) Simon Raichl 2020
 * MIT License
 */

export default class {
	drawMode = "source-over";
	previewContext = document.getElementById("previewLayer")?.getContext("2d");
	mainContext = document.getElementById("mainLayer")?.getContext("2d");

	constructor () {
		[...document.querySelectorAll("input[name=drawMode]")].forEach(input => {
			input.addEventListener("input", () => this.drawMode = input.dataset.mode);
		});
	}

	onInit ({ brush }) {
		this.brush = brush;
	}

	getClosestCoordinate (position) {
		const { brush } = this;
		const coordinatesCount = Math.ceil(position / brush.width) || 1;
		const possibleCoordinates = Array(coordinatesCount).fill().map((_, i) => brush.width * i);

		return possibleCoordinates
			.map(coordinate => ({ diff: Math.abs(position - coordinate), coordinate }))
			.sort(({ diff: diff1 }, { diff: diff2 }) => diff1 - diff2)[0].coordinate;
	}
}