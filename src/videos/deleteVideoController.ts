import { Request, Response } from 'express'
import { db } from '../db/db'
import { OutputErrorsType, ParamType } from './input-output-types'

export const deleteVideoController = (req: Request<ParamType>, res: Response<any | OutputErrorsType>) => {
    const videoId = req.params.id
    const video = db.videos.find(video =>video.id === +req.params.id)
    if (!video) {
            res.status(404).json({errorsMessages: [{message: 'Video not found', field: 'id'}]})
        return
    }
    db.videos = db.videos.filter(video => video.id !== +videoId)
    res
        .status(204)
}
