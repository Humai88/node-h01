"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVideoController = void 0;
const db_1 = require("../db/db");
const findVideoController = (req, res) => {
    const video = db_1.db.videos.find(video => video.id === +req.params.id);
    if (!video) {
        res.status(404).json({ errorsMessages: [{ message: 'Video not found', field: 'id' }] });
        return;
    }
    res.status(200).json(video);
};
exports.findVideoController = findVideoController;
