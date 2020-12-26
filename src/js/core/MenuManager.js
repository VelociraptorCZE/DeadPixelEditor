/**
 * DeadPixelEditor
 * Copyright (c) Simon Raichl 2020
 * MIT License
 */

export default class {
	onInit ({ brush }) {
		this.brush = brush;
		this.createMenu();
	}

	createMenu () {
		document.getElementById("brushColor")?.addEventListener(
			"input", ({ target }) => this.brush.color = target.value
		);
	}
}