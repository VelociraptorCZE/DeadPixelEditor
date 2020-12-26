/**
 * DeadPixelEditor
 * Copyright (c) Simon Raichl 2020
 * MIT License
 */

import GrumpyDI from "grumpydi";
import Brush from "./core/Brush";
import PreviewCanvas from "./core/PreviewCanvas";
import CanvasManager from "./core/CanvasManager";
import MainCanvas from "./core/MainCanvas";
import MenuManager from "./core/MenuManager";

GrumpyDI({
	brush: Brush,
	previewCanvas: PreviewCanvas,
	mainCanvas: MainCanvas,
	canvasManager: CanvasManager,
	menuManager: MenuManager
});