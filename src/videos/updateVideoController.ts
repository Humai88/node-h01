
import { Response, Request } from 'express'
import { db } from '../db/db'
import { updateInputValidation } from '../validation/input-validation'
import { OutputType } from '../models/OutputVideoModel'
import { ParamType, UpdateVideoInputType } from '../models/InputVideoModel'

export const updateVideoController = (req: Request<ParamType, OutputType, UpdateVideoInputType, any>, res: Response<OutputType>) => {
    let videoToUpdate = db.videos.find(p => p.id === +req.params.id)
    if (!videoToUpdate) {
        res.status(404).json({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
        return
    }
    const errors = updateInputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }
    videoToUpdate = {
        ...videoToUpdate,
        ...req.body
    }
    db.videos = db.videos.map(video => video.id === +req.params.id ? videoToUpdate : video)
    res
        .sendStatus(204)
}