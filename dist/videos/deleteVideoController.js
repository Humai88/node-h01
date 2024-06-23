"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoController = void 0;
const db_1 = require("../db/db");
const deleteVideoController = (req, res) => {
    const videoId = req.params.id;
    const video = db_1.db.videos.find(video => video.id === +req.params.id);
    if (!video) {
        res.status(404).json({ errorsMessages: [{ message: 'Video not found', field: 'id' }] });
        return;
    }
    db_1.db.videos = db_1.db.videos.filter(video => video.id !== +videoId);
    res
        .status(204);
};
exports.deleteVideoController = deleteVideoController;
