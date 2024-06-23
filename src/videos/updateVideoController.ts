
import { Response, Request } from 'express'
import { db } from '../db/db'
import { UpdateVideoInputType, OutputErrorsType, Resolutions, ParamType, OutputType } from './input-output-types'


const inputValidation = (video: UpdateVideoInputType) => {
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
    if (video.minAgeRestriction && video.minAgeRestriction < 1 || video.minAgeRestriction && video.minAgeRestriction > 18) {
        errors.errorsMessages.push({
            message: 'Invalid age restriction!', field: 'minAgeRestriction'
        })
    }
    return errors
}

export const updateVideoController = (req: Request<ParamType, OutputType, UpdateVideoInputType, any>, res: Response<OutputType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }
    let videoToUpdate = db.videos.find(p => p.id === +req.params.id)
    if (!videoToUpdate) {
        res.status(404).json({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
        return
    }
    videoToUpdate = {
        ...videoToUpdate,
        ...req.body
    }
    db.videos = db.videos.map(video => video.id === +req.params.id ? videoToUpdate : video)

    res
        .status(204)
}