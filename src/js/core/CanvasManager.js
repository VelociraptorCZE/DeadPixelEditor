export default class {
	constructor () {
		this.previewContext = document.getElementById("previewLayer")?.getContext("2d");
		this.mainContext = document.getElementById("mainLayer")?.getContext("2d");
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