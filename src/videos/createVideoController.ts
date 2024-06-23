import { Response, Request } from 'express'
import { db } from '../db/db'
import { CreateVideoInputType, OutputErrorsType, OutputType, Resolutions } from './input-output-types'
import { VideoDBType } from '../db/video-db-type'


const inputValidation = (video: CreateVideoInputType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }
    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !Resolutions[p]) || video.availableResolutions.length < 1
    ) {
        errors.errorsMessages.push({
            message: 'Please add valid resolution!', field: 'availableResolution'
        })
    }
    if (!video.title) {
        errors.errorsMessages.push({
            message: 'Title required!', field: 'title'
        })
    }
    if (!video.author) {
        errors.errorsMessages.push({
            message: 'Author required!', field: 'author'
        })
    }
    if (video.title.trim().length > 40) {
        errors.errorsMessages.push({
            message: 'Title maximum length exceeded!', field: 'title'
        })
    }
    if (video.author.trim().length > 20) {
        errors.errorsMessages.push({
            message: 'Author maximum length exceeded!', field: 'author!'
        })
    }
    return errors
}

export const createVideoController = (req: Request<any, OutputType, CreateVideoInputType, any>, res: Response<OutputType>) => {
    const errors = inputValidation(req.body)
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