"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoController = void 0;
const db_1 = require("../db/db");
const input_validation_1 = require("../validation/input-validation");
const createVideoController = (req, res) => {
    const errors = (0, input_validation_1.createInputValidation)(req.body);
    if (errors.errorsMessages.length) {
        errors.errorsMessages = errors.errorsMessages.filter((el, index) => index === 0);
        res
            .status(400)
            .json(errors);
        return;
    }
    const newVideo = Object.assign(Object.assign({}, req.body), { id: Date.now() + Math.random(), canBeDownloaded: false, minAgeRestriction: null, createdAt: new Date().toISOString(), publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString() });
    db_1.db.videos = [...db_1.db.videos, newVideo];
    res
        .status(201)
        .json(newVideo);
};
exports.createVideoController = createVideoController;
