"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const getVideosController_1 = require("./getVideosController");
const createVideoController_1 = require("./createVideoController");
const deleteVideoController_1 = require("./deleteVideoController");
const findVideoController_1 = require("./findVideoController");
exports.videosRouter = (0, express_1.Router)();
exports.videosRouter.get('/', getVideosController_1.getVideosController);
exports.videosRouter.post('/', createVideoController_1.createVideoController);
exports.videosRouter.get('/:id', findVideoController_1.findVideoController);
exports.videosRouter.delete('/:id', deleteVideoController_1.deleteVideoController);
// ...
// не забудьте добавить роут в апп
