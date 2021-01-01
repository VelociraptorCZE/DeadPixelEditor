/**
 * DeadPixelEditor
 * Copyright (c) Simon Raichl 2021
 * MIT License
 */

export default class {
	usedColors = new Set;
	menu = document.getElementById("usedColorsMenu");

	onInit ({ menuManager }) {
		this.menuManager = menuManager;
	}

	renderMenu () {
		const { usedColors, menuManager, menu } = this;

		[...menu.children].forEach(child => child.remove());

		usedColors.forEach(usedColor => {
			const colorBox = document.createElement("span");
			colorBox.style.backgroundColor = usedColor;
			colorBox.className = "menu__color-box";
			colorBox.addEventListener("click", () => {
				menuManager.brushColorPicker.value = usedColor;
				menuManager.brushColorPicker.dispatchEvent(new Event("input"));
			});

			menu.appendChild(colorBox);
		});
	}
}