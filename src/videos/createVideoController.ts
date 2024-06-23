import { Response, Request } from 'express'
import { db } from '../db/db'
import { CreateVideoInputType, OutputType } from './input-output-types'
import { VideoDBType } from '../db/video-db-type'
import { createInputValidation } from '../validation/input-validation'


export const createVideoController = (req: Request<any, OutputType, CreateVideoInputType, any>, res: Response<OutputType>) => {
    const errors = createInputValidation(req.body)
    if (errors.errorsMessages.length) {
        errors.errorsMessages = errors.errorsMessages.filter((el, index) => index === 0)
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