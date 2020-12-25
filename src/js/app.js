import GrumpyDI from "grumpydi";
import Brush from "./core/Brush";
import PreviewCanvas from "./core/PreviewCanvas";
import CanvasManager from "./core/CanvasManager";

GrumpyDI({
	brush: Brush,
	previewCanvas: PreviewCanvas,
	canvasManager: CanvasManager
});