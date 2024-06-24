import { Request, Response } from 'express'
import { db } from '../db/db'
import { OutputErrorsType } from '../models/ErrorsModel'
import { ParamType } from '../models/InputVideoModel'

export const deleteVideoController = (req: Request<ParamType>, res: Response<any | OutputErrorsType>) => {
    const videoId = req.params.id
    const video = db.videos.find(video => video.id === +req.params.id)
    if (!video) {
        res.status(404).json({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
        return
    }
    db.videos = db.videos.filter(video => video.id !== +videoId)
    res
        .sendStatus(204)
}
