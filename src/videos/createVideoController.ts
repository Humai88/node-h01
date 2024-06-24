import { Response, Request } from 'express'
import { db } from '../db/db'
import { VideoDBType } from '../db/video-db-type'
import { createInputValidation } from '../validation/input-validation'
import {OutputType } from '../models/OutputVideoModel'
import { CreateVideoInputType } from '../models/InputVideoModel'

export const createVideoController = (req: Request<any, OutputType, CreateVideoInputType, any>, res: Response<OutputType>) => {
    const errors = createInputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }
    const newVideo: VideoDBType = {
        ...req.body,
        id: Date.now() + Math.random(),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    }
    db.videos = [...db.videos, newVideo]
    res
        .status(201)
        .json(newVideo)
}