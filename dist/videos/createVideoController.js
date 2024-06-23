"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoController = void 0;
const db_1 = require("../db/db");
const input_output_types_1 = require("./input-output-types");
const inputValidation = (video) => {
    const errors = {
        errorsMessages: []
    };
    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !input_output_types_1.Resolutions[p]) || video.availableResolutions.length < 1) {
        errors.errorsMessages.push({
            message: 'Please add valid resolution!', field: 'availableResolution'
        });
    }
    if (!video.title) {
        errors.errorsMessages.push({
            message: 'Title required!', field: 'title'
        });
    }
    if (!video.author) {
        errors.errorsMessages.push({
            message: 'Author required!', field: 'author'
        });
    }
    if (video.title.trim().length > 40) {
        errors.errorsMessages.push({
            message: 'Title maximum length exceeded!', field: 'title'
        });
    }
    if (video.author.trim().length > 20) {
        errors.errorsMessages.push({
            message: 'Author maximum length exceeded!', field: 'author!'
        });
    }
    return errors;
};
const createVideoController = (req, res) => {
    const errors = inputValidation(req.body);
    if (errors.errorsMessages.length) {
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
