import { Response, Request } from 'express'

import { db } from '../db/db'
import { InputVideoType, OutputErrorsType, Resolutions } from './input-output-types'
import {  VideoDBType } from '../db/video-db-type'


const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = { // объект для сбора ошибок
        errorsMessages: []
    }
    // ...
    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !Resolutions[p])
    ) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolution'
        })
    }
    return errors
}

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<any /*OutputVideoType*/ | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors)
        return
    }

    // если всё ок - добавляем видео
    const newVideo: VideoDBType = {
        ...req.body,
        id: Date.now() + Math.random(),
        canBeDownloaded: false,
        minAgeRestriction:  null,
        createdAt:  new Date().toISOString(),
        publicationDate:  new Date().toISOString(),
    }
    db.videos = [...db.videos, newVideo]

    res
        .status(201)
        .json(newVideo)
}